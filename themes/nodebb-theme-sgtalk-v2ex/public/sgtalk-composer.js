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

  function paintAvatar(target, user) {
    if (!target) {
      return;
    }

    const picture = user && user.picture;
    const text = getAvatarText(user);
    const bg = (user && user['icon:bgColor']) || '#eef2f7';

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

    target.style.backgroundColor = bg;
    target.textContent = text;
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

  document.addEventListener('DOMContentLoaded', () => {
    scan(document);
    bindSubmitFeedback(document);
    bindHardNavigation();
    updateAuthState();
    patchFetchForComposerErrors();
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
      updateAuthState();
    });
  }

  if (typeof window.require === 'function') {
    try {
      window.require(['hooks'], (hooks) => {
        hooks.on('action:composer.enhanced', (data) => {
          scanLater(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
          bindSubmitFeedback(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
          updateAuthState();
        });
        hooks.on('action:ajaxify.end', updateAuthState);
      });
    } catch (error) {
      scanLater(document);
    }
  }
}());
