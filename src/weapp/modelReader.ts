import * as glob from 'glob';
import * as path from 'path';
import * as fs from 'fs';
import { PageModel } from '../interfaces';
import * as logger from '../logger';
import { ENCODING_UTF8 } from '../util';

export function readAppModel(modelDir: string): PageModel | undefined {
	const appPath = path.resolve(modelDir, 'app.miniprogram.json');
	if (!fs.existsSync(appPath)) {
		logger.error(`${appPath} 不存在！`);
		return;
	}

	try {
		return JSON.parse(fs.readFileSync(appPath, ENCODING_UTF8)) as PageModel;
	} catch (error) {
		logger.error(error);
	}
}

export function readAllPageModels(modelDir: string): PageModel[] {
	return glob.sync(path.resolve(modelDir, 'pages/**/*.json')).map((pagePath) => {
		const model: PageModel = JSON.parse(fs.readFileSync(pagePath, ENCODING_UTF8));
		return model;
	});
}
