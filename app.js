const sidebarElement = document.querySelector(".sidebar");
const chatListElement = document.getElementById("chat-list");
const chatHeaderElement = document.getElementById("chat-header");
const chatMessagesElement = document.getElementById("chat-messages");
const chatComposerElement = document.getElementById("chat-composer");
const chatPlaceholderElement = document.getElementById("chat-placeholder");
const chatNameElement = document.getElementById("chat-name");
const chatStatusElement = document.getElementById("chat-status");
const chatAvatarElement = document.getElementById("chat-avatar");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const exportChatButton = document.getElementById("export-chat");
const emojiButton = document.getElementById("emoji-button");
const emojiPicker = document.getElementById("emoji-picker");
const attachmentButton = document.getElementById("attachment-button");
const attachmentInput = document.getElementById("attachment-input");
const composerAttachmentsElement = document.getElementById("composer-attachments");
const openMessageSearchButton = document.getElementById("open-message-search");
const messageSearchContainer = document.getElementById("message-search");
const messageSearchInput = document.getElementById("message-search-input");
const messageSearchCloseButton = document.getElementById("message-search-close");
const messageSearchMeta = document.getElementById("message-search-meta");
const messageSearchPrevButton = document.getElementById("message-search-prev");
const messageSearchNextButton = document.getElementById("message-search-next");
const chatSearchInput = document.getElementById("chat-search");
const newChatButton = document.getElementById("new-chat-button");
const toggleStarButton = document.getElementById("toggle-star");
const toggleArchiveButton = document.getElementById("toggle-archive");
const filterChips = Array.from(document.querySelectorAll(".filter-chip"));
const filterCountElements = {
  all: document.querySelector('[data-filter-count="all"]'),
  starred: document.querySelector('[data-filter-count="starred"]'),
  archived: document.querySelector('[data-filter-count="archived"]'),
};
const settingsButton = document.getElementById("settings-button");
const settingsModal = document.getElementById("settings-modal");
const settingsCloseButton = document.getElementById("settings-close");
const settingsForm = document.getElementById("settings-form");
const themeInputs = settingsForm
  ? Array.from(settingsForm.querySelectorAll('input[name="theme"]'))
  : [];
const wallpaperInputs = settingsForm
  ? Array.from(settingsForm.querySelectorAll('input[name="wallpaper"]'))
  : [];

const chatItemTemplate = document.getElementById("chat-item-template");
const messageTemplate = document.getElementById("message-template");

const STORAGE_KEY = "whatsapp-clone-state-v1";
const DRAFTS_STORAGE_KEY = "whatsapp-clone-drafts-v1";
const THEME_STORAGE_KEY = "whatsapp-clone-theme";
const WALLPAPER_STORAGE_KEY = "whatsapp-clone-wallpaper";
const ATTACHMENT_DRAFTS_STORAGE_KEY = "whatsapp-clone-attachment-drafts-v1";
const MAX_COMPOSER_ATTACHMENTS = 6;

const Theme = {
  DARK: "dark",
  LIGHT: "light",
};

const Wallpaper = {
  GRID: "grid",
  AURORA: "aurora",
  BLOOM: "bloom",
  NONE: "none",
};

const AttachmentKind = {
  IMAGE: "image",
  VIDEO: "video",
  AUDIO: "audio",
  FILE: "file",
};

const MessageStatus = {
  SENT: "sent",
  DELIVERED: "delivered",
  READ: "read",
};

const initialData = [
  {
    id: "team",
    name: "Product Team",
    status: "last seen recently",
    avatar: "PT",
    isStarred: true,
    isArchived: false,
    messages: [
      {
        id: "m1",
        text: "Hey team! Stand-up in 10 minutes.",
        direction: "outgoing",
        sentAt: "2024-02-21T09:20:00.000Z",
        timestamp: "09:20",
        status: "read",
      },
      {
        id: "m2",
        text: "On my way!",
        direction: "incoming",
        sentAt: "2024-02-21T09:21:00.000Z",
        timestamp: "09:21",
      },
      {
        id: "m3",
        text: "Don't forget to review the sprint board before the call.",
        direction: "outgoing",
        sentAt: "2024-02-21T09:24:00.000Z",
        timestamp: "09:24",
        status: "read",
      },
    ],
  },
  {
    id: "design",
    name: "Design Studio",
    status: "typing...",
    avatar: "DS",
    isStarred: false,
    isArchived: false,
    messages: [
      {
        id: "m4",
        text: "Sharing the latest mockups in the drive.",
        direction: "incoming",
        sentAt: "2024-02-20T08:55:00.000Z",
        timestamp: "08:55",
      },
      {
        id: "m5",
        text: "Looks awesome! I'll review and comment.",
        direction: "outgoing",
        sentAt: "2024-02-20T09:02:00.000Z",
        timestamp: "09:02",
        status: "read",
      },
    ],
  },
  {
    id: "james",
    name: "James Carter",
    status: "online",
    avatar: "JC",
    isStarred: false,
    isArchived: false,
    messages: [
      {
        id: "m6",
        text: "Lunch today? There's a new place nearby.",
        direction: "incoming",
        sentAt: "2024-02-21T09:45:00.000Z",
        timestamp: "09:45",
      },
    ],
  },
  {
    id: "family",
    name: "Family",
    status: "last seen 2h ago",
    avatar: "F",
    isStarred: false,
    isArchived: false,
    messages: [
      {
        id: "m7",
        text: "We booked tickets for the weekend getaway!",
        direction: "incoming",
        sentAt: "2024-02-19T08:40:00.000Z",
        timestamp: "08:40",
      },
      {
        id: "m8",
        text: "Amazing! Can't wait to see everyone.",
        direction: "outgoing",
        sentAt: "2024-02-19T08:41:00.000Z",
        timestamp: "08:41",
        status: "read",
      },
    ],
  },
];

const Filter = {
  ALL: "all",
  STARRED: "starred",
  ARCHIVED: "archived",
};

const messageStatusTimers = new Map();
const EMOJI_CHARACTERS = [
  "😀",
  "😁",
  "😂",
  "🤣",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "😍",
  "😘",
  "😎",
  "🤩",
  "🤔",
  "🤨",
  "😐",
  "😴",
  "🤤",
  "😪",
  "😷",
  "🤒",
  "🤕",
  "🤢",
  "🤮",
  "🤧",
  "😵",
  "🤯",
  "🥳",
  "😡",
  "😱",
  "😭",
  "🥺",
  "🤗",
  "🤝",
  "👍",
  "👎",
  "🙏",
  "👏",
  "🔥",
  "🌟",
  "🎉",
  "❤️",
  "💡",
  "✅",
  "❌",
  "💬",
  "📎",
  "⏰",
  "☕",
  "🍕",
  "🏖️",
];

function deriveISOFromLegacyTimestamp(timestamp) {
  if (!timestamp || typeof timestamp !== "string") {
    return new Date().toISOString();
  }

  const [hours, minutes] = timestamp.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return new Date().toISOString();
  }

  const candidate = new Date();
  candidate.setHours(hours, minutes, 0, 0);
  return candidate.toISOString();
}

function formatTimeFromDate(date = new Date()) {
  return date
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    .replace(/^0/, "");
}

function deriveAttachmentKind(type = "") {
  if (!type) return AttachmentKind.FILE;
  if (type.startsWith("image/")) return AttachmentKind.IMAGE;
  if (type.startsWith("video/")) return AttachmentKind.VIDEO;
  if (type.startsWith("audio/")) return AttachmentKind.AUDIO;
  return AttachmentKind.FILE;
}

function deriveFileExtension(type = "") {
  if (!type || typeof type !== "string") {
    return "";
  }

  const [group, subtype] = type.split("/");
  if (!group || !subtype) {
    return "";
  }

  if (subtype.includes("jpeg")) {
    return ".jpg";
  }
  if (subtype.includes("plain")) {
    return ".txt";
  }

  const normalizedSubtype = subtype
    .split(";")[0]
    .replace(/[^a-z0-9.+-]/gi, "")
    .trim();
  if (!normalizedSubtype) {
    return "";
  }

  return `.${normalizedSubtype}`;
}

