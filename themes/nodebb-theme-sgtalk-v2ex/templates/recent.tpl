{{{ if widgets.header.length }}}
<div data-widget-area="header">
	{{{each widgets.header}}}
	{{widgets.header.html}}
	{{{end}}}
</div>
{{{ end }}}

<div class="row flex-fill">
	<!-- IMPORT partials/left-rail.tpl -->
	<div class="recent {{{if widgets.sidebar.length }}}col-lg-9 col-sm-12{{{ else }}}col-lg-12{{{ end }}}">
		<!-- IMPORT partials/topic-list-bar.tpl -->

		<div class="category">
			{{{ if !topics.length }}}
			<section class="sg-empty-state" id="category-no-topics">
				<strong data-sgtalk-i18n="empty.noTopicsTitle">这里还没有主题</strong>
				<p data-sgtalk-i18n="empty.noTopicsBody">欢迎发布第一个主题，或者先去其它节点看看大家在聊什么。</p>
				<div class="sg-empty-actions">
					{{{ if canPost }}}
					<a class="sg-v2-button primary" href="{config.relative_path}/compose?cid={config.defaultComposeCid}" data-ajaxify="false" data-sgtalk-i18n="empty.firstTopic">发布第一个主题</a>
						{{{ end }}}
						{{{ if !canPost }}}
							<a class="sg-v2-button primary" href="{config.relative_path}/login?next=%2Fcompose%3Fcid%3D{config.defaultComposeCid}" data-sgtalk-i18n="topic.loginToPost">登录后发帖</a>
						{{{ end }}}
					<a class="sg-v2-button" href="{config.relative_path}/categories" data-sgtalk-i18n="empty.viewNodes">浏览节点</a>
					</div>
					<div class="sg-empty-nodes">
						{{{ each config.sgtalkStarterNodes }}}
						<a href="{config.relative_path}/category/{./slug}" {{{ if ./i18nKey }}}data-sgtalk-i18n="{./i18nKey}"{{{ end }}}>{./name}</a>
						{{{ end }}}
					</div>
				</section>
			{{{ end }}}

			{{{ if (selectedCategory.cid == "-1") }}}
			<div class="py-3">
				<h4>[[recent:uncategorized.title]]</h4>
				<p>[[recent:uncategorized.intro]]</p>
			</div>
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
