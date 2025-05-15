"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMenu, IoClose } from "react-icons/io5";
import autoInvoiceLogo from "@/assets/all-variations/4-removedbg-Croped.png";
import Nav from "./Nav";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="font-roboto w-full py-3 backdrop-blur-lg top-0 fixed z-40">
      <div className="flex items-center justify-between px-6 md:px-10 py-2">
      <Link href="/">
        <Image
          src={autoInvoiceLogo}
          alt="logo"
          width={200}
          priority
          className="z-50 object-cover transition-all duration-300"
        />
      </Link>

        <div className="hidden z-50 md:flex">
          <Nav />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 z-50 transition-transform duration-1000 ease p-2 focus:outline-none"
        >
          {isOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
        </button>
      </div>

      <div
        className={`absolute top-0 w-full overflow-hidden h-[100vh] bg-white md:hidden transition-transform duration-500 ease ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Nav mobileClose={() => setIsOpen(false)} />
      </div>
    </header>
  );
};

export default Navbar;