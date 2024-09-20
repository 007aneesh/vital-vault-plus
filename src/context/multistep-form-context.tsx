"use client";
import { createContext, useContext, useState } from "react";

type MultiContextType = {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
} | null;

const MultiContext = createContext<MultiContextType>(null);


export const MultiProvider = ({ children }: any) => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4)); // Adjust max step as needed
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1)); // Adjust min step as needed

  return (
    <MultiContext.Provider value={{ step, nextStep, prevStep }}>
      {children}
    </MultiContext.Provider>
  );
};

export const useMultiContext = () => useContext(MultiContext);
