<script>
  (function () {
    var savedTheme = localStorage.getItem('theme');
    var systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var theme = savedTheme || systemTheme;
    document.documentElement.setAttribute('data-bs-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  })();
</script>

<header class="sg-v2-header flex-shrink sticky-top border-bottom shadow-sm">
  <div class="container-lg d-flex flex-row align-items-center justify-content-between py-2 py-md-3 px-3 px-md-4">
    <div class="d-flex align-items-center gap-3 gap-md-4">
      <a class="sg-brand-link d-flex align-items-center text-decoration-none" href="{config.relative_path}/" aria-label="SGTALK">
        <span class="sg-wordmark" aria-hidden="true"><span class="sg-wordmark-sg">SG</span><span class="sg-wordmark-talk">TALK</span></span>
      </a>
      <form action="{config.relative_path}/search" method="get" class="d-none d-sm-block m-0">
        <input name="term" type="search" class="form-control px-3 py-1.5 rounded-2 border-0 bg-light text-sm" placeholder="搜索主题 / 节点 / 用户" style="min-width: 240px; background-color: var(--color-tertiary-101) !important;" value=""/>
      </form>
    </div>
    <div class="d-flex align-items-center gap-1">
      <!-- Theme/Mode switch -->
      <button class="btn btn-link p-1 text-muted border-0 me-2" id="sg-dark-toggle" title="切换明暗模式" style="box-shadow: none;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon text-muted" aria-hidden="true"><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"></path></svg>
      </button>

      <!-- Auth State Guest -->
      {{{ if !loggedIn }}}
      <a class="nav-item text-decoration-none fw-semibold text-muted text-sm px-2 sg-guest-only" href="{config.relative_path}/register">注册</a>
      <a class="nav-item text-decoration-none fw-semibold text-muted text-sm px-2 sg-guest-only" href="{config.relative_path}/login">登录</a>
      {{{ end }}}
      
      <!-- Auth State Logged In -->
      {{{ if loggedIn }}}
      <a class="sg-auth-state-link sg-user-only text-decoration-none d-flex align-items-center gap-2 px-1" href="{config.relative_path}/me" data-sgtalk-auth-state>
        <span class="sg-auth-avatar rounded d-flex align-items-center justify-content-center bg-secondary text-white" data-sgtalk-auth-avatar style="width: 24px; height: 24px; font-size: 11px; border-radius: 4px !important;">我</span>
        <span class="sg-auth-name text-muted fw-semibold d-none d-md-inline" data-sgtalk-auth-name>已登录</span>
      </a>
      <a class="nav-item text-decoration-none fw-semibold text-muted text-sm px-2 sg-user-only ms-2" href="{config.relative_path}/logout">退出</a>
      {{{ end }}}
    </div>
  </div>
  <div class="border-top border-light-subtle"></div>
  <div class="container-lg d-flex align-items-center justify-content-between py-1.5 py-md-2 px-3 px-md-4">
    <div class="sg-v2-nav-scroll d-flex align-items-center overflow-x-auto no-scrollbar gap-2" style="scrollbar-width: none;">
      <a class="d-none d-sm-inline-block text-muted text-decoration-none pe-2" title="首页" href="{config.relative_path}/">
        <!-- Lucide-style Home Icon SVG -->
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home sg-home-icon" style="width:18px; height:18px;"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
      </a>
      <nav class="sg-v2-nav-tabs d-flex align-items-center gap-3">
        <a class="nav-item text-decoration-none fw-semibold text-muted text-sm text-nowrap" href="{config.relative_path}/recent">活跃</a>
        <a class="nav-item text-decoration-none fw-semibold text-muted text-sm text-nowrap" href="{config.relative_path}/popular">最热</a>
        <a class="nav-item text-decoration-none fw-semibold text-muted text-sm text-nowrap" href="{config.relative_path}/category/6/新移民">新移民</a>
        <a class="nav-item text-decoration-none fw-semibold text-muted text-sm text-nowrap" href="{config.relative_path}/category/7/安家租房">安家</a>
        <a class="nav-item text-decoration-none fw-semibold text-muted text-sm text-nowrap" href="{config.relative_path}/category/8/职业与薪资">职场</a>
        <a class="nav-item text-decoration-none fw-semibold text-muted text-sm text-nowrap" href="{config.relative_path}/category/10/育儿与学校">家庭</a>
        <a class="nav-item text-decoration-none fw-semibold text-muted text-sm text-nowrap" href="{config.relative_path}/category/9/金融税务">金融</a>
        <a class="nav-item text-decoration-none fw-semibold text-muted text-sm text-nowrap" href="{config.relative_path}/category/12/本地生活">生活</a>
        <a class="nav-item text-decoration-none fw-semibold text-muted text-sm text-nowrap" href="{config.relative_path}/category/13/交通出行">出行</a>
        <a class="nav-item text-decoration-none fw-semibold text-muted text-sm text-nowrap" href="{config.relative_path}/category/5/问与答">问答</a>
        <a class="nav-item text-decoration-none fw-semibold text-muted text-sm text-nowrap" href="{config.relative_path}/category/16/交易">交易</a>
      </nav>
    </div>
    <div>
      {{{ if loggedIn }}}
      <a class="btn btn-danger btn-sm text-white d-flex align-items-center gap-1 sg-v2-post-link px-2.5 py-1.5" href="{config.relative_path}/compose?cid={config.defaultComposeCid}" data-ajaxify="false" role="button" style="font-weight:600; font-size:12px; background-color: var(--primary-color); border-color: var(--primary-color);">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
        发布主题
      </a>
      {{{ else }}}
      <a class="btn btn-light btn-sm d-flex align-items-center gap-1 sg-v2-post-link sg-v2-post-link-guest px-2.5 py-1.5" href="{config.relative_path}/login?next=%2Fcompose%3Fcid%3D{config.defaultComposeCid}" data-ajaxify="false" role="button" style="font-weight:600; font-size:12px;">
        登录后发帖
      </a>
      {{{ end }}}
    </div>
  </div>
</header>

<script>
  document.addEventListener('click', function(event) {
    var btn = event.target.closest('#sg-dark-toggle, #sg-sidebar-dark-toggle');
    if (btn) {
      var currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
      var nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-bs-theme', nextTheme);
      document.documentElement.classList.toggle('dark', nextTheme === 'dark');
      localStorage.setItem('theme', nextTheme);
    }
  });
</script>
