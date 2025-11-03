const sidebarElement = document.querySelector(".sidebar");
const chatListElement = document.getElementById("chat-list");
const chatHeaderElement = document.getElementById("chat-header");
const chatMessagesElement = document.getElementById("chat-messages");
const chatComposerElement = document.getElementById("chat-composer");
const chatPlaceholderElement = document.getElementById("chat-placeholder");
const chatElement = document.getElementById("chat");
const chatNameElement = document.getElementById("chat-name");
const chatStatusElement = document.getElementById("chat-status");
const chatAvatarElement = document.getElementById("chat-avatar");
const chatContactElement = document.getElementById("chat-contact");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");
const exportChatButton = document.getElementById("export-chat");
const emojiButton = document.getElementById("emoji-button");
const emojiPicker = document.getElementById("emoji-picker");
const attachmentButton = document.getElementById("attachment-button");
const attachmentInput = document.getElementById("attachment-input");
const DEFAULT_ATTACHMENT_ACCEPT = attachmentInput?.getAttribute("accept") ?? "";
const DEFAULT_ATTACHMENT_CAPTURE = attachmentInput?.getAttribute("capture") ?? null;
const composerAttachmentsElement = document.getElementById("composer-attachments");
const openMessageSearchButton = document.getElementById("open-message-search");
const messageSearchContainer = document.getElementById("message-search");
const messageSearchInput = document.getElementById("message-search-input");
const messageSearchCloseButton = document.getElementById("message-search-close");
const messageSearchMeta = document.getElementById("message-search-meta");
const messageSearchPrevButton = document.getElementById("message-search-prev");
const messageSearchNextButton = document.getElementById("message-search-next");

if (messageSearchContainer) {
  messageSearchContainer.hidden = true;
  messageSearchContainer.setAttribute("aria-hidden", "true");
}
const chatSearchInput = document.getElementById("chat-search");
const newChatButton = document.getElementById("new-chat-button");
const toggleStarButton = document.getElementById("toggle-star");
const toggleArchiveButton = document.getElementById("toggle-archive");
const manageParticipantsButton = document.getElementById("manage-participants");
const deleteChatButton = document.getElementById("delete-chat");
const chatWallpaperButton = document.getElementById("customize-chat-wallpaper");
const chatParticipantsElement = document.getElementById("chat-participants");
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
const profileButton = document.getElementById("user-profile-button");
const profileAvatarElement = document.getElementById("user-profile-avatar");
const profileNameElement = document.getElementById("user-profile-name");
const profileAboutElement = document.getElementById("user-profile-about");
const profileModal = document.getElementById("profile-modal");
const profileCloseButton = document.getElementById("profile-close");
const profileForm = document.getElementById("profile-form");
const profileNameInput = document.getElementById("profile-name");
const profileAboutInput = document.getElementById("profile-about");
const profilePhoneInput = document.getElementById("profile-phone");
const profileModalAvatarElement = document.getElementById("profile-modal-avatar");
const profileSummaryNameElement = document.getElementById("profile-summary-name");
const profileSummaryAboutElement = document.getElementById("profile-summary-about");
const profileCancelButton = document.getElementById("profile-cancel");
const newContactModal = document.getElementById("new-contact-modal");
const newContactForm = document.getElementById("new-contact-form");
const newContactCloseButton = document.getElementById("new-contact-close");
const newContactCancelButton = document.getElementById("new-contact-cancel");
const newContactPreviewElement = document.getElementById("new-contact-preview");
const newContactLookupElement = document.getElementById("new-contact-lookup");
const newContactSuggestionsElement = document.getElementById("new-contact-suggestions");
const newContactSuggestionsList = document.getElementById("new-contact-suggestions-list");
const newContactBackButton = document.getElementById("new-contact-back");
const newChatListView = document.getElementById("new-chat-list-view");
const newChatContactListElement = document.getElementById("new-chat-contact-list");
const newChatEmptyElement = document.getElementById("new-chat-empty");
const newChatSearchInput = document.getElementById("new-chat-search");
const newChatAddContactButton = document.getElementById("new-chat-add-contact");
const newContactMethodInputs = newContactForm
  ? Array.from(newContactForm.querySelectorAll('input[name="contact-method"]'))
  : [];
const newContactFieldGroups = newContactForm
  ? Array.from(newContactForm.querySelectorAll("[data-contact-fields]"))
  : [];
const newContactNicknameInput = document.getElementById("new-contact-nickname");
const newContactPhoneInput = document.getElementById("new-contact-phone");
const newContactPhoneNameInput = document.getElementById("new-contact-phone-name");
const newContactEmailInput = document.getElementById("new-contact-email");
const newContactEmailNameInput = document.getElementById("new-contact-email-name");
const newContactCardNameInput = document.getElementById("new-contact-card-name");
const newContactCardDetailsInput = document.getElementById("new-contact-card-details");
const newGroupNameInput = document.getElementById("new-group-name");
const newGroupParticipantsInput = document.getElementById("new-group-participants");
const newGroupDescriptionInput = document.getElementById("new-group-description");
const quickPhotoButton = document.getElementById("quick-photo");
const quickVideoButton = document.getElementById("quick-video");
const quickVoiceButton = document.getElementById("quick-voice");
const voiceRecorderElement = document.getElementById("voice-recorder");
const voiceRecorderStatusElement = document.getElementById("voice-recorder-status");
const voiceRecorderTimerElement = document.getElementById("voice-recorder-timer");
const voiceRecorderCancelButton = document.getElementById("voice-recorder-cancel");
const voiceRecorderSendButton = document.getElementById("voice-recorder-send");
const startAudioCallButton = document.getElementById("start-audio-call");
const startVideoCallButton = document.getElementById("start-video-call");
const chatWallpaperModal = document.getElementById("chat-wallpaper-modal");
const chatWallpaperCloseButton = document.getElementById("chat-wallpaper-close");
const chatWallpaperForm = document.getElementById("chat-wallpaper-form");
const chatWallpaperUseDefaultButton = document.getElementById("chat-wallpaper-use-default");
const chatWallpaperApplyButton = document.getElementById("chat-wallpaper-apply");
const chatWallpaperOptions = chatWallpaperForm
  ? Array.from(chatWallpaperForm.querySelectorAll('input[name="chat-wallpaper"]'))
  : [];
const manageParticipantsModal = document.getElementById("manage-participants-modal");
const manageParticipantsCloseButton = document.getElementById("manage-participants-close");
const manageParticipantsCancelButton = document.getElementById("manage-participants-cancel");
const manageParticipantsConfirmButton = document.getElementById("manage-participants-confirm");
const manageParticipantsSearchInput = document.getElementById("manage-participants-search");
const manageParticipantsListElement = document.getElementById("manage-participants-list");
const manageParticipantsEmptyElement = document.getElementById("manage-participants-empty");
const callOverlayElement = document.getElementById("call-overlay");
const callOverlayBackdrop = document.getElementById("call-overlay-backdrop");
const callOverlayCloseButton = document.getElementById("call-overlay-close");
const callOverlayTypeElement = document.getElementById("call-overlay-type");
const callOverlayParticipantsElement = document.getElementById("call-overlay-participants");
const callOverlayNameElement = document.getElementById("call-overlay-name");
const callOverlayStatusElement = document.getElementById("call-overlay-status");
const callOverlayControlsElement = document.getElementById("call-overlay-controls");
const callOverlayCardElement = document.getElementById("call-overlay-card");
const callOverlayIncomingControlsElement = document.getElementById(
  "call-overlay-incoming-controls"
);
const callOverlayAcceptButton = document.getElementById("call-overlay-accept");
const callOverlayDeclineButton = document.getElementById("call-overlay-decline");
const callOverlayMediaElement = document.getElementById("call-overlay-media");
const callOverlayLocalVideoElement = document.getElementById("call-local-video");
const callOverlayLocalVideoWrapper = document.getElementById(
  "call-local-video-wrapper"
);
const callOverlayRemoteVideoElement = document.getElementById("call-remote-video");
const callOverlayRemoteVideoWrapper = document.getElementById(
  "call-remote-video-wrapper"
);
const callOverlayRemoteAudioElement = document.getElementById("call-remote-audio");
const callOverlayLocalVideoLabel = document.getElementById("call-local-video-label");
const callOverlayRemoteVideoLabel = document.getElementById("call-remote-video-label");
const callOverlayControlButtons = Array.from(
  document.querySelectorAll("[data-call-control]")
);
const authOverlayElement = document.getElementById("auth-overlay");
const authLoginForm = document.getElementById("auth-login-form");
const authSignupForm = document.getElementById("auth-signup-form");
const authErrorElement = document.getElementById("auth-error");
const authSwitchButton = document.getElementById("auth-switch");
const authSwitchMessageElement = document.getElementById("auth-switch-message");
const authTitleElement = document.getElementById("auth-title");
const authSubtitleElement = document.getElementById("auth-subtitle");
const authTabsElement = document.getElementById("auth-tabs");
const authTabButtons = Array.from(document.querySelectorAll("[data-auth-tab]"));
const authSubmitButtons = Array.from(document.querySelectorAll("[data-auth-submit]"));
const signOutButton = document.getElementById("sign-out-button");

const chatItemTemplate = document.getElementById("chat-item-template");
const messageTemplate = document.getElementById("message-template");

const STORAGE_KEY = "whatsapp-clone-state-v1";
const DRAFTS_STORAGE_KEY = "whatsapp-clone-drafts-v1";
const THEME_STORAGE_KEY = "whatsapp-clone-theme";
const WALLPAPER_STORAGE_KEY = "whatsapp-clone-wallpaper";
const CHAT_WALLPAPER_OVERRIDES_STORAGE_KEY = "whatsapp-clone-chat-wallpaper-overrides-v1";
const ATTACHMENT_DRAFTS_STORAGE_KEY = "whatsapp-clone-attachment-drafts-v1";
const PROFILE_STORAGE_KEY = "whatsapp-clone-profile-v1";
const AUTH_STORAGE_KEY = "whatsapp-clone-auth-v1";
const CONTACTS_STORAGE_KEY = "whatsapp-clone-contacts-v1";
const STORAGE_NAMESPACE_DEFAULT = "demo";
const LIVE_SESSION_STORAGE_PREFIX = "live-session";

const sessionStore = {
  chats: [],
  drafts: {},
  attachmentDrafts: {},
  contacts: [],
  profile: null,
  chatWallpapers: {},
};

const participantDirectory = new Map();
const participantProfileRequests = new Map();
const linkPreviewCache = new Map();
const linkPreviewRequests = new Map();

let liveSessionStorage = null;
let liveSessionStorageFallback = null;
let hasShownSessionInvalidationToast = false;

function ensureLiveSessionStorage() {
  if (liveSessionStorage !== null) {
    return liveSessionStorage;
  }
  if (typeof window !== "undefined" && window.sessionStorage) {
    try {
      const testKey = "__live_session_test__";
      window.sessionStorage.setItem(testKey, "1");
      window.sessionStorage.removeItem(testKey);
      liveSessionStorage = window.sessionStorage;
      return liveSessionStorage;
    } catch (_error) {
      liveSessionStorage = null;
    }
  }

  if (liveSessionStorageFallback !== null) {
    liveSessionStorage = liveSessionStorageFallback;
    return liveSessionStorage;
  }

  if (typeof window === "undefined" || !window.localStorage) {
    liveSessionStorageFallback = null;
    liveSessionStorage = null;
    return liveSessionStorage;
  }

  liveSessionStorageFallback = {
    getItem(key) {
      try {
        return window.localStorage.getItem(key);
      } catch (_error) {
        return null;
      }
    },
    setItem(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch (_error) {
        // Best effort. Browsers may reject large payloads; ignore to avoid crashes.
      }
    },
    removeItem(key) {
      try {
        window.localStorage.removeItem(key);
      } catch (_error) {
        // Swallow errors to keep sign-out flows resilient.
      }
    },
  };

  liveSessionStorage = liveSessionStorageFallback;
  return liveSessionStorage;
}

function buildLiveSessionKey(baseKey, auth = authState) {
  const namespace = getStorageNamespace(auth);
  return `${LIVE_SESSION_STORAGE_PREFIX}:${baseKey}:${namespace}`;
}

function readLiveSessionValue(baseKey, auth = authState) {
  const storage = ensureLiveSessionStorage();
  if (!storage) {
    return null;
  }
  try {
    const raw = storage.getItem(buildLiveSessionKey(baseKey, auth));
    if (!raw) {
      return null;
    }
    return JSON.parse(raw);
  } catch (error) {
    console.warn(`Failed to parse live session value for ${baseKey}`, error);
    return null;
  }
}

function writeLiveSessionValue(baseKey, value, auth = authState) {
  const storage = ensureLiveSessionStorage();
  if (!storage) {
    return;
  }
  const key = buildLiveSessionKey(baseKey, auth);
  try {
    if (value === undefined) {
      storage.removeItem(key);
      return;
    }
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to persist live session value for ${baseKey}`, error);
  }
}

const LIVE_SESSION_STORAGE_KEYS = [
  STORAGE_KEY,
  DRAFTS_STORAGE_KEY,
  ATTACHMENT_DRAFTS_STORAGE_KEY,
  PROFILE_STORAGE_KEY,
  CONTACTS_STORAGE_KEY,
  CHAT_WALLPAPER_OVERRIDES_STORAGE_KEY,
];

function clearLiveSessionValues(auth = authState) {
  const storage = ensureLiveSessionStorage();
  if (!storage) {
    return;
  }
  LIVE_SESSION_STORAGE_KEYS.forEach((baseKey) => {
    try {
      storage.removeItem(buildLiveSessionKey(baseKey, auth));
    } catch (_error) {
      // Best effort cleanup. Swallow errors so sign-out always completes.
    }
  });
}

let authState = null;
const apiBaseFromDataset =
  typeof document !== "undefined" && document.body?.dataset?.apiBase
    ? document.body.dataset.apiBase.trim()
    : "";
const API_BASE_URL = (() => {
  /**
   * Prefer an explicit `data-api-base` attribute when provided so deployments can
   * point the static frontend at a remote API without editing the script.
   */
  if (apiBaseFromDataset) {
    return apiBaseFromDataset.replace(/\/+$/, "");
  }
  if (window.location.protocol === "file:" || window.location.origin === "null") {
    return "http://localhost:3001";
  }

  const { hostname, port, protocol } = window.location;
  const localhostAliases = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);
  if (localhostAliases.has(hostname) && port === "3000") {
    const backendHost = hostname === "0.0.0.0" ? "127.0.0.1" : hostname;
    const normalizedHost = backendHost.includes(":") ? `[${backendHost}]` : backendHost;
    const scheme = protocol === "https:" ? "https" : "http";
    return `${scheme}://${normalizedHost}:3001`;
  }

  return window.location.origin.replace(/\/+$/, "");
})();
const MAX_COMPOSER_ATTACHMENTS = 6;
const CONTACT_LOOKUP_DEBOUNCE_MS = 350;

const ContactLookupStatus = {
  IDLE: "idle",
  SEARCHING: "searching",
  FOUND: "found",
  NOT_FOUND: "not_found",
  ERROR: "error",
};

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
  LINK_PREVIEW: "link-preview",
  FILE: "file",
};

const ContactMethod = {
  NICKNAME: "nickname",
  PHONE: "phone",
  EMAIL: "email",
  CONTACT_CARD: "contact-card",
  GROUP: "group",
};

const ContactMethodLabels = {
  [ContactMethod.NICKNAME]: "nickname",
  [ContactMethod.PHONE]: "phone number",
  [ContactMethod.EMAIL]: "email address",
  [ContactMethod.CONTACT_CARD]: "contact share",
  [ContactMethod.GROUP]: "group chat",
};

const ChatType = {
  DIRECT: "direct",
  GROUP: "group",
};

const CallType = {
  AUDIO: "audio",
  VIDEO: "video",
};

const CallState = {
  IDLE: "idle",
  INITIATING: "initiating",
  RINGING: "ringing",
  CONNECTING: "connecting",
  CONNECTED: "connected",
  ENDED: "ended",
};

const AuthView = {
  LOGIN: "login",
  SIGNUP: "signup",
};

const CALL_TYPE_LABELS = {
  [CallType.AUDIO]: "Audio call",
  [CallType.VIDEO]: "Video call",
};

const DEFAULT_CALL_RTC_CONFIGURATION = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302"],
    },
  ],
};

const CONTACT_STATUS_MAX_LENGTH = 140;
const NEW_CONTACT_MAX_SOURCE_LENGTH = 2000;

const defaultProfile = {
  name: "",
  about: "",
  phone: "",
};

const MessageStatus = {
  SENT: "sent",
  DELIVERED: "delivered",
  READ: "read",
};

const ToastIntent = {
  INFO: "info",
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
};

const realtimeState = {
  socket: null,
  isAuthenticated: false,
  pendingAuthToken: null,
  activeToken: null,
  pendingChatJoins: new Set(),
  joinedChats: new Set(),
  serverMessageIds: new Map(),
  pendingOutgoing: new Map(),
  pendingOutbound: [],
  pendingReceipts: [],
};

let hasLoggedMissingSocketClient = false;
let chatWallpaperOverrides = {};


const Filter = {
  ALL: "all",
  STARRED: "starred",
  ARCHIVED: "archived",
};

