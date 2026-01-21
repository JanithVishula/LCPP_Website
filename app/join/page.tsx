export default function JoinPage() {
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
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Membership Application Form</h2>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-primary font-semibold mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-primary font-semibold mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-primary font-semibold mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+94 XX XXX XXXX"
                  className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-primary font-semibold mb-2">Date of Birth *</label>
                <input
                  type="date"
                  required
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
                className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-primary font-semibold mb-2">School/University *</label>
                <input
                  type="text"
                  required
                  placeholder="Institution name"
                  className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-primary font-semibold mb-2">Grade/Year of Study</label>
                <input
                  type="text"
                  placeholder="e.g., Grade 10, 2nd Year"
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
                className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            <div>
              <label className="block text-primary font-semibold mb-2">Previous volunteer experience (if any)</label>
              <textarea
                placeholder="Describe any volunteer work or leadership roles..."
                rows={3}
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

            <button type="submit" className="btn-primary w-full py-4 text-lg">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
