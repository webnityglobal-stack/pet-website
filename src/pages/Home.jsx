import { useState } from 'react'

const pets = [
  {
    id: 1,
    name: 'Bruno',
    breed: 'Golden Retriever',
    age: '2 years',
    type: 'Dog',
    image:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 2,
    name: 'Luna',
    breed: 'Persian Cat',
    age: '1 year',
    type: 'Cat',
    image:
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 3,
    name: 'Charlie',
    breed: 'Beagle',
    age: '8 months',
    type: 'Dog',
    image:
      'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=800&q=85',
  },
]

const categories = [
  {
    name: 'Food & Treats',
    icon: '🥣',
    path: '/shop/food-treats',
  },
  {
    name: 'Accessories',
    icon: '🦴',
    path: '/shop/accessories',
  },
  {
    name: 'Pet Pharmacy',
    icon: '🩺',
    path: '/shop/pharmacy',
  },
  {
    name: 'Supplements & Wellness',
    icon: '🌿',
    path: '/shop/wellness',
  },
  {
    name: 'Grooming & Hygiene',
    icon: '🛁',
    path: '/shop/grooming',
  },
  {
    name: 'Apparel',
    icon: '👕',
    path: '/shop/apparel',
  },
]

export default function Home() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filteredPets = pets.filter((pet) => {
    const matchesType = filter === 'All' || pet.type === filter

    const matchesSearch = `${pet.name} ${pet.breed}`
      .toLowerCase()
      .includes(search.toLowerCase())

    return matchesType && matchesSearch
  })

  return (
    <main className="bg-[#f8f7f2] text-[#183d2b]">

      {/* Hero Section */}
      <section
        id="home"
        className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:grid-cols-2 md:px-10 md:py-24 lg:px-16"
      >
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#a66c43]">
            Everything for your furry family
          </p>

          <h1 className="max-w-xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            More love.
            <br />
            More <span className="font-serif italic text-[#a66c43]">paws.</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-[#68766b]">
            Discover everyday essentials for your pets, find your new
            best friend and make every little moment special.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#categories"
              className="rounded-full bg-[#244b37] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#183d2b]"
            >
              Explore the shop ↗
            </a>

            <a
              href="#pets"
              className="rounded-full border border-[#d9ded4] px-7 py-4 text-sm font-semibold text-[#244b37] transition hover:bg-[#e9ede3]"
            >
              Adopt a friend
            </a>
          </div>

          <p className="mt-8 text-sm text-[#68766b]">
            ♥ Made for pets. Chosen with love.
          </p>
        </div>

        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1100&q=90"
            alt="Happy dog"
            className="h-[350px] w-full rounded-[2rem] object-cover md:h-[500px]"
          />

          <div className="absolute bottom-5 left-5 rounded-2xl bg-white/95 px-5 py-4 shadow-lg">
            <p className="font-semibold">For every paw.</p>
            <p className="mt-1 text-xs text-[#68766b]">
              A happier life starts here.
            </p>
          </div>
        </div>
      </section>

      {/* Shopping Categories */}
      <section
        id="categories"
        className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16"
      >
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a66c43]">
            The PawHaven collection
          </p>

          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            Shop your pet's favourites.
          </h2>

          <p className="mt-3 text-sm text-[#68766b]">
            Everyday essentials, all in one happy place.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <a
              key={category.path}
              href={category.path}
              className="rounded-2xl border border-[#e6e5dc] bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-3xl">{category.icon}</span>

              <h3 className="mt-4 text-sm font-semibold">
                {category.name}
              </h3>

              <p className="mt-2 text-xs text-[#a66c43]">
                Explore ↗
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Adoption Section */}
      <section
        id="pets"
        className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16"
      >
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a66c43]">
              Find your match
            </p>

            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              Meet your new best friend.
            </h2>

            <p className="mt-3 text-sm text-[#68766b]">
              Every adoption can start a beautiful story.
            </p>
          </div>

          <a
            href="/pets"
            className="text-sm font-semibold text-[#a66c43] hover:underline"
          >
            View all pets ↗
          </a>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by pet name or breed..."
            aria-label="Search pets"
            className="w-full rounded-full border border-[#d9ded4] bg-white px-5 py-3.5 text-sm outline-none focus:border-[#244b37] sm:max-w-sm"
          />

          <div className="flex gap-2">
            {['All', 'Dog', 'Cat'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFilter(type)}
                className={`rounded-full border px-5 py-3 text-sm ${
                  filter === type
                    ? 'border-[#244b37] bg-[#244b37] text-white'
                    : 'border-[#d9ded4] bg-white text-[#244b37]'
                }`}
              >
                {type === 'All' ? 'All pets' : `${type}s`}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPets.map((pet) => (
            <article
              key={pet.id}
              className="overflow-hidden rounded-3xl border border-[#e6e5dc] bg-white transition hover:-translate-y-1 hover:shadow-lg"
            >
              <img
                src={pet.image}
                alt={pet.name}
                loading="lazy"
                className="h-64 w-full object-cover"
              />

              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-semibold">{pet.name}</h3>

                  <span className="rounded-full bg-[#f1f2e9] px-3 py-1.5 text-xs">
                    {pet.type}
                  </span>
                </div>

                <p className="mt-2 text-sm text-[#68766b]">
                  {pet.breed} · {pet.age}
                </p>

                <a
                  href={`mailto:hello@example.com?subject=${encodeURIComponent(`Adoption enquiry for ${pet.name}`)}`}
                  className="mt-6 block rounded-full border border-[#244b37] px-5 py-3 text-center text-sm font-semibold hover:bg-[#244b37] hover:text-white"
                >
                  Meet {pet.name} ↗
                </a>
              </div>
            </article>
          ))}
        </div>

        {filteredPets.length === 0 && (
          <p className="mt-8 rounded-2xl bg-white p-8 text-center text-[#68766b]">
            No pets found. Try another search.
          </p>
        )}
      </section>

      {/* Mission Section */}
      <section
        id="about"
        className="bg-[#e9ede3] px-6 py-16 text-center md:px-16 md:py-24"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a66c43]">
          More than a pet store
        </p>

        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold md:text-5xl">
          Care that goes beyond the bowl.
        </h2>

        <p className="mx-auto mt-5 max-w-xl leading-7 text-[#68766b]">
          From everyday essentials to helping pets find loving homes,
          PawHaven is built around the happiness and wellbeing of animals.
        </p>

        <a
          href="/about"
          className="mt-8 inline-flex rounded-full bg-[#244b37] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#183d2b]"
        >
          Discover our story ↗
        </a>
      </section>

    </main>
  )
}