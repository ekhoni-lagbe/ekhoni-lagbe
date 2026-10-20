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
  { id: 1, name: "Fresh Tomatoes", category: "vegetables", price: 40, oldPrice: 50, unit: "500 g", badge: "Fresh", image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1546470427-e5b89cd1a5c7?auto=format&fit=crop&w=900&q=85"] },
  { id: 2, name: "Fresh Bananas", category: "fruits", price: 60, oldPrice: 70, unit: "1 dozen", badge: "Popular", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=900&q=85"] },
  { id: 3, name: "Fresh Milk", category: "dairy", price: 90, oldPrice: 100, unit: "1 litre", badge: "", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=85"] },
  { id: 4, name: "Fresh Eggs", category: "dairy", price: 65, oldPrice: 75, unit: "4 pieces", badge: "Daily Essential", image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=900&q=85", "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=900&q=85"] },
  { id: 5, name: "Fresh Carrots", category: "vegetables", price: 45, oldPrice: 55, unit: "500 g", badge: "", image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=900&q=85"] },
  { id: 6, name: "White Rice", category: "rice", price: 75, oldPrice: 85, unit: "1 kg", badge: "", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=85"] },
  { id: 7, name: "Red Apples", category: "fruits", price: 180, oldPrice: 200, unit: "1 kg", badge: "Popular", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=900&q=85"] },
  { id: 8, name: "Potatoes", category: "vegetables", price: 35, oldPrice: 40, unit: "1 kg", badge: "", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=85"] },
  { id: 9, name: "Fresh Lemons", category: "vegetables", price: 30, oldPrice: 35, unit: "4 pieces", badge: "", image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?auto=format&fit=crop&w=900&q=85"] },
  { id: 10, name: "Orange Juice", category: "beverages", price: 85, oldPrice: 95, unit: "1 pack", badge: "", image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=900&q=85"] },
  { id: 11, name: "Potato Chips", category: "snacks", price: 30, oldPrice: 35, unit: "1 pack", badge: "", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=900&q=85"] },
  { id: 12, name: "Fresh Fish", category: "meat", price: 220, oldPrice: 240, unit: "500 g", badge: "", image: "https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=700&q=80", images: ["https://images.unsplash.com/photo-1510130387422-82bed34b37e9?auto=format&fit=crop&w=900&q=85"] },
];

const OFFERS = [
  { id: 1, eyebrow: "FRESH EVERY DAY", title: "Fresh Picks for Your Family", description: "Everyday grocery essentials in one place.", button: "Shop Now", theme: "offer-green", emoji: "🥬", category: "vegetables" },
  { id: 2, eyebrow: "SMART SHOPPING", title: "Your Daily Essentials", description: "Find your everyday favourites with ease.", button: "Explore Now", theme: "offer-mint", emoji: "🛒", category: "all" },
  { id: 3, eyebrow: "FRUITFUL DAYS", title: "Bring Home Fresh Fruits", description: "Discover colourful everyday favourites.", button: "Shop Fruits", theme: "offer-lime", emoji: "🍎", category: "fruits" },
];

const formatPrice = (price) => `৳${price}`;
// Accept standard Bangladesh mobile numbers only: 013–019, exactly 11 digits.
const isValidBangladeshMobile = (value) => /^(013|014|015|016|017|018|019)\d{8}$/.test(value);

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
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutPhone, setCheckoutPhone] = useState("");
  const [checkoutAddress, setCheckoutAddress] = useState("");
  const [checkoutInstructions, setCheckoutInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [checkoutError, setCheckoutError] = useState("");
  const [demoOrderNumber, setDemoOrderNumber] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [liveLocation, setLiveLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const demoDeliveryFee = 20;

  const cartQuantity = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const visibleCartCount = Math.max(cartQuantity, Number(externalCartCount) || 0);
  const cartProducts = PRODUCTS.filter((product) => (cart[product.id] || 0) > 0);
  const cartSubtotal = cartProducts.reduce((sum, product) => sum + product.price * cart[product.id], 0);
  const cartCompareTotal = cartProducts.reduce((sum, product) => sum + (product.oldPrice || product.price) * cart[product.id], 0);
  const cartSavings = Math.max(0, cartCompareTotal - cartSubtotal);
  const couponDiscount = appliedCoupon === "SAVE10" ? Math.min(10, cartSubtotal) : appliedCoupon === "SAVE20" ? Math.min(20, cartSubtotal) : 0;
  const finalTotal = Math.max(0, cartSubtotal + (cartProducts.length ? demoDeliveryFee : 0) - couponDiscount);

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
      setCartOpen(true);
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
        <div className="el-product-pricing">
          <strong className="el-product-price">{formatPrice(product.price)}</strong>
          <span className="el-product-old-price">{formatPrice(product.oldPrice)}</span>
          <span className="el-product-saving">Save ৳{product.oldPrice - product.price}</span>
        </div>
        <div className="el-product-bottom">
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

      <style>{`
        .el-product-pricing{display:flex;align-items:baseline;gap:6px;flex-wrap:wrap;margin-top:7px}
        .el-product-pricing .el-product-price{font-size:17px;color:#16803d;font-weight:850}
        .el-product-old-price{font-size:11px;color:#77847a;text-decoration:line-through}
        .el-product-saving{font-size:10px;font-weight:750;color:#16803d;background:#eaf7ed;border-radius:5px;padding:3px 5px}
        .el-product-bottom{margin-top:8px}
        .el-product-bottom .el-add-button,.el-product-bottom .el-quantity-control{width:100%;min-height:40px;box-sizing:border-box}
        .el-product-bottom .el-quantity-control{justify-content:space-between;padding:3px 8px;border-radius:9px}
        [aria-labelledby="el-cart-title"],[aria-labelledby="el-checkout-title"]{background:#f5f8f5!important;color:#173b25!important;font-size:13px}
        [aria-labelledby="el-cart-title"]>header,[aria-labelledby="el-checkout-title"]>header{background:#fff!important;color:#173b25!important;border-bottom:1px solid #e2ebe3;box-shadow:none!important;padding:9px 12px!important;min-height:48px}
        [aria-labelledby="el-cart-title"]>header button,[aria-labelledby="el-checkout-title"]>header button{color:#176b36!important;background:#eaf6ed!important;border:0!important;border-radius:9px!important;width:auto!important;height:34px!important;padding:6px 10px!important;font-size:12px!important}
        [aria-labelledby="el-cart-title"] h2,[aria-labelledby="el-checkout-title"] h2{font-size:17px!important}
        [aria-labelledby="el-cart-title"]>div:not(.el-cart-bottom),[aria-labelledby="el-checkout-title"]>div:not(.el-checkout-bottom){max-width:760px!important;padding:10px!important;margin:0 auto!important}
        [aria-labelledby="el-cart-title"] article{padding:8px!important;border:1px solid #e8eee8!important;border-radius:11px!important;box-shadow:none!important;gap:8px!important}
        [aria-labelledby="el-cart-title"] article img{width:56px!important;height:56px!important;border-radius:8px!important}
        [aria-labelledby="el-cart-title"] section,[aria-labelledby="el-checkout-title"] section{padding:12px!important;border:1px solid #e8eee8!important;border-radius:12px!important;box-shadow:none!important}
        [aria-labelledby="el-checkout-title"]{background:#f7f9f7!important}
        [aria-labelledby="el-checkout-title"]>div:not(.el-checkout-bottom){max-width:520px!important;padding:8px 10px 14px!important}
        [aria-labelledby="el-checkout-title"]>div:not(.el-checkout-bottom)>section:not(.el-order-success){margin-top:7px!important;padding:10px!important;border:1px solid #e7ece7!important;border-radius:10px!important;background:#fff!important}
        [aria-labelledby="el-checkout-title"] label{font-size:12px!important;font-weight:650!important;color:#33483a!important}
        [aria-labelledby="el-checkout-title"] input:not([type=radio]),[aria-labelledby="el-checkout-title"] select,[aria-labelledby="el-checkout-title"] textarea{padding:9px 10px!important;border-radius:8px!important;font-size:13px!important;margin-bottom:7px!important;border-color:#dfe6df!important;background:#fff!important}
        [aria-labelledby="el-checkout-title"] h3{font-size:13px!important;margin-bottom:8px!important;font-weight:750!important}
        [aria-labelledby="el-checkout-title"] .el-summary-line{margin:6px 0;font-size:12px}
        [aria-labelledby="el-checkout-title"] .el-summary-total{font-size:15px;padding-top:8px;margin-top:8px}
        [aria-labelledby="el-checkout-title"] .el-coupon-row input{padding:9px;font-size:12px}
        [aria-labelledby="el-checkout-title"] .el-location-action{padding:9px;font-size:12px;background:#f6faf6;border-color:#dfe9df}
        [aria-labelledby="el-checkout-title"]>div:not(.el-checkout-bottom)>div:first-child{margin-bottom:7px!important;padding:9px 10px!important;border:1px solid #dceade!important;border-radius:10px!important;box-shadow:none!important}
        [aria-labelledby="el-checkout-title"] p{line-height:1.35!important}
        [aria-labelledby="el-cart-title"] button[style*="width: 100%"],[aria-labelledby="el-checkout-title"] button[style*="width: 100%"]{padding:11px!important;border-radius:9px!important}
        .el-summary-line{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:8px 0;font-size:13px}
        .el-summary-total{border-top:1px solid #e3ebe4;padding-top:10px;margin-top:10px;font-size:16px;font-weight:850;color:#16803d}
        .el-coupon-row{display:flex;gap:7px;margin-top:8px}
        .el-coupon-row input{min-width:0;flex:1;border:1px solid #d6e3d8;border-radius:8px;padding:9px;font-size:13px}
        .el-coupon-row button{border:0;background:#e8f5eb;color:#176b36;border-radius:8px;padding:0 12px;font-weight:800}
        .el-location-action{width:100%;border:1px solid #cfe2d2;background:#f3fbf4;color:#176b36;border-radius:9px;padding:10px;font-weight:750;margin-top:5px}
        @media(min-width:680px){[aria-labelledby="el-checkout-title"]>div:not(.el-checkout-bottom){display:block!important}[aria-labelledby="el-checkout-title"]>div:not(.el-checkout-bottom)>section{margin-top:7px!important}}
        @media(max-width:679px){[aria-labelledby="el-checkout-title"]>div:not(.el-checkout-bottom){padding:7px 9px 14px!important}[aria-labelledby="el-checkout-title"]>div:not(.el-checkout-bottom)>section{margin-top:7px!important}[aria-labelledby="el-cart-title"]>div:not(.el-cart-bottom){padding-bottom:22px!important}}
      `}</style>

      {cartOpen && <div role="dialog" aria-modal="true" aria-labelledby="el-cart-title" style={{ position: "fixed", inset: 0, zIndex: 1000, background: "#f5f8f5", overflowY: "auto", color: "#173b25" }}>
        <header style={{ position: "sticky", top: 0, zIndex: 2, display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: "white", borderBottom: "1px solid #e2ebe3" }}>
          <button type="button" onClick={() => setCartOpen(false)} aria-label="Continue shopping" style={{ border: 0, background: "#eaf6ed", color: "#176b36", borderRadius: 9, width: 34, height: 34, fontSize: 22 }}>‹</button>
          <div style={{ flex: 1 }}><h2 id="el-cart-title" style={{ margin: 0, fontSize: 17 }}>My Cart</h2><small style={{ color: "#718075" }}>{cartQuantity} item(s)</small></div>
          <button type="button" onClick={() => { setCartOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ border: 0, borderRadius: 9, padding: "8px 10px", color: "#176b36", background: "#eaf6ed", fontWeight: 750, fontSize: 12 }}>+ Add more</button>
        </header>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: 10, paddingBottom: 22 }}>
          {cartProducts.length === 0 ? <section style={{ textAlign: "center", background: "white", borderRadius: 13, padding: "30px 16px", marginTop: 10 }}><div style={{ fontSize: 40 }}>🛒</div><h3 style={{ margin: "8px 0" }}>Your cart is empty</h3><p style={{ color: "#647568", margin: "0 0 14px" }}>Add groceries to get started.</p><button type="button" onClick={() => setCartOpen(false)} style={{ background: "#16803d", color: "white", border: 0, borderRadius: 9, padding: "10px 15px", fontWeight: 750 }}>Browse groceries</button></section> : <>
            <div style={{ display: "grid", gap: 7, marginTop: 2 }}>
              {cartProducts.map((product) => <article key={product.id} style={{ display: "flex", alignItems: "center", gap: 9, padding: 8, borderRadius: 11, background: "white", border: "1px solid #e8eee8" }}>
                <img src={product.image} alt={product.name} style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 8, background: "#f1f5f1" }} />
                <div style={{ flex: 1, minWidth: 0 }}><strong style={{ display: "block", lineHeight: 1.25, fontSize: 13 }}>{product.name}</strong><small style={{ color: "#718075", fontSize: 11 }}>{product.unit}</small><div style={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: 5, marginTop: 3 }}><strong style={{ color: "#16803d", fontSize: 13 }}>৳{product.price}</strong><small style={{ color: "#77847a", textDecoration: "line-through", fontSize: 11 }}>৳{product.oldPrice}</small><small style={{ color: "#16803d", fontSize: 10 }}>Save ৳{product.oldPrice-product.price}</small></div></div>
                <div style={{ textAlign: "right", minWidth: 92 }}><strong style={{ display: "block", marginBottom: 5, fontSize: 13 }}>৳{product.price * cart[product.id]}</strong><div style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid #cfe2d2", background: "#f8fcf8", borderRadius: 8, padding: "3px 6px" }}><button type="button" onClick={() => changeQuantity(product.id, -1)} aria-label={`Remove one ${product.name}`} style={{ border: 0, background: "transparent", color: "#16803d", fontSize: 20, width: 18, lineHeight: 1 }}>−</button><span style={{ fontWeight: 800, fontSize: 12 }}>{cart[product.id]}</span><button type="button" onClick={() => changeQuantity(product.id, 1)} aria-label={`Add one ${product.name}`} style={{ border: 0, background: "transparent", color: "#16803d", fontSize: 20, width: 18, lineHeight: 1 }}>+</button></div></div>
              </article>)}
            </div>
            <section style={{ background: "#eff9f1", borderRadius: 12, padding: 11, marginTop: 9, border: "1px solid #d5ead9" }} aria-label="Your savings">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}><div><strong style={{ fontSize: 13 }}>Your savings</strong><small style={{ display: "block", color: "#55715c", marginTop: 3, fontSize: 11 }}>You save by buying from EKHONI LAGBE</small></div><strong style={{ color: "#16803d", fontSize: 18 }}>৳{cartSavings}</strong></div>
            </section>
            <section style={{ background: "white", borderRadius: 12, padding: 12, marginTop: 8, border: "1px solid #e8eee8" }}>
              <h3 style={{ margin: "0 0 8px", fontSize: 14 }}>Bill summary</h3>
              <div className="el-summary-line"><span>Items total</span><strong>৳{cartSubtotal}</strong></div>
              <div className="el-summary-line"><span>Delivery charge</span><strong>৳{demoDeliveryFee}</strong></div>
              <div className="el-coupon-row"><input aria-label="Coupon or referral code" value={couponInput} onChange={(e) => setCouponInput(e.target.value.toUpperCase())} placeholder="Coupon / referral code (optional)" /><button type="button" onClick={() => { const code=couponInput.trim().toUpperCase(); if (code === "SAVE10" || code === "SAVE20") { setAppliedCoupon(code); setCouponMessage(`${code} applied successfully.`); } else if (!code) { setAppliedCoupon(""); setCouponMessage("No coupon added."); } else { setAppliedCoupon(""); setCouponMessage("This demo code is not valid. Try SAVE10 or SAVE20."); } }}>Apply</button></div>
              {couponMessage && <p role="status" style={{ margin: "5px 0", color: appliedCoupon ? "#16803d" : "#8a5b13", fontSize: 11 }}>{couponMessage}</p>}
              {couponDiscount > 0 && <div className="el-summary-line" style={{ color: "#16803d" }}><span>Coupon discount</span><strong>−৳{couponDiscount}</strong></div>}
              <div className="el-summary-line el-summary-total"><span>Total payable</span><strong>৳{finalTotal}</strong></div>
              <button type="button" onClick={() => { if (!cartProducts.length) { showNotice("Please add groceries first."); return; } setCartOpen(false); setCheckoutError(""); setCheckoutOpen(true); }} style={{ width: "100%", marginTop: 9, border: 0, borderRadius: 9, padding: 11, background: "#16803d", color: "white", fontWeight: 800, fontSize: 14 }}>অর্ডার করতে এগিয়ে যান →</button>
            </section>
          </>}
        </div>
      </div>}

      {checkoutOpen && <div role="dialog" aria-modal="true" aria-labelledby="el-checkout-title" style={{ position: "fixed", inset: 0, zIndex: 1100, background: "#f5f8f5", overflowY: "auto", color: "#173b25" }}>
        <header style={{ position: "sticky", top: 0, zIndex: 2, display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "white", borderBottom: "1px solid #e2ebe3" }}>
          <button type="button" onClick={() => { setCheckoutOpen(false); setCartOpen(true); }} aria-label="কার্টে ফিরে যান" style={{ border: 0, background: "#eaf6ed", color: "#176b36", borderRadius: 9, width: 34, height: 34, fontSize: 22 }}>‹</button>
          <div style={{ flex: 1 }}><h2 id="el-checkout-title" style={{ margin: 0, fontSize: 17 }}>Complete Your Order</h2><small style={{ color: "#718075" }}>ডেলিভারি তথ্য দিন</small></div>
          <strong style={{ color: "#16803d", fontSize: 14 }}>৳{finalTotal}</strong>
        </header>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: 10, paddingBottom: 18 }}>
          {!orderComplete && <div style={{ display: "flex", alignItems: "center", gap: 9, background: "#eaf7ed", border: "1px solid #d5ead9", borderRadius: 10, padding: "8px 10px", marginBottom: 8 }}><span aria-hidden="true" style={{ fontSize: 20 }}>💵</span><div style={{ flex: 1 }}><strong style={{ display: "block", fontSize: 12 }}>Cash on Delivery</strong><small style={{ color: "#55715c", fontSize: 10 }}>পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন</small></div><span style={{ color: "#16803d", fontSize: 10, fontWeight: 800 }}>Selected</span></div>}
          {orderComplete ? <section className="el-order-success" style={{ background: "white", borderRadius: 13, padding: "22px 16px", marginTop: 8, textAlign: "center", border: "1px solid #e8eee8" }}><div style={{ margin: "0 auto 10px", width: 48, height: 48, borderRadius: 50, background: "#e3f6e8", color: "#16803d", fontSize: 30, display: "grid", placeItems: "center" }}>✓</div><h2 style={{ margin: "0 0 8px", fontSize: 18 }}>Order Preview Complete</h2><p style={{ color: "#647568", lineHeight: 1.5 }}>Reference: <strong>{demoOrderNumber}</strong></p><p style={{ color: "#647568", lineHeight: 1.5, fontSize: 12 }}>Demo only — your order has not been saved.</p><button type="button" onClick={() => { setOrderComplete(false); setCheckoutOpen(false); setCart({}); setCheckoutName(""); setCheckoutPhone(""); setCheckoutAddress(""); setCheckoutInstructions(""); setLocationConfirmed(false); setSelectedZone(SERVICE_ZONES[0]); setCouponInput(""); setAppliedCoupon(""); setCouponMessage(""); setLiveLocation(null); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ width: "100%", marginTop: 10, border: 0, borderRadius: 9, padding: 11, background: "#16803d", color: "white", fontWeight: 800 }}>Continue Shopping</button></section> : <>
            <section style={{ background: "white", borderRadius: 12, padding: 11, marginTop: 2, border: "1px solid #e8eee8" }}>
              <h3 style={{ margin: "0 0 9px", fontSize: 14 }}>Delivery Details</h3>
              <label style={{ display: "block", fontWeight: 750, marginBottom: 4, fontSize: 12 }} htmlFor="el-checkout-name">Full Name *</label><input id="el-checkout-name" value={checkoutName} onChange={(e) => setCheckoutName(e.target.value)} placeholder="আপনার নাম লিখুন" autoComplete="name" style={{ width: "100%", boxSizing: "border-box", border: "1px solid #d6e3d8", borderRadius: 8, padding: 9, marginBottom: 8, fontSize: 13 }} />
              <label style={{ display: "block", fontWeight: 750, marginBottom: 4, fontSize: 12 }} htmlFor="el-checkout-phone">Mobile Number *</label><input id="el-checkout-phone" value={checkoutPhone} onChange={(e) => setCheckoutPhone(e.target.value.replace(/\D/g, "").slice(0, 11))} placeholder="01XXXXXXXXX" inputMode="numeric" autoComplete="tel" maxLength={11} pattern="01[3-9][0-9]{8}" aria-describedby="el-phone-help" style={{ width: "100%", boxSizing: "border-box", border: "1px solid #d6e3d8", borderRadius: 8, padding: 9, marginBottom: 3, fontSize: 13 }} /><small id="el-phone-help" style={{ display: "block", color: "#718075", fontSize: 10, marginBottom: 8 }}>বাংলাদেশি নম্বর: ১১টি সংখ্যা, 013–019 দিয়ে শুরু হবে।</small>
              <label style={{ display: "block", fontWeight: 750, marginBottom: 4, fontSize: 12 }} htmlFor="el-checkout-address">Delivery Address *</label><textarea id="el-checkout-address" value={checkoutAddress} onChange={(e) => setCheckoutAddress(e.target.value)} placeholder="এলাকা/মহল্লা, রোড, বাড়ি/ফ্ল্যাট, দোকান বা কাছের পরিচিত স্থান লিখুন" rows={3} style={{ width: "100%", boxSizing: "border-box", border: "1px solid #d6e3d8", borderRadius: 8, padding: 9, resize: "vertical", fontSize: 13 }} />
              <small style={{ display: "block", color: "#16803d", fontSize: 11, lineHeight: 1.4, marginTop: 5 }}>ডেলিভারি বর্তমানে শুধু কামরাঙ্গীরচর, ঢাকা।</small>
              <button type="button" className="el-location-action" disabled={locationLoading} onClick={() => { if (!navigator.geolocation) { setCheckoutError("এই Browser-এ Live Location ব্যবহার করা যাচ্ছে না। অনুগ্রহ করে ঠিকানা লিখুন।"); return; } setLocationLoading(true); setCheckoutError(""); navigator.geolocation.getCurrentPosition((position) => { setLiveLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude }); setLocationLoading(false); setLocationConfirmed(true); setCheckoutError(""); setCheckoutAddress((previous) => previous.trim() ? `${previous.trim()} (GPS location attached)` : `GPS location: ${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`); }, () => { setLocationLoading(false); setCheckoutError("লোকেশন পাওয়া যায়নি। Location permission দিন অথবা ঠিকানা লিখুন।"); }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }); }}>{locationLoading ? "Getting location…" : liveLocation ? "✓ Location added" : "⌖ Share Current Location (Optional)"}</button>
              {liveLocation && <small style={{ display: "block", marginTop: 5, color: "#16803d", fontSize: 10 }}>Location: {liveLocation.latitude.toFixed(5)}, {liveLocation.longitude.toFixed(5)}</small>}
            </section>
            <section style={{ background: "#eff9f1", borderRadius: 12, padding: 10, marginTop: 8, border: "1px solid #d5ead9" }} aria-label="আপনার সাশ্রয়">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}><div><strong style={{ fontSize: 13 }}>Your Savings · আপনার সাশ্রয়</strong><small style={{ display: "block", color: "#55715c", marginTop: 3, fontSize: 10 }}>আপনি পণ্যে মোট যত টাকা সাশ্রয় করছেন</small></div><strong style={{ color: "#16803d", fontSize: 18 }}>৳{cartSavings}</strong></div>
            </section>
            <section style={{ background: "white", borderRadius: 12, padding: 11, marginTop: 8, border: "1px solid #e8eee8" }}>
              <h3 style={{ margin: "0 0 7px", fontSize: 14 }}>Order Summary</h3>
              <div className="el-summary-line"><span>Subtotal</span><strong>৳{cartSubtotal}</strong></div>
              <div className="el-summary-line"><span>Delivery Fee</span><strong>৳{cartProducts.length ? demoDeliveryFee : 0}</strong></div>
              <div className="el-coupon-row"><input aria-label="কুপন বা রেফার কোড" value={couponInput} onChange={(e) => setCouponInput(e.target.value.toUpperCase())} placeholder="Coupon / Referral Code (Optional)" /><button type="button" onClick={() => { const code = couponInput.trim().toUpperCase(); if (code === "SAVE10" || code === "SAVE20") { setAppliedCoupon(code); setCouponMessage(`${code} কোডটি প্রয়োগ হয়েছে।`); } else if (!code) { setAppliedCoupon(""); setCouponMessage("কোনো কুপন যোগ করা হয়নি।"); } else { setAppliedCoupon(""); setCouponMessage("এই Demo Code সঠিক নয়। SAVE10 বা SAVE20 ব্যবহার করুন।"); } }}>Apply</button></div>
              {couponMessage && <p role="status" style={{ margin: "5px 0", color: appliedCoupon ? "#16803d" : "#8a5b13", fontSize: 10 }}>{couponMessage}</p>}
              {couponDiscount > 0 && <div className="el-summary-line" style={{ color: "#16803d" }}><span>Coupon Discount</span><strong>−৳{couponDiscount}</strong></div>}
              <div className="el-summary-line el-summary-total"><span>Total Payable</span><strong>৳{finalTotal}</strong></div>
              {checkoutError && <p role="alert" style={{ color: "#b42318", background: "#fff0ef", padding: 8, borderRadius: 8, fontSize: 11, margin: "7px 0" }}>{checkoutError}</p>}
              <button type="button" onClick={() => { if (!cartProducts.length) { setCheckoutError("আপনার Cart খালি। আগে পণ্য যোগ করুন।"); return; } if (!checkoutName.trim()) { setCheckoutError("আপনার নাম লিখুন।"); document.getElementById("el-checkout-name")?.focus(); return; } if (!isValidBangladeshMobile(checkoutPhone.trim())) { setCheckoutError("সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর দিন (013–019)।"); document.getElementById("el-checkout-phone")?.focus(); return; } if (!checkoutAddress.trim() || checkoutAddress.trim().length < 8) { setCheckoutError("সম্পূর্ণ ডেলিভারি ঠিকানা লিখুন।"); document.getElementById("el-checkout-address")?.focus(); return; } setDemoOrderNumber("EL-DEMO-" + Date.now().toString().slice(-6)); setCheckoutError(""); setOrderComplete(true); }} style={{ width: "100%", border: 0, borderRadius: 9, padding: 11, background: "#16803d", color: "white", fontWeight: 800, fontSize: 14 }}>Confirm Order · ৳{finalTotal}</button>
              <p style={{ fontSize: 10, color: "#718075", lineHeight: 1.4, margin: "6px 0 0" }}>Demo version: অর্ডারটি এখনো সেভ হবে না বা Merchant-এর কাছে যাবে না।</p>
            </section>
          </>}
        </div>
      </div>}
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
        <div className="el-gallery-info"><div><h2>{selectedProduct.name}</h2><p>{selectedProduct.unit}</p><strong>{formatPrice(selectedProduct.price)}</strong> <small style={{ color: "#77847a", textDecoration: "line-through" }}>{formatPrice(selectedProduct.oldPrice)}</small> <small style={{ color: "#16803d" }}>Save ৳{selectedProduct.oldPrice-selectedProduct.price}</small><p>Product details and verified customer ratings will be added when real product data is connected.</p></div>{(cart[selectedProduct.id] || 0) === 0 ? <button type="button" className="el-add-button el-gallery-add" onClick={() => changeQuantity(selectedProduct.id, 1)}>+ Add to Cart</button> : <div className="el-quantity-control"><button type="button" onClick={() => changeQuantity(selectedProduct.id, -1)} aria-label="Remove one">−</button><span>{cart[selectedProduct.id]}</span><button type="button" onClick={() => changeQuantity(selectedProduct.id, 1)} aria-label="Add one">+</button></div>}</div>
      </section></div>}
    </div>
  );
}

export default CustomerHome;
