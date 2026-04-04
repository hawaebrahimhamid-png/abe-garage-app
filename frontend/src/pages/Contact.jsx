function Contact() {
  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>

      <img
        src="https://source.unsplash.com/800x300/?contact,office"
        alt=""
        className="rounded mb-6"
      />

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 border rounded"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 border rounded"
        />

        <textarea
          placeholder="Your Message"
          className="w-full p-3 border rounded"
          rows="5"
        ></textarea>

        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
