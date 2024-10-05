import React from "react";
import shield from "@/lib/images/saveguard.webp";
import ehr from "@/lib/images/ehr.svg";
import realtime from "@/lib/images/realtimedata.svg";
import mobile from "@/lib/images/mobileAccess.webp";
import Image from "next/image";

const Solutions = () => {
  return (
    <div
      id="solutions"
      className="flex flex-col items-center justify-center w-full gap-16 px-8 pt-20"
    >
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="flex flex-col md:flex-row gap-y-5 justify-between items-center"
      >
        <Image
          src={shield}
          alt="Image"
          className="w-[80%] pointer-events-none select-none  md:px-4 lg:px-20 md:w-[45%]"
        />
        <div className="md:px-4 lg:px-16">
          <h2 className="text-center font-bold text-2xl mb-3 lg:mb-10 text-[#555] md:text-3xl lg:text-5xl leading-6 ">
            Safeguarding Patient Information
          </h2>
          <p className="text-lg  font-semibold text-center text-[#555]">
            We understand the critical importance of protecting patient data. As
            a trusted Patient Data Management System, we prioritize data
            security and privacy. We are committed to maintaining the highest
            standards of data protection to ensure the confidentiality,
            integrity, and availability of patient information.
          </p>
        </div>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="flex flex-col-reverse md:flex-row gap-y-5 justify-between items-center"
      >
        <div className="md:px-4 lg:px-16">
          <h2 className="text-center font-bold text-2xl mb-3 lg:mb-10 text-[#555] md:text-3xl lg:text-5xl leading-6 ">
            Electronic Health Records&nbsp;(EHR)
          </h2>
          <p className="text-lg  font-semibold text-center text-[#555]">
            We offer a comprehensive Electronic Health Records (EHR) solution
            that allows healthcare professionals to maintain accurate and
            detailed patient records. This feature streamlines patient care,
            reduces errors, and enhances overall patient management.
          </p>
        </div>
        <Image
          src={ehr}
          alt="Image"
          className="w-[80%] pointer-events-none select-none  md:w-[40%] md:px-4 lg:px-20"
        />
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="flex flex-col md:flex-row gap-y-5 justify-between items-center"
      >
        <Image
          src={realtime}
          alt="Image"
          className="w-[80%] pointer-events-none select-none md:w-[40%] md:px-4 lg:px-20"
        />
        <div className="md:px-4 lg:px-16">
          <h2 className="text-center font-bold text-2xl mb-3 lg:mb-10 text-[#555] md:text-3xl lg:text-5xl leading-6 ">
            Real-time Data Access
          </h2>
          <p className="text-lg  lg:px-5 font-semibold text-center text-[#555]">
            Our platform offers real-time access to patient data, empowering
            healthcare providers with the latest information at their
            fingertips. This leads to faster decision-making and more
            personalized patient care.
          </p>
        </div>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        className="flex flex-col-reverse md:flex-row gap-y-5 justify-between items-center"
      >
        <div className="md:px-4 lg:px-16">
          <h2 className="text-center font-bold text-2xl mb-3 lg:mb-10 text-[#555] md:text-3xl lg:text-5xl leading-6 ">
            Mobile Accessibility
          </h2>
          <p className="text-lg lg:px-5 font-semibold text-center text-[#555]">
            Our solutions are accessible on mobile devices, allowing healthcare
            professionals to manage patient data on the go. This flexibility
            ensures efficient patient care even outside the office.
          </p>
        </div>
        <Image
          src={mobile}
          alt="Image"
          className="w-[80%] pointer-events-none select-none  md:w-[40%] md:px-4 lg:px-20"
        />
      </div>
    </div>
  );
};

export default Solutions;
