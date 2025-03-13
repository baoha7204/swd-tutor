import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/hooks/useAuth";

type AuthFormProps = {
  mode: "login" | "register";
};

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" })
    .max(20, { message: "Password must be at most 20 characters" }),
  YOB: z
    .number()
    .min(1900, { message: "Year of birth must be greater than 1900" })
    .max(new Date().getFullYear(), { message: "Invalid year of birth" }),
  gender: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export function AuthenticationForm({ mode }: AuthFormProps) {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  );

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      YOB: currentYear - 20, // Default to 20 years ago
      gender: true, // Default to male
    },
  });

  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
      toast.success("Successfully logged in!");
      navigate("/");
    } catch (error: any) {
      const message =
        error.response?.data?.errors?.[0]?.message || "Login failed";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onRegisterSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      await register(
        data.name,
        data.email,
        data.password,
        data.YOB,
        data.gender
      );
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (error: any) {
      const message =
        error.response?.data?.errors?.[0]?.message || "Registration failed";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (mode === "login") {
    return (
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Enter your credentials to access your account
          </p>
        </div>
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onLoginSubmit)}
            className="space-y-4"
          >
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-[#2563EB] hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Sign In"}
            </Button>
          </form>
        </Form>
        <div className="text-center text-sm">
          <p className="text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#2563EB] hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Create an account
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Enter your information to get started
        </p>
      </div>
      <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
          className="space-y-4"
        >
          <FormField
            control={registerForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Create a password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="YOB"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year of Birth</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year of birth" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[200px]">
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={registerForm.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(value === "true")}
                    defaultValue={field.value.toString()}
                    className="flex space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="true" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Male
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="false" />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        Female
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-[#2563EB] hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
      </Form>
      <div className="text-center text-sm">
        <p className="text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-[#2563EB] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
