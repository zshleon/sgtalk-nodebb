const nconf = require('/usr/src/app/node_modules/nconf');

require('/usr/src/app/require-main');
nconf.argv().env({ separator: '__' });
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
global.env = process.env.NODE_ENV;
process.env.CONFIG = '/opt/config/config.json';

const prestart = require('/usr/src/app/src/prestart');
prestart.loadConfig('/opt/config/config.json');
prestart.setupWinston();

const db = require('/usr/src/app/src/database');
const meta = require('/usr/src/app/src/meta');

const preferredNodes = [
  '问与答',
  '新移民',
  '安家租房',
  '职业与薪资',
  '金融税务',
  '育儿与学校',
  '医疗与家政',
  '本地生活',
  '交通出行',
  '数码与网络',
  '同城活动',
  '交易',
];

function htmlWidget(html) {
  return JSON.stringify([
    {
      widget: 'html',
      data: {
        html,
        title: '',
        container: '',
      },
    },
  ]);
}

function categoryUrl(category) {
  return `/category/${category.cid}/${encodeURIComponent(category.name)}`;
}

function nodeLink(category) {
  return `<a href="${categoryUrl(category)}">${category.name}</a>`;
}

function nodeLinkWithLabel(category, label) {
  return `<a href="${categoryUrl(category)}">${label}</a>`;
}

async function getNodes() {
  const cids = await db.getSortedSetRange('categories:cid', 0, -1);
  const categories = (await Promise.all(cids.map(async (cid) => {
    const category = await db.getObject(`category:${cid}`);
    if (!category || category.disabled) {
      return null;
    }
    return {
      cid,
      name: category.name,
      description: category.description || '',
      topic_count: category.topic_count || 0,
      post_count: category.post_count || 0,
    };
  }))).filter(Boolean);

  const byName = new Map(categories.map(category => [category.name, category]));
  const ordered = preferredNodes.map(name => byName.get(name)).filter(Boolean);
  const rest = categories.filter(category => !preferredNodes.includes(category.name));
  return ordered.concat(rest);
}

function buildBrandHeader() {
  return `
<div class="sg-v2-brandline">
  <form action="/search" method="get" class="sg-v2-search">
    <span class="sg-v2-search-icon">⌕</span>
    <input name="term" type="search" autocomplete="off" placeholder="搜索主题 / 节点 / 用户">
  </form>
  <nav class="sg-v2-toplinks" aria-label="SGTALK navigation">
    <a href="/">首页</a>
    <a href="/categories">节点</a>
    <span class="sg-auth-state sg-guest-only">未登录</span>
    <a class="sg-auth-state sg-user-only" href="/me" data-sgtalk-auth-state>
      <span class="sg-auth-avatar" data-sgtalk-auth-avatar aria-hidden="true">我</span>
      <span class="sg-auth-name" data-sgtalk-auth-name>已登录</span>
    </a>
    <a class="sg-guest-only" href="/login">登录</a>
    <a class="sg-guest-only" href="/register">注册</a>
    <a class="sg-user-only" href="/me">我的</a>
    <a class="sg-user-only" href="/logout">退出</a>
  </nav>
</div>`;
}

function buildNodeHeader(nodes) {
  const byName = new Map(nodes.map(category => [category.name, category]));
  const primaryItems = [
    [null, '全部', '/recent'],
    [null, '最热', '/popular'],
    ['新移民', '新移民'],
    ['安家租房', '安家'],
    ['职业与薪资', '职场'],
    ['育儿与学校', '家庭'],
    ['金融税务', '金融'],
    ['本地生活', '生活'],
    ['交通出行', '出行'],
    ['问与答', '问与答'],
    ['交易', '交易'],
  ];
  const topNodes = primaryItems
    .map(([name, label, href]) => {
      if (href) {
        return `<a href="${href}">${label}</a>`;
      }
      return byName.get(name) ? nodeLinkWithLabel(byName.get(name), label) : '';
    })
    .join('');
  return `
<section class="sg-v2-nodebar" aria-label="SGTALK nodes">
  <div class="sg-v2-node-row sg-v2-primary-row sg-v2-single-row">
    ${topNodes}
  </div>
</section>`;
}

