import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#8DC63F]/10 dark:bg-[#231F20] text-[#231F20] dark:text-[#FFFFFF] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-8">
          {/* Logo and Tagline */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-[#006838] dark:bg-[#8DC63F] rounded-lg rotate-45 flex items-center justify-center">
                <div className="w-6 h-6 bg-[#FFFFFF] dark:bg-[#231F20] rounded-sm rotate-45" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-[#231F20] dark:text-[#FFFFFF]">
                  GREEN PILL
                </h2>
                <p className="text-sm text-[#231F20]/70 dark:text-[#FFFFFF]/70">
                  Virtual Class for Zoom
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-[#231F20] dark:text-[#FFFFFF]">
              Subscribe to get our Newsletter
            </h3>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your Email"
                className="flex-1 bg-[#FFFFFF] dark:bg-[#231F20] border border-[#8DC63F]/30 dark:border-[#8DC63F]/20 text-[#231F20] dark:text-[#FFFFFF] placeholder:text-[#231F20]/50 dark:placeholder:text-[#FFFFFF]/50 focus:border-[#006838] dark:focus:border-[#8DC63F] focus:ring-[#006838] dark:focus:ring-[#8DC63F]"
              />
              <Button className="bg-gradient-to-r from-[#006838] to-[#8DC63F] hover:from-[#006838]/90 hover:to-[#8DC63F]/90 text-[#FFFFFF] px-6 py-2 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="pt-8 border-t border-[#8DC63F]/30 dark:border-[#8DC63F]/20">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 mb-6">
              <Link
                href="/careers"
                className="text-[#231F20]/80 dark:text-[#FFFFFF]/80 hover:text-[#006838] dark:hover:text-[#8DC63F] transition-colors duration-200"
              >
                Careers
              </Link>
              <Link
                href="/privacy"
                className="text-[#231F20]/80 dark:text-[#FFFFFF]/80 hover:text-[#006838] dark:hover:text-[#8DC63F] transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-[#231F20]/80 dark:text-[#FFFFFF]/80 hover:text-[#006838] dark:hover:text-[#8DC63F] transition-colors duration-200"
              >
                Terms & Conditions
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-sm text-[#231F20]/60 dark:text-[#FFFFFF]/60">
              © 2023 GREEN PILL Technologies Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
