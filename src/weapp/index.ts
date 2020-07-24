import * as modelReader from './modelReader';

const EXIT_CODE_ERROR = 1;

export function generate(modelDir: string): void {
	const appModel = modelReader.readAppModel(modelDir);
	if (!appModel) {
		process.exit(EXIT_CODE_ERROR);
		return;
	}
	const pageModels = modelReader.readAllPageModels(modelDir);
	console.log(pageModels);
}
