<div data-widget-area="header">
{{{each widgets.header}}}
{{widgets.header.html}}
{{{end}}}
</div>

<div class="row sg-auth-layout login flex-fill">
	<div class="sg-auth-main {{{ if widgets.sidebar.length }}}col-lg-9 col-sm-12{{{ else }}}col-lg-12{{{ end }}}">
		<section class="sg-auth-box">
			<div class="sg-auth-head">
				<h2 data-sgtalk-i18n="auth.loginTitle">登录 SGTALK</h2>
				<p data-sgtalk-i18n="auth.loginBody">登录后可以继续发布主题、回复和收藏节点。</p>
			</div>

			{{{ if allowLocalLogin }}}
			<form class="sg-auth-form" role="form" method="post" id="login-form">
				<label class="sg-auth-field" for="username">
					<span data-sgtalk-i18n="auth.usernameOrEmail">用户名 / 邮箱</span>
					<input class="form-control" type="text" placeholder="用户名 / 邮箱" data-sgtalk-i18n-placeholder="auth.usernameOrEmail" name="username" id="username" autocorrect="off" autocapitalize="off" autocomplete="username" value="{username}" required aria-required="true"/>
				</label>

				<label class="sg-auth-field" for="password">
					<span data-sgtalk-i18n="auth.password">密码</span>
					<input class="form-control" type="password" placeholder="密码" data-sgtalk-i18n-placeholder="auth.password" name="password" id="password" autocomplete="current-password" autocapitalize="off" required aria-required="true"/>
				</label>

				<p id="caps-lock-warning" class="text-danger hidden text-sm mb-0 form-text" aria-live="polite" role="alert" aria-atomic="true">
					<i class="fa fa-exclamation-triangle"></i> <span data-sgtalk-i18n="auth.capsLock">大写锁定已开启</span>
				</p>

				{{{ if allowPasswordReset }}}
				<a id="reset-link" class="sg-auth-small-link" href="{config.relative_path}/reset" data-sgtalk-i18n="auth.forgotPassword">忘记密码？</a>
				{{{ end }}}

				{{{ each loginFormEntry }}}
				<div class="sg-auth-field loginFormEntry {./styleName}">
					<label for="{./inputId}">{./label}</label>
					<div>{{./html}}</div>
				</div>
				{{{ end }}}

				<input type="hidden" name="_csrf" value="{config.csrf_token}" />
				<input type="hidden" name="noscript" id="noscript" value="true" />

				<button class="sg-v2-button primary sg-auth-submit" id="login" type="submit" data-sgtalk-i18n="auth.login">登录</button>

				<label class="sg-auth-check" for="remember">
					<input class="form-check-input" type="checkbox" name="remember" id="remember" checked />
					<span data-sgtalk-i18n="auth.remember">保持登录状态</span>
				</label>

				<div class="alert alert-danger {{{ if !error }}} hidden{{{ end }}}" id="login-error-notify" role="alert" aria-atomic="true">
					<strong data-sgtalk-i18n="auth.loginFailed">登录失败</strong>
					<p class="mb-0">{error}</p>
				</div>
			</form>
			{{{ end }}}

			{{{ if alternate_logins }}}
			<div class="sg-auth-alt">
				<div class="sg-auth-subhead" data-sgtalk-i18n="auth.otherLogin">其他登录方式</div>
				<ul class="alt-logins list-unstyled">
				{{{ each authentication }}}
					<li class="{./name}">
						<a class="sg-auth-oauth" rel="nofollow noopener noreferrer" target="_top" href="{config.relative_path}{./url}">
							{{{ if ./icons.svg }}}
							{./icons.svg}
							{{{ else }}}
							<i class="flex-shrink-0 {./icons.normal}" style="color:{./color};"></i>
							{{{ end }}}
							<span data-sgtalk-oauth-label data-sgtalk-oauth-action="login" data-sgtalk-oauth-provider="{./name}">通过 {./name} 登录</span>
						</a>
					</li>
				{{{ end }}}
				</ul>
			</div>
			{{{ end }}}

			{{{ if allowRegistration }}}
			<div class="sg-auth-switch">
				<span data-sgtalk-i18n="auth.noAccount">还没有账号？</span>
				<a href="{config.relative_path}/register" data-sgtalk-i18n="auth.registerTitle">注册 SGTALK</a>
			</div>
			{{{ end }}}
		</section>
	</div>

	<div data-widget-area="sidebar" class="col-lg-3 col-sm-12 {{{ if !widgets.sidebar.length }}}hidden{{{ end }}}">
	{{{each widgets.sidebar}}}
	{{widgets.sidebar.html}}
	{{{end}}}
	</div>
</div>

<div data-widget-area="footer">
{{{each widgets.footer}}}
{{widgets.footer.html}}
{{{end}}}
</div>
