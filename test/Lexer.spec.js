import assert from 'assert';
import Lexer from '../lib/index.js';

describe('Lexer', () => {
  describe('#constructor()', () => {
    it('should create a new Lexer object', () => {
      assert(new Lexer instanceof Lexer);
    });
    it('should create an object with a #tokenize method', () => {
      assert((new Lexer).tokenize instanceof Function);
    });
  });

  const testCases = [
    {
      title: 'should recognize a simple rule',
      rules: [{name: 'digit', rule: /[0-9]/}],
      input: '13',
      expected: [
        {type: 'digit', value: '1'},
        {type: 'digit', value: '3'},
      ]
    },
    {
      title: 'should find longest matching token',
      rules: [{name: 'digits', rule: /[0-9]+/}],
      input: '13',
      expected: [
        {type: 'digits', value: '13'},
      ]
    },
    {
      title: 'should work with multiple rules',
      rules: [
        {name: 'digit', rule: /[0-9]/},
        {name: 'letter', rule: /[a-zA-Z]/}
      ],
      input: '1gN4h',
      expected: [
        {type: 'digit', value: '1'},
        {type: 'letter', value: 'g'},
        {type: 'letter', value: 'N'},
        {type: 'digit', value: '4'},
        {type: 'letter', value: 'h'},
      ]
    },
    {
      title: 'should find longest when two rules match',
      rules: [
        {name: 'digit', rule: /[0-9]/},
        {name: 'number', rule: /[1-9][0-9]*/},
      ],
      input: '12',
      expected: [
        {type: 'number', value: '12'},
      ]
    },
    {
      title: 'unless told specifically not to find longest',
      rules: [
        {name: 'digit', rule: /[0-9]/},
        {name: 'number', rule: /[1-9][0-9]*/},
      ],
      input: '12',
      expected: [
        {type: 'digit', value: '1'},
        {type: 'digit', value: '2'},
      ],
      options: {findLongest: false}
    },
    {
      title: 'should find first of longest when two rules match',
      rules: [
        {name: 'integer', rule: /[+-]?[1-9][0-9]*/},
        {name: 'number', rule: /[1-9][0-9]*/},
      ],
      input: '12',
      expected: [
        {type: 'integer', value: '12'},
      ]
    },
    {
      title: 'unless told specifically to match last',
      rules: [
        {name: 'integer', rule: /[+-]?[1-9][0-9]*/},
        {name: 'number', rule: /[1-9][0-9]*/},
      ],
      input: '12',
      expected: [
        {type: 'number', value: '12'},
      ],
      options: {lastOfLongest: true}
    },
  ];
  describe('#tokenize()', () => {
    for (let {title, rules, input, expected, options = {}} of testCases) {
      it(title, () => {
        assert.deepEqual((new Lexer(rules)).tokenize(input, options), expected);
      });
    }
    it('should throw an error when it encounters unrecognized string', () => {
      assert.throws(() => {
        (new Lexer([])).tokenize('a');
      });
    });
    it('should not throw, when explicity told not to', () => {
      assert.doesNotThrow(() => {
        assert.deepEqual((new Lexer([])).tokenize('a', {
          passThroughUnrecognized: true
        }), [{type: 'a', value: 'a'}]);
      });
    });
  });

  describe('.tokenize()', () => {
    it('should work the same as a Lexer object', () => {
        for (let {_, rules, input, expected, options = {}} of testCases) {
          assert.deepEqual(Lexer.tokenize(rules, input, options), expected);
        }
    });
  });
});
