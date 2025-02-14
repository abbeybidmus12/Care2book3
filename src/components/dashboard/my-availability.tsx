import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function MyAvailability() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedHours, setSelectedHours] = useState<string>("all-day");
  const [notes, setNotes] = useState<string>("");
  const [recurringAvailability, setRecurringAvailability] = useState({
    monday: { morning: false, afternoon: false, night: false },
    tuesday: { morning: false, afternoon: false, night: false },
    wednesday: { morning: false, afternoon: false, night: false },
    thursday: { morning: false, afternoon: false, night: false },
    friday: { morning: false, afternoon: false, night: false },
    saturday: { morning: false, afternoon: false, night: false },
    sunday: { morning: false, afternoon: false, night: false },
  });

  const updateAvailability = (day: string, shift: string, value: boolean) => {
    setRecurringAvailability((prev) => ({
      ...prev,
      [day]: { ...prev[day], [shift]: value },
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendar View */}
        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            {date && (
              <div className="space-y-4 pt-4">
                <div>
                  <Label>Availability for {date.toLocaleDateString()}</Label>
                  <Select
                    value={selectedHours}
                    onValueChange={setSelectedHours}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-day">Available All Day</SelectItem>
                      <SelectItem value="morning">
                        Morning (7AM - 3PM)
                      </SelectItem>
                      <SelectItem value="afternoon">
                        Afternoon (2PM - 10PM)
                      </SelectItem>
                      <SelectItem value="night">Night (9PM - 7AM)</SelectItem>
                      <SelectItem value="unavailable">Unavailable</SelectItem>
                      <SelectItem value="custom">Custom Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Notes</Label>
                  <Textarea
                    placeholder="Add any notes about your availability"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                <Button className="w-full">Save Availability</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recurring Availability */}
        <Card>
          <CardHeader>
            <CardTitle>Recurring Weekly Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(recurringAvailability).map(([day, shifts]) => (
                <div key={day} className="space-y-2">
                  <h3 className="font-medium capitalize">{day}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(shifts).map(([shift, value]) => (
                      <div
                        key={`${day}-${shift}`}
                        className="flex items-center space-x-2"
                      >
                        <Switch
                          id={`${day}-${shift}`}
                          checked={value}
                          onCheckedChange={(checked) =>
                            updateAvailability(day, shift, checked)
                          }
                        />
                        <Label
                          htmlFor={`${day}-${shift}`}
                          className="capitalize"
                        >
                          {shift}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <Button className="w-full">Save Recurring Schedule</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Availability Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notice Period</Label>
              <div className="text-sm text-muted-foreground">
                Minimum notice required for shift bookings
              </div>
            </div>
            <Select defaultValue="24h">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select notice period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12h">12 Hours</SelectItem>
                <SelectItem value="24h">24 Hours</SelectItem>
                <SelectItem value="48h">48 Hours</SelectItem>
                <SelectItem value="72h">72 Hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Maximum Weekly Hours</Label>
              <div className="text-sm text-muted-foreground">
                Set maximum working hours per week
              </div>
            </div>
            <Select defaultValue="40">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select max hours" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20">20 Hours</SelectItem>
                <SelectItem value="30">30 Hours</SelectItem>
                <SelectItem value="40">40 Hours</SelectItem>
                <SelectItem value="48">48 Hours</SelectItem>
                <SelectItem value="60">60 Hours</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-sync with Bookings</Label>
              <div className="text-sm text-muted-foreground">
                Automatically block booked shift times
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Shift Recommendations</Label>
              <div className="text-sm text-muted-foreground">
                Show only shifts matching my availability
              </div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Reset Changes</Button>
        <Button>Save All Changes</Button>
      </div>
    </div>
  );
}
