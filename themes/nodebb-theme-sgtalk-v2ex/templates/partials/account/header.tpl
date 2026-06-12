<div class="account sg-account-page">
	<section class="sg-account-hero">
		<div class="sg-account-avatar">
			{buildAvatar(@value, "88px", true)}
		</div>

		<div class="sg-account-identity">
			<h1>{{{ if fullname }}}{fullname}{{{ else }}}{username}{{{ end }}}</h1>
			<div class="sg-account-handle">
				{{{ if !banned }}}@{userslug}{{{ else }}}已封禁{{{ end }}}
			</div>
			<div class="sg-account-meta">
				<span>第 {uid} 号会员</span>
				<span>加入于 <span class="timeago" title="{joindateISO}"></span></span>
				<span>最后在线 <span class="timeago" title="{lastonlineISO}"></span></span>
			</div>
		</div>

		<div class="sg-account-actions">
			{{{ if canEdit }}}
			<a href="{config.relative_path}/user/{userslug}/edit">编辑资料</a>
			<a href="{config.relative_path}/user/{userslug}/settings">设置</a>
			<a href="{config.relative_path}/user/{userslug}/sessions">登录会话</a>
			{{{ end }}}
			{{{ if loggedIn }}}
			{{{ if !isSelf }}}
			<a component="account/follow" href="#" class="{{{ if (isFollowing || isFollowPending) }}}hide{{{ end }}}">关注</a>
			<a component="account/unfollow" href="#" class="{{{ if (!isFollowing && !isFollowPending) }}}hide{{{ end }}}">取消关注</a>
			{{{ end }}}
			{{{ end }}}
		</div>
	</section>

		<nav class="sg-account-tabs" aria-label="用户资料导航">
			<a href="{config.relative_path}/user/{userslug}" class="{{{ if template.account/profile }}}active{{{ end }}}">主页</a>
			<a href="{config.relative_path}/user/{userslug}/topics" class="{{{ if template.account/topics }}}active{{{ end }}}">
				主题 <span>{humanReadableNumber(counts.topics)}</span>
			</a>
			<a href="{config.relative_path}/user/{userslug}/posts" class="{{{ if template.account/posts }}}active{{{ end }}}">
				回复 <span>{humanReadableNumber(counts.posts)}</span>
			</a>
		</nav>

	<div class="sg-account-content">