const EMOJI_CATEGORIES = [
  {
    id: "smileys",
    icon: "😊",
    label: "Smileys & People",
    emojis: [
      "😀",
      "😁",
      "😂",
      "🤣",
      "😃",
      "😄",
      "😅",
      "😆",
      "😉",
      "😊",
      "😋",
      "😎",
      "😍",
      "😘",
      "🥰",
      "😗",
      "😙",
      "😚",
      "🙂",
      "🤗",
      "🤩",
      "🤠",
      "🥳",
      "🥸",
      "😜",
      "🤪",
      "🤨",
      "🧐",
      "🤓",
      "😏",
      "😒",
      "😞",
      "😔",
      "😟",
      "😕",
      "🙃",
      "☹️",
      "😣",
      "😖",
      "😫",
      "😩",
      "🥺",
      "😭",
      "😤",
      "😠",
      "😡",
      "🤬",
      "🤯",
      "😳",
      "🥵",
      "🥶",
      "😱",
      "😨",
      "😰",
      "😥",
      "😓",
      "🤤",
      "😴",
      "😪",
      "😵",
      "🤐",
      "🥱",
      "🤫",
      "🤭",
      "🤥",
      "🤢",
      "🤮",
      "🤧",
      "😷",
      "🤒",
      "🤕",
      "🤑",
      "😇",
      "🤡",
    ],
  },
  {
    id: "gestures",
    icon: "👍",
    label: "Gestures & Body",
    emojis: [
      "👍",
      "👎",
      "👌",
      "✌️",
      "🤞",
      "🤟",
      "🤘",
      "🤙",
      "👈",
      "👉",
      "👆",
      "👇",
      "☝️",
      "✋",
      "🤚",
      "🖐️",
      "🖖",
      "👋",
      "🤝",
      "🙏",
      "👏",
      "🙌",
      "👐",
      "🤲",
      "🤜",
      "🤛",
      "💪",
      "🦾",
      "🦵",
      "🦿",
      "🦶",
      "👣",
      "👀",
      "👁️",
      "👅",
      "👄",
      "🧠",
      "🫀",
      "🫁",
      "🦷",
      "🦴",
      "💋",
      "💅",
      "🤳",
      "💆",
      "💇",
      "🧖",
      "🧘",
      "🛀",
      "🛌",
    ],
  },
  {
    id: "animals",
    icon: "🐾",
    label: "Animals & Nature",
    emojis: [
      "🐶",
      "🐱",
      "🐭",
      "🐹",
      "🐰",
      "🦊",
      "🐻",
      "🐼",
      "🐻‍❄️",
      "🐨",
      "🐯",
      "🦁",
      "🐮",
      "🐷",
      "🐸",
      "🐵",
      "🦄",
      "🐔",
      "🐧",
      "🐦",
      "🐤",
      "🦆",
      "🦅",
      "🦉",
      "🦇",
      "🐺",
      "🐗",
      "🐴",
      "🦓",
      "🦌",
      "🐢",
      "🐍",
      "🦎",
      "🐙",
      "🦑",
      "🦀",
      "🐠",
      "🐟",
      "🐡",
      "🐬",
      "🐳",
      "🐋",
      "🦈",
      "🐊",
      "🐅",
      "🐆",
      "🐘",
      "🦏",
      "🦛",
      "🐪",
      "🐫",
      "🦒",
      "🦘",
      "🦬",
      "🐄",
      "🐎",
      "🐑",
      "🐐",
      "🐓",
      "🐕‍🦺",
      "🐩",
      "🐈",
      "🐇",
      "🐁",
      "🐀",
      "🐿️",
      "🦫",
      "🦦",
      "🦥",
      "🦨",
      "🦡",
      "🦢",
      "🦩",
      "🦚",
      "🦜",
      "🌵",
      "🎄",
      "🌲",
      "🌳",
      "🌴",
      "🌱",
      "🌿",
      "☘️",
      "🍀",
      "🍁",
      "🍂",
      "🍃",
      "🌸",
      "🌼",
      "🌻",
      "🌞",
      "🌝",
      "🌚",
      "⭐",
      "🌟",
      "🌠",
      "🌤️",
      "🌧️",
      "⛈️",
      "🌈",
      "❄️",
      "☃️",
      "🔥",
      "💧",
      "🌊",
    ],
  },
  {
    id: "food",
    icon: "🍓",
    label: "Food & Drink",
    emojis: [
      "🍎",
      "🍊",
      "🍋",
      "🍌",
      "🍉",
      "🍇",
      "🍓",
      "🫐",
      "🍒",
      "🍑",
      "🥭",
      "🍍",
      "🥥",
      "🥝",
      "🍅",
      "🍆",
      "🥑",
      "🥦",
      "🥬",
      "🥒",
      "🌶️",
      "🫑",
      "🌽",
      "🥕",
      "🧄",
      "🧅",
      "🥔",
      "🍠",
      "🥐",
      "🥯",
      "🍞",
      "🥖",
      "🥨",
      "🧇",
      "🥞",
      "🧈",
      "🧀",
      "🍗",
      "🍖",
      "🍤",
      "🍣",
      "🍱",
      "🥟",
      "🍜",
      "🍝",
      "🍕",
      "🍔",
      "🍟",
      "🌭",
      "🥪",
      "🌮",
      "🌯",
      "🥗",
      "🥘",
      "🥫",
      "🍲",
      "🍛",
      "🍚",
      "🍙",
      "🍘",
      "🍥",
      "🥠",
      "🧁",
      "🍰",
      "🎂",
      "🍮",
      "🍨",
      "🍦",
      "🥧",
      "🍩",
      "🍪",
      "🍫",
      "🍬",
      "🍭",
      "🍯",
      "🧃",
      "🥤",
      "🧋",
      "🍵",
      "☕",
      "🫖",
      "🍶",
      "🍺",
      "🍻",
      "🥂",
      "🍷",
      "🍸",
      "🍹",
      "🍾",
    ],
  },
  {
    id: "activities",
    icon: "⚽",
    label: "Activities",
    emojis: [
      "⚽",
      "🏀",
      "🏈",
      "⚾",
      "🥎",
      "🎾",
      "🏐",
      "🏉",
      "🎱",
      "🏓",
      "🏸",
      "🥏",
      "🏒",
      "🏑",
      "🥍",
      "🏏",
      "⛳",
      "🪁",
      "🏹",
      "🎣",
      "🤿",
      "🥊",
      "🥋",
      "🎽",
      "🛹",
      "🛼",
      "🛷",
      "⛸️",
      "🥌",
      "🧗",
      "🤺",
      "🤼",
      "🤸",
      "🤾",
      "🏌️",
      "🏇",
      "🧘",
      "🏄",
      "🏊",
      "🤽",
      "🚣",
      "🚵",
      "🚴",
      "🏆",
      "🥇",
      "🥈",
      "🥉",
      "🎖️",
      "🏅",
      "🎗️",
      "🎫",
      "🎟️",
      "🎭",
      "🎪",
      "🎨",
      "🎬",
      "🎤",
      "🎧",
      "🎼",
      "🎹",
      "🥁",
      "🎷",
      "🎺",
      "🎸",
      "🪕",
      "🎻",
      "🪘",
      "🎮",
      "🕹️",
      "🧩",
      "♟️",
      "🪀",
      "🎲",
      "🃏",
      "🀄",
      "🎴",
    ],
  },
  {
    id: "travel",
    icon: "🌍",
    label: "Travel & Places",
    emojis: [
      "🚗",
      "🚕",
      "🚙",
      "🛻",
      "🚐",
      "🚌",
      "🚎",
      "🏎️",
      "🚓",
      "🚑",
      "🚒",
      "🚚",
      "🚛",
      "🚜",
      "🦽",
      "🦼",
      "🛴",
      "🚲",
      "🛵",
      "🏍️",
      "🛺",
      "🚔",
      "🚍",
      "🚘",
      "🚖",
      "✈️",
      "🛩️",
      "🛫",
      "🛬",
      "🛳️",
      "⛴️",
      "🚤",
      "🛥️",
      "🚢",
      "⚓",
      "🚀",
      "🛸",
      "🚁",
      "🚟",
      "🚠",
      "🚡",
      "🚆",
      "🚅",
      "🚄",
      "🚈",
      "🚝",
      "🚞",
      "🚋",
      "🚊",
      "🛤️",
      "🚉",
      "🗺️",
      "🗿",
      "🗽",
      "🗼",
      "🏰",
      "🏯",
      "🏟️",
      "🎡",
      "🎢",
      "🎠",
      "🌋",
      "🗻",
      "🏔️",
      "⛰️",
      "🏕️",
      "🏖️",
      "🏜️",
      "🏝️",
      "🏞️",
      "🏛️",
      "🏗️",
      "🏘️",
      "🏙️",
      "🌆",
      "🌃",
      "🌉",
      "🌁",
    ],
  },
  {
    id: "objects",
    icon: "💡",
    label: "Objects & Symbols",
    emojis: [
      "⌚",
      "📱",
      "💻",
      "⌨️",
      "🖥️",
      "🖨️",
      "🖱️",
      "🖲️",
      "🕹️",
      "🗜️",
      "💽",
      "💾",
      "💿",
      "📀",
      "📷",
      "📹",
      "🎥",
      "📞",
      "☎️",
      "📟",
      "📠",
      "📺",
      "📻",
      "🎙️",
      "🎚️",
      "🎛️",
      "🧭",
      "⏱️",
      "⏲️",
      "⏰",
      "🕰️",
      "⌛",
      "⏳",
      "📡",
      "🔋",
      "🔌",
      "💡",
      "🔦",
      "🕯️",
      "🧯",
      "🛢️",
      "💵",
      "💴",
      "💶",
      "💷",
      "💰",
      "💳",
      "🧾",
      "💸",
      "📧",
      "📨",
      "📩",
      "📤",
      "📥",
      "📦",
      "📫",
      "📮",
      "✉️",
      "📝",
      "✏️",
      "✒️",
      "🖋️",
      "🖊️",
      "🖌️",
      "🖍️",
      "📚",
      "📖",
      "🔖",
      "🧷",
      "🧵",
      "🧶",
      "🧹",
      "🧺",
      "🧼",
      "🧽",
      "🧴",
      "🛒",
      "🎁",
      "🎀",
      "🪄",
      "🔑",
      "🗝️",
      "🔒",
      "🔓",
      "🔏",
      "🔐",
      "⚙️",
      "🪛",
      "🔧",
      "🔨",
      "🛠️",
      "⛏️",
      "⚒️",
      "🛡️",
      "⚔️",
      "🔫",
      "🧨",
      "💣",
      "🔪",
      "🗡️",
      "🚬",
      "⚰️",
      "⚱️",
      "🧿",
      "🛎️",
      "🔔",
      "🎉",
      "🎊",
      "💌",
      "💘",
      "💝",
      "💖",
      "💗",
      "💓",
      "💞",
      "💕",
      "💟",
      "❣️",
      "💔",
      "❤️",
      "🧡",
      "💛",
      "💚",
      "💙",
      "💜",
      "🖤",
      "🤍",
      "🤎",
      "💯",
      "⚠️",
      "✅",
      "❌",
      "❗",
      "❓",
      "❕",
      "❔",
      "♻️",
      "🔁",
      "🔂",
      "🔄",
      "🔃",
      "🆕",
      "🆗",
      "🆒",
      "🆓",
      "🆙",
      "🆚",
    ],
  },
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

function formatVoiceDuration(seconds = 0) {
  const totalSeconds = Math.max(0, Math.round(Number(seconds) || 0));
  const minutes = Math.floor(totalSeconds / 60);
  const remainder = totalSeconds % 60;
  return `${minutes}:${remainder.toString().padStart(2, "0")}`;
}

function writeStringToDataView(view, offset, text) {
  for (let index = 0; index < text.length; index += 1) {
    view.setUint8(offset + index, text.charCodeAt(index));
  }
}

function bytesToBase64(bytes) {
  const chunkSize = 0x8000;
  let binary = "";
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
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

  if (attachment.kind === AttachmentKind.LINK_PREVIEW) {
    const normalizedUrl = normalizePreviewUrl(attachment.url ?? attachment.href ?? "");
    if (!normalizedUrl) {
      return null;
    }

    const normalized = {
      id: attachment.id ?? crypto.randomUUID(),
      kind: AttachmentKind.LINK_PREVIEW,
      url: normalizedUrl,
    };

    if (typeof attachment.title === "string" && attachment.title.trim()) {
      normalized.title = truncateText(attachment.title, 200);
    }
    if (typeof attachment.description === "string" && attachment.description.trim()) {
      normalized.description = truncateText(attachment.description, 280);
    }
    if (typeof attachment.siteName === "string" && attachment.siteName.trim()) {
      normalized.siteName = truncateText(attachment.siteName, 120);
    }
    if (typeof attachment.thumbnailUrl === "string" && attachment.thumbnailUrl.trim()) {
      normalized.thumbnailUrl = attachment.thumbnailUrl.trim();
    }
    if (typeof attachment.favicon === "string" && attachment.favicon.trim()) {
      normalized.favicon = attachment.favicon.trim();
    }
    if (typeof attachment.username === "string" && attachment.username.trim()) {
      normalized.username = attachment.username.trim();
    }

    return normalized;
  }

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

  if (attachment.metadata && typeof attachment.metadata === "object") {
    normalized.metadata = { ...attachment.metadata };
  }

  return normalized;
}

function cloneAttachment(attachment) {
  const normalized = normalizeAttachment(attachment);
  if (!normalized) return null;
  return {
    ...normalized,
    ...(normalized.metadata ? { metadata: { ...normalized.metadata } } : {}),
  };
}

function serializeAttachmentForServer(attachment) {
  const normalized = normalizeAttachment(attachment);
  if (!normalized) return null;

  const payload = {
    id: normalized.id,
    name: normalized.name,
    type: normalized.type,
    kind: normalized.kind,
  };

  if (Number.isFinite(normalized.size)) {
    payload.size = Number(normalized.size);
  }

  if (normalized.dataUrl) {
    payload.dataUrl = normalized.dataUrl;
  }

  if (normalized.metadata && typeof normalized.metadata === "object") {
    payload.metadata = { ...normalized.metadata };
  }

  return payload;
}

function createVoiceNoteAttachment(durationSeconds = 12) {
  const duration = Math.max(1, Math.round(Number(durationSeconds) || 0));
  const sampleRate = 8000;
  const totalSamples = duration * sampleRate;
  const buffer = new ArrayBuffer(44 + totalSamples * 2);
  const view = new DataView(buffer);

  writeStringToDataView(view, 0, "RIFF");
  view.setUint32(4, 36 + totalSamples * 2, true);
  writeStringToDataView(view, 8, "WAVE");
  writeStringToDataView(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStringToDataView(view, 36, "data");
  view.setUint32(40, totalSamples * 2, true);

  let offset = 44;
  for (let index = 0; index < totalSamples; index += 1) {
    const amplitude = Math.sin((2 * Math.PI * 440 * index) / sampleRate) * 0.3;
    view.setInt16(offset, amplitude * 0x7fff, true);
    offset += 2;
  }

  const bytes = new Uint8Array(buffer);
  const base64 = bytesToBase64(bytes);
  const durationLabel = formatVoiceDuration(duration);
  return normalizeAttachment({
    id: crypto.randomUUID(),
    name: `Voice note (${durationLabel}).wav`,
    type: "audio/wav",
    size: bytes.length,
    dataUrl: `data:audio/wav;base64,${base64}`,
    kind: AttachmentKind.AUDIO,
    metadata: { voiceNoteDuration: duration },
  });
}

function truncateText(text, maxLength = CONTACT_STATUS_MAX_LENGTH) {
  const value = typeof text === "string" ? text.trim() : "";
  if (!value) return "";
  if (!Number.isFinite(maxLength) || maxLength <= 0) {
    return value;
  }
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, Math.max(0, maxLength - 1))}…`;
}

function sanitizeStatus(value) {
  return truncateText(value, CONTACT_STATUS_MAX_LENGTH);
}

function normalizePreviewUrl(url) {
  if (typeof url !== "string") {
    return "";
  }
  const trimmed = url.trim();
  if (!trimmed) {
    return "";
  }
  try {
    const parsed = new URL(trimmed);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return "";
    }
    return parsed.toString();
  } catch (_error) {
    return "";
  }
}

function getHostnameFromUrl(url) {
  const normalized = normalizePreviewUrl(url);
  if (!normalized) {
    return "";
  }
  try {
    return new URL(normalized).host;
  } catch (_error) {
    return "";
  }
}

function createLinkPreviewAttachment(preview) {
  if (!preview || typeof preview !== "object") {
    return null;
  }
  const normalizedUrl = normalizePreviewUrl(preview.url ?? preview.link ?? "");
  if (!normalizedUrl) {
    return null;
  }

  const attachment = {
    id: preview.id ?? crypto.randomUUID(),
    kind: AttachmentKind.LINK_PREVIEW,
    url: normalizedUrl,
  };

  if (typeof preview.title === "string" && preview.title.trim()) {
    attachment.title = preview.title.trim();
  }
  if (typeof preview.description === "string" && preview.description.trim()) {
    attachment.description = preview.description.trim();
  }
  if (typeof preview.siteName === "string" && preview.siteName.trim()) {
    attachment.siteName = preview.siteName.trim();
  }

  const imageCandidate =
    (typeof preview.image === "string" && preview.image.trim()) ||
    (typeof preview.thumbnail === "string" && preview.thumbnail.trim()) ||
    "";
  if (imageCandidate) {
    attachment.thumbnailUrl = imageCandidate;
  }

  if (typeof preview.favicon === "string" && preview.favicon.trim()) {
    attachment.favicon = preview.favicon.trim();
  }
  if (typeof preview.username === "string" && preview.username.trim()) {
    attachment.username = preview.username.trim();
  }

  return normalizeAttachment(attachment);
}

function normalizeGroupParticipants(participants = []) {
  const seen = new Set();
  return participants
    .map((participant) =>
      typeof participant === "string" ? participant.trim() : ""
    )
    .filter(Boolean)
    .map((name) => truncateText(name, 60))
    .filter((name) => {
      const key = name.toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
}

function normalizeParticipantAccountIds(accountIds = []) {
  const normalized = [];
  const seen = new Set();

  accountIds.forEach((value) => {
    const accountId = normalizeAccountId(value);
    if (!accountId) {
      return;
    }
    const key = accountId.toLowerCase();
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    normalized.push(accountId);
  });

  return normalized;
}

function deriveGroupStatus(participants = [], description = "") {
  const normalizedParticipants = normalizeGroupParticipants(participants);
  const sanitizedDescription = sanitizeStatus(description);
  const parts = [];
  if (sanitizedDescription) {
    parts.push(sanitizedDescription);
  }
  if (normalizedParticipants.length) {
    const countLabel = `${normalizedParticipants.length} participant${
      normalizedParticipants.length === 1 ? "" : "s"
    }`;
    parts.push(countLabel);
  }
  if (parts.length) {
    return parts.join(" • ");
  }
  if (normalizedParticipants.length) {
    const preview = normalizedParticipants.slice(0, 3).join(", ");
    const extra =
      normalizedParticipants.length > 3
        ? ` +${normalizedParticipants.length - 3}`
        : "";
    return sanitizeStatus(`${preview}${extra}`);
  }
  return "Group chat";
}

function buildGroupTooltip(chat) {
  if (!chat || chat.type !== ChatType.GROUP) return "";
  const names = normalizeGroupParticipants(chat.participants);
  if (!names.length) {
    return "Group chat";
  }
  return `Participants: ${names.join(", ")}`;
}

function upsertParticipantProfile(accountId, { username, displayName } = {}) {
  const normalizedId = normalizeAccountId(accountId);
  if (!normalizedId) {
    return;
  }

  const existing = participantDirectory.get(normalizedId) ?? {};
  const next = { ...existing };

  const trimmedUsername =
    typeof username === "string" && username.trim() ? username.trim() : "";
  const trimmedDisplayName =
    typeof displayName === "string" && displayName.trim()
      ? displayName.trim()
      : "";

  if (trimmedUsername) {
    next.username = trimmedUsername;
  }
  if (trimmedDisplayName) {
    next.displayName = trimmedDisplayName;
  } else if (!next.displayName) {
    next.displayName = next.username || normalizedId;
  }

  participantDirectory.set(normalizedId, next);
}

function ensureSelfParticipant(chat) {
  if (!chat) {
    return false;
  }

  const selfName = getSelfParticipantName();
  const selfId = normalizeAccountId(authState?.user?.id);
  const selfUsername =
    typeof authState?.user?.username === "string" && authState.user.username.trim()
      ? authState.user.username.trim()
      : "";

  let mutated = false;

  const existingNames = Array.isArray(chat.participants)
    ? chat.participants
    : [];
  if (selfName) {
    const updatedNames = normalizeGroupParticipants([...existingNames, selfName]);
    if (
      updatedNames.length !== existingNames.length ||
      existingNames.some((value, index) => value !== updatedNames[index])
    ) {
      chat.participants = updatedNames;
      mutated = true;
    }
  } else if (!Array.isArray(chat.participants)) {
    chat.participants = [];
  }

  if (selfId) {
    upsertParticipantProfile(selfId, {
      username: selfUsername,
      displayName: selfName || selfUsername || undefined,
    });
  }

  return mutated;
}

function maybePromoteChatToGroup(chat) {
  if (!chat || chat.type === ChatType.GROUP) {
    return false;
  }

  const normalizedAccountIds = normalizeParticipantAccountIds(
    Array.isArray(chat.participantAccountIds) ? chat.participantAccountIds : []
  );
  const selfId = normalizeAccountId(authState?.user?.id);
  const otherAccounts = normalizedAccountIds.filter((id) => {
    if (!selfId) return true;
    return id.toLowerCase() !== selfId.toLowerCase();
  });
  const normalizedNames = normalizeGroupParticipants(chat.participants);

  if (otherAccounts.length < 2 && normalizedNames.length < 3) {
    return false;
  }

  chat.type = ChatType.GROUP;
  if (chat.contact) {
    delete chat.contact;
  }
  chat.capabilities = {
    audio: chat.capabilities?.audio !== false,
    video: chat.capabilities?.video !== false,
    phone: false,
  };
  return true;
}

function recordChatParticipant(
  chat,
  { accountId, name, username, isSelf = false } = {}
) {
  if (!chat) {
    return { mutated: false, displayName: "" };
  }

  const normalizedAccountId = normalizeAccountId(accountId);
  const normalizedUsername =
    typeof username === "string" && username.trim() ? username.trim() : "";
  const normalizedName =
    typeof name === "string" && name.trim() ? truncateText(name.trim(), 60) : "";

  if (!Array.isArray(chat.participants)) {
    chat.participants = [];
  }
  if (!Array.isArray(chat.participantAccountIds)) {
    chat.participantAccountIds = [];
  }

  let mutated = false;

  if (normalizedAccountId && !isSelf) {
    const existingIds = normalizeParticipantAccountIds(chat.participantAccountIds);
    const updatedIds = normalizeParticipantAccountIds([
      ...existingIds,
      normalizedAccountId,
    ]);
    if (
      updatedIds.length !== existingIds.length ||
      existingIds.some((value, index) => value !== updatedIds[index])
    ) {
      chat.participantAccountIds = updatedIds;
      mutated = true;
    }
  }

  if (normalizedAccountId) {
    const fallbackDisplayName =
      normalizedName ||
      normalizedUsername ||
      (isSelf ? getSelfParticipantName() : "");
    upsertParticipantProfile(normalizedAccountId, {
      username: normalizedUsername,
      displayName:
        fallbackDisplayName ||
        participantDirectory.get(normalizedAccountId)?.displayName ||
        undefined,
    });
  }

  const label = (() => {
    if (normalizedName) return normalizedName;
    if (isSelf) return getSelfParticipantName();
    if (normalizedUsername) return normalizedUsername;
    if (normalizedAccountId && !isSelf) return normalizedAccountId;
    return "";
  })();

  if (label) {
    const updatedNames = normalizeGroupParticipants([...chat.participants, label]);
    if (
      updatedNames.length !== chat.participants.length ||
      chat.participants.some((value, index) => value !== updatedNames[index])
    ) {
      chat.participants = updatedNames;
      mutated = true;
    }
  }

  if (!isSelf && ensureSelfParticipant(chat)) {
    mutated = true;
  }

  if (maybePromoteChatToGroup(chat)) {
    mutated = true;
  }

  if (mutated && chat.type === ChatType.GROUP) {
    chat.status = deriveGroupStatus(chat.participants, chat.description);
  }

  const profile = normalizedAccountId ? participantDirectory.get(normalizedAccountId) : null;
  const displayName =
    label ||
    profile?.displayName ||
    normalizedUsername ||
    (normalizedAccountId && !isSelf ? normalizedAccountId : "");

  return { mutated, displayName };
}

function updateChatParticipantsFromPayload(chat, payload, message) {
  if (!chat || !payload) {
    return false;
  }

  const senderIdFromPayload = normalizeAccountId(payload?.sender_id);
  const senderIdFromMessage = normalizeAccountId(message?.senderId);
  const senderId = senderIdFromPayload || senderIdFromMessage || null;

  if (message && senderId && !message.senderId) {
    message.senderId = senderId;
  }

  const senderUsernameFromPayload =
    typeof payload?.sender_username === "string" && payload.sender_username.trim()
      ? payload.sender_username.trim()
      : "";
  const senderUsernameFromMessage =
    typeof message?.senderUsername === "string" && message.senderUsername.trim()
      ? message.senderUsername.trim()
      : "";
  const senderUsername = senderUsernameFromPayload || senderUsernameFromMessage;

  if (message && senderUsername && !message.senderUsername) {
    message.senderUsername = senderUsername;
  }

  const selfId = normalizeAccountId(authState?.user?.id);
  const isSelf = senderId && selfId && senderId === selfId;
  const preferredName =
    message?.senderDisplayName ||
    (isSelf ? getSelfParticipantName() : "") ||
    senderUsername ||
    (senderId ? participantDirectory.get(senderId)?.displayName : "");

  const { mutated, displayName } = recordChatParticipant(chat, {
    accountId: senderId,
    name: preferredName,
    username: senderUsername,
    isSelf,
  });

  const authorLabel =
    displayName ||
    preferredName ||
    (isSelf ? getSelfParticipantName() : "") ||
    senderUsername ||
    (senderId || "");

  if (message && authorLabel) {
    message.senderDisplayName = authorLabel;
  }

  if (mutated && chat.type === ChatType.GROUP && isSelf) {
    sendChatParticipantsUpdate(chat);
  }

  return mutated;
}

function updateChatParticipantsFromMessage(chat, message) {
  if (!chat || !message) {
    return false;
  }

  return updateChatParticipantsFromPayload(
    chat,
    { sender_id: message.senderId, sender_username: message.senderUsername },
    message
  );
}

function getMessageAuthorLabel(chat, message) {
  if (!chat || chat.type !== ChatType.GROUP || !message) {
    return "";
  }

  if (typeof message.senderDisplayName === "string" && message.senderDisplayName.trim()) {
    return message.senderDisplayName.trim();
  }

  const senderId = normalizeAccountId(message.senderId);
  const selfId = normalizeAccountId(authState?.user?.id);
  if (senderId && selfId && senderId === selfId) {
    return getSelfParticipantName();
  }

  if (senderId) {
    const profile = participantDirectory.get(senderId);
    if (profile?.displayName) {
      return profile.displayName;
    }
  }

  if (typeof message.senderUsername === "string" && message.senderUsername.trim()) {
    return message.senderUsername.trim();
  }

  if (senderId) {
    return senderId;
  }

  if (message.direction === "outgoing") {
    return getSelfParticipantName();
  }

  return "";
}

function normalizePhoneNumber(value) {
  if (!value && value !== 0) return "";
  const text = String(value).trim();
  if (!text) return "";
  const digitsOnly = text.replace(/\D/g, "");
  if (!digitsOnly) return "";
  const trimmed = text.replace(/\s+/g, "");
  if (trimmed.startsWith("00") && digitsOnly.length > 2) {
    return `+${digitsOnly.slice(2)}`;
  }
  if (trimmed.startsWith("+")) {
    return `+${digitsOnly}`;
  }
  return digitsOnly;
}

function formatPhoneNumberForDisplay(value) {
  const normalized = normalizePhoneNumber(value);
  if (!normalized) return "";
  if (normalized.startsWith("+")) {
    const digits = normalized.slice(1);
    if (!digits) return normalized;
    return `+${digits.replace(/(\d{3})(?=\d)/g, "$1 ").trim()}`;
  }
  const digits = normalized;
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }
  return digits.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
}

function isValidEmail(value) {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(trimmed);
}

function deriveNameFromEmail(email) {
  if (!isValidEmail(email)) return "";
  const [local] = email.split("@");
  if (!local) return "";
  const cleaned = local.replace(/[._-]+/g, " ").replace(/\d+/g, " ").trim();
  if (!cleaned) return "";
  return cleaned
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function parseSharedContactDetails(text) {
  const raw = typeof text === "string" ? text : "";
  const trimmed = raw.trim();
  const result = {
    source: trimmed ? trimmed.slice(0, NEW_CONTACT_MAX_SOURCE_LENGTH) : "",
    name: "",
    nickname: "",
    email: "",
    phone: "",
    phoneDisplay: "",
    notes: "",
  };

  if (!trimmed) {
    return result;
  }

  const lines = trimmed.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

  lines.forEach((line) => {
    if (!line) return;
    const colonIndex = line.indexOf(":");
    let label = "";
    let value = line;
    if (colonIndex > -1 && colonIndex < line.length - 1) {
      label = line.slice(0, colonIndex).trim().toLowerCase();
      value = line.slice(colonIndex + 1).trim();
    }
    if (!value) return;

    if (!result.email) {
      const emailMatch = value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
      if (emailMatch) {
        const email = emailMatch[0].toLowerCase();
        if (isValidEmail(email)) {
          result.email = email;
          return;
        }
      }
    }

    if (!result.phone) {
      const normalizedPhone = normalizePhoneNumber(value);
      if (normalizedPhone) {
        result.phone = normalizedPhone;
        result.phoneDisplay = formatPhoneNumberForDisplay(normalizedPhone);
        return;
      }
    }

    if (label.includes("name") && !result.name) {
      result.name = value;
      return;
    }

    if (label.includes("nick") && !result.nickname) {
      result.nickname = value;
      return;
    }

    if ((label.includes("note") || label.includes("about")) && value) {
      result.notes = result.notes ? `${result.notes} ${value}`.trim() : value;
      return;
    }

    if (!result.name && /[A-Za-z]/.test(value) && !isValidEmail(value)) {
      if (!normalizePhoneNumber(value)) {
        result.name = value;
        return;
      }
    }

    if (!result.notes) {
      result.notes = value;
    }
  });

  if (!result.phoneDisplay && result.phone) {
    result.phoneDisplay = formatPhoneNumberForDisplay(result.phone);
  }

  return result;
}

function buildContactLookupKey(contact) {
  if (!contact || typeof contact !== "object") return "";

  const accountId = normalizeAccountId(
    contact.accountId ?? contact.userId ?? extractAccountIdFromKey(contact.lookupKey ?? contact.id)
  );
  if (accountId) {
    return `account:${accountId}`;
  }

  if (typeof contact.email === "string" && contact.email.trim()) {
    return `email:${contact.email.trim().toLowerCase()}`;
  }

  if (typeof contact.phone === "string" && contact.phone.trim()) {
    return `phone:${contact.phone.trim()}`;
  }

  if (typeof contact.nickname === "string" && contact.nickname.trim()) {
    return `nick:${contact.nickname.trim().toLowerCase()}`;
  }

  if (typeof contact.displayName === "string" && contact.displayName.trim()) {
    const method = typeof contact.method === "string" ? contact.method.toLowerCase() : "";
    return `name:${contact.displayName.trim().toLowerCase()}|${method}`;
  }

  return "";
}

function normalizeAccountId(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed) {
      return trimmed;
    }
  }
  return null;
}

function extractAccountIdFromKey(value) {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  if (trimmed.startsWith("account:")) {
    const account = trimmed.slice("account:".length).trim();
    return account || null;
  }
  return null;
}

function normalizeContact(contact) {
  if (!contact || typeof contact !== "object") return null;

  const incomingLookup =
    typeof contact.lookupKey === "string" && contact.lookupKey.trim()
      ? contact.lookupKey.trim()
      : "";
  const incomingId = typeof contact.id === "string" && contact.id.trim() ? contact.id.trim() : "";

  const methodValue =
    typeof contact.method === "string" ? contact.method.toLowerCase() : "";
  const method = Object.values(ContactMethod).includes(methodValue)
    ? methodValue
    : ContactMethod.NICKNAME;

  const normalized = { method };

  if (typeof contact.username === "string" && contact.username.trim()) {
    normalized.username = truncateText(contact.username.trim(), 80);
  }

  const accountId =
    normalizeAccountId(contact.accountId) ||
    normalizeAccountId(contact.userId) ||
    extractAccountIdFromKey(incomingLookup) ||
    extractAccountIdFromKey(incomingId);

  if (accountId) {
    normalized.accountId = accountId;
  }

  if (typeof contact.displayName === "string" && contact.displayName.trim()) {
    normalized.displayName = truncateText(contact.displayName, 80);
  }
  if (typeof contact.name === "string" && contact.name.trim()) {
    normalized.name = truncateText(contact.name, 120);
  }
  if (typeof contact.nickname === "string" && contact.nickname.trim()) {
    normalized.nickname = truncateText(contact.nickname, 120);
  }
  if (typeof contact.notes === "string" && contact.notes.trim()) {
    normalized.notes = truncateText(contact.notes, 200);
  }

  const phoneCandidate =
    typeof contact.phone === "string" && contact.phone.trim()
      ? contact.phone
      : typeof contact.phoneDisplay === "string" && contact.phoneDisplay.trim()
      ? contact.phoneDisplay
      : "";
  if (phoneCandidate) {
    const normalizedPhone = normalizePhoneNumber(phoneCandidate);
    if (normalizedPhone) {
      normalized.phone = normalizedPhone;
      normalized.phoneDisplay =
        typeof contact.phoneDisplay === "string" && contact.phoneDisplay.trim()
          ? truncateText(contact.phoneDisplay, 60)
          : formatPhoneNumberForDisplay(normalizedPhone);
    }
  }

  if (typeof contact.email === "string" && contact.email.trim()) {
    const email = contact.email.trim().toLowerCase();
    if (isValidEmail(email)) {
      normalized.email = email;
    }
  }

  if (typeof contact.source === "string" && contact.source.trim()) {
    normalized.source = contact.source
      .trim()
      .slice(0, NEW_CONTACT_MAX_SOURCE_LENGTH);
  }

  if (!normalized.displayName) {
    normalized.displayName =
      normalized.name ||
      normalized.nickname ||
      (normalized.email ? deriveNameFromEmail(normalized.email) : "") ||
      normalized.phoneDisplay ||
      normalized.phone ||
      "";
  }

  if (normalized.displayName) {
    normalized.displayName = truncateText(normalized.displayName, 80);
  }

  if (!normalized.displayName && !normalized.phone && !normalized.email) {
    return null;
  }

  const derivedLookup = buildContactLookupKey({ ...normalized, method });
  if (incomingLookup) {
    normalized.lookupKey = incomingLookup;
  } else if (normalized.accountId) {
    normalized.lookupKey = `account:${normalized.accountId}`;
  } else if (derivedLookup) {
    normalized.lookupKey = derivedLookup;
  }

  if (incomingId) {
    normalized.id = incomingId;
  } else if (normalized.accountId) {
    normalized.id = `account:${normalized.accountId}`;
  } else if (normalized.lookupKey) {
    normalized.id = normalized.lookupKey;
  } else {
    normalized.id = typeof crypto?.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
  }

  return normalized;
}

function deriveContactStatus(contact) {
  const normalized = normalizeContact(contact);
  if (!normalized) return "online";

  switch (normalized.method) {
    case ContactMethod.NICKNAME: {
      if (normalized.notes) {
        return sanitizeStatus(normalized.notes);
      }
      if (normalized.nickname) {
        return sanitizeStatus(`@${normalized.nickname}`);
      }
      return "Ready to chat";
    }
    case ContactMethod.PHONE: {
      if (normalized.phoneDisplay) {
        return sanitizeStatus(`Phone • ${normalized.phoneDisplay}`);
      }
      if (normalized.phone) {
        return sanitizeStatus(`Phone • ${normalized.phone}`);
      }
      break;
    }
    case ContactMethod.EMAIL: {
      if (normalized.email) {
        return sanitizeStatus(`Email • ${normalized.email}`);
      }
      break;
    }
    case ContactMethod.CONTACT_CARD: {
      const parts = [];
      if (normalized.phoneDisplay) parts.push(normalized.phoneDisplay);
      if (normalized.email) parts.push(normalized.email);
      if (normalized.notes) parts.push(normalized.notes);
      if (!parts.length && normalized.name) parts.push(normalized.name);
      if (parts.length) {
        return sanitizeStatus(`Shared contact • ${parts.join(" · ")}`);
      }
      return "Shared contact";
    }
    default:
      break;
  }

  if (normalized.notes) {
    return sanitizeStatus(normalized.notes);
  }

  return "Ready to chat";
}

function getContactPreviewText(contact) {
  const status = deriveContactStatus(contact);
  if (!status) return "";
  if (status.toLowerCase() === "online") return "";
  return status;
}

function buildContactTooltip(contact) {
  const normalized = normalizeContact(contact);
  if (!normalized) return "";

  const parts = [];
  const sourceLabel = ContactMethodLabels[normalized.method];
  if (sourceLabel) {
    parts.push(`Source: ${sourceLabel}`);
  }
  if (normalized.phoneDisplay) {
    parts.push(`Phone: ${normalized.phoneDisplay}`);
  } else if (normalized.phone) {
    parts.push(`Phone: ${normalized.phone}`);
  }
  if (normalized.email) {
    parts.push(`Email: ${normalized.email}`);
  }
  if (normalized.notes) {
    parts.push(`Notes: ${normalized.notes}`);
  }

  return parts.join(" • ");
}

function getContactKey(contact) {
  const normalized = normalizeContact(contact);
  if (!normalized) return "";
  if (normalized.accountId) {
    return `account:${normalized.accountId}`;
  }
  return normalized.id || normalized.lookupKey || "";
}

function getContactAccountId(contact) {
  const normalized = normalizeContact(contact);
  if (!normalized) return null;
  return normalized.accountId ?? null;
}

function getChatParticipantAccountIds(chat, { includeSelf = false } = {}) {
  if (!chat || typeof chat !== "object") {
    return [];
  }

  const ids = new Set();
  const addAccountId = (value) => {
    const normalized = normalizeAccountId(value);
    if (!normalized) {
      return;
    }
    ids.add(normalized);
  };

  if (Array.isArray(chat.participantAccountIds)) {
    chat.participantAccountIds.forEach(addAccountId);
  }

  if (chat.type === ChatType.DIRECT) {
    addAccountId(getContactAccountId(chat.contact));
  }

  if (!includeSelf) {
    const selfId = normalizeAccountId(authState?.user?.id);
    if (selfId) {
      ids.delete(selfId);
    }
  }

  return normalizeParticipantAccountIds(Array.from(ids));
}

function findContactByAccountId(accountId) {
  const normalizedId = normalizeAccountId(accountId);
  if (!normalizedId) {
    return null;
  }

  for (const contact of contacts) {
    const normalized = normalizeContact(contact);
    if (normalized?.accountId === normalizedId) {
      return normalized;
    }
  }

  return null;
}

function contactsMatch(contactA, contactB) {
  const normalizedA = normalizeContact(contactA);
  const normalizedB = normalizeContact(contactB);
  if (!normalizedA || !normalizedB) return false;

  if (normalizedA.accountId && normalizedB.accountId && normalizedA.accountId === normalizedB.accountId) {
    return true;
  }

  if (normalizedA.id && normalizedB.id && normalizedA.id === normalizedB.id) {
    return true;
  }

  if (
    normalizedA.lookupKey &&
    normalizedB.lookupKey &&
    normalizedA.lookupKey === normalizedB.lookupKey
  ) {
    return true;
  }

  if (normalizedA.email && normalizedB.email && normalizedA.email === normalizedB.email) {
    return true;
  }

  if (normalizedA.phone && normalizedB.phone && normalizedA.phone === normalizedB.phone) {
    return true;
  }

  if (
    normalizedA.nickname &&
    normalizedB.nickname &&
    normalizedA.nickname.toLowerCase() === normalizedB.nickname.toLowerCase()
  ) {
    return true;
  }

  if (
    normalizedA.displayName &&
    normalizedB.displayName &&
    normalizedA.displayName.toLowerCase() === normalizedB.displayName.toLowerCase() &&
    normalizedA.method === normalizedB.method
  ) {
    return true;
  }

  return false;
}

function loadContacts() {
  if (isLiveMessagingSession()) {
    const stored = readLiveSessionValue(CONTACTS_STORAGE_KEY);
    if (Array.isArray(stored)) {
      const normalized = stored.map(normalizeContact).filter(Boolean);
      sessionStore.contacts = normalized.map((contact) => ({ ...contact }));
      return normalized;
    }
    if (sessionStore.contacts.length) {
      return sessionStore.contacts.map(normalizeContact).filter(Boolean);
    }
    sessionStore.contacts = [];
    return [];
  }
  try {
    const namespace = getStorageNamespace();
    const store = readNamespacedStorage(CONTACTS_STORAGE_KEY);
    const raw = store[namespace];
    if (!Array.isArray(raw)) {
      sessionStore.contacts = [];
      return [];
    }
    const contactsFromStore = raw.map(normalizeContact).filter(Boolean);
    sessionStore.contacts = contactsFromStore.map((contact) => ({ ...contact }));
    return contactsFromStore;
  } catch (error) {
    console.error("Failed to load contacts", error);
    sessionStore.contacts = [];
    return [];
  }
}

function saveContacts(state) {
  const sanitized = (state ?? []).map(normalizeContact).filter(Boolean);
  sessionStore.contacts = sanitized.map((contact) => ({ ...contact }));
  if (isLiveMessagingSession()) {
    writeLiveSessionValue(CONTACTS_STORAGE_KEY, sanitized);
    return;
  }
  const namespace = getStorageNamespace();
  writeNamespacedStorage(CONTACTS_STORAGE_KEY, namespace, sanitized);
}

function sortContacts(list) {
  return [...list].sort((a, b) => {
    const nameA = a.displayName?.toLowerCase() ?? "";
    const nameB = b.displayName?.toLowerCase() ?? "";
    if (nameA && nameB) {
      return nameA.localeCompare(nameB, undefined, { sensitivity: "base" });
    }
    if (nameA) return -1;
    if (nameB) return 1;
    return 0;
  });
}

function contactMatchesQuery(contact, query) {
  const normalized = normalizeContact(contact);
  if (!normalized) return false;
  if (!query) return true;
  const haystacks = [
    normalized.displayName,
    normalized.nickname,
    normalized.email,
    normalized.phoneDisplay,
    normalized.phone,
    normalized.notes,
  ]
    .filter(Boolean)
    .map((value) => value.toString().toLowerCase());
  return haystacks.some((value) => value.includes(query));
}

function upsertContact(contact) {
  const normalized = normalizeContact(contact);
  if (!normalized) {
    return { contact: null, added: false };
  }

  const existingIndex = contacts.findIndex((candidate) => contactsMatch(candidate, normalized));
  if (existingIndex !== -1) {
    const merged = { ...contacts[existingIndex], ...normalized };
    contacts[existingIndex] = merged;
    contacts = sortContacts(contacts);
    saveContacts(contacts);
    renderNewChatContacts();
    return { contact: merged, added: false };
  }

  contacts = sortContacts([...contacts, normalized]);
  saveContacts(contacts);
  renderNewChatContacts();
  return { contact: normalized, added: true };
}

function syncContactsFromChats() {
  const contactMap = new Map();
  contacts
    .map(normalizeContact)
    .filter(Boolean)
    .forEach((contact) => {
      const key = getContactKey(contact);
      if (key) {
        contactMap.set(key, contact);
      }
    });

  chats
    .filter((chat) => chat.type === ChatType.DIRECT && chat.contact)
    .forEach((chat) => {
      const normalized = normalizeContact(chat.contact);
      if (!normalized) return;
      const key = getContactKey(normalized);
      if (!key) return;
      if (contactMap.has(key)) {
        const merged = { ...contactMap.get(key), ...normalized };
        contactMap.set(key, merged);
      } else {
        contactMap.set(key, normalized);
      }
    });

  contacts = sortContacts(Array.from(contactMap.values()));
  saveContacts(contacts);
  renderNewChatContacts();
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
      normalized.status = MessageStatus.SENT;
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

  const normalizedContact = normalizeContact(chat.contact);
  const statusCandidate =
    typeof chat.status === "string" ? chat.status.trim() : "";
  const sanitizedStatus = sanitizeStatus(statusCandidate);
  const normalizedType =
    chat.type === ChatType.GROUP ? ChatType.GROUP : ChatType.DIRECT;
  const participants =
    normalizedType === ChatType.GROUP
      ? normalizeGroupParticipants(chat.participants)
      : [];
  const description =
    normalizedType === ChatType.GROUP && typeof chat.description === "string"
      ? sanitizeStatus(chat.description)
      : "";
  const participantAccountIds =
    normalizedType === ChatType.GROUP
      ? normalizeParticipantAccountIds(chat.participantAccountIds)
      : [];
  const normalizedName =
    typeof chat.name === "string" && chat.name.trim()
      ? chat.name.trim()
      : normalizedContact?.displayName ?? "New chat";

  const unreadCount =
    Number.isFinite(chat.unreadCount) && chat.unreadCount > 0
      ? Math.min(Math.floor(chat.unreadCount), 999)
      : 0;

  const capabilities = {
    audio:
      !chat.capabilities || typeof chat.capabilities.audio === "undefined"
        ? true
        : Boolean(chat.capabilities.audio),
    video:
      !chat.capabilities || typeof chat.capabilities.video === "undefined"
        ? true
        : Boolean(chat.capabilities.video),
    phone:
      normalizedType === ChatType.GROUP
        ? Boolean(chat.capabilities?.phone)
        : !chat.capabilities || typeof chat.capabilities.phone === "undefined"
        ? true
        : Boolean(chat.capabilities.phone),
  };

  return {
    ...chat,
    name: normalizedName || "New chat",
    status:
      normalizedType === ChatType.GROUP
        ? sanitizedStatus || deriveGroupStatus(participants, description)
        : sanitizedStatus || (normalizedContact ? deriveContactStatus(normalizedContact) : "online"),
    avatar:
      chat.avatar ??
      ((normalizedName || "")
        ? (normalizedName || "")
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()
        : "?"),
    isStarred: Boolean(chat.isStarred),
    isArchived: Boolean(chat.isArchived),
    messages: normalizedMessages,
    type: normalizedType,
    participants,
    participantAccountIds,
    description,
    capabilities,
    ...(normalizedContact && normalizedType !== ChatType.GROUP
      ? { contact: normalizedContact }
      : {}),
    unreadCount,
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

function isVoiceNote(attachment) {
  return Boolean(
    attachment &&
      typeof attachment === "object" &&
      attachment.metadata &&
      Number.isFinite(attachment.metadata.voiceNoteDuration)
  );
}

function getVoiceNoteDurationSeconds(attachment) {
  if (!isVoiceNote(attachment)) return 0;
  const value = Number(attachment.metadata.voiceNoteDuration);
  if (!Number.isFinite(value)) return 0;
  return Math.max(1, Math.round(value));
}

function getAttachmentLabel(attachment) {
  if (!attachment) return "Attachment";
  if (isVoiceNote(attachment)) {
    return "Voice message";
  }
  switch (attachment.kind) {
    case AttachmentKind.IMAGE:
      return "Photo";
    case AttachmentKind.VIDEO:
      return "Video";
    case AttachmentKind.AUDIO:
      return "Audio";
    case AttachmentKind.LINK_PREVIEW:
      return "Link";
    default:
      return "Document";
  }
}

function formatAttachmentSummary(attachments = []) {
  if (!attachments.length) return "";
  const [first, ...rest] = attachments;
  if (isVoiceNote(first)) {
    const duration = getVoiceNoteDurationSeconds(first);
    const label = `Voice message (${formatVoiceDuration(duration)})`;
    return rest.length ? `${label} +${rest.length}` : label;
  }
  if (first.kind === AttachmentKind.LINK_PREVIEW) {
    const title =
      (typeof first.title === "string" && first.title.trim()) ||
      getHostnameFromUrl(first.url) ||
      "Link";
    const label = title.startsWith("Link") ? title : `Link: ${title}`;
    return rest.length ? `${label} +${rest.length}` : label;
  }
  const label = getAttachmentLabel(first);
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

function getStorageNamespace(auth = authState) {
  const username = auth?.user?.username;
  if (typeof username === "string" && username.trim()) {
    return `user:${username.trim().toLowerCase()}`;
  }
  return STORAGE_NAMESPACE_DEFAULT;
}

function isLiveMessagingSession(auth = authState) {
  return Boolean(auth && typeof auth.token === "string" && auth.token.trim());
}

function resetSessionStore() {
  sessionStore.chats = [];
  sessionStore.drafts = {};
  sessionStore.attachmentDrafts = {};
  sessionStore.contacts = [];
  sessionStore.profile = null;
  sessionStore.chatWallpapers = {};
  hasShownStorageQuotaWarning = false;
}

function readNamespacedStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return { [STORAGE_NAMESPACE_DEFAULT]: parsed };
    }
    if (typeof parsed === "object" && parsed !== null) {
      return parsed;
    }
  } catch (error) {
    console.error(`Failed to parse storage for ${key}`, error);
  }
  return {};
}

function writeNamespacedStorage(key, namespace, value) {
  const store = readNamespacedStorage(key);
  store[namespace] = value;
  try {
    localStorage.setItem(key, JSON.stringify(store));
    return true;
  } catch (error) {
    console.warn(`Failed to persist data for ${key}`, error);
    return false;
  }
}

function deleteNamespacedStorage(key, namespace) {
  const store = readNamespacedStorage(key);
  if (!Object.prototype.hasOwnProperty.call(store, namespace)) {
    return;
  }
  delete store[namespace];
  const remainingNamespaces = Object.keys(store);
  if (remainingNamespaces.length === 0) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Failed to remove storage for ${key}`, error);
    }
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(store));
  } catch (error) {
    console.warn(`Failed to persist data for ${key}`, error);
  }
}

function loadState() {
  if (isLiveMessagingSession()) {
    const stored = readLiveSessionValue(STORAGE_KEY);
    if (Array.isArray(stored)) {
      const normalized = stored.map(normalizeChat).filter(Boolean);
      sessionStore.chats = normalized.map((chat) => ({ ...chat }));
      return normalized;
    }
    if (sessionStore.chats.length) {
      return sessionStore.chats.map(normalizeChat).filter(Boolean);
    }
    sessionStore.chats = [];
    return [];
  }
  try {
    const namespace = getStorageNamespace();
    const store = readNamespacedStorage(STORAGE_KEY);
    const raw = store[namespace];
    if (Array.isArray(raw)) {
      const normalized = raw.map(normalizeChat).filter(Boolean);
      sessionStore.chats = normalized.map((chat) => ({ ...chat }));
      return normalized;
    }
    sessionStore.chats = [];
    return [];
  } catch (error) {
    console.error("Failed to load chats", error);
    sessionStore.chats = [];
    return [];
  }
}

function saveState(state) {
  const normalized = (state ?? []).map(normalizeChat).filter(Boolean);
  sessionStore.chats = normalized.map((chat) => ({ ...chat }));
  pruneChatWallpaperOverrides();
  if (isLiveMessagingSession()) {
    writeLiveSessionValue(STORAGE_KEY, normalized);
    return;
  }
  const namespace = getStorageNamespace();
  const persisted = writeNamespacedStorage(STORAGE_KEY, namespace, normalized);
  if (!persisted && !hasShownStorageQuotaWarning) {
    showToast({
      message:
        "Attachments for this chat are too large to store locally. They will still send, but may disappear after refresh.",
      intent: ToastIntent.WARNING,
      duration: 5200,
    });
    hasShownStorageQuotaWarning = true;
  }
}

function loadDrafts() {
  if (isLiveMessagingSession()) {
    const stored = readLiveSessionValue(DRAFTS_STORAGE_KEY);
    if (stored && typeof stored === "object") {
      const drafts = Object.fromEntries(
        Object.entries(stored).filter(([, value]) => typeof value === "string")
      );
      sessionStore.drafts = { ...drafts };
      return drafts;
    }
    sessionStore.drafts = {};
    return {};
  }
  try {
    const namespace = getStorageNamespace();
    const store = readNamespacedStorage(DRAFTS_STORAGE_KEY);
    const raw = store[namespace];
    if (typeof raw !== "object" || raw === null) {
      sessionStore.drafts = {};
      return {};
    }
    const drafts = Object.fromEntries(
      Object.entries(raw).filter(([, value]) => typeof value === "string")
    );
    sessionStore.drafts = { ...drafts };
    return drafts;
  } catch (error) {
    console.error("Failed to load drafts", error);
    sessionStore.drafts = {};
    return {};
  }
}

function saveDrafts(state) {
  const snapshot = Object.fromEntries(
    Object.entries(state ?? {}).filter(([, value]) => typeof value === "string")
  );
  sessionStore.drafts = { ...snapshot };
  if (isLiveMessagingSession()) {
    writeLiveSessionValue(DRAFTS_STORAGE_KEY, snapshot);
    return;
  }
  const namespace = getStorageNamespace();
  writeNamespacedStorage(DRAFTS_STORAGE_KEY, namespace, snapshot);
}

function loadAttachmentDrafts() {
  if (isLiveMessagingSession()) {
    const stored = readLiveSessionValue(ATTACHMENT_DRAFTS_STORAGE_KEY);
    if (stored && typeof stored === "object") {
      const drafts = Object.fromEntries(
        Object.entries(stored)
          .map(([chatId, attachments]) => {
            if (!Array.isArray(attachments)) return null;
            const normalized = attachments.map(normalizeAttachment).filter(Boolean);
            if (!normalized.length) return null;
            return [chatId, normalized];
          })
          .filter(Boolean)
      );
      sessionStore.attachmentDrafts = Object.fromEntries(
        Object.entries(drafts).map(([chatId, attachments]) => [
          chatId,
          attachments.map((attachment) => ({ ...attachment })),
        ])
      );
      return Object.fromEntries(
        Object.entries(drafts).map(([chatId, attachments]) => [
          chatId,
          attachments.map(cloneAttachment).filter(Boolean),
        ])
      );
    }
    sessionStore.attachmentDrafts = {};
    return {};
  }
  try {
    const namespace = getStorageNamespace();
    const store = readNamespacedStorage(ATTACHMENT_DRAFTS_STORAGE_KEY);
    const parsed = store[namespace];
    if (typeof parsed !== "object" || parsed === null) {
      sessionStore.attachmentDrafts = {};
      return {};
    }
    const drafts = Object.fromEntries(
      Object.entries(parsed)
        .map(([chatId, attachments]) => {
          if (!Array.isArray(attachments)) return null;
          const normalized = attachments.map(normalizeAttachment).filter(Boolean);
          if (!normalized.length) return null;
          return [chatId, normalized];
        })
        .filter(Boolean)
    );
    sessionStore.attachmentDrafts = Object.fromEntries(
      Object.entries(drafts).map(([chatId, attachments]) => [
        chatId,
        attachments.map(cloneAttachment).filter(Boolean),
      ])
    );
    return drafts;
  } catch (error) {
    console.error("Failed to load attachment drafts", error);
    sessionStore.attachmentDrafts = {};
    return {};
  }
}

