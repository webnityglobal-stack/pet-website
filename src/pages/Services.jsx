
import { useState } from 'react'

const services = [
  {
    id: 1,
    title: 'Pet Grooming',
    icon: '✂️',
    price: 799,
    duration: '45–60 minutes',
    category: 'Grooming',
    description: 'Bathing, brushing and everyday grooming to keep your pet comfortable.',
    includes: ['Bath and blow-dry', 'Brushing and coat care', 'Nail trimming'],
  },
  {
    id: 2,
    title: 'Dog Walking',
    icon: '🐕',
    price: 299,
    duration: '30 minutes',
    category: 'Walking',
    description: 'Daily walks to keep your furry friend active and happy.',
    includes: ['Outdoor walk', 'Physical activity', 'Walk summary'],
  },
  {
    id: 3,
    title: 'Pet Training',
    icon: '🎾',
    price: 999,
    duration: '60 minutes',
    category: 'Training',
    description: 'Positive, reward-based practice for good habits and basic commands.',
    includes: ['Basic commands', 'Leash manners', 'Training guidance'],
  },
  {
    id: 4,
    title: 'Wellness & Care',
    icon: '♡',
    price: 599,
    duration: '30 minutes',
    category: 'Wellness',
    description: 'Everyday care guidance to help you build a healthy pet routine.',
    includes: ['Care checklist', 'Routine guidance', 'Care recommendations'],
  },
  {
    id: 5,
    title: 'Pet Sitting',
    icon: '🏡',
    price: 699,
    duration: 'Per visit',
    category: 'Care',
    description: 'In-home companionship and care while you are away.',
    includes: ['Feeding as instructed', 'Playtime', 'Visit update'],
  },
  {
    id: 6,
    title: 'Puppy Starter',
    icon: '🐾',
    price: 899,
    duration: '45 minutes',
    category: 'Training',
    description: 'A gentle introduction to routines and early learning.',
    includes: ['Routine basics', 'Reward-based learning', 'Owner tips'],
  },
]

const initialForm = {
  name: '',
  email: '',
  phone: '',
  petName: '',
  petType: 'Dog',
  date: '',
  time: '',
  address: '',
  notes: '',
}

