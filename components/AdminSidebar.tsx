"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

type Role = "member" | "officer" | "admin";

const ROLE_RANK: Record<Role, number> = {
  member: 1,
  officer: 2,
  admin: 3,
};

const links: { href: string; label: string; icon: string; minRole: Role }[] = [
  { href: "/dashboard", label: "Dashboard", icon: "📊", minRole: "member" },
  { href: "/admin", label: "Admin Home", icon: "🏠", minRole: "admin" },
  {
    href: "/admin/applications",
    label: "Membership Applications",
    icon: "📝",
    minRole: "officer",
  },
  { href: "/members", label: "Members", icon: "👥", minRole: "member" },
  {
    href: "/members/create",
    label: "Create Member",
    icon: "➕",
    minRole: "officer",
  },
  { href: "/events", label: "Events", icon: "📅", minRole: "member" },
  {
    href: "/events/create",
    label: "Create Event",
    icon: "✨",
    minRole: "admin",
  },
  {
    href: "/service-hours",
    label: "Service Hours",
    icon: "⏱️",
    minRole: "member",
  },
  {
    href: "/suggestions/review",
    label: "Review Suggestions",
    icon: "💡",
    minRole: "officer",
  },
  { href: "/minutes", label: "Minutes", icon: "🧾", minRole: "member" },
];

export default function AdminSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const userRole = (session?.user?.role as Role | undefined) ?? "member";

  const visibleLinks = links.filter((link) => {
    return ROLE_RANK[userRole] >= ROLE_RANK[link.minRole];
  });

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  const Nav = () => (
    <div className="flex h-full flex-col">
      {/* Main nav list */}
      <nav className="flex-1 overflow-y-auto px-2 py-1.5 space-y-1">
        {visibleLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={[
              "flex w-full items-center rounded-xl px-4 py-3 text-[15px] font-medium transition-colors",
              "hover:bg-[#e4e6eb] hover:text-gray-900",
              isActive(link.href)
                ? "bg-[#d8dadf] text-gray-900 font-semibold border-l-4 border-primary pl-3.5"
                : "text-gray-800",
            ].join(" ")}
          >
            <span className="mr-3 flex h-8 w-8 items-center justify-center text-lg">
              {link.icon}
            </span>
            <span className="truncate">{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile toggle button (shows above content on < lg) */}
      <button
        type="button"
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 lg:hidden"
        onClick={() => setOpen(true)}
      >
        <span className="text-lg">📋</span>
        <span>
          {userRole === "admin"
            ? "Admin Menu"
            : userRole === "officer"
            ? "Officer Menu"
            : "Member Menu"}
        </span>
      </button>

      {/* Desktop sidebar */}
      <aside
        className="
          hidden lg:flex lg:flex-col
          w-[340px] xl:w-[360px] shrink-0
          bg-[#f0f2f5]
          border-r border-gray-200
          sticky top-16
          h-[calc(100vh-5rem)]
        "
      >
        <Nav />
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 flex h-full w-[280px] flex-col bg-[#f0f2f5] border-r border-gray-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <span className="text-sm font-semibold text-gray-900">
                {userRole === "admin"
                  ? "Admin Menu"
                  : userRole === "officer"
                  ? "Officer Menu"
                  : "Member Menu"}
              </span>
              <button
                type="button"
                className="rounded-full p-1 hover:bg-gray-200"
                onClick={() => setOpen(false)}
              >
                <span className="text-lg">✕</span>
              </button>
            </div>
            <Nav />
          </aside>
        </div>
      )}
    </>
  );
}
