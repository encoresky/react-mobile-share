# React-Mobile-Share

Provides an easy and simple way to share data (such as text, url and media) via mobile’s built-in share module.
It is based on [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share).

This works only with secure contexts (HTTPS).

## 💡 Features

- Lightweight
- Share text, url and images
- Works on Android and iOS

## 🔧 Installation

```bash
npm i react-mobile-share    # npm
yarn add react-mobile-share # yarn
```

## 🖥️ Demo

[![Try with CodeSandbox](https://img.shields.io/badge/Edit%20with%20CodeSandBox-000000?style=for-the-badge&logo=codesandbox&logoColor=white)](https://codesandbox.io/s/react-mobile-share-example-r11kjs?file=/src/App.js)

## 📱 Preview

![Android](https://raw.githubusercontent.com/encoresky/react-mobile-share/main/sample-android-share.png)&nbsp;&nbsp;&nbsp;
![iOS](https://raw.githubusercontent.com/encoresky/react-mobile-share/main/sample-ios-share.png)

## 📦 Usage

```tsx
import { shareOnMobile } from "react-mobile-share";

const imgBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2...";

const App = () => {
  return (
    <div>
      <button
        onClick={() =>
          shareOnMobile({
            text: "Hey checkout our package react-mobile-share",
            url: "https://www.npmjs.com/package/react-mobile-share",
            title: "React-Mobile-Share",
            images: [imgBase64],
          })
        }
      >
        Share
      </button>
    </div>
  );
};

export default App;
```

## 👀 API References

#### Functions

```
  shareOnMobile(data, fallbackFn)
```

Takes the following parameters:

| Parameter    | Type       | Description                   |
| :----------- | :--------- | :---------------------------- |
| `data`       | `object`   | **Required**                  |
| `fallbackFn` | `function` | **Options**: return a message |

#### Data Object (1st Parameter)

```
{
    text: "Hey checkout our package react-mobile-share",
    url: "https://www.npmjs.com/package/react-mobile-share",
    title: "React-Mobile-Share",
    images: [imgBase64],
}
```

Object must contain the following fields:
| Field | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `title` | `string` | **Required**. Must have a title.|
| `text` | `string` | **Optional**. Add a description. |
| `url` | `string` | **Optional**. Any valid url. |
| `images` | `array` | **Optional**. Should be a valid array of base64 strings. |

#### Fallback Function (2nd Parameter)

```
function(message) {
    console.log("fallback", message)
}
```

This will invoked when any failure occurs.

## ⚠️ Image sharing and apps like Slack/Skype

When you share **images as base64** (via the `images` array), the Web Share API sends them as **files**. Whether the image is received depends on the **share target** (the app you pick, e.g. Slack, Skype, Mail, Messages):

- **Many desktop/web apps (e.g. Slack, Skype)** only accept **title, text, and URL** from the share. They often **do not** receive or show the shared **files**. So the image may not appear when you share to those apps.
- **Native mobile apps** (e.g. Mail, Messages, some social apps) are more likely to accept and show shared files.

**Workaround so the image appears in Slack/Skype:**  
Host the image on your server or a CDN and share its **URL** instead of base64. Put the image URL in `url` (or in `text`). Those apps will then show a preview/link for that URL.

```tsx
// ✅ For Slack/Skype: share an image URL so they can show a preview
shareOnMobile({
  title: "React Mobile Share",
  text: "Check out this image",
  url: "https://yourserver.com/path/to/image.png",  // public URL to the image
});
```

If you must use base64 (e.g. image is only in memory), you can first upload it to your backend or a service (e.g. imgur, your API), get back a URL, then share that URL with `shareOnMobile`.

On **Safari/iOS**, sharing **files together with** title/text/url is often not supported. The library will fall back to sharing **only the image file** when the full payload is not shareable, so the image may still reach the share sheet; some apps will then receive only the file (no title/text/url).

## 📜 License

[MIT](https://github.com/encoresky/react-mobile-share/blob/main/LICENSE)



## 🤝🏼 Contributions

We welcome pull requests! Explore open issues to find opportunities to contribute or open a new issue to share your ideas or report bugs—your help improves this library

[Contribution Guidelines](https://github.com/encoresky/react-mobile-share/blob/main/CONTRIBUTION.md)


