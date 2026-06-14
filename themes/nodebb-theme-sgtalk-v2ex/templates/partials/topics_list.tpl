<ul component="category" class="topics-list sg-topic-list list-unstyled" itemscope itemtype="http://www.schema.org/ItemList" data-nextstart="{nextStart}" data-set="{set}">
	{{{ each topics }}}
	<li component="category/topic" class="sg-topic-row {function.generateTopicClass}" <!-- IMPORT partials/data/category.tpl -->>
		<link itemprop="url" content="{config.relative_path}/topic/{./slug}" />
		<meta itemprop="name" content="{function.stripTags, ./title}" />
		<meta itemprop="itemListOrder" content="descending" />
		<meta itemprop="position" content="{increment(./index, "1")}" />
		<a id="{./index}" data-index="{./index}" component="topic/anchor"></a>

		<a class="sg-topic-avatar avatar-tooltip" title="{./user.displayname}" href="{{{ if ./user.userslug }}}{config.relative_path}/user/{./user.userslug}{{{ else }}}#{{{ end }}}">
			{buildAvatar(./user, "48px", true)}
		</a>

		<div class="sg-topic-main">
			<h3 component="topic/header" class="sg-topic-title">
				<a href="{{{ if topics.noAnchor }}}#{{{ else }}}{config.relative_path}/topic/{./slug}{{{ if ./bookmark }}}/{./bookmark}{{{ end }}}{{{ end }}}">{./title}</a>
			</h3>

			<div class="sg-topic-meta">
				{{{ if (!template.category || (cid != ./cid)) }}}
				<a class="sg-category-label" href="{config.relative_path}/category/{./category.slug}">{./category.name}</a>
				{{{ end }}}
				<a class="sg-topic-user" href="{{{ if ./user.userslug }}}{config.relative_path}/user/{./user.userslug}{{{ else }}}#{{{ end }}}">{./user.displayname}</a>
				<span class="sg-dot">·</span>
				<a href="{config.relative_path}/topic/{./slug}" class="timeago" title="{./timestampISO}"></a>
				{{{ if ./teaser.pid }}}
				<span class="sg-dot sg-mobile-hide">·</span>
				<span class="sg-mobile-hide">最后回复</span>
				<a class="sg-topic-user sg-mobile-hide" href="{{{ if ./teaser.user.userslug }}}{config.relative_path}/user/{./teaser.user.userslug}{{{ else }}}#{{{ end }}}">{./teaser.user.displayname}</a>
				{{{ end }}}
			</div>
		</div>

		<a class="sg-topic-count" href="{config.relative_path}/topic/{./slug}{{{ if ./teaser.index }}}/{./teaser.index}{{{ end }}}">
			{humanReadableNumber(./postcount, 0)}
		</a>
	</li>
	{{{ end }}}
</ul>
