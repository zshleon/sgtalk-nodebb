<div data-widget-area="header">
	{{{each widgets.header}}}
	{{widgets.header.html}}
	{{{end}}}
</div>

<div class="groups list flex-fill sg-static-row">
	<section class="sg-static-box">
		<header class="sg-static-head">
			<div class="sg-directory-crumb">
				<a href="{config.relative_path}/">SGTALK</a>
			</div>
			<h1 data-sgtalk-i18n="groups.title">社区群组</h1>
			<p data-sgtalk-i18n="groups.summary">SGTALK 目前以公开节点讨论为主，暂不开放公开群组目录。</p>
		</header>
		<div class="sg-static-body">
			<p data-sgtalk-i18n="groups.body">如果你想围绕某个话题长期组织讨论，可以先在合适节点发起主题。等社区活跃后，我们会再开放更细的群组和自建节点能力。</p>
			<div class="sg-empty-actions">
				<a class="sg-v2-button primary" href="{config.relative_path}/categories" data-sgtalk-i18n="groups.viewNodes">查看节点</a>
				<a class="sg-v2-button" href="{config.relative_path}/recent" data-sgtalk-i18n="groups.backTopics">返回主题</a>
			</div>
		</div>
	</section>
</div>

<div data-widget-area="footer">
	{{{each widgets.footer}}}
	{{widgets.footer.html}}
	{{{end}}}
</div>
