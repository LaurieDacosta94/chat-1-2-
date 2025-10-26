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
const closeSettingsButton = document.getElementById("close-settings-button");
const themeInputs = Array.from(document.querySelectorAll('input[name="theme"]'));
const densityInputs = Array.from(document.querySelectorAll('input[name="density"]'));
const reduceMotionToggle = document.getElementById("reduce-motion-toggle");

const chatItemTemplate = document.getElementById("chat-item-template");
const messageTemplate = document.getElementById("message-template");

const STORAGE_KEY = "whatsapp-clone-state-v1";
const PREFERENCES_KEY = "whatsapp-clone-preferences-v1";

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
      },
    ],
  },
];

const Filter = {
  ALL: "all",
  STARRED: "starred",
  ARCHIVED: "archived",
};

const systemThemeQuery =
  typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: light)")
    : null;

const defaultPreferences = {
  theme: "system",
  density: "comfortable",
  reduceMotion: false,
};

function detectSystemTheme() {
  if (!systemThemeQuery) return "dark";
  return systemThemeQuery.matches ? "light" : "dark";
}

function resolveTheme(themePreference) {
  if (themePreference === "light" || themePreference === "dark") {
    return themePreference;
  }
  return detectSystemTheme();
}

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

function loadPreferences() {
  try {
    const raw = localStorage.getItem(PREFERENCES_KEY);
    if (!raw) return { ...defaultPreferences };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return { ...defaultPreferences };
    }
    return { ...defaultPreferences, ...parsed };
  } catch (error) {
    console.error("Failed to load preferences", error);
    return { ...defaultPreferences };
  }
}

function savePreferences(state) {
  localStorage.setItem(PREFERENCES_KEY, JSON.stringify(state));
}

function applyPreferences(currentPreferences) {
  const root = document.documentElement;
  const resolvedTheme = resolveTheme(currentPreferences.theme);
  root.dataset.theme = resolvedTheme;
  root.dataset.themePreference = currentPreferences.theme;
  root.dataset.motion = currentPreferences.reduceMotion ? "reduced" : "standard";
  document.body.dataset.density = currentPreferences.density;

  if (currentPreferences.reduceMotion) {
    document.body.style.setProperty("scroll-behavior", "auto");
  } else {
    document.body.style.removeProperty("scroll-behavior");
  }
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

function formatMessagePreview(message) {
  if (!message) return "No messages yet";
  const prefix = message.direction === "outgoing" ? "You: " : "";
  return `${prefix}${message.text}`;
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

let preferences = loadPreferences();
applyPreferences(preferences);
let lastFocusedElementBeforeModal = null;

function updatePreferenceControls() {
  themeInputs.forEach((input) => {
    input.checked = preferences.theme === input.value;
  });

  densityInputs.forEach((input) => {
    input.checked = preferences.density === input.value;
  });

  if (reduceMotionToggle) {
    reduceMotionToggle.checked = preferences.reduceMotion;
  }
}

function openSettings() {
  if (!settingsModal) return;
  updatePreferenceControls();
  lastFocusedElementBeforeModal =
    document.activeElement instanceof HTMLElement ? document.activeElement : null;

  settingsModal.hidden = false;
  document.body.classList.add("modal-open");
  requestAnimationFrame(() => {
    settingsModal.classList.add("modal--visible");
  });

  const initialFocus =
    settingsModal.querySelector("input:checked") ?? settingsModal.querySelector("input");
  if (initialFocus instanceof HTMLElement) {
    initialFocus.focus();
  }
}

function closeSettings({ restoreFocus = true } = {}) {
  if (!settingsModal || settingsModal.hidden) return;

  const finalize = () => {
    settingsModal.hidden = true;
    settingsModal.removeEventListener("transitionend", finalize);
  };

  settingsModal.classList.remove("modal--visible");

  if (preferences.reduceMotion) {
    finalize();
  } else {
    settingsModal.addEventListener("transitionend", finalize);
    window.setTimeout(finalize, 260);
  }

  document.body.classList.remove("modal-open");

  if (restoreFocus) {
    const fallback =
      lastFocusedElementBeforeModal && typeof lastFocusedElementBeforeModal.focus === "function"
        ? lastFocusedElementBeforeModal
        : settingsButton;
    fallback?.focus?.();
  }

  lastFocusedElementBeforeModal = null;
}

function commitPreferences(partial) {
  const previous = preferences;
  preferences = { ...preferences, ...partial };
  savePreferences(preferences);
  applyPreferences(preferences);
  updatePreferenceControls();

  if (
    partial.density &&
    previous.density &&
    partial.density !== previous.density &&
    document.body.contains(messageInput)
  ) {
    autoResizeTextarea();
  }
}

function initializePreferences() {
  if (settingsButton) {
    settingsButton.addEventListener("click", openSettings);
  }

  if (closeSettingsButton) {
    closeSettingsButton.addEventListener("click", () => closeSettings());
  }

  if (settingsModal) {
    settingsModal.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.hasAttribute("data-close-modal")) {
        closeSettings();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && settingsModal && !settingsModal.hidden) {
      closeSettings();
    }
  });

  themeInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (!input.checked) return;
      commitPreferences({ theme: input.value });
    });
  });

  densityInputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (!input.checked) return;
      commitPreferences({ density: input.value });
    });
  });

  if (reduceMotionToggle) {
    reduceMotionToggle.addEventListener("change", () => {
      commitPreferences({ reduceMotion: reduceMotionToggle.checked });
    });
  }

  if (systemThemeQuery) {
    const handleSystemThemeChange = () => {
      if (preferences.theme === "system") {
        applyPreferences(preferences);
      }
    };

    if (typeof systemThemeQuery.addEventListener === "function") {
      systemThemeQuery.addEventListener("change", handleSystemThemeChange);
    } else if (typeof systemThemeQuery.addListener === "function") {
      systemThemeQuery.addListener(handleSystemThemeChange);
    }
  }

  updatePreferenceControls();
}

