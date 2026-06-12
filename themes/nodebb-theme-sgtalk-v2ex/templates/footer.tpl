			</div><!-- /.container#content -->
			
			<footer class="sg-v2-footer mt-5 border-t py-4 bg-white">
				<div class="sg-v2-footer-container mx-auto px-4">
					<nav class="d-flex align-items-center gap-2 text-sm text-muted mb-2">
						<a class="text-muted text-decoration-none" href="{config.relative_path}/page/about">关于 SGTALK</a>
						<span class="meta mx-2">•</span>
						<a class="text-muted text-decoration-none" href="{config.relative_path}/page/qa">常见问题</a>
					</nav>
					<div class="d-flex align-items-end justify-content-between">
						<div class="d-flex flex-column text-xs text-muted gap-1">
							<div>小而美的华人交流社区，新移民分享社区。</div>
							<div>sgtalk.zshstc.org</div>
							<div>SGTALK © 2026</div>
						</div>
						<div>
							<a href="#" class="d-flex align-items-center justify-content-center sg-v2-top-btn text-muted text-decoration-none" title="回到顶部">↑</a>
						</div>
					</div>
				</div>
			</footer>
		</main>
		<!-- IMPORT partials/sidebar-right.tpl -->
	</div>
	{{{ if !config.theme.topMobilebar }}}
	<!-- IMPORT partials/mobile-footer.tpl -->
	{{{ else }}}
	<div class="fixed-bottom d-lg-none">
		<!-- IMPORT partials/topic/navigator-mobile.tpl -->
	</div>
	{{{ end }}}

	{{{ if !isSpider }}}
	<div>
		<div component="toaster/tray" class="alert-window fixed-bottom mb-5 mb-md-2 me-2 me-md-5 ms-auto" style="width:300px; z-index: 1090;">
			<!-- IMPORT partials/reconnect-alert.tpl -->
		</div>
	</div>
	{{{ end }}}

	<!-- IMPORT partials/footer/js.tpl -->
</body>
</html>
