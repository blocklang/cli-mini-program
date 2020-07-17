export interface FileSystemHost {
	readFile(filePath: string): string;
	writeFile(filePath: string, content: string): void;
}
