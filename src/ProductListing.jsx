
import { useMemo, useState } from "react";
import "./ProductListing.css";

const listingCategories = [
  {
    name: "Rice & Grains",
    subs: ["All", "Rice", "Lentils", "Flour", "Cereals", "Other"],
  },
  {
    name: "Cooking Essentials",
    subs: ["All", "Oil", "Salt & Sugar", "Spices", "Flour", "Other"],
  },
  {
    name: "Dairy & Eggs",
    subs: ["All", "Dairy", "Eggs", "Butter", "Cheese", "Other"],
  },
  {
    name: "Snacks & Drinks",
    subs: ["All", "Snacks", "Drinks", "Biscuits", "Juice", "Other"],
  },
  {
    name: "Household",
    subs: ["All", "Household", "Cleaning", "Laundry", "Other"],
  },
  {
    name: "Personal & Baby Care",
    subs: ["All", "Personal Care", "Baby Care", "Other"],
  },
];

const listingProducts = [
  { id: 101, name: "Premium Miniket Rice", bn: "প্রিমিয়াম মিনিকেট চাল", category: "Rice", group: "Rice & Grains", brand: "Daily Fresh", weight: "1 kg", price: 105, oldPrice: 120, rating: 4.8, purchases: 950, isNew: false, stock: true, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=85", description: "প্রতিদিনের রান্নার জন্য চাল।" },
  { id: 102, name: "Fine Aromatic Rice", bn: "সুগন্ধি চাল", category: "Rice", group: "Rice & Grains", brand: "Daily Fresh", weight: "1 kg", price: 135, oldPrice: 150, rating: 4.7, purchases: 720, isNew: true, stock: true, image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=600&q=85", description: "সুগন্ধি ভাতের জন্য উপযোগী।" },
  { id: 103, name: "Red Lentils", bn: "মসুর ডাল", category: "Lentils", group: "Rice & Grains", brand: "Daily Fresh", weight: "500 g", price: 65, oldPrice: 72, rating: 4.7, purchases: 810, isNew: false, stock: true, image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=600&q=85", description: "দৈনন্দিন রান্নার জন্য মসুর ডাল।" },
  { id: 104, name: "Soybean Cooking Oil", bn: "সয়াবিন তেল", category: "Oil", group: "Cooking Essentials", brand: "Daily Fresh", weight: "1 litre", price: 175, oldPrice: 185, rating: 4.6, purchases: 1200, isNew: false, stock: true, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&q=85", description: "রান্নার দৈনন্দিন প্রয়োজনীয় তেল।" },
  { id: 105, name: "Refined Sugar", bn: "পরিশোধিত চিনি", category: "Salt & Sugar", group: "Cooking Essentials", brand: "Daily Fresh", weight: "1 kg", price: 125, oldPrice: 135, rating: 4.5, purchases: 650, isNew: false, stock: true, image: "https://images.unsplash.com/photo-1581441363689-1f3c3c414635?w=600&q=85", description: "চা, পানীয় ও রান্নায় ব্যবহারযোগ্য চিনি।" },
  { id: 106, name: "Farm Fresh Eggs", bn: "ফার্মের ডিম", category: "Eggs", group: "Dairy & Eggs", brand: "Farm Fresh", weight: "12 pieces", price: 150, oldPrice: 160, rating: 4.9, purchases: 1100, isNew: false, stock: true, image: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=600&q=85", description: "প্রতিদিনের খাবারের জন্য ডিম।" },
  { id: 107, name: "Fresh Whole Milk", bn: "তাজা দুধ", category: "Dairy", group: "Dairy & Eggs", brand: "Farm Fresh", weight: "1 litre", price: 95, oldPrice: 105, rating: 4.8, purchases: 870, isNew: true, stock: true, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&q=85", description: "চা, পানীয় ও দৈনন্দিন ব্যবহারের দুধ।" },
  { id: 108, name: "Potato Chips", bn: "পটেটো চিপস", category: "Snacks", group: "Snacks & Drinks", brand: "Crunchy", weight: "Pack", price: 30, oldPrice: 35, rating: 4.5, purchases: 590, isNew: true, stock: true, image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&q=85", description: "হালকা নাশতার জন্য ক্রিস্পি চিপস।" },
  { id: 109, name: "Orange Drink", bn: "অরেঞ্জ ড্রিংক", category: "Drinks", group: "Snacks & Drinks", brand: "Fresh Sip", weight: "500 ml", price: 40, oldPrice: 45, rating: 4.4, purchases: 420, isNew: false, stock: true, image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&q=85", description: "ঠান্ডা পানীয়ের জন্য।" },
  { id: 110, name: "Laundry Detergent", bn: "কাপড় ধোয়ার পাউডার", category: "Household", group: "Household", brand: "Home Care", weight: "500 g", price: 80, oldPrice: 90, rating: 4.6, purchases: 510, isNew: false, stock: true, image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&q=85", description: "দৈনন্দিন কাপড় পরিষ্কারের পণ্য।" },
  { id: 111, name: "Baby Care Wipes", bn: "বেবি ওয়াইপস", category: "Baby Care", group: "Personal & Baby Care", brand: "Soft Care", weight: "Pack", price: 120, oldPrice: 120, rating: 4.8, purchases: 300, isNew: true, stock: false, image: "https://images.unsplash.com/photo-1604917877934-07d8d248d396?w=600&q=85", description: "শিশুর যত্নের পণ্য। বর্তমানে স্টকে নেই।" },
  { id: 112, name: "Bathing Soap", bn: "গোসলের সাবান", category: "Personal Care", group: "Personal & Baby Care", brand: "Home Care", weight: "100 g", price: 55, oldPrice: 60, rating: 4.5, purchases: 640, isNew: false, stock: true, image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=600&q=85", description: "দৈনন্দিন ব্যক্তিগত পরিচর্যার সাবান।" },
];

const sortOptions = [
  { value: "popular", label: "Popular" },
  { value: "purchased", label: "Most Purchased" },
  { value: "low", label: "Price: Low → High" },
  { value: "high", label: "Price: High → Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

function money(value) {
  return `৳${value}`;
}

function ProductCard({ product, favorite, onFavorite, onAdd, onOpen, quantity }) {
  const discount = product.oldPrice > product.price
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <article className="pl-card">
      {discount > 0 && <span className="pl-discount">{discount}% OFF</span>}
      {product.isNew && <span className="pl-new">NEW</span>}

      <button
        className={`pl-favorite ${favorite ? "chosen" : ""}`}
        onClick={() => onFavorite(product.id)}
        aria-label="Toggle favorite"
      >
        {favorite ? "♥" : "♡"}
      </button>

      <button className="pl-image-button" onClick={() => onOpen(product)}>
        <img src={product.image} alt={product.name} loading="lazy" />
      </button>

      <button className="pl-product-name" onClick={() => onOpen(product)}>
        <strong>{product.bn}</strong>
        <span>{product.name}</span>
      </button>

      <div className="pl-weight">{product.weight}</div>
      <div className="pl-rating">★ {product.rating.toFixed(1)}</div>

      <div className="pl-price">
        <strong>{money(product.price)}</strong>
        {discount > 0 && <del>{money(product.oldPrice)}</del>}
      </div>

      {!product.stock ? (
        <button className="pl-add pl-out-of-stock" disabled>
          Out of Stock
        </button>
      ) : (
        <button className="pl-add" onClick={() => onAdd(product)}>
          {quantity > 0 ? `✓ Added (${quantity})` : "+ Add to Cart"}
        </button>
      )}
    </article>
  );
}

export default function ProductListing({
  initialCategory = "Rice & Grains",
  initialQuery = "",
  onBack = () => {},
  onNavigate = () => {},
  onOpenProduct = () => {},
  onAddToCart,
  cart = {},
}) {
  const [search, setSearch] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [subCategory, setSubCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [notice, setNotice] = useState("");
  const [maxPrice, setMaxPrice] = useState("1000");
  const [minRating, setMinRating] = useState("0");
  const [discountOnly, setDiscountOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [minWeight, setMinWeight] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);

  const categoryConfig = listingCategories.find((item) => item.name === category);
  const activeSubCategories = categoryConfig?.subs || ["All"];

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();

    const result = listingProducts.filter((product) => {
      const categoryMatch =
        category === "All Products" ||
        product.group === category ||
        product.category === category ||
        (category === "Rice & Grains" && ["Rice", "Lentils", "Flour", "Cereals"].includes(product.category));

      const subMatch =
        subCategory === "All" ||
        product.category === subCategory ||
        product.group === subCategory ||
        product.name.toLowerCase().includes(subCategory.toLowerCase());

      const searchMatch =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.bn.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        product.group.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term);

      const priceMatch = product.price <= Number(maxPrice || 100000);
      const ratingMatch = product.rating >= Number(minRating);
      const discountMatch = !discountOnly || product.oldPrice > product.price;
      const stockMatch = !inStockOnly || product.stock;
      const brandMatch = selectedBrand === "All" || product.brand === selectedBrand;
      const weightMatch = minWeight === "All" || product.weight.toLowerCase().includes(minWeight.toLowerCase());

      return categoryMatch && subMatch && searchMatch && priceMatch &&
        ratingMatch && discountMatch && stockMatch && brandMatch && weightMatch;
    });

    return result.sort((a, b) => {
      if (sortBy === "low") return a.price - b.price;
      if (sortBy === "high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "purchased") return b.purchases - a.purchases;
      if (sortBy === "newest") return Number(b.isNew) - Number(a.isNew);
      return b.purchases - a.purchases;
    });
  }, [search, category, subCategory, sortBy, maxPrice, minRating, discountOnly, inStockOnly, selectedBrand, minWeight]);

  const shownProducts = filteredProducts.slice(0, visibleCount);
  const cartCount = Object.values(cart).reduce((sum, value) => sum + value, 0);
  const brands = ["All", ...new Set(listingProducts.map((product) => product.brand))];

  const addProduct = (product) => {
    if (!product.stock) return;

    if (onAddToCart) {
      onAddToCart(product);
    }

    setNotice(`${product.bn} কার্টে যোগ হয়েছে`);
    window.setTimeout(() => setNotice(""), 2200);
  };

  const openProduct = (product) => {
    onOpenProduct(product);
  };

  const resetFilters = () => {
    setMaxPrice("1000");
    setMinRating("0");
    setDiscountOnly(false);
    setInStockOnly(false);
    setSelectedBrand("All");
    setMinWeight("All");
    setSubCategory("All");
    setSortBy("popular");
    setVisibleCount(8);
  };

  return (
    <main className="pl-page">
      <header className="pl-header">
        <div className="pl-header-row">
          <button className="pl-back" onClick={onBack} aria-label="Go back">←</button>

          <button className="pl-brand" onClick={onBack}>
            <img src="/logo.png" alt="EKHONI LAGBE" />
            <span><strong>EKHONI LAGBE</strong><small>এখনই লাগবে</small></span>
          </button>

          <div className="pl-header-actions">
            <button className="pl-header-icon" onClick={() => onNavigate("search")} aria-label="Search">⌕</button>
            <button className="pl-cart" onClick={() => onNavigate("cart")}>
              🛍️ <span>Cart</span>{cartCount > 0 && <b>{cartCount}</b>}
            </button>
          </div>
        </div>

        <label className="pl-search">
          <span>⌕</span>
          <input
            value={search}
            onChange={(event) => { setSearch(event.target.value); setVisibleCount(8); }}
            placeholder="Search groceries, products..."
          />
          {search && <button onClick={() => setSearch("")} aria-label="Clear search">×</button>}
        </label>
      </header>

      <div className="pl-content">
        <div className="pl-breadcrumb">
          <button onClick={onBack}>Home</button><span>/</span>
          <span>{search.trim() ? "Search Results" : category}</span>
        </div>

        <section className="pl-title-row">
          <div>
            <span className="pl-eyebrow">{search.trim() ? "FIND YOUR EVERYDAY ESSENTIALS" : "SHOP YOUR WAY"}</span>
            <h1>{search.trim() ? `Search results for “${search.trim()}”` : category}</h1>
            <p>{filteredProducts.length} products found · Grocery essentials for everyday life</p>
          </div>
          <div className="pl-result-icon">▦</div>
        </section>

        {!search.trim() && (
          <div className="pl-subcategories" aria-label="Subcategories">
            {activeSubCategories.map((sub) => (
              <button
                key={sub}
                className={subCategory === sub ? "active" : ""}
                onClick={() => { setSubCategory(sub); setVisibleCount(8); }}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        <div className="pl-toolbar">
          <button className={`pl-tool-button ${filterOpen ? "active" : ""}`} onClick={() => { setFilterOpen(!filterOpen); setSortOpen(false); }}>
            ☰ Filter
          </button>
          <button className={`pl-tool-button ${sortOpen ? "active" : ""}`} onClick={() => { setSortOpen(!sortOpen); setFilterOpen(false); }}>
            ↕ Sort <span className="pl-sort-current">{sortOptions.find((item) => item.value === sortBy)?.label}</span>
          </button>
          <span className="pl-count">{filteredProducts.length} items</span>
        </div>

        {filterOpen && (
          <section className="pl-filter-panel">
            <div className="pl-panel-heading">
              <div><span className="pl-eyebrow">REFINE YOUR SEARCH</span><h2>Filters</h2></div>
              <button onClick={resetFilters}>Clear all</button>
            </div>

            <div className="pl-filter-grid">
              <label>
                <span>Category</span>
                <select value={category} onChange={(event) => { setCategory(event.target.value); setSubCategory("All"); }}>
                  <option>All Products</option>
                  {listingCategories.map((item) => <option key={item.name}>{item.name}</option>)}
                  {listingCategories.flatMap((item) => item.subs.filter((sub) => sub !== "All")).filter((value, index, self) => self.indexOf(value) === index).map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>

              <label>
                <span>Brand</span>
                <select value={selectedBrand} onChange={(event) => setSelectedBrand(event.target.value)}>
                  {brands.map((brand) => <option key={brand}>{brand}</option>)}
                </select>
              </label>

              <label>
                <span>Maximum price (৳)</span>
                <input type="number" min="0" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} />
              </label>

              <label>
                <span>Minimum rating</span>
                <select value={minRating} onChange={(event) => setMinRating(event.target.value)}>
                  <option value="0">Any rating</option>
                  <option value="4">4.0+ stars</option>
                  <option value="4.5">4.5+ stars</option>
                  <option value="4.8">4.8+ stars</option>
                </select>
              </label>

              <label>
                <span>Weight / Size contains</span>
                <select value={minWeight} onChange={(event) => setMinWeight(event.target.value)}>
                  <option value="All">All sizes</option>
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="litre">litre</option>
                  <option value="ml">ml</option>
                  <option value="pack">Pack</option>
                  <option value="pieces">Pieces</option>
                </select>
              </label>

              <div className="pl-filter-checks">
                <label><input type="checkbox" checked={discountOnly} onChange={(event) => setDiscountOnly(event.target.checked)} /> Discounted products only</label>
                <label><input type="checkbox" checked={inStockOnly} onChange={(event) => setInStockOnly(event.target.checked)} /> Available products only</label>
              </div>
            </div>

            <button className="pl-apply-filter" onClick={() => { setFilterOpen(false); setVisibleCount(8); }}>
              Show {filteredProducts.length} products
            </button>
          </section>
        )}

        {sortOpen && (
          <section className="pl-sort-panel">
            <strong>Sort products by</strong>
            {sortOptions.map((option) => (
              <button
                key={option.value}
                className={sortBy === option.value ? "selected" : ""}
                onClick={() => { setSortBy(option.value); setSortOpen(false); setVisibleCount(8); }}
              >
                {option.label}<span>{sortBy === option.value ? "✓" : ""}</span>
              </button>
            ))}
          </section>
        )}

        {filteredProducts.length > 0 ? (
          <>
            <div className="pl-grid">
              {shownProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  favorite={favorites.includes(product.id)}
                  onFavorite={(id) => setFavorites((previous) => previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id])}
                  onAdd={addProduct}
                  onOpen={openProduct}
                  quantity={cart[product.id] || 0}
                />
              ))}
            </div>

            {visibleCount < filteredProducts.length && (
              <button className="pl-load-more" onClick={() => setVisibleCount((count) => count + 8)}>
                Load More Products <span>↓</span>
              </button>
            )}
          </>
        ) : (
          <div className="pl-empty">
            <div>⌕</div>
            <h2>No products found</h2>
            <p>অন্য keyword বা filter দিয়ে আবার চেষ্টা করুন।</p>
            <button onClick={() => { setSearch(""); setCategory("All Products"); resetFilters(); }}>
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <footer className="pl-footer">
        <img src="/logo.png" alt="EKHONI LAGBE" />
        <span>15-Minute Grocery Delivery · Kamrangirchar only</span>
      </footer>

      {cartCount > 0 && (
        <button className="pl-cart-summary" onClick={() => onNavigate("cart")}>
          <span>🛍️</span>
          <strong>{cartCount} item{cartCount > 1 ? "s" : ""} in cart</strong>
          <span>View Cart →</span>
        </button>
      )}

      {notice && <div className="pl-toast">{notice}</div>}
    </main>
  );
}
