(function () {
  const dashboardSection = document.getElementById('admin-dashboard');
  const statusElement = document.getElementById('admin-status');

  const userTableBody = document.getElementById('admin-user-table');
  const userEmptyState = document.getElementById('admin-user-empty');
  const reloadUsersButton = document.getElementById('reload-users');

  const messageTableBody = document.getElementById('admin-message-table');
  const messageEmptyState = document.getElementById('admin-message-empty');
  const reloadMessagesButton = document.getElementById('reload-messages');

  const activityListElement = document.getElementById('admin-activity-list');
  const activityEmptyState = document.getElementById('admin-activity-empty');
  const reloadActivitiesButton = document.getElementById('reload-activities');

  const purgeMessagesButton = document.getElementById('purge-messages');
  const purgeEverythingButton = document.getElementById('purge-everything');

  const apiBaseAttr = typeof document !== 'undefined' ? document.body?.dataset?.apiBase : '';
  const apiBaseFromDataset = typeof apiBaseAttr === 'string' ? apiBaseAttr.trim() : '';
  const API_BASE = (() => {
    if (apiBaseFromDataset) {
      return apiBaseFromDataset.replace(/\/+$/, '');
    }
    if (window.location.protocol === 'file:' || window.location.origin === 'null') {
      return 'http://localhost:3001';
    }
    return window.location.origin.replace(/\/+$/, '');
  })();

  let isFetchingUsers = false;
  let isFetchingMessages = false;
  let isFetchingActivities = false;

  function setStatus(message, tone = 'info') {
    if (!statusElement) {
      return;
    }
    if (!message) {
      statusElement.hidden = true;
      statusElement.textContent = '';
      delete statusElement.dataset.tone;
      return;
    }
    statusElement.textContent = message;
    statusElement.dataset.tone = tone;
    statusElement.hidden = false;
  }

  async function request(path, { method = 'GET', body, headers = {} } = {}) {
    const finalHeaders = { ...headers };
    let finalBody = body;

    if (finalBody && typeof finalBody === 'object' && !(finalBody instanceof FormData)) {
      finalHeaders['Content-Type'] = finalHeaders['Content-Type'] || 'application/json';
      finalBody = JSON.stringify(finalBody);
    }

    const response = await fetch(`${API_BASE}${path}`, {
      method,
      headers: finalHeaders,
      body: finalBody,
      cache: 'no-store',
    });

    const text = await response.text();
    let payload = null;
    if (text) {
      try {
        payload = JSON.parse(text);
      } catch (error) {
        payload = null;
      }
    }

    if (!response.ok) {
      const errorMessage = payload?.error || response.statusText || 'Request failed.';
      throw new Error(errorMessage);
    }

    return payload;
  }

  function formatTimestamp(value) {
    if (!value) {
      return '—';
    }
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return '—';
    }
    return date.toLocaleString();
  }

  function truncate(value, maxLength) {
    if (typeof value !== 'string') {
      return '';
    }
    if (value.length <= maxLength) {
      return value;
    }
    return `${value.slice(0, maxLength - 1)}…`;
  }

  function renderUsers(users) {
    if (!userTableBody || !userEmptyState) {
      return;
    }

    userTableBody.innerHTML = '';

    if (!Array.isArray(users) || users.length === 0) {
      userEmptyState.hidden = false;
      return;
    }

    userEmptyState.hidden = true;

    users.forEach((user) => {
      const row = document.createElement('tr');

      const idCell = document.createElement('td');
      idCell.textContent = user.id;
      row.appendChild(idCell);

      const usernameCell = document.createElement('td');
      usernameCell.textContent = user.username;
      row.appendChild(usernameCell);

      const roleCell = document.createElement('td');
      roleCell.textContent = user.is_admin ? 'Admin' : 'User';
      row.appendChild(roleCell);

      const createdCell = document.createElement('td');
      createdCell.textContent = formatTimestamp(user.created_at);
      row.appendChild(createdCell);

      const actionsCell = document.createElement('td');
      actionsCell.className = 'admin-table__actions';
      const deleteButton = document.createElement('button');
      deleteButton.type = 'button';
      deleteButton.className = 'admin-button admin-button--secondary';
      deleteButton.textContent = 'Delete';
      deleteButton.disabled = Boolean(user.is_admin);
      deleteButton.addEventListener('click', async () => {
        const confirmed = window.confirm(`Delete user "${user.username}"?`);
        if (!confirmed) {
          return;
        }
        try {
          await request(`/api/admin/users/${user.id}`, { method: 'DELETE' });
          setStatus(`Deleted user ${user.username}.`, 'success');
          await Promise.all([
            loadUsers({ silent: true }),
            loadActivities({ silent: true }),
          ]);
        } catch (error) {
          setStatus(error.message || 'Failed to delete user.', 'error');
        }
      });
      actionsCell.appendChild(deleteButton);
      row.appendChild(actionsCell);

      userTableBody.appendChild(row);
    });
  }

  function renderMessages(messages) {
    if (!messageTableBody || !messageEmptyState) {
      return;
    }

    messageTableBody.innerHTML = '';

    if (!Array.isArray(messages) || messages.length === 0) {
      messageEmptyState.hidden = false;
      return;
    }

    messageEmptyState.hidden = true;

    messages.forEach((message) => {
      const row = document.createElement('tr');

      const idCell = document.createElement('td');
      idCell.textContent = message.id;
      row.appendChild(idCell);

      const chatCell = document.createElement('td');
      chatCell.textContent = message.chat_id;
      row.appendChild(chatCell);

      const senderCell = document.createElement('td');
      senderCell.textContent = message.sender_username || message.sender_id || '—';
      row.appendChild(senderCell);

      const contentCell = document.createElement('td');
      contentCell.textContent = truncate(message.content || '', 120);
      contentCell.title = message.content || '';
      row.appendChild(contentCell);

      const timestampCell = document.createElement('td');
      timestampCell.textContent = formatTimestamp(message.timestamp);
      row.appendChild(timestampCell);

      messageTableBody.appendChild(row);
    });
  }

  function renderActivities(activities) {
    if (!activityListElement || !activityEmptyState) {
      return;
    }

    activityListElement.innerHTML = '';

    if (!Array.isArray(activities) || activities.length === 0) {
      activityEmptyState.hidden = false;
      return;
    }

    activityEmptyState.hidden = true;

    activities.forEach((activity) => {
      const item = document.createElement('li');
      item.className = 'admin-activity__item';

      const header = document.createElement('div');
      header.className = 'admin-activity__meta';
      const summary = document.createElement('span');
      summary.className = 'admin-activity__summary';
      summary.textContent = activity.summary || 'Activity';
      header.appendChild(summary);

      const timestamp = document.createElement('time');
      timestamp.dateTime = activity.timestamp || '';
      timestamp.textContent = formatTimestamp(activity.timestamp);
      header.appendChild(timestamp);

      item.appendChild(header);

      if (activity.details) {
        const detailsElement = document.createElement('pre');
        detailsElement.className = 'admin-activity__details';
        detailsElement.textContent = JSON.stringify(activity.details, null, 2);
        item.appendChild(detailsElement);
      }

      activityListElement.appendChild(item);
    });
  }

  async function loadUsers({ silent = false } = {}) {
    if (isFetchingUsers) {
      return;
    }
    isFetchingUsers = true;
    reloadUsersButton && (reloadUsersButton.disabled = true);
    try {
      const payload = await request('/api/admin/users');
      renderUsers(payload?.users || []);
      if (!silent) {
        setStatus('User list refreshed.', 'success');
      }
    } catch (error) {
      setStatus(error.message || 'Failed to load users.', 'error');
    } finally {
      isFetchingUsers = false;
      reloadUsersButton && (reloadUsersButton.disabled = false);
    }
  }

  async function loadMessages({ silent = false } = {}) {
    if (isFetchingMessages) {
      return;
    }
    isFetchingMessages = true;
    reloadMessagesButton && (reloadMessagesButton.disabled = true);
    try {
      const payload = await request('/api/admin/messages?limit=200');
      renderMessages(payload?.messages || []);
      if (!silent) {
        setStatus('Message log refreshed.', 'success');
      }
    } catch (error) {
      setStatus(error.message || 'Failed to load messages.', 'error');
    } finally {
      isFetchingMessages = false;
      reloadMessagesButton && (reloadMessagesButton.disabled = false);
    }
  }

  async function loadActivities({ silent = false } = {}) {
    if (isFetchingActivities) {
      return;
    }
    isFetchingActivities = true;
    reloadActivitiesButton && (reloadActivitiesButton.disabled = true);
    try {
      const payload = await request('/api/admin/activities?limit=200');
      renderActivities(payload?.activities || []);
      if (!silent) {
        setStatus('Activity feed refreshed.', 'success');
      }
    } catch (error) {
      setStatus(error.message || 'Failed to load activities.', 'error');
    } finally {
      isFetchingActivities = false;
      reloadActivitiesButton && (reloadActivitiesButton.disabled = false);
    }
  }

  async function purgeData(removeUsers) {
    const action = removeUsers ? 'messages and non-admin users' : 'all messages';
    const confirmed = window.confirm(
      `This will permanently delete ${action}. Are you sure you want to continue?`
    );
    if (!confirmed) {
      return;
    }

    try {
      const payload = await request('/api/admin/purge', {
        method: 'POST',
        body: { removeUsers },
      });
      const removedMessages =
        typeof payload?.removed?.messages === 'number' ? payload.removed.messages : null;
      const removedUsers = typeof payload?.removed?.users === 'number' ? payload.removed.users : null;
      const summaryParts = [];
      if (removedMessages !== null) {
        summaryParts.push(`${removedMessages} messages`);
      }
      if (removedUsers !== null) {
        summaryParts.push(`${removedUsers} users`);
      }
      const summary = summaryParts.length > 0 ? summaryParts.join(' & ') : 'data';
      setStatus(`Successfully purged ${summary}.`, 'success');
      await Promise.all([
        loadUsers({ silent: true }),
        loadMessages({ silent: true }),
        loadActivities({ silent: true }),
      ]);
    } catch (error) {
      setStatus(error.message || 'Failed to purge data.', 'error');
    }
  }

  reloadUsersButton?.addEventListener('click', () => {
    loadUsers();
  });

  reloadMessagesButton?.addEventListener('click', () => {
    loadMessages();
  });

  reloadActivitiesButton?.addEventListener('click', () => {
    loadActivities();
  });

  purgeMessagesButton?.addEventListener('click', () => {
    purgeData(false);
  });

  purgeEverythingButton?.addEventListener('click', () => {
    purgeData(true);
  });

  dashboardSection && (dashboardSection.hidden = false);
  setStatus('Loading admin data…');
  Promise.all([
    loadUsers({ silent: true }),
    loadMessages({ silent: true }),
    loadActivities({ silent: true }),
  ])
    .then(() => {
      setStatus('Dashboard ready.', 'success');
    })
    .catch((error) => {
      setStatus(error.message || 'Failed to load admin data.', 'error');
    });
})();
