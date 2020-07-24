import { AttachedWidgetProperty, AttachedWidget, PageDataItem } from './interfaces';

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
					convertedValue = getValue(item);
				}
				if (convertedValue) {
					result[item.name] = convertedValue;
				}
			});
		return result;
	}
}

function getValue(item: AttachedWidgetProperty): string | number | boolean | undefined {
	const valueType = item.valueType;
	const value = item.value ?? item.defaultValue;
	let result: any;
	if (value) {
		if (valueType === 'string') {
			result = value;
		} else if (valueType === 'int') {
			result = Number(value);
		} else if (valueType === 'float') {
			result = Number(value);
		} else if (valueType === 'boolean') {
			result = Boolean(value);
		}
	}
	return result;
}

// 参考 https://github.com/andrejewski/himalaya/blob/master/src/stringify.js
export function treeToXml(treeItems: AttachedWidget[]): string {
	const pageWidget = treeItems.find((item) => item.parentId === TREE_ROOT_ID);
	if (!pageWidget) {
		return '';
	}
	return convert(pageWidget.id).join('');

	function convert(parentId: string): string[] {
		return treeItems
			.filter((item) => item.parentId === parentId)
			.map(
				(item) =>
					`<${item.widgetName}${formatProperties(item.properties)}>${convert(item.id)}</${item.widgetName}>`
			);
	}
}

function formatProperties(properties: AttachedWidgetProperty[] = []): string {
	if (properties.length === 0) {
		return '';
	}

	return properties.reduce((props, property) => {
		const key = property.name;
		const value = getValue(property);
		if (value == null) {
			return `${props}`;
		}
		return `${props} ${key}="${value}"`;
	}, '');
}

export function treeToPageData(pageDataItems: PageDataItem[] = []): any {
	const rootDataItem = pageDataItems.find((item) => item.parentId === TREE_ROOT_ID);
	if (!rootDataItem) {
		return {};
	}

	function _getObjectValue(dataItem: PageDataItem) {
		const result: any = {};
		pageDataItems
			.filter((item) => item.parentId === dataItem.id)
			.forEach((item) => {
				result[item.name] = _getValue(item);
			});
		return result;
	}

	function _getArrayValue(dataItem: PageDataItem) {
		const result: any[] = [];
		pageDataItems
			.filter((item) => item.parentId === dataItem.id)
			.forEach((item) => {
				result.push(_getValue(item));
			});
		return result;
	}

	function _getValue(dataItem: PageDataItem) {
		if (dataItem.type === 'Number') {
			return Number(dataItem.defaultValue);
		} else if (dataItem.type === 'Boolean') {
			return Boolean(dataItem.defaultValue);
		} else if (dataItem.type === 'Object') {
			return _getObjectValue(dataItem);
		} else if (dataItem.type === 'Array') {
			return _getArrayValue(dataItem);
		}
		return dataItem.defaultValue;
	}

	return _getValue(rootDataItem);
}
