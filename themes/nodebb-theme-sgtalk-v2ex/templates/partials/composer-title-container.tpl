<div class="title-container sg-composer-title-container">
	{{{ if isTopic }}}
	<div class="sg-composer-field sg-composer-node-field">
		<label data-sgtalk-i18n="compose.node">节点</label>
		<div class="category-list-container">
			<!-- IMPORT partials/category/selector-dropdown-left.tpl -->
		</div>
	</div>
	{{{ end }}}

	{{{ if showHandleInput }}}
	<div data-component="composer/handle" class="sg-composer-field sg-composer-handle-field">
		<label data-sgtalk-i18n="compose.identity">身份</label>
		<input class="handle form-control shadow-none" type="text" placeholder="[[topic:composer.handle-placeholder]]" value="{handle}" />
	</div>
	{{{ end }}}

	<div data-component="composer/title" class="sg-composer-field sg-composer-title-field">
		<label data-sgtalk-i18n="compose.title">标题</label>
		{{{ if isTopicOrMain }}}
		<input class="title form-control shadow-none" type="text" placeholder="在此输入主题标题" data-sgtalk-i18n-placeholder="compose.titlePlaceholder" value="{topicTitle}" />
		{{{ else }}}
		<span class="title text-truncate">{{{ if isEditing }}}[[topic:composer.editing-in, "{topicTitle}"]]{{{ else }}}[[topic:composer.replying-to, "{topicTitle}"]]{{{ end }}}</span>
		{{{ end }}}
		<div id="quick-search-container" class="quick-search-container mt-2 dropdown-menu d-block p-2 hidden">
			<div class="text-center loading-indicator"><i class="fa fa-spinner fa-spin"></i></div>
			<div class="quick-search-results-container"></div>
		</div>
	</div>

	<div class="action-bar sg-composer-actions" aria-label="发布操作" data-sgtalk-i18n-aria-label="compose.actions">
		<button class="btn btn-sm btn-link composer-discard" data-action="discard">
			<i class="fa fa-times"></i>
			<span data-sgtalk-i18n="compose.cancel">取消</span>
		</button>
		<div class="btn-group btn-group-sm" component="composer/submit/container">
			<button class="btn btn-primary composer-submit fw-bold {{{ if !(submitOptions.length || canSchedule) }}}rounded-1{{{ end }}}" data-action="post" data-text-variant=" [[topic:composer.schedule]]">
				<i class="fa fa-paper-plane"></i>
				<span data-sgtalk-i18n="topic.publish">发布主题</span>
			</button>
			<div component="composer/submit/options/container" data-submit-options="{submitOptions.length}" class="btn-group btn-group-sm {{{ if !(submitOptions.length || canSchedule) }}}hidden{{{ end }}}">
				<button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					<i class="fa fa-caret-down"></i>
					<span class="sr-only">[[topic:composer.additional-options]]</span>
				</button>
				<ul class="dropdown-menu dropdown-menu-end p-1" role="menu">
					<li><a class="dropdown-item rounded-1 display-scheduler {{{ if !canSchedule }}}hidden{{{ end }}}" role="menuitem">[[topic:composer.post-later]]</a></li>
					<li><a class="dropdown-item rounded-1 cancel-scheduling hidden" role="menuitem">[[modules:composer.cancel-scheduling]]</a></li>
					{{{ each submitOptions }}}
					<li><a class="dropdown-item rounded-1" href="#" data-action="{./action}" role="menuitem">{./text}</a></li>
					{{{ end }}}
				</ul>
			</div>
		</div>
	</div>
</div>
