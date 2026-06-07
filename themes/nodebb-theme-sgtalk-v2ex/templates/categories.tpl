{{{ if widgets.header.length }}}
<div data-widget-area="header">
	{{{each widgets.header}}}
	{{widgets.header.html}}
	{{{end}}}
</div>
{{{ end }}}

<div class="row flex-fill sg-directory-row">
	<div class="{{{if widgets.sidebar.length }}}col-lg-9 col-sm-12{{{ else }}}col-lg-12{{{ end }}}">
		<section class="sg-directory-box">
			<header class="sg-directory-head">
				<div>
					<div class="sg-directory-crumb">
						<a href="{config.relative_path}/">SGTALK</a>
					</div>
					<h1>节点</h1>
				</div>
				<div class="sg-directory-actions">
					<a href="{config.relative_path}/recent">全部主题</a>
					<a href="{config.relative_path}/popular">最热</a>
				</div>
			</header>

			<div class="sg-directory-list" itemscope itemtype="http://www.schema.org/ItemList">
				{{{ each categories }}}
				<a component="categories/category" data-cid="{./cid}" class="sg-directory-node category-{./cid}" href="{config.relative_path}/category/{./slug}" itemprop="url">
					<span class="sg-directory-node-name" itemprop="name">{./name}</span>
					{{{ if ./descriptionParsed }}}
					<span class="sg-directory-node-desc">{./descriptionParsed}</span>
					{{{ end }}}
					<span class="sg-directory-node-stats">
						<span>{humanReadableNumber(./totalTopicCount)} 主题</span>
						<span>{humanReadableNumber(./totalPostCount)} 回复</span>
					</span>
				</a>
				{{{ end }}}
			</div>
		</section>

		<!-- IMPORT partials/paginator.tpl -->
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

<script>
document.title = '节点 | SGTALK';
</script>
