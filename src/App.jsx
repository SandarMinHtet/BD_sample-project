import { useEffect, useState } from "react";

const gifts = [
  {
    id: "cake",
    icon: "🎂",
    title: "A little cake",
    subtitle: "Make a wish...",
  },
  {
    id: "letter",
    icon: "💌",
    title: "A little letter",
    subtitle: "Open when you're ready",
  },
  {
    id: "memories",
    icon: "📸",
    title: "Our memories",
    subtitle: "Little moments ♡",
  },
  {
    id: "gift",
    icon: "🎁",
    title: "One more thing",
    subtitle: "There's a surprise...",
  },
];

const letterPages = [
  {
    title: "To my favorite person ♡",
    text: "Happy birthday, baby. I wanted to make you something a little different this year.",
  },
  {
    title: "A little thank you",
    text: "Thank you for all the little things you do, for the moments that make me smile, and for simply being you.",
  },
  {
    title: "One wish for you",
    text: "I hope this year brings you more happiness, more beautiful memories, and everything your heart has been wishing for.",
  },
  {
    title: "And finally...",
    text: "No matter how far apart we are, I hope you always remember that there is someone here who is cheering for you and loving you. ♡",
  },
];

function Confetti() {
  return (
    <div className="confetti-container" aria-hidden="true">
      {Array.from({ length: 45 }).map((_, index) => (
        <span
          key={index}
          className="confetti"
          style={{
            "--x": `${Math.random() * 100}%`,
            "--delay": `${Math.random() * 1.5}s`,
            "--duration": `${2.5 + Math.random() * 2}s`,
            "--rotation": `${Math.random() * 360}deg`,
          }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [selectedGift, setSelectedGift] = useState(null);
  const [letterPage, setLetterPage] = useState(0);
  const [candles, setCandles] = useState([true, true, true]);
  const [celebrating, setCelebrating] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const telegram = window.Telegram?.WebApp;

    telegram?.ready();
    telegram?.expand();

    const user = telegram?.initDataUnsafe?.user;

    if (user?.first_name) {
      setUserName(user.first_name);
    }
  }, []);

  const haptic = (type = "light") => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred(type);
  };

  const startExperience = () => {
    haptic("medium");
    setScreen("birthday");
  };

  const openGift = (gift) => {
    haptic("light");
    setSelectedGift(gift.id);

    if (gift.id === "cake") {
      setCandles([true, true, true]);
    }

    if (gift.id === "letter") {
      setLetterPage(0);
    }

    if (gift.id === "gift") {
      setCelebrating(false);
    }

    setScreen("gift");
  };

  const closeGift = () => {
    haptic();
    setScreen("birthday");
    setSelectedGift(null);
  };

  const blowCandle = (index) => {
    haptic("medium");

    setCandles((current) => {
      const next = [...current];
      next[index] = false;

      if (next.every((candle) => !candle)) {
        setTimeout(() => {
          setCelebrating(true);
        }, 400);
      }

      return next;
    });
  };

  const nextLetter = () => {
    haptic();

    if (letterPage < letterPages.length - 1) {
      setLetterPage((page) => page + 1);
    } else {
      setCelebrating(true);

      setTimeout(() => {
        setCelebrating(false);
      }, 4000);
    }
  };

  const toggleMusic = () => {
    haptic();
    setMusicPlaying((current) => !current);
  };

  return (
    <main className="app">
      <div className="background-pattern" />

      <div className="floating-decoration decoration-one">♡</div>
      <div className="floating-decoration decoration-two">✦</div>
      <div className="floating-decoration decoration-three">♡</div>
      <div className="floating-decoration decoration-four">✧</div>

      {celebrating && <Confetti />}

      {/* MUSIC BUTTON */}
      <button
        className={`music-button ${musicPlaying ? "playing" : ""}`}
        onClick={toggleMusic}
        aria-label="Music"
      >
        {musicPlaying ? "♫" : "♪"}
      </button>

      {/* WELCOME SCREEN */}
      {screen === "welcome" && (
        <section className="screen welcome-screen">
          <div className="welcome-content">
            <div className="tiny-bow">🎀</div>

            <p className="eyebrow">A little surprise for you</p>

            <div className="envelope">
              <div className="envelope-heart">♡</div>
            </div>

            <h1 className="welcome-title">
              I made something
              <span>just for you ♡</span>
            </h1>

            <p className="welcome-description">
              Take a little moment.
              <br />
              There's something waiting for you inside.
            </p>

            <button className="primary-button" onClick={startExperience}>
              <span>Open your surprise</span>
              <span>♡</span>
            </button>

            <p className="tiny-note">made with love ✿</p>
          </div>
        </section>
      )}

      {/* BIRTHDAY HOME */}
      {screen === "birthday" && (
        <section className="screen birthday-screen">
          <div className="top-badge">🎀 for you</div>

          <p className="eyebrow">Today is a special day</p>

          <h1 className="birthday-title">
            Happy Birthday
            <span>{userName ? `${userName} ♡` : "My Love ♡"}</span>
          </h1>

          <p className="birthday-subtitle">
            I prepared a few little things for you...
          </p>

          <div className="cake-decoration">
            <div className="cake-shadow" />
            <div className="cake">
              <div className="candle-small" />
              <div className="cake-top">♡</div>
              <div className="cake-body" />
              <div className="cake-plate" />
            </div>
          </div>

          <div className="gift-heading">
            <span>✦</span>
            <h2>Choose a little gift</h2>
            <span>✦</span>
          </div>

          <div className="gift-grid">
            {gifts.map((gift) => (
              <button
                key={gift.id}
                className="gift-card"
                onClick={() => openGift(gift)}
              >
                <div className="gift-card-icon">{gift.icon}</div>

                <div className="gift-card-text">
                  <strong>{gift.title}</strong>
                  <small>{gift.subtitle}</small>
                </div>

                <span className="gift-arrow">›</span>
              </button>
            ))}
          </div>

          <p className="bottom-love">Choose whichever one you like ♡</p>
        </section>
      )}

      {/* GIFT SCREEN */}
      {screen === "gift" && selectedGift === "cake" && (
        <section className="screen gift-screen">
          <button className="back-button" onClick={closeGift}>
            ← back
          </button>

          <div className="gift-content cake-content">
            <p className="eyebrow">A little birthday tradition</p>

            <h1 className="gift-title">
              Make a wish
              <span>just for you ♡</span>
            </h1>

            <p className="gift-description">
              Tap each candle to blow it out.
              <br />
              Don't forget to make a wish.
            </p>

            <div className="big-cake">
              <div className="candles">
                {candles.map((lit, index) => (
                  <button
                    key={index}
                    className={`candle ${lit ? "lit" : "out"}`}
                    onClick={() => lit && blowCandle(index)}
                  >
                    {lit && <span className="flame">🔥</span>}
                    <span className="candle-stick" />
                  </button>
                ))}
              </div>

              <div className="cake-frosting">
                <span>♡</span>
                <span>♡</span>
                <span>♡</span>
              </div>

              <div className="cake-layer cake-layer-top" />
              <div className="cake-layer cake-layer-bottom" />
              <div className="cake-plate-big" />
            </div>

            {candles.every((candle) => !candle) && (
              <div className="wish-message">
                <span>✨</span>
                <strong>Make your wish! ♡</strong>
                <span>✨</span>
              </div>
            )}

            <p className="tap-hint">
              {candles.some((candle) => candle)
                ? "tap the flames ♡"
                : "your wish has been made ✨"}
            </p>
          </div>
        </section>
      )}

      {/* LETTER */}
      {screen === "gift" && selectedGift === "letter" && (
        <section className="screen gift-screen">
          <button className="back-button" onClick={closeGift}>
            ← back
          </button>

          <div className="gift-content letter-content">
            <p className="eyebrow">Something I wanted to tell you</p>

            <div className="letter-paper">
              <div className="letter-stamp">♡</div>

              <p className="letter-small">a little letter</p>

              <h1>{letterPages[letterPage].title}</h1>

              <div className="letter-line" />

              <p className="letter-text">
                {letterPages[letterPage].text}
              </p>

              <div className="letter-signature">
                with love,
                <br />
                <span>♡</span>
              </div>

              <div className="letter-page-number">
                {letterPage + 1} / {letterPages.length}
              </div>
            </div>

            <button className="primary-button letter-button" onClick={nextLetter}>
              {letterPage === letterPages.length - 1
                ? "I have one more surprise"
                : "Keep reading ♡"}
            </button>
          </div>
        </section>
      )}

      {/* MEMORIES */}
      {screen === "gift" && selectedGift === "memories" && (
        <section className="screen gift-screen">
          <button className="back-button" onClick={closeGift}>
            ← back
          </button>

          <div className="gift-content memories-content">
            <p className="eyebrow">Little moments</p>

            <h1 className="gift-title">
              Our memories
              <span>the ones I keep ♡</span>
            </h1>

            <p className="gift-description">
              Some moments are small,
              <br />
              but they become the ones we remember.
            </p>

            <div className="memory-grid">
              <div className="memory-photo photo-one">
                <span>📸</span>
                <small>one little moment</small>
              </div>

              <div className="memory-photo photo-two">
                <span>💕</span>
                <small>favorite feeling</small>
              </div>

              <div className="memory-photo photo-three">
                <span>🌷</span>
                <small>a beautiful day</small>
              </div>

              <div className="memory-photo photo-four">
                <span>✨</span>
                <small>another memory</small>
              </div>
            </div>

            <p className="memory-note">
              Replace these with your favorite photos later ♡
            </p>
          </div>
        </section>
      )}

      {/* FINAL GIFT */}
      {screen === "gift" && selectedGift === "gift" && (
        <section className="screen gift-screen final-screen">
          <button className="back-button" onClick={closeGift}>
            ← back
          </button>

          <div className="gift-content">
            <p className="eyebrow">You found the last one...</p>

            <div className="big-present">
              <div className="present-lid">
                <span />
              </div>

              <div className="present-box">
                <div className="ribbon-vertical" />
                <div className="ribbon-horizontal" />
              </div>

              <div className="present-bow">
                <span className="bow-left" />
                <span className="bow-right" />
                <span className="bow-center" />
              </div>
            </div>

            {!celebrating ? (
              <>
                <h1 className="gift-title">
                  One last thing...
                  <span>open your heart ♡</span>
                </h1>

                <p className="gift-description">
                  You thought that was everything?
                  <br />
                  Not quite.
                </p>

                <button
                  className="primary-button"
                  onClick={() => {
                    haptic("heavy");
                    setCelebrating(true);
                  }}
                >
                  Open the surprise 🎁
                </button>
              </>
            ) : (
              <div className="final-message">
                <div className="final-hearts">♡ ♥ ♡</div>

                <h1>
                  Happy Birthday
                  <span>my favorite person ♡</span>
                </h1>

                <p>
                  I hope this little corner of the internet
                  <br />
                  made you smile today.
                </p>

                <strong>
                  You deserve all the beautiful things. ♡
                </strong>

                <div className="final-sparkles">✦ ✧ ✦</div>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
