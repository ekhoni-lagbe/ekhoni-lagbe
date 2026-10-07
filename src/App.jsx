import { useState } from "react";

const SERVICE_AREA = "Kamrangirchar";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="app">
      {/* Header */}
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <span>🍃</span>
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

      {/* Main Welcome Section */}
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
              দৈনন্দিন প্রয়োজনীয় grocery পণ্য এখন সহজেই অর্ডার করুন।
              আমরা বর্তমানে শুধু <strong>{SERVICE_AREA}</strong> এলাকায়
              delivery দিচ্ছি।
            </p>

            <div className="location-notice">
              <span className="location-icon">📍</span>

              <div>
                <strong>Currently available in {SERVICE_AREA} only.</strong>
                <p>আপনার ঠিকানা এই এলাকার মধ্যে হলে অর্ডার করতে পারবেন।</p>
              </div>
            </div>

            <div className="actions">
              <button className="primary-button">
                Create Account
                <span>→</span>
              </button>

              <button className="secondary-button">
                Continue as Guest
              </button>
            </div>

            <div className="login-row">
              <span>Already have an account?</span>

              <button
                className="login-button"
                onClick={() => setShowLogin(true)}
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

              <div className="grocery-item item-one">🥬</div>
              <div className="grocery-item item-two">🥛</div>
              <div className="grocery-item item-three">🍎</div>
              <div className="grocery-item item-four">🥖</div>
              <div className="grocery-item item-five">🥕</div>

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

        {/* Bottom Benefits */}
        <section className="benefits">
          <div className="benefit">
            <span>⚡</span>
            <div>
              <strong>Fast Delivery</strong>
              <small>15-minute grocery delivery</small>
            </div>
          </div>

          <div className="benefit">
            <span>🛒</span>
            <div>
              <strong>Everyday Grocery</strong>
              <small>Your daily essentials in one place</small>
            </div>
          </div>

          <div className="benefit">
            <span>📍</span>
            <div>
              <strong>Kamrangirchar</strong>
              <small>Currently serving this area</small>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div>© {new Date().getFullYear()} EKHONI LAGBE</div>
        <div>15-Minute Delivery — Right to Your Hands</div>
      </footer>

      {/* Simple Login Modal */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div
            className="login-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setShowLogin(false)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="modal-logo">🍃</div>

            <h2>Welcome Back</h2>

            <p>Login to your EKHONI LAGBE account.</p>

            <input
              type="tel"
              placeholder="Mobile Number"
              inputMode="numeric"
            />

            <input type="password" placeholder="Password" />

            <button className="primary-button modal-login-button">
              Log In
            </button>

            <small className="modal-note">
              Account authentication will be connected later.
            </small>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
