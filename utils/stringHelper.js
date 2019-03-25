'use strict';

class stringHelper {

    /**
     * 字符串格式化
     * 替换字符串中的{0}的占位符
     * @str string 原始字符串
     * @params [] 需要替换的值，数组格式
     */
    static format(str, params) {

        if (!Array.isArray(params) || arguments.length > 2) {
            params = Array.prototype.slice.call(arguments, 1);
        }
        if (/^\s*$/ig.test(str) || !params || params.length <= 0)
            return str;
        let formatString = str;
        params.forEach((s, idx) => {
            if (Array.isArray(s)) {
                s = s.join('');
            }
            else if (Object.prototype.toString.call(s) === '[object Object]') {
                s = JSON.stringify(s);
            }
            else {
                s = s.toString();
            }
            formatString = formatString.replace(new RegExp(`\\{${idx}\\}`, 'ig'), s);
        });
        return formatString;
    }

    static isNullOrWhiteSpace(str) {
        if (str === null || str === undefined || /^\s*$/ig.test(str)) {
            return true;
        }
        return false;
    }
    static isEqual(first, second) {
        if (first === second) {
            return true;
        }
        if (!!first && !!second) {
            return first.toLowerCase() === second.toLowerCase();
        }
        return false;
    }
    /**
     * 字符串首字母转换成小写
     */
    static startToLowerCase(str) {
        if (stringHelper.isNullOrWhiteSpace(str)) {
            return str;
        }
        let startStr = str.substr(0, 1);
        return str.replace(new RegExp('^' + startStr), startStr.toLowerCase());
    }
    /**
     * 字符串首字母转换成大写
     */
    static startToUpperCase(str) {
        if (stringHelper.isNullOrWhiteSpace(str)) {
            return str;
        }
        let startStr = str.substr(0, 1);
        return str.replace(new RegExp('^' + startStr), startStr.toUpperCase());
    }

    static isEmpty(obj) {
        if (obj === null) return true;
        if (typeof obj === 'undefined') {
            return true;
        }
        if (typeof obj === 'string') {
            if (obj === "") {
                return true;
            }
            var reg = new RegExp("^([ ]+)|([　]+)$");
            return reg.test(obj);
        }
        return false;
    }

    static isString(obj) { //判断对象是否是字符串  
        return Object.prototype.toString.call(obj) === "[object String]";
    }

    static s8() {
        var data = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        // for (var j = 0; j < line; j++) {    //500为想要产生的行数
        let result = "";
        for (var i = 0; i < 8; i++) {   //产生8位就使i<8
            let r = Math.floor(Math.random() * 62);     //16为数组里面数据的数量，目的是以此当下标取数组data里的值！
            result += data[r];        //输出20次随机数的同时，让rrr加20次，就是20位的随机字符串了。
        }
        return result;
    }


}


module.exports = stringHelper;
