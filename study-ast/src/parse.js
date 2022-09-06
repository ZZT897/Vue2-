import parseAttrsString from "./parseAttrsString"

//parse函数 主函数
export default function(templateString) {
  //指针
  let index = 0
  //剩余部分
  let rest = ''
  //开始标记
  let startRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/
  //结束标记
  let endRegExp = /^\<\/([a-z]+[1-6]?)\>/
  //抓取结束标记前的文字
  let wordRegExp = /^([^\<]+)\<\/([a-z]+[1-6]?)\>/
  //准备两个栈
  let stack1 = []
  let stack2 = [{'children': []}]
  while(index < templateString.length - 1) {
    rest = templateString.substring(index)
    //识别遍历到的字符，是不是一个开始标签
    if(startRegExp.test(rest)) {
      let tag = rest.match(startRegExp)[1]
      let attrsString = rest.match(startRegExp)[2]
      // console.log('检测到开始标记', tag)
      //将开始标记推入栈1中
      stack1.push(tag)
      //将空数组推入栈2中
      stack2.push({'tag': tag, 'children': [], 'attrs': parseAttrsString(attrsString)})
      const attrsStringLength = attrsString != null ? attrsString.length : 0
      index += tag.length + 2 + attrsStringLength
      // console.log(stack1, stack2)
    } else if(endRegExp.test(rest)) {
      //识别遍历到的字符，是不是一个开始标签
      let tag = rest.match(endRegExp)[1]
      // console.log('检测到结束标记', tag)
      //此时，tag一定和栈1顶部是相同的
      if(tag == stack1[stack1.length - 1]) {
        let pop_tag = stack1.pop()
        let pop_arr = stack2.pop()
        if(stack2.length > 0) {
          stack2[stack2.length - 1].children.push(pop_arr)
        }
      } else {
        throw new Error(pop_tag + '标签没有封闭!!!')
      }
      index += tag.length + 3
    } else if(wordRegExp.test(rest)) {
      //识别遍历到的字符，是不是文字
      let word = rest.match(wordRegExp)[1]
      //看word是不是全为空
      if(!/^\s+$/.test(word)) {
        // console.log('检测到文字', word)
        stack2[stack2.length - 1].children.push({'text': word, 'type': 3})
      }
      index += word.length
    } else {
      index++
    }
  }
  return stack2[0].children[0]
}