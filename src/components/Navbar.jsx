import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from "../context/WishlistContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const { wishlist } = useWishlist();
  const wishlistCount = wishlist.length;

  const { totalItems } = useCart()

  const categories = [
    { name: 'Food & Treats', path: '/shop/food-treats', icon: '🥣' },
    { name: 'Accessories', path: '/shop/accessories', icon: '🦴' },
    { name: 'Pet Pharmacy', path: '/shop/pharmacy', icon: '🩺' },
    { name: 'Supplements & Wellness', path: '/shop/wellness', icon: '🌿' },
    { name: 'Grooming & Hygiene', path: '/shop/grooming', icon: '🛁' },
    { name: 'Apparel', path: '/shop/apparel', icon: '👕' },
  ]

  const navLinks = [
    { name: 'Adopt a Pet', path: '/pets' },
    { name: 'Pet Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  function closeMenus() {
    setMenuOpen(false)
    setShopOpen(false)
  }

  const linkStyle = ({ isActive }) =>
    `whitespace-nowrap text-md font-medium transition-colors ${isActive
      ? 'text-[#a66c43]'
      : 'text-[#526457] hover:text-[#a66c43]'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-[#e6e5dc] bg-[#f8f7f2]/95 backdrop-blur-md">

      {/* Top announcement bar */}
      <div className="bg-[#244b37] px-4 py-2 text-center text-xs font-medium tracking-wide text-white">
        A little love goes a long way — find everything your pet needs ♥
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8 lg:px-10">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenus}
          className="shrink-0 text-2xl font-bold tracking-tight text-[#183d2b] md:text-3xl"
        >
          pawhaven<span className="text-[#b77b50]">.</span>
          <span className="mt-0.5 block text-[9px] font-medium uppercase tracking-[0.22em] text-[#68766b]">
            For every paw
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-5 xl:flex">

          <NavLink to="/" end className={linkStyle}>
            Home
          </NavLink>

          {/* Shop Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button
              type="button"
              onClick={() => setShopOpen(!shopOpen)}
              aria-expanded={shopOpen}
              className="flex items-center gap-1 whitespace-nowrap py-2 text-md font-medium text-[#526457] transition-colors hover:text-[#a66c43]"
            >
              Shop
              <span className={`text-xs transition-transform ${shopOpen ? 'rotate-180' : ''}`}>
                ▾
              </span>
            </button>

            {shopOpen && (
              <div className="absolute left-0 top-full z-50 w-72 rounded-2xl border border-[#e6e5dc] bg-white p-3 shadow-xl">
                <p className="px-3 pb-2 pt-1 text-xs font-bold uppercase tracking-widest text-[#a66c43]">
                  Shop by category
                </p>

                {categories.map((category) => (
                  <Link
                    key={category.path}
                    to={category.path}
                    onClick={closeMenus}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-md text-[#526457] transition hover:bg-[#f1f2e9] hover:text-[#183d2b]"
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.name}</span>
                    <span className="ml-auto">↗</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={linkStyle}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
          
        <Link
          to="/wishlist"
          onClick={closeMenus}
          className="relative inline-flex items-center justify-center text-[#244b37]"
          aria-label={`Wishlist, ${wishlistCount} products`}
        >
          <span className="text-2xl">♡</span>

          {wishlistCount > 0 && (
            <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#c96f42] px-1 text-xs font-bold text-white">
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* Desktop Cart */}

        <Link
          to="/cart"
          onClick={closeMenus}
          className="relative inline-flex items-center justify-center p-2 text-[#244b37]"
        >
          <span className="text-2xl">🛒</span>

          {totalItems > 0 && (
            <span className="absolute right-0 top-0 flex h-5 min-w-5 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-[#d97736] px-1 text-[11px] font-bold text-white ring-2 ring-white">
              {totalItems > 99 ? '99+' : totalItems}
            </span>
          )}
        </Link>
        <Link
          to="/orders"
          className="font-medium text-[#244b37] transition hover:text-[#a66c43]"
        >
          Orders
        </Link>


        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#dce1d7] text-2xl text-[#183d2b] xl:hidden"
        >
          {menuOpen ? '×' : '☰'}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="max-h-[75vh] overflow-y-auto border-t border-[#e6e5dc] bg-[#f8f7f2] px-5 py-4 xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">

            <NavLink
              to="/"
              end
              onClick={closeMenus}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-md font-medium ${isActive ? 'bg-[#e9ede3] text-[#183d2b]' : 'text-[#526457]'
                }`
              }
            >
              Home
            </NavLink>

            {/* Mobile Shop Dropdown */}
            <button
              type="button"
              onClick={() => setShopOpen(!shopOpen)}
              aria-expanded={shopOpen}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-left text-md font-medium text-[#526457] hover:bg-[#e9ede3]"
            >
              Shop
              <span>{shopOpen ? '−' : '+'}</span>
            </button>

            {shopOpen && (
              <div className="ml-3 flex flex-col border-l-2 border-[#d9ded4] pl-3">
                {categories.map((category) => (
                  <Link
                    key={category.path}
                    to={category.path}
                    onClick={closeMenus}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-md text-[#526457] hover:bg-[#e9ede3]"
                  >
                    <span>{category.icon}</span>
                    {category.name}
                  </Link>
                ))}
              </div>
            )}

            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenus}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-md font-medium ${isActive
                    ? 'bg-[#e9ede3] text-[#183d2b]'
                    : 'text-[#526457]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/wishlist"
              onClick={closeMenus}
              className="mt-2 flex items-center justify-center gap-2 rounded-full border border-[#d9ded4] px-5 py-3 font-semibold text-[#244b37]"
            >
              ♡
            </Link>

            <Link
              to="/cart"
              onClick={closeMenus}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-[#d9ded4] px-5 py-3 text-md font-semibold text-[#244b37]"
            >
              🛒 View Cart

              {totalItems > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d97736] px-1 text-xs font-bold text-white">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>


            <Link
              to="/pets"
              onClick={closeMenus}
              className="mt-2 rounded-full bg-[#244b37] px-5 py-3.5 text-center text-md font-semibold text-white"
            >
              Adopt a Friend ↗
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}