function sanitizeFileName(name = "", fallback = "attachment") {
  const trimmed = typeof name === "string" ? name.trim() : "";
  if (!trimmed) {
    return fallback;
  }
  const sanitized = trimmed.replace(/[\\/:*?"<>|]+/g, "_");
  return sanitized || fallback;
}

function getAttachmentDownloadName(attachment) {
  const normalized =
    attachment && typeof attachment === "object" && typeof attachment.dataUrl === "string"
      ? attachment
      : normalizeAttachment(attachment);
  if (!normalized) {
    return "attachment";
  }

  const baseName = sanitizeFileName(normalized.name ?? "", "attachment");
  const extension = deriveFileExtension(normalized.type);
  if (!extension) {
    return baseName;
  }

  const hasExtension = baseName.toLowerCase().endsWith(extension.toLowerCase());
  return hasExtension ? baseName : `${baseName}${extension}`;
}

function normalizeAttachment(attachment) {
  if (!attachment || typeof attachment !== "object") return null;

  const dataUrl = typeof attachment.dataUrl === "string" ? attachment.dataUrl : "";
  if (!dataUrl) return null;

  const type = typeof attachment.type === "string" ? attachment.type : "";
  const normalized = {
    id: attachment.id ?? crypto.randomUUID(),
    name: attachment.name ?? "Attachment",
    type,
    size: Number.isFinite(attachment.size) ? Number(attachment.size) : undefined,
    dataUrl,
    kind: attachment.kind ?? deriveAttachmentKind(type),
  };

  if (!normalized.kind) {
    normalized.kind = deriveAttachmentKind(type);
  }

  return normalized;
}

function cloneAttachment(attachment) {
  const normalized = normalizeAttachment(attachment);
  if (!normalized) return null;
  return { ...normalized };
}

function normalizeMessage(message) {
  if (!message) return null;

  const normalized = { ...message };
  if (!normalized.sentAt) {
    normalized.sentAt = deriveISOFromLegacyTimestamp(normalized.timestamp);
  }

  if (typeof normalized.text !== "string") {
    normalized.text = normalized.text ? String(normalized.text) : "";
  }

  const parsedDate = new Date(normalized.sentAt);
  if (Number.isNaN(parsedDate.getTime())) {
    const fallback = new Date();
    normalized.sentAt = fallback.toISOString();
    normalized.timestamp = formatTimeFromDate(fallback);
  } else if (!normalized.timestamp) {
    normalized.timestamp = formatTimeFromDate(parsedDate);
  }

  if (normalized.direction === "outgoing") {
    if (!Object.values(MessageStatus).includes(normalized.status)) {
      normalized.status = MessageStatus.READ;
    }
  } else if (normalized.status) {
    delete normalized.status;
  }

  const normalizedAttachments = Array.isArray(normalized.attachments)
    ? normalized.attachments.map(normalizeAttachment).filter(Boolean)
    : [];
  normalized.attachments = normalizedAttachments;

  return normalized;
}

function normalizeChat(chat) {
  if (!chat) return null;

  const normalizedMessages = (chat.messages ?? [])
    .map(normalizeMessage)
    .filter(Boolean)
    .sort((a, b) => {
      const aTime = new Date(a.sentAt).getTime();
      const bTime = new Date(b.sentAt).getTime();
      return aTime - bTime;
    });

  return {
    ...chat,
    name: chat.name ?? "New chat",
    status: chat.status ?? "online",
    avatar:
      chat.avatar ??
      (chat.name
        ? chat.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "?"),
    isStarred: Boolean(chat.isStarred),
    isArchived: Boolean(chat.isArchived),
    messages: normalizedMessages,
  };
}

function formatMessageTimestamp(message) {
  if (!message) return "";

  if (message.sentAt) {
    const date = new Date(message.sentAt);
    if (!Number.isNaN(date.getTime())) {
      const now = new Date();
      const isSameDay = date.toDateString() === now.toDateString();
      const isSameYear = date.getFullYear() === now.getFullYear();
      const options = isSameDay
        ? { hour: "2-digit", minute: "2-digit" }
        : isSameYear
        ? { month: "short", day: "numeric" }
        : { year: "numeric", month: "short", day: "numeric" };
      return date.toLocaleString([], options).replace(/^0/, "");
    }
  }

  return message.timestamp ?? "";
}

function getMessageStatusDetails(message) {
  if (!message || message.direction !== "outgoing") {
    return { icon: "", label: "", className: "" };
  }

  switch (message.status) {
    case MessageStatus.DELIVERED:
      return { icon: "✓✓", label: "Delivered", className: "" };
    case MessageStatus.READ:
      return { icon: "✓✓", label: "Read", className: "message__status--read" };
    case MessageStatus.SENT:
    default:
      return { icon: "✓", label: "Sent", className: "" };
  }
}

function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "";
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size.toFixed(size >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function getAttachmentLabel(attachment) {
  if (!attachment) return "Attachment";
  switch (attachment.kind) {
    case AttachmentKind.IMAGE:
      return "Photo";
    case AttachmentKind.VIDEO:
      return "Video";
    case AttachmentKind.AUDIO:
      return "Audio";
    default:
      return "Document";
  }
}

function formatAttachmentSummary(attachments = []) {
  if (!attachments.length) return "";
  const label = getAttachmentLabel(attachments[0]);
  if (attachments.length === 1) {
    return label;
  }
  return `${label} +${attachments.length - 1}`;
}

function formatMessagePreview(message) {
  if (!message) return "No messages yet";
  const prefix = message.direction === "outgoing" ? "You: " : "";
  const { icon } = getMessageStatusDetails(message);
  const statusIcon = message.direction === "outgoing" && icon ? `${icon} ` : "";
  const attachments = Array.isArray(message.attachments) ? message.attachments : [];
  const summary = formatAttachmentSummary(attachments);
  const text = (message.text ?? "").trim();
  const parts = [];
  if (summary) {
    parts.push(`📎 ${summary}`);
  }
  if (text) {
    parts.push(text);
  }
  const body = parts.length ? parts.join(" · ") : summary || "Attachment";
  return `${prefix}${statusIcon}${body}`;
}

function getMessageTimeValue(message) {
  if (!message) return 0;
  if (message.sentAt) {
    const date = new Date(message.sentAt);
    if (!Number.isNaN(date.getTime())) {
      return date.getTime();
    }
  }

  if (message.timestamp) {
    const [hours, minutes] = message.timestamp.split(":").map(Number);
    if (!Number.isNaN(hours) && !Number.isNaN(minutes)) {
      const candidate = new Date();
      candidate.setHours(hours, minutes, 0, 0);
      return candidate.getTime();
    }
  }

  return 0;
}

function matchesFilter(chat, filter = activeFilter) {
  switch (filter) {
    case Filter.ALL:
      return !chat.isArchived;
    case Filter.STARRED:
      return chat.isStarred && !chat.isArchived;
    case Filter.ARCHIVED:
      return chat.isArchived;
    default:
      return true;
  }
}

function updateFilterCounts() {
  const counts = {
    [Filter.ALL]: chats.filter((chat) => matchesFilter(chat, Filter.ALL)).length,
    [Filter.STARRED]: chats.filter((chat) => matchesFilter(chat, Filter.STARRED)).length,
    [Filter.ARCHIVED]: chats.filter((chat) => matchesFilter(chat, Filter.ARCHIVED)).length,
  };

  Object.entries(counts).forEach(([filter, count]) => {
    const element = filterCountElements[filter];
    if (element) {
      element.textContent = count;
    }
  });
}

function updateFilterChips() {
  filterChips.forEach((chip) => {
    const isActive = chip.dataset.filter === activeFilter;
    chip.classList.toggle("filter-chip--active", isActive);
    chip.setAttribute("aria-selected", isActive ? "true" : "false");
    chip.setAttribute("tabindex", isActive ? "0" : "-1");
  });
}

function setActiveFilter(nextFilter) {
  if (!Object.values(Filter).includes(nextFilter)) return;
  if (activeFilter === nextFilter) return;
  activeFilter = nextFilter;
  updateFilterChips();
  renderChats(chatSearchInput.value);
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw)
      return initialData.map(normalizeChat).filter(Boolean);
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed))
      return initialData.map(normalizeChat).filter(Boolean);
    return parsed.map(normalizeChat).filter(Boolean);
  } catch (error) {
    console.error("Failed to load chats", error);
    return initialData.map(normalizeChat).filter(Boolean);
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadDrafts() {
  try {
    const raw = localStorage.getItem(DRAFTS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(([, value]) => typeof value === "string")
    );
  } catch (error) {
    console.error("Failed to load drafts", error);
    return {};
  }
}

function saveDrafts(state) {
  localStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(state));
}

