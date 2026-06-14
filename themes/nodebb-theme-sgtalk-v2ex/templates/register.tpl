<div data-widget-area="header">
{{{each widgets.header}}}
{{widgets.header.html}}
{{{end}}}
</div>

<div class="row sg-auth-layout register flex-fill">
	<div class="sg-auth-main {{{ if widgets.sidebar.length }}}col-lg-9 col-sm-12{{{ else }}}col-lg-12{{{ end }}}">
		<section class="sg-auth-box">
			<div class="sg-auth-head">
				<h2 data-sgtalk-i18n="auth.registerTitle">注册 SGTALK</h2>
				<p data-sgtalk-i18n="auth.registerBody">使用邮箱创建账号，完成后即可参与新加坡生活讨论。</p>
			</div>

			<form component="register/local" class="sg-auth-form" role="form" action="{config.relative_path}/register" method="post">
				<label class="sg-auth-field" for="username">
					<span data-sgtalk-i18n="auth.nickname">昵称</span>
					<input class="form-control" type="text" placeholder="2-16 个字符" data-sgtalk-i18n-placeholder="auth.nicknamePlaceholder" name="username" id="username" autocorrect="off" autocapitalize="off" autocomplete="username" required aria-required="true" aria-describedby="username-notify"/>
					<small class="register-feedback text-danger" id="username-notify" aria-live="polite"></small>
				</label>

				<label class="sg-auth-field" for="email">
					<span data-sgtalk-i18n="auth.email">邮箱</span>
					<input class="form-control" type="email" placeholder="用于登录、找回密码和接收验证邮件" data-sgtalk-i18n-placeholder="auth.emailPlaceholder" name="email" id="email" autocorrect="off" autocapitalize="off" autocomplete="email" required aria-required="true" aria-describedby="email-notify"/>
					<small class="register-feedback text-danger" id="email-notify" aria-live="polite"></small>
				</label>

				<label class="sg-auth-field" for="password">
					<span data-sgtalk-i18n="auth.password">密码</span>
					<input class="form-control" type="password" placeholder="至少 6 位" data-sgtalk-i18n-placeholder="auth.passwordPlaceholder" name="password" id="password" autocomplete="new-password" autocapitalize="off" required aria-required="true" aria-describedby="password-notify"/>
					<small class="register-feedback text-danger" id="password-notify" aria-live="polite"></small>
				</label>

				<label class="sg-auth-field" for="password-confirm">
					<span data-sgtalk-i18n="auth.confirmPassword">确认密码</span>
					<input class="form-control" type="password" placeholder="再次输入密码" data-sgtalk-i18n-placeholder="auth.confirmPasswordPlaceholder" name="password-confirm" id="password-confirm" autocomplete="new-password" autocapitalize="off" required aria-required="true" aria-describedby="password-confirm-notify"/>
					<small class="register-feedback text-danger" id="password-confirm-notify" aria-live="polite"></small>
				</label>

				<p id="caps-lock-warning" class="text-danger hidden">
					<i class="fa fa-exclamation-triangle"></i> <span data-sgtalk-i18n="auth.capsLock">大写锁定已开启</span>
				</p>

				{{{ each regFormEntry }}}
				<div class="sg-auth-field regFormEntry {./styleName}">
					<label for="{./inputId}">{./label}</label>
					<div>{{./html}}</div>
				</div>
				{{{ end }}}

				<button class="sg-v2-button primary sg-auth-submit" id="register" type="submit" data-sgtalk-i18n="auth.registerNow">立即注册</button>
				<p class="sg-auth-note" data-sgtalk-i18n="auth.registerNote">注册即表示你愿意遵守 SGTALK 社区公约。邮箱默认不公开。</p>

				<div class="alert alert-danger{{{ if !error }}} hidden{{{ end }}}" id="register-error-notify" role="alert" aria-atomic="true">
					<strong data-sgtalk-i18n="auth.registerFailed">注册失败</strong>
					<p class="mb-0">{error}</p>
				</div>

				<input id="token" type="hidden" name="token" value="" />
				<input id="noscript" type="hidden" name="noscript" value="true" />
				<input type="hidden" name="_csrf" value="{config.csrf_token}" />
			</form>

			{{{ if alternate_logins }}}
			<div class="sg-auth-alt">
				<div class="sg-auth-subhead" data-sgtalk-i18n="auth.otherRegister">其他注册方式</div>
				<ul class="alt-logins list-unstyled">
				{{{ each authentication }}}
					<li class="{./name}">
						<a class="sg-auth-oauth" rel="nofollow noopener noreferrer" target="_top" href="{config.relative_path}{./url}">
							{{{ if ./icons.svg }}}
							{./icons.svg}
							{{{ else }}}
							<i class="flex-shrink-0 {./icons.normal}" style="color:{./color};"></i>
							{{{ end }}}
							<span data-sgtalk-oauth-label data-sgtalk-oauth-action="register" data-sgtalk-oauth-provider="{./name}">通过 {./name} 注册</span>
						</a>
					</li>
				{{{ end }}}
				</ul>
			</div>
			{{{ end }}}

			<div class="sg-auth-switch">
				<span data-sgtalk-i18n="auth.haveAccount">已有账号？</span>
				<a href="{config.relative_path}/login" data-sgtalk-i18n="auth.login">登录</a>
			</div>
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
