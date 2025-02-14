import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Users, Phone, Mail } from "lucide-react";

export default function CareHubs() {
  return (
    <div className="p-6 space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Search Care Hubs</Label>
              <Input placeholder="Search by name or location" />
            </div>
            <div>
              <Label>Status</Label>
              <Input placeholder="Filter by status" />
            </div>
            <div>
              <Label>Service Type</Label>
              <Input placeholder="Filter by service type" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Care Hubs List */}
      <div className="space-y-4">
        {[
          {
            id: "CH001",
            name: "Sunrise Care Home",
            status: "Active",
            address: "123 Care Street, Manchester, M1 2AB",
            totalBeds: 50,
            occupiedBeds: 42,
            activeWorkers: 15,
            contact: {
              name: "Sarah Manager",
              phone: "+44 123 456 7890",
              email: "sarah@sunrisecare.com",
            },
            services: ["Nursing Care", "Dementia Care", "Respite Care"],
          },
        ].map((hub) => (
          <Card key={hub.id}>
            <CardContent className="p-6">
              <div className="grid grid-cols-[2fr,1fr] gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{hub.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        #{hub.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{hub.address}</span>
                    </div>
                  </div>

                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      <span>
                        {hub.occupiedBeds}/{hub.totalBeds} beds occupied
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{hub.activeWorkers} active workers</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {hub.services.map((service, index) => (
                      <Badge key={index} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="font-medium">Contact Information</div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {hub.contact.phone}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {hub.contact.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm">Manage Workers</Button>
                  </div>
                </div>

                <div className="text-right space-y-2">
                  <Badge
                    variant={hub.status === "Active" ? "default" : "secondary"}
                  >
                    {hub.status}
                  </Badge>
                  <div className="text-sm text-muted-foreground">
                    Contact: {hub.contact.name}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
