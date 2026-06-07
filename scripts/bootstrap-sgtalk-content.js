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
const categories = require('/usr/src/app/src/categories');

const nodes = [
  ['问与答', '生活、手续、选择题都可以在这里认真提问。', 'fa-question', '#4f6b91'],
  ['新移民', 'PR、EP、家属准证、初到新加坡的实际经验。', 'fa-id-card', '#e6322b'],
  ['安家租房', '看房、租约、邻里、维修、搬家和居住体验。', 'fa-home', '#607d8b'],
  ['职业与薪资', '求职、面试、薪资、职场文化和行业信息。', 'fa-briefcase', '#26364f'],
  ['金融税务', '银行、信用卡、CPF、保险、报税和投资基础。', 'fa-line-chart', '#7d5a2f'],
  ['育儿与学校', '幼儿园、中小学、补习、升学和家庭教育。', 'fa-graduation-cap', '#8a5fbf'],
  ['医疗与家政', '诊所、保险、看护、家政、宠物和日常照护。', 'fa-heartbeat', '#c6465a'],
  ['本地生活', '吃喝、购物、办事、邻里和日常服务。', 'fa-coffee', '#2f7d68'],
  ['交通出行', '公交、地铁、驾照、买车、停车和周边旅行。', 'fa-car', '#2d7fa3'],
  ['数码与网络', '宽带、手机、智能家居、软件和电子产品。', 'fa-laptop', '#385baf'],
  ['同城活动', '聚会、运动、亲子、线下活动和社群组织。', 'fa-calendar', '#b45f2a'],
  ['交易', '二手、转让、拼单和本地交易信息。', 'fa-exchange', '#5d6b7a'],
];

async function main() {
  await db.init();

  await meta.configs.setMultiple({
    siteTitle: 'SGTALK',
    browserTitle: 'SGTALK',
    title: 'SGTALK',
    description: '面向新加坡华人新移民的中文交流社区。',
    keywords: '新加坡,华人,新移民,论坛,SGTALK',
    defaultLang: 'zh-CN',
    homePageRoute: 'recent',
    homePageTitle: '首页',
    allowRegistration: 1,
    allowTopicsThumbnail: 0,
    usePagination: 1,
    showSiteTitle: 1,
    newbiePostDelay: 0,
    newbieReputationThreshold: 0,
  });
  await db.deleteObjectField('widgets:global', 'sidebar-footer');

  const existing = await db.getSortedSetRange('categories:cid', 0, -1);
  for (const cid of existing) {
    await categories.purge(cid, 1);
  }

  let order = 1;
  for (const [name, description, icon, bgColor] of nodes) {
    await categories.create({
      name,
      description,
      icon,
      bgColor,
      color: '#ffffff',
      order: order++,
      uid: 1,
    });
  }

  const created = await db.getSortedSetRange('categories:cid', 0, -1);
  const config = await db.getObjectFields('config', ['siteTitle', 'browserTitle', 'defaultLang', 'theme:id']);
  console.log(JSON.stringify({ config, categoryCount: created.length }, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err && err.stack ? err.stack : err);
    process.exit(1);
  });
