'use strict';

var _graphql = require('graphql');

var _ = require('.');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step('next', value);
            },
            function(err) {
              step('throw', err);
            },
          );
        }
      }
      return step('next');
    });
  };
}

describe('GraphQLUUID', function() {
  var schema = void 0;

  beforeEach(function() {
    schema = new _graphql.GraphQLSchema({
      query: new _graphql.GraphQLObjectType({
        name: 'Query',
        fields: {
          value: {
            type: _2.default,
            args: {
              arg: {
                type: _2.default,
              },
            },
            resolve: function resolve(parent, _ref) {
              var arg = _ref.arg;
              return arg;
            },
          },
        },
      }),
    });
  });

  describe('serialize', function() {
    test('supports serialization', function() {
      expect(
        _2.default.serialize('16fd2706-8baf-433b-82eb-8c7fada847da'),
      ).toEqual('16fd2706-8baf-433b-82eb-8c7fada847da');
    });

    test('converts to lower case during serialization', function() {
      expect(
        _2.default.serialize('16FD2706-8BAF-433B-82EB-8C7FADA847DA'),
      ).toEqual('16fd2706-8baf-433b-82eb-8c7fada847da');
    });

    test('rejects invalid values', function() {
      expect(function() {
        _2.default.serialize('INVALID');
      }).toThrow(
        new TypeError('UUID cannot represent non-UUID value: INVALID'),
      );
    });
  });

  describe('parseValue', function() {
    test(
      'supports parsing values',
      _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
          var _ref3, value;

          return regeneratorRuntime.wrap(
            function _callee$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    _context.next = 2;
                    return (0, _graphql.graphql)(
                      schema,
                      'query ($arg: UUID!) { value(arg: $arg) }',
                      null,
                      null,
                      { arg: '16fd2706-8baf-433b-82eb-8c7fada847da' },
                    );

                  case 2:
                    _ref3 = _context.sent;
                    value = _ref3.data.value;

                    expect(value).toEqual(
                      '16fd2706-8baf-433b-82eb-8c7fada847da',
                    );

                  case 5:
                  case 'end':
                    return _context.stop();
                }
              }
            },
            _callee,
            undefined,
          );
        }),
      ),
    );

    test(
      'rejects invalid values',
      _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee2() {
          var _ref5, errors;

          return regeneratorRuntime.wrap(
            function _callee2$(_context2) {
              while (1) {
                switch ((_context2.prev = _context2.next)) {
                  case 0:
                    _context2.next = 2;
                    return (0, _graphql.graphql)(
                      schema,
                      'query ($arg: UUID!) { value(arg: $arg) }',
                      null,
                      null,
                      { arg: 'INVALID' },
                    );

                  case 2:
                    _ref5 = _context2.sent;
                    errors = _ref5.errors;

                    expect(errors.length).toBe(1);

                  case 5:
                  case 'end':
                    return _context2.stop();
                }
              }
            },
            _callee2,
            undefined,
          );
        }),
      ),
    );
  });

  describe('parseLiteral', function() {
    test(
      'supports parsing literals',
      _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee3() {
          var _ref7, value;

          return regeneratorRuntime.wrap(
            function _callee3$(_context3) {
              while (1) {
                switch ((_context3.prev = _context3.next)) {
                  case 0:
                    _context3.next = 2;
                    return (0, _graphql.graphql)(
                      schema,
                      '{ value(arg: "16fd2706-8baf-433b-82eb-8c7fada847da") }',
                    );

                  case 2:
                    _ref7 = _context3.sent;
                    value = _ref7.data.value;

                    expect(value).toEqual(
                      '16fd2706-8baf-433b-82eb-8c7fada847da',
                    );

                  case 5:
                  case 'end':
                    return _context3.stop();
                }
              }
            },
            _callee3,
            undefined,
          );
        }),
      ),
    );

    test(
      'rejects non-UUID string literals',
      _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee4() {
          var _ref9, errors;

          return regeneratorRuntime.wrap(
            function _callee4$(_context4) {
              while (1) {
                switch ((_context4.prev = _context4.next)) {
                  case 0:
                    _context4.next = 2;
                    return (0, _graphql.graphql)(
                      schema,
                      '{ value(arg: "not a UUID") }',
                    );

                  case 2:
                    _ref9 = _context4.sent;
                    errors = _ref9.errors;

                    expect(errors.length).toBe(1);

                  case 5:
                  case 'end':
                    return _context4.stop();
                }
              }
            },
            _callee4,
            undefined,
          );
        }),
      ),
    );

    test(
      'rejects invalid literals',
      _asyncToGenerator(
        /*#__PURE__*/ regeneratorRuntime.mark(function _callee5() {
          var _ref11, errors;

          return regeneratorRuntime.wrap(
            function _callee5$(_context5) {
              while (1) {
                switch ((_context5.prev = _context5.next)) {
                  case 0:
                    _context5.next = 2;
                    return (0, _graphql.graphql)(
                      schema,
                      '{ value(arg: INVALID) }',
                    );

                  case 2:
                    _ref11 = _context5.sent;
                    errors = _ref11.errors;

                    expect(errors.length).toBe(1);

                  case 5:
                  case 'end':
                    return _context5.stop();
                }
              }
            },
            _callee5,
            undefined,
          );
        }),
      ),
    );
  });
});