function loadAttachmentDrafts() {
  try {
    const raw = localStorage.getItem(ATTACHMENT_DRAFTS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    return Object.fromEntries(
      Object.entries(parsed)
        .map(([chatId, attachments]) => {
          if (!Array.isArray(attachments)) return null;
          const normalized = attachments.map(normalizeAttachment).filter(Boolean);
          if (!normalized.length) return null;
          return [chatId, normalized];
        })
        .filter(Boolean)
    );
  } catch (error) {
    console.error("Failed to load attachment drafts", error);
    return {};
  }
}

function saveAttachmentDrafts(state) {
  localStorage.setItem(ATTACHMENT_DRAFTS_STORAGE_KEY, JSON.stringify(state));
}

function getDraft(chatId) {
  if (!chatId) return "";
  return drafts[chatId] ?? "";
}

function setDraft(chatId, value) {
  if (!chatId) return;
  const trimmed = value?.trim() ?? "";
  if (!trimmed) {
    if (drafts[chatId]) {
      delete drafts[chatId];
      saveDrafts(drafts);
    }
    return;
  }

  drafts[chatId] = value;
  saveDrafts(drafts);
}

function pruneDrafts() {
  const knownChatIds = new Set(chats.map((chat) => chat.id));
  let changed = false;
  Object.keys(drafts).forEach((chatId) => {
    if (!knownChatIds.has(chatId)) {
      delete drafts[chatId];
      changed = true;
    }
  });
  if (changed) {
    saveDrafts(drafts);
  }
}

function getAttachmentDraft(chatId) {
  if (!chatId) return [];
  const attachments = attachmentDrafts[chatId];
  if (!Array.isArray(attachments)) return [];
  return attachments.map(cloneAttachment).filter(Boolean);
}

function setAttachmentDraft(chatId, attachments) {
  if (!chatId) return;
  const normalized = (attachments ?? []).map(cloneAttachment).filter(Boolean);
  if (!normalized.length) {
    if (attachmentDrafts[chatId]) {
      delete attachmentDrafts[chatId];
      saveAttachmentDrafts(attachmentDrafts);
    }
    return;
  }

  attachmentDrafts[chatId] = normalized;
  saveAttachmentDrafts(attachmentDrafts);
}

function pruneAttachmentDrafts() {
  const knownChatIds = new Set(chats.map((chat) => chat.id));
  let changed = false;
  Object.keys(attachmentDrafts).forEach((chatId) => {
    if (!knownChatIds.has(chatId)) {
      delete attachmentDrafts[chatId];
      changed = true;
    }
  });
  if (changed) {
    saveAttachmentDrafts(attachmentDrafts);
  }
}

function loadTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && Object.values(Theme).includes(stored)) {
      return stored;
    }
  } catch (error) {
    console.error("Failed to load theme", error);
  }
  return Theme.DARK;
}

function saveTheme(theme) {
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function applyTheme(theme) {
  const nextTheme = Object.values(Theme).includes(theme) ? theme : Theme.DARK;
  document.documentElement.dataset.theme = nextTheme;
}

function updateThemeControls(theme = activeTheme) {
  themeInputs.forEach((input) => {
    input.checked = input.value === theme;
  });
}

function setTheme(theme) {
  const nextTheme = Object.values(Theme).includes(theme) ? theme : Theme.DARK;
  if (activeTheme === nextTheme) return;
  activeTheme = nextTheme;
  applyTheme(activeTheme);
  applyWallpaper(activeWallpaper);
  updateThemeControls(activeTheme);
  saveTheme(activeTheme);
  showToast(
    activeTheme === Theme.DARK ? "Switched to dark theme" : "Switched to light theme"
  );
}

function loadWallpaper() {
  try {
    const stored = localStorage.getItem(WALLPAPER_STORAGE_KEY);
    if (stored && Object.values(Wallpaper).includes(stored)) {
      return stored;
    }
  } catch (error) {
    console.error("Failed to load wallpaper", error);
  }
  return Wallpaper.GRID;
}

function saveWallpaper(wallpaper) {
  localStorage.setItem(WALLPAPER_STORAGE_KEY, wallpaper);
}

function applyWallpaper(wallpaper) {
  const nextWallpaper = Object.values(Wallpaper).includes(wallpaper)
    ? wallpaper
    : Wallpaper.GRID;
  document.documentElement.dataset.wallpaper = nextWallpaper;
}

function updateWallpaperControls(wallpaper = activeWallpaper) {
  wallpaperInputs.forEach((input) => {
    input.checked = input.value === wallpaper;
  });
}

function setWallpaper(wallpaper) {
  const nextWallpaper = Object.values(Wallpaper).includes(wallpaper)
    ? wallpaper
    : Wallpaper.GRID;
  if (activeWallpaper === nextWallpaper) return;
  activeWallpaper = nextWallpaper;
  applyWallpaper(activeWallpaper);
  updateWallpaperControls(activeWallpaper);
  saveWallpaper(activeWallpaper);
  const copy = {
    [Wallpaper.GRID]: "Applied classic grid wallpaper",
    [Wallpaper.AURORA]: "Applied aurora wallpaper",
    [Wallpaper.BLOOM]: "Applied bloom wallpaper",
    [Wallpaper.NONE]: "Removed chat wallpaper",
  }[activeWallpaper];
  if (copy) {
    showToast(copy);
  }
}

function clearMessageStatusTimers(messageId) {
  const timers = messageStatusTimers.get(messageId);
  if (!timers) return;
  timers.forEach((timerId) => clearTimeout(timerId));
  messageStatusTimers.delete(messageId);
}

function updateMessageStatus(chatId, messageId, nextStatus) {
  if (!Object.values(MessageStatus).includes(nextStatus)) return;
  const chat = chats.find((c) => c.id === chatId);
  if (!chat) return;
  const message = chat.messages.find((m) => m.id === messageId);
  if (!message || message.direction !== "outgoing") return;
  if (message.status === nextStatus) return;

  message.status = nextStatus;
  saveState(chats);
  renderChats(chatSearchInput.value);
  if (chat.id === activeChatId) {
    renderChatView(chat);
  }

  if (nextStatus === MessageStatus.READ) {
    clearMessageStatusTimers(messageId);
  }
}

function scheduleMessageStatus(chatId, messageId, currentStatus = MessageStatus.SENT) {
  clearMessageStatusTimers(messageId);

  const timers = [];
  const randomWithin = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  if (currentStatus === MessageStatus.SENT) {
    const deliveredDelay = randomWithin(700, 1300);
    const readDelay = deliveredDelay + randomWithin(900, 1700);
    timers.push(
      setTimeout(() => updateMessageStatus(chatId, messageId, MessageStatus.DELIVERED), deliveredDelay)
    );
    timers.push(
      setTimeout(() => updateMessageStatus(chatId, messageId, MessageStatus.READ), readDelay)
    );
  } else if (currentStatus === MessageStatus.DELIVERED) {
    const readDelay = randomWithin(900, 1700);
    timers.push(
      setTimeout(() => updateMessageStatus(chatId, messageId, MessageStatus.READ), readDelay)
    );
  }

  if (timers.length) {
    messageStatusTimers.set(messageId, timers);
  }
}

function resetMessageStatusTimers() {
  Array.from(messageStatusTimers.values()).forEach((timers) => {
    timers.forEach((timerId) => clearTimeout(timerId));
  });
  messageStatusTimers.clear();
}

function resumePendingStatuses() {
  resetMessageStatusTimers();
  let mutated = false;
  chats.forEach((chat) => {
    chat.messages.forEach((message) => {
      if (message.direction !== "outgoing") return;
      if (!Object.values(MessageStatus).includes(message.status)) {
        message.status = MessageStatus.SENT;
        mutated = true;
      }
      if (message.status !== MessageStatus.READ) {
        scheduleMessageStatus(chat.id, message.id, message.status);
      }
    });
  });
  if (mutated) {
    saveState(chats);
  }
}

let chats = loadState();
let drafts = loadDrafts();
let attachmentDrafts = loadAttachmentDrafts();
let activeTheme = loadTheme();
let activeWallpaper = loadWallpaper();
let activeChatId = null;
let activeFilter = Filter.ALL;
let settingsRestoreFocusTo = null;
let pendingAttachments = [];

function getActiveChat() {
  return chats.find((chat) => chat.id === activeChatId) ?? null;
}

function createHighlightedFragment(text, query) {
  const fragment = document.createDocumentFragment();
  if (!query) {
    fragment.appendChild(document.createTextNode(text));
    return fragment;
  }

  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    fragment.appendChild(document.createTextNode(text));
    return fragment;
  }

  const lowerText = text.toLowerCase();
  let cursor = 0;
  let matchIndex = lowerText.indexOf(normalizedQuery, cursor);

  while (matchIndex !== -1) {
    if (matchIndex > cursor) {
      fragment.appendChild(document.createTextNode(text.slice(cursor, matchIndex)));
    }

    const highlight = document.createElement("mark");
    highlight.className = "message__highlight";
    highlight.textContent = text.slice(matchIndex, matchIndex + normalizedQuery.length);
    fragment.appendChild(highlight);

    cursor = matchIndex + normalizedQuery.length;
    matchIndex = lowerText.indexOf(normalizedQuery, cursor);
  }

  if (cursor < text.length) {
    fragment.appendChild(document.createTextNode(text.slice(cursor)));
  }

  if (!fragment.childNodes.length) {
    fragment.appendChild(document.createTextNode(text));
  }

  return fragment;
}

