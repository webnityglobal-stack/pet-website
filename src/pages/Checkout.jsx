
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const initialForm = {
  name: '',
  phone: '',
  email: '',
  address: '',
  landmark: '',
  city: '',
  state: '',
  pincode: '',
}

export default function Checkout() {
  const { cart, totalItems, totalPrice, clearCart } = useCart()

  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [confirmedOrder, setConfirmedOrder] = useState(null)

  const shipping = totalPrice >= 999 || totalPrice === 0 ? 0 : 49
  const grandTotal = totalPrice + shipping

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: name === 'phone' || name === 'pincode'
        ? value.replace(/\D/g, '')
        : value,
    }))

    setErrors((current) => ({
      ...current,
      [name]: '',
    }))
  }

  function validateForm() {
    const nextErrors = {}

    if (form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name.'
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      nextErrors.phone = 'Enter a valid 10-digit Indian mobile number.'
    }

    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      nextErrors.email = 'Enter a valid email address.'
    }

    if (form.address.trim().length < 10) {
      nextErrors.address = 'Enter your complete address (at least 10 characters).'
    }

    if (!form.city.trim()) {
      nextErrors.city = 'Please enter your city.'
    }

    if (!form.state.trim()) {
      nextErrors.state = 'Please enter your state.'
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      nextErrors.pincode = 'Enter a valid 6-digit PIN code.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (cart.length === 0) return
    if (!validateForm()) return

    const order = {
      id: `PH${Date.now().toString().slice(-8)}`,
      customer: { ...form },
      items: cart.map((item) => ({ ...item })),
      totalItems,
      subtotal: totalPrice,
      shipping,
      total: grandTotal,
      paymentMethod,
      status: 'Order placed',
      createdAt: new Date().toLocaleString('en-IN'),
    }

    try {
      const previousOrders = JSON.parse(
        localStorage.getItem('pawhaven-orders') || '[]'
      )
      localStorage.setItem(
        'pawhaven-orders',
        JSON.stringify([order, ...previousOrders])
      )
    } catch {
      // The confirmation can still be shown if browser storage is unavailable.
    }

    setConfirmedOrder(order)
    clearCart()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (confirmedOrder) {
    return (
      <main className="min-h-screen bg-[#f8f7f2] px-5 py-12">
        <div className="mx-auto max-w-2xl rounded-3xl border border-[#e2e7dc] bg-white p-6 text-center shadow-sm md:p-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#e6efe5] text-4xl text-[#244b37]">
            ✓
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[#a66c43]">
            Thank you for shopping with us
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#183d2b] md:text-4xl">
            Your order is placed!
          </h1>

          <p className="mt-4 leading-7 text-[#68766b]">
            Thank you, {confirmedOrder.customer.name}. Your PawHaven demo
            order has been recorded in this browser.
          </p>

          <div className="mt-8 rounded-2xl bg-[#f5f3e9] p-5 text-left">
            <div className="flex flex-wrap justify-between gap-2">
              <span className="text-[#68766b]">Order ID</span>
              <strong className="text-[#174c35]">
                {confirmedOrder.id}
              </strong>
            </div>

            <div className="mt-4 flex justify-between gap-2">
              <span className="text-[#68766b]">Items</span>
              <strong className="text-[#174c35]">
                {confirmedOrder.totalItems}
              </strong>
            </div>

            <div className="mt-4 flex justify-between gap-2">
              <span className="text-[#68766b]">Payment</span>
              <strong className="text-[#174c35]">
                Cash on Delivery
              </strong>
            </div>

            <div className="mt-4 flex justify-between gap-2 border-t border-[#d9ded4] pt-4">
              <span className="font-semibold text-[#183d2b]">Order total</span>
              <strong className="text-xl text-[#174c35]">
                ₹{confirmedOrder.total.toLocaleString('en-IN')}
              </strong>
            </div>
          </div>

          <p className="mt-5 text-sm text-[#68766b]">
            Delivery address: {confirmedOrder.customer.address},{' '}
            {confirmedOrder.customer.city}, {confirmedOrder.customer.state} –{' '}
            {confirmedOrder.customer.pincode}
          </p>

          <Link
            to="/shop"
            className="mt-8 inline-flex rounded-full bg-[#244b37] px-7 py-3.5 font-semibold text-white transition hover:bg-[#183d2b]"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    )
  }

  if (cart.length === 0) {
    return (
      <main className="flex min-h-[65vh] items-center justify-center bg-[#f8f7f2] px-5 py-12">
        <div className="max-w-md text-center">
          <div className="text-6xl">🛒</div>
          <h1 className="mt-5 text-3xl font-bold text-[#183d2b]">
            Your cart is empty
          </h1>
          <p className="mt-3 text-[#68766b]">
            Add your pet’s favourite products before checking out.
          </p>
          <Link
            to="/shop"
            className="mt-6 inline-flex rounded-full bg-[#244b37] px-6 py-3 font-semibold text-white hover:bg-[#183d2b]"
          >
            Explore Products
          </Link>
        </div>
      </main>
    )
  }

  const inputClass = (field) =>
    `mt-2 w-full rounded-xl border bg-white px-4 py-3 text-[#183d2b] outline-none transition placeholder:text-[#9aa398] focus:border-[#244b37] ${
      errors[field] ? 'border-red-500' : 'border-[#d9ded4]'
    }`

  function FieldError({ name }) {
    return errors[name] ? (
      <p className="mt-1 text-sm text-red-600">{errors[name]}</p>
    ) : null
  }

  return (
    <main className="min-h-screen bg-[#f8f7f2] px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/cart"
          className="text-sm font-semibold text-[#244b37] hover:underline"
        >
          ← Back to Cart
        </Link>

        <div className="mt-5">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#a66c43]">
            PawHaven Pet Store
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#183d2b] md:text-4xl">
            Secure Checkout
          </h1>
          <p className="mt-3 text-[#68766b]">
            Add your delivery details to complete your order.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-8 grid items-start gap-8 lg:grid-cols-[1.5fr_1fr]"
        >
          <div className="space-y-6">
            <section className="rounded-3xl border border-[#e2e7dc] bg-white p-5 shadow-sm md:p-7">
              <h2 className="text-xl font-bold text-[#183d2b]">
                1. Customer Details
              </h2>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="text-sm font-semibold text-[#405548]">
                    Full Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass('name')}
                    placeholder="Enter your full name"
                    required
                  />
                  <FieldError name="name" />
                </div>

                <div>
                  <label htmlFor="phone" className="text-sm font-semibold text-[#405548]">
                    Mobile Number *
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    maxLength={10}
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass('phone')}
                    placeholder="10-digit mobile number"
                    required
                  />
                  <FieldError name="phone" />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-semibold text-[#405548]">
                    Email (optional)
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass('email')}
                    placeholder="you@example.com"
                  />
                  <FieldError name="email" />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-[#e2e7dc] bg-white p-5 shadow-sm md:p-7">
              <h2 className="text-xl font-bold text-[#183d2b]">
                2. Delivery Address
              </h2>

              <div className="mt-5 space-y-5">
                <div>
                  <label htmlFor="address" className="text-sm font-semibold text-[#405548]">
                    House No., Street, Area *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    autoComplete="street-address"
                    rows={3}
                    value={form.address}
                    onChange={handleChange}
                    className={inputClass('address')}
                    placeholder="House number, street, area and locality"
                    required
                  />
                  <FieldError name="address" />
                </div>

                <div>
                  <label htmlFor="landmark" className="text-sm font-semibold text-[#405548]">
                    Landmark (optional)
                  </label>
                  <input
                    id="landmark"
                    name="landmark"
                    value={form.landmark}
                    onChange={handleChange}
                    className={inputClass('landmark')}
                    placeholder="Nearby landmark"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="city" className="text-sm font-semibold text-[#405548]">
                      City *
                    </label>
                    <input
                      id="city"
                      name="city"
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={handleChange}
                      className={inputClass('city')}
                      placeholder="City"
                      required
                    />
                    <FieldError name="city" />
                  </div>

                  <div>
                    <label htmlFor="state" className="text-sm font-semibold text-[#405548]">
                      State *
                    </label>
                    <input
                      id="state"
                      name="state"
                      autoComplete="address-level1"
                      value={form.state}
                      onChange={handleChange}
                      className={inputClass('state')}
                      placeholder="State"
                      required
                    />
                    <FieldError name="state" />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="pincode" className="text-sm font-semibold text-[#405548]">
                      PIN Code *
                    </label>
                    <input
                      id="pincode"
                      name="pincode"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={6}
                      value={form.pincode}
                      onChange={handleChange}
                      className={inputClass('pincode')}
                      placeholder="6-digit PIN code"
                      required
                    />
                    <FieldError name="pincode" />
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-[#e2e7dc] bg-white p-5 shadow-sm md:p-7">
              <h2 className="text-xl font-bold text-[#183d2b]">
                3. Payment Method
              </h2>

              <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-[#244b37] bg-[#f3f6ef] p-4">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 accent-[#244b37]"
                />
                <span>
                  <span className="block font-semibold text-[#183d2b]">
                    Cash on Delivery (COD)
                  </span>
                  <span className="mt-1 block text-sm text-[#68766b]">
                    Pay when your order arrives.
                  </span>
                </span>
              </label>

              <div className="mt-3 rounded-2xl border border-dashed border-[#d9ded4] p-4">
                <p className="font-semibold text-[#526457]">
                  Online Payment
                  <span className="ml-2 text-xs font-medium text-[#a66c43]">
                    Coming soon
                  </span>
                </p>
                <p className="mt-1 text-sm text-[#68766b]">
                  UPI, cards and net banking will be available after a payment
                  gateway is connected.
                </p>
              </div>
            </section>
          </div>

          <aside className="rounded-3xl border border-[#e2e7dc] bg-white p-5 shadow-sm md:p-7 lg:sticky lg:top-6">
            <h2 className="text-xl font-bold text-[#183d2b]">
              Order Summary
            </h2>
            <p className="mt-1 text-sm text-[#68766b]">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
            </p>

            <div className="mt-5 max-h-80 space-y-4 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#f5f3e9]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[#183d2b]">
                      {item.name}
                    </p>
                    <p className="mt-1 text-sm text-[#68766b]">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="whitespace-nowrap text-sm font-bold text-[#244b37]">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-[#e2e7dc] pt-5 text-sm">
              <div className="flex justify-between gap-3 text-[#68766b]">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>

              <div className="flex justify-between gap-3 text-[#68766b]">
                <span>Delivery</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>

              {totalPrice > 0 && totalPrice < 999 && (
                <p className="text-xs text-[#a66c43]">
                  Add ₹{(999 - totalPrice).toLocaleString('en-IN')} more for free delivery.
                </p>
              )}

              <div className="flex justify-between gap-3 border-t border-[#e2e7dc] pt-4 text-base font-bold text-[#183d2b]">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-[#244b37] px-5 py-4 font-semibold text-white transition hover:bg-[#183d2b] focus:outline-none focus:ring-2 focus:ring-[#8ca58d] focus:ring-offset-2"
            >
              Place Order · ₹{grandTotal.toLocaleString('en-IN')}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-[#68766b]">
              Demo checkout. No online payment is collected.
            </p>
          </aside>
        </form>
      </div>
    </main>
  )
}
