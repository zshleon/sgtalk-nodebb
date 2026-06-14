'use strict';

const library = module.exports;

const preferredNodes = [
	['问与答', 'nav.qa'],
	['新移民', 'nav.newcomers'],
	['安家租房', 'rail.housing'],
	['职业与薪资', 'rail.salary'],
	['金融税务', 'rail.tax'],
	['育儿与学校', 'rail.school'],
	['医疗与家政', 'rail.care'],
	['本地生活', 'rail.local'],
	['交通出行', 'rail.transport'],
	['数码与网络', 'rail.digital'],
	['同城活动', 'rail.events'],
	['交易', 'nav.market'],
];

const escapeRoutes = [
	'/register/abort',
	'/login',
	'/logout',
	'/auth/',
	'/confirm/',
	'/reset',
	'/assets/',
	'/plugins/',
];

function buildCategorySlug(category) {
	if (category.slug) {
		return category.slug;
	}
	return `${category.cid}/${encodeURIComponent(category.name || '')}`;
}

async function getSgtalkNavNodes(db) {
	const cids = await db.getSortedSetRange('categories:cid', 0, -1);
	const categories = (await Promise.all(cids.map(async (cid) => {
		const category = await db.getObject(`category:${cid}`);
		return category && !category.disabled && category.name ? {
			cid: String(cid),
			name: category.name,
			slug: buildCategorySlug({ ...category, cid }),
		} : null;
	}))).filter(Boolean);
	const byName = new Map(categories.map(category => [category.name, category]));
	const preferred = preferredNodes
		.map(([name, i18nKey]) => {
			const category = byName.get(name);
			return category ? { ...category, i18nKey } : null;
		})
		.filter(Boolean);
	const used = new Set(preferred.map(category => category.cid));
	const rest = categories
		.filter(category => !used.has(category.cid))
		.map(category => ({ ...category, i18nKey: '' }));
	return preferred.concat(rest);
}

library.allowRegistrationEscapeRoutes = async function (data) {
	data.allowed = Array.from(new Set([...(data.allowed || []), ...escapeRoutes]));
	return data;
};

library.addConfig = async function (config) {
	try {
		const meta = require.main.require('./src/meta');
		const db = require.main.require('./src/database');
		config.defaultComposeCid = await meta.configs.get('theme:defaultComposeCid') || '5';
		const registrationType = await meta.configs.get('registrationType');
		config.sgtalkRegistrationDisabled = registrationType === 'disabled';
		const navNodes = await getSgtalkNavNodes(db);
		config.sgtalkNavNodes = navNodes;
		config.sgtalkStarterNodes = navNodes.slice(0, 4);
	} catch (err) {
		config.defaultComposeCid = '5';
		config.sgtalkRegistrationDisabled = false;
		config.sgtalkNavNodes = [];
		config.sgtalkStarterNodes = [];
	}
	return config;
};

library.addFontLinks = async function (data) {
	data.links = data.links || [];
	data.links.push(
		{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
		{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
		{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Serif+SC:wght@500;600;700&display=swap' }
	);
	return data;
};
