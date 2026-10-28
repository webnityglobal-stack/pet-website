
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  function moveToCart(product) {
    addToCart(product)
    removeFromWishlist(product.id)
  }

  return (
    <main className="min-h-screen bg-[#f8f7f2] px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/shop"
          className="text-sm font-semibold text-[#244b37] hover:underline"
        >
          ← Continue Shopping
        </Link>

        <div className="mt-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a66c43]">
            PawHaven Pet Store
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#183d2b] md:text-4xl">
            My Wishlist ♡
          </h1>
          <p className="mt-3 text-[#68766b]">
            Keep your pet’s favourite products in one place.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <section className="mt-8 rounded-3xl border border-[#e2e7dc] bg-white px-6 py-14 text-center shadow-sm">
            <div className="text-6xl" aria-hidden="true">♡</div>
            <h2 className="mt-5 text-2xl font-bold text-[#183d2b]">
              Your wishlist is empty
            </h2>
            <p className="mt-3 text-[#68766b]">
              Tap the heart on a product to save it here.
            </p>
            <Link
              to="/shop"
              className="mt-7 inline-flex rounded-full bg-[#244b37] px-7 py-3 font-semibold text-white transition hover:bg-[#183d2b]"
            >
              Explore Products
            </Link>
          </section>
        ) : (
          <>
            <p className="mt-7 font-medium text-[#526457]">
              {wishlist.length} saved{' '}
              {wishlist.length === 1 ? 'product' : 'products'}
            </p>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {wishlist.map((product) => (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-3xl border border-[#e2e7dc] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="block bg-[#f5f3e9] p-4"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-52 w-full object-contain"
                    />
                  </Link>

                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#8b9667]">
                      {String(product.category || '').replaceAll('-', ' ')}
                    </p>

                    <Link
                      to={`/product/${product.id}`}
                      className="mt-2 block text-lg font-bold text-[#183d2b] hover:underline"
                    >
                      {product.name}
                    </Link>

                    <p className="mt-2 text-xl font-bold text-[#244b37]">
                      ₹{Number(product.price || 0).toLocaleString('en-IN')}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => moveToCart(product)}
                        className="rounded-full bg-[#244b37] px-3 py-3 text-sm font-semibold text-white transition hover:bg-[#183d2b]"
                      >
                        Move to Cart
                      </button>

                      <button
                        type="button"
                        onClick={() => removeFromWishlist(product.id)}
                        className="rounded-full border border-[#d9ded4] px-3 py-3 text-sm font-semibold text-[#8b3e3e] transition hover:bg-[#fbefed]"
                      >
                        Remove ♡
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
