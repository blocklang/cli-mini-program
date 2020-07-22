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

	it('create page', () => {});
});
