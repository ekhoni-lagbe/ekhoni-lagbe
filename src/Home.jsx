
import React, { useMemo, useState } from "react";
import "./Home.css";

const categories = [
  { name: "চাল ও আটা", icon: "🌾", color: "sand" },
  { name: "ডাল", icon: "🫘", color: "peach" },
  { name: "তেল ও মসলা", icon: "🫒", color: "mint" },
  { name: "দুধ ও দুগ্ধজাত", icon: "🥛", color: "blue" },
  { name: "ডিম", icon: "🥚", color: "yellow" },
  { name: "ফল", icon: "🍎", color: "pink" },
  { name: "সবজি", icon: "🥦", color: "green" },
  { name: "স্ন্যাকস", icon: "🍪", color: "peach" },
  { name: "পানীয়", icon: "🧃", color: "blue" },
  { name: "ঘর পরিষ্কার", icon: "🧹", color: "sand" },
  { name: "ব্যক্তিগত যত্ন", icon: "🧴", color: "pink" },
  { name: "বেবি কেয়ার", icon: "🍼", color: "yellow" },
];

const products = [
  { id: 1, name: "মিনিকেট চাল", detail: "১ কেজি", price: 78, old: 85, category: "চাল ও আটা", tag: "জনপ্রিয়", image: "photo-1586201375761-83865001e31c" },
  { id: 2, name: "মসুর ডাল", detail: "৫০০ গ্রাম", price: 65, old: 72, category: "ডাল", tag: "জনপ্রিয়", image: "photo-1515543904379-3d757afe72e4" },
  { id: 3, name: "ফ্রেশ দুধ", detail: "৫০০ মিলি", price: 45, old: null, category: "দুধ ও দুগ্ধজাত", tag: "দৈনন্দিন", image: "photo-1563636619-e9143da7973b" },
  { id: 4, name: "ফার্মের ডিম", detail: "৪টি", price: 52, old: 56, category: "ডিম", tag: "দৈনন্দিন", image: "photo-1518569656558-1f25e69d93d7" },
  { id: 5, name: "তাজা টমেটো", detail: "৫০০ গ্রাম", price: 35, old: null, category: "সবজি", tag: "ফ্রেশ", image: "photo-1546094096-0df4bcaaa337" },
  { id: 6, name: "পাকা কলা", detail: "৬টি", price: 55, old: null, category: "ফল", tag: "ফ্রেশ", image: "photo-1571771894821-ce9b6c11b08e" },
  { id: 7, name: "সয়াবিন তেল", detail: "১ লিটার", price: 170, old: 180, category: "তেল ও মসলা", tag: "সাশ্রয়", image: "photo-1474979266404-7eaacbcd87c5" },
  { id: 8, name: "আলু", detail: "১ কেজি", price: 35, old: null, category: "সবজি", tag: "দৈনন্দিন", image: "photo-1518977676601-b53f82aba655" },
  { id: 9, name: "আপেল", detail: "৫০০ গ্রাম", price: 145, old: 160, category: "ফল", tag: "জনপ্রিয়", image: "photo-1560806887-1e4cd0b6cbd6" },
  { id: 10, name: "কমলা", detail: "৫০০ গ্রাম", price: 120, old: null, category: "ফল", tag: "ফ্রেশ", image: "photo-1547514701-42782101795e" },
  { id: 11, name: "বিস্কুট", detail: "১ প্যাকেট", price: 30, old: null, category: "স্ন্যাকস", tag: "স্ন্যাকস", image: "photo-1558961363-fa8fdf82db35" },
  { id: 12, name: "বিশুদ্ধ পানি", detail: "১ লিটার", price: 25, old: null, category: "পানীয়", tag: "দৈনন্দিন", image: "photo-1602143407151-7111542de6e8" },
];

