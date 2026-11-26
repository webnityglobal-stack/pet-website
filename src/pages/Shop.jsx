
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'

const BASE = import.meta.env.BASE_URL

const categories = [
    { name: 'Food & Treats', slug: 'food-treats', icon: '🥣' },
    { name: 'Accessories', slug: 'accessories', icon: '🦴' },
    { name: 'Pet Pharmacy', slug: 'pharmacy', icon: '🩺' },
    { name: 'Supplements & Wellness', slug: 'wellness', icon: '🌿' },
    { name: 'Grooming & Hygiene', slug: 'grooming', icon: '🛁' },
    { name: 'Apparel', slug: 'apparel', icon: '👕' },
]

export const products = [
    // FOOD & TREATS — 4 unique images
    {
        id: 1, name: 'Premium Dog Food', category: 'food-treats',
        price: 799, image: `${BASE}food/food-1.png`,
        description: 'Daily nutrition for happy, active dogs.',
    },
    {
        id: 2, name: 'Crunchy Dog Biscuits', category: 'food-treats',
        price: 249, image: `${BASE}food/food-2.png`,
        description: 'A tasty treat for your furry friend.',
    },
    {
        id: 3, name: 'Wholesome Cat Food', category: 'food-treats',
        price: 599, image: `${BASE}food/cat-food-1.png`,
        description: 'Everyday food for your beloved cat.',
    },
    {
        id: 4, name: 'Training Treats', category: 'food-treats',
        price: 199, image: `${BASE}food/chicken-food.png`,
        description: 'Reward your pet during training.',
    },

    // ACCESSORIES — 4 unique images
    {
        id: 5, name: 'Adjustable Pet Collar', category: 'accessories',
        price: 299, image: `${BASE}accessories/pet-collar.png`,
        description: 'A comfortable collar for daily walks.',
    },
    {
        id: 6, name: 'Pet Walking Leash', category: 'accessories',
        price: 499, image: `${BASE}accessories/pet-lease.png`,
        description: 'A useful companion for outdoor walks.',
    },
    {
        id: 7, name: 'Interactive Pet Toy', category: 'accessories',
        price: 349, image: `${BASE}accessories/pet-toy.png`,
        description: 'Make playtime more enjoyable.',
    },
    {
        id: 8, name: 'Pet Feeding Bowl', category: 'accessories',
        price: 249, image: `${BASE}accessories/pet-Bowl.png`,
        description: 'An everyday essential for your pet.',
    },

    // PET PHARMACY — 4 unique images
    {
        id: 9, name: 'Pet First Aid Kit', category: 'pharmacy',
        price: 499, image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=800&q=80',
        description: 'Basic supplies for pet care.',
    },
    {
        id: 10, name: 'Pet Care Essentials', category: 'pharmacy',
        price: 199, image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=800&q=80',
        description: 'Useful essentials for a pet care routine.',
    },
    {
        id: 11, name: 'Pet Health Care Kit', category: 'pharmacy',
        price: 299, image: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&w=800&q=80',
        description: 'Keep everyday pet care supplies together.',
    },
    {
        id: 12, name: 'Pet Care Supplies', category: 'pharmacy',
        price: 349, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
        description: 'Choose suitable care products with veterinary guidance.',
    },

    // SUPPLEMENTS & WELLNESS — 4 unique images
    {
        id: 13, name: 'Pet Multivitamin', category: 'wellness',
        price: 599, image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=800&q=80',
        description: 'A wellness supplement option for pets.',
    },
    {
        id: 14, name: 'Omega Pet Supplement', category: 'wellness',
        price: 699, image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=800&q=80',
        description: 'Explore supplements for your pet wellness routine.',
    },
    {
        id: 15, name: 'Pet Dental Care Kit', category: 'wellness',
        price: 399, image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80',
        description: 'Support a regular dental care routine.',
    },
    {
        id: 16, name: 'Pet Hydration Bottle', category: 'wellness',
        price: 299, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
        description: 'Keep fresh water handy while travelling.',
    },

    // GROOMING & HYGIENE — 4 unique images
    {
        id: 17, name: 'Pet Grooming Brush', category: 'grooming',
        price: 249, image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80',
        description: 'A handy brush for regular grooming.',
    },
    {
        id: 18, name: 'Gentle Pet Shampoo', category: 'grooming',
        price: 349, image: 'https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=800&q=80',
        description: 'A bathing essential for your pet.',
    },
    {
        id: 19, name: 'Pet Nail Care Tool', category: 'grooming',
        price: 199, image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80',
        description: 'A grooming tool for your pet care routine.',
    },
    {
        id: 20, name: 'Pet Bath Essentials', category: 'grooming',
        price: 179, image: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=800&q=80',
        description: 'Everyday essentials for bath time.',
    },

    // APPAREL — 4 unique images
    {
        id: 21, name: 'Classic Pet T-Shirt', category: 'apparel',
        price: 399, image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
        description: 'A cute style choice for your furry friend.',
    },
    {
        id: 22, name: 'Cozy Pet Sweater', category: 'apparel',
        price: 599, image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80',
        description: 'A cozy look for your pet wardrobe.',
    },
    {
        id: 23, name: 'Pet Bandana', category: 'apparel',
        price: 149, image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80',
        description: 'Add a little personality to everyday outings.',
    },
    {
        id: 24, name: 'Pet Outdoor Outfit', category: 'apparel',
        price: 499, image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
        description: 'A fun look for outdoor adventures.',
    },
]

