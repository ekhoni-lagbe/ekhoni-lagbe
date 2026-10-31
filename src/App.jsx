
import { useState } from "react";
import CustomerHome from "./CustomerHome";

const SERVICE_AREA = "Kamrangirchar";

const PAGE_TITLES = {
  categories: "Categories",
  popular: "Popular Products",
  offers: "My Offers",
  cart: "My Cart",
  orders: "My Orders",
  guide: "Information Guide",
};

function App() {
  const [page, setPage] = useState("home");

  const [accountStep, setAccountStep] = useState(1);
  const [otpVerified, setOtpVerified] = useState(false);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");

  const [loginMobile, setLoginMobile] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [cartData, setCartData] = useState({});

  const openCreateAccount = () => {
    setPage("create-account");
    setAccountStep(1);
    setOtpVerified(false);
    setOtp("");
  };

  const closeCreateAccount = () => {
    setPage("home");
  };

  const openLogin = () => {
    setPage("login");
  };

  const closeLogin = () => {
    setPage("home");
  };

  const handleSendOtp = () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!/^01\d{9}$/.test(mobile)) {
      alert("Please enter a valid 11-digit Bangladesh mobile number.");
      return;
    }

    setAccountStep(2);
    alert("Demo mode: OTP sending is not connected yet.");
  };

  const handleVerifyOtp = () => {
    if (!/^\d{4,6}$/.test(otp)) {
      alert("Please enter 4 to 6 OTP digits.");
      return;
    }

    setOtpVerified(true);
    setAccountStep(3);
    alert("Demo mode: OTP accepted for this prototype.");
  };

  const handleCreateAccount = () => {
    if (!password || password !== confirmPassword) {
      alert("Please enter matching passwords.");
      return;
    }

    if (!otpVerified) {
      alert("Please complete OTP verification first.");
      return;
    }

    alert(
      "Demo account created! Real account storage is not connected yet."
    );
    setPage("home");
  };

  const handleLogin = () => {
    if (!/^01\d{9}$/.test(loginMobile)) {
      alert("Please enter a valid 11-digit Bangladesh mobile number.");
      return;
    }

    if (!loginPassword.trim()) {
      alert("Please enter your password.");
      return;
    }

    alert(
      "Demo login: real account authentication is not connected yet."
    );
    setPage("home");
  };

  // Customer Home navigation
  const handleHomeNavigate = (destination, data) => {
    if (destination === "home") {
      setPage("home");
      return;
    }

    if (destination === "account") {
      openLogin();
      return;
    }

    if (destination === "cart") {
      if (data && typeof data === "object") {
        setCartData(data);
      }

      setPage("cart");
      return;
    }

    if (
      ["categories", "popular", "offers", "orders", "guide"].includes(
        destination
      )
    ) {
      setPage(destination);
      return;
    }

    alert("এই স্ক্রিনটি পরবর্তী ধাপে তৈরি হবে।");
  };

  const cartItems = Object.entries(cartData).filter(
    ([, quantity]) =>
      typeof quantity === "number" && quantity > 0
  );

  const returnHome = () => {
    setPage("home");
  };

  return (
    <div className="app">
      {/* LOGIN PAGE */}

      {page === "login" && (
        <div className="modal-overlay">
          <div className="login-modal">
            <button
              type="button"
              className="close-button"
              onClick={closeLogin}
              aria-label="Close"
            >
              ×
            </button>

            <div className="modal-logo">
              <img src="/logo.png" alt="EKHONI LAGBE logo" />
            </div>

            <h2>Welcome Back</h2>
            <p>Login to your EKHONI LAGBE account.</p>

            <input
              type="tel"
              placeholder="Mobile Number"
              inputMode="numeric"
              maxLength={11}
              value={loginMobile}
              onChange={(e) =>
                setLoginMobile(
                  e.target.value.replace(/\D/g, "").slice(0, 11)
                )
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin();
              }}
            />

            <button
              type="button"
              className="primary-button modal-login-button"
              onClick={handleLogin}
            >
              Log In
            </button>

            <small className="modal-note">
              Demo login only. Real account authentication will be
              connected later.
            </small>
          </div>
        </div>
      )}

      {/* CREATE ACCOUNT PAGE */}

      {page === "create-account" && (
        <div className="account-page">
          <div className="account-card">
            <button
              type="button"
              className="account-close"
              onClick={closeCreateAccount}
              aria-label="Close"
            >
              ×
            </button>

            <div className="account-logo">
              <img src="/logo.png" alt="EKHONI LAGBE logo" />
            </div>

            <div className="account-heading">
              <h2>Create Account</h2>
              <p>আপনার EKHONI LAGBE account তৈরি করুন</p>
            </div>

            <div className="account-section">
              <div className="section-number">1</div>
              <div className="section-content">
                <h3>Your Name</h3>
                <input
                  type="text"
                  placeholder="আপনার নাম লিখুন"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="account-section">
              <div className="section-number">2</div>
              <div className="section-content">
                <h3>Mobile Number</h3>

                <input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  inputMode="numeric"
                  maxLength={11}
                  value={mobile}
                  onChange={(e) => {
                    let value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 11);

                    if (value.length === 1 && value !== "0") {
                      value = "";
                    }

                    if (
                      value.length >= 2 &&
                      value.slice(0, 2) !== "01"
                    ) {
                      value = "0";
                    }

                    setMobile(value);
                  }}
                />

                {accountStep === 1 && (
                  <button
                    type="button"
                    className="account-action"
                    onClick={handleSendOtp}
                  >
                    Send OTP
                  </button>
                )}
              </div>
            </div>

            {accountStep >= 2 && (
              <div className="account-section active-section">
                <div className="section-number">3</div>
                <div className="section-content">
                  <h3>OTP Verification</h3>

                  <p className="section-note">
                    আপনার মোবাইলে পাঠানো OTP দিন
                  </p>

                  <input
                    type="text"
                    placeholder="Enter OTP"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, ""))
                    }
                  />

                  {!otpVerified && (
                    <button
                      type="button"
                      className="account-action"
                      onClick={handleVerifyOtp}
                    >
                      Verify OTP
                    </button>
                  )}

                  {otpVerified && (
                    <div className="verified-message">
                      ✓ Demo verification complete
                    </div>
                  )}
                </div>
              </div>
            )}

            {otpVerified && (
              <>
                <div className="account-section active-section">
                  <div className="section-number">4</div>
                  <div className="section-content">
                    <h3>Create Password</h3>

                    <input
                      type="password"
                      placeholder="Create password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <input
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                    />

                    {confirmPassword &&
                      password !== confirmPassword && (
                        <p className="error-message">
                          Password দুটো একই হতে হবে।
                        </p>
                      )}
                  </div>
                </div>

                <div className="account-section">
                  <div className="section-number">5</div>
                  <div className="section-content">
                    <h3>
                      Delivery Address
                      <span className="optional-label">Optional</span>
                    </h3>

                    <p className="section-note">
                      এখন না দিলেও পরে order করার সময় দিতে পারবেন।
                    </p>

                    <textarea
                      placeholder="আপনার delivery address লিখুন"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  className="create-account-button"
                  onClick={handleCreateAccount}
                  disabled={
                    !password ||
                    !confirmPassword ||
                    password !== confirmPassword
                  }
                >
                  Create Account
                  <span>→</span>
                </button>

                <p className="address-info">
                  📍 বর্তমানে শুধু {SERVICE_AREA}-এ delivery দেওয়া হচ্ছে।
                </p>
              </>
            )}

            <div className="account-footer">
              <span>Already have an account?</span>
              <button type="button" onClick={openLogin}>
                Log In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOMER HOME
          Keep mounted when opening another page so its local cart
          state is not immediately lost. */}

      {(page === "home" ||
        ["cart", "categories", "popular", "offers", "orders", "guide"].includes(
          page
        )) && (
        <div style={{ display: page === "home" ? "block" : "none" }}>
          <CustomerHome onNavigate={handleHomeNavigate} />
        </div>
      )}

      {/* CART PAGE */}

      {page === "cart" && (
        <main
          style={{
            minHeight: "100vh",
            padding: "24px 16px 40px",
            background: "#f7fbf7",
          }}
        >
          <div
            style={{
              width: "min(720px, 100%)",
              margin: "0 auto",
            }}
          >
            <button
              type="button"
              onClick={returnHome}
              style={{
                border: 0,
                background: "transparent",
                color: "#166534",
                fontWeight: 800,
                padding: "8px 0 18px",
              }}
            >
              ← Continue Shopping
            </button>

            <section
              style={{
                background: "#fff",
                border: "1px solid #e2ece5",
                borderRadius: 20,
                padding: 22,
                boxShadow: "0 12px 35px rgba(31,80,45,0.06)",
              }}
            >
              <h1 style={{ color: "#14532d", fontSize: 26 }}>
                My Cart
              </h1>

              <p style={{ color: "#718076", marginTop: 8 }}>
                Review your selected grocery items.
              </p>

              {cartItems.length === 0 ? (
                <div style={{ padding: "35px 0 20px", textAlign: "center" }}>
                  <div style={{ fontSize: 42 }}>🛒</div>
                  <h2 style={{ marginTop: 12, color: "#23432c" }}>
                    Your cart is empty
                  </h2>
                  <p style={{ marginTop: 8, color: "#718076" }}>
                    Add grocery products before continuing.
                  </p>

                  <button
                    type="button"
                    onClick={returnHome}
                    style={{
                      marginTop: 20,
                      padding: "13px 20px",
                      border: 0,
                      borderRadius: 12,
                      background: "#16803d",
                      color: "#fff",
                      fontWeight: 800,
                    }}
                  >
                    Browse Groceries
                  </button>
                </div>
              ) : (
                <div style={{ marginTop: 22 }}>
                  <p style={{ color: "#23432c", fontWeight: 700 }}>
                    Selected item entries: {cartItems.length}
                  </p>

                  <div style={{ marginTop: 14 }}>
                    {cartItems.map(([productId, quantity]) => (
                      <div
                        key={productId}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 12,
                          padding: "14px 0",
                          borderBottom: "1px solid #edf2ee",
                        }}
                      >
                        <span style={{ color: "#23432c", overflowWrap: "anywhere" }}>
                          Product reference: {productId}
                        </span>
                        <strong style={{ color: "#166534" }}>
                          Qty: {quantity}
                        </strong>
                      </div>
                    ))}
                  </div>

                  <p style={{ marginTop: 18, color: "#718076", fontSize: 13 }}>
                    Product names, prices and checkout are not connected to
                    a verified product database yet.
                  </p>

                  <button
                    type="button"
                    onClick={returnHome}
                    style={{
                      width: "100%",
                      marginTop: 20,
                      padding: 14,
                      border: 0,
                      borderRadius: 12,
                      background: "#16803d",
                      color: "#fff",
                      fontWeight: 800,
                    }}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </section>
          </div>
        </main>
      )}

      {/* OTHER SCREENS — navigation placeholders */}

      {["categories", "popular", "offers", "orders", "guide"].includes(
        page
      ) && (
        <main
          style={{
            minHeight: "100vh",
            padding: "24px 16px",
            background: "#f7fbf7",
          }}
        >
          <div
            style={{
              width: "min(720px, 100%)",
              margin: "0 auto",
              padding: 24,
              background: "#fff",
              border: "1px solid #e2ece5",
              borderRadius: 20,
            }}
          >
            <button
              type="button"
              onClick={returnHome}
              style={{
                border: 0,
                background: "transparent",
                color: "#166534",
                fontWeight: 800,
                paddingBottom: 20,
              }}
            >
              ← Back to Home
            </button>

            <h1 style={{ color: "#14532d", fontSize: 26 }}>
              {PAGE_TITLES[page]}
            </h1>

            <p style={{ marginTop: 12, color: "#718076", lineHeight: 1.7 }}>
              এই স্ক্রিনটি এখনো সম্পূর্ণভাবে তৈরি হয়নি। পরবর্তী ধাপে
              সংশ্লিষ্ট ফিচার যুক্ত করা হবে।
            </p>

            <button
              type="button"
              onClick={returnHome}
              style={{
                marginTop: 22,
                padding: "13px 20px",
                border: 0,
                borderRadius: 12,
                background: "#16803d",
                color: "#fff",
                fontWeight: 800,
              }}
            >
              Return to Home
            </button>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
