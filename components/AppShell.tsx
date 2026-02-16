"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { QuickAccessSidebar } from "@/components/QuickAccessSidebar";

const OWN_AREA_PREFIXES = [
  "/dashboard",
  "/admin",
  "/admin/applications",
  "/members",
  "/members/create",
  "/events",
  "/events/create",
  "/service-hours",
  "/service-hours/approve",
  "/service-hours/leaderboard",
  "/suggestions/review",
  "/minutes",
  "/minutes/create",
  "/profile",
];

function isOwnArea(pathname: string | null): boolean {
  if (!pathname) return false;

  // Do not treat other members' profile pages as own-area.
  if (pathname.startsWith("/members/") && !pathname.startsWith("/members/create")) {
    return false;
  }

  return OWN_AREA_PREFIXES.some(
    (base) => pathname === base || pathname.startsWith(base + "/")
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const showSidebar = !!session?.user && isOwnArea(pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {showSidebar && <QuickAccessSidebar />}

        <main
          className={[
            "flex-1 pt-20 pb-12 relative z-10", // align with navbar height
            showSidebar ? "lg:ml-72" : "",
            "px-4 sm:px-6 lg:px-8",
          ].join(" ")}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
