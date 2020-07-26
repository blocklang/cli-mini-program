import { PageModel, AppConfig, PageConfig } from '../interfaces';
import { FileSystemHost } from './FileSystemHost';
import { InMemoryFileSystemHost } from './InMemoryFileSystemHost';
import { RealFileSystemHost } from './RealFileSystemHost';
import { treeToJson, treeToXml, treeToPageData } from '../util';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import generator from '@babel/generator';
import * as t from '@babel/types';
import * as prettier from 'prettier';

export interface ProjectOptions {
	rootPath: string;
	useInMemoryFileSystem?: boolean;
}

export default class MiniProgramProject {
	private fileSystem: FileSystemHost;

	constructor(options: ProjectOptions) {
		const { rootPath, useInMemoryFileSystem = false } = options;
		if (useInMemoryFileSystem) {
			this.fileSystem = new InMemoryFileSystemHost(rootPath);
		} else {
			this.fileSystem = new RealFileSystemHost(rootPath);
		}
	}

	/**
	 * 创建小程序的 App 资源
	 *
	 * @param appModel
	 * @returns 如果创建成功则返回 `true`，否则返回 `false`
	 */
	createApp(appModel: PageModel): boolean {
		try {
			this.createAppJs(appModel);
			this.createAppJson(appModel);
			this.createCssFile(appModel);
			return true;
		} catch {
			return false;
		}
	}

	private createAppJs(appModel: PageModel) {
		const filePath = appModel.pageInfo.groupPath + appModel.pageInfo.key + '.js';

		const appWidget = appModel.widgets[0];
		const events = appWidget.properties.filter((prop) => prop.valueType === 'function');

		const source = `App({})`;
		const ast = parser.parse(source);
		traverse(ast, {
			ObjectExpression(path) {
				events.forEach((event) => {
					const body = t.blockStatement([]);
					const prop = t.objectProperty(t.identifier(event.name), t.functionExpression(null, [], body));
					path.pushContainer('properties', prop);
				});
			},
		});

		const { code } = generator(ast);

		this.fileSystem.writeFile(filePath, code);
	}

	private createAppJson(appModel: PageModel) {
		const filePath = appModel.pageInfo.groupPath + appModel.pageInfo.key + '.json';
		const appWidget = appModel.widgets[0];
		// 过滤掉事件
		const properties = appWidget.properties.filter((prop) => prop.valueType !== 'function');

		const appConfig: AppConfig = { pages: [], ...treeToJson(properties) };
		const content = JSON.stringify(appConfig, null, 2);
		this.fileSystem.writeFile(filePath, content);
	}

	/**
	 * 创建 css 文件
	 *
	 * @param filePath 相对路径，从小程序的根目录开始算起
	 * @param content css 文件的内容
	 */
	private createCssFile(pageModel: PageModel) {
		const filePath = pageModel.pageInfo.groupPath + pageModel.pageInfo.key + '.wxss';
		const content = '';
		this.fileSystem.writeFile(filePath, content);
	}

	/**
	 * 创建小程序页面
	 *
	 * @param pageModel
	 * @returns 如果创建成功则返回 `true`，否则返回 `false`
	 */
	createPage(pageModel: PageModel): boolean {
		try {
			this.createPageJs(pageModel);
			this.createPageJson(pageModel);
			this.createPageUI(pageModel);
			this.createPageCss(pageModel);
			return true;
		} catch {
			return false;
		}
	}

	private createPageJs(pageModel: PageModel) {
		const filePath = pageModel.pageInfo.groupPath + pageModel.pageInfo.key + '.js';

		const pageWidget = pageModel.widgets[0];
		const events = pageWidget.properties.filter((prop) => prop.valueType === 'function');
		const pageData = treeToPageData(pageModel.data);

		const source = `Page({})`;
		const ast = parser.parse(source);
		traverse(ast, {
			ObjectExpression(path) {
				if (t.isCallExpression(path.parent)) {
					const dataProp = t.objectProperty(t.identifier('data'), t.valueToNode(pageData));
					path.pushContainer('properties', dataProp);

					events.forEach((event) => {
						const body = t.blockStatement([]);
						const prop = t.objectProperty(t.identifier(event.name), t.functionExpression(null, [], body));
						path.pushContainer('properties', prop);
					});
				}
			},
		});

		const { code } = generator(ast);
		this.fileSystem.writeFile(filePath, code);
	}

	private createPageJson(pageModel: PageModel) {
		const filePath = pageModel.pageInfo.groupPath + pageModel.pageInfo.key + '.json';
		const pageWidget = pageModel.widgets[0];
		// 过滤掉事件
		const properties = pageWidget.properties.filter((prop) => prop.valueType !== 'function');

		const pageConfig: PageConfig = treeToJson(properties);
		const content = JSON.stringify(pageConfig, null, 2);
		this.fileSystem.writeFile(filePath, content);
	}

	private createPageUI(pageModel: PageModel) {
		// 在 wxml 中不包含 page 部件
		const filePath = pageModel.pageInfo.groupPath + pageModel.pageInfo.key + '.wxml';
		const widgets = pageModel.widgets;
		this.fileSystem.writeFile(filePath, prettier.format(treeToXml(widgets), { parser: 'html' }));
	}

	private createPageCss(pageModel: PageModel) {}

	getSource(filePath: string): string {
		return this.fileSystem.readFile(filePath);
	}
}
