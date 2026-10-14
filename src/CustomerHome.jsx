import { useMemo, useState } from "react";
import "./CustomerHome.css";

const CATEGORIES = [
  { id: "all", name: "All", emoji: "🛍️" },
  { id: "vegetables", name: "Vegetables", emoji: "🥬" },
  { id: "fruits", name: "Fruits", emoji: "🍎" },
  { id: "dairy", name: "Dairy & Eggs", emoji: "🥛" },
  { id: "rice", name: "Rice & Grains", emoji: "🍚" },
  { id: "meat", name: "Meat & Fish", emoji: "🐟" },
  { id: "snacks", name: "Snacks", emoji: "🍪" },
  { id: "beverages", name: "Beverages", emoji: "🧃" },
  { id: "household", name: "Household", emoji: "🧹" },
];

const PRODUCTS = [
  { id: 1, name: "Fresh Tomatoes", category: "vegetables", price: 40, unit: "500 g", badge: "Fresh", images: ["https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1546470427-e5b89cd1a5c7?auto=format&fit=crop&w=900&q=85"], description: "Fresh tomatoes for everyday cooking." },
  { id: 2, name: "Fresh Bananas", category: "fruits", price: 60, unit: "1 dozen", badge: "Popular", images: ["https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=900&q=85"], description: "Everyday bananas selected for your family." },
  { id: 3, name: "Fresh Milk", category: "dairy", price: 90, unit: "1 litre", badge: "", images: ["https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=85"], description: "Milk for your daily grocery needs." },
  { id: 4, name: "Fresh Eggs", category: "dairy", price: 65, unit: "4 pieces", badge: "Daily Essential", images: ["https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=900&q=85"], description: "Eggs for breakfast and everyday cooking." },
  { id: 5, name: "Fresh Carrots", category: "vegetables", price: 45, unit: "500 g", badge: "", images: ["https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=900&q=85"], description: "Fresh carrots for salads and cooking." },
  { id: 6, name: "White Rice", category: "rice", price: 75, unit: "1 kg", badge: "", images: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=85"], description: "Rice for everyday meals." },
  { id: 7, name: "Red Apples", category: "fruits", price: 180, unit: "1 kg", badge: "Popular", images: ["https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=900&q=85"], description: "Crisp red apples for a refreshing snack." },
  { id: 8, name: "Potatoes", category: "vegetables", price: 35, unit: "1 kg", badge: "", images: ["https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=85"], description: "A versatile kitchen essential." },
  { id: 9, name: "Fresh Lemons", category: "vegetables", price: 30, unit: "4 pieces", badge: "", images: ["https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?auto=format&fit=crop&w=900&q=85"], description: "Lemons for drinks and cooking." },
  { id: 10, name: "Orange Juice", category: "beverages", price: 85, unit: "1 pack", badge: "", images: ["https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=85"], description: "A fruity drink for your day." },
  { id: 11, name: "Potato Chips", category: "snacks", price: 30, unit: "1 pack", badge: "", images: ["https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=900&q=85"], description: "A crunchy snack option." },
  { id: 12, name: "Fresh Fish", category: "meat", price: 220, unit: "500 g", badge: "", images: ["https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=900&q=85"], description: "Fish selection for home cooking." },
];

const OFFERS = [
  { id: 1, eyebrow: "FRESH EVERY DAY", title: "Fresh Picks for Your Family", description: "Everyday grocery essentials in one place.", button: "Shop Now", theme: "offer-green", emoji: "🥬", category: "vegetables" },
  { id: 2, eyebrow: "SMART SHOPPING", title: "Your Daily Essentials", description: "Find your everyday favourites with ease.", button: "Explore Now", theme: "offer-mint", emoji: "🛒", category: "all" },
  { id: 3, eyebrow: "FRUITFUL DAYS", title: "Bring Home Fresh Fruits", description: "Discover colourful everyday favourites.", button: "Shop Fruits", theme: "offer-lime", emoji: "🍎", category: "fruits" },
];
const money = (n) => `৳${n}`;

export default function CustomerHome({ onNavigate, cartCount: externalCartCount = 0 }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeOffer, setActiveOffer] = useState(0);
  const [notice, setNotice] = useState("");
  const [cartPanel, setCartPanel] = useState(null);
  const [location, setLocation] = useState("Kamrangirchar, Dhaka");
  const [locationOpen, setLocationOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const cartQuantity = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const visibleCartCount = Math.max(cartQuantity, Number(externalCartCount) || 0);
  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return PRODUCTS.filter((p) => (activeCategory === "all" || p.category === activeCategory) && (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)));
  }, [search, activeCategory]);

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  };
  const changeQuantity = (product, change) => {
    setCart((prev) => {
      const next = { ...prev };
      const amount = (next[product.id] || 0) + change;
      if (amount <= 0) delete next[product.id]; else next[product.id] = amount;
      return next;
    });
    if (change > 0) setCartPanel(product);
    else showNotice("Cart updated");
  };
  const toggleWishlist = (id) => setWishlist((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  const openProduct = (product) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
    setRecentlyViewed((prev) => [product.id, ...prev.filter((id) => id !== product.id)].slice(0, 8));
    window.history.replaceState(null, "", `#product-${product.id}`);
  };
  const closeProduct = () => { setSelectedProduct(null); setActiveImageIndex(0); window.history.replaceState(null, "", window.location.pathname + window.location.search); };
  const goToProducts = (category = "all") => {
    setActiveCategory(category);
    document.getElementById("el-products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const navigate = (destination) => {
    if (destination === "home") { setActiveCategory("all"); setSearch(""); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    if (destination === "categories") { document.getElementById("el-categories")?.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    if (destination === "popular") { goToProducts("all"); return; }
    if (destination === "offers") { document.getElementById("el-offers")?.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    if (destination === "wishlist") { document.getElementById("el-wishlist")?.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    if (destination === "recent") { document.getElementById("el-recent")?.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    if (typeof onNavigate === "function") onNavigate(destination, cart);
    else showNotice(`${destination} screen will be connected in the next step.`);
  };

  const ProductCard = ({ product }) => {
    const quantity = cart[product.id] || 0;
    const favourite = wishlist.includes(product.id);
    return <article className="el-product-card" key={product.id}>
      <div className="el-product-image-wrap">
        <button className="el-product-image-button" type="button" onClick={() => openProduct(product)} aria-label={`View ${product.name}`}><img className="el-product-image" src={product.images[0]} alt={product.name} loading="lazy" /></button>
        {product.badge && <span className="el-product-badge">{product.badge}</span>}
        <button type="button" className={`el-heart-button ${favourite ? "is-favourite" : ""}`} onClick={() => toggleWishlist(product.id)} aria-label={favourite ? "Remove from wishlist" : "Add to wishlist"}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" /></svg></button>
      </div>
      <button className="el-product-name-button" type="button" onClick={() => openProduct(product)}>{product.name}</button>
      <div className="el-product-unit">{product.unit}</div>
      <div className="el-product-bottom"><strong className="el-product-price">{money(product.price)}</strong>{quantity === 0 ? <button type="button" className="el-add-button" onClick={() => changeQuantity(product, 1)}>＋ Add to Cart</button> : <div className="el-quantity-control"><button type="button" onClick={() => changeQuantity(product, -1)} aria-label="Remove one">−</button><span>{quantity}</span><button type="button" onClick={() => changeQuantity(product, 1)} aria-label="Add one">+</button></div>}</div>
    </article>;
  };
  const renderSection = (title, subtitle, products, id) => products.length > 0 && <section className="el-section" id={id} key={id}><div className="el-section-heading"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div></div><div className="el-product-grid">{products.map((p) => <ProductCard product={p} key={p.id} />)}</div></section>;

  return <div className="el-page">
    <header className="el-header">
      <div className="el-header-inner">
        <button type="button" className="el-brand" onClick={() => navigate("home")} aria-label="EKHONI LAGBE Home"><img src="/logo.png" alt="EKHONI LAGBE logo" /><span className="el-brand-copy"><strong>EKHONI LAGBE</strong><small>15-Minute Delivery — Right to Your Hands</small></span></button>
        <div className="el-header-actions">
          <button type="button" className="el-header-icon" onClick={() => navigate("account")} aria-label="Account"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg><span>Account</span></button>
          <button type="button" className="el-header-icon" onClick={() => showNotice("You have no new notifications.")} aria-label="Notifications"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg><span>Alerts</span></button>
        </div>
      </div>
      <div className="el-location-row"><button type="button" className="el-location-button" onClick={() => setLocationOpen((v) => !v)}><span className="el-location-pin">⌖</span><span><small>DELIVER TO</small><strong>{location}</strong><em>Estimated delivery: about 15 min</em></span><b>⌄</b></button></div>
      {locationOpen && <div className="el-location-picker"><strong>Choose your delivery area</strong><p>Currently serving Kamrangirchar, Dhaka only.</p><button type="button" className={location === "Kamrangirchar, Dhaka" ? "selected" : ""} onClick={() => { setLocation("Kamrangirchar, Dhaka"); setLocationOpen(false); }}>✓ Kamrangirchar, Dhaka</button><small>Delivery time is an estimate and must be confirmed by the delivery system.</small></div>}
      <div className="el-search-row"><form className="el-search-bar" onSubmit={(e) => { e.preventDefault(); setSearchFocused(false); goToProducts(activeCategory); }}><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg><input type="search" value={search} onFocus={() => setSearchFocused(true)} onChange={(e) => setSearch(e.target.value)} placeholder="Search groceries, fruits, vegetables..." aria-label="Search products" />{search && <button type="button" className="el-clear-search" onClick={() => setSearch("")} aria-label="Clear search">×</button>}<button type="submit" className="el-search-submit">Search</button></form>{searchFocused && search.trim() && <div className="el-search-suggestions">{filteredProducts.slice(0, 4).map((p) => <button key={p.id} type="button" onClick={() => { setSearchFocused(false); openProduct(p); }}><img src={p.images[0]} alt=""/><span>{p.name}<small>{p.unit}</small></span><b>{money(p.price)}</b></button>)}{filteredProducts.length === 0 && <p>No matching products. Try another search.</p>}</div>}</div>
    </header>

    <main className="el-main">
      <section className="el-categories-section" id="el-categories"><div className="el-section-heading el-category-heading"><h2>Shop by Category</h2><span className="el-swipe-hint">Swipe →</span></div><div className="el-category-scroller">{CATEGORIES.map((c) => <button type="button" key={c.id} className={`el-category-item ${activeCategory === c.id ? "is-active" : ""}`} onClick={() => { setActiveCategory(c.id); document.getElementById("el-products")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}><span className="el-category-icon">{c.emoji}</span><span>{c.name}</span></button>)}</div></section>
      <section className="el-offers-section" id="el-offers"><div className="el-section-heading"><h2>Special for You</h2><span className="el-swipe-hint">Swipe →</span></div><div className="el-offer-scroller" onScroll={(e) => { const el = e.currentTarget; const i = Math.round(el.scrollLeft / (el.firstElementChild?.getBoundingClientRect().width + 14 || 1)); setActiveOffer(Math.min(OFFERS.length - 1, Math.max(0, i))); }}>{OFFERS.map((offer) => <article className={`el-offer-banner ${offer.theme}`} key={offer.id}><div className="el-offer-copy"><span className="el-offer-eyebrow">{offer.eyebrow}</span><h2>{offer.title}</h2><p>{offer.description}</p><button type="button" className="el-shop-now" onClick={() => goToProducts(offer.category)}>{offer.button} <span>→</span></button></div><div className="el-offer-art" aria-hidden="true"><span>{offer.emoji}</span><i>✦</i><b>✿</b></div></article>)}</div><div className="el-offer-dots">{OFFERS.map((o, i) => <button type="button" key={o.id} className={activeOffer === i ? "is-active" : ""} onClick={() => { setActiveOffer(i); document.querySelectorAll(".el-offer-banner")[i]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" }); }} aria-label={`Offer ${i + 1}`} />)}</div></section>
      <section className="el-quick-links"><button type="button" onClick={() => navigate("offers")}><span>🏷️</span><span>My Offers</span><b>→</b></button><button type="button" onClick={() => navigate("popular")}><span>🔥</span><span>Popular</span><b>→</b></button><button type="button" onClick={() => navigate("orders")}><span>🔄</span><span>Buy Again</span><b>→</b></button><button type="button" onClick={() => navigate("wishlist")}><span>♡</span><span>Wishlist</span><b>→</b></button><button type="button" onClick={() => navigate("recent")}><span>◷</span><span>Recently Viewed</span><b>→</b></button></section>
      <div id="el-products">{search.trim() ? <section className="el-section"><div className="el-section-heading"><div><h2>Search Results</h2><p>{filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"} found</p></div></div>{filteredProducts.length ? <div className="el-product-grid">{filteredProducts.map((p) => <ProductCard product={p} key={p.id}/>)}</div> : <div className="el-empty-state"><span>🔎</span><h3>No products found</h3><p>Try another product name or category.</p><button type="button" onClick={() => { setSearch(""); setActiveCategory("all"); }}>Clear Search</button></div>}</section> : activeCategory !== "all" ? renderSection(CATEGORIES.find((c) => c.id === activeCategory)?.name || "Products", "Explore products in this category", filteredProducts, "el-category-products") : <>{renderSection("Popular Products", "Everyday favourites for your home", PRODUCTS.filter((p) => [2,4,7,1].includes(p.id)), "el-popular-products")}{renderSection("Fresh Vegetables", "Fresh picks for everyday cooking", PRODUCTS.filter((p) => p.category === "vegetables"), "el-vegetable-products")}{renderSection("Fruits & Dairy", "Everyday essentials for your family", PRODUCTS.filter((p) => ["fruits","dairy"].includes(p.category)), "el-fruit-dairy")}{renderSection("Rice, Snacks & More", "More essentials to complete your basket", PRODUCTS.filter((p) => ["rice","snacks","beverages","meat"].includes(p.category)), "el-other-products")}</>}</div>
      {renderSection("My Wishlist", "Products you saved", PRODUCTS.filter((p) => wishlist.includes(p.id)), "el-wishlist")}
      {renderSection("Recently Viewed", "Pick up where you left off", recentlyViewed.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean), "el-recent")}
      <section className="el-bottom-promo"><div><span className="el-bottom-promo-kicker">YOUR DAILY SHOPPING</span><h2>Everything you need, in one place.</h2><p>Find your favourites and build your grocery basket.</p></div><button type="button" onClick={() => goToProducts("all")}>Shop All <span>→</span></button></section>
    </main>
    <footer className="el-footer"><img src="/logo.png" alt=""/><span>EKHONI LAGBE</span><small>15-Minute Delivery — Right to Your Hands</small></footer>
    <nav className="el-bottom-nav" aria-label="Main navigation">{[["home","⌂","Home"],["categories","▦","Categories"],["popular","♨","Popular"],["orders","▤","My Orders"],["cart","🛒","Cart"],["guide","☰","Guide"]].map(([id, icon, label]) => <button type="button" key={id} className={id === "home" && !selectedProduct ? "is-active" : ""} onClick={() => navigate(id)}><span className="el-nav-icon">{icon}</span><span>{label}</span>{id === "cart" && visibleCartCount > 0 && <b className="el-nav-cart-count">{visibleCartCount}</b>}</button>)}</nav>
    {notice && <div className="el-toast" role="status"><span>✓</span>{notice}<button type="button" onClick={() => setNotice("")} aria-label="Dismiss message">×</button></div>}
    {cartPanel && <div className="el-cart-panel-backdrop" onClick={() => setCartPanel(null)} role="presentation"><section className="el-cart-panel" role="dialog" aria-modal="true" aria-label="Added to cart" onClick={(e) => e.stopPropagation()}><button className="el-cart-panel-close" type="button" onClick={() => setCartPanel(null)} aria-label="Close">×</button><div className="el-cart-success">✓</div><h2>Added to your cart</h2><div className="el-cart-panel-product"><img src={cartPanel.images[0]} alt={cartPanel.name}/><div><strong>{cartPanel.name}</strong><small>{cartPanel.unit}</small><b>{money(cartPanel.price)} · Qty {cart[cartPanel.id] || 1}</b></div></div><div className="el-cart-panel-actions"><button type="button" onClick={() => setCartPanel(null)}>Continue Shopping</button><button type="button" onClick={() => { setCartPanel(null); navigate("cart"); }}>View Cart ({visibleCartCount})</button></div></section></div>}
    {selectedProduct && <div className="el-details-backdrop" role="presentation" onClick={closeProduct}><section className="el-details-page" role="dialog" aria-modal="true" aria-label={`${selectedProduct.name} details`} onClick={(e) => e.stopPropagation()}><div className="el-details-top"><button type="button" onClick={closeProduct} aria-label="Back to products">← Back</button><button type="button" className={`el-heart-button ${wishlist.includes(selectedProduct.id) ? "is-favourite" : ""}`} onClick={() => toggleWishlist(selectedProduct.id)} aria-label="Toggle wishlist"><svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg></button></div><div className="el-details-image"><img src={selectedProduct.images[activeImageIndex]} alt={selectedProduct.name}/>{selectedProduct.images.length > 1 && <><button type="button" className="el-details-arrow prev" onClick={() => setActiveImageIndex((i) => i === 0 ? selectedProduct.images.length - 1 : i - 1)}>‹</button><button type="button" className="el-details-arrow next" onClick={() => setActiveImageIndex((i) => (i + 1) % selectedProduct.images.length)}>›</button></>}<span>{activeImageIndex + 1} / {selectedProduct.images.length}</span></div><div className="el-details-thumbnails">{selectedProduct.images.map((src, i) => <button type="button" key={src} className={i === activeImageIndex ? "active" : ""} onClick={() => setActiveImageIndex(i)}><img src={src} alt={`Product view ${i + 1}`}/></button>)}</div><div className="el-details-content"><span className="el-detail-category">{CATEGORIES.find((c) => c.id === selectedProduct.category)?.name || "Grocery"}</span><h1>{selectedProduct.name}</h1><p className="el-details-unit">Pack size: {selectedProduct.unit}</p><div className="el-details-price"><strong>{money(selectedProduct.price)}</strong><span>Price shown is demo pricing</span></div><div className="el-rating-note">☆ No verified customer ratings yet</div><h3>Product Description</h3><p>{selectedProduct.description}</p><p className="el-detail-disclaimer">Price, stock and product information will need to be verified against live store data.</p><div className="el-details-add-row">{(cart[selectedProduct.id] || 0) === 0 ? <button type="button" className="el-add-button" onClick={() => changeQuantity(selectedProduct, 1)}>＋ Add to Cart</button> : <div className="el-quantity-control"><button type="button" onClick={() => changeQuantity(selectedProduct, -1)}>−</button><span>{cart[selectedProduct.id]}</span><button type="button" onClick={() => changeQuantity(selectedProduct, 1)}>+</button></div>}</div></div><div className="el-related-products"><h2>You may also like</h2><div className="el-product-grid">{PRODUCTS.filter((p) => p.id !== selectedProduct.id && p.category === selectedProduct.category).slice(0, 4).map((p) => <ProductCard product={p} key={p.id}/>)}</div></div></section></div>}
  </div>;
}
