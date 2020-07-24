const { describe, it } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');

import MiniProgramProject from '../../../src/weapp/MiniProgramProject';
import { PageModel } from '../../../src/interfaces';

describe('MiniProgramProject', () => {
	it('create app - properties', () => {
		const project = new MiniProgramProject({ rootPath: '', useInMemoryFileSystem: true });

		const appModel: PageModel = {
			pageInfo: { id: 1, key: 'app', groupPath: '' },
			widgets: [
				{
					id: '1',
					parentId: '-1',
					apiRepoId: 1,
					widgetName: 'App',
					properties: [
						{
							id: '1',
							name: 'window',
							valueType: 'object',
							isExpr: false,
							parentId: '-1',
						},
						{
							id: '2',
							name: 'backgroundTextStyle',
							valueType: 'string',
							isExpr: false,
							parentId: '1',
							value: 'light',
						},
						{
							id: '3',
							name: 'navigationBarBackgroundColor',
							valueType: 'string',
							isExpr: false,
							parentId: '1',
							value: '#fff',
						},
						{
							id: '4',
							name: 'navigationBarTitleText',
							valueType: 'string',
							isExpr: false,
							parentId: '1',
							value: 'Mini Program',
						},
						{
							id: '5',
							name: 'navigationBarTextStyle',
							valueType: 'string',
							isExpr: false,
							parentId: '1',
							value: 'black',
						},
					],
				},
			],
			data: [],
		};
		project.createApp(appModel);

		const appJsSource = `App({});`;
		const appJsonSource = `{
  "pages": [],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "Mini Program",
    "navigationBarTextStyle": "black"
  }
}`;
		const appWxssSource = '';
		assert.equal(project.getSource('app.js'), appJsSource);
		assert.equal(project.getSource('app.json'), appJsonSource);
		assert.equal(project.getSource('app.wxss'), appWxssSource);
	});

	it('create app - events', () => {
		const project = new MiniProgramProject({ rootPath: '', useInMemoryFileSystem: true });

		const appModel: PageModel = {
			pageInfo: { id: 1, key: 'app', groupPath: '' },
			widgets: [
				{
					id: '1',
					parentId: '-1',
					apiRepoId: 1,
					widgetName: 'App',
					properties: [
						{
							id: '1',
							name: 'onLaunch',
							valueType: 'function',
							isExpr: false,
							parentId: '-1',
						},
					],
				},
			],
			data: [],
		};
		project.createApp(appModel);

		const appJsSource = `App({
  onLaunch: function () {}
});`;
		const appJsonSource = `{
  "pages": []
}`;
		const appWxssSource = '';
		assert.equal(project.getSource('app.js'), appJsSource);
		assert.equal(project.getSource('app.json'), appJsonSource);
		assert.equal(project.getSource('app.wxss'), appWxssSource);
	});

	it('create page - empty page', () => {
		const project = new MiniProgramProject({ rootPath: '', useInMemoryFileSystem: true });

		const pageModel: PageModel = {
			pageInfo: { id: 1, key: 'index', groupPath: 'pages/' },
			widgets: [
				{
					id: '1',
					parentId: '-1',
					apiRepoId: 1,
					widgetName: 'Page',
					properties: [],
				},
			],
			data: [],
		};
		project.createPage(pageModel);

		const pageJsSource = `Page({
  data: {}
});`;
		const pageJsonSource = `{}`;
		const pageWxmlSource = '';
		const pageWxssSource = '';
		assert.equal(project.getSource('pages/index.js'), pageJsSource);
		assert.equal(project.getSource('pages/index.json'), pageJsonSource);
		assert.equal(project.getSource('pages/index.wxml'), pageWxmlSource);
		assert.equal(project.getSource('pages/index.wxss'), pageWxssSource);
	});

	// 在页面 page.wxml 中不存放 Page 部件，但是 Page 部件的属性要存在 page.json 中
	it('create page - page json', () => {
		const project = new MiniProgramProject({ rootPath: '', useInMemoryFileSystem: true });

		const pageModel: PageModel = {
			pageInfo: { id: 1, key: 'index', groupPath: 'pages/' },
			widgets: [
				{
					id: '1',
					parentId: '-1',
					apiRepoId: 1,
					widgetName: 'Page',
					properties: [
						{
							id: '1',
							name: 'prop1',
							valueType: 'string',
							isExpr: false,
							value: 'value1',
							parentId: '-1',
						},
					],
				},
			],
			data: [],
		};
		project.createPage(pageModel);

		const pageJsSource = `Page({
  data: {}
});`;
		const pageJsonSource = `{
  "prop1": "value1"
}`;
		const pageWxmlSource = '';
		const pageWxssSource = '';
		assert.equal(project.getSource('pages/index.js'), pageJsSource);
		assert.equal(project.getSource('pages/index.json'), pageJsonSource);
		assert.equal(project.getSource('pages/index.wxml'), pageWxmlSource);
		assert.equal(project.getSource('pages/index.wxss'), pageWxssSource);
	});

	it('create page - page event', () => {
		const project = new MiniProgramProject({ rootPath: '', useInMemoryFileSystem: true });

		const pageModel: PageModel = {
			pageInfo: { id: 1, key: 'index', groupPath: 'pages/' },
			widgets: [
				{
					id: '1',
					parentId: '-1',
					apiRepoId: 1,
					widgetName: 'Page',
					properties: [
						{
							id: '1',
							name: 'onFoo',
							valueType: 'function',
							isExpr: false,
							parentId: '-1',
						},
					],
				},
			],
			data: [],
		};
		project.createPage(pageModel);

		const pageJsSource = `Page({
  data: {},
  onFoo: function () {}
});`;
		const pageJsonSource = `{}`;
		const pageWxmlSource = '';
		const pageWxssSource = '';
		assert.equal(project.getSource('pages/index.js'), pageJsSource);
		assert.equal(project.getSource('pages/index.json'), pageJsonSource);
		assert.equal(project.getSource('pages/index.wxml'), pageWxmlSource);
		assert.equal(project.getSource('pages/index.wxss'), pageWxssSource);
	});

	it('create page - page data', () => {
		const project = new MiniProgramProject({ rootPath: '', useInMemoryFileSystem: true });

		const pageModel: PageModel = {
			pageInfo: { id: 1, key: 'index', groupPath: 'pages/' },
			widgets: [
				{
					id: '1',
					parentId: '-1',
					apiRepoId: 1,
					widgetName: 'Page',
					properties: [],
				},
			],
			data: [
				{
					id: '1',
					parentId: '-1',
					name: '$',
					type: 'Object',
				},
				{
					id: '2',
					parentId: '1',
					name: 'str',
					type: 'String',
					defaultValue: 'hello',
				},
			],
		};
		project.createPage(pageModel);

		const pageJsSource = `Page({
  data: {
    str: "hello"
  }
});`;
		const pageJsonSource = `{}`;
		const pageWxmlSource = '';
		const pageWxssSource = '';
		assert.equal(project.getSource('pages/index.js'), pageJsSource);
		assert.equal(project.getSource('pages/index.json'), pageJsonSource);
		assert.equal(project.getSource('pages/index.wxml'), pageWxmlSource);
		assert.equal(project.getSource('pages/index.wxss'), pageWxssSource);
	});
});
