export default function ServicesPage() {
  const services = [
    {
      title: "Web Development",
      description: "Custom web applications built with modern technologies to meet your business needs.",
      features: ["React/Next.js", "Node.js", "Database Design", "API Development"]
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      features: ["React Native", "Flutter", "iOS Development", "Android Development"]
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services.",
      features: ["AWS", "Azure", "Google Cloud", "DevOps"]
    },
    {
      title: "AI & Machine Learning",
      description: "Intelligent solutions powered by artificial intelligence and machine learning.",
      features: ["Natural Language Processing", "Computer Vision", "Predictive Analytics", "Automation"]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>
      <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
        We offer comprehensive technology solutions to help your business thrive in the digital age.
      </p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <ul className="text-sm text-gray-500">
              {service.features.map((feature, idx) => (
                <li key={idx} className="mb-1">• {feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
