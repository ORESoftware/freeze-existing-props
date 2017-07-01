'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.freezeExistingProps = function (obj) {
    try {
        Object.keys(obj).forEach(function (key) {
            Object.defineProperty(obj, key, {
                writable: false
            });
        });
    }
    catch (err) { }
    return obj;
};
