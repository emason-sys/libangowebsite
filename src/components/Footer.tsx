"use client";

import { usePathname } from "next/navigation";
import { CONTACTS } from "@/lib/vendors";

export function Footer() {
  const pathname = usePathname();
  // Matches the header: the /gate checkpoint hides site chrome.
  if (pathname === "/gate") return null;

  return (
    <footer className="site">
      <div className="wrap foot">
        <span>© {new Date().getFullYear()} Libango Holdings · {CONTACTS.hq}</span>
        <span className="mono" style={{ fontSize: ".8rem" }}>
          Customer Service {CONTACTS.customerService} · Vendor Support {CONTACTS.vendorSupport}
        </span>
      </div>
    </footer>
  );
}
