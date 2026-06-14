<div class="sg-auth-inline">
	{{{ if hasPending }}}
	<div class="alert alert-info">
		<p data-sgtalk-i18n="auth.emailPending">验证邮件已经发送。如果需要重新发送，请在下面填写邮箱。</p>
	</div>
	{{{ end }}}

	<p class="sg-auth-section-copy" data-sgtalk-i18n="auth.emailUpdateBody">请填写邮箱。邮箱用于登录、找回密码和接收必要通知，默认不会公开。</p>

	<label class="sg-auth-field" for="email">
		<span data-sgtalk-i18n="auth.email">邮箱</span>
		<input class="form-control" type="email" id="email" name="email" placeholder="{email}" data-sgtalk-i18n-placeholder="auth.emailPlaceholder" value="{email}" {{{ if requireEmailAddress }}}required{{{ end }}} />
		<small data-sgtalk-i18n="auth.emailVerifyHint">提交后会收到一封验证邮件，点击邮件里的链接即可完成验证。</small>
	</label>

	{{{ if issuePasswordChallenge }}}
	<label class="sg-auth-field" for="password">
		<span data-sgtalk-i18n="auth.currentPassword">当前密码</span>
		<input class="form-control" type="password" id="password" name="password" autocomplete="current-password" data-sgtalk-i18n-placeholder="auth.currentPassword" placeholder="当前密码" />
		<small data-sgtalk-i18n="auth.currentPasswordHint">为确认账号归属，请输入当前密码。</small>
	</label>
	{{{ end }}}
</div>
