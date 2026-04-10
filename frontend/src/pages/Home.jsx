function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gray-900 text-white text-center py-20 px-6">
        <h1 className="text-5xl font-bold">Abe Garage</h1>
        <p className="mt-4 text-lg">Professional Car Service & Maintenance</p>
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
          alt="garage"
          className="mt-8 mx-auto rounded-lg"
        />
      </div>

      {/* Services */}
      <div className="py-16 px-6 text-center bg-gray-100">
        <h2 className="text-3xl font-bold mb-8">Our Services</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 shadow rounded bg-white">
            <img
              src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc"
              alt="car repair"
              className="rounded mb-4"
            />
            <h3 className="font-bold text-xl">Repair</h3>
            <p className="text-gray-600">High quality car repair services</p>
          </div>

          <div className="p-6 shadow rounded bg-white">
            <img
              src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2"
              alt="oil change"
              className="rounded mb-4"
            />
            <h3 className="font-bold text-xl">Oil Change</h3>
            <p className="text-gray-600">Fast and reliable oil change</p>
          </div>

          <div className="p-6 shadow rounded bg-white">
            <img
              src="https://images.unsplash.com/photo-1580273916550-e323be2ae537"
              alt="diagnostic"
              className="rounded mb-4"
            />
            <h3 className="font-bold text-xl">Diagnostics</h3>
            <p className="text-gray-600">Advanced vehicle diagnostics</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
