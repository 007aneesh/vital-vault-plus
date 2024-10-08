"use client";

import React, { useState } from "react";
import Logo from "@/lib/images/logo.webp";
import { IconMenu2 } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="fixed top-0 left-0 right-0  z-10 w-full bg-background">
      <nav className="flex justify-between items-center px-4 md:px-10 py-2">
        <Link href="/">
          <div className="flex items-center cursor-pointer">
            <Image src={Logo} alt="logo" className="w-12 md:w-16" />
            <h1 className="text-2xl font-mono font-bold">Vital Vault</h1>
          </div>
        </Link>
        <div className="flex items-center gap-5">
          <div
            className={`items-center gap-5 hidden md:flex font-semibold text-lg`}
          >
            <Link href="/about-us">
              <h1>About us</h1>
            </Link>
            <Link href="/#solutions">
              <h1>Solutions</h1>
            </Link>
            {true ? (
              false ? (
                <Button
                  onClick={() => router.push("/login")}
                  className="border-[#3555ac] rounded-md lg:text-base font-medium border-2 px-3 py-1 hover: bg-[#3555ac] transition transform ease-in-out duration-500 text-white hover:bg-transparent hover:text-[#3555ac]"
                >
                  Sign In
                </Button>
              ) : (
                <Button
                  onClick={() => router.push("/login")}
                  className="border-[#3555ac] rounded-md lg:text-base font-medium border-2 px-3 py-1 hover: bg-[#3555ac] transition transform ease-in-out duration-500 text-white hover:bg-transparent hover:text-[#3555ac]"
                >
                  Sign In
                </Button>
              )
            ) : (
              <Button
                onClick={() => router.push("/login")}
                className="border-[#3555ac] rounded-md lg:text-base font-medium border-2 px-3 py-1 hover: bg-[#3555ac] transition transform ease-in-out duration-500 text-white hover:bg-transparent hover:text-[#3555ac]"
              >
                Sign In
              </Button>
            )}
          </div>
          <div className="flex items-center relative">
            <Button
              variant={"link"}
              className="flex items-center justify-center md:hidden"
              onClick={toggleMenu}
            >
              <IconMenu2 className="text-3xl" />
            </Button>
            {showMenu && (
              <div className="absolute top-full right-0 w-auto gap-2 bg-white px-10 py-3 mt-1 shadow-2xl rounded-md">
                <Link href="/about-us">
                  <h1>About us</h1>
                </Link>
                <Link href="/#solutions">
                  <h1>Solutions</h1>
                </Link>

                <Button className="border-[#3555ac] rounded-md lg:text-base font-medium text-[0.9rem] mt-2 border-2 px-5 py-1 hover: bg-[#3555ac] transition transform ease-in-out duration-500 text-white hover:bg-transparent hover:text-[#3555ac]">
                  Sign In
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