export default function Services() {
  const [category, setCategory] = useState('All')
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState(initialForm)
  const [confirmation, setConfirmation] = useState(null)

  const categories = ['All', 'Grooming', 'Walking', 'Training', 'Wellness', 'Care']
  const today = new Date()
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const filtered = services.filter(
    (service) => category === 'All' || service.category === category
  )

  function openBooking(service) {
    setSelected(service)
    setConfirmation(null)
    setForm({ ...initialForm })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!selected) return

    const booking = {
      ...form,
      bookingId: `PWS-${Date.now()}`,
      serviceId: selected.id,
      serviceName: selected.title,
      price: selected.price,
      status: 'Request received',
      createdAt: new Date().toISOString(),
    }

    try {
      const saved = JSON.parse(
        localStorage.getItem('pawhaven-service-bookings') || '[]'
      )
      const bookings = Array.isArray(saved) ? saved : []

      localStorage.setItem(
        'pawhaven-service-bookings',
        JSON.stringify([booking, ...bookings])
      )

      setConfirmation(booking)
    } catch {
      alert('Unable to save your request. Please check browser storage.')
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f7f2] text-[#183d2b]">
      {/* Hero */}
      <section className="bg-[#183d2b] px-5 py-16 text-white md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
          <div>
            <span className="rounded-full border border-white/30 px-4 py-2 text-sm text-[#e8b98f]">
              CARE THAT COMES FROM THE HEART
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
              Happier pets,
              <span className="block text-[#e8b98f]">healthier lives.</span>
            </h1>
            <p className="mt-5 max-w-xl leading-7 text-white/75">
              From grooming and walks to training and everyday care,
              discover services designed for your furry family.
            </p>
            <a
              href="#services-list"
              className="mt-8 inline-block rounded-full bg-[#e8b98f] px-7 py-3.5 font-bold text-[#183d2b] hover:bg-white"
            >
              Explore Services →
            </a>
          </div>
          <img
            src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1100&q=85"
            alt="Dog enjoying a grooming session"
            className="h-[300px] w-full rounded-[2rem] object-cover shadow-xl md:h-[420px]"
          />
        </div>
      </section>

      {/* Intro */}
      <section className="px-5 py-14 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a66c43]">
          The PawHaven difference
        </p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">
          Everything your pet needs
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#68766b]">
          Find a service that suits your pet and your routine.
          Prices are illustrative sample prices for this demo website.
        </p>
      </section>

      {/* Services */}
      <section id="services-list" className="scroll-mt-8 px-5 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h2 className="text-2xl font-bold">Our Services</h2>
              <p className="mt-1 text-sm text-[#68766b]">
                Choose a service to request a booking.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    category === item
                      ? 'bg-[#244b37] text-white'
                      : 'border border-[#d9ded4] bg-white text-[#244b37] hover:bg-[#e6efe5]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((service) => (
              <article
                key={service.id}
                className="flex flex-col rounded-3xl border border-[#e2e7dc] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8eee3] text-2xl">
                    {service.icon}
                  </div>
                  <span className="rounded-full bg-[#f8f7f2] px-3 py-1.5 text-xs text-[#526457]">
                    {service.duration}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold">{service.title}</h3>
                <p className="mt-3 min-h-[72px] text-sm leading-6 text-[#68766b]">
                  {service.description}
                </p>

                <div className="mt-5 border-t border-[#edf0e9] pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#a66c43]">
                    What’s included
                  </p>
                  <ul className="mt-3 space-y-2">
                    {service.includes.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-[#526457]">
                        <span className="font-bold text-[#367653]">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                  <div>
                    <p className="text-xs text-[#68766b]">Starting from</p>
                    <p className="text-2xl font-bold">
                      ₹{service.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openBooking(service)}
                    className="rounded-full bg-[#244b37] px-5 py-3 font-semibold text-white transition hover:bg-[#183d2b]"
                  >
                    Book Now
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[#e8eee3] px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a66c43]">
              Our promise
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              Care with a little extra love.
            </h2>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {[
              ['♡', 'Pet-first approach', 'Choose care based on your pet’s comfort and needs.'],
              ['✓', 'Clear pricing', 'See sample starting prices before submitting a request.'],
              ['🐾', 'Made for every paw', 'Explore options for different pets and routines.'],
            ].map(([icon, title, description]) => (
              <div key={title} className="rounded-3xl bg-white p-7">
                <span className="text-3xl text-[#a66c43]">{icon}</span>
                <h3 className="mt-4 text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-[#68766b]">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null)
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            className="my-auto w-full max-w-2xl rounded-3xl bg-[#f8f7f2] p-6 shadow-2xl md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-[#a66c43]">
                  PawHaven Service Request
                </p>
                <h2 id="booking-title" className="mt-2 text-2xl font-bold">
                  {confirmation ? 'Request saved! ♡' : selected.title}
                </h2>
                {!confirmation && (
                  <p className="mt-1 text-sm text-[#68766b]">
                    Starting from ₹{selected.price.toLocaleString('en-IN')}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close booking form"
                className="rounded-full border border-[#d9ded4] px-3 py-1 text-xl"
              >
                ×
              </button>
            </div>

            {confirmation ? (
              <div className="py-8 text-center">
                <div className="text-5xl">🐾</div>
                <p className="mt-4 font-bold">
                  Request ID: {confirmation.bookingId}
                </p>
                <p className="mt-2 leading-6 text-[#68766b]">
                  Your request has been saved in this browser. No provider
                  has been contacted and the appointment is not yet confirmed.
                </p>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="mt-6 rounded-full bg-[#244b37] px-7 py-3 font-semibold text-white"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="service-name" className="mb-1.5 block text-sm font-semibold">
                      Your name *
                    </label>
                    <input
                      id="service-name"
                      required
                      minLength={2}
                      maxLength={80}
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-xl border border-[#d9ded4] bg-white px-4 py-3 outline-none focus:border-[#244b37]"
                      placeholder="Full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="service-email" className="mb-1.5 block text-sm font-semibold">
                      Email *
                    </label>
                    <input
                      id="service-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-[#d9ded4] bg-white px-4 py-3 outline-none focus:border-[#244b37]"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="service-phone" className="mb-1.5 block text-sm font-semibold">
                      Mobile number *
                    </label>
                    <input
                      id="service-phone"
                      type="tel"
                      required
                      pattern="[6-9][0-9]{9}"
                      title="Enter a valid 10-digit Indian mobile number"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                      className="w-full rounded-xl border border-[#d9ded4] bg-white px-4 py-3 outline-none focus:border-[#244b37]"
                      placeholder="10-digit number"
                    />
                  </div>

                  <div>
                    <label htmlFor="service-pet" className="mb-1.5 block text-sm font-semibold">
                      Pet name *
                    </label>
                    <input
                      id="service-pet"
                      required
                      maxLength={60}
                      value={form.petName}
                      onChange={(e) => setForm({ ...form, petName: e.target.value })}
                      className="w-full rounded-xl border border-[#d9ded4] bg-white px-4 py-3 outline-none focus:border-[#244b37]"
                      placeholder="Your pet’s name"
                    />
                  </div>

                  <div>
                    <label htmlFor="service-type" className="mb-1.5 block text-sm font-semibold">
                      Pet type *
                    </label>
                    <select
                      id="service-type"
                      value={form.petType}
                      onChange={(e) => setForm({ ...form, petType: e.target.value })}
                      className="w-full rounded-xl border border-[#d9ded4] bg-white px-4 py-3 outline-none focus:border-[#244b37]"
                    >
                      <option>Dog</option>
                      <option>Cat</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="service-date" className="mb-1.5 block text-sm font-semibold">
                      Preferred date *
                    </label>
                    <input
                      id="service-date"
                      type="date"
                      required
                      min={minDate}
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full rounded-xl border border-[#d9ded4] bg-white px-4 py-3 outline-none focus:border-[#244b37]"
                    />
                  </div>

                  <div>
                    <label htmlFor="service-time" className="mb-1.5 block text-sm font-semibold">
                      Preferred time *
                    </label>
                    <select
                      id="service-time"
                      required
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      className="w-full rounded-xl border border-[#d9ded4] bg-white px-4 py-3 outline-none focus:border-[#244b37]"
                    >
                      <option value="">Choose a time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="service-address" className="mb-1.5 block text-sm font-semibold">
                    Service address *
                  </label>
                  <textarea
                    id="service-address"
                    required
                    minLength={8}
                    maxLength={300}
                    autoComplete="street-address"
                    rows={2}
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full rounded-xl border border-[#d9ded4] bg-white px-4 py-3 outline-none focus:border-[#244b37]"
                    placeholder="House number, street, city and PIN code"
                  />
                </div>

                <div>
                  <label htmlFor="service-notes" className="mb-1.5 block text-sm font-semibold">
                    Special instructions (optional)
                  </label>
                  <textarea
                    id="service-notes"
                    rows={2}
                    maxLength={500}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full rounded-xl border border-[#d9ded4] bg-white px-4 py-3 outline-none focus:border-[#244b37]"
                    placeholder="Anything we should know about your pet?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#244b37] px-6 py-3.5 font-bold text-white transition hover:bg-[#183d2b]"
                >
                  Save Booking Request →
                </button>
                <p className="text-xs leading-5 text-[#68766b]">
                  Demo only: this request is stored in your browser. No payment
                  is taken and no appointment is confirmed.
                </p>
              </form>
            )}
          </section>
        </div>
      )}
    </main>
  )
}
