# simpler-lexer
A simple lexer that parses strings into tokens using user-defined regular expressions

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
