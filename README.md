# WhatsApp Clone (Frontend Only)

A lightweight, responsive WhatsApp-style messaging interface built with vanilla HTML, CSS, and JavaScript. The app runs entirely on the client, stores chat history in `localStorage`, and can be deployed to any static host such as [Render Static Sites](https://render.com/docs/static-sites).

## Features

- 📱 **Responsive layout** that adapts from desktop to mobile sizes.
- 💬 **Dynamic chat list** with search, starring, and archiving capabilities.
- 🗂️ **Sidebar filters** to flip between all, starred, and archived chats with live counts.
- 🧠 **In-memory + localStorage persistence** so conversations survive page reloads (per browser).
- ✍️ **Message composer** supporting multiline input and keyboard shortcuts (`Enter` to send, `Ctrl/Cmd + K` to focus search).
- 📎 **Rich attachments** covering images, video, audio, and documents with inline previews and playback.
- 🔔 **Toast notifications** for key actions.
- 🟢 **Unread badges & manual toggles** to surface new activity and mark chats for follow-up.
- ⏱️ **Friendly timestamps & previews** that keep recent conversations surfaced.
- ✔️ **Message receipts** that auto-progress from sent → delivered → read.
- 📝 **Per-chat drafts** so you can pick up where you left off.
- 🎨 **Light & dark themes** with a quick settings modal.
- 🖼️ **Custom chat wallpapers** with theme-aware presets that persist per device.
- 😀 **Emoji picker** with dozens of reactions ready to drop into any message.
- 🔎 **In-chat search** to highlight keywords, jump between matches, and keep context focused.
- 📄 **One-click chat export** to download any conversation as a JSON transcript.

## Getting Started

1. Open `index.html` in any modern browser to run the app locally.
2. To deploy on Render:
   - Create a new **Static Site**.
   - Point it at this repository (or upload the build artifacts).
   - Use `index.html` as the publish directory root.

No backend or build tooling is required.

### Settings & personalization

- Use the ⚙️ button in the sidebar header to switch between light and dark themes or pick a wallpaper.
- Choose from the Classic grid, Aurora, Bloom, or Solid color wallpapers to personalize the message backdrop.
- Drafts are stored per-chat and synced to `localStorage`, so you can bounce between conversations without losing what you were typing.
- Tap the emoji button next to the composer to open the picker, then click any emoji to insert it at your cursor.
