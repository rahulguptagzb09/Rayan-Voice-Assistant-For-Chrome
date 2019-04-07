chrome.runtime.onInstalled.addListener(function(details) {
	// Only show the page on first install.
	if(details.reason === "install") {
		chrome.tabs.create({ url: chrome.extension.getURL("help.html") });
		chrome.tabs.create({ url: chrome.extension.getURL("permission.html")});
	}
	else if(details.reason == "update"){
		chrome.tabs.create({ url: chrome.extension.getURL("help.html") });
		chrome.tabs.create({ url: chrome.extension.getURL("permission.html") });
	 }
});
