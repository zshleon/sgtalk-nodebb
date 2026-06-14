<div class="formatting-bar sg-composer-formatting d-flex justify-content-between align-items-center">
	<div class="sg-composer-tabs d-flex">
		<button class="sg-composer-tab-btn active" data-tab="write" type="button" data-sgtalk-i18n="compose.write">正文</button>
		<button class="sg-composer-tab-btn" data-tab="preview" type="button" data-sgtalk-i18n="compose.preview">预览</button>
	</div>
	<button class="d-none" data-action="preview" type="button" tabindex="-1" aria-hidden="true">
		<span class="show-text" data-sgtalk-i18n="compose.preview">预览</span>
		<span class="hide-text hide" data-sgtalk-i18n="compose.write">正文</span>
	</button>

	<!-- Hidden native upload buttons (triggered via bottom gutter click) -->
	<ul class="list-unstyled mb-0 d-none formatting-group gap-1" aria-label="编辑工具" data-sgtalk-i18n-aria-label="compose.tools">
		{{{ if canUploadImage }}}
		<li title="图片">
			<button data-format="picture" class="img-upload-btn btn btn-sm btn-link text-reset" aria-label="[[modules:composer.upload-picture]]">
				<i class="fa fa-file-image-o"></i>
			</button>
		</li>
		{{{ end }}}

		{{{ if canUploadFile }}}
		<li title="附件">
			<button data-format="upload" class="file-upload-btn btn btn-sm btn-link text-reset" aria-label="[[modules:composer.upload-file]]">
				<i class="fa fa-file-o"></i>
			</button>
		</li>
		{{{ end }}}

		<form id="fileForm" method="post" enctype="multipart/form-data">
			<input type="file" id="files" name="files[]" multiple class="hide"/>
		</form>
	</ul>
</div>