function saveAttachmentDrafts(state) {
  const sanitized = Object.fromEntries(
    Object.entries(state ?? {})
      .map(([chatId, attachments]) => {
        if (!Array.isArray(attachments)) {
          return null;
        }
        const normalized = attachments.map(normalizeAttachment).filter(Boolean);
        if (!normalized.length) {
          return null;
        }
        return [chatId, normalized];
      })
      .filter(Boolean)
  );
  sessionStore.attachmentDrafts = Object.fromEntries(
    Object.entries(sanitized).map(([chatId, attachments]) => [
      chatId,
      attachments.map((attachment) => ({ ...attachment })),
    ])
  );
  if (isLiveMessagingSession()) {
    writeLiveSessionValue(ATTACHMENT_DRAFTS_STORAGE_KEY, sanitized);
    return;
  }
  const namespace = getStorageNamespace();
  writeNamespacedStorage(ATTACHMENT_DRAFTS_STORAGE_KEY, namespace, sanitized);
}

function normalizeProfile(value) {
  if (typeof value !== "object" || value === null) {
    return { ...defaultProfile };
  }

  const name = String(value.name ?? "").trim();
  const about = String(value.about ?? "").trim();
  const phone = String(value.phone ?? "").trim();

  return {
    name: name || defaultProfile.name,
    about,
    phone,
  };
}

function loadProfile() {
  if (isLiveMessagingSession()) {
    if (sessionStore.profile) {
      return { ...sessionStore.profile };
    }
    const stored = readLiveSessionValue(PROFILE_STORAGE_KEY);
    if (stored) {
      const profile = normalizeProfile(stored);
      sessionStore.profile = { ...profile };
      return profile;
    }
    sessionStore.profile = null;
    return { ...defaultProfile };
  }
  try {
    const namespace = getStorageNamespace();
    const store = readNamespacedStorage(PROFILE_STORAGE_KEY);
    const raw = store[namespace];
    if (!raw) {
      sessionStore.profile = null;
      return { ...defaultProfile };
    }
    const profile = normalizeProfile(raw);
    sessionStore.profile = { ...profile };
    return profile;
  } catch (error) {
    console.error("Failed to load profile", error);
    sessionStore.profile = null;
    return { ...defaultProfile };
  }
}

function saveProfile(profile) {
  const normalized = normalizeProfile(profile);
  sessionStore.profile = { ...normalized };
  if (isLiveMessagingSession()) {
    writeLiveSessionValue(PROFILE_STORAGE_KEY, normalized);
    return;
  }
  const namespace = getStorageNamespace();
  writeNamespacedStorage(PROFILE_STORAGE_KEY, namespace, normalized);
}

function normalizeAuthState(value) {
  if (typeof value !== "object" || value === null) {
    return null;
  }

  const token = typeof value.token === "string" ? value.token.trim() : "";
  if (!token) {
    return null;
  }

  const rawUser = value.user;
  if (typeof rawUser !== "object" || rawUser === null) {
    return null;
  }

  const username = typeof rawUser.username === "string" ? rawUser.username.trim() : "";
  if (!username) {
    return null;
  }

  const rawId = rawUser.id;
  let id = null;
  if (typeof rawId === "number" && Number.isFinite(rawId)) {
    id = rawId;
  } else if (typeof rawId === "string" && rawId.trim()) {
    const numericId = Number(rawId);
    id = Number.isNaN(numericId) ? rawId.trim() : numericId;
  }

  return {
    token,
    user: {
      id,
      username,
    },
  };
}

function loadAuthState() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return normalizeAuthState(parsed);
  } catch (error) {
    console.error("Failed to load auth state", error);
    return null;
  }
}

function saveAuthState(state) {
  const normalized = normalizeAuthState(state);
  if (!normalized) {
    clearAuthStateStorage();
    return;
  }
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(normalized));
}

function clearAuthStateStorage() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

function getAuthToken() {
  return typeof authState?.token === "string" ? authState.token : null;
}

function isAuthenticated() {
  return Boolean(getAuthToken());
}

function getInitials(name = "") {
  const trimmed = name.trim();
  if (!trimmed) return "YOU";
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (!parts.length) return "YOU";
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  const first = parts[0][0] ?? "";
  const last = parts[parts.length - 1][0] ?? "";
  return `${first}${last}`.toUpperCase();
}

function populateProfileForm(profile = activeProfile) {
  if (!profileForm) return;
  const nextProfile = profile ?? activeProfile ?? { ...defaultProfile };
  if (profileNameInput) {
    profileNameInput.value = nextProfile.name ?? defaultProfile.name;
  }
  if (profileAboutInput) {
    profileAboutInput.value = nextProfile.about ?? "";
  }
  if (profilePhoneInput) {
    profilePhoneInput.value = nextProfile.phone ?? "";
  }
}

function updateProfileUI(profile = activeProfile) {
  const nextProfile = profile ?? activeProfile ?? { ...defaultProfile };
  const initials = getInitials(nextProfile.name);
  const displayName = nextProfile.name?.trim() || "You";
  const aboutCopy = nextProfile.about?.trim() || "Add a status message";

  if (profileAvatarElement) {
    profileAvatarElement.textContent = initials;
  }
  if (profileModalAvatarElement) {
    profileModalAvatarElement.textContent = initials;
  }
  if (profileNameElement) {
    profileNameElement.textContent = displayName;
  }
  if (profileSummaryNameElement) {
    profileSummaryNameElement.textContent = displayName;
  }
  if (profileAboutElement) {
    profileAboutElement.textContent = aboutCopy;
  }
  if (profileSummaryAboutElement) {
    profileSummaryAboutElement.textContent = aboutCopy;
  }
  if (profileButton) {
    if (displayName === "You") {
      profileButton.setAttribute("aria-label", "Open your profile");
      profileButton.title = "Your profile";
    } else {
      profileButton.setAttribute("aria-label", `Open profile for ${displayName}`);
      profileButton.title = `${displayName}'s profile`;
    }
  }
}

function applyAuthenticatedUserToProfile(auth, { persist = true } = {}) {
  if (!auth || typeof auth !== "object") return;
  const username = typeof auth.user?.username === "string" ? auth.user.username.trim() : "";
  if (!username) return;

  const nextProfile = {
    ...defaultProfile,
    ...activeProfile,
    name: username,
  };

  activeProfile = nextProfile;
  if (persist) {
    saveProfile(activeProfile);
  }
  updateProfileUI(activeProfile);
}

function clearAuthError() {
  if (!authErrorElement) return;
  authErrorElement.textContent = "";
  authErrorElement.hidden = true;
}

function showAuthError(message) {
  if (!authErrorElement) return;
  const text = typeof message === "string" && message.trim() ? message.trim() : "Something went wrong. Please try again.";
  authErrorElement.textContent = text;
  authErrorElement.hidden = false;
}

function setActiveAuthView(view, { focusFirstField = false } = {}) {
  const nextView = view === AuthView.SIGNUP ? AuthView.SIGNUP : AuthView.LOGIN;
  activeAuthView = nextView;

  if (authOverlayElement) {
    authOverlayElement.dataset.view = nextView;
  }
  if (authLoginForm) {
    authLoginForm.hidden = nextView !== AuthView.LOGIN;
    if (nextView === AuthView.LOGIN) {
      authLoginForm.removeAttribute("tabindex");
    } else {
      authLoginForm.setAttribute("tabindex", "-1");
    }
  }
  if (authSignupForm) {
    authSignupForm.hidden = nextView !== AuthView.SIGNUP;
    if (nextView === AuthView.SIGNUP) {
      authSignupForm.removeAttribute("tabindex");
    } else {
      authSignupForm.setAttribute("tabindex", "-1");
    }
  }
  if (authTabsElement) {
    authTabsElement.setAttribute("data-active-view", nextView);
  }
  if (authTabButtons.length) {
    authTabButtons.forEach((button) => {
      const targetView = button.dataset.authTab === AuthView.SIGNUP ? AuthView.SIGNUP : AuthView.LOGIN;
      const isActive = targetView === nextView;
      button.classList.toggle("auth-overlay__tab--active", isActive);
      button.setAttribute("aria-selected", isActive ? "true" : "false");
      if (isActive) {
        button.removeAttribute("tabindex");
      } else {
        button.setAttribute("tabindex", "-1");
      }
    });
  }
  if (authTitleElement) {
    authTitleElement.textContent =
      nextView === AuthView.LOGIN ? "Welcome back" : "Create an account";
  }
  if (authSubtitleElement) {
    authSubtitleElement.textContent =
      nextView === AuthView.LOGIN
        ? "Sign in to sync messages between devices."
        : "Create an account to start messaging.";
  }
  if (authSwitchMessageElement) {
    authSwitchMessageElement.textContent =
      nextView === AuthView.LOGIN
        ? "Don't have an account yet?"
        : "Already have an account?";
  }
  if (authSwitchButton) {
    authSwitchButton.dataset.authTarget =
      nextView === AuthView.LOGIN ? AuthView.SIGNUP : AuthView.LOGIN;
    authSwitchButton.textContent =
      nextView === AuthView.LOGIN ? "Create one" : "Back to sign in";
  }

  clearAuthError();

  if (focusFirstField) {
    const form = nextView === AuthView.LOGIN ? authLoginForm : authSignupForm;
    const firstInput = form?.querySelector("input");
    if (firstInput instanceof HTMLElement) {
      firstInput.focus();
    }
  }
}

function setAuthLoading(isLoading, view = activeAuthView) {
  const targetView = view === AuthView.SIGNUP ? AuthView.SIGNUP : AuthView.LOGIN;
  const form = targetView === AuthView.LOGIN ? authLoginForm : authSignupForm;
  const submitButton = authSubmitButtons.find(
    (button) => button.dataset.authSubmit === targetView
  );

  if (submitButton) {
    const defaultLabel = submitButton.dataset.defaultLabel || submitButton.textContent || "";
    if (!submitButton.dataset.defaultLabel) {
      submitButton.dataset.defaultLabel = defaultLabel;
    }
    const loadingLabel = submitButton.dataset.loadingLabel || "Working…";
    submitButton.textContent = isLoading ? loadingLabel : submitButton.dataset.defaultLabel;
    submitButton.disabled = isLoading;
  }

  if (form) {
    Array.from(form.elements).forEach((element) => {
      if (!(element instanceof HTMLElement)) return;
      if (element === submitButton) return;
      if ("disabled" in element) {
        element.disabled = isLoading;
      }
    });
  }
}

