import { useMemo, useState } from "react";
import "./Home.css";

const categories = [
  { name: "চাল ও ডাল", icon: "🌾" },
  { name: "তেল ও ঘি", icon: "🫒" },
  { name: "মসলা", icon: "🌶️" },
  { name: "দুধ ও ডিম", icon: "🥚" },
  { name: "নাস্তা", icon: "🍪" },
  { name: "পানীয়", icon: "🥤" },
  { name: "ফল", icon: "🍎" },
  { name: "সবজি", icon: "🥦" },
  { name: "গৃহস্থালি", icon: "🧹" },
  { name: "Personal Care", icon: "🧴" },
];

const products = [
  { id: 1, name: "মিনিকেট চাল", unit: "১ কেজি", price: 78, icon: "🍚", category: "চাল ও ডাল", tag: "দৈনন্দিন প্রয়োজন" },
  { id: 2, name: "মসুর ডাল", unit: "৫০০ গ্রাম", price: 65, icon: "🫘", category: "চাল ও ডাল", tag: "জনপ্রিয়" },
  { id: 3, name: "সয়াবিন তেল", unit: "১ লিটার", price: 175, icon: "🫗", category: "তেল ও ঘি", tag: "দৈনন্দিন প্রয়োজন" },
  { id: 4, name: "ফার্মের ডিম", unit: "৪টি", price: 52, icon: "🥚", category: "দুধ ও ডিম", tag: "জনপ্রিয়" },
  { id: 5, name: "ফুল ক্রিম দুধ", unit: "৫০০ মি.লি.", price: 45, icon: "🥛", category: "দুধ ও ডিম", tag: "দৈনন্দিন প্রয়োজন" },
  { id: 6, name: "আলু", unit: "১ কেজি", price: 35, icon: "🥔", category: "সবজি", tag: "জনপ্রিয়" },
  { id: 7, name: "পেঁয়াজ", unit: "১ কেজি", price: 60, icon: "🧅", category: "সবজি", tag: "দৈনন্দিন প্রয়োজন" },
  { id: 8, name: "আপেল", unit: "৫০০ গ্রাম", price: 160, icon: "🍎", category: "ফল", tag: "নতুন" },
  { id: 9, name: "কলা", unit: "৬টি", price: 55, icon: "🍌", category: "ফল", tag: "জনপ্রিয়" },
  { id: 10, name: "চায়ের পাতা", unit: "২০০ গ্রাম", price: 95, icon: "🍵", category: "নাস্তা", tag: "দৈনন্দিন প্রয়োজন" },
  { id: 11, name: "বিস্কুট", unit: "১ প্যাকেট", price: 30, icon: "🍪", category: "নাস্তা", tag: "জনপ্রিয়" },
  { id: 12, name: "কমলার জুস", unit: "১ লিটার", price: 120, icon: "🧃", category: "পানীয়", tag: "নতুন" },
  { id: 13, name: "হলুদ গুঁড়া", unit: "১০০ গ্রাম", price: 38, icon: "🟡", category: "মসলা", tag: "দৈনন্দিন প্রয়োজন" },
  { id: 14, name: "ডিশওয়াশ", unit: "১ প্যাকেট", price: 45, icon: "🧽", category: "গৃহস্থালি", tag: "জনপ্রিয়" },
  { id: 15, name: "হ্যান্ডওয়াশ", unit: "১ বোতল", price: 85, icon: "🧴", category: "Personal Care", tag: "নতুন" },
  { id: 16, name: "টমেটো", unit: "৫০০ গ্রাম", price: 30, icon: "🍅", category: "সবজি", tag: "দৈনন্দিন প্রয়োজন" },
];

const money = (amount) =>
  `৳${amount.toLocaleString("en-BD")}`;

