# Random Auto Reloader

**Version:** 1.1
**Author:** \Maruf Hasan
**Browser:** Firefox

---

## Description

Random Auto Reloader is a lightweight browser extension that automatically reloads your active tab at either a **random interval** or a **fixed interval**. It is designed for convenience and flexibility, and it remembers your last-used settings across sessions.

---

## Features

- **Random Interval Reloading:** Reload pages at a random interval between a minimum and maximum number of seconds.
- **Fixed Interval Reloading:** Reload pages at a specific fixed interval.
- **Persistent Settings:** Saves your last-used interval values to auto-fill next time.
- **Badge Timer:** Displays a live countdown in **minutes\:seconds** format on the extension badge.
- **Easy Control:** Start or stop timers with one click.
- **Multi-Tab Support:** Each tab can have its own independent reload timer.

---

## Installation

### From GitHub (Developer Mode)

1. Clone or download this repository:

   ```bash
   git clone https://github.com/marufhasan-dev/auto-page-reloader.git
   ```

2. Open your browser (Firefox/Zen) and go to `about:debugging` → **This Firefox** → **Load Temporary Add-on**.
3. Select the `manifest.json` file from the cloned folder.
4. The extension will now appear in your toolbar.

> **Note:** Temporary add-ons are removed when the browser restarts. For permanent use, consider signing and uploading it to [Mozilla Add-ons](https://addons.mozilla.org/).

---

## Usage

1. Click the extension icon to open the popup.
2. Set your desired interval:

   - **Random Interval:** Enter min and max seconds.
   - **Fixed Interval:** Enter the fixed seconds.

3. Click **Start** to begin reloading.
4. Badge shows the countdown to next reload.
5. Click **Stop** to cancel the timer.
6. Last-used values are saved automatically and pre-filled next time.

---

## Permissions

- `tabs` — Reload the active tab.
- `storage` — Save your last-used settings.
- `activeTab` — Detect the active tab when starting the timer.

---

## Changelog

**v1.1**

- Added persistence of last-used interval values.
- Badge timer now shows minutes and seconds.

**v1.0**

- Initial release: random and fixed interval reloading with badge timer.

---

## Contributing

Contributions are welcome!

- Fork the repository.
- Create a new branch for your feature/fix.
- Submit a pull request with a clear description of your changes.

---

## License

MIT License © \Maruf Hasan
