import { Link } from 'react-router-dom'
import { useState } from 'react'
import { pets } from '../data/pets'
import { Heart, MessageCircle, CalendarCheck } from 'lucide-react'

// const pets = [
//   {
//     id: 1,
//     name: 'Bruno',
//     type: 'Dog',
//     breed: 'Golden Retriever',
//     age: '2 years',
//     gender: 'Male',
//     location: 'Ghaziabad, UP',
//     image:
//       'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=85',
//     description: 'Friendly, playful and loves spending time with people.',
//     color: 'bg-[#e7eee1]',
//   },
//   {
//     id: 2,
//     name: 'Luna',
//     type: 'Cat',
//     breed: 'Domestic Shorthair',
//     age: '8 months',
//     gender: 'Female',
//     location: 'Delhi, India',
//     image:
//       'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&q=85',
//     description: 'A gentle, curious kitten looking for a loving home.',
//     color: 'bg-[#f3e8dc]',
//   },
//   {
//     id: 3,
//     name: 'Coco',
//     type: 'Dog',
//     breed: 'Indie',
//     age: '1 year',
//     gender: 'Female',
//     location: 'Noida, UP',
//     image:
//       'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=85',
//     description: 'An energetic companion who enjoys walks and playtime.',
//     color: 'bg-[#e7eee1]',
//   },
//   {
//     id: 4,
//     name: 'Milo',
//     type: 'Cat',
//     breed: 'Tabby Cat',
//     age: '1.5 years',
//     gender: 'Male',
//     location: 'Ghaziabad, UP',
//     image:
//       'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=85',
//     description: 'A relaxed and affectionate cat who enjoys a cosy nap.',
//     color: 'bg-[#f3e8dc]',
//   },
//   {
//     id: 5,
//     name: 'Buddy',
//     type: 'Dog',
//     breed: 'Labrador Mix',
//     age: '3 years',
//     gender: 'Male',
//     location: 'Delhi, India',
//     image:
//       'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=85',
//     description: 'Loyal, cheerful and ready for new adventures.',
//     color: 'bg-[#e7eee1]',
//   },
//   {
//     id: 6,
//     name: 'Bella',
//     type: 'Cat',
//     breed: 'Calico',
//     age: '1 year',
//     gender: 'Female',
//     location: 'Noida, UP',
//     image:
//       'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800&q=85',
//     description: 'A sweet companion who deserves a safe, caring home.',
//     color: 'bg-[#f3e8dc]',
//   },
// ]

