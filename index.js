/**
 *
 *
 * @author: conanliu
 * @date: 2018/5/25
 */

const fs = require('fs');
const ds = require('./decrypt-str');

function decString(code) {
    // replace all encoded string
    code = code.replace(/'\\x.*?'/g, function ($0) {
        return `'${eval($0).replace(/'/g, "\\'")}'`;
    }).replace(/'\\u.*?'/g, function ($0) {
        return `'${eval($0).replace(/'/g, "\\'")}'`;
    });

    // string array offset
    const offset = parseInt(/,(0x[0-9a-f]+)\)/.exec(code)[1], 16);
    // find the function name of decrypt string
    const decStrFnName = /\b(\w+)\('0x0'[,)]{1}.*?\1\('0x1'[,)]{1}/.exec(code)[1];
    // string array
    const stringArray = eval(/var \w+=(\['(.*?)'(,'(.*?)')*?])/g.exec(code)[1]);

    const decFnsRegex = `${decStrFnName}\\('(0x.+?)'(,'(.*?)')?\\)`;

    function recoveryArrayOrder(stringArr, offset) {
        const foo = function (i) {
            while (--i) {
                stringArr['push'](stringArr['shift']());
            }
        };
        foo(++offset);
    }
    recoveryArrayOrder(stringArray, offset);

    const decryptFnsReg = new RegExp(decFnsRegex, 'g');
    const decryptFns = code.match(decryptFnsReg);
    const rawStr = [];
    const decStrMap = {};
    for (let i = 0; i < decryptFns.length; i++) {
        const item = decryptFns[i];
        const pair = new RegExp(decFnsRegex).exec(item);
        const index = +pair[1];
        if (pair[3]) {
            rawStr[index] = ds(stringArray, pair[1], pair[3]);
        } else {
            rawStr[index] = stringArray[+pair[1]];
        }

        decStrMap[stringArray[index]] = rawStr[index];
    }

    // replace in code
    const deobfCode = code.replace(new RegExp(decFnsRegex, 'g'), function ($0, $1, $2) {
        return `'${(rawStr[+$1] || '').replace(/'/g, "\\'")}'`;
    }).replace(/'(.*?)'/g, function ($0, $1) {
        const raw = decStrMap[$1];
        if (raw && typeof raw === 'string') return `'${raw.replace(/'/g, "\\'")}'`;
        return $0;
    });

    return deobfCode;
}

// read code
let code = fs.readFileSync('./hello-world-obf.js', 'utf8');

// write to file
fs.writeFileSync(`./dist/${+new Date()}.js`, decString(code), 'utf8');
