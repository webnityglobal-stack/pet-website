
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#183d2b] px-5 py-10 text-white sm:px-8 md:px-10 md:py-12"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-5 gap-y-9 sm:gap-x-10 lg:grid-cols-4">

        {/* Brand: full width on mobile */}
        <div className="col-span-2 min-w-0 lg:col-span-1">
          <Link to="/" className="inline-block text-3xl font-bold">
            pawhaven<span className="text-[#d5a477]">.</span>
          </Link>

          <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
            Everything your furry family needs, with a little extra love
            in every detail.
          </p>
        </div>

        {/* Explore */}
        <div className="min-w-0">
          <h3 className="font-semibold">Explore</h3>

          <div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/70">
            <Link to="/" className="transition hover:text-white">Home</Link>
            <Link to="/pets" className="transition hover:text-white">Adopt a Pet</Link>
            <Link to="/services" className="transition hover:text-white">Pet Services</Link>
            <Link to="/about" className="transition hover:text-white">About Us</Link>
          </div>
        </div>

        {/* Shop */}
        <div className="min-w-0">
          <h3 className="font-semibold">Shop</h3>

          <div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/70">
            <Link to="/shop/food-treats" className="transition hover:text-white">
              Food &amp; Treats
            </Link>
            <Link to="/shop/accessories" className="transition hover:text-white">
              Accessories
            </Link>
            <Link to="/shop/pharmacy" className="transition hover:text-white">
              Pet Pharmacy
            </Link>
            <Link to="/shop/grooming" className="transition hover:text-white">
              Grooming &amp; Hygiene
            </Link>
          </div>
        </div>

        {/* Contact: full width on mobile */}
        <div className="col-span-2 min-w-0 lg:col-span-1">
          <h3 className="font-semibold">Get in touch</h3>

          <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
            Have a question about adoption or pet care? We would love to
            hear from you.
          </p>

          <Link
            to="/contact"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#183d2b] transition hover:bg-[#e9ede3]"
          >
            Contact Us ↗
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="mx-auto mt-9 max-w-7xl border-t border-white/20 pt-5 text-sm text-white/60 sm:mt-10 sm:pt-6">
        <p>© 2026 PawHaven. Made with love for every paw.</p>
        <p className="mt-2 text-xs leading-5">
          Demo website — products and adoption listings are illustrative.
        </p>
      </div>
    </footer>
  )
}
