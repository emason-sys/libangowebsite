"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/locate", label: "Locate a Vendor" },
  { href: "/token", label: "Retrieve Token" },
  { href: "/apply", label: "Become a Vendor" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  return (
    <header className="site">
      <div className="wrap nav">
        <Link className="logo" href="/">
          <Image src="/logo.png" alt="Libango" width={59} height={40} priority />
          <small>Holdings</small>
        </Link>
        <nav className="nav-links" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={pathname === l.href ? "active" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
