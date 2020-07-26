import * as modelReader from './modelReader';
import * as logger from '../logger';
import MiniProgramProject from './MiniProgramProject'; 
import { join } from 'path';

const EXIT_CODE_ERROR = 1;

export function generate(miniProgramType: string, modelDir: string): void {
	const appModel = modelReader.readAppModel(modelDir);
	if (!appModel) {
		process.exit(EXIT_CODE_ERROR);
		return;
	}
	const pageModels = modelReader.readAllPageModels(modelDir);
	logger.info(`共有 ${pageModels.length} 个页面。`);
	
	const project = new MiniProgramProject({rootPath: join(process.cwd(), miniProgramType)});
	if(!project.createApp(appModel)) {
		process.exit(EXIT_CODE_ERROR);
		return;
	}

	pageModels.forEach(pageModel => project.createPage(pageModel));

	logger.info(`成功生成 ${miniProgramType} 代码!`);
}
