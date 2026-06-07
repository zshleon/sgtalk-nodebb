<!-- IMPORT partials/account/header.tpl -->

<section class="sg-account-section">
	<div class="sg-account-section-title">关于</div>
	{{{ if aboutme }}}
	<div component="aboutme" class="sg-account-about">
		{aboutmeParsed}
	</div>
	{{{ else }}}
	<div class="sg-account-muted">暂无简介。</div>
	{{{ end }}}
</section>

<section class="sg-account-section">
	<div class="sg-account-section-title">社区活动</div>
	<div class="sg-account-stats">
		<div>
			<span>主题</span>
			<strong>{humanReadableNumber(counts.topics)}</strong>
		</div>
		<div>
			<span>回复</span>
			<strong>{humanReadableNumber(counts.posts)}</strong>
		</div>
		<div>
			<span>声望</span>
			<strong>{humanReadableNumber(reputation)}</strong>
		</div>
		<div>
			<span>资料浏览</span>
			<strong>{humanReadableNumber(profileviews)}</strong>
		</div>
	</div>
</section>

<section class="sg-account-section sg-account-links">
	<div class="sg-account-section-title">常用入口</div>
	<a href="{config.relative_path}/user/{userslug}/topics">查看主题</a>
	<a href="{config.relative_path}/user/{userslug}/posts">查看回复</a>
	{{{ if canEdit }}}
	<a href="{config.relative_path}/user/{userslug}/edit">编辑资料</a>
	<a href="{config.relative_path}/user/{userslug}/settings">账号设置</a>
	{{{ end }}}
</section>

<!-- IMPORT partials/account/footer.tpl -->
