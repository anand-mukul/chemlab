"use client";
import Link from "next/link";
import { useState } from "react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { Beaker, FlaskConical, LogIn, Menu, User2, X } from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/authContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Navbar() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const navItems = ["About", "Simulation", "Community", "Contact"];
  const linkClasses =
    "text-gray-700 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 px-3 py-2 rounded-md text-sm font-bold transition-colors";

  return (
    <nav className="bg-white dark:bg-black/95 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-900 dark:border-gray-700">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="flex items-center text-xl font-bold text-gray-800 dark:text-gray-200"
            >
              <FlaskConical className="mr-2" size={24} />
              ChemLAB
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Button
                key={item}
                variant="ghost"
                className="rounded-full bg-transparent"
              >
                <Link href={`/${item.toLowerCase()}`} className={linkClasses}>
                  {item}
                </Link>
              </Button>
            ))}
          </div>

          {/* Sign In Button */}
          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/lab">
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="flex items-center space-x-2 bg-white dark:bg-black text-black dark:text-white hover:text-zinc-700 dark:hover:text-zinc-300 px-4 py-2 text-sm font-medium shadow-sm"
                  >
                    <span>Lab</span>
                    <Beaker size={16} />
                  </HoverBorderGradient>
                </Link>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.avatar} alt={user?.username} />
                  <AvatarFallback>
                    <User2 className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <Link href="/sign-in">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="flex items-center space-x-2 bg-white dark:bg-black text-black dark:text-white hover:text-zinc-700 dark:hover:text-zinc-300 px-4 py-2 text-sm font-medium shadow-sm"
                >
                  <LogIn size={16} />
                  <span>Sign In</span>
                </HoverBorderGradient>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg transition-transform transform hover:scale-110"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300">
          <div className="space-y-2 px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-base font-medium transition-colors"
              >
                {item}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/lab">
                  <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="flex items-center space-x-2 bg-white dark:bg-black text-black dark:text-white hover:text-zinc-700 dark:hover:text-zinc-300 px-4 py-2 text-sm font-medium shadow-sm"
                  >
                    <span>Lab</span>
                    <Beaker size={16} />
                  </HoverBorderGradient>
                </Link>
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.avatar} alt={user?.username} />
                  <AvatarFallback>
                    <User2 className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <Link href="/sign-in">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="w-full flex justify-center items-center space-x-2 bg-white dark:bg-black text-black dark:text-white px-4 py-2 text-sm font-medium shadow-sm"
                >
                  <LogIn size={16} />
                  <span>Sign In</span>
                </HoverBorderGradient>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