function updateMessageSearchButtonState() {
  if (!openMessageSearchButton) return;
  openMessageSearchButton.setAttribute("aria-pressed", isMessageSearchOpen ? "true" : "false");
}

function updateMessageSearchMeta() {
  if (!messageSearchMeta) return;

  const hasChat = Boolean(getActiveChat());
  if (!isMessageSearchOpen || !hasChat) {
    messageSearchMeta.textContent = "Type to search conversation";
    if (messageSearchPrevButton) messageSearchPrevButton.disabled = true;
    if (messageSearchNextButton) messageSearchNextButton.disabled = true;
    return;
  }

  const query = activeMessageSearchQuery.trim();
  if (!query) {
    messageSearchMeta.textContent = "Type to search conversation";
    if (messageSearchPrevButton) messageSearchPrevButton.disabled = true;
    if (messageSearchNextButton) messageSearchNextButton.disabled = true;
    return;
  }

  const totalMatches = messageSearchMatches.length;
  if (!totalMatches) {
    messageSearchMeta.textContent = "No matches";
    if (messageSearchPrevButton) messageSearchPrevButton.disabled = true;
    if (messageSearchNextButton) messageSearchNextButton.disabled = true;
    return;
  }

  messageSearchMeta.textContent = `Match ${activeMessageSearchIndex + 1} of ${totalMatches}`;
  const disableNav = totalMatches <= 1;
  if (messageSearchPrevButton) messageSearchPrevButton.disabled = disableNav;
  if (messageSearchNextButton) messageSearchNextButton.disabled = disableNav;
}

function highlightActiveSearchMatch() {
  if (!isMessageSearchOpen) {
    shouldScrollToActiveSearchMatch = false;
    return;
  }

  messageSearchMatches.forEach((match, index) => {
    match.element.classList.toggle("message--search-active", index === activeMessageSearchIndex);
  });

  if (shouldScrollToActiveSearchMatch && messageSearchMatches[activeMessageSearchIndex]) {
    messageSearchMatches[activeMessageSearchIndex].element.scrollIntoView({ block: "center" });
  }

  shouldScrollToActiveSearchMatch = false;
}

function setMessageSearchMatches(matches) {
  messageSearchMatches = matches;
  if (!messageSearchMatches.length) {
    activeMessageSearchIndex = 0;
  } else if (activeMessageSearchIndex >= messageSearchMatches.length) {
    activeMessageSearchIndex = 0;
  }

  highlightActiveSearchMatch();
  updateMessageSearchMeta();
}

function focusMessageSearchInput({ select = false } = {}) {
  if (!(messageSearchInput instanceof HTMLInputElement)) return;
  messageSearchInput.focus();
  if (select) {
    messageSearchInput.select();
  }
}

function openMessageSearch({ focus = true } = {}) {
  if (isMessageSearchOpen) {
    if (focus) {
      focusMessageSearchInput({ select: true });
    }
    return;
  }

  const chat = getActiveChat();
  if (!chat) {
    showToast("Select a chat to search");
    return;
  }

  closeEmojiPicker();
  isMessageSearchOpen = true;
  shouldScrollToActiveSearchMatch = true;

  if (messageSearchContainer) {
    messageSearchContainer.hidden = false;
    messageSearchContainer.setAttribute("aria-hidden", "false");
  }

  if (messageSearchInput) {
    messageSearchInput.value = activeMessageSearchQuery;
  }

  updateMessageSearchButtonState();
  updateMessageSearchMeta();
  renderChatView(chat);

  if (focus) {
    focusMessageSearchInput({ select: true });
  }
}

function closeMessageSearch({ restoreFocus = true } = {}) {
  if (!isMessageSearchOpen) return;

  isMessageSearchOpen = false;
  activeMessageSearchQuery = "";
  activeMessageSearchIndex = 0;
  shouldScrollToActiveSearchMatch = false;

  if (messageSearchInput) {
    messageSearchInput.value = "";
  }

  if (messageSearchContainer) {
    messageSearchContainer.hidden = true;
    messageSearchContainer.setAttribute("aria-hidden", "true");
  }

  messageSearchMatches.forEach((match) => {
    match.element.classList.remove("message--search-active");
    match.element.classList.remove("message--search-match");
  });
  setMessageSearchMatches([]);
  updateMessageSearchButtonState();
  renderChatView(getActiveChat());

  if (restoreFocus && openMessageSearchButton instanceof HTMLElement) {
    openMessageSearchButton.focus();
  }
}

function handleMessageSearchInput(event) {
  if (!(event.target instanceof HTMLInputElement)) return;
  activeMessageSearchQuery = event.target.value ?? "";
  activeMessageSearchIndex = 0;
  shouldScrollToActiveSearchMatch = true;
  renderChatView(getActiveChat());
}

function goToNextSearchResult() {
  if (!isMessageSearchOpen || !messageSearchMatches.length) return;
  activeMessageSearchIndex = (activeMessageSearchIndex + 1) % messageSearchMatches.length;
  shouldScrollToActiveSearchMatch = true;
  highlightActiveSearchMatch();
  updateMessageSearchMeta();
}

function goToPreviousSearchResult() {
  if (!isMessageSearchOpen || !messageSearchMatches.length) return;
  activeMessageSearchIndex =
    (activeMessageSearchIndex - 1 + messageSearchMatches.length) % messageSearchMatches.length;
  shouldScrollToActiveSearchMatch = true;
  highlightActiveSearchMatch();
  updateMessageSearchMeta();
}

