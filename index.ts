/**
 * Converts a Base64-encoded data URL to a {@linkcode File} object.
 *
 * @param dataurl - A string representing the Base64-encoded data URL. The format should be `"data:[<MIME type>];base64,<data>"`.
 * @returns A {@linkcode File} object containing the image data if the input string is valid, or `undefined` if the input is invalid.
 *
 * @example
 * ```ts
 * const dataUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...";
 * const imageFile = dataURLtoFile(dataUrl);
 * if (imageFile) {
 *   console.log(imageFile.name); // "image.jpg"
 *   console.log(imageFile.type); // extracted MIME type (e.g., "image/png")
 * }
 * ```
 */
const mimeToExt: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/svg+xml": "svg",
}

const dataURLtoFile = (dataurl: string) => {
  if (!dataurl) {
    return
  }
  const arr = dataurl.split(",")
  const mimeMatch = arr[0].match(/:(.*?);/)
  if (!mimeMatch) return
  const mime = mimeMatch[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  const ext = mimeToExt[mime] ?? "jpg"
  return new File([u8arr], `image.${ext}`, { type: mime })
}

/**
 * Represents the structure for data intended to be shared across
 * various platforms using Web APIs.
 */
export interface Data {
  /**
   * The title of the content to be shared.
   * This field is mandatory and typically used as the primary label or
   * identifier of the shared content.
   */
  title: string

  /**
   * Optional text to accompany the shared content.
   * This could be a description or additional text not covered by the title.
   */
  text?: string

  /**
   * Optional URL to share. This could point to a webpage, a media file, or any
   * other online resource.
   */
  url?: string

  /**
   * An optional array of image URLs (in Base64 format or standard URLs)
   * intended to be included in the share.
   */
  images?: string[]
}

/**
 * Shares content on mobile devices using the
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API Web Share API}.
 * If the Web Share API is not available, a fallback function can be provided.
 *
 * @param data - The data to be shared, which includes a URL, a title, and an optional array of image URLs.
 * @param fallbackFunction - An optional fallback function to be called if sharing is not possible.
 *
 * @example
 * ```tsx
 * import React from "react"
 * import { shareOnMobile } from "react-mobile-share"
 *
 * const imgBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2..."
 *
 * const App = () => {
 *   return (
 *     <div>
 *       <button
 *         onClick={() =>
 *           shareOnMobile(
 *             {
 *               text: "Hey checkout our package react-mobile-share",
 *               url: "https://www.npmjs.com/package/react-mobile-share",
 *               title: "React-Mobile-Share",
 *               images: [imgBase64],
 *             },
 *             errorMessage => console.error("Share failed:", errorMessage),
 *           )
 *         }
 *       >
 *         Share
 *       </button>
 *     </div>
 *   )
 * }
 *
 * export default App
 * ```
 */
const shareOnMobile = (
  data: Data,
  fallbackFunction?: (message: string) => void
) => {
  const { url, title, images, text } = data

  if (navigator.share === undefined) {
    fallbackFunction?.(
      "Can't share on this, make sure you are running on Android or iOS devices"
    )
    console.error("error: navigator.share is not available")
    return
  }
  if (!title) {
    fallbackFunction?.("Title is required")
    console.error("error: title is required")
    return
  }

  const shareData: ShareData = { text, title }
  if (url) {
    shareData.url = url
  }
  if (Array.isArray(images)) {
    const files = images
      .map(image => dataURLtoFile(image))
      .filter((f): f is File => f != null)
    if (files.length > 0) {
      shareData.files = files
    }
  }
  try {
    const canShareFull =
      navigator.canShare && navigator.canShare(shareData)
    if (canShareFull) {
      navigator
        .share(shareData)
        .then(() => console.info("Shared successful."))
        .catch(error => {
          fallbackFunction?.(error.message)
          console.error("Sharing failed ..", error)
        })
      return
    }
    // On Safari/iOS, sharing files together with title/text/url often fails or
    // drops files. Try sharing only files so the image reaches the app.
    if (shareData.files?.length && navigator.canShare?.({ files: shareData.files })) {
      navigator
        .share({ files: shareData.files })
        .then(() => console.info("Shared successful (files only)."))
        .catch(error => {
          fallbackFunction?.(error.message)
          console.error("Sharing failed ..", error)
        })
      return
    }
    if (!canShareFull) {
      fallbackFunction?.(
        "This browser or share target may not support sharing with files. For apps like Slack/Skype, share an image URL instead of a base64 image."
      )
    }
  } catch (error) {
    if (error instanceof Error) {
      fallbackFunction?.(error.message)
    }
    console.error("error: ", error)
  }
}

export { shareOnMobile }
