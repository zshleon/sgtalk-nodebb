<div class="formatting-bar sg-composer-formatting">
	<div class="sg-composer-body-label">正文</div>
	<ul class="list-unstyled mb-0 d-flex formatting-group gap-1 overflow-auto" aria-label="编辑工具">
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
	<div class="d-flex align-items-center gap-1 sg-composer-status">
		<div class="draft-icon hidden-xs hidden-sm"></div>
		<button class="btn btn-sm btn-link py-2 text-body fw-semibold text-nowrap sg-composer-preview-compat" data-action="preview" type="button" tabindex="-1" aria-hidden="true">
			<i class="fa fa-eye"></i>
			<span class="show-text">[[modules:composer.show-preview]]</span>
			<span class="hide-text">[[modules:composer.hide-preview]]</span>
		</button>
	</div>
</div>
