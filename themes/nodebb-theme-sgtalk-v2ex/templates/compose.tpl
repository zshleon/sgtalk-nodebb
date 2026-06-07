{{{ if widgets.header.length }}}
<div data-widget-area="header">
	{{{each widgets.header}}}
	{{widgets.header.html}}
	{{{end}}}
</div>
{{{ end }}}

<section class="sg-compose-page">
	<header class="sg-compose-head">
		<div>
			<div class="sg-compose-crumb">
				<a href="{config.relative_path}/">SGTALK</a>
				<span>›</span>
				<span>创建新主题</span>
			</div>
			<h2>发布主题</h2>
		</div>
		<a class="sg-compose-back" href="{config.relative_path}/recent">返回主题列表</a>
	</header>

	<div component="composer" class="composer pb-3 h-100 {{{ if resizable }}} resizable{{{ end }}}{{{ if !isTopicOrMain }}} reply{{{ end }}}"{{{ if !disabled }}} style="visibility: inherit;"{{{ end }}}>
		<div class="composer-container d-flex flex-column gap-1 h-100">
			<form id="compose-form" method="post">
				{{{ if pid }}}
				<input type="hidden" name="pid" value="{pid}" />
				<input type="hidden" name="thumb" value="{thumb}" />
				{{{ end }}}
				{{{ if tid }}}
				<input type="hidden" name="tid" value="{tid}" />
				{{{ end }}}
				{{{ if cid }}}
				<input type="hidden" name="cid" value="{cid}" />
				{{{ end }}}
				<input type="hidden" name="_csrf" value="{config.csrf_token}" />
			</form>

			<!-- IMPORT partials/composer-title-container.tpl -->
			<!-- IMPORT partials/composer-formatting.tpl -->
			<!-- IMPORT partials/composer-write-preview.tpl -->

			{{{ if isTopicOrMain }}}
			<!-- IMPORT partials/composer-tags.tpl -->
			{{{ end }}}
		</div>
	</div>
</section>

<div data-widget-area="footer">
	{{{each widgets.footer}}}
	{{widgets.footer.html}}
	{{{end}}}
</div>
