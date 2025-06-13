import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-200 dark:bg-slate-900 text-slate-900 dark:text-white py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-8">
          {/* Logo and Tagline */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-cyan-500 dark:bg-cyan-400 rounded-lg rotate-45 flex items-center justify-center">
                <div className="w-6 h-6 bg-white dark:bg-slate-900 rounded-sm rotate-45" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Efuye
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Virtual Class for Zoom
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-800 dark:text-white">
              Subscribe to get our Newsletter
            </h3>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your Email"
                className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-cyan-500 dark:focus:ring-cyan-400"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="pt-8 border-t border-slate-300 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-6">
              <Link
                href="/careers"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors duration-200"
              >
                Careers
              </Link>
              <Link
                href="/privacy"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white transition-colors duration-200"
              >
                Terms & Conditions
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2023 Efuye Technologies Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
