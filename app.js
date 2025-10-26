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
const emojiButton = document.getElementById("emoji-button");
const emojiPicker = document.getElementById("emoji-picker");
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

const chatItemTemplate = document.getElementById("chat-item-template");
const messageTemplate = document.getElementById("message-template");

const STORAGE_KEY = "whatsapp-clone-state-v1";
const DRAFTS_STORAGE_KEY = "whatsapp-clone-drafts-v1";
const THEME_STORAGE_KEY = "whatsapp-clone-theme";

const Theme = {
  DARK: "dark",
  LIGHT: "light",
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

function normalizeMessage(message) {
  if (!message) return null;

  const normalized = { ...message };
  if (!normalized.sentAt) {
    normalized.sentAt = deriveISOFromLegacyTimestamp(normalized.timestamp);
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

function formatMessagePreview(message) {
  if (!message) return "No messages yet";
  const prefix = message.direction === "outgoing" ? "You: " : "";
  const { icon } = getMessageStatusDetails(message);
  const statusIcon = message.direction === "outgoing" && icon ? `${icon} ` : "";
  return `${prefix}${statusIcon}${message.text}`;
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
  updateThemeControls(activeTheme);
  saveTheme(activeTheme);
  showToast(
    activeTheme === Theme.DARK ? "Switched to dark theme" : "Switched to light theme"
  );
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
let activeTheme = loadTheme();
let activeChatId = null;
let activeFilter = Filter.ALL;
let settingsRestoreFocusTo = null;

function getActiveChat() {
  return chats.find((chat) => chat.id === activeChatId) ?? null;
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
    if (draftText) {
      previewNode.textContent = `Draft: ${draftText}`;
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

function renderChatView(chat) {
  if (!chat) {
    closeEmojiPicker();
    chatPlaceholderElement.hidden = false;
    chatHeaderElement.hidden = true;
    chatComposerElement.hidden = true;
    chatMessagesElement.innerHTML = "";
    messageInput.value = "";
    autoResizeTextarea();
    return;
  }

  chatPlaceholderElement.hidden = true;
  chatHeaderElement.hidden = false;
  chatComposerElement.hidden = false;
  closeEmojiPicker();

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
  chat.messages.forEach((message) => {
    const messageNode = messageTemplate.content.firstElementChild.cloneNode(true);
    messageNode.classList.add(
      message.direction === "outgoing" ? "message--outgoing" : "message--incoming"
    );

    const textNode = messageNode.querySelector(".message__text");
    const metaNode = messageNode.querySelector(".message__meta");
    const timeNode = messageNode.querySelector(".message__time");
    const statusNode = messageNode.querySelector(".message__status");

    const formattedTime = formatMessageTimestamp(message);
    textNode.textContent = message.text;

    if (timeNode) {
      timeNode.textContent = formattedTime;
      if (message.sentAt) {
        timeNode.dateTime = message.sentAt;
      } else {
        timeNode.removeAttribute("dateTime");
      }
    }

    const accessibleParts = [];
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

  chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;

  const draftValue = getDraft(chat.id) ?? "";
  messageInput.value = draftValue;
  autoResizeTextarea();
}

function openChat(chatId) {
  activeChatId = chatId;
  const chat = getActiveChat();
  renderChats(chatSearchInput.value);
  renderChatView(chat);
  maybeHideSidebar();
}

function addMessageToChat(chatId, text, direction = "outgoing") {
  const chat = chats.find((c) => c.id === chatId);
  if (!chat) return { wasArchived: false };

  const sentAt = new Date();
  const isOutgoing = direction === "outgoing";
  const newMessage = {
    id: crypto.randomUUID(),
    text,
    direction,
    sentAt: sentAt.toISOString(),
    timestamp: formatTimeFromDate(sentAt),
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

function createChat(name) {
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || crypto.randomUUID();
  const newChat = {
    id,
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
  if (!text) return;

  const chat = getActiveChat();
  if (!chat) return;

  const { wasArchived } = addMessageToChat(chat.id, text, "outgoing");
  messageInput.value = "";
  autoResizeTextarea();
  setDraft(chat.id, "");
  renderChats(chatSearchInput.value);
  showToast(wasArchived ? "Conversation restored from archive" : "Message sent");
}

function handleMessageInput(event) {
  autoResizeTextarea();
  const chat = getActiveChat();
  if (!chat) return;
  const value = event.target.value;
  setDraft(chat.id, value);
  renderChats(chatSearchInput.value);
}

function handleNewChat() {
  const name = prompt("Who would you like to message?");
  if (!name) return;
  createChat(name);
  showToast(`Started a chat with ${name}`);
}

function handleSearch(event) {
  renderChats(event.target.value);
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

    if (event.ctrlKey && event.key.toLowerCase() === "k") {
      event.preventDefault();
      chatSearchInput.focus();
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
  const focusTarget =
    themeInputs.find((input) => input.value === activeTheme) ??
    themeInputs[0] ??
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
  updateThemeControls(activeTheme);
  updateFilterChips();
  renderChats();
  pruneDrafts();
  renderChatView(null);
  resumePendingStatuses();
  buildEmojiPicker();

  chatSearchInput.addEventListener("input", handleSearch);
  newChatButton.addEventListener("click", handleNewChat);
  sendButton.addEventListener("click", handleSend);
  messageInput.addEventListener("input", handleMessageInput);
  messageInput.addEventListener("focus", () => closeEmojiPicker());
  toggleStarButton.addEventListener("click", toggleStar);
  toggleArchiveButton.addEventListener("click", toggleArchive);
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
      activeTheme = loadTheme();
      applyTheme(activeTheme);
      updateThemeControls(activeTheme);
      pruneDrafts();
      renderChats(chatSearchInput.value);
      renderChatView(getActiveChat());
      resumePendingStatuses();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

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
