import { useMemo, useState } from "react";
import "./CustomerHome.css";

const CATEGORIES = [
  { id: "all", name: "সব পণ্য", icon: "🛒" },
  { id: "vegetables", name: "শাকসবজি", icon: "🥬" },
  { id: "fruits", name: "ফলমূল", icon: "🍎" },
  { id: "dairy", name: "দুধ ও ডিম", icon: "🥛" },
  { id: "rice", name: "চাল ও ডাল", icon: "🌾" },
  { id: "snacks", name: "স্ন্যাকস", icon: "🍪" },
  { id: "drinks", name: "পানীয়", icon: "🧃" },
  { id: "household", name: "গৃহস্থালি", icon: "🧹" },
];

const PRODUCTS = [
  {
    id: 1,
    name: "তাজা দেশি টমেটো",
    category: "vegetables",
    categoryName: "শাকসবজি",
    unit: "প্রতি কেজি",
    price: 45,
    oldPrice: 55,
    badge: "জনপ্রিয়",
    popular: true,
    offer: false,
    buyAgain: false,
    images: [
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1546470427-e5b89cd7f7b4?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=700&q=80",
    ],
  },
  {
    id: 2,
    name: "ফ্রেশ সবুজ শসা",
    category: "vegetables",
    categoryName: "শাকসবজি",
    unit: "প্রতি কেজি",
    price: 40,
    oldPrice: 50,
    badge: "সাশ্রয়ী",
    popular: true,
    offer: true,
    buyAgain: false,
    images: [
      "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=700&q=80",
    ],
  },
  {
    id: 3,
    name: "লাল আপেল",
    category: "fruits",
    categoryName: "ফলমূল",
    unit: "প্রতি কেজি",
    price: 220,
    oldPrice: 250,
    badge: "জনপ্রিয়",
    popular: true,
    offer: true,
    buyAgain: false,
    images: [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&w=700&q=80",
    ],
  },
  {
    id: 4,
    name: "খাঁটি তরল দুধ",
    category: "dairy",
    categoryName: "দুধ ও ডিম",
    unit: "প্রতি লিটার",
    price: 90,
    oldPrice: 100,
    badge: "",
    popular: true,
    offer: false,
    buyAgain: true,
    images: [
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=700&q=80",
    ],
  },
  {
    id: 5,
    name: "সাদা ডিম",
    category: "dairy",
    categoryName: "দুধ ও ডিম",
    unit: "প্রতি ১২টি",
    price: 150,
    oldPrice: 160,
    badge: "জনপ্রিয়",
    popular: true,
    offer: false,
    buyAgain: true,
    images: [
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=700&q=80",
    ],
  },
  {
    id: 6,
    name: "মিনিকেট চাল",
    category: "rice",
    categoryName: "চাল ও ডাল",
    unit: "প্রতি কেজি",
    price: 75,
    oldPrice: 80,
    badge: "",
    popular: false,
    offer: false,
    buyAgain: true,
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1592997571659-0b21ff64313b?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80",
    ],
  },
  {
    id: 7,
    name: "মচমচে বিস্কুট",
    category: "snacks",
    categoryName: "স্ন্যাকস",
    unit: "প্রতি প্যাকেট",
    price: 30,
    oldPrice: 35,
    badge: "",
    popular: true,
    offer: true,
    buyAgain: false,
    images: [
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=700&q=80",
    ],
  },
  {
    id: 8,
    name: "কমলার জুস",
    category: "drinks",
    categoryName: "পানীয়",
    unit: "প্রতি বোতল",
    price: 60,
    oldPrice: 70,
    badge: "",
    popular: false,
    offer: true,
    buyAgain: false,
    images: [
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=700&q=80",
    ],
  },
  {
    id: 9,
    name: "টাটকা গাজর",
    category: "vegetables",
    categoryName: "শাকসবজি",
    unit: "প্রতি কেজি",
    price: 60,
    oldPrice: 70,
    badge: "",
    popular: false,
    offer: false,
    buyAgain: false,
    images: [
      "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=700&q=80",
    ],
  },
  {
    id: 10,
    name: "পাকা কলা",
    category: "fruits",
    categoryName: "ফলমূল",
    unit: "প্রতি ডজন",
    price: 100,
    oldPrice: 120,
    badge: "",
    popular: false,
    offer: false,
    buyAgain: false,
    images: [
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=700&q=80",
    ],
  },
];

