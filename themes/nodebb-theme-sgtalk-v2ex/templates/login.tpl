<div data-widget-area="header">
{{{each widgets.header}}}
{{widgets.header.html}}
{{{end}}}
</div>

<div class="row sg-auth-layout login flex-fill">
	<div class="sg-auth-main {{{ if widgets.sidebar.length }}}col-lg-9 col-sm-12{{{ else }}}col-lg-12{{{ end }}}">
		<section class="sg-auth-box">
			<div class="sg-auth-head">
				<h2>登录 SGTALK</h2>
				<p>登录后可以继续发布主题、回复和收藏节点。</p>
				<p class="sg-auth-context" data-sgtalk-login-context hidden></p>
			</div>

			{{{ if allowLocalLogin }}}
			<form class="sg-auth-form" role="form" method="post" id="login-form">
				<label class="sg-auth-field" for="username">
					<span>用户名 / 邮箱</span>
					<input class="form-control" type="text" placeholder="用户名 / 邮箱" name="username" id="username" autocorrect="off" autocapitalize="off" autocomplete="nickname" value="{username}" required aria-required="true" aria-describedby="login-username-notify"/>
					<small class="login-feedback text-danger" id="login-username-notify" aria-live="polite"></small>
				</label>

				<label class="sg-auth-field" for="password">
					<span>密码</span>
					<input class="form-control" type="password" placeholder="密码" name="password" id="password" autocomplete="current-password" autocapitalize="off" required aria-required="true" aria-describedby="login-password-notify"/>
					<small class="login-feedback text-danger" id="login-password-notify" aria-live="polite"></small>
				</label>

				<p id="caps-lock-warning" class="text-danger hidden text-sm mb-0 form-text" aria-live="polite" role="alert" aria-atomic="true">
					<i class="fa fa-exclamation-triangle"></i> 大写锁定已开启
				</p>

				{{{ if allowPasswordReset }}}
				<a id="reset-link" class="sg-auth-small-link" href="{config.relative_path}/reset">忘记密码？</a>
				{{{ end }}}

				{{{ each loginFormEntry }}}
				<div class="sg-auth-field loginFormEntry {./styleName}">
					<label for="{./inputId}">{./label}</label>
					<div>{{./html}}</div>
				</div>
				{{{ end }}}

				<input type="hidden" name="_csrf" value="{config.csrf_token}" />
				<input type="hidden" name="noscript" id="noscript" value="true" />

				<button class="sg-v2-button primary sg-auth-submit" id="login" type="submit">登录</button>

				<label class="sg-auth-check" for="remember">
					<input class="form-check-input" type="checkbox" name="remember" id="remember" checked />
					<span>保持登录状态</span>
				</label>

				<div class="alert alert-danger {{{ if !error }}} hidden{{{ end }}}" id="login-error-notify" role="alert" aria-atomic="true">
					<strong>登录失败</strong>
					<p class="mb-0">{error}</p>
				</div>
			</form>
			{{{ end }}}

			{{{ if alternate_logins }}}
			<div class="sg-auth-alt">
				<div class="sg-auth-subhead">其他登录方式</div>
				<ul class="alt-logins list-unstyled">
				{{{ each authentication }}}
					<li class="{./name}">
						<a class="sg-auth-oauth" rel="nofollow noopener noreferrer" target="_top" href="{config.relative_path}{./url}">
							{{{ if ./icons.svg }}}
							{./icons.svg}
							{{{ else }}}
							<i class="flex-shrink-0 {./icons.normal}" style="color:{./color};"></i>
							{{{ end }}}
							<span>通过 Google 登录</span>
						</a>
					</li>
				{{{ end }}}
				</ul>
			</div>
			{{{ end }}}

			{{{ if allowRegistration }}}
			<div class="sg-auth-switch">
				还没有账号？
				<a href="{config.relative_path}/register">注册 SGTALK</a>
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
