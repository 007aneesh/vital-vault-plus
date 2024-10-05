/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormFieldNames } from "@/@types/auth";
import { fieldConfigs } from "@/data/fromData";
import { registerUser } from "@/actions/auth";

const getDefaultValues = () => ({
  userName: "",
  email: "",
  contactNo: "",
  password: "",
  confirm_password: "",
  orgName: "",
  address: "",
  city: "",
  state: "",
  pinCode: "",
  planSelected: "",
});

const schema = z
  .object({
    userName: z.string().min(1, "Username is required"),
    email: z
      .string()
      .email("Invalid email")
      .min(1, "Organisation email is required"),
    contactNo: z.string().min(1, "Contact number is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .min(1, "Password is required"),
    confirm_password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .min(1, "Confirm password is required"),
    orgName: z.string().min(1, "Organisation name is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    pinCode: z.string().min(1, "Pin code is required"),
    planSelected: z.string().min(1, "Plan is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  });

const RegisterPage = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: getDefaultValues(),
  });

  const onSubmit = async (payload: any) => {
    try {
      const data = {
        ...payload,
        contactNo: Number(payload.contactNo),
        pinCode: Number(payload.pinCode),
      };
      const response = registerUser(data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const render_form = () => {
    return (
      <div className="flex flex-col md:grid grid-cols-2  gap-5 md:gap-x-16 items-center w-full justify-center">
        {fieldConfigs.map(({ name, label, placeholder, type }) => (
          <FormField
            key={name}
            control={form.control}
            name={name as FormFieldNames}
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel className={`flex items-center justify-between`}>
                    {label}
                    <FormMessage />
                  </FormLabel>

                  <Input type={type} placeholder={placeholder} {...field} />
                </FormItem>
              </>
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="py-8 flex flex-col items-center">
        <h1 className="heading">Ready to Manage Your Data?</h1>
      </div>
      <FormProvider {...form}>
        <form
          className="relative w-full flex flex-col gap-10 items-center justify-center md:max-w-[90%] lg:max-w-[70%]"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {render_form()}
          <Button
            type="submit"
            variant={"secondary"}
            className="min-w-[10rem] mt-4"
          >
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default RegisterPage;
