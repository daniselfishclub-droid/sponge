"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-sponge-bg/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🧽</span>
          <span className="font-bold text-lg text-white">Sponge Club</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-sm text-sponge-muted hover:text-white transition">소개</a>
          <a href="#curriculum" className="text-sm text-sponge-muted hover:text-white transition">커리큘럼</a>
          <a href="#pre-register" className="text-sm bg-sponge-gold text-sponge-bg px-4 py-2 rounded-lg font-bold hover:brightness-110 transition">
            사전 알림 신청
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-sponge-bg border-t border-white/5 px-4 py-4 flex flex-col gap-4">
          <a href="#about" className="text-sm text-sponge-muted" onClick={() => setIsOpen(false)}>소개</a>
          <a href="#curriculum" className="text-sm text-sponge-muted" onClick={() => setIsOpen(false)}>커리큘럼</a>
          <a href="#pre-register" className="text-sm bg-sponge-gold text-sponge-bg px-4 py-2 rounded-lg font-bold text-center" onClick={() => setIsOpen(false)}>
            사전 알림 신청
          </a>
        </div>
      )}
    </nav>
  );
}
