
import { useState } from "react";
import { Link } from "react-router-dom";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "General Enquiry",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const existing = JSON.parse(
        localStorage.getItem("pawhaven-contact-messages") || "[]"
      );

      const newMessage = {
        ...form,
        id: Date.now(),
        submittedAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "pawhaven-contact-messages",
        JSON.stringify([...existing, newMessage])
      );

      setForm(initialForm);
      setSuccess(true);
    } catch {
      alert("Message save nahi ho paya. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#fbf9f1] text-[#183d2b]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#173f2d] px-5 py-10 text-white sm:py-10">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#d6a75c]/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-green-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#e5c88d]">
            We're Here for You
          </p>

          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">
            Let's Talk About Your
            <span className="block text-[#e5c88d]">Furry Best Friend.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-green-50/80 sm:text-lg">
            Need help choosing the right products, exploring pet services,
            or finding your new companion? Send us a message.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact-form"
              className="rounded-full bg-[#e5c88d] px-7 py-3.5 font-bold text-[#173f2d] transition hover:bg-white"
            >
              Send Us a Message
            </a>

            <Link
              to="/shop"
              className="rounded-full border border-white/40 px-7 py-3.5 font-bold transition hover:bg-white/10"
            >
              Explore Pet Shop
            </Link>
          </div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="mx-auto grid max-w-6xl gap-5 px-5 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-3xl border border-[#e5e5d6] bg-white p-7 shadow-sm">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf1e5] text-3xl">
            ✉️
          </div>
          <h2 className="text-xl font-bold">Email Us</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            For product questions and general enquiries.
          </p>
          <p className="mt-4 break-words font-semibold text-[#28734a]">
            Add your support email
          </p>
        </div>

        <div className="rounded-3xl border border-[#e5e5d6] bg-white p-7 shadow-sm">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf1e5] text-3xl">
            💬
          </div>
          <h2 className="text-xl font-bold">WhatsApp</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Connect with us for quick assistance.
          </p>
          <a
            href="https://wa.me/91YOURNUMBER"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block font-semibold text-[#28734a] hover:underline"
          >
            Chat on WhatsApp →
          </a>
          <p className="mt-2 text-xs text-gray-500">
            Replace YOURNUMBER with your WhatsApp number, including country code.
          </p>
        </div>

        <div className="rounded-3xl border border-[#e5e5d6] bg-white p-7 shadow-sm sm:col-span-2 lg:col-span-1">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf1e5] text-3xl">
            🐾
          </div>
          <h2 className="text-xl font-bold">Pet Care Support</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Questions about grooming, training, adoption or pet essentials?
            We can help you find the right section.
          </p>
          <Link
            to="/services"
            className="mt-4 inline-block font-semibold text-[#28734a] hover:underline"
          >
            Explore Services →
          </Link>
        </div>
      </section>

      {/* Form + information */}
      <section
        id="contact-form"
        className="mx-auto grid max-w-6xl gap-10 px-5 pb-20 lg:grid-cols-[0.8fr_1.2fr]"
      >
        <div className="rounded-3xl bg-[#e9efe2] p-7 sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#52815b]">
            Get in Touch
          </p>

          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            How can we help you today?
          </h2>

          <p className="mt-5 leading-7 text-gray-600">
            Tell us what you need. Include your question and the best way to
            reach you so your enquiry has the information it needs.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex gap-4">
              <span className="text-2xl">🛍️</span>
              <div>
                <h3 className="font-bold">Product Enquiries</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Food, treats, toys and everyday essentials.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-2xl">🛁</span>
              <div>
                <h3 className="font-bold">Services & Appointments</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Grooming, training, walking and wellness.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-2xl">🏡</span>
              <div>
                <h3 className="font-bold">Adoption Enquiries</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Learn more about the adoption demo.
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/pets"
            className="mt-8 inline-flex rounded-full bg-[#173f2d] px-6 py-3 font-bold text-white transition hover:bg-[#285d40]"
          >
            Meet Our Pets →
          </Link>
        </div>

        <div className="rounded-3xl border border-[#e5e5d6] bg-white p-6 shadow-sm sm:p-10">
          <h2 className="text-2xl font-extrabold">Send a Message</h2>
          <p className="mt-2 text-sm text-gray-500">
            Fill in the form below with your enquiry.
          </p>

          {success && (
            <div
              role="status"
              className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-800"
            >
              Your message has been saved in this browser's demo storage.
              It has not been emailed to the PawHaven team.
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-bold">
                  Your Name *
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  maxLength={100}
                  autoComplete="name"
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-gray-200 bg-[#fbf9f1] px-4 py-3 outline-none transition focus:border-[#52815b] focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-bold">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-200 bg-[#fbf9f1] px-4 py-3 outline-none transition focus:border-[#52815b] focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-bold">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  maxLength={20}
                  autoComplete="tel"
                  placeholder="Enter phone number"
                  className="w-full rounded-xl border border-gray-200 bg-[#fbf9f1] px-4 py-3 outline-none transition focus:border-[#52815b] focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-bold">
                  Enquiry Type *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-[#fbf9f1] px-4 py-3 outline-none focus:border-[#52815b]"
                >
                  <option>General Enquiry</option>
                  <option>Product Enquiry</option>
                  <option>Order Support</option>
                  <option>Pet Services</option>
                  <option>Adoption Enquiry</option>
                  <option>Feedback</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-bold">
                Your Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                minLength={5}
                maxLength={2000}
                rows={5}
                placeholder="Tell us how we can help..."
                className="w-full resize-y rounded-xl border border-gray-200 bg-[#fbf9f1] px-4 py-3 outline-none transition focus:border-[#52815b] focus:ring-2 focus:ring-green-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-[#173f2d] px-7 py-4 font-bold text-white transition hover:bg-[#285d40] sm:w-auto"
            >
              Submit Enquiry →
            </button>

            <p className="text-xs leading-5 text-gray-500">
              Demo only: your message is stored in this browser. For a live
              website, connect a backend or email service before collecting
              customer enquiries.
            </p>
          </form>
        </div>
      </section>

      {/* Bottom banner */}
      <section className="px-5 pb-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-3xl bg-[#173f2d] p-8 text-white sm:p-12 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#e5c88d]">
              Better Days for Every Pet
            </p>
            <h2 className="mt-3 text-3xl font-extrabold">
              Your pet deserves the best.
            </h2>
            <p className="mt-3 text-green-50/75">
              Explore products and services made with pets in mind.
            </p>
          </div>

          <Link
            to="/shop"
            className="shrink-0 rounded-full bg-[#e5c88d] px-7 py-4 font-bold text-[#173f2d] transition hover:bg-white"
          >
            Shop PawHaven →
          </Link>
        </div>
      </section>
    </main>
  );
}
