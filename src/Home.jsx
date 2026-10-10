import { useMemo, useState } from "react";
import "./Home.css";

const GREEN = "#16833b";

const categories = [
  { name: "Rice & Grains", bn: "চাল ও শস্য", icon: "🌾" },
  { name: "Lentils", bn: "ডাল", icon: "🫘" },
  { name: "Cooking Oil", bn: "রান্নার তেল", icon: "🫒" },
  { name: "Salt & Sugar", bn: "লবণ ও চিনি", icon: "🧂" },
  { name: "Spices", bn: "মসলা", icon: "🌶️" },
  { name: "Dairy", bn: "দুধ ও দুগ্ধজাত", icon: "🥛" },
  { name: "Eggs", bn: "ডিম", icon: "🥚" },
  { name: "Snacks", bn: "স্ন্যাকস", icon: "🍪" },
  { name: "Drinks", bn: "পানীয়", icon: "🥤" },
  { name: "Household", bn: "ঘর পরিষ্কার", icon: "🧼" },
  { name: "Personal Care", bn: "ব্যক্তিগত যত্ন", icon: "🧴" },
  { name: "Baby Care", bn: "শিশুদের পণ্য", icon: "🍼" },
];

const products = [
  {
    id: 1,
    name: "Premium Miniket Rice",
    bn: "প্রিমিয়াম মিনিকেট চাল",
    weight: "1 kg",
    price: 78,
    oldPrice: 90,
    rating: 4.8,
    category: "Rice & Grains",
    badge: "Hot deal",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 2,
    name: "Fresh Red Lentils",
    bn: "মসুর ডাল",
    weight: "500 g",
    price: 65,
    oldPrice: 72,
    rating: 4.7,
    category: "Lentils",
    badge: "Save ৳7",
    image:
      "https://images.unsplash.com/photo-1515543904379-3d757d5b9c2e?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 3,
    name: "Pure Mustard Oil",
    bn: "খাঁটি সরিষার তেল",
    weight: "500 ml",
    price: 95,
    oldPrice: 110,
    rating: 4.8,
    category: "Cooking Oil",
    badge: "Best value",
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 4,
    name: "Farm Fresh Eggs",
    bn: "ফার্মের তাজা ডিম",
    weight: "6 pcs",
    price: 78,
    oldPrice: null,
    rating: 4.9,
    category: "Eggs",
    badge: "Fresh",
    image:
      "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 5,
    name: "Full Cream Milk",
    bn: "ফুল ক্রিম দুধ",
    weight: "1 litre",
    price: 100,
    oldPrice: null,
    rating: 4.8,
    category: "Dairy",
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 6,
    name: "Golden Chickpeas",
    bn: "ছোলা",
    weight: "500 g",
    price: 55,
    oldPrice: 60,
    rating: 4.6,
    category: "Lentils",
    badge: "Save ৳5",
    image:
      "https://images.unsplash.com/photo-1515543904379-3d757d5b9c2e?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 7,
    name: "Everyday Table Salt",
    bn: "খাবার লবণ",
    weight: "1 kg",
    price: 38,
    oldPrice: null,
    rating: 4.7,
    category: "Salt & Sugar",
    badge: "",
    image:
      "https://images.unsplash.com/photo-1518110925495-5fe2fda0442e?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 8,
    name: "Premium Tea",
    bn: "প্রিমিয়াম চা",
    weight: "200 g",
    price: 115,
    oldPrice: 125,
    rating: 4.8,
    category: "Drinks",
    badge: "Save ৳10",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 9,
    name: "Golden Turmeric Powder",
    bn: "হলুদের গুঁড়া",
    weight: "100 g",
    price: 35,
    oldPrice: null,
    rating: 4.6,
    category: "Spices",
    badge: "",
    image:
      "https://images.unsplash.com/photo-1615485500704-8e990f9900f5?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 10,
    name: "Potato Chips",
    bn: "আলুর চিপস",
    weight: "50 g",
    price: 25,
    oldPrice: null,
    rating: 4.5,
    category: "Snacks",
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 11,
    name: "Dishwashing Liquid",
    bn: "ডিশওয়াশ লিকুইড",
    weight: "250 ml",
    price: 85,
    oldPrice: 95,
    rating: 4.6,
    category: "Household",
    badge: "Save ৳10",
    image:
      "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 12,
    name: "Fresh Orange Juice",
    bn: "কমলার জুস",
    weight: "1 litre",
    price: 130,
    oldPrice: null,
    rating: 4.7,
    category: "Drinks",
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=600&q=85",
  },
];

