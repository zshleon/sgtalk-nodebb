<!-- IMPORT partials/breadcrumbs-json-ld.tpl -->

{{{ if widgets.header.length }}}
<div data-widget-area="header">
	{{{ each widgets.header }}}
	{{widgets.header.html}}
	{{{ end }}}
</div>
{{{ end }}}

<div class="row flex-fill mt-3">
	<div class="d-flex flex-column {{{if widgets.sidebar.length }}}col-lg-9 col-sm-12{{{ else }}}col-lg-12{{{ end }}}">
		<section class="sg-node-head">
			<div class="sg-node-crumb">
				<a href="{config.relative_path}/">SGTALK</a>
				<span>›</span>
				<span>{./name}</span>
			</div>
			<div class="sg-node-title-line">
				<h1>{./name}</h1>
				<div class="sg-node-stats">
					<span>{humanReadableNumber(totalTopicCount)} 主题</span>
					<span>{humanReadableNumber(totalPostCount)} 回复</span>
				</div>
			</div>
			{{{ if ./descriptionParsed }}}
			<div class="sg-node-desc">{./descriptionParsed}</div>
			{{{ end }}}
		</section>

		<div class="category d-flex flex-column">
			<!-- IMPORT partials/category/subcategory.tpl -->
			<!-- IMPORT partials/topic-list-bar.tpl -->

			{{{ if (./inbox && (./hasFollowers == false)) }}}
			<div class="alert alert-warning mb-4" id="category-no-followers" data-bs-toggle="dropdown" data-bs-target='[component="topic/watch"] button' aria-hidden="true">
				<i class="fa fa-triangle-exclamation pe-2"></i>
				[[category:no-followers]]
				<a href="#" class="stretched-link"></a>
			</div>
			{{{ end }}}

			{{{ if !topics.length }}}
			<section class="sg-empty-state" id="category-no-topics">
				<strong>暂无主题。</strong>
				<p>这个节点还没有讨论。你可以发布第一条主题，或先浏览其他节点。</p>
				<div class="sg-empty-actions">
					{{{ if privileges.topics:create }}}
					<a class="sg-v2-button primary" href="{config.relative_path}/compose?cid={cid}" data-ajaxify="false">发布主题</a>
					{{{ end }}}
					{{{ if !privileges.topics:create }}}
					<a class="sg-v2-button primary" href="{config.relative_path}/login">登录后发帖</a>
					{{{ end }}}
					<a class="sg-v2-button" href="{config.relative_path}/categories">查看全部节点</a>
				</div>
			</section>
			{{{ end }}}

			<!-- IMPORT partials/topics_list.tpl -->

			{{{ if config.usePagination }}}
			<!-- IMPORT partials/paginator.tpl -->
			{{{ end }}}
		</div>
	</div>
	<div data-widget-area="sidebar" class="col-lg-3 col-sm-12 {{{ if !widgets.sidebar.length }}}hidden{{{ end }}}">
		{{{ each widgets.sidebar }}}
		{{widgets.sidebar.html}}
		{{{ end }}}
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
