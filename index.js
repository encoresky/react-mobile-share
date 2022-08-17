
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

exports.shareOnMobile = async function ({ url, title, image }) {
  if (navigator.share === undefined) {
    console.error("error: navigator.share is not available");
    return;
  }
  if (!title) {
    console.error("error: title is requied");
    return;
  }

  var shareData = { text: "" };
  if (title) {
    shareData.title = title;
  }
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
    await navigator.share(shareData);
  } catch (error) {
    console.error("error: ", error);
  }
};
