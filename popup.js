async function getActiveTab() {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  return tabs && tabs[0];
}

function setStatus(text) {
  document.getElementById("status").textContent = text || "";
}

document.getElementById("start").addEventListener("click", async () => {
  const mode = document.querySelector('input[name="mode"]:checked').value;

  let min, max, fixed;
  if (mode === "random") {
    min = parseInt(document.getElementById("min").value, 10);
    max = parseInt(document.getElementById("max").value, 10);
    if (!min || !max || min <= 0 || max <= 0 || min > max) {
      setStatus("Enter valid min/max.");
      return;
    }
  } else {
    fixed = parseInt(document.getElementById("fixed").value, 10);
    if (!fixed || fixed <= 0) {
      setStatus("Enter valid fixed seconds.");
      return;
    }
  }

  const tab = await getActiveTab();
  if (!tab) {
    setStatus("No active tab found.");
    return;
  }

  try {
    await browser.runtime.sendMessage({
      action: "start",
      tabId: tab.id,
      mode,
      min,
      max,
      fixed,
    });
    window.close();
  } catch (err) {
    console.error(err);
    setStatus("Failed to start.");
  }
});

document.getElementById("stop").addEventListener("click", async () => {
  const tab = await getActiveTab();
  if (!tab) {
    setStatus("No active tab found.");
    return;
  }
  try {
    await browser.runtime.sendMessage({ action: "stop", tabId: tab.id });
    window.close();
  } catch (err) {
    console.error(err);
    setStatus("Failed to stop.");
  }
});
