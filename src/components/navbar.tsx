"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';
import Image from 'next/image';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed bg-transparent p-4 font-teachers w-screen ">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex lg:hidden">
          <Button variant="ghost" size="icon" aria-label="Menu" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
        <div className="hidden lg:flex items-center space-x-16 py-3 text-xl">
          <Link href="/auth/login" className="text-gray-700 hover:text-gray-900 relative group pb-2">
            Log In
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gray-900 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </Link>
          <Link href="/auth/register" className="text-gray-700 hover:text-gray-900 relative group pb-2">
            Sign Up
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gray-900 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </Link>
          <Link href="/help" className="text-gray-700 hover:text-gray-900 relative group pb-2">
            Help
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gray-900 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </Link>
          <Link href="/" className="text-gray-700 hover:text-gray-900 relative group pb-2">
            Home
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gray-900 transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Image
                  src="/profile.png"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className='text-xl p-2' >John Doe</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span className=''>Profile</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div 
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white p-5 flex flex-col items-center transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Button variant="ghost" size="icon" aria-label="Close Menu" onClick={toggleMenu} className="self-end mb-4">
          <X className="h-6 w-6" />
        </Button>
        <div className='flex flex-col items-center justify-center w-full h-full gap-10'>
          <Link href="/login" className="text-xl my-2 relative group pb-2" onClick={toggleMenu}>
            Log In
            <span className="absolute left-0 mt-4 bottom-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </Link>
          <Link href="/signup" className="text-xl my-2 relative group pb-2" onClick={toggleMenu}>
            Sign Up
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </Link>
          <Link href="/help" className="text-xl my-2 relative group pb-2" onClick={toggleMenu}>
            Help
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </Link>
          <Link href="/" className="text-xl my-2 relative group pb-2" onClick={toggleMenu}>
            Home
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
}