{{{ if widgets.header.length }}}
<div data-widget-area="header">
	{{{each widgets.header}}}
	{{widgets.header.html}}
	{{{end}}}
</div>
{{{ end }}}

<div class="row flex-fill">
	<div class="recent {{{if widgets.sidebar.length }}}col-lg-9 col-sm-12{{{ else }}}col-lg-12{{{ end }}}">
		<!-- IMPORT partials/topic-list-bar.tpl -->

		<div class="category">
			{{{ if !topics.length }}}
			<section class="sg-empty-state" id="category-no-topics">
				<strong>还没有主题。</strong>
				<p>从一个真实问题、经验或新加坡生活细节开始。</p>
				<div class="sg-empty-actions">
					{{{ if canPost }}}
					<a class="sg-v2-button primary" href="{config.relative_path}/compose?cid={config.defaultComposeCid}" data-ajaxify="false">发布第一个主题</a>
					{{{ end }}}
					{{{ if !canPost }}}
					<a class="sg-v2-button primary" href="{config.relative_path}/login">登录后发帖</a>
					{{{ end }}}
					<a class="sg-v2-button" href="{config.relative_path}/categories">查看节点</a>
				</div>
				<div class="sg-empty-nodes">
					<a href="{config.relative_path}/category/5/问与答">问与答</a>
					<a href="{config.relative_path}/category/6/新移民">新移民</a>
					<a href="{config.relative_path}/category/7/安家租房">安家租房</a>
					<a href="{config.relative_path}/category/8/职业与薪资">职业与薪资</a>
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
