<!-- IMPORT partials/account/header.tpl -->

<div class="sg-account-subhead">
	<h3>主题</h3>
	<a href="{config.relative_path}/user/{userslug}/posts">查看回复</a>
</div>

{{{ if !topics.length }}}
<div class="sg-account-empty">暂无主题。</div>
{{{ end }}}

<div class="category sg-account-topic-list">
	<!-- IMPORT partials/topics_list.tpl -->
	{{{ if config.usePagination }}}
	<!-- IMPORT partials/paginator.tpl -->
	{{{ end }}}
</div>

<!-- IMPORT partials/account/footer.tpl -->
