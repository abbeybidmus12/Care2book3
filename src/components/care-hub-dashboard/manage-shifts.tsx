import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, AlertCircle, Building2 } from "lucide-react";

interface Booking {
  bookingId: string;
  shiftId: string;
  id: string; // For backward compatibility
  role: string;
  startTime: string;
  endTime: string;
  shiftType: string;
  date: string;
  rate: string;
  status: string;
  worker?: {
    name: string;
    rating: number;
    completedShifts: number;
  };
}

export default function ManageShifts() {
  const [bookings, setBookings] = useState<{
    open: Booking[];
    pending: Booking[];
    approved: Booking[];
    cancelled: Booking[];
  }>({
    open: [],
    pending: [],
    approved: [],
    cancelled: [],
  });

  useEffect(() => {
    const loadShifts = async () => {
      try {
        // Fetch shifts with their bookings and worker details
        const { data: shifts, error } = await supabase
          .from("shifts")
          .select(
            `
            *,
            bookings:shift_bookings(*, worker:careworker_reg(*))
          `,
          )
          .order("created_at", { ascending: false });

        if (error) throw error;

        // Transform the data to include worker details for pending shifts
        const transformedShifts = shifts.map((shift) => ({
          ...shift,
          worker: shift.bookings?.[0]?.worker
            ? {
                name: `${shift.bookings[0].worker.first_name} ${shift.bookings[0].worker.last_name}`,
                id: shift.bookings[0].worker.id,
                role: shift.bookings[0].worker.role,
                // You could add more worker details here
              }
            : null,
        }));

        setBookings({
          open: transformedShifts.filter((shift) => shift.status === "Open"),
          pending: transformedShifts.filter(
            (shift) => shift.status === "Pending",
          ),
          approved: transformedShifts.filter(
            (shift) => shift.status === "Approved",
          ),
          cancelled: transformedShifts.filter((shift) =>
            ["Cancelled", "Rejected"].includes(shift.status),
          ),
        });
      } catch (error) {
        console.error("Error loading shifts:", error);
      }
    };

    loadShifts();

    // Subscribe to realtime changes
    const subscription = supabase
      .channel("shifts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "shifts" },
        loadShifts,
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleApprove = (booking: Booking) => {
    const savedBookings = JSON.parse(
      localStorage.getItem("bookedShifts") || "[]",
    );
    const updatedBookings = savedBookings.map((b: Booking) =>
      b.bookingId === booking.bookingId
        ? { ...b, status: "Approved", approvedAt: new Date().toISOString() }
        : b,
    );
    localStorage.setItem("bookedShifts", JSON.stringify(updatedBookings));

    setBookings((prev) => ({
      ...prev,
      pending: prev.pending.filter((b) => b.bookingId !== booking.bookingId),
      approved: [
        ...prev.approved,
        {
          ...booking,
          status: "Approved",
          approvedAt: new Date().toISOString(),
        },
      ],
    }));
  };

  const handleReject = (booking: Booking) => {
    const savedBookings = JSON.parse(
      localStorage.getItem("bookedShifts") || "[]",
    );
    const updatedBookings = savedBookings.map((b: Booking) =>
      b.id === booking.id ? { ...b, status: "Rejected" } : b,
    );
    localStorage.setItem("bookedShifts", JSON.stringify(updatedBookings));

    setBookings((prev) => ({
      ...prev,
      pending: prev.pending.filter((b) => b.id !== booking.id),
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Date Range</Label>
              <Input type="date" />
            </div>
            <div>
              <Label>Shift Type</Label>
              <Input placeholder="Filter by shift type" />
            </div>
            <div>
              <Label>Status</Label>
              <Input placeholder="Filter by status" />
            </div>
            <div>
              <Label>Worker</Label>
              <Input placeholder="Search by worker" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shifts List */}
      <Tabs defaultValue="open">
        <TabsList>
          <TabsTrigger value="open">Open</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        {/* Open Shifts */}
        <TabsContent value="open" className="space-y-4">
          {bookings.open.map((shift) => (
            <Card key={shift.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{shift.role}</h3>
                      <div className="text-sm text-muted-foreground">
                        ID: {shift.shiftId}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {shift.startTime} - {shift.endTime}
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        {shift.shiftType}
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="text-sm">{shift.date}</div>
                    <div className="font-medium">{shift.rate}</div>
                    <div className="inline-block px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      Open
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Pending Shifts */}
        <TabsContent value="pending" className="space-y-4">
          {bookings.pending.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{booking.role}</h3>
                      <div className="text-sm text-muted-foreground">
                        ID: {booking.id}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {booking.startTime} - {booking.endTime}
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        {booking.shiftType}
                      </div>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Worker Details</h4>
                      <div className="space-y-1 text-sm">
                        <div>
                          Name: {booking.worker?.name || "Not assigned"}
                        </div>
                        <div>Rating: {booking.worker?.rating || "N/A"}</div>
                        <div>
                          Completed Shifts:{" "}
                          {booking.worker?.completedShifts || 0}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReject(booking)}
                      >
                        Reject
                      </Button>
                      <Button size="sm" onClick={() => handleApprove(booking)}>
                        Approve
                      </Button>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="text-sm">{booking.date}</div>
                    <div className="font-medium">{booking.rate}</div>
                    <div className="inline-block px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                      Pending Approval
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Approved Shifts */}
        <TabsContent value="approved" className="space-y-4">
          {bookings.approved.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{booking.role}</h3>
                      <div className="text-sm text-muted-foreground">
                        ID: {booking.id}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {booking.startTime} - {booking.endTime}
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        {booking.shiftType}
                      </div>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Worker Details</h4>
                      <div className="space-y-1 text-sm">
                        <div>
                          Name: {booking.worker?.name || "Not assigned"}
                        </div>
                        <div>Rating: {booking.worker?.rating || "N/A"}</div>
                        <div>
                          Completed Shifts:{" "}
                          {booking.worker?.completedShifts || 0}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="text-sm">{booking.date}</div>
                    <div className="font-medium">{booking.rate}</div>
                    <div className="inline-block px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Approved
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Cancelled Shifts */}
        <TabsContent value="cancelled" className="space-y-4">
          {bookings.cancelled.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="grid grid-cols-[2fr,1fr] gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{booking.role}</h3>
                      <div className="text-sm text-muted-foreground">
                        ID: {booking.id}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {booking.startTime} - {booking.endTime}
                      </div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        {booking.shiftType}
                      </div>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Worker Details</h4>
                      <div className="space-y-1 text-sm">
                        <div>
                          Name: {booking.worker?.name || "Not assigned"}
                        </div>
                        <div>Rating: {booking.worker?.rating || "N/A"}</div>
                        <div>
                          Completed Shifts:{" "}
                          {booking.worker?.completedShifts || 0}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right space-y-2">
                    <div className="text-sm">{booking.date}</div>
                    <div className="font-medium">{booking.rate}</div>
                    <div className="inline-block px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                      {booking.status}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
