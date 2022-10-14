const dataURLtoFile = (dataurl) => {
  if (!dataurl) {
    return;
  }
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], "image.jpg", { type: mime });
};

exports.shareOnMobile = (params, fallback) => {
  const { url, title, image } = params

  if (navigator.share === undefined) {
    fallback?.("Can't share on this, make sure you are running on Android or iOS devices")
    console.error("error: navigator.share is not available");
    return;
  }
  if (!title) {
    fallback?.("Title is required")
    console.error("error: title is requied");
    return;
  }

  var shareData = { text: title, title };
  if (url) {
    shareData.url = url;
  }
  if (image) {
    var file = dataURLtoFile(image);
    if (file) {
      shareData.files = [file];
    }
  }
  try {
    if (navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData)
        .then(() => console.info('Shared successful.'))
        .catch((error) => {
          fallback?.(error.message)
          console.error('Sharing failed', error);
        });
    }
  } catch (error) {
    console.error("error: ", error);
  }
};
