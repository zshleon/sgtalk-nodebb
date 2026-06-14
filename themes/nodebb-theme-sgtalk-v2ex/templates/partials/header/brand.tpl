<script>
  (function () {
    var storageKey = 'theme';
    var systemQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

    function getManualTheme() {
      try {
        var storedTheme = localStorage.getItem(storageKey);
        return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : '';
      } catch (error) {
        return '';
      }
    }

    function getSystemTheme() {
      return systemQuery && systemQuery.matches ? 'dark' : 'light';
    }

    function applyTheme(theme, source) {
      document.documentElement.setAttribute('data-bs-theme', theme);
      document.documentElement.setAttribute('data-sgtalk-theme-source', source);
      document.documentElement.classList.toggle('dark', theme === 'dark');
      var metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.setAttribute('name', 'theme-color');
        document.head.appendChild(metaThemeColor);
      }
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0D1117' : '#ffffff');
    }

    function resolveTheme() {
      var manualTheme = getManualTheme();
      applyTheme(manualTheme || getSystemTheme(), manualTheme ? 'manual' : 'system');
    }

    window.sgtalkTheme = {
      current: function () {
        return document.documentElement.getAttribute('data-bs-theme') || getSystemTheme();
      },
      setManual: function (theme) {
        try {
          localStorage.setItem(storageKey, theme);
        } catch (error) {
          // Ignore private-mode storage failures; the visible theme can still update.
        }
        applyTheme(theme, 'manual');
      },
      setSystem: function () {
        try {
          localStorage.removeItem(storageKey);
        } catch (error) {
          // Ignore private-mode storage failures; the visible theme can still update.
        }
        applyTheme(getSystemTheme(), 'system');
      },
      resolve: resolveTheme
    };

    resolveTheme();
    if (systemQuery) {
      var onSystemChange = function () {
        if (!getManualTheme()) {
          applyTheme(getSystemTheme(), 'system');
        }
      };
      if (systemQuery.addEventListener) {
        systemQuery.addEventListener('change', onSystemChange);
      } else if (systemQuery.addListener) {
        systemQuery.addListener(onSystemChange);
      }
    }

  })();
</script>