function renderChats(searchText = "") {
  chatListElement.innerHTML = "";
  updateFilterCounts();

  const normalizedSearch = searchText.trim().toLowerCase();

  const filtered = chats
    .filter((chat) => matchesFilter(chat))
    .filter((chat) => {
      if (!normalizedSearch) return true;
      const nameMatch = chat.name.toLowerCase().includes(normalizedSearch);
      const messageMatch = chat.messages.some((message) =>
        message.text.toLowerCase().includes(normalizedSearch)
      );
      return nameMatch || messageMatch;
    })
    .sort((a, b) => {
      if (activeFilter !== Filter.ARCHIVED && a.isStarred !== b.isStarred) {
        return a.isStarred ? -1 : 1;
      }

      const aTime = getMessageTimeValue(a.messages.at(-1));
      const bTime = getMessageTimeValue(b.messages.at(-1));
      return bTime - aTime;
    });

  if (!filtered.length) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";

    if (normalizedSearch) {
      emptyState.innerHTML = `
        <h2>No matches found</h2>
        <p>Try a different name or keyword.</p>
      `;
    } else {
      const emptyCopy = {
        [Filter.ALL]: {
          title: "No chats yet",
          body: "Start a new conversation using the + button.",
        },
        [Filter.STARRED]: {
          title: "No starred chats",
          body: "Star important conversations to pin them here.",
        },
        [Filter.ARCHIVED]: {
          title: "Archive is empty",
          body: "Archive chats to keep your inbox tidy.",
        },
      }[activeFilter];

      emptyState.innerHTML = `
        <h2>${emptyCopy.title}</h2>
        <p>${emptyCopy.body}</p>
      `;
    }

    chatListElement.appendChild(emptyState);
    return;
  }

  filtered.forEach((chat) => {
    const chatNode = chatItemTemplate.content.firstElementChild.cloneNode(true);
    chatNode.dataset.chatId = chat.id;

    const nameNode = chatNode.querySelector(".chat-item__name");
    const timestampNode = chatNode.querySelector(".chat-item__timestamp");
    const previewNode = chatNode.querySelector(".chat-item__preview");
    const metaNode = chatNode.querySelector(".chat-item__meta");
    const avatarNode = chatNode.querySelector(".chat-item__avatar");

    nameNode.textContent = chat.name;
    avatarNode.textContent = chat.avatar ?? chat.name.slice(0, 1).toUpperCase();

    const lastMessage = chat.messages.at(-1);
    timestampNode.textContent = lastMessage ? formatMessageTimestamp(lastMessage) : "";

    const draftText = getDraft(chat.id)?.trim();
    const draftAttachments = getAttachmentDraft(chat.id);
    const draftAttachmentSummary = formatAttachmentSummary(draftAttachments);
    if (draftText || draftAttachmentSummary) {
      const parts = [];
      if (draftAttachmentSummary) {
        parts.push(`📎 ${draftAttachmentSummary}`);
      }
      if (draftText) {
        parts.push(draftText);
      }
      const summary = parts.length ? parts.join(" · ") : draftAttachmentSummary ?? "Attachment";
      previewNode.textContent = `Draft: ${summary}`;
      previewNode.classList.add("chat-item__preview--draft");
    } else if (lastMessage) {
      previewNode.textContent = formatMessagePreview(lastMessage);
      previewNode.classList.remove("chat-item__preview--draft");
    } else {
      previewNode.textContent = "No messages yet";
      previewNode.classList.remove("chat-item__preview--draft");
    }

    const metaIcons = [];
    if (chat.isStarred) metaIcons.push("★");
    if (chat.isArchived) metaIcons.push("📁");
    metaNode.textContent = metaIcons.join(" ");

    if (chat.id === activeChatId) {
      chatNode.classList.add("chat-item--active");
    }

    chatNode.addEventListener("click", () => {
      openChat(chat.id);
    });

    chatListElement.appendChild(chatNode);
  });
}

function createMessageAttachmentElement(attachment) {
  const normalized = normalizeAttachment(attachment);
  if (!normalized) return null;

  const downloadName = getAttachmentDownloadName(normalized);
  const link = document.createElement("a");
  link.className = "message__attachment-link";
  link.href = normalized.dataUrl;
  link.download = downloadName;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

  if (normalized.kind === AttachmentKind.IMAGE) {
    const container = document.createElement("div");
    container.className = "message__attachment";
    const image = document.createElement("img");
    image.className = "message__attachment-image";
    image.src = normalized.dataUrl;
    const label = normalized.name
      ? `${getAttachmentLabel(normalized)}: ${normalized.name}`
      : getAttachmentLabel(normalized);
    image.alt = label;
    link.setAttribute("aria-label", `${label}. Download`);
    link.appendChild(image);
    container.appendChild(link);
    return container;
  }

  const container = document.createElement("div");
  container.className = "message__attachment message__attachment--file";

  const wrapper = document.createElement("div");
  wrapper.className = "message__attachment-file";

  const icon = document.createElement("span");
  icon.className = "message__attachment-file-icon";
  icon.textContent =
    normalized.kind === AttachmentKind.AUDIO
      ? "🎵"
      : normalized.kind === AttachmentKind.VIDEO
      ? "🎞️"
      : "📄";

  const details = document.createElement("div");
  details.className = "message__attachment-file-details";

  const name = document.createElement("div");
  name.className = "message__attachment-label";
  name.textContent = normalized.name ?? getAttachmentLabel(normalized);
  details.appendChild(name);

  const sizeText = formatFileSize(normalized.size);
  if (sizeText) {
    const meta = document.createElement("div");
    meta.className = "message__attachment-meta";
    meta.textContent = sizeText;
    details.appendChild(meta);
  }

  wrapper.append(icon, details);
  link.appendChild(wrapper);
  container.appendChild(link);
  const accessibleLabel = [
    getAttachmentLabel(normalized),
    normalized.name ? normalized.name : null,
    sizeText ? `(${sizeText})` : null,
  ]
    .filter(Boolean)
    .join(" ");
  const label = accessibleLabel ? `${accessibleLabel}. Download` : "Download attachment";
  link.setAttribute("aria-label", label);
  return container;
}

function renderComposerAttachments() {
  if (!composerAttachmentsElement) return;
  const chat = getActiveChat();
  composerAttachmentsElement.innerHTML = "";

  if (!chat || !pendingAttachments.length) {
    composerAttachmentsElement.hidden = true;
    composerAttachmentsElement.setAttribute("aria-hidden", "true");
    return;
  }

  composerAttachmentsElement.hidden = false;
  composerAttachmentsElement.setAttribute("aria-hidden", "false");

  pendingAttachments.forEach((attachment) => {
    const normalized = normalizeAttachment(attachment);
    if (!normalized) return;

    const item = document.createElement("div");
    item.className = "composer-attachments__item";

    if (normalized.kind === AttachmentKind.IMAGE) {
      const preview = document.createElement("img");
      preview.className = "composer-attachments__preview";
      preview.src = normalized.dataUrl;
      preview.alt = normalized.name
        ? `${getAttachmentLabel(normalized)}: ${normalized.name}`
        : getAttachmentLabel(normalized);
      item.appendChild(preview);
    } else {
      const file = document.createElement("div");
      file.className = "composer-attachments__file";

      const icon = document.createElement("span");
      icon.className = "composer-attachments__file-icon";
      icon.textContent =
        normalized.kind === AttachmentKind.AUDIO
          ? "🎵"
          : normalized.kind === AttachmentKind.VIDEO
          ? "🎞️"
          : "📄";

      const info = document.createElement("div");
      info.className = "composer-attachments__file-info";

      const name = document.createElement("div");
      name.className = "composer-attachments__file-name";
      name.textContent = normalized.name ?? getAttachmentLabel(normalized);
      info.appendChild(name);

      const sizeText = formatFileSize(normalized.size);
      if (sizeText) {
        const meta = document.createElement("div");
        meta.className = "composer-attachments__file-meta";
        meta.textContent = sizeText;
        info.appendChild(meta);
      }

      file.append(icon, info);
      item.appendChild(file);
    }

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "composer-attachments__remove";
    const baseLabel = normalized.name ?? getAttachmentLabel(normalized);
    removeButton.setAttribute("aria-label", `Remove ${baseLabel} from message`);
    removeButton.title = `Remove ${baseLabel}`;
    removeButton.textContent = "✕";
    removeButton.addEventListener("click", () => removePendingAttachment(normalized.id));
    item.appendChild(removeButton);

    composerAttachmentsElement.appendChild(item);
  });
}