export default function Adopt() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [selectedPet, setSelectedPet] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    living: '',
    message: '',
  })

  const filteredPets = pets.filter((pet) => {
    const matchesType = filter === 'All' || pet.type === filter
    const searchText =
      `${pet.name} ${pet.breed} ${pet.location}`.toLowerCase()
    return matchesType && searchText.includes(search.toLowerCase().trim())
  })

  function openAdoptionForm(pet) {
    setSelectedPet(pet)
    setSubmitted(false)
    setForm({
      name: '',
      email: '',
      phone: '',
      living: '',
      message: '',
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const inquiry = {
      id: `PAW-${Date.now()}`,
      petId: selectedPet.id,
      petName: selectedPet.name,
      ...form,
      createdAt: new Date().toISOString(),
      status: 'Inquiry submitted',
    }

    try {
      const existing = JSON.parse(
        localStorage.getItem('pawhaven-adoption-inquiries') || '[]'
      )

      localStorage.setItem(
        'pawhaven-adoption-inquiries',
        JSON.stringify([
          ...(Array.isArray(existing) ? existing : []),
          inquiry,
        ])
      )

      setSubmitted(true)
    } catch {
      alert('Unable to save this inquiry. Please check browser storage.')
    }
  }

  return (
    <main className="min-h-screen bg-[#f8f7f2] text-[#183d2b]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#183d2b] px-5 py-16 text-white md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
          <div>
            <span className="inline-block rounded-full border border-white/25 px-4 py-2 text-sm text-[#e4c5a7]">
              ADOPT • LOVE • REPEAT
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
              Find your new
              <span className="block text-[#e8b98f]">
                best friend.
              </span>
            </h1>

            <p className="mt-5 max-w-lg leading-7 text-white/75">
              A little love can change two lives. Meet wonderful pets
              waiting for a caring family and a place to call home.
            </p>

            <a
              href="#available-pets"
              className="mt-8 inline-flex rounded-full bg-[#e8b98f] px-7 py-3.5 font-bold text-[#183d2b] transition hover:bg-white"
            >
              Meet the Pets →
            </a>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/75">
              <span>♡ Find companionship</span>
              <span>♡ Give love a home</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 rotate-3 rounded-[2rem] bg-[#e8b98f]/20" />
            <img
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1100&q=85"
              alt="Happy dog enjoying time outdoors"
              className="relative h-[300px] w-full rounded-[2rem] object-cover shadow-2xl md:h-[430px]"
            />
            <div className="absolute -bottom-5 left-4 rounded-2xl bg-white p-4 text-[#183d2b] shadow-lg md:left-8">
              <p className="font-bold">Every paw deserves love.</p>
              <p className="mt-1 text-sm text-gray-500">
                Your next chapter starts here.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-5 py-14 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a66c43]">
          Meet your match
        </p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">
          Friends waiting for you
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#68766b]">
          Every pet has a personality, a story and lots of love to give.
          Explore our demo listings to find your perfect companion.
        </p>
      </section>

      {/* Pet listing */}
      <section
        id="available-pets"
        className="scroll-mt-8 px-5 pb-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold">Pets for adoption</h2>
              <p className="mt-1 text-sm text-[#68766b]">
                Find a friend who feels like family.
              </p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, breed or location..."
              aria-label="Search pets"
              className="w-full rounded-full border border-[#d9ded4] bg-white px-5 py-3 outline-none focus:border-[#244b37] md:max-w-sm"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {['All', 'Dog', 'Cat'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilter(type)}
                className={`rounded-full px-6 py-2.5 font-semibold transition ${filter === type
                  ? 'bg-[#244b37] text-white'
                  : 'border border-[#d9ded4] bg-white text-[#244b37] hover:bg-[#e6efe5]'
                  }`}
              >
                {type === 'All' ? 'All Pets' : `${type}s`}
              </button>
            ))}
          </div>

          <p className="mt-6 text-sm text-[#68766b]">
            Showing {filteredPets.length}{' '}
            {filteredPets.length === 1 ? 'pet' : 'pets'}
          </p>

          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPets.map((pet) => (
              <article
                key={pet.id}
                className="group overflow-hidden rounded-3xl border border-[#e2e7dc] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={pet.image}
                    alt={pet.name}
                    loading="lazy"
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#244b37]">
                    Looking for a home
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-bold">{pet.name}</h3>
                      <p className="mt-1 text-sm text-[#68766b]">
                        {pet.breed}
                      </p>
                    </div>
                    <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${pet.color}`}>
                      {pet.type}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-[#526457]">
                    <span className="rounded-lg bg-[#f8f7f2] px-3 py-2">
                      {pet.age}
                    </span>
                    <span className="rounded-lg bg-[#f8f7f2] px-3 py-2">
                      {pet.gender}
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-[#68766b]">
                    {pet.description}
                  </p>

                  <p className="mt-4 text-sm text-[#526457]">
                    <span className="mr-1">⌖</span>
                    {pet.location}
                  </p>

                  <Link
                    to={`/pets/${pet.id}`}
                    className="mt-5 block w-full rounded-full bg-[#244b37] px-5 py-3.5 text-center font-semibold text-white transition hover:bg-[#183d2b]"
                  >
                    Meet {pet.name} →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredPets.length === 0 && (
            <div className="mt-8 rounded-3xl border border-[#e2e7dc] bg-white px-6 py-12 text-center">
              <p className="text-xl font-bold">No pets found</p>
              <p className="mt-2 text-[#68766b]">
                Try a different search or select another category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearch('')
                  setFilter('All')
                }}
                className="mt-5 rounded-full bg-[#244b37] px-6 py-3 font-semibold text-white"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Adoption steps */}
      <section className="bg-[#e8eee3] px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a66c43]">
              Simple and thoughtful
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              How adoption works
            </h2>
          </div>


          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Heart,
                title: 'Meet a pet',
                description:
                  'Explore profiles and choose a companion that suits your home and lifestyle.',
              },
              {
                icon: MessageCircle,
                title: 'Send an inquiry',
                description:
                  'Share a few details so the adoption team can learn more about you.',
              },
              {
                icon: CalendarCheck,
                title: 'Plan a meeting',
                description:
                  'Discuss suitability, care needs and next steps with the responsible caretaker.',
              },
            ].map((step) => {
              const Icon = step.icon

              return (
                <div
                  key={step.title}
                  className="rounded-3xl bg-white p-7"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8eee3] text-[#244b37]">
                    <Icon size={28} strokeWidth={1.8} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold">{step.title}</h3>

                  <p className="mt-3 leading-7 text-[#68766b]">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>


          <p className="mt-7 text-center text-sm leading-6 text-[#526457]">
            These are illustrative demo listings. Please verify pet availability
            and adoption arrangements with a legitimate shelter or caretaker.
          </p>
        </div>
      </section>

      {/* Adoption inquiry modal */}
      {selectedPet && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedPet(null)
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="adoption-title"
            className="my-auto w-full max-w-xl rounded-3xl bg-[#f8f7f2] p-6 shadow-2xl md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-[#a66c43]">
                  Adoption inquiry
                </p>
                <h2
                  id="adoption-title"
                  className="mt-2 text-2xl font-bold text-[#183d2b]"
                >
                  {submitted
                    ? 'Thank you! ♡'
                    : `Meet ${selectedPet.name}`}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPet(null)}
                aria-label="Close form"
                className="rounded-full border border-[#d9ded4] px-3 py-1 text-xl text-[#244b37]"
              >
                ×
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center">
                <div className="text-5xl">🐾</div>
                <p className="mt-4 font-semibold text-[#183d2b]">
                  Your inquiry has been saved in this browser.
                </p>
                <p className="mt-2 text-sm leading-6 text-[#68766b]">
                  This is a frontend demo. No shelter has been contacted and
                  no adoption has been confirmed.
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedPet(null)}
                  className="mt-6 rounded-full bg-[#244b37] px-7 py-3 font-semibold text-white"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <p className="text-sm text-[#68766b]">
                  Tell us a little about yourself and your interest in{' '}
                  {selectedPet.name}.
                </p>

                <div>
                  <label htmlFor="adopter-name" className="mb-1.5 block text-sm font-semibold">
                    Full name *
                  </label>
                  <input
                    id="adopter-name"
                    required
                    minLength={2}
                    maxLength={80}
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full rounded-xl border border-[#d9ded4] bg-white px-4 py-3 outline-none focus:border-[#244b37]"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="adopter-email" className="mb-1.5 block text-sm font-semibold">
                      Email *
                    </label>
                    <input
                      id="adopter-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full rounded-xl border border-[#d9ded4] bg-white px-4 py-3 outline-none focus:border-[#244b37]"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="adopter-phone" className="mb-1.5 block text-sm font-semibold">
                      Mobile number *
                    </label>
                    <input
                      id="adopter-phone"
                      type="tel"
                      required
                      pattern="[6-9][0-9]{9}"
                      title="Enter a valid 10-digit Indian mobile number"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: e.target.value.replace(/\D/g, '').slice(0, 10),
                        })
                      }
                      className="w-full rounded-xl border border-[#d9ded4] bg-white px-4 py-3 outline-none focus:border-[#244b37]"
                      placeholder="10-digit number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="adopter-living" className="mb-1.5 block text-sm font-semibold">
                    Your living arrangement *
                  </label>
                  <select
                    id="adopter-living"
                    required
                    value={form.living}
                    onChange={(e) =>
                      setForm({ ...form, living: e.target.value })
                    }
                    className="w-full rounded-xl border border-[#d9ded4] bg-white px-4 py-3 outline-none focus:border-[#244b37]"
                  >
                    <option value="">Select an option</option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="adopter-message" className="mb-1.5 block text-sm font-semibold">
                    Message (optional)
                  </label>
                  <textarea
                    id="adopter-message"
                    rows={3}
                    maxLength={500}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full resize-y rounded-xl border border-[#d9ded4] bg-white px-4 py-3 outline-none focus:border-[#244b37]"
                    placeholder="Tell us about your home or pet experience..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#244b37] px-6 py-3.5 font-bold text-white transition hover:bg-[#183d2b]"
                >
                  Submit Inquiry →
                </button>
              </form>
            )}
          </section>
        </div>
      )}
    </main>
  )
}
