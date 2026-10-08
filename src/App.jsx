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

  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // -----------------------------
  // PAGE NAVIGATION
  // -----------------------------

  const openCreateAccount = () => {
    setPage("create-account");
    setAccountStep(1);
    setOtpVerified(false);

    setNameError("");
    setMobileError("");
    setOtpError("");
    setPasswordError("");
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

  // -----------------------------
  // SEND OTP
  // -----------------------------

  const handleSendOtp = () => {
    setNameError("");
    setMobileError("");

    if (!name.trim()) {
      setNameError("Please enter your name.");
      return;
    }

    if (!/^01\d{9}$/.test(mobile)) {
      setMobileError(
        "Please enter a valid 11-digit Bangladesh mobile number."
      );
      return;
    }

    setAccountStep(2);
  };

  // -----------------------------
  // VERIFY OTP
  // -----------------------------

  const handleVerifyOtp = () => {
    setOtpError("");

    if (otp.length < 4) {
      setOtpError("Please enter the OTP.");
      return;
    }

    setOtpVerified(true);
    setAccountStep(3);
  };

  // -----------------------------
  // CREATE ACCOUNT
  // -----------------------------

  const handleCreateAccount = () => {
    setPasswordError("");

    if (!password) {
      setPasswordError("Please create a password.");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    alert("Account created successfully!");

    setPage("welcome");
    setAccountStep(1);
    setOtpVerified(false);

    setName("");
    setMobile("");
    setOtp("");
    setPassword("");
    setConfirmPassword("");
    setAddress("");

    setNameError("");
    setMobileError("");
    setOtpError("");
    setPasswordError("");
  };

  // -----------------------------
  // WELCOME PAGE
  // -----------------------------

  if (page === "welcome") {
    return (
      <div className="app">
        <section className="hero-section">
          <div className="hero-content">

            <div className="brand-area">
              <img
                src="/logo.png"
                alt="EKHONI LAGBE"
                className="main-logo"
              />

              <h1 className="brand-title">এখনই লাগবে</h1>

              <p className="brand-english">
                EKHONI LAGBE
              </p>
            </div>

            <div className="service-badge">
              <span>📍</span>
              Currently serving {SERVICE_AREA} only
            </div>

            <h2 className="hero-title">
              Your Groceries.
              <br />
              Delivered in 15 Minutes.
            </h2>

            <p className="hero-subtitle">
              Daily groceries delivered quickly,
              easily and right to your hands.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="create-account-main-button"
                onClick={openCreateAccount}
              >
                Create Account
              </button>

              <button
                type="button"
                className="guest-button"
                onClick={() => alert("Guest shopping will be available soon.")}
              >
                Continue as Guest
              </button>

              <button
                type="button"
                className="login-link-button"
                onClick={openLogin}
              >
                Already have an account? <strong>Login</strong>
              </button>
            </div>

            <div className="grocery-visual">
              <div className="grocery-card">
                <span>🥬</span>
                <span>🍅</span>
                <span>🥛</span>
                <span>🍞</span>
                <span>🍎</span>
                <span>🥚</span>
              </div>
            </div>

            <div className="benefits-row">
              <div className="benefit-item">
                <strong>15 Min</strong>
                <span>Fast Delivery</span>
              </div>

              <div className="benefit-item">
                <strong>Fresh</strong>
                <span>Quality Groceries</span>
              </div>

              <div className="benefit-item">
                <strong>Easy</strong>
                <span>Simple Ordering</span>
              </div>
            </div>

            <p className="hero-footer">
              15-Minute Delivery — Right to Your Hands
            </p>

          </div>
        </section>
      </div>
    );
  }

  // -----------------------------
  // CREATE ACCOUNT PAGE
  // -----------------------------

  if (page === "create-account") {
    return (
      <div className="app">

        <div className="account-page">

          <div className="account-card">

            <button
              type="button"
              className="account-close-button"
              onClick={closeCreateAccount}
              aria-label="Close"
            >
              ×
            </button>

            <div className="account-header">

              <img
                src="/logo.png"
                alt="EKHONI LAGBE"
                className="account-logo"
              />

              <h1>Create Your Account</h1>

              <p>
                Join EKHONI LAGBE and get your groceries
                delivered in just 15 minutes.
              </p>

              <div className="account-service-note">
                📍 Delivery currently available in{" "}
                <strong>{SERVICE_AREA}</strong> only
              </div>

            </div>

            {/* NAME */}

            <div className="account-section">

              <div className="section-number">
                1
              </div>

              <div className="section-content">

                <h3>Name</h3>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                />

                {nameError && (
                  <p className="error-message">
                    {nameError}
                  </p>
                )}

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

                    let value = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 11);

                    /*
                     * Bangladesh mobile numbers must begin with 01.
                     * Keep the field easy to type without allowing
                     * invalid prefixes.
                     */

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
                    setMobileError("");
                  }}
                />

                <div className="input-hint">
                  Enter an 11-digit number starting with 01
                </div>

                {mobileError && (
                  <p className="error-message">
                    {mobileError}
                  </p>
                )}

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
              <div className="account-section">

                <div className="section-number">
                  3
                </div>

                <div className="section-content">

                  <h3>OTP Verification</h3>

                  <p className="section-description">
                    Enter the verification code sent to your mobile number.
                  </p>

                  <input
                    type="tel"
                    placeholder="Enter OTP"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6);

                      setOtp(value);
                      setOtpError("");
                    }}
                  />

                  {otpError && (
                    <p className="error-message">
                      {otpError}
                    </p>
                  )}

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
                    <div className="success-message">
                      ✓ Mobile number verified
                    </div>
                  )}

                </div>

              </div>
            )}

            {/* PASSWORD + ADDRESS */}

            {otpVerified && (
              <>
                <div className="account-section">

                  <div className="section-number">
                    4
                  </div>

                  <div className="section-content">

                    <h3>Password</h3>

                    <input
                      type="password"
                      placeholder="Create password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError("");
                      }}
                    />

                    <input
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setPasswordError("");
                      }}
                    />

                    {passwordError && (
                      <p className="error-message">
                        {passwordError}
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

                    <textarea
                      placeholder="Enter your delivery address"
                      rows="3"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />

                    <div className="input-hint">
                      You can add or change your address later.
                    </div>

                  </div>

                </div>

                <button
                  type="button"
                  className="account-action create-account-final-button"
                  onClick={handleCreateAccount}
                >
                  Create Account
                </button>
              </>
            )}

            <div className="account-bottom-note">
              By creating an account, you agree to use
              EKHONI LAGBE according to our service rules.
            </div>

          </div>

        </div>

      </div>
    );
  }

  // -----------------------------
  // LOGIN PAGE
  // -----------------------------

  if (page === "login") {
    return (
      <div className="app">

        <div className="account-page">

          <div className="account-card login-card">

            <button
              type="button"
              className="account-close-button"
              onClick={closeLogin}
              aria-label="Close"
            >
              ×
            </button>

            <div className="account-header">

              <img
                src="/logo.png"
                alt="EKHONI LAGBE"
                className="account-logo"
              />

              <h1>Welcome Back</h1>

              <p>
                Login to continue shopping with
                EKHONI LAGBE.
              </p>

            </div>

            <div className="account-section">

              <div className="section-number">
                1
              </div>

              <div className="section-content">

                <h3>Mobile Number</h3>

                <input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  inputMode="numeric"
                  maxLength={11}
                />

              </div>

            </div>

            <div className="account-section">

              <div className="section-number">
                2
              </div>

              <div className="section-content">

                <h3>Password</h3>

                <input
                  type="password"
                  placeholder="Enter your password"
                />

              </div>

            </div>

            <button
              type="button"
              className="account-action"
              onClick={() =>
                alert("Login system will be connected with Firebase later.")
              }
            >
              Login
            </button>

            <button
              type="button"
              className="back-to-account-button"
              onClick={openCreateAccount}
            >
              Create a new account
            </button>

            <div className="account-bottom-note">
              Guest shopping is also available without an account.
            </div>

          </div>

        </div>

      </div>
    );
  }

  return null;
}

export default App;
