import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { products } from './Shop.jsx'


export default function ProductDetails() {
  const [added, setAdded] = useState(false)
  const { id } = useParams()
  const { addToCart } = useCart()

  const product = products.find(
    (item) => item.id === Number(id)
  )

  if (!product) {
    return (
      <main className="min-h-[60vh] bg-[#f8f7f0] px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-[#174c35]">
          Product not found
        </h1>
        <p className="mt-3 text-gray-600">
          This product could not be found.
        </p>
        <Link
          to="/shop"
          className="mt-6 inline-block rounded-lg bg-[#174c35] px-6 py-3 font-semibold text-white"
        >
          Back to Shop
        </Link>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f8f7f0] px-5 py-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/shop"
          className="mb-8 inline-block text-sm font-semibold text-[#174c35] hover:underline"
        >
          ← Back to Shop
        </Link>

        <div className="grid gap-10 rounded-2xl bg-white p-5 shadow-sm md:grid-cols-2 md:p-10">
          <div className="flex min-h-[320px] items-center justify-center rounded-xl bg-[#f5f3e9] p-4">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-[430px] w-full rounded-xl object-contain"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#7b8c54]">
              {product.category.replaceAll('-', ' ')}
            </p>

            <h1 className="mt-3 text-3xl font-bold text-[#174c35] md:text-4xl">
              {product.name}
            </h1>

            <p className="mt-5 text-2xl font-bold text-[#174c35]">
              ₹{product.price.toLocaleString('en-IN')}
            </p>

            <p className="mt-5 leading-7 text-gray-600">
              {product.description}
            </p>


            <button
              type="button"
              onClick={() => {
                addToCart(product)
                setAdded(true)
              }}
              className={`mt-8 rounded-lg px-6 py-3.5 font-semibold transition ${added
                ? 'border border-[#d9ded4] bg-[#e8f0e6] text-[#174c35]'
                : 'bg-[#174c35] text-white hover:bg-[#246747]'
                }`}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>


            <p className="mt-4 text-sm text-gray-500">
              Pet-friendly shopping, made simple.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
