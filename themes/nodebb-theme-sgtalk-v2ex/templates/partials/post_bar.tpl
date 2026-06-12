<div class="sg-v2-topic-bar d-flex align-items-center justify-content-between p-2" component="topic/bar">
	<div class="d-flex align-items-center gap-2 flex-wrap">
		<!-- IMPORT partials/topic/watch.tpl -->
		<!-- IMPORT partials/topic/sort.tpl -->
		<!-- IMPORT partials/topic/tools.tpl -->

		{{{ if (!feeds:disableRSS && rssFeedUrl) }}}
		<a class="sg-v2-topic-rss" target="_blank" href="{rssFeedUrl}" title="[[global:rss-feed]]">
			<i class="fa fa-rss"></i> RSS
		</a>
		{{{ end }}}
	</div>
	<div class="d-flex align-items-center">
		<!-- IMPORT partials/topic/reply-button.tpl -->
	</div>
</div>
