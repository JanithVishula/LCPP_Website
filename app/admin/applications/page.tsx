"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface MembershipApplication {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  schoolOrUniversity?: string;
  gradeOrYear?: string;
  motivation: string;
  experience?: string;
  status: string;
  createdAt: string;
}

export default function MembershipApplicationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [applications, setApplications] = useState<MembershipApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;

    if (!session || (session.user.role !== "admin" && session.user.role !== "officer")) {
      router.push("/login");
      return;
    }

    const fetchApplications = async () => {
      try {
        const res = await fetch("/api/membership-applications");
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to load applications");
          return;
        }

        setApplications(data.applications || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [session, status, router]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading applications...</div>
      </div>
    );
  }

  if (!session || (session.user.role !== "admin" && session.user.role !== "officer")) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-gold/10 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gold-dark via-primary to-primary-dark bg-clip-text text-transparent mb-2">
            Membership Applications
          </h1>
          <p className="text-gray-600">View applications submitted via the Join page</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary">
            {error}
          </div>
        )}

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center text-gray-600">
            No applications have been submitted yet.
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-primary">{app.fullName}</h2>
                    <p className="text-sm text-gray-600">
                      {app.email} • {app.phone}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 text-right">
                    <p>
                      Applied on {new Date(app.createdAt).toLocaleDateString()} at{" "}
                      {new Date(app.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="mt-1">
                      Status: <span className="font-medium capitalize">{app.status}</span>
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
                  <div>
                    <p className="font-semibold text-primary">Date of Birth</p>
                    <p>{new Date(app.dateOfBirth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-primary">Address</p>
                    <p className="whitespace-pre-line">{app.address}</p>
                  </div>
                  {app.schoolOrUniversity && (
                    <div>
                      <p className="font-semibold text-primary">School/University</p>
                      <p>{app.schoolOrUniversity}</p>
                    </div>
                  )}
                  {app.gradeOrYear && (
                    <div>
                      <p className="font-semibold text-primary">Grade/Year of Study</p>
                      <p>{app.gradeOrYear}</p>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div>
                    <p className="font-semibold text-primary">Motivation</p>
                    <p className="whitespace-pre-line mt-1">{app.motivation}</p>
                  </div>
                  {app.experience && (
                    <div>
                      <p className="font-semibold text-primary">Previous Experience</p>
                      <p className="whitespace-pre-line mt-1">{app.experience}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
