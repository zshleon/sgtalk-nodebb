<!-- IMPORT partials/breadcrumbs-json-ld.tpl -->

{{{ if widgets.header.length }}}
<div data-widget-area="header">
{{{each widgets.header}}}
{{widgets.header.html}}
{{{end}}}
</div>
{{{ end }}}

<div class="row flex-fill mt-3 sg-topic-layout" itemid="{url}" itemscope itemtype="https://schema.org/DiscussionForumPosting">
	<meta itemprop="headline" content="{escape(titleRaw)}">
	<meta itemprop="text" content="{escape(titleRaw)}">
	<meta itemprop="url" content="{url}">
	<meta itemprop="datePublished" content="{timestampISO}">
	<meta itemprop="dateModified" content="{lastposttimeISO}">
	<div itemprop="author" itemscope itemtype="https://schema.org/Person">
		<meta itemprop="name" content="{author.username}">
		{{{ if author.userslug }}}<meta itemprop="url" content="{config.relative_path}/user/{author.userslug}">{{{ end }}}
	</div>
	<div itemprop="interactionStatistic" itemscope itemtype="https://schema.org/InteractionCounter">
		<meta itemprop="interactionType" content="https://schema.org/CommentAction">
		<meta itemprop="userInteractionCount" content="{increment(postcount, "-1")}">
	</div>
	<div itemprop="interactionStatistic" itemscope itemtype="https://schema.org/InteractionCounter">
		<meta itemprop="interactionType" content="https://schema.org/LikeAction">
		<meta itemprop="userInteractionCount" content="{upvotes}">
	</div>

	<div class="{{{ if widgets.sidebar.length }}}col-lg-9 col-sm-12{{{ else }}}col-lg-12{{{ end }}}">
		<section class="sg-topic-head">
			<div class="sg-topic-crumb">
				<a href="{config.relative_path}/">SGTALK</a>
				<span>›</span>
				<a class="sg-category-label" href="{config.relative_path}/category/{category.slug}">{category.name}</a>
			</div>
			<h1 component="post/header">
				<span class="topic-title" component="topic/title">{title}</span>
			</h1>
			<div class="sg-topic-byline">
				<a href="{{{ if author.userslug }}}{config.relative_path}/user/{author.userslug}{{{ else }}}#{{{ end }}}">{author.username}</a>
				<span>·</span>
				<span class="timeago" title="{timestampISO}"></span>
				<span>·</span>
				<span>{increment(postcount, "-1")} 回复</span>
				<span component="topic/labels" class="sg-topic-state-labels {{{ if (!scheduled && (!pinned && (!locked && (!icons.length && (!oldCid || (oldCid == "-1")))))) }}}hidden{{{ end }}}">
					<span component="topic/scheduled" class="badge {{{ if !scheduled }}}hidden{{{ end }}}" data-sgtalk-i18n="topic.scheduled">定时</span>
					<span component="topic/pinned" class="badge {{{ if (scheduled || !pinned) }}}hidden{{{ end }}}" data-sgtalk-i18n="topic.pinned">置顶</span>
					<span component="topic/locked" class="badge {{{ if !locked }}}hidden{{{ end }}}" data-sgtalk-i18n="topic.locked">锁定</span>
					<a component="topic/moved" href="{config.relative_path}/category/{oldCid}" class="badge text-decoration-none {{{ if (!oldCid || (oldCid == "-1")) }}}hidden{{{ end }}}" data-sgtalk-i18n="topic.moved">已移动</a>
					{{{each icons}}}<span class="lh-1">{@value}</span>{{{end}}}
				</span>
				<div data-tid="{./tid}" component="topic/tags" class="tags tag-list d-flex flex-wrap hidden-xs hidden-empty gap-1"><!-- IMPORT partials/topic/tags.tpl --></div>
			</div>
		</section>

		<div class="topic sg-topic-body">
			<!-- IMPORT partials/post_bar.tpl -->
			{{{ if merger }}}
			<!-- IMPORT partials/topic/merged-message.tpl -->
			{{{ end }}}
			{{{ if forker }}}
			<!-- IMPORT partials/topic/forked-message.tpl -->
			{{{ end }}}
			{{{ if !scheduled }}}
			<!-- IMPORT partials/topic/deleted-message.tpl -->
			{{{ end }}}

			<ul component="topic" class="posts timeline list-unstyled p-0" data-tid="{tid}" data-cid="{cid}">
			{{{ each posts }}}
				<li component="post" class="{{{ if posts.deleted }}}deleted{{{ end }}} {{{ if posts.selfPost }}}self-post{{{ end }}} {{{ if posts.topicOwnerPost }}}topic-owner-post{{{ end }}}" <!-- IMPORT partials/data/topic.tpl -->>
					<a component="post/anchor" data-index="{./index}" id="{increment(./index, "1")}"></a>
					<meta itemprop="datePublished" content="{./timestampISO}">
					{{{ if ./editedISO }}}
					<meta itemprop="dateModified" content="{./editedISO}">
					{{{ end }}}

					<!-- IMPORT partials/topic/post.tpl -->
				</li>
				{{{ if (config.topicPostSort != "most_votes") }}}
				{{{ each ./events}}}<!-- IMPORT partials/topic/event.tpl -->{{{ end }}}
				{{{ end }}}
			{{{ end }}}
			</ul>

			{{{ if browsingUsers }}}
			<div class="visible-xs">
				<!-- IMPORT partials/topic/browsing-users.tpl -->
				<hr/>
			</div>
			{{{ end }}}
			{{{ if config.theme.enableQuickReply }}}
			<!-- IMPORT partials/topic/quickreply.tpl -->
			{{{ end }}}

			{{{ if config.usePagination }}}
			<!-- IMPORT partials/paginator.tpl -->
			{{{ end }}}
		</div>
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

{{{ if !config.usePagination }}}
<noscript>
<!-- IMPORT partials/paginator.tpl -->
</noscript>
{{{ end }}}
