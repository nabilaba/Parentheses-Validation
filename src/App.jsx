import Stack from "./stack";

function App() {
  const checkParentheses = (s) => {
    let stack = new Stack();
    if (s == "") return false;
    let jumlahBracketKiri = 0;
    let jumlahBracketKanan = 0;
    let sMempunyaiBracket = false;
    for (let i = 0; i < s.length; i++) {
      if (s[i] == "(" || s[i] == "{" || s[i] == "[") {
        jumlahBracketKiri++;
        sMempunyaiBracket = true;
      } else if (s[i] == ")" || s[i] == "}" || s[i] == "]") {
        jumlahBracketKanan++;
        sMempunyaiBracket = true;
      }
    }
    if (jumlahBracketKiri != jumlahBracketKanan || !sMempunyaiBracket)
      return false;

    for (let i = 0; i < s.length; i++) {
      if (s[i] == "(" || s[i] == "{" || s[i] == "[") {
        stack.push(s[i]);
      } else if (s[i] == ")" || s[i] == "}" || s[i] == "]") {
        if (
          (stack.peek() == "(" && s[i] == ")") ||
          (stack.peek() == "{" && s[i] == "}") ||
          (stack.peek() == "[" && s[i] == "]")
        ) {
          stack.pop();
        }
      }
    }
    return stack.top == -1;
  };
  return (
    <div>
      <h1>Parentheses Checker</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.target.elements.input.value;
          const result = checkParentheses(input);
          alert(result);
        }}
      >
        <input type="text" name="input" />
        <button type="submit">Check</button>
      </form>
    </div>
  );
}

export default App;
