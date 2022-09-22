const { dataURLtoFile } = require("./url-to-file");

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
    fallback?.(error.message)
    console.error("error: ", error);
  }
};
