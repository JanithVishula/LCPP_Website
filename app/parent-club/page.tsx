export default function ParentClubPage() {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">Parent Lions Club</h1>
        
        {/* About Parent Club */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Lions Club of Pannipitiya Paradise</h2>
          <p className="text-primary text-lg leading-relaxed mb-6">
            Our parent club, the Lions Club of Pannipitiya Paradise, has been serving the community 
            with dedication and compassion. They provide guidance, support, and mentorship to our 
            Leo Club, helping us grow and make a meaningful impact.
          </p>
          <div className="bg-white border-2 border-primary p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Partnership & Support</h3>
            <p className="text-primary">
              Together with our parent club, we work on joint projects, share resources, and 
              learn from experienced Lions members who inspire us to be better leaders.
            </p>
          </div>
        </section>

        {/* Lions Club Officers */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-primary mb-6">Lions Club Officers 2025-2026</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-secondary text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Club President</h3>
              <p className="text-lg">[Lions President Name]</p>
            </div>
            <div className="bg-secondary-light text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Leo Advisor</h3>
              <p className="text-lg">[Leo Advisor Name]</p>
            </div>
            <div className="bg-secondary-light text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Secretary</h3>
              <p className="text-lg">[Secretary Name]</p>
            </div>
            <div className="bg-secondary text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Treasurer</h3>
              <p className="text-lg">[Treasurer Name]</p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="bg-white border-2 border-primary p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-primary mb-4">Contact Information</h3>
          <div className="space-y-2 text-primary">
            <p><strong>Email:</strong> lionsclub.pannipitiya@example.com</p>
            <p><strong>Phone:</strong> +94 XX XXX XXXX</p>
            <p><strong>Meeting Location:</strong> [Location Details]</p>
          </div>
        </section>
      </div>
    </div>
  );
}
