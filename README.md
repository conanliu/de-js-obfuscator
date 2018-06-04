# 一个JavaScript-Obfuscator混淆逆向工具

目前支持对[JavaScript-Obfuscator](https://github.com/javascript-obfuscator/javascript-obfuscator.git)混淆后的字符串进行自动化还原。

## Usage

**Notice: 本工具仅支持node 8及以上版本**
```shell
# 读取当前目录的hello-world-obf.js并还原其字符串
node index.js
```

## 文件说明

- hello-world-obf.js  经过`JavaScript-Obfuscator`混淆后的js，其功能是打印`hello world!`
- index.js  逆向工具，自动读当前目录的`hello-world-obf.js`，并将逆向的产物输出到`dist`目录

## License

MIT
