import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-[#183d2b] px-6 py-12 text-white md:px-10"
    >
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">

        <div>
          <Link to="/" className="text-3xl font-bold">
            pawhaven<span className="text-[#d5a477]">.</span>
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">
            Everything your furry family needs, with a little extra love
            in every detail.
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Explore</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/pets" className="hover:text-white">Adopt a Pet</Link>
            <Link to="/services" className="hover:text-white">Pet Services</Link>
            <Link to="/about" className="hover:text-white">About Us</Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Shop</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
            <Link to="/shop/food-treats" className="hover:text-white">
              Food & Treats
            </Link>
            <Link to="/shop/accessories" className="hover:text-white">
              Accessories
            </Link>
            <Link to="/shop/pharmacy" className="hover:text-white">
              Pet Pharmacy
            </Link>
            <Link to="/shop/grooming" className="hover:text-white">
              Grooming & Hygiene
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Get in touch</h3>
          <p className="mt-4 text-sm leading-6 text-white/70">
            Have a question about adoption or pet care? We would love to
            hear from you.
          </p>

          <Link
            to="/contact"
            className="mt-4 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#183d2b] transition hover:bg-[#e9ede3]"
          >
            Contact Us ↗
          </Link>
        </div>

      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-white/20 pt-6 text-sm text-white/60">
        <p>© 2026 PawHaven. Made with love for every paw.</p>
        <p className="mt-2 text-xs">
          Demo website — products and adoption listings are illustrative.
        </p>
      </div>
    </footer>
  )
}