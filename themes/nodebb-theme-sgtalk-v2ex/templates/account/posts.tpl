<!-- IMPORT partials/account/header.tpl -->

<div class="sg-account-subhead">
	<h3 data-sgtalk-i18n="account.replies">回复</h3>
	<div class="sg-account-subtabs">
		<a href="{config.relative_path}/user/{userslug}/posts" class="{{{ if template.account/posts }}}active{{{ end }}}" data-sgtalk-i18n="account.latest">最新</a>
		{{{ if !reputation:disabled }}}
		<a href="{config.relative_path}/user/{userslug}/best" class="{{{ if template.account/best }}}active{{{ end }}}" data-sgtalk-i18n="account.best">最佳</a>
		<a href="{config.relative_path}/user/{userslug}/controversial" class="{{{ if template.account/controversial }}}active{{{ end }}}" data-sgtalk-i18n="account.controversial">争议</a>
		{{{ end }}}
	</div>
</div>

{{{ if !posts.length }}}
<div class="sg-account-empty" data-sgtalk-i18n="account.noReplies">暂无回复。</div>
{{{ end }}}

<div class="sg-account-post-list">
	<!-- IMPORT partials/posts_list.tpl -->

	{{{ if config.usePagination }}}
	<!-- IMPORT partials/paginator.tpl -->
	{{{ end }}}
</div>

<!-- IMPORT partials/account/footer.tpl -->