function buildSidebar(nodes, defaultComposeCid) {
  const hotNodes = nodes.slice(0, 12).map(nodeLink).join('');
  return `
<aside class="sg-v2-side">
  <section class="sg-v2-box sg-v2-member-box">
    <div class="sg-v2-cell sg-v2-auth-title">加入 SGTALK</div>
    <div class="sg-v2-cell sg-v2-auth-actions">
      <a class="sg-v2-button primary" href="/register">注册账号</a>
      <a class="sg-v2-button" href="/login">登录</a>
    </div>
  </section>
  <section class="sg-v2-box sg-v2-user-box sg-user-only">
    <div class="sg-v2-cell sg-v2-user-card">
      <a class="sg-v2-user-avatar" href="/me" data-sgtalk-sidebar-avatar aria-label="我的资料">我</a>
      <div class="sg-v2-user-meta">
        <a class="sg-v2-user-name" href="/me" data-sgtalk-sidebar-name>已登录</a>
        <span>欢迎回来</span>
      </div>
    </div>
    <div class="sg-v2-cell sg-v2-user-actions">
      <a class="sg-v2-button primary" href="/compose?cid=${defaultComposeCid}" data-sgtalk-hard-link="compose">发布主题</a>
      <a class="sg-v2-button" href="/me">我的主页</a>
    </div>
  </section>
  <section class="sg-v2-box">
    <div class="sg-v2-cell sg-v2-box-title">热门节点</div>
    <div class="sg-v2-cell sg-v2-node-cloud">${hotNodes}</div>
  </section>
  <section class="sg-v2-box">
    <div class="sg-v2-cell sg-v2-box-title">今日热议</div>
    <div class="sg-v2-cell sg-v2-muted">暂无热议</div>
  </section>
  <section class="sg-v2-box">
    <div class="sg-v2-cell sg-v2-box-title">社区状态</div>
    <div class="sg-v2-cell sg-v2-stats">
      <span>节点 <strong>${nodes.length}</strong></span>
      <span>开放注册</span>
    </div>
  </section>
</aside>`;
}

async function main() {
  await db.init();
  const nodes = await getNodes();
  const defaultComposeNode = nodes.find(category => category.name === '问与答') || nodes[0];
  const defaultComposeCid = defaultComposeNode ? defaultComposeNode.cid : 5;

  await meta.configs.setMultiple({
    homePageRoute: 'recent',
    homePageTitle: '首页',
    allowTopicsThumbnail: 0,
    usePagination: 1,
    topicsPerPage: 20,
    postsPerPage: 20,
    postQueue: 0,
    postQueueReputationThreshold: 0,
    postQueuePostCountThreshold: 0,
    newbiePostDelay: 0,
    newbieReputationThreshold: 0,
    sgtalkDefaultComposeCid: defaultComposeCid,
    emailPrompt: 0,
    gdpr_enabled: 0,
    requireEmailAddress: 0,
    'brand:logo': '',
    'theme:mobileTopicTeasers': 0,
    'theme:openSidebars': 0,
    'theme:topMobilebar': 0,
  });

  await meta.settings.set('composer-default', {
    composeRouteEnabled: 'on',
    hidePreviewOnOpen: 'on',
  });

  await db.setObjectField('widgets:global', 'brand-header', htmlWidget(buildBrandHeader()));
  await db.setObjectField('widgets:global', 'header', htmlWidget(buildNodeHeader(nodes)));
  await db.setObjectField('widgets:global', 'sidebar', htmlWidget(buildSidebar(nodes, defaultComposeCid)));
  await db.deleteObjectField('widgets:global', 'sidebar-footer');

  await Promise.all(nodes.map(category => db.setObjectField(`category:${category.cid}`, 'postQueue', 0)));

  await meta.settings.set('sso-google', {
    autoconfirm: 'on',
    style: 'light',
    disableRegistration: '',
  });

  const config = await db.getObjectFields('config', ['homePageRoute', 'homePageTitle', 'topicsPerPage', 'theme:id']);
  console.log(JSON.stringify({ config, nodeCount: nodes.length }, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err && err.stack ? err.stack : err);
    process.exit(1);
  });
