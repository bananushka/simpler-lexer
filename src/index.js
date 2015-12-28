export default class Lexer {
  constructor(rules) {
    this.rules = rules;
  }

  tokenize(...args) {
    return this.constructor.tokenize(this.rules, ...args);
  }

  static tokenize(rules, expression, {
                                        findLongest = true,
                                        lastOfLongest = false,
                                        passThroughUnrecognized = false
                                     } = {}) {
    let tokens = [];
    while (expression.trim().length > 0) {
      let longestResult = '', longestResultName, found = false;
      for (let {name, rule} of rules) {
        rule = new RegExp('^' + rule.source, rule.flags);
        let result = rule.exec(expression);
        if (!!result) {
          found = true;
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
      if (findLongest && found) {
        tokens.push({type: longestResultName, value: longestResult});
        expression = expression.substr(longestResult.length).trim();
      }
      if (!found) {
        if (passThroughUnrecognized) {
          tokens.push({type: expression[0], value: expression[0]});
          expression = expression.substr(1).trim();
        } else {
          throw new Error('Could not recognize string');
        }
      }
    }
    return tokens;
  }
}
