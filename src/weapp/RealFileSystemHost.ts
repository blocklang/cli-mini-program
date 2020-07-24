import { FileSystemHost } from './FileSystemHost';
import * as fs from 'fs';
import { join } from 'path';
import { ENCODING_UTF8 } from '../util';

export class RealFileSystemHost implements FileSystemHost {
	private rootPath: string;

	constructor(rootPath: string) {
		this.rootPath = rootPath;
	}

	readFile(filePath: string): string {
		const path = join(this.rootPath, filePath);
		return fs.readFileSync(path, ENCODING_UTF8);
	}

	writeFile(filePath: string, content: string): void {
		const path = join(this.rootPath, filePath);
		fs.writeFileSync(path, content);
	}
}
