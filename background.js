chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.url.includes("youtube.com")) {
      chrome.tabs.sendMessage(tab.id, { action: "play" });
    } else {
      chrome.tabs.query({ url: "*://*.youtube.com/*" }, (tabs) => {
        tabs.forEach((youtubeTab) => {
          chrome.tabs.sendMessage(youtubeTab.id, { action: "pause" });
        });
      });
    }
  });
  
  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes("youtube.com") && changeInfo.status === "complete") {
      chrome.tabs.sendMessage(tabId, { action: "play" });
    }
  });

  