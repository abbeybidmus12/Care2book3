import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CareHubSignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Sign in with Supabase auth
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      // Fetch care hub details
      const { data: careHubData, error: careHubError } = await supabase
        .from<{ email: string }>("carehub_reg")
        .select("*")
        .eq("email" as keyof { email: string }, formData.email)
        .single();

      if (careHubError) throw careHubError;

      // No need to store in localStorage anymore as we use the session context

      navigate("/care-hub");
    } catch (error) {
      console.error("Error:", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Care Hub Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Care Hub Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your care hub email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Sign In to Care Hub
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
