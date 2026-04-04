function About() {
  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>

      <img
        src="https://images.unsplash.com/photo-1551836022-d5d88e9218df"
        alt="team"
        className="rounded mb-6 w-full"
      />

      <p className="text-gray-700 text-lg leading-relaxed">
        Abe Garage is a trusted vehicle service provider dedicated to delivering
        high-quality repair and maintenance services. Our experienced mechanics
        ensure your vehicle stays in top condition.
      </p>

      <p className="mt-4 text-gray-700">
        We focus on customer satisfaction, affordability, and professional
        service.
      </p>
    </div>
  );
}

export default About;
