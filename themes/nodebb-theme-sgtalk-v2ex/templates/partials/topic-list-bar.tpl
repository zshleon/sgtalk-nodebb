<div class="sg-v2-listbar">
	<nav class="sg-v2-list-tabs" aria-label="全部主题" data-sgtalk-i18n-aria-label="filter.all">
			{{{ if template.category }}}
			<a href="{config.relative_path}/category/{slug}" class="active" data-sgtalk-i18n="filter.topic">节点主题</a>
			<a href="{config.relative_path}/recent" data-sgtalk-i18n="filter.all">全部主题</a>
		{{{ else }}}
		<a href="{config.relative_path}/recent" class="{{{ if template.recent }}}active{{{ end }}}" data-sgtalk-i18n="filter.all">全部主题</a>
		<a href="{config.relative_path}/popular" class="{{{ if template.popular }}}active{{{ end }}}" data-sgtalk-i18n="filter.hot">热门主题</a>
		{{{ if !template.popular }}}
		<a href="{config.relative_path}/recent?filter=new" data-sgtalk-i18n="filter.new">新主题</a>
		{{{ end }}}
		{{{ end }}}
	</nav>
	<div class="sg-v2-list-actions">
		{{{ if (!feeds:disableRSS && rssFeedUrl) }}}
		<a class="sg-v2-list-link" target="_blank" href="{rssFeedUrl}" itemprop="item">RSS</a>
		{{{ end }}}

		{{{ if (template.category || template.world) }}}
			{{{ if privileges.topics:create }}}
			<a href="{config.relative_path}/compose?cid={cid}" class="sg-v2-post-link" data-ajaxify="false" role="button" data-sgtalk-i18n="topic.publish">发布主题</a>
			{{{ end }}}
		{{{ else }}}
			{{{ if canPost }}}
			<a href="{config.relative_path}/compose?cid={config.defaultComposeCid}" class="sg-v2-post-link" data-ajaxify="false" role="button" data-sgtalk-i18n="topic.publish">发布主题</a>
			{{{ end }}}
		{{{ end }}}

			{{{ if (!loggedIn && (!privileges.topics:create && !canPost))}}}
				{{{ if (template.category || template.world) }}}
					<a component="category/post/guest" href="{config.relative_path}/login?next=%2Fcompose%3Fcid%3D{cid}" class="sg-v2-button sg-v2-button-subtle" data-sgtalk-i18n="topic.loginToPost">登录后发帖</a>
					{{{ else }}}
					<a component="category/post/guest" href="{config.relative_path}/login?next=%2Fcompose%3Fcid%3D{config.defaultComposeCid}" class="sg-v2-button sg-v2-button-subtle" data-sgtalk-i18n="topic.loginToPost">登录后发帖</a>
					{{{ end }}}
			{{{ end }}}
	</div>
</div>