function Home({ onNavigate }) {
  const [cart, setCart] = useState({});
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("সব");
  const [expanded, setExpanded] = useState({});
  const [activeTab, setActiveTab] = useState("Home");

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);

      const matchesCategory =
        activeCategory === "সব" ||
        product.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const cartTotal = products.reduce(
    (total, product) =>
      total + product.price * (cart[product.id] || 0),
    0
  );

  const addToCart = (id) => {
    setCart((current) => ({
      ...current,
      [id]: (current[id] || 0) + 1,
    }));
  };

  const changeQuantity = (id, amount) => {
    setCart((current) => {
      const next = { ...current };
      const quantity = (next[id] || 0) + amount;

      if (quantity <= 0) {
        delete next[id];
      } else {
        next[id] = quantity;
      }

      return next;
    });
  };

  const toggleMore = (section) => {
    setExpanded((current) => ({
      ...current,
      [section]: !current[section],
    }));
  };

  const renderProduct = (product) => (
    <article className="el-product-card" key={product.id}>
      <div className="el-product-image">
        <span className="el-product-tag">{product.tag}</span>
        <span className="el-product-emoji">{product.icon}</span>
        <button
          className="el-favorite"
          type="button"
          aria-label={`${product.name} পছন্দের তালিকায় যোগ করুন`}
          onClick={() => alert("Favorites সুবিধাটি পরে যুক্ত হবে।")}
        >
          ♡
        </button>
      </div>

      <div className="el-product-info">
        <div className="el-product-name">{product.name}</div>
        <div className="el-product-unit">{product.unit}</div>

        <div className="el-product-bottom">
          <strong>{money(product.price)}</strong>

          {cart[product.id] ? (
            <div className="el-quantity">
              <button
                type="button"
                onClick={() => changeQuantity(product.id, -1)}
                aria-label="পরিমাণ কমান"
              >
                −
              </button>
              <span>{cart[product.id]}</span>
              <button
                type="button"
                onClick={() => changeQuantity(product.id, 1)}
                aria-label="পরিমাণ বাড়ান"
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="el-add-button"
              type="button"
              onClick={() => addToCart(product.id)}
            >
              + Add
            </button>
          )}
        </div>
      </div>
    </article>
  );

  const renderSection = (title, subtitle, items, key) => {
    const visibleItems = expanded[key] ? items : items.slice(0, 4);

    return (
      <section className="el-section" key={key}>
        <div className="el-section-heading">
          <div>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
          {items.length > 4 && (
            <button
              className="el-view-more"
              type="button"
              onClick={() => toggleMore(key)}
            >
              {expanded[key] ? "কম দেখুন ↑" : "View More →"}
            </button>
          )}
        </div>

        <div className="el-product-grid">
          {visibleItems.map(renderProduct)}
        </div>
      </section>
    );
  };

  const popular = products.filter((product) => product.tag === "জনপ্রিয়");
  const essentials = products.filter(
    (product) => product.tag === "দৈনন্দিন প্রয়োজন"
  );
  const fresh = products.filter((product) =>
    ["ফল", "সবজি"].includes(product.category)
  );
  const newArrivals = products.filter((product) => product.tag === "নতুন");

  return (
    <div className="el-home">
      <header className="el-header">
        <button
          className="el-brand"
          type="button"
          onClick={() => {
            setActiveTab("Home");
            setSearch("");
            setActiveCategory("সব");
          }}
        >
          <img src="/logo.png" alt="EKHONI LAGBE logo" />
          <span>
            <strong>EKHONI LAGBE</strong>
            <small>এখনই লাগবে</small>
          </span>
        </button>

        <div className="el-location">
          <span>⌖</span>
          <div>
            <small>আপনার ডেলিভারি এলাকা</small>
            <strong>Kamrangirchar, Dhaka</strong>
          </div>
        </div>

        <button
          className="el-header-cart"
          type="button"
          onClick={() => onNavigate?.("cart")}
        >
          🛒 <span>Cart</span>
          {cartCount > 0 && <b>{cartCount}</b>}
        </button>
      </header>

      <div className="el-service-strip">
        <span>✓</span>
        বর্তমানে শুধু Kamrangirchar-এ ডেলিভারি
        <span className="el-strip-dot">•</span>
        15-Minute Delivery
      </div>

      <main className="el-main">
        <section className="el-hero">
          <div className="el-hero-copy">
            <span className="el-hero-label">YOUR NEIGHBOURHOOD GROCERY</span>
            <h1>
              আপনার প্রতিদিনের বাজার,
              <br />
              <span>এখন হাতের কাছেই!</span>
            </h1>
            <p>
              প্রয়োজনীয় Grocery এক জায়গায় খুঁজুন।
              সহজে বেছে নিন, Cart-এ যোগ করুন।
            </p>
            <div className="el-hero-points">
              <span>✓ সহজে বাজার করুন</span>
              <span>✓ দ্রুত ডেলিভারি</span>
            </div>
            <button
              className="el-hero-button"
              type="button"
              onClick={() =>
                document
                  .getElementById("el-categories")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              বাজার শুরু করুন <span>→</span>
            </button>
          </div>

          <div className="el-hero-art" aria-hidden="true">
            <div className="el-art-circle" />
            <span className="el-art-leaf">🥬</span>
            <span className="el-art-fruit">🍎</span>
            <span className="el-art-basket">🧺</span>
            <span className="el-art-carrot">🥕</span>
            <span className="el-art-tomato">🍅</span>
            <div className="el-art-note">
              <strong>15 min</strong>
              <small>দ্রুত ডেলিভারি</small>
            </div>
          </div>
        </section>

        <section className="el-search-panel">
          <label htmlFor="el-search">আপনার কী লাগবে?</label>
          <div className="el-search-box">
            <span>⌕</span>
            <input
              id="el-search"
              type="search"
              placeholder="চাল, ডিম, তেল বা অন্য কিছু খুঁজুন..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setActiveCategory("সব");
              }}
            />
            {search && (
              <button type="button" onClick={() => setSearch("")}>
                মুছুন
              </button>
            )}
          </div>
        </section>

        <section className="el-categories-section" id="el-categories">
          <div className="el-section-heading">
            <div>
              <h2>ক্যাটাগরি অনুযায়ী বাজার করুন</h2>
              <p>যা প্রয়োজন, সহজেই খুঁজে নিন</p>
            </div>
          </div>

          <div className="el-category-grid">
            {categories.map((category) => (
              <button
                className={`el-category-card ${
                  activeCategory === category.name ? "is-active" : ""
                }`}
                key={category.name}
                type="button"
                onClick={() => {
                  setActiveCategory(category.name);
                  setSearch("");
                }}
              >
                <span>{category.icon}</span>
                <strong>{category.name}</strong>
              </button>
            ))}
          </div>

          {activeCategory !== "সব" && (
            <button
              className="el-clear-filter"
              type="button"
              onClick={() => setActiveCategory("সব")}
            >
              সব ক্যাটাগরির পণ্য দেখুন ×
            </button>
          )}
        </section>

        <section className="el-offer-banner">
          <div>
            <span className="el-offer-label">SMART SHOPPING STARTS HERE</span>
            <h2>প্রয়োজনীয় বাজার, এক জায়গায়</h2>
            <p>পণ্য বেছে নিন এবং Cart-এ যোগ করুন।</p>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("el-products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              পণ্য দেখুন →
            </button>
          </div>
          <div className="el-offer-art" aria-hidden="true">🛍️</div>
        </section>

        {search || activeCategory !== "সব" ? (
          <section className="el-section" id="el-products">
            <div className="el-section-heading">
              <div>
                <h2>
                  {search
                    ? "সার্চের ফলাফল"
                    : `${activeCategory} — পণ্যসমূহ`}
                </h2>
                <p>{filteredProducts.length}টি পণ্য পাওয়া গেছে</p>
              </div>
              <button
                className="el-view-more"
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("সব");
                }}
              >
                সব পণ্য
              </button>
            </div>

            {filteredProducts.length ? (
              <div className="el-product-grid">
                {filteredProducts.map(renderProduct)}
              </div>
            ) : (
              <div className="el-empty-state">
                <span>🔎</span>
                <strong>পণ্যটি পাওয়া যায়নি</strong>
                <p>অন্য নাম দিয়ে খুঁজে দেখুন।</p>
              </div>
            )}
          </section>
        ) : (
          <>
            {renderSection(
              "জনপ্রিয় পণ্য",
              "যেসব পণ্য ক্রেতারা খুঁজে থাকেন",
              popular,
              "popular"
            )}
            {renderSection(
              "দৈনন্দিন প্রয়োজন",
              "প্রতিদিনের বাজারের প্রয়োজনীয় জিনিস",
              essentials,
              "essentials"
            )}
            {renderSection(
              "Fresh Grocery",
              "ফল ও সবজির প্রয়োজনীয় সংগ্রহ",
              fresh,
              "fresh"
            )}
            {renderSection(
              "নতুন পণ্য",
              "আমাদের তালিকায় নতুন যোগ হয়েছে",
              newArrivals,
              "new"
            )}
          </>
        )}

        <section className="el-delivery-note">
          <span>📍</span>
          <div>
            <strong>আমরা বর্তমানে Kamrangirchar-এ সেবা দিচ্ছি</strong>
            <p>
              ডেলিভারির সময় ও প্রাপ্যতা অর্ডার এবং এলাকার ওপর নির্ভর করতে পারে।
            </p>
          </div>
        </section>
      </main>

      {cartCount > 0 && (
        <button
          className="el-cart-summary"
          type="button"
          onClick={() => onNavigate?.("cart")}
        >
          <span className="el-cart-summary-icon">🛒</span>
          <span>
            <strong>{cartCount}টি পণ্য</strong>
            <small>Cart দেখুন</small>
          </span>
          <strong>{money(cartTotal)} →</strong>
        </button>
      )}

      <nav className="el-bottom-nav" aria-label="প্রধান নেভিগেশন">
        {[
          { name: "Home", icon: "⌂", target: "home" },
          { name: "Categories", icon: "▦", target: "categories" },
          { name: "Popular", icon: "★", target: "popular" },
          { name: "Orders", icon: "▤", target: "orders" },
          { name: "Account", icon: "♙", target: "account" },
        ].map((item) => (
          <button
            key={item.name}
            className={activeTab === item.name ? "is-active" : ""}
            type="button"
            onClick={() => {
              setActiveTab(item.name);

              if (item.target === "home") {
                setSearch("");
                setActiveCategory("সব");
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else if (item.target === "categories") {
                document
                  .getElementById("el-categories")
                  ?.scrollIntoView({ behavior: "smooth" });
              } else if (item.target === "popular") {
                document
                  .querySelector(".el-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              } else {
                onNavigate?.(item.target);
              }
            }}
          >
            <span>{item.icon}</span>
            <small>{item.name}</small>
          </button>
        ))}
      </nav>

      <footer className="el-footer">
        <img src="/logo.png" alt="" />
        <strong>EKHONI LAGBE</strong>
        <p>15-Minute Delivery — Right to Your Hands</p>
        <small>Currently serving Kamrangirchar only</small>
      </footer>
    </div>
  );
}

export default Home;
