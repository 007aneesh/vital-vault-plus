"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <div
        data-aos="zoom-in-right"
        className="flex flex-col justify-center p-8 pt-24 lg:px-28 items-center gap-y-5 "
      >
        <div className="w-full flex flex-col items-center">
          <h2 className="text-base">About Vital Vault</h2>
          <h1 className="font-bold text-xl lg:text-2xl pt-1 pb-2 md:pb-3">
            Our <span className="text-[#3555ac]">Mission</span>
          </h1>
          <p className="max-w-2xl text-xs md:text-sm font-medium text-center">
            At Vital Vault, our mission is to revolutionize healthcare by
            providing cutting-edge solutions for patient data management. We are
            committed to ensuring that patient data is not only efficiently
            organized but also kept secure and accessible when needed. Our
            dedication to this mission is driven by the following core
            principles - Patient-Centric Care, Data Security Above All,
            Empowering Patients, Growth and Adaptation and Support and
            Collaboration.
          </p>
        </div>
      </div>
      <div
        data-aos="zoom-in-left"
        className="flex flex-col items-center justify-center p-8 lg:px-28 gap-y-5 lg:-mt-10 mb-3"
      >
        <div className="w-full lg:mt-10 flex flex-col items-center justify-center">
          <h2 className="text-base">Why choose Vital Vault</h2>
          <h1 className="font-bold text-xl lg:text-2xl pt-1 pb-2 md:pb-3">
            Our <span className="text-[#3555ac]">Vision and Goal</span>
          </h1>
          <p className="max-w-2xl text-xs md:text-sm font-medium text-center">
            At Vital Vault, our vision is to be the driving force behind a
            healthcare revolution where data becomes a catalyst for improved
            patient outcomes, enhanced care quality, and streamlined processes.
            We envision a healthcare ecosystem where data is seamlessly
            harnessed, securely managed, and used intelligently for the
            betterment of all stakeholders. Vital Vault&apos;s primary goal is
            to set new standards in patient data management.
          </p>
        </div>
      </div>

      <div className="flex flex-col p-8 lg:px-28 w-full items-center justify-center">
        <h1 className="font-bold md:text-xl pt-1 pb-2 md:pb-3 text-center">
          Welcome to the future of healthcare.
        </h1>
        <p className="text-center max-w-xl text-xs md:text-sm">
          Where you&apos;re in control of your health data and well-being. Are
          you ready to experience a new era of personalized care and seamless
          management of your health records? Sign up today and embark on a
          journey of empowerment, security, and excellence in healthcare.
        </p>
        <Link href="/register">
          <button className="border-2 px-3 py-1 my-4 md:ml-4 md:mr-4 text-white hover:bg-transparent hover:text-black bg-[#3555ac] hover:scale-110 transition duration-300 ease-in-out border-[#3555ac] hover:border-black text-lg font-sans rounded-xl">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
