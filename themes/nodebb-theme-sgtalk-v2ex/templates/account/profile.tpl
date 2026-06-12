<!-- IMPORT partials/account/header.tpl -->

<section class="sg-account-section sg-account-recent">
	<div class="sg-account-section-title">最近内容</div>
	{{{ if latestPosts.length }}}
	<div class="sg-account-recent-list">
		{{{ each latestPosts }}}
		<a class="sg-account-recent-item" href="{config.relative_path}/topic/{./topic.slug}">
			<span class="sg-category-label">{./category.name}</span>
			<strong>{./topic.title}</strong>
			<span class="sg-account-recent-meta"><span class="timeago" title="{./timestampISO}"></span></span>
		</a>
		{{{ end }}}
	</div>
	{{{ else }}}
	<div class="sg-account-muted">暂无公开内容。</div>
	{{{ end }}}
</section>

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
	<div class="sg-account-info-table">
		<div>
			<span>主题</span>
			<strong>{humanReadableNumber(counts.topics)}</strong>
		</div>
		<div>
			<span>回复</span>
			<strong>{humanReadableNumber(counts.posts)}</strong>
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
