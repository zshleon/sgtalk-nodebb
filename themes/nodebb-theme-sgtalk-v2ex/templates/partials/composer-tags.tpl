<div class="tag-row sg-composer-tag-row hidden">
	<label data-sgtalk-i18n="compose.tags">标签</label>
	<div class="tags-container d-flex align-items-center {{{ if tagWhitelist.length }}}haswhitelist{{{ end }}}">
		<div class="btn-group dropup me-2 {{{ if !tagWhitelist.length }}}hidden{{{ end }}}" component="composer/tag/dropdown">
			<button class="btn btn-sm btn-link text-body dropdown-toggle" data-bs-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded="false">
				<i class="fa fa-tags"></i>
				[[tags:select-tags]]
			</button>

			<ul class="dropdown-menu p-1" role="menu">
				{{{ each tagWhitelist }}}
				<li data-tag="{@value}"><a class="dropdown-item rounded-1" href="#" role="menuitem">{@value}</a></li>
				{{{ end }}}
			</ul>
		</div>
		<input class="tags" type="text" placeholder="输入标签，限制 3 - 15 个字符" data-sgtalk-i18n-placeholder="compose.tagsPlaceholder" />
	</div>
</div>