<header class="sg-v2-header flex-shrink sticky-top border-bottom">
  <div class="container-lg d-flex flex-row align-items-center justify-content-between py-2 py-md-3 px-3 px-md-4">
    <div class="d-flex align-items-center gap-3 gap-md-4">
      <a class="d-flex align-items-center gap-2 text-decoration-none sg-brand-mark" href="{config.relative_path}/" aria-label="SGTALK">
        <img src="{config.relative_path}/assets/plugins/nodebb-theme-sgtalk-v2ex/public/brand/logo-mark.svg?v=20260614-quiet-premium" class="sg-logo-icon" alt="" />
        <span class="sg-logo-word">SG<em>TALK</em></span>
      </a>
      <form action="{config.relative_path}/search" method="get" class="sg-v2-search d-none d-sm-block m-0">
        <input name="term" type="search" class="form-control text-sm" placeholder="搜索主题 / 节点 / 用户" data-sgtalk-i18n-placeholder="search.placeholder" value=""/>
      </form>
    </div>
    <div class="d-flex align-items-center gap-1">
	      <!-- Auth State Guest -->
	      {{{ if !config.sgtalkRegistrationDisabled }}}
	      <a class="nav-item sg-header-auth-link text-decoration-none fw-semibold text-muted text-sm px-2 sg-guest-only" href="{config.relative_path}/register" data-sgtalk-i18n="auth.register">注册</a>
	      {{{ end }}}
	      <a class="nav-item sg-header-auth-link text-decoration-none fw-semibold text-muted text-sm px-2 sg-guest-only" href="{config.relative_path}/login" data-sgtalk-i18n="auth.login">登录</a>

      <!-- Auth State Logged In -->
      <a class="sg-auth-state-link sg-user-only text-decoration-none d-flex align-items-center gap-2 px-1" href="{config.relative_path}/me" data-sgtalk-auth-state>
        <span class="sg-auth-avatar rounded-circle d-flex align-items-center justify-content-center bg-secondary text-white" data-sgtalk-auth-avatar style="width: 24px; height: 24px; font-size: 11px; border-radius: 50% !important;">S</span>
        <span class="sg-auth-name text-muted fw-semibold d-none d-md-inline" data-sgtalk-auth-name></span>
      </a>

      <!-- Theme switch -->
      <button class="btn btn-link p-1 text-muted border-0" id="sg-dark-toggle" title="切换明暗主题" aria-label="切换明暗主题" data-sgtalk-i18n-title="theme.toggle" data-sgtalk-i18n-aria-label="theme.toggle" style="box-shadow: none;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon text-muted" aria-hidden="true"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path></svg>
      </button>
      <button class="sg-language-toggle" type="button" data-sgtalk-language-toggle title="Switch language" aria-label="Switch language"><span data-sgtalk-language-toggle-label>EN</span></button>
    </div>
  </div>
  <div class="border-top border-light-subtle"></div>
  <div class="container-lg d-flex align-items-center justify-content-between py-1.5 py-md-2 px-3 px-md-4">
    <div class="d-flex align-items-center overflow-x-auto no-scrollbar gap-2" style="scrollbar-width: none;">
      <a class="d-none d-sm-inline-block text-muted text-decoration-none pe-2" title="首页" data-sgtalk-i18n-title="nav.home" href="{config.relative_path}/">
        <!-- Lucide-style Home Icon SVG -->
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home sg-home-icon" style="width:18px; height:18px;"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
      </a>
      <a class="sg-mobile-search-button d-inline-flex d-sm-none align-items-center justify-content-center text-muted text-decoration-none" title="搜索" aria-label="搜索" data-sgtalk-i18n-title="search.open" data-sgtalk-i18n-aria-label="search.open" href="{config.relative_path}/search">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search" aria-hidden="true"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
      </a>
      <nav class="sg-v2-nav-tabs d-flex align-items-center gap-3">
	      <a class="nav-item text-decoration-none fw-semibold text-muted text-sm text-nowrap {{{ if template.recent }}}active{{{ end }}}" href="{config.relative_path}/recent" data-sgtalk-i18n="nav.active">活跃</a>
	      <a class="nav-item text-decoration-none fw-semibold text-muted text-sm text-nowrap {{{ if template.popular }}}active{{{ end }}}" href="{config.relative_path}/popular" data-sgtalk-i18n="nav.popular">最热</a>
	      <a class="nav-item text-decoration-none fw-semibold text-muted text-sm text-nowrap {{{ if (template.categories || template.category) }}}active{{{ end }}}" href="{config.relative_path}/categories" data-sgtalk-i18n="nav.nodes">节点</a>
      </nav>
    </div>
    <div>
      <a class="btn btn-primary btn-sm text-white d-flex align-items-center gap-1 sg-v2-post-link sg-user-only px-2.5 py-1.5" href="{config.relative_path}/compose?cid={config.defaultComposeCid}" data-ajaxify="false" role="button" title="发布主题" aria-label="发布主题" data-sgtalk-i18n-title="topic.publish" data-sgtalk-i18n-aria-label="topic.publish">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
        <span data-sgtalk-i18n="topic.publish">发布主题</span>
      </a>
    </div>
  </div>
</header>

<script>
(function(){
  function iconFor(state){
    if(state==='light') return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>';
    if(state==='dark') return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path></svg>';
    return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"></rect><path d="M8 21h8M12 17v4"></path></svg>';
  }
  function curState(){
    var r=document.documentElement;
    if(r.getAttribute('data-sgtalk-theme-source')!=='manual') return 'system';
    return r.getAttribute('data-bs-theme')==='dark'?'dark':'light';
  }
  function label(s){return s==='system'?'主题：跟随系统':s==='light'?'主题：浅色':'主题：深色';}
  function sync(){var b=document.getElementById('sg-dark-toggle');if(!b)return;var s=curState();b.innerHTML=iconFor(s);b.setAttribute('title',label(s)+'（点击切换）');b.setAttribute('aria-label',label(s));}
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('#sg-dark-toggle');if(!b)return;
    var s=curState();var n=s==='system'?'light':(s==='light'?'dark':'system');
    if(window.sgtalkTheme){if(n==='system')window.sgtalkTheme.setSystem();else window.sgtalkTheme.setManual(n);}
    sync();
  });
  document.addEventListener('DOMContentLoaded',sync); sync();
})();
</script>
