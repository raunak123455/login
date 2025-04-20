import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/login.css";

// Zod schema for form validation
const loginSchema = z.object({
  uid: z.string().min(1, "UID is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Type inference from Zod schema
type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  // React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // React Query mutation
  const loginMutation = useMutation({
    mutationFn: (data: LoginFormData) =>
      axios.post("http://localhost:5000/api/auth/login", data),
    onSuccess: (response) => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        reset(); // Clear form
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-box">
        <h1 className="login-title">Welcome Back</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            {/* <label htmlFor="uid">UID</label> */}
            <input
              type="text"
              id="uid"
              placeholder="UID"
              {...register("uid")}
            />
            {errors.uid && (
              <div className="error-message">{errors.uid.message}</div>
            )}
          </div>
          <div className="form-group">
            {/* <label htmlFor="password">Password</label> */}
            <input
              type="password"
              id="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <div className="error-message">{errors.password.message}</div>
            )}
          </div>
          <button
            type="submit"
            className="login-button"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? "Logging in..." : "Log In"}
          </button>
        </form>
        {/* <div className="forgot-password">
          <a href="#">Forgot your password?</a>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
