import * as yargs from 'yargs';
import * as weapp from './weapp';

type MiniProgramType = 'weapp';
const miniProgramType: ReadonlyArray<MiniProgramType> = ['weapp'];

export function run() {
	const argv = yargs.options({
		type: {
			type: 'string',
			alias: 't',
			choices: miniProgramType,
			demandOption: true,
			describe: '小程序类型，当前仅支持微信小程序',
		},
		'model-dir': {
			type: 'string',
			alias: 'd',
			demandOption: true,
			describe: '存储页面模型的根目录，指向小程序项目的根目录，而不是仓库的根目录',
		},
	}).argv;

	if (argv.type === 'weapp') {
		weapp.generate(argv['model-dir']);
	}
}
