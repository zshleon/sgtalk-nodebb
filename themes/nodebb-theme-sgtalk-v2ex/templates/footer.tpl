</div><!-- /.container#content -->

		<footer class="sg-v2-footer">
			<div class="sg-v2-footer-container">
				<div class="d-flex flex-wrap align-items-start justify-content-between gap-4 mb-4">
					<!-- Brand column -->
					<div class="d-flex flex-column gap-2">
						<a href="{config.relative_path}/" class="d-flex align-items-center gap-2 text-decoration-none" aria-label="SGTALK">
							<img src="{config.relative_path}/assets/plugins/nodebb-theme-sgtalk-v2ex/public/brand/logo-mark.svg?v=20260614-quiet-premium" width="22" height="22" alt="" style="border-radius:6px;">
							<span style="font-size:15px;font-weight:800;letter-spacing:-.02em;color:var(--sg-text,#11181F);">SG<span style="color:var(--primary-color,#D23B30);">TALK</span></span>
						</a>
						<p class="sg-v2-footer-tagline m-0" data-sgtalk-i18n="footer.tagline">低噪音的新加坡华人生活经验社区</p>
					</div>
					<!-- Nav columns -->
					<div class="d-flex flex-wrap gap-4 gap-md-5">
						<div class="d-flex flex-column gap-2">
							<span class="sg-v2-footer-label" data-sgtalk-i18n="footer.explore">发现</span>
							<a href="{config.relative_path}/recent" data-sgtalk-i18n="rail.active">活跃主题</a>
							<a href="{config.relative_path}/popular" data-sgtalk-i18n="rail.hot">热门讨论</a>
							<a href="{config.relative_path}/categories" data-sgtalk-i18n="rail.allNodes">全部节点</a>
						</div>
						<div class="d-flex flex-column gap-2">
							<span class="sg-v2-footer-label" data-sgtalk-i18n="footer.account">帐号</span>
							<a href="{config.relative_path}/register" class="sg-guest-only" data-sgtalk-i18n="auth.register">注册</a>
							<a href="{config.relative_path}/login" class="sg-guest-only" data-sgtalk-i18n="auth.login">登录</a>
							<a href="{config.relative_path}/me" class="sg-user-only" data-sgtalk-i18n="account.myProfile">我的主页</a>
							<a href="{config.relative_path}/me/topics" class="sg-user-only" data-sgtalk-i18n="account.myTopics">我的主题</a>
								<a href="{config.relative_path}/logout" class="sg-user-only" data-sgtalk-i18n="auth.logout">退出</a>
						</div>
					</div>
				</div>
				<!-- Bottom bar -->
				<div class="sg-v2-footer-bottom d-flex align-items-center justify-content-between gap-3 flex-wrap">
					<div class="sg-v2-footer-copy">
						<span>SGTALK &copy; 2026</span>
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
		<div component="toaster/tray" class="alert-window fixed-bottom mb-5 mb-md-2 me-2 me-md-5 ms-auto">
			<!-- IMPORT partials/reconnect-alert.tpl -->
		</div>
	</div>
	{{{ end }}}

	<!-- IMPORT partials/footer/js.tpl -->
</body>
</html>
