
const values = [
  {
    icon: '♡',
    title: 'Love Comes First',
    description:
      'Every pet deserves kindness, patience and a safe place to call home.',
  },
  {
    icon: '🐾',
    title: 'Thoughtful Pet Care',
    description:
      'We help pet parents discover products and services for everyday care.',
  },
  {
    icon: '🌿',
    title: 'A Happier Everyday',
    description:
      'We aim to make caring for your furry family simpler, warmer and more joyful.',
  },
]

const offerings = [
  {
    number: '01',
    title: 'Shop Pet Essentials',
    description:
      'Explore food, treats, accessories and everyday essentials for your companion.',
    href: '/shop',
    linkText: 'Explore Shop',
  },
  {
    number: '02',
    title: 'Discover Pet Services',
    description:
      'Find grooming, walking, training and care options for your pet.',
    href: '/services',
    linkText: 'View Services',
  },
  {
    number: '03',
    title: 'Adopt a Pet',
    description:
      'Explore our illustrative pet listings and learn about finding a companion.',
    href: '/pets',
    linkText: 'Meet the Pets',
  },
]

export default function About() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f7f2] text-[#183d2b]">
      {/* Hero */}
      <section className="bg-[#183d2b] px-5 py-10 text-white md:py-10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <span className="inline-block rounded-full border border-white/25 px-4 py-2 text-sm font-medium tracking-wide text-[#e8b98f]">
              OUR STORY • OUR LOVE FOR PETS
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight md:text-6xl">
              More than a pet store.
              <span className="mt-2 block text-[#e8b98f]">
                A little more love.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/75 md:text-lg">
              At PawHaven, we believe pets make our lives brighter.
              Our goal is to make everyday pet care easier by bringing
              pet essentials, helpful services and adoption discovery
              together in one welcoming place.
            </p>

            <a
              href="/shop"
              className="mt-8 inline-flex items-center rounded-full bg-[#e8b98f] px-7 py-3.5 font-bold text-[#183d2b] transition hover:bg-white"
            >
              Discover PawHaven →
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-3 rotate-3 rounded-[2rem] bg-[#e8b98f]/20" />
            <img
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1100&q=85"
              alt="Happy dogs enjoying time together outdoors"
              className="relative h-[320px] w-full rounded-[2rem] object-cover shadow-2xl md:h-[450px]"
            />
            <div className="absolute -bottom-5 left-4 rounded-2xl bg-white p-4 text-[#183d2b] shadow-xl md:left-8">
              <p className="font-bold">For every furry friend ♡</p>
              <p className="mt-1 text-sm text-[#68766b]">
                Care, comfort and companionship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="px-5 py-10 md:py-10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=700&q=85"
              alt="Dog looking happily at the camera"
              loading="lazy"
              className="mt-10 h-64 w-full rounded-3xl object-cover md:h-80"
            />
            <img
              src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=700&q=85"
              alt="Cat relaxing comfortably"
              loading="lazy"
              className="h-64 w-full rounded-3xl object-cover md:h-80"
            />
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a66c43]">
              Who we are
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              Every paw has a story. We’re here to support yours.
            </h2>

            <p className="mt-5 leading-8 text-[#68766b]">
              Being a pet parent is full of little moments: the first
              playful walk, a favourite treat, a cosy nap and the
              unconditional love waiting at the door.
            </p>

            <p className="mt-4 leading-8 text-[#68766b]">
              PawHaven is designed around those moments. We bring together
              a pet shopping experience, useful care services and a place
              to discover pets looking for a loving home.
            </p>

            <p className="mt-4 leading-8 text-[#68766b]">
              Our aim is simple: help pet parents make thoughtful choices
              and make every day with their companions a little better.
            </p>

            <div className="mt-7 rounded-2xl border-l-4 border-[#a66c43] bg-[#e8eee3] p-5">
              <p className="text-lg font-semibold leading-7">
                “Little paws leave the biggest footprints on our hearts.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and vision */}
      <section className="bg-[#e8eee3] px-5 py-10 md:py-15">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a66c43]">
              What guides us
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Our mission & vision
            </h2>
            <p className="mt-4 leading-7 text-[#68766b]">
              A pet-friendly experience built around care, convenience
              and the bond we share with animals.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl bg-white p-7 md:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8eee3] text-3xl">
                🎯
              </div>
              <h3 className="mt-5 text-2xl font-bold">Our Mission</h3>
              <p className="mt-4 leading-8 text-[#68766b]">
                To help pet parents discover useful products, everyday
                care options and helpful information so they can care
                for their companions with greater confidence.
              </p>
            </article>

            <article className="rounded-3xl bg-[#183d2b] p-7 text-white md:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                🌱
              </div>
              <h3 className="mt-5 text-2xl font-bold">Our Vision</h3>
              <p className="mt-4 leading-8 text-white/75">
                To build a welcoming pet community where thoughtful
                ownership, responsible care and the happiness of every
                animal are valued.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="px-5 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a66c43]">
              The PawHaven promise
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              The values behind every paw
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-3xl border border-[#e2e7dc] bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8eee3] text-3xl text-[#244b37]">
                  {value.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold">{value.title}</h3>
                <p className="mt-3 leading-7 text-[#68766b]">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Explore PawHaven */}
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] bg-[#f0e5d7] px-6 py-12 md:px-12 md:py-14">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#a66c43]">
                Your pet journey starts here
              </p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Find everything for your furry family.
              </h2>
              <p className="mt-4 leading-7 text-[#68766b]">
                Explore PawHaven and discover the parts of pet care that
                matter most to you.
              </p>
            </div>

            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {offerings.map((item) => (
                <article
                  key={item.number}
                  className="rounded-3xl bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="text-sm font-bold tracking-widest text-[#a66c43]">
                    {item.number}
                  </span>
                  <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 min-h-[72px] leading-7 text-[#68766b]">
                    {item.description}
                  </p>
                  <a
                    href={item.href}
                    className="mt-5 inline-flex font-bold text-[#244b37] hover:underline"
                  >
                    {item.linkText} →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-5 pb-10">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#183d2b] px-6 py-12 text-center text-white md:px-12 md:py-16">
          <p className="text-4xl">🐾</p>
          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Because they’re family.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-white/75">
            Discover the PawHaven experience and make room for more
            happy moments with your companion.
          </p>
          <a
            href="/shop"
            className="mt-7 inline-flex rounded-full bg-[#e8b98f] px-7 py-3.5 font-bold text-[#183d2b] transition hover:bg-white"
          >
            Shop Pet Essentials →
          </a>
        </div>
      </section>
    </main>
  )
}
