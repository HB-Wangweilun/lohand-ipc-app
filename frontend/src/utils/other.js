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

// 处理Excel表格数据流的函数
export const disposeExcelDataFunc = (debug) => {
  if (debug) {
    var elink = document.createElement("a")
    elink.download = `xxx历史记录--(xxx).xls`
    elink.style.display = "none"
    console.log(debug)
    var blob = new Blob([debug], { type: "application/x-msdownload" })
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    document.body.removeChild(elink)
    console.log("导出成功")
  } else {
    console.log("导出异常请联系管理员")
  }
}

// json  编辑器样式调整 函数
export const jsonEditorStyleAdjustFunc = () => {
  // 删除跳转外链的标签
  let linkTagEle = document.querySelector(".jsoneditor-poweredBy")
  linkTagEle.parentNode.removeChild(linkTagEle)

  // 调整编辑器最大化图标标签位置
  const fullScreenEle = document.querySelector(".full-screen")
  fullScreenEle.style.right = "6px"
  fullScreenEle.style.display = "none"

  // 删除整个头部组件
  let menuEle = document.querySelector(".jsoneditor-menu")
  // menuEle.parentNode.removeChild(menuEle)
  menuEle.style.backgroundColor = "#0a9ada"

  // 让编辑器撑满盒子
  const editMainEle = document.querySelector(
    ".jsoneditor-outer.has-main-menu-bar"
  )
  editMainEle.style.marginTop = "0px"
  editMainEle.style.paddingTop = "0px"

  // 消除蓝色外边框
  const jsonCodeWrapEle = document.querySelector(".jsoneditor")
  jsonCodeWrapEle.style.border = "1px solid transparent"
  jsonCodeWrapEle.style.borderRadius = "50px"

  // 边距
  const ace_gutterEle = document.querySelector(".ace_gutter")
  const ace_contentEle = document.querySelector(".ace_content")
  const ace_text_layerEle = document.querySelector(".ace_text-layer")
  const ace_scrollerEle = document.querySelector(".ace_scroller")
  ace_gutterEle.style.paddingTop = "4px"
  // ace_gutterEle.style.fontSize = "18px"
  ace_contentEle.style.marginTop = "4px"
  // ace_contentEle.style.fontSize = "18px"
  // ace_text_layerEle.style.marginTop = "10px"
  // ace_scrollerEle.style.paddingTop = "10px"
}