const money = (amount) => `৳${amount}`;

function HeartIcon({ filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    </svg>
  );
}

function CustomerHome({
  onNavigate,
  onAddToCart,
  cartCount: externalCartCount,
  deliveryAddress = "কামরাঙ্গীরচর, ঢাকা",
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [quantities, setQuantities] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({});
  const [activePanel, setActivePanel] = useState("");
  const [toast, setToast] = useState("");
  const [expandedSections, setExpandedSections] = useState({});
  const [activeFeed, setActiveFeed] = useState("all");

  const cartCount = Object.values(quantities).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const displayedCartCount =
    typeof externalCartCount === "number"
      ? externalCartCount
      : cartCount;

  const cartItems = PRODUCTS.filter(
    (product) => (quantities[product.id] || 0) > 0
  );

  const cartTotal = cartItems.reduce(
    (total, product) =>
      total + product.price * quantities[product.id],
    0
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return PRODUCTS.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.categoryName.toLowerCase().includes(query);

      const matchesCategory =
        activeCategory === "all" ||
        product.category === activeCategory;

      const matchesFeed =
        activeFeed === "all" ||
        (activeFeed === "popular" && product.popular) ||
        (activeFeed === "offers" && product.offer) ||
        (activeFeed === "buyAgain" && product.buyAgain) ||
        (activeFeed === "wishlist" && wishlist.includes(product.id));

      return matchesSearch && matchesCategory && matchesFeed;
    });
  }, [search, activeCategory, activeFeed, wishlist]);

  const notify = (message) => {
    setToast(message);
  };

  const changeQuantity = (product, change) => {
    const current = quantities[product.id] || 0;
    const next = Math.max(0, current + change);

    setQuantities((previous) => ({
      ...previous,
      [product.id]: next,
    }));

    if (change > 0 && typeof onAddToCart === "function") {
      onAddToCart(product);
    }

    if (change > 0) {
      notify(`${product.name} কার্টে যোগ হয়েছে`);
    } else if (change < 0 && next === 0) {
      notify(`${product.name} কার্ট থেকে সরানো হয়েছে`);
    }
  };

  const toggleWishlist = (product) => {
    const isSaved = wishlist.includes(product.id);

    setWishlist((previous) =>
      isSaved
        ? previous.filter((id) => id !== product.id)
        : [...previous, product.id]
    );

    notify(
      isSaved
        ? "পছন্দের তালিকা থেকে সরানো হয়েছে"
        : "পছন্দের তালিকায় যোগ হয়েছে"
    );
  };

  const changeImage = (product, direction) => {
    setImageIndexes((previous) => {
      const current = previous[product.id] || 0;
      const next =
        (current + direction + product.images.length) %
        product.images.length;

      return { ...previous, [product.id]: next };
    });
  };

  const chooseCategory = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveFeed("all");
    setExpandedSections({});
  };

  const chooseFeed = (feed) => {
    setActiveFeed(feed);
    setActiveCategory("all");
    setExpandedSections({});
  };

  const resetHome = () => {
    setSearch("");
    setActiveCategory("all");
    setActiveFeed("all");
    setExpandedSections({});
    setActivePanel("");
  };

  const handleNavigation = (destination) => {
    if (destination === "home") {
      resetHome();
      return;
    }

    if (destination === "cart") {
      setActivePanel("cart");
      return;
    }

    if (destination === "wishlist") {
      chooseFeed("wishlist");
      return;
    }

    if (typeof onNavigate === "function") {
      onNavigate(destination);
    } else {
      notify("এই পেজটি পরবর্তী ধাপে যুক্ত করা হবে");
    }
  };

  const renderProductCard = (product) => {
    const quantity = quantities[product.id] || 0;
    const imageIndex = imageIndexes[product.id] || 0;
    const isWishlisted = wishlist.includes(product.id);

    return (
      <article className="el-product-card" key={product.id}>
        <div className="el-product-image-wrap">
          <img
            className="el-product-image"
            src={product.images[imageIndex]}
            alt={product.name}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.src =
                "https://placehold.co/500x400/f0f7ef/247a42?text=Grocery";
            }}
          />

          {product.badge && (
            <span className="el-product-badge">{product.badge}</span>
          )}

          <button
            type="button"
            className={`el-heart-button ${isWishlisted ? "is-saved" : ""}`}
            onClick={() => toggleWishlist(product)}
            aria-label={
              isWishlisted
                ? "পছন্দের তালিকা থেকে সরান"
                : "পছন্দের তালিকায় রাখুন"
            }
          >
            <HeartIcon filled={isWishlisted} />
          </button>

          {product.images.length > 1 && (
            <>
              <button
                type="button"
                className="el-gallery-arrow el-gallery-prev"
                onClick={() => changeImage(product, -1)}
                aria-label="আগের ছবি"
              >
                ‹
              </button>

              <button
                type="button"
                className="el-gallery-arrow el-gallery-next"
                onClick={() => changeImage(product, 1)}
                aria-label="পরের ছবি"
              >
                ›
              </button>

              <div className="el-gallery-dots">
                {product.images.map((_, index) => (
                  <button
                    type="button"
                    key={index}
                    className={
                      imageIndex === index
                        ? "el-gallery-dot active"
                        : "el-gallery-dot"
                    }
                    onClick={() =>
                      setImageIndexes((previous) => ({
                        ...previous,
                        [product.id]: index,
                      }))
                    }
                    aria-label={`ছবি ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="el-product-info">
          <span className="el-product-category">
            {product.categoryName}
          </span>

          <h3>{product.name}</h3>

          <p className="el-product-unit">{product.unit}</p>

          <div className="el-product-price-row">
            <div className="el-price-group">
              <strong className="el-product-price">
                {money(product.price)}
              </strong>

              {product.oldPrice > product.price && (
                <del className="el-old-price">
                  {money(product.oldPrice)}
                </del>
              )}
            </div>

            {quantity === 0 ? (
              <button
                type="button"
                className="el-add-button"
                onClick={() => changeQuantity(product, 1)}
              >
                + Add
              </button>
            ) : (
              <div className="el-quantity-control">
                <button
                  type="button"
                  onClick={() => changeQuantity(product, -1)}
                  aria-label="পরিমাণ কমান"
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={() => changeQuantity(product, 1)}
                  aria-label="পরিমাণ বাড়ান"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </article>
    );
  };

  const renderSection = (title, subtitle, products, sectionKey) => {
    const expanded = !!expandedSections[sectionKey];
    const visibleProducts = expanded ? products : products.slice(0, 4);

    if (products.length === 0) return null;

    return (
      <section className="el-feed-section" key={sectionKey}>
        <div className="el-section-heading">
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>

          {products.length > 4 && (
            <button
              type="button"
              className="el-view-more"
              onClick={() =>
                setExpandedSections((previous) => ({
                  ...previous,
                  [sectionKey]: !previous[sectionKey],
                }))
              }
            >
              {expanded ? "কম দেখুন ↑" : "View More →"}
            </button>
          )}
        </div>

        <div className="el-product-grid">
          {visibleProducts.map(renderProductCard)}
        </div>
      </section>
    );
  };

  return (
    <div className="el-home">
      <div className="el-top-strip">
        <span>✦</span>
        <span>দৈনন্দিন বাজার এখন আরও সহজ</span>
      </div>

      {/* HEADER */}
      <header className="el-header">
        <button
          type="button"
          className="el-brand"
          onClick={resetHome}
          aria-label="EKHONI LAGBE Home"
        >
          <img
            src="/logo.png"
            alt="EKHONI LAGBE"
            className="el-brand-logo"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />

          <span className="el-brand-copy">
            <strong>এখনই লাগবে</strong>
            <small>EKHONI LAGBE</small>
            <span>15-Minute Delivery — Right to Your Hands</span>
          </span>
        </button>

        <div className="el-header-actions">
          <button
            type="button"
            className="el-header-action el-header-cart"
            onClick={() => setActivePanel("cart")}
            aria-label="Cart"
          >
            <span className="el-header-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" />
                <circle cx="10" cy="20" r="1.3" />
                <circle cx="18" cy="20" r="1.3" />
              </svg>
              {displayedCartCount > 0 && (
                <span className="el-cart-count">{displayedCartCount}</span>
              )}
            </span>
            <span>Cart</span>
          </button>

          <button
            type="button"
            className="el-header-action"
            onClick={() => handleNavigation("account")}
            aria-label="Account"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21a8 8 0 0 1 16 0" />
            </svg>
            <span>Account</span>
          </button>

          <button
            type="button"
            className="el-notification-button"
            onClick={() =>
              setActivePanel(
                activePanel === "notifications"
                  ? ""
                  : "notifications"
              )
            }
            aria-label="Notifications"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
              <path d="M10 21h4" />
            </svg>
            <i />
          </button>
        </div>
      </header>

      <div className="el-service-line">
        <span>📍</span>
        <span>{deliveryAddress}</span>
      </div>

      {/* SEARCH */}
      <div className="el-search-area">
        <div className="el-search-box">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m16 16 4 4" />
          </svg>

          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setActiveFeed("all");
            }}
            placeholder="কী লাগবে আজ? পণ্য খুঁজুন..."
            aria-label="পণ্য খুঁজুন"
          />

          {search && (
            <button
              type="button"
              className="el-clear-search"
              onClick={() => setSearch("")}
              aria-label="Search পরিষ্কার করুন"
            >
              ×
            </button>
          )}
        </div>
      </div>

      <main className="el-main">
        {/* HORIZONTAL CATEGORIES */}
        <section className="el-category-section">
          <div className="el-compact-heading">
            <h2>Categories</h2>
            <span>পছন্দের বিভাগ বেছে নিন</span>
          </div>

          <div className="el-horizontal-scroller el-category-scroller">
            {CATEGORIES.map((category) => (
              <button
                type="button"
                key={category.id}
                className={`el-category-item ${
                  activeCategory === category.id
                    ? "active"
                    : ""
                }`}
                onClick={() => chooseCategory(category.id)}
              >
                <span className="el-category-icon">
                  {category.icon}
                </span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* COMPACT PROMO */}
        <section className="el-promo-card">
          <div className="el-promo-copy">
            <span className="el-promo-label">EVERYDAY ESSENTIALS</span>
            <h2>বাজার হোক সহজ</h2>
            <p>প্রয়োজনীয় পণ্য, এক জায়গায়</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setActiveFeed("all");
                document
                  .getElementById("el-all-products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Shop Now <span>→</span>
            </button>
          </div>

          <div className="el-promo-art" aria-hidden="true">
            <span>🥬</span>
            <span>🍎</span>
            <span>🥕</span>
          </div>
        </section>

        {/* SMALL HORIZONTAL OFFER TILES */}
        <section className="el-offers-section">
          <div className="el-compact-heading">
            <h2>Offers & More</h2>
            <span>এক নজরে দেখুন</span>
          </div>

          <div className="el-horizontal-scroller el-offer-scroller">
            <button
              type="button"
              className="el-offer-tile el-offer-special"
              onClick={() => chooseFeed("offers")}
            >
              <span className="el-offer-icon">🏷️</span>
              <span>
                <strong>Special Offers</strong>
                <small>সাশ্রয়ী দাম</small>
              </span>
              <span className="el-offer-arrow">→</span>
            </button>

            <button
              type="button"
              className="el-offer-tile el-offer-popular"
              onClick={() => chooseFeed("popular")}
            >
              <span className="el-offer-icon">🔥</span>
              <span>
                <strong>Popular</strong>
                <small>জনপ্রিয় পণ্য</small>
              </span>
              <span className="el-offer-arrow">→</span>
            </button>

            <button
              type="button"
              className="el-offer-tile el-offer-bogo"
              onClick={() => chooseFeed("offers")}
            >
              <span className="el-offer-icon">🎁</span>
              <span>
                <strong>Buy 1 Get 1</strong>
                <small>যোগ্য অফার দেখুন</small>
              </span>
              <span className="el-offer-arrow">→</span>
            </button>

            <button
              type="button"
              className="el-offer-tile el-offer-again"
              onClick={() => chooseFeed("buyAgain")}
            >
              <span className="el-offer-icon">↻</span>
              <span>
                <strong>Buy Again</strong>
                <small>আবার বেছে নিন</small>
              </span>
              <span className="el-offer-arrow">→</span>
            </button>
          </div>
        </section>

        {/* FEED FILTERS */}
        <section className="el-feed-controls">
          <div className="el-feed-title">
            <h1>
              {activeFeed === "popular"
                ? "Popular Products"
                : activeFeed === "offers"
                ? "Special Offers"
                : activeFeed === "buyAgain"
                ? "Buy Again"
                : activeFeed === "wishlist"
                ? "My Wishlist"
                : search
                ? "Search Results"
                : activeCategory !== "all"
                ? CATEGORIES.find((item) => item.id === activeCategory)
                    ?.name || "পণ্য"
                : "আপনার জন্য পণ্য"}
            </h1>
            <p>পছন্দের পণ্য দেখুন এবং কার্টে যোগ করুন</p>
          </div>

          <div className="el-feed-tabs">
            <button
              type="button"
              className={activeFeed === "all" ? "active" : ""}
              onClick={() => chooseFeed("all")}
            >
              All
            </button>

            <button
              type="button"
              className={activeFeed === "popular" ? "active" : ""}
              onClick={() => chooseFeed("popular")}
            >
              Popular
            </button>

            <button
              type="button"
              className={activeFeed === "offers" ? "active" : ""}
              onClick={() => chooseFeed("offers")}
            >
              Offers
            </button>

            <button
              type="button"
              className={activeFeed === "wishlist" ? "active" : ""}
              onClick={() => chooseFeed("wishlist")}
            >
              <HeartIcon /> Saved
            </button>
          </div>
        </section>

        {/* SEARCH / FILTER RESULTS */}
        {(search ||
          activeCategory !== "all" ||
          activeFeed !== "all") && (
          <section className="el-feed-section" id="el-all-products">
            <div className="el-product-grid">
              {filteredProducts.map(renderProductCard)}
            </div>

            {filteredProducts.length === 0 && (
              <div className="el-empty-state">
                <span>🔎</span>
                <h3>কোনো পণ্য পাওয়া যায়নি</h3>
                <p>অন্য নাম দিয়ে খুঁজে দেখুন।</p>
                <button type="button" onClick={resetHome}>
                  সব পণ্য দেখুন
                </button>
              </div>
            )}
          </section>
        )}

        {/* NORMAL VERTICAL PRODUCT FEED */}
        {!search &&
          activeCategory === "all" &&
          activeFeed === "all" && (
            <div id="el-all-products">
              {renderSection(
                "Popular Products",
                "ক্রেতাদের পছন্দের পণ্য",
                PRODUCTS.filter((product) => product.popular),
                "popular"
              )}

              {renderSection(
                "Special Offers",
                "সাশ্রয়ী দামের পণ্য",
                PRODUCTS.filter((product) => product.offer),
                "offers"
              )}

              {renderSection(
                "Fresh & Daily Essentials",
                "প্রতিদিনের প্রয়োজনীয় বাজার",
                PRODUCTS.filter(
                  (product) =>
                    product.category === "vegetables" ||
                    product.category === "fruits"
                ),
                "fresh"
              )}

              {renderSection(
                "Dairy & Pantry",
                "দুধ, ডিম, চাল ও নিত্যপ্রয়োজনীয় পণ্য",
                PRODUCTS.filter(
                  (product) =>
                    product.category === "dairy" ||
                    product.category === "rice"
                ),
                "pantry"
              )}

              {renderSection(
                "Snacks & Drinks",
                "হালকা খাবার ও পানীয়",
                PRODUCTS.filter(
                  (product) =>
                    product.category === "snacks" ||
                    product.category === "drinks"
                ),
                "snacks"
              )}

              {renderSection(
                "Buy Again",
                "আবার কিনতে পারেন",
                PRODUCTS.filter((product) => product.buyAgain),
                "buyAgain"
              )}

              {renderSection(
                "All Products",
                "সব পণ্য এক জায়গায়",
                PRODUCTS,
                "allProducts"
              )}
            </div>
          )}
      </main>

      {/* FOOTER */}
      <footer className="el-footer">
        <img src="/logo.png" alt="" />
        <div>
          <strong>এখনই লাগবে · EKHONI LAGBE</strong>
          <p>15-Minute Delivery — Right to Your Hands</p>
        </div>
      </footer>

      {/* BOTTOM NAVIGATION */}
      <nav className="el-bottom-nav" aria-label="Main navigation">
        <button
          type="button"
          className="active"
          onClick={() => handleNavigation("home")}
        >
          <span className="el-nav-icon">⌂</span>
          <span>Home</span>
        </button>

        <button
          type="button"
          onClick={() => {
            chooseCategory("all");
            setSearch("");
            document
              .querySelector(".el-category-section")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="el-nav-icon">▦</span>
          <span>Categories</span>
        </button>

        <button
          type="button"
          onClick={() => {
            chooseFeed("popular");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="el-nav-icon">♨</span>
          <span>Popular & Offers</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavigation("orders")}
        >
          <span className="el-nav-icon">▤</span>
          <span>My Orders</span>
        </button>

        <button
          type="button"
          onClick={() => setActivePanel("cart")}
        >
          <span className="el-nav-icon el-nav-cart">
            🛒
            {displayedCartCount > 0 && (
              <i>{displayedCartCount}</i>
            )}
          </span>
          <span>Cart</span>
        </button>

        <button
          type="button"
          onClick={() => handleNavigation("information")}
        >
          <span className="el-nav-icon">ⓘ</span>
          <span>Information</span>
        </button>
      </nav>

      {/* CART PANEL */}
      {activePanel === "cart" && (
        <div
          className="el-panel-backdrop"
          onClick={() => setActivePanel("")}
        >
          <section
            className="el-cart-panel"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="el-panel-heading">
              <div>
                <h2>My Cart</h2>
                <p>{cartCount}টি পণ্য</p>
              </div>

              <button
                type="button"
                className="el-panel-close"
                onClick={() => setActivePanel("")}
                aria-label="Close cart"
              >
                ×
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="el-empty-state">
                <span>🛒</span>
                <h3>তোমার Cart এখনো খালি</h3>
                <p>পছন্দের পণ্য Add করে বাজার শুরু করো।</p>
                <button
                  type="button"
                  onClick={() => setActivePanel("")}
                >
                  পণ্য দেখুন
                </button>
              </div>
            ) : (
              <>
                <div className="el-cart-items">
                  {cartItems.map((product) => (
                    <div className="el-cart-item" key={product.id}>
                      <img src={product.images[0]} alt={product.name} />

                      <div className="el-cart-item-info">
                        <strong>{product.name}</strong>
                        <small>{product.unit}</small>
                        <b>{money(product.price * quantities[product.id])}</b>
                      </div>

                      <div className="el-quantity-control">
                        <button
                          type="button"
                          onClick={() => changeQuantity(product, -1)}
                        >
                          −
                        </button>
                        <span>{quantities[product.id]}</span>
                        <button
                          type="button"
                          onClick={() => changeQuantity(product, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="el-cart-total">
                  <span>Subtotal</span>
                  <strong>{money(cartTotal)}</strong>
                </div>

                <p className="el-cart-demo-note">
                  ডেলিভারি চার্জ ও চূড়ান্ত মূল্য Checkout-এ যাচাই করতে হবে।
                </p>

                <button
                  type="button"
                  className="el-checkout-button"
                  onClick={() => handleNavigation("checkout")}
                >
                  Proceed to Checkout →
                </button>
              </>
            )}
          </section>
        </div>
      )}

      {/* NOTIFICATIONS PANEL */}
      {activePanel === "notifications" && (
        <div
          className="el-panel-backdrop"
          onClick={() => setActivePanel("")}
        >
          <section
            className="el-notification-panel"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Notifications"
          >
            <div className="el-panel-heading">
              <div>
                <h2>Notifications</h2>
                <p>আপডেট এখানে দেখা যাবে</p>
              </div>

              <button
                type="button"
                className="el-panel-close"
                onClick={() => setActivePanel("")}
                aria-label="Close notifications"
              >
                ×
              </button>
            </div>

            <div className="el-notification-empty">
              <span>🔔</span>
              <strong>এখন কোনো নতুন নোটিফিকেশন নেই</strong>
              <p>অর্ডার ও অফারের নোটিফিকেশন পরে এখানে দেখানো হবে।</p>
            </div>
          </section>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="el-toast" role="status">
          <span>✓</span>
          {toast}
          <button
            type="button"
            onClick={() => setToast("")}
            aria-label="বন্ধ করুন"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default CustomerHome;
