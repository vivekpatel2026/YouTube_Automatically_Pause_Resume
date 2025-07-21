chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const video = document.querySelector("video");
    if (!video) return;
  
    if (request.action === "pause") {
      video.pause();
    } else if (request.action === "play") {
      video.play();
    }
  });

  