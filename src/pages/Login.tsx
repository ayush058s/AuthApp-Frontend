import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Mail, Lock, Github, AlertCircleIcon } from "lucide-react";
import type { LoginData } from "@/models/LoginData";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import useAuth from "@/auth/store";

export default function LoginPage() {
  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const navigate = useNavigate();


  const login = useAuth((state) => state.login);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => {
      return {
        ...prev, // here prev is the old state of data object 
        [event.target.name]: event.target.value, // here update and return the updated one
      };
    });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    

    if (data.email.trim() === "") {
      toast.error("Email is required");
      return;
    }
    if (data.password.trim() === "") {
      toast.error("Password is required");
      return;
    }

    try {
      setLoading(true);
      // const userInfo = await loginUser(data);
      // toast.success("User logged in successfully"); 
      // console.log(userInfo);

      // login function: useAuth
      await login(data);

      setData({
        email: "",
        password: "",
      });
      navigate("/dashboard");
    } catch (error: any) {
      setError(error);
      // toast.error("Error in login");
      if(error?.status == 400){
        setError(error);
      }else{
        setError(error);
      }
    } finally{
      setLoading(false);
    }
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
<form onSubmit={handleFormSubmit}>
            
              {/* Heading */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-muted-foreground text-sm mt-2">
                Login to your futuristic auth app
              </p>
            </div>

            

            {/*error section*/}
            {error &&(<div className="mb-4">
              <Alert variant={"destructive"}>
              <AlertCircleIcon/>
              <AlertTitle>{error?.response   ?   error?.response?.data?.message   :   error?.message}</AlertTitle>
              </Alert>
            </div>)
            }
            

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
              />
            </div>

            
            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 h-11 cursor-pointer"
              
            >
              {/*if loading else it will show login*/}
              {loading ? <>
              <Spinner/> Logging in...</> 
                 : "Login"}
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
            </form>

          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
