<div data-widget-area="header">
{{{each widgets.header}}}
{{widgets.header.html}}
{{{end}}}
</div>

<div class="row sg-auth-layout sg-register-complete flex-fill">
	<div class="sg-auth-main col-lg-12 col-sm-12">
		<section class="sg-auth-box sg-auth-box-wide">
			<div class="sg-auth-head">
				<h2>{{{ if register }}}完成注册{{{ else }}}完善账号{{{ end }}}</h2>
				<p>这一步用于补充账号资料。你也可以先退出这次注册，继续浏览公开内容。</p>
			</div>

			{{{ if errors.length }}}
			<div class="sg-auth-errors">
				<strong>请检查下面的信息：</strong>
				<ul>
				{{{each errors}}}
					<li>{@value}</li>
				{{{end}}}
				</ul>
			</div>
			{{{ end }}}

			<form class="sg-auth-form" role="form" method="post" action="{config.relative_path}/register/complete" enctype="multipart/form-data">
				<input type="hidden" name="csrf_token" value="{config.csrf_token}" />
				{{{each sections}}}
				<div class="sg-auth-section">
					{@value}
				</div>
				{{{end}}}

				<button class="sg-v2-button primary sg-auth-submit" type="submit">完成</button>
				<div class="sg-auth-secondary-actions">
					<button class="sg-auth-text-button" type="submit" formnovalidate formaction="{config.relative_path}/register/abort">退出本次注册</button>
					<a class="sg-auth-text-button" href="{config.relative_path}/login">改用登录</a>
					<a class="sg-auth-text-button" href="{config.relative_path}/auth/google">Google 登录</a>
				</div>
			</form>
		</section>
	</div>
</div>

<div data-widget-area="footer">
{{{each widgets.footer}}}
{{widgets.footer.html}}
{{{end}}}
</div>
