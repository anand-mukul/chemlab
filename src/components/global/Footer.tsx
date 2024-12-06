import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <div>
      <footer className="relative text-black dark:text-white py-16 bg-gradient-to-b from-white/95 to-gray-100 dark:bg-gradient-to-b dark:from-black/95 dark:to-slate-900">
        {/* Mode Toggle Button */}
        <div className="absolute top-4 right-6">
          <ModeToggle />
        </div>

        <div className="container mx-auto px-6 lg:px-20">
          {/* Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Footer Sections */}
            {[
              { title: "About Us", links: ["Our Story", "Team", "Careers"] },
              {
                title: "Services",
                links: ["Chemical Analysis", "Synthesis", "Research Support"],
              },
              { title: "Resources", links: ["Blog", "Publications", "FAQs"] },
              {
                title: "Connect",
                links: ["Contact Us", "LinkedIn", "Twitter"],
              },
            ].map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-bold mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        href={section.links[i].toLocaleLowerCase()}
                        className="hover:text-blue-500 transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Call to Action Section */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-bold mb-4">Stay Updated</h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Subscribe to our newsletter for the latest updates and research
                insights.
              </p>
              <form className="flex flex-col sm:flex-row items-center">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full sm:w-auto flex-grow px-4 py-2 mb-3 sm:mb-0 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-gray-200 dark:bg-gray-700"
                />
                <Button className="ml-1 sm:ml-2 w-full sm:w-auto mt-2 sm:mt-0"
                  type="submit">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="mt-10 flex justify-center space-x-6">
            {[
              { href: "https://github.com/anand-mukul", icon: "fab fa-github" },
              { href: "#", icon: "fab fa-twitter" },
              { href: "https://www.linkedin.com/in/dev-mukul", icon: "fab fa-linkedin-in" },
              { href: "#", icon: "fab fa-instagram" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
                aria-label={social.icon}
              >
                <i className={`${social.icon} text-xl`}></i>
              </a>
            ))}
          </div>

          {/* Footer Bottom */}
          <div className="mt-10 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-700 text-sm dark:text-gray-300">
              &copy; {new Date().getFullYear()} ChemLab. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
