# WhatsApp Clone (Frontend Only)

A lightweight, responsive WhatsApp-style messaging interface built with vanilla HTML, CSS, and JavaScript. The app runs entirely on the client, stores chat history in `localStorage`, and can be deployed to any static host such as [Render Static Sites](https://render.com/docs/static-sites).

## Features

- 📱 **Responsive layout** that adapts from desktop to mobile sizes.
- 💬 **Dynamic chat list** with search, starring, and archiving capabilities.
- 🗂️ **Sidebar filters** to flip between all, starred, and archived chats with live counts.
- 🧠 **In-memory + localStorage persistence** so conversations survive page reloads (per browser).
- ✍️ **Message composer** supporting multiline input and keyboard shortcuts (`Enter` to send, `Ctrl/Cmd + K` to focus search).
- 📎 **Image attachments** with inline previews, removable drafts, and export support.
- 🔔 **Toast notifications** for key actions.
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
- Press `Ctrl/Cmd + F` inside a conversation to open message search, then use `Enter` or the arrow buttons to jump between matches.
- Click the ⬇️ button in the chat header to download the active conversation as a JSON transcript.

### Attachments

- Use the 📎 button beside the emoji picker to add up to six images to your next message. Previews appear above the composer so you can remove anything before sending.
- Attachment selections are stored per chat draft, so switching conversations won't discard your pending uploads.
- Sent attachments show inside the conversation bubbles, travel with exports, and can be sent on their own or alongside text.

## Project Structure

```
index.html   # Root HTML document and templates
styles.css   # Theming, layout, and responsive styling
app.js       # UI rendering, chat state management, and interactions
```

Feel free to customize the seeded chat data in `app.js` to fit your needs.
