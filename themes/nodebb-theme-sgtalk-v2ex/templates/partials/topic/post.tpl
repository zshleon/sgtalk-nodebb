{{{ if ./index }}}
<!-- IMPORT partials/topic/post-parent.tpl -->
{{{ end }}}
<div class="sg-v2-post-row" component="post/row">
	<div class="sg-v2-post-avatar">
		<a class="d-inline-block position-relative text-decoration-none" href="{{{ if ./user.userslug }}}{config.relative_path}/user/{./user.userslug}{{{ else }}}#{{{ end }}}" aria-label="[[aria:profile-page-for, {./user.displayname}]]">
			{buildAvatar(posts.user, "48px", true, "", "user/picture")}
		</a>
	</div>

	<div class="sg-v2-post-main post-container d-flex gap-2 flex-grow-1 flex-column w-100" style="min-width:0;">
		<div class="sg-v2-post-header d-flex align-items-center justify-content-between post-header" itemprop="author" itemscope itemtype="https://schema.org/Person">
			<div class="d-flex gap-2 flex-wrap align-items-center text-truncate">
				<meta itemprop="name" content="{./user.displayname}">
				{{{ if ./user.userslug }}}<meta itemprop="url" content="{config.relative_path}/user/{./user.userslug}">{{{ end }}}

				<a class="sg-v2-post-username fw-bold" href="{{{ if ./user.userslug }}}{config.relative_path}/user/{./user.userslug}{{{ else }}}#{{{ end }}}" data-username="{posts.user.username}" data-uid="{posts.user.uid}">{posts.user.displayname}</a>

				{{{ each posts.user.selectedGroups }}}
				{{{ if posts.user.selectedGroups.slug }}}
				<!-- IMPORT partials/groups/badge.tpl -->
				{{{ end }}}
				{{{ end }}}

				{{{ if posts.user.banned }}}
				<span class="badge bg-danger rounded-1">[[user:banned]]</span>
				{{{ end }}}

				<span class="sg-v2-post-time text-muted">{generateWrote(@value, config.timeagoCutoff)}</span>

				<i component="post/edit-indicator" class="fa fa-edit text-muted{{{ if privileges.posts:history }}} pointer{{{ end }}} edit-icon {{{ if !posts.editor.username }}}hidden{{{ end }}}" title="[[global:edited-timestamp, {isoTimeToLocaleString(./editedISO, config.userLang)}]]"></i>
			</div>

			<div class="d-flex align-items-center gap-2">
				<a href="{config.relative_path}/post/{encodeURIComponent(./pid)}" class="sg-v2-post-index post-index text-muted">#{increment(./index, "1")}</a>
			</div>
		</div>

		<div class="sg-v2-post-content content text-break" component="post/content" itemprop="text">
			{posts.content}
		</div>

		<div component="post/footer" class="sg-v2-post-footer border-bottom-0 pb-1">
			{{{ if posts.user.signature }}}
			<div component="post/signature" data-uid="{posts.user.uid}" class="text-xs text-muted mt-2">{posts.user.signature}</div>
			{{{ end }}}

			<div class="d-flex align-items-center justify-content-between gap-2">
				<div>
					{{{ if !hideReplies }}}
					<a component="post/reply-count" data-target-component="post/replies/container" href="#" class="sg-v2-post-replies-link text-xs text-muted {{{ if (!./replies || shouldHideReplyContainer(@value)) }}}hidden{{{ end }}}">
						<span class="replies-count" component="post/reply-count/text" data-replies="{posts.replies.count}">{posts.replies.text}</span>
					</a>
					{{{ end }}}
				</div>

				<div component="post/actions" class="d-flex align-items-center gap-3 post-tools sg-v2-post-actions">
					<!-- IMPORT partials/topic/reactions.tpl -->

					{{{ if !reputation:disabled }}}
					<span class="sg-v2-post-votes align-items-center d-inline-flex gap-1">
						<a component="post/upvote" href="#" class="votes-link{{{ if posts.upvoted }}} upvoted{{{ end }}}" title="[[topic:upvote-post]]">
							<i class="fa fa-chevron-up"></i>
						</a>
						<span component="post/vote-count" data-votes="{posts.votes}" class="votes-count">{posts.votes}</span>
					</span>
					{{{ end }}}

					<a component="post/reply" href="#" class="sg-v2-post-action-link" title="[[topic:reply]]"><i class="fa fa-reply"></i> <span data-sgtalk-i18n="quickreply.submit">回复</span></a>

					<!-- IMPORT partials/topic/post-menu.tpl -->
				</div>
			</div>

			<div component="post/replies/container" class="my-2 border rounded-1 p-3 hidden-empty"></div>
		</div>
	</div>
</div>

{{{ if (!./index && widgets.mainpost-footer.length) }}}
<div data-widget-area="mainpost-footer">
	{{{ each widgets.mainpost-footer }}}
	{widgets.mainpost-footer.html}
	{{{ end }}}
</div>
{{{ end }}}