let chats = loadState();
let activeChatId = null;
let activeFilter = Filter.ALL;

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
    if (lastMessage) {
      timestampNode.textContent = formatMessageTimestamp(lastMessage);
      previewNode.textContent = formatMessagePreview(lastMessage);
    } else {
      timestampNode.textContent = "";
      previewNode.textContent = "No messages yet";
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
    chatPlaceholderElement.hidden = false;
    chatHeaderElement.hidden = true;
    chatComposerElement.hidden = true;
    chatMessagesElement.innerHTML = "";
    return;
  }

  chatPlaceholderElement.hidden = true;
  chatHeaderElement.hidden = false;
  chatComposerElement.hidden = false;

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

    textNode.textContent = message.text;
    metaNode.textContent = formatMessageTimestamp(message);

    chatMessagesElement.appendChild(messageNode);
  });

  chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
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
  const newMessage = {
    id: crypto.randomUUID(),
    text,
    direction,
    sentAt: sentAt.toISOString(),
    timestamp: formatTimeFromDate(sentAt),
  };
  chat.messages.push(newMessage);
  chat.messages.sort((a, b) => getMessageTimeValue(a) - getMessageTimeValue(b));

  const wasArchived = chat.isArchived;
  if (wasArchived) {
    chat.isArchived = false;
  }

  saveState(chats);
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
  showToast(wasArchived ? "Conversation restored from archive" : "Message sent");
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

function hydrate() {
  updateFilterChips();
  renderChats();
  renderChatView(null);

  chatSearchInput.addEventListener("input", handleSearch);
  newChatButton.addEventListener("click", handleNewChat);
  sendButton.addEventListener("click", handleSend);
  messageInput.addEventListener("input", autoResizeTextarea);
  toggleStarButton.addEventListener("click", toggleStar);
  toggleArchiveButton.addEventListener("click", toggleArchive);
  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      setActiveFilter(chip.dataset.filter);
    });
  });

  initializePreferences();
  setupKeyboardShortcuts();
  setupMobileHeader();

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      chats = loadState();
      preferences = loadPreferences();
      applyPreferences(preferences);
      updatePreferenceControls();
      renderChats(chatSearchInput.value);
      renderChatView(getActiveChat());
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
