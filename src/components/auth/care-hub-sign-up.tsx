import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CareHubSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    careHomeName: "",
    cqcNumber: "",
    businessType: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    county: "",
    postcode: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // First create auth user
      const { error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      // Then save care hub details
      const { error: dbError } = await supabase.from("carehub_reg").insert([
        {
          care_home_name: formData.careHomeName,
          cqc_number: formData.cqcNumber,
          business_type: formData.businessType,
          email: formData.email,
          phone: formData.phone,
          password_hash: formData.password, // Note: In a real app, you'd hash this
          address_line1: formData.addressLine1,
          address_line2: formData.addressLine2,
          city: formData.city,
          county: formData.county,
          postcode: formData.postcode,
        },
      ]);

      if (dbError) throw dbError;

      // Sign in immediately after registration
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) throw signInError;
      navigate("/care-hub/sign-in");
    } catch (error) {
      console.error("Error:", error);
      alert("Error during registration");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Care Hub Registration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="careHomeName">Care Home Name</Label>
              <Input
                id="careHomeName"
                placeholder="Enter care home name"
                value={formData.careHomeName}
                onChange={(e) =>
                  setFormData({ ...formData, careHomeName: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cqcNumber">CQC Number</Label>
              <Input
                id="cqcNumber"
                placeholder="Enter CQC registration number"
                value={formData.cqcNumber}
                onChange={(e) =>
                  setFormData({ ...formData, cqcNumber: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessType">Business Type</Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, businessType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="limited-company">
                    Limited Company
                  </SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="sole-trader">Sole Trader</SelectItem>
                  <SelectItem value="charity">Charity/Non-profit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Business Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter business email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Contact Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter contact number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="addressLine1">Address Line 1</Label>
              <Input
                id="addressLine1"
                placeholder="Enter address line 1"
                value={formData.addressLine1}
                onChange={(e) =>
                  setFormData({ ...formData, addressLine1: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="addressLine2">Address Line 2 (Optional)</Label>
              <Input
                id="addressLine2"
                placeholder="Enter address line 2"
                value={formData.addressLine2}
                onChange={(e) =>
                  setFormData({ ...formData, addressLine2: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="county">County</Label>
              <Input
                id="county"
                placeholder="Enter county"
                value={formData.county}
                onChange={(e) =>
                  setFormData({ ...formData, county: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postcode">Postcode</Label>
              <Input
                id="postcode"
                placeholder="Enter postcode"
                value={formData.postcode}
                onChange={(e) =>
                  setFormData({ ...formData, postcode: e.target.value })
                }
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Register Care Hub
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0"
                onClick={() => navigate("/care-hub/sign-in")}
              >
                Sign in
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
