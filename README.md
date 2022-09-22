# React-Mobile-Share

Provides an easy and simple way to share data (such as text, url and media) via mobile’s built-in share module.
It is based on [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share).

This works only with secure contexts (HTTPS).

## 💡 Features
- Lightweight
- Share text, url and image.
- Works on Android and iOS

## 🔧 Installation

```bash
npm i react-mobile-share    # npm
yarn add react-mobile-share # yarn
```

## 🖥️ Demo
[Try with CodeSandbox](https://codesandbox.io/s/react-mobile-share-example-r11kjs?file=/src/App.js)
[![Edit ReactTooltip](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/heuristic-curran-bddeu?fontsize=14&hidenavigation=1&theme=dark)

## 📱 Preview
![Android](https://raw.githubusercontent.com/encoresky/react-mobile-share/main/sample-android-share.png)&nbsp;&nbsp;&nbsp;
![iOS](https://raw.githubusercontent.com/encoresky/react-mobile-share/main/sample-ios-share.png)

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