const imageUrl = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=520&q=80`;

function ProductCard({ product, quantity, onAdd, onChange, onFavorite, favorite }) {
  const discount = product.old
    ? Math.round((1 - product.price / product.old) * 100)
    : 0;

  return (
    <article className="el-product-card">
      <div className="el-product-image">
        <img
          src={imageUrl(product.image)}
          alt={product.name}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.display = "none";
            event.currentTarget.parentElement.classList.add("el-image-fallback");
          }}
        />
        {product.old && <span className="el-discount">−{discount}%</span>}
        <button
          className={`el-favorite ${favorite ? "is-favorite" : ""}`}
          onClick={() => onFavorite(product.id)}
          aria-label="পছন্দের তালিকায় যোগ করুন"
          title="পছন্দের তালিকায় যোগ করুন"
        >
          {favorite ? "♥" : "♡"}
        </button>
        <span className="el-image-label">{product.tag}</span>
      </div>

      <div className="el-product-info">
        <h3>{product.name}</h3>
        <p className="el-product-detail">{product.detail}</p>
        <div className="el-product-price">
          <strong>৳{product.price}</strong>
          {product.old && <del>৳{product.old}</del>}
        </div>
        {quantity > 0 ? (
          <div className="el-quantity-control">
            <button onClick={() => onChange(product.id, quantity - 1)} aria-label="পরিমাণ কমান">−</button>
            <span>{quantity}</span>
            <button onClick={() => onChange(product.id, quantity + 1)} aria-label="পরিমাণ বাড়ান">+</button>
          </div>
        ) : (
          <button className="el-add-button" onClick={() => onAdd(product)}>
            <span>＋</span> কার্টে যোগ
          </button>
        )}
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
  onChange,
  onFavorite,
  onViewMore,
  expanded,
}) {
  const visibleItems = expanded ? items : items.slice(0, 6);

  return (
    <section className="el-product-section">
      <div className="el-section-heading">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {items.length > 6 && (
          <button className="el-text-link" onClick={onViewMore}>
            {expanded ? "কম দেখুন" : "সব দেখুন"} <span>→</span>
          </button>
        )}
      </div>

      {items.length ? (
        <div className="el-product-grid">
          {visibleItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={cart[product.id] || 0}
              favorite={favorites.includes(product.id)}
              onAdd={onAdd}
              onChange={onChange}
              onFavorite={onFavorite}
            />
          ))}
        </div>
      ) : (
        <div className="el-empty-state">এখানে এখনো কোনো পণ্য পাওয়া যায়নি।</div>
      )}
    </section>
  );
}

export default function Home({ onNavigate = () => {} }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("সব পণ্য");
  const [cart, setCart] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const cartItems = products.filter((product) => (cart[product.id] || 0) > 0);

  const cartTotal = cartItems.reduce(
    (sum, product) => sum + product.price * cart[product.id],
    0
  );

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "সব পণ্য" || product.category === activeCategory;

      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const addToCart = (product) => {
    setCart((previous) => ({
      ...previous,
      [product.id]: (previous[product.id] || 0) + 1,
    }));
  };

  const changeQuantity = (id, quantity) => {
    setCart((previous) => {
      const updated = { ...previous };
      if (quantity <= 0) {
        delete updated[id];
      } else {
        updated[id] = quantity;
      }
      return updated;
    });
  };

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const toggleExpanded = (key) => {
    setExpanded((previous) => ({ ...previous, [key]: !previous[key] }));
  };

  const selectCategory = (category) => {
    setActiveCategory(category);
    setSearch("");
    document.getElementById("el-products")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goTo = (destination) => {
    setMobileMenuOpen(false);
    if (destination === "cart") {
      setCartOpen(true);
      return;
    }
    onNavigate(destination);
  };

  const renderSection = (key, title, subtitle, items) => (
    <ProductSection
      title={title}
      subtitle={subtitle}
      items={items}
      cart={cart}
      favorites={favorites}
      onAdd={addToCart}
      onChange={changeQuantity}
      onFavorite={toggleFavorite}
      expanded={!!expanded[key]}
      onViewMore={() => toggleExpanded(key)}
    />
  );

  return (
    <div className="el-home">
      <div className="el-service-strip">
        <div className="el-shell el-strip-inner">
          <span><i className="el-live-dot" /> এখনই লাগবে — আপনার পাশেই</span>
          <span className="el-strip-right">১৫ মিনিটে ডেলিভারি · আপাতত কামরাঙ্গীরচর</span>
        </div>
      </div>

      <header className="el-header">
        <div className="el-shell el-header-main">
          <button
            className="el-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="মেনু খুলুন"
          >
            ☰
          </button>

          <button className="el-brand" onClick={() => goTo("home")} aria-label="হোম">
            <img src="/logo.png" alt="এখনই লাগবে লোগো" />
            <span>
              <strong>এখনই লাগবে</strong>
              <small>EKHONI LAGBE</small>
            </span>
          </button>

          <button className="el-address" onClick={() => goTo("information")}>
            <span className="el-address-icon">⌖</span>
            <span>
              <small>ডেলিভারি হবে</small>
              <strong>কামরাঙ্গীরচর, ঢাকা <span>⌄</span></strong>
            </span>
          </button>

          <label className="el-search">
            <span>⌕</span>
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setActiveCategory("সব পণ্য");
              }}
              placeholder="চাল, ডাল, দুধ বা পছন্দের পণ্য খুঁজুন..."
              aria-label="পণ্য খুঁজুন"
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="সার্চ মুছুন">×</button>
            )}
          </label>

          <div className="el-header-actions">
            <button className="el-icon-action" onClick={() => goTo("information")}>
              <span>♧</span>
              <small>সহায়তা</small>
            </button>
            <button className="el-icon-action el-cart-action" onClick={() => setCartOpen(true)}>
              <span>🛒{cartCount > 0 && <b>{cartCount}</b>}</span>
              <small>কার্ট</small>
            </button>
            <button className="el-account-action" onClick={() => goTo("account")}>
              <span>♙</span> অ্যাকাউন্ট
            </button>
          </div>
        </div>

        <div className={`el-mobile-search ${mobileMenuOpen ? "is-open" : ""}`}>
          <label className="el-search">
            <span>⌕</span>
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setActiveCategory("সব পণ্য");
              }}
              placeholder="কী লাগবে আজ?"
              aria-label="পণ্য খুঁজুন"
            />
          </label>
          <button onClick={() => goTo("account")}>আমার অ্যাকাউন্ট</button>
        </div>
      </header>

      <main className="el-shell">
        <section className="el-hero">
          <div className="el-hero-copy">
            <span className="el-eyebrow"><i /> আপনার পাড়ার গ্রোসারি স্টোর</span>
            <h1>
              বাজারের চিন্তা<br />
              <span>এখনই লাগবে?</span>
            </h1>
            <p>
              প্রতিদিনের দরকারি বাজার, এক জায়গায়। পছন্দ করুন, কার্টে যোগ করুন,
              আর ঘরে বসেই অর্ডার করুন।
            </p>
            <button
              className="el-hero-button"
              onClick={() => document.getElementById("el-products")?.scrollIntoView({ behavior: "smooth" })}
            >
              কেনাকাটা শুরু করুন <span>→</span>
            </button>
            <div className="el-hero-trust">
              <span><b>✓</b> সহজ কেনাকাটা</span>
              <span><b>✓</b> এক জায়গায় সব</span>
            </div>
          </div>

          <div className="el-hero-art">
            <div className="el-hero-orbit el-orbit-one" />
            <div className="el-hero-orbit el-orbit-two" />
            <div className="el-hero-circle">
              <img
                src={imageUrl("photo-1542838132-92c53300491e")}
                alt="তাজা সবজি ও গ্রোসারি"
              />
            </div>
            <div className="el-floating-card el-float-top">
              <span>✳</span><div><strong>প্রতিদিনের বাজার</strong><small>এক জায়গায় সহজে</small></div>
            </div>
            <div className="el-floating-card el-float-bottom">
              <span>♧</span><div><strong>এখনই লাগবে</strong><small>আপনার পাড়ার গ্রোসারি</small></div>
            </div>
            <span className="el-decor el-decor-one">✳</span>
            <span className="el-decor el-decor-two">✦</span>
          </div>
        </section>

        <section className="el-benefit-row" aria-label="সেবার সুবিধা">
          <div><span className="el-benefit-icon">◷</span><p><strong>দ্রুত ডেলিভারি</strong><small>১৫ মিনিটের লক্ষ্য</small></p></div>
          <div><span className="el-benefit-icon">♧</span><p><strong>দৈনন্দিন গ্রোসারি</strong><small>প্রয়োজনীয় পণ্য</small></p></div>
          <div><span className="el-benefit-icon">♡</span><p><strong>সহজ কেনাকাটা</strong><small>কম ধাপে অর্ডার</small></p></div>
          <div><span className="el-benefit-icon">✓</span><p><strong>পাড়াভিত্তিক সেবা</strong><small>কামরাঙ্গীরচর</small></p></div>
        </section>

        <section className="el-category-section">
          <div className="el-section-heading">
            <div>
              <h2>কী লাগবে আজ?</h2>
              <p>একটি ক্যাটাগরি বেছে নিন, পছন্দের পণ্য খুঁজে নিন</p>
            </div>
            <button className="el-text-link" onClick={() => selectCategory("সব পণ্য")}>
              সব পণ্য <span>→</span>
            </button>
          </div>
          <div className="el-category-scroll">
            <button
              className={`el-category-card el-all-category ${activeCategory === "সব পণ্য" ? "is-active" : ""}`}
              onClick={() => selectCategory("সব পণ্য")}
            >
              <span className="el-category-icon">✳</span>
              <strong>সব পণ্য</strong>
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                className={`el-category-card ${activeCategory === category.name ? "is-active" : ""}`}
                onClick={() => selectCategory(category.name)}
              >
                <span className={`el-category-icon el-cat-${category.color}`}>{category.icon}</span>
                <strong>{category.name}</strong>
              </button>
            ))}
          </div>
        </section>

        <section className="el-promo">
          <div className="el-promo-copy">
            <span className="el-promo-label">স্মার্ট শপিং শুরু হোক</span>
            <h2>আপনার দৈনন্দিন বাজার,<br />এবার আরও সহজ।</h2>
            <p>পণ্য দেখুন, পছন্দ করুন, প্রয়োজনমতো কার্টে যোগ করুন।</p>
            <button onClick={() => document.getElementById("el-products")?.scrollIntoView({ behavior: "smooth" })}>
              পণ্য দেখুন <span>→</span>
            </button>
          </div>
          <div className="el-promo-visual">
            <div className="el-promo-ring" />
            <img src={imageUrl("photo-1543168256-418811576931")} alt="গ্রোসারি শপিং ব্যাগ" loading="lazy" />
            <span className="el-promo-leaf">✳</span>
          </div>
        </section>

        <div id="el-products" className="el-products-anchor">
          {search.trim() ? (
            <>
              <div className="el-search-results">
                <span>সার্চ রেজাল্ট</span>
                <h2>“{search}” খুঁজে পাওয়া পণ্য</h2>
                <button onClick={() => setSearch("")}>সার্চ মুছুন ×</button>
              </div>
              <ProductSection
                title="আপনার খোঁজার ফলাফল"
                subtitle={`${filteredProducts.length}টি পণ্য পাওয়া গেছে`}
                items={filteredProducts}
                cart={cart}
                favorites={favorites}
                onAdd={addToCart}
                onChange={changeQuantity}
                onFavorite={toggleFavorite}
                expanded
                onViewMore={() => {}}
              />
            </>
          ) : activeCategory !== "সব পণ্য" ? (
            <>
              <div className="el-search-results">
                <span>ক্যাটাগরি</span>
                <h2>{activeCategory}</h2>
                <button onClick={() => setActiveCategory("সব পণ্য")}>সব পণ্য দেখুন ×</button>
              </div>
              <ProductSection
                title={`${activeCategory} — পণ্যসমূহ`}
                subtitle="পছন্দের পণ্য কার্টে যোগ করুন"
                items={filteredProducts}
                cart={cart}
                favorites={favorites}
                onAdd={addToCart}
                onChange={changeQuantity}
                onFavorite={toggleFavorite}
                expanded
                onViewMore={() => {}}
              />
            </>
          ) : (
            <>
              {renderSection("popular", "জনপ্রিয় পণ্য", "যেসব পণ্য দিয়ে অনেকে দৈনন্দিন বাজার করেন", products.filter((p) => p.tag === "জনপ্রিয়"))}
              {renderSection("daily", "প্রতিদিনের বাজার", "রোজকার প্রয়োজনীয় জিনিসপত্র", products.filter((p) => p.tag === "দৈনন্দিন"))}
              {renderSection("fresh", "ফল ও সবজি", "দৈনন্দিন রান্না ও খাবারের জন্য", products.filter((p) => ["ফল", "সবজি"].includes(p.category)))}
              {renderSection("all", "আরও পণ্য দেখুন", "আপনার প্রয়োজনীয় পণ্য খুঁজে নিন", products)}
            </>
          )}
        </div>

        <section className="el-bottom-callout">
          <div className="el-callout-icon">♧</div>
          <div>
            <h2>আপনার পাড়ার বাজার এখন হাতের মুঠোয়</h2>
            <p>EKHONI LAGBE — ১৫ মিনিটে ডেলিভারির লক্ষ্য নিয়ে।</p>
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            উপরে যান ↑
          </button>
        </section>
      </main>

      <footer className="el-footer">
        <div className="el-shell el-footer-main">
          <div className="el-footer-brand">
            <img src="/logo.png" alt="এখনই লাগবে" />
            <div><strong>এখনই লাগবে</strong><small>EKHONI LAGBE</small></div>
            <p>আপনার পাড়ার দৈনন্দিন গ্রোসারি কেনাকাটা সহজ করার একটি উদ্যোগ।</p>
          </div>
          <div className="el-footer-links">
            <strong>কেনাকাটা</strong>
            <button onClick={() => selectCategory("সব পণ্য")}>সব পণ্য</button>
            <button onClick={() => selectCategory("ফল")}>ফল ও সবজি</button>
            <button onClick={() => selectCategory("দুধ ও দুগ্ধজাত")}>দুধ ও দুগ্ধজাত</button>
          </div>
          <div className="el-footer-links">
            <strong>সহায়তা</strong>
            <button onClick={() => goTo("information")}>কীভাবে ব্যবহার করবেন</button>
            <button onClick={() => goTo("orders")}>আমার অর্ডার</button>
            <button onClick={() => goTo("account")}>অ্যাকাউন্ট</button>
          </div>
          <div className="el-footer-note">
            <span>📍</span>
            <strong>সেবার এলাকা</strong>
            <p>কামরাঙ্গীরচর, ঢাকা</p>
            <small>সেবার এলাকা পর্যায়ক্রমে বাড়ানো হতে পারে।</small>
          </div>
        </div>
        <div className="el-footer-bottom">
          <div className="el-shell">
            <span>© {new Date().getFullYear()} EKHONI LAGBE</span>
            <span>15-Minute Delivery — Right to Your Hands</span>
          </div>
        </div>
      </footer>

      <nav className="el-mobile-bottom-nav" aria-label="প্রধান নেভিগেশন">
        <button className="is-active" onClick={() => goTo("home")}><span>⌂</span><small>হোম</small></button>
        <button onClick={() => {
          setActiveCategory("সব পণ্য");
          document.querySelector(".el-category-section")?.scrollIntoView({ behavior: "smooth" });
        }}><span>▦</span><small>ক্যাটাগরি</small></button>
        <button onClick={() => document.getElementById("el-products")?.scrollIntoView({ behavior: "smooth" })}><span>✳</span><small>জনপ্রিয়</small></button>
        <button onClick={() => goTo("orders")}><span>▤</span><small>অর্ডার</small></button>
        <button onClick={() => goTo("account")}><span>♙</span><small>অ্যাকাউন্ট</small></button>
      </nav>

      {cartOpen && (
        <div className="el-cart-overlay" onClick={() => setCartOpen(false)}>
          <aside className="el-cart-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="el-cart-heading">
              <div><span>আপনার শপিং ব্যাগ</span><h2>আমার কার্ট ({cartCount})</h2></div>
              <button onClick={() => setCartOpen(false)} aria-label="কার্ট বন্ধ করুন">×</button>
            </div>

            {cartItems.length === 0 ? (
              <div className="el-cart-empty">
                <span>🛒</span>
                <h3>আপনার কার্ট এখনো খালি</h3>
                <p>পছন্দের পণ্য কার্টে যোগ করে কেনাকাটা শুরু করুন।</p>
                <button onClick={() => setCartOpen(false)}>পণ্য দেখতে থাকুন</button>
              </div>
            ) : (
              <>
                <div className="el-cart-items">
                  {cartItems.map((product) => (
                    <div className="el-cart-item" key={product.id}>
                      <img src={imageUrl(product.image)} alt={product.name} />
                      <div className="el-cart-item-info">
                        <strong>{product.name}</strong>
                        <small>{product.detail}</small>
                        <b>৳{product.price * cart[product.id]}</b>
                      </div>
                      <div className="el-quantity-control">
                        <button onClick={() => changeQuantity(product.id, cart[product.id] - 1)}>−</button>
                        <span>{cart[product.id]}</span>
                        <button onClick={() => changeQuantity(product.id, cart[product.id] + 1)}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="el-cart-summary">
                  <div><span>পণ্যের মূল্য</span><strong>৳{cartTotal}</strong></div>
                  <div><span>ডেলিভারি চার্জ</span><span>চেকআউটে নির্ধারিত হবে</span></div>
                  <div className="el-cart-total"><span>মোট পণ্যের মূল্য</span><strong>৳{cartTotal}</strong></div>
                  <button onClick={() => {
                    setCartOpen(false);
                    onNavigate("checkout");
                  }}>চেকআউটে যান →</button>
                  <small>এটি ডেমো কার্ট। বাস্তব অর্ডার ও পেমেন্ট এখনো সংযুক্ত নয়।</small>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