const money = (amount) => `৳${amount}`;

function Icon({ name, size = 20 }) {
  const paths = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 4 4" />
      </>
    ),
    cart: (
      <>
        <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L20 8H6" />
        <circle cx="10" cy="20" r="1" />
        <circle cx="17" cy="20" r="1" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    home: (
      <>
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v12h14V9M9 21v-7h6v7" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
      </>
    ),
    receipt: (
      <>
        <path d="M5 3h14v18l-3-2-4 2-4-2-3 2z" />
        <path d="M8 8h8M8 12h8M8 16h4" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    close: <path d="m18 6-12 12M6 6l12 12" />,
    plus: <path d="M12 5v14M5 12h14" />,
    minus: <path d="M5 12h14" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.grid}
    </svg>
  );
}

function ProductCard({ product, quantity, favorite, onAdd, onRemove, onFavorite }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="el-product-card">
      <div className="el-product-image-wrap">
        {product.badge && (
          <span className="el-product-badge">{product.badge}</span>
        )}

        <button
          type="button"
          className={`el-favorite ${favorite ? "is-favorite" : ""}`}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          onClick={() => onFavorite(product.id)}
        >
          <Icon name="heart" size={19} />
        </button>

        {!imageFailed ? (
          <img
            className="el-product-image"
            src={product.image}
            alt={product.name}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="el-image-fallback">
            <span>🌿</span>
            <small>EKHONI LAGBE</small>
          </div>
        )}
      </div>

      <div className="el-product-info">
        <div className="el-product-weight">{product.weight}</div>
        <h3>{product.name}</h3>
        <p className="el-product-bn">{product.bn}</p>

        <div className="el-product-rating">
          <span>★</span> {product.rating}
          <span className="el-rating-separator">·</span>
          <span className="el-stock">In stock</span>
        </div>

        <div className="el-product-bottom">
          <div className="el-price">
            <strong>{money(product.price)}</strong>
            {product.oldPrice && (
              <del>{money(product.oldPrice)}</del>
            )}
          </div>

          {quantity > 0 ? (
            <div className="el-quantity-control">
              <button
                type="button"
                aria-label="Remove one"
                onClick={() => onRemove(product.id)}
              >
                <Icon name="minus" size={15} />
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                aria-label="Add one"
                onClick={() => onAdd(product.id)}
              >
                <Icon name="plus" size={15} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="el-add-button"
              onClick={() => onAdd(product.id)}
            >
              <Icon name="plus" size={17} />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function ProductSection({
  title,
  subtitle,
  items,
  cart,
  favorites,
  onAdd,
  onRemove,
  onFavorite,
  onViewAll,
  variant = "",
}) {
  if (!items.length) return null;

  return (
    <section className={`el-section ${variant}`}>
      <div className="el-section-heading">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <button type="button" className="el-view-all" onClick={onViewAll}>
          View all <Icon name="arrow" size={16} />
        </button>
      </div>

      <div className="el-product-rail">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={cart[product.id] || 0}
            favorite={favorites.includes(product.id)}
            onAdd={onAdd}
            onRemove={onRemove}
            onFavorite={onFavorite}
          />
        ))}
      </div>
    </section>
  );
}

