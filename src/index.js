"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pass = exports.fail = void 0;
var isOk = function (result) {
    return result.ok;
};
var fail = function (Fallback) {
    return {
        ok: false,
        result: Fallback,
    };
};
exports.fail = fail;
var pass = function (Value) {
    return {
        ok: true,
        result: Value,
    };
};
exports.pass = pass;
exports.default = {
    pass: exports.pass,
    fail: exports.fail,
    isOk: isOk,
};
// Implement wrap, unwrap, pipe, encase, match
