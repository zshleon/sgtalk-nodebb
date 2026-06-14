<aside class="sg-v2-left-rail" aria-label="社区导航" data-sgtalk-i18n-aria-label="rail.label">
	<section class="sg-v2-left-card">
		<div class="sg-v2-left-group">
			<div class="sg-v2-left-heading" data-sgtalk-i18n="rail.community">社区</div>
			<a href="{config.relative_path}/categories" class="{{{ if template.categories }}}active{{{ end }}}" data-sgtalk-i18n="rail.allNodes">全部节点</a>
			<a href="{config.relative_path}/recent" class="{{{ if template.recent }}}active{{{ end }}}" data-sgtalk-i18n="rail.active">活跃主题</a>
			<a href="{config.relative_path}/popular" class="{{{ if template.popular }}}active{{{ end }}}" data-sgtalk-i18n="rail.hot">热门讨论</a>
		</div>
			<div class="sg-v2-left-group">
				<div class="sg-v2-left-heading" data-sgtalk-i18n="rail.nodes">节点</div>
				{{{ each config.sgtalkNavNodes }}}
				<a href="{config.relative_path}/category/{./slug}" class="{{{ if (cid == ./cid) }}}active{{{ end }}}" {{{ if ./i18nKey }}}data-sgtalk-i18n="{./i18nKey}"{{{ end }}}>{./name}</a>
				{{{ end }}}
			</div>
			<div class="sg-v2-left-footer sg-user-only">
			<a href="{config.relative_path}/unread" aria-label="未读" data-sgtalk-i18n-aria-label="rail.unread"><i class="fa fa-clock-o"></i></a>
			<a href="{config.relative_path}/notifications" aria-label="通知" data-sgtalk-i18n-aria-label="rail.notifications"><i class="fa fa-bell-o"></i></a>
			<a href="{config.relative_path}/tags" aria-label="标签" data-sgtalk-i18n-aria-label="rail.tags"><i class="fa fa-tags"></i></a>
		</div>
	</section>
</aside>
