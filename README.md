# React-Mobile-Share

Provides an easy and simple way to share data (such as text, url and media) via mobile’s build-in share module.
It is based on [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share).

## Features
- Lightweight
- Share text, url and image.
- Works on Android and iOS

## 🔧 Installation

```bash
npm i react-mobile-share    # npm
yarn add react-mobile-share # yarn
```

## Preview

### Mobile

![1660745435905.JPEG](README%20md%206a99d203d22b4251a55f21e69d585cc2/1660745435905.jpeg)

Mobile Preview

## 📦 Usage

```tsx
import React from "react";
import { shareOnMobile } from 'react-mobile-share';

const imgBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2..."

const App = () =>{
  return (
    <div>
      <button
        onClick={() =>
          shareOnMobile({
            text: "Hey checkout our package react-mobile-share",
            url: "https://www.npmjs.com/package/react-mobile-share",
            title: "React-Mobile-Share",
            image : imgBase64,	
          })
        }
      >
        Share
      </button>
    </div>
  );
}

export default App;
```

## 👀 Props



## 📜 License

MIT © encoresky
