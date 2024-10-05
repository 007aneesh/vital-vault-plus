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
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/useAuthStore";
import { PatientFormFields, EmployeeFormFields } from "@/@types/auth";
import { patientLoginConfig, employeeLoginConfig } from "@/data/fromData";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";

const patientSchema = z.object({
  aadhar_card: z
    .string()
    .length(12, "Aadhar must be 12 digits")
    .transform((val) => parseInt(val, 10)),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const employeeSchema = z.object({
  username: z.string().min(1, "Hospital ID is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const LoginPage = () => {
  const router = useRouter();
  const loginModeChange = useAuthStore((state) => state.login);
  const loginMode = useAuthStore((state) => state.loginMode);
  const setLoginMode = useAuthStore((state) => state.setLoginMode);

  const schema = loginMode === "patient" ? patientSchema : employeeSchema;
  const formConfig =
    loginMode === "patient" ? patientLoginConfig : employeeLoginConfig;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  function onSubmit(values: z.infer<typeof schema>) {
    if (loginMode === "employee") {
      const response = login(values, loginMode)
      loginModeChange(values, "employee");
      console.log(response)
      router.push("/eadmin");
    } else {
      const response = login(values, "patient");
      loginModeChange(values, loginMode);
      console.log(response)
      router.push("/user");
    }
    console.log(values);
  }

  const handleToggleLoginMode = () => {
    setLoginMode(loginMode === "patient" ? "employee" : "patient");
  };

  const render_form = () => {
    return (
      <div className="flex flex-col items-center w-full justify-center">
        <Form {...form}>
          <div className="flex items-center w-full justify-around mb-7">
            <h4>Employee Mode</h4>
            <FormControl>
              <Switch
                checked={loginMode === "patient"}
                onCheckedChange={handleToggleLoginMode}
              />
            </FormControl>
            <h4>Patient Mode</h4>
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 flex flex-col justify-center w-full"
          >
            {formConfig.map((fieldConfig) => (
              <FormField
                key={fieldConfig.id}
                control={form.control}
                name={
                  fieldConfig.id as keyof (PatientFormFields &
                    EmployeeFormFields)
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
            <Button
              type="submit"
              variant={"secondary"}
              className="border-border"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center ">
      <div className="py-8 flex flex-col items-center">
        <h1 className="heading">Welcome back</h1>
        <p className="sub-heading">Please enter your details to sign in</p>
      </div>
      <div className="w-full md:max-w-sm">{render_form()}</div>
    </div>
  );
};

export default LoginPage;
