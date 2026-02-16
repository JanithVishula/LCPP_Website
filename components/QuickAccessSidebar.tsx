"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
  icon?: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin", label: "Admin Home", icon: "🏠" },
  { href: "/admin/applications", label: "Membership Applications", icon: "📝" },
  { href: "/members", label: "Members", icon: "👥" },
  { href: "/members/create", label: "Create Member", icon: "➕" },
  { href: "/events", label: "Events", icon: "📅" },
  { href: "/events/create", label: "Create Event", icon: "✨" },
  { href: "/service-hours", label: "Service Hours", icon: "⏱️" },
  { href: "/suggestions/review", label: "Review Suggestions", icon: "💡" },
  { href: "/minutes", label: "Minutes", icon: "🧾" },
];

export function QuickAccessSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const NavList = () => (
    <nav className="flex-1 overflow-y-auto px-3 pb-4 pt-2 space-y-1">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={[
            "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
            "hover:bg-primary/10 hover:text-primary-dark",
            isActive(item.href)
              ? "bg-primary/15 text-primary-dark border-l-4 border-primary pl-3"
              : "text-gray-800",
          ].join(" ")}
          onClick={() => setOpen(false)}
        >
          {item.icon && (
            <span className="flex h-8 w-8 items-center justify-center text-lg">
              {item.icon}
            </span>
          )}
          <span className="truncate">{item.label}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        type="button"
        className="lg:hidden fixed top-16 left-4 z-40 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white/95 px-4 py-2 text-sm font-semibold text-gray-700 shadow-md backdrop-blur-sm"
        onClick={() => setOpen(true)}
      >
        <span className="text-lg">📋</span>
        <span>Quick Access</span>
      </button>

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex lg:flex-col fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 bg-white/90 backdrop-blur-sm border-r border-gray-100 shadow-sm z-30"
      >
        <div className="px-4 pt-4 pb-2 border-b border-gray-200 bg-[#f0f2f5]">
          <h2 className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
            Quick Access
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Leo Club of Pannipitiya Paradise
          </p>
        </div>
        <NavList />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-72 flex-col bg-white border-r border-gray-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 bg-white/90 backdrop-blur-sm">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase">
                  Quick Access
                </p>
              </div>
              <button
                type="button"
                className="rounded-full p-1.5 hover:bg-gray-200"
                onClick={() => setOpen(false)}
              >
                <span className="text-lg">✕</span>
              </button>
            </div>
            <NavList />
          </aside>
        </div>
      )}
    </>
  );
}
