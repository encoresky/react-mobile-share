import { useState } from "react";
import { shareOnMobile } from "react-mobile-share";

// Tiny 1x1 PNG as base64 for demo (optional image in share)
const sampleImageBase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

export default function App() {
  const [message, setMessage] = useState<string | null>(null);

  const handleShare = (withImage: boolean) => {
    setMessage(null);

    shareOnMobile(
      {
        title: "React Mobile Share",
        text: "Check out react-mobile-share – easy native sharing on Android & iOS.",
        url: "https://www.npmjs.com/package/react-mobile-share",
        ...(withImage ? { images: [sampleImageBase64] } : {}),
      },
      (msg) => {
        setMessage(msg);
      }
    );
  };

  return (
    <div className="app">
      <h1>React Mobile Share</h1>
      <p>
        Use the buttons below to try the Web Share API. Works on HTTPS on
        supported mobile browsers (Android / iOS).
      </p>

      <section className="share-section">
        <h2>Share (title + text + URL)</h2>
        <button
          type="button"
          className="share-btn"
          onClick={() => handleShare(false)}
        >
          Share link
        </button>
      </section>

      <section className="share-section">
        <h2>Share with image</h2>
        <button
          type="button"
          className="share-btn"
          onClick={() => handleShare(true)}
        >
          Share with image
        </button>
      </section>

      {message && <div className="fallback-msg">{message}</div>}

      <p className="note">
        <strong>Note:</strong> On desktop or unsupported browsers you’ll see a
        fallback message. Test on a real device over HTTPS for the native share
        sheet.
      </p>
    </div>
  );
}
