"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="navbar  md:w-[70%] border border-t-0 z-20 mx-auto rounded-xl rounded-t-none">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="/logo.jpg"
            className="h-12 w-12 rounded-full"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl text-black font-semibold whitespace-nowrap ">
            HomePrice.AI
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-gray-100 focus:outline-none"
          aria-controls="navbar-default"
          aria-expanded={isOpen ? "true" : "false"}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${isOpen ? "block" : "hidden"} md:block w-full md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg bg-transparent text-black md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  ">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-black text-xl bg-transparent  hover:text-yellow-400 rounded md:bg-transparent  md:p-0 "
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/team"
                className="block py-2 px-3 text-black text-xl hover:text-yellow-400  rounded md:bg-transparent  md:p-0 "
                aria-current="page"
              >
                Team
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;