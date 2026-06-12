'use strict';

(function () {
  const selector = '[component="composer"] textarea.write, .composer textarea.write, .page-compose textarea.write';
  const mobileQuery = window.matchMedia('(max-width: 767.98px)');
  const topicApiPattern = /\/api\/v3\/topics(?:$|[?#/])/;

  function getLimits() {
    const mobile = mobileQuery.matches;
    const viewport = Math.max(window.innerHeight || 0, 520);
    const min = mobile ? 124 : 144;
    const max = Math.round(viewport * (mobile ? 0.42 : 0.46));

    return {
      min,
      max: Math.max(max, mobile ? 208 : 280),
    };
  }

  function getComposer(textarea) {
    return textarea && textarea.closest('[component="composer"], .composer, .page-compose');
  }

  function resizeTextarea(textarea) {
    const composer = getComposer(textarea);
    if (!composer) {
      return;
    }

    const mobile = mobileQuery.matches;
    const composePage = document.body.classList.contains('page-compose') || document.body.classList.contains('template-compose');
    const limits = getLimits();

    textarea.style.boxSizing = 'border-box';
    textarea.style.minHeight = `${limits.min}px`;
    textarea.style.maxHeight = `${limits.max}px`;
    textarea.style.height = 'auto';

    const nextHeight = Math.min(limits.max, Math.max(limits.min, textarea.scrollHeight + 2));
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > limits.max ? 'auto' : 'hidden';

    const writePreview = composer.querySelector('.write-preview-container');
    const writeContainer = composer.querySelector('.write-container');

    if (writePreview && (mobile || composePage)) {
      writePreview.style.height = 'auto';
      writePreview.style.minHeight = '0';
    }

    if (writeContainer && (mobile || composePage)) {
      writeContainer.style.minHeight = '0';
    }
  }

  function bindTextarea(textarea) {
    if (!textarea || textarea.dataset.sgtalkAutosizeComposer === '1') {
      if (textarea) {
        resizeTextarea(textarea);
      }
      return;
    }

    textarea.dataset.sgtalkAutosizeComposer = '1';
    textarea.addEventListener('input', () => resizeTextarea(textarea));
    textarea.addEventListener('change', () => resizeTextarea(textarea));

    requestAnimationFrame(() => resizeTextarea(textarea));
    window.setTimeout(() => resizeTextarea(textarea), 80);
    window.setTimeout(() => resizeTextarea(textarea), 260);
  }

  function scan(root) {
    const scope = root && root.querySelectorAll ? root : document;
    const textareas = [];

    if (scope.matches && scope.matches(selector)) {
      textareas.push(scope);
    }

    scope.querySelectorAll(selector).forEach((textarea) => textareas.push(textarea));
    textareas.forEach(bindTextarea);
  }

  function scanLater(root) {
    requestAnimationFrame(() => scan(root));
    window.setTimeout(() => scan(root), 120);
  }

  function getProfileHref(user) {
    const relativePath = (window.config && window.config.relative_path) || '';
    return user && user.userslug ? `${relativePath}/user/${user.userslug}` : `${relativePath}/me`;
  }

  function getAvatarText(user) {
    const source = (user && (user['icon:text'] || user.username || user.displayname)) || '我';
    return String(source).trim().slice(0, 1).toUpperCase() || '我';
  }

  function getUsernameFromAvatar(avatar) {
    if (!avatar) return 'user';
    let username = avatar.getAttribute('title') || avatar.getAttribute('data-original-title') || avatar.getAttribute('data-username');
    if (username) return username.trim();

    const parentLink = avatar.closest('a');
    if (parentLink && parentLink.getAttribute('href')) {
      const href = parentLink.getAttribute('href');
      const match = href.match(/\/user\/([^/]+)/);
      if (match) return match[1];
    }

    const childLink = avatar.querySelector('a');
    if (childLink && childLink.getAttribute('href')) {
      const href = childLink.getAttribute('href');
      const match = href.match(/\/user\/([^/]+)/);
      if (match) return match[1];
    }

    const text = avatar.textContent.trim();
    if (text && text.length > 0 && text.length <= 4) {
      return text;
    }

    return 'user';
  }

  function getMerlionSvgString(bgColor, username) {
    let color = bgColor || '#e62929';
    const isHex = color && /^#([0-9A-F]{3}){1,2}$/i.test(color);
    if (!isHex && !color.startsWith('hsl')) {
      color = '#eef2f7';
    }

    const source = String(username || 'user').trim();
    const initial = (Array.from(source)[0] || 'U').toUpperCase()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
    let textColor = '#1d2530';
    if (isHex) {
      const raw = color.slice(1);
      const full = raw.length === 3 ? raw.split('').map((char) => char + char).join('') : raw;
      const r = parseInt(full.slice(0, 2), 16);
      const g = parseInt(full.slice(2, 4), 16);
      const b = parseInt(full.slice(4, 6), 16);
      const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      textColor = luminance < 0.62 ? '#ffffff' : '#1d2530';
    }

    return '<svg class="sg-merlion-svg sg-initial-avatar" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%; border-radius: 4px;">' +
      '<rect width="64" height="64" rx="6" fill="' + color + '"/>' +
      '<text x="50%" y="53%" text-anchor="middle" dominant-baseline="middle" fill="' + textColor + '" font-family="Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="30" font-weight="800">' + initial + '</text>' +
      '</svg>';
  }

  function paintAvatar(target, user) {
    if (!target) {
      return;
    }

    const picture = user && user.picture;
    const bg = (user && user['icon:bgColor']) || '#eef2f7';
    const username = (user && user.username) || 'user';

    target.textContent = '';
    target.style.backgroundColor = '';
    target.classList.toggle('sg-has-picture', Boolean(picture));

    if (picture) {
      const img = document.createElement('img');
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.src = picture;
      target.appendChild(img);
      return;
    }

    target.style.backgroundColor = 'transparent';
    target.innerHTML = getMerlionSvgString(bg, username);
  }

  function replaceDefaultAvatars() {
    // Replace text-based default avatars (including letters)
    document.querySelectorAll('.avatar:not(.sg-has-picture), [component="avatar/icon"]').forEach((avatar) => {
      if (avatar.querySelector('.sg-merlion-svg') || avatar.querySelector('img')) {
        return;
      }
      const bg = avatar.style.backgroundColor || window.getComputedStyle(avatar).backgroundColor || '#eef2f7';
      const username = getUsernameFromAvatar(avatar);
      avatar.textContent = '';
      avatar.style.backgroundColor = 'transparent';

      avatar.innerHTML = getMerlionSvgString(bg, username);
    });

    // Keep provider photos, including Google avatars. Only text/icon avatars are
    // replaced, so real profile photos remain visible across lists and profiles.
  }

  let selectedMerlionColor = '#e62929';

  function injectMerlionPicker() {
    const editContainer = document.querySelector('.account [component="avatar/change"], .account .edit-avatar-container');
    if (!editContainer || document.querySelector('.sg-merlion-picker-section')) {
      return;
    }

    const section = document.createElement('div');
    section.className = 'sg-merlion-picker-section mt-4 p-3 border rounded-2';
    section.style.maxWidth = '400px';
    section.style.borderColor = 'var(--sg-border)';
    section.style.background = 'var(--sg-surface-soft)';
    section.innerHTML = `
      <h5 class="fw-bold mb-2" style="font-size:14px; color: var(--sg-text);">预设简洁字母头像</h5>
      <p class="mb-3" style="font-size:12px; color: var(--sg-muted);">点击下方颜色实时预览头像效果，确认满意后点击“保存并使用”。</p>

      <div class="d-flex align-items-center gap-3 mb-3">
        <div id="sg-merlion-preview-box" style="width: 80px; height: 80px; border: 1px solid var(--sg-border); border-radius: 4px; overflow: hidden; background: #f8fafc;">
        </div>
        <div>
          <button id="sg-merlion-save-btn" class="btn btn-sm btn-primary px-3" style="background-color: var(--primary-color); border-color: var(--primary-color); font-weight: bold;">保存并使用</button>
        </div>
      </div>

      <div class="d-flex flex-wrap gap-2 mb-3 align-items-center" id="sg-merlion-presets">
        <button class="sg-merlion-color-btn" data-color="#e62929" style="width:30px; height:30px; border-radius:50%; border:2px solid #fff; background:#e62929; box-shadow:0 0 0 1px #ccc;" title="明亮红"></button>
        <button class="sg-merlion-color-btn" data-color="#2563eb" style="width:30px; height:30px; border-radius:50%; border:2px solid #fff; background:#2563eb; box-shadow:0 0 0 1px #ccc;" title="海洋蓝"></button>
        <button class="sg-merlion-color-btn" data-color="#10b981" style="width:30px; height:30px; border-radius:50%; border:2px solid #fff; background:#10b981; box-shadow:0 0 0 1px #ccc;" title="翡翠绿"></button>
        <button class="sg-merlion-color-btn" data-color="#f59e0b" style="width:30px; height:30px; border-radius:50%; border:2px solid #fff; background:#f59e0b; box-shadow:0 0 0 1px #ccc;" title="黄金橙"></button>
        <button class="sg-merlion-color-btn" data-color="#f472b6" style="width:30px; height:30px; border-radius:50%; border:2px solid #fff; background:#f472b6; box-shadow:0 0 0 1px #ccc;" title="甜美粉"></button>
        <button class="sg-merlion-color-btn" data-color="#8b5cf6" style="width:30px; height:30px; border-radius:50%; border:2px solid #fff; background:#8b5cf6; box-shadow:0 0 0 1px #ccc;" title="皇家紫"></button>
        <button class="sg-merlion-color-btn" data-color="#64748b" style="width:30px; height:30px; border-radius:50%; border:2px solid #fff; background:#64748b; box-shadow:0 0 0 1px #ccc;" title="冷酷灰"></button>
        <button class="sg-merlion-color-btn" data-color="#1a202c" style="width:30px; height:30px; border-radius:50%; border:2px solid #fff; background:#1a202c; box-shadow:0 0 0 1px #ccc;" title="极夜黑"></button>
      </div>
      <div id="sg-merlion-status" class="text-success small fw-bold d-none">正在生成并上传头像...</div>
    `;

    editContainer.parentNode.insertBefore(section, editContainer.nextSibling);

    const previewBox = document.getElementById('sg-merlion-preview-box');
    const updatePreview = (color) => {
      selectedMerlionColor = color;
      const username = (window.app && window.app.user && window.app.user.username) || 'user';
      previewBox.innerHTML = getMerlionSvgString(color, username);

      section.querySelectorAll('.sg-merlion-color-btn').forEach(btn => {
        if (btn.getAttribute('data-color') === color) {
          btn.style.boxShadow = '0 0 0 2px var(--primary-color)';
        } else {
          btn.style.boxShadow = '0 0 0 1px #ccc';
        }
      });
    };

    updatePreview(selectedMerlionColor);

    section.querySelectorAll('.sg-merlion-color-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const color = btn.getAttribute('data-color');
        updatePreview(color);
      });
    });

    const saveBtn = document.getElementById('sg-merlion-save-btn');
    saveBtn.addEventListener('click', function(e) {
      e.preventDefault();
      uploadMerlionAvatar(selectedMerlionColor);
    });
  }

  function uploadMerlionAvatar(colorHex) {
    const statusEl = document.getElementById('sg-merlion-status');
    if (statusEl) {
      statusEl.classList.remove('d-none');
      statusEl.textContent = '正在生成并上传头像...';
    }

    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');

    const username = (window.app && window.app.user && window.app.user.username) || 'user';
    const svgString = getMerlionSvgString(colorHex, username);
    const img = new Image();
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));

    img.onload = function() {
      ctx.drawImage(img, 0, 0, 200, 200);
      const base64Png = canvas.toDataURL('image/png');

      if (window.require) {
        window.require(['socket', 'alerts'], function(socket, alerts) {
          socket.emit('user.uploadAvatar', { base64: base64Png }, function(err) {
            if (statusEl) {
              statusEl.classList.add('d-none');
            }
            if (err) {
              console.error(err);
              if (alerts && alerts.error) {
                alerts.error('设置失败: ' + (err.message || err));
              } else {
                alert('设置失败: ' + (err.message || err));
              }
            } else {
              if (alerts && alerts.success) {
                alerts.success('头像设置成功。');
              }
              setTimeout(function() {
                window.location.reload();
              }, 800);
            }
          });
        });
      } else {
        if (statusEl) {
          statusEl.classList.add('d-none');
        }
        alert('无法加载 NodeBB socket 模块，请刷新重试。');
      }
    };

    img.onerror = function(err) {
      if (statusEl) {
        statusEl.classList.add('d-none');
      }
      console.error(err);
      alert('生成头像图像失败，请重试。');
    };
  }

  function updateAuthState() {
    const user = window.app && window.app.user;
    const loggedIn = user && Number(user.uid) > 0;
    const username = loggedIn && user.username ? `@${user.username}` : '已登录';
    const displayName = loggedIn && (user.displayname || user.username) ? (user.displayname || user.username) : '已登录';
    const profileHref = getProfileHref(user);

    document.querySelectorAll('[data-sgtalk-auth-state]').forEach((element) => {
      element.href = profileHref;
      element.title = username;
      const avatar = element.querySelector('[data-sgtalk-auth-avatar]');
      const name = element.querySelector('[data-sgtalk-auth-name]');
      if (avatar || name) {
        paintAvatar(avatar, user);
        if (name) {
          name.textContent = username;
        }
        return;
      }
      element.textContent = username;
    });

    document.querySelectorAll('[data-sgtalk-sidebar-avatar]').forEach((element) => {
      element.href = profileHref;
      paintAvatar(element, user);
    });

    document.querySelectorAll('[data-sgtalk-sidebar-name]').forEach((element) => {
      element.href = profileHref;
      element.textContent = displayName;
      element.title = displayName;
    });
  }

  function isGuestUser() {
    const user = window.app && window.app.user;
    return !(user && Number(user.uid) > 0);
  }

  function loginUrlWithNext(nextUrl) {
    const relativePath = (window.config && window.config.relative_path) || '';
    const next = nextUrl || (window.location.pathname + window.location.search + window.location.hash);
    return `${relativePath}/login?next=${encodeURIComponent(next)}`;
  }

  function nextPathFromLocation() {
    try {
      return new URLSearchParams(window.location.search).get('next') || '';
    } catch (err) {
      return '';
    }
  }

  function loginContextFromNext(nextPath) {
    if (!nextPath) {
      return '';
    }

    let decoded = nextPath;
    try {
      decoded = decodeURIComponent(nextPath);
    } catch (err) {
      decoded = nextPath;
    }

    if (/^\/compose(?:[?#]|$)/.test(decoded)) {
      return '登录后继续发布主题。';
    }

    if (/^\/search(?:[?#]|$)/.test(decoded)) {
      try {
        const url = new URL(decoded, window.location.origin);
        const term = url.searchParams.get('term');
        return term ? `登录后继续搜索：${term}` : '登录后继续搜索。';
      } catch (err) {
        return '登录后继续搜索。';
      }
    }

    if (/^\/topic\//.test(decoded)) {
      return '登录后返回主题继续回复或收藏。';
    }

    return '';
  }

  function rememberLoginContext(message) {
    if (!message || !window.sessionStorage) {
      return;
    }

    try {
      window.sessionStorage.setItem('sgtalkLoginContext', message);
    } catch (err) {
      // Session storage can be unavailable in strict/private contexts.
    }
  }

  function consumeRememberedLoginContext() {
    if (!window.sessionStorage) {
      return '';
    }

    try {
      const message = window.sessionStorage.getItem('sgtalkLoginContext') || '';
      window.sessionStorage.removeItem('sgtalkLoginContext');
      return message;
    } catch (err) {
      return '';
    }
  }

  function renderLoginContext() {
    const target = document.querySelector('[data-sgtalk-login-context]');
    if (!target) {
      return;
    }

    const message = loginContextFromNext(nextPathFromLocation()) || consumeRememberedLoginContext();
    if (!message) {
      target.hidden = true;
      target.textContent = '';
      return;
    }

    target.textContent = message;
    target.hidden = false;
  }

  function bindGuestProtectedActions() {
    if (document.documentElement.dataset.sgtalkGuestActions === '1') {
      return;
    }

    document.documentElement.dataset.sgtalkGuestActions = '1';
    document.addEventListener('click', (event) => {
      if (!isGuestUser()) {
        return;
      }

      const target = event.target && event.target.closest
        ? event.target.closest('[component="post/upvote"], [component="post/downvote"], [component="post/reply"], [component="topic/reply"]')
        : null;
      if (!target) {
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();
      window.location.assign(loginUrlWithNext());
    }, true);
  }

  function bindGuestSearch(root) {
    const scope = root && root.querySelectorAll ? root : document;
    const forms = [];

    if (scope.matches && scope.matches('[data-sgtalk-search-form]')) {
      forms.push(scope);
    }

    scope.querySelectorAll('[data-sgtalk-search-form]').forEach((form) => forms.push(form));
    forms.forEach((form) => {
      if (form.dataset.sgtalkSearchBound === '1') {
        return;
      }

      form.dataset.sgtalkSearchBound = '1';
      const input = form.querySelector('input[name="term"]');
      const notice = form.querySelector('.sg-search-notice');

      form.addEventListener('submit', (event) => {
        if (!isGuestUser()) {
          return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();

        const term = input ? input.value.trim() : '';
        if (!term) {
          if (notice) {
            notice.textContent = '请输入要搜索的内容。';
            notice.hidden = false;
          }
          if (input) {
            input.focus();
          }
          return;
        }

        const next = `/search?term=${encodeURIComponent(term)}`;
        rememberLoginContext(`登录后继续搜索：${term}`);
        window.location.assign(loginUrlWithNext(next));
      }, true);

      if (input) {
        input.addEventListener('input', () => {
          if (notice) {
            notice.hidden = true;
            notice.textContent = '';
          }
        });
      }
    });
  }

  function registerErrorBox(form) {
    return form && form.querySelector('#register-error-notify');
  }

  function fieldFeedback(input) {
    if (!input) {
      return null;
    }

    const describedBy = input.getAttribute('aria-describedby');
    if (describedBy) {
      return document.getElementById(describedBy.split(/\s+/)[0]);
    }

    return document.getElementById(`${input.id}-notify`);
  }

  function clearFieldError(input) {
    if (!input) {
      return;
    }

    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
    input.setCustomValidity('');
    const feedback = fieldFeedback(input);
    if (feedback) {
      feedback.textContent = '';
    }
  }

  function setFieldError(input, message) {
    if (!input) {
      return;
    }

    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');
    input.setCustomValidity(message);
    const feedback = fieldFeedback(input);
    if (feedback) {
      feedback.textContent = message;
    }
  }

  function showRegisterError(form, messages) {
    const box = registerErrorBox(form);
    if (!box) {
      return;
    }

    const text = messages.join(' ');
    const body = box.querySelector('p') || box;
    body.textContent = text;
    box.classList.remove('hidden', 'd-none');
    box.hidden = false;
  }

  function hideRegisterError(form) {
    const box = registerErrorBox(form);
    if (!box) {
      return;
    }

    box.classList.add('hidden');
    box.hidden = true;
  }

  function validateRegisterForm(form) {
    const username = form.querySelector('#username');
    const email = form.querySelector('#email');
    const password = form.querySelector('#password');
    const confirm = form.querySelector('#password-confirm');
    const fields = [username, email, password, confirm];
    const messages = [];
    let firstInvalid = null;

    fields.forEach(clearFieldError);
    hideRegisterError(form);

    if (!username || !username.value.trim()) {
      const message = '请填写昵称。';
      setFieldError(username, message);
      messages.push(message);
      firstInvalid = firstInvalid || username;
    } else if (username.value.trim().length < 2) {
      const message = '昵称至少需要 2 个字符。';
      setFieldError(username, message);
      messages.push(message);
      firstInvalid = firstInvalid || username;
    }

    if (!email || !email.value.trim()) {
      const message = '请填写邮箱地址。';
      setFieldError(email, message);
      messages.push(message);
      firstInvalid = firstInvalid || email;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      const message = '请填写有效邮箱地址。';
      setFieldError(email, message);
      messages.push(message);
      firstInvalid = firstInvalid || email;
    }

    if (!password || !password.value) {
      const message = '请填写密码。';
      setFieldError(password, message);
      messages.push(message);
      firstInvalid = firstInvalid || password;
    } else if (password.value.length < 6) {
      const message = '密码至少需要 6 位。';
      setFieldError(password, message);
      messages.push(message);
      firstInvalid = firstInvalid || password;
    }

    if (!confirm || !confirm.value) {
      const message = '请再次输入密码。';
      setFieldError(confirm, message);
      messages.push(message);
      firstInvalid = firstInvalid || confirm;
    } else if (confirm.value !== (password && password.value)) {
      const message = '两次输入的密码不一致。';
      setFieldError(confirm, message);
      messages.push(message);
      firstInvalid = firstInvalid || confirm;
    }

    if (messages.length) {
      showRegisterError(form, messages);
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return false;
    }

    return true;
  }

  function bindRegisterValidation(root) {
    const scope = root && root.querySelectorAll ? root : document;
    const forms = [];

    if (scope.matches && scope.matches('[component="register/local"]')) {
      forms.push(scope);
    }

    scope.querySelectorAll('[component="register/local"]').forEach((form) => forms.push(form));
    forms.forEach((form) => {
      if (form.dataset.sgtalkRegisterValidation === '1') {
        return;
      }

      form.dataset.sgtalkRegisterValidation = '1';
      form.setAttribute('novalidate', 'novalidate');
      form.noValidate = true;

      form.addEventListener('submit', (event) => {
        if (!validateRegisterForm(form)) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      }, true);

      const submitButton = form.querySelector('#register');
      if (submitButton) {
        submitButton.addEventListener('click', (event) => {
          if (!validateRegisterForm(form)) {
            event.preventDefault();
            event.stopImmediatePropagation();
          }
        }, true);
      }

      form.querySelectorAll('input').forEach((input) => {
        input.addEventListener('invalid', (event) => {
          event.preventDefault();
          validateRegisterForm(form);
        }, true);

        input.addEventListener('input', () => {
          clearFieldError(input);
          hideRegisterError(form);
          const password = form.querySelector('#password');
          const confirm = form.querySelector('#password-confirm');
          if (confirm && confirm.value && password && password.value && confirm.value !== password.value) {
            setFieldError(confirm, '两次输入的密码不一致。');
          }
        });
      });
    });
  }

  function loginErrorBox(form) {
    return form && form.querySelector('#login-error-notify');
  }

  function showLoginError(form, messages) {
    const box = loginErrorBox(form);
    if (!box) {
      return;
    }

    const body = box.querySelector('p') || box;
    body.textContent = messages.join(' ');
    box.classList.remove('hidden', 'd-none');
    box.hidden = false;
  }

  function showLoginFailure(message) {
    const form = document.querySelector('#login-form');
    if (!form) {
      return;
    }

    const username = form.querySelector('#username');
    const password = form.querySelector('#password');
    const text = message || '用户名或密码不正确，请检查后再试。';
    showLoginError(form, [text]);
    [username, password].forEach((input) => {
      if (input) {
        input.classList.add('is-invalid');
        input.setAttribute('aria-invalid', 'true');
      }
    });

    const box = loginErrorBox(form);
    if (box && box.focus) {
      box.setAttribute('tabindex', '-1');
      box.focus({ preventScroll: true });
    }
  }

  function hideLoginError(form) {
    const box = loginErrorBox(form);
    if (!box) {
      return;
    }

    box.classList.add('hidden');
    box.hidden = true;
  }

  function validateLoginForm(form) {
    const username = form.querySelector('#username');
    const password = form.querySelector('#password');
    const messages = [];
    let firstInvalid = null;

    [username, password].forEach(clearFieldError);
    hideLoginError(form);

    if (!username || !username.value.trim()) {
      const message = '请填写用户名或邮箱。';
      setFieldError(username, message);
      messages.push(message);
      firstInvalid = firstInvalid || username;
    }

    if (!password || !password.value) {
      const message = '请填写密码。';
      setFieldError(password, message);
      messages.push(message);
      firstInvalid = firstInvalid || password;
    }

    if (messages.length) {
      showLoginError(form, messages);
      if (firstInvalid) {
        firstInvalid.focus();
      }
      return false;
    }

    return true;
  }

  function bindLoginValidation(root) {
    const scope = root && root.querySelectorAll ? root : document;
    const forms = [];

    if (scope.matches && scope.matches('#login-form')) {
      forms.push(scope);
    }

    scope.querySelectorAll('#login-form').forEach((form) => forms.push(form));
    forms.forEach((form) => {
      if (form.dataset.sgtalkLoginValidation === '1') {
        return;
      }

      form.dataset.sgtalkLoginValidation = '1';
      form.setAttribute('novalidate', 'novalidate');
      form.noValidate = true;

      form.addEventListener('submit', (event) => {
        if (!validateLoginForm(form)) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      }, true);

      const submitButton = form.querySelector('#login');
      if (submitButton) {
        submitButton.addEventListener('click', (event) => {
          if (!validateLoginForm(form)) {
            event.preventDefault();
            event.stopImmediatePropagation();
          }
        }, true);
      }

      form.querySelectorAll('input').forEach((input) => {
        input.addEventListener('invalid', (event) => {
          event.preventDefault();
          validateLoginForm(form);
        }, true);

        input.addEventListener('input', () => {
          clearFieldError(input);
          hideLoginError(form);
        });
      });
    });
  }

  function bindHardNavigation() {
    if (document.documentElement.dataset.sgtalkHardNavigation === '1') {
      return;
    }

    document.documentElement.dataset.sgtalkHardNavigation = '1';
    document.addEventListener('click', (event) => {
      const link = event.target && event.target.closest
        ? event.target.closest('a.sg-v2-post-link[href], .sg-empty-actions a[href*="/compose"], a[data-sgtalk-hard-link="compose"]')
        : null;
      if (!link) {
        return;
      }

      const url = new URL(link.href, window.location.origin);
      const hardPath = url.pathname.startsWith('/compose') || url.pathname.startsWith('/login');
      if (!hardPath) {
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();
      link.setAttribute('aria-busy', 'true');

      if (isGuestUser() && url.pathname.startsWith('/compose')) {
        window.location.assign(loginUrlWithNext(url.pathname + url.search + url.hash));
        return;
      }

      window.location.assign(link.href);
    }, true);
  }

  function closestComposer(element) {
    return element && element.closest && element.closest('[component="composer"], .composer');
  }

  function composerScope() {
    return document.querySelector('[component="composer"], .composer');
  }

  function setSubmitState(composer, state) {
    if (!composer) {
      return;
    }

    composer.querySelectorAll('.composer-submit').forEach((button) => {
      const label = button.querySelector('span');
      if (!button.dataset.sgtalkSubmitLabel && label) {
        button.dataset.sgtalkSubmitLabel = label.textContent.trim();
      }

      if (state === 'busy') {
        composer.dataset.sgtalkSubmitInFlight = '0';
        button.disabled = true;
        button.setAttribute('disabled', 'disabled');
        button.dataset.sgtalkSubmitting = '1';
        button.classList.add('sg-is-submitting');
        if (label) {
          label.textContent = '发布中';
        }
      } else {
        composer.dataset.sgtalkSubmitInFlight = '0';
        button.disabled = false;
        button.removeAttribute('disabled');
        button.dataset.sgtalkSubmitting = '0';
        button.classList.remove('sg-is-submitting');
        if (label && button.dataset.sgtalkSubmitLabel) {
          label.textContent = button.dataset.sgtalkSubmitLabel;
        }
      }
    });

    composer.querySelectorAll('textarea.write').forEach((textarea) => {
      textarea.readOnly = state === 'busy';
      if (state !== 'busy') {
        textarea.removeAttribute('readonly');
      }
    });
  }

  function readableMessage(message) {
    if (!message) {
      return '发布没有成功，请检查标题、正文和节点后再试。';
    }

    return String(message)
      .replace(/\[\[error:/g, '')
      .replace(/\]\]/g, '')
      .replace(/_/g, ' ')
      .trim();
  }

  function showSubmitNotice(message) {
    const composer = composerScope();
    if (!composer) {
      return;
    }

    let notice = composer.querySelector('.sg-composer-submit-notice');
    if (!notice) {
      notice = document.createElement('div');
      notice.className = 'sg-composer-submit-notice';
      notice.setAttribute('role', 'alert');
      const titleContainer = composer.querySelector('.sg-composer-title-container, .title-container');
      if (titleContainer && titleContainer.parentNode) {
        titleContainer.parentNode.insertBefore(notice, titleContainer.nextSibling);
      } else {
        composer.insertBefore(notice, composer.firstChild);
      }
    }

    notice.textContent = readableMessage(message);
    notice.hidden = false;
    setSubmitState(composer, 'idle');
  }

  function hideSubmitNotice(composer) {
    if (!composer) {
      return;
    }

    const notice = composer.querySelector('.sg-composer-submit-notice');
    if (notice) {
      notice.hidden = true;
    }
  }

  function validateBeforeSubmit(composer) {
    if (!composer) {
      return true;
    }

    const title = composer.querySelector('input.title');
    if (title && !title.value.trim()) {
      showSubmitNotice('请先填写主题标题。');
      title.focus();
      return false;
    }

    return true;
  }

  function initV2exEditorTabs(root) {
    const scope = root && root.querySelectorAll ? root : document;

    // 1. Compose Page Tabs
    scope.querySelectorAll('.sg-composer-tab-btn').forEach((btn) => {
      if (btn.dataset.sgtabBound === '1') return;
      btn.dataset.sgtabBound = '1';

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const composer = btn.closest('[component="composer"], .composer');
        if (!composer) return;

        // Toggle active class on tab buttons
        composer.querySelectorAll('.sg-composer-tab-btn').forEach((t) => t.classList.remove('active'));
        btn.classList.add('active');

        const writeCont = composer.querySelector('.write-container');
        const previewCont = composer.querySelector('.preview-container');

        if (btn.getAttribute('data-tab') === 'write') {
          if (writeCont) writeCont.classList.remove('d-none');
          if (previewCont) previewCont.classList.add('d-none');
        } else {
          if (writeCont) writeCont.classList.add('d-none');
          if (previewCont) {
            previewCont.classList.remove('d-none');
            const previewEl = previewCont.querySelector('.preview');
            if (previewEl) {
              previewEl.innerHTML = '<div class="text-center p-4"><i class="fa fa-spinner fa-spin"></i> 加载预览中...</div>';
              const textarea = composer.querySelector('textarea.write');
              const rawText = textarea ? textarea.value : '';
              if (window.socket) {
                window.socket.emit('posts.helper.preview', { raw: rawText }, (err, html) => {
                  if (!err && html) {
                    previewEl.innerHTML = html;
                    $(document).trigger('markup.filter');
                  } else {
                    previewEl.innerHTML = '<div class="text-danger p-3">预览生成失败</div>';
                  }
                });
              } else {
                previewEl.innerHTML = '<div class="text-muted p-3">无法连接到预览服务</div>';
              }
            }
          }
        }
      });
    });

    // 2. Quick Reply Tabs
    scope.querySelectorAll('.sg-quickreply-tab').forEach((btn) => {
      if (btn.dataset.sgtabBound === '1') return;
      btn.dataset.sgtabBound = '1';

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const container = btn.closest('.sg-quickreply-card');
        if (!container) return;

        container.querySelectorAll('.sg-quickreply-tab').forEach((t) => t.classList.remove('active'));
        btn.classList.add('active');

        const writeArea = container.querySelector('.sg-quickreply-write-area');
        const previewArea = container.querySelector('.sg-quickreply-preview-area');

        if (btn.getAttribute('data-tab') === 'edit') {
          if (writeArea) writeArea.classList.remove('d-none');
          if (previewArea) previewArea.classList.add('d-none');
        } else {
          if (writeArea) writeArea.classList.add('d-none');
          if (previewArea) {
            previewArea.classList.remove('d-none');
            const previewContent = previewArea.querySelector('.sg-quickreply-preview-content');
            if (previewContent) {
              previewContent.innerHTML = '<div class="text-center p-3"><i class="fa fa-spinner fa-spin"></i> 加载预览中...</div>';
              const textarea = container.querySelector('[component="topic/quickreply/text"]');
              const rawText = textarea ? textarea.value : '';
              if (window.socket) {
                window.socket.emit('posts.helper.preview', { raw: rawText }, (err, html) => {
                  if (!err && html) {
                    previewContent.innerHTML = html;
                    $(document).trigger('markup.filter');
                  } else {
                    previewContent.innerHTML = '<div class="text-danger p-2">预览生成失败</div>';
                  }
                });
              } else {
                previewContent.innerHTML = '<div class="text-muted p-2">无法连接到预览服务</div>';
              }
            }
          }
        }
      });
    });

    // 3. Scroll to Top link
    scope.querySelectorAll('.sg-quickreply-back-to-top').forEach((link) => {
      if (link.dataset.sgBound === '1') return;
      link.dataset.sgBound = '1';
      link.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // 4. Main compose page upload gutter click trigger
    scope.querySelectorAll('.sg-composer-gutter-upload').forEach((gutter) => {
      if (gutter.dataset.sgBound === '1') return;
      gutter.dataset.sgBound = '1';
      gutter.addEventListener('click', (e) => {
        e.preventDefault();
        const composer = gutter.closest('[component="composer"], .composer');
        if (composer) {
          const uploadBtn = composer.querySelector('.img-upload-btn, [data-format="picture"]');
          if (uploadBtn) {
            uploadBtn.click();
          }
        }
      });
    });

    // 5. Quick reply emoji picker trigger
    scope.querySelectorAll('.sg-quickreply-emoji-btn').forEach((btn) => {
      if (btn.dataset.sgBound === '1') return;
      btn.dataset.sgBound = '1';

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const container = btn.closest('.sg-quickreply-actions');
        if (!container) return;

        let picker = container.querySelector('.sg-emoji-picker');
        if (picker) {
          picker.classList.toggle('d-none');
          return;
        }

        picker = document.createElement('div');
        picker.className = 'sg-emoji-picker position-absolute p-2 border rounded shadow-sm d-flex flex-wrap gap-1';
        picker.style.width = '180px';
        picker.style.bottom = '35px';
        picker.style.left = '5px';
        picker.style.zIndex = '1000';
        picker.style.backgroundColor = 'var(--card-bg)';
        picker.style.borderColor = 'var(--border-color)';

        const emojis = ['😀', '😂', '😍', '🤔', '👍', '🙏', '🎉', '🔥', '👀', '💡', '💯', '👏'];
        emojis.forEach(emoji => {
          const item = document.createElement('button');
          item.type = 'button';
          item.className = 'btn p-1 border-0 bg-transparent';
          item.style.fontSize = '18px';
          item.style.lineHeight = '1';
          item.textContent = emoji;
          item.addEventListener('click', (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            const textarea = container.closest('form').querySelector('textarea');
            if (textarea) {
              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;
              const text = textarea.value;
              textarea.value = text.substring(0, start) + emoji + text.substring(end);
              textarea.focus();
              textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
            }
            picker.classList.add('d-none');
          });
          picker.appendChild(item);
        });

        container.style.position = 'relative';
        container.appendChild(picker);
      });
    });
  }

  // Close emoji picker on outside clicks
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.sg-emoji-picker') && !e.target.closest('.sg-quickreply-emoji-btn')) {
      document.querySelectorAll('.sg-emoji-picker').forEach(p => p.classList.add('d-none'));
    }
  });

  function bindSubmitFeedback(root) {
    const scope = root && root.querySelectorAll ? root : document;
    scope.querySelectorAll('.composer-submit').forEach((button) => {
      if (button.dataset.sgtalkSubmitFeedback === '1') {
        return;
      }

      button.dataset.sgtalkSubmitFeedback = '1';
      button.addEventListener('click', (event) => {
        const composer = closestComposer(button);
        if (!composer) {
          return;
        }

        hideSubmitNotice(composer);

        if (!validateBeforeSubmit(composer)) {
          event.preventDefault();
          event.stopImmediatePropagation();
          return;
        }

        window.setTimeout(() => setSubmitState(composer, 'busy'), 0);
        window.setTimeout(() => {
          if (
            button.dataset.sgtalkSubmitting === '1' &&
            composer.dataset.sgtalkSubmitInFlight !== '1' &&
            document.contains(button)
          ) {
            setSubmitState(composer, 'idle');
          }
        }, 1400);
        window.setTimeout(() => {
          if (button.dataset.sgtalkSubmitting === '1' && document.contains(button)) {
            setSubmitState(composer, 'idle');
          }
        }, 20000);
      }, true);
    });
  }

  function patchFetchForComposerErrors() {
    if (!window.fetch || window.fetch.sgtalkComposerPatched) {
      return;
    }

    const originalFetch = window.fetch.bind(window);
    const patchedFetch = function patchedFetch(input, init) {
      const url = typeof input === 'string' ? input : input && input.url;
      const method = (init && init.method) || (input && input.method) || 'GET';
      const isTopicPost = url && topicApiPattern.test(url) && method.toUpperCase() === 'POST';
      const isLoginPost = url && /\/login(?:$|[?#])/.test(url) && method.toUpperCase() === 'POST';

      if (isTopicPost) {
        const composer = composerScope();
        if (composer) {
          composer.dataset.sgtalkSubmitInFlight = '1';
        }
      }

      return originalFetch(input, init).then((response) => {
        if (isTopicPost) {
          if (!response.ok) {
            response.clone().json()
              .then((payload) => {
                showSubmitNotice(payload && payload.status && payload.status.message);
              })
              .catch(() => showSubmitNotice());
          }
        }
        if (isLoginPost && (response.status === 401 || response.status === 403)) {
          showLoginFailure('用户名或密码不正确，请检查后再试。');
        }
        return response;
      }).catch((error) => {
        showSubmitNotice(error && error.message);
        throw error;
      });
    };

    patchedFetch.sgtalkComposerPatched = true;
    window.fetch = patchedFetch;
  }

  function patchXhrForLoginErrors() {
    if (!window.XMLHttpRequest || window.XMLHttpRequest.sgtalkLoginPatched) {
      return;
    }

    const proto = window.XMLHttpRequest.prototype;
    const originalOpen = proto.open;
    const originalSend = proto.send;

    proto.open = function patchedOpen(method, url) {
      this.sgtalkRequestMethod = method;
      this.sgtalkRequestUrl = url;
      return originalOpen.apply(this, arguments);
    };

    proto.send = function patchedSend() {
      this.addEventListener('load', function onLoad() {
        const method = String(this.sgtalkRequestMethod || 'GET').toUpperCase();
        const url = String(this.sgtalkRequestUrl || '');
        if (method === 'POST' && /\/login(?:$|[?#])/.test(url) && (this.status === 401 || this.status === 403)) {
          showLoginFailure('用户名或密码不正确，请检查后再试。');
        }
      });

      return originalSend.apply(this, arguments);
    };

    window.XMLHttpRequest.sgtalkLoginPatched = true;
  }

  const avatarObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        const target = mutation.target;
        if (target.classList.contains('avatar') || target.getAttribute('component') === 'avatar/icon') {
          const svg = target.querySelector('.sg-merlion-svg');
          if (svg) {
            const styleBg = target.style.backgroundColor;
            if (styleBg && styleBg !== 'transparent') {
              const username = getUsernameFromAvatar(target);
              if (target.dataset.lastBgColor !== styleBg) {
                target.dataset.lastBgColor = styleBg;
                window.setTimeout(() => {
                  target.style.backgroundColor = 'transparent';
                  target.innerHTML = getMerlionSvgString(styleBg, username);
                }, 0);
              }
            }
          }
        }
      }
    });
  });

  function startAvatarObserver() {
    avatarObserver.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['style']
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    scan(document);
    bindSubmitFeedback(document);
    bindHardNavigation();
    bindGuestProtectedActions();
    bindGuestSearch(document);
    bindRegisterValidation(document);
    bindLoginValidation(document);
    renderLoginContext();
    updateAuthState();
    patchFetchForComposerErrors();
    patchXhrForLoginErrors();
    replaceDefaultAvatars();
    injectMerlionPicker();
    startAvatarObserver();
    initV2exEditorTabs(document);
  });
  document.addEventListener('input', (event) => {
    if (event.target && event.target.matches && event.target.matches(selector)) {
      resizeTextarea(event.target);
    }

    if (event.target && event.target.closest) {
      hideSubmitNotice(closestComposer(event.target));
    }
  }, true);

  window.addEventListener('resize', () => scanLater(document));

  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener('change', () => scanLater(document));
  } else if (mobileQuery.addListener) {
    mobileQuery.addListener(() => scanLater(document));
  }

  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          scanLater(node);
          bindSubmitFeedback(node);
          bindGuestSearch(node);
          bindRegisterValidation(node);
          bindLoginValidation(node);
          renderLoginContext();
          initV2exEditorTabs(node);
          if (node.matches('.avatar, [component="avatar/icon"], img[src*="googleusercontent.com"]') ||
              node.querySelector('.avatar, [component="avatar/icon"], img[src*="googleusercontent.com"]')) {
            replaceDefaultAvatars();
          }
        }
      });
    });
  }).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  if (window.jQuery) {
    window.jQuery(window).on('action:composer.loaded action:composer.resize', (event, data) => {
      scanLater(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
      bindSubmitFeedback(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
      bindGuestSearch(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
      bindRegisterValidation(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
      bindLoginValidation(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
      renderLoginContext();
      initV2exEditorTabs(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
      updateAuthState();
      replaceDefaultAvatars();
    });
  }

  if (typeof window.require === 'function') {
    try {
      window.require(['hooks'], (hooks) => {
        hooks.on('action:composer.enhanced', (data) => {
          scanLater(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
          bindSubmitFeedback(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
          bindGuestSearch(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
          bindRegisterValidation(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
          bindLoginValidation(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
          renderLoginContext();
          initV2exEditorTabs(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
          updateAuthState();
          replaceDefaultAvatars();
        });
        hooks.on('action:ajaxify.end', () => {
          updateAuthState();
          bindGuestSearch(document);
          bindRegisterValidation(document);
          bindLoginValidation(document);
          renderLoginContext();
          replaceDefaultAvatars();
          injectMerlionPicker();
          initV2exEditorTabs(document);
        });
        hooks.on('action:posts.loaded', () => {
          replaceDefaultAvatars();
        });
      });
    } catch (error) {
      scanLater(document);
    }
  }
}());
