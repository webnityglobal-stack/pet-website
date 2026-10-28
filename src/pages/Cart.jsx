
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart()

  return (
    <main className="min-h-screen bg-[#f8f7f0] px-5 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-[#174c35] md:text-4xl">
          Your Shopping Cart
        </h1>
        <p className="mt-2 text-gray-600">
          {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
        </p>

        {cart.length === 0 ? (
          <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="text-5xl">🛒</div>
            <h2 className="mt-4 text-2xl font-semibold text-[#174c35]">
              Your cart is empty
            </h2>
            <p className="mt-2 text-gray-600">
              Find something special for your furry friend.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-block rounded-lg bg-[#174c35] px-6 py-3 font-semibold text-white hover:bg-[#246747]"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-28 w-full rounded-xl bg-[#f5f3e9] object-contain sm:w-28"
                  />

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-[#174c35]">
                      {item.name}
                    </h2>
                    <p className="mt-1 font-bold">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="h-9 w-9 rounded-lg border border-gray-300 disabled:opacity-40"
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        −
                      </button>

                      <span className="min-w-5 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="h-9 w-9 rounded-lg border border-gray-300"
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <p className="font-bold text-[#174c35]">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm font-semibold text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#174c35]">
                Order Summary
              </h2>

              <div className="mt-6 flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>

              <div className="mt-4 flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="my-5 border-t border-gray-200" />

              <div className="flex justify-between text-lg font-bold text-[#174c35]">
                <span>Total</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>


              <Link
                to="/checkout"
                className="mt-6 flex w-full items-center justify-center rounded-full bg-[#244b37] px-5 py-4 font-semibold text-white transition hover:bg-[#183d2b]"
              >
                Proceed to Checkout →
              </Link>


              <Link
                to="/shop"
                className="mt-4 block text-center text-sm font-semibold text-[#174c35] hover:underline"
              >
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
