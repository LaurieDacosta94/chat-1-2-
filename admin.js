(function () {
  const loginSection = document.getElementById('admin-login');
  const dashboardSection = document.getElementById('admin-dashboard');
  const loginForm = document.getElementById('admin-login-form');
  const loginError = document.getElementById('admin-login-error');
  const signOutButton = document.getElementById('admin-sign-out');
  const statusElement = document.getElementById('admin-status');
  const userTableBody = document.getElementById('admin-user-table');
  const emptyStateElement = document.getElementById('admin-user-empty');
  const reloadUsersButton = document.getElementById('reload-users');
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

  let authToken = null;
  let isFetchingUsers = false;

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

  function clearLoginError() {
    if (loginError) {
      loginError.hidden = true;
      loginError.textContent = '';
    }
  }

  function showLogin() {
    authToken = null;
    clearLoginError();
    if (dashboardSection) {
      dashboardSection.hidden = true;
    }
    if (loginSection) {
      loginSection.hidden = false;
    }
    if (signOutButton) {
      signOutButton.hidden = true;
    }
    setStatus('');
  }

  function showDashboard() {
    if (loginSection) {
      loginSection.hidden = true;
    }
    if (dashboardSection) {
      dashboardSection.hidden = false;
    }
    if (signOutButton) {
      signOutButton.hidden = false;
    }
  }

  async function request(path, { method = 'GET', body, headers = {} } = {}) {
    const finalHeaders = { ...headers };
    let finalBody = body;

    if (finalBody && typeof finalBody === 'object' && !(finalBody instanceof FormData)) {
      finalHeaders['Content-Type'] = finalHeaders['Content-Type'] || 'application/json';
      finalBody = JSON.stringify(finalBody);
    }

    if (authToken) {
      finalHeaders.Authorization = `Bearer ${authToken}`;
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
      if (response.status === 401) {
        showLogin();
      }
      const errorMessage = payload?.error || response.statusText || 'Request failed.';
      throw new Error(errorMessage);
    }

    return payload;
  }

  function renderUsers(users) {
    if (!userTableBody || !emptyStateElement) {
      return;
    }

    userTableBody.innerHTML = '';

    if (!Array.isArray(users) || users.length === 0) {
      emptyStateElement.hidden = false;
      return;
    }

    emptyStateElement.hidden = true;

    users.forEach((user) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.is_admin ? 'Admin' : 'User'}</td>
        <td>${formatTimestamp(user.created_at)}</td>
        <td class="admin-table__actions"></td>
      `;

      const actionsCell = row.querySelector('.admin-table__actions');
      if (actionsCell) {
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.className = 'admin-button admin-button--secondary';
        deleteButton.textContent = 'Delete';
        deleteButton.disabled = Boolean(user.is_admin);
        deleteButton.addEventListener('click', async () => {
          if (!window.confirm(`Delete user "${user.username}"?`)) {
            return;
          }
          try {
            await request(`/api/admin/users/${user.id}`, { method: 'DELETE' });
            setStatus(`Deleted user ${user.username}.`, 'success');
            await loadUsers({ silent: true });
          } catch (error) {
            setStatus(error.message || 'Failed to delete user.', 'error');
          }
        });
        actionsCell.appendChild(deleteButton);
      }

      userTableBody.appendChild(row);
    });
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
      await loadUsers({ silent: true });
    } catch (error) {
      setStatus(error.message || 'Failed to purge data.', 'error');
    }
  }

  loginForm?.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearLoginError();
    setStatus('');

    const formData = new FormData(loginForm);
    const username = formData.get('username');
    const password = formData.get('password');

    if (!username || !password) {
      if (loginError) {
        loginError.textContent = 'Username and password are required.';
        loginError.hidden = false;
      }
      return;
    }

    try {
      const payload = await request('/api/login', {
        method: 'POST',
        body: { username, password },
      });
      if (!payload?.token || !payload?.user) {
        throw new Error('Unexpected response from server.');
      }
      if (!payload.user.is_admin) {
        throw new Error('That account is not marked as an admin.');
      }

      authToken = payload.token;
      showDashboard();
      setStatus('Signed in as admin.', 'success');
      await loadUsers({ silent: true });
    } catch (error) {
      if (loginError) {
        loginError.textContent = error.message || 'Failed to sign in.';
        loginError.hidden = false;
      }
    }
  });

  signOutButton?.addEventListener('click', () => {
    showLogin();
    setStatus('Signed out.', 'info');
  });

  reloadUsersButton?.addEventListener('click', () => {
    loadUsers();
  });

  purgeMessagesButton?.addEventListener('click', () => {
    purgeData(false);
  });

  purgeEverythingButton?.addEventListener('click', () => {
    purgeData(true);
  });
})();
