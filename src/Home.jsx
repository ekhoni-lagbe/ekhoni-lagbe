import { useMemo, useState } from "react";
import "./Home.css";

const categories = [
  { name: "Rice", bn: "চাল", icon: "🍚" },
  { name: "Lentils", bn: "ডাল", icon: "🫘" },
  { name: "Oil", bn: "তেল", icon: "🫗" },
  { name: "Salt & Sugar", bn: "লবণ ও চিনি", icon: "🧂" },
  { name: "Spices", bn: "মসলা", icon: "🌶️" },
  { name: "Dairy", bn: "দুধ ও দুগ্ধজাত", icon: "🥛" },
  { name: "Eggs", bn: "ডিম", icon: "🥚" },
  { name: "Snacks", bn: "স্ন্যাকস", icon: "🍪" },
  { name: "Drinks", bn: "পানীয়", icon: "🥤" },
  { name: "Household", bn: "ঘর পরিষ্কার", icon: "🧼" },
  { name: "Personal Care", bn: "ব্যক্তিগত যত্ন", icon: "🧴" },
  { name: "Baby Care", bn: "শিশুর পণ্য", icon: "👶" },
];

const products = [
  {
    id: 1, name: "Miniket Rice", bn: "মিনিকেট চাল",
    weight: "1 kg", price: 75, oldPrice: 85, rating: 4.8,
    category: "Rice", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80",
    tag: "Popular",
  },
  {
    id: 2, name: "Fresh Red Lentils", bn: "মসুর ডাল",
    weight: "500 g", price: 65, oldPrice: 72, rating: 4.7,
    category: "Lentils", image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=500&q=80",
    tag: "Popular",
  },
  {
    id: 3, name: "Soybean Oil", bn: "সয়াবিন তেল",
    weight: "1 litre", price: 175, oldPrice: 185, rating: 4.6,
    category: "Oil", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80",
    tag: "Deal",
  },
  {
    id: 4, name: "Farm Fresh Eggs", bn: "ফার্মের ডিম",
    weight: "12 pieces", price: 150, oldPrice: 160, rating: 4.9,
    category: "Eggs", image: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=500&q=80",
    tag: "Fresh",
  },
  {
    id: 5, name: "Fresh Whole Milk", bn: "তাজা দুধ",
    weight: "1 litre", price: 95, oldPrice: 105, rating: 4.8,
    category: "Dairy", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80",
    tag: "Fresh",
  },
  {
    id: 6, name: "Potato Chips", bn: "পটেটো চিপস",
    weight: "Pack", price: 30, oldPrice: 35, rating: 4.5,
    category: "Snacks", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&q=80",
    tag: "Popular",
  },
  {
    id: 7, name: "Fresh Tomatoes", bn: "তাজা টমেটো",
    weight: "500 g", price: 40, oldPrice: 45, rating: 4.6,
    category: "Vegetables", image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=500&q=80",
    tag: "Fresh",
  },
  {
    id: 8, name: "Premium Sugar", bn: "পরিশোধিত চিনি",
    weight: "1 kg", price: 125, oldPrice: 135, rating: 4.7,
    category: "Salt & Sugar", image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=500&q=80",
    tag: "Deal",
  },
];

function taka(amount) {
  return `৳${amount}`;
}

function ProductCard({ product, favorite, onFavorite, onAdd, onOpen, quantity }) {
  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  return (
    <article className="el-product-card">
      <button
        className={`el-favorite ${favorite ? "is-favorite" : ""}`}
        onClick={() => onFavorite(product.id)}
        aria-label="Toggle favorite"
      >
        {favorite ? "♥" : "♡"}
      </button>

      {discount > 0 && <span className="el-discount">{discount}% OFF</span>}

      <button className="el-product-image" onClick={() => onOpen(product)}>
        <img src={product.image} alt={product.name} loading="lazy" />
      </button>

      <button className="el-product-info" onClick={() => onOpen(product)}>
        <span className="el-product-name">{product.bn}</span>
        <span className="el-product-english">{product.name}</span>
        <span className="el-product-weight">{product.weight}</span>
      </button>

      <div className="el-rating">★ {product.rating} <span>• Demo rating</span></div>

      <div className="el-price-row">
        <strong>{taka(product.price)}</strong>
        <del>{taka(product.oldPrice)}</del>
      </div>

      <button className="el-add-cart" onClick={() => onAdd(product)}>
        {quantity > 0 ? `✓ Added (${quantity})` : "+ Add to Cart"}
      </button>
    </article>
  );
}

