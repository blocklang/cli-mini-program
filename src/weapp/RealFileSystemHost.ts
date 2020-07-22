import { FileSystemHost } from './FileSystemHost';

export class RealFileSystemHost implements FileSystemHost {
	private rootPath: string;

	constructor(rootPath: string) {
		this.rootPath = rootPath;
	}

	readFile(filePath: string): string {
		throw new Error('Method not implemented.');
	}

	writeFile(filePath: string, content: string): void {
		throw new Error('Method not implemented.');
	}
}
