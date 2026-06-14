{{{ if widgets.header.length }}}
<div data-widget-area="header">
	{{{each widgets.header}}}
	{{widgets.header.html}}
	{{{end}}}
</div>
{{{ end }}}

<div class="row flex-fill">
		<!-- IMPORT partials/left-rail.tpl -->
		<div class="popular {{{if widgets.sidebar.length }}}col-lg-9 col-sm-12{{{ else }}}col-lg-12{{{ end }}}">
		<!-- IMPORT partials/topic-list-bar.tpl -->
		<div class="category">
			{{{ if !topics.length }}}
			<section class="sg-empty-state" id="category-no-topics">
				<strong data-sgtalk-i18n="empty.noHotTopicsTitle">暂时没有热门主题。</strong>
				<p data-sgtalk-i18n="empty.noHotTopicsBody">有新的讨论后，这里会自然出现被关注的主题。</p>
				<div class="sg-empty-actions">
					<a class="sg-v2-button" href="{config.relative_path}/recent" data-sgtalk-i18n="filter.all">查看全部主题</a>
					<a class="sg-v2-button" href="{config.relative_path}/categories" data-sgtalk-i18n="empty.viewNodes">查看节点</a>
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
