export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
      <div className="max-w-4xl mx-auto">
        <p className="text-lg text-gray-600 mb-6">
          Acute InfoSoft is a leading technology company dedicated to delivering innovative software solutions 
          that transform businesses and drive digital growth.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To empower businesses with cutting-edge technology solutions that enhance efficiency, 
              productivity, and competitive advantage in the digital marketplace.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To be the global leader in software innovation, helping organizations navigate 
              their digital transformation journey with confidence and success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
