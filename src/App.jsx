import { useEffect, useState } from "react";

const gifts = [
  {
    id: 1,
    emoji: "🎂",
    title: "Open Cake",
    message: "Happy Birthday, my love! 🎂💕",
    detail: "I hope your day is as sweet and beautiful as you are.",
  },
  {
    id: 2,
    emoji: "💌",
    title: "Open Letter",
    message: "A little letter for you 💌",
    detail:
      "Thank you for being in my life. No matter where we are, you will always have a special place in my heart.",
  },
  {
    id: 3,
    emoji: "🎁",
    title: "Open Gift",
    message: "This one is just for you 🎁",
    detail:
      "You deserve all the happiness, love and good things in the world.",
  },
];

export default function App() {
  const [selectedGift, setSelectedGift] = useState(null);
  const [opened, setOpened] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = window.Telegram?.WebApp?.initDataUnsafe?.user;

    if (user?.first_name) {
      setUserName(user.first_name);
    }
  }, []);

  const haptic = () => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred("light");
  };

  const openGift = (gift) => {
    haptic();
    setSelectedGift(gift);
    setOpened(false);

    setTimeout(() => {
      setOpened(true);
    }, 400);
  };

  const closeGift = () => {
    haptic();
    setOpened(false);

    setTimeout(() => {
      setSelectedGift(null);
    }, 300);
  };

  return (
    <main className="page">
      <div className="floating-heart heart-1">♡</div>
      <div className="floating-heart heart-2">♡</div>
      <div className="floating-heart heart-3">♡</div>

      <section className="hero">
        <p className="small-text">
          A little something for you ♡
        </p>

        <h1>
          Happy Birthday
          <span>
            {userName ? `${userName} ♡` : "My Love ♡"}
          </span>
        </h1>

        <p className="subtitle">
          I prepared a few little gifts for you...
        </p>
      </section>

      <section className="gift-section">
        <h2>Choose your gift 🎀</h2>

        <div className="gifts">
          {gifts.map((gift) => (
            <button
              className="gift-card"
              key={gift.id}
              onClick={() => openGift(gift)}
            >
              <div className="gift-icon">
                {gift.emoji}
              </div>

              <span>{gift.title}</span>

              <div className="sparkle">
                ✦
              </div>
            </button>
          ))}
        </div>
      </section>

      <p className="bottom-message">
        Choose one... ♡
      </p>

      {selectedGift && (
        <div
          className={`overlay ${opened ? "show" : ""}`}
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
          >
            <button
              className="close"
              onClick={closeGift}
              aria-label="Close"
            >
              ×
            </button>

            <div className="modal-gift">
              {selectedGift.emoji}
            </div>

            <div className="heart">
              ♡
            </div>

            <h2>
              {selectedGift.message}
            </h2>

            <p>
              {selectedGift.detail}
            </p>

            <div className="divider">
              ♡ ♡ ♡
            </div>

            <button
              className="back-button"
              onClick={closeGift}
            >
              Back to gifts
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
