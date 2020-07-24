const { describe, it } = intern.getPlugin('interface.bdd');
const { assert } = intern.getPlugin('chai');
import { stub } from 'sinon';
import * as fs from 'fs';
import * as glob from 'glob';
import * as modelReader from '../../../src/weapp/modelReader';

describe('weapp/modelReader', () => {
	it('readAppModel: app.mp.json not exists', () => {
		const existsSyncStub = stub(fs, 'existsSync').returns(false);
		assert.isUndefined(modelReader.readAppModel(''));
		existsSyncStub.restore();
	});

	it('readAppModel: app.mp.json exists but invalid json', () => {
		const existsSyncStub = stub(fs, 'existsSync').returns(true);
		const readFileSyncStub = stub(fs, 'readFileSync').returns('{');
		assert.isUndefined(modelReader.readAppModel(''));
		readFileSyncStub.restore();
		existsSyncStub.restore();
	});

	it('readAppModel: app.mp.json exists and valid json', () => {
		const existsSyncStub = stub(fs, 'existsSync').returns(true);
		const readFileSyncStub = stub(fs, 'readFileSync').returns('{}');
		assert.isEmpty(modelReader.readAppModel(''));
		readFileSyncStub.restore();
		existsSyncStub.restore();
	});

	it('readAllPageModels: no page model', () => {
		const globSyncStub = stub(glob, 'sync').returns([]);
		assert.isEmpty(modelReader.readAllPageModels(''));
		globSyncStub.restore();
	});
});
