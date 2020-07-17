import { PageModel, AppConfig } from '../interfaces';
import { FileSystemHost } from './FileSystemHost';
import { InMemoryFileSystemHost } from './InMemoryFileSystemHost';
import { RealFileSystemHost } from './RealFileSystemHost';
import { treeToJson } from '../util';

export interface ProjectOptions {
	rootPath: string;
	useInMemoryFileSystem?: boolean;
}

export default class MiniProgramProject {
	private fileSystem: FileSystemHost;

	constructor(options: ProjectOptions) {
		const { rootPath, useInMemoryFileSystem = false } = options;

		console.log(rootPath);
		console.log(useInMemoryFileSystem);

		if (useInMemoryFileSystem) {
			this.fileSystem = new InMemoryFileSystemHost(rootPath);
		} else {
			this.fileSystem = new RealFileSystemHost(rootPath);
		}
	}

	/**
	 *
	 * @param appModel
	 * @returns 如果创建成功则返回 `true`，否则返回 `false`
	 */
	createApp(appModel: PageModel): boolean {
		this.createAppJs(appModel);
		this.createAppJson(appModel);
		this.createCssFile(appModel);
		return false;
	}

	private createAppJs(appModel: PageModel) {
		const filePath = appModel.pageInfo.groupPath + appModel.pageInfo.key + '.js';
		const content = `App({
  onLaunch: function () {

  }
})`;
		this.fileSystem.writeFile(filePath, content);
	}

	private createAppJson(appModel: PageModel) {
		const filePath = appModel.pageInfo.groupPath + appModel.pageInfo.key + '.json';
		const appWidget = appModel.widgets[0];
		const properties = appWidget.properties;

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
	 *
	 * @param pageModel
	 * @returns 如果创建成功则返回 `true`，否则返回 `false`
	 */
	createPage(pageModel: PageModel): boolean {
		return false;
	}

	// private createPageJs() {

	// }

	// private createPageJson() {

	// }

	// private createPageUI() {

	// }

	// private createPageCss() {

	// }

	getSource(filePath: string): string {
		return this.fileSystem.readFile(filePath);
	}
}