function renderChatView(chat) {
  if (!chat) {
    if (exportChatButton) {
      exportChatButton.disabled = true;
      exportChatButton.setAttribute("aria-label", "Export conversation");
      exportChatButton.setAttribute("title", "Export conversation");
    }
    closeEmojiPicker();
    chatPlaceholderElement.hidden = false;
    chatHeaderElement.hidden = true;
    chatComposerElement.hidden = true;
    chatMessagesElement.innerHTML = "";
    messageInput.value = "";
    autoResizeTextarea();
    pendingAttachments = [];
    renderComposerAttachments();
    if (isMessageSearchOpen) {
      isMessageSearchOpen = false;
      activeMessageSearchQuery = "";
      activeMessageSearchIndex = 0;
      shouldScrollToActiveSearchMatch = false;
      if (messageSearchInput) {
        messageSearchInput.value = "";
      }
    }
    if (messageSearchContainer) {
      messageSearchContainer.hidden = true;
      messageSearchContainer.setAttribute("aria-hidden", "true");
    }
    setMessageSearchMatches([]);
    updateMessageSearchButtonState();
    updateMessageSearchMeta();
    return;
  }

  chatPlaceholderElement.hidden = true;
  chatHeaderElement.hidden = false;
  chatComposerElement.hidden = false;
  closeEmojiPicker();

  if (exportChatButton) {
    exportChatButton.disabled = false;
    const label = `Export conversation with ${chat.name}`;
    exportChatButton.setAttribute("aria-label", label);
    exportChatButton.setAttribute("title", label);
  }

  if (messageSearchContainer) {
    if (isMessageSearchOpen) {
      messageSearchContainer.hidden = false;
      messageSearchContainer.setAttribute("aria-hidden", "false");
      if (messageSearchInput) {
        messageSearchInput.value = activeMessageSearchQuery;
      }
    } else {
      messageSearchContainer.hidden = true;
      messageSearchContainer.setAttribute("aria-hidden", "true");
    }
  }
  updateMessageSearchButtonState();

  chatNameElement.textContent = chat.name;
  chatStatusElement.textContent = chat.status;
  chatAvatarElement.textContent = chat.avatar ?? chat.name.slice(0, 1).toUpperCase();

  toggleStarButton.setAttribute(
    "aria-pressed",
    chat.isStarred ? "true" : "false"
  );
  toggleArchiveButton.setAttribute(
    "aria-pressed",
    chat.isArchived ? "true" : "false"
  );

  chatMessagesElement.innerHTML = "";
  const searchQuery = isMessageSearchOpen ? activeMessageSearchQuery.trim() : "";
  const normalizedSearchQuery = searchQuery.toLowerCase();
  const shouldHighlight = Boolean(isMessageSearchOpen && searchQuery);
  const matchesForChat = [];

  chat.messages.forEach((message) => {
    const messageNode = messageTemplate.content.firstElementChild.cloneNode(true);
    messageNode.classList.add(
      message.direction === "outgoing" ? "message--outgoing" : "message--incoming"
    );

    const textNode = messageNode.querySelector(".message__text");
    const metaNode = messageNode.querySelector(".message__meta");
    const timeNode = messageNode.querySelector(".message__time");
    const statusNode = messageNode.querySelector(".message__status");
    const attachmentsContainer = messageNode.querySelector(".message__attachments");

    const messageText = typeof message.text === "string" ? message.text : "";
    const attachments = Array.isArray(message.attachments) ? message.attachments : [];
    const formattedTime = formatMessageTimestamp(message);
    const highlightFragment = createHighlightedFragment(
      messageText,
      shouldHighlight ? searchQuery : ""
    );
    textNode.textContent = "";
    textNode.appendChild(highlightFragment);
    if (messageText) {
      textNode.classList.remove("message__text--hidden");
    } else {
      textNode.classList.add("message__text--hidden");
    }
    messageNode.classList.remove("message--search-active");
    if (shouldHighlight && messageText.toLowerCase().includes(normalizedSearchQuery)) {
      messageNode.classList.add("message--search-match");
      matchesForChat.push({ element: messageNode });
    } else {
      messageNode.classList.remove("message--search-match");
    }

    if (attachmentsContainer) {
      attachmentsContainer.innerHTML = "";
      const attachmentElements = attachments
        .map(createMessageAttachmentElement)
        .filter(Boolean);
      if (attachmentElements.length) {
        attachmentsContainer.hidden = false;
        attachmentsContainer.classList.toggle(
          "message__attachments--grid",
          attachmentElements.length > 1
        );
        attachmentElements.forEach((element) => attachmentsContainer.appendChild(element));
      } else {
        attachmentsContainer.hidden = true;
        attachmentsContainer.classList.remove("message__attachments--grid");
      }
    }

    if (timeNode) {
      timeNode.textContent = formattedTime;
      if (message.sentAt) {
        timeNode.dateTime = message.sentAt;
      } else {
        timeNode.removeAttribute("dateTime");
      }
    }

    const accessibleParts = [];
    if (attachments.length) {
      accessibleParts.push(
        attachments.length === 1
          ? getAttachmentLabel(attachments[0])
          : `${attachments.length} attachments`
      );
    }
    if (formattedTime) {
      accessibleParts.push(formattedTime);
    }

    if (statusNode) {
      const { icon, label, className } = getMessageStatusDetails(message);
      statusNode.textContent = icon ?? "";
      statusNode.className = "message__status";
      if (className) {
        statusNode.classList.add(className);
      }
      if (message.direction === "outgoing" && label) {
        statusNode.setAttribute("aria-label", label);
        accessibleParts.unshift(label);
      } else {
        statusNode.removeAttribute("aria-label");
      }
    }

    if (metaNode) {
      if (accessibleParts.length) {
        metaNode.setAttribute("aria-label", accessibleParts.join(", "));
      } else {
        metaNode.removeAttribute("aria-label");
      }
    }

    chatMessagesElement.appendChild(messageNode);
  });

  if (isMessageSearchOpen) {
    if (shouldHighlight) {
      setMessageSearchMatches(matchesForChat);
    } else {
      setMessageSearchMatches([]);
    }
  } else {
    setMessageSearchMatches([]);
  }

  if (!shouldHighlight) {
    chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
  }

  const draftValue = getDraft(chat.id) ?? "";
  messageInput.value = draftValue;
  autoResizeTextarea();
  renderComposerAttachments();
}

function openChat(chatId) {
  if (activeChatId && activeChatId !== chatId) {
    setAttachmentDraft(activeChatId, pendingAttachments);
  }
  activeChatId = chatId;
  pendingAttachments = getAttachmentDraft(chatId);
  const chat = getActiveChat();
  renderChats(chatSearchInput.value);
  if (isMessageSearchOpen) {
    shouldScrollToActiveSearchMatch = true;
  }
  renderChatView(chat);
  if (isMessageSearchOpen) {
    focusMessageSearchInput();
  }
  maybeHideSidebar();
}

function addMessageToChat(chatId, text, direction = "outgoing", attachments = []) {
  const chat = chats.find((c) => c.id === chatId);
  if (!chat) return { wasArchived: false };

  const sentAt = new Date();
  const isOutgoing = direction === "outgoing";
  const normalizedAttachments = Array.isArray(attachments)
    ? attachments.map(normalizeAttachment).filter(Boolean)
    : [];
  const newMessage = {
    id: crypto.randomUUID(),
    text,
    direction,
    sentAt: sentAt.toISOString(),
    timestamp: formatTimeFromDate(sentAt),
    attachments: normalizedAttachments,
    ...(isOutgoing ? { status: MessageStatus.SENT } : {}),
  };
  chat.messages.push(newMessage);
  chat.messages.sort((a, b) => getMessageTimeValue(a) - getMessageTimeValue(b));

  const wasArchived = chat.isArchived;
  if (wasArchived) {
    chat.isArchived = false;
  }

  saveState(chats);
  if (isOutgoing) {
    scheduleMessageStatus(chat.id, newMessage.id, newMessage.status);
  }
  if (wasArchived && activeFilter === Filter.ARCHIVED) {
    setActiveFilter(Filter.ALL);
  } else {
    renderChats(chatSearchInput.value);
  }
  renderChatView(chat);
  return { wasArchived };
}

