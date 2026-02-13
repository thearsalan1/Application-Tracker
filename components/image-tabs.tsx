'use client';

import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

export default function ImageTabs(){
    const [activeTab,setActiveTab]= useState("Organize")

  return (
    <section className="border-t bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              {/* tabs */}
            <div className="flex gap-2 justify-center mb-8">
              <Button onClick={()=>setActiveTab("Organize")}className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${activeTab==='Organize' ? "bg-primary text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Organise Application</Button>
              <Button onClick={()=>setActiveTab("Hired")} className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${activeTab==='Hired' ? "bg-primary text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Get Hired</Button>
              <Button onClick={()=>setActiveTab("Manage")} className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${activeTab==='Manage' ? "bg-primary text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>Manage Boards</Button>
            </div>
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-xl">
              {activeTab === "Organize" &&<Image src="/heroImages/hero1.png" alt="Organize Application" width={1200} height={800}/>}
              {activeTab === 'Hired' && <Image src="/heroImages/hero2.png" alt="Organize Application" width={1200} height={800}/>}
              {activeTab === 'Manage' && <Image src="/heroImages/hero3.png" alt="Organize Application" width={1200} height={800}/>}
            </div>
            </div>
          </div>
        </section>
  )
}