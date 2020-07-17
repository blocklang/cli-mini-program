import * as modelReader from './modelReader';

export function generate(modelDir: string): void {
	const project = modelReader.readProjectMetaData(modelDir);
}
