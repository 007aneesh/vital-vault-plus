/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMultiContext } from "@/context/multistep-form-context";
import { Button } from "./button";

interface MultiFormProps {
  form: any;
  steps: any;
  onSubmit: (values: any) => void;
}

export function MultiForm({ form, steps, onSubmit }: MultiFormProps) {
  const context = useMultiContext();
  if (!context) {
    throw new Error("MultiForm must be used within a MultiProvider");
  }
  const { step, nextStep, prevStep } = context;
  const CurrentStep = steps[step - 1];
  function handleSubmit(values: any) {
    console.log(values);
    if (step === steps.length) {
      onSubmit(values);
    } else {
      nextStep();
    }
  }
  return (
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 lg:relative lg:flex-1 w-full"
      >
        {CurrentStep && <CurrentStep />}
        <div className="flex w-full justify-between py-4 relative">
          <Button
            type="button"
            variant={"outline"}
            className={`${step === 1 ? "invisible" : ""} absolute left-0`}
            onClick={() => prevStep()}
          >
            Go Back
          </Button>
          <Button
            type="submit"
            variant={"secondary"}
            className="absolute right-0"
          >
            {step === steps.length ? "Confirm" : "Continue"}
          </Button>
        </div>
      </form>
  );
}
