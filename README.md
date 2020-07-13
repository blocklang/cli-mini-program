# cli-mini-program

根据 BlockLang 页面模型生成小程序源代码。

## 如何使用

全局安装：

```sh
npm install @blocklnag/cli-mini-program
```

生成小程序源代码：

```sh
mp --type weapp --model-dir ./your/model/root/dir
```

以上脚本会生成微信小程序源代码。

```text
--type              小程序类型，weapp (微信小程序)
--model-dir         存放页面模型的根路径
```

## 构建项目

```sh
npm run build
```

## 运行测试

```sh
npx intern
```