async function apiRequest(path, { method = "GET", body, includeAuth = true } = {}) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${API_BASE_URL}${normalizedPath}`;
  const headers = { Accept: "application/json" };
  const init = { method, headers };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(body);
  }

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  let response;
  try {
    response = await fetch(url, init);
  } catch (error) {
    throw new Error("Unable to reach the server. Please check your connection and try again.");
  }

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  let payload = null;

  if (isJson) {
    try {
      payload = await response.json();
    } catch (error) {
      payload = null;
    }
  } else {
    try {
      payload = await response.text();
    } catch (error) {
      payload = null;
    }
  }

  if (!response.ok) {
    const message =
      payload && typeof payload === "object" && payload !== null && "error" in payload
        ? payload.error
        : typeof payload === "string" && payload
        ? payload
        : `Request failed with status ${response.status}`;
    if (response.status === 401 && includeAuth) {
      const normalizedMessage = message.toLowerCase();
      const friendlyMessage = normalizedMessage.includes("no longer exists")
        ? "Your account is no longer available. Please sign in again."
        : message;
      invalidateAuthenticatedSession(friendlyMessage);
    }
    throw new Error(message);
  }

  return payload ?? {};
}

function normalizeChatIdentifier(chatId) {
  if (chatId === null || chatId === undefined) {
    return null;
  }
  if (typeof chatId === "string") {
    const trimmed = chatId.trim();
    return trimmed || null;
  }
  if (typeof chatId === "number" && Number.isFinite(chatId)) {
    return String(chatId);
  }
  return null;
}

function getServerMessageSet(chatId) {
  const normalized = normalizeChatIdentifier(chatId);
  if (!normalized) {
    return null;
  }
  if (!realtimeState.serverMessageIds.has(normalized)) {
    realtimeState.serverMessageIds.set(normalized, new Set());
  }
  return realtimeState.serverMessageIds.get(normalized);
}

function recordPendingOutgoingMessage(clientId, chatId, localMessageId) {
  if (!clientId || !chatId || !localMessageId) {
    return;
  }
  realtimeState.pendingOutgoing.set(clientId, { chatId, localMessageId });
  if (realtimeState.pendingOutgoing.size > 200) {
    const oldest = realtimeState.pendingOutgoing.keys().next();
    if (!oldest.done) {
      realtimeState.pendingOutgoing.delete(oldest.value);
    }
  }
}

function queueRealtimeEmit(eventName, payload, chatId = null) {
  if (!eventName || !payload) {
    return;
  }

  realtimeState.pendingOutbound.push({ chatId, event: eventName, payload });
  if (realtimeState.pendingOutbound.length > 200) {
    realtimeState.pendingOutbound.shift();
  }
}

function flushPendingChatJoins() {
  const socket = realtimeState.socket;
  if (!socket || !socket.connected || !realtimeState.isAuthenticated) {
    return;
  }

  realtimeState.pendingChatJoins.forEach((chatId) => {
    if (!chatId) return;
    if (realtimeState.joinedChats.has(chatId)) {
      return;
    }
    socket.emit("joinChat", { chat_id: chatId });
  });
}

function flushPendingOutbound() {
  const socket = realtimeState.socket;
  if (!socket || !socket.connected || !realtimeState.isAuthenticated) {
    return;
  }

  if (!realtimeState.pendingOutbound.length) {
    return;
  }

  flushPendingChatJoins();

  const queued = realtimeState.pendingOutbound.splice(0);
  queued.forEach((entry) => {
    if (!entry || !entry.payload) {
      return;
    }
    try {
      const eventName = entry.event || "sendMessage";
      socket.emit(eventName, entry.payload);
    } catch (error) {
      console.error("Failed to flush queued message", error);
    }
  });
}

function flushPendingReceipts() {
  const socket = realtimeState.socket;
  if (!socket || !socket.connected || !realtimeState.isAuthenticated) {
    return;
  }

  if (!realtimeState.pendingReceipts.length) {
    return;
  }

  const queued = realtimeState.pendingReceipts.splice(0);
  queued.forEach((entry) => {
    if (!entry || !entry.chatId || !Array.isArray(entry.messageIds)) {
      return;
    }
    const normalizedChatId = normalizeChatIdentifier(entry.chatId);
    const messageIds = entry.messageIds.map(String).filter(Boolean);
    if (!normalizedChatId || !messageIds.length) {
      return;
    }
    try {
      socket.emit("messagesRead", { chat_id: normalizedChatId, message_ids: messageIds });
    } catch (error) {
      console.error("Failed to flush queued read receipts", error);
    }
  });
}

function handleRealtimeConnect() {
  const socket = realtimeState.socket;
  if (!socket) return;
  const token = authState?.token ?? realtimeState.pendingAuthToken;
  if (token) {
    realtimeState.pendingAuthToken = token;
    socket.emit("authenticate", { token });
  }
}

function handleRealtimeAuthenticated() {
  realtimeState.isAuthenticated = true;
  realtimeState.activeToken = realtimeState.pendingAuthToken ?? authState?.token ?? realtimeState.activeToken;
  flushPendingChatJoins();
  flushPendingOutbound();
  flushPendingReceipts();
}

function handleRealtimeAuthError(payload) {
  const message = typeof payload?.error === "string" ? payload.error : "Authentication error.";
  console.warn("Real-time authentication error", message);
  realtimeState.isAuthenticated = false;

  const normalized = message.toLowerCase();
  if (
    normalized.includes("invalid token") ||
    normalized.includes("missing token") ||
    normalized.includes("token expired")
  ) {
    disconnectRealtime({ keepSocket: true });
    invalidateAuthenticatedSession("Session expired. Please sign in again.");
    return;
  }

  if (normalized.includes("account") && normalized.includes("no longer exists")) {
    disconnectRealtime({ keepSocket: true });
    invalidateAuthenticatedSession(
      "Your account is no longer available. Please sign in again."
    );
    return;
  }

  if (normalized.includes("authenticate before")) {
    syncRealtimeConnection();
  }
}

function handleRealtimeChatHistory(payload) {
  if (!payload || typeof payload !== "object") {
    return;
  }
  const chatId = normalizeChatIdentifier(payload.chat_id);
  if (!chatId) {
    return;
  }

  if (Object.prototype.hasOwnProperty.call(payload, "wallpaper")) {
    const normalizedWallpaper =
      payload.wallpaper === null
        ? null
        : normalizeWallpaperSelection(payload.wallpaper);
    if (normalizedWallpaper) {
      setChatWallpaperOverride(chatId, normalizedWallpaper, { sync: false, silent: true });
    } else {
      clearChatWallpaperOverride(chatId, { sync: false, silent: true });
    }
  }

  realtimeState.joinedChats.add(chatId);
  const messages = Array.isArray(payload.messages) ? payload.messages : [];
  const participants = Array.isArray(payload.participants) ? payload.participants : [];
  const participantAccountIds = Array.isArray(payload.participant_account_ids)
    ? payload.participant_account_ids
    : [];

  let participantMetadata = { chat: null, mutated: false };
  if (participants.length || participantAccountIds.length) {
    participantMetadata = applyServerParticipantMetadata(
      chatId,
      participants,
      participantAccountIds
    );
  }

  applyServerMessages(chatId, messages, { replaceExisting: true, origin: "history" });

  if (participantMetadata.mutated && participantMetadata.chat) {
    saveState(chats);
    renderChats(chatSearchInput.value);
    if (activeChatId === participantMetadata.chat.id) {
      renderChatView(participantMetadata.chat);
    }
  }
}

function handleRealtimeChatWallpaperUpdate(payload) {
  if (!payload || typeof payload !== "object") {
    return;
  }

  const chatId = normalizeChatIdentifier(payload.chat_id);
  if (!chatId) {
    return;
  }

  if (!Object.prototype.hasOwnProperty.call(payload, "wallpaper")) {
    return;
  }

  const normalizedWallpaper =
    payload.wallpaper === null ? null : normalizeWallpaperSelection(payload.wallpaper);

  if (normalizedWallpaper) {
    setChatWallpaperOverride(chatId, normalizedWallpaper, { sync: false, silent: true });
  } else {
    clearChatWallpaperOverride(chatId, { sync: false, silent: true });
  }

  if (chatWallpaperModal && !chatWallpaperModal.hidden && chatId === activeChatId) {
    populateChatWallpaperForm(getActiveChat());
  }

  const updatedBy = normalizeAccountId(payload.updated_by);
  const currentUserId = normalizeAccountId(authState?.user?.id);
  if (updatedBy && currentUserId && updatedBy === currentUserId) {
    return;
  }

  const updatedByUsername =
    typeof payload.updated_by_username === "string" && payload.updated_by_username.trim()
      ? payload.updated_by_username.trim()
      : "";

  const wallpaperLabel = normalizedWallpaper
    ? normalizedWallpaper.charAt(0).toUpperCase() + normalizedWallpaper.slice(1)
    : null;

  let message = normalizedWallpaper
    ? `Chat wallpaper updated to ${wallpaperLabel}.`
    : "Chat wallpaper reset to the app default.";

  if (updatedByUsername) {
    message = normalizedWallpaper
      ? `${updatedByUsername} set the wallpaper to ${wallpaperLabel}.`
      : `${updatedByUsername} reset the chat wallpaper.`;
  }

  showToast({
    message,
    intent: ToastIntent.INFO,
    duration: 3200,
  });
}

function handleRealtimeChatParticipantsUpdate(payload) {
  if (!payload || typeof payload !== "object") {
    return;
  }

  const chatId = normalizeChatIdentifier(payload.chat_id);
  if (!chatId) {
    return;
  }

  const participants = Array.isArray(payload.participants) ? payload.participants : [];
  const participantAccountIds = Array.isArray(payload.participant_account_ids)
    ? payload.participant_account_ids
    : [];

  const { chat, mutated } = applyServerParticipantMetadata(
    chatId,
    participants,
    participantAccountIds
  );

  if (!chat) {
    return;
  }

  if (mutated) {
    saveState(chats);
    renderChats(chatSearchInput.value);
    if (activeChatId === chat.id) {
      renderChatView(chat);
    }
  }

  const updatedBy = normalizeAccountId(payload.updated_by);
  const currentUserId = normalizeAccountId(authState?.user?.id);
  if (updatedBy && currentUserId && updatedBy === currentUserId) {
    return;
  }

  const updatedByUsername =
    typeof payload.updated_by_username === "string" && payload.updated_by_username.trim()
      ? payload.updated_by_username.trim()
      : "";

  if (updatedByUsername) {
    showToast({
      message: `${updatedByUsername} updated the participant list.`,
      intent: ToastIntent.INFO,
      duration: 3200,
    });
  } else if (mutated) {
    showToast({
      message: "Participant list updated.",
      intent: ToastIntent.INFO,
      duration: 2800,
    });
  }
}

function handleRealtimeMessage(payload) {
  if (!payload || typeof payload !== "object") {
    return;
  }
  const chatId = normalizeChatIdentifier(payload.chat_id);
  if (!chatId) {
    return;
  }
  applyServerMessages(chatId, [payload], { origin: "realtime" });
}

function handleRealtimeMessagesRead(payload) {
  const chatId = normalizeChatIdentifier(payload?.chat_id);
  if (!chatId) {
    return;
  }
  const readerId = normalizeAccountId(payload?.reader_id);
  if (!readerId) {
    return;
  }
  const messageIds = Array.isArray(payload?.message_ids)
    ? payload.message_ids.map((value) => {
        if (value === null || value === undefined) {
          return null;
        }
        return String(value);
      })
    : [];
  const normalizedIds = messageIds.filter(Boolean);
  if (!normalizedIds.length) {
    return;
  }

  const chat = chats.find((candidate) => candidate.id === chatId);
  if (!chat) {
    return;
  }

  const idSet = new Set(normalizedIds);
  let mutated = false;

  chat.messages.forEach((message) => {
    if (!message || message.direction !== "outgoing") {
      return;
    }
    const serverId = message.serverId !== undefined && message.serverId !== null ? String(message.serverId) : null;
    if (!serverId || !idSet.has(serverId)) {
      return;
    }
    const previousStatus = message.status;
    const previousReadBy = Array.isArray(message.readBy) ? [...message.readBy] : [];
    applyReadReceiptsToMessage(chat, message, [readerId]);
    const nextReadBy = Array.isArray(message.readBy) ? message.readBy : [];
    const statusChanged = previousStatus !== message.status;
    const readByChanged =
      nextReadBy.length !== previousReadBy.length ||
      previousReadBy.some((value) => !nextReadBy.includes(value));
    if (statusChanged || readByChanged) {
      mutated = true;
    }
  });

  if (mutated) {
    saveState(chats);
    renderChats(chatSearchInput.value);
    if (activeChatId === chatId) {
      renderChatView(chat);
    }
  }
}

function handleRealtimeMessageError(payload) {
  const message =
    typeof payload?.error === "string" && payload.error.trim()
      ? payload.error.trim()
      : "Failed to send message.";
  showToast({
    message,
    intent: ToastIntent.ERROR,
    duration: 4000,
  });
}

function handleRealtimeChatError(payload) {
  const message =
    typeof payload?.error === "string" && payload.error.trim()
      ? payload.error.trim()
      : "Unable to load chat conversation.";
  showToast({
    message,
    intent: ToastIntent.ERROR,
    duration: 4000,
  });
}

async function handleRealtimeCallOffer(payload) {
  if (!payload || typeof payload !== "object") {
    return;
  }

  const chatId = normalizeChatIdentifier(payload.chat_id);
  if (!chatId) {
    return;
  }

  const chat = getChatById(chatId);
  if (!chat) {
    console.warn("Incoming call for unknown chat", chatId);
    return;
  }

  const offer = payload.offer;
  if (!offer || typeof offer.sdp !== "string") {
    return;
  }

  const callType = payload.call_type === CallType.VIDEO ? CallType.VIDEO : CallType.AUDIO;
  const remoteUserId = payload.from ?? payload.from_user_id ?? null;
  const remoteUsername =
    typeof payload.from_username === "string" && payload.from_username.trim()
      ? payload.from_username.trim()
      : null;

  if (activeCall && activeCall.state !== CallState.ENDED) {
    const normalizedRemote = normalizeAccountId(remoteUserId);
    const declinePayload = { chat_id: chatId, reason: "User is busy" };
    if (normalizedRemote) {
      declinePayload.recipient_ids = [normalizedRemote];
    }
    sendCallSignal("call:decline", declinePayload);
    return;
  }

  const remoteAccountIds = [];
  const normalizedRemote = normalizeAccountId(remoteUserId);
  if (normalizedRemote) {
    remoteAccountIds.push(normalizedRemote);
  }

  openCallOverlay({
    chat,
    type: callType,
    direction: "incoming",
    offer,
    remoteUserId,
    remoteUsername,
    remoteAccountIds,
  });
  setActiveCallState(CallState.RINGING);
}

async function handleRealtimeCallAnswer(payload) {
  if (!payload || typeof payload !== "object" || !activeCall) {
    return;
  }

  const chatId = normalizeChatIdentifier(payload.chat_id);
  if (!chatId || chatId !== activeCall.chatId || activeCall.direction !== "outgoing") {
    return;
  }

  const connection = activeCall.peerConnection;
  const answer = payload.answer;
  if (!connection || !answer || typeof answer.sdp !== "string") {
    return;
  }

  try {
    await connection.setRemoteDescription(new RTCSessionDescription(answer));
    activeCall.hasRemoteDescription = true;
    flushPendingCallCandidates();
    setActiveCallState(CallState.CONNECTING);
  } catch (error) {
    console.error("Failed to apply remote call answer", error);
    endActiveCall({ reason: "Call unavailable", suppressToast: false, signalRemote: false });
  }
}

function handleRealtimeCallCandidate(payload) {
  if (!payload || typeof payload !== "object" || !activeCall) {
    return;
  }

  const chatId = normalizeChatIdentifier(payload.chat_id);
  if (!chatId || chatId !== activeCall.chatId) {
    return;
  }

  const candidateInit = payload.candidate;
  if (!candidateInit || typeof candidateInit !== "object") {
    return;
  }

  if (!Array.isArray(activeCall.pendingCandidates)) {
    activeCall.pendingCandidates = [];
  }

  if (activeCall.peerConnection && activeCall.hasRemoteDescription) {
    try {
      activeCall.peerConnection.addIceCandidate(new RTCIceCandidate(candidateInit));
    } catch (error) {
      console.error("Failed to apply call candidate", error);
    }
    return;
  }

  activeCall.pendingCandidates.push(candidateInit);
}

function handleRealtimeCallHangup(payload) {
  if (!payload || typeof payload !== "object" || !activeCall) {
    return;
  }

  const chatId = normalizeChatIdentifier(payload.chat_id);
  if (!chatId || chatId !== activeCall.chatId) {
    return;
  }

  const reason =
    typeof payload.reason === "string" && payload.reason.trim()
      ? payload.reason.trim()
      : "Call ended";

  endActiveCall({ reason, suppressToast: false, signalRemote: false });
}

function handleRealtimeCallDecline(payload) {
  if (!payload || typeof payload !== "object" || !activeCall) {
    return;
  }

  const chatId = normalizeChatIdentifier(payload.chat_id);
  if (!chatId || chatId !== activeCall.chatId || activeCall.direction !== "outgoing") {
    return;
  }

  const reason =
    typeof payload.reason === "string" && payload.reason.trim()
      ? payload.reason.trim()
      : "Call declined";

  endActiveCall({ reason, suppressToast: false, signalRemote: false });
}

function handleRealtimeCallError(payload) {
  const message =
    typeof payload?.error === "string" && payload.error.trim()
      ? payload.error.trim()
      : "Call failed.";
  showToast({
    message,
    intent: ToastIntent.ERROR,
    duration: 4000,
  });
}

function handleRealtimeDisconnect() {
  realtimeState.isAuthenticated = false;
  realtimeState.joinedChats.clear();
  if (authState?.token) {
    realtimeState.pendingAuthToken = authState.token;
  }
}

function handleRealtimeConnectError(error) {
  console.error("Real-time connection error", error);
}

function ensureRealtimeSocket() {
  if (realtimeState.socket) {
    return realtimeState.socket;
  }

  if (typeof window === "undefined" || typeof window.io !== "function") {
    if (!hasLoggedMissingSocketClient) {
      console.warn("Socket.io client is not available; real-time messaging disabled.");
      hasLoggedMissingSocketClient = true;
    }
    return null;
  }

  try {
    const socket = window.io(API_BASE_URL, {
      autoConnect: false,
      transports: ["websocket", "polling"],
      maxPayload: 25 * 1024 * 1024,
    });
    realtimeState.socket = socket;
    socket.on("connect", handleRealtimeConnect);
    socket.on("authenticated", handleRealtimeAuthenticated);
    socket.on("authError", handleRealtimeAuthError);
    socket.on("chatHistory", handleRealtimeChatHistory);
    socket.on("message", handleRealtimeMessage);
    socket.on("chatWallpaper", handleRealtimeChatWallpaperUpdate);
    socket.on("chatParticipantsUpdate", handleRealtimeChatParticipantsUpdate);
    socket.on("messagesRead", handleRealtimeMessagesRead);
    socket.on("messageError", handleRealtimeMessageError);
    socket.on("chatError", handleRealtimeChatError);
    socket.on("call:offer", handleRealtimeCallOffer);
    socket.on("call:answer", handleRealtimeCallAnswer);
    socket.on("call:candidate", handleRealtimeCallCandidate);
    socket.on("call:hangup", handleRealtimeCallHangup);
    socket.on("call:decline", handleRealtimeCallDecline);
    socket.on("call:error", handleRealtimeCallError);
    socket.on("disconnect", handleRealtimeDisconnect);
    socket.on("connect_error", handleRealtimeConnectError);
    return socket;
  } catch (error) {
    console.error("Failed to initialize real-time messaging", error);
    realtimeState.socket = null;
    return null;
  }
}

function disconnectRealtime({ keepSocket = true } = {}) {
  realtimeState.isAuthenticated = false;
  realtimeState.pendingAuthToken = null;
  realtimeState.activeToken = null;
  realtimeState.joinedChats.clear();
  realtimeState.pendingChatJoins.clear();
  realtimeState.pendingOutbound = [];
  realtimeState.serverMessageIds.clear();
  realtimeState.pendingOutgoing.clear();
  realtimeState.pendingReceipts = [];

  const socket = realtimeState.socket;
  if (!socket) {
    return;
  }

  try {
    socket.disconnect();
  } catch (error) {
    console.error("Error closing real-time connection", error);
  }

  if (!keepSocket) {
    realtimeState.socket = null;
  }
}

function syncRealtimeConnection() {
  const socket = ensureRealtimeSocket();
  if (!authState || !authState.token) {
    disconnectRealtime({ keepSocket: true });
    return;
  }
  if (!socket) {
    return;
  }

  const token = authState.token;
  realtimeState.pendingAuthToken = token;

  if (!socket.connected) {
    try {
      socket.connect();
    } catch (error) {
      console.error("Failed to connect to real-time messaging service", error);
    }
    return;
  }

  if (realtimeState.isAuthenticated && realtimeState.activeToken === token) {
    flushPendingChatJoins();
    flushPendingOutbound();
    return;
  }

  socket.emit("authenticate", { token });
}

function joinChatRealtime(chatId) {
  const normalized = normalizeChatIdentifier(chatId);
  if (!normalized) {
    return;
  }
  realtimeState.pendingChatJoins.add(normalized);
  if (!authState || !authState.token) {
    return;
  }

  const socket = ensureRealtimeSocket();
  if (!socket) {
    return;
  }

  if (realtimeState.isAuthenticated && socket.connected && !realtimeState.joinedChats.has(normalized)) {
    socket.emit("joinChat", { chat_id: normalized });
  }
  syncRealtimeConnection();
}

function serializeMessageContentForServer(text, attachments = []) {
  const normalizedText = typeof text === "string" ? text.trim() : "";
  const normalizedAttachments = Array.isArray(attachments)
    ? attachments.map((attachment) => serializeAttachmentForServer(attachment)).filter(Boolean)
    : [];

  if (!normalizedText && !normalizedAttachments.length) {
    return "";
  }

  if (!normalizedAttachments.length) {
    return normalizedText;
  }

  try {
    return JSON.stringify({
      text: normalizedText,
      attachments: normalizedAttachments,
    });
  } catch (error) {
    console.error("Failed to serialize message content", error);
    return normalizedText || "";
  }
}

function normalizeServerMessageContent(payload) {
  if (!payload || typeof payload !== "object") {
    return { text: "", attachments: [] };
  }

  const text = typeof payload.text === "string" ? payload.text : "";
  const attachments = Array.isArray(payload.attachments)
    ? payload.attachments.map(normalizeAttachment).filter(Boolean)
    : [];

  return { text, attachments };
}

function parseServerMessageContent(rawContent) {
  if (typeof rawContent === "string") {
    const trimmed = rawContent.trim();
    if (!trimmed) {
      return { text: "", attachments: [] };
    }

    if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (typeof parsed === "string") {
          return { text: parsed, attachments: [] };
        }
        return normalizeServerMessageContent(parsed);
      } catch (_error) {
        return { text: trimmed, attachments: [] };
      }
    }

    return { text: trimmed, attachments: [] };
  }

  if (rawContent && typeof rawContent === "object") {
    return normalizeServerMessageContent(rawContent);
  }

  return { text: "", attachments: [] };
}

function normalizeReadReceiptList(values) {
  if (!Array.isArray(values)) {
    return [];
  }
  const seen = new Set();
  values.forEach((value) => {
    const normalized = normalizeAccountId(value);
    if (normalized) {
      seen.add(normalized);
    }
  });
  return Array.from(seen);
}

function mergeReadReceiptLists(existing = [], incoming = []) {
  const merged = new Set();
  (Array.isArray(existing) ? existing : []).forEach((value) => {
    const normalized = normalizeAccountId(value);
    if (normalized) {
      merged.add(normalized);
    }
  });
  (Array.isArray(incoming) ? incoming : []).forEach((value) => {
    const normalized = normalizeAccountId(value);
    if (normalized) {
      merged.add(normalized);
    }
  });
  return Array.from(merged);
}

function shouldMarkMessageReadForChatByList(chat, readByList) {
  if (!chat || !Array.isArray(readByList) || !readByList.length) {
    return false;
  }
  if (chat.type === ChatType.GROUP) {
    return true;
  }
  const contactAccountId = getContactAccountId(chat.contact);
  const normalizedRecipient = normalizeAccountId(contactAccountId);
  if (!normalizedRecipient) {
    return readByList.length > 0;
  }
  return readByList.includes(normalizedRecipient);
}

function applyReadReceiptsToMessage(chat, message, readByList = []) {
  if (!message) {
    return;
  }
  const merged = mergeReadReceiptLists(message.readBy, readByList);
  message.readBy = merged;
  if (message.direction === "outgoing" && shouldMarkMessageReadForChatByList(chat, merged)) {
    message.status = MessageStatus.READ;
  }
}

function buildLocalMessageFromServer(chatId, payload) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const { text, attachments } = parseServerMessageContent(payload.content);
  const rawTimestamp = typeof payload.timestamp === "string" ? payload.timestamp : "";
  const parsed = new Date(rawTimestamp);
  const timestamp = Number.isNaN(parsed.getTime()) ? new Date() : parsed;
  const senderId = payload.sender_id ?? null;
  const senderUsername =
    typeof payload.sender_username === "string" && payload.sender_username.trim()
      ? payload.sender_username.trim()
      : "";
  const direction = senderId !== null && authState?.user?.id === senderId ? "outgoing" : "incoming";
  const readBy = normalizeReadReceiptList(payload.read_by);

  const message = {
    id:
      typeof payload.client_id === "string" && payload.client_id
        ? `client-${payload.client_id}`
        : payload.id !== undefined && payload.id !== null
        ? `server-${payload.id}`
        : crypto.randomUUID(),
    text,
    direction,
    sentAt: timestamp.toISOString(),
    timestamp: formatTimeFromDate(timestamp),
    attachments,
    serverId: payload.id !== undefined && payload.id !== null ? String(payload.id) : null,
    clientId: typeof payload.client_id === "string" && payload.client_id ? payload.client_id : null,
    senderId,
    readBy,
  };

  if (senderUsername) {
    message.senderUsername = senderUsername;
  }

  if (direction === "outgoing") {
    message.status = MessageStatus.DELIVERED;
  }

  return message;
}

function isElementNearBottom(element, threshold = 64) {
  if (!element) return true;
  const distance = element.scrollHeight - element.clientHeight - element.scrollTop;
  return distance <= threshold;
}

function bootstrapChatFromServerPayload(chatId, serverPayloads) {
  const normalizedChatId = normalizeChatIdentifier(chatId);
  if (!normalizedChatId) {
    return null;
  }

  if (chats.some((candidate) => candidate.id === normalizedChatId)) {
    return chats.find((candidate) => candidate.id === normalizedChatId) ?? null;
  }

  const payloads = Array.isArray(serverPayloads) ? serverPayloads : [];
  const referencePayload = payloads.find((payload) => payload && typeof payload === "object") ?? null;

  const senderAccountId = referencePayload ? normalizeAccountId(referencePayload.sender_id) : null;
  let contactDetails = senderAccountId ? findContactByAccountId(senderAccountId) : null;
  if (!contactDetails && senderAccountId) {
    contactDetails = { accountId: senderAccountId };
  }

  const senderUsername =
    typeof referencePayload?.sender_username === "string" && referencePayload.sender_username.trim()
      ? referencePayload.sender_username.trim()
      : "";

  if (contactDetails) {
    if (!contactDetails.displayName && senderUsername) {
      contactDetails.displayName = senderUsername;
    }
    if (!contactDetails.nickname && senderUsername) {
      contactDetails.nickname = senderUsername;
    }
  } else if (senderUsername) {
    contactDetails = { displayName: senderUsername, nickname: senderUsername };
  }

  let storedContact = null;
  if (contactDetails) {
    const { contact: resultContact } = upsertContact(contactDetails);
    storedContact = resultContact ?? normalizeContact(contactDetails);
  }

  const chatName =
    storedContact?.displayName || storedContact?.nickname || senderUsername || "New chat";

  const baseChat = {
    id: normalizedChatId,
    name: chatName,
    type: ChatType.DIRECT,
    messages: [],
  };

  if (storedContact) {
    baseChat.contact = storedContact;
  }

  const hydratedChat = normalizeChat(baseChat);

  chats = [hydratedChat, ...chats];
  realtimeState.pendingChatJoins.add(normalizedChatId);
  flushPendingChatJoins();

  return hydratedChat;
}

function applyIncomingContactMetadata(chat, payload) {
  if (!chat || chat.type !== ChatType.DIRECT) {
    return false;
  }

  const senderAccountId = normalizeAccountId(payload?.sender_id);
  const currentUserId = normalizeAccountId(authState?.user?.id);
  if (senderAccountId && currentUserId && senderAccountId === currentUserId) {
    return false;
  }

  const senderUsername =
    typeof payload?.sender_username === "string" && payload.sender_username.trim()
      ? payload.sender_username.trim()
      : "";

  const existingContact = normalizeContact(chat.contact);
  const nextContact = existingContact ? { ...existingContact } : {};
  let mutated = false;

  if (senderAccountId && nextContact.accountId !== senderAccountId) {
    nextContact.accountId = senderAccountId;
    mutated = true;
  }

  if (senderUsername) {
    if (!nextContact.displayName) {
      nextContact.displayName = senderUsername;
      mutated = true;
    }
    if (!nextContact.nickname) {
      nextContact.nickname = senderUsername;
      mutated = true;
    }
  }

  if (!mutated) {
    return false;
  }

  const { contact: storedContact } = upsertContact(nextContact);
  const normalizedContact = storedContact ?? normalizeContact(nextContact);
  if (!normalizedContact) {
    return false;
  }

  const normalizedChat = normalizeChat({ ...chat, contact: normalizedContact });
  Object.assign(chat, normalizedChat);
  return true;
}

function applyServerMessages(chatId, serverPayloads, { replaceExisting = false, origin = "realtime" } = {}) {
  const normalizedChatId = normalizeChatIdentifier(chatId);
  if (!normalizedChatId) {
    return;
  }

  let chat = chats.find((candidate) => candidate.id === normalizedChatId);
  if (!chat) {
    chat = bootstrapChatFromServerPayload(normalizedChatId, serverPayloads);
    if (!chat) {
      return;
    }
  }

  const serverMessageIds = getServerMessageSet(normalizedChatId);
  let mutated = false;
  const isRealtime = origin !== "history";
  // Suppress toast notifications when hydrating historical conversations so we only
  // surface alerts for real-time activity.
  const notifications = [];

  if (replaceExisting) {
    if (chat.messages && chat.messages.some((message) => message && message.serverId)) {
      chat.messages = chat.messages.filter((message) => !message.serverId);
      mutated = true;
    }
    serverMessageIds?.clear();
  }

  const payloads = Array.isArray(serverPayloads) ? serverPayloads : [];
  payloads.forEach((payload) => {
    const contactMutated = applyIncomingContactMetadata(chat, payload);
    if (contactMutated) {
      mutated = true;
    }

    const normalizedMessage = buildLocalMessageFromServer(normalizedChatId, payload);
    if (!normalizedMessage) {
      return;
    }

    const participantsMutated = updateChatParticipantsFromPayload(
      chat,
      payload,
      normalizedMessage
    );
    if (participantsMutated) {
      mutated = true;
    }

    if (normalizedMessage.serverId && serverMessageIds?.has(normalizedMessage.serverId)) {
      const existing = chat.messages.find((message) => message.serverId === normalizedMessage.serverId);
      if (existing) {
        const preservedId = existing.id;
        const preservedAttachments = Array.isArray(existing.attachments) ? existing.attachments : [];
        const nextAttachments =
          preservedAttachments.length > 0
            ? preservedAttachments
            : Array.isArray(normalizedMessage.attachments)
            ? normalizedMessage.attachments
            : [];
        const previousDisplayName = existing.senderDisplayName;
        Object.assign(existing, normalizedMessage, {
          id: preservedId,
          attachments: nextAttachments,
        });
        if (previousDisplayName && !existing.senderDisplayName) {
          existing.senderDisplayName = previousDisplayName;
        }
        applyReadReceiptsToMessage(chat, existing, normalizedMessage.readBy);
        serverMessageIds.add(normalizedMessage.serverId);
        if (normalizedMessage.clientId) {
          realtimeState.pendingOutgoing.delete(normalizedMessage.clientId);
        }
        mutated = true;
        return;
      }
    }

    if (normalizedMessage.clientId) {
      const pending = realtimeState.pendingOutgoing.get(normalizedMessage.clientId);
      if (pending && pending.chatId === normalizedChatId) {
        const existing = chat.messages.find((message) => message.id === pending.localMessageId);
        if (existing) {
          const preservedAttachments = Array.isArray(existing.attachments) ? existing.attachments : [];
          const nextAttachments =
            preservedAttachments.length > 0
              ? preservedAttachments
              : Array.isArray(normalizedMessage.attachments)
              ? normalizedMessage.attachments
              : [];
          const previousDisplayName = existing.senderDisplayName;
          Object.assign(existing, normalizedMessage, {
            id: existing.id,
            attachments: nextAttachments,
          });
          if (previousDisplayName && !existing.senderDisplayName) {
            existing.senderDisplayName = previousDisplayName;
          }
          maybeEnrichMessageWithLinkPreview(chat, existing);
          applyReadReceiptsToMessage(chat, existing, normalizedMessage.readBy);
          if (normalizedMessage.serverId && serverMessageIds) {
            existing.serverId = normalizedMessage.serverId;
            serverMessageIds.add(normalizedMessage.serverId);
          }
          realtimeState.pendingOutgoing.delete(normalizedMessage.clientId);
          mutated = true;
          if (isRealtime && normalizedMessage.direction === "outgoing") {
            const chatName = getChatDisplayName(chat);
            const preview = buildToastPreviewFromMessage(existing);
            notifications.push({
              message: buildToastCopy({
                prefix: "Message sent to",
                chatName,
                preview,
              }),
              intent: ToastIntent.SUCCESS,
            });
          }
          return;
        }
      }
    }

    const assignedId = normalizedMessage.serverId ? `server-${normalizedMessage.serverId}` : normalizedMessage.id;
    const messageToInsert = {
      ...normalizedMessage,
      id: assignedId,
    };
    applyReadReceiptsToMessage(chat, messageToInsert, normalizedMessage.readBy);
    chat.messages.push(messageToInsert);
    maybeEnrichMessageWithLinkPreview(chat, messageToInsert);
    if (normalizedMessage.serverId && serverMessageIds) {
      serverMessageIds.add(normalizedMessage.serverId);
    }
    if (normalizedMessage.clientId) {
      realtimeState.pendingOutgoing.delete(normalizedMessage.clientId);
    }
    if (isRealtime && normalizedMessage.direction === "incoming") {
      if (!isChatInFocus(chat)) {
        const previousUnread = Number.isFinite(chat.unreadCount) ? chat.unreadCount : 0;
        const nextUnread = Math.min(previousUnread + 1, 999);
        if (nextUnread !== previousUnread) {
          chat.unreadCount = nextUnread;
          mutated = true;
        }
      } else if (chat.unreadCount) {
        chat.unreadCount = 0;
        mutated = true;
      }
    }
    if (isRealtime) {
      if (normalizedMessage.direction === "incoming") {
        if (shouldNotifyIncomingMessage(chat)) {
          const chatName = getChatDisplayName(chat);
          const preview = buildToastPreviewFromMessage(messageToInsert);
          notifications.push({
            message: buildToastCopy({
              prefix: "New message from",
              chatName,
              preview,
            }),
            intent: ToastIntent.INFO,
          });
        }
      } else if (normalizedMessage.direction === "outgoing") {
        const chatName = getChatDisplayName(chat);
        const preview = buildToastPreviewFromMessage(messageToInsert);
        notifications.push({
          message: buildToastCopy({
            prefix: "Message sent to",
            chatName,
            preview,
          }),
          intent: ToastIntent.SUCCESS,
        });
      }
    }
    mutated = true;
  });

  if (mutated) {
    chat.messages.sort((a, b) => getMessageTimeValue(a) - getMessageTimeValue(b));
    saveState(chats);
    renderChats(chatSearchInput.value);
    if (activeChatId === normalizedChatId) {
      renderChatView(chat);
    }
  }

  if (isRealtime && notifications.length) {
    notifications.forEach((notification) => showToast(notification));
  }
}

function sendOutgoingMessageToServer(chat, message, text, attachments = []) {
  if (!chat || !message) {
    return;
  }

  if (!authState || !authState.token) {
    return;
  }

  const socket = ensureRealtimeSocket();
  if (!socket) {
    return;
  }

  const normalizedChatId = normalizeChatIdentifier(chat.id);
  if (!normalizedChatId) {
    return;
  }

  const content = serializeMessageContentForServer(text, attachments);
  if (!content) {
    return;
  }

  if (authState?.user?.id !== undefined) {
    message.senderId = authState.user.id;
  }

  const clientMessageId = crypto.randomUUID();
  message.clientId = clientMessageId;
  if (message.serverId === undefined) {
    message.serverId = null;
  }
  recordPendingOutgoingMessage(clientMessageId, normalizedChatId, message.id);

  const payload = {
    chat_id: normalizedChatId,
    content,
    client_id: clientMessageId,
  };

  if (chat.type === ChatType.DIRECT) {
    const recipientAccountId = getContactAccountId(chat.contact);
    if (recipientAccountId) {
      payload.recipient_id = recipientAccountId;
    }
  } else {
    const recipientIds = getChatParticipantAccountIds(chat);
    if (recipientIds.length) {
      payload.recipient_ids = recipientIds;
    }
  }

  realtimeState.pendingChatJoins.add(normalizedChatId);

  if (!realtimeState.isAuthenticated || !socket.connected) {
    queueRealtimeEmit("sendMessage", payload, normalizedChatId);
    syncRealtimeConnection();
    return;
  }

  flushPendingChatJoins();

  try {
    socket.emit("sendMessage", payload);
  } catch (error) {
    console.error("Failed to send message to server", error);
    queueRealtimeEmit("sendMessage", payload, normalizedChatId);
  }
}

function sendChatWallpaperUpdate(chatId, wallpaper) {
  if (!authState || !authState.token) {
    return;
  }

  const socket = ensureRealtimeSocket();
  if (!socket) {
    return;
  }

  const normalizedChatId = normalizeChatIdentifier(chatId);
  if (!normalizedChatId) {
    return;
  }

  const normalizedWallpaper = Object.values(Wallpaper).includes(wallpaper)
    ? wallpaper
    : null;
  const payload = {
    chat_id: normalizedChatId,
    wallpaper: normalizedWallpaper,
  };

  realtimeState.pendingChatJoins.add(normalizedChatId);

  if (!realtimeState.isAuthenticated || !socket.connected) {
    queueRealtimeEmit("chatWallpaperUpdate", payload, normalizedChatId);
    syncRealtimeConnection();
    return;
  }

  flushPendingChatJoins();

  try {
    socket.emit("chatWallpaperUpdate", payload);
  } catch (error) {
    console.error("Failed to send wallpaper update", error);
    queueRealtimeEmit("chatWallpaperUpdate", payload, normalizedChatId);
  }
}

function updateAuthUI() {
  const authenticated = isAuthenticated();

  if (authOverlayElement) {
    authOverlayElement.hidden = authenticated;
    authOverlayElement.setAttribute("aria-hidden", authenticated ? "true" : "false");
  }

  if (document.body) {
    document.body.classList.toggle("auth-locked", !authenticated);
  }

  if (signOutButton) {
    if (authenticated) {
      signOutButton.disabled = false;
      signOutButton.removeAttribute("aria-disabled");
    } else {
      signOutButton.disabled = true;
      signOutButton.setAttribute("aria-disabled", "true");
    }
  }

  if (authenticated) {
    clearAuthError();
    return;
  }

  const activeForm = activeAuthView === AuthView.SIGNUP ? authSignupForm : authLoginForm;
  const firstInput = activeForm?.querySelector("input");
  if (firstInput instanceof HTMLElement && document.activeElement !== firstInput) {
    firstInput.focus();
  }
}

function setAuthState(nextState) {
  const previousAuth = authState;
  const normalized = normalizeAuthState(nextState);
  if (!normalized) {
    authState = null;
    clearLiveSessionValues(previousAuth);
    resetSessionStore();
    clearAuthStateStorage();
    resetVoiceRecorder();
    setActiveAuthView(AuthView.LOGIN);
    updateAuthUI();
    syncRealtimeConnection();
    return;
  }

  if (
    previousAuth &&
    getStorageNamespace(previousAuth) !== getStorageNamespace(normalized)
  ) {
    clearLiveSessionValues(previousAuth);
  }

  authState = normalized;
  saveAuthState(authState);
  hasShownSessionInvalidationToast = false;
  resetSessionStore();
  applyAuthenticatedUserToProfile(authState);
  reloadStateForActiveUser({ preserveChat: false });
  updateAuthUI();
  syncRealtimeConnection();
}

function invalidateAuthenticatedSession(message) {
  const reason = typeof message === "string" && message.trim()
    ? message.trim()
    : "Session expired. Please sign in again.";
  if (!hasShownSessionInvalidationToast) {
    showToast({
      message: reason,
      intent: ToastIntent.ERROR,
      duration: 4000,
    });
    hasShownSessionInvalidationToast = true;
  }
  setAuthState(null);
}

function handleAuthTabClick(event) {
  if (!(event?.currentTarget instanceof HTMLElement)) {
    return;
  }

  const targetView = event.currentTarget.dataset.authTab === AuthView.SIGNUP
    ? AuthView.SIGNUP
    : AuthView.LOGIN;
  setActiveAuthView(targetView, { focusFirstField: true });
}

function handleAuthSwitch(event) {
  if (!(event?.currentTarget instanceof HTMLElement)) {
    return;
  }
  const targetView = event.currentTarget.dataset.authTarget === AuthView.SIGNUP
    ? AuthView.SIGNUP
    : AuthView.LOGIN;
  setActiveAuthView(targetView, { focusFirstField: true });
}

async function handleLoginSubmit(event) {
  event.preventDefault();
  if (!authLoginForm) return;

  const formData = new FormData(authLoginForm);
  const username = (formData.get("username") ?? "").toString().trim();
  const password = (formData.get("password") ?? "").toString();

  if (!username || !password) {
    showAuthError("Enter both a username and password.");
    return;
  }

  clearAuthError();
  setAuthLoading(true, AuthView.LOGIN);

  try {
    const payload = await apiRequest("/api/login", {
      method: "POST",
      body: { username, password },
      includeAuth: false,
    });

    if (!payload || typeof payload !== "object" || !payload.token) {
      throw new Error("Unexpected response from the server.");
    }

    setAuthState(payload);
    authLoginForm.reset();
    showToast(`Signed in as ${payload.user?.username ?? username}`);
  } catch (error) {
    console.error("Failed to sign in", error);
    const message = error instanceof Error ? error.message : "Failed to sign in.";
    showAuthError(message);
  } finally {
    setAuthLoading(false, AuthView.LOGIN);
  }
}

async function handleSignupSubmit(event) {
  event.preventDefault();
  if (!authSignupForm) return;

  const formData = new FormData(authSignupForm);
  const username = (formData.get("username") ?? "").toString().trim();
  const password = (formData.get("password") ?? "").toString();
  const confirm = (formData.get("confirm") ?? "").toString();

  if (!username || !password || !confirm) {
    showAuthError("All fields are required.");
    return;
  }

  if (password.length < 6) {
    showAuthError("Password must be at least 6 characters long.");
    return;
  }

  if (password !== confirm) {
    showAuthError("Passwords do not match.");
    return;
  }

  clearAuthError();
  setAuthLoading(true, AuthView.SIGNUP);

  try {
    const payload = await apiRequest("/api/register", {
      method: "POST",
      body: { username, password },
      includeAuth: false,
    });

    if (!payload || typeof payload !== "object" || !payload.token) {
      throw new Error("Unexpected response from the server.");
    }

    setAuthState(payload);
    authSignupForm.reset();
    showToast(`Welcome, ${payload.user?.username ?? username}!`);
  } catch (error) {
    console.error("Failed to sign up", error);
    const message = error instanceof Error ? error.message : "Failed to create account.";
    showAuthError(message);
  } finally {
    setAuthLoading(false, AuthView.SIGNUP);
  }
}

function reloadStateForActiveUser({ preserveChat = false } = {}) {
  const previousChatId = preserveChat ? activeChatId : null;

  chats = loadState();
  drafts = loadDrafts();
  attachmentDrafts = loadAttachmentDrafts();
  contacts = sortContacts(loadContacts());
  chatWallpaperOverrides = loadChatWallpaperOverrides();
  pruneChatWallpaperOverrides();
  syncContactsFromChats();
  activeProfile = loadProfile();
  updateProfileUI(activeProfile);

  pendingAttachments = [];
  if (!preserveChat) {
    activeChatId = null;
  } else if (previousChatId) {
    activeChatId = previousChatId;
  }
  activeFilter = Filter.ALL;
  if (chatSearchInput) {
    chatSearchInput.value = "";
  }

  updateFilterChips();
  renderChats(chatSearchInput?.value ?? "");
  if (preserveChat && previousChatId) {
    openChat(previousChatId);
  } else {
    renderChatView(null);
    applyChatWallpaper(null);
  }
  renderComposerAttachments();
  resumePendingStatuses();
}

function resetAppDataToDefaults({ auth, removeStoredData = true } = {}) {
  clearPendingAttachments();
  resetSessionStore();
  const namespace = getStorageNamespace(auth ?? authState);
  if (removeStoredData) {
    deleteNamespacedStorage(STORAGE_KEY, namespace);
    deleteNamespacedStorage(DRAFTS_STORAGE_KEY, namespace);
    deleteNamespacedStorage(ATTACHMENT_DRAFTS_STORAGE_KEY, namespace);
    deleteNamespacedStorage(PROFILE_STORAGE_KEY, namespace);
    deleteNamespacedStorage(CONTACTS_STORAGE_KEY, namespace);
  }
  clearLiveSessionValues(auth ?? authState);

  reloadStateForActiveUser({ preserveChat: false });

  if (settingsModal && !settingsModal.hidden) {
    closeSettings({ restoreFocus: false });
  }
  if (profileModal && !profileModal.hidden) {
    closeProfile();
  }
  if (newContactModal && !newContactModal.hidden) {
    closeNewContactModal();
  }
  if (callOverlayElement && !callOverlayElement.hidden) {
    endActiveCall({ reason: "Signed out" });
  }
}

function handleSignOut() {
  const previousAuth = authState;
  setAuthState(null);
  resetAppDataToDefaults({ auth: previousAuth, removeStoredData: false });
  showToast("Signed out");
}

function initializeAuthUI() {
  setActiveAuthView(activeAuthView);

  if (authTabButtons.length) {
    authTabButtons.forEach((button) => {
      button.addEventListener("click", handleAuthTabClick);
    });
  }
  if (authSwitchButton) {
    authSwitchButton.addEventListener("click", handleAuthSwitch);
  }
  if (authLoginForm) {
    authLoginForm.addEventListener("submit", handleLoginSubmit);
  }
  if (authSignupForm) {
    authSignupForm.addEventListener("submit", handleSignupSubmit);
  }
  if (signOutButton) {
    signOutButton.addEventListener("click", handleSignOut);
  }

  updateAuthUI();
}

function openProfile() {
  if (!profileModal || !profileButton) return;
  if (!profileModal.hidden) return;

  if (settingsModal && !settingsModal.hidden) {
    closeSettings({ restoreFocus: false });
  }

  profileRestoreFocusTo =
    document.activeElement instanceof HTMLElement ? document.activeElement : profileButton;

  populateProfileForm(activeProfile);
  updateProfileUI(activeProfile);

  profileModal.hidden = false;
  document.body.classList.add("modal-open");

  const focusTarget = profileNameInput ?? profileModal.querySelector("input, textarea, button");
  if (focusTarget instanceof HTMLElement) {
    focusTarget.focus();
  }
}

function closeProfile({ restoreFocus = true } = {}) {
  if (!profileModal) return;
  if (profileModal.hidden) return;

  profileModal.hidden = true;
  if (!settingsModal || settingsModal.hidden) {
    document.body.classList.remove("modal-open");
  }

  const restoreTarget = profileRestoreFocusTo;
  profileRestoreFocusTo = null;

  if (!restoreFocus) return;

  if (restoreTarget instanceof HTMLElement) {
    restoreTarget.focus();
  } else if (profileButton) {
    profileButton.focus();
  }
}

function trapProfileFocus(event) {
  if (!profileModal || profileModal.hidden) return;
  if (event.key !== "Tab") return;

  const focusableSelectors =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const focusable = Array.from(profileModal.querySelectorAll(focusableSelectors)).filter(
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

function handleProfileSubmit(event) {
  event.preventDefault();
  if (!profileForm) return;

  const nextProfile = normalizeProfile({
    name: profileNameInput?.value,
    about: profileAboutInput?.value,
    phone: profilePhoneInput?.value,
  });

  activeProfile = nextProfile;
  saveProfile(activeProfile);
  updateProfileUI(activeProfile);
  populateProfileForm(activeProfile);
  showToast("Profile updated");
  closeProfile();
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
  applyChatWallpaper(activeChatId);
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
  try {
    localStorage.setItem(WALLPAPER_STORAGE_KEY, wallpaper);
  } catch (error) {
    console.warn("Failed to persist wallpaper preference", error);
  }
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
  applyChatWallpaper(activeChatId);
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

function sanitizeChatWallpaperOverrides(value) {
  if (typeof value !== "object" || value === null) {
    return {};
  }
  const entries = Object.entries(value)
    .map(([chatId, wallpaper]) => {
      const normalizedId = typeof chatId === "string" ? chatId.trim() : "";
      const sanitizedWallpaper = Object.values(Wallpaper).includes(wallpaper)
        ? wallpaper
        : null;
      if (!normalizedId || !sanitizedWallpaper) {
        return null;
      }
      return [normalizedId, sanitizedWallpaper];
    })
    .filter(Boolean);
  return Object.fromEntries(entries);
}

function loadChatWallpaperOverrides() {
  if (isLiveMessagingSession()) {
    const stored = readLiveSessionValue(CHAT_WALLPAPER_OVERRIDES_STORAGE_KEY);
    if (stored && typeof stored === "object") {
      const sanitized = sanitizeChatWallpaperOverrides(stored);
      sessionStore.chatWallpapers = { ...sanitized };
      chatWallpaperOverrides = sanitized;
      return sanitized;
    }
    sessionStore.chatWallpapers = {};
    chatWallpaperOverrides = {};
    return {};
  }

  try {
    const namespace = getStorageNamespace();
    const store = readNamespacedStorage(CHAT_WALLPAPER_OVERRIDES_STORAGE_KEY);
    const raw = store[namespace];
    if (raw && typeof raw === "object") {
      const sanitized = sanitizeChatWallpaperOverrides(raw);
      sessionStore.chatWallpapers = { ...sanitized };
      chatWallpaperOverrides = sanitized;
      return sanitized;
    }
  } catch (error) {
    console.error("Failed to load chat wallpaper overrides", error);
  }

  sessionStore.chatWallpapers = {};
  chatWallpaperOverrides = {};
  return {};
}

function saveChatWallpaperOverrides(overrides) {
  const sanitized = sanitizeChatWallpaperOverrides(overrides);
  chatWallpaperOverrides = sanitized;
  sessionStore.chatWallpapers = { ...sanitized };

  if (isLiveMessagingSession()) {
    writeLiveSessionValue(CHAT_WALLPAPER_OVERRIDES_STORAGE_KEY, sanitized);
    return;
  }

  const namespace = getStorageNamespace();
  if (!Object.keys(sanitized).length) {
    deleteNamespacedStorage(CHAT_WALLPAPER_OVERRIDES_STORAGE_KEY, namespace);
    return;
  }
  writeNamespacedStorage(CHAT_WALLPAPER_OVERRIDES_STORAGE_KEY, namespace, sanitized);
}

function getChatWallpaperOverride(chatId) {
  const normalized = normalizeChatIdentifier(chatId);
  if (!normalized) {
    return null;
  }
  const override = chatWallpaperOverrides[normalized];
  return Object.values(Wallpaper).includes(override) ? override : null;
}

function getEffectiveWallpaperForChat(chatId) {
  const override = chatId ? getChatWallpaperOverride(chatId) : null;
  return override ?? activeWallpaper;
}

function applyChatWallpaper(chatId = activeChatId) {
  const wallpaper = getEffectiveWallpaperForChat(chatId);
  applyWallpaper(wallpaper);
}

function normalizeWallpaperSelection(value) {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim().toLowerCase();
  return Object.values(Wallpaper).includes(trimmed) ? trimmed : null;
}

function setChatWallpaperOverride(chatId, wallpaper, { sync = false, silent = false } = {}) {
  const normalized = normalizeChatIdentifier(chatId);
  if (!normalized) {
    return;
  }

  const isValidWallpaper = Object.values(Wallpaper).includes(wallpaper);
  const nextOverrides = { ...chatWallpaperOverrides };
  if (isValidWallpaper) {
    nextOverrides[normalized] = wallpaper;
  } else {
    delete nextOverrides[normalized];
  }

  const previousValue = Object.values(Wallpaper).includes(chatWallpaperOverrides[normalized])
    ? chatWallpaperOverrides[normalized]
    : null;
  const nextValue = isValidWallpaper ? wallpaper : null;

  if (previousValue === nextValue) {
    if (sync) {
      sendChatWallpaperUpdate(normalized, nextValue);
    }
    return;
  }

  saveChatWallpaperOverrides(nextOverrides);
  if (normalized === activeChatId) {
    applyChatWallpaper(normalized);
  }
  if (sync) {
    sendChatWallpaperUpdate(normalized, nextValue);
  }
}

function clearChatWallpaperOverride(chatId, options = {}) {
  setChatWallpaperOverride(chatId, null, options);
}

function pruneChatWallpaperOverrides() {
  const knownChatIds = new Set(chats.map((chat) => chat.id));
  const nextOverrides = Object.fromEntries(
    Object.entries(chatWallpaperOverrides).filter(([chatId]) => knownChatIds.has(chatId))
  );
  if (Object.keys(nextOverrides).length !== Object.keys(chatWallpaperOverrides).length) {
    saveChatWallpaperOverrides(nextOverrides);
  }
}

function resumePendingStatuses() {
  let mutated = false;
  const validStatuses = Object.values(MessageStatus);
  chats.forEach((chat) => {
    chat.messages.forEach((message) => {
      if (message.direction !== "outgoing") return;
      if (!validStatuses.includes(message.status)) {
        message.status = MessageStatus.SENT;
        mutated = true;
      }
    });
    const normalizedUnread =
      Number.isFinite(chat.unreadCount) && chat.unreadCount > 0
        ? Math.min(Math.floor(chat.unreadCount), 999)
        : 0;
    if (chat.unreadCount !== normalizedUnread) {
      chat.unreadCount = normalizedUnread;
      mutated = true;
    }
    if (chat.id === activeChatId && isChatInFocus(chat) && chat.unreadCount) {
      chat.unreadCount = 0;
      mutated = true;
    }
  });
  if (mutated) {
    saveState(chats);
    renderChats(chatSearchInput.value);
    if (activeChatId) {
      const activeChat = getActiveChat();
      if (activeChat) {
        renderChatView(activeChat);
      }
    }
  }
}

authState = loadAuthState();
let chats = loadState();
let drafts = loadDrafts();
let attachmentDrafts = loadAttachmentDrafts();
let contacts = sortContacts(loadContacts());
chatWallpaperOverrides = loadChatWallpaperOverrides();
let activeProfile = loadProfile();
if (authState) {
  applyAuthenticatedUserToProfile(authState, { persist: false });
  syncRealtimeConnection();
}
syncContactsFromChats();
let activeTheme = loadTheme();
let activeWallpaper = loadWallpaper();
let activeChatId = null;
let activeFilter = Filter.ALL;
let settingsRestoreFocusTo = null;
let profileRestoreFocusTo = null;
let manageParticipantsRestoreFocusTo = null;
let newContactRestoreFocusTo = null;
let pendingAttachments = [];
let activeAuthView = AuthView.LOGIN;
let contactLookupTimer = null;
let contactLookupRequestId = 0;
let contactLookupState = {
  status: ContactLookupStatus.IDLE,
  results: [],
  message: "",
};
let chatMessagesShouldStickToBottom = true;
let hasShownStorageQuotaWarning = false;
let swipeTracking = null;

function getActiveChat() {
  return chats.find((chat) => chat.id === activeChatId) ?? null;
}

function getChatById(chatId) {
  if (chatId === null || chatId === undefined) {
    return null;
  }
  return chats.find((chat) => chat.id === chatId) ?? null;
}

function createHighlightedFragment(text, query, options = {}) {
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
    const className =
      typeof options?.className === "string" && options.className.trim()
        ? options.className.trim()
        : "message__highlight";
    highlight.className = className;
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

function handleMessageSearchOutsideClick(event) {
  if (!isMessageSearchOpen || !messageSearchContainer) return;
  const target = event.target;
  if (!(target instanceof Node)) return;
  if (messageSearchContainer.contains(target)) return;
  if (openMessageSearchButton && openMessageSearchButton.contains(target)) return;
  closeMessageSearch({ restoreFocus: false });
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

  if (!messageSearchOutsideClickHandler) {
    messageSearchOutsideClickHandler = handleMessageSearchOutsideClick;
    document.addEventListener("pointerdown", messageSearchOutsideClickHandler);
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

  if (messageSearchOutsideClickHandler) {
    document.removeEventListener("pointerdown", messageSearchOutsideClickHandler);
    messageSearchOutsideClickHandler = null;
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
      const messageMatch = chat.messages.some((message) => {
        if (!message || typeof message.text !== "string") {
          return false;
        }
        return message.text.toLowerCase().includes(normalizedSearch);
      });
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
    const badgeNode = chatNode.querySelector(".chat-item__badge");

    nameNode.textContent = chat.name;
    avatarNode.textContent = chat.avatar ?? chat.name.slice(0, 1).toUpperCase();

    const tooltip =
      chat.type === ChatType.GROUP
        ? buildGroupTooltip(chat)
        : buildContactTooltip(chat.contact);
    if (tooltip) {
      chatNode.setAttribute("title", `${chat.name} • ${tooltip}`);
    } else {
      chatNode.removeAttribute("title");
    }

    const lastMessage = chat.messages.at(-1);
    timestampNode.textContent = lastMessage ? formatMessageTimestamp(lastMessage) : "";
    const unreadCount = Number.isFinite(chat.unreadCount) ? Math.max(0, chat.unreadCount) : 0;
    if (badgeNode) {
      const hasUnread = unreadCount > 0;
      badgeNode.classList.toggle("chat-item__badge--visible", hasUnread);
      badgeNode.hidden = !hasUnread;
      badgeNode.textContent = hasUnread ? (unreadCount > 99 ? "99+" : String(unreadCount)) : "";
      if (hasUnread) {
        badgeNode.setAttribute("aria-hidden", "false");
        badgeNode.setAttribute(
          "aria-label",
          unreadCount === 1 ? "1 unread message" : `${unreadCount} unread messages`
        );
      } else {
        badgeNode.setAttribute("aria-hidden", "true");
        badgeNode.removeAttribute("aria-label");
      }
    }
    chatNode.classList.toggle("chat-item--unread", unreadCount > 0);

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
    } else if (chat.contact) {
      const contactPreview = getContactPreviewText(chat.contact);
      previewNode.textContent = contactPreview || "No messages yet";
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

  if (normalized.kind === AttachmentKind.LINK_PREVIEW) {
    const container = document.createElement("div");
    container.className = "message__attachment message__attachment--link";

    const link = document.createElement("a");
    link.className = "message__link-preview";
    link.href = normalized.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const accessibleLabel =
      (typeof normalized.title === "string" && normalized.title.trim()) ||
      (typeof normalized.description === "string" && normalized.description.trim()) ||
      normalized.url;
    link.setAttribute("aria-label", `Open link: ${accessibleLabel}`);

    const hasThumbnail = Boolean(normalized.thumbnailUrl);
    if (hasThumbnail) {
      const mediaWrapper = document.createElement("div");
      mediaWrapper.className = "message__link-preview-thumbnail";
      const image = document.createElement("img");
      image.src = normalized.thumbnailUrl;
      image.alt = accessibleLabel;
      mediaWrapper.appendChild(image);
      link.appendChild(mediaWrapper);
    } else {
      link.classList.add("message__link-preview--no-thumbnail");
      const placeholder = document.createElement("div");
      placeholder.className = "message__link-preview-thumbnail";
      const placeholderLabel = document.createElement("div");
      placeholderLabel.className = "message__link-preview-placeholder";
      const host = getHostnameFromUrl(normalized.url);
      placeholderLabel.textContent = host ? host[0]?.toUpperCase() ?? "#" : "#";
      placeholder.appendChild(placeholderLabel);
      link.appendChild(placeholder);
    }

    const body = document.createElement("div");
    body.className = "message__link-preview-body";

    const titleNode = document.createElement("div");
    titleNode.className = "message__link-preview-title";
    titleNode.textContent =
      (typeof normalized.title === "string" && normalized.title.trim()) ||
      normalized.siteName ||
      accessibleLabel;
    body.appendChild(titleNode);

    const descriptionText =
      (typeof normalized.description === "string" && normalized.description.trim()) ||
      normalized.siteName ||
      "";
    if (descriptionText) {
      const descriptionNode = document.createElement("div");
      descriptionNode.className = "message__link-preview-description";
      descriptionNode.textContent = descriptionText;
      body.appendChild(descriptionNode);
    }

    const urlNode = document.createElement("div");
    urlNode.className = "message__link-preview-url";
    urlNode.textContent = getHostnameFromUrl(normalized.url) || normalized.url;
    body.appendChild(urlNode);

    link.appendChild(body);
    container.appendChild(link);
    return container;
  }

  const downloadName = getAttachmentDownloadName(normalized);
  const baseLabel = normalized.name
    ? `${getAttachmentLabel(normalized)}: ${normalized.name}`
    : getAttachmentLabel(normalized);
  const sizeText = formatFileSize(normalized.size);

  if (normalized.kind === AttachmentKind.IMAGE) {
    const container = document.createElement("div");
    container.className = "message__attachment";
    const image = document.createElement("img");
    image.className = "message__attachment-image";
    image.src = normalized.dataUrl;
    image.alt = baseLabel;
    const link = document.createElement("a");
    link.className = "message__attachment-link";
    link.href = normalized.dataUrl;
    link.download = downloadName;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${baseLabel}. Download`);
    link.appendChild(image);
    container.appendChild(link);
    return container;
  }

  if (
    normalized.kind === AttachmentKind.VIDEO ||
    normalized.kind === AttachmentKind.AUDIO
  ) {
    const container = document.createElement("div");
    container.className = "message__attachment message__attachment--media";

    const media = document.createElement(
      normalized.kind === AttachmentKind.VIDEO ? "video" : "audio"
    );
    media.className =
      normalized.kind === AttachmentKind.VIDEO
        ? "message__attachment-video"
        : "message__attachment-audio";
    media.src = normalized.dataUrl;
    media.controls = true;
    media.preload = "metadata";
    media.setAttribute("aria-label", baseLabel);
    container.appendChild(media);

    const footer = document.createElement("div");
    footer.className = "message__attachment-media-footer";

    const details = document.createElement("div");
    details.className = "message__attachment-file-details";

    const name = document.createElement("div");
    name.className = "message__attachment-label";
    const isVoiceMessage = isVoiceNote(normalized);
    name.textContent = isVoiceMessage
      ? "Voice message"
      : normalized.name ?? getAttachmentLabel(normalized);
    details.appendChild(name);

    const meta = document.createElement("div");
    meta.className = "message__attachment-meta";
    if (isVoiceMessage) {
      const durationSeconds = getVoiceNoteDurationSeconds(normalized);
      meta.textContent = formatVoiceDuration(durationSeconds);
    } else if (sizeText) {
      meta.textContent = sizeText;
    }
    if (meta.textContent) {
      details.appendChild(meta);
    }

    const downloadLink = document.createElement("a");
    downloadLink.className = "message__attachment-download";
    downloadLink.href = normalized.dataUrl;
    downloadLink.download = downloadName;
    downloadLink.target = "_blank";
    downloadLink.rel = "noopener noreferrer";
    downloadLink.textContent = "Download";
    downloadLink.setAttribute("aria-label", `${baseLabel}. Download`);

    footer.append(details, downloadLink);
    container.appendChild(footer);
    return container;
  }

  const container = document.createElement("div");
  container.className = "message__attachment message__attachment--file";

  const link = document.createElement("a");
  link.className = "message__attachment-link";
  link.href = normalized.dataUrl;
  link.download = downloadName;
  link.target = "_blank";
  link.rel = "noopener noreferrer";

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

