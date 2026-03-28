import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { User, Mail, Lock, Github } from "lucide-react";
import toast from "react-hot-toast";
import type RegisterData from "@/models/RegisterData";
import { registerUser } from "@/services/AuthService";  
import { useNavigate } from "react-router";



export default function SignupPage() {

  //type RegisterData is created in models and imported
  const [data, setData] = useState<RegisterData>({
    name: "",
    email: "",
    password: ""
  })

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // navigates to login after submition
  const navigate = useNavigate();

  // handling form change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData((value) => ({
      ...value,
      [event.target.name]: event.target.value,
    }))
  }

  // handling form submit
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   

    // validation 
    // can also use required in input field
    if(data.name.trim() === ""){
      toast.error("Name is required");
      return;
    }
    if(data.email.trim() === ""){
      toast.error("Email is required");
      return;
    }
    if(data.password.trim() === ""){
      toast.error("Password is required");
      return;
    }

    try {

      const result = await registerUser(data);
      toast.success("User registered successfully");
      
      // clears the fields
      setData({
        name: "",
        email: "",
        password: ""
      });
      // navigate: login
      navigate("/login");
      
    } catch (error) {
      toast.error("error in registering the user");
    }

    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="w-[400px] bg-card border border-border shadow-xl">
          <CardContent className="p-6">

            <form onSubmit={handleFormSubmit}>

            {/* Heading */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Create Account
              </h1>
              <p className="text-muted-foreground text-sm mt-2">
                Join the futuristic authentication system
              </p>
            </div>

            {/* Name */}
            <div className="mb-4 relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="text"
                placeholder="Full Name"
                name="name"
                value={data.name}
                onChange={handleInputChange}
                className="pl-10 h-11"
                // required
              />
            </div>

            {/* Email */}
            <div className="mb-4 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="email"
                placeholder="Email"
                name="email"
                value={data.email}
                onChange={handleInputChange}
                className="pl-10 h-11"
                // required
              />
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={handleInputChange}
                className="pl-10 h-11"
                // required
              />
            </div>

            {/* Signup Button */}
            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 h-11">
              {loading ? "Signing up..." : "Sign Up"}
            </Button>

            </form>

            {/* Divider */}
            <div className="flex items-center gap-2 my-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">OR</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col gap-3">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2 h-11">
                Continue with Google
              </Button>

              <Button variant="outline" className="w-full flex items-center justify-center gap-2 h-11">
                <Github size={18} />
                Continue with GitHub
              </Button>
            </div>

          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
