"use client";

import { ChangeEvent, FormEvent, KeyboardEvent, useState } from "react";

export default function JoinPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [phoneLocal, setPhoneLocal] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const fullName = formData.get("fullName")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const phoneLocal = formData.get("phoneLocal")?.toString().trim() || "";
    const dateOfBirth = formData.get("dateOfBirth")?.toString() || "";
    const address = formData.get("address")?.toString().trim() || "";
    const schoolOrUniversity = formData.get("schoolOrUniversity")?.toString().trim() || "";
    const gradeOrYear = formData.get("gradeOrYear")?.toString().trim() || "";
    const motivation = formData.get("motivation")?.toString().trim() || "";
    const experience = formData.get("experience")?.toString().trim() || "";

    const localPhoneRegex = /^\d{7}$/;
    if (!localPhoneRegex.test(phoneLocal)) {
      setError("Phone number must have exactly 7 digits after +94.");
      return;
    }

    const phone = `+94${phoneLocal}`;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/membership-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          dateOfBirth,
          address,
          schoolOrUniversity,
          gradeOrYear,
          motivation,
          experience,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to submit application. Please try again.");
        return;
      }

      setSuccess("Your application has been submitted successfully. We will contact you soon.");
      form.reset();
      setPhoneLocal("");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneLocalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 7);
    setPhoneLocal(digitsOnly);
  };

  const handleDobKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Prevent manual typing; date should be picked via calendar
    e.preventDefault();
  };

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Join Our Club</h1>
        
        {/* Membership Section */}
        <div className="bg-white border-2 border-primary p-8 rounded-lg mb-8">
          <h2 className="text-3xl font-bold text-primary mb-4">Become a Member</h2>
          <p className="text-primary mb-6">
            Join our vibrant community of young leaders making a difference. Membership is open 
            to youth aged 12-30 who are passionate about service and leadership.
          </p>
          
          <h3 className="text-xl font-semibold mb-3">Membership Benefits:</h3>
          <ul className="list-disc list-inside text-primary mb-6 space-y-2">
            <li>Leadership development opportunities</li>
            <li>Community service experience</li>
            <li>Networking with like-minded youth</li>
            <li>Skills training and workshops</li>
            <li>Recognition and awards</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">How to Join:</h3>
          <ol className="list-decimal list-inside text-primary mb-6 space-y-2">
            <li>Fill out the membership form</li>
            <li>Attend an orientation session</li>
            <li>Pay the annual membership fee</li>
            <li>Start making a difference!</li>
          </ol>
        </div>

        {/* Membership Application Form */}
        <div className="bg-white border-2 border-primary p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-primary mb-4 text-center">Membership Application Form</h2>

          {error && (
            <div className="mb-4 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-primary">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 rounded-lg border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-primary">
              {success}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-primary font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  name="fullName"
                  className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-primary font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  name="email"
                  className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-primary font-semibold mb-2">Phone Number *</label>
                <div className="flex">
                  <span className="inline-flex items-center px-4 py-3 border-2 border-primary rounded-l-lg bg-primary text-white text-sm font-semibold">
                    +94
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="XXXXXXX"
                    name="phoneLocal"
                    value={phoneLocal}
                    onChange={handlePhoneLocalChange}
                    maxLength={7}
                    inputMode="numeric"
                    className="w-full px-4 py-3 border-2 border-primary border-l-0 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <p className="mt-1 text-xs text-primary/70">Enter the 7 digits after +94.</p>
              </div>
              <div>
                <label className="block text-primary font-semibold mb-2">Date of Birth *</label>
                <input
                  type="date"
                  required
                  name="dateOfBirth"
                  onKeyDown={handleDobKeyDown}
                  className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-primary font-semibold mb-2">Address *</label>
              <textarea
                required
                placeholder="Your full address"
                rows={2}
                name="address"
                className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-primary font-semibold mb-2">School/University (if applicable)</label>
                <input
                  type="text"
                  placeholder="Institution name"
                  name="schoolOrUniversity"
                  className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-primary font-semibold mb-2">Grade/Year of Study</label>
                <input
                  type="text"
                  placeholder="e.g., Grade 10, 2nd Year"
                  name="gradeOrYear"
                  className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-primary font-semibold mb-2">Why do you want to join Leo Club? *</label>
              <textarea
                required
                placeholder="Tell us about your motivation and interests..."
                rows={4}
                name="motivation"
                className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            <div>
              <label className="block text-primary font-semibold mb-2">Previous volunteer experience (if any)</label>
              <textarea
                placeholder="Describe any volunteer work or leadership roles..."
                rows={3}
                name="experience"
                className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                required
                id="terms"
                className="mt-1 w-5 h-5 text-primary border-primary rounded focus:ring-primary"
              />
              <label htmlFor="terms" className="text-primary text-sm">
                I agree to abide by the club's code of conduct and actively participate in club activities *
              </label>
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-4 text-lg disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
