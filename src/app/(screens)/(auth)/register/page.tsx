/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { MultiForm } from "@/components/ui/multi-form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { MultiProvider } from "@/context/multistep-form-context";
import { zodResolver } from "@hookform/resolvers/zod";

type FormFieldNames =
  | "username"
  | "organisation_email"
  | "contact"
  | "password"
  | "confirm_password"
  | "organisation_name"
  | "registration_no"
  | "address"
  | "city"
  | "state"
  | "pin_code"
  | "plan"
  | "agree_terms";

const getDefaultValues = () => ({
  username: "",
  organisation_email: "",
  contact: "",
  password: "",
  confirm_password: "",
  organisation_name: "",
  registration_no: "",
  address: "",
  city: "",
  state: "",
  pin_code: "",
  plan: "",
  agree_terms: false,
});

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  organisation_email: z
    .string()
    .email("Invalid email")
    .min(1, "Organisation email is required"),
  contact: z.string().min(1, "Contact number is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .min(1, "Password is required"),
  confirm_password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .min(1, "Confirm password is required"),
  organisation_name: z.string().min(1, "Organisation name is required"),
  registration_no: z.string().min(1, "Registration number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  pin_code: z.string().min(1, "Pin code is required"),
  plan: z.string().min(1, "Plan is required"),
  agree_terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

const stepOneFields = [
  { name: "username", label: "Username", placeholder: "e.g. john_doe" },
  {
    name: "organisation_email",
    label: "Organisation Email",
    placeholder: "e.g. org@example.com",
  },
  {
    name: "contact",
    label: "Contact Number",
    placeholder: "e.g. +1 234 567 890",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
  },
  {
    name: "confirm_password",
    label: "Confirm Password",
    placeholder: "Confirm your password",
    type: "password",
  },
];

const stepTwoFields = [
  {
    name: "organisation_name",
    label: "Organisation Name",
    placeholder: "e.g. My Organisation",
  },
  {
    name: "registration_no",
    label: "Registration Number",
    placeholder: "e.g. 123456789",
  },
  { name: "address", label: "Address", placeholder: "e.g. 123 Main St" },
  { name: "city", label: "City", placeholder: "e.g. New York" },
  { name: "state", label: "State", placeholder: "e.g. NY" },
  { name: "pin_code", label: "Pin Code", placeholder: "e.g. 10001" },
];

const RegisterPage = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

  const StepOne = () => {
    return (
      <>
        {stepOneFields.map(({ name, label, placeholder, type = "text" }) => (
          <FormField
            key={name}
            control={form.control}
            name={name as FormFieldNames}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  {label}
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <Input
                    type={type}
                    placeholder={placeholder}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ))}
      </>
    );
  };

  const StepTwo = () => {
    return (
      <>
        {stepTwoFields.map(({ name, label, placeholder }) => (
          <FormField
            key={name}
            control={form.control}
            name={name as FormFieldNames}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between">
                  {label}
                  <FormMessage />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={placeholder}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        ))}
      </>
    );
  };

  const StepThree = () => {
    return (
      <>
        <FormField
          control={form.control}
          name="plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                Plan
                <FormMessage />
              </FormLabel>
              <FormControl>
                <Input placeholder="e.g. Basic, Premium" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </>
    );
  };

  const StepFour = () => {
    return (
      <>
        <FormField
          control={form.control}
          name="agree_terms"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                Agree to Terms and Conditions
                <FormMessage />
              </FormLabel>
              <FormControl>
                <Input
                  type="checkbox"
                  {...field}
                  value={field.value ? "true" : "false"}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </>
    );
  };

  const steps = [StepOne, StepTwo, StepThree, StepFour];

  const render_form = () => {
    return (
      <div className="flex items-center w-full justify-center md:max-w-sm">
        <MultiProvider>
          <MultiForm
            form={form}
            steps={steps}
            onSubmit={(values: any) => console.log("Final values:", values)}
          />
        </MultiProvider>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="py-8 flex flex-col items-center">
        <h1 className="heading">Ready to Manage Your Data?</h1>
      </div>
      <Form {...form}>{render_form()}</Form>
    </div>
  );
};

export default RegisterPage;
