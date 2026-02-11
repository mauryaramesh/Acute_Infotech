export default function CareerPage() {
  const openings = [
    {
      title: "Senior React Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "5+ years"
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Hybrid",
      type: "Full-time",
      experience: "3+ years"
    },
    {
      title: "Backend Developer",
      department: "Engineering",
      location: "Office",
      type: "Full-time",
      experience: "4+ years"
    },
    {
      title: "Project Manager",
      department: "Management",
      location: "Remote",
      type: "Full-time",
      experience: "6+ years"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Join Our Team</h1>
      <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
        Be part of a dynamic team that's shaping the future of technology. We're always looking for 
        talented individuals who are passionate about innovation.
      </p>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-8 text-center">Why Work With Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚀</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Growth Opportunities</h3>
            <p className="text-gray-600">Continuous learning and career development paths</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💡</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Innovation Culture</h3>
            <p className="text-gray-600">Work on cutting-edge projects with latest technologies</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Great Team</h3>
            <p className="text-gray-600">Collaborative environment with talented professionals</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-8">Current Openings</h2>
        <div className="space-y-4">
          {openings.map((job, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>🏢 {job.department}</span>
                    <span>📍 {job.location}</span>
                    <span>⏰ {job.type}</span>
                    <span>📊 {job.experience}</span>
                  </div>
                </div>
                <button className="mt-4 md:mt-0 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
