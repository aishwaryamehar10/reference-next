"use client";
import React from "react";
//import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <h1>Welcome to My Online Bookstore</h1>
    </div>
  );
}
