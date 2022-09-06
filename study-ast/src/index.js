import parse from "./parse"

var templateString = `
  <div class="a b c" id="container">
    <h3>你好</h3>
    <ul>
      <li>A</li>
      <li>B</li>
      <li>C</li>
    </ul>
    <div>
      <div>哈哈</div>
    </div>
  </div>
`
const ast = parse(templateString)
console.log(ast)