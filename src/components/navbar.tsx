"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User, LogOut } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCookie, deleteCookie } from "cookies-next"; // Import cookies-next for cookie handling
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [role, setRole] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if the user is logged in
  const [userName, setUserName] = useState<string | null>(null); // State to track the user's name
  const router = useRouter();
  const pathName = usePathname();
  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle logout: Clear the cookies and reload the page
  const handleLogout = () => {
    deleteCookie("authToken");
    deleteCookie("user_id");
    deleteCookie("user_role");
    deleteCookie("user_name");
    setIsLoggedIn(false);
    setUserName(null);
    setIsMenuOpen(false);
    router.push("/");
  };

  // Check for cookies to determine if the user is logged in

  useEffect(() => {
    const authToken = getCookie("authToken");
    const userNameFromCookie = getCookie("user_name");
    const role = getCookie("user_role");
    if (role) {
      setRole(role);
    }

    if (authToken && userNameFromCookie) {
      setIsLoggedIn(true);
      setUserName(userNameFromCookie as string);
    } else {
      setIsLoggedIn(false);
      setUserName(null);
    }
  }, [pathName]); // Re-run this effect whenever the route changes

  return (
    <nav className="fixed bg-transparent p-4 font-teachers w-screen z-[9999] ">
      <div className="container mx-auto flex items-start justify-between">
        <div className="flex lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Menu"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
        <div className="hidden lg:flex space-x-16 py-3 text-xl">
          {!isLoggedIn ? (
            <>
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-gray-900 relative group pb-2"
              >
                Log In
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gray-900 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </Link>
              <Link
                href="/auth/register"
                className="text-gray-700 hover:text-gray-900 relative group pb-2"
              >
                Sign Up
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gray-900 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-gray-900 relative group pb-2"
            >
              Logout
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gray-900 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
            </button>
          )}
          <Link
            href="/help"
            className="text-gray-700 hover:text-gray-900 relative group pb-2"
          >
            Help
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gray-900 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </Link>
          <Link
            href="/"
            className="text-gray-700 hover:text-gray-900 relative group pb-2"
          >
            Home
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gray-900 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </Link>
          {role === "admin" && (
            <Link
              href="/admin-dashboard"
              className="text-gray-700 hover:text-gray-900 relative group pb-2"
            >
              Admin Dashboard
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gray-900 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
            </Link>
          )}
              {role === "therapist" && (
            <Link
              href="/therapist-dashboard"
              className="text-gray-700 hover:text-gray-900 relative group pb-2"
            >
              Therapist Dashboard
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gray-900 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
            </Link>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 z-0"
                >
                  <Image
                    src="/profile.png"
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="text-xl p-2">{userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span className="">Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth/login">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Image
                  src="/profile.png"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-xl p-2">Guest</span>
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-48 h-full bg-gray-800 text-white p-5 flex flex-col items-center transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Button
          variant="ghost"
          size="icon"
          aria-label="Close Menu"
          onClick={toggleMenu}
          className="self-end mb-4"
        >
          <X className="h-6 w-6" />
        </Button>
        <div className="flex flex-col items-center justify-center w-full h-full gap-10">
          {!isLoggedIn ? (
            <>
              <Link
                href="/auth/login"
                className="text-xl my-2 relative group pb-2"
                onClick={toggleMenu}
              >
                Log In
                <span className="absolute left-0 mt-4 bottom-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </Link>
              <Link
                href="/auth/register"
                className="text-xl my-2 relative group pb-2"
                onClick={toggleMenu}
              >
                Sign Up
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-xl my-2 relative group pb-2"
            >
              Logout
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
            </button>
          )}
          <Link
            href="/help"
            className="text-xl my-2 relative group pb-2"
            onClick={toggleMenu}
          >
            Help
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </Link>
          <Link
            href="/"
            className="text-xl my-2 relative group pb-2"
            onClick={toggleMenu}
          >
            Home
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
