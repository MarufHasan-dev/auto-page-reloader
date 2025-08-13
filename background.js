const timers = {};

function getRandomDelayMs(minSec, maxSec) {
  return (Math.floor(Math.random() * (maxSec - minSec + 1)) + minSec) * 1000;
}

function formatTime(secTotal) {
  const m = Math.floor(secTotal / 60);
  const s = secTotal % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function updateBadgeForTab(tabId) {
  const t = timers[tabId];
  if (!t) return;
  const remainingMs = Math.max(0, t.nextFire - Date.now());
  const sec = Math.ceil(remainingMs / 1000);
  browser.browserAction
    .setBadgeText({ text: formatTime(sec), tabId })
    .catch(() => {});
  browser.browserAction
    .setBadgeBackgroundColor({ color: [200, 50, 50, 255], tabId })
    .catch(() => {});
}

function clearBadgeForTab(tabId) {
  browser.browserAction.setBadgeText({ text: "", tabId }).catch(() => {});
}

function scheduleReload(tabId, delayMs, modeData) {
  if (timers[tabId]) {
    clearTimeout(timers[tabId].timeoutId);
    clearInterval(timers[tabId].intervalId);
  }

  const nextFire = Date.now() + delayMs;

  const timeoutId = setTimeout(async () => {
    try {
      await browser.tabs.reload(tabId);
    } catch {
      stopTimer(tabId);
      return;
    }
    if (modeData.mode === "random") {
      scheduleReload(
        tabId,
        getRandomDelayMs(modeData.min, modeData.max),
        modeData
      );
    } else {
      scheduleReload(tabId, modeData.fixed * 1000, modeData);
    }
  }, delayMs);

  const intervalId = setInterval(() => updateBadgeForTab(tabId), 1000);
  timers[tabId] = { timeoutId, intervalId, nextFire, ...modeData };
  updateBadgeForTab(tabId);
}

function startTimer(tabId, mode, min, max, fixed) {
  // Save the last used values to storage
  browser.storage.local.set({
    minSeconds: min,
    maxSeconds: max,
    fixedSeconds: fixed,
  });

  if (mode === "random") {
    scheduleReload(tabId, getRandomDelayMs(min, max), { mode, min, max });
  } else {
    scheduleReload(tabId, fixed * 1000, { mode, fixed });
  }
}

function stopTimer(tabId) {
  const t = timers[tabId];
  if (!t) return;
  clearTimeout(t.timeoutId);
  clearInterval(t.intervalId);
  delete timers[tabId];
  clearBadgeForTab(tabId);
}

browser.tabs.onRemoved.addListener((closedTabId) => stopTimer(closedTabId));

browser.runtime.onMessage.addListener((message, sender) => {
  if (!message || !message.action) return;

  if (message.action === "start") {
    const tabId = sender.tab ? sender.tab.id : message.tabId;
    startTimer(tabId, message.mode, message.min, message.max, message.fixed);
    return Promise.resolve({ started: true });
  }

  if (message.action === "stop") {
    const tabId = sender.tab ? sender.tab.id : message.tabId;
    stopTimer(tabId);
    return Promise.resolve({ stopped: true });
  }
});