function createChat(nameInput) {
  const rawName = typeof nameInput === "string" ? nameInput.trim() : "";
  const normalizedName =
    rawName && typeof rawName.normalize === "function" ? rawName.normalize("NFKD") : rawName;
  const sanitizedIdBase = normalizedName
    ? normalizedName
        .replace(/\p{M}+/gu, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    : "";
  const existingIds = new Set(chats.map((chat) => chat.id));
  let candidateId = sanitizedIdBase || "";
  if (!candidateId) {
    candidateId = crypto.randomUUID();
  } else {
    let suffix = 2;
    while (existingIds.has(candidateId)) {
      candidateId = `${sanitizedIdBase}-${suffix}`;
      suffix += 1;
      if (suffix > existingIds.size + 5) {
        candidateId = crypto.randomUUID();
        break;
      }
    }
  }

  const name = rawName || "New chat";
  const newChat = {
    id: candidateId,
    name,
    status: "online",
    avatar: name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    isStarred: false,
    isArchived: false,
    messages: [],
  };

  chats = [newChat, ...chats];
  saveState(chats);
  if (activeFilter !== Filter.ALL) {
    activeFilter = Filter.ALL;
    updateFilterChips();
  }
  chatSearchInput.value = "";
  openChat(newChat.id);
}

function handleSend() {
  const text = messageInput.value.trim();
  const chat = getActiveChat();
  if (!chat) return;

  const hasText = Boolean(text);
  const hasAttachments = pendingAttachments.length > 0;
  if (!hasText && !hasAttachments) {
    return;
  }

  const attachmentsToSend = pendingAttachments
    .map(cloneAttachment)
    .filter(Boolean);
  clearPendingAttachments(chat.id, { silent: true });
  renderComposerAttachments();

  const { wasArchived } = addMessageToChat(chat.id, text, "outgoing", attachmentsToSend);
  messageInput.value = "";
  autoResizeTextarea();
  setDraft(chat.id, "");
  renderChats(chatSearchInput.value);

  const toastMessage = wasArchived
    ? "Conversation restored from archive"
    : !hasText && attachmentsToSend.length > 1
    ? "Attachments sent"
    : !hasText && attachmentsToSend.length === 1
    ? "Attachment sent"
    : "Message sent";
  showToast(toastMessage);
}

function handleMessageInput(event) {
  autoResizeTextarea();
  const chat = getActiveChat();
  if (!chat) return;
  const value = event.target.value;
  setDraft(chat.id, value);
  renderChats(chatSearchInput.value);
}

function removePendingAttachment(attachmentId) {
  if (!attachmentId) return;
  const initialLength = pendingAttachments.length;
  pendingAttachments = pendingAttachments.filter((attachment) => attachment.id !== attachmentId);
  if (pendingAttachments.length === initialLength) {
    return;
  }
  if (activeChatId) {
    setAttachmentDraft(activeChatId, pendingAttachments);
  }
  renderComposerAttachments();
  renderChats(chatSearchInput.value);
}

function clearPendingAttachments(chatId = activeChatId, { silent = false } = {}) {
  if (chatId) {
    setAttachmentDraft(chatId, []);
  }
  if (chatId === activeChatId) {
    pendingAttachments = [];
    if (!silent) {
      renderComposerAttachments();
    }
  }
  if (!silent) {
    renderChats(chatSearchInput.value);
  }
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

async function handleAttachmentSelection(event) {
  const input = event.target;
  if (!(input instanceof HTMLInputElement)) return;

  const chat = getActiveChat();
  if (!chat) {
    showToast("Select a chat to add attachments");
    input.value = "";
    return;
  }

  const files = Array.from(input.files ?? []);
  input.value = "";
  if (!files.length) return;

  const availableSlots = MAX_COMPOSER_ATTACHMENTS - pendingAttachments.length;
  if (availableSlots <= 0) {
    showToast(`You can add up to ${MAX_COMPOSER_ATTACHMENTS} attachments per message`);
    return;
  }

  const selectedFiles = files.slice(0, availableSlots);
  if (selectedFiles.length < files.length) {
    showToast(
      `Only the first ${availableSlots} attachment${availableSlots === 1 ? "" : "s"} were added`
    );
  }

  const newAttachments = [];
  for (const file of selectedFiles) {
    try {
      const dataUrl = await readFileAsDataURL(file);
      const kind = deriveAttachmentKind(file.type);
      const attachment = normalizeAttachment({
        id: crypto.randomUUID(),
        name:
          file.name ||
          (kind === AttachmentKind.IMAGE
            ? "Image"
            : kind === AttachmentKind.VIDEO
            ? "Video"
            : kind === AttachmentKind.AUDIO
            ? "Audio"
            : "Document"),
        type: file.type || "",
        size: file.size,
        dataUrl,
        kind,
      });
      if (attachment) {
        newAttachments.push(attachment);
      }
    } catch (error) {
      console.error("Failed to read attachment", error);
      showToast(`Couldn't add ${file.name || "file"}`);
    }
  }

  if (!newAttachments.length) return;

  pendingAttachments = [...pendingAttachments, ...newAttachments];
  if (activeChatId) {
    setAttachmentDraft(activeChatId, pendingAttachments);
  }
  renderComposerAttachments();
  renderChats(chatSearchInput.value);
}

function handleNewChat() {
  const name = prompt("Who would you like to message?");
  if (typeof name !== "string") return;
  const trimmed = name.trim();
  if (!trimmed) return;
  createChat(trimmed);
  showToast(`Started a chat with ${trimmed}`);
}

function handleSearch(event) {
  renderChats(event.target.value);
}

function exportActiveChat() {
  const chat = getActiveChat();
  if (!chat) {
    showToast("Select a chat to export");
    return;
  }

  const exportPayload = {
    id: chat.id,
    name: chat.name,
    status: chat.status,
    isStarred: chat.isStarred,
    isArchived: chat.isArchived,
    exportedAt: new Date().toISOString(),
    draft: getDraft(chat.id) ?? "",
    messages: chat.messages.map((message) => ({
      id: message.id,
      text: message.text,
      direction: message.direction,
      sentAt: message.sentAt,
      timestamp: message.timestamp,
      status: message.status ?? null,
      attachments: Array.isArray(message.attachments)
        ? message.attachments.map((attachment) => normalizeAttachment(attachment)).filter(Boolean)
        : [],
    })),
  };

  const serialized = JSON.stringify(exportPayload, null, 2);
  const blob = new Blob([serialized], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  const safeName = chat.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 50) || "chat";
  anchor.download = `${safeName}-export.json`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 0);

  showToast(`Exported ${chat.name}`);
}

function toggleStar() {
  const chat = getActiveChat();
  if (!chat) return;
  chat.isStarred = !chat.isStarred;
  saveState(chats);
  if (!chat.isStarred && activeFilter === Filter.STARRED) {
    setActiveFilter(Filter.ALL);
  } else {
    renderChats(chatSearchInput.value);
  }
  renderChatView(chat);
  showToast(chat.isStarred ? "Conversation starred" : "Removed star");
}

function toggleArchive() {
  const chat = getActiveChat();
  if (!chat) return;
  const willArchive = !chat.isArchived;
  chat.isArchived = willArchive;
  saveState(chats);
  if (willArchive) {
    activeChatId = null;
    renderChatView(null);
  } else {
    renderChatView(chat);
  }
  if (!willArchive && activeFilter === Filter.ARCHIVED) {
    setActiveFilter(Filter.ALL);
  } else {
    renderChats(chatSearchInput.value);
  }
  showToast(willArchive ? "Conversation archived" : "Conversation restored");
}

function autoResizeTextarea() {
  messageInput.style.height = "auto";
  messageInput.style.height = `${messageInput.scrollHeight}px`;
}

let toastTimeout = null;
let isEmojiPickerOpen = false;
let emojiOutsideClickHandler = null;
let isMessageSearchOpen = false;
let activeMessageSearchQuery = "";
let messageSearchMatches = [];
let activeMessageSearchIndex = 0;
let shouldScrollToActiveSearchMatch = false;
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("toast--visible");

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("toast--visible");
  }, 2000);
}

function buildEmojiPicker() {
  if (!emojiPicker) return;
  emojiPicker.innerHTML = "";

  EMOJI_CHARACTERS.forEach((emoji) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "emoji-picker__emoji";
    button.textContent = emoji;
    button.dataset.emoji = emoji;
    button.setAttribute("aria-label", `Insert ${emoji} emoji`);
    button.setAttribute("role", "menuitem");
    button.addEventListener("click", () => {
      insertEmoji(emoji);
      closeEmojiPicker();
    });
    emojiPicker.appendChild(button);
  });
}

function insertEmoji(emoji) {
  if (!messageInput) return;
  const chat = getActiveChat();
  if (!chat) return;

  const selectionStart = messageInput.selectionStart ?? messageInput.value.length;
  const selectionEnd = messageInput.selectionEnd ?? messageInput.value.length;
  const before = messageInput.value.slice(0, selectionStart);
  const after = messageInput.value.slice(selectionEnd);
  const nextValue = `${before}${emoji}${after}`;

  messageInput.value = nextValue;
  const caretPosition = selectionStart + emoji.length;
  messageInput.focus();
  messageInput.setSelectionRange(caretPosition, caretPosition);
  autoResizeTextarea();
  setDraft(chat.id, nextValue);
  renderChats(chatSearchInput.value);
}

function handleEmojiOutsideClick(event) {
  if (!emojiPicker || !isEmojiPickerOpen) return;
  const target = event.target;
  if (!(target instanceof Node)) return;
  if (emojiPicker.contains(target)) return;
  if (emojiButton && emojiButton.contains(target)) return;
  closeEmojiPicker();
}