export default function Home({ onNavigate = () => {} }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState({});
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllPopular, setShowAllPopular] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState("Kamrangirchar, Dhaka");
  const [activeNav, setActiveNav] = useState("Home");
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [notice, setNotice] = useState("");
  const [productDetail, setProductDetail] = useState(null);

  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0);
  const cartTotal = products.reduce(
    (sum, product) => sum + product.price * (cart[product.id] || 0),
    0
  );

  const visibleProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory ||
        product.name.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        product.bn.includes(selectedCategory);

      const matchesSearch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.bn.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const addToCart = (product) => {
    setCart((previous) => ({
      ...previous,
      [product.id]: (previous[product.id] || 0) + 1,
    }));
    setNotice(`${product.bn} কার্টে যোগ হয়েছে`);
    window.setTimeout(() => setNotice(""), 2200);
  };

  const openProduct = (product) => {
    setRecentlyViewed((previous) => [
      product,
      ...previous.filter((item) => item.id !== product.id),
    ].slice(0, 4));
    setProductDetail(product);
  };

  const chooseCategory = (category) => {
    setSelectedCategory(category.name);
    setSearch("");
    setActiveNav("Categories");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToSection = (nav) => {
    setActiveNav(nav);

    if (nav === "Home") {
      setSelectedCategory("All");
      setSearch("");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (nav === "Categories") {
      document.getElementById("el-categories")?.scrollIntoView({ behavior: "smooth" });
    } else if (nav === "Popular") {
      document.getElementById("el-popular")?.scrollIntoView({ behavior: "smooth" });
    } else {
      onNavigate(nav.toLowerCase());
    }
  };

  const displayedPopular = showAllPopular
    ? visibleProducts
    : visibleProducts.slice(0, 4);

  return (
    <main className="el-home">
      <header className="el-header">
        <div className="el-header-top">
          <button className="el-brand" onClick={() => goToSection("Home")}>
            <img src="/logo.png" alt="EKHONI LAGBE logo" />
            <span>
              <strong>EKHONI LAGBE</strong>
              <small>এখনই লাগবে</small>
            </span>
          </button>

          <div className="el-header-actions">
            <button className="el-icon-button" onClick={() => onNavigate("notifications")} aria-label="Notifications">
              <span>♧</span>
            </button>
            <button className="el-cart-button" onClick={() => onNavigate("cart")}>
              <span>🛍️</span>
              <span>Cart</span>
              {cartCount > 0 && <b>{cartCount}</b>}
            </button>
          </div>
        </div>

        <button className="el-address" onClick={() => setShowAddress(!showAddress)}>
          <span className="el-pin">⌖</span>
          <span className="el-address-text">
            <small>DELIVER TO</small>
            <strong>{address}</strong>
          </span>
          <span className="el-chevron">⌄</span>
        </button>

        {showAddress && (
          <div className="el-address-panel">
            <strong>Delivery address</strong>
            <p>Choose where you want your groceries delivered.</p>
            <button onClick={() => { setAddress("Home • Kamrangirchar"); setShowAddress(false); }}>
              Home • Kamrangirchar
            </button>
            <button onClick={() => { setAddress("Current Address • Kamrangirchar"); setShowAddress(false); }}>
              Current Address
            </button>
            <small>Currently serving Kamrangirchar only.</small>
          </div>
        )}

        <label className="el-search">
          <span>⌕</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search groceries, products..."
          />
          {search && <button onClick={() => setSearch("")} aria-label="Clear search">×</button>}
        </label>
      </header>

      <div className="el-content">
        <section className="el-hero">
          <div className="el-hero-copy">
            <span className="el-hero-kicker"><span /> QUICK GROCERY DELIVERY</span>
            <h1>Groceries at your door in <em>15 minutes.</em></h1>
            <p>আপনার প্রয়োজনীয় Grocery, এখন আরও দ্রুত।</p>
            <div className="el-hero-benefits">
              <span>✓ Fresh products</span>
              <span>✓ Fast delivery</span>
              <span>✓ Easy ordering</span>
            </div>
            <button
              className="el-hero-button"
              onClick={() => document.getElementById("el-popular")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start Shopping <span>→</span>
            </button>
          </div>
          <div className="el-hero-art" aria-label="Fresh groceries">
            <div className="el-hero-circle" />
            <span className="el-art-leaf leaf-one">✦</span>
            <span className="el-art-leaf leaf-two">✦</span>
            <div className="el-art-bag">🛍️</div>
            <div className="el-art-food food-one">🥬</div>
            <div className="el-art-food food-two">🥕</div>
            <div className="el-art-food food-three">🍅</div>
            <div className="el-delivery-bubble"><strong>15</strong><span>MIN</span></div>
          </div>
          <div className="el-hero-bottom">
            <span><i /> Fresh everyday</span>
            <span><i /> Local delivery</span>
          </div>
        </section>

        <section className="el-section" id="el-categories">
          <div className="el-section-heading">
            <div>
              <span className="el-eyebrow">FIND WHAT YOU NEED</span>
              <h2>Shop by Category</h2>
            </div>
            <button className="el-view-link" onClick={() => setShowAllCategories(!showAllCategories)}>
              {showAllCategories ? "Show less" : "View All"} <span>→</span>
            </button>
          </div>

          <div className={`el-category-grid ${showAllCategories ? "el-category-expanded" : ""}`}>
            {(showAllCategories ? categories : categories.slice(0, 8)).map((category) => (
              <button
                key={category.name}
                className={`el-category ${selectedCategory === category.name ? "selected" : ""}`}
                onClick={() => chooseCategory(category)}
              >
                <span className="el-category-icon">{category.icon}</span>
                <strong>{category.bn}</strong>
                <small>{category.name}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="el-offer">
          <div className="el-offer-icon">🎁</div>
          <div className="el-offer-copy">
            <span>GOOD DEALS, EVERY DAY</span>
            <h2>Offers & Deals</h2>
            <p>আপনার পছন্দের পণ্যে সাশ্রয়ী কেনাকাটা করুন।</p>
          </div>
          <button onClick={() => { setSelectedCategory("All"); setSearch(""); document.getElementById("el-popular")?.scrollIntoView({ behavior: "smooth" }); }}>
            Explore Deals <span>→</span>
          </button>
          <div className="el-offer-decoration">%</div>
        </section>

        <section className="el-section" id="el-popular">
          <div className="el-section-heading">
            <div>
              <span className="el-eyebrow">CUSTOMER FAVOURITES</span>
              <h2>{search ? "Search Results" : selectedCategory === "All" ? "🔥 Popular Products" : selectedCategory}</h2>
              <p className="el-section-subtitle">
                {search
                  ? `Results for “${search}”`
                  : "Everyday essentials, ready for your cart."}
              </p>
            </div>
            {visibleProducts.length > 4 && (
              <button className="el-view-link" onClick={() => setShowAllPopular(!showAllPopular)}>
                {showAllPopular ? "Show less" : "View All"} <span>→</span>
              </button>
            )}
          </div>

          {visibleProducts.length > 0 ? (
            <div className="el-product-grid">
              {displayedPopular.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  favorite={favorites.includes(product.id)}
                  onFavorite={toggleFavorite}
                  onAdd={addToCart}
                  onOpen={openProduct}
                  quantity={cart[product.id] || 0}
                />
              ))}
            </div>
          ) : (
            <div className="el-empty-state">
              <span>🔎</span>
              <h3>No products found</h3>
              <p>Try another search or choose a different category.</p>
              <button onClick={() => { setSearch(""); setSelectedCategory("All"); }}>
                Browse all products
              </button>
            </div>
          )}
        </section>

        <section className="el-section">
          <div className="el-section-heading">
            <div>
              <span className="el-eyebrow">PICK UP WHERE YOU LEFT OFF</span>
              <h2>🕘 Recently Viewed</h2>
            </div>
          </div>
          {recentlyViewed.length > 0 ? (
            <div className="el-product-grid">
              {recentlyViewed.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  favorite={favorites.includes(product.id)}
                  onFavorite={toggleFavorite}
                  onAdd={addToCart}
                  onOpen={openProduct}
                  quantity={cart[product.id] || 0}
                />
              ))}
            </div>
          ) : (
            <p className="el-soft-note">আপনি যে পণ্যগুলো দেখবেন, সেগুলো এখানে দেখা যাবে।</p>
          )}
        </section>

        <section className="el-recommend">
          <div>
            <span className="el-eyebrow">HANDPICKED FOR YOU</span>
            <h2>✨ Recommended for You</h2>
            <p>আপনার প্রতিদিনের প্রয়োজনীয় পণ্য এক জায়গায়।</p>
          </div>
          <button onClick={() => { setSelectedCategory("All"); setSearch(""); document.getElementById("el-popular")?.scrollIntoView({ behavior: "smooth" }); }}>
            Explore Products →
          </button>
        </section>

        <section className="el-reorder">
          <div className="el-reorder-icon">↻</div>
          <div>
            <span className="el-eyebrow">SAVE TIME ON YOUR NEXT SHOP</span>
            <h2>Buy Again</h2>
            <p>আগের অর্ডারের পণ্য আবার দ্রুত অর্ডার করতে পারবেন।</p>
            <small>Order history will appear here after order history is connected.</small>
          </div>
          <button onClick={() => onNavigate("orders")}>My Orders →</button>
        </section>

        <section className="el-section">
          <div className="el-section-heading">
            <div>
              <span className="el-eyebrow">JUST ARRIVED</span>
              <h2>🆕 New Arrivals</h2>
            </div>
            <button className="el-view-link" onClick={() => { setSelectedCategory("All"); setSearch(""); }}>
              Explore <span>→</span>
            </button>
          </div>
          <div className="el-product-grid">
            {products.slice(4, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                favorite={favorites.includes(product.id)}
                onFavorite={toggleFavorite}
                onAdd={addToCart}
                onOpen={openProduct}
                quantity={cart[product.id] || 0}
              />
            ))}
          </div>
        </section>
      </div>

      <footer className="el-footer">
        <img src="/logo.png" alt="EKHONI LAGBE" />
        <div><strong>EKHONI LAGBE</strong><span>15-Minute Delivery — Right to Your Hands</span></div>
        <p>Grocery shopping made easier.</p>
        <small>Serving Kamrangirchar, Dhaka only.</small>
      </footer>

      <nav className="el-bottom-nav">
        {[
          { name: "Home", icon: "⌂" },
          { name: "Categories", icon: "▦" },
          { name: "Popular", icon: "✦" },
          { name: "Orders", icon: "▤" },
          { name: "Account", icon: "♙" },
        ].map((item) => (
          <button
            key={item.name}
            className={activeNav === item.name ? "active" : ""}
            onClick={() => goToSection(item.name)}
          >
            <span className="el-nav-icon">{item.icon}</span>
            <small>{item.name}</small>
          </button>
        ))}
      </nav>

      {cartCount > 0 && (
        <button className="el-cart-summary" onClick={() => onNavigate("cart")}>
          <span className="el-cart-summary-icon">🛍️</span>
          <span><strong>{cartCount} item{cartCount > 1 ? "s" : ""}</strong><small>View your cart</small></span>
          <strong>{taka(cartTotal)}</strong>
          <span>→</span>
        </button>
      )}

      {notice && <div className="el-toast">{notice}</div>}

      {productDetail && (
        <div className="el-modal-backdrop" onClick={() => setProductDetail(null)}>
          <div className="el-product-modal" onClick={(event) => event.stopPropagation()}>
            <button className="el-modal-close" onClick={() => setProductDetail(null)}>×</button>
            <img src={productDetail.image} alt={productDetail.name} />
            <span className="el-eyebrow">{productDetail.category}</span>
            <h2>{productDetail.bn}</h2>
            <p>{productDetail.name} · {productDetail.weight}</p>
            <div className="el-rating">★ {productDetail.rating}</div>
            <div className="el-price-row"><strong>{taka(productDetail.price)}</strong><del>{taka(productDetail.oldPrice)}</del></div>
            <button className="el-add-cart" onClick={() => { addToCart(productDetail); setProductDetail(null); }}>
              + Add to Cart
            </button>
            <small className="el-demo-warning">Demo product details. Live stock and ratings will be connected later.</small>
          </div>
        </div>
      )}
    </main>
  );
      }
      
