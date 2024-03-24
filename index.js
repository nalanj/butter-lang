function tokenize(input) {
  return input
    .replace("(", " ( ")
    .replace(")", " ) ")
    .replace("  ", " ")
    .split(" ")
    .map(t => t.trim())
    .filter(t => t.length > 0);
}

function parse(tokens, top = false) {
  const out = [];
  while(tokens.length > 0) {
    const tok = tokens.shift();

    if (tok === "(") {
      out.push(parse(tokens));
    } else if (tok === ")") {
      if (top) {
        throw new SyntaxError("Unexpected )");
      }

      return out;
    } else {
      const asInt = parseInt(tok);
      if (!isNaN(asInt)) {
        out.push(asInt);
      } else {
        out.push(tok);
      }      
    }
  }

  return out;
}

const prog = `
  (+ 2 300)
`;

console.log(parse(tokenize(prog), true));
