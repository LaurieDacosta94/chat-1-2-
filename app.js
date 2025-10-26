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

const chatItemTemplate = document.getElementById("chat-item-template");
const messageTemplate = document.getElementById("message-template");

const STORAGE_KEY = "whatsapp-clone-state-v1";

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
        timestamp: "09:20",
        direction: "outgoing",
      },
      {
        id: "m2",
        text: "On my way!",
        timestamp: "09:21",
        direction: "incoming",
      },
      {
        id: "m3",
        text: "Don't forget to review the sprint board before the call.",
        timestamp: "09:24",
        direction: "outgoing",
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
        timestamp: "08:55",
        direction: "incoming",
      },
      {
        id: "m5",
        text: "Looks awesome! I'll review and comment.",
        timestamp: "09:02",
        direction: "outgoing",
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
        timestamp: "09:45",
        direction: "incoming",
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
        timestamp: "08:40",
        direction: "incoming",
      },
      {
        id: "m8",
        text: "Amazing! Can't wait to see everyone.",
        timestamp: "08:41",
        direction: "outgoing",
      },
    ],
  },
];

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialData;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return initialData;
    return parsed.map((chat) => ({
      ...chat,
      messages: chat.messages ?? [],
    }));
  } catch (error) {
    console.error("Failed to load chats", error);
    return initialData;
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let chats = loadState();
let activeChatId = null;

function formatTime(date = new Date()) {
  return date
    .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    .replace(/^0/, "");
}

function getActiveChat() {
  return chats.find((chat) => chat.id === activeChatId) ?? null;
}

function renderChats(filterText = "") {
  chatListElement.innerHTML = "";

  const filtered = chats
    .filter((chat) => !chat.isArchived)
    .filter((chat) =>
      chat.name.toLowerCase().includes(filterText.toLowerCase())
    )
    .sort((a, b) => {
      const aTime = a.messages.at(-1)?.timestamp ?? "00:00";
      const bTime = b.messages.at(-1)?.timestamp ?? "00:00";
      return aTime < bTime ? 1 : -1;
    });

  if (!filtered.length) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.innerHTML = `
      <h2>No chats yet</h2>
      <p>Start a new conversation using the + button.</p>
    `;
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
      timestampNode.textContent = lastMessage.timestamp;
      previewNode.textContent = lastMessage.text;
    } else {
      timestampNode.textContent = "";
      previewNode.textContent = "No messages yet";
    }

    metaNode.textContent = chat.isStarred ? "★" : "";

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
    metaNode.textContent = message.timestamp;

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
  if (!chat) return;

  const newMessage = {
    id: crypto.randomUUID(),
    text,
    timestamp: formatTime(),
    direction,
  };
  chat.messages.push(newMessage);
  saveState(chats);
  renderChats(chatSearchInput.value);
  renderChatView(chat);
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
  renderChats();
  openChat(newChat.id);
}

function handleSend() {
  const text = messageInput.value.trim();
  if (!text) return;

  const chat = getActiveChat();
  if (!chat) return;

  addMessageToChat(chat.id, text, "outgoing");
  messageInput.value = "";
  autoResizeTextarea();
  showToast("Message sent");
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
  renderChats(chatSearchInput.value);
  renderChatView(chat);
  showToast(chat.isStarred ? "Conversation starred" : "Removed star");
}

function toggleArchive() {
  const chat = getActiveChat();
  if (!chat) return;
  chat.isArchived = !chat.isArchived;
  saveState(chats);
  if (chat.isArchived) {
    activeChatId = null;
    renderChatView(null);
  }
  renderChats(chatSearchInput.value);
  showToast(chat.isArchived ? "Conversation archived" : "Conversation restored");
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
  renderChats();
  renderChatView(null);

  chatSearchInput.addEventListener("input", handleSearch);
  newChatButton.addEventListener("click", handleNewChat);
  sendButton.addEventListener("click", handleSend);
  messageInput.addEventListener("input", autoResizeTextarea);
  toggleStarButton.addEventListener("click", toggleStar);
  toggleArchiveButton.addEventListener("click", toggleArchive);

  setupKeyboardShortcuts();
  setupMobileHeader();

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      chats = loadState();
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
