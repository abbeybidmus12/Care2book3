import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { FC } from "react";

interface BookingCardProps {
  booking: any;
  status: "pending" | "upcoming" | "past" | "canceled";
}

const BookingCard: FC<BookingCardProps> = ({ booking, status }) => (
  <Card key={booking.bookingId || booking.id}>
    <CardContent className="p-6">
      <div className="grid grid-cols-[2fr,1fr] gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">{booking.role}</h3>
            <div className="text-sm text-muted-foreground">
              {booking.careHub}
            </div>
            {/* Display uniform required label if true */}
            {booking.shift?.uniform_required && (
              <div className="mt-2 inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                Uniform Required
              </div>
            )}
            {status === "pending" && booking.shift && (
              <div className="text-sm text-muted-foreground mt-2">
                <p>{booking.shift.address_line1}</p>
                {booking.shift.address_line2 && <p>{booking.shift.address_line2}</p>}
                <p>{booking.shift.city}</p>
                <p>{booking.shift.postcode}</p>
              </div>
            )}
            <div className="text-sm text-muted-foreground">
              Booking ID: {booking.bookingId || booking.id}
            </div>
            {booking.shiftId && (
              <div className="text-sm text-muted-foreground">
                Shift ID: {booking.shiftId}
              </div>
            )}
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

          {status === "pending" && (
            <Button variant="destructive" size="sm">
              Cancel Booking
            </Button>
          )}
        </div>

        <div className="text-right space-y-2">
          <div className="text-sm">{booking.date}</div>
          <div
            className={`inline-block px-2 py-1 rounded-full text-xs ${
              status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : status === "upcoming"
                  ? "bg-green-100 text-green-800"
                  : status === "past"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-red-100 text-red-800"
            }`}
          >
            {booking.status}
          </div>
          <div className="text-sm text-muted-foreground">
            {status === "pending" &&
              `Booked at: ${new Date(booking.bookedAt).toLocaleString()}`}
            {status === "upcoming" &&
              booking.approvedAt &&
              `Approved at: ${new Date(booking.approvedAt).toLocaleString()}`}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MapPin,
  ExternalLink,
  Clock,
  Building2,
  Download,
  AlertCircle,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MyBookings() {
  const [savedBookings, setSavedBookings] = useState([]);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const workerDetails = JSON.parse(
          localStorage.getItem("workerDetails") || "{}",
        );

        const { data: bookings, error } = await supabase
          .from("shift_bookings")
          .select(
            `
            *,
            shift:shifts(*)
          `,
          )
          .eq("worker_id", workerDetails.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        // Transform the data to match the expected format
        const transformedBookings = bookings.map((booking) => ({
          id: booking.id,
          bookingId: booking.id,
          shiftId: booking.shift.id,
          role: booking.shift.role,
          careHub: booking.shift.care_hub,
          date: booking.shift.date,
          startTime: booking.shift.start_time,
          endTime: booking.shift.end_time,
          shiftType: booking.shift.shift_type,
          status: booking.status,
          bookedAt: booking.created_at,
          shift: booking.shift, // Include full shift object for additional properties
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

  // Static example data structure
  const staticBookings = {
    pending: [
      {
        id: "BK125",
        title: "Support Worker - Day Shift",
        careHub: "Sunrise Care Home",
        date: "Thursday, March 7, 2024",
        time: "7:00 AM - 7:00 PM",
        rate: "£15/hr",
        address: {
          line1: "123 Sunrise Way",
          line2: "Meadowbrook Estate",
          city: "Manchester",
          postcode: "M1 2AB",
        },
        mapUrl: "https://maps.google.com/?q=123+Sunrise+Way+Manchester+M1+2AB",
        status: "Pending Approval",
        submittedAt: "2024-03-01 09:00",
      },
    ],
    upcoming: [
      {
        id: "BK123",
        title: "Support Worker - Night Shift",
        careHub: "Sunrise Care Home",
        date: "Tuesday, March 5, 2024",
        time: "8:00 PM - 8:00 AM",
        rate: "£15/hr",
        address: {
          line1: "123 Sunrise Way",
          line2: "Meadowbrook Estate",
          city: "Manchester",
          postcode: "M1 2AB",
        },
        mapUrl: "https://maps.google.com/?q=123+Sunrise+Way+Manchester+M1+2AB",
        status: "Confirmed",
        canCancel: true,
      },
    ],
    past: [
      {
        id: "BK120",
        title: "Support Worker - Day Shift",
        careHub: "Sunrise Care Home",
        date: "Monday, March 1, 2024",
        time: "7:00 AM - 7:00 PM",
        rate: "£15/hr",
        totalHours: 12,
        totalEarnings: "£180",
        rating: 5,
        timesheetStatus: "Approved",
        address: {
          line1: "123 Sunrise Way",
          city: "Manchester",
          postcode: "M1 2AB",
        },
        feedback: "Excellent work ethic and patient care",
      },
    ],
    canceled: [
      {
        id: "BK119",
        title: "Healthcare Assistant - Night Shift",
        careHub: "Meadow View Care",
        date: "Sunday, February 28, 2024",
        time: "8:00 PM - 8:00 AM",
        canceledBy: "Self",
        reason: "Personal emergency",
        policyImpact: "Late Cancellation Warning",
      },
    ],
  };

  // Combine saved bookings with static data structure
  const bookings: Record<"pending" | "upcoming" | "past" | "canceled", BookingCardProps["booking"][]> = {
    pending:
      savedBookings.length > 0
        ? savedBookings.filter((booking) => booking.status === "Pending")
        : staticBookings.pending,
    upcoming:
      savedBookings.length > 0
        ? savedBookings.filter((booking) =>
            ["Approved", "Confirmed"].includes(booking.status),
          )
        : staticBookings.upcoming,
    past:
      savedBookings.length > 0
        ? savedBookings.filter((booking) => booking.status === "Completed")
        : staticBookings.past,
    canceled:
      savedBookings.length > 0
        ? savedBookings.filter((booking) =>
            ["Rejected", "Cancelled"].includes(booking.status),
          )
        : staticBookings.canceled,
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Date Range</Label>
              <Input type="date" />
            </div>
            <div>
              <Label>Care Hub</Label>
              <Input placeholder="Search by care hub" />
            </div>
            <div>
              <Label>Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="canceled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {bookings.pending.map((booking) => (
            <BookingCard key={booking.id} booking={booking} status="pending" />
          ))}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {bookings.upcoming.map((booking) => (
            <BookingCard key={booking.id} booking={booking} status="upcoming" />
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {bookings.past.map((booking) => (
            <BookingCard key={booking.id} booking={booking} status="past" />
          ))}
        </TabsContent>

        <TabsContent value="canceled" className="space-y-4">
          {bookings.canceled.map((booking) => (
            <BookingCard key={booking.id} booking={booking} status="canceled" />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
