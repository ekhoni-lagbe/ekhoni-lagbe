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
  const demoDeliveryFee = 20;

  const cartQuantity = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const visibleCartCount = Math.max(cartQuantity, Number(externalCartCount) || 0);
  const cartProducts = PRODUCTS.filter((product) => (cart[product.id] || 0) > 0);
  const cartSubtotal = cartProducts.reduce((sum, product) => sum + product.price * cart[product.id], 0);

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

      <style>{`
        [aria-labelledby="el-cart-title"],[aria-labelledby="el-checkout-title"]{background:#f5f8f5!important;color:#173b25!important}
        [aria-labelledby="el-cart-title"]>header,[aria-labelledby="el-checkout-title"]>header{background:#fff!important;color:#173b25!important;border-bottom:1px solid #e2ebe3;box-shadow:none!important;padding:9px 12px!important}
        [aria-labelledby="el-cart-title"]>header button,[aria-labelledby="el-checkout-title"]>header button{color:#176b36!important;background:#eaf6ed!important;border:0!important;border-radius:9px!important;width:auto!important;height:34px!important;padding:6px 10px!important;font-size:12px!important}
        [aria-labelledby="el-cart-title"] h2,[aria-labelledby="el-checkout-title"] h2{font-size:17px!important}
        [aria-labelledby="el-cart-title"]>div:not(.el-cart-bottom),[aria-labelledby="el-checkout-title"]>div:not(.el-checkout-bottom){max-width:780px!important;padding:10px!important}
        [aria-labelledby="el-cart-title"] article{padding:8px!important;border:1px solid #e8eee8!important;border-radius:12px!important;box-shadow:none!important;gap:9px!important}
        [aria-labelledby="el-cart-title"] article img{width:58px!important;height:58px!important;border-radius:9px!important}
        [aria-labelledby="el-cart-title"] section,[aria-labelledby="el-checkout-title"] section{padding:12px!important;border:1px solid #e8eee8!important;border-radius:12px!important;box-shadow:none!important}
        [aria-labelledby="el-checkout-title"]>div:not(.el-checkout-bottom){max-width:780px!important}
        [aria-labelledby="el-checkout-title"]>div:not(.el-checkout-bottom)>section:not(.el-order-success){margin-top:8px!important}
        [aria-labelledby="el-checkout-title"] label{font-size:12px!important}
        [aria-labelledby="el-checkout-title"] input:not([type=radio]),[aria-labelledby="el-checkout-title"] select,[aria-labelledby="el-checkout-title"] textarea{padding:9px!important;border-radius:8px!important;font-size:13px!important;margin-bottom:8px!important}
        [aria-labelledby="el-checkout-title"] h3{font-size:14px!important;margin-bottom:10px!important}
        [aria-labelledby="el-cart-title"] button[style*="width: 100%"],[aria-labelledby="el-checkout-title"] button[style*="width: 100%"]{padding:12px!important;border-radius:10px!important}
        @media(min-width:680px){[aria-labelledby="el-checkout-title"]>div:not(.el-checkout-bottom){display:grid!important;grid-template-columns:minmax(0,1fr) 270px!important;gap:10px!important;align-items:start!important}[aria-labelledby="el-checkout-title"]>div:not(.el-checkout-bottom)>section{margin:0!important}[aria-labelledby="el-checkout-title"]>div:not(.el-checkout-bottom)>section:nth-of-type(1){grid-column:1;grid-row:1}[aria-labelledby="el-checkout-title"]>div:not(.el-checkout-bottom)>section:nth-of-type(2){grid-column:1;grid-row:2}[aria-labelledby="el-checkout-title"]>div:not(.el-checkout-bottom)>section:nth-of-type(3){grid-column:2;grid-row:1 / span 2;position:sticky;top:70px}}
        @media(max-width:679px){[aria-labelledby="el-checkout-title"]>div:not(.el-checkout-bottom){padding:8px!important;padding-bottom:100px!important}[aria-labelledby="el-checkout-title"]>div:not(.el-checkout-bottom)>section{margin-top:8px!important}[aria-labelledby="el-cart-title"]>div:not(.el-cart-bottom){padding-bottom:92px!important}}
      `}</style>

      {cartOpen && <div role="dialog" aria-modal="true" aria-labelledby="el-cart-title" style={{ position: "fixed", inset: 0, zIndex: 1000, background: "#f5f8f5", overflowY: "auto", color: "#173b25" }}>
        <header style={{ position: "sticky", top: 0, zIndex: 2, display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "#16803d", color: "white", boxShadow: "0 2px 10px #0002" }}>
          <button type="button" onClick={() => setCartOpen(false)} aria-label="Continue shopping" style={{ border: 0, background: "#ffffff22", color: "white", borderRadius: 10, width: 40, height: 40, fontSize: 24 }}>‹</button>
          <div style={{ flex: 1 }}><h2 id="el-cart-title" style={{ margin: 0, fontSize: 20 }}>My Cart</h2><small>{cartQuantity} item(s) in your basket</small></div>
          <button type="button" onClick={() => { setCartOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ border: "1px solid #ffffff88", borderRadius: 20, padding: "8px 12px", color: "white", background: "transparent" }}>+ Add more</button>
        </header>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: 16, paddingBottom: 34 }}>
          {cartProducts.length === 0 ? <section style={{ textAlign: "center", background: "white", borderRadius: 18, padding: "42px 20px", marginTop: 20, boxShadow: "0 4px 18px #173b250c" }}>
            <div style={{ fontSize: 54 }}>🛒</div><h3>Your cart is empty</h3><p style={{ color: "#647568" }}>Add groceries you need and they will appear here.</p><button type="button" onClick={() => setCartOpen(false)} style={{ background: "#16803d", color: "white", border: 0, borderRadius: 10, padding: "12px 20px", fontWeight: 700 }}>Browse Groceries</button>
          </section> : <>
            <div style={{ display: "grid", gap: 10, marginTop: 8 }}>
              {cartProducts.map((product) => <article key={product.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, borderRadius: 15, background: "white", boxShadow: "0 3px 14px #173b250b" }}>
                <img src={product.image} alt={product.name} style={{ width: 76, height: 76, objectFit: "cover", borderRadius: 12, background: "#f1f5f1" }} />
                <div style={{ flex: 1, minWidth: 0 }}><strong style={{ display: "block", lineHeight: 1.3 }}>{product.name}</strong><small style={{ color: "#718075" }}>{product.unit}</small><div style={{ color: "#16803d", fontWeight: 800, marginTop: 5 }}>৳{product.price} <small style={{ color: "#718075", fontWeight: 400 }}>each</small></div></div>
                <div style={{ textAlign: "right", minWidth: 94 }}><strong style={{ display: "block", marginBottom: 8 }}>৳{product.price * cart[product.id]}</strong><div style={{ display: "inline-flex", alignItems: "center", gap: 12, border: "1px solid #d8e7db", borderRadius: 10, padding: "4px 7px" }}><button type="button" onClick={() => changeQuantity(product.id, -1)} aria-label={`Remove one ${product.name}`} style={{ border: 0, background: "transparent", color: "#16803d", fontSize: 21, width: 20 }}>−</button><span style={{ fontWeight: 700 }}>{cart[product.id]}</span><button type="button" onClick={() => changeQuantity(product.id, 1)} aria-label={`Add one ${product.name}`} style={{ border: 0, background: "transparent", color: "#16803d", fontSize: 21, width: 20 }}>+</button></div></div>
              </article>)}
            </div>
            <section style={{ background: "white", borderRadius: 16, padding: 16, marginTop: 16, boxShadow: "0 3px 14px #173b250b" }}>
              <h3 style={{ margin: "0 0 14px" }}>Bill Summary</h3><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}><span>Items subtotal</span><strong>৳{cartSubtotal}</strong></div><div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, color: "#647568" }}><span>Delivery fee</span><span>Calculated at checkout</span></div><div style={{ borderTop: "1px solid #e4ece5", paddingTop: 12, display: "flex", justifyContent: "space-between", fontSize: 18 }}><strong>Subtotal</strong><strong style={{ color: "#16803d" }}>৳{cartSubtotal}</strong></div>
              <button type="button" onClick={() => { if (!cartProducts.length) { showNotice("Please add groceries first."); return; } setCartOpen(false); setCheckoutError(""); setCheckoutOpen(true); }} style={{ width: "100%", marginTop: 16, border: 0, borderRadius: 12, padding: 14, background: "#16803d", color: "white", fontWeight: 800, fontSize: 16 }}>Continue to Checkout →</button><p style={{ fontSize: 12, color: "#718075", margin: "10px 0 0", lineHeight: 1.5 }}>Demo checkout: prices, delivery fee and stock are sample data. No real order will be sent or saved.</p>
            </section>
          </>}
        </div>
      </div>}

      {checkoutOpen && <div role="dialog" aria-modal="true" aria-labelledby="el-checkout-title" style={{ position: "fixed", inset: 0, zIndex: 1100, background: "#f5f8f5", overflowY: "auto", color: "#173b25" }}>
        <header style={{ position: "sticky", top: 0, zIndex: 2, display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "#16803d", color: "white", boxShadow: "0 2px 10px #0002" }}>
          <button type="button" onClick={() => { setCheckoutOpen(false); setCartOpen(true); }} aria-label="Back to cart" style={{ border: 0, background: "#ffffff22", color: "white", borderRadius: 10, width: 40, height: 40, fontSize: 24 }}>‹</button>
          <div style={{ flex: 1 }}><h2 id="el-checkout-title" style={{ margin: 0, fontSize: 20 }}>Checkout</h2><small>Delivery details & payment</small></div>
        </header>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: 16, paddingBottom: 40 }}>
          {orderComplete ? <section style={{ background: "white", borderRadius: 18, padding: "30px 20px", marginTop: 14, textAlign: "center", boxShadow: "0 4px 18px #173b250c" }}>
            <div style={{ margin: "0 auto 14px", width: 64, height: 64, borderRadius: 50, background: "#e3f6e8", color: "#16803d", fontSize: 38, display: "grid", placeItems: "center" }}>✓</div>
            <h2 style={{ margin: "0 0 8px" }}>Demo order preview complete</h2><p style={{ color: "#647568", lineHeight: 1.6 }}>Reference: <strong>{demoOrderNumber}</strong></p>
            <p style={{ color: "#647568", lineHeight: 1.6 }}>This is only a front-end demo. Your order was <strong>not sent to a merchant</strong> and was not saved to a database.</p>
            <button type="button" onClick={() => { setOrderComplete(false); setCheckoutOpen(false); setCart({}); setCheckoutName(""); setCheckoutPhone(""); setCheckoutAddress(""); setCheckoutInstructions(""); setLocationConfirmed(false); setSelectedZone(SERVICE_ZONES[0]); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ width: "100%", marginTop: 12, border: 0, borderRadius: 12, padding: 14, background: "#16803d", color: "white", fontWeight: 800 }}>Back to shopping</button>
          </section> : <>
            <section style={{ background: "white", borderRadius: 16, padding: 16, marginTop: 8, boxShadow: "0 3px 14px #173b250b" }}>
              <h3 style={{ margin: "0 0 14px" }}>1. Delivery information</h3>
              <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: 6 }} htmlFor="el-checkout-name">Full name</label><input id="el-checkout-name" value={checkoutName} onChange={(e) => setCheckoutName(e.target.value)} placeholder="Enter receiver's name" autoComplete="name" style={{ width: "100%", boxSizing: "border-box", border: "1px solid #d6e3d8", borderRadius: 10, padding: 13, marginBottom: 13, fontSize: 15 }} />
              <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: 6 }} htmlFor="el-checkout-phone">Bangladesh mobile number</label><input id="el-checkout-phone" value={checkoutPhone} onChange={(e) => setCheckoutPhone(e.target.value)} placeholder="01XXXXXXXXX" inputMode="numeric" autoComplete="tel" maxLength={11} style={{ width: "100%", boxSizing: "border-box", border: "1px solid #d6e3d8", borderRadius: 10, padding: 13, marginBottom: 13, fontSize: 15 }} />
              <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: 6 }} htmlFor="el-checkout-zone">Delivery area</label><select id="el-checkout-zone" value={selectedZone.id} onChange={(e) => { const zone = SERVICE_ZONES.find((item) => item.id === e.target.value); if (zone) { setSelectedZone(zone); setLocationConfirmed(true); } }} style={{ width: "100%", boxSizing: "border-box", border: "1px solid #d6e3d8", borderRadius: 10, padding: 13, marginBottom: 13, background: "white", fontSize: 15 }}>{SERVICE_ZONES.map((zone) => <option key={zone.id} value={zone.id}>{zone.name}</option>)}</select>
              <label style={{ display: "block", fontSize: 14, fontWeight: 700, marginBottom: 6 }} htmlFor="el-checkout-address">Full address within Kamrangirchar</label><textarea id="el-checkout-address" value={checkoutAddress} onChange={(e) => setCheckoutAddress(e.target.value)} placeholder="House/building, road, lane, nearby landmark" rows={3} style={{ width: "100%", boxSizing: "border-box", border: "1px solid #d6e3d8", borderRadius: 10, padding: 13, resize: "vertical", fontSize: 15 }} />
              <label style={{ display: "block", fontSize: 14, fontWeight: 700, margin: "13px 0 6px" }} htmlFor="el-checkout-instructions">Delivery instructions (optional)</label><textarea id="el-checkout-instructions" value={checkoutInstructions} onChange={(e) => setCheckoutInstructions(e.target.value)} placeholder="Floor, gate, or nearby landmark" rows={2} style={{ width: "100%", boxSizing: "border-box", border: "1px solid #d6e3d8", borderRadius: 10, padding: 13, resize: "vertical", fontSize: 15 }} />
              <p style={{ margin: "12px 0 0", color: "#647568", fontSize: 12, lineHeight: 1.5 }}>Address zone check is currently a demo list, not a map or verified service-boundary check. Please use an address inside Kamrangirchar.</p>
            </section>
            <section style={{ background: "white", borderRadius: 16, padding: 16, marginTop: 14, boxShadow: "0 3px 14px #173b250b" }}>
              <h3 style={{ margin: "0 0 12px" }}>2. Payment method</h3>
              <label style={{ display: "flex", alignItems: "center", gap: 10, padding: 12, border: `1px solid ${paymentMethod === "cod" ? "#16803d" : "#d6e3d8"}`, borderRadius: 12, marginBottom: 8 }}><input type="radio" name="el-payment" value="cod" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} /><span><strong>Cash on Delivery</strong><small style={{ display: "block", color: "#647568", marginTop: 3 }}>Pay when groceries arrive (demo selection)</small></span></label>
              <label style={{ display: "flex", alignItems: "center", gap: 10, padding: 12, border: `1px solid ${paymentMethod === "online" ? "#16803d" : "#d6e3d8"}`, borderRadius: 12 }}><input type="radio" name="el-payment" value="online" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} /><span><strong>Online payment</strong><small style={{ display: "block", color: "#647568", marginTop: 3 }}>Not available yet; demo only</small></span></label>
            </section>
            <section style={{ background: "white", borderRadius: 16, padding: 16, marginTop: 14, boxShadow: "0 3px 14px #173b250b" }}>
              <h3 style={{ margin: "0 0 14px" }}>3. Order summary</h3>
              {cartProducts.map((product) => <div key={product.id} style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 10, fontSize: 14 }}><span>{product.name} × {cart[product.id]}</span><strong>৳{product.price * cart[product.id]}</strong></div>)}
              <div style={{ borderTop: "1px solid #e4ece5", paddingTop: 12, display: "grid", gap: 10 }}><div style={{ display: "flex", justifyContent: "space-between" }}><span>Items subtotal</span><strong>৳{cartSubtotal}</strong></div><div style={{ display: "flex", justifyContent: "space-between" }}><span>Estimated delivery fee</span><strong>৳{demoDeliveryFee}</strong></div><div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "#16803d" }}><strong>Total (demo)</strong><strong>৳{cartSubtotal + demoDeliveryFee}</strong></div></div>
              <p style={{ fontSize: 12, color: "#718075", lineHeight: 1.5, margin: "12px 0" }}>Delivery fee ৳{demoDeliveryFee} is a temporary sample value and must be confirmed before launch. Product prices and stock are also sample data.</p>
              {checkoutError && <p role="alert" style={{ color: "#b42318", background: "#fff0ef", padding: 11, borderRadius: 9, fontSize: 14 }}>{checkoutError}</p>}
              <button type="button" onClick={() => { if (!cartProducts.length) { setCheckoutError("Your cart is empty. Add a product before checkout."); return; } if (!checkoutName.trim()) { setCheckoutError("Please enter the receiver's name."); return; } if (!/^01\d{9}$/.test(checkoutPhone.trim())) { setCheckoutError("Please enter a valid 11-digit Bangladesh mobile number starting with 01."); return; } if (!checkoutAddress.trim() || checkoutAddress.trim().length < 8) { setCheckoutError("Please enter the full delivery address inside Kamrangirchar."); return; } if (!locationConfirmed) { setCheckoutError("Please confirm the delivery area before continuing."); setLocationOpen(true); return; } if (paymentMethod === "online") { setCheckoutError("Online payment is not connected yet. Please choose Cash on Delivery for this demo."); return; } setDemoOrderNumber("EL-DEMO-" + Date.now().toString().slice(-6)); setCheckoutError(""); setOrderComplete(true); }} style={{ width: "100%", border: 0, borderRadius: 12, padding: 15, background: "#16803d", color: "white", fontWeight: 800, fontSize: 16 }}>Place demo order · ৳{cartSubtotal + demoDeliveryFee}</button>
              <p style={{ fontSize: 12, color: "#718075", lineHeight: 1.5, margin: "10px 0 0" }}>Important: this button only displays a demo confirmation. It does not create a real order, contact a shop, or reserve stock.</p>
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
        <div className="el-gallery-info"><div><h2>{selectedProduct.name}</h2><p>{selectedProduct.unit}</p><strong>{formatPrice(selectedProduct.price)}</strong><p>Product details and verified customer ratings will be added when real product data is connected.</p></div>{(cart[selectedProduct.id] || 0) === 0 ? <button type="button" className="el-add-button el-gallery-add" onClick={() => changeQuantity(selectedProduct.id, 1)}>+ Add to Cart</button> : <div className="el-quantity-control"><button type="button" onClick={() => changeQuantity(selectedProduct.id, -1)} aria-label="Remove one">−</button><span>{cart[selectedProduct.id]}</span><button type="button" onClick={() => changeQuantity(selectedProduct.id, 1)} aria-label="Add one">+</button></div>}</div>
      </section></div>}
    </div>
  );
}

export default CustomerHome;