function extractExternalLinks(text = "") {
  if (typeof text !== "string") {
    return [];
  }
  const matches = text.match(/\bhttps?:\/\/[^\s<]+/gi);
  if (!matches) {
    return [];
  }
  const unique = new Set();
  matches.forEach((candidate) => {
    const normalized = normalizePreviewUrl(candidate);
    if (normalized && !unique.has(normalized)) {
      unique.add(normalized);
    }
  });
  return Array.from(unique.values());
}

async function fetchLinkPreviewAttachmentForUrl(url) {
  const normalized = normalizePreviewUrl(url);
  if (!normalized) {
    return null;
  }
  if (linkPreviewCache.has(normalized)) {
    return linkPreviewCache.get(normalized);
  }
  if (linkPreviewRequests.has(normalized)) {
    return linkPreviewRequests.get(normalized);
  }

  const requestPromise = (async () => {
    try {
      const payload = await apiRequest(
        `/api/link-preview?url=${encodeURIComponent(normalized)}`
      );
      const preview = payload && typeof payload === "object" ? payload : null;
      const attachment = createLinkPreviewAttachment({ ...(preview ?? {}), url: normalized });
      if (attachment) {
        linkPreviewCache.set(normalized, attachment);
        return attachment;
      }
    } catch (error) {
      console.warn("Failed to fetch link preview", error);
    }
    linkPreviewCache.set(normalized, null);
    return null;
  })();

  linkPreviewRequests.set(normalized, requestPromise);
  try {
    const result = await requestPromise;
    return result;
  } finally {
    linkPreviewRequests.delete(normalized);
  }
}

function applyLinkPreviewAttachment(chat, message, attachment) {
  if (!chat || !message || !attachment) {
    return false;
  }

  const existingAttachments = Array.isArray(message.attachments)
    ? message.attachments.map(normalizeAttachment).filter(Boolean)
    : [];

  const alreadyPresent = existingAttachments.some((existing) => {
    if (!existing || existing.kind !== AttachmentKind.LINK_PREVIEW) {
      return false;
    }
    return normalizePreviewUrl(existing.url) === normalizePreviewUrl(attachment.url);
  });
  if (alreadyPresent) {
    return false;
  }

  const nextAttachments = [...existingAttachments, attachment]
    .map(normalizeAttachment)
    .filter(Boolean);
  message.attachments = nextAttachments;

  saveState(chats);

  const activeChat = getActiveChat();
  if (activeChat && activeChat.id === chat.id) {
    renderChatView(chat);
  }
  renderChats(chatSearchInput.value);
  return true;
}

function maybeEnrichMessageWithLinkPreview(chat, message) {
  if (!chat || !message) {
    return;
  }

  const urls = extractExternalLinks(message.text ?? "");
  if (!urls.length) {
    return;
  }

  const existingAttachments = Array.isArray(message.attachments)
    ? message.attachments.map(normalizeAttachment).filter(Boolean)
    : [];
  message.attachments = existingAttachments;

  const alreadyHasPreview = existingAttachments.some((attachment) => {
    if (!attachment || attachment.kind !== AttachmentKind.LINK_PREVIEW) {
      return false;
    }
    const normalizedUrl = normalizePreviewUrl(attachment.url);
    return normalizedUrl && urls.includes(normalizedUrl);
  });
  if (alreadyHasPreview) {
    return;
  }

  const primaryUrl = urls[0];
  fetchLinkPreviewAttachmentForUrl(primaryUrl)
    .then((attachment) => {
      if (!attachment) {
        return;
      }
      applyLinkPreviewAttachment(chat, message, attachment);
    })
    .catch(() => {
      // Ignore failures; the chat experience should continue without previews.
    });
}

function queueReadReceipts(chatId, messageIds) {
  const normalizedChatId = normalizeChatIdentifier(chatId);
  if (!normalizedChatId) {
    return;
  }
  const uniqueIds = Array.from(
    new Set((Array.isArray(messageIds) ? messageIds : []).map((value) => (value ? String(value) : "")).filter(Boolean))
  );
  if (!uniqueIds.length) {
    return;
  }

  const socket = ensureRealtimeSocket();
  if (socket && realtimeState.isAuthenticated && socket.connected) {
    try {
      socket.emit("messagesRead", { chat_id: normalizedChatId, message_ids: uniqueIds });
      return;
    } catch (error) {
      console.error("Failed to send read receipts", error);
    }
  }

  realtimeState.pendingReceipts.push({ chatId: normalizedChatId, messageIds: uniqueIds });
  if (realtimeState.pendingReceipts.length > 200) {
    realtimeState.pendingReceipts.shift();
  }
}

function markChatMessagesAsRead(chat) {
  if (!chat || !isChatInFocus(chat)) {
    return;
  }
  const unreadMessages = (chat.messages ?? []).filter(
    (message) =>
      message &&
      message.direction === "incoming" &&
      !message.readAt &&
      message.serverId !== undefined &&
      message.serverId !== null
  );
  if (!unreadMessages.length) {
    return;
  }

  const timestamp = new Date().toISOString();
  const messageIds = unreadMessages
    .map((message) => {
      message.readAt = timestamp;
      return String(message.serverId);
    })
    .filter(Boolean);

  if (!messageIds.length) {
    return;
  }

  queueReadReceipts(chat.id, messageIds);
  saveState(chats);
}

function updateCallControls(chat) {
  const type = chat?.type ?? ChatType.DIRECT;
  const capabilities = chat?.capabilities ?? {};
  const hasChat = Boolean(chat);
  const audioEnabled = hasChat && capabilities.audio !== false;
  const videoEnabled = hasChat && capabilities.video !== false;
  if (startAudioCallButton) {
    startAudioCallButton.disabled = !audioEnabled;
    startAudioCallButton.setAttribute(
      "aria-disabled",
      audioEnabled ? "false" : "true"
    );
    startAudioCallButton.title = audioEnabled
      ? "Start audio call"
      : hasChat
      ? "Audio calling unavailable"
      : "Select a chat to start an audio call";
  }

  if (startVideoCallButton) {
    startVideoCallButton.disabled = !videoEnabled;
    startVideoCallButton.setAttribute(
      "aria-disabled",
      videoEnabled ? "false" : "true"
    );
    startVideoCallButton.title = videoEnabled
      ? "Start video call"
      : hasChat
      ? "Video calling unavailable"
      : "Select a chat to start a video call";
  }
}

function getSelfParticipantName() {
  const profileName =
    typeof activeProfile?.name === "string" && activeProfile.name.trim()
      ? activeProfile.name.trim()
      : "";
  if (profileName) {
    return profileName;
  }

  const authUsername =
    typeof authState?.user?.username === "string" && authState.user.username.trim()
      ? authState.user.username.trim()
      : "";
  if (authUsername) {
    return authUsername;
  }

  return "You";
}

function getDirectChatParticipants(chat) {
  const participants = [];
  const selfName = getSelfParticipantName();
  if (selfName) {
    participants.push(selfName);
  }

  const normalizedContact = normalizeContact(chat?.contact);
  const contactName = normalizedContact
    ? normalizedContact.displayName || normalizedContact.name || normalizedContact.nickname || ""
    : "";
  const fallbackName = typeof chat?.name === "string" ? chat.name.trim() : "";
  const resolvedContactName = contactName || fallbackName;
  if (resolvedContactName) {
    participants.push(resolvedContactName);
  }

  const seen = new Set();
  return participants
    .map((value) => (typeof value === "string" ? value.trim() : ""))
    .filter((value) => {
      if (!value) {
        return false;
      }
      const key = value.toLowerCase();
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
}

function getManageableParticipantNames(chat) {
  if (!chat) {
    return [];
  }

  if (chat.type === ChatType.GROUP) {
    return normalizeGroupParticipants(chat.participants);
  }

  if (chat.type === ChatType.DIRECT) {
    return normalizeGroupParticipants(getDirectChatParticipants(chat));
  }

  return [];
}

function getCallParticipantNames(chat) {
  if (!chat) {
    return [];
  }

  if (chat.type === ChatType.GROUP) {
    const groupParticipants = normalizeGroupParticipants(chat.participants);
    const list = [...groupParticipants];
    const selfName = getSelfParticipantName();
    if (selfName) {
      const normalizedSelf = selfName.trim();
      if (
        normalizedSelf &&
        !list.some((name) => name.toLowerCase() === normalizedSelf.toLowerCase())
      ) {
        list.unshift(normalizedSelf);
      }
    }
    if (!list.length) {
      const fallback = typeof chat.name === "string" ? chat.name.trim() : "";
      if (fallback) {
        list.push(fallback);
      }
    }
    return normalizeGroupParticipants(list);
  }

  return getDirectChatParticipants(chat);
}

function getPrimaryCallParticipantName(chat) {
  if (!chat) {
    return "";
  }

  const participants = getCallParticipantNames(chat);
  if (!participants.length) {
    return "";
  }

  const selfName = getSelfParticipantName();
  if (selfName) {
    const normalizedSelf = selfName.trim().toLowerCase();
    const otherParticipant = participants.find((name) => {
      return name.trim().toLowerCase() !== normalizedSelf;
    });
    if (otherParticipant) {
      return otherParticipant;
    }
  }

  return participants[0];
}

function renderChatParticipants(chat) {
  if (!chatParticipantsElement) {
    return;
  }

  chatParticipantsElement.innerHTML = "";

  if (!chat || chat.type !== ChatType.GROUP) {
    chatParticipantsElement.hidden = true;
    chatParticipantsElement.setAttribute("aria-hidden", "true");
    chatParticipantsElement.removeAttribute("aria-label");
    return;
  }

  const entries = buildParticipantEntries(chat);
  if (!entries.length) {
    chatParticipantsElement.hidden = true;
    chatParticipantsElement.setAttribute("aria-hidden", "true");
    chatParticipantsElement.removeAttribute("aria-label");
    return;
  }

  entries.forEach((entry) => {
    const participant = document.createElement("button");
    participant.type = "button";
    participant.className = "chat__participant";
    participant.dataset.participantKey = entry.key;
    participant.dataset.participantInContacts = entry.isInContacts ? "true" : "false";
    participant.dataset.participantSelf = entry.isSelf ? "true" : "false";
    if (entry.accountId) {
      participant.dataset.participantAccountId = entry.accountId;
    }
    if (entry.username) {
      participant.dataset.participantUsername = entry.username;
    }
    participant.dataset.participantName = entry.displayName || entry.displayLabel;

    if (entry.isSelf) {
      participant.classList.add("chat__participant--self");
      participant.title = "You";
    } else if (!entry.isInContacts) {
      participant.classList.add("chat__participant--actionable");
      participant.title = `Add ${entry.displayLabel} to contacts`;
    } else {
      participant.title = `${entry.displayLabel} is in your contacts`;
    }

    const avatar = document.createElement("span");
    avatar.className = "chat__participant-avatar";
    avatar.textContent = getInitials(entry.avatarLabel);

    const details = document.createElement("span");
    details.className = "chat__participant-details";

    const nameNode = document.createElement("span");
    nameNode.className = "chat__participant-name";
    nameNode.textContent = entry.displayLabel;
    details.appendChild(nameNode);

    if (entry.username && entry.username.toLowerCase() !== entry.displayLabel.toLowerCase()) {
      const usernameNode = document.createElement("span");
      usernameNode.className = "chat__participant-username";
      usernameNode.textContent = `@${entry.username}`;
      details.appendChild(usernameNode);
    }

    if (!entry.isSelf && !entry.isInContacts) {
      const hintNode = document.createElement("span");
      hintNode.className = "chat__participant-hint";
      hintNode.textContent = "Add to contacts";
      details.appendChild(hintNode);
    }

    participant.append(avatar, details);
    chatParticipantsElement.appendChild(participant);
  });

  chatParticipantsElement.hidden = false;
  chatParticipantsElement.setAttribute("aria-hidden", "false");
  const countLabel = `${entries.length} participant${entries.length === 1 ? "" : "s"}`;
  chatParticipantsElement.setAttribute("aria-label", countLabel);
}

function buildParticipantEntries(chat) {
  if (!chat || chat.type !== ChatType.GROUP) {
    return [];
  }

  const normalizedAccountIds = normalizeParticipantAccountIds(chat.participantAccountIds);
  const normalizedNames = normalizeGroupParticipants(chat.participants);
  const entries = [];
  const seenKeys = new Set();
  const seenLabels = new Set();

  const selfId = normalizeAccountId(authState?.user?.id);
  const selfName = getSelfParticipantName();
  const selfNameKey = selfName ? selfName.trim().toLowerCase() : "";

  const contactsByAccountId = new Map();
  const contactsByName = new Map();

  contacts
    .map(normalizeContact)
    .filter(Boolean)
    .forEach((contact) => {
      if (contact.accountId) {
        contactsByAccountId.set(contact.accountId, contact);
      }
      [contact.displayName, contact.nickname, contact.name].forEach((value) => {
        if (typeof value !== "string") {
          return;
        }
        const trimmed = value.trim();
        if (!trimmed) {
          return;
        }
        const key = trimmed.toLowerCase();
        if (!contactsByName.has(key)) {
          contactsByName.set(key, contact);
        }
      });
    });

  const addEntry = (entry) => {
    const labelKey =
      typeof entry.displayLabel === "string" && entry.displayLabel
        ? entry.displayLabel.toLowerCase()
        : "";
    if (labelKey && seenLabels.has(labelKey)) {
      return;
    }
    if (labelKey) {
      seenLabels.add(labelKey);
    }
    entries.push(entry);
  };

  normalizedAccountIds.forEach((accountId) => {
    const normalizedId = normalizeAccountId(accountId);
    if (!normalizedId) {
      return;
    }
    const key = `account:${normalizedId.toLowerCase()}`;
    if (seenKeys.has(key)) {
      return;
    }
    seenKeys.add(key);

    const contact = contactsByAccountId.get(normalizedId) ?? null;
    const directory = participantDirectory.get(normalizedId) ?? null;
    const username =
      (directory && directory.username) ||
      (contact && contact.username) ||
      "";
    const displayName =
      (contact && (contact.displayName || contact.nickname || contact.name)) ||
      (directory && (directory.displayName || directory.username)) ||
      "";
    const label = displayName || (username ? `@${username}` : normalizedId);

    const isSelf =
      selfId && normalizedId ? normalizedId.toLowerCase() === selfId.toLowerCase() : false;

    addEntry({
      key,
      accountId: normalizedId,
      username,
      displayName,
      displayLabel: label,
      avatarLabel: displayName || username || normalizedId,
      isInContacts: isSelf ? true : Boolean(contact),
      isSelf,
    });
  });

  normalizedNames.forEach((name) => {
    const trimmed = typeof name === "string" ? name.trim() : "";
    if (!trimmed) {
      return;
    }
    const key = `name:${trimmed.toLowerCase()}`;
    if (seenKeys.has(key)) {
      return;
    }
    seenKeys.add(key);

    const contact = contactsByName.get(trimmed.toLowerCase()) ?? null;
    const accountId = contact?.accountId ?? null;
    const directory = accountId ? participantDirectory.get(accountId) : null;
    const username =
      (directory && directory.username) ||
      (contact && contact.username) ||
      "";

    const normalizedAccountId = normalizeAccountId(accountId);
    const matchesSelfById =
      normalizedAccountId && selfId
        ? normalizedAccountId.toLowerCase() === selfId.toLowerCase()
        : false;
    const matchesSelfByName =
      selfNameKey && trimmed.toLowerCase() === selfNameKey ? true : false;
    const isSelf = matchesSelfById || matchesSelfByName;

    addEntry({
      key,
      accountId: accountId ?? undefined,
      username,
      displayName: trimmed,
      displayLabel: trimmed,
      avatarLabel: trimmed,
      isInContacts: isSelf ? true : Boolean(contact),
      isSelf,
    });
  });

  return entries;
}

async function ensureParticipantProfiles(accountIds = []) {
  const normalizedIds = normalizeParticipantAccountIds(accountIds);
  if (!normalizedIds.length) {
    return;
  }

  const missing = normalizedIds.filter((id) => {
    if (!id) {
      return false;
    }
    if (participantDirectory.has(id)) {
      return false;
    }
    if (participantProfileRequests.has(id)) {
      return false;
    }
    return true;
  });

  if (!missing.length) {
    return;
  }

  const lookupPromise = (async () => {
    try {
      const payload = await apiRequest(
        `/api/users/lookup?ids=${encodeURIComponent(missing.join(","))}`
      );
      const results = Array.isArray(payload?.results) ? payload.results : [];
      results.forEach((entry) => {
        if (!entry) {
          return;
        }
        const rawId = entry.id ?? entry.accountId ?? null;
        const normalized = normalizeAccountId(rawId);
        if (!normalized) {
          return;
        }
        const username =
          typeof entry.username === "string" && entry.username.trim()
            ? entry.username.trim()
            : "";
        const displayName =
          typeof entry.displayName === "string" && entry.displayName.trim()
            ? entry.displayName.trim()
            : "";
        participantDirectory.set(normalized, {
          username,
          displayName: displayName || username || normalized,
        });
      });
    } catch (error) {
      console.warn("Failed to resolve participant usernames", error);
    } finally {
      missing.forEach((id) => {
        participantProfileRequests.delete(id);
      });
    }
  })();

  missing.forEach((id) => participantProfileRequests.set(id, lookupPromise));
  await lookupPromise;
}

function applyServerParticipantMetadata(chatId, participants, participantAccountIds) {
  const normalizedChatId = normalizeChatIdentifier(chatId);
  if (!normalizedChatId) {
    return { chat: null, mutated: false };
  }

  let chat = chats.find((candidate) => candidate.id === normalizedChatId);
  if (!chat) {
    chat = bootstrapChatFromServerPayload(normalizedChatId, []);
    if (!chat) {
      return { chat: null, mutated: false };
    }
  }

  if (!Array.isArray(chat.participants)) {
    chat.participants = [];
  }
  if (!Array.isArray(chat.participantAccountIds)) {
    chat.participantAccountIds = [];
  }

  const normalizedNames = normalizeGroupParticipants(participants);
  const normalizedAccountIds = normalizeParticipantAccountIds(participantAccountIds);

  let mutated = false;

  const existingNames = normalizeGroupParticipants(chat.participants);
  if (
    normalizedNames.length !== existingNames.length ||
    existingNames.some((value, index) => value !== normalizedNames[index])
  ) {
    chat.participants = normalizedNames;
    mutated = true;
  }

  const existingAccountIds = normalizeParticipantAccountIds(chat.participantAccountIds);
  if (
    normalizedAccountIds.length !== existingAccountIds.length ||
    existingAccountIds.some((value, index) => value !== normalizedAccountIds[index])
  ) {
    chat.participantAccountIds = normalizedAccountIds;
    mutated = true;
  }

  if (normalizedAccountIds.length) {
    ensureParticipantProfiles(normalizedAccountIds);
  }

  if (chat.type !== ChatType.GROUP) {
    const promoted = maybePromoteChatToGroup(chat);
    if (promoted) {
      mutated = true;
    }
  }

  if (ensureSelfParticipant(chat)) {
    mutated = true;
  }

  if (chat.type === ChatType.GROUP) {
    const nextStatus = deriveGroupStatus(chat.participants, chat.description);
    if (nextStatus !== chat.status) {
      chat.status = nextStatus;
      mutated = true;
    }
  }

  return { chat, mutated };
}

function sendChatParticipantsUpdate(chat) {
  if (!chat || chat.type !== ChatType.GROUP) {
    return;
  }
  if (!authState || !authState.token) {
    return;
  }

  const socket = ensureRealtimeSocket();
  if (!socket) {
    return;
  }

  const normalizedChatId = normalizeChatIdentifier(chat.id);
  if (!normalizedChatId) {
    return;
  }

  const participants = normalizeGroupParticipants(chat.participants);
  const participantAccountIds = normalizeParticipantAccountIds(chat.participantAccountIds);

  if (!participants.length && !participantAccountIds.length) {
    return;
  }

  const payload = {
    chat_id: normalizedChatId,
    participants,
    participant_account_ids: participantAccountIds,
  };

  realtimeState.pendingChatJoins.add(normalizedChatId);

  if (!realtimeState.isAuthenticated || !socket.connected) {
    queueRealtimeEmit("chatParticipantsUpdate", payload, normalizedChatId);
    syncRealtimeConnection();
    return;
  }

  flushPendingChatJoins();

  try {
    socket.emit("chatParticipantsUpdate", payload);
  } catch (error) {
    console.error("Failed to send participant update", error);
    queueRealtimeEmit("chatParticipantsUpdate", payload, normalizedChatId);
  }
}

function handleParticipantChipClick(event) {
  if (!chatParticipantsElement) {
    return;
  }
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }
  const button = target.closest(".chat__participant");
  if (!(button instanceof HTMLButtonElement)) {
    return;
  }

  const inContacts = button.dataset.participantInContacts === "true";
  const isSelf = button.dataset.participantSelf === "true";
  const name = button.dataset.participantName ?? "";
  const username = button.dataset.participantUsername ?? "";
  const accountId = button.dataset.participantAccountId ?? "";
  const label = name || (username ? `@${username}` : accountId || "This participant");

  if (isSelf) {
    showToast("That's you");
    return;
  }

  if (inContacts) {
    showToast(`${label} is already saved in your contacts`);
    return;
  }

  if (!newContactModal || !newContactForm) {
    showToast("Open the new chat dialog to add contacts.");
    return;
  }

  openNewContactModal();
  showNewChatView("form", { focus: false });
  setActiveContactMethod(ContactMethod.NICKNAME, { focus: false });

  const value = username || name || accountId;
  if (newContactNicknameInput instanceof HTMLInputElement) {
    newContactNicknameInput.value = value;
    newContactNicknameInput.dispatchEvent(new Event("input", { bubbles: true }));
  }
  updateNewContactPreview();
  refreshContactLookupForMethod();
  if (newContactNicknameInput instanceof HTMLInputElement) {
    newContactNicknameInput.focus();
    const length = newContactNicknameInput.value.length;
    newContactNicknameInput.setSelectionRange(length, length);
  }

  showToast(`Add ${label} to your contacts from the form.`);
}

function handleChatContactClick() {
  const chat = getActiveChat();
  if (!chat) {
    showToast("Select a conversation to view its details.");
    return;
  }

  if (chat.type === ChatType.GROUP) {
    openManageParticipantsModal();
    return;
  }

  const contact = normalizeContact(chat.contact);
  if (contact) {
    const label = contact.displayName || contact.nickname || chat.name || "This contact";
    showToast(`${label} is already saved in your contacts`);
    return;
  }

  if (!newContactModal || !newContactForm) {
    showToast("Open the new chat dialog to add contacts.");
    return;
  }

  openNewContactModal();
  showNewChatView("form", { focus: false });
  setActiveContactMethod(ContactMethod.NICKNAME, { focus: false });

  const fallback = chat.name || "";
  if (newContactNicknameInput instanceof HTMLInputElement) {
    newContactNicknameInput.value = fallback;
    newContactNicknameInput.dispatchEvent(new Event("input", { bubbles: true }));
  }
  updateNewContactPreview();
  refreshContactLookupForMethod();
  if (newContactNicknameInput instanceof HTMLInputElement) {
    newContactNicknameInput.focus();
    const length = newContactNicknameInput.value.length;
    newContactNicknameInput.setSelectionRange(length, length);
  }

  showToast("Fill in the details to save this contact.");
}

function renderChatView(chat) {
  if (chatWallpaperButton) {
    const hasChat = Boolean(chat);
    chatWallpaperButton.disabled = !hasChat;
    chatWallpaperButton.setAttribute("aria-disabled", hasChat ? "false" : "true");
    const label = hasChat
      ? `Customize wallpaper for ${chat.name}`
      : "Customize chat wallpaper";
    chatWallpaperButton.setAttribute("aria-label", label);
    chatWallpaperButton.setAttribute("title", label);
  }

  if (!chat) {
    renderChatParticipants(null);
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
    chatMessagesShouldStickToBottom = true;
    messageInput.value = "";
    autoResizeTextarea();
    pendingAttachments = [];
    resetVoiceRecorder();
    renderComposerAttachments();
    updateCallControls(null);
    if (manageParticipantsButton) {
      manageParticipantsButton.hidden = true;
      manageParticipantsButton.disabled = true;
    }
    if (deleteChatButton) {
      deleteChatButton.disabled = true;
      deleteChatButton.setAttribute("aria-label", "Delete conversation");
      deleteChatButton.setAttribute("title", "Delete conversation");
    }
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
  const statusTooltip =
    chat.type === ChatType.GROUP
      ? buildGroupTooltip(chat)
      : buildContactTooltip(chat.contact);
  if (statusTooltip) {
    chatStatusElement.setAttribute("title", statusTooltip);
  } else {
    chatStatusElement.removeAttribute("title");
  }
  chatAvatarElement.textContent = chat.avatar ?? chat.name.slice(0, 1).toUpperCase();

  updateCallControls(chat);
  if (chat && chat.type === ChatType.GROUP) {
    const accountIds = getChatParticipantAccountIds(chat, { includeSelf: true });
    ensureParticipantProfiles(accountIds).then(() => {
      const activeChat = getActiveChat();
      if (activeChat && activeChat.id === chat.id) {
        renderChatParticipants(chat);
      }
    });
  }
  renderChatParticipants(chat);

  if (manageParticipantsButton) {
    const hasChat = Boolean(chat);
    manageParticipantsButton.hidden = !hasChat;
    manageParticipantsButton.disabled = !hasChat;
    const label = hasChat ? `Add participants to ${chat.name}` : "Add participants";
    manageParticipantsButton.setAttribute("aria-label", label);
    manageParticipantsButton.setAttribute("title", label);
  }

  if (deleteChatButton) {
    deleteChatButton.disabled = false;
    const label = `Delete conversation with ${chat.name}`;
    deleteChatButton.setAttribute("aria-label", label);
    deleteChatButton.setAttribute("title", label);
  }

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
  const wasNearBottom = shouldHighlight
    ? false
    : chatMessagesShouldStickToBottom || isElementNearBottom(chatMessagesElement);

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
    const authorNode = messageNode.querySelector(".message__author");

    const messageText = typeof message.text === "string" ? message.text : "";
    const messageTextLower = messageText.toLowerCase();
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
    const attachmentsMatch = shouldHighlight
      ? attachments.some((attachment) => {
          if (!attachment || typeof attachment !== "object") return false;
          const name = typeof attachment.name === "string" ? attachment.name.toLowerCase() : "";
          return Boolean(name && normalizedSearchQuery && name.includes(normalizedSearchQuery));
        })
      : false;
    const messageMatches = !shouldHighlight
      ? true
      : messageTextLower.includes(normalizedSearchQuery) || attachmentsMatch;

    messageNode.classList.remove("message--search-active");
    if (shouldHighlight) {
      const hideMessage = !messageMatches;
      // When the in-chat search is active we only surface matching messages, so
      // toggle the `hidden` attribute instead of merely highlighting them.
      messageNode.classList.toggle("message--search-match", messageMatches);
      messageNode.toggleAttribute("hidden", hideMessage);
      messageNode.hidden = hideMessage;
      messageNode.setAttribute("aria-hidden", hideMessage ? "true" : "false");
      if (!hideMessage) {
        matchesForChat.push({ element: messageNode });
      }
    } else {
      messageNode.classList.remove("message--search-match");
      messageNode.removeAttribute("hidden");
      messageNode.hidden = false;
      messageNode.setAttribute("aria-hidden", "false");
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

    const authorLabel = getMessageAuthorLabel(chat, message);
    const shouldShowAuthor = chat.type === ChatType.GROUP && Boolean(authorLabel);
    if (authorNode) {
      if (shouldShowAuthor) {
        authorNode.hidden = false;
        authorNode.textContent = authorLabel;
        authorNode.setAttribute("aria-hidden", "false");
      } else {
        authorNode.hidden = true;
        authorNode.textContent = "";
        authorNode.setAttribute("aria-hidden", "true");
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
    if (shouldShowAuthor) {
      accessibleParts.push(authorLabel);
    }
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

  if (!shouldHighlight && wasNearBottom) {
    chatMessagesElement.scrollTop = chatMessagesElement.scrollHeight;
    chatMessagesShouldStickToBottom = true;
  } else {
    chatMessagesShouldStickToBottom = isElementNearBottom(chatMessagesElement);
  }

  const draftValue = getDraft(chat.id) ?? "";
  messageInput.value = draftValue;
  autoResizeTextarea();
  renderComposerAttachments();
  markChatMessagesAsRead(chat);
}

function openChat(chatId) {
  if (activeChatId && activeChatId !== chatId) {
    setAttachmentDraft(activeChatId, pendingAttachments);
  }
  resetVoiceRecorder();
  chatMessagesShouldStickToBottom = true;
  activeChatId = chatId;
  pendingAttachments = getAttachmentDraft(chatId);
  const chat = getActiveChat();
  let unreadCleared = false;
  if (chat && chat.unreadCount) {
    chat.unreadCount = 0;
    unreadCleared = true;
  }
  renderChats(chatSearchInput.value);
  if (isMessageSearchOpen) {
    shouldScrollToActiveSearchMatch = true;
  }
  renderChatView(chat);
  if (chat) {
    joinChatRealtime(chat.id);
  }
  applyChatWallpaper(chat?.id ?? null);
  if (isMessageSearchOpen) {
    focusMessageSearchInput();
  }
  maybeHideSidebar();
  if (unreadCleared) {
    saveState(chats);
  }
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
    serverId: null,
    clientId: null,
    readBy: isOutgoing ? [] : undefined,
  };
  if (isOutgoing && authState?.user?.id !== undefined) {
    newMessage.senderId = authState.user.id;
  }
  if (isOutgoing) {
    const username =
      typeof authState?.user?.username === "string" && authState.user.username.trim()
        ? authState.user.username.trim()
        : "";
    if (username) {
      newMessage.senderUsername = username;
    }
  }
  chat.messages.push(newMessage);
  chat.messages.sort((a, b) => getMessageTimeValue(a) - getMessageTimeValue(b));

  updateChatParticipantsFromMessage(chat, newMessage);

  maybeEnrichMessageWithLinkPreview(chat, newMessage);

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
  return { wasArchived, message: newMessage };
}

function createChat(nameInput, options = {}) {
  const {
    status: statusOverride,
    contact: contactDetails,
    avatar: avatarOverride,
    type: typeOverride,
    participants: participantsOverride,
    description: descriptionOverride,
    capabilities: capabilitiesOverride,
    participantAccountIds: participantAccountIdsOverride,
  } = options ?? {};
  const normalizedContact = normalizeContact(contactDetails);
  const normalizedType =
    typeOverride === ChatType.GROUP ? ChatType.GROUP : ChatType.DIRECT;
  const participants =
    normalizedType === ChatType.GROUP
      ? normalizeGroupParticipants(participantsOverride)
      : [];
  const description =
    normalizedType === ChatType.GROUP && typeof descriptionOverride === "string"
      ? sanitizeStatus(descriptionOverride)
      : "";
  const participantAccountIds =
    normalizedType === ChatType.GROUP
      ? normalizeParticipantAccountIds(participantAccountIdsOverride)
      : [];
  const capabilities = {
    audio:
      capabilitiesOverride && typeof capabilitiesOverride.audio !== "undefined"
        ? Boolean(capabilitiesOverride.audio)
        : true,
    video:
      capabilitiesOverride && typeof capabilitiesOverride.video !== "undefined"
        ? Boolean(capabilitiesOverride.video)
        : true,
    phone:
      normalizedType === ChatType.GROUP
        ? Boolean(capabilitiesOverride?.phone)
        : capabilitiesOverride && typeof capabilitiesOverride.phone !== "undefined"
        ? Boolean(capabilitiesOverride.phone)
        : true,
  };

  const rawName = typeof nameInput === "string" ? nameInput.trim() : "";
  const fallbackName = normalizedContact?.displayName ?? "";
  const baseName = rawName || fallbackName;
  const normalizedName =
    baseName && typeof baseName.normalize === "function"
      ? baseName.normalize("NFKD")
      : baseName;
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

  const name = baseName || "New chat";
  const newChat = {
    id: candidateId,
    name,
    status: "online",
    avatar:
      typeof avatarOverride === "string" && avatarOverride.trim()
        ? avatarOverride.trim().slice(0, 2).toUpperCase()
        : name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase(),
    isStarred: false,
    isArchived: false,
    messages: [],
    type: normalizedType,
    participants,
    participantAccountIds,
    description,
    capabilities,
  };

  if (normalizedContact && normalizedType !== ChatType.GROUP) {
    const { contact: storedContact } = upsertContact(normalizedContact);
    newChat.contact = storedContact ?? normalizedContact;
  }

  if (normalizedType === ChatType.GROUP) {
    ensureSelfParticipant(newChat);
  }

  const sanitizedStatus = sanitizeStatus(statusOverride);
  if (sanitizedStatus) {
    newChat.status = sanitizedStatus;
  } else if (normalizedType === ChatType.GROUP) {
    newChat.status = deriveGroupStatus(participants, description);
  } else if (normalizedContact) {
    newChat.status = deriveContactStatus(normalizedContact);
  }

  chats = [newChat, ...chats];
  saveState(chats);
  if (activeFilter !== Filter.ALL) {
    activeFilter = Filter.ALL;
    updateFilterChips();
  }
  chatSearchInput.value = "";
  openChat(newChat.id);
  if (normalizedType === ChatType.GROUP) {
    sendChatParticipantsUpdate(newChat);
  }
  return newChat;
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

  const { wasArchived, message } = addMessageToChat(chat.id, text, "outgoing", attachmentsToSend);
  if (message) {
    sendOutgoingMessageToServer(chat, message, message.text, message.attachments);
  }
  messageInput.value = "";
  autoResizeTextarea();
  setDraft(chat.id, "");
  renderChats(chatSearchInput.value);

  if (wasArchived) {
    showToast("Conversation restored from archive");
  }
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

function readBlobAsDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read recording"));
    reader.readAsDataURL(blob);
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
  input.setAttribute("accept", DEFAULT_ATTACHMENT_ACCEPT);
  if (DEFAULT_ATTACHMENT_CAPTURE) {
    input.setAttribute("capture", DEFAULT_ATTACHMENT_CAPTURE);
  } else {
    input.removeAttribute("capture");
  }
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

function openAttachmentPicker({ accept = DEFAULT_ATTACHMENT_ACCEPT, capture = null } = {}) {
  if (!attachmentInput) return;
  const chat = getActiveChat();
  if (!chat) {
    showToast("Select a chat to add attachments");
    return;
  }
  closeEmojiPicker();
  if (accept) {
    attachmentInput.setAttribute("accept", accept);
  } else {
    attachmentInput.setAttribute("accept", DEFAULT_ATTACHMENT_ACCEPT);
  }
  if (capture) {
    attachmentInput.setAttribute("capture", capture);
  } else if (DEFAULT_ATTACHMENT_CAPTURE) {
    attachmentInput.setAttribute("capture", DEFAULT_ATTACHMENT_CAPTURE);
  } else {
    attachmentInput.removeAttribute("capture");
  }
  attachmentInput.click();
}

function updateVoiceRecorderTimer() {
  if (!voiceRecorderIsActive || !voiceRecorderTimerElement) return;
  const elapsedSeconds = Math.max(0, Math.round((Date.now() - voiceRecorderStartedAt) / 1000));
  voiceRecorderLastDuration = elapsedSeconds;
  voiceRecorderTimerElement.textContent = formatVoiceDuration(elapsedSeconds);
}

function cleanupVoiceRecorderMedia() {
  if (voiceRecorderMediaRecorder) {
    try {
      voiceRecorderMediaRecorder.ondataavailable = null;
      voiceRecorderMediaRecorder.onerror = null;
      voiceRecorderMediaRecorder.onstop = null;
      if (voiceRecorderMediaRecorder.state !== "inactive") {
        voiceRecorderMediaRecorder.stop();
      }
    } catch (error) {
      console.error("Error closing voice recorder", error);
    }
  }
  voiceRecorderMediaRecorder = null;
  if (voiceRecorderStream) {
    try {
      voiceRecorderStream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error("Error stopping microphone stream", error);
    }
  }
  voiceRecorderStream = null;
}

async function finalizeVoiceRecorder() {
  const shouldSend = voiceRecorderPendingSend;
  const suppressToast = voiceRecorderPendingSuppressToast;
  const chunks = voiceRecorderChunks.slice();
  const recorderMimeType = voiceRecorderMediaRecorder?.mimeType;
  voiceRecorderPendingSend = false;
  voiceRecorderPendingSuppressToast = false;
  voiceRecorderChunks = [];

  cleanupVoiceRecorderMedia();

  const durationSeconds = voiceRecorderLastDuration > 0 ? voiceRecorderLastDuration : 0;
  voiceRecorderLastDuration = 0;

  if (!shouldSend) {
    if (durationSeconds > 0 && !suppressToast) {
      showToast("Voice recording canceled");
    }
    return;
  }

  const chat = getActiveChat();
  if (!chat) {
    if (!suppressToast) {
      showToast("Select a chat to send voice messages");
    }
    return;
  }

  let attachment = null;
  if (chunks.length) {
    try {
      const blob = new Blob(chunks, {
        type: recorderMimeType || chunks[0]?.type || "audio/webm",
      });
      const dataUrl = await readBlobAsDataURL(blob);
      const seconds = Math.max(1, Math.round(durationSeconds || 1));
      const extension = blob.type.includes("ogg") ? "ogg" : "webm";
      attachment = normalizeAttachment({
        id: crypto.randomUUID(),
        name: `Voice message (${formatVoiceDuration(seconds)}).${extension}`,
        type: blob.type || recorderMimeType || "audio/webm",
        size: blob.size,
        dataUrl,
        kind: AttachmentKind.AUDIO,
        metadata: { voiceNoteDuration: seconds },
      });
    } catch (error) {
      console.error("Failed to process recorded audio", error);
    }
  }

  const fallbackDuration = Math.max(1, Math.round(durationSeconds || 1));
  if (!attachment) {
    attachment = createVoiceNoteAttachment(fallbackDuration);
  }

  if (!attachment) {
    if (!suppressToast) {
      showToast("Couldn't send voice message");
    }
    return;
  }

  const { message } = addMessageToChat(chat.id, "", "outgoing", [attachment]);
  if (message) {
    sendOutgoingMessageToServer(chat, message, message.text, message.attachments);
    if (!suppressToast) {
      showToast("Voice message sent");
    }
  }
}

async function startVoiceRecorder() {
  if (!voiceRecorderElement || voiceRecorderIsActive) return;
  const chat = getActiveChat();
  if (!chat) {
    showToast("Select a chat to record a voice message");
    return;
  }

  if (!navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== "function") {
    showToast({
      message: "Voice messages require a microphone.",
      intent: ToastIntent.ERROR,
      duration: 4000,
    });
    return;
  }

  try {
    voiceRecorderStream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: true, noiseSuppression: true },
    });
  } catch (error) {
    console.error("Microphone permission denied", error);
    showToast({
      message: "Microphone access is required to record voice messages.",
      intent: ToastIntent.ERROR,
      duration: 4000,
    });
    return;
  }

  voiceRecorderChunks = [];
  voiceRecorderPendingSend = false;
  voiceRecorderPendingSuppressToast = false;
  voiceRecorderLastDuration = 0;

  const recorderOptions = {};
  if (
    typeof window !== "undefined" &&
    typeof window.MediaRecorder !== "undefined" &&
    typeof window.MediaRecorder.isTypeSupported === "function"
  ) {
    const preferredTypes = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/ogg;codecs=opus",
      "audio/mp4",
    ];
    const supportedType = preferredTypes.find((type) =>
      window.MediaRecorder.isTypeSupported(type)
    );
    if (supportedType) {
      recorderOptions.mimeType = supportedType;
    }
  }

  try {
    voiceRecorderMediaRecorder = Object.keys(recorderOptions).length
      ? new MediaRecorder(voiceRecorderStream, recorderOptions)
      : new MediaRecorder(voiceRecorderStream);
  } catch (error) {
    console.error("Failed to initialize voice recorder", error);
    showToast({
      message: "Recording is not supported in this browser.",
      intent: ToastIntent.ERROR,
      duration: 4000,
    });
    cleanupVoiceRecorderMedia();
    return;
  }

  voiceRecorderMediaRecorder.addEventListener("dataavailable", (event) => {
    if (event?.data && event.data.size > 0) {
      voiceRecorderChunks.push(event.data);
    }
  });
  voiceRecorderMediaRecorder.addEventListener("stop", () => {
    finalizeVoiceRecorder();
  });
  voiceRecorderMediaRecorder.addEventListener("error", (event) => {
    console.error("Voice recorder error", event);
    finalizeVoiceRecorder();
  });

  try {
    voiceRecorderMediaRecorder.start(250);
  } catch (error) {
    console.error("Failed to start recording", error);
    showToast({
      message: "Couldn't start voice recording.",
      intent: ToastIntent.ERROR,
      duration: 4000,
    });
    cleanupVoiceRecorderMedia();
    return;
  }

  voiceRecorderIsActive = true;
  voiceRecorderStartedAt = Date.now();
  if (voiceRecorderTimerElement) {
    voiceRecorderTimerElement.textContent = "0:00";
  }
  if (voiceRecorderStatusElement) {
    voiceRecorderStatusElement.textContent = "Recording voice message…";
  }
  voiceRecorderElement.hidden = false;
  voiceRecorderElement.setAttribute("aria-hidden", "false");

  if (messageInput) {
    messageInput.setAttribute("disabled", "true");
    messageInput.blur();
  }
  if (sendButton) {
    sendButton.setAttribute("disabled", "true");
  }
  if (quickVoiceButton) {
    quickVoiceButton.setAttribute("aria-pressed", "true");
  }

  updateVoiceRecorderTimer();
  if (voiceRecorderTimerId) {
    clearInterval(voiceRecorderTimerId);
  }
  voiceRecorderTimerId = window.setInterval(updateVoiceRecorderTimer, 500);
}

function stopVoiceRecorder({ send = false, suppressToast = false } = {}) {
  voiceRecorderPendingSend = send;
  voiceRecorderPendingSuppressToast = suppressToast;

  if (voiceRecorderTimerId) {
    clearInterval(voiceRecorderTimerId);
    voiceRecorderTimerId = null;
  }

  if (voiceRecorderIsActive) {
    voiceRecorderLastDuration = Math.max(
      1,
      Math.round((Date.now() - voiceRecorderStartedAt) / 1000)
    );
  }
  voiceRecorderIsActive = false;
  voiceRecorderStartedAt = 0;

  if (voiceRecorderElement) {
    voiceRecorderElement.hidden = true;
    voiceRecorderElement.setAttribute("aria-hidden", "true");
  }
  if (voiceRecorderTimerElement) {
    voiceRecorderTimerElement.textContent = "0:00";
  }
  if (voiceRecorderStatusElement) {
    voiceRecorderStatusElement.textContent = "Recording voice message…";
  }
  if (quickVoiceButton) {
    quickVoiceButton.setAttribute("aria-pressed", "false");
  }
  if (messageInput) {
    messageInput.removeAttribute("disabled");
    autoResizeTextarea();
  }
  if (sendButton) {
    sendButton.removeAttribute("disabled");
  }

  if (voiceRecorderMediaRecorder && voiceRecorderMediaRecorder.state !== "inactive") {
    try {
      voiceRecorderMediaRecorder.stop();
      return;
    } catch (error) {
      console.error("Failed to stop voice recorder", error);
    }
  }

  finalizeVoiceRecorder();
}

function resetVoiceRecorder() {
  stopVoiceRecorder({ send: false, suppressToast: true });
}

function populateChatWallpaperForm(chat) {
  if (!chatWallpaperForm) return;
  const override = chat ? getChatWallpaperOverride(chat.id) : null;
  const targetValue = override ?? "default";
  chatWallpaperOptions.forEach((input) => {
    if (input instanceof HTMLInputElement) {
      input.checked = input.value === targetValue;
    }
  });
  if (chatWallpaperUseDefaultButton) {
    chatWallpaperUseDefaultButton.disabled = !chat || !override;
  }
  if (chatWallpaperApplyButton) {
    chatWallpaperApplyButton.disabled = !chat;
  }
}

function openChatWallpaperModal() {
  if (!chatWallpaperModal || !chatWallpaperForm) return;
  const chat = getActiveChat();
  if (!chat) {
    showToast("Select a chat to customize the wallpaper");
    return;
  }
  if (!chatWallpaperModal.hidden) return;

  if (profileModal && !profileModal.hidden) {
    closeProfile({ restoreFocus: false });
  }
  if (settingsModal && !settingsModal.hidden) {
    closeSettings({ restoreFocus: false });
  }

  chatWallpaperRestoreFocusTo =
    document.activeElement instanceof HTMLElement ? document.activeElement : chatWallpaperButton;

  populateChatWallpaperForm(chat);

  chatWallpaperModal.hidden = false;
  chatWallpaperModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  const selectedInput = chatWallpaperForm.querySelector('input[name="chat-wallpaper"]:checked');
  if (selectedInput instanceof HTMLElement) {
    selectedInput.focus();
  }
}

function closeChatWallpaperModal({ restoreFocus = true } = {}) {
  if (!chatWallpaperModal || chatWallpaperModal.hidden) return;

  chatWallpaperModal.hidden = true;
  chatWallpaperModal.setAttribute("aria-hidden", "true");

  if (
    (!newContactModal || newContactModal.hidden) &&
    (!profileModal || profileModal.hidden) &&
    (!settingsModal || settingsModal.hidden)
  ) {
    document.body.classList.remove("modal-open");
  }

  const restoreTarget = chatWallpaperRestoreFocusTo;
  chatWallpaperRestoreFocusTo = null;
  if (restoreFocus && restoreTarget instanceof HTMLElement) {
    restoreTarget.focus();
  }
}

function trapChatWallpaperFocus(event) {
  if (!chatWallpaperModal || chatWallpaperModal.hidden) return;
  if (event.key !== "Tab") return;

  const focusableSelectors =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const focusable = Array.from(chatWallpaperModal.querySelectorAll(focusableSelectors)).filter(
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

function handleChatWallpaperSubmit(event) {
  event.preventDefault();
  if (!chatWallpaperForm) return;
  const chat = getActiveChat();
  if (!chat) {
    closeChatWallpaperModal({ restoreFocus: false });
    showToast("Select a chat to customize the wallpaper");
    return;
  }

  const formData = new FormData(chatWallpaperForm);
  const selection = (formData.get("chat-wallpaper") || "default").toString();
  if (selection === "default") {
    clearChatWallpaperOverride(chat.id, { sync: true });
    showToast(`Using app wallpaper for ${chat.name}`);
  } else {
    setChatWallpaperOverride(chat.id, selection, { sync: true });
    showToast(`Applied ${selection} wallpaper to this chat`);
  }
  updateWallpaperControls(activeWallpaper);
  closeChatWallpaperModal();
}

function handleChatWallpaperUseDefault(event) {
  event.preventDefault();
  const chat = getActiveChat();
  if (!chat) {
    showToast("Select a chat to customize the wallpaper");
    return;
  }
  if (!getChatWallpaperOverride(chat.id)) {
    showToast("This chat already uses the app wallpaper");
    closeChatWallpaperModal();
    return;
  }
  clearChatWallpaperOverride(chat.id, { sync: true });
  updateWallpaperControls(activeWallpaper);
  showToast(`Using app wallpaper for ${chat.name}`);
  closeChatWallpaperModal();
}

async function startCall(callType) {
  if (
    !window.RTCPeerConnection ||
    !navigator.mediaDevices ||
    typeof navigator.mediaDevices.getUserMedia !== "function"
  ) {
    showToast("Calling requires a browser that supports WebRTC.");
    return;
  }

  const chat = getActiveChat();
  if (!chat) {
    showToast("Select a chat to start a call");
    return;
  }

  if (chat.type === ChatType.GROUP) {
    showToast("Group calling is not available yet.");
    return;
  }

  const capabilities = chat.capabilities ?? {};
  if (callType === CallType.AUDIO && capabilities.audio === false) {
    showToast("Audio calling unavailable for this chat");
    return;
  }
  if (callType === CallType.VIDEO && capabilities.video === false) {
    showToast("Video calling unavailable for this chat");
    return;
  }

  const socket = realtimeState.socket;
  if (!socket || !socket.connected || !realtimeState.isAuthenticated) {
    showToast("Connect to the server before starting a call.");
    return;
  }

  const remoteAccountIds = normalizeParticipantAccountIds(
    getChatParticipantAccountIds(chat)
  );

  openCallOverlay({
    chat,
    type: callType,
    direction: "outgoing",
    remoteAccountIds,
  });

  setActiveCallState(CallState.INITIATING);

  try {
    const constraints = {
      audio: true,
      video: callType === CallType.VIDEO,
    };
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    if (!activeCall || activeCall.chatId !== chat.id) {
      stream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (_error) {
          // Ignore errors from stopping preview tracks.
        }
      });
      return;
    }

    attachCallLocalStream(stream);

    const peerConnection = createPeerConnectionForActiveCall();
    if (!peerConnection) {
      stream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (_error) {
          // Ignore errors from stopping preview tracks.
        }
      });
      endActiveCall({ reason: "Call unavailable", suppressToast: true, signalRemote: false });
      return;
    }

    activeCall.peerConnection = peerConnection;

    stream.getTracks().forEach((track) => {
      try {
        peerConnection.addTrack(track, stream);
      } catch (error) {
        console.error("Failed to add local track to call", error);
      }
    });

    const offer = await peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: callType === CallType.VIDEO,
    });
    await peerConnection.setLocalDescription(offer);
    activeCall.hasLocalDescription = true;

    const payload = {
      chat_id: chat.id,
      call_type: callType,
      offer: { type: offer.type, sdp: offer.sdp },
    };
    if (remoteAccountIds.length) {
      payload.recipient_ids = remoteAccountIds;
    }

    const emitted = sendCallSignal("call:offer", payload);
    if (!emitted) {
      showToast("Unable to reach the other participant.");
      endActiveCall({ reason: "Call unavailable", suppressToast: true, signalRemote: false });
      return;
    }

    setActiveCallState(CallState.INITIATING);
  } catch (error) {
    console.error("Failed to start call", error);
    const errorMessage =
      error && typeof error.name === "string" && error.name === "NotAllowedError"
        ? "Microphone or camera permission is required to start the call."
        : "Unable to start the call.";
    showToast(errorMessage);
    endActiveCall({ reason: "Call unavailable", suppressToast: true, signalRemote: false });
  }
}

function setActiveCallState(nextState) {
  if (!activeCall) {
    return;
  }

  const validStates = new Set(Object.values(CallState));
  const resolvedState = validStates.has(nextState) ? nextState : CallState.IDLE;

  if (activeCall.state === resolvedState) {
    updateCallOverlayState();
    return;
  }

  activeCall.state = resolvedState;
  updateCallOverlayState();
}

function updateCallOverlayTimer() {
  if (!activeCall || !callOverlayStatusElement) {
    return;
  }

  if (!activeCall.startedAt) {
    updateCallOverlayState();
    return;
  }

  const elapsed = Math.max(0, Math.round((Date.now() - activeCall.startedAt) / 1000));
  callOverlayStatusElement.textContent = `Call in progress · ${formatVoiceDuration(elapsed)}`;
}

function updateCallOverlayState() {
  if (!callOverlayElement) {
    return;
  }

  if (!activeCall) {
    callOverlayElement.dataset.callState = CallState.IDLE;
    if (callOverlayControlsElement) {
      callOverlayControlsElement.hidden = true;
      callOverlayControlsElement.setAttribute("aria-hidden", "true");
    }
    if (callOverlayIncomingControlsElement) {
      callOverlayIncomingControlsElement.hidden = true;
      callOverlayIncomingControlsElement.setAttribute("aria-hidden", "true");
    }
    callOverlayControlButtons.forEach((button) => {
      button.disabled = true;
      button.setAttribute("aria-disabled", "true");
      if (button.dataset.callControl === "mute" || button.dataset.callControl === "speaker") {
        button.setAttribute("aria-pressed", "false");
      }
    });
    updateCallMediaVisibility();
    return;
  }

  const state = activeCall.state ?? CallState.IDLE;
  callOverlayElement.dataset.callState = state;

  const typeLabel = CALL_TYPE_LABELS[activeCall.type] ?? "Call";
  const primaryName =
    activeCall.primaryParticipantName ||
    activeCall.remoteUsername ||
    typeLabel;

  if (!activeCall.startedAt && callOverlayStatusElement) {
    let statusText = "Connecting…";
    if (state === CallState.INITIATING) {
      statusText = `Calling ${primaryName}…`;
    } else if (state === CallState.RINGING) {
      statusText =
        activeCall.direction === "incoming"
          ? `${primaryName} is calling…`
          : `Ringing ${primaryName}…`;
    } else if (state === CallState.ENDED) {
      statusText = `${typeLabel} ended`;
    }
    callOverlayStatusElement.textContent = statusText;
  }

  if (callOverlayControlsElement) {
    const showControls = !(activeCall.direction === "incoming" && state === CallState.RINGING);
    callOverlayControlsElement.hidden = !showControls;
    callOverlayControlsElement.setAttribute("aria-hidden", showControls ? "false" : "true");
  }

  if (callOverlayIncomingControlsElement) {
    const showIncoming = activeCall.direction === "incoming" && state === CallState.RINGING;
    callOverlayIncomingControlsElement.hidden = !showIncoming;
    callOverlayIncomingControlsElement.setAttribute("aria-hidden", showIncoming ? "false" : "true");
  }

  callOverlayControlButtons.forEach((button) => {
    const action = button.dataset.callControl;
    if (action === "mute" || action === "speaker") {
      const enable = state === CallState.CONNECTED;
      button.disabled = !enable;
      button.setAttribute("aria-disabled", enable ? "false" : "true");
      if (!enable) {
        button.setAttribute("aria-pressed", "false");
      }
    } else if (action === "end") {
      const canEnd = state !== CallState.ENDED;
      button.disabled = !canEnd;
      button.setAttribute("aria-disabled", canEnd ? "false" : "true");
    }
  });

  if (callOverlayLocalVideoLabel) {
    callOverlayLocalVideoLabel.textContent = getSelfParticipantName() || "You";
  }
  if (callOverlayRemoteVideoLabel) {
    callOverlayRemoteVideoLabel.textContent = primaryName || typeLabel;
  }

  updateCallMediaVisibility();
}

function updateCallMediaVisibility() {
  const hasActive = Boolean(activeCall);
  const showVideo = hasActive && activeCall.type === CallType.VIDEO;

  if (callOverlayMediaElement) {
    callOverlayMediaElement.hidden = !showVideo;
  }

  if (callOverlayLocalVideoWrapper) {
    const shouldShowLocal = showVideo && Boolean(activeCall?.localStream);
    callOverlayLocalVideoWrapper.hidden = !shouldShowLocal;
  }

  if (callOverlayRemoteVideoWrapper) {
    const hasRemote = showVideo && Boolean(activeCall?.remoteStream);
    callOverlayRemoteVideoWrapper.dataset.empty = hasRemote ? "false" : "true";
  }
}

function attachCallLocalStream(stream) {
  if (!activeCall) {
    return;
  }

  activeCall.localStream = stream;

  if (callOverlayLocalVideoElement) {
    callOverlayLocalVideoElement.srcObject = stream;
    callOverlayLocalVideoElement.muted = true;
    callOverlayLocalVideoElement
      .play()
      .catch((_error) => {
        // Autoplay restrictions are expected in some environments.
      });
  }

  updateCallMediaVisibility();
}

function attachCallRemoteStream(stream) {
  if (!activeCall) {
    return;
  }

  activeCall.remoteStream = stream;

  if (callOverlayRemoteVideoElement) {
    callOverlayRemoteVideoElement.srcObject = stream;
    callOverlayRemoteVideoElement.muted = false;
    callOverlayRemoteVideoElement
      .play()
      .catch((_error) => {
        // Autoplay restrictions are expected in some environments.
      });
  }

  if (callOverlayRemoteAudioElement) {
    callOverlayRemoteAudioElement.srcObject = stream;
    callOverlayRemoteAudioElement.muted = false;
    callOverlayRemoteAudioElement.volume = 0.85;
    callOverlayRemoteAudioElement
      .play()
      .catch((_error) => {
        // Autoplay restrictions are expected in some environments.
      });
  }

  updateCallMediaVisibility();
}

function cleanupActiveCallResources() {
  if (!activeCall) {
    return;
  }

  if (callDisconnectWatcher) {
    clearTimeout(callDisconnectWatcher);
    callDisconnectWatcher = null;
  }

  if (activeCall.peerConnection) {
    try {
      activeCall.peerConnection.ontrack = null;
      activeCall.peerConnection.onicecandidate = null;
      activeCall.peerConnection.onconnectionstatechange = null;
      activeCall.peerConnection.oniceconnectionstatechange = null;
      activeCall.peerConnection.close();
    } catch (error) {
      console.error("Error closing call peer connection", error);
    }
    activeCall.peerConnection = null;
  }

  const stopTracks = (stream) => {
    if (!stream) return;
    stream.getTracks().forEach((track) => {
      try {
        track.stop();
      } catch (_error) {
        // Ignore errors when stopping tracks.
      }
    });
  };

  stopTracks(activeCall.localStream);
  stopTracks(activeCall.remoteStream);

  activeCall.localStream = null;
  activeCall.remoteStream = null;

  if (callOverlayLocalVideoElement) {
    try {
      callOverlayLocalVideoElement.pause();
    } catch (_error) {
      // Ignore pause errors.
    }
    callOverlayLocalVideoElement.srcObject = null;
  }

  if (callOverlayRemoteVideoElement) {
    try {
      callOverlayRemoteVideoElement.pause();
    } catch (_error) {
      // Ignore pause errors.
    }
    callOverlayRemoteVideoElement.srcObject = null;
  }

  if (callOverlayRemoteAudioElement) {
    try {
      callOverlayRemoteAudioElement.pause();
    } catch (_error) {
      // Ignore pause errors.
    }
    callOverlayRemoteAudioElement.srcObject = null;
    callOverlayRemoteAudioElement.volume = 0.85;
  }

  activeCall.pendingCandidates = [];
  activeCall.hasLocalDescription = false;
  activeCall.hasRemoteDescription = false;

  updateCallMediaVisibility();
}

function createPeerConnectionForActiveCall() {
  if (!activeCall) {
    return null;
  }

  let connection;
  try {
    connection = new RTCPeerConnection(DEFAULT_CALL_RTC_CONFIGURATION);
  } catch (error) {
    console.error("Failed to create peer connection", error);
    showToast("Calling is not available in this browser.");
    return null;
  }

  connection.onicecandidate = (event) => {
    if (!event.candidate || !activeCall || activeCall.peerConnection !== connection) {
      return;
    }

    const candidateInit =
      typeof event.candidate.toJSON === "function"
        ? event.candidate.toJSON()
        : {
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid ?? null,
            sdpMLineIndex: event.candidate.sdpMLineIndex ?? null,
          };

    const payload = {
      chat_id: activeCall.chatId,
      candidate: candidateInit,
    };
    if (Array.isArray(activeCall.remoteAccountIds) && activeCall.remoteAccountIds.length) {
      payload.recipient_ids = activeCall.remoteAccountIds;
    }

    sendCallSignal("call:candidate", payload);
  };

  connection.ontrack = (event) => {
    if (!event || !event.streams || !event.streams.length) {
      return;
    }
    const [stream] = event.streams;
    if (stream) {
      attachCallRemoteStream(stream);
    }
  };

  connection.onconnectionstatechange = () => {
    if (!activeCall || activeCall.peerConnection !== connection) {
      return;
    }
    switch (connection.connectionState) {
      case "connected": {
        if (callDisconnectWatcher) {
          clearTimeout(callDisconnectWatcher);
          callDisconnectWatcher = null;
        }
        markActiveCallConnected();
        break;
      }
      case "disconnected": {
        if (callDisconnectWatcher) {
          clearTimeout(callDisconnectWatcher);
        }
        callDisconnectWatcher = window.setTimeout(() => {
          if (
            activeCall &&
            activeCall.peerConnection === connection &&
            connection.connectionState === "disconnected"
          ) {
            endActiveCall({ reason: "Call disconnected", suppressToast: false, signalRemote: false });
          }
        }, 2000);
        break;
      }
      case "failed": {
        endActiveCall({ reason: "Call connection failed", suppressToast: false, signalRemote: false });
        break;
      }
      default:
        break;
    }
  };

  connection.oniceconnectionstatechange = () => {
    if (!activeCall || activeCall.peerConnection !== connection) {
      return;
    }
    if (connection.iceConnectionState === "failed") {
      endActiveCall({ reason: "Call connection failed", suppressToast: false, signalRemote: false });
    }
  };

  return connection;
}

function flushPendingCallCandidates() {
  if (!activeCall || !activeCall.peerConnection || !Array.isArray(activeCall.pendingCandidates)) {
    return;
  }

  const queue = activeCall.pendingCandidates.splice(0);
  queue.forEach((candidateInit) => {
    if (!candidateInit || !candidateInit.candidate) {
      return;
    }
    try {
      activeCall.peerConnection.addIceCandidate(new RTCIceCandidate(candidateInit));
    } catch (error) {
      console.error("Failed to apply call candidate", error);
    }
  });
}

function markActiveCallConnected() {
  if (!activeCall) {
    return;
  }

  if (!activeCall.startedAt) {
    activeCall.startedAt = Date.now();
  }

  setActiveCallState(CallState.CONNECTED);
  updateCallOverlayTimer();
  if (callTimerInterval) {
    clearInterval(callTimerInterval);
  }
  callTimerInterval = window.setInterval(updateCallOverlayTimer, 1000);
}

function sendCallSignal(eventName, payload) {
  if (!eventName || !payload) {
    return false;
  }
  const socket = realtimeState.socket;
  if (!socket || !socket.connected || !realtimeState.isAuthenticated) {
    return false;
  }
  try {
    socket.emit(eventName, payload);
    return true;
  } catch (error) {
    console.error("Failed to send call signal", error);
    return false;
  }
}

async function acceptIncomingCall() {
  if (
    !activeCall ||
    activeCall.direction !== "incoming" ||
    !window.RTCPeerConnection ||
    !navigator.mediaDevices ||
    typeof navigator.mediaDevices.getUserMedia !== "function"
  ) {
    if (!activeCall) {
      return;
    }
    showToast("Calling requires a browser that supports WebRTC.");
    return;
  }

  const chat = getChatById(activeCall.chatId);
  if (!chat) {
    showToast("Chat no longer available.");
    declineIncomingCall({ notifyRemote: true });
    return;
  }

  const offer = activeCall.offer;
  if (!offer || typeof offer.sdp !== "string") {
    showToast("Call offer is no longer available.");
    declineIncomingCall({ notifyRemote: true });
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: activeCall.type === CallType.VIDEO,
    });
    if (!activeCall || activeCall.direction !== "incoming") {
      stream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (_error) {}
      });
      return;
    }

    attachCallLocalStream(stream);

    const peerConnection = createPeerConnectionForActiveCall();
    if (!peerConnection) {
      stream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (_error) {}
      });
      declineIncomingCall({ notifyRemote: true });
      return;
    }

    activeCall.peerConnection = peerConnection;

    stream.getTracks().forEach((track) => {
      try {
        peerConnection.addTrack(track, stream);
      } catch (error) {
        console.error("Failed to add local track to call", error);
      }
    });

    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    activeCall.hasRemoteDescription = true;
    flushPendingCallCandidates();

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    activeCall.hasLocalDescription = true;

    const payload = {
      chat_id: activeCall.chatId,
      answer: { type: answer.type, sdp: answer.sdp },
    };
    if (Array.isArray(activeCall.remoteAccountIds) && activeCall.remoteAccountIds.length) {
      payload.recipient_ids = activeCall.remoteAccountIds;
    }
    sendCallSignal("call:answer", payload);
    setActiveCallState(CallState.CONNECTING);
  } catch (error) {
    console.error("Failed to accept call", error);
    showToast("Unable to join the call.");
    endActiveCall({ reason: "Call unavailable", suppressToast: true, signalRemote: true });
  }
}

function declineIncomingCall({ notifyRemote = true, reason = "Call declined" } = {}) {
  if (!activeCall) {
    closeCallOverlay({ restoreFocus: true });
    return;
  }

  if (notifyRemote && activeCall.chatId) {
    const payload = { chat_id: activeCall.chatId };
    if (reason) {
      payload.reason = reason;
    }
    if (Array.isArray(activeCall.remoteAccountIds) && activeCall.remoteAccountIds.length) {
      payload.recipient_ids = activeCall.remoteAccountIds;
    }
    sendCallSignal("call:decline", payload);
  }

  closeCallOverlay({ restoreFocus: true });
}

function getParticipantInitials(name) {
  if (typeof name !== "string") {
    return "??";
  }
  const trimmed = name.trim();
  if (!trimmed) {
    return "??";
  }
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (!parts.length) {
    return trimmed.slice(0, 2).toUpperCase();
  }
  if (parts.length === 1) {
    const word = parts[0];
    const first = word.charAt(0);
    const second = word.charAt(1);
    const initials = `${first}${second}`.trim().toUpperCase();
    return initials || word.slice(0, 2).toUpperCase();
  }
  const first = parts[0].charAt(0);
  const last = parts[parts.length - 1].charAt(0);
  const initials = `${first}${last}`.trim().toUpperCase();
  return initials || trimmed.slice(0, 2).toUpperCase();
}

function renderCallOverlayParticipants(participants) {
  if (!callOverlayParticipantsElement) return;

  callOverlayParticipantsElement.innerHTML = "";
  callOverlayParticipantsElement.removeAttribute("aria-label");

  const normalized = Array.isArray(participants)
    ? participants
        .map((value) => (typeof value === "string" ? value.trim() : ""))
        .filter(Boolean)
    : [];

  if (!normalized.length) {
    const empty = document.createElement("div");
    empty.className = "call-overlay__participants-empty";
    empty.textContent = "No participants available";
    callOverlayParticipantsElement.appendChild(empty);
    callOverlayParticipantsElement.setAttribute("aria-hidden", "false");
    return;
  }

  callOverlayParticipantsElement.setAttribute(
    "aria-label",
    `${normalized.length} participant${normalized.length === 1 ? "" : "s"} in call`
  );
  callOverlayParticipantsElement.setAttribute("aria-hidden", "false");

  normalized.forEach((name) => {
    const item = document.createElement("div");
    item.className = "call-overlay__participant";
    item.setAttribute("role", "listitem");

    const avatar = document.createElement("div");
    avatar.className = "call-overlay__participant-avatar";
    avatar.textContent = getParticipantInitials(name);

    const label = document.createElement("div");
    label.className = "call-overlay__participant-name";
    label.textContent = name;

    item.append(avatar, label);
    callOverlayParticipantsElement.appendChild(item);
  });
}

function isCallOverlayElementFocusable(element) {
  if (!(element instanceof HTMLElement)) {
    return false;
  }
  if (element.hidden) {
    return false;
  }
  if (element.closest("[hidden]")) {
    return false;
  }
  if (element.getAttribute("aria-hidden") === "true") {
    return false;
  }
  if (element.hasAttribute("disabled")) {
    return false;
  }
  if (element.getAttribute("aria-disabled") === "true") {
    return false;
  }
  return true;
}

function getCallOverlayFocusableElements() {
  if (!callOverlayCardElement) {
    return [];
  }

  const focusableSelectors =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  return Array.from(callOverlayCardElement.querySelectorAll(focusableSelectors)).filter(
    (element) => isCallOverlayElementFocusable(element)
  );
}

function trapCallOverlayFocus(event) {
  // Keep keyboard focus within the call dialog while it's open.
  if (!callOverlayElement || callOverlayElement.hidden) {
    return;
  }
  if (event.key !== "Tab") {
    return;
  }

  const focusable = getCallOverlayFocusableElements();
  if (!focusable.length) {
    event.preventDefault();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const activeElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;

  if (event.shiftKey) {
    if (!activeElement || !callOverlayCardElement?.contains(activeElement) || activeElement === first) {
      event.preventDefault();
      last.focus();
    }
    return;
  }

  if (!activeElement || !callOverlayCardElement?.contains(activeElement) || activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function openCallOverlay({
  chat,
  type,
  direction = "outgoing",
  offer = null,
  remoteUserId = null,
  remoteUsername = null,
  remoteAccountIds = [],
} = {}) {
  if (!callOverlayElement) return;

  if (callTimerInterval) {
    clearInterval(callTimerInterval);
    callTimerInterval = null;
  }
  if (callDisconnectWatcher) {
    clearTimeout(callDisconnectWatcher);
    callDisconnectWatcher = null;
  }

  const participants = getCallParticipantNames(chat);
  const typeLabel = CALL_TYPE_LABELS[type] ?? "Call";
  const participantCountLabel = participants.length
    ? ` · ${participants.length} participant${participants.length === 1 ? "" : "s"}`
    : "";
  const chatName =
    typeof chat?.name === "string" && chat.name.trim()
      ? chat.name.trim()
      : participants[0] ?? typeLabel;

  const normalizedRemoteIds = normalizeParticipantAccountIds(remoteAccountIds);
  if (remoteUserId) {
    const normalizedRemote = normalizeAccountId(remoteUserId);
    if (normalizedRemote && !normalizedRemoteIds.includes(normalizedRemote)) {
      normalizedRemoteIds.push(normalizedRemote);
    }
  }

  const primaryName =
    remoteUsername ||
    getPrimaryCallParticipantName(chat) ||
    participants[1] ||
    participants[0] ||
    chatName;

  activeCall = {
    chatId: chat?.id ?? null,
    type,
    participants,
    startedAt: null,
    state: direction === "incoming" ? CallState.RINGING : CallState.INITIATING,
    direction,
    offer: offer && typeof offer === "object" ? offer : null,
    remoteUserId: remoteUserId ?? null,
    remoteUsername: remoteUsername ?? null,
    remoteAccountIds: normalizedRemoteIds,
    pendingCandidates: [],
    peerConnection: null,
    localStream: null,
    remoteStream: null,
    hasLocalDescription: false,
    hasRemoteDescription: false,
    primaryParticipantName: primaryName,
  };

  callOverlayControlButtons.forEach((button) => {
    const action = button.dataset.callControl;
    if (action === "mute" || action === "speaker") {
      button.setAttribute("aria-pressed", "false");
    }
  });

  if (callOverlayTypeElement) {
    callOverlayTypeElement.textContent = `${typeLabel}${participantCountLabel}`;
  }
  if (callOverlayNameElement) {
    callOverlayNameElement.textContent = chatName;
  }

  renderCallOverlayParticipants(participants);

  callOverlayRestoreFocusTo =
    document.activeElement instanceof HTMLElement ? document.activeElement : null;

  callOverlayElement.hidden = false;
  callOverlayElement.setAttribute("aria-hidden", "false");
  callOverlayElement.dataset.callType = type;
  callOverlayElement.dataset.callState = activeCall.state;

  if (callOverlayRemoteAudioElement) {
    callOverlayRemoteAudioElement.volume = 0.85;
    callOverlayRemoteAudioElement.muted = false;
  }

  if (typeof document !== "undefined") {
    // Prevent the underlying layout from scrolling while the call overlay is active.
    document.body.classList.add("modal-open");
  }

  updateCallOverlayState();

  let focusTarget = null;
  if (direction === "incoming" && isCallOverlayElementFocusable(callOverlayAcceptButton)) {
    focusTarget = callOverlayAcceptButton;
  } else {
    const endButton = callOverlayControlButtons.find(
      (button) => button.dataset.callControl === "end"
    );
    if (isCallOverlayElementFocusable(endButton)) {
      focusTarget = endButton;
    }
  }

  if (!focusTarget) {
    const focusableElements = getCallOverlayFocusableElements();
    if (focusableElements.length) {
      focusTarget = focusableElements[0];
    }
  }

  if (!focusTarget && isCallOverlayElementFocusable(callOverlayCloseButton)) {
    focusTarget = callOverlayCloseButton;
  }

  if (focusTarget) {
    focusTarget.focus();
  }
}

function closeCallOverlay({ restoreFocus = true, showToastMessage } = {}) {
  if (!callOverlayElement || callOverlayElement.hidden) return;

  if (callTimerInterval) {
    clearInterval(callTimerInterval);
    callTimerInterval = null;
  }
  if (callDisconnectWatcher) {
    clearTimeout(callDisconnectWatcher);
    callDisconnectWatcher = null;
  }

  cleanupActiveCallResources();

  callOverlayElement.hidden = true;
  callOverlayElement.setAttribute("aria-hidden", "true");
  callOverlayElement.dataset.callState = CallState.IDLE;
  callOverlayElement.dataset.callType = "";

  if (callOverlayControlsElement) {
    callOverlayControlsElement.hidden = true;
    callOverlayControlsElement.setAttribute("aria-hidden", "true");
  }
  if (callOverlayIncomingControlsElement) {
    callOverlayIncomingControlsElement.hidden = true;
    callOverlayIncomingControlsElement.setAttribute("aria-hidden", "true");
  }

  callOverlayControlButtons.forEach((button) => {
    button.disabled = true;
    button.setAttribute("aria-disabled", "true");
    const action = button.dataset.callControl;
    if (action === "mute" || action === "speaker") {
      button.setAttribute("aria-pressed", "false");
    }
  });

  if (callOverlayParticipantsElement) {
    callOverlayParticipantsElement.innerHTML = "";
    callOverlayParticipantsElement.removeAttribute("aria-label");
    callOverlayParticipantsElement.removeAttribute("aria-hidden");
  }

  if (callOverlayMediaElement) {
    callOverlayMediaElement.hidden = true;
  }
  if (callOverlayLocalVideoWrapper) {
    callOverlayLocalVideoWrapper.hidden = true;
  }
  if (callOverlayRemoteVideoWrapper) {
    callOverlayRemoteVideoWrapper.dataset.empty = "true";
  }

  if (
    (!newContactModal || newContactModal.hidden) &&
    (!profileModal || profileModal.hidden) &&
    (!settingsModal || settingsModal.hidden) &&
    (!chatWallpaperModal || chatWallpaperModal.hidden) &&
    (!manageParticipantsModal || manageParticipantsModal.hidden)
  ) {
    document.body.classList.remove("modal-open");
  }

  const restoreTarget = callOverlayRestoreFocusTo;
  callOverlayRestoreFocusTo = null;
  activeCall = null;

  if (showToastMessage) {
    showToast(showToastMessage);
  }

  if (restoreFocus && restoreTarget instanceof HTMLElement) {
    restoreTarget.focus();
  }
}

function endActiveCall({ reason = "Call ended", suppressToast = false, signalRemote = false } = {}) {
  if (!activeCall) return;

  if (signalRemote && activeCall.chatId) {
    const payload = { chat_id: activeCall.chatId };
    if (reason) {
      payload.reason = reason;
    }
    if (Array.isArray(activeCall.remoteAccountIds) && activeCall.remoteAccountIds.length) {
      payload.recipient_ids = activeCall.remoteAccountIds;
    }
    sendCallSignal("call:hangup", payload);
  }

  closeCallOverlay({
    restoreFocus: true,
    showToastMessage: suppressToast ? undefined : reason,
  });
}

function handleCallControl(event) {
  const button = event.currentTarget;
  if (!(button instanceof HTMLElement)) return;
  const action = button.dataset.callControl;

  if (!activeCall) {
    showToast("No active call");
    return;
  }

  switch (action) {
    case "mute": {
      const pressed = button.getAttribute("aria-pressed") === "true";
      const next = !pressed;
      button.setAttribute("aria-pressed", next ? "true" : "false");
      const tracks = activeCall.localStream?.getAudioTracks?.() ?? [];
      tracks.forEach((track) => {
        track.enabled = !next;
      });
      showToast(next ? "Microphone muted" : "Microphone unmuted");
      break;
    }
    case "speaker": {
      const pressed = button.getAttribute("aria-pressed") === "true";
      const next = !pressed;
      button.setAttribute("aria-pressed", next ? "true" : "false");
      const volume = next ? 1 : 0.75;
      if (callOverlayRemoteAudioElement) {
        callOverlayRemoteAudioElement.volume = volume;
      }
      if (callOverlayRemoteVideoElement) {
        callOverlayRemoteVideoElement.volume = volume;
      }
      showToast(next ? "Speakerphone on" : "Speakerphone off");
      break;
    }
    case "end": {
      endActiveCall({ reason: "Call ended", signalRemote: true });
      break;
    }
    default:
      break;
  }
}

function handleCallOverlayClose() {
  if (!activeCall) {
    closeCallOverlay({ restoreFocus: true });
    return;
  }

  if (activeCall.direction === "incoming" && activeCall.state === CallState.RINGING) {
    declineIncomingCall({ notifyRemote: true });
    return;
  }

  endActiveCall({ reason: "Call ended", signalRemote: true });
}





function getActiveNewContactMethod() {
  const checked = newContactMethodInputs.find((input) => input.checked);
  const value = checked?.value ?? ContactMethod.NICKNAME;
  return Object.values(ContactMethod).includes(value) ? value : ContactMethod.NICKNAME;
}

function setActiveContactMethod(method, { focus = false } = {}) {
  if (!newContactForm) return;
  const targetMethod = Object.values(ContactMethod).includes(method)
    ? method
    : ContactMethod.NICKNAME;

  newContactMethodInputs.forEach((input) => {
    input.checked = input.value === targetMethod;
  });

  newContactFieldGroups.forEach((group) => {
    const shouldShow = group.dataset.contactFields === targetMethod;
    group.hidden = !shouldShow;
    const controls = Array.from(group.querySelectorAll("input, textarea"));
    controls.forEach((control) => {
      if (!(control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement)) {
        return;
      }
      if (shouldShow) {
        control.removeAttribute("disabled");
      } else {
        control.setAttribute("disabled", "true");
      }
    });
  });

  if (focus) {
    const activeGroup = newContactFieldGroups.find(
      (group) => group.dataset.contactFields === targetMethod
    );
    const focusTarget = activeGroup
      ? activeGroup.querySelector(
          "input:not([type=\"radio\"]):not([disabled]), textarea:not([disabled])"
        )
      : null;
    if (focusTarget instanceof HTMLElement) {
      focusTarget.focus();
    }
  }

  updateNewContactPreview();
  refreshContactLookupForMethod();
}

function resetNewContactForm() {
  if (!newContactForm) return;
  newContactForm.reset();
  setActiveContactMethod(getActiveNewContactMethod());
  resetContactLookup();
}

// When a user selects a nickname or email that matches an existing account we surface
// via the lookup API, enrich the contact with the persisted account identifier so
// outbound messages can be routed to the correct user sockets.
function findAccountMatchForContact(contact) {
  if (!contact || typeof contact !== "object") {
    return null;
  }
  const results = Array.isArray(contactLookupState?.results) ? contactLookupState.results : [];
  if (!results.length) {
    return null;
  }

  const candidateKeys = new Set();
  const addCandidate = (value) => {
    if (typeof value !== "string") return;
    const trimmed = value.trim().toLowerCase();
    if (trimmed) {
      candidateKeys.add(trimmed);
    }
  };

  addCandidate(contact.nickname);
  addCandidate(contact.displayName);
  addCandidate(contact.email);

  if (!candidateKeys.size) {
    return null;
  }

  for (const entry of results) {
    if (!entry) continue;
    const username =
      typeof entry.username === "string" && entry.username.trim() ? entry.username.trim() : "";
    const normalizedUsername = username.toLowerCase();
    if (!username || !candidateKeys.has(normalizedUsername)) {
      continue;
    }
    const accountId = normalizeAccountId(entry.id ?? entry.userId ?? null);
    if (!accountId) {
      continue;
    }
    return { accountId, username };
  }

  return null;
}

function applyAccountMatchMetadata(contact) {
  const match = findAccountMatchForContact(contact);
  if (!match) {
    return;
  }

  contact.accountId = match.accountId;
  contact.username = match.username;
  if (typeof contact.lookupKey !== "string" || !contact.lookupKey.trim()) {
    contact.lookupKey = `account:${match.accountId}`;
  }
  if (typeof contact.id !== "string" || !contact.id.trim()) {
    contact.id = contact.lookupKey;
  }
  if (typeof contact.displayName !== "string" || !contact.displayName.trim()) {
    contact.displayName = match.username;
  }
  if (typeof contact.nickname !== "string" || !contact.nickname.trim()) {
    contact.nickname = match.username;
  }
}

function collectNewContactData({ strict = false, showErrors = false } = {}) {
  if (!newContactForm) return null;
  const method = getActiveNewContactMethod();
  if (method === ContactMethod.GROUP) {
    const name = newGroupNameInput?.value.trim() ?? "";
    const rawParticipants = newGroupParticipantsInput?.value ?? "";
    const description = newGroupDescriptionInput?.value.trim() ?? "";
    const participants = rawParticipants
      .split(/[\n,]/)
      .map((value) => value.trim())
      .filter(Boolean);

    if (!name && strict) {
      if (showErrors) {
        showToast("Enter a group name");
        newGroupNameInput?.focus();
      }
      return null;
    }

    if (participants.length < 2 && strict) {
      if (showErrors) {
        showToast("Add at least two participants");
        newGroupParticipantsInput?.focus();
      }
      return null;
    }

    return {
      method,
      displayName: name || "New group",
      participants,
      description,
    };
  }
  const contact = { method };

  switch (method) {
    case ContactMethod.NICKNAME: {
      const nickname = newContactNicknameInput?.value.trim() ?? "";
      if (!nickname && strict) {
        if (showErrors) {
          showToast("Enter a nickname");
          newContactNicknameInput?.focus();
        }
        return null;
      }
      contact.nickname = nickname;
      contact.displayName = nickname;
      break;
    }
    case ContactMethod.PHONE: {
      const rawPhone = newContactPhoneInput?.value ?? "";
      const normalizedPhone = normalizePhoneNumber(rawPhone);
      if (!normalizedPhone && strict) {
        if (showErrors) {
          showToast("Enter a valid phone number");
          newContactPhoneInput?.focus();
        }
        return null;
      }
      if (normalizedPhone) {
        contact.phone = normalizedPhone;
        contact.phoneDisplay =
          formatPhoneNumberForDisplay(normalizedPhone) || formatPhoneNumberForDisplay(rawPhone);
      }
      const phoneName = newContactPhoneNameInput?.value.trim() ?? "";
      contact.displayName =
        phoneName ||
        contact.phoneDisplay ||
        (typeof rawPhone === "string" ? rawPhone.trim() : "");
      break;
    }
    case ContactMethod.EMAIL: {
      const rawEmail = newContactEmailInput?.value.trim() ?? "";
      if ((!rawEmail || !isValidEmail(rawEmail)) && strict) {
        if (showErrors) {
          showToast("Enter a valid email address");
          newContactEmailInput?.focus();
        }
        return null;
      }
      if (rawEmail && isValidEmail(rawEmail)) {
        contact.email = rawEmail.toLowerCase();
      }
      const emailName = newContactEmailNameInput?.value.trim() ?? "";
      contact.displayName =
        emailName ||
        (contact.email ? deriveNameFromEmail(contact.email) : "") ||
        rawEmail;
      break;
    }
    case ContactMethod.CONTACT_CARD: {
      const rawDetails = newContactCardDetailsInput?.value ?? "";
      const manualName = newContactCardNameInput?.value.trim() ?? "";
      if (!rawDetails.trim() && strict) {
        if (showErrors) {
          showToast("Paste contact details to continue");
          newContactCardDetailsInput?.focus();
        }
        return null;
      }
      const parsed = parseSharedContactDetails(rawDetails);
      contact.name = parsed.name;
      contact.nickname = parsed.nickname;
      contact.phone = parsed.phone;
      contact.phoneDisplay = parsed.phoneDisplay;
      contact.email = parsed.email;
      contact.notes = parsed.notes;
      contact.source = parsed.source || rawDetails;
      contact.displayName =
        manualName ||
        parsed.name ||
        parsed.nickname ||
        (parsed.email ? deriveNameFromEmail(parsed.email) : "") ||
        parsed.phoneDisplay ||
        parsed.phone ||
        rawDetails.trim().split(/\s+/).slice(0, 3).join(" ");
      break;
    }
    default:
      return null;
  }

  if (typeof contact.notes === "string") {
    contact.notes = contact.notes.trim();
  }

  applyAccountMatchMetadata(contact);

  const normalized = normalizeContact(contact);
  if (!normalized) {
    if (strict && showErrors) {
      showToast("Add valid contact details");
    }
    return null;
  }

  return normalized;
}

function getContactMethodLabel(method) {
  return ContactMethodLabels[method] ?? method;
}

function updateNewContactPreview() {
  if (!newContactPreviewElement) return;
  const contact = collectNewContactData({ strict: false, showErrors: false });
  if (!contact) {
    newContactPreviewElement.textContent = "Provide details to preview the chat.";
    return;
  }

  if (contact.method === ContactMethod.GROUP) {
    const displayName = contact.displayName || "New group";
    const participants = Array.isArray(contact.participants)
      ? contact.participants
      : [];
    const details = [];
    const sanitizedDescription = sanitizeStatus(contact.description ?? "");
    if (sanitizedDescription) {
      details.push(sanitizedDescription);
    }
    if (participants.length) {
      details.push(
        `${participants.length} participant${participants.length === 1 ? "" : "s"}`
      );
    }
    const description =
      details.join(" • ") || "Create a space for everyone to stay in sync.";

    newContactPreviewElement.innerHTML = "";
    const nameNode = document.createElement("strong");
    nameNode.textContent = displayName;
    newContactPreviewElement.appendChild(nameNode);
    const descriptionNode = document.createElement("span");
    descriptionNode.textContent = description;
    newContactPreviewElement.appendChild(descriptionNode);
    return;
  }

  const displayName = contact.displayName || "New contact";
  const status = getContactPreviewText(contact);
  const details = [];
  if (status) details.push(status);
  const normalizedNickname =
    typeof contact.nickname === "string" ? contact.nickname.trim().toLowerCase() : "";
  const hasLookupMatch =
    contactLookupState.status === ContactLookupStatus.FOUND &&
    contactLookupState.results.some((entry) =>
      typeof entry?.username === "string"
        ? entry.username.trim().toLowerCase() === normalizedNickname && normalizedNickname
        : false
    );
  if (hasLookupMatch) {
    details.push("Existing account");
  }
  const description = details.join(" • ") || "Ready to start chatting.";

  newContactPreviewElement.innerHTML = "";
  const nameNode = document.createElement("strong");
  nameNode.textContent = displayName;
  newContactPreviewElement.appendChild(nameNode);
  const descriptionNode = document.createElement("span");
  descriptionNode.textContent = description;
  newContactPreviewElement.appendChild(descriptionNode);
}

function renderContactSuggestions(results, query = "") {
  if (!newContactSuggestionsElement || !newContactSuggestionsList) {
    return;
  }

  newContactSuggestionsList.innerHTML = "";

  const entries = Array.isArray(results)
    ? results.filter((entry) => entry && typeof entry.username === "string" && entry.username.trim())
    : [];

  if (!entries.length) {
    newContactSuggestionsElement.hidden = true;
    newContactSuggestionsElement.setAttribute("aria-hidden", "true");
    return;
  }

  newContactSuggestionsElement.hidden = false;
  newContactSuggestionsElement.setAttribute("aria-hidden", "false");

  const trimmedQuery = typeof query === "string" ? query.trim() : "";

  entries.slice(0, 6).forEach((entry) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "new-contact__suggestion";
    button.dataset.username = entry.username;
    button.setAttribute("role", "option");

    const label = document.createElement("span");
    label.className = "new-contact__suggestion-label";
    const labelFragment = createHighlightedFragment(entry.username, trimmedQuery, {
      className: "text-highlight",
    });
    label.appendChild(labelFragment);
    button.appendChild(label);

    const meta = document.createElement("span");
    meta.textContent = "Existing user";
    button.appendChild(meta);

    item.appendChild(button);
    newContactSuggestionsList.appendChild(item);
  });
}

function clearContactLookupTimer() {
  if (contactLookupTimer) {
    clearTimeout(contactLookupTimer);
    contactLookupTimer = null;
  }
}

function setContactLookupState({ status, results, message } = {}) {
  contactLookupState = {
    status: status ?? ContactLookupStatus.IDLE,
    results: Array.isArray(results) ? results : [],
    message: typeof message === "string" ? message : "",
  };

  if (!newContactLookupElement) {
    return;
  }

  const { status: currentStatus, results: currentResults, message: currentMessage } =
    contactLookupState;

  newContactLookupElement.classList.remove(
    "new-contact__lookup--success",
    "new-contact__lookup--warning",
    "new-contact__lookup--error"
  );
  newContactLookupElement.textContent = "";

  renderContactSuggestions(currentResults, newContactNicknameInput?.value ?? "");

  if (currentStatus === ContactLookupStatus.SEARCHING) {
    newContactLookupElement.textContent = "Searching for users…";
    return;
  }

  if (currentStatus === ContactLookupStatus.FOUND && currentResults.length) {
    newContactLookupElement.classList.add("new-contact__lookup--success");
    if (currentResults.length === 1) {
      const strong = document.createElement("strong");
      strong.textContent = "Existing account found";
      newContactLookupElement.append(strong);
      newContactLookupElement.append(
        document.createTextNode(" Select it below or continue to add this contact.")
      );
    } else {
      const strong = document.createElement("strong");
      strong.textContent = `${currentResults.length} matching accounts`;
      newContactLookupElement.append(strong);
      newContactLookupElement.append(
        document.createTextNode(". Pick one below or keep typing to narrow it down.")
      );
    }
    return;
  }

  if (currentStatus === ContactLookupStatus.NOT_FOUND) {
    newContactLookupElement.classList.add("new-contact__lookup--warning");
    newContactLookupElement.textContent =
      currentMessage || "No existing account found. We'll add them as a private contact.";
    return;
  }

  if (currentStatus === ContactLookupStatus.ERROR) {
    newContactLookupElement.classList.add("new-contact__lookup--error");
    newContactLookupElement.textContent =
      currentMessage || "We couldn't verify this account. You can still add them manually.";
    return;
  }

  const idleMessage =
    currentMessage || "Start typing a username to check if they already have an account.";
  newContactLookupElement.textContent = idleMessage;
}

function resetContactLookup({ message } = {}) {
  contactLookupRequestId += 1;
  clearContactLookupTimer();
  setContactLookupState({ status: ContactLookupStatus.IDLE, results: [], message });
}

function scheduleContactLookup(query) {
  const trimmed = query.trim();
  contactLookupRequestId += 1;
  clearContactLookupTimer();

  if (!trimmed) {
    resetContactLookup();
    return;
  }

  if (trimmed.length < 2) {
    resetContactLookup({ message: "Type at least two characters to search." });
    return;
  }

  setContactLookupState({ status: ContactLookupStatus.SEARCHING, results: [] });
  contactLookupTimer = window.setTimeout(() => {
    performContactLookup(trimmed, contactLookupRequestId);
  }, CONTACT_LOOKUP_DEBOUNCE_MS);
}

async function performContactLookup(query, requestId) {
  clearContactLookupTimer();
  try {
    const payload = await apiRequest(`/api/users/search?query=${encodeURIComponent(query)}`);
    if (requestId !== contactLookupRequestId) {
      return;
    }
    const results = Array.isArray(payload?.results)
      ? payload.results
          .filter((entry) => entry && typeof entry.username === "string" && entry.username.trim())
          .map((entry) => ({
            id: entry.id,
            username: entry.username.trim(),
          }))
      : [];
    if (results.length) {
      setContactLookupState({ status: ContactLookupStatus.FOUND, results });
    } else {
      setContactLookupState({ status: ContactLookupStatus.NOT_FOUND, results: [] });
    }
  } catch (error) {
    if (requestId !== contactLookupRequestId) {
      return;
    }
    const message =
      error instanceof Error ? error.message : "We couldn't verify this account. Please try again.";
    setContactLookupState({ status: ContactLookupStatus.ERROR, message });
  }
}

function refreshContactLookupForMethod() {
  const method = getActiveNewContactMethod();
  if (method === ContactMethod.NICKNAME) {
    const query = newContactNicknameInput?.value ?? "";
    if (query.trim()) {
      scheduleContactLookup(query);
    } else {
      resetContactLookup();
    }
    return;
  }

  if (method === ContactMethod.EMAIL) {
    const query = newContactEmailInput?.value ?? "";
    if (query.trim()) {
      scheduleContactLookup(query);
    } else {
      resetContactLookup();
    }
    return;
  }

  resetContactLookup({
    message: "Account lookup is available when adding by nickname or email.",
  });
}

function handleContactLookupInput() {
  const method = getActiveNewContactMethod();
  if (method === ContactMethod.NICKNAME) {
    scheduleContactLookup(newContactNicknameInput?.value ?? "");
  } else if (method === ContactMethod.EMAIL) {
    scheduleContactLookup(newContactEmailInput?.value ?? "");
  }
}

function handleContactSuggestionClick(event) {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const button = target.closest("button[data-username]");
  if (!(button instanceof HTMLButtonElement)) {
    return;
  }

  const username = button.dataset.username ?? "";
  if (!username || !(newContactNicknameInput instanceof HTMLInputElement)) {
    return;
  }

  newContactNicknameInput.value = username;
  if (typeof newContactNicknameInput.setSelectionRange === "function") {
    const length = username.length;
    newContactNicknameInput.setSelectionRange(length, length);
  }
  newContactNicknameInput.focus();
  newContactNicknameInput.dispatchEvent(new Event("input", { bubbles: true }));
}

function renderNewChatContacts(query = newChatSearchInput?.value ?? "") {
  if (!newChatContactListElement) return;

  const rawQuery = typeof query === "string" ? query.trim() : "";
  const normalizedQuery = rawQuery.toLowerCase();
  const available = sortContacts(contacts);
  const filtered = normalizedQuery
    ? available.filter((contact) => contactMatchesQuery(contact, normalizedQuery))
    : available;

  newChatContactListElement.innerHTML = "";

  if (!filtered.length) {
    if (newChatEmptyElement) {
      newChatEmptyElement.hidden = false;
      const heading = newChatEmptyElement.querySelector("strong");
      const copy = newChatEmptyElement.querySelector("p");
      if (heading) {
        heading.textContent = normalizedQuery ? "No matches found" : "No saved contacts yet";
      }
      if (copy) {
        copy.textContent = normalizedQuery
          ? "Try searching by a different name, email, or phone number."
          : "Add a new contact to start your first conversation.";
      }
    }
    return;
  }

  if (newChatEmptyElement) {
    newChatEmptyElement.hidden = true;
  }

  filtered.forEach((contact) => {
    const normalized = normalizeContact(contact);
    if (!normalized) return;

    const listItem = document.createElement("li");
    listItem.className = "new-chat__list-item";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "new-chat__contact";
    button.setAttribute("role", "option");
    const key = getContactKey(normalized);
    if (key) {
      button.dataset.contactId = key;
    }
    if (normalized.lookupKey) {
      button.dataset.contactLookup = normalized.lookupKey;
    }

    const avatar = document.createElement("span");
    avatar.className = "new-chat__contact-avatar";
    const avatarSource =
      normalized.displayName ||
      normalized.nickname ||
      normalized.email ||
      normalized.phoneDisplay ||
      normalized.phone ||
      "?";
    avatar.textContent = getInitials(avatarSource);

    const details = document.createElement("span");
    details.className = "new-chat__contact-details";

    const nameNode = document.createElement("span");
    nameNode.className = "new-chat__contact-name";
    const nameText =
      normalized.displayName ||
      normalized.nickname ||
      normalized.email ||
      normalized.phoneDisplay ||
      normalized.phone ||
      "Contact";
    nameNode.appendChild(createHighlightedFragment(nameText, rawQuery));

    const metaNode = document.createElement("span");
    metaNode.className = "new-chat__contact-meta";
    const metaSource =
      normalized.email ||
      normalized.phoneDisplay ||
      (normalized.nickname && normalized.nickname !== nameText ? normalized.nickname : "") ||
      getContactPreviewText(normalized) ||
      deriveContactStatus(normalized);
    if (metaSource) {
      metaNode.appendChild(createHighlightedFragment(metaSource, rawQuery));
    } else {
      metaNode.textContent = "Ready to chat";
    }

    details.appendChild(nameNode);
    details.appendChild(metaNode);

    const action = document.createElement("span");
    action.className = "new-chat__contact-action";
    action.setAttribute("aria-hidden", "true");
    action.textContent = "→";

    button.appendChild(avatar);
    button.appendChild(details);
    button.appendChild(action);
    button.setAttribute("aria-label", `Start chat with ${nameText}`);

    listItem.appendChild(button);
    newChatContactListElement.appendChild(listItem);
  });
}

function renderManageParticipantsOptions(query = manageParticipantsSearchInput?.value ?? "") {
  if (!manageParticipantsListElement) {
    return;
  }

  const chat = getActiveChat();
  const rawQuery = typeof query === "string" ? query.trim() : "";
  const normalizedQuery = rawQuery.toLowerCase();
  manageParticipantsListElement.innerHTML = "";

  if (!chat) {
    if (manageParticipantsEmptyElement) {
      manageParticipantsEmptyElement.hidden = false;
      const heading = manageParticipantsEmptyElement.querySelector("strong");
      const copy = manageParticipantsEmptyElement.querySelector("p");
      if (heading) {
        heading.textContent = "Select a conversation";
      }
      if (copy) {
        copy.textContent = "Choose a chat to invite additional participants.";
      }
    }
    updateManageParticipantsConfirmState();
    return;
  }

  const existingList = getManageableParticipantNames(chat);
  const existingSet = new Set(existingList.map((name) => name.toLowerCase()));
  const existingAccountIds = new Set(
    getChatParticipantAccountIds(chat, { includeSelf: true }).map((id) => id.toLowerCase())
  );
  const available = sortContacts(contacts);
  const filteredContacts = normalizedQuery
    ? available.filter((contact) => contactMatchesQuery(contact, normalizedQuery))
    : available;

  const seenParticipants = new Set();
  const options = [];

  filteredContacts.forEach((contact) => {
    const normalized = normalizeContact(contact);
    if (!normalized) {
      return;
    }
    const displayName =
      normalized.displayName ||
      normalized.nickname ||
      normalized.email ||
      normalized.phoneDisplay ||
      normalized.phone ||
      "Contact";
    const sanitizedName = normalizeGroupParticipants([displayName])[0];
    if (!sanitizedName) {
      return;
    }
    const sanitizedKey = sanitizedName.toLowerCase();
    const accountId = normalizeAccountId(normalized.accountId);
    const participantKey = accountId ? `account:${accountId.toLowerCase()}` : sanitizedKey;
    if (seenParticipants.has(participantKey)) {
      return;
    }
    seenParticipants.add(participantKey);
    options.push({
      contact: normalized,
      displayName,
      sanitizedName,
      sanitizedKey,
      accountId,
      rawQuery,
    });
  });

  if (!options.length) {
    if (manageParticipantsEmptyElement) {
      manageParticipantsEmptyElement.hidden = false;
      const heading = manageParticipantsEmptyElement.querySelector("strong");
      const copy = manageParticipantsEmptyElement.querySelector("p");
      if (heading) {
        heading.textContent = normalizedQuery ? "No matches found" : "No contacts available";
      }
      if (copy) {
        copy.textContent = normalizedQuery
          ? "Try searching with a different name or detail."
          : "Add contacts to invite them to the chat.";
      }
    }
    updateManageParticipantsConfirmState();
    return;
  }

  if (manageParticipantsEmptyElement) {
    manageParticipantsEmptyElement.hidden = true;
  }

  options.forEach(({ contact, displayName, sanitizedName, sanitizedKey, accountId, rawQuery: optionQuery }) => {
    const listItem = document.createElement("li");
    listItem.className = "new-chat__list-item";

    const label = document.createElement("label");
    label.className = "new-chat__contact new-chat__contact--selectable";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "manage-participants__checkbox";
    checkbox.value = sanitizedName;
    checkbox.dataset.participantName = sanitizedName;
    checkbox.dataset.participantDisplayName = displayName;
    if (accountId) {
      checkbox.dataset.participantAccountId = accountId;
    } else {
      delete checkbox.dataset.participantAccountId;
    }

    const nameNode = document.createElement("span");
    nameNode.className = "new-chat__contact-name";
    nameNode.appendChild(createHighlightedFragment(displayName, optionQuery));

    const metaNode = document.createElement("span");
    metaNode.className = "new-chat__contact-meta";
    const metaSource =
      contact.email ||
      contact.phoneDisplay ||
      (contact.nickname && contact.nickname !== displayName ? contact.nickname : "") ||
      getContactPreviewText(contact) ||
      deriveContactStatus(contact);
    if (existingSet.has(sanitizedKey) || (accountId && existingAccountIds.has(accountId.toLowerCase()))) {
      checkbox.checked = true;
      checkbox.disabled = true;
      label.classList.add("new-chat__contact--existing");
      metaNode.textContent = "Already in chat";
    } else if (metaSource) {
      metaNode.appendChild(createHighlightedFragment(metaSource, optionQuery));
    } else {
      metaNode.textContent = "Ready to invite";
    }

    const avatar = document.createElement("span");
    avatar.className = "new-chat__contact-avatar";
    const avatarSource =
      displayName || contact.nickname || contact.email || contact.phoneDisplay || contact.phone || "?";
    avatar.textContent = getInitials(avatarSource);

    label.append(checkbox, avatar);

    const details = document.createElement("span");
    details.className = "new-chat__contact-details";
    details.append(nameNode, metaNode);
    label.appendChild(details);

    checkbox.addEventListener("change", updateManageParticipantsConfirmState);

    listItem.appendChild(label);
    manageParticipantsListElement.appendChild(listItem);
  });

  updateManageParticipantsConfirmState();
}

function updateManageParticipantsConfirmState() {
  if (!manageParticipantsConfirmButton) {
    return;
  }

  const selected = manageParticipantsListElement
    ? Array.from(
        manageParticipantsListElement.querySelectorAll(
          "input.manage-participants__checkbox:not([disabled]):checked"
        )
      )
    : [];
  const count = selected.length;
  manageParticipantsConfirmButton.disabled = count === 0;
  manageParticipantsConfirmButton.textContent =
    count > 0 ? `Add ${count} participant${count === 1 ? "" : "s"}` : "Add participants";
}

function openManageParticipantsModal() {
  if (!manageParticipantsModal || !manageParticipantsButton) {
    return;
  }

  const chat = getActiveChat();
  if (!chat) {
    showToast("Select a conversation to add participants");
    return;
  }

  if (!manageParticipantsModal.hidden) {
    return;
  }

  manageParticipantsRestoreFocusTo =
    document.activeElement instanceof HTMLElement ? document.activeElement : null;
  manageParticipantsModal.hidden = false;
  document.body.classList.add("modal-open");
  if (manageParticipantsSearchInput instanceof HTMLInputElement) {
    manageParticipantsSearchInput.value = "";
  }
  renderManageParticipantsOptions("");
  if (manageParticipantsSearchInput instanceof HTMLElement) {
    manageParticipantsSearchInput.focus();
  }
}

function closeManageParticipantsModal({ restoreFocus = true } = {}) {
  if (!manageParticipantsModal || manageParticipantsModal.hidden) {
    return;
  }

  manageParticipantsModal.hidden = true;
  if (!document.querySelector(".modal:not([hidden])")) {
    document.body.classList.remove("modal-open");
  }
  if (manageParticipantsSearchInput instanceof HTMLInputElement) {
    manageParticipantsSearchInput.value = "";
  }
  manageParticipantsRestoreFocusTo = restoreFocus ? manageParticipantsRestoreFocusTo : null;
  updateManageParticipantsConfirmState();

  if (!restoreFocus) {
    manageParticipantsRestoreFocusTo = null;
    return;
  }

  const restoreTarget = manageParticipantsRestoreFocusTo;
  manageParticipantsRestoreFocusTo = null;
  if (restoreTarget instanceof HTMLElement) {
    restoreTarget.focus();
  } else if (manageParticipantsButton instanceof HTMLElement) {
    manageParticipantsButton.focus();
  }
}

function trapManageParticipantsFocus(event) {
  if (!manageParticipantsModal || manageParticipantsModal.hidden) {
    return;
  }
  if (event.key !== "Tab") {
    return;
  }

  const focusableSelectors =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const focusable = Array.from(manageParticipantsModal.querySelectorAll(focusableSelectors)).filter(
    (element) =>
      element instanceof HTMLElement &&
      !element.hasAttribute("data-close-modal") &&
      element.offsetParent !== null
  );

  if (!focusable.length) {
    return;
  }

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

function handleManageParticipantsSearch(event) {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) {
    return;
  }
  renderManageParticipantsOptions(target.value ?? "");
}

function handleManageParticipantsConfirm() {
  const chat = getActiveChat();
  if (!chat) {
    closeManageParticipantsModal();
    return;
  }

  if (!manageParticipantsListElement) {
    closeManageParticipantsModal();
    return;
  }

  const selectedInputs = Array.from(
    manageParticipantsListElement.querySelectorAll(
      "input.manage-participants__checkbox:not([disabled]):checked"
    )
  );
  if (!selectedInputs.length) {
    showToast("Select contacts to add");
    return;
  }

  const existingOrdered = getManageableParticipantNames(chat);
  const existingSet = new Set(existingOrdered.map((name) => name.toLowerCase()));
  const accountIdSet = new Set(
    normalizeParticipantAccountIds(getChatParticipantAccountIds(chat, { includeSelf: true }))
  );
  const accountKeySet = new Set(Array.from(accountIdSet).map((id) => id.toLowerCase()));
  const addedNames = [];

  selectedInputs.forEach((input) => {
    const name = input.dataset.participantName ?? input.value ?? "";
    const normalized = normalizeGroupParticipants([name])[0];
    const key = typeof normalized === "string" ? normalized.toLowerCase() : "";
    const rawAccountId = input.dataset.participantAccountId ?? "";
    const normalizedAccountId = normalizeAccountId(rawAccountId);
    const accountKey = normalizedAccountId ? normalizedAccountId.toLowerCase() : "";
    if ((accountKey && accountKeySet.has(accountKey)) || (!accountKey && (!key || existingSet.has(key)))) {
      return;
    }
    if (key) {
      existingSet.add(key);
    }
    if (accountKey) {
      accountIdSet.add(normalizedAccountId);
      accountKeySet.add(accountKey);
    }
    if (normalized) {
      addedNames.push(normalized);
    }
  });

  if (!addedNames.length) {
    closeManageParticipantsModal();
    showToast("Everyone you selected is already in the chat");
    return;
  }

  const updatedParticipants = normalizeGroupParticipants([
    ...existingOrdered,
    ...addedNames,
  ]);

  const selfAccountId = normalizeAccountId(authState?.user?.id);
  if (selfAccountId) {
    accountIdSet.delete(selfAccountId);
    accountKeySet.delete(selfAccountId.toLowerCase());
  }
  const updatedParticipantAccountIds = normalizeParticipantAccountIds(Array.from(accountIdSet));

  const wasGroup = chat.type === ChatType.GROUP;
  chat.participants = updatedParticipants;
  chat.participantAccountIds = updatedParticipantAccountIds;
  if (!wasGroup) {
    // Promote direct conversations to groups once additional participants are added so
    // future management reuses the shared group code paths.
    chat.type = ChatType.GROUP;
    if (chat.contact) {
      delete chat.contact;
    }
    chat.capabilities = {
      audio: chat.capabilities?.audio !== false,
      video: chat.capabilities?.video !== false,
      phone: false,
    };
  }
  ensureSelfParticipant(chat);
  chat.status = deriveGroupStatus(chat.participants, chat.description);
  saveState(chats);
  renderChats(chatSearchInput.value);
  renderChatView(chat);
  sendChatParticipantsUpdate(chat);
  closeManageParticipantsModal();

  const count = addedNames.length;
  const toastMessage = wasGroup
    ? `Added ${count} participant${count === 1 ? "" : "s"}`
    : `Created a group chat and added ${count} participant${count === 1 ? "" : "s"}`;
  showToast(toastMessage);
}

function showNewChatView(view, { focus = true } = {}) {
  if (!newContactModal) return;
  const mode = view === "form" ? "form" : "list";
  newContactModal.dataset.view = mode;

  if (newChatListView) {
    newChatListView.hidden = mode !== "list";
  }
  if (newContactForm) {
    newContactForm.hidden = mode !== "form";
  }
  if (newContactBackButton) {
    newContactBackButton.hidden = mode !== "form";
  }

  if (!focus) {
    return;
  }

  if (mode === "list") {
    if (newChatSearchInput instanceof HTMLElement) {
      newChatSearchInput.focus();
    }
    return;
  }

  const activeGroup = newContactFieldGroups.find(
    (group) => group.dataset.contactFields === getActiveNewContactMethod()
  );
  const focusTarget = activeGroup
    ? activeGroup.querySelector("input:not([type=\"radio\"]):not([disabled]), textarea:not([disabled])")
    : newContactForm.querySelector(
        "input:not([type=\"radio\"]):not([disabled]), textarea:not([disabled])"
      );
  if (focusTarget instanceof HTMLElement) {
    focusTarget.focus();
  }
}

function handleNewChatSearch(event) {
  const value = typeof event.target.value === "string" ? event.target.value : "";
  renderNewChatContacts(value);
}

function findStoredContactByButton(target) {
  const contactId = target.dataset.contactId ?? "";
  const lookup = target.dataset.contactLookup ?? "";
  if (contactId) {
    const match = contacts.find((candidate) => getContactKey(candidate) === contactId);
    if (match) return match;
  }
  if (lookup) {
    const match = contacts.find((candidate) => normalizeContact(candidate)?.lookupKey === lookup);
    if (match) return match;
  }
  return null;
}

function handleNewChatContactClick(event) {
  const button =
    event.target instanceof HTMLElement
      ? event.target.closest(".new-chat__contact")
      : null;
  if (!(button instanceof HTMLElement)) {
    return;
  }
  event.preventDefault();

  const storedContact = findStoredContactByButton(button);
  const nameFallback =
    button.querySelector(".new-chat__contact-name")?.textContent?.trim() ?? "";
  const contact = storedContact ?? normalizeContact({ displayName: nameFallback }) ?? null;
  if (!contact) return;

  openChatForContact(contact, { showToastMessage: true });
}

function handleStartNewContact() {
  showNewChatView("form");
  setActiveContactMethod(ContactMethod.NICKNAME, { focus: true });
  refreshContactLookupForMethod();
}

function openChatForContact(contact, { showToastMessage = true } = {}) {
  const normalized = normalizeContact(contact);
  if (!normalized) return null;

  const existing = chats.find(
    (chat) => chat.type === ChatType.DIRECT && chat.contact && contactsMatch(chat.contact, normalized)
  );

  if (existing) {
    openChat(existing.id);
    closeNewContactModal();
    if (showToastMessage) {
      showToast(`You're chatting with ${existing.name}`);
    }
    return { chat: existing, created: false };
  }

  const status = deriveContactStatus(normalized);
  const chat = createChat(normalized.displayName, { status, contact: normalized });
  closeNewContactModal();
  if (showToastMessage) {
    showToast(`Started a chat with ${chat.name}`);
  }
  return { chat, created: true };
}

function openNewContactModal() {
  if (!newContactModal || !newContactForm) return;
  if (!newContactModal.hidden) return;

  if (profileModal && !profileModal.hidden) {
    closeProfile({ restoreFocus: false });
  }
  if (settingsModal && !settingsModal.hidden) {
    closeSettings({ restoreFocus: false });
  }

  newContactRestoreFocusTo =
    document.activeElement instanceof HTMLElement ? document.activeElement : newChatButton;

  resetNewContactForm();
  showNewChatView("list", { focus: false });
  if (newChatSearchInput) {
    newChatSearchInput.value = "";
  }
  renderNewChatContacts();

  newContactModal.hidden = false;
  document.body.classList.add("modal-open");

  if (newChatSearchInput instanceof HTMLElement) {
    newChatSearchInput.focus();
  }
}

function closeNewContactModal({ restoreFocus = true } = {}) {
  if (!newContactModal) return;
  if (newContactModal.hidden) return;

  newContactModal.hidden = true;
  showNewChatView("list", { focus: false });
  resetContactLookup();
  clearContactLookupTimer();
  if (
    (!profileModal || profileModal.hidden) &&
    (!settingsModal || settingsModal.hidden)
  ) {
    document.body.classList.remove("modal-open");
  }

  resetNewContactForm();

  const restoreTarget = newContactRestoreFocusTo;
  newContactRestoreFocusTo = null;

  if (!restoreFocus) return;
  if (restoreTarget instanceof HTMLElement) {
    restoreTarget.focus();
  } else if (newChatButton) {
    newChatButton.focus();
  }
}

function trapNewContactFocus(event) {
  if (!newContactModal || newContactModal.hidden) return;
  if (event.key !== "Tab") return;

  const focusableSelectors =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const focusable = Array.from(newContactModal.querySelectorAll(focusableSelectors)).filter(
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

function handleNewContactSubmit(event) {
  event.preventDefault();
  if (!newContactForm) return;

  if (!newContactForm.reportValidity()) {
    return;
  }

  const contact = collectNewContactData({ strict: true, showErrors: true });
  if (!contact) return;

  if (contact.method === ContactMethod.GROUP) {
    const participants = Array.isArray(contact.participants)
      ? normalizeGroupParticipants(contact.participants)
      : [];
    const description = typeof contact.description === "string"
      ? contact.description.trim()
      : "";
    const status = deriveGroupStatus(participants, description);
    const chat = createChat(contact.displayName, {
      type: ChatType.GROUP,
      participants,
      description,
      status,
    });
    showToast(`Created group ${chat.name}`);
    closeNewContactModal();
    return;
  }

  const { contact: storedContact } = upsertContact(contact);
  const methodLabel = getContactMethodLabel(contact.method);
  const result = openChatForContact(storedContact ?? contact, { showToastMessage: false });
  if (result?.chat) {
    const toastMessage = result.created
      ? `Started a chat with ${result.chat.name} via ${methodLabel}`
      : `You're chatting with ${result.chat.name}`;
    showToast(toastMessage);
  } else if (storedContact) {
    showToast(`Saved ${storedContact.displayName} to contacts`);
  }
}

function handleNewChat() {
  if (newContactModal && newContactForm) {
    openNewContactModal();
    return;
  }

  const name = prompt("Who would you like to message?");
  if (typeof name !== "string") return;
  const trimmed = name.trim();
  if (!trimmed) return;
  const chat = createChat(trimmed);
  showToast(`Started a chat with ${chat.name}`);
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
    contact: chat.contact ? { ...chat.contact } : null,
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

function deleteActiveChat() {
  const chat = getActiveChat();
  if (!chat) {
    showToast("Select a chat to delete");
    return;
  }

  const displayName = getChatDisplayName(chat);
  const confirmed = window.confirm(
    `Delete the conversation with ${displayName}? This action cannot be undone.`
  );
  if (!confirmed) {
    return;
  }

  const index = chats.findIndex((candidate) => candidate.id === chat.id);
  if (index === -1) {
    return;
  }

  chats.splice(index, 1);
  if (activeChatId === chat.id) {
    activeChatId = null;
  }

  closeManageParticipantsModal({ restoreFocus: false });
  saveState(chats);
  pruneDrafts();
  pruneAttachmentDrafts();
  pendingAttachments = activeChatId ? getAttachmentDraft(activeChatId) : [];

  renderChats(chatSearchInput.value);
  renderChatView(getActiveChat());
  if (window.innerWidth <= 900) {
    showSidebar();
  }

  showToast(`Deleted ${displayName}`);
}

function autoResizeTextarea() {
  messageInput.style.height = "auto";
  messageInput.style.height = `${messageInput.scrollHeight}px`;
}

const DEFAULT_TOAST_DURATION_MS = 2600;
const TOAST_ICON_BY_INTENT = {
  [ToastIntent.INFO]: "💬",
  [ToastIntent.SUCCESS]: "✓",
  [ToastIntent.WARNING]: "⚠️",
  [ToastIntent.ERROR]: "⛔",
};

let toastTimeout = null;

function getChatDisplayName(chat) {
  if (!chat || typeof chat !== "object") {
    return "Conversation";
  }
  if (typeof chat.name === "string" && chat.name.trim()) {
    return chat.name.trim();
  }
  const contact = chat.contact ?? null;
  if (contact && typeof contact === "object") {
    if (typeof contact.displayName === "string" && contact.displayName.trim()) {
      return contact.displayName.trim();
    }
    if (typeof contact.nickname === "string" && contact.nickname.trim()) {
      return contact.nickname.trim();
    }
  }
  return "Conversation";
}

function buildToastPreviewFromMessage(message) {
  if (!message || typeof message !== "object") {
    return "";
  }
  const text = typeof message.text === "string" ? message.text.trim() : "";
  if (text) {
    return text.length > 60 ? `${text.slice(0, 57)}…` : text;
  }
  const attachments = Array.isArray(message.attachments) ? message.attachments : [];
  if (!attachments.length) {
    return "";
  }
  return formatAttachmentSummary(attachments);
}

function buildToastCopy({ prefix, chatName, preview }) {
  const safeName = typeof chatName === "string" && chatName.trim() ? chatName.trim() : "Conversation";
  if (preview) {
    return `${prefix} ${safeName}: ${preview}`;
  }
  return `${prefix} ${safeName}`;
}

function isChatInFocus(chat) {
  if (!chat) {
    return false;
  }
  if (activeChatId !== chat.id) {
    return false;
  }
  if (typeof document === "undefined") {
    return true;
  }
  if (document.hidden) {
    return false;
  }
  if (typeof document.hasFocus === "function") {
    return document.hasFocus();
  }
  return true;
}

function shouldNotifyIncomingMessage(chat) {
  // Avoid spamming toasts when the user is already reading the active chat.
  if (!chat) {
    return false;
  }
  return !isChatInFocus(chat);
}

function showToast(messageOrOptions, options = {}) {
  const config =
    typeof messageOrOptions === "string"
      ? { message: messageOrOptions, ...options }
      : { ...(messageOrOptions || {}), ...options };
  const message = typeof config.message === "string" ? config.message.trim() : "";
  if (!message) {
    return;
  }

  const validIntents = Object.values(ToastIntent);
  const intent = validIntents.includes(config.intent) ? config.intent : ToastIntent.INFO;
  const duration =
    Number.isFinite(config.duration) && config.duration > 0 ? config.duration : DEFAULT_TOAST_DURATION_MS;

  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.innerHTML =
      '<span class="toast__icon" aria-hidden="true"></span><span class="toast__message"></span>';
    document.body.appendChild(toast);
  }

  const iconElement = toast.querySelector(".toast__icon");
  const messageElement = toast.querySelector(".toast__message");
  if (iconElement) {
    iconElement.textContent = TOAST_ICON_BY_INTENT[intent] ?? TOAST_ICON_BY_INTENT[ToastIntent.INFO];
  }
  if (messageElement) {
    messageElement.textContent = message;
  } else {
    toast.textContent = message;
  }

  toast.dataset.intent = intent;

  toast.classList.remove("toast--visible");
  void toast.offsetWidth;
  toast.classList.add("toast--visible");

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("toast--visible");
  }, duration);
}

let isEmojiPickerOpen = false;
let emojiOutsideClickHandler = null;
let emojiPickerTabs = [];
let emojiPickerPanels = [];
let activeEmojiCategory = EMOJI_CATEGORIES.length ? EMOJI_CATEGORIES[0].id : null;
let isMessageSearchOpen = false;
let activeMessageSearchQuery = "";
let messageSearchMatches = [];
let activeMessageSearchIndex = 0;
let shouldScrollToActiveSearchMatch = false;
let messageSearchOutsideClickHandler = null;
let voiceRecorderTimerId = null;
let voiceRecorderStartedAt = 0;
let voiceRecorderIsActive = false;
let voiceRecorderMediaRecorder = null;
let voiceRecorderStream = null;
let voiceRecorderChunks = [];
let voiceRecorderPendingSend = false;
let voiceRecorderPendingSuppressToast = false;
let voiceRecorderLastDuration = 0;
let activeCall = null;
let callTimerInterval = null;
let callDisconnectWatcher = null;
let callOverlayRestoreFocusTo = null;
let chatWallpaperRestoreFocusTo = null;

function buildEmojiPicker() {
  if (!emojiPicker) return;
  emojiPicker.innerHTML = "";
  emojiPickerTabs = [];
  emojiPickerPanels = [];

  const categories = EMOJI_CATEGORIES.filter(
    (category) => Array.isArray(category.emojis) && category.emojis.length
  );

  if (!categories.length) return;

  if (!activeEmojiCategory || !categories.some((category) => category.id === activeEmojiCategory)) {
    activeEmojiCategory = categories[0].id;
  }

  const tabs = document.createElement("div");
  tabs.className = "emoji-picker__tabs";
  tabs.setAttribute("role", "tablist");
  tabs.setAttribute("aria-label", "Emoji categories");

  const panels = document.createElement("div");
  panels.className = "emoji-picker__panels";

  categories.forEach((category) => {
    const tabId = `emoji-tab-${category.id}`;
    const panelId = `emoji-panel-${category.id}`;

    const tab = document.createElement("button");
    tab.type = "button";
    tab.id = tabId;
    tab.className = "emoji-picker__tab";
    tab.dataset.category = category.id;
    tab.dataset.emojiTab = "";
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", panelId);
    tab.setAttribute("aria-label", category.label);
    tab.title = category.label;
    tab.tabIndex = -1;
    tab.textContent = category.icon || category.emojis[0] || "😀";
    tab.addEventListener("click", () => {
      setActiveEmojiCategory(category.id, { focusTab: true });
    });
    tab.addEventListener("keydown", handleEmojiTabKeydown);
    tabs.appendChild(tab);
    emojiPickerTabs.push(tab);

    const panel = document.createElement("div");
    panel.id = panelId;
    panel.className = "emoji-picker__panel";
    panel.dataset.category = category.id;
    panel.dataset.emojiPanel = "";
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tabId);
    panel.hidden = true;
    panel.setAttribute("aria-hidden", "true");

    const heading = document.createElement("p");
    heading.className = "emoji-picker__panel-title";
    heading.textContent = category.label;
    panel.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "emoji-picker__grid";

    category.emojis.forEach((emoji) => {
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
      grid.appendChild(button);
    });

    panel.appendChild(grid);
    panels.appendChild(panel);
    emojiPickerPanels.push(panel);
  });

  emojiPicker.appendChild(tabs);
  emojiPicker.appendChild(panels);
  setActiveEmojiCategory(activeEmojiCategory, { focusTab: false });
}

function setActiveEmojiCategory(categoryId, { focusTab = false } = {}) {
  if (!emojiPickerTabs.length || !emojiPickerPanels.length) return;
  const tab = emojiPickerTabs.find((candidate) => candidate.dataset.category === categoryId);
  const panel = emojiPickerPanels.find((candidate) => candidate.dataset.category === categoryId);
  if (!tab || !panel) return;

  activeEmojiCategory = categoryId;

  emojiPickerTabs.forEach((candidateTab) => {
    const isActive = candidateTab === tab;
    candidateTab.classList.toggle("emoji-picker__tab--active", isActive);
    candidateTab.setAttribute("aria-selected", isActive ? "true" : "false");
    candidateTab.tabIndex = isActive ? 0 : -1;
  });

  emojiPickerPanels.forEach((candidatePanel) => {
    const isActive = candidatePanel === panel;
    candidatePanel.classList.toggle("emoji-picker__panel--active", isActive);
    candidatePanel.hidden = !isActive;
    candidatePanel.setAttribute("aria-hidden", isActive ? "false" : "true");
  });

  if (focusTab) {
    tab.focus();
  }
}

function handleEmojiTabKeydown(event) {
  const { key } = event;
  if (!emojiPickerTabs.length) return;

  const supportedKeys = ["ArrowLeft", "ArrowRight", "Home", "End"];
  if (!supportedKeys.includes(key)) return;

  event.preventDefault();

  const currentIndex = emojiPickerTabs.findIndex(
    (candidate) => candidate.dataset.category === activeEmojiCategory
  );
  if (currentIndex === -1) return;

  let nextIndex = currentIndex;
  if (key === "ArrowRight") {
    nextIndex = (currentIndex + 1) % emojiPickerTabs.length;
  } else if (key === "ArrowLeft") {
    nextIndex = (currentIndex - 1 + emojiPickerTabs.length) % emojiPickerTabs.length;
  } else if (key === "Home") {
    nextIndex = 0;
  } else if (key === "End") {
    nextIndex = emojiPickerTabs.length - 1;
  }

  const nextTab = emojiPickerTabs[nextIndex];
  if (!nextTab) return;

  setActiveEmojiCategory(nextTab.dataset.category, { focusTab: true });
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
  if (activeEmojiCategory && emojiPickerTabs.length) {
    setActiveEmojiCategory(activeEmojiCategory);
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
  swipeTracking = null;
}

function hideSidebar() {
  sidebarElement.classList.remove("sidebar--visible");
  swipeTracking = null;
}

function maybeHideSidebar() {
  if (window.innerWidth > 900) return;
  hideSidebar();
}

function isSupportedSwipePointerType(pointerType) {
  const normalized = typeof pointerType === "string" ? pointerType.toLowerCase() : "";
  if (!normalized) {
    return true;
  }
  return normalized === "touch" || normalized === "mouse" || normalized === "pen";
}

function isPrimarySwipePointer(event) {
  if (!isSupportedSwipePointerType(event.pointerType)) {
    return false;
  }
  if (event.isPrimary === false) {
    return false;
  }
  if (typeof event.button === "number" && event.button > 0) {
    return false;
  }
  return true;
}

function handleSidebarPointerDown(event) {
  if (!sidebarElement || window.innerWidth > 900) {
    return;
  }
  if (!isPrimarySwipePointer(event)) {
    return;
  }
  if (!sidebarElement.classList.contains("sidebar--visible")) {
    return;
  }
  swipeTracking = {
    pointerId: event.pointerId,
    pointerType: typeof event.pointerType === "string" ? event.pointerType.toLowerCase() : "",
    target: "sidebar",
    startX: event.clientX,
    startY: event.clientY,
    active: false,
  };
}

function handleChatPointerDown(event) {
  if (!chatElement || !sidebarElement || window.innerWidth > 900) {
    return;
  }
  if (!isPrimarySwipePointer(event)) {
    return;
  }
  if (sidebarElement.classList.contains("sidebar--visible")) {
    return;
  }
  swipeTracking = {
    pointerId: event.pointerId,
    pointerType: typeof event.pointerType === "string" ? event.pointerType.toLowerCase() : "",
    target: "chat",
    startX: event.clientX,
    startY: event.clientY,
    active: false,
  };
}

function handleSwipePointerMove(event) {
  if (!swipeTracking || event.pointerId !== swipeTracking.pointerId) {
    return;
  }
  if (!isSupportedSwipePointerType(swipeTracking.pointerType)) {
    swipeTracking = null;
    return;
  }

  if (
    swipeTracking.pointerType === "mouse" &&
    typeof event.buttons === "number" &&
    event.buttons === 0
  ) {
    swipeTracking = null;
    return;
  }

  const deltaX = event.clientX - swipeTracking.startX;
  const deltaY = event.clientY - swipeTracking.startY;

  if (!swipeTracking.active) {
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
      return;
    }
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      swipeTracking = null;
      return;
    }
    if (Math.abs(deltaX) >= 24) {
      swipeTracking.active = true;
    }
  }

  if (swipeTracking.active && event.cancelable) {
    event.preventDefault();
  }
}

function handleSwipePointerEnd(event) {
  if (!swipeTracking || event.pointerId !== swipeTracking.pointerId) {
    return;
  }

  if (swipeTracking.active) {
    const deltaX = event.clientX - swipeTracking.startX;
    if (swipeTracking.target === "sidebar" && deltaX < -60) {
      hideSidebar();
    } else if (swipeTracking.target === "chat" && deltaX > 60) {
      showSidebar();
    }
  }

  swipeTracking = null;
}

function cancelSwipeTracking() {
  swipeTracking = null;
}

function setupSwipeGestures() {
  if (!sidebarElement || !chatElement) {
    return;
  }
  sidebarElement.addEventListener("pointerdown", handleSidebarPointerDown);
  chatElement.addEventListener("pointerdown", handleChatPointerDown);
  window.addEventListener("pointermove", handleSwipePointerMove, { passive: false });
  window.addEventListener("pointerup", handleSwipePointerEnd);
  window.addEventListener("pointercancel", cancelSwipeTracking);
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
  closeProfile({ restoreFocus: false });
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

function closeSettings({ restoreFocus = true } = {}) {
  if (!settingsModal) return;
  if (settingsModal.hidden) return;
  settingsModal.hidden = true;
  if (!profileModal || profileModal.hidden) {
    document.body.classList.remove("modal-open");
  }
  const restoreTarget = settingsRestoreFocusTo;
  settingsRestoreFocusTo = null;
  if (!restoreFocus) return;
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
  applyChatWallpaper(activeChatId);
  updateThemeControls(activeTheme);
  updateWallpaperControls(activeWallpaper);
  updateProfileUI(activeProfile);
  updateFilterChips();
  renderChats();
  pruneDrafts();
  pruneAttachmentDrafts();
  renderChatView(null);
  resumePendingStatuses();
  buildEmojiPicker();
  initializeAuthUI();

  if (chatMessagesElement) {
    chatMessagesElement.addEventListener("scroll", () => {
      chatMessagesShouldStickToBottom = isElementNearBottom(chatMessagesElement);
    });
  }

  resetVoiceRecorder();
  if (callTimerInterval) {
    clearInterval(callTimerInterval);
    callTimerInterval = null;
  }
  if (callDisconnectWatcher) {
    clearTimeout(callDisconnectWatcher);
    callDisconnectWatcher = null;
  }
  cleanupActiveCallResources();
  activeCall = null;
  callOverlayRestoreFocusTo = null;
  if (callOverlayElement) {
    callOverlayElement.hidden = true;
    callOverlayElement.setAttribute("aria-hidden", "true");
    callOverlayElement.dataset.callState = CallState.IDLE;
    callOverlayElement.dataset.callType = "";
  }
  if (callOverlayControlsElement) {
    callOverlayControlsElement.hidden = true;
    callOverlayControlsElement.setAttribute("aria-hidden", "true");
  }
  if (callOverlayIncomingControlsElement) {
    callOverlayIncomingControlsElement.hidden = true;
    callOverlayIncomingControlsElement.setAttribute("aria-hidden", "true");
  }
  callOverlayControlButtons.forEach((button) => {
    const action = button.dataset.callControl;
    if (action === "mute" || action === "speaker") {
      button.setAttribute("aria-pressed", "false");
    }
    button.disabled = true;
    button.setAttribute("aria-disabled", "true");
  });
  if (callOverlayParticipantsElement) {
    callOverlayParticipantsElement.innerHTML = "";
    callOverlayParticipantsElement.removeAttribute("aria-label");
    callOverlayParticipantsElement.removeAttribute("aria-hidden");
  }
  if (callOverlayMediaElement) {
    callOverlayMediaElement.hidden = true;
  }
  if (callOverlayLocalVideoWrapper) {
    callOverlayLocalVideoWrapper.hidden = true;
  }
  if (callOverlayRemoteVideoWrapper) {
    callOverlayRemoteVideoWrapper.dataset.empty = "true";
  }

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
  if (quickPhotoButton) {
    quickPhotoButton.addEventListener("click", () => {
      openAttachmentPicker({ accept: "image/*", capture: "environment" });
    });
  }
  if (quickVideoButton) {
    quickVideoButton.addEventListener("click", () => {
      openAttachmentPicker({ accept: "video/*", capture: "environment" });
    });
  }
  if (quickVoiceButton) {
    quickVoiceButton.addEventListener("click", () => {
      if (voiceRecorderIsActive) {
        stopVoiceRecorder();
      } else {
        startVoiceRecorder();
      }
    });
  }
  if (voiceRecorderCancelButton) {
    voiceRecorderCancelButton.addEventListener("click", () => {
      stopVoiceRecorder();
    });
  }
  if (voiceRecorderSendButton) {
    voiceRecorderSendButton.addEventListener("click", () => {
      stopVoiceRecorder({ send: true });
    });
  }
  if (exportChatButton) {
    exportChatButton.addEventListener("click", exportActiveChat);
    exportChatButton.disabled = true;
  }
  toggleStarButton.addEventListener("click", toggleStar);
  toggleArchiveButton.addEventListener("click", toggleArchive);
  if (deleteChatButton) {
    deleteChatButton.addEventListener("click", deleteActiveChat);
    deleteChatButton.disabled = true;
  }
  if (manageParticipantsButton) {
    manageParticipantsButton.addEventListener("click", openManageParticipantsModal);
  }
  if (manageParticipantsSearchInput) {
    manageParticipantsSearchInput.addEventListener("input", handleManageParticipantsSearch);
  }
  if (chatParticipantsElement) {
    chatParticipantsElement.addEventListener("click", handleParticipantChipClick);
  }
  if (chatContactElement) {
    chatContactElement.addEventListener("click", handleChatContactClick);
  }
  if (manageParticipantsConfirmButton) {
    manageParticipantsConfirmButton.addEventListener("click", handleManageParticipantsConfirm);
  }
  if (manageParticipantsCloseButton) {
    manageParticipantsCloseButton.addEventListener("click", () => closeManageParticipantsModal());
  }
  if (manageParticipantsCancelButton) {
    manageParticipantsCancelButton.addEventListener("click", () => closeManageParticipantsModal());
  }
  if (manageParticipantsModal) {
    manageParticipantsModal.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.hasAttribute("data-close-modal")) {
        closeManageParticipantsModal();
      }
    });
    manageParticipantsModal.addEventListener("keydown", trapManageParticipantsFocus);
  }
  if (openMessageSearchButton) {
    openMessageSearchButton.addEventListener("click", () => {
      if (isMessageSearchOpen) {
        closeMessageSearch();
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

  if (newContactForm) {
    newContactForm.addEventListener("submit", handleNewContactSubmit);
    newContactForm.addEventListener("input", () => updateNewContactPreview());
  }
  if (newContactNicknameInput) {
    newContactNicknameInput.addEventListener("input", handleContactLookupInput);
  }
  if (newContactEmailInput) {
    newContactEmailInput.addEventListener("input", handleContactLookupInput);
  }
  if (newContactSuggestionsList) {
    newContactSuggestionsList.addEventListener("click", handleContactSuggestionClick);
  }
  newContactMethodInputs.forEach((input) => {
    input.addEventListener("change", (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement) {
        setActiveContactMethod(target.value, { focus: true });
      }
    });
  });
  if (newContactCancelButton) {
    newContactCancelButton.addEventListener("click", () => {
      showNewChatView("list");
      if (newChatSearchInput instanceof HTMLElement) {
        newChatSearchInput.focus();
      }
    });
  }
  if (newContactCloseButton) {
    newContactCloseButton.addEventListener("click", () => closeNewContactModal());
  }
  if (newContactBackButton) {
    newContactBackButton.addEventListener("click", () => {
      showNewChatView("list");
      if (newChatSearchInput instanceof HTMLElement) {
        newChatSearchInput.focus();
      }
    });
  }
  if (newContactModal) {
    newContactModal.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.hasAttribute("data-close-modal")) {
        closeNewContactModal();
      }
    });
    newContactModal.addEventListener("keydown", trapNewContactFocus);
  }
  if (newChatAddContactButton) {
    newChatAddContactButton.addEventListener("click", handleStartNewContact);
  }
  if (newChatSearchInput) {
    newChatSearchInput.addEventListener("input", handleNewChatSearch);
  }
  if (newChatContactListElement) {
    newChatContactListElement.addEventListener("click", handleNewChatContactClick);
  }
  setActiveContactMethod(getActiveNewContactMethod());

  if (profileButton) {
    profileButton.addEventListener("click", openProfile);
  }
  if (profileCloseButton) {
    profileCloseButton.addEventListener("click", () => closeProfile());
  }
  if (profileCancelButton) {
    profileCancelButton.addEventListener("click", () => closeProfile());
  }
  if (profileForm) {
    profileForm.addEventListener("submit", handleProfileSubmit);
  }
  if (profileModal) {
    profileModal.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.hasAttribute("data-close-modal")) {
        closeProfile();
      }
    });
    profileModal.addEventListener("keydown", trapProfileFocus);
  }

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
  if (chatWallpaperButton) {
    chatWallpaperButton.addEventListener("click", openChatWallpaperModal);
  }
  if (chatWallpaperCloseButton) {
    chatWallpaperCloseButton.addEventListener("click", () => closeChatWallpaperModal());
  }
  if (chatWallpaperUseDefaultButton) {
    chatWallpaperUseDefaultButton.addEventListener("click", handleChatWallpaperUseDefault);
  }
  if (chatWallpaperForm) {
    chatWallpaperForm.addEventListener("submit", handleChatWallpaperSubmit);
  }
  if (chatWallpaperModal) {
    chatWallpaperModal.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.hasAttribute("data-close-modal")) {
        closeChatWallpaperModal();
      }
    });
    chatWallpaperModal.addEventListener("keydown", trapChatWallpaperFocus);
  }
  if (startAudioCallButton) {
    startAudioCallButton.addEventListener("click", () => startCall(CallType.AUDIO));
  }
  if (startVideoCallButton) {
    startVideoCallButton.addEventListener("click", () => startCall(CallType.VIDEO));
  }
  if (callOverlayAcceptButton) {
    callOverlayAcceptButton.addEventListener("click", () => {
      acceptIncomingCall();
    });
  }
  if (callOverlayDeclineButton) {
    callOverlayDeclineButton.addEventListener("click", () => {
      declineIncomingCall({ notifyRemote: true });
    });
  }
  if (callOverlayCloseButton) {
    callOverlayCloseButton.addEventListener("click", handleCallOverlayClose);
  }
  if (callOverlayBackdrop) {
    callOverlayBackdrop.addEventListener("click", handleCallOverlayClose);
  }
  if (callOverlayElement) {
    callOverlayElement.addEventListener("keydown", trapCallOverlayFocus);
  }
  callOverlayControlButtons.forEach((button) => {
    button.addEventListener("click", handleCallControl);
  });
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
  setupSwipeGestures();

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      chats = loadState();
      drafts = loadDrafts();
      attachmentDrafts = loadAttachmentDrafts();
      contacts = sortContacts(loadContacts());
      chatWallpaperOverrides = loadChatWallpaperOverrides();
      activeProfile = loadProfile();
      activeTheme = loadTheme();
      applyTheme(activeTheme);
      updateThemeControls(activeTheme);
      activeWallpaper = loadWallpaper();
      applyChatWallpaper(activeChatId);
      updateWallpaperControls(activeWallpaper);
      updateProfileUI(activeProfile);
      if (profileModal && !profileModal.hidden) {
        populateProfileForm(activeProfile);
      }
      pruneDrafts();
      pruneAttachmentDrafts();
      pendingAttachments = activeChatId ? getAttachmentDraft(activeChatId) : [];
      renderChats(chatSearchInput.value);
      renderChatView(getActiveChat());
      renderComposerAttachments();
      resumePendingStatuses();
    }
  });
  if (typeof window !== "undefined") {
    window.addEventListener("focus", () => {
      resumePendingStatuses();
    });
  }

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

    if (newContactModal && !newContactModal.hidden) {
      event.preventDefault();
      closeNewContactModal();
      return;
    }

    if (profileModal && !profileModal.hidden) {
      event.preventDefault();
      closeProfile();
      return;
    }

    if (callOverlayElement && !callOverlayElement.hidden) {
      event.preventDefault();
      endActiveCall({ reason: "Call ended" });
      return;
    }

    if (manageParticipantsModal && !manageParticipantsModal.hidden) {
      event.preventDefault();
      closeManageParticipantsModal();
      return;
    }

    if (settingsModal && !settingsModal.hidden) {
      closeSettings();
    }
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== AUTH_STORAGE_KEY) return;

    const parseAuthValue = (raw) => {
      if (typeof raw !== "string" || !raw) return null;
      try {
        const parsed = JSON.parse(raw);
        return normalizeAuthState(parsed);
      } catch (error) {
        return null;
      }
    };

    const nextAuth = parseAuthValue(event.newValue);
    const previousAuth = parseAuthValue(event.oldValue);
    authState = nextAuth;

    if (authState) {
      applyAuthenticatedUserToProfile(authState);
      reloadStateForActiveUser({ preserveChat: false });
      updateAuthUI();
      syncRealtimeConnection();
      return;
    }

    disconnectRealtime({ keepSocket: true });
    resetAppDataToDefaults({ auth: previousAuth, removeStoredData: false });
    setActiveAuthView(AuthView.LOGIN);
    updateAuthUI();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      showSidebar();
    }
  });

  showSidebar();
}

hydrate();