export default function Home({ onNavigate = () => {} }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [activeNav, setActiveNav] = useState("Home");
  const [address, setAddress] = useState("Kamrangirchar, Dhaka");
  const [showAddress, setShowAddress] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [toast, setToast] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);

  const cartCount = Object.values(cart).reduce((sum, n) => sum + n, 0);

  const cartItems = useMemo(
    () =>
      products
        .filter((p) => cart[p.id] > 0)
        .map((p) => ({ ...p, quantity: cart[p.id] })),
    [cart]
  );

  const cartTotal = cartItems.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((p) => {
      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.bn.includes(term) ||
        p.category.toLowerCase().includes(term);

      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2300);
  };

  const addToCart = (id) => {
    setCart((previous) => ({ ...previous, [id]: (previous[id] || 0) + 1 }));
    const product = products.find((p) => p.id === id);
    notify(`${product?.name || "Product"} added to cart`);
  };

  const removeFromCart = (id) => {
    setCart((previous) => {
      const next = { ...previous };
      if ((next[id] || 0) <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });
  };

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const openCategory = (name) => {
    setSelectedCategory(name);
    setSearch("");
    document.getElementById("el-product-results")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const openNav = (label) => {
    setActiveNav(label);

    if (label === "Home") {
      setSelectedCategory("All");
      setSearch("");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (label === "Categories") {
      document.getElementById("el-categories")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    if (label === "Popular") {
      document.getElementById("el-popular")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    if (label === "Orders") {
      onNavigate("orders");
      return;
    }

    if (label === "Account") {
      onNavigate("account");
    }
  };

  const shownCategories = showAllCategories
    ? categories
    : categories.slice(0, 8);

  const popularProducts = products.slice(0, 8);
  const newProducts = products.filter((p) => p.badge === "New");
  const dealProducts = products.filter((p) => p.oldPrice);
  const recommendationProducts = products.slice(4, 10);

  return (
    <div className="el-home">
      <div className="el-top-strip">
        <div className="el-container el-top-strip-inner">
          <span>
            <Icon name="clock" size={14} />
            Fast grocery delivery in 15 minutes
          </span>
          <span className="el-area-note">Currently serving Kamrangirchar</span>
        </div>
      </div>

      <header className="el-header">
        <div className="el-container el-header-main">
          <button
            type="button"
            className="el-brand"
            onClick={() => openNav("Home")}
            aria-label="EKHONI LAGBE Home"
          >
            <img src="/logo.png" alt="EKHONI LAGBE logo" />
            <span>
              <strong>EKHONI LAGBE</strong>
              <small>15-Minute Grocery Delivery</small>
            </span>
          </button>

          <button
            type="button"
            className="el-address"
            onClick={() => setShowAddress(true)}
          >
            <span className="el-address-icon">
              <Icon name="pin" size={19} />
            </span>
            <span className="el-address-copy">
              <small>Deliver to</small>
              <strong>{address}</strong>
            </span>
            <span className="el-chevron">⌄</span>
          </button>

          <div className="el-header-actions">
            <button
              type="button"
              className="el-icon-button"
              aria-label="Notifications"
              onClick={() => setShowNotifications(true)}
            >
              <Icon name="bell" size={21} />
              <i />
            </button>
            <button
              type="button"
              className="el-cart-button"
              onClick={() => setShowCart(true)}
            >
              <Icon name="cart" size={21} />
              <span>Cart</span>
              {cartCount > 0 && <b>{cartCount}</b>}
            </button>
          </div>
        </div>

        <div className="el-container el-search-row">
          <div className="el-search-box">
            <Icon name="search" size={21} />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setSelectedCategory("All");
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  document.getElementById("el-product-results")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }
              }}
              placeholder="Search rice, eggs, oil and more..."
              aria-label="Search groceries"
            />
            {search && (
              <button
                type="button"
                className="el-clear-search"
                aria-label="Clear search"
                onClick={() => setSearch("")}
              >
                <Icon name="close" size={17} />
              </button>
            )}
            <span className="el-search-shortcut">⌕</span>
          </div>
          <button
            type="button"
            className="el-search-mobile-button"
            aria-label="Search"
            onClick={() =>
              document.querySelector(".el-search-box input")?.focus()
            }
          >
            <Icon name="search" size={21} />
          </button>
        </div>
      </header>

      <main className="el-container el-main">
        <section className="el-hero">
          <div className="el-hero-copy">
            <div className="el-hero-pill">
              <span className="el-live-dot" />
              YOUR DAILY GROCERY PARTNER
            </div>
            <h1>
              Your groceries.
              <br />
              <span>At your door in 15.</span>
            </h1>
            <p>
              Everyday essentials, fresh picks and pantry favourites—delivered
              quickly to your home.
            </p>

            <div className="el-hero-perks">
              <span><b>✓</b> Daily essentials</span>
              <span><b>✓</b> Easy ordering</span>
              <span><b>✓</b> Fast delivery</span>
            </div>

            <button
              type="button"
              className="el-hero-button"
              onClick={() =>
                document.getElementById("el-categories")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
            >
              Start shopping <Icon name="arrow" size={18} />
            </button>

            <div className="el-hero-delivery">
              <span className="el-delivery-clock"><Icon name="clock" size={18} /></span>
              <span>
                <strong>15-minute delivery promise</strong>
                <small>Service currently available in Kamrangirchar</small>
              </span>
            </div>
          </div>

          <div className="el-hero-art" aria-label="Grocery delivery illustration">
            <div className="el-art-glow" />
            <div className="el-art-circle el-art-circle-one" />
            <div className="el-art-circle el-art-circle-two" />
            <div className="el-art-leaf el-art-leaf-one" />
            <div className="el-art-leaf el-art-leaf-two" />
            <div className="el-art-card el-art-card-top">
              <span>⚡</span>
              <div><strong>Fast delivery</strong><small>Right to your hands</small></div>
            </div>
            <div className="el-grocery-bag">
              <div className="el-bag-handle" />
              <div className="el-bag-body">
                <div className="el-bag-produce produce-one">🥬</div>
                <div className="el-bag-produce produce-two">🥕</div>
                <div className="el-bag-produce produce-three">🥦</div>
                <div className="el-bag-produce produce-four">🍎</div>
                <div className="el-bag-logo">EL</div>
              </div>
            </div>
            <div className="el-art-card el-art-card-bottom">
              <span className="el-art-check">✓</span>
              <div><strong>Fresh picks</strong><small>For your everyday needs</small></div>
            </div>
            <div className="el-art-caption">FRESH · FAST · EASY</div>
          </div>
        </section>

        <section className="el-service-ribbon">
          <div><span>01</span><strong>Everyday essentials</strong></div>
          <i />
          <div><span>02</span><strong>Simple shopping</strong></div>
          <i />
          <div><span>03</span><strong>Fast local delivery</strong></div>
        </section>

        <section className="el-section el-categories-section" id="el-categories">
          <div className="el-section-heading">
            <div>
              <span className="el-eyebrow">FIND WHAT YOU NEED</span>
              <h2>Shop by category</h2>
              <p>Your daily essentials, all in one place.</p>
            </div>
            <button
              type="button"
              className="el-view-all"
              onClick={() => setShowAllCategories((value) => !value)}
            >
              {showAllCategories ? "Show less" : "View all"}
              <Icon name="arrow" size={16} />
            </button>
          </div>

          <div className="el-category-grid">
            {shownCategories.map((category) => (
              <button
                type="button"
                className={`el-category-card ${
                  selectedCategory === category.name ? "is-selected" : ""
                }`}
                key={category.name}
                onClick={() => openCategory(category.name)}
              >
                <span className="el-category-icon">{category.icon}</span>
                <strong>{category.name}</strong>
                <small>{category.bn}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="el-offer-banner">
          <div className="el-offer-stamp">DAILY<br />SAVINGS</div>
          <div className="el-offer-copy">
            <span>SMART PICKS. SMARTER SAVINGS.</span>
            <h2>Good groceries.<br />Better everyday value.</h2>
            <p>Explore selected offers on everyday essentials.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSearch("");
                document.getElementById("el-deals")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Explore offers <Icon name="arrow" size={17} />
            </button>
          </div>
          <div className="el-offer-visual">
            <div className="el-offer-orbit" />
            <div className="el-offer-product el-offer-product-one">🥬</div>
            <div className="el-offer-product el-offer-product-two">🥕</div>
            <div className="el-offer-product el-offer-product-three">🥑</div>
            <div className="el-offer-spark">✳</div>
          </div>
        </section>

        <ProductSection
          title="Popular products"
          subtitle="Everyday favourites customers love."
          items={popularProducts}
          cart={cart}
          favorites={favorites}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onFavorite={toggleFavorite}
          onViewAll={() => openNav("Popular")}
          variant="el-popular-section"
        />

        <section className="el-deals-section el-section" id="el-deals">
          <div className="el-section-heading">
            <div>
              <span className="el-eyebrow">LIMITED SELECTION</span>
              <h2>Offers & deals</h2>
              <p>Selected products with a reduced demo price.</p>
            </div>
            <span className="el-deal-mark">SAVE MORE</span>
          </div>

          <div className="el-deals-grid">
            {dealProducts.slice(0, 4).map((product) => (
              <div className="el-deal-card" key={product.id}>
                <div className="el-deal-icon">%</div>
                <div className="el-deal-content">
                  <small>{product.category}</small>
                  <strong>{product.name}</strong>
                  <span>
                    {money(product.price)}
                    <del>{money(product.oldPrice)}</del>
                  </span>
                </div>
                <button
                  type="button"
                  aria-label={`Add ${product.name}`}
                  onClick={() => addToCart(product.id)}
                >
                  <Icon name="plus" size={18} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <ProductSection
          title="Recently viewed"
          subtitle="Keep exploring products from your list."
          items={products.slice(2, 8)}
          cart={cart}
          favorites={favorites}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onFavorite={toggleFavorite}
          onViewAll={() => {
            setSearch("");
            setSelectedCategory("All");
            document.getElementById("el-product-results")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        />

        <ProductSection
          title="Recommended for you"
          subtitle="A few useful picks to explore."
          items={recommendationProducts}
          cart={cart}
          favorites={favorites}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onFavorite={toggleFavorite}
          onViewAll={() => openNav("Popular")}
          variant="el-recommended-section"
        />

        <section className="el-reorder-banner">
          <div className="el-reorder-icon"><Icon name="receipt" size={25} /></div>
          <div>
            <span className="el-eyebrow">SAVE YOUR TIME</span>
            <h2>Need your regular groceries?</h2>
            <p>Buy Again will be personalised when your order history is connected.</p>
          </div>
          <button type="button" onClick={() => onNavigate("orders")}>
            My orders <Icon name="arrow" size={17} />
          </button>
        </section>

        <ProductSection
          title="New arrivals"
          subtitle="Take a look at newly featured products."
          items={newProducts}
          cart={cart}
          favorites={favorites}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onFavorite={toggleFavorite}
          onViewAll={() => openNav("Popular")}
        />

        <section className="el-product-results" id="el-product-results">
          <div className="el-section-heading">
            <div>
              <span className="el-eyebrow">
                {search ? "SEARCH RESULTS" : "BROWSE PRODUCTS"}
              </span>
              <h2>
                {search
                  ? `Results for “${search}”`
                  : selectedCategory === "All"
                  ? "Explore groceries"
                  : selectedCategory}
              </h2>
              <p>{filteredProducts.length} products in this demo catalogue.</p>
            </div>
            {(search || selectedCategory !== "All") && (
              <button
                type="button"
                className="el-view-all"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
              >
                Clear filters <Icon name="close" size={16} />
              </button>
            )}
          </div>

          <div className="el-filter-chips">
            {["All", ...categories.map((category) => category.name)].map((name) => (
              <button
                type="button"
                key={name}
                className={selectedCategory === name ? "active" : ""}
                onClick={() => setSelectedCategory(name)}
              >
                {name}
              </button>
            ))}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="el-product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={cart[product.id] || 0}
                  favorite={favorites.includes(product.id)}
                  onAdd={addToCart}
                  onRemove={removeFromCart}
                  onFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="el-empty-state">
              <span>⌕</span>
              <h3>No products found</h3>
              <p>Try another product name or select a different category.</p>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
              >
                Show all products
              </button>
            </div>
          )}
        </section>

        <section className="el-trust-row">
          <div><span>✓</span><p><strong>Easy ordering</strong><small>Simple shopping experience</small></p></div>
          <div><span>◷</span><p><strong>Fast local delivery</strong><small>15-minute service promise</small></p></div>
          <div><span>♡</span><p><strong>Everyday essentials</strong><small>Your daily grocery needs</small></p></div>
        </section>
      </main>

      <footer className="el-footer">
        <div className="el-container el-footer-main">
          <div className="el-footer-brand">
            <img src="/logo.png" alt="EKHONI LAGBE logo" />
            <div>
              <strong>EKHONI LAGBE</strong>
              <small>15-Minute Delivery — Right to Your Hands</small>
            </div>
          </div>
          <p>Everyday groceries, made easier.</p>
        </div>
        <div className="el-footer-bottom">
          © {new Date().getFullYear()} EKHONI LAGBE · Serving Kamrangirchar, Dhaka
        </div>
      </footer>

      <nav className="el-bottom-nav" aria-label="Main navigation">
        {[
          { label: "Home", icon: "home" },
          { label: "Categories", icon: "grid" },
          { label: "Popular", icon: "heart" },
          { label: "Orders", icon: "receipt" },
          { label: "Account", icon: "user" },
        ].map((item) => (
          <button
            type="button"
            key={item.label}
            className={activeNav === item.label ? "active" : ""}
            onClick={() => openNav(item.label)}
          >
            <span className="el-nav-icon"><Icon name={item.icon} size={21} /></span>
            <small>{item.label}</small>
          </button>
        ))}
      </nav>

      {toast && <div className="el-toast">{toast}</div>}

      {showAddress && (
        <div className="el-modal-backdrop" onClick={() => setShowAddress(false)}>
          <section className="el-modal" onClick={(event) => event.stopPropagation()}>
            <div className="el-modal-heading">
              <div><span className="el-eyebrow">DELIVERY LOCATION</span><h2>Where should we deliver?</h2></div>
              <button type="button" onClick={() => setShowAddress(false)}><Icon name="close" /></button>
            </div>
            <p className="el-modal-note">The current service area is Kamrangirchar only.</p>
            <label className="el-field-label" htmlFor="el-address-input">Delivery address</label>
            <input
              id="el-address-input"
              className="el-modal-input"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Enter your area or address"
            />
            <button
              type="button"
              className="el-modal-primary"
              onClick={() => {
                setShowAddress(false);
                notify("Delivery address updated for this session");
              }}
            >
              Save address
            </button>
          </section>
        </div>
      )}

      {showNotifications && (
        <div className="el-modal-backdrop" onClick={() => setShowNotifications(false)}>
          <section className="el-modal" onClick={(event) => event.stopPropagation()}>
            <div className="el-modal-heading">
              <div><span className="el-eyebrow">UPDATES</span><h2>Notifications</h2></div>
              <button type="button" onClick={() => setShowNotifications(false)}><Icon name="close" /></button>
            </div>
            <div className="el-notification-empty">
              <span><Icon name="bell" size={26} /></span>
              <strong>You’re all caught up</strong>
              <p>Order updates and offers will appear here when notifications are connected.</p>
            </div>
          </section>
        </div>
      )}

      {showCart && (
        <div className="el-modal-backdrop el-cart-backdrop" onClick={() => setShowCart(false)}>
          <section className="el-cart-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="el-modal-heading">
              <div><span className="el-eyebrow">YOUR BASKET</span><h2>My cart ({cartCount})</h2></div>
              <button type="button" onClick={() => setShowCart(false)}><Icon name="close" /></button>
            </div>

            {cartItems.length ? (
              <>
                <div className="el-cart-items">
                  {cartItems.map((item) => (
                    <div className="el-cart-item" key={item.id}>
                      <div className="el-cart-item-picture">🛍️</div>
                      <div className="el-cart-item-info">
                        <strong>{item.name}</strong>
                        <small>{item.weight}</small>
                        <b>{money(item.price * item.quantity)}</b>
                      </div>
                      <div className="el-quantity-control">
                        <button type="button" onClick={() => removeFromCart(item.id)}><Icon name="minus" size={14} /></button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => addToCart(item.id)}><Icon name="plus" size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="el-cart-summary">
                  <div><span>Subtotal</span><strong>{money(cartTotal)}</strong></div>
                  <small>Delivery fee and final total will be calculated at checkout when connected.</small>
                  <button
                    type="button"
                    className="el-modal-primary"
                    onClick={() => {
                      setShowCart(false);
                      notify("Checkout will be connected in a later step");
                    }}
                  >
                    Continue to checkout <Icon name="arrow" size={17} />
                  </button>
                </div>
              </>
            ) : (
              <div className="el-notification-empty">
                <span><Icon name="cart" size={28} /></span>
                <strong>Your cart is waiting</strong>
                <p>Add your everyday grocery essentials to get started.</p>
                <button type="button" className="el-modal-primary" onClick={() => setShowCart(false)}>
                  Continue shopping
                </button>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
