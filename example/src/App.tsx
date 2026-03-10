import { useState } from "react";
import { shareOnMobile } from "react-mobile-share";

// Tiny 1x1 PNG as base64 for demo (optional image in share)
const sampleImageBase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

export default function App() {
  const [message, setMessage] = useState<string | null>(null);

  const handleShare = (mode: "link" | "base64" | "imageUrl") => {
    setMessage(null);

    if (mode === "imageUrl") {
      // For Slack/Skype: share a public image URL so they can show a preview
      shareOnMobile(
        {
          title: "React Mobile Share",
          text: "Check out react-mobile-share – easy native sharing.",
          url: "https://raw.githubusercontent.com/encoresky/react-mobile-share/main/sample-android-share.png",
        },
        (msg) => setMessage(msg)
      );
      return;
    }

    shareOnMobile(
      {
        title: "React Mobile Share",
        text: "Check out react-mobile-share – easy native sharing on Android & iOS.",
        url: "https://www.npmjs.com/package/react-mobile-share",
        ...(mode === "base64" ? { images: [sampleImageBase64] } : {}),
      },
      (msg) => setMessage(msg)
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
          onClick={() => handleShare("link")}
        >
          Share link
        </button>
      </section>

      <section className="share-section">
        <h2>Share with image (base64)</h2>
        <button
          type="button"
          className="share-btn"
          onClick={() => handleShare("base64")}
        >
          Share with image
        </button>
        <p className="share-hint">
          Apps like Slack or Skype often only receive title/text/URL, not the
          image file. For those apps, share an image <em>URL</em> instead.
        </p>
      </section>

      <section className="share-section">
        <h2>Share with image URL (best for Slack/Skype)</h2>
        <p className="share-hint">
          In your app: host the image and pass its URL in <code>url</code> or{" "}
          <code>text</code>. Slack/Skype will show a preview of the link.
        </p>
        <button
          type="button"
          className="share-btn"
          onClick={() => handleShare("imageUrl")}
        >
          Share with image URL
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