function openEmojiPicker() {
  if (!emojiPicker || isEmojiPickerOpen) return;
  if (!emojiPicker.childElementCount) {
    buildEmojiPicker();
  }
  emojiPicker.hidden = false;
  emojiPicker.classList.add("emoji-picker--visible");
  isEmojiPickerOpen = true;
  if (emojiButton) {
    emojiButton.setAttribute("aria-expanded", "true");
  }
  emojiOutsideClickHandler = handleEmojiOutsideClick;
  document.addEventListener("pointerdown", emojiOutsideClickHandler);
}

function closeEmojiPicker({ restoreFocus = false } = {}) {
  if (!emojiPicker || !isEmojiPickerOpen) return;
  emojiPicker.hidden = true;
  emojiPicker.classList.remove("emoji-picker--visible");
  isEmojiPickerOpen = false;
  if (emojiButton) {
    emojiButton.setAttribute("aria-expanded", "false");
  }
  if (emojiOutsideClickHandler) {
    document.removeEventListener("pointerdown", emojiOutsideClickHandler);
    emojiOutsideClickHandler = null;
  }
  if (restoreFocus && emojiButton instanceof HTMLElement) {
    emojiButton.focus();
  }
}

function toggleEmojiPicker() {
  if (isEmojiPickerOpen) {
    closeEmojiPicker({ restoreFocus: true });
  } else {
    openEmojiPicker();
  }
}

function showSidebar() {
  sidebarElement.classList.add("sidebar--visible");
}

function hideSidebar() {
  sidebarElement.classList.remove("sidebar--visible");
}

function maybeHideSidebar() {
  if (window.innerWidth > 900) return;
  hideSidebar();
}

function setupMobileHeader() {
  const backButton = document.createElement("button");
  backButton.className = "icon-button chat__back-button hidden";
  backButton.textContent = "←";
  backButton.setAttribute("aria-label", "Back to chats");

  backButton.addEventListener("click", () => {
    activeChatId = null;
    renderChatView(null);
    showSidebar();
  });

  chatHeaderElement.prepend(backButton);

  const observer = new ResizeObserver(() => {
    if (window.innerWidth <= 900) {
      backButton.classList.remove("hidden");
      hideSidebar();
    } else {
      backButton.classList.add("hidden");
      showSidebar();
    }
  });
  observer.observe(document.body);
}

function setupKeyboardShortcuts() {
  window.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      if (document.activeElement === messageInput) {
        event.preventDefault();
        handleSend();
      }
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      chatSearchInput.focus();
    }

    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "f") {
      const activeElement = document.activeElement;
      if (
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement
      ) {
        if (activeElement === messageSearchInput) {
          return;
        }
      }
      event.preventDefault();
      openMessageSearch();
    }
  });
}

function openSettings() {
  if (!settingsModal) return;
  if (!settingsModal.hidden) return;
  settingsRestoreFocusTo =
    document.activeElement instanceof HTMLElement ? document.activeElement : null;
  settingsModal.hidden = false;
  document.body.classList.add("modal-open");
  updateThemeControls(activeTheme);
  updateWallpaperControls(activeWallpaper);
  const focusTarget =
    themeInputs.find((input) => input.value === activeTheme) ??
    wallpaperInputs.find((input) => input.value === activeWallpaper) ??
    themeInputs[0] ??
    wallpaperInputs[0] ??
    settingsCloseButton ??
    settingsModal.querySelector("button, input");
  if (focusTarget instanceof HTMLElement) {
    focusTarget.focus();
  }
}

function closeSettings() {
  if (!settingsModal) return;
  if (settingsModal.hidden) return;
  settingsModal.hidden = true;
  document.body.classList.remove("modal-open");
  const restoreTarget = settingsRestoreFocusTo;
  settingsRestoreFocusTo = null;
  if (restoreTarget instanceof HTMLElement) {
    restoreTarget.focus();
  } else if (settingsButton) {
    settingsButton.focus();
  }
}

function trapSettingsFocus(event) {
  if (!settingsModal || settingsModal.hidden) return;
  if (event.key !== "Tab") return;

  const focusableSelectors =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const focusable = Array.from(settingsModal.querySelectorAll(focusableSelectors)).filter(
    (element) =>
      element instanceof HTMLElement &&
      !element.hasAttribute("data-close-modal") &&
      element.offsetParent !== null
  );

  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey) {
    if (document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
  } else if (document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function hydrate() {
  applyTheme(activeTheme);
  applyWallpaper(activeWallpaper);
  updateThemeControls(activeTheme);
  updateWallpaperControls(activeWallpaper);
  updateFilterChips();
  renderChats();
  pruneDrafts();
  pruneAttachmentDrafts();
  renderChatView(null);
  resumePendingStatuses();
  buildEmojiPicker();

  chatSearchInput.addEventListener("input", handleSearch);
  newChatButton.addEventListener("click", handleNewChat);
  sendButton.addEventListener("click", handleSend);
  messageInput.addEventListener("input", handleMessageInput);
  messageInput.addEventListener("focus", () => closeEmojiPicker());
  if (attachmentButton && attachmentInput) {
    attachmentButton.addEventListener("click", () => {
      const chat = getActiveChat();
      if (!chat) {
        showToast("Select a chat to add attachments");
        return;
      }
      closeEmojiPicker();
      attachmentInput.click();
    });
    attachmentInput.addEventListener("change", handleAttachmentSelection);
  }
  if (exportChatButton) {
    exportChatButton.addEventListener("click", exportActiveChat);
    exportChatButton.disabled = true;
  }
  toggleStarButton.addEventListener("click", toggleStar);
  toggleArchiveButton.addEventListener("click", toggleArchive);
  if (openMessageSearchButton) {
    openMessageSearchButton.addEventListener("click", () => {
      if (isMessageSearchOpen) {
        focusMessageSearchInput({ select: true });
      } else {
        openMessageSearch();
      }
    });
  }
  if (messageSearchCloseButton) {
    messageSearchCloseButton.addEventListener("click", () => closeMessageSearch());
  }
  if (messageSearchInput) {
    messageSearchInput.addEventListener("input", handleMessageSearchInput);
    messageSearchInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        goToNextSearchResult();
      }
    });
  }
  if (messageSearchPrevButton) {
    messageSearchPrevButton.addEventListener("click", () => goToPreviousSearchResult());
  }
  if (messageSearchNextButton) {
    messageSearchNextButton.addEventListener("click", () => goToNextSearchResult());
  }
  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      setActiveFilter(chip.dataset.filter);
    });
  });

  if (settingsButton) {
    settingsButton.addEventListener("click", openSettings);
  }
  if (settingsCloseButton) {
    settingsCloseButton.addEventListener("click", closeSettings);
  }
  if (settingsModal) {
    settingsModal.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.hasAttribute("data-close-modal")) {
        closeSettings();
      }
    });
    settingsModal.addEventListener("keydown", trapSettingsFocus);
  }
  themeInputs.forEach((input) => {
    input.addEventListener("change", (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement) {
        setTheme(target.value);
      }
    });
  });

  wallpaperInputs.forEach((input) => {
    input.addEventListener("change", (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement) {
        setWallpaper(target.value);
      }
    });
  });

  if (emojiButton) {
    emojiButton.addEventListener("click", () => {
      if (!getActiveChat()) {
        showToast("Select a chat to start sending emojis");
        return;
      }
      toggleEmojiPicker();
    });
  }

  setupKeyboardShortcuts();
  setupMobileHeader();

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      chats = loadState();
      drafts = loadDrafts();
      attachmentDrafts = loadAttachmentDrafts();
      activeTheme = loadTheme();
      applyTheme(activeTheme);
      updateThemeControls(activeTheme);
      activeWallpaper = loadWallpaper();
      applyWallpaper(activeWallpaper);
      updateWallpaperControls(activeWallpaper);
      pruneDrafts();
      pruneAttachmentDrafts();
      pendingAttachments = activeChatId ? getAttachmentDraft(activeChatId) : [];
      renderChats(chatSearchInput.value);
      renderChatView(getActiveChat());
      renderComposerAttachments();
      resumePendingStatuses();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    if (isMessageSearchOpen) {
      event.preventDefault();
      closeMessageSearch();
      return;
    }

    if (isEmojiPickerOpen) {
      event.preventDefault();
      closeEmojiPicker({ restoreFocus: true });
      return;
    }

    if (settingsModal && !settingsModal.hidden) {
      closeSettings();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      showSidebar();
    }
  });

  showSidebar();
}

hydrate();
