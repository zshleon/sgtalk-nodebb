'use strict';

(function () {
  const selector = '[component="composer"] textarea.write, .composer textarea.write, .page-compose textarea.write';
  const mobileQuery = window.matchMedia('(max-width: 767.98px)');
  const topicApiPattern = /\/api\/v3\/topics(?:$|[?#/])/;
  const pluginPublicPath = '/assets/plugins/nodebb-theme-sgtalk-v2ex/public';
  const faviconVersion = '20260614-100';
  const avatarAssetVersion = '20260613-lion-avatar-v7';
  const avatarUploadCanvasSize = 256;
  const avatarUploadQuality = 0.88;
  const avatarForegroundYOffset = 24;
  const defaultAvatarBg = '#D23B30';
  const localeStorageKey = 'sgtalk:locale';
  let inlineI18nApplying = false;
  let inlineI18nQueued = false;
  let inlineI18nQueuedRoot = null;
  const messages = {
    zh: {
      'search.placeholder': '搜索主题 / 节点 / 用户',
      'search.open': '搜索',
      'theme.palette': '自定义主题颜色',
      'theme.toggle': '切换明暗主题',
      'language.toggle': '切换语言',
      'language.switchToEnglish': '切换到 English',
      'language.switchToChinese': '切换到中文',
      'auth.register': '注册',
      'auth.login': '登录',
      'auth.logout': '退出',
      'auth.loggedIn': '已登录',
      'nav.home': '首页',
      'nav.active': '活跃',
      'nav.popular': '最热',
      'nav.nodes': '节点',
      'nav.newcomers': '新移民',
      'nav.settle': '安家',
      'nav.career': '职场',
      'nav.family': '家庭',
      'nav.finance': '金融',
      'nav.life': '生活',
      'nav.travel': '出行',
      'nav.qa': '问答',
      'nav.market': '交易',
      'rail.label': '社区导航',
      'rail.community': '社区',
      'rail.allNodes': '全部节点',
      'rail.active': '活跃主题',
      'rail.hot': '热门讨论',
      'rail.hotNodes': '热门节点',
      'rail.nodes': '节点',
      'rail.housing': '安家租房',
      'rail.salary': '职业与薪资',
      'rail.tax': '金融税务',
      'rail.school': '育儿与学校',
      'rail.care': '医疗与家政',
      'rail.local': '本地生活',
      'rail.transport': '交通出行',
      'rail.digital': '数码与网络',
      'rail.events': '同城活动',
      'rail.unread': '未读',
      'rail.notifications': '通知',
      'rail.tags': '标签',
      'rules.title': '社区公约',
      'rules.motto': '真实分享 · 真诚友善',
      'rules.life': '回归生活',
      'rules.ads': '零容忍暗广',
      'rules.calm': '理性交流',
      'rules.archive': '自发沉淀',
      'rules.lifeBody': '聊买房、看病、教育等坡岛日常。',
      'rules.adsBody': '中介引流、软广和利益不披露直接处理。',
      'rules.calmBody': '友善克制，不攻击、不开盒、不引战。',
      'rules.archiveBody': '有用就顶起，无效内容自然沉底。',
      'filter.topic': '节点主题',
      'filter.all': '全部主题',
      'filter.hot': '热门主题',
      'filter.new': '新主题',
      'topic.publish': '发布主题',
      'topic.loginToPost': '登录后发帖',
      'topic.reply': '回复主题',
      'topic.replyAsTopic': '作为新主题回复',
      'topic.moreReplyOptions': '更多回复选项',
      'topic.loginToReply': '登录后回复',
      'topic.lockedReply': '主题已锁定',
      'topic.sort': '排序',
      'topic.sortReplies': '排序回复',
      'topic.oldestFirst': '从旧到新',
      'topic.newestFirst': '从新到旧',
      'topic.mostLiked': '按赞排序',
      'topic.scheduled': '定时',
      'topic.pinned': '置顶',
      'topic.locked': '锁定',
      'topic.moved': '已移动',
      'footer.explore': '发现',
      'footer.account': '帐号',
      'footer.tagline': '低噪音的新加坡华人生活经验社区',
      'footer.backToTop': '回到顶部',
      'stats.topics': '主题',
      'stats.posts': '回复',
      'empty.noTopicsTitle': '这里还没有主题',
      'empty.noTopicsBody': '欢迎发布第一个主题，或者先去其它节点看看大家在聊什么。',
      'empty.firstTopic': '发布第一个主题',
      'empty.viewNodes': '浏览节点',
      'empty.viewAllNodes': '查看全部节点',
      'empty.topics': '暂无主题',
      'empty.noHotTopicsTitle': '暂时没有热门主题。',
      'empty.noHotTopicsBody': '有新的讨论后，这里会自然出现被关注的主题。',
      'compose.new': '新主题',
      'compose.back': '返回主题列表',
      'compose.cancel': '取消',
      'compose.write': '正文',
      'compose.preview': '预览',
      'compose.node': '节点',
      'compose.identity': '身份',
      'compose.title': '标题',
      'compose.titlePlaceholder': '在此输入主题标题',
      'compose.bodyPlaceholder': '写下你想讨论的内容',
      'compose.actions': '发布操作',
      'compose.tools': '编辑工具',
      'compose.nativeFormat': 'SGTALK 原生格式',
      'compose.tags': '标签',
      'compose.tagsPlaceholder': '输入标签，限制 3 - 15 个字符',
      'quickreply.edit': '编辑',
      'quickreply.preview': '预览',
      'quickreply.undock': '取消回复框停靠',
      'quickreply.backToTop': '回到顶部',
      'quickreply.placeholder': '留下对他人有帮助的回复',
      'quickreply.uploadHint': '选择、粘贴、拖放上传图片。',
      'quickreply.submit': '回复',
      'account.recent': '最近内容',
      'account.profile': '主页',
      'account.about': '关于',
      'account.activity': '社区活动',
      'account.quickLinks': '常用入口',
      'account.topics': '主题',
      'account.replies': '回复',
      'account.latest': '最新',
      'account.best': '最佳',
      'account.controversial': '争议',
      'account.viewTopics': '查看主题',
      'account.viewReplies': '查看回复',
      'account.editProfile': '编辑资料',
      'account.settings': '账号设置',
      'account.sessions': '登录会话',
      'account.follow': '关注',
      'account.unfollow': '取消关注',
      'account.banned': '已封禁',
      'account.profileNav': '用户资料导航',
      'account.myProfile': '我的主页',
      'account.myTopics': '我的主题',
      'account.noPublicContent': '暂无公开内容。',
      'account.noBio': '暂无简介。',
      'account.noTopics': '暂无主题。',
      'account.noReplies': '暂无回复。',
      'account.profileViews': '资料浏览',
      'groups.title': '社区群组',
      'groups.summary': 'SGTALK 目前以公开节点讨论为主，暂不开放公开群组目录。',
      'groups.body': '如果你想围绕某个话题长期组织讨论，可以先在合适节点发起主题。等社区活跃后，我们会再开放更细的群组和自建节点能力。',
      'groups.viewNodes': '查看节点',
      'groups.backTopics': '返回主题',
      'auth.loginTitle': '登录 SGTALK',
      'auth.loginBody': '登录后可以继续发布主题、回复和收藏节点。',
      'auth.usernameOrEmail': '用户名 / 邮箱',
      'auth.password': '密码',
      'auth.remember': '保持登录状态',
      'auth.capsLock': '大写锁定已开启',
      'auth.forgotPassword': '忘记密码？',
      'auth.loginFailed': '登录失败',
      'auth.otherLogin': '其他登录方式',
      'auth.googleLogin': '通过 Google 登录',
      'auth.providerLogin': '通过 {provider} 登录',
      'auth.noAccount': '还没有账号？',
      'auth.registerTitle': '注册 SGTALK',
      'auth.registerBody': '使用邮箱创建账号，完成后即可参与新加坡生活讨论。',
      'auth.nickname': '昵称',
      'auth.nicknamePlaceholder': '2-16 个字符',
      'auth.email': '邮箱',
      'auth.emailPlaceholder': '用于登录、找回密码和接收验证邮件',
      'auth.passwordPlaceholder': '至少 6 位',
      'auth.confirmPassword': '确认密码',
      'auth.confirmPasswordPlaceholder': '再次输入密码',
      'auth.registerNow': '立即注册',
      'auth.registerNote': '注册即表示你愿意遵守 SGTALK 社区公约。邮箱默认不公开。',
      'auth.registerFailed': '注册失败',
      'auth.otherRegister': '其他注册方式',
      'auth.googleRegister': '通过 Google 注册',
      'auth.providerRegister': '通过 {provider} 注册',
      'auth.haveAccount': '已有账号？',
      'auth.emailPending': '验证邮件已经发送。如果需要重新发送，请在下面填写邮箱。',
      'auth.emailUpdateBody': '请填写邮箱。邮箱用于登录、找回密码和接收必要通知，默认不会公开。',
      'auth.emailVerifyHint': '提交后会收到一封验证邮件，点击邮件里的链接即可完成验证。',
      'auth.completeRegisterTitle': '完成注册',
      'auth.completeAccountTitle': '完善账号',
      'auth.completeBody': '这一步用于补充账号资料。你也可以先退出这次注册，继续浏览公开内容。',
      'auth.completeErrors': '请检查下面的信息：',
      'auth.completeSubmit': '完成',
      'auth.abortRegister': '退出本次注册',
      'auth.currentPassword': '当前密码',
      'auth.currentPasswordHint': '为确认账号归属，请输入当前密码。',
      'auth.gdprBody': 'SGTALK 会保存账号资料和你发布的内容，用于社区账号、通知和内容管理。',
      'auth.gdprData': '我同意网站为提供社区服务而处理我的账号资料。',
      'auth.gdprEmail': '我同意接收必要的账号、验证和通知邮件。',
      'avatar.bg.bay': '海湾蓝',
      'avatar.bg.teal': '青绿',
      'avatar.bg.leaf': '绿洲',
      'avatar.bg.sun': '晴空',
      'avatar.bg.coral': '雾灰',
      'avatar.bg.violet': '紫蓝',
      'avatar.bg.rose': '玫瑰',
      'avatar.bg.slate': '石板',
      'avatar.preset.classic': '经典',
      'avatar.preset.spark': '灵感',
      'avatar.preset.coffee': '咖啡',
      'avatar.preset.reader': '阅读',
      'avatar.preset.thumb': '赞一下',
      'avatar.preset.audio': '耳机',
      'avatar.preset.paint': '创作',
      'avatar.preset.camera': '摄影',
      'avatar.preset.scarf': '围巾',
      'avatar.previewAlt': '{label}头像',
      'avatar.title': '选择头像',
      'avatar.shape': '形象',
      'avatar.background': '底色',
      'avatar.save': '保存为头像',
      'avatar.keepDefault': '保持默认',
      'avatar.defaultKept': '已保留默认头像。',
      'avatar.open': '设置头像',
      'avatar.dialog': '设置头像',
      'avatar.close': '关闭',
      'avatar.pending': '已记住选择，完成注册并登录后会自动应用。',
      'avatar.saving': '正在保存头像...',
      'avatar.savingProgress': '正在保存头像 {progress}%...',
      'avatar.saved': '头像已保存。',
      'avatar.error.noPrivileges': '头像保存失败：当前登录状态没有头像修改权限，请刷新后重试。',
      'avatar.error.fileTooBig': '头像保存失败：图片超过站点限制。',
      'avatar.error.invalidData': '头像保存失败：上传数据没有被服务器接受。',
      'avatar.error.socket': '头像保存失败：页面连接未就绪，请刷新后重试。',
      'avatar.error.generic': '头像保存失败，请稍后重试。',
      'composer.publishing': '发布中',
      'composer.publishFailed': '发布没有成功，请检查标题、正文和节点后再试。',
      'composer.needTitle': '请先填写主题标题。',
      'composer.needBody': '请先填写正文内容。',
      'composer.previewLoading': '加载预览中...',
      'composer.previewFailed': '预览生成失败',
      'composer.previewOffline': '无法连接到预览服务',
    },
    en: {
      'search.placeholder': 'Search topics / nodes / users',
      'search.open': 'Search',
      'theme.palette': 'Customize theme colors',
      'theme.toggle': 'Toggle light and dark theme',
      'language.toggle': 'Switch language',
      'language.switchToEnglish': 'Switch to English',
      'language.switchToChinese': 'Switch to Chinese',
      'a11y.skipToContent': 'Skip to content',
      'error.404Title': 'Page not found',
      'error.404Message': 'This page does not exist, or it may have been moved or removed.',
      'auth.register': 'Sign Up',
      'auth.login': 'Log in',
      'auth.logout': 'Log out',
      'auth.loggedIn': 'Signed in',
      'nav.home': 'Home',
      'nav.active': 'Active',
      'nav.popular': 'Popular',
      'nav.nodes': 'Nodes',
      'nav.newcomers': 'Newcomers',
      'nav.settle': 'Settling In',
      'nav.career': 'Careers',
      'nav.family': 'Family',
      'nav.finance': 'Finance',
      'nav.life': 'Living',
      'nav.travel': 'Travel',
      'nav.qa': 'Q&A',
      'nav.market': 'Marketplace',
      'rail.label': 'Community navigation',
      'rail.community': 'Community',
      'rail.allNodes': 'All Nodes',
      'rail.active': 'Active Topics',
      'rail.hot': 'Hot Discussions',
      'rail.hotNodes': 'Popular Nodes',
      'rail.nodes': 'Nodes',
      'rail.housing': 'Housing',
      'rail.salary': 'Careers & Pay',
      'rail.tax': 'Finance & Tax',
      'rail.school': 'Parenting & Schools',
      'rail.care': 'Care & Helpers',
      'rail.local': 'Local Living',
      'rail.transport': 'Transport',
      'rail.digital': 'Digital & Network',
      'rail.events': 'Local Events',
      'rail.unread': 'Unread',
      'rail.notifications': 'Notifications',
      'rail.tags': 'Tags',
      'rules.title': 'Community Rules',
      'rules.motto': 'Share honestly · Be kind',
      'rules.life': 'Real Life First',
      'rules.ads': 'No Stealth Ads',
      'rules.calm': 'Stay Civil',
      'rules.archive': 'Let Value Surface',
      'rules.lifeBody': 'Housing, healthcare, school, and daily Singapore tradeoffs.',
      'rules.adsBody': 'Agents, soft promotion, and hidden interests are removed.',
      'rules.calmBody': 'No personal attacks, doxxing, or rage bait.',
      'rules.archiveBody': 'Upvote useful answers; ignore low-value noise.',
      'filter.topic': 'Node Topics',
      'filter.all': 'All Topics',
      'filter.hot': 'Hot Topics',
      'filter.new': 'New Topics',
      'topic.publish': 'New Topic',
      'topic.loginToPost': 'Log in to post',
      'topic.reply': 'Reply',
      'topic.replyAsTopic': 'Reply as new topic',
      'topic.moreReplyOptions': 'More reply options',
      'topic.loginToReply': 'Log in to Reply',
      'topic.lockedReply': 'Topic locked',
      'topic.sort': 'Sort',
      'topic.sortReplies': 'Sort replies',
      'topic.oldestFirst': 'Oldest first',
      'topic.newestFirst': 'Newest first',
      'topic.mostLiked': 'Most liked',
      'topic.scheduled': 'Scheduled',
      'topic.pinned': 'Pinned',
      'topic.locked': 'Locked',
      'topic.moved': 'Moved',
      'footer.explore': 'Explore',
      'footer.account': 'Account',
      'footer.tagline': 'A low-noise Singapore Chinese life experience community',
      'footer.backToTop': 'Back to top',
      'stats.topics': 'topics',
      'stats.posts': 'replies',
      'empty.noTopicsTitle': 'No topics yet',
      'empty.noTopicsBody': 'Start the first topic here, or browse other nodes to see what people are discussing.',
      'empty.firstTopic': 'Post the first topic',
      'empty.viewNodes': 'Browse nodes',
      'empty.viewAllNodes': 'View all nodes',
      'empty.topics': 'No topics yet',
      'empty.noHotTopicsTitle': 'No hot topics yet',
      'empty.noHotTopicsBody': 'Once new discussions gain attention, they will appear here naturally.',
      'compose.new': 'New topic',
      'compose.back': 'Back to Topics',
      'compose.cancel': 'Cancel',
      'compose.write': 'Write',
      'compose.preview': 'Preview',
      'compose.node': 'Node',
      'compose.identity': 'Identity',
      'compose.title': 'Title',
      'compose.titlePlaceholder': 'Enter a topic title',
      'compose.bodyPlaceholder': 'Write what you want to discuss',
      'compose.actions': 'Publishing actions',
      'compose.tools': 'Editor tools',
      'compose.nativeFormat': 'SGTALK native format',
      'compose.tags': 'Tags',
      'compose.tagsPlaceholder': 'Add tags, 3-15 characters each',
      'quickreply.edit': 'Write',
      'quickreply.preview': 'Preview',
      'quickreply.undock': 'Undock reply box',
      'quickreply.backToTop': 'Back to top',
      'quickreply.placeholder': 'Leave a reply that helps others',
      'quickreply.uploadHint': 'Select, paste, or drop images to upload.',
      'quickreply.submit': 'Reply',
      'account.recent': 'Recent Activity',
      'account.profile': 'Profile',
      'account.about': 'About',
      'account.activity': 'Community Activity',
      'account.quickLinks': 'Quick Links',
      'account.topics': 'Topics',
      'account.replies': 'Replies',
      'account.latest': 'Recent',
      'account.best': 'Best',
      'account.controversial': 'Controversial',
      'account.viewTopics': 'View Topics',
      'account.viewReplies': 'View Replies',
      'account.editProfile': 'Edit Profile',
      'account.settings': 'Account Settings',
      'account.sessions': 'Login Sessions',
      'account.follow': 'Follow',
      'account.unfollow': 'Unfollow',
      'account.banned': 'Banned',
      'account.profileNav': 'User profile navigation',
      'account.myProfile': 'My Profile',
      'account.myTopics': 'My Topics',
      'account.noPublicContent': 'No public activity yet.',
      'account.noBio': 'No bio yet.',
      'account.noTopics': 'No topics yet.',
      'account.noReplies': 'No replies yet.',
      'account.profileViews': 'Profile Views',
      'groups.title': 'Community Groups',
      'groups.summary': 'SGTALK currently focuses on public node discussions. The public groups directory is not open yet.',
      'groups.body': 'If you want to organize long-running discussion around a topic, start a thread in the right node first. As the community becomes more active, we will open finer groups and node creation.',
      'groups.viewNodes': 'View Nodes',
      'groups.backTopics': 'Back to Topics',
      'auth.loginTitle': 'Log in to SGTALK',
      'auth.loginBody': 'Continue posting topics, replying, and saving useful nodes.',
      'auth.usernameOrEmail': 'Username / Email',
      'auth.password': 'Password',
      'auth.remember': 'Keep me signed in',
      'auth.capsLock': 'Caps Lock is on',
      'auth.forgotPassword': 'Forgot password?',
      'auth.loginFailed': 'Login failed',
      'auth.otherLogin': 'Other login methods',
      'auth.googleLogin': 'Continue with Google',
      'auth.providerLogin': 'Continue with {provider}',
      'auth.noAccount': 'No account yet?',
      'auth.registerTitle': 'Create your SGTALK account',
      'auth.registerBody': 'Use email to create an account and join Singapore life discussions.',
      'auth.nickname': 'Nickname',
      'auth.nicknamePlaceholder': '2-16 characters',
      'auth.email': 'Email',
      'auth.emailPlaceholder': 'Used for login, recovery, and verification emails',
      'auth.passwordPlaceholder': 'At least 6 characters',
      'auth.confirmPassword': 'Confirm password',
      'auth.confirmPasswordPlaceholder': 'Enter the password again',
      'auth.registerNow': 'Create account',
      'auth.registerNote': 'By registering, you agree to the SGTALK community rules. Email is private by default.',
      'auth.registerFailed': 'Registration failed',
      'auth.otherRegister': 'Other registration methods',
      'auth.googleRegister': 'Sign up with Google',
      'auth.providerRegister': 'Sign up with {provider}',
      'auth.haveAccount': 'Already have an account?',
      'auth.emailPending': 'A verification email has been sent. To resend it, enter your email below.',
      'auth.emailUpdateBody': 'Add an email for sign-in, password recovery, and important account notices. It is private by default.',
      'auth.emailVerifyHint': 'After submitting, open the verification email and follow the link to finish.',
      'auth.completeRegisterTitle': 'Complete registration',
      'auth.completeAccountTitle': 'Complete your account',
      'auth.completeBody': 'This step adds the account details required for the community. You can also exit this registration and keep browsing public content.',
      'auth.completeErrors': 'Please check the information below:',
      'auth.completeSubmit': 'Complete',
      'auth.abortRegister': 'Exit this registration',
      'auth.currentPassword': 'Current password',
      'auth.currentPasswordHint': 'Enter your current password to confirm this account belongs to you.',
      'auth.gdprBody': 'SGTALK stores account details and content you post for community accounts, notifications, and content management.',
      'auth.gdprData': 'I agree that the site may process my account details to provide community services.',
      'auth.gdprEmail': 'I agree to receive necessary account, verification, and notification emails.',
      'avatar.bg.bay': 'Bay Blue',
      'avatar.bg.teal': 'Teal',
      'avatar.bg.leaf': 'Oasis Green',
      'avatar.bg.sun': 'Clear Sky',
      'avatar.bg.coral': 'Mist Grey',
      'avatar.bg.violet': 'Violet',
      'avatar.bg.rose': 'Rose',
      'avatar.bg.slate': 'Slate',
      'avatar.preset.classic': 'Classic',
      'avatar.preset.spark': 'Spark',
      'avatar.preset.coffee': 'Coffee',
      'avatar.preset.reader': 'Reader',
      'avatar.preset.thumb': 'Thumbs Up',
      'avatar.preset.audio': 'Headphones',
      'avatar.preset.paint': 'Creator',
      'avatar.preset.camera': 'Camera',
      'avatar.preset.scarf': 'Scarf',
      'avatar.previewAlt': '{label} avatar',
      'avatar.title': 'Choose Avatar',
      'avatar.shape': 'Character',
      'avatar.background': 'Background',
      'avatar.save': 'Save Avatar',
      'avatar.keepDefault': 'Keep Default',
      'avatar.defaultKept': 'Default avatar kept.',
      'avatar.open': 'Set Avatar',
      'avatar.dialog': 'Set Avatar',
      'avatar.close': 'Close',
      'avatar.pending': 'Choice saved. It will apply after registration and sign-in.',
      'avatar.saving': 'Saving avatar...',
      'avatar.savingProgress': 'Saving avatar {progress}%...',
      'avatar.saved': 'Avatar saved.',
      'avatar.error.noPrivileges': 'Avatar save failed: this session cannot edit the profile picture. Refresh and try again.',
      'avatar.error.fileTooBig': 'Avatar save failed: the image is over the site limit.',
      'avatar.error.invalidData': 'Avatar save failed: the server rejected the upload data.',
      'avatar.error.socket': 'Avatar save failed: the page connection is not ready. Refresh and try again.',
      'avatar.error.generic': 'Avatar save failed. Please try again later.',
      'composer.publishing': 'Publishing',
      'composer.publishFailed': 'Publishing failed. Check the title, body, and category, then try again.',
      'composer.needTitle': 'Please add a topic title first.',
      'composer.needBody': 'Please add the body before publishing.',
      'composer.previewLoading': 'Loading preview...',
      'composer.previewFailed': 'Preview failed',
      'composer.previewOffline': 'Preview service is unavailable',
    },
  };

  function normalizeUiLocale(locale) {
    return String(locale || '').toLowerCase().startsWith('en') ? 'en' : 'zh';
  }

  function toNodebbLocale(locale) {
    return normalizeUiLocale(locale) === 'en' ? 'en-GB' : 'zh-CN';
  }

  function getUrlLocale() {
    try {
      const params = new URLSearchParams(window.location.search || '');
      const locale = params.get('lang');
      return locale ? normalizeUiLocale(locale) : '';
    } catch (error) {
      return '';
    }
  }

  function getStoredLocale() {
    try {
      return localStorage.getItem(localeStorageKey) || '';
    } catch (error) {
      return '';
    }
  }

  function persistUiLocale(locale) {
    try {
      localStorage.setItem(localeStorageKey, normalizeUiLocale(locale));
    } catch (error) {
      // Storage may be disabled in private or embedded contexts.
    }
  }

  function getUiLocale() {
    const override = getUrlLocale() || getStoredLocale();
    if (override) {
      return normalizeUiLocale(override);
    }

    const userId = Number(window.config && window.config.uid);
    const configuredLang = window.config && window.config.userLang;
    if (userId > 0 && configuredLang) {
      return normalizeUiLocale(configuredLang);
    }

    return 'zh';
  }

  function applyDocumentLocale() {
    const urlLocale = getUrlLocale();
    if (urlLocale) {
      persistUiLocale(urlLocale);
    }
    const locale = getUiLocale();
    document.documentElement.lang = locale === 'en' ? 'en' : 'zh-CN';
    document.documentElement.dataset.sgtalkLocale = locale;
    translateDocumentTitle(locale);
    translateStructuredData(locale);
  }

  function isComposePage() {
    return document.body && (
      document.body.classList.contains('page-compose') ||
      document.body.classList.contains('template-compose')
    );
  }

  function translateDocumentTitle(locale) {
    if (!document.title) {
      return;
    }

    if (isComposePage()) {
      const siteTitle = (window.config && window.config.siteTitle) || 'SGTALK';
      document.title = `${t('topic.publish')} | ${siteTitle}`;
      return;
    }

    const systemTitleMap = {
      '404.title': locale === 'en' ? 'Page not found' : '页面不存在',
      'global:404.message,': locale === 'en' ? 'This page does not exist, or it may have been moved or removed.' : '这个页面不存在，可能已被移动或删除。',
      'global:404.message': locale === 'en' ? 'This page does not exist, or it may have been moved or removed.' : '这个页面不存在，可能已被移动或删除。',
      'skip-to-content': locale === 'en' ? 'Skip to content' : '跳转至内容',
    };

    Object.keys(systemTitleMap).forEach((label) => {
      document.title = document.title.replace(new RegExp(label, 'g'), systemTitleMap[label]);
    });

    if (locale !== 'en') {
      return;
    }

    const titleMap = {
      '首页': 'Home',
      '最新主题': 'Recent Topics',
      '热门主题': 'Hot Topics',
      '全部主题': 'All Topics',
      'Recent主题': 'Recent Topics',
      'Popular主题': 'Popular Topics',
      'Hot Topics主题': 'Hot Topics',
      'All Topics主题': 'All Topics',
      '登录帐号': 'Log in',
      '注册帐号': 'Register',
      '注册': 'Register',
      '登录': 'Log in',
      '用户': 'Users',
      '版块': 'Nodes',
      '节点': 'Nodes',
      '标签': 'Tags',
      '未读': 'Unread',
      '最新': 'Recent',
      '热门': 'Popular',
      '设置': 'Settings',
      '禁止访问': 'Access denied',
    };

    Object.keys(titleMap).forEach((label) => {
      document.title = document.title.replace(new RegExp(label, 'g'), titleMap[label]);
    });
    document.title = translateKnownChineseFragments(document.title);
  }

  function t(key, vars) {
    const dict = messages[getUiLocale()] || messages.zh;
    let text = dict[key] || messages.zh[key] || key;
    if (vars) {
      Object.keys(vars).forEach((name) => {
        text = text.replace(new RegExp(`\\{${name}\\}`, 'g'), vars[name]);
      });
    }
    return text;
  }

  function setUiLocale(locale) {
    const normalized = normalizeUiLocale(locale);
    persistUiLocale(normalized);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', toNodebbLocale(normalized));
      window.location.assign(url.toString());
    } catch (error) {
      applyDocumentLocale();
      applyInlineI18n(document);
      updateLanguageControls(document);
    }
  }

  function updateLanguageControls(root) {
    const scope = root && root.querySelectorAll ? root : document;
    const locale = getUiLocale();
    const nextLocale = locale === 'en' ? 'zh' : 'en';
    const label = locale === 'en' ? '中' : 'EN';
    const title = t(nextLocale === 'en' ? 'language.switchToEnglish' : 'language.switchToChinese');
    const paint = (button) => {
      const labelNode = button.querySelector('[data-sgtalk-language-toggle-label]');
      button.dataset.sgtalkNextLocale = nextLocale;
      if (labelNode) {
        labelNode.textContent = label;
      } else {
        button.textContent = label;
      }
      button.setAttribute('title', title);
      button.setAttribute('aria-label', title);
    };

    if (scope.matches && scope.matches('[data-sgtalk-language-toggle]')) {
      paint(scope);
    }
    scope.querySelectorAll('[data-sgtalk-language-toggle]').forEach(paint);
  }

  function installLanguageSwitcher(root) {
    if (!document.documentElement.dataset.sgtalkLanguageDelegate) {
      document.documentElement.dataset.sgtalkLanguageDelegate = '1';
      document.addEventListener('click', (event) => {
        const button = event.target && event.target.closest && event.target.closest('[data-sgtalk-language-toggle]');
        if (!button) {
          return;
        }
        event.preventDefault();
        setUiLocale(button.dataset.sgtalkNextLocale || (getUiLocale() === 'en' ? 'zh' : 'en'));
      });
    }
    updateLanguageControls(root || document);
  }

  function itemLabel(item) {
    return item ? t(item.labelKey || item.label || '') : '';
  }

  const enInlineText = {
    '问与答': 'Q&A',
    '问答': 'Q&A',
    '新移民': 'Newcomers',
    '安家': 'Settling In',
    '安家租房': 'Housing',
    '职场': 'Careers',
    '职业与薪资': 'Careers & Pay',
    '家庭': 'Family',
    '金融': 'Finance',
    '金融税务': 'Finance & Tax',
    '生活': 'Living',
    '本地生活': 'Local Living',
    '出行': 'Travel',
    '交通出行': 'Transport',
    '交易': 'Marketplace',
    '育儿与学校': 'Parenting & Schools',
    '医疗与家政': 'Care & Helpers',
    '数码与网络': 'Digital & Network',
    '同城活动': 'Local Events',
    '全部主题': 'All Topics',
    '热门主题': 'Hot Topics',
    '节点主题': 'Node Topics',
    '新主题': 'New Topics',
    '发布主题': 'Post Topic',
    '我的主页': 'My Home',
    '节点收藏': 'Node Favorites',
    '主题收藏': 'Topic Favorites',
    '特别关注': 'Following',
    '未读提醒': 'Unread',
    '今日已自动签到': 'Checked in today',
    '热门节点': 'Popular Nodes',
    '今日热议': 'Trending Today',
    '暂无热议': 'No trending topics',
    '社区状态': 'Community Status',
    '版块': 'Categories',
    '节点': 'Nodes',
    '未读': 'Unread',
    '最新': 'Recent',
    '标签': 'Tags',
    '热门': 'Popular',
    '世界': 'World',
    '用户': 'Users',
    '皮肤': 'Skins',
    '折叠': 'Collapse',
    '在线': 'Online',
    '状态': 'Status',
    '离开': 'Away',
    '已选': 'Selected',
    '请勿打扰': 'Do Not Disturb',
    '隐身': 'Invisible',
    '书签': 'Bookmarks',
    '退出': 'Log out',
    '搜索': 'Search',
    '通知': 'Notifications',
    '标记全部已读': 'Mark all read',
    '全部通知': 'All notifications',
    '聊天': 'Chats',
    '全部对话': 'All chats',
    '草稿': 'Drafts',
    '您没有草稿': 'No drafts',
    '第一个帖子': 'First post',
    '最后一个帖子': 'Last post',
    '转到我的下一个帖子': 'Go to my next post',
    '开放注册': 'Open Registration',
    '最后回复': 'Last reply',
    '跳转至内容': 'Skip to content',
    '关于 SGTALK': 'About SGTALK',
    '常见问题': 'FAQ',
    '讨论准证、租房、学校、职场、医疗、交通与本地生活。': 'Discuss passes, housing, schools, work, healthcare, transport, and local life.',
    '低噪音的新加坡生活经验社区。': 'A low-noise Singapore life experience community.',
    '低噪音的新加坡生活经验社区。聊住房、学校、医疗、职场和本地选择题。': 'A low-noise Singapore life community for housing, schools, healthcare, work, and local decisions.',
    '生活、手续、选择题都可以在这里认真提问。': 'Ask practical questions about daily life, paperwork, and local decisions.',
    'PR、EP、家属准证、初到新加坡的实际经验。': 'PR, EP, dependant passes, and first-hand arrival experiences in Singapore.',
    '看房、租约、邻里、维修、搬家和居住体验。': 'Viewings, leases, neighborhoods, repairs, moving, and housing experiences.',
    '求职、面试、薪资、职场文化和行业信息。': 'Job hunting, interviews, salary, workplace culture, and industry information.',
    '银行、信用卡、CPF、保险、报税和投资基础。': 'Banking, credit cards, CPF, insurance, tax filing, and investing basics.',
    '幼儿园、中小学、补习、升学和家庭教育。': 'Preschool, primary and secondary school, tuition, admissions, and parenting.',
    '诊所、保险、看护、家政、宠物和日常照护。': 'Clinics, insurance, caregiving, helpers, pets, and everyday care.',
    '吃喝、购物、办事、邻里和日常服务。': 'Food, shopping, errands, neighborhoods, and everyday services.',
    '公交、地铁、驾照、买车、停车和周边旅行。': 'Buses, MRT, driving licenses, cars, parking, and nearby travel.',
    '宽带、手机、智能家居、软件和电子产品。': 'Broadband, mobile plans, smart home, software, and electronics.',
    '聚会、运动、亲子、线下活动和社群组织。': 'Meetups, sports, family activities, offline events, and community groups.',
    '二手、转让、拼单和本地交易信息。': 'Second-hand goods, transfers, group buys, and local marketplace information.',
    '暂无简介。': 'No bio yet.',
    '尚无标签。': 'No tags yet.',
    '尚无标签': 'No tags yet',
    '最近内容': 'Recent Activity',
    '关于': 'About',
    '社区活动': 'Community Activity',
    '常用入口': 'Quick Links',
    '查看主题': 'View Topics',
    '查看回复': 'View Replies',
    '查看节点': 'View Nodes',
    '编辑资料': 'Edit Profile',
    '账号设置': 'Account Settings',
    '设置': 'Settings',
    '登录会话': 'Login Sessions',
    '关注': 'Follow',
    '取消关注': 'Unfollow',
    '我': 'Me',
    '已登录': 'Signed in',
    '主页': 'Profile',
    '主题': 'Topics',
    '回复主题': 'Reply',
    '回复': 'Replies',
    '主题工具': 'Topic Tools',
    '关注中': 'Following',
    '排序': 'Sort',
    '从旧到新': 'Oldest first',
    '从新到旧': 'Newest first',
    '按赞排序': 'Most liked',
    '定时': 'Scheduled',
    '置顶': 'Pinned',
    '锁定': 'Locked',
    '已移动': 'Moved',
    '主题已锁定': 'Topic locked',
    '此主题已被删除。只有拥有主题管理权限的用户可以查看。': 'This topic has been deleted. Only users with topic management privileges can view it.',
    '禁止访问': 'Access denied',
    '您似乎意外访问了一个您无权访问的页面。': 'You seem to have reached a page you do not have permission to view.',
    '连接 · 分享 · 归属': 'Connect · Share · Belong',
    '新加坡华人青年与创意工作者社区，在这里发现有趣的项目、分享独特见解、交流安家与职场经验。': 'A Singapore Chinese community for young people and creators to share projects, ideas, settling-in tips, and career experience.',
    '立即注册': 'Create account',
    '登录': 'Log in',
    '登录社区': 'Log in',
    '登录或注册以进行搜索。': 'Log in or register to search.',
    '与 SGTALK 的连接断开，我们正在尝试重连，请耐心等待': 'Connection to SGTALK was lost. We are trying to reconnect.',
    '登录 SGTALK': 'Log in to SGTALK',
    '登录后可以继续发布主题、回复和收藏节点。': 'Continue posting topics, replying, and saving useful nodes.',
    '用户名 / 邮箱': 'Username / Email',
    '密码': 'Password',
    '保持登录状态': 'Keep me signed in',
    '大写锁定已开启': 'Caps Lock is on',
    '忘记密码？': 'Forgot password?',
    '登录失败': 'Login failed',
    '其他登录方式': 'Other login methods',
    '通过 Google 登录': 'Continue with Google',
    '还没有账号？': 'No account yet?',
    '没有帐号？': 'No account yet?',
    '社区公约': 'Community Rules',
    '社区基本法': 'Community Rules',
    '真实分享 · 真诚友善': 'Share honestly · Be kind',
    '真实分享 真诚友善': 'Share honestly · Be kind',
    '注册': 'Register',
    '注册 SGTALK': 'Create your SGTALK account',
    '使用邮箱创建账号，完成后即可参与新加坡生活讨论。': 'Use email to create an account and join Singapore life discussions.',
    '昵称': 'Nickname',
    '邮箱': 'Email',
    '确认密码': 'Confirm password',
    '注册即表示你愿意遵守 SGTALK 社区公约。邮箱默认不公开。': 'By registering, you agree to the SGTALK community rules. Email is private by default.',
    '注册失败': 'Registration failed',
    '其他注册方式': 'Other registration methods',
    '通过 Google 注册': 'Sign up with Google',
    '已有账号？': 'Already have an account?',
    '验证邮件已经发送。如果需要重新发送，请在下面填写邮箱。': 'A verification email has been sent. To resend it, enter your email below.',
    '请填写邮箱。邮箱用于登录、找回密码和接收必要通知，默认不会公开。': 'Add an email for sign-in, password recovery, and important account notices. It is private by default.',
    '提交后会收到一封验证邮件，点击邮件里的链接即可完成验证。': 'After submitting, open the verification email and follow the link to finish.',
    '当前密码': 'Current password',
    '为确认账号归属，请输入当前密码。': 'Enter your current password to confirm this account belongs to you.',
    'SGTALK 会保存账号资料和你发布的内容，用于社区账号、通知和内容管理。': 'SGTALK stores account details and content you post for community accounts, notifications, and content management.',
    '我同意网站为提供社区服务而处理我的账号资料。': 'I agree that the site may process my account details to provide community services.',
    '我同意接收必要的账号、验证和通知邮件。': 'I agree to receive necessary account, verification, and notification emails.',
    '正文': 'Write',
    '预览': 'Preview',
    '编辑': 'Write',
    '身份': 'Identity',
    '发布操作': 'Publishing actions',
    '编辑工具': 'Editor tools',
    'SGTALK 原生格式': 'SGTALK native format',
    '输入标签，限制 3 - 15 个字符': 'Add tags, 3-15 characters each',
    '在此输入主题标题': 'Enter a topic title',
    '2-16 个字符': '2-16 characters',
    '用于登录、找回密码和接收验证邮件': 'Used for login, recovery, and verification emails',
    '至少 6 位': 'At least 6 characters',
    '再次输入密码': 'Enter the password again',
    '取消回复框停靠': 'Undock reply box',
    '回到顶部': 'Back to top',
    '留下对他人有帮助的回复': 'Leave a reply that helps others',
    '选择、粘贴、拖放上传图片。': 'Select, paste, or drop images to upload.',
    '资料浏览': 'Profile Views',
    '群组': 'Groups',
    '粉丝': 'Followers',
  };

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function translateKnownChineseFragments(value) {
    let next = translatePlainChineseInlineText(value);
    Object.keys(enInlineText)
      .sort((a, b) => b.length - a.length)
      .forEach((label) => {
        next = next.replace(new RegExp(escapeRegExp(label), 'g'), enInlineText[label]);
      });
    return next;
  }

  function translateStructuredData(locale) {
    if (locale !== 'en') {
      return;
    }

    const translateValue = (value) => {
      if (typeof value === 'string') {
        return translateKnownChineseFragments(value);
      }
      if (Array.isArray(value)) {
        return value.map(translateValue);
      }
      if (value && typeof value === 'object') {
        Object.keys(value).forEach((key) => {
          value[key] = translateValue(value[key]);
        });
      }
      return value;
    };

    document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
      try {
        const data = JSON.parse(script.textContent || 'null');
        script.textContent = JSON.stringify(translateValue(data));
      } catch (error) {
        // Leave invalid third-party structured data untouched.
      }
    });
  }

  function translatePlainChineseInlineText(raw) {
    return String(raw || '')
      .replace(/登录后回复/g, 'Log in to Reply')
      .replace(/在新帖中回复/g, 'Reply in new topic')
      .replace(/最多赞同/g, 'Most liked')
      .replace(/从旧到新/g, 'Oldest first')
      .replace(/从新到旧/g, 'Newest first')
      .replace(/按赞排序/g, 'Most liked')
      .replace(/(\d+)\s*条回复/g, (match, number) => `${number} ${Number(number) === 1 ? 'reply' : 'replies'}`);
  }

  function translateInlineTextNode(node) {
    if (!node || !node.nodeValue) {
      return;
    }

    const raw = node.nodeValue;
    let next = translatePlainChineseInlineText(raw).replace(/第\s*(\d+)\s*号会员/g, (match, number) => `Member #${number}`)
    .replace(/(\d+)\s*主题/g, (match, number) => `${number} ${Number(number) === 1 ? 'topic' : 'topics'}`)
    .replace(/(\d+)\s*回复/g, (match, number) => `${number} ${Number(number) === 1 ? 'reply' : 'replies'}`)
    .replace(/加入于\s*/g, 'Joined ')
    .replace(/最后在线\s*/g, 'Last online ')
    .replace(/编写于\s*/g, 'Posted ')
    .replace(/大约\s*/g, 'about ')
    .replace(/刚刚/g, 'just now')
    .replace(/不到\s*1\s*分钟之前/g, 'less than 1 minute ago')
    .replace(/\d+\s*天之前/g, (match) => {
      const days = match.match(/\d+/);
      return days ? `${days[0]} days ago` : match;
    }).replace(/\d+\s*小时前/g, (match) => {
      const hours = match.match(/\d+/);
      return hours ? `${hours[0]} hours ago` : match;
    }).replace(/\d+\s*分钟之前/g, (match) => {
      const minutes = match.match(/\d+/);
      return minutes ? `${minutes[0]} minutes ago` : match;
    }).replace(/最后回复/g, enInlineText['最后回复']);

    const trimmed = next.trim();
    if (trimmed === '声望') {
      const leading = next.match(/^\s*/)[0];
      const trailing = next.match(/\s*$/)[0];
      next = `${leading}Reputation${trailing}`;
    }
    if (enInlineText[trimmed]) {
      const leading = next.match(/^\s*/)[0];
      const trailing = next.match(/\s*$/)[0];
      next = `${leading}${enInlineText[trimmed]}${trailing}`;
    }

    if (next !== raw) {
      node.nodeValue = next;
    }
  }

  function translateKnownText(text) {
    if (getUiLocale() !== 'en') {
      return text;
    }
    const raw = String(text || '');
    const trimmed = raw.trim();
    if (!trimmed) {
      return raw;
    }
    const replacement = enInlineText[trimmed];
    if (!replacement) {
      return raw;
    }
    return raw.replace(trimmed, replacement);
  }

  function translateSystemKeyTextNode(node) {
    if (!node || !node.nodeValue) {
      return;
    }

    const locale = getUiLocale();
    const raw = node.nodeValue;
    const trimmed = raw.trim();
    const keyMap = {
      'skip-to-content': locale === 'en' ? 'Skip to content' : '跳转至内容',
      'Skip to content': locale === 'en' ? 'Skip to content' : '跳转至内容',
      '404.title': locale === 'en' ? 'Page not found' : '页面不存在',
      'global:404.message,': locale === 'en' ? 'This page does not exist, or it may have been moved or removed.' : '这个页面不存在，可能已被移动或删除。',
      'global:404.message': locale === 'en' ? 'This page does not exist, or it may have been moved or removed.' : '这个页面不存在，可能已被移动或删除。',
      '社区基本法': locale === 'en' ? 'Community Rules' : '社区公约',
      '社区公约': locale === 'en' ? 'Community Rules' : '社区公约',
      'Community Rules': locale === 'en' ? 'Community Rules' : '社区公约',
      'COMMUNITY RULES': locale === 'en' ? 'Community Rules' : '社区公约',
      '真实分享 · 真诚友善': locale === 'en' ? 'Share honestly · Be kind' : '真实分享 · 真诚友善',
      'Share honestly · Be kind': locale === 'en' ? 'Share honestly · Be kind' : '真实分享 · 真诚友善',
    };

    if (!keyMap[trimmed]) {
      return;
    }

    const leading = raw.match(/^\s*/)[0];
    const trailing = raw.match(/\s*$/)[0];
    node.nodeValue = `${leading}${keyMap[trimmed]}${trailing}`;
  }

  function applyInlineTextI18n(root) {
    const shouldTranslateEnglishText = getUiLocale() === 'en';
    const start = root && root.nodeType ? root : document.body;
    const skipTags = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'CODE', 'PRE']);
    let textNodeCount = 0;
    const maxTextNodes = start === document || start === document.documentElement || start === document.body ? 900 : 260;
    const walk = (node) => {
      if (!node) {
        return;
      }
      if (textNodeCount > maxTextNodes) {
        return;
      }
      if (node.nodeType === 3) {
        textNodeCount += 1;
        translateSystemKeyTextNode(node);
        if (shouldTranslateEnglishText) {
          translateInlineTextNode(node);
        }
        return;
      }
      if (node.nodeType !== 1 && node.nodeType !== 9) {
        return;
      }
      if (node.nodeType === 1 && skipTags.has(node.tagName)) {
        return;
      }
      Array.from(node.childNodes || []).forEach(walk);
    };

    walk(start);
  }

  function queueInlineI18n(root) {
    const nextRoot = root && root.nodeType === 3 ? root.parentElement : root;
    inlineI18nQueuedRoot = inlineI18nQueuedRoot || nextRoot || document;
    if (inlineI18nQueued) {
      return;
    }

    inlineI18nQueued = true;
    window.requestAnimationFrame(() => {
      const queuedRoot = inlineI18nQueuedRoot || document;
      inlineI18nQueued = false;
      inlineI18nQueuedRoot = null;
      applyInlineI18n(queuedRoot);
    });
  }

  function applyInlineI18nSoon(root) {
    window.requestAnimationFrame(() => applyInlineI18n(root || document));
    window.setTimeout(() => applyInlineI18n(root || document), 180);
    window.setTimeout(() => applyInlineI18n(root || document), 720);
  }

  function formatOAuthProviderName(provider) {
    const raw = String(provider || 'Google').trim();
    if (!raw) {
      return 'Google';
    }
    const known = {
      google: 'Google',
      github: 'GitHub',
      facebook: 'Facebook',
      twitter: 'Twitter',
      x: 'X',
      apple: 'Apple',
      microsoft: 'Microsoft',
    };
    const lower = raw.toLowerCase();
    return known[lower] || raw.replace(/\b([a-z])/g, (match) => match.toUpperCase());
  }

  function applyOAuthLabels(root) {
    const scope = root && root.querySelectorAll ? root : document;
    const paint = (element) => {
      const provider = formatOAuthProviderName(element.dataset.sgtalkOauthProvider);
      const key = element.dataset.sgtalkOauthAction === 'register' ? 'auth.providerRegister' : 'auth.providerLogin';
      element.textContent = t(key, { provider });
    };

    if (scope.matches && scope.matches('[data-sgtalk-oauth-label]')) {
      paint(scope);
    }
    scope.querySelectorAll('[data-sgtalk-oauth-label]').forEach(paint);
  }

  function applyInlineI18n(root) {
    if (inlineI18nApplying) {
      return;
    }
    inlineI18nApplying = true;
    const scope = root && root.querySelectorAll ? root : document;
    try {
      const applySkipLink = (element) => {
        element.textContent = getUiLocale() === 'en' ? 'Skip to content' : '跳转至内容';
      };
      const applyText = (element) => {
        const key = element.dataset.sgtalkI18n;
        if (key) {
          element.textContent = t(key);
        }
      };
      const applyAttr = (element, dataName, attrName) => {
        const key = element.dataset[dataName];
        if (key) {
          element.setAttribute(attrName, t(key));
        }
      };

      if (scope.matches && scope.matches('[data-sgtalk-i18n]')) {
        applyText(scope);
      }
      scope.querySelectorAll('[data-sgtalk-i18n]').forEach(applyText);

      const attrSelector = '[data-sgtalk-i18n-placeholder], [data-sgtalk-i18n-title], [data-sgtalk-i18n-aria-label]';
      const applyAttrs = (element) => {
        applyAttr(element, 'sgtalkI18nPlaceholder', 'placeholder');
        applyAttr(element, 'sgtalkI18nTitle', 'title');
        applyAttr(element, 'sgtalkI18nAriaLabel', 'aria-label');
      };
      if (scope.matches && scope.matches(attrSelector)) {
        applyAttrs(scope);
      }
      scope.querySelectorAll(attrSelector).forEach(applyAttrs);
      if (scope.matches && scope.matches('a[href="#content"]')) {
        applySkipLink(scope);
      }
      scope.querySelectorAll('a[href="#content"]').forEach(applySkipLink);
      const knownAttrSelector = 'input[placeholder], textarea[placeholder], [title], [aria-label]';
      const applyKnownAttrs = (element) => {
        ['placeholder', 'title', 'aria-label'].forEach((attr) => {
          if (element.hasAttribute && element.hasAttribute(attr)) {
            const current = element.getAttribute(attr);
            const next = translateKnownText(current);
            if (next !== current) {
              element.setAttribute(attr, next);
            }
          }
        });
      };
      if (scope.matches && scope.matches(knownAttrSelector)) {
        applyKnownAttrs(scope);
      }
      scope.querySelectorAll(knownAttrSelector).forEach(applyKnownAttrs);
      applyInlineTextI18n(scope);
      applyOAuthLabels(scope);
    } finally {
      inlineI18nApplying = false;
    }
  }

  function assetUrl(filename) {
    const relativePath = (window.config && window.config.relative_path) || '';
    return relativePath + pluginPublicPath + '/' + filename;
  }

  const avatarBackgrounds = [
    { id: 'bay', labelKey: 'avatar.bg.bay', color: '#C13A32' },
    { id: 'teal', labelKey: 'avatar.bg.teal', color: '#2CB6A3' },
    { id: 'leaf', labelKey: 'avatar.bg.leaf', color: '#38A86B' },
    { id: 'sky', labelKey: 'avatar.bg.sun', color: '#D7A22A' },
    { id: 'mist', labelKey: 'avatar.bg.coral', color: '#8B96A7' },
    { id: 'violet', labelKey: 'avatar.bg.violet', color: '#7C77F2' },
    { id: 'rose', labelKey: 'avatar.bg.rose', color: '#D96AA0' },
    { id: 'slate', labelKey: 'avatar.bg.slate', color: '#5E718C' },
  ];

  const avatarPresets = [
    { id: 'classic', labelKey: 'avatar.preset.classic', asset: 'classic' },
    { id: 'spark', labelKey: 'avatar.preset.spark', asset: 'spark' },
    { id: 'coffee', labelKey: 'avatar.preset.coffee', asset: 'coffee' },
    { id: 'reader', labelKey: 'avatar.preset.reader', asset: 'reader' },
    { id: 'thumb', labelKey: 'avatar.preset.thumb', asset: 'thumb' },
    { id: 'audio', labelKey: 'avatar.preset.audio', asset: 'audio' },
    { id: 'paint', labelKey: 'avatar.preset.paint', asset: 'paint' },
    { id: 'camera', labelKey: 'avatar.preset.camera', asset: 'camera' },
    { id: 'scarf', labelKey: 'avatar.preset.scarf', asset: 'scarf' },
  ];

  const avatarStudioState = {
    preset: 'classic',
    background: 'bay',
    applyingPending: false,
    modalReturnFocus: null,
  };

  function getAvatarBackground(id) {
    return avatarBackgrounds.find((item) => item.id === id) || avatarBackgrounds[0];
  }

  function normalizeAvatarPresetId(id) {
    return id === 'idea' ? 'thumb' : id;
  }

  function getAvatarPreset(id) {
    const normalizedId = normalizeAvatarPresetId(id);
    return avatarPresets.find((item) => item.id === normalizedId) || avatarPresets[0];
  }

  function shadeColor(hex, amount) {
    const clean = String(hex || defaultAvatarBg).replace('#', '');
    const num = parseInt(clean.length === 3 ? clean.split('').map((ch) => ch + ch).join('') : clean, 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + amount));
    const b = Math.max(0, Math.min(255, (num & 0xff) + amount));
    return `#${[r, g, b].map((value) => value.toString(16).padStart(2, '0')).join('')}`;
  }

  function getAvatarForegroundUrl(presetId) {
    const preset = getAvatarPreset(presetId);
    return assetUrl(`avatar-presets/foreground/${preset.asset}.png?v=${avatarAssetVersion}`);
  }

  function avatarImageMarkup(presetId, altText) {
    const preset = getAvatarPreset(presetId);
    return `<img src="${getAvatarForegroundUrl(preset.id)}" alt="${altText || itemLabel(preset)}" loading="lazy" decoding="async">`;
  }

  function loadAvatarImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  }

  function avatarSelectionToPng(selection) {
    const bg = getAvatarBackground(selection.background);
    const bg2 = shadeColor(bg.color, 34);
    const bg3 = shadeColor(bg.color, -28);

    return loadAvatarImage(getAvatarForegroundUrl(selection.preset)).then((image) => {
      const canvas = document.createElement('canvas');
      canvas.width = avatarUploadCanvasSize;
      canvas.height = avatarUploadCanvasSize;
      const ctx = canvas.getContext('2d');
      const size = avatarUploadCanvasSize;
      const scale = size / 512;
      const gradient = ctx.createRadialGradient(176 * scale, 94 * scale, 12, size / 2, size / 2, size * 0.64);

      gradient.addColorStop(0, bg2);
      gradient.addColorStop(1, bg3);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, avatarForegroundYOffset * scale, canvas.width, canvas.height);

      return canvas.toDataURL('image/jpeg', avatarUploadQuality);
    });
  }

  function getCurrentUserId() {
    const user = window.app && window.app.user;
    const uid = Number((user && user.uid) || 0);
    return Number.isFinite(uid) && uid > 0 ? uid : 0;
  }

  function isLoggedInSession() {
    return getCurrentUserId() > 0 ||
      document.body.classList.contains('user-loggedin') ||
      Boolean(document.querySelector('a[href="/logout"], a[href$="/logout"]'));
  }

  function getViewedUserId() {
    const theirid = Number(window.ajaxify && window.ajaxify.data && window.ajaxify.data.theirid);
    return Number.isFinite(theirid) && theirid > 0 ? theirid : 0;
  }

  function getUidFromElement(selector) {
    const element = document.querySelector(selector);
    const uid = Number(element && element.getAttribute('data-uid'));
    return Number.isFinite(uid) && uid > 0 ? uid : 0;
  }

  function getAvatarDomUserId() {
    return getUidFromElement('.sg-account-avatar [data-uid], .sg-account-avatar img[data-uid], [component="account/picture"] [data-uid], [component="account/picture"][data-uid]') ||
      getUidFromElement('.sg-auth-state [data-uid], [data-sgtalk-auth-avatar][data-uid]');
  }

  function getAvatarUploadUserId() {
    const uid = getCurrentUserId();
    const viewedUid = getViewedUserId();
    if (uid > 0 && (!viewedUid || viewedUid === uid)) {
      return viewedUid || uid;
    }
    const accountUid = getAvatarDomUserId();
    if (accountUid > 0 && canEditViewedAvatar()) {
      return accountUid;
    }
    const pictureUid = Number(document.querySelector('[component="avatar/picture"][data-uid], img.avatar[data-uid]')?.getAttribute('data-uid'));
    return Number.isFinite(pictureUid) && pictureUid > 0 && canEditViewedAvatar() ? pictureUid : uid;
  }

  function getSlugFromProfilePath() {
    const match = window.location.pathname.match(/^\/user\/([^/?#]+)/);
    return match ? decodeURIComponent(match[1]) : '';
  }

  function getAvatarUploadUserSlug() {
    const user = window.app && window.app.user;
    const ajaxData = window.ajaxify && window.ajaxify.data;
    const authHref = document.querySelector('.sg-auth-state-link[href^="/user/"]')?.getAttribute('href') || '';
    const authSlug = (authHref.match(/^\/user\/([^/?#]+)/) || [])[1] || '';
    return (ajaxData && ajaxData.userslug) ||
      (user && (user.userslug || user.slug)) ||
      (authSlug ? decodeURIComponent(authSlug) : '') ||
      (canEditViewedAvatar() ? getSlugFromProfilePath() : '') ||
      '';
  }

  function getCsrfToken() {
    const inlineConfigScript = Array.from(document.scripts)
      .map(script => script.textContent || '')
      .find(text => text.includes('"csrf_token"') || text.includes('csrf_token'));
    const inlineMatch = inlineConfigScript && inlineConfigScript.match(/"csrf_token"\s*:\s*"([^"]+)"/);
    return (window.config && (window.config.csrf_token || window.config.csrfToken)) ||
      document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ||
      document.querySelector('input[name="_csrf"], input[name="csrf_token"]')?.value ||
      (inlineMatch && inlineMatch[1]) ||
      '';
  }

  function canEditViewedAvatar() {
    const uid = getCurrentUserId();
    const viewedUid = getViewedUserId();
    if (uid > 0 && (!viewedUid || uid === viewedUid)) {
      return true;
    }
    const profileSlug = getSlugFromProfilePath();
    const authHref = document.querySelector('.sg-auth-state-link[href^="/user/"]')?.getAttribute('href') || '';
    const authSlug = (authHref.match(/^\/user\/([^/?#]+)/) || [])[1] || '';
    return document.body.classList.contains('user-loggedin') &&
      Boolean(document.querySelector('a[href="/logout"]')) &&
      Boolean(profileSlug) &&
      profileSlug === decodeURIComponent(authSlug);
  }

  function getSocket() {
    return new Promise((resolve, reject) => {
      if (window.require) {
        window.require(['socket'], resolve);
      } else if (window.socket) {
        resolve(window.socket);
      } else {
        reject(new Error('socket unavailable'));
      }
    });
  }

  function shouldRetryAvatarUpload(error) {
    const raw = String((error && (error.message || error)) || '');
    return !/(no-privileges|file-too-big|invalid-image|profile-image-uploads-disabled)/.test(raw);
  }

  function wait(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  function uploadAvatarImage(socket, base64, uid, onProgress) {
    const params = {
      uid,
      method: 'user.uploadCroppedPicture',
      size: base64.length,
      progress: 0,
    };
    const chunkSize = 100000;

    return new Promise((resolve, reject) => {
      function sendNextChunk() {
        const chunk = base64.slice(params.progress, params.progress + chunkSize);
        socket.emit('uploads.upload', {
          chunk,
          params,
        }, (err, result) => {
          if (err) {
            reject(err);
            return;
          }

          if (params.progress + chunkSize < params.size) {
            params.progress += chunk.length;
            if (onProgress) {
              onProgress(Math.min(99, Math.round((params.progress / params.size) * 100)));
            }
            window.setTimeout(sendNextChunk, 60);
            return;
          }

          if (onProgress) {
            onProgress(100);
          }
          resolve(result);
        });
      }

      sendNextChunk();
    });
  }

  function dataUrlToFile(dataUrl, filename) {
    const [header, payload] = String(dataUrl || '').split(',');
    const mime = (header.match(/data:([^;]+)/) || [])[1] || 'image/jpeg';
    const binary = window.atob(payload || '');
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    return new File([bytes], filename, { type: mime });
  }

  function normalizeUploadResponse(payload) {
    if (!payload || typeof payload !== 'object') {
      return payload;
    }
    if (payload.response && typeof payload.response === 'object') {
      return payload.response;
    }
    if (payload.user && typeof payload.user === 'object') {
      return payload.user;
    }
    return payload;
  }

  async function fetchCurrentUserAvatar(slug, uid) {
    const paths = [
      slug ? `/api/user/${encodeURIComponent(slug)}` : '',
      uid ? `/api/user/uid/${encodeURIComponent(uid)}` : '',
      isLoggedInSession() ? '/api/self' : '',
    ].filter(Boolean);

    for (const path of paths) {
      try {
        const response = await fetch(path, { credentials: 'same-origin' });
        if (!response.ok) {
          continue;
        }
        const payload = normalizeUploadResponse(await response.json());
        const url = getUploadedAvatarUrl(payload);
        if (url) {
          return { picture: url, url };
        }
      } catch (error) {
        // Keep trying the next public read endpoint.
      }
    }
    return null;
  }

  async function fetchUserIdentity(target) {
    const uid = Number((target && target.uid) || 0);
    const slug = (target && target.slug) || '';
    const paths = [
      uid > 0 ? `/api/user/uid/${encodeURIComponent(uid)}` : '',
      slug ? `/api/user/${encodeURIComponent(slug)}` : '',
      isLoggedInSession() ? '/api/self' : '',
    ].filter(Boolean);

    for (const path of paths) {
      try {
        const response = await fetch(path, { credentials: 'same-origin' });
        if (!response.ok) {
          continue;
        }
        const payload = normalizeUploadResponse(await response.json()) || {};
        return {
          uid: Number(payload.uid || uid || 0),
          slug: payload.userslug || payload.slug || slug || '',
        };
      } catch (error) {
        // Try the next identity endpoint.
      }
    }

    return {
      uid,
      slug,
    };
  }

  async function resolveAvatarUploadTarget() {
    const target = {
      uid: getAvatarUploadUserId(),
      slug: getAvatarUploadUserSlug(),
    };

    if (target.uid > 0 && target.slug) {
      return target;
    }

    if (!isLoggedInSession()) {
      return target;
    }

    const identity = await fetchUserIdentity(target);
    target.uid = target.uid || identity.uid;
    target.slug = target.slug || identity.slug;

    if (!target.slug && canEditViewedAvatar()) {
      target.slug = getSlugFromProfilePath();
    }
    return target;
  }

  async function activateUploadedAvatar(uid) {
    const userId = Number(uid || 0);
    if (!userId) {
      return null;
    }

    const csrf = getCsrfToken();
    try {
      const response = await fetch(`/api/v3/users/${encodeURIComponent(userId)}/picture`, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json',
          ...(csrf ? { 'x-csrf-token': csrf } : {}),
        },
        body: JSON.stringify({ type: 'uploaded' }),
      });
      return response.ok ? response.json().catch(() => null) : null;
    } catch (error) {
      return null;
    }
  }

  async function uploadAvatarImageViaRest(base64, target, onProgress) {
    const uploadTarget = typeof target === 'object' ? target : { uid: Number(target || 0), slug: getAvatarUploadUserSlug() };
    const slug = uploadTarget.slug || getAvatarUploadUserSlug();
    const file = dataUrlToFile(base64, `sgtalk-avatar-${Date.now()}.jpg`);
    const csrf = getCsrfToken();
    const endpoints = [
      slug ? `/api/user/${encodeURIComponent(slug)}/uploadpicture` : '',
    ].filter(Boolean);
    let lastError;

    for (const endpoint of endpoints) {
      const formData = new FormData();
      formData.append('files[]', file, file.name);
      if (csrf) {
        formData.append('_csrf', csrf);
      }

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          credentials: 'same-origin',
          headers: csrf ? { 'x-csrf-token': csrf } : {},
          body: formData,
        });
        const text = await response.text();
        let payload = null;
        try {
          payload = text ? JSON.parse(text) : null;
        } catch (error) {
          payload = text;
        }

        if (!response.ok) {
          lastError = new Error((payload && (payload.message || payload.error)) || `avatar upload ${response.status}`);
          lastError.status = response.status;
          continue;
        }

        if (onProgress) {
          onProgress(100);
        }

        const normalized = normalizeUploadResponse(payload) || {};
        const uploadedUrl = getUploadedAvatarUrl(normalized);
        if (uploadedUrl) {
          return normalized;
        }

        const refreshed = await fetchCurrentUserAvatar(slug, uploadTarget.uid);
        if (refreshed) {
          return refreshed;
        }
        return normalized;
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error('invalid-data');
  }

  async function uploadAvatarImageWithRetry(base64, target, onProgress) {
    const uploadTarget = typeof target === 'object' ? target : { uid: Number(target || 0), slug: getAvatarUploadUserSlug() };
    let socketError;

    if (uploadTarget.uid) {
      for (let attempt = 0; attempt < 2; attempt += 1) {
        try {
          const socket = await getSocket();
          return await uploadAvatarImage(socket, base64, uploadTarget.uid, onProgress);
        } catch (error) {
          socketError = error;
          if (!shouldRetryAvatarUpload(error)) {
            throw error;
          }
          if (attempt === 0) {
            await wait(350);
          }
        }
      }
    }

    try {
      return await uploadAvatarImageViaRest(base64, uploadTarget, onProgress);
    } catch (error) {
      if (!shouldRetryAvatarUpload(error)) {
        throw error;
      }
      throw error || socketError;
    }
  }

  async function confirmUploadedAvatar(slug, uid, fallbackUrl) {
    if (fallbackUrl) {
      return fallbackUrl;
    }
    let avatarUrl = '';
    for (let attempt = 0; attempt < 7; attempt += 1) {
      const refreshed = await fetchCurrentUserAvatar(slug, uid);
      const refreshedUrl = getUploadedAvatarUrl(refreshed);
      if (refreshedUrl) {
        avatarUrl = refreshedUrl;
        break;
      }
      await wait(260);
    }
    if (!avatarUrl) {
      throw new Error('[[error:invalid-data]]');
    }
    return avatarUrl;
  }

  function getUploadedAvatarUrl(result) {
    if (Array.isArray(result)) {
      return getUploadedAvatarUrl(result[0]);
    }
    return result && (
      result.url ||
      result.picture ||
      result.uploadedpicture ||
      result.uploadedPicture ||
      (result.user && (result.user.picture || result.user.uploadedpicture || result.user.uploadedPicture)) ||
      (result.response && (result.response.picture || result.response.url)) ||
      ''
    );
  }

  function syncCurrentUserAvatar(url) {
    if (!url || !(window.app && window.app.user)) {
      return;
    }

    window.app.user.picture = url;
    window.app.user.uploadedpicture = url;
    window.app.user.uploadedPicture = url;
    updateAuthState();
    normalizeDefaultAvatars(document);
    document.querySelectorAll('.sg-account-avatar img, [component="account/picture"] img').forEach((img) => {
      img.src = url;
    });
  }

  function userFacingAvatarError(error) {
    const raw = String((error && (error.message || error)) || '');
    if (raw.includes('no-privileges')) {
      return t('avatar.error.noPrivileges');
    }
    if (raw.includes('file-too-big')) {
      return t('avatar.error.fileTooBig');
    }
    if (raw.includes('invalid-data')) {
      return t('avatar.error.invalidData');
    }
    if (raw.includes('invalid-image') || raw.includes('profile-image-uploads-disabled')) {
      return t('avatar.error.invalidData');
    }
    if (raw.includes('socket unavailable')) {
      return t('avatar.error.socket');
    }
    return t('avatar.error.generic');
  }

  function setIconLink(rel, href, sizes, type) {
    const selectorParts = ['link[data-sgtalk-favicon="1"]', `[rel="${rel}"]`];
    if (sizes) {
      selectorParts.push(`[sizes="${sizes}"]`);
    }

    let link = document.head.querySelector(selectorParts.join(''));
    if (!link) {
      link = document.createElement('link');
      link.dataset.sgtalkFavicon = '1';
      document.head.appendChild(link);
    }

    link.rel = rel;
    link.href = href;
    if (sizes) {
      link.setAttribute('sizes', sizes);
    } else {
      link.removeAttribute('sizes');
    }
    if (type) {
      link.setAttribute('type', type);
    } else {
      link.removeAttribute('type');
    }
  }

  function installFavicon() {
    if (!document.head) {
      return;
    }

    document.head.querySelectorAll('link[data-sgtalk-favicon], link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]').forEach((link) => {
      link.remove();
    });

    setIconLink('icon', assetUrl(`brand/favicon.svg?v=${faviconVersion}`), '', 'image/svg+xml');
    setIconLink('icon', assetUrl(`favicon-32.png?v=${faviconVersion}`), '32x32', 'image/png');
    setIconLink('icon', assetUrl(`favicon-192.png?v=${faviconVersion}`), '192x192', 'image/png');
    setIconLink('shortcut icon', assetUrl(`favicon.ico?v=${faviconVersion}`), '', 'image/x-icon');
    setIconLink('apple-touch-icon', assetUrl(`favicon-180.png?v=${faviconVersion}`), '180x180', 'image/png');
  }

  function getLimits() {
    const mobile = mobileQuery.matches;
    const viewport = Math.max(window.innerHeight || 0, 520);
    const min = mobile ? 124 : 144;
    const max = Math.round(viewport * (mobile ? 0.42 : 0.46));

    return {
      min,
      max: Math.max(max, mobile ? 208 : 280),
    };
  }

  function getComposer(textarea) {
    return textarea && textarea.closest('[component="composer"], .composer, .page-compose');
  }

  function resizeTextarea(textarea) {
    const composer = getComposer(textarea);
    if (!composer) {
      return;
    }

    const mobile = mobileQuery.matches;
    const composePage = document.body.classList.contains('page-compose') || document.body.classList.contains('template-compose');
    const limits = getLimits();

    textarea.style.boxSizing = 'border-box';
    textarea.style.minHeight = `${limits.min}px`;
    textarea.style.maxHeight = `${limits.max}px`;
    textarea.style.height = 'auto';

    const nextHeight = Math.min(limits.max, Math.max(limits.min, textarea.scrollHeight + 2));
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY = textarea.scrollHeight > limits.max ? 'auto' : 'hidden';

    const writePreview = composer.querySelector('.write-preview-container');
    const writeContainer = composer.querySelector('.write-container');

    if (writePreview && (mobile || composePage)) {
      writePreview.style.height = 'auto';
      writePreview.style.minHeight = '0';
    }

    if (writeContainer && (mobile || composePage)) {
      writeContainer.style.minHeight = '0';
    }
  }

  function bindTextarea(textarea) {
    if (!textarea || textarea.dataset.sgtalkAutosizeComposer === '1') {
      if (textarea) {
        resizeTextarea(textarea);
      }
      return;
    }

    textarea.dataset.sgtalkAutosizeComposer = '1';
    textarea.addEventListener('input', () => resizeTextarea(textarea));
    textarea.addEventListener('change', () => resizeTextarea(textarea));

    requestAnimationFrame(() => resizeTextarea(textarea));
    window.setTimeout(() => resizeTextarea(textarea), 80);
    window.setTimeout(() => resizeTextarea(textarea), 260);
  }

  function scan(root) {
    const scope = root && root.querySelectorAll ? root : document;
    const textareas = [];

    if (scope.matches && scope.matches(selector)) {
      textareas.push(scope);
    }

    scope.querySelectorAll(selector).forEach((textarea) => textareas.push(textarea));
    textareas.forEach(bindTextarea);
  }

  function scanLater(root) {
    requestAnimationFrame(() => scan(root));
    window.setTimeout(() => scan(root), 120);
  }

  function getProfileHref(user) {
    const relativePath = (window.config && window.config.relative_path) || '';
    return user && user.userslug ? `${relativePath}/user/${user.userslug}` : `${relativePath}/me`;
  }

  function getAvatarText(user) {
    const source = (user && (user['icon:text'] || user.username || user.displayname)) || 'U';
    return String(source).trim().slice(0, 1).toUpperCase() || 'U';
  }

  function getAvatarTextFromElement(element) {
    const text = element && element.textContent ? element.textContent.trim() : '';
    if (text) {
      return text.slice(0, 1).toUpperCase();
    }

    const labelled = element && element.closest && element.closest('[title], [aria-label]');
    const label = labelled && (labelled.getAttribute('title') || labelled.getAttribute('aria-label'));
    return label ? label.trim().slice(0, 1).toUpperCase() : 'U';
  }

  function elementHasAvatarPicture(element) {
    if (!element) {
      return false;
    }
    if (element.matches && element.matches('img[src]')) {
      return Boolean(element.getAttribute('src'));
    }
    return Boolean(element.querySelector && element.querySelector('img[src]'));
  }

  function clearDefaultAvatarElement(element) {
    if (!element) {
      return;
    }
    element.classList.remove('sg-default-avatar');
    element.style.removeProperty('background-color');
    element.style.removeProperty('color');
  }

  function normalizeDefaultAvatarElement(element, text) {
    if (!element) {
      return;
    }
    if (elementHasAvatarPicture(element)) {
      clearDefaultAvatarElement(element);
      return;
    }

    const initial = (text || getAvatarTextFromElement(element)).slice(0, 1).toUpperCase() || 'U';
    element.textContent = initial;
    element.classList.add('sg-default-avatar');
    element.classList.remove('bg-secondary', 'text-muted');
    element.style.setProperty('background-color', defaultAvatarBg, 'important');
    element.style.setProperty('color', '#fff', 'important');
    element.style.setProperty('border-radius', '50%', 'important');
  }

  function getAvatarPicture(user) {
    return user && (user.picture || user.uploadedpicture || user.uploadedPicture || '');
  }

  function shouldPaintCurrentUserAvatar(element) {
    return element && element.matches && element.matches('[data-sgtalk-auth-avatar], [data-sgtalk-sidebar-avatar]');
  }

  function normalizeDefaultAvatars(root) {
    const scope = root && root.querySelectorAll ? root : document;
    const selectors = [
      '[data-sgtalk-auth-avatar]',
      '[data-sgtalk-sidebar-avatar]',
      '.sg-topic-avatar .avatar',
      '.sg-topic-avatar [component="avatar/icon"]',
      'ul.topics-list .avatar',
      'ul.topics-list [component="avatar/icon"]',
    ].join(',');

    const normalizeElement = (element) => {
      const currentUser = window.app && window.app.user;
      if (shouldPaintCurrentUserAvatar(element) && getAvatarPicture(currentUser)) {
        paintAvatar(element, currentUser);
        return;
      }
      normalizeDefaultAvatarElement(element);
    };

    if (scope.matches && scope.matches(selectors)) {
      normalizeElement(scope);
    }

    scope.querySelectorAll(selectors).forEach((element) => {
      normalizeElement(element);
    });
  }

  function avatarSelection() {
    return {
      preset: getAvatarPreset(avatarStudioState.preset).id,
      background: avatarStudioState.background,
    };
  }

  function renderAvatarPreview(container) {
    const preset = getAvatarPreset(avatarStudioState.preset);
    const bg = getAvatarBackground(avatarStudioState.background);
    const preview = container.querySelector('[data-sgtalk-avatar-preview]');
    if (preview) {
      preview.style.setProperty('--avatar-bg', bg.color);
      preview.style.setProperty('--avatar-bg-light', shadeColor(bg.color, 34));
      preview.style.setProperty('--avatar-bg-dark', shadeColor(bg.color, -28));
      preview.innerHTML = avatarImageMarkup(preset.id, t('avatar.previewAlt', { label: itemLabel(preset) }));
    }

    container.querySelectorAll('[data-avatar-preset]').forEach((button) => {
      const isActive = normalizeAvatarPresetId(button.dataset.avatarPreset) === preset.id;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      const art = button.querySelector('[data-avatar-art]');
      if (art) {
        art.style.setProperty('--avatar-bg', bg.color);
        art.style.setProperty('--avatar-bg-light', shadeColor(bg.color, 34));
        art.style.setProperty('--avatar-bg-dark', shadeColor(bg.color, -28));
      }
    });
    container.querySelectorAll('[data-avatar-bg]').forEach((button) => {
      const isActive = button.dataset.avatarBg === avatarStudioState.background;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function avatarStudioMarkup(mode) {
    const compact = mode === 'modal';
    const presets = avatarPresets.map((preset) => `
      <button type="button" class="sg-avatar-preset" data-avatar-preset="${preset.id}" title="${itemLabel(preset)}" aria-pressed="false">
        <span class="sg-avatar-preset-art" data-avatar-art>${avatarImageMarkup(preset.id, '')}</span>
        <span class="sg-avatar-preset-name">${itemLabel(preset)}</span>
      </button>
    `).join('');
    const swatches = avatarBackgrounds.map((item) => `
      <button type="button" class="sg-avatar-swatch" data-avatar-bg="${item.id}" title="${itemLabel(item)}" aria-label="${itemLabel(item)}" aria-pressed="false" style="--avatar-swatch:${item.color}">
        <span></span>
      </button>
    `).join('');

    return `
      <div class="sg-avatar-studio ${compact ? 'compact' : ''}" data-sgtalk-avatar-studio-mounted="1">
        <div class="sg-avatar-studio-copy">
          <h3>${t('avatar.title')}</h3>
        </div>
        <div class="sg-avatar-studio-body">
          <div class="sg-avatar-live-preview" data-sgtalk-avatar-preview></div>
          <div class="sg-avatar-studio-controls">
            <div class="sg-avatar-control-label">${t('avatar.shape')}</div>
            <div class="sg-avatar-preset-grid">${presets}</div>
            <div class="sg-avatar-control-label">${t('avatar.background')}</div>
            <div class="sg-avatar-swatches">${swatches}</div>
          </div>
        </div>
        <div class="sg-avatar-studio-actions">
          <button type="button" class="sg-v2-button primary" data-avatar-save>${t('avatar.save')}</button>
          <button type="button" class="sg-v2-button" data-avatar-default>${t('avatar.keepDefault')}</button>
        </div>
        <div class="sg-avatar-studio-status" data-avatar-status aria-live="polite"></div>
      </div>
    `;
  }

  function bindAvatarStudio(container) {
    if (!container || container.dataset.avatarStudioBound === '1') {
      return;
    }

    container.dataset.avatarStudioBound = '1';
    container.addEventListener('click', (event) => {
      handleAvatarStudioClick(event, container);
    });

    renderAvatarPreview(container);
  }

  function handleAvatarStudioClick(event, container) {
    if (!event || event.sgtalkAvatarHandled || !(event.target && event.target.closest)) {
      return false;
    }

    const studio = container || event.target.closest('.sg-avatar-studio');
    if (!studio) {
      return false;
    }

    const presetButton = event.target.closest('[data-avatar-preset]');
    if (presetButton && studio.contains(presetButton)) {
      event.preventDefault();
      event.sgtalkAvatarHandled = true;
      avatarStudioState.preset = presetButton.dataset.avatarPreset;
      renderAvatarPreview(studio);
      return true;
    }

    const bgButton = event.target.closest('[data-avatar-bg]');
    if (bgButton && studio.contains(bgButton)) {
      event.preventDefault();
      event.sgtalkAvatarHandled = true;
      avatarStudioState.background = bgButton.dataset.avatarBg;
      renderAvatarPreview(studio);
      return true;
    }

    const defaultButton = event.target.closest('[data-avatar-default]');
    if (defaultButton && studio.contains(defaultButton)) {
      event.preventDefault();
      event.sgtalkAvatarHandled = true;
      const status = studio.querySelector('[data-avatar-status]');
      if (status) {
        status.textContent = t('avatar.defaultKept');
      }
      return true;
    }

    const saveButton = event.target.closest('[data-avatar-save]');
    if (saveButton && studio.contains(saveButton)) {
      event.preventDefault();
      event.sgtalkAvatarHandled = true;
      if (!saveButton.disabled) {
        saveAvatarSelection(studio, avatarSelection());
      }
      return true;
    }

    return false;
  }

  function installAvatarStudioDelegates() {
    if (document.documentElement.dataset.sgtalkAvatarDelegates === '1') {
      return;
    }

    document.documentElement.dataset.sgtalkAvatarDelegates = '1';
    document.addEventListener('click', (event) => {
      if (!event.target || !event.target.closest) {
        return;
      }
      if (!event.target.closest('[data-avatar-preset], [data-avatar-bg], [data-avatar-default], [data-avatar-save]')) {
        return;
      }
      handleAvatarStudioClick(event);
    });
  }

  function installAvatarStudio(root) {
    const scope = root && root.querySelectorAll ? root : document;
    const registerForm = document.querySelector('.sg-register-complete .sg-auth-form');
    if (registerForm && !registerForm.querySelector('[data-sgtalk-avatar-studio-mounted]')) {
      const mount = document.createElement('div');
      mount.className = 'sg-auth-section sg-avatar-complete-section';
      mount.innerHTML = avatarStudioMarkup('register');
      const submit = registerForm.querySelector('.sg-auth-submit');
      registerForm.insertBefore(mount, submit || null);
      bindAvatarStudio(mount.querySelector('.sg-avatar-studio'));
    }

    const accountActions = document.querySelector('.sg-account-actions');
    if (accountActions && !canEditViewedAvatar()) {
      accountActions.querySelectorAll('[data-avatar-open]').forEach((button) => button.remove());
    }

    if (accountActions && canEditViewedAvatar() && accountActions.querySelector('a[href*="/edit"]') && !accountActions.querySelector('[data-avatar-open]')) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'sg-account-avatar-button';
      button.dataset.avatarOpen = '1';
      button.dataset.sgtalkAvatarOpen = '1';
      button.textContent = t('avatar.open');
      button.addEventListener('click', openAvatarStudioModal);
      accountActions.insertBefore(button, accountActions.firstChild);
    }

    scope.querySelectorAll('[data-sgtalk-avatar-studio]:not([data-sgtalk-avatar-studio-mounted])').forEach((mount) => {
      mount.innerHTML = avatarStudioMarkup('register');
      bindAvatarStudio(mount.querySelector('.sg-avatar-studio'));
    });
  }

  function openAvatarStudioModal() {
    avatarStudioState.modalReturnFocus = document.activeElement && document.activeElement.focus
      ? document.activeElement
      : null;
    let modal = document.querySelector('.sg-avatar-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'sg-avatar-modal';
      modal.innerHTML = `
        <div class="sg-avatar-modal-backdrop" data-avatar-close></div>
        <div class="sg-avatar-modal-panel" role="dialog" aria-modal="true" aria-label="${t('avatar.dialog')}">
          <button type="button" class="sg-avatar-modal-close" data-avatar-close aria-label="${t('avatar.close')}">×</button>
          ${avatarStudioMarkup('modal')}
        </div>
      `;
      document.body.appendChild(modal);
      const closeButton = modal.querySelector('.sg-avatar-modal-close');
      if (closeButton) {
        closeButton.innerHTML = '&times;';
      }
      modal.addEventListener('click', (event) => {
        if (event.target.closest('[data-avatar-close]')) {
          closeAvatarStudioModal();
        }
      });
      modal.addEventListener('keydown', handleAvatarModalKeydown);
      bindAvatarStudio(modal.querySelector('.sg-avatar-studio'));
    }

    modal.classList.add('open');
    renderAvatarPreview(modal);
    focusAvatarModal(modal);
  }

  function getAvatarModalFocusables(modal) {
    if (!modal) {
      return [];
    }
    return Array.from(modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
      .filter((element) => !element.disabled && element.offsetParent !== null);
  }

  function focusAvatarModal(modal) {
    window.setTimeout(() => {
      const focusTarget = (modal && modal.querySelector('.sg-avatar-modal-close')) || getAvatarModalFocusables(modal)[0];
      if (focusTarget && focusTarget.focus) {
        focusTarget.focus({ preventScroll: true });
      }
    }, 0);
  }

  function closeAvatarStudioModal() {
    const modal = document.querySelector('.sg-avatar-modal');
    if (modal) {
      modal.classList.remove('open');
    }
    const returnFocus = avatarStudioState.modalReturnFocus;
    avatarStudioState.modalReturnFocus = null;
    if (returnFocus && document.contains(returnFocus) && returnFocus.focus) {
      returnFocus.focus({ preventScroll: true });
    }
  }

  function handleAvatarModalKeydown(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeAvatarStudioModal();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const modal = event.currentTarget;
    const focusables = getAvatarModalFocusables(modal);
    if (!focusables.length) {
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  async function saveAvatarSelection(container, selection, options) {
    const status = container && container.querySelector('[data-avatar-status]');
    const saveButton = container && container.querySelector('[data-avatar-save]');
    const target = await resolveAvatarUploadTarget();
    const loggedIn = isLoggedInSession() && target && (Number(target.uid) > 0 || Boolean(target.slug));

    if (!loggedIn) {
      localStorage.setItem('sgtalk:pendingAvatar', JSON.stringify(selection));
      if (status) {
        status.textContent = t('avatar.pending');
      }
      return;
    }

    if (status) {
      status.textContent = t('avatar.saving');
    }
    if (saveButton) {
      saveButton.disabled = true;
      saveButton.setAttribute('aria-busy', 'true');
    }

    try {
      const base64 = await avatarSelectionToPng(selection);
      const uploadResult = await uploadAvatarImageWithRetry(base64, target, (progress) => {
        if (status && progress < 100) {
          status.textContent = t('avatar.savingProgress', { progress });
        }
      });
      const activated = target.uid ? await activateUploadedAvatar(target.uid).catch(() => null) : null;
      const avatarUrl = await confirmUploadedAvatar(target.slug, target.uid, getUploadedAvatarUrl(uploadResult) || getUploadedAvatarUrl(activated));
      syncCurrentUserAvatar(avatarUrl);
      localStorage.removeItem('sgtalk:pendingAvatar');
      if (status) {
        status.textContent = t('avatar.saved');
      }
      if (!options || !options.silent) {
        window.setTimeout(() => window.location.reload(), 650);
      }
    } catch (error) {
      if (status) {
        status.textContent = userFacingAvatarError(error);
      }
      console.error('SGTALK avatar save failed', error && (error.message || error), error);
    } finally {
      if (saveButton) {
        saveButton.disabled = false;
        saveButton.removeAttribute('aria-busy');
      }
    }
  }

  function applyPendingAvatarIfNeeded() {
    if (avatarStudioState.applyingPending || !(window.app && window.app.user && Number(window.app.user.uid) > 0)) {
      return;
    }

    const pending = localStorage.getItem('sgtalk:pendingAvatar');
    if (!pending) {
      return;
    }

    try {
      avatarStudioState.applyingPending = true;
      saveAvatarSelection(null, JSON.parse(pending), { silent: true }).finally(() => {
        avatarStudioState.applyingPending = false;
      });
    } catch (error) {
      localStorage.removeItem('sgtalk:pendingAvatar');
      avatarStudioState.applyingPending = false;
    }
  }

  function paintAvatar(target, user) {
    if (!target) {
      return;
    }

    const picture = getAvatarPicture(user);
    const text = getAvatarText(user);

    target.textContent = '';
    target.style.backgroundColor = '';
    target.classList.toggle('sg-has-picture', Boolean(picture));

    if (picture) {
      const img = document.createElement('img');
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      img.src = picture;
      target.appendChild(img);
      return;
    }

    target.classList.remove('sg-has-picture');
    normalizeDefaultAvatarElement(target, text);
  }

  function updateAuthState() {
    const user = window.app && window.app.user;
    const loggedIn = user && Number(user.uid) > 0;
    const username = loggedIn && user.username ? `@${user.username}` : t('auth.loggedIn');
    const displayName = loggedIn && (user.displayname || user.username) ? (user.displayname || user.username) : t('auth.loggedIn');
    const profileHref = getProfileHref(user);

    document.querySelectorAll('[data-sgtalk-auth-state]').forEach((element) => {
      element.href = profileHref;
      element.title = username;
      const avatar = element.querySelector('[data-sgtalk-auth-avatar]');
      const name = element.querySelector('[data-sgtalk-auth-name]');
      if (avatar || name) {
        paintAvatar(avatar, user);
        if (name) {
          name.textContent = displayName;
        }
        return;
      }
      element.textContent = displayName;
    });

    document.querySelectorAll('[data-sgtalk-sidebar-avatar]').forEach((element) => {
      element.href = profileHref;
      paintAvatar(element, user);
    });

    document.querySelectorAll('[data-sgtalk-sidebar-name]').forEach((element) => {
      element.href = profileHref;
      element.textContent = displayName;
      element.title = displayName;
    });

    normalizeDefaultAvatars(document);
    installAvatarStudio(document);
    applyPendingAvatarIfNeeded();
  }

  function bindHardNavigation() {
    if (document.documentElement.dataset.sgtalkHardNavigation === '1') {
      return;
    }

    document.documentElement.dataset.sgtalkHardNavigation = '1';
    document.addEventListener('click', (event) => {
      const link = event.target && event.target.closest
        ? event.target.closest('a.sg-v2-post-link[href], .sg-empty-actions a[href*="/compose"], a[data-sgtalk-hard-link="compose"]')
        : null;
      if (!link) {
        return;
      }

      const url = new URL(link.href, window.location.origin);
      const hardPath = url.pathname.startsWith('/compose') || url.pathname.startsWith('/login');
      if (!hardPath) {
        return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();
      link.setAttribute('aria-busy', 'true');
      window.location.assign(link.href);
    }, true);
  }

  function closestComposer(element) {
    return element && element.closest && element.closest('[component="composer"], .composer');
  }

  function composerScope() {
    return document.querySelector('[component="composer"], .composer');
  }

  function setSubmitState(composer, state) {
    if (!composer) {
      return;
    }

    composer.querySelectorAll('.composer-submit').forEach((button) => {
      const label = button.querySelector('span');
      if (!button.dataset.sgtalkSubmitLabel && label) {
        button.dataset.sgtalkSubmitLabel = label.textContent.trim();
      }

      if (state === 'busy') {
        composer.dataset.sgtalkSubmitInFlight = '0';
        button.disabled = true;
        button.setAttribute('disabled', 'disabled');
        button.dataset.sgtalkSubmitting = '1';
        button.classList.add('sg-is-submitting');
        if (label) {
          label.textContent = t('composer.publishing');
        }
      } else {
        composer.dataset.sgtalkSubmitInFlight = '0';
        button.disabled = false;
        button.removeAttribute('disabled');
        button.dataset.sgtalkSubmitting = '0';
        button.classList.remove('sg-is-submitting');
        if (label && button.dataset.sgtalkSubmitLabel) {
          label.textContent = button.dataset.sgtalkSubmitLabel;
        }
      }
    });

    composer.querySelectorAll('textarea.write').forEach((textarea) => {
      textarea.readOnly = state === 'busy';
      if (state !== 'busy') {
        textarea.removeAttribute('readonly');
      }
    });
  }

  function readableMessage(message) {
    if (!message) {
      return t('composer.publishFailed');
    }

    return String(message)
      .replace(/\[\[error:/g, '')
      .replace(/\]\]/g, '')
      .replace(/_/g, ' ')
      .trim();
  }

  function showSubmitNotice(message) {
    const composer = composerScope();
    if (!composer) {
      return;
    }

    let notice = composer.querySelector('.sg-composer-submit-notice');
    if (!notice) {
      notice = document.createElement('div');
      notice.className = 'sg-composer-submit-notice';
      notice.setAttribute('role', 'alert');
      const titleContainer = composer.querySelector('.sg-composer-title-container, .title-container');
      if (titleContainer && titleContainer.parentNode) {
        titleContainer.parentNode.insertBefore(notice, titleContainer.nextSibling);
      } else {
        composer.insertBefore(notice, composer.firstChild);
      }
    }

    notice.textContent = readableMessage(message);
    notice.hidden = false;
    setSubmitState(composer, 'idle');
  }

  function hideSubmitNotice(composer) {
    if (!composer) {
      return;
    }

    const notice = composer.querySelector('.sg-composer-submit-notice');
    if (notice) {
      notice.hidden = true;
    }
  }

  function validateBeforeSubmit(composer) {
    if (!composer) {
      return true;
    }

    const title = composer.querySelector('input.title');
    if (title && !title.value.trim()) {
      showSubmitNotice(t('composer.needTitle'));
      title.focus();
      return false;
    }

    const body = composer.querySelector('textarea.write');
    if (body && !body.value.trim()) {
      showSubmitNotice(t('composer.needBody'));
      body.focus();
      return false;
    }

    return true;
  }

  function initV2exEditorTabs(root) {
    const scope = root && root.querySelectorAll ? root : document;

    // 1. Compose Page Tabs
    scope.querySelectorAll('.sg-composer-tab-btn').forEach((btn) => {
      if (btn.dataset.sgtabBound === '1') return;
      btn.dataset.sgtabBound = '1';

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const composer = btn.closest('[component="composer"], .composer');
        if (!composer) return;

        // Toggle active class on tab buttons
        composer.querySelectorAll('.sg-composer-tab-btn').forEach((t) => t.classList.remove('active'));
        btn.classList.add('active');

        const writeCont = composer.querySelector('.write-container');
        const previewCont = composer.querySelector('.preview-container');

        if (btn.getAttribute('data-tab') === 'write') {
          if (writeCont) writeCont.classList.remove('d-none');
          if (previewCont) previewCont.classList.add('d-none');
        } else {
          if (writeCont) writeCont.classList.add('d-none');
          if (previewCont) {
            previewCont.classList.remove('d-none');
            const previewEl = previewCont.querySelector('.preview');
            if (previewEl) {
              previewEl.innerHTML = `<div class="text-center p-4"><i class="fa fa-spinner fa-spin"></i> ${t('composer.previewLoading')}</div>`;
              const textarea = composer.querySelector('textarea.write');
              const rawText = textarea ? textarea.value : '';
              if (window.socket) {
                window.socket.emit('posts.helper.preview', { raw: rawText }, (err, html) => {
                  if (!err && html) {
                    previewEl.innerHTML = html;
                    $(document).trigger('markup.filter');
                  } else {
                    previewEl.innerHTML = `<div class="text-danger p-3">${t('composer.previewFailed')}</div>`;
                  }
                });
              } else {
                previewEl.innerHTML = `<div class="text-muted p-3">${t('composer.previewOffline')}</div>`;
              }
            }
          }
        }
      });
    });

    // 2. Quick Reply Tabs
    scope.querySelectorAll('.sg-quickreply-tab').forEach((btn) => {
      if (btn.dataset.sgtabBound === '1') return;
      btn.dataset.sgtabBound = '1';

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const container = btn.closest('.sg-quickreply-card');
        if (!container) return;

        container.querySelectorAll('.sg-quickreply-tab').forEach((t) => t.classList.remove('active'));
        btn.classList.add('active');

        const writeArea = container.querySelector('.sg-quickreply-write-area');
        const previewArea = container.querySelector('.sg-quickreply-preview-area');

        if (btn.getAttribute('data-tab') === 'edit') {
          if (writeArea) writeArea.classList.remove('d-none');
          if (previewArea) previewArea.classList.add('d-none');
        } else {
          if (writeArea) writeArea.classList.add('d-none');
          if (previewArea) {
            previewArea.classList.remove('d-none');
            const previewContent = previewArea.querySelector('.sg-quickreply-preview-content');
            if (previewContent) {
              previewContent.innerHTML = `<div class="text-center p-3"><i class="fa fa-spinner fa-spin"></i> ${t('composer.previewLoading')}</div>`;
              const textarea = container.querySelector('[component="topic/quickreply/text"]');
              const rawText = textarea ? textarea.value : '';
              if (window.socket) {
                window.socket.emit('posts.helper.preview', { raw: rawText }, (err, html) => {
                  if (!err && html) {
                    previewContent.innerHTML = html;
                    $(document).trigger('markup.filter');
                  } else {
                    previewContent.innerHTML = `<div class="text-danger p-2">${t('composer.previewFailed')}</div>`;
                  }
                });
              } else {
                previewContent.innerHTML = `<div class="text-muted p-2">${t('composer.previewOffline')}</div>`;
              }
            }
          }
        }
      });
    });

    // 3. Scroll to Top link
    scope.querySelectorAll('.sg-quickreply-back-to-top').forEach((link) => {
      if (link.dataset.sgBound === '1') return;
      link.dataset.sgBound = '1';
      link.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // 4. Main compose page upload gutter click trigger
    scope.querySelectorAll('.sg-composer-gutter-upload').forEach((gutter) => {
      if (gutter.dataset.sgBound === '1') return;
      gutter.dataset.sgBound = '1';
      gutter.addEventListener('click', (e) => {
        e.preventDefault();
        const composer = gutter.closest('[component="composer"], .composer');
        if (composer) {
          const uploadBtn = composer.querySelector('.img-upload-btn, [data-format="picture"]');
          if (uploadBtn) {
            uploadBtn.click();
          }
        }
      });
      gutter.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          gutter.click();
        }
      });
    });

    // 5. Quick reply emoji picker trigger
    scope.querySelectorAll('.sg-quickreply-emoji-btn').forEach((btn) => {
      if (btn.dataset.sgBound === '1') return;
      btn.dataset.sgBound = '1';

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const container = btn.closest('.sg-quickreply-actions');
        if (!container) return;

        let picker = container.querySelector('.sg-emoji-picker');
        if (picker) {
          picker.classList.toggle('d-none');
          return;
        }

        picker = document.createElement('div');
        picker.className = 'sg-emoji-picker position-absolute p-2 d-flex flex-wrap gap-1';
        picker.style.width = '180px';
        picker.style.bottom = '35px';
        picker.style.left = '5px';
        picker.style.zIndex = '1000';
        picker.style.backgroundColor = 'var(--card-bg)';
        picker.style.borderColor = 'var(--border-color)';

        const emojis = ['😀', '😂', '😍', '🤔', '👍', '🙏', '🎉', '🔥', '👀', '💡', '💯', '👏'];
        emojis.forEach(emoji => {
          const item = document.createElement('button');
          item.type = 'button';
          item.className = 'btn p-1 border-0 bg-transparent';
          item.style.fontSize = '18px';
          item.style.lineHeight = '1';
          item.textContent = emoji;
          item.addEventListener('click', (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            const textarea = container.closest('form').querySelector('textarea');
            if (textarea) {
              const start = textarea.selectionStart;
              const end = textarea.selectionEnd;
              const text = textarea.value;
              textarea.value = text.substring(0, start) + emoji + text.substring(end);
              textarea.focus();
              textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
            }
            picker.classList.add('d-none');
          });
          picker.appendChild(item);
        });

        container.style.position = 'relative';
        container.appendChild(picker);
      });
    });
  }

  // Close emoji picker on outside clicks
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.sg-emoji-picker') && !e.target.closest('.sg-quickreply-emoji-btn')) {
      document.querySelectorAll('.sg-emoji-picker').forEach(p => p.classList.add('d-none'));
    }
  });

  function bindSubmitFeedback(root) {
    const scope = root && root.querySelectorAll ? root : document;
    scope.querySelectorAll('.composer-submit').forEach((button) => {
      if (button.dataset.sgtalkSubmitFeedback === '1') {
        return;
      }

      button.dataset.sgtalkSubmitFeedback = '1';
      button.addEventListener('click', (event) => {
        const composer = closestComposer(button);
        if (!composer) {
          return;
        }

        hideSubmitNotice(composer);

        if (!validateBeforeSubmit(composer)) {
          event.preventDefault();
          event.stopImmediatePropagation();
          return;
        }

        window.setTimeout(() => setSubmitState(composer, 'busy'), 0);
        window.setTimeout(() => {
          if (
            button.dataset.sgtalkSubmitting === '1' &&
            composer.dataset.sgtalkSubmitInFlight !== '1' &&
            document.contains(button)
          ) {
            setSubmitState(composer, 'idle');
          }
        }, 1400);
        window.setTimeout(() => {
          if (button.dataset.sgtalkSubmitting === '1' && document.contains(button)) {
            setSubmitState(composer, 'idle');
          }
        }, 20000);
      }, true);
    });
  }

  function patchFetchForComposerErrors() {
    if (!window.fetch || window.fetch.sgtalkComposerPatched) {
      return;
    }

    const originalFetch = window.fetch.bind(window);
    const patchedFetch = function patchedFetch(input, init) {
      const url = typeof input === 'string' ? input : input && input.url;
      const method = (init && init.method) || (input && input.method) || 'GET';
      const isTopicPost = url && topicApiPattern.test(url) && method.toUpperCase() === 'POST';

      if (isTopicPost) {
        const composer = composerScope();
        if (composer) {
          composer.dataset.sgtalkSubmitInFlight = '1';
        }
      }

      return originalFetch(input, init).then((response) => {
        if (isTopicPost) {
          if (!response.ok) {
            response.clone().json()
              .then((payload) => {
                showSubmitNotice(payload && payload.status && payload.status.message);
              })
              .catch(() => showSubmitNotice());
          }
        }
        return response;
      }).catch((error) => {
        showSubmitNotice(error && error.message);
        throw error;
      });
    };

    patchedFetch.sgtalkComposerPatched = true;
    window.fetch = patchedFetch;
  }

  document.addEventListener('DOMContentLoaded', () => {
    installFavicon();
    applyDocumentLocale();
    applyInlineI18n(document);
    scan(document);
    bindSubmitFeedback(document);
    bindHardNavigation();
    updateAuthState();
    patchFetchForComposerErrors();
    initV2exEditorTabs(document);
    normalizeDefaultAvatars(document);
    installAvatarStudioDelegates();
    installAvatarStudio(document);
    applyPendingAvatarIfNeeded();
    installLanguageSwitcher(document);
    applyInlineI18nSoon(document);
  });
  document.addEventListener('input', (event) => {
    if (event.target && event.target.matches && event.target.matches(selector)) {
      resizeTextarea(event.target);
    }

    if (event.target && event.target.closest) {
      hideSubmitNotice(closestComposer(event.target));
    }
  }, true);

  window.addEventListener('resize', () => scanLater(document));

  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener('change', () => scanLater(document));
  } else if (mobileQuery.addListener) {
    mobileQuery.addListener(() => scanLater(document));
  }

  new MutationObserver((mutations) => {
    if (inlineI18nApplying) {
      return;
    }
    mutations.forEach((mutation) => {
      if (mutation.type === 'characterData') {
        queueInlineI18n(mutation.target);
      }
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          scanLater(node);
          queueInlineI18n(node);
          bindSubmitFeedback(node);
          initV2exEditorTabs(node);
          normalizeDefaultAvatars(node);
          installAvatarStudio(node);
          installLanguageSwitcher(node);
        }
      });
    });
  }).observe(document.documentElement, {
    childList: true,
    characterData: true,
    subtree: true,
  });

  if (window.jQuery) {
    window.jQuery(window).on('action:composer.loaded action:composer.resize', (event, data) => {
      scanLater(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
      applyInlineI18n(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
      bindSubmitFeedback(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
      initV2exEditorTabs(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
      updateAuthState();
      normalizeDefaultAvatars(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
      installAvatarStudio(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
      installLanguageSwitcher(document);
    });
  }

  if (typeof window.require === 'function') {
    try {
      window.require(['hooks'], (hooks) => {
        hooks.on('action:composer.enhanced', (data) => {
          scanLater(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
          applyInlineI18n(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
          bindSubmitFeedback(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
          initV2exEditorTabs(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
          updateAuthState();
          normalizeDefaultAvatars(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
          installAvatarStudio(data && data.postContainer && data.postContainer[0] ? data.postContainer[0] : document);
          installLanguageSwitcher(document);
        });
        hooks.on('action:ajaxify.end', () => {
          installFavicon();
          applyDocumentLocale();
          applyInlineI18n(document);
          applyInlineI18nSoon(document);
          updateAuthState();
          initV2exEditorTabs(document);
          normalizeDefaultAvatars(document);
          installAvatarStudioDelegates();
          installAvatarStudio(document);
          installLanguageSwitcher(document);
        });
      });
    } catch (error) {
      scanLater(document);
    }
  }

  installFavicon();
}());
