<div component="topic/reply/container" class="btn-group {{{ if !privileges.topics:reply }}}hidden{{{ end }}}">
	<a href="{config.relative_path}/compose?tid={tid}" class="d-flex gap-2 align-items-center btn btn-sm btn-primary fw-semibold" component="topic/reply" data-ajaxify="false" role="button">
		<i class="fa fa-fw fa-reply"></i>
		<span class="text-truncate text-nowrap" data-sgtalk-i18n="topic.reply">回复主题</span>
	</a>
	<button type="button" class="btn btn-sm btn-primary dropdown-toggle flex-0" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="更多回复选项" data-sgtalk-i18n-aria-label="topic.moreReplyOptions">
		<span class="caret"></span>
	</button>
	<ul class="dropdown-menu dropdown-menu-end p-1 text-sm" role="menu">
		<li><a class="dropdown-item rounded-1" href="#" component="topic/reply-as-topic" role="menuitem" data-sgtalk-i18n="topic.replyAsTopic">作为新主题回复</a></li>
	</ul>
</div>

{{{ if loggedIn }}}
	<a href="#" component="topic/reply/locked" class="d-flex gap-2 align-items-center fw-semibold btn btn-sm btn-primary disabled {{{ if (privileges.topics:reply || !locked) }}}hidden{{{ end }}}" disabled><i class="fa fa-fw fa-lock"></i> <span data-sgtalk-i18n="topic.lockedReply">主题已锁定</span></a>
{{{ else }}}
	{{{ if !privileges.topics:reply }}}
	<a component="topic/reply/guest" href="{config.relative_path}/login?next=%2Ftopic%2F{slug}" class="d-flex gap-2 align-items-center fw-semibold btn btn-sm btn-primary">
		<i class="fa fa-fw fa-sign-in"></i>
		<span data-sgtalk-i18n="topic.loginToReply">登录后回复</span>
	</a>
	{{{ end }}}
{{{ end }}}
