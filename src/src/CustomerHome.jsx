
import React, { useMemo, useState } from "react";
import "./CustomerHome.css";

const categories = [
  { name: "শাকসবজি", en: "Vegetables", icon: "🥦", color: "#e8f7e9" },
  { name: "ফলমূল", en: "Fruits", icon: "🍎", color: "#fff0e8" },
  { name: "দুধ ও ডিম", en: "Dairy & Eggs", icon: "🥛", color: "#eaf3ff" },
  { name: "চাল ও ডাল", en: "Rice & Grains", icon: "🌾", color: "#fff5d9" },
  { name: "তেল ও মসলা", en: "Oil & Spices", icon: "🫙", color: "#fff0d9" },
  { name: "স্ন্যাকস", en: "Snacks", icon: "🍪", color: "#f6eaff" },
  { name: "পানীয়", en: "Beverages", icon: "🧃", color: "#e5f8f7" },
  { name: "গৃহস্থালি", en: "Household", icon: "🧹", color: "#f0f0f0" },
];

const products = [
  { id: 1, name: "Fresh Red Tomato", bn: "টাটকা লাল টমেটো", unit: "500 g", price: 35, old: 45, category: "Vegetables", image: "photo-1546094096-0df4bcaaa337", tag: "Popular" },
  { id: 2, name: "Fresh Potatoes", bn: "আলু", unit: "1 kg", price: 35, old: 40, category: "Vegetables", image: "photo-1518977676601-b53f82aba655" },
  { id: 3, name: "Fresh Bananas", bn: "কলা", unit: "1 dozen", price: 80, old: 95, category: "Fruits", image: "photo-1571771894821-ce9b6c11b08e", tag: "Best Seller" },
  { id: 4, name: "Fresh Red Apples", bn: "লাল আপেল", unit: "500 g", price: 160, old: 180, category: "Fruits", image: "photo-1560806887-1e4cd0b6cbd6" },
  { id: 5, name: "Fresh Milk", bn: "দুধ", unit: "1 litre", price: 95, old: 105, category: "Dairy & Eggs", image: "photo-1563636619-e9143da7973b" },
  { id: 6, name: "Farm Fresh Eggs", bn: "ডিম", unit: "12 pieces", price: 145, old: 155, category: "Dairy & Eggs", image: "photo-1506976785307-8732e854ad03" },
  { id: 7, name: "Premium Rice", bn: "চাল", unit: "1 kg", price: 75, old: 85, category: "Rice & Grains", image: "photo-1586201375761-83865001e31c" },
  { id: 8, name: "Cooking Oil", bn: "রান্নার তেল", unit: "1 litre", price: 175, old: 185, category: "Oil & Spices", image: "photo-1474979266404-7eaacbcd87c5" },
  { id: 9, name: "Fresh Green Chilli", bn: "কাঁচা মরিচ", unit: "250 g", price: 25, old: 30, category: "Vegetables", image: "photo-1588252303782-cb80119abd6d" },
  { id: 10, name: "Fresh Carrots", bn: "গাজর", unit: "500 g", price: 45, old: 55, category: "Vegetables", image: "photo-1445282768818-728615cc910a" },
  { id: 11, name: "Fresh Oranges", bn: "কমলা", unit: "1 kg", price: 140, old: 160, category: "Fruits", image: "photo-1547514701-42782101795e" },
  { id: 12, name: "Brown Lentils", bn: "মসুর ডাল", unit: "500 g", price: 65, old: 75, category: "Rice & Grains", image: "photo-1515543904379-3d757afe72e4" },
];

const imageUrl = (photo) =>
  `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=500&q=80`;

