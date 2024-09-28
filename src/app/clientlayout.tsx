"use client";

import React from 'react';
import Navbar from '../components/navbar'; // Your existing Navbar component
import FloatingBar from '@/components/floatingBar';
import { Toaster } from '@/components/sonner';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <Navbar/>
        {children}
        <FloatingBar />
        <Toaster position="bottom-right" richColors />{" "}
    </>
  );
}