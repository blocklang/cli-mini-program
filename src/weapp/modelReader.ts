import * as glob from 'glob';
import * as path from 'path';
import * as fs from 'fs';
import { PageModel } from '../interfaces';
import { ENCODING_UTF8 } from '../util';

export function readAppModel(modelDir: string): PageModel {
	const appPath = path.resolve(modelDir, 'app.miniprogram.json');
	const model: PageModel = JSON.parse(fs.readFileSync(appPath, ENCODING_UTF8));
	return model;
}

export function readAllPageModels(modelDir: string): PageModel[] {
	return glob.sync(path.resolve(modelDir, 'pages/**/*.json')).map((pagePath) => {
		const model: PageModel = JSON.parse(fs.readFileSync(pagePath, ENCODING_UTF8));
		// 根据存储页面模型文件的路径生成 groupPath
		// 如果放在根目录下，则 groupPath 的值不能为 "."，应该是 ""
		const groupPath = path.dirname(path.relative(path.resolve(modelDir, 'pages'), pagePath));
		model.pageInfo.groupPath = groupPath === '.' ? '' : groupPath;
		return model;
	});
}
