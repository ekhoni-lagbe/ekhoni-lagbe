import { useState } from "react";
import CustomerHome from "./CustomerHome";

const SERVICE_AREA = "Kamrangirchar";

function App() {
  const [guideOpen, setGuideOpen] = useState(false);

  const handleHomeNavigate = (destination) => {
    if (destination === "guide") {
      setGuideOpen(true);
    }
  };

  return (
    <>
      {/* CustomerHome is the single owner of shopping, cart, account and orders state.
          Keep it mounted while the Information Guide is open so customer activity is preserved. */}
      <div style={{ display: guideOpen ? "none" : "block" }}>
        <CustomerHome onNavigate={handleHomeNavigate} />
      </div>

      {guideOpen && (
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
              padding: 24,
              background: "#fff",
              border: "1px solid #e2ece5",
              borderRadius: 20,
            }}
          >
            <button
              type="button"
              onClick={() => setGuideOpen(false)}
              style={{
                border: 0,
                background: "transparent",
                color: "#166534",
                fontWeight: 800,
                padding: "8px 0 20px",
                cursor: "pointer",
              }}
            >
              ← Back to Home
            </button>

            <h1 style={{ color: "#14532d", fontSize: 26 }}>
              Information Guide
            </h1>
            <p style={{ marginTop: 12, color: "#718076", lineHeight: 1.7 }}>
              EKHONI LAGBE বর্তমানে {SERVICE_AREA}-এ grocery delivery service
              প্রস্তুত করছে। Delivery availability, charge, payment, order
              cancellation এবং return/refund-এর চূড়ান্ত নিয়ম চালু হওয়ার আগে
              এখানে প্রকাশ করা হবে।
            </p>
            <p style={{ color: "#718076", lineHeight: 1.7 }}>
              কোনো order বা payment সমস্যা হলে official support channel চালু
              হওয়ার পর সেখান থেকে সহায়তা নেওয়া যাবে।
            </p>
          </div>
        </main>
      )}
    </>
  );
}

export default App;
