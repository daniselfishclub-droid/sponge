"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-sponge-bg/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl transition-transform duration-300 group-hover:scale-110">🧽</span>
          <span className="font-display font-bold text-lg text-white">Sponge Club</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm text-sponge-muted hover:text-sponge-cyan transition-colors duration-200 font-medium">
            소개
          </a>
          <a href="#curriculum" className="text-sm text-sponge-muted hover:text-sponge-cyan transition-colors duration-200 font-medium">
            커리큘럼
          </a>
          <a
            href="#pre-register"
            className="btn-neon bg-sponge-gold text-sponge-bg px-5 py-2 rounded-lg font-display font-bold text-sm hover:brightness-110 transition"
          >
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
        <div className="md:hidden glass-card border-t border-white/5 px-4 py-5 flex flex-col gap-4">
          <a href="#about" className="text-sm text-sponge-muted hover:text-white transition" onClick={() => setIsOpen(false)}>
            소개
          </a>
          <a href="#curriculum" className="text-sm text-sponge-muted hover:text-white transition" onClick={() => setIsOpen(false)}>
            커리큘럼
          </a>
          <a
            href="#pre-register"
            className="btn-neon bg-sponge-gold text-sponge-bg px-4 py-2.5 rounded-lg font-display font-bold text-center text-sm"
            onClick={() => setIsOpen(false)}
          >
            사전 알림 신청
          </a>
        </div>
      )}
    </nav>
  );
}
