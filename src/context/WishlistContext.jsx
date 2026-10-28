
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

const WishlistContext = createContext(null)
const STORAGE_KEY = 'pawhaven-wishlist'

function loadWishlist() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(loadWishlist)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist))
    } catch {
      // Wishlist remains usable for the current session.
    }
  }, [wishlist])

  function addToWishlist(product) {
    setWishlist((current) => {
      const alreadySaved = current.some(
        (item) => String(item.id) === String(product.id)
      )

      if (alreadySaved) return current
      return [...current, product]
    })
  }

  function removeFromWishlist(id) {
    setWishlist((current) =>
      current.filter((item) => String(item.id) !== String(id))
    )
  }

  function toggleWishlist(product) {
    setWishlist((current) => {
      const alreadySaved = current.some(
        (item) => String(item.id) === String(product.id)
      )

      if (alreadySaved) {
        return current.filter(
          (item) => String(item.id) !== String(product.id)
        )
      }

      return [...current, product]
    })
  }

  function isInWishlist(id) {
    return wishlist.some(
      (item) => String(item.id) === String(id)
    )
  }

  function clearWishlist() {
    setWishlist([])
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)

  if (!context) {
    throw new Error(
      'useWishlist must be used inside WishlistProvider'
    )
  }

  return context
}
