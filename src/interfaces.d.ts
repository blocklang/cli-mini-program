export interface Repository {}

export interface Project {}

export interface PageInfo {
	id: number;
	key: string;
	groupPath: string;
}

export type PropertyValueType = 'string' | 'int' | 'float' | 'date' | 'boolean' | 'function' | 'object';

export interface AttachedWidgetProperty {
	name: string;
	defaultValue?: string;
	valueType: PropertyValueType;
	id: string;
	value?: string;
	isExpr: boolean;
	parentId: string;
}

export interface AttachedWidget {
	id: string;
	parentId: string;
	apiRepoId: number;
	widgetName: string;
	properties: AttachedWidgetProperty[];
}

export type PageDataItemValueType = 'String' | 'Number' | 'Date' | 'Boolean' | 'Object' | 'Array';

interface PageDataItem {
	id: string;
	parentId: string;
	name: string;
	value?: string;
	type: PageDataItemValueType;
}

export interface PageModel {
	pageInfo: PageInfo;
	widgets: AttachedWidget[];
	data: PageDataItem[];
}

export interface AppWindow {
	backgroundTextStyle: string;
	navigationBarBackgroundColor: string;
	navigationBarTitleText: string;
	navigationBarTextStyle: string;
}
export interface AppConfig {
	pages: string[];
	window: AppWindow;
}
