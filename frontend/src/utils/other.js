import { ipc } from "./ipcRenderer"
import qs from "qs"
import { v4 as uuid4 } from "uuid"
import Units from "../data/unit.json"

// 播放点击时触发的音效
export const playClickSound = () => {
  let audioEle = document.getElementById("myAudio")
  audioEle.play()
}

// 打开屏幕键盘的函数
export const openScreenKeyboardFunc = () => {
  ipc.send("openScreenKeyboard")
}

// 进入屏保的函数
export const enterScreensaverFunc = () => {
  ipc.send("enterScreensaver")
}

export const qsStringifyF = (data) => {
  return "?" + qs.stringify(data)
}

// 生成随机 id
export const generateLetterPrefixedId = () => {
  let id = ""
  do {
    // 生成一个UUID并取其前几个字符
    id = uuid4().substring(0, 8).toUpperCase()
    // 如果第一个字符不是字母，则继续循环
  } while (!/^[a-zA-Z]/.test(id))
  return id
}

// 表格行序号生成函数
export const generateTableRowNumber = (page, size, index) =>
  (page - 1) * size + (index + 1)

// 生成曲线图ToolTip元素的函数
export const generateToolTipEleFunc = (data) => {
  let eleStr = ""
  if (data.name) {
    let unit = Units.unitKeys[data.seriesName]
    eleStr = `
  <div class="curve_graph_tooltip_box">
    <div class="header">
      <span class="title">${data.name}</span>
    </div>
    <div class="content">
      <span class="param_name">${data.seriesName}</span>
      <div class="out">
        <span class="param_value">${data.value}</span>
        <span class="param_unit">${unit}</span>
      </div>
    </div>
  </div>
  `
  }
  return eleStr
}

// 字符串转换为16进制数据
export function stringToHex(str) {
  var val = ""
  for (var i = 0; i < str.length; i++) {
    if (val == "") val = str.charCodeAt(i).toString(16)
    else val += "," + str.charCodeAt(i).toString(16)
  }
  return val
}

// 16进制数据转换为字符串
export function hexToString(str) {
  var val = ""
  var arr = str.split(",")
  console.log(arr)
  for (var i = 0; i < arr.length; i++) {
    // console.log(String.fromCharCode(arr[i]));
    // val += arr[i].fromCharCode(i)
    let dec = parseInt(arr[i], 16)
    let strS = String.fromCharCode(dec)
    val += strS
  }
  return val
}

// 每两位数加 ,
export function addCommas(str) {
  if (str.length <= 2) {
    return str
  }
  return addCommas(str.slice(0, -2)) + "," + str.slice(-2)
}

// 去除两位数的 ,
export function delCommas(str) {
  let strR = ""
  let strs = str.split(",")
  strs.forEach((item) => {
    strR += item
  })
  return strR
}
