import { FileSystemHost } from './FileSystemHost';

export class InMemoryFileSystemHost implements FileSystemHost {
	private directories = new Map<string, string>();

	private rootPath: string;

	constructor(rootPath: string) {
		this.rootPath = rootPath;
	}

	readFile(filePath: string): string {
		return this.directories.get(this.rootPath + filePath) || '';
	}

	writeFile(filePath: string, content: string): void {
		this.directories.set(this.rootPath + filePath, content);
	}
}
