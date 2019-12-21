# xiyueheping.github.io
- 一个基于JavaScript的网址收藏夹
- 提供了收藏网址天气预报以及翻译的功能
- 所有的js文件以index.js为入口文件，最终打包压缩为同目录的output.js文件
- 打包命令，在js目录运行：
  - webpack --mode production  index.js -o output.js  生产环境
  - webpack --mode development  index.js -o output.js  开发环境