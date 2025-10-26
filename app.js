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
const newContactMethodInputs = newContactForm
  ? Array.from(newContactForm.querySelectorAll('input[name="contact-method"]'))
  : [];
const newContactFieldGroups = newContactForm
  ? Array.from(newContactForm.querySelectorAll("[data-contact-fields]"))
  : [];
const newContactNicknameInput = document.getElementById("new-contact-nickname");
const newContactNicknameNotesInput = document.getElementById(
  "new-contact-nickname-notes"
);
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
const startPhoneCallButton = document.getElementById("start-phone-call");
const callPlanModal = document.getElementById("call-plan-modal");
const callPlanForm = document.getElementById("call-plan-form");
const callPlanCloseButton = document.getElementById("call-plan-close");
const callPlanCancelButton = document.getElementById("call-plan-cancel");
const callPlanSummaryElement = document.getElementById("call-plan-summary");
const callPlanConfirmButton = document.getElementById("call-plan-confirm");
const callOverlayElement = document.getElementById("call-overlay");
const callOverlayBackdrop = document.getElementById("call-overlay-backdrop");
const callOverlayCloseButton = document.getElementById("call-overlay-close");
const callOverlayTypeElement = document.getElementById("call-overlay-type");
const callOverlayAvatarElement = document.getElementById("call-overlay-avatar");
const callOverlayNameElement = document.getElementById("call-overlay-name");
const callOverlayStatusElement = document.getElementById("call-overlay-status");
const callOverlayControlButtons = Array.from(
  document.querySelectorAll("[data-call-control]")
);

const chatItemTemplate = document.getElementById("chat-item-template");
const messageTemplate = document.getElementById("message-template");

const STORAGE_KEY = "whatsapp-clone-state-v1";
const DRAFTS_STORAGE_KEY = "whatsapp-clone-drafts-v1";
const THEME_STORAGE_KEY = "whatsapp-clone-theme";
const WALLPAPER_STORAGE_KEY = "whatsapp-clone-wallpaper";
const ATTACHMENT_DRAFTS_STORAGE_KEY = "whatsapp-clone-attachment-drafts-v1";
const PROFILE_STORAGE_KEY = "whatsapp-clone-profile-v1";
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
  PHONE: "phone",
};

const CALL_TYPE_LABELS = {
  [CallType.AUDIO]: "Audio call",
  [CallType.VIDEO]: "Video call",
  [CallType.PHONE]: "Phone call",
};

const CALL_PLAN_SUMMARIES = {
  standard: "Unlimited domestic calling, HD audio quality.",
  pro: "Global calling bundle, voicemail transcription, call analytics.",
};

const CALL_PLAN_LABELS = {
  standard: "Standard plan",
  pro: "Pro plan",
};

const CONTACT_STATUS_MAX_LENGTH = 140;
const NEW_CONTACT_MAX_SOURCE_LENGTH = 2000;

const defaultProfile = {
  name: "Jordan Taylor",
  about: "Available",
  phone: "+1 (555) 010-3498",
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
    type: ChatType.GROUP,
    participants: [
      "Jordan Taylor",
      "Avery Shaw",
      "Mia Chen",
      "Sam Patel",
      "Luis Gomez",
    ],
    description: "Sprint planning crew",
    capabilities: { audio: true, video: true, phone: false },
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
    type: ChatType.GROUP,
    participants: ["Jordan Taylor", "Nora Ellis", "Kai Morgan", "Priya Das"],
    description: "Concept feedback",
    capabilities: { audio: true, video: true, phone: false },
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
    type: ChatType.DIRECT,
    capabilities: { audio: true, video: true, phone: true },
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
    type: ChatType.GROUP,
    participants: ["Jordan Taylor", "Mom", "Dad", "Alex", "Grandma"],
    description: "Weekend getaway",
    capabilities: { audio: true, video: true, phone: false },
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

function normalizeGroupParticipants(participants = []) {
  return participants
    .map((participant) =>
      typeof participant === "string" ? participant.trim() : ""
    )
    .filter(Boolean)
    .map((name) => truncateText(name, 60));
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

function normalizeContact(contact) {
  if (!contact || typeof contact !== "object") return null;

  const methodValue =
    typeof contact.method === "string" ? contact.method.toLowerCase() : "";
  const method = Object.values(ContactMethod).includes(methodValue)
    ? methodValue
    : ContactMethod.NICKNAME;

  const normalized = { method };

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
      return "Added via nickname";
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
  const normalizedName =
    typeof chat.name === "string" && chat.name.trim()
      ? chat.name.trim()
      : normalizedContact?.displayName ?? "New chat";

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
    description,
    capabilities,
    ...(normalizedContact && normalizedType !== ChatType.GROUP
      ? { contact: normalizedContact }
      : {}),
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
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return { ...defaultProfile };
    const parsed = JSON.parse(raw);
    return normalizeProfile(parsed);
  } catch (error) {
    console.error("Failed to load profile", error);
    return { ...defaultProfile };
  }
}

function saveProfile(profile) {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
}

function getInitials(name = "") {
  const trimmed = name.trim();
  if (!trimmed) return "JT";
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (!parts.length) return "JT";
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

  if (profileAvatarElement) {
    profileAvatarElement.textContent = initials;
  }
  if (profileModalAvatarElement) {
    profileModalAvatarElement.textContent = initials;
  }
  if (profileNameElement) {
    profileNameElement.textContent = nextProfile.name;
  }
  if (profileSummaryNameElement) {
    profileSummaryNameElement.textContent = nextProfile.name;
  }
  const aboutCopy = nextProfile.about?.trim() || defaultProfile.about;
  if (profileAboutElement) {
    profileAboutElement.textContent = aboutCopy;
  }
  if (profileSummaryAboutElement) {
    profileSummaryAboutElement.textContent = aboutCopy;
  }
  if (profileButton) {
    profileButton.setAttribute("aria-label", `Open profile for ${nextProfile.name}`);
    profileButton.title = `${nextProfile.name}'s profile`;
  }
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
let activeProfile = loadProfile();
let activeTheme = loadTheme();
let activeWallpaper = loadWallpaper();
let activeChatId = null;
let activeFilter = Filter.ALL;
let settingsRestoreFocusTo = null;
let profileRestoreFocusTo = null;
let newContactRestoreFocusTo = null;
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

function updateCallControls(chat) {
  const type = chat?.type ?? ChatType.DIRECT;
  const capabilities = chat?.capabilities ?? {};
  const hasChat = Boolean(chat);
  const audioEnabled = hasChat && capabilities.audio !== false;
  const videoEnabled = hasChat && capabilities.video !== false;
  const phoneEnabled =
    hasChat && type !== ChatType.GROUP && capabilities.phone === true;

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

  if (startPhoneCallButton) {
    startPhoneCallButton.disabled = !phoneEnabled;
    startPhoneCallButton.setAttribute(
      "aria-disabled",
      phoneEnabled ? "false" : "true"
    );
    let title = "Start direct phone call";
    if (!hasChat) {
      title = "Select a chat to place a phone call";
    } else if (type === ChatType.GROUP) {
      title = "Direct phone calls are only available in 1:1 chats";
    } else if (!phoneEnabled) {
      title = "Direct phone calls unavailable";
    }
    startPhoneCallButton.title = title;
  }
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
    resetVoiceRecorder();
    renderComposerAttachments();
    updateCallControls(null);
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
  resetVoiceRecorder();
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

function createChat(nameInput, options = {}) {
  const {
    status: statusOverride,
    contact: contactDetails,
    avatar: avatarOverride,
    type: typeOverride,
    participants: participantsOverride,
    description: descriptionOverride,
    capabilities: capabilitiesOverride,
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
    description,
    capabilities,
  };

  if (normalizedContact && normalizedType !== ChatType.GROUP) {
    newChat.contact = normalizedContact;
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
  const elapsed = Math.max(0, Math.round((Date.now() - voiceRecorderStartedAt) / 1000));
  voiceRecorderTimerElement.textContent = formatVoiceDuration(elapsed);
}

function startVoiceRecorder() {
  if (!voiceRecorderElement || voiceRecorderIsActive) return;
  const chat = getActiveChat();
  if (!chat) {
    showToast("Select a chat to record a voice message");
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
  voiceRecorderTimerId = window.setInterval(updateVoiceRecorderTimer, 500);
}

function stopVoiceRecorder({ send = false, suppressToast = false } = {}) {
  const wasActive = voiceRecorderIsActive;
  if (voiceRecorderTimerId) {
    clearInterval(voiceRecorderTimerId);
    voiceRecorderTimerId = null;
  }
  const elapsedSeconds = wasActive
    ? Math.max(1, Math.round((Date.now() - voiceRecorderStartedAt) / 1000))
    : 0;
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

  if (send && elapsedSeconds > 0) {
    const chat = getActiveChat();
    if (!chat) {
      if (!suppressToast) {
        showToast("Select a chat to send voice messages");
      }
      return;
    }
    const attachment = createVoiceNoteAttachment(elapsedSeconds);
    if (attachment) {
      addMessageToChat(chat.id, "", "outgoing", [attachment]);
      if (!suppressToast) {
        showToast("Voice message sent");
      }
    }
  } else if (wasActive && !suppressToast) {
    showToast("Voice recording canceled");
  }
}

function resetVoiceRecorder() {
  stopVoiceRecorder({ suppressToast: true });
}

function updateCallPlanSummary(plan) {
  if (!callPlanSummaryElement) return;
  const summary = CALL_PLAN_SUMMARIES[plan] ?? CALL_PLAN_SUMMARIES.standard;
  callPlanSummaryElement.textContent = summary;
}

function openCallPlanModal() {
  if (!callPlanModal || !callPlanForm) return;
  const chat = getActiveChat();
  if (!chat) {
    showToast("Select a chat to place a phone call");
    return;
  }
  if (chat.type === ChatType.GROUP) {
    showToast("Direct phone calls are only available in 1:1 chats");
    return;
  }
  if (!callPlanModal.hidden) return;

  if (profileModal && !profileModal.hidden) {
    closeProfile({ restoreFocus: false });
  }
  if (settingsModal && !settingsModal.hidden) {
    closeSettings({ restoreFocus: false });
  }

  callPlanRestoreFocusTo =
    document.activeElement instanceof HTMLElement ? document.activeElement : startPhoneCallButton;

  const selectedPlanInput = callPlanForm.querySelector('input[name="call-plan"]:checked');
  const selectedPlan = selectedPlanInput instanceof HTMLInputElement ? selectedPlanInput.value : "standard";
  updateCallPlanSummary(selectedPlan);

  callPlanModal.hidden = false;
  document.body.classList.add("modal-open");

  if (selectedPlanInput instanceof HTMLInputElement) {
    selectedPlanInput.focus();
  }
}

function closeCallPlanModal({ restoreFocus = true } = {}) {
  if (!callPlanModal || callPlanModal.hidden) return;

  callPlanModal.hidden = true;
  if (
    (!newContactModal || newContactModal.hidden) &&
    (!profileModal || profileModal.hidden) &&
    (!settingsModal || settingsModal.hidden)
  ) {
    document.body.classList.remove("modal-open");
  }

  const restoreTarget = callPlanRestoreFocusTo;
  callPlanRestoreFocusTo = null;

  if (restoreFocus && restoreTarget instanceof HTMLElement) {
    restoreTarget.focus();
  }
}

function trapCallPlanFocus(event) {
  if (!callPlanModal || callPlanModal.hidden) return;
  if (event.key !== "Tab") return;

  const focusableSelectors =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const focusable = Array.from(callPlanModal.querySelectorAll(focusableSelectors)).filter(
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

function handleCallPlanSubmit(event) {
  event.preventDefault();
  if (!callPlanForm) return;
  const formData = new FormData(callPlanForm);
  const selectedPlan = (formData.get("call-plan") || "standard").toString();
  closeCallPlanModal({ restoreFocus: false });
  startCall(CallType.PHONE, { plan: selectedPlan });
}

function startCall(callType, { plan = null } = {}) {
  const chat = getActiveChat();
  if (!chat) {
    showToast("Select a chat to start a call");
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
  if (callType === CallType.PHONE) {
    if (chat.type === ChatType.GROUP) {
      showToast("Direct phone calls are only available in 1:1 chats");
      return;
    }
    if (capabilities.phone !== true) {
      showToast("Direct phone calls unavailable");
      return;
    }
  }

  openCallOverlay({ chat, type: callType, plan });
}

function updateCallOverlayTimer() {
  if (!activeCall || !callOverlayStatusElement) return;
  if (!activeCall.startedAt) {
    callOverlayStatusElement.textContent = "Connecting…";
    return;
  }
  const elapsed = Math.max(0, Math.round((Date.now() - activeCall.startedAt) / 1000));
  callOverlayStatusElement.textContent = `Call in progress · ${formatVoiceDuration(elapsed)}`;
}

function openCallOverlay({ chat, type, plan = null }) {
  if (!callOverlayElement) return;
  if (callTimerInterval) {
    clearInterval(callTimerInterval);
    callTimerInterval = null;
  }
  if (callConnectionTimeout) {
    clearTimeout(callConnectionTimeout);
    callConnectionTimeout = null;
  }

  activeCall = {
    chatId: chat.id,
    type,
    plan,
    startedAt: null,
  };

  callOverlayControlButtons.forEach((button) => {
    const action = button.dataset.callControl;
    if (action === "mute" || action === "speaker") {
      button.setAttribute("aria-pressed", "false");
    }
  });

  const typeLabel = CALL_TYPE_LABELS[type] ?? "Call";
  const planLabel = plan && CALL_PLAN_LABELS[plan] ? ` — ${CALL_PLAN_LABELS[plan]}` : "";
  if (callOverlayTypeElement) {
    callOverlayTypeElement.textContent = `${typeLabel}${planLabel}`;
  }
  if (callOverlayAvatarElement) {
    callOverlayAvatarElement.textContent = chat.avatar ?? chat.name.slice(0, 2).toUpperCase();
  }
  if (callOverlayNameElement) {
    callOverlayNameElement.textContent = chat.name;
  }
  if (callOverlayStatusElement) {
    callOverlayStatusElement.textContent = "Connecting…";
  }

  callOverlayRestoreFocusTo =
    document.activeElement instanceof HTMLElement ? document.activeElement : null;

  callOverlayElement.hidden = false;
  callOverlayElement.setAttribute("aria-hidden", "false");
  if (callOverlayCloseButton) {
    callOverlayCloseButton.focus();
  }

  callConnectionTimeout = window.setTimeout(() => {
    if (!activeCall) return;
    activeCall.startedAt = Date.now();
    updateCallOverlayTimer();
    callTimerInterval = window.setInterval(updateCallOverlayTimer, 1000);
  }, 800);
}

function closeCallOverlay({ restoreFocus = true, showToastMessage } = {}) {
  if (!callOverlayElement || callOverlayElement.hidden) return;

  callOverlayElement.hidden = true;
  callOverlayElement.setAttribute("aria-hidden", "true");
  if (callTimerInterval) {
    clearInterval(callTimerInterval);
    callTimerInterval = null;
  }
  if (callConnectionTimeout) {
    clearTimeout(callConnectionTimeout);
    callConnectionTimeout = null;
  }

  callOverlayControlButtons.forEach((button) => {
    const action = button.dataset.callControl;
    if (action === "mute" || action === "speaker") {
      button.setAttribute("aria-pressed", "false");
    }
  });

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

function endActiveCall({ reason = "Call ended", suppressToast = false } = {}) {
  if (!activeCall) return;
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
      showToast(next ? "Microphone muted" : "Microphone unmuted");
      break;
    }
    case "speaker": {
      const pressed = button.getAttribute("aria-pressed") === "true";
      const next = !pressed;
      button.setAttribute("aria-pressed", next ? "true" : "false");
      showToast(next ? "Speakerphone on" : "Speakerphone off");
      break;
    }
    case "end": {
      endActiveCall({ reason: "Call ended" });
      break;
    }
    default:
      break;
  }
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
}

function resetNewContactForm() {
  if (!newContactForm) return;
  newContactForm.reset();
  setActiveContactMethod(getActiveNewContactMethod());
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
      const notes = newContactNicknameNotesInput?.value.trim() ?? "";
      if (!nickname && strict) {
        if (showErrors) {
          showToast("Enter a nickname");
          newContactNicknameInput?.focus();
        }
        return null;
      }
      contact.nickname = nickname;
      contact.displayName = nickname;
      contact.notes = notes;
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
  const methodLabel = getContactMethodLabel(contact.method);
  const details = [];
  if (status) details.push(status);
  if (methodLabel) details.push(`Added from ${methodLabel}`);
  const description = details.join(" • ") || "Ready to start chatting.";

  newContactPreviewElement.innerHTML = "";
  const nameNode = document.createElement("strong");
  nameNode.textContent = displayName;
  newContactPreviewElement.appendChild(nameNode);
  const descriptionNode = document.createElement("span");
  descriptionNode.textContent = description;
  newContactPreviewElement.appendChild(descriptionNode);
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
  setActiveContactMethod(getActiveNewContactMethod(), { focus: true });

  newContactModal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeNewContactModal({ restoreFocus = true } = {}) {
  if (!newContactModal) return;
  if (newContactModal.hidden) return;

  newContactModal.hidden = true;
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

  const status = deriveContactStatus(contact);
  const chat = createChat(contact.displayName, { status, contact });
  const methodLabel = getContactMethodLabel(contact.method);
  showToast(`Started a chat with ${chat.name} via ${methodLabel}`);
  closeNewContactModal();
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
let voiceRecorderTimerId = null;
let voiceRecorderStartedAt = 0;
let voiceRecorderIsActive = false;
let activeCall = null;
let callTimerInterval = null;
let callConnectionTimeout = null;
let callPlanRestoreFocusTo = null;
let callOverlayRestoreFocusTo = null;
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
  applyWallpaper(activeWallpaper);
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

  resetVoiceRecorder();
  if (callTimerInterval) {
    clearInterval(callTimerInterval);
    callTimerInterval = null;
  }
  if (callConnectionTimeout) {
    clearTimeout(callConnectionTimeout);
    callConnectionTimeout = null;
  }
  activeCall = null;
  callOverlayRestoreFocusTo = null;
  if (callOverlayElement) {
    callOverlayElement.hidden = true;
    callOverlayElement.setAttribute("aria-hidden", "true");
  }
  callOverlayControlButtons.forEach((button) => {
    const action = button.dataset.callControl;
    if (action === "mute" || action === "speaker") {
      button.setAttribute("aria-pressed", "false");
    }
  });

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

  if (newContactForm) {
    newContactForm.addEventListener("submit", handleNewContactSubmit);
    newContactForm.addEventListener("input", () => updateNewContactPreview());
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
    newContactCancelButton.addEventListener("click", () => closeNewContactModal());
  }
  if (newContactCloseButton) {
    newContactCloseButton.addEventListener("click", () => closeNewContactModal());
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
  if (startAudioCallButton) {
    startAudioCallButton.addEventListener("click", () => startCall(CallType.AUDIO));
  }
  if (startVideoCallButton) {
    startVideoCallButton.addEventListener("click", () => startCall(CallType.VIDEO));
  }
  if (startPhoneCallButton) {
    startPhoneCallButton.addEventListener("click", openCallPlanModal);
  }
  if (callPlanForm) {
    callPlanForm.addEventListener("submit", handleCallPlanSubmit);
    callPlanForm.addEventListener("change", (event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement && target.name === "call-plan") {
        updateCallPlanSummary(target.value);
      }
    });
  }
  if (callPlanCloseButton) {
    callPlanCloseButton.addEventListener("click", () => closeCallPlanModal());
  }
  if (callPlanCancelButton) {
    callPlanCancelButton.addEventListener("click", () => closeCallPlanModal());
  }
  if (callPlanModal) {
    callPlanModal.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.hasAttribute("data-close-modal")) {
        closeCallPlanModal();
      }
    });
    callPlanModal.addEventListener("keydown", trapCallPlanFocus);
  }
  if (callOverlayCloseButton) {
    callOverlayCloseButton.addEventListener("click", () => {
      endActiveCall({ reason: "Call ended" });
    });
  }
  if (callOverlayBackdrop) {
    callOverlayBackdrop.addEventListener("click", () => {
      endActiveCall({ reason: "Call ended" });
    });
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

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      chats = loadState();
      drafts = loadDrafts();
      attachmentDrafts = loadAttachmentDrafts();
      activeProfile = loadProfile();
      activeTheme = loadTheme();
      applyTheme(activeTheme);
      updateThemeControls(activeTheme);
      activeWallpaper = loadWallpaper();
      applyWallpaper(activeWallpaper);
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

    if (callPlanModal && !callPlanModal.hidden) {
      event.preventDefault();
      closeCallPlanModal();
      return;
    }

    if (callOverlayElement && !callOverlayElement.hidden) {
      event.preventDefault();
      endActiveCall({ reason: "Call ended" });
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
