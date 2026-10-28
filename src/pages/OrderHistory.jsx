
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function readOrders() {
  try {
    const saved = JSON.parse(
      localStorage.getItem('pawhaven-orders') || '[]'
    )
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export default function OrderHistory() {
  const [orders, setOrders] = useState(readOrders)
  const [expandedOrder, setExpandedOrder] = useState(null)

  useEffect(() => {
    function refreshOrders() {
      setOrders(readOrders())
    }

    window.addEventListener('storage', refreshOrders)

    return () => {
      window.removeEventListener('storage', refreshOrders)
    }
  }, [])

  const formatPrice = (amount) =>
    `₹${Number(amount || 0).toLocaleString('en-IN')}`

  return (
    <main className="min-h-screen bg-[#f8f7f2] px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-5xl">
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
            My Orders
          </h1>

          <p className="mt-3 text-[#68766b]">
            View your order details, products and order totals.
          </p>
        </div>

        {orders.length === 0 ? (
          <section className="mt-8 rounded-3xl border border-[#e2e7dc] bg-white px-6 py-14 text-center shadow-sm">
            <div className="text-6xl" aria-hidden="true">
              📦
            </div>

            <h2 className="mt-5 text-2xl font-bold text-[#183d2b]">
              No orders yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-[#68766b]">
              Your placed orders will appear here. Find something special
              for your furry friend!
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
            <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
              <p className="font-semibold text-[#405548]">
                {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
              </p>

              <span className="rounded-full bg-[#e6efe5] px-4 py-2 text-sm font-medium text-[#244b37]">
                Saved in this browser
              </span>
            </div>

            <div className="mt-5 space-y-5">
              {orders.map((order) => {
                const isExpanded = expandedOrder === order.id
                const items = Array.isArray(order.items) ? order.items : []

                return (
                  <article
                    key={order.id}
                    className="overflow-hidden rounded-3xl border border-[#e2e7dc] bg-white shadow-sm"
                  >
                    <div className="p-5 md:p-7">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-[#a66c43]">
                            Order ID
                          </p>

                          <h2 className="mt-1 break-all text-lg font-bold text-[#183d2b]">
                            {order.id || 'Order ID unavailable'}
                          </h2>

                          <p className="mt-2 text-sm text-[#68766b]">
                            {order.createdAt || 'Date unavailable'}
                          </p>
                        </div>

                        <span className="inline-flex rounded-full bg-[#e6efe5] px-3 py-1.5 text-sm font-semibold text-[#244b37]">
                          {order.status || 'Order placed'}
                        </span>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-[#f8f7f2] p-4 sm:grid-cols-3">
                        <div>
                          <p className="text-xs text-[#68766b]">Products</p>
                          <p className="mt-1 font-semibold text-[#183d2b]">
                            {items.length}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-[#68766b]">Total Quantity</p>
                          <p className="mt-1 font-semibold text-[#183d2b]">
                            {order.totalItems ??
                              items.reduce(
                                (sum, item) =>
                                  sum + Number(item.quantity || 0),
                                0
                              )}
                          </p>
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                          <p className="text-xs text-[#68766b]">Order Total</p>
                          <p className="mt-1 text-lg font-bold text-[#244b37]">
                            {formatPrice(order.total)}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setExpandedOrder(isExpanded ? null : order.id)
                        }
                        aria-expanded={isExpanded}
                        className="mt-5 flex w-full items-center justify-between rounded-xl border border-[#d9ded4] px-4 py-3 text-left font-semibold text-[#244b37] transition hover:bg-[#f8f7f2]"
                      >
                        {isExpanded ? 'Hide order details' : 'View order details'}
                        <span aria-hidden="true">
                          {isExpanded ? '−' : '+'}
                        </span>
                      </button>

                      {isExpanded && (
                        <div className="mt-5">
                          <h3 className="font-bold text-[#183d2b]">
                            Products ordered
                          </h3>

                          {items.length === 0 ? (
                            <p className="mt-3 text-sm text-[#68766b]">
                              No product details are available for this order.
                            </p>
                          ) : (
                            <div className="mt-3 divide-y divide-[#e2e7dc]">
                              {items.map((item, index) => (
                                <div
                                  key={`${order.id}-${item.id ?? index}`}
                                  className="flex items-center justify-between gap-4 py-4"
                                >
                                  <div className="min-w-0">
                                    <p className="font-semibold text-[#183d2b]">
                                      {item.name || 'Product'}
                                    </p>
                                    <p className="mt-1 text-sm text-[#68766b]">
                                      {formatPrice(item.price)} ×{' '}
                                      {item.quantity || 1}
                                    </p>
                                  </div>

                                  <p className="shrink-0 font-bold text-[#244b37]">
                                    {formatPrice(
                                      Number(item.price || 0) *
                                        Number(item.quantity || 1)
                                    )}
                                  </p>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="mt-4 space-y-2 border-t border-[#e2e7dc] pt-4 text-sm">
                            <div className="flex justify-between gap-3 text-[#68766b]">
                              <span>Subtotal</span>
                              <span>{formatPrice(order.subtotal)}</span>
                            </div>

                            <div className="flex justify-between gap-3 text-[#68766b]">
                              <span>Delivery</span>
                              <span>
                                {Number(order.shipping || 0) === 0
                                  ? 'FREE'
                                  : formatPrice(order.shipping)}
                              </span>
                            </div>

                            <div className="flex justify-between gap-3 border-t border-[#e2e7dc] pt-3 text-base font-bold text-[#183d2b]">
                              <span>Total paid / payable</span>
                              <span>{formatPrice(order.total)}</span>
                            </div>
                          </div>

                          {order.customer && (
                            <div className="mt-5 rounded-2xl bg-[#f8f7f2] p-4">
                              <h3 className="font-bold text-[#183d2b]">
                                Delivery details
                              </h3>

                              <p className="mt-2 text-sm text-[#526457]">
                                {order.customer.name}
                              </p>

                              <p className="mt-1 text-sm text-[#526457]">
                                {order.customer.phone}
                              </p>

                              <p className="mt-2 text-sm leading-6 text-[#526457]">
                                {order.customer.address}
                                {order.customer.landmark
                                  ? `, ${order.customer.landmark}`
                                  : ''}
                                {', '}
                                {order.customer.city}, {order.customer.state}
                                {' - '}
                                {order.customer.pincode}
                              </p>

                              <p className="mt-3 text-sm text-[#526457]">
                                Payment:{' '}
                                {order.paymentMethod === 'cod'
                                  ? 'Cash on Delivery'
                                  : order.paymentMethod || 'Not specified'}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
