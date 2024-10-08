"use client";

import { useRouter } from "next/navigation";
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
import { adminLoginConfig } from "@/data/fromData";
import { adminLogin } from "@/actions/auth";

const schema = z.object({
  userName: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  // admin_security_key: z.string().min(8, "Security Key is required"),
});

const LoginPage = () => {
  const login = useAuthStore((state) => state.login);
  const setLoginMode = useAuthStore((state) => state.setLoginMode);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();

  async function onSubmit(payload: z.infer<typeof schema>) {
    setLoginMode("admin");
    login(payload.userName, "admin");
    const response = await adminLogin(payload);
    if(response.status === 200) router.push("/admin");
    else console.log("Invalid Credentials")
  }

  const render_form = () => {
    return (
      <div className="flex flex-col items-center w-full justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 flex flex-col justify-center w-full"
          >
            {adminLoginConfig.map((fieldConfig) => (
              <FormField
                key={fieldConfig.id}
                control={form.control}
                name={
                  fieldConfig.id as "userName" | "password"
                  // | "admin_security_key"
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
        <h1 className="heading">Hello, Admin</h1>
        <p className="sub-heading">Please enter your details to sign in</p>
      </div>
      <div className="w-full md:max-w-sm">{render_form()}</div>
    </div>
  );
};

export default LoginPage;
