# simpler-lexer
A simple lexer that parses strings into tokens using user-defined regular expressions

## Installation
Simply install via NPM:
```sh
npm install simpler-lexer
```

## Usage
All examples are written in ES-2015.

```js
import Lexer from 'simpler-lexer';

let lexer = new Lexer(/* token rules */);
lexer.tokenize(/* input */);

// Or, use the static method

Lexer.tokenize(/* token rules */, /* input */);
```

### Token rules format
The tokenizing rules are written in following format:
```js
[
  {
    name: 'name of rule, to be used in the output',
    rule: 'regular expression to match the token'
  }
]
```

### Output format
```js
[
  {
    name: 'name of the rule that matched the token',
    value: '(longest) lexeme that matched the token'
  }
]
```

### Complete example
```js
import Lexer from 'simpler-lexer';

let lexer = new Lexer([
  {name: 'digit', rule: /[0-9]/},
  {name: 'letter', rule: /[a-zA-Z]/}
]);
console.log(lexer.tokenize('1gN4h'));
// result:
[
  {type: 'digit', value: '1'},
  {type: 'letter', value: 'g'},
  {type: 'letter', value: 'N'},
  {type: 'digit', value: '4'},
  {type: 'letter', value: 'h'},
]
```

### Additional options
The `tokenize()` method (and static method) can be passed additional options:
```js
{
  findLongest: whether to match the longest token or just the first (by default true),
  lastOfLongest: when matching the longest token, whether to use the first match or last (by default false)
}
```
