import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ShiftBooking {
  id: string;
  shift_id?: string;
  worker_id?: string;
  status: string;
  created_at: string;
  approved_at?: string;
  worker_name: string;
  role: string;
  date: string;
  start_time: string;
  end_time: string;
  hourly_rate: number;
  uniform_required: boolean;
  shift?: {
    id: string;
    role: string;
    date: string;
    start_time: string;
    end_time: string;
    hourly_rate: number;
    uniform_required: boolean;
  };
}

const ImprovedShiftCard = ({ shift, onApprove }: { shift: ShiftBooking; onApprove?: (id: string) => void }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [workerDetails, setWorkerDetails] = useState<any>(null);

  const getShiftData = () => {
    const role = shift.role || (shift.shift?.role) || 'Support Worker';
    const workerName = shift.worker_name || 'Not assigned';
    const id = shift.id || 'No ID';
    const date = shift.date || shift.shift?.date || 'Date not set';
    const startTime = shift.start_time || shift.shift?.start_time;
    const endTime = shift.end_time || shift.shift?.end_time;
    const hourlyRate = shift.hourly_rate || shift.shift?.hourly_rate;
    const uniformRequired = shift.uniform_required || shift.shift?.uniform_required || false;
    const status = shift.status || 'Unknown';

    return {
      role,
      workerName,
      id,
      date,
      startTime,
      endTime,
      hourlyRate,
      uniformRequired,
      status
    };
  };

  const {
    role,
    workerName,
    id,
    date,
    startTime,
    endTime,
    hourlyRate,
    uniformRequired,
    status
  } = getShiftData();

  const formatTime = (start?: string, end?: string) => {
    if (!start && !end) return '-';
    if (!start || !end) return start || end;
    return `${start} - ${end}`;
  };

  const formatRate = (rate?: number) => {
    if (!rate) return null;
    return `£${parseFloat(rate.toString()).toFixed(2)}`;
  };

  const handleViewDetails = async () => {
    try {
      console.log('Fetching worker details for worker_id:', shift.worker_id);
      const { data: worker, error } = await supabase
        .from('careworker_reg')
        .select('*')
        .eq('id', shift.worker_id)
        .single();

      if (error) throw error;

      console.log('Fetched worker details:', worker);
      setWorkerDetails(worker);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error fetching worker details:', error);
    }
  };

  return (
    <Card className="w-full bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {role}
            </h3>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600">
                Worker: {workerName}
              </p>
              <p className="text-sm text-gray-600">
                Booking ID: {id}
              </p>
              <p className="text-sm text-gray-600">
                Date: {date}
              </p>
              <p className="text-sm text-gray-600">
                Time: {formatTime(startTime, endTime)}
              </p>
              {hourlyRate && (
                <p className="text-sm text-gray-600">
                  Hourly Rate: {formatRate(hourlyRate)}
                </p>
              )}
            </div>
            {uniformRequired && (
              <div className="mt-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Uniform Required
                </span>
              </div>
            )}
          </div>
          <div className="flex-shrink-0 space-y-2">
            {status === "Pending" && (
              <Button 
                onClick={() => onApprove?.(id)}
                className="bg-[#0F172A] text-white hover:bg-[#1E293B] rounded-md px-6"
              >
                Approve
              </Button>
            )}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  onClick={handleViewDetails}
                  className="bg-[#0F172A] text-white hover:bg-[#1E293B] rounded-md px-6"
                >
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Worker Details</DialogTitle>
                </DialogHeader>
                {workerDetails ? (
                  <div className="space-y-4">
                    <p><strong>Name:</strong> {workerDetails.first_name} {workerDetails.last_name}</p>
                    <p><strong>Email:</strong> {workerDetails.email}</p>
                    <p><strong>Phone:</strong> {workerDetails.phone}</p>
                    <p><strong>Role:</strong> {workerDetails.role}</p>
                    <p><strong>Shifts Completed:</strong> {workerDetails.shifts_completed || 'N/A'}</p>
                    <p><strong>Rating:</strong> {workerDetails.rating || 'N/A'}</p>
                  </div>
                ) : (
                  <p>Loading...</p>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function ManageShifts() {
  const [savedBookings, setSavedBookings] = useState<ShiftBooking[]>([]);

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from("shift_bookings")
        .update({ status: "Approved", approved_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;

      // Update local state
      setSavedBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.id === id
            ? { ...booking, status: "Approved", approved_at: new Date().toISOString() }
            : booking
        )
      );
    } catch (error) {
      console.error("Error approving booking:", error);
    }
  };

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const { data: bookings, error } = await supabase
          .from("shift_bookings")
          .select(
            `
            id,
            status,
            created_at,
            shift:shifts(id, role, date, start_time, end_time, hourly_rate, uniform_required),
            worker:careworker_reg(first_name, last_name)
          `,
          )
          .order("created_at", { ascending: false });

        if (error) throw error;

        // Transform the data to match the expected format
        const transformedBookings = bookings.map((booking) => ({
          id: booking.id,
          status: booking.status,
          created_at: booking.created_at,
          worker_name: `${booking.worker.first_name} ${booking.worker.last_name}`,
          role: booking.shift.role,
          date: booking.shift.date,
          start_time: booking.shift.start_time,
          end_time: booking.shift.end_time,
          hourly_rate: booking.shift.hourly_rate,
          uniform_required: booking.shift.uniform_required,
          shift: booking.shift,
        }));

        setSavedBookings(transformedBookings);
      } catch (error) {
        console.error("Error loading bookings:", error);
      }
    };

    loadBookings();

    // Subscribe to realtime changes
    const subscription = supabase
      .channel("shift_bookings")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "shift_bookings" },
        loadBookings,
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Organize bookings by status
  const bookings = {
    pending: savedBookings.filter((booking) => booking.status === "Pending"),
    upcoming: savedBookings.filter((booking) => 
      ["Approved", "Confirmed"].includes(booking.status)
    ),
    past: savedBookings.filter((booking) => booking.status === "Completed"),
    canceled: savedBookings.filter((booking) => 
      ["Rejected", "Cancelled"].includes(booking.status)
    ),
  };

  return (
    <div className="p-6 space-y-6">
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="canceled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {bookings.pending.map((shift) => (
            <ImprovedShiftCard key={shift.id} shift={shift} onApprove={handleApprove} />
          ))}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {bookings.upcoming.map((shift) => (
            <ImprovedShiftCard key={shift.id} shift={shift} />
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {bookings.past.map((shift) => (
            <ImprovedShiftCard key={shift.id} shift={shift} />
          ))}
        </TabsContent>

        <TabsContent value="canceled" className="space-y-4">
          {bookings.canceled.map((shift) => (
            <ImprovedShiftCard key={shift.id} shift={shift} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}