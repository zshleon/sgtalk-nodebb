{{{ if privileges.topics:reply }}}
<div component="topic/quickreply/container" class="sg-quickreply-card mb-4">
	<div class="sg-quickreply-header d-flex justify-content-between align-items-center">
		<div class="sg-quickreply-tabs d-flex align-items-center">
			<button class="sg-quickreply-tab active" data-tab="edit" type="button" data-sgtalk-i18n="quickreply.edit">编辑</button>
			<button class="sg-quickreply-tab" data-tab="preview" type="button" data-sgtalk-i18n="quickreply.preview">预览</button>
		</div>
		<div class="sg-quickreply-controls d-flex align-items-center gap-3">
			<button class="btn btn-link p-0 text-muted text-decoration-none sg-quickreply-control-link" component="topic/quickreply/expand" type="button" title="[[topic:open-composer]]" data-sgtalk-i18n="quickreply.undock">取消回复框停靠</button>
			<span class="sg-quickreply-separator">|</span>
			<a href="#" class="sg-quickreply-control-link sg-quickreply-back-to-top" data-sgtalk-i18n="quickreply.backToTop">回到顶部</a>
		</div>
	</div>

	<form class="sg-quickreply-form d-flex flex-column gap-3" method="post" action="{config.relative_path}/compose">
		<input type="hidden" name="tid" value="{tid}" />
		<input type="hidden" name="_csrf" value="{config.csrf_token}" />

		<div class="sg-quickreply-editor-wrapper">
			<div class="sg-quickreply-write-area">
				<textarea rows="5" name="content" component="topic/quickreply/text" class="form-control mousetrap sg-quickreply-textarea" placeholder="留下对他人有帮助的回复" data-sgtalk-i18n-placeholder="quickreply.placeholder"></textarea>
				<div component="topic/quickreply/upload/button" class="sg-quickreply-gutter-upload" role="button" title="[[topic:composer.drag-and-drop-images]]">
					<span data-sgtalk-i18n="quickreply.uploadHint">选择、粘贴、拖放上传图片。</span>
				</div>
			</div>
			<div class="sg-quickreply-preview-area d-none p-3">
				<div class="sg-quickreply-preview-content"></div>
			</div>
		</div>

		<div class="sg-quickreply-actions d-flex justify-content-between align-items-center">
			<div class="sg-quickreply-rule" data-sgtalk-i18n="rules.motto">真实分享 · 真诚友善</div>
			<button type="button" class="btn btn-link p-0 text-muted sg-quickreply-emoji-btn" aria-label="Emoji">
				<i class="fa fa-smile-o"></i>
			</button>
			<div class="d-flex align-items-center gap-2">
				<button type="submit" component="topic/quickreply/button" class="btn btn-sm sg-quickreply-submit-btn">
					<span data-sgtalk-i18n="quickreply.submit">回复</span> <span>⌘+Enter</span>
				</button>
			</div>
		</div>
	</form>

	<form class="d-none" component="topic/quickreply/upload" method="post" enctype="multipart/form-data">
		<input type="file" name="files[]" multiple class="hidden"/>
	</form>

	<div class="sg-quickreply-footer d-flex justify-content-end align-items-center mt-3 pt-2 border-top">
		<a href="{config.relative_path}/" class="sg-quickreply-back-link">← SGTALK</a>
	</div>
</div>
{{{ end }}}
