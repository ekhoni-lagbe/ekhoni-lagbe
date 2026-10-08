import { useState } from "react";

const SERVICE_AREA = "Kamrangirchar";

function App() {
  const [page, setPage] = useState("welcome");

  const [accountStep, setAccountStep] = useState(1);
  const [otpVerified, setOtpVerified] = useState(false);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");

  const openCreateAccount = () => {
    setPage("create-account");
    setAccountStep(1);
    setOtpVerified(false);
  };

  const closeCreateAccount = () => {
    setPage("welcome");
  };

  const openLogin = () => {
    setPage("login");
  };

  const closeLogin = () => {
    setPage("welcome");
  };

  // =========================
  // SEND OTP
  // =========================

  const handleSendOtp = () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    // Bangladesh mobile number:
    // Must start with 01 and contain exactly 11 digits.
    const validBangladeshMobile = /^01\d{9}$/.test(mobile);

    if (!validBangladeshMobile) {
      alert(
        "Please enter a valid 11-digit Bangladesh mobile number starting with 01."
      );
      return;
    }

    setAccountStep(2);
  };

  // =========================
  // VERIFY OTP
  // =========================

  const handleVerifyOtp = () => {
    if (otp.length < 4) {
      return;
    }

    setOtpVerified(true);
    setAccountStep(3);
  };

  // =========================
  // CREATE ACCOUNT
  // =========================

  const handleCreateAccount = () => {
    if (!password || password !== confirmPassword) {
      return;
    }

    alert("Account created successfully!");
    setPage("welcome");
  };

  return (
    <div className="app">

      {/* =========================
          WELCOME PAGE
      ========================= */}

      {page === "welcome" && (
        <>
          <header className="topbar">
            <div className="brand">
              <div className="brand-mark">
                <img
                  src="/logo.png"
                  alt="EKHONI LAGBE logo"
                />
              </div>

              <div className="brand-text">
                <strong>এখনই লাগবে</strong>
                <small>EKHONI LAGBE</small>
              </div>
            </div>

            <div className="service-badge">
              <span>📍</span>
              <span>Serving {SERVICE_AREA} Only</span>
            </div>
          </header>

          <main className="welcome">
            <section className="hero-card">

              <div className="hero-content">

                <div className="delivery-pill">
                  <span className="pulse-dot"></span>
                  Grocery delivery in 15 minutes
                </div>

                <h1>
                  আপনার প্রয়োজনীয়
                  <span> Grocery,</span>
                  <br />
                  এখন আরও দ্রুত।
                </h1>

                <p className="hero-description">
                  দৈনন্দিন প্রয়োজনীয় grocery পণ্য এখন সহজেই
                  অর্ডার করুন। আমরা বর্তমানে শুধু{" "}
                  <strong>{SERVICE_AREA}</strong> এলাকায়
                  delivery দিচ্ছি।
                </p>

                <div className="location-notice">
                  <span className="location-icon">📍</span>

                  <div>
                    <strong>
                      Currently available in {SERVICE_AREA} only.
                    </strong>

                    <p>
                      আপনার ঠিকানা এই এলাকার মধ্যে হলে
                      অর্ডার করতে পারবেন।
                    </p>
                  </div>
                </div>

                <div className="actions">

                  <button
                    type="button"
                    className="primary-button create-account-main-button"
                    onClick={openCreateAccount}
                  >
                    Create Account
                    <span>→</span>
                  </button>

                  <button
                    type="button"
                    className="secondary-button"
                  >
                    Continue as Guest
                  </button>

                </div>

                <div className="login-row">
                  <span>
                    Already have an account?
                  </span>

                  <button
                    type="button"
                    className="login-button"
                    onClick={openLogin}
                  >
                    Log In
                  </button>
                </div>

              </div>

              {/* Grocery Visual */}

              <div className="hero-visual">

                <div className="visual-glow"></div>

                <div className="grocery-basket">

                  <div className="basket-handle"></div>

                  <div className="grocery-item item-one">
                    🥬
                  </div>

                  <div className="grocery-item item-two">
                    🥛
                  </div>

                  <div className="grocery-item item-three">
                    🍎
                  </div>

                  <div className="grocery-item item-four">
                    🥖
                  </div>

                  <div className="grocery-item item-five">
                    🥕
                  </div>

                  <div className="basket-body">
                    <div className="basket-line"></div>
                    <div className="basket-line"></div>
                    <div className="basket-line"></div>
                  </div>

                </div>

                <div className="floating-card fast-card">
                  <span>⚡</span>

                  <div>
                    <strong>15 min</strong>
                    <small>Fast delivery</small>
                  </div>
                </div>

                <div className="floating-card fresh-card">
                  <span>✓</span>

                  <div>
                    <strong>Fresh & Easy</strong>
                    <small>Everyday groceries</small>
                  </div>
                </div>

              </div>

            </section>

            <section className="benefits">

              <div className="benefit">
                <span>⚡</span>

                <div>
                  <strong>Fast Delivery</strong>
                  <small>
                    15-minute grocery delivery
                  </small>
                </div>
              </div>

              <div className="benefit">
                <span>🛒</span>

                <div>
                  <strong>Everyday Grocery</strong>
                  <small>
                    Your daily essentials in one place
                  </small>
                </div>
              </div>

              <div className="benefit">
                <span>📍</span>

                <div>
                  <strong>Kamrangirchar</strong>
                  <small>
                    Currently serving this area
                  </small>
                </div>
              </div>

            </section>
          </main>

          <footer className="footer">
            <div>
              © {new Date().getFullYear()} EKHONI LAGBE
            </div>

            <div>
              15-Minute Delivery — Right to Your Hands
            </div>
          </footer>
        </>
      )}

      {/* =========================
          LOGIN PAGE
      ========================= */}

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
              <img
                src="/logo.png"
                alt="EKHONI LAGBE logo"
              />
            </div>

            <h2>Welcome Back</h2>

            <p>
              Login to your EKHONI LAGBE account.
            </p>

            <input
              type="tel"
              placeholder="Mobile Number"
              inputMode="numeric"
            />

            <input
              type="password"
              placeholder="Password"
            />

            <button
              type="button"
              className="primary-button modal-login-button"
            >
              Log In
            </button>

            <small className="modal-note">
              Account authentication will be connected later.
            </small>

          </div>
        </div>
      )}

      {/* =========================
          CREATE ACCOUNT PAGE
      ========================= */}

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
              <img
                src="/logo.png"
                alt="EKHONI LAGBE logo"
              />
            </div>

            <div className="account-heading">
              <h2>Create Account</h2>

              <p>
                আপনার EKHONI LAGBE account তৈরি করুন
              </p>
            </div>

            {/* NAME */}

            <div className="account-section">

              <div className="section-number">
                1
              </div>

              <div className="section-content">

                <h3>Your Name</h3>

                <input
                  type="text"
                  placeholder="আপনার নাম লিখুন"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

              </div>

            </div>

            {/* MOBILE */}

            <div className="account-section">

              <div className="section-number">
                2
              </div>

              <div className="section-content">

                <h3>Mobile Number</h3>

                <input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  inputMode="numeric"
                  maxLength={11}
                  value={mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    // First digit must be 0
                    if (
                      value.length >= 1 &&
                      value[0] !== "0"
                    ) {
                      return;
                    }

                    // Second digit must be 1
                    if (
                      value.length >= 2 &&
                      value.slice(0, 2) !== "01"
                    ) {
                      return;
                    }

                    // Maximum 11 digits
                    if (value.length <= 11) {
                      setMobile(value);
                    }
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

            {/* OTP */}

            {accountStep >= 2 && (
              <div className="account-section active-section">

                <div className="section-number">
                  3
                </div>

                <div className="section-content">

                  <h3>
                    OTP Verification
                  </h3>

                  <p className="section-note">
                    আপনার মোবাইলে পাঠানো OTP দিন
                  </p>

                  <input
                    type="text"
                    placeholder="Enter OTP"
                    inputMode="numeric"
                    maxLength="6"
                    value={otp}
                    onChange={(e) =>
                      setOtp(
                        e.target.value.replace(/\D/g, "")
                      )
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
                      ✓ Mobile number verified
                    </div>
                  )}

                </div>

              </div>
            )}

            {/* PASSWORD + ADDRESS */}

            {otpVerified && (
              <>
                <div className="account-section active-section">

                  <div className="section-number">
                    4
                  </div>

                  <div className="section-content">

                    <h3>Create Password</h3>

                    <input
                      type="password"
                      placeholder="Create password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                    />

                    <input
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target.value
                        )
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

                  <div className="section-number">
                    5
                  </div>

                  <div className="section-content">

                    <h3>
                      Delivery Address

                      <span className="optional-label">
                        Optional
                      </span>
                    </h3>

                    <p className="section-note">
                      এখন না দিলেও পরে order করার সময়
                      দিতে পারবেন।
                    </p>

                    <textarea
                      placeholder="আপনার delivery address লিখুন"
                      value={address}
                      onChange={(e) =>
                        setAddress(e.target.value)
                      }
                      rows="3"
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
                  📍 বর্তমানে শুধু {SERVICE_AREA}-এ
                  delivery দেওয়া হচ্ছে।
                </p>
              </>
            )}

            <div className="account-footer">

              <span>
                Already have an account?
              </span>

              <button
                type="button"
                onClick={openLogin}
              >
                Log In
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
