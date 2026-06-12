<div class="formatting-bar sg-composer-formatting d-flex justify-content-between align-items-center">
	<div class="sg-composer-tabs d-flex">
		<button class="sg-composer-tab-btn active" data-tab="write" type="button">正文</button>
		<button class="sg-composer-tab-btn" data-tab="preview" type="button">预览</button>
	</div>

	<!-- Hidden native upload buttons (triggered via bottom gutter click) -->
	<ul class="list-unstyled mb-0 d-none formatting-group gap-1" aria-label="编辑工具">
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

	<div class="d-flex align-items-center gap-2 sg-composer-status-right text-muted text-sm">
		<span>Syntax</span>
		<span class="badge bg-success text-white px-2 py-1" style="font-size: 11px; font-weight: normal; border-radius: 3px;">SGTALK 原生格式</span>
		<span>Markdown</span>
		<i class="fa fa-info-circle text-muted" style="cursor: pointer;"></i>
	</div>
</div>
