chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const video = document.querySelector("video");
    if (!video) return;

    if (request.action === "pause") {
        video.pause();
    } else if (request.action === "play") {
        video.play();
    }
});

// Pause video when tab is hidden or window loses focus
function pauseVideoIfPlaying() {
    const video = document.querySelector("video");
    if (video && !video.paused) {
        video.pause();
        console.log("🔴 Paused due to focus loss.");
    }
}

// Resume video when tab is visible or window gains focus
function playVideoIfPaused() {
    const video = document.querySelector("video");
    if (video && video.paused) {
        video.play();
        console.log("🟢 Resumed due to focus return.");
    }
}

// Detect focus loss
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        pauseVideoIfPlaying();
    } else if (document.visibilityState === "visible") {
        playVideoIfPaused();
    }
});

window.addEventListener("blur", pauseVideoIfPlaying);
window.addEventListener("focus", playVideoIfPaused);
