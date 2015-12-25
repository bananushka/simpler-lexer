import 'babel-polyfill';

export default class Lexer {
  constructor(rules) {
    this.rules = rules;
  }

  tokenize(expression) {
    return this.constructor.tokenize(this.rules, expression);
  }

  static tokenize(rules, expression) {
    let tokens = [];
    while (expression.trim().length > 0) {
      for (let {name, rule} of rules) {
        rule = new RegExp('^' + rule.source, rule.flags);
        let result = rule.exec(expression);
        if (!!result) {
          tokens.push({type: name, value: result[0]});
          expression = expression.substr(result[0].length).trim();
        }
      }
    }
    return tokens;
  }
}
