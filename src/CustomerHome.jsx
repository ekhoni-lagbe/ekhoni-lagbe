import { useMemo, useState } from "react";
import "./CustomerHome.css";

const SERVICE_ZONES = [
  { id: "kamrangirchar-main", name: "Kamrangirchar, Dhaka", detail: "Main service area", minutes: 15 },
  { id: "rasulpur", name: "Rasulpur, Kamrangirchar", detail: "Check availability at checkout", minutes: 15 },
  { id: "companyghat", name: "Companyghat, Kamrangirchar", detail: "Check availability at checkout", minutes: 15 },
  { id: "jhaugola", name: "Jhaougola, Kamrangirchar", detail: "Check availability at checkout", minutes: 15 },
  { id: "other-zone", name: "Another address in Kamrangirchar", detail: "Availability must be confirmed", minutes: 15 },
];

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
  { id: 1, name: "Fresh Tomatoes", category: "vegetables", price: 40, unit: "500 g", badge: "Fresh", image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1546470427-e5b89cd1a5c7?auto=format&fit=crop&w=900&q=85"] },
  { id: 2, name: "Fresh Bananas", category: "fruits", price: 60, unit: "1 dozen", badge: "Popular", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=900&q=85"] },
  { id: 3, name: "Fresh Milk", category: "dairy", price: 90, unit: "1 litre", badge: "", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=85"] },
  { id: 4, name: "Fresh Eggs", category: "dairy", price: 65, unit: "4 pieces", badge: "Daily Essential", image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=900&q=85"] },
  { id: 5, name: "Fresh Carrots", category: "vegetables", price: 45, unit: "500 g", badge: "", image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=900&q=85"] },
  { id: 6, name: "White Rice", category: "rice", price: 75, unit: "1 kg", badge: "", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=85"] },
  { id: 7, name: "Red Apples", category: "fruits", price: 180, unit: "1 kg", badge: "Popular", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=900&q=85"] },
  { id: 8, name: "Potatoes", category: "vegetables", price: 35, unit: "1 kg", badge: "", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=85"] },
  { id: 9, name: "Fresh Lemons", category: "vegetables", price: 30, unit: "4 pieces", badge: "", image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?auto=format&fit=crop&w=900&q=85"] },
  { id: 10, name: "Orange Juice", category: "beverages", price: 85, unit: "1 pack", badge: "", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=85"] },
  { id: 11, name: "Potato Chips", category: "snacks", price: 30, unit: "1 pack", badge: "", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=900&q=85"] },
  { id: 12, name: "Fresh Fish", category: "meat", price: 220, unit: "500 g", badge: "", image: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=900&q=85"] },
];

const OFFERS = [
  { id: 1, eyebrow: "FRESH EVERY DAY", title: "Fresh Picks for Your Family", description: "Everyday grocery essentials in one place.", button: "Shop Now", theme: "offer-green", emoji: "🥬", category: "vegetables" },
  { id: 2, eyebrow: "SMART SHOPPING", title: "Your Daily Essentials", description: "Find your everyday favourites with ease.", button: "Explore Now", theme: "offer-mint", emoji: "🛒", category: "all" },
  { id: 3, eyebrow: "FRUITFUL DAYS", title: "Bring Home Fresh Fruits", description: "Discover colourful everyday favourites.", button: "Shop Fruits", theme: "offer-lime", emoji: "🍎", category: "fruits" },
];

const formatPrice = (price) => `৳${price}`;

function CustomerHome({ onNavigate, cartCount: externalCartCount = 0 }) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedSections, setExpandedSections] = useState({});
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeOffer, setActiveOffer] = useState(0);
  const [notice, setNotice] = useState("");
  const [selectedZone, setSelectedZone] = useState(SERVICE_ZONES[0]);
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [locationConfirmed, setLocationConfirmed] = useState(false);

  const cartQuantity = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const visibleCartCount = Math.max(cartQuantity, Number(externalCartCount) || 0);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.category === activeCategory;
      const matchesSearch = !query || product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const filteredZones = SERVICE_ZONES.filter((zone) =>
    zone.name.toLowerCase().includes(locationSearch.trim().toLowerCase())
  );

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2000);
  };

  const changeQuantity = (productId, change) => {
    setCart((previous) => {
      const nextQuantity = (previous[productId] || 0) + change;
      const next = { ...previous };
      if (nextQuantity <= 0) delete next[productId];
      else next[productId] = nextQuantity;
      return next;
    });
    showNotice(change > 0 ? "Added to your cart" : "Cart updated");
  };

  const toggleWishlist = (productId) => setWishlist((previous) =>
    previous.includes(productId) ? previous.filter((id) => id !== productId) : [...previous, productId]
  );

  const openProduct = (product) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
  };

  const closeProduct = () => {
    setSelectedProduct(null);
    setActiveImageIndex(0);
  };

  const selectCategory = (categoryId) => {
    setActiveCategory(categoryId);
    setSearch("");
  };

  const goToProducts = (categoryId = "all") => {
    setActiveCategory(categoryId);
    setSearch("");
    document.getElementById("el-products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavigation = (destination) => {
    if (destination === "home") {
      setActiveCategory("all");
      setSearch("");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (destination === "categories") {
      document.getElementById("el-categories")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (destination === "popular") {
      goToProducts("all");
      return;
    }
    if (destination === "offers") {
      document.getElementById("el-offers")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (destination === "cart") {
      if (typeof onNavigate === "function") onNavigate("cart", cart);
      else showNotice("Cart screen will be connected in the next step.");
      return;
    }
    if (destination === "account") {
      if (typeof onNavigate === "function") onNavigate("account");
      return;
    }
    if (destination === "orders") {
      if (typeof onNavigate === "function") onNavigate("orders");
      else showNotice("My Orders will be connected in the next step.");
      return;
    }
    if (destination === "guide") {
      if (typeof onNavigate === "function") onNavigate("guide");
      else showNotice("Information Guide will be connected in the next step.");
    }
  };

  const productCard = (product) => {
    const quantity = cart[product.id] || 0;
    const isFavourite = wishlist.includes(product.id);
    return (
      <article className="el-product-card" key={product.id}>
        <div className="el-product-image-wrap">
          <button className="el-product-image-button" type="button" onClick={() => openProduct(product)} aria-label={`View ${product.name} details`}>
            <img className="el-product-image" src={product.image} alt={product.name} loading="lazy" />
          </button>
          {product.badge && <span className="el-product-badge">{product.badge}</span>}
          <button type="button" className={`el-heart-button ${isFavourite ? "is-favourite" : ""}`} onClick={() => toggleWishlist(product.id)} aria-label={isFavourite ? "Remove from wishlist" : "Add to wishlist"}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" /></svg>
          </button>
        </div>
        <button className="el-product-name-button" type="button" onClick={() => openProduct(product)}>{product.name}</button>
        <div className="el-product-unit">{product.unit}</div>
        <div className="el-product-bottom">
          <strong className="el-product-price">{formatPrice(product.price)}</strong>
          {quantity === 0 ? (
            <button type="button" className="el-add-button" onClick={() => changeQuantity(product.id, 1)}>+ Add to Cart</button>
          ) : (
            <div className="el-quantity-control">
              <button type="button" onClick={() => changeQuantity(product.id, -1)} aria-label={`Remove one ${product.name}`}>−</button>
              <span>{quantity}</span>
              <button type="button" onClick={() => changeQuantity(product.id, 1)} aria-label={`Add one ${product.name}`}>+</button>
            </div>
          )}
        </div>
      </article>
    );
  };

  const renderSection = (title, subtitle, products, sectionId) => {
    const isExpanded = Boolean(expandedSections[sectionId]);
    const displayedProducts = isExpanded ? products : products.slice(0, 4);
    if (!products.length) return null;
    return (
      <section className="el-section" key={sectionId}>
        <div className="el-section-heading">
          <div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>
          {products.length > 4 && <button type="button" className="el-view-more" onClick={() => setExpandedSections((previous) => ({ ...previous, [sectionId]: !previous[sectionId] }))}>{isExpanded ? "View Less ↑" : "View More →"}</button>}
        </div>
        <div className="el-product-grid">{displayedProducts.map(productCard)}</div>
      </section>
    );
  };

  return (
    <div className="el-page">
      <header className="el-header">
        <div className="el-header-inner">
          <button type="button" className="el-brand" onClick={() => handleNavigation("home")} aria-label="EKHONI LAGBE Home">
            <img src="/logo.png" alt="EKHONI LAGBE logo" />
            <span className="el-brand-copy">
              <strong>EKHONI LAGBE</strong>
              <small>15-Minute Delivery <i>•</i> Right to Your Hands</small>
            </span>
          </button>
          <div className="el-header-actions">
            <button type="button" className="el-header-icon" onClick={() => handleNavigation("account")} aria-label="Account">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.5" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></svg><span>Account</span>
            </button>
            <button type="button" className="el-header-icon el-notification-button" onClick={() => showNotice("You have no new notifications.")} aria-label="Notifications">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></svg><span>Alerts</span>
            </button>
          </div>
        </div>

        <div className="el-location-row">
          <button type="button" className="el-location-button" onClick={() => setLocationOpen(true)} aria-haspopup="dialog" aria-expanded={locationOpen}>
            <span className="el-location-pin" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg></span>
            <span className="el-location-copy">
              <small>{locationConfirmed ? "DELIVERING TO" : "SELECT DELIVERY LOCATION"}</small>
              <strong>{selectedZone.name}</strong>
            </span>
            <span className="el-location-change">Change⌄</span>
          </button>
          <div className="el-delivery-estimate"><span className="el-delivery-dot" /><span><strong>~{selectedZone.minutes} min</strong><small>estimated delivery</small></span></div>
        </div>

        <div className="el-search-row">
          <form className="el-search-bar" onSubmit={(event) => { event.preventDefault(); goToProducts(activeCategory); }}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>
            <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search groceries, fruits, vegetables..." aria-label="Search products" />
            {search && <button type="button" className="el-clear-search" onClick={() => setSearch("")} aria-label="Clear search">×</button>}
            <button type="submit" className="el-search-submit">Search</button>
          </form>
        </div>
      </header>

      <main className="el-main">
        <section className="el-categories-section" id="el-categories">
          <div className="el-section-heading el-category-heading"><div><h2>Shop by Category</h2></div><span className="el-swipe-hint">Swipe →</span></div>
          <div className="el-category-scroller">{CATEGORIES.map((category) => <button type="button" key={category.id} className={`el-category-item ${activeCategory === category.id ? "is-active" : ""}`} onClick={() => selectCategory(category.id)}><span className="el-category-icon">{category.emoji}</span><span>{category.name}</span></button>)}</div>
        </section>

        <section className="el-offers-section" id="el-offers">
          <div className="el-section-heading"><div><h2>Special for You</h2></div><span className="el-swipe-hint">Swipe →</span></div>
          <div className="el-offer-scroller">{OFFERS.map((offer, index) => <article className={`el-offer-banner ${offer.theme}`} key={offer.id}><div className="el-offer-copy"><span className="el-offer-eyebrow">{offer.eyebrow}</span><h2>{offer.title}</h2><p>{offer.description}</p><button type="button" className="el-shop-now" onClick={() => { setActiveOffer(index); goToProducts(offer.category); }}>{offer.button} <span>→</span></button></div><div className="el-offer-art" aria-hidden="true"><span>{offer.emoji}</span><i>✦</i><b>✿</b></div></article>)}</div>
          <div className="el-offer-dots" aria-label="Offer banners">{OFFERS.map((offer, index) => <button type="button" key={offer.id} className={activeOffer === index ? "is-active" : ""} onClick={() => { setActiveOffer(index); document.querySelectorAll(".el-offer-banner")[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" }); }} aria-label={`Offer ${index + 1}`} />)}</div>
        </section>

        <section className="el-quick-links">
          <button type="button" onClick={() => handleNavigation("offers")}><span>🏷️</span><span>My Offers</span><b>→</b></button>
          <button type="button" onClick={() => handleNavigation("popular")}><span>🔥</span><span>Popular</span><b>→</b></button>
          <button type="button" onClick={() => handleNavigation("orders")}><span>🔄</span><span>Buy Again</span><b>→</b></button>
          <button type="button" onClick={() => showNotice(wishlist.length ? `${wishlist.length} saved favourite product(s)` : "Your wishlist is empty yet.")}><span>♡</span><span>My Wishlist</span><b>→</b></button>
          <button type="button" onClick={() => showNotice("Recently viewed products will appear here.")}><span>◷</span><span>Recently Viewed</span><b>→</b></button>
        </section>

        {search.trim() ? (
          <section className="el-section" id="el-products"><div className="el-section-heading"><div><h2>Search Results</h2><p>{filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"} found</p></div></div>{filteredProducts.length ? <div className="el-product-grid">{filteredProducts.map(productCard)}</div> : <div className="el-empty-state"><span>🔎</span><h3>No products found</h3><p>Try another product name or category.</p><button type="button" onClick={() => { setSearch(""); setActiveCategory("all"); }}>Clear Search</button></div>}</section>
        ) : <>{activeCategory !== "all" ? renderSection(CATEGORIES.find((item) => item.id === activeCategory)?.name || "Products", "Explore products in this category", filteredProducts, `category-${activeCategory}`) : <>{renderSection("Popular Products", "Everyday favourites for your home", PRODUCTS.filter((product) => [2, 4, 7, 1].includes(product.id)), "popular")}{renderSection("Fresh Vegetables", "Fresh picks for everyday cooking", PRODUCTS.filter((product) => product.category === "vegetables"), "vegetables")}{renderSection("Fruits & Dairy", "Everyday essentials for your family", PRODUCTS.filter((product) => ["fruits", "dairy"].includes(product.category)), "fruits-dairy")}{renderSection("Rice, Snacks & More", "More essentials to complete your basket", PRODUCTS.filter((product) => ["rice", "snacks", "beverages", "meat"].includes(product.category)), "other-products")}</>}</>}

        <section className="el-bottom-promo"><div><span className="el-bottom-promo-kicker">YOUR DAILY SHOPPING</span><h2>Everything you need, in one place.</h2><p>Find your favourites and build your grocery basket.</p></div><button type="button" onClick={() => goToProducts("all")}>Shop All <span>→</span></button></section>
      </main>

      <footer className="el-footer"><img src="/logo.png" alt="" /><span>EKHONI LAGBE</span><small>15-Minute Delivery — Right to Your Hands</small></footer>

      <nav className="el-bottom-nav" aria-label="Main navigation">
        <button type="button" className="is-active" onClick={() => handleNavigation("home")}><span className="el-nav-icon">⌂</span><span>Home</span></button>
        <button type="button" onClick={() => handleNavigation("categories")}><span className="el-nav-icon">▦</span><span>Categories</span></button>
        <button type="button" onClick={() => handleNavigation("popular")}><span className="el-nav-icon">♨</span><span>Popular</span></button>
        <button type="button" onClick={() => handleNavigation("orders")}><span className="el-nav-icon">▤</span><span>My Orders</span></button>
        <button type="button" onClick={() => handleNavigation("cart")}><span className="el-nav-icon">🛒</span><span>Cart</span>{visibleCartCount > 0 && <b className="el-nav-cart-count">{visibleCartCount}</b>}</button>
        <button type="button" onClick={() => handleNavigation("guide")}><span className="el-nav-icon">☰</span><span>Guide</span></button>
      </nav>

      {notice && <div className="el-toast" role="status"><span>✓</span>{notice}<button type="button" onClick={() => setNotice("")} aria-label="Dismiss message">×</button></div>}

      {locationOpen && <div className="el-location-backdrop" role="presentation" onClick={() => setLocationOpen(false)}><section className="el-location-dialog" role="dialog" aria-modal="true" aria-labelledby="el-location-title" onClick={(event) => event.stopPropagation()}>
        <button className="el-location-close" type="button" onClick={() => setLocationOpen(false)} aria-label="Close location selector">×</button>
        <div className="el-location-dialog-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg></div>
        <h2 id="el-location-title">Where should we deliver?</h2><p className="el-location-help">Choose an address in Kamrangirchar. Delivery availability will be confirmed before checkout.</p>
        <label className="el-location-search"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg><input value={locationSearch} onChange={(event) => setLocationSearch(event.target.value)} placeholder="Search area or address" /></label>
        <div className="el-location-options">{filteredZones.map((zone) => <button type="button" key={zone.id} className={`el-location-option ${selectedZone.id === zone.id ? "is-selected" : ""}`} onClick={() => { setSelectedZone(zone); setLocationConfirmed(true); setLocationOpen(false); setLocationSearch(""); }}><span className="el-option-pin">⌖</span><span className="el-option-copy"><strong>{zone.name}</strong><small>{zone.detail}</small></span><span className="el-option-time">~{zone.minutes} min</span>{selectedZone.id === zone.id && <span className="el-option-check">✓</span>}</button>)}
          {!filteredZones.length && <p className="el-no-zones">No matching area found. Please choose an address within Kamrangirchar.</p>}
        </div><p className="el-location-disclaimer">15 minutes is an initial estimate, not a guaranteed delivery time. Actual time depends on address, stock and rider availability.</p>
      </section></div>}

      {selectedProduct && <div className="el-gallery-backdrop" role="presentation" onClick={closeProduct}><section className="el-gallery-modal" role="dialog" aria-modal="true" aria-label={`${selectedProduct.name} product images`} onClick={(event) => event.stopPropagation()}>
        <button type="button" className="el-gallery-close" onClick={closeProduct} aria-label="Close product details">×</button>
        <div className="el-gallery-main-image"><img src={selectedProduct.images[activeImageIndex]} alt={selectedProduct.name} />{selectedProduct.images.length > 1 && <><button type="button" className="el-gallery-arrow el-gallery-prev" onClick={() => setActiveImageIndex((previous) => previous === 0 ? selectedProduct.images.length - 1 : previous - 1)} aria-label="Previous image">‹</button><button type="button" className="el-gallery-arrow el-gallery-next" onClick={() => setActiveImageIndex((previous) => (previous + 1) % selectedProduct.images.length)} aria-label="Next image">›</button></>}<span className="el-gallery-counter">{activeImageIndex + 1} / {selectedProduct.images.length}</span></div>
        <div className="el-gallery-thumbnails">{selectedProduct.images.map((image, index) => <button type="button" key={image} className={activeImageIndex === index ? "is-active" : ""} onClick={() => setActiveImageIndex(index)} aria-label={`View image ${index + 1}`}><img src={image} alt="" /></button>)}</div>
        <div className="el-gallery-info"><div><h2>{selectedProduct.name}</h2><p>{selectedProduct.unit}</p><strong>{formatPrice(selectedProduct.price)}</strong><p>Product details and verified customer ratings will be added when real product data is connected.</p></div>{(cart[selectedProduct.id] || 0) === 0 ? <button type="button" className="el-add-button el-gallery-add" onClick={() => changeQuantity(selectedProduct.id, 1)}>+ Add to Cart</button> : <div className="el-quantity-control"><button type="button" onClick={() => changeQuantity(selectedProduct.id, -1)} aria-label="Remove one">−</button><span>{cart[selectedProduct.id]}</span><button type="button" onClick={() => changeQuantity(selectedProduct.id, 1)} aria-label="Add one">+</button></div>}</div>
      </section></div>}
    </div>
  );
}

export default CustomerHome;
