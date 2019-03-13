"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("regenerator-runtime/runtime");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.array.includes");

var _marked =
/*#__PURE__*/
_regenerator.default.mark(foo);

// Promise.resolve().finally();
var array = [1, 2, 3, 4, 5, 6];
array.includes(function (item) {
  return item > 2;
});
Object.assign({}, {
  a: 1,
  b: 2
});
Array.isArray([]);
new Promise();
"foobar".includes("foo");

function foo() {
  return _regenerator.default.wrap(function foo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}