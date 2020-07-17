import { AttachedWidgetProperty } from './interfaces';

export const ENCODING_UTF8 = 'utf8';

const TREE_ROOT_ID = '-1';

export function treeToJson(treeItems: AttachedWidgetProperty[]): any {
	return convert(TREE_ROOT_ID);

	function convert(parentId: string) {
		const result: any = {};
		treeItems
			.filter((item) => item.parentId === parentId)
			.forEach((item) => {
				const valueType = item.valueType;
				let convertedValue;
				if (valueType === 'object') {
					convertedValue = convert(item.id);
				} else {
					const value = item.value ?? item.defaultValue;
					if (value) {
						if (valueType === 'string') {
							convertedValue = value;
						} else if (valueType === 'int') {
							convertedValue = Number(value);
						} else if (valueType === 'float') {
							convertedValue = Number(value);
						} else if (valueType === 'boolean') {
							convertedValue = Boolean(value);
						}
					}
				}
				if (convertedValue) {
					result[item.name] = convertedValue;
				}
			});
		return result;
	}
}
