export default function JoinPage() {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Join or Support Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Membership Section */}
          <div className="bg-white border-2 border-primary p-8 rounded-lg">
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

            <button className="btn-primary w-full">
              Apply for Membership
            </button>
          </div>

          {/* Donation Section */}
          <div className="bg-white border-2 border-primary p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-primary mb-4">Support Our Cause</h2>
            <p className="text-primary mb-6">
              Your generous donations help us fund community projects, educational programs, 
              and service initiatives that make a real impact.
            </p>

            <h3 className="text-xl font-semibold mb-3">How Your Donation Helps:</h3>
            <ul className="list-disc list-inside text-primary mb-6 space-y-2">
              <li>Fund community service projects</li>
              <li>Provide educational materials</li>
              <li>Support environmental initiatives</li>
              <li>Organize health awareness programs</li>
              <li>Enable youth leadership training</li>
            </ul>

            <div className="bg-white p-6 rounded mb-6">
              <h3 className="text-xl font-semibold mb-4">Suggested Donations:</h3>
              <div className="space-y-3">
                <button className="w-full bg-primary-light text-white py-3 rounded hover:bg-primary transition">
                  LKR 1,000 - Support a Student
                </button>
                <button className="w-full bg-primary text-white py-3 rounded hover:bg-primary-dark transition">
                  LKR 5,000 - Fund a Project
                </button>
                <button className="w-full bg-primary-dark text-white py-3 rounded hover:bg-primary transition">
                  Custom Amount
                </button>
              </div>
            </div>

            <p className="text-sm text-primary text-center">
              * Payment gateway will be integrated soon
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border-2 border-primary p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Get in Touch</h2>
          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
            <button type="submit" className="btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
