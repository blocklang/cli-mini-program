# cli-mini-program

根据 BlockLang 页面模型生成小程序源代码。

## 如何使用

全局安装：

```sh
npm install @blocklnag/cli-mini-program
```

生成小程序源代码：

```sh
cd repo/mini/program/project/dir
mp --type weapp --model-dir ./your/model/root/dir
```

注意：

1. 要先 `cd` 到小程序项目的根目录，而不是仓库的根目录;
2. 存放模型的目录是指存放小程序项目模型的根目录，而不是仓库的根目录。

以上脚本会生成微信小程序源代码。

```text
--type              小程序类型，weapp (微信小程序)
--model-dir         存放页面模型的根路径，指向小程序项目的根目录，而不是仓库的根目录
```

## 构建项目

```sh
npm run build
```

## 运行测试

```sh
npx intern
```