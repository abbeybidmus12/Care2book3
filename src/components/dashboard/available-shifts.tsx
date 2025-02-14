import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, ExternalLink, Clock, Building2, Banknote } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AvailableShifts() {
  const shifts = [
    {
      id: "SH123456",
      title: "Healthcare Assistant - Night Shift",
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
      type: "Night Shift",
      uniformRequired: true,
      additionalRequirements: ["Meds Trained", "Manual Handling"],
      requiresApproval: true,
    },
    {
      id: "SH123457",
      title: "Registered Nurse - Day Shift",
      careHub: "Meadow View Care",
      date: "Wednesday, March 6, 2024",
      time: "7:00 AM - 7:00 PM",
      rate: "£25/hr",
      address: {
        line1: "45 Meadow Lane",
        line2: "Care Village",
        city: "Liverpool",
        postcode: "L3 5XY",
      },
      mapUrl: "https://maps.google.com/?q=45+Meadow+Lane+Liverpool+L3+5XY",
      type: "Day Shift",
      uniformRequired: false,
      additionalRequirements: ["First Aid"],
      requiresApproval: false,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search Shifts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Location</Label>
              <Input placeholder="Enter location or postcode" />
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
                  <SelectItem value="weekend">Weekend</SelectItem>
                  <SelectItem value="bank-holiday">Bank Holiday</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Requirements</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select requirements" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meds">Meds Trained</SelectItem>
                  <SelectItem value="manual">Manual Handling</SelectItem>
                  <SelectItem value="first-aid">First Aid</SelectItem>
                </SelectContent>
              </Select>
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
                {/* Left Column */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{shift.title}</h3>
                      <span className="text-sm text-muted-foreground">
                        #{shift.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span>{shift.careHub}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {shift.address.line1},
                      {shift.address.line2 && ` ${shift.address.line2},`}
                      {` ${shift.address.city}, ${shift.address.postcode}`}
                    </span>
                    <a
                      href={shift.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-secondary rounded-full text-xs">
                      {shift.type}
                    </span>
                    {shift.uniformRequired && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Uniform Required
                      </span>
                    )}
                    {shift.additionalRequirements.map((req, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4 text-right">
                  <div className="space-y-1">
                    <div className="flex items-center justify-end gap-2 text-lg font-semibold">
                      <Banknote className="h-5 w-5" />
                      {shift.rate}
                    </div>
                    <div className="flex items-center justify-end gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <div className="text-sm">
                        <div>{shift.date}</div>
                        <div>{shift.time}</div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full">Book Shift</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
