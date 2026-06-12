<div class="sg-v2-listbar">
	<nav class="sg-v2-list-tabs" aria-label="主题筛选">
		{{{ if template.category }}}
		<a href="{config.relative_path}/category/{cid}" class="active">节点主题</a>
		<a href="{config.relative_path}/recent">全部主题</a>
		{{{ else }}}
		<a href="{config.relative_path}/recent" class="{{{ if template.recent }}}active{{{ end }}}">全部主题</a>
		<a href="{config.relative_path}/popular" class="{{{ if template.popular }}}active{{{ end }}}">热门主题</a>
		{{{ if !template.popular }}}
		<a href="{config.relative_path}/recent?filter=new">新主题</a>
		{{{ end }}}
		{{{ end }}}
	</nav>
	<div class="sg-v2-list-actions">
		{{{ if (!feeds:disableRSS && rssFeedUrl) }}}
		<a class="sg-v2-list-link" target="_blank" href="{rssFeedUrl}" itemprop="item">RSS</a>
		{{{ end }}}

		{{{ if (template.category || template.world) }}}
			{{{ if privileges.topics:create }}}
			<a href="{config.relative_path}/compose?cid={cid}" class="sg-v2-post-link" data-ajaxify="false" role="button">发布主题</a>
			{{{ end }}}
		{{{ else }}}
			{{{ if canPost }}}
			<a href="{config.relative_path}/compose?cid={config.defaultComposeCid}" class="sg-v2-post-link" data-ajaxify="false" role="button">发布主题</a>
			{{{ end }}}
		{{{ end }}}

		{{{ if (!loggedIn && (!privileges.topics:create && !canPost))}}}
		<a component="category/post/guest" href="{config.relative_path}/login" class="sg-v2-post-link">登录后发帖</a>
		{{{ end }}}
	</div>
</div>
