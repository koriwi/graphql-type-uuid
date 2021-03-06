'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _graphql = require('graphql');

var _language = require('graphql/language');

var _isUUID = require('./isUUID');

var _isUUID2 = _interopRequireDefault(_isUUID);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var GraphQLUUID = new _graphql.GraphQLScalarType({
  name: 'UUID',
  description:
    'The `UUID` scalar type represents UUID values as specified by [RFC 4122](https://tools.ietf.org/html/rfc4122).',
  serialize: function serialize(value) {
    if (!(0, _isUUID2.default)(value)) {
      throw new TypeError('UUID cannot represent non-UUID value: ' + value);
    }

    return value.toString().toLowerCase();
  },
  parseValue: function parseValue(value) {
    if (!(0, _isUUID2.default)(value)) {
      throw new TypeError('UUID cannot represent non-UUID value: ' + value);
    }

    return value.toString().toLowerCase();
  },
  parseLiteral: function parseLiteral(ast) {
    if (ast.kind === _language.Kind.STRING) {
      if ((0, _isUUID2.default)(ast.value)) {
        return ast.value;
      }
    }

    return undefined;
  },
});

exports.default = GraphQLUUID;
module.exports = exports.default;
