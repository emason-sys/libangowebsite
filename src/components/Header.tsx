"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
  /** External absolute URLs render as plain anchors, not next/link. */
  external?: boolean;
}

const LINKS: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/locate", label: "Locate a Vendor" },
  { href: "https://devportal.libangolr.net/", label: "Retrieve Token", external: true },
  {
    href: "https://devportal.libangolr.net/vendor-applications/",
    label: "Become a Vendor",
    external: true,
  },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  // The gate page is a standalone checkpoint served under devportal.libangolr.net;
  // it has no room for the marketing header.
  if (pathname === "/gate") return null;

  return (
    <header className="site">
      <div className="wrap nav">
        <Link className="logo" href="/">
          <Image src="/logo.png" alt="Libango" width={59} height={40} priority />
          <small>Holdings</small>
        </Link>
        <nav className="nav-links" aria-label="Main">
          {LINKS.map((l) =>
            l.external ? (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                href={l.href}
                className={pathname === l.href ? "active" : undefined}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>
      </div>
    </header>
  );
}
