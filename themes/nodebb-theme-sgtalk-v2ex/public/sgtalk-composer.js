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
    let seed = username || 'user';
    let hash = 0;
    const str = String(seed);
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);

    let color = bgColor || '#e62929';
    const isHex = color && /^#([0-9A-F]{3}){1,2}$/i.test(color);
    if (!isHex && !color.startsWith('hsl')) {
      color = '#e62929';
    }

    const strokeColor = '#1e293b';
    const fillBodyColor = '#ffffff';
    const pinkCheekColor = '#fda4af';

    return '<svg class="sg-merlion-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%; border-radius: 4px;">' +
      // Background
      '<rect width="64" height="64" fill="' + color + '"/>' +

      // Fish body/tail
      '<path d="M 28 33 C 28 45, 35 50, 44 48 C 50 46, 51 39, 46 34 C 48 30, 52 31, 54 28 C 51 28, 47 31, 45 34 C 42 32, 39 33, 38 36 C 32 37, 30 35, 28 33 Z" fill="' + fillBodyColor + '" stroke="' + strokeColor + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +

      // Scale curves on tail
      '<path d="M 31 42 Q 33 44 35 42" fill="none" stroke="' + strokeColor + '" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M 37 45 Q 39 47 41 45" fill="none" stroke="' + strokeColor + '" stroke-width="2" stroke-linecap="round"/>' +

      // Lion Mane circles behind the head (layering trick)
      '<circle cx="28" cy="14" r="4.5" fill="' + fillBodyColor + '" stroke="' + strokeColor + '" stroke-width="2.5"/>' +
      '<circle cx="36" cy="17" r="4.5" fill="' + fillBodyColor + '" stroke="' + strokeColor + '" stroke-width="2.5"/>' +
      '<circle cx="39" cy="25" r="4.5" fill="' + fillBodyColor + '" stroke="' + strokeColor + '" stroke-width="2.5"/>' +
      '<circle cx="36" cy="33" r="4.5" fill="' + fillBodyColor + '" stroke="' + strokeColor + '" stroke-width="2.5"/>' +
      '<circle cx="28" cy="36" r="4.5" fill="' + fillBodyColor + '" stroke="' + strokeColor + '" stroke-width="2.5"/>' +
      '<circle cx="20" cy="33" r="4.5" fill="' + fillBodyColor + '" stroke="' + strokeColor + '" stroke-width="2.5"/>' +
      '<circle cx="17" cy="25" r="4.5" fill="' + fillBodyColor + '" stroke="' + strokeColor + '" stroke-width="2.5"/>' +
      '<circle cx="20" cy="17" r="4.5" fill="' + fillBodyColor + '" stroke="' + strokeColor + '" stroke-width="2.5"/>' +

      // Cute ears
      '<circle cx="20" cy="15" r="3" fill="' + fillBodyColor + '" stroke="' + strokeColor + '" stroke-width="2.5"/>' +
      '<circle cx="36" cy="15" r="3" fill="' + fillBodyColor + '" stroke="' + strokeColor + '" stroke-width="2.5"/>' +

      // Head / Face circle
      '<circle cx="28" cy="25" r="11" fill="' + fillBodyColor + '" stroke="' + strokeColor + '" stroke-width="2.5"/>' +

      // Eyes (white sclera)
      '<circle cx="24" cy="23" r="2.5" fill="#ffffff" stroke="' + strokeColor + '" stroke-width="2"/>' +
      '<circle cx="32" cy="23" r="2.5" fill="#ffffff" stroke="' + strokeColor + '" stroke-width="2"/>' +

      // Pupils (goofy cross-eyed)
      '<circle cx="25.2" cy="23" r="1" fill="' + strokeColor + '"/>' +
      '<circle cx="30.8" cy="23" r="1" fill="' + strokeColor + '"/>' +

      // Blushing cheeks
      '<circle cx="19.5" cy="25.5" r="1.8" fill="' + pinkCheekColor + '"/>' +
      '<circle cx="36.5" cy="25.5" r="1.8" fill="' + pinkCheekColor + '"/>' +

      // Tiny nose
      '<polygon points="27.5,25.5 28.5,25.5 28,26.2" fill="' + strokeColor + '" stroke="' + strokeColor + '" stroke-width="1"/>' +

      // Smile mouth
      '<path d="M 26 27.5 Q 28 29 30 27.5" fill="none" stroke="' + strokeColor + '" stroke-width="2" stroke-linecap="round"/>' +
      '</svg>';
  }

  function paintAvatar(target, user) {
    if (!target) {
      return;
    }

    const picture = user && user.picture;
    const isGoogleAvatar = picture && picture.includes('googleusercontent.com');
    const bg = (user && user['icon:bgColor']) || '#eef2f7';
    const username = (user && user.username) || 'user';

    target.textContent = '';
    target.style.backgroundColor = '';
    target.classList.toggle('sg-has-picture', Boolean(picture && !isGoogleAvatar));

    if (picture && !isGoogleAvatar) {
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

    // Replace Google default avatars
    document.querySelectorAll('img[src*="googleusercontent.com"]').forEach((img) => {
      const parent = img.closest('.avatar, [component="user/picture"], [component="avatar/picture"]');
      if (parent && !parent.querySelector('.sg-merlion-svg')) {
        const bg = (parent.dataset.iconBg) || '#eef2f7';
        const username = getUsernameFromAvatar(parent);
        parent.textContent = '';
        parent.style.backgroundColor = 'transparent';
        parent.innerHTML = getMerlionSvgString(bg, username);
        parent.classList.remove('sg-has-picture');
      }
    });
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
      <h5 class="fw-bold mb-2" style="font-size:14px; color: var(--sg-text);">预设可爱鱼尾狮呆萌头像</h5>
      <p class="mb-3" style="font-size:12px; color: var(--sg-muted);">点击下方颜色实时预览头像效果，确认满意后点击下方“保存并使用”一键上传。</p>

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
      statusEl.textContent = '正在生成并上传鱼尾狮头像...';
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
                alerts.success('鱼尾狮头像设置成功！');
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
        return response;
      }).catch((error) => {
        showSubmitNotice(error && error.message);
        throw error;
      });
    };

    patchedFetch.sgtalkComposerPatched = true;
    window.fetch = patchedFetch;
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
    updateAuthState();
    patchFetchForComposerErrors();
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
          initV2exEditorTabs(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
          updateAuthState();
          replaceDefaultAvatars();
        });
        hooks.on('action:ajaxify.end', () => {
          updateAuthState();
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
