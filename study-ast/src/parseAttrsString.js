export default function(attrsString) {
  if(attrsString == undefined) return []

  //当前是否在引号内
  let isYinhao = false
  //断点
  let point = 0
  //结果数组
  let result = []

  for(let i = 0; i < attrsString.length; i++) {
    let char = attrsString[i]
    if(char == '"') {
      isYinhao = !isYinhao
    } else if(char == ' ' && !isYinhao) {
      //遇见了空格，并且不在引号中
      if(!/^\s*$/.test(attrsString.substring(point, i))) {
        result.push(attrsString.substring(point, i).trim())
        point = i
      }
    }
  }
  //循环结束后，最后还剩一个属性k="v"
  result.push(attrsString.substring(point).trim())
  result = result.map(item => {
    //根据等号拆分
    const o = item.match(/^(.+)="(.+)"$/)
    return {
      name: o[1],
      value: o[2]
    }
  })
  return result
}