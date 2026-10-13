
import { useMemo, useState } from "react";
import "./CustomerHome.css";

const GREEN = "#218344";

const categories = [
  { name: "Vegetables", bn: "শাকসবজি", emoji: "🥬" },
  { name: "Fruits", bn: "ফলমূল", emoji: "🍎" },
  { name: "Rice & Grains", bn: "চাল ও শস্য", emoji: "🍚" },
  { name: "Fish & Meat", bn: "মাছ ও মাংস", emoji: "🐟" },
  { name: "Dairy & Eggs", bn: "দুধ ও ডিম", emoji: "🥛" },
  { name: "Cooking Oil", bn: "রান্নার তেল", emoji: "🫒" },
  { name: "Snacks", bn: "স্ন্যাকস", emoji: "🍪" },
  { name: "Beverages", bn: "পানীয়", emoji: "🧃" },
  { name: "Household", bn: "ঘর-গৃহস্থালি", emoji: "🧹" },
];

const products = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    bn: "তাজা টমেটো",
    category: "Vegetables",
    price: 40,
    unit: "500 g",
    badge: "Popular",
    images: [
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1546470427-e5d89cd4b0c3?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=700&q=80",
    ],
  },
  {
    id: 2,
    name: "Fresh Bananas",
    bn: "পাকা কলা",
    category: "Fruits",
    price: 60,
    unit: "1 dozen",
    badge: "Fresh",
    images: [
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=700&q=80",
    ],
  },
  {
    id: 3,
    name: "Fresh Milk",
    bn: "দুধ",
    category: "Dairy & Eggs",
    price: 90,
    unit: "1 litre",
    badge: "Everyday",
    images: [
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=80",
    ],
  },
  {
    id: 4,
    name: "Premium Rice",
    bn: "প্রিমিয়াম চাল",
    category: "Rice & Grains",
    price: 75,
    unit: "1 kg",
    badge: "Popular",
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1592997571659-0b21ff64313b?auto=format&fit=crop&w=700&q=80",
    ],
  },
  {
    id: 5,
    name: "Fresh Red Apples",
    bn: "লাল আপেল",
    category: "Fruits",
    price: 180,
    unit: "1 kg",
    badge: "Fresh",
    images: [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=700&q=80",
    ],
  },
  {
    id: 6,
    name: "Fresh Carrots",
    bn: "তাজা গাজর",
    category: "Vegetables",
    price: 50,
    unit: "500 g",
    badge: "Fresh",
    images: [
      "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=700&q=80",
    ],
  },
  {
    id: 7,
    name: "Cooking Oil",
    bn: "রান্নার তেল",
    category: "Cooking Oil",
    price: 175,
    unit: "1 litre",
    badge: "Everyday",
    images: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=700&q=80",
    ],
  },
  {
    id: 8,
    name: "Farm Fresh Eggs",
    bn: "ডিম",
    category: "Dairy & Eggs",
    price: 65,
    unit: "4 pieces",
    badge: "Fresh",
    images: [
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=700&q=80",
    ],
  },
];

const offers = [
  {
    id: "daily",
    eyebrow: "FRESH EVERY DAY",
    title: "Everyday Essentials",
    description: "Your daily grocery, made easy.",
    button: "Shop Now",
    emoji: "🥬",
    category: "",
  },
  {
    id: "popular",
    eyebrow: "CUSTOMER FAVOURITES",
    title: "Popular Picks",
    description: "Discover what everyone loves.",
    button: "Explore Now",
    emoji: "🛒",
    category: "Popular",
  },
  {
    id: "fruit",
    eyebrow: "FRESH & DELICIOUS",
    title: "Fresh Fruits",
    description: "Bring freshness to your table.",
    button: "Shop Fruits",
    emoji: "🍎",
    category: "Fruits",
  },
];

const money = (amount) => `৳${amount}`;

export default function CustomerHome({
  onNavigate = () => {},
  cartCount = 0,
  deliveryAddress = "কামরাঙ্গীরচর, ঢাকা",
  onAddToCart,
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [quantities, setQuantities] = useState({});
  const [favourites, setFavourites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [offerIndex, setOfferIndex] = useState(0);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [notice, setNotice] = useState("");

  const localCartCount = Object.values(quantities).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const currentCartCount =
    cartCount > 0 ? cartCount : localCartCount;

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.bn.includes(query) ||
        product.category.toLowerCase().includes(query);

      const matchesCategory =
        !activeCategory ||
        activeCategory === "Popular" ||
        product.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const selectCategory = (category) => {
    setActiveCategory(category);
    setShowAllProducts(true);
    scrollTo("el-products");
  };

  const changeQuantity = (product, change) => {
    const current = quantities[product.id] || 0;
    const next = Math.max(0, current + change);

    setQuantities((previous) => ({
      ...previous,
      [product.id]: next,
    }));

    if (change > 0 && onAddToCart) {
      onAddToCart(product);
    }

    setNotice(
      next > current
        ? `${product.bn} — যোগ করা হয়েছে`
        : `${product.bn} — পরিমাণ পরিবর্তন হয়েছে`
    );

    window.setTimeout(() => setNotice(""), 1800);
  };

  const toggleFavourite = (productId) => {
    setFavourites((previous) =>
      previous.includes(productId)
        ? previous.filter((id) => id !== productId)
        : [...previous, productId]
    );
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
    setImageIndex(0);
  };

  const moveImage = (direction) => {
    if (!selectedProduct) return;

    setImageIndex((previous) => {
      const total = selectedProduct.images.length;
      return (previous + direction + total) % total;
    });
  };

  const handleNavigation = (destination) => {
    if (destination === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (destination === "categories") {
      scrollTo("el-categories");
      return;
    }

    if (destination === "popular") {
      setActiveCategory("Popular");
      setShowAllProducts(true);
      scrollTo("el-products");
      return;
    }

    onNavigate(destination);
  };

  const visibleProducts = showAllProducts
    ? filteredProducts
    : filteredProducts.slice(0, 4);

  return (
    <div className="el-page">
      {/* HEADER */}
      <header className="el-header">
        <button
          type="button"
          className="el-brand"
          onClick={() => handleNavigation("home")}
          aria-label="EKHONI LAGBE Home"
        >
          <img src="/logo.png" alt="EKHONI LAGBE logo" />

          <span className="el-brand-copy">
            <strong>এখনই লাগবে</strong>
            <small>EKHONI LAGBE</small>
            <span>15-Minute Delivery — Right to Your Hands</span>
          </span>
        </button>

        <div className="el-header-actions">
          <button
            type="button"
            className="el-header-icon el-cart-header"
            onClick={() => handleNavigation("cart")}
            aria-label="Cart"
          >
            <span className="el-icon">🛒</span>
            <span className="el-header-label">Cart</span>
            {currentCartCount > 0 && (
              <span className="el-count">{currentCartCount}</span>
            )}
          </button>

          <button
            type="button"
            className="el-header-icon"
            onClick={() => handleNavigation("account")}
            aria-label="Account"
          >
            <span className="el-icon">♙</span>
            <span className="el-header-label">Account</span>
          </button>

          <button
            type="button"
            className="el-header-icon"
            onClick={() => handleNavigation("notifications")}
            aria-label="Notifications"
          >
            <span className="el-icon">♧</span>
            <span className="el-header-label">Alerts</span>
          </button>
        </div>
      </header>

      {/* DELIVERY ADDRESS */}
      <div className="el-address-strip">
        <span>📍</span>
        <span>
          Delivering to <strong>{deliveryAddress}</strong>
        </span>
      </div>

      {/* SEARCH */}
      <section className="el-search-wrap">
        <label className="el-search">
          <span className="el-search-symbol">⌕</span>

          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setShowAllProducts(true);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") scrollTo("el-products");
            }}
            placeholder="Search groceries..."
            aria-label="Search groceries"
          />

          {search && (
            <button
              type="button"
              className="el-search-clear"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}

          <button
            type="button"
            className="el-search-button"
            onClick={() => {
              setShowAllProducts(true);
              scrollTo("el-products");
            }}
          >
            Search
          </button>
        </label>
        <p className="el-search-hint">
          Find your everyday essentials in seconds
        </p>
      </section>

      {/* CATEGORIES */}
      <section className="el-section" id="el-categories">
        <div className="el-section-heading">
          <div>
            <h2>Shop by Category</h2>
            <p>সব প্রয়োজনীয় পণ্য এক জায়গায়</p>
          </div>

          <button
            type="button"
            className="el-text-link"
            onClick={() => handleNavigation("categories")}
          >
            View All →
          </button>
        </div>

        <div className="el-horizontal-scroll el-category-row">
          <button
            type="button"
            className={`el-category ${
              !activeCategory ? "is-active" : ""
            }`}
            onClick={() => selectCategory("")}
          >
            <span className="el-category-emoji">🛍️</span>
            <span>All Items</span>
          </button>

          {categories.map((category) => (
            <button
              type="button"
              key={category.name}
              className={`el-category ${
                activeCategory === category.name ? "is-active" : ""
              }`}
              onClick={() => selectCategory(category.name)}
            >
              <span className="el-category-emoji">
                {category.emoji}
              </span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* PROMOTIONAL BANNER */}
      <section className="el-banner-area">
        <div className="el-banner">
          <div className="el-banner-copy">
            <span className="el-banner-eyebrow">
              {offers[offerIndex].eyebrow}
            </span>

            <h1>{offers[offerIndex].title}</h1>
            <p>{offers[offerIndex].description}</p>

            <button
              type="button"
              className="el-shop-button"
              onClick={() => selectCategory(offers[offerIndex].category)}
            >
              {offers[offerIndex].button} <span>→</span>
            </button>

            <div className="el-banner-dots">
              {offers.map((offer, index) => (
                <button
                  type="button"
                  key={offer.id}
                  onClick={() => setOfferIndex(index)}
                  className={index === offerIndex ? "active" : ""}
                  aria-label={`Show banner ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="el-banner-art" aria-hidden="true">
            <span className="el-banner-circle" />
            <span className="el-banner-emoji">
              {offers[offerIndex].emoji}
            </span>
            <span className="el-banner-leaf">🌿</span>
          </div>
        </div>
      </section>

      {/* OFFERS AND POPULAR SHORTCUTS */}
      <section className="el-section el-quick-section">
        <div className="el-section-heading">
          <div>
            <h2>Discover More</h2>
            <p>Explore your everyday favourites</p>
          </div>
        </div>

        <div className="el-horizontal-scroll el-promo-row">
          <button
            type="button"
            className="el-promo-card el-promo-dark"
            onClick={() => handleNavigation("popular")}
          >
            <span className="el-promo-emoji">🔥</span>
            <span className="el-promo-copy">
              <strong>Popular Picks</strong>
              <small>Customer favourites</small>
            </span>
            <span className="el-promo-arrow">→</span>
          </button>

          <button
            type="button"
            className="el-promo-card el-promo-light"
            onClick={() => handleNavigation("offers")}
          >
            <span className="el-promo-emoji">🎁</span>
            <span className="el-promo-copy">
              <strong>My Offers</strong>
              <small>Explore available deals</small>
            </span>
            <span className="el-promo-arrow">→</span>
          </button>

          <button
            type="button"
            className="el-promo-card el-promo-yellow"
            onClick={() => selectCategory("Dairy & Eggs")}
          >
            <span className="el-promo-emoji">🥚</span>
            <span className="el-promo-copy">
              <strong>Everyday Essentials</strong>
              <small>Shop daily needs</small>
            </span>
            <span className="el-promo-arrow">→</span>
          </button>
        </div>
      </section>

      {/* PRODUCTS */}
      <section
        className="el-section el-products-section"
        id="el-products"
      >
        <div className="el-section-heading">
          <div>
            <h2>
              {search
                ? "Search Results"
                : activeCategory === "Popular"
                  ? "Popular Products"
                  : activeCategory || "Popular Products"}
            </h2>
            <p>{filteredProducts.length} items to explore</p>
          </div>

          <button
            type="button"
            className="el-text-link"
            onClick={() => setShowAllProducts((previous) => !previous)}
          >
            {showAllProducts ? "Show Less ↑" : "View More →"}
          </button>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="el-product-grid">
            {visibleProducts.map((product) => {
              const quantity = quantities[product.id] || 0;
              const isFavourite = favourites.includes(product.id);

              return (
                <article className="el-product-card" key={product.id}>
                  <div className="el-product-image-wrap">
                    <button
                      type="button"
                      className="el-product-image-button"
                      onClick={() => openProduct(product)}
                      aria-label={`View ${product.name} images`}
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        loading="lazy"
                      />
                    </button>

                    <span className="el-product-badge">
                      {product.badge}
                    </span>

                    <button
                      type="button"
                      className={`el-heart ${
                        isFavourite ? "is-favourite" : ""
                      }`}
                      onClick={() => toggleFavourite(product.id)}
                      aria-label={
                        isFavourite
                          ? "Remove from favourites"
                          : "Add to favourites"
                      }
                    >
                      {isFavourite ? "♥" : "♡"}
                    </button>

                    <button
                      type="button"
                      className="el-photo-count"
                      onClick={() => openProduct(product)}
                    >
                      ▧ {product.images.length} Photos
                    </button>
                  </div>

                  <button
                    type="button"
                    className="el-product-info"
                    onClick={() => openProduct(product)}
                  >
                    <strong>{product.name}</strong>
                    <span>{product.bn}</span>
                  </button>

                  <div className="el-product-unit">{product.unit}</div>

                  <div className="el-product-bottom">
                    <strong className="el-product-price">
                      {money(product.price)}
                    </strong>

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
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <span>{quantity}</span>

                        <button
                          type="button"
                          onClick={() => changeQuantity(product, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="el-empty-results">
            <span>🔎</span>
            <h3>No products found</h3>
            <p>অন্য নামে সার্চ করুন অথবা অন্য ক্যাটাগরি বেছে নিন।</p>
            <button
              type="button"
              className="el-shop-button"
              onClick={() => {
                setSearch("");
                setActiveCategory("");
                setShowAllProducts(false);
              }}
            >
              Show All Products
            </button>
          </div>
        )}

        {filteredProducts.length > 4 && (
          <button
            type="button"
            className="el-view-all-products"
            onClick={() => setShowAllProducts((previous) => !previous)}
          >
            {showAllProducts ? "Show Less ↑" : "View All Products →"}
          </button>
        )}
      </section>

      {/* SMALL FOOTER BANNER */}
      <section className="el-bottom-banner">
        <div>
          <strong>Your daily groceries, made easier.</strong>
          <p>Shop smart. Live fresh.</p>
        </div>

        <button
          type="button"
          onClick={() => {
            setActiveCategory("");
            setSearch("");
            setShowAllProducts(true);
            scrollTo("el-products");
          }}
        >
          Shop Now →
        </button>
      </section>

      <footer className="el-footer">
        <img src="/logo.png" alt="" />
        <div>
          <strong>এখনই লাগবে · EKHONI LAGBE</strong>
          <p>15-Minute Delivery — Right to Your Hands</p>
        </div>
      </footer>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="el-mobile-nav" aria-label="Main navigation">
        <button
          type="button"
          className="is-current"
          onClick={() => handleNavigation("home")}
        >
          <span>⌂</span>
          <small>Home</small>
        </button>

        <button
          type="button"
          onClick={() => handleNavigation("categories")}
        >
          <span>▦</span>
          <small>Categories</small>
        </button>

        <button
          type="button"
          onClick={() => handleNavigation("popular")}
        >
          <span>★</span>
          <small>Popular</small>
        </button>

        <button
          type="button"
          onClick={() => handleNavigation("orders")}
        >
          <span>▤</span>
          <small>My Orders</small>
        </button>

        <button
          type="button"
          onClick={() => handleNavigation("guide")}
        >
          <span>ⓘ</span>
          <small>Guide</small>
        </button>
      </nav>

      {/* PRODUCT IMAGE GALLERY */}
      {selectedProduct && (
        <div
          className="el-gallery-overlay"
          onClick={() => setSelectedProduct(null)}
          role="presentation"
        >
          <section
            className="el-gallery-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProduct.name} photos`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="el-gallery-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close gallery"
            >
              ×
            </button>

            <div className="el-gallery-image-wrap">
              <button
                type="button"
                className="el-gallery-arrow el-gallery-prev"
                onClick={() => moveImage(-1)}
                aria-label="Previous photo"
              >
                ‹
              </button>

              <img
                className="el-gallery-main-image"
                src={selectedProduct.images[imageIndex]}
                alt={`${selectedProduct.name} photo ${imageIndex + 1}`}
              />

              <button
                type="button"
                className="el-gallery-arrow el-gallery-next"
                onClick={() => moveImage(1)}
                aria-label="Next photo"
              >
                ›
              </button>
            </div>

            <p className="el-gallery-count">
              Photo {imageIndex + 1} of {selectedProduct.images.length}
            </p>

            <div className="el-gallery-thumbnails">
              {selectedProduct.images.map((image, index) => (
                <button
                  type="button"
                  key={`${selectedProduct.id}-${index}`}
                  className={index === imageIndex ? "is-selected" : ""}
                  onClick={() => setImageIndex(index)}
                  aria-label={`View photo ${index + 1}`}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>

            <div className="el-gallery-product-info">
              <div>
                <strong>{selectedProduct.name}</strong>
                <p>{selectedProduct.bn}</p>
                <span>{selectedProduct.unit}</span>
              </div>

              <strong className="el-product-price">
                {money(selectedProduct.price)}
              </strong>
            </div>

            <button
              type="button"
              className="el-gallery-add-button"
              onClick={() => {
                changeQuantity(selectedProduct, 1);
              }}
            >
              + Add to Cart
            </button>
          </section>
        </div>
      )}

      {/* TEMPORARY ACTION MESSAGE */}
      {notice && <div className="el-toast">{notice}</div>}
    </div>
  );
}
export default CustomerHome;
