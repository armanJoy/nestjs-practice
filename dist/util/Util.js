"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
class Util {
}
exports.Util = Util;
_a = Util;
Util.uuidRegExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
Util.isValidUuuid = (id) => {
    return _a.uuidRegExp.test(id);
};
//# sourceMappingURL=Util.js.map