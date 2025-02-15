import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Building2, Banknote } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Shift {
  id: string;
  shift_id: string;
  role: string;
  care_hub: string;
  date: string;
  start_time: string;
  end_time: string;
  hourly_rate: number;
  break_duration: number;
  shift_type: string;
  status: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  county: string;
  postcode: string;
}

export default function AvailableShifts() {
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [notes, setNotes] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [shifts, setShifts] = useState<Shift[]>([]);

  useEffect(() => {
    // Check if user is authenticated and has worker details
    const workerDetails = JSON.parse(
      localStorage.getItem("workerDetails") || "{}",
    );
    if (!workerDetails.id) {
      console.error("No worker details found");
      return;
    }

    const loadShifts = async () => {
      try {
        const { data, error } = await supabase
          .from("shifts")
          .select(
            `
            id,
            shift_id,
            role,
            care_hub,
            date,
            start_time,
            end_time,
            break_duration,
            shift_type,
            hourly_rate,
            shift_bonus,
            preferred_worker_only,
            uniform_required,
            special_instructions,
            emergency_contact,
            qualifications,
            experience,
            status,
            created_at,
            updated_at,
            address_line1,
            address_line2,
            city,
            county,
            postcode
          `,
          )
          .eq("status", "Open")
          .order("created_at", { ascending: false });

        if (error) throw error;
        if (!data) throw new Error("No data returned");
        setShifts(data);
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

  const handleBookShift = async (shift: Shift) => {
    try {
      // Get worker details
      const workerDetails = JSON.parse(
        localStorage.getItem("workerDetails") || "{}",
      );

      // Create booking record
      const { error: bookingError } = await supabase
        .from("shift_bookings")
        .insert([
          {
            shift_id: shift.id,
            worker_id: workerDetails.id,
            notes: notes,
            status: "Pending",
          },
        ]);

      if (bookingError) throw bookingError;

      // Update shift status
      const { error: shiftError } = await supabase
        .from("shifts")
        .update({ status: "Pending" })
        .eq("id", shift.id);

      if (shiftError) throw shiftError;

      setShifts(shifts.filter((s) => s.shift_id !== shift.shift_id));
      setShowBookingModal(false);
      setNotes("");
      setSelectedShift(null);

      alert("Shift booked successfully!");
    } catch (error) {
      console.error("Error booking shift:", error);
      alert("Error booking shift");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Location</Label>
              <Input placeholder="Search by location" />
            </div>
            <div>
              <Label>Role</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Healthcare Assistant">
                    Healthcare Assistant
                  </SelectItem>
                  <SelectItem value="Registered Nurse">
                    Registered Nurse
                  </SelectItem>
                  <SelectItem value="Support Worker">Support Worker</SelectItem>
                  <SelectItem value="Senior Carer">Senior Carer</SelectItem>
                  <SelectItem value="Specialist Nurse">
                    Specialist Nurse
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Shift Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select shift type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day Shift</SelectItem>
                  <SelectItem value="night">Night Shift</SelectItem>
                  <SelectItem value="long-day">Long Day</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Date</Label>
              <Input type="date" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Shifts List */}
      <div className="space-y-4">
        {shifts.map((shift) => (
          <Card key={shift.id}>
            <CardContent className="p-6">
              <div className="grid grid-cols-[2fr,1fr] gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{shift.role}</h3>
                    <div className="text-sm text-muted-foreground">
                      {shift.care_hub}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {shift.address_line1}
                      {shift.address_line2 && `, ${shift.address_line2}`}
                      {`, ${shift.city}`}
                      {`, ${shift.county}`}
                      {`, ${shift.postcode}`}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Shift ID: {shift.shift_id}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {shift.start_time} - {shift.end_time}
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {shift.shift_type}
                    </div>
                    <div className="flex items-center gap-2">
                      <Banknote className="h-4 w-4" />£{shift.hourly_rate}/hr
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedShift(shift);
                        setShowBookingModal(true);
                      }}
                    >
                      Book Shift
                    </Button>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <div className="text-sm">{shift.date}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Booking Modal */}
      <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
        <DialogContent>
          {selectedShift && (
            <>
              <DialogHeader>
                <DialogTitle>Book Shift</DialogTitle>
                <DialogDescription>
                  Please review the shift details and confirm your booking.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label>Role</Label>
                    <div className="font-medium">{selectedShift.role}</div>
                  </div>
                  <div>
                    <Label>Care Hub</Label>
                    <div className="font-medium">{selectedShift.care_hub}</div>
                  </div>
                  <div>
                    <Label>Date</Label>
                    <div className="font-medium">{selectedShift.date}</div>
                  </div>
                  <div>
                    <Label>Time</Label>
                    <div className="font-medium">
                      {selectedShift.start_time} - {selectedShift.end_time}
                    </div>
                  </div>
                  <div>
                    <Label>Rate</Label>
                    <div className="font-medium">
                      £{selectedShift.hourly_rate}/hr
                    </div>
                  </div>
                  <div>
                    <Label>Break Duration</Label>
                    <div className="font-medium">
                      {selectedShift.break_duration} minutes
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Additional Notes</Label>
                  <Textarea
                    placeholder="Add any notes or requirements"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowBookingModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={() => handleBookShift(selectedShift)}>
                  Confirm Booking
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
