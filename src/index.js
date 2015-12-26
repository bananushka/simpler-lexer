export default class Lexer {
  constructor(rules) {
    this.rules = rules;
  }

  tokenize(...args) {
    return this.constructor.tokenize(this.rules, ...args);
  }

  static tokenize(rules, expression, {findLongest = true, lastOfLongest = false} = {}) {
    let tokens = [];
    while (expression.trim().length > 0) {
      let longestResult = '', longestResultName;
      for (let {name, rule} of rules) {
        rule = new RegExp('^' + rule.source, rule.flags);
        let result = rule.exec(expression);
        if (!!result) {
          if (findLongest) {
            if (lastOfLongest && result[0].length >= longestResult.length) {
              longestResult = result[0];
              longestResultName = name;
            } else if (result[0].length > longestResult.length) {
              longestResult = result[0];
              longestResultName = name;
            }
          } else {
            tokens.push({type: name, value: result[0]});
            expression = expression.substr(result[0].length).trim();
            break;
          }
        }
      }
      if (findLongest) {
        tokens.push({type: longestResultName, value: longestResult});
        expression = expression.substr(longestResult.length).trim();
      }
    }
    return tokens;
  }
}
