import { treeToJson, treeToXml } from '../../src/util';
import { AttachedWidgetProperty, AttachedWidget } from '../../src/interfaces';

const { describe, it } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');

describe('util', () => {
	it('treeToJson - empty json object', () => {
		const json = treeToJson([]);
		assert.deepEqual(json, {});
	});

	it('treeToJson - primitive types', () => {
		const tree: AttachedWidgetProperty[] = [
			{
				id: '1',
				name: 'string1',
				valueType: 'string',
				parentId: '-1',
				value: 'a',
				isExpr: false,
			},
			{
				id: '2',
				name: 'int1',
				valueType: 'int',
				parentId: '-1',
				value: '1',
				isExpr: false,
			},
			{
				id: '3',
				name: 'float1',
				valueType: 'float',
				parentId: '-1',
				value: '1.2',
				isExpr: false,
			},
			{
				id: '4',
				name: 'boolean1',
				valueType: 'boolean',
				parentId: '-1',
				value: 'true',
				isExpr: false,
			},
		];
		const json = treeToJson(tree);
		assert.deepEqual(json, { string1: 'a', int1: 1, float1: 1.2, boolean1: true });
	});

	it('treeToJson - default value', () => {
		const tree: AttachedWidgetProperty[] = [
			{
				id: '1',
				name: 'string1',
				valueType: 'string',
				parentId: '-1',
				defaultValue: 'a',
				isExpr: false,
			},
		];
		const json = treeToJson(tree);
		assert.deepEqual(json, { string1: 'a' });
	});

	it('treeToJson - value and default value is null', () => {
		const tree: AttachedWidgetProperty[] = [
			{
				id: '1',
				name: 'string1',
				valueType: 'string',
				parentId: '-1',
				isExpr: false,
			},
		];
		const json = treeToJson(tree);
		assert.deepEqual(json, {});
	});

	it('treeToJson - object', () => {
		const tree: AttachedWidgetProperty[] = [
			{
				id: '1',
				name: 'object1',
				valueType: 'object',
				parentId: '-1',
				isExpr: false,
			},
			{
				id: '2',
				name: 'int1',
				valueType: 'int',
				parentId: '1',
				value: '1',
				isExpr: false,
			},
		];
		const json = treeToJson(tree);
		assert.deepEqual(json, { object1: { int1: 1 } });
	});

	it('treeToJson - object nest object', () => {
		const tree: AttachedWidgetProperty[] = [
			{
				id: '1',
				name: 'object1',
				valueType: 'object',
				parentId: '-1',
				isExpr: false,
			},
			{
				id: '2',
				name: 'object11',
				valueType: 'object',
				parentId: '1',
				isExpr: false,
			},
			{
				id: '3',
				name: 'int1',
				valueType: 'int',
				parentId: '2',
				value: '1',
				isExpr: false,
			},
		];
		const json = treeToJson(tree);
		assert.deepEqual(json, { object1: { object11: { int1: 1 } } });
	});

	it('treeToXml - empty page', () => {
		// 转换时忽略 Page 部件
		const widgets: AttachedWidget[] = [
			{
				id: '1',
				parentId: '-1',
				apiRepoId: 1,
				widgetName: 'Page',
				properties: [],
			},
		];

		const xml = treeToXml(widgets);
		assert.equal(xml, '');
	});

	it('treeToXml - two siblings views', () => {
		// 转换时忽略 Page 部件
		const widgets: AttachedWidget[] = [
			{
				id: '1',
				parentId: '-1',
				apiRepoId: 1,
				widgetName: 'Page',
				properties: [],
			},
			{
				id: '2',
				parentId: '1',
				apiRepoId: 1,
				widgetName: 'view',
				properties: [],
			},
			{
				id: '3',
				parentId: '1',
				apiRepoId: 1,
				widgetName: 'view',
				properties: [],
			},
		];

		const xml = treeToXml(widgets);
		assert.equal(xml, '<view></view><view></view>');
	});

	it('treeToXml - two nest views', () => {
		// 转换时忽略 Page 部件
		const widgets: AttachedWidget[] = [
			{
				id: '1',
				parentId: '-1',
				apiRepoId: 1,
				widgetName: 'Page',
				properties: [],
			},
			{
				id: '2',
				parentId: '1',
				apiRepoId: 1,
				widgetName: 'view',
				properties: [],
			},
			{
				id: '3',
				parentId: '2',
				apiRepoId: 1,
				widgetName: 'view',
				properties: [],
			},
		];

		const xml = treeToXml(widgets);
		assert.equal(xml, '<view><view></view></view>');
	});

	it('treeToXml - properties', () => {
		// 转换时忽略 Page 部件
		const widgets: AttachedWidget[] = [
			{
				id: '1',
				parentId: '-1',
				apiRepoId: 1,
				widgetName: 'Page',
				properties: [],
			},
			{
				id: '2',
				parentId: '1',
				apiRepoId: 1,
				widgetName: 'view',
				properties: [
					{
						id: '1',
						parentId: '-1',
						name: 'prop1',
						value: 'value1',
						valueType: 'string',
						isExpr: false,
					},
					{
						id: '2',
						parentId: '-1',
						name: 'prop2',
						value: 'value2',
						valueType: 'string',
						isExpr: false,
					},
				],
			},
		];

		const xml = treeToXml(widgets);
		assert.equal(xml, `<view prop1="value1" prop2="value2"></view>`);
	});
});
