import React, { useMemo, useState } from "react";
import "./Home.css";

const categories = [
  { name: "Rice & Grains", bn: "চাল ও শস্য", icon: "🌾", tone: "sand" },
  { name: "Lentils", bn: "ডাল", icon: "🫘", tone: "rose" },
  { name: "Oil & Ghee", bn: "তেল ও ঘি", icon: "🫒", tone: "lime" },
  { name: "Salt & Sugar", bn: "লবণ ও চিনি", icon: "🧂", tone: "blue" },
  { name: "Spices", bn: "মসলা", icon: "🌶️", tone: "peach" },
  { name: "Dairy", bn: "দুধ ও দুগ্ধজাত", icon: "🥛", tone: "blue" },
  { name: "Eggs", bn: "ডিম", icon: "🥚", tone: "cream" },
  { name: "Snacks", bn: "স্ন্যাকস", icon: "🍪", tone: "rose" },
  { name: "Drinks", bn: "পানীয়", icon: "🧃", tone: "peach" },
  { name: "Household", bn: "ঘর পরিষ্কার", icon: "🧼", tone: "blue" },
  { name: "Personal Care", bn: "ব্যক্তিগত যত্ন", icon: "🧴", tone: "lime" },
  { name: "Baby Care", bn: "শিশুদের পণ্য", icon: "🍼", tone: "cream" },
];