export default function CustomerHome({
  onNavigate,
  onAddToCart,
  cartCount = 0,
  deliveryAddress = "কামরাঙ্গীরচর, ঢাকা",
}) {
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [expanded, setExpanded] = useState([]);
  const [notice, setNotice] = useState("");

  const navigate = (page, data) => {
    if (onNavigate) onNavigate(page, data);
    else setNotice(`${page} পেজটি পরবর্তী ধাপে সংযুক্ত করা হবে।`);
  };

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchesSearch =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.bn.includes(term) ||
        p.category.toLowerCase().includes(term);
      const matchesCategory =
        activeCategory === "All" || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const sections = [
    { title: "জনপ্রিয় পণ্য", subtitle: "Popular Products", items: products.slice(0, 8) },
    { title: "দৈনন্দিন বাজার", subtitle: "Daily Essentials", items: products.slice(4, 12) },
    { title: "সেরা অফার", subtitle: "Best Deals", items: products.filter((p) => p.old > p.price) },
    { title: "আরও কিনুন", subtitle: "More Grocery", items: [...products].reverse() },
  ];

  const changeQuantity = (id, amount) => {
    setQuantities((old) => {
      const next = Math.max(0, (old[id] || 0) + amount);
      return { ...old, [id]: next };
    });
  };

  const addProduct = (product) => {
    if (onAddToCart) {
      onAddToCart(product, quantities[product.id] || 1);
    } else {
      changeQuantity(product.id, 1);
    }
    setNotice(`${product.bn} কার্টে যোগ করা হয়েছে`);
    setTimeout(() => setNotice(""), 2200);
  };

  const toggleFavorite = (id) => {
    setFavorites((old) =>
      old.includes(id) ? old.filter((item) => item !== id) : [...old, id]
    );
  };

  const renderProduct = (product) => (
    <article className="el-product" key={product.id}>
      <button
        className={`el-heart ${favorites.includes(product.id) ? "is-favorite" : ""}`}
        onClick={() => toggleFavorite(product.id)}
        aria-label="Add to favorites"
      >
        {favorites.includes(product.id) ? "♥" : "♡"}
      </button>

      {product.tag && <span className="el-product-tag">{product.tag}</span>}

      <button
        className="el-product-image"
        onClick={() => navigate("product", product)}
        aria-label={`View ${product.name}`}
      >
        <img src={imageUrl(product.image)} alt={product.bn} loading="lazy" />
      </button>

      <button
        className="el-product-title"
        onClick={() => navigate("product", product)}
      >
        <strong>{product.bn}</strong>
        <span>{product.name}</span>
      </button>

      <span className="el-unit">{product.unit}</span>

      <div className="el-price-line">
        <strong>৳{product.price}</strong>
        {product.old > product.price && <del>৳{product.old}</del>}
      </div>

      <button className="el-add-button" onClick={() => addProduct(product)}>
        <span>＋</span> Add
      </button>
    </article>
  );

  return (
    <div className="el-home">
      <div className="el-top-strip">
        <span>✦ Fresh groceries, right to your hands</span>
        <span>শুধু কামরাঙ্গীরচর, ঢাকা</span>
      </div>

      <header className="el-header">
        <button className="el-brand" onClick={() => navigate("home")} aria-label="Home">
          <span className="el-brand-mark">✿</span>
          <span className="el-brand-name">
            <b>EKHONI</b> <strong>LAGBE</strong>
            <small>GROCERY DELIVERY</small>
          </span>
        </button>

        <button className="el-address" onClick={() => navigate("addresses")}>
          <span className="el-location-icon">⌖</span>
          <span>
            <small>Deliver to</small>
            <strong>{deliveryAddress}⌄</strong>
          </span>
        </button>

        <nav className="el-desktop-nav" aria-label="Main navigation">
          <button className="active" onClick={() => navigate("home")}>Home</button>
          <button onClick={() => navigate("categories")}>Categories</button>
          <button onClick={() => navigate("popular")}>Popular</button>
          <button onClick={() => navigate("orders")}>My Orders</button>
        </nav>

        <div className="el-header-actions">
          <button aria-label="Search" onClick={() => document.getElementById("el-search")?.focus()}>⌕</button>
          <button className="el-cart-button" onClick={() => navigate("cart")} aria-label="Cart">
            🛒<span>{cartCount}</span>
          </button>
          <button aria-label="Account" onClick={() => navigate("account")}>♙</button>
        </div>
      </header>

      <main>
        <section className="el-hero">
          <div className="el-hero-copy">
            <span className="el-eyebrow"><span /> YOUR LOCAL GROCERY PARTNER</span>
            <h1>
              বাজার এখন<br />
              <span>আরও সহজ।</span>
            </h1>
            <p>
              আপনার প্রতিদিনের প্রয়োজনীয় Grocery, এখন আপনার হাতের কাছেই।
              সহজে বেছে নিন, অর্ডার করুন।
            </p>
            <div className="el-hero-buttons">
              <button className="el-primary-button" onClick={() => navigate("categories")}>
                Shop Now <span>→</span>
              </button>
              <button className="el-secondary-button" onClick={() => navigate("popular")}>
                Popular Products
              </button>
            </div>
            <div className="el-benefits">
              <span><b>✓</b> Fresh Products</span>
              <span><b>✓</b> Easy Ordering</span>
              <span><b>✓</b> Local Delivery</span>
            </div>
          </div>
          <div className="el-hero-visual">
            <div className="el-hero-orbit" />
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=85"
              alt="Fresh vegetables and groceries"
            />
            <div className="el-hero-note">
              <span>🥬</span>
              <div><strong>Fresh choices</strong><small>Everyday essentials</small></div>
            </div>
            <div className="el-hero-badge"><b>15</b><span>MIN*</span></div>
          </div>
          <div className="el-service-note">
            <span>⌖</span>
            <div><strong>আমরা এখন কামরাঙ্গীরচরে</strong><small>*১৫ মিনিটের ডেলিভারি শুধু যেখানে বাস্তবে সম্ভব</small></div>
          </div>
        </section>

        <section className="el-search-area">
          <label htmlFor="el-search">আজ কী লাগবে?</label>
          <div className="el-search-box">
            <span>⌕</span>
            <input
              id="el-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for groceries... / পণ্য খুঁজুন"
            />
            {search && <button onClick={() => setSearch("")}>Clear</button>}
          </div>
        </section>

        <section className="el-section">
          <div className="el-section-heading">
            <div><span className="el-section-kicker">SHOP BY CATEGORY</span><h2>কী কী লাগবে?</h2></div>
            <button className="el-text-link" onClick={() => navigate("categories")}>All Categories →</button>
          </div>
          <div className="el-category-grid">
            {categories.map((category) => (
              <button
                key={category.en}
                className="el-category-card"
                style={{ "--category-bg": category.color }}
                onClick={() => {
                  setActiveCategory(category.en);
                  navigate("categories", category);
                }}
              >
                <span className="el-category-icon">{category.icon}</span>
                <strong>{category.name}</strong>
                <small>{category.en}</small>
              </button>
            ))}
          </div>
        </section>

        {search || activeCategory !== "All" ? (
          <section className="el-section">
            <div className="el-section-heading">
              <div><span className="el-section-kicker">YOUR RESULTS</span><h2>পছন্দের পণ্য</h2></div>
              <button className="el-text-link" onClick={() => { setSearch(""); setActiveCategory("All"); }}>Clear filters ×</button>
            </div>
            {filteredProducts.length ? (
              <div className="el-product-grid">{filteredProducts.map(renderProduct)}</div>
            ) : (
              <div className="el-empty">
                <span>🔎</span><h3>কোনো পণ্য পাওয়া যায়নি</h3>
                <p>অন্য নাম দিয়ে খুঁজুন অথবা Category পরিবর্তন করুন।</p>
                <button className="el-primary-button" onClick={() => { setSearch(""); setActiveCategory("All"); }}>সব পণ্য দেখুন</button>
              </div>
            )}
          </section>
        ) : (
          sections.map((section, index) => {
            const isExpanded = expanded.includes(index);
            const visibleProducts = isExpanded ? section.items : section.items.slice(0, 4);
            return (
              <section className="el-section" key={section.subtitle}>
                <div className="el-section-heading">
                  <div>
                    <span className="el-section-kicker">{section.subtitle.toUpperCase()}</span>
                    <h2>{section.title}</h2>
                  </div>
                  <button
                    className="el-text-link"
                    onClick={() => navigate("popular", { title: section.title, products: section.items })}
                  >
                    View All →
                  </button>
                </div>
                <div className="el-product-grid">{visibleProducts.map(renderProduct)}</div>
                {section.items.length > 4 && (
                  <div className="el-view-more-wrap">
                    <button
                      className="el-view-more"
                      onClick={() => setExpanded((old) =>
                        old.includes(index) ? old.filter((i) => i !== index) : [...old, index]
                      )}
                    >
                      {isExpanded ? "Show Less ↑" : "View More Products ↓"}
                    </button>
                  </div>
                )}
              </section>
            );
          })
        )}

        <section className="el-bottom-banner">
          <div><span>EVERYDAY GROCERY, MADE EASY</span><h2>আপনার বাজার, আপনার সুবিধায়।</h2><p>প্রয়োজনীয় পণ্য খুঁজুন আর সহজে অর্ডার করুন।</p></div>
          <button onClick={() => navigate("categories")}>Start Shopping →</button>
        </section>
      </main>

      <footer className="el-footer">
        <div className="el-footer-brand">
          <strong><span>✿</span> EKHONI LAGBE</strong>
          <p>আপনার প্রতিদিনের Grocery, এখন হাতের কাছেই।</p>
        </div>
        <div><strong>Quick Links</strong><button onClick={() => navigate("home")}>Home</button><button onClick={() => navigate("categories")}>Categories</button><button onClick={() => navigate("orders")}>My Orders</button></div>
        <div><strong>Need Help?</strong><button onClick={() => navigate("information")}>Information & Guide</button><button onClick={() => navigate("support")}>Help & Support</button></div>
        <div className="el-footer-area">⌖ Serving Kamrangirchar only</div>
        <small className="el-copyright">© {new Date().getFullYear()} EKHONI LAGBE. All rights reserved.</small>
      </footer>

      <nav className="el-mobile-nav" aria-label="Mobile navigation">
        <button className="selected" onClick={() => navigate("home")}><span>⌂</span>Home</button>
        <button onClick={() => navigate("categories")}><span>▦</span>Categories</button>
        <button onClick={() => navigate("popular")}><span>♨</span>Popular</button>
        <button onClick={() => navigate("orders")}><span>▤</span>Orders</button>
        <button onClick={() => navigate("account")}><span>♙</span>Account</button>
      </nav>

      {notice && <div className="el-toast" role="status">{notice}</div>}
    </div>
  );
}