export default function Shop() {
    const {
        toggleWishlist,
        isInWishlist,
    } = useWishlist()
    const { category } = useParams()
    const { addToCart } = useCart()
    const [search, setSearch] = useState('')
    const [addedProductId, setAddedProductId] = useState(null)

    const activeCategory = categories.find(
        (item) => item.slug === category
    )

    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            !category || product.category === category

        const matchesSearch = product.name
            .toLowerCase()
            .includes(search.toLowerCase())

        return matchesCategory && matchesSearch
    })

    return (
        <section className="min-h-screen bg-[#f8f7f2] px-5 py-12 md:px-10">
            <div className="mx-auto max-w-7xl">

                <div className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#a66c43]">
                        Made for every paw
                    </p>

                    <h1 className="mt-3 text-4xl font-bold text-[#183d2b] md:text-5xl">
                        {activeCategory ? activeCategory.name : 'Shop All Products'}
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl text-[#68766b]">
                        Discover thoughtful essentials for your furry family.
                    </p>
                </div>

                <div className="mx-auto mt-8 max-w-xl">
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search products..."
                        className="w-full rounded-full border border-[#d9ded4] bg-white px-5 py-3 outline-none focus:border-[#244b37]"
                    />
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Link
                        to="/shop"
                        className={`rounded-full px-5 py-3 text-sm font-semibold ${!category
                            ? 'bg-[#244b37] text-white'
                            : 'border border-[#d9ded4] text-[#526457]'
                            }`}
                    >
                        All Products
                    </Link>

                    {categories.map((item) => (
                        <Link
                            key={item.slug}
                            to={`/shop/${item.slug}`}
                            className={`rounded-full px-4 py-3 text-sm font-medium ${category === item.slug
                                ? 'bg-[#244b37] text-white'
                                : 'border border-[#d9ded4] text-[#526457] hover:bg-[#e9ede3]'
                                }`}
                        >
                            {item.icon} {item.name}
                        </Link>
                    ))}
                </div>

                <p className="mt-8 text-sm text-[#68766b]">
                    Showing {filteredProducts.length} products
                </p>

                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map((product) => (
                        <article
                            key={product.id}
                            className="flex flex-col overflow-hidden rounded-3xl border border-[#e6e5dc] bg-white p-4 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                            <Link
                                to={`/product/${product.id}`}
                                className="block overflow-hidden rounded-2xl bg-[#f1f2e9]"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    loading="lazy"
                                    className="h-56 w-full object-cover transition duration-500 hover:scale-105"
                                />
                            </Link>


                            <div className="flex justify-end px-3 pt-3">
                                <button
                                    type="button"
                                    onClick={() => toggleWishlist(product)}
                                    aria-label={
                                        isInWishlist(product.id)
                                            ? 'Remove from wishlist'
                                            : 'Add to wishlist'
                                    }
                                    aria-pressed={isInWishlist(product.id)}
                                    title={
                                        isInWishlist(product.id)
                                            ? 'Remove from Wishlist'
                                            : 'Add to Wishlist'
                                    }
                                    className={`flex h-10 w-10 items-center justify-center rounded-full border text-xl transition ${isInWishlist(product.id)
                                            ? 'border-[#ead0cb] bg-[#fbefed] text-[#b45353]'
                                            : 'border-[#d9ded4] bg-white text-[#244b37] hover:bg-[#e6efe5]'
                                        }`}
                                >
                                    {isInWishlist(product.id) ? '♥' : '♡'}
                                </button>
                            </div>


                            <div className="flex flex-1 flex-col pt-4">
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#a66c43]">
                                    {categories.find(
                                        (item) => item.slug === product.category
                                    )?.name}
                                </p>

                                <h2 className="mt-2 min-h-12 text-lg font-bold text-[#183d2b]">
                                    {product.name}
                                </h2>

                                <p className="mt-2 flex-1 text-sm leading-6 text-[#68766b]">
                                    {product.description}
                                </p>

                                <p className="mt-4 text-xl font-bold text-[#244b37]">
                                    ₹{product.price}
                                </p>

                                <div className="mt-4 grid grid-cols-2 gap-2">
                                    <Link
                                        to={`/product/${product.id}`}
                                        className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#244b37] px-2 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#183d2b]"
                                    >
                                        View Product
                                    </Link>


                                    <button
                                        type="button"
                                        onClick={() => {
                                            addToCart(product)
                                            setAddedProductId(product.id)
                                        }}
                                        className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-3 py-3 text-center text-sm font-semibold transition-all duration-200 ${addedProductId === product.id
                                            ? 'bg-[#e6efe5] text-[#183d2b] border border-[#244b37]'
                                            : 'bg-[#244b37] text-white hover:bg-[#183d2b] hover:shadow-md'
                                            }`}
                                    >
                                        {addedProductId === product.id ? (
                                            <>
                                                <span>✓</span>
                                                Added
                                            </>
                                        ) : (
                                            <>
                                                <span>+</span>
                                                Add to Cart
                                            </>
                                        )}
                                    </button>

                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <p className="py-16 text-center text-[#68766b]">
                        No products found. Try another search.
                    </p>
                )}

                <p className="mt-10 text-center text-xs text-[#68766b]">
                    Demo products and prices are illustrative.
                </p>
            </div>
        </section>
    )
}