const products = [
  { id: 1, name: "Miniket Rice", bn: "মিনিকেট চাল", size: "5 kg", price: 395, old: 430, rating: "4.8", category: "Rice & Grains", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=500&q=85", tag: "Popular" },
  { id: 2, name: "Masoor Dal", bn: "মসুর ডাল", size: "1 kg", price: 125, old: 140, rating: "4.7", category: "Lentils", image: "https://images.unsplash.com/photo-1515543904379-3d757able?auto=format&fit=crop&w=500&q=85", tag: "Good price" },
  { id: 3, name: "Soybean Oil", bn: "সয়াবিন তেল", size: "2 L", price: 340, old: null, rating: "4.6", category: "Oil & Ghee", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=85" },
  { id: 4, name: "Fresh Eggs", bn: "ফার্মের ডিম", size: "12 pcs", price: 150, old: 165, rating: "4.8", category: "Eggs", image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=500&q=85", tag: "Daily need" },
  { id: 5, name: "Full Cream Milk", bn: "ফুল ক্রিম দুধ", size: "1 L", price: 100, old: null, rating: "4.7", category: "Dairy", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=85" },
  { id: 6, name: "Potato Chips", bn: "আলুর চিপস", size: "100 g", price: 35, old: null, rating: "4.5", category: "Snacks", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=500&q=85" },
  { id: 7, name: "Iodized Salt", bn: "আয়োডিনযুক্ত লবণ", size: "1 kg", price: 42, old: 48, rating: "4.6", category: "Salt & Sugar", image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442f?auto=format&fit=crop&w=500&q=85" },
  { id: 8, name: "Red Chili Powder", bn: "মরিচের গুঁড়া", size: "200 g", price: 68, old: null, rating: "4.7", category: "Spices", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=500&q=85" },
  { id: 9, name: "Orange Drink", bn: "কমলার পানীয়", size: "1 L", price: 95, old: null, rating: "4.4", category: "Drinks", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=500&q=85" },
  { id: 10, name: "Dishwashing Liquid", bn: "ডিশওয়াশ লিকুইড", size: "500 ml", price: 110, old: 125, rating: "4.6", category: "Household", image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=500&q=85" },
  { id: 11, name: "Bathing Soap", bn: "গোসলের সাবান", size: "100 g", price: 55, old: null, rating: "4.5", category: "Personal Care", image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&w=500&q=85" },
  { id: 12, name: "Baby Wipes", bn: "বেবি ওয়াইপস", size: "Pack", price: 135, old: null, rating: "4.8", category: "Baby Care", image: "https://images.unsplash.com/photo-1604917877934-07d8d248d396?auto=format&fit=crop&w=500&q=85" },
];

const money = (n) => `৳${Number(n).toLocaleString("en-BD")}`;

function ProductCard({ product, qty, favorite, onAdd, onRemove, onFavorite, onView }) {
  return (
    <article className="el-product-card">
      <div className="el-product-image-wrap" onClick={() => onView(product)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onView(product)}>
        {product.tag && <span className="el-product-tag">{product.tag}</span>}
        <button className={`el-favorite ${favorite ? "is-favorite" : ""}`} aria-label="Toggle favorite" onClick={(e) => { e.stopPropagation(); onFavorite(product.id); }}>{favorite ? "♥" : "♡"}</button>
        <img src={product.image} alt={product.name} loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.parentElement.classList.add("el-image-fallback"); }} />
        <span className="el-image-fallback-text">{product.name}</span>
      </div>
      <div className="el-product-info">
        <span className="el-product-size">{product.size}</span>
        <h3>{product.bn}</h3>
        <p className="el-product-en">{product.name}</p>
        <div className="el-rating">★ <span>{product.rating}</span></div>
        <div className="el-price-line"><strong>{money(product.price)}</strong>{product.old && <del>{money(product.old)}</del>}</div>
        {qty > 0 ? (
          <div className="el-quantity-control">
            <button onClick={() => onRemove(product.id)} aria-label="Decrease quantity">−</button>
            <b>{qty}</b>
            <button onClick={() => onAdd(product.id)} aria-label="Increase quantity">+</button>
          </div>
        ) : (
          <button className="el-add-button" onClick={() => onAdd(product.id)}><span>＋</span> Add to cart</button>
        )}
      </div>
    </article>
  );
}

export default function Home({ onNavigate = () => {} }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState("Home");
  const [showAllPopular, setShowAllPopular] = useState(false);
  const [viewed, setViewed] = useState([]);
  const [toast, setToast] = useState("");

  const cartCount = Object.values(cart).reduce((sum, n) => sum + n, 0);
  const cartTotal = products.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0);
  const filteredProducts = useMemo(() => products.filter((p) => {
    const matchesSearch = `${p.name} ${p.bn} ${p.category}`.toLowerCase().includes(search.toLowerCase().trim());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }), [search, selectedCategory]);

  const add = (id) => setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const remove = (id) => setCart((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) }));
  const toggleFavorite = (id) => setFavorites((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const viewProduct = (p) => { setViewed((prev) => [p.id, ...prev.filter((x) => x !== p.id)].slice(0, 6)); setToast(`${p.bn} নির্বাচিত হয়েছে`); window.setTimeout(() => setToast(""), 1800); };
  const navigate = (tab) => {
    setActiveTab(tab);
    if (tab !== "Home") onNavigate(tab.toLowerCase());
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const shownProducts = showAllPopular ? filteredProducts : filteredProducts.slice(0, 8);
  const viewedProducts = viewed.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  return (
    <div className="el-home">
      <header className="el-home-header">
        <div className="el-header-main">
          <button className="el-brand" onClick={() => navigate("Home")} aria-label="EKHONI LAGBE home">
            <img src="/logo.png" alt="এখনই লাগবে" />
            <span><b>এখনই লাগবে</b><small>15-minute grocery delivery</small></span>
          </button>
          <div className="el-delivery-address"><span className="el-pin">⌖</span><div><small>Delivering to</small><b>Kamrangirchar, Dhaka</b></div><span className="el-chevron">⌄</span></div>
          <div className="el-header-actions">
            <button className="el-icon-button" aria-label="Notifications" onClick={() => setToast("নতুন নোটিফিকেশন এখনো নেই")}>♧<span className="el-icon-caption">Alerts</span></button>
            <button className="el-cart-button" onClick={() => onNavigate("cart")}><span className="el-cart-symbol">🛒</span><span><b>Cart</b><small>{cartCount} items · {money(cartTotal)}</small></span>{cartCount > 0 && <i>{cartCount}</i>}</button>
          </div>
        </div>
        <div className="el-search-row">
          <span>⌕</span><input value={search} onChange={(e) => { setSearch(e.target.value); setSelectedCategory("All"); }} placeholder="Search rice, eggs, oil, snacks..." aria-label="Search groceries" />
          {search && <button onClick={() => setSearch("")} aria-label="Clear search">×</button>}
          <kbd>⌕</kbd>
        </div>
      </header>

      <main className="el-home-content">
        <section className="el-hero">
          <div className="el-hero-copy">
            <span className="el-hero-eyebrow"><i></i> EVERYDAY GROCERY, MADE EASY</span>
            <h1>Your daily needs.<br /><em>At your door in 15.</em></h1>
            <p>Fresh essentials and everyday groceries, delivered right to your hands.</p>
            <button onClick={() => document.getElementById("el-popular")?.scrollIntoView({ behavior: "smooth" })}>Shop groceries <span>→</span></button>
            <div className="el-hero-trust"><span>✓ Carefully selected essentials</span><span>✓ Easy ordering</span></div>
          </div>
          <div className="el-hero-art" aria-hidden="true">
            <div className="el-hero-orbit"></div>
            <div className="el-grocery-bag"><div className="el-bag-handle"></div><div className="el-bag-leaf">✦</div><div className="el-bag-label">FRESH<br /><b>DAILY</b></div></div>
            <span className="el-art-food el-food-one">🥬</span><span className="el-art-food el-food-two">🥖</span><span className="el-art-food el-food-three">🥑</span><span className="el-art-food el-food-four">🍅</span>
            <div className="el-delivery-pill"><span>⚡</span><div><b>15-minute delivery</b><small>Right to your hands</small></div></div>
          </div>
        </section>

        <div className="el-benefit-strip">
          <div><span className="el-benefit-icon">⚡</span><span><b>Fast delivery</b><small>15-minute promise</small></span></div>
          <div><span className="el-benefit-icon">✓</span><span><b>Everyday essentials</b><small>All in one place</small></span></div>
          <div><span className="el-benefit-icon">♡</span><span><b>Easy shopping</b><small>Less time, less hassle</small></span></div>
        </div>

        <section className="el-section el-category-section">
          <div className="el-section-heading"><div><span className="el-kicker">FIND WHAT YOU NEED</span><h2>Shop by category</h2><p>Everyday essentials, neatly organized.</p></div><button className="el-text-link" onClick={() => navigate("Categories")}>View all <span>→</span></button></div>
          <div className="el-category-grid">
            {categories.map((c) => <button key={c.name} className="el-category-item" onClick={() => { setSelectedCategory(c.name); setSearch(""); document.getElementById("el-popular")?.scrollIntoView({ behavior: "smooth" }); }}>
              <span className={`el-category-icon ${c.tone}`}>{c.icon}</span><b>{c.bn}</b><small>{c.name}</small>
            </button>)}
          </div>
        </section>

        <section className="el-offer-section">
          <div className="el-offer-copy"><span className="el-kicker">SMARTER EVERYDAY SHOPPING</span><h2>Good essentials.<br /><em>Good value.</em></h2><p>Look out for selected savings on the groceries you use every day.</p><button onClick={() => { setSelectedCategory("All"); setSearch(""); document.getElementById("el-popular")?.scrollIntoView({ behavior: "smooth" }); }}>Explore offers <span>→</span></button></div>
          <div className="el-offer-visual"><div className="el-offer-sun"></div><div className="el-offer-card"><span>EVERYDAY</span><b>GOOD<br />CHOICES</b><i>Fresh picks for your home</i></div><span className="el-offer-spark">✳</span><span className="el-offer-leaf">❧</span></div>
          <div className="el-offer-note"><span>✦</span><b>Offers & deals</b><small>Selected deals, without the clutter.</small></div>
        </section>

        <section className="el-section el-products-section" id="el-popular">
          <div className="el-section-heading"><div><span className="el-kicker">CUSTOMER FAVOURITES</span><h2>{search ? "Search results" : selectedCategory === "All" ? "Popular products" : categories.find(c => c.name === selectedCategory)?.bn || selectedCategory}</h2><p>{search ? `Results for “${search}”` : "Frequently picked for everyday shopping."}</p></div><div className="el-product-heading-actions"><span className="el-result-count">{filteredProducts.length} products</span><button className="el-text-link" onClick={() => setShowAllPopular((v) => !v)}>{showAllPopular ? "Show less" : "View all"} <span>→</span></button></div></div>
          <div className="el-filter-chips"><button className={selectedCategory === "All" ? "active" : ""} onClick={() => setSelectedCategory("All")}>All products</button>{categories.slice(0, 6).map(c => <button key={c.name} className={selectedCategory === c.name ? "active" : ""} onClick={() => setSelectedCategory(c.name)}>{c.bn}</button>)}</div>
          {shownProducts.length ? <div className="el-product-grid">{shownProducts.map(p => <ProductCard key={p.id} product={p} qty={cart[p.id] || 0} favorite={favorites.includes(p.id)} onAdd={add} onRemove={remove} onFavorite={toggleFavorite} onView={viewProduct} />)}</div> : <div className="el-empty-results"><span>⌕</span><h3>কোনো পণ্য পাওয়া যায়নি</h3><p>অন্য নাম দিয়ে খুঁজুন অথবা সব পণ্য দেখুন।</p><button onClick={() => { setSearch(""); setSelectedCategory("All"); }}>সব পণ্য দেখুন</button></div>}
        </section>

        {viewedProducts.length > 0 && <section className="el-section"><div className="el-section-heading"><div><span className="el-kicker">PICK UP WHERE YOU LEFT OFF</span><h2>Recently viewed</h2><p>Products you just looked at.</p></div></div><div className="el-product-grid">{viewedProducts.map(p => <ProductCard key={`viewed-${p.id}`} product={p} qty={cart[p.id] || 0} favorite={favorites.includes(p.id)} onAdd={add} onRemove={remove} onFavorite={toggleFavorite} onView={viewProduct} />)}</div></section>}

        <section className="el-recommendation-row">
          <div className="el-recommendation-card el-recommendation-green"><span className="el-recommendation-icon">✦</span><div><span className="el-kicker">A LITTLE HELP</span><h3>Recommended for you</h3><p>Useful picks for your everyday grocery list.</p><button onClick={() => { setSelectedCategory("All"); document.getElementById("el-popular")?.scrollIntoView({ behavior: "smooth" }); }}>Explore picks <span>→</span></button></div><span className="el-recommendation-decoration">✳</span></div>
          <div className="el-recommendation-card el-recommendation-cream"><span className="el-recommendation-icon">↻</span><div><span className="el-kicker">SHOP AGAIN, EASILY</span><h3>Buy again</h3><p>Your order history will appear here after your first order.</p><button onClick={() => onNavigate("orders")}>View my orders <span>→</span></button></div><span className="el-recommendation-decoration">↗</span></div>
        </section>

        <section className="el-new-arrivals"><div><span className="el-new-icon">✧</span><div><span className="el-kicker">JUST ADDED</span><h2>New arrivals</h2><p>New grocery products will show up here as they’re added.</p></div></div><button className="el-text-link" onClick={() => { setSelectedCategory("All"); setSearch(""); document.getElementById("el-popular")?.scrollIntoView({ behavior: "smooth" }); }}>Discover products <span>→</span></button></section>
        <footer className="el-home-footer"><img src="/logo.png" alt="" /><div><b>এখনই লাগবে</b><span>15-Minute Delivery — Right to Your Hands</span></div><small>Serving Kamrangirchar, Dhaka</small></footer>
      </main>

      {cartCount > 0 && <div className="el-cart-summary"><div><span className="el-cart-summary-icon">🛒</span><span><b>{cartCount} items in cart</b><small>{money(cartTotal)} · Demo cart</small></span></div><button onClick={() => onNavigate("cart")}>View cart <span>→</span></button></div>}
      <nav className="el-bottom-nav" aria-label="Main navigation">
        {[["Home", "⌂"], ["Categories", "▦"], ["Popular", "✦"], ["Orders", "▤"], ["Account", "♙"]].map(([label, icon]) => <button key={label} className={activeTab === label ? "active" : ""} onClick={() => navigate(label)}><span>{icon}</span><small>{label}</small></button>)}
      </nav>
      {toast && <div className="el-toast" role="status">{toast}</div>}
    </div>
  );
}
