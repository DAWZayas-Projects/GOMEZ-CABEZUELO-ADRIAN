"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *
 * @param regex
 * @param string
 * @returns {Array}
 */
var regex = exports.regex = function regex(_regex, string) {

    var m = void 0;
    var arrMatches = [];

    while ((m = _regex.exec(string)) !== null) {

        if (m.index === _regex.lastIndex) _regex.lastIndex++;

        m.forEach(function (match) {
            return arrMatches.push(match);
        });
    }

    return arrMatches;
};

//# sourceMappingURL=regex-compiled.js.map