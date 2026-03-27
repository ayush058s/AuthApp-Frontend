import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Mail, Lock, Github } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log({ email, password });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="w-[400px] bg-card border border-border shadow-xl">
          <CardContent className="p-6">

            {/* Heading */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-muted-foreground text-sm mt-2">
                Login to your futuristic auth system
              </p>
            </div>

            {/* Email */}
            <div className="mb-4 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            {/* Password */}
            <div className="mb-4 relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            {/* Login Button */}
            <Button
              onClick={handleLogin}
              className="w-full bg-primary hover:bg-primary/90 h-11"
            >
              Login
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-2 my-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">OR</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full h-11 flex items-center justify-center"
              >
                Continue with Google
              </Button>

              <Button
                variant="outline"
                className="w-full h-11 flex items-center justify-center gap-2"
              >
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