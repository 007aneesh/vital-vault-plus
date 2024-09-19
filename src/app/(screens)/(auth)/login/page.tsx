"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/useAuthStore";
import { PatientFormFields, EmployeeFormFields } from "@/@types/auth";
import { patientLoginConfig, employeeLoginConfig } from "@/data/fromData";

const patientSchema = z.object({
  aadhar_card: z
    .string()
    .length(12, "Aadhar must be 12 digits")
    .transform((val) => parseInt(val, 10)),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const employeeSchema = z.object({
  hospital_id: z.string().min(1, "Hospital ID is required"),
  employee_id: z.string().min(1, "Employee ID is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginPage = () => {
  const { loginMode } = useAuthStore() as { loginMode: "patient" | "employee" };
  const schema = loginMode === "patient" ? patientSchema : employeeSchema;
  const formConfig =
    loginMode === "patient" ? patientLoginConfig : employeeLoginConfig;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(values);
  }

  const render_form = () => {
    return (
      <div className="flex items-center w-full justify-center">

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 flex flex-col justify-center w-full">
          {formConfig.map((fieldConfig) => (
            <FormField
              key={fieldConfig.id}
              control={form.control}
              name={
                fieldConfig.id as keyof (PatientFormFields & EmployeeFormFields)
              }
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="">{fieldConfig.name}</FormLabel>
                  <FormControl>
                    <Input
                      type={fieldConfig.type}
                      className="bg-gray-200"
                      placeholder={fieldConfig.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" variant={"secondary"} className="border-border">
            Submit
          </Button>
        </form>
      </Form>
      </div>
    );
  };

  return (
    <div className="w-full flex-col items-center justify-center md:max-w-sm">
      <div className="py-8 flex flex-col items-center">
        <h1 className="heading">Welcome back</h1>
        <p className="sub-heading">Please enter your details to sign in</p>
      </div>
      {render_form()}
    </div>
  );
};

export default LoginPage;
