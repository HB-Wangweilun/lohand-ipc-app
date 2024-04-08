import { ipc } from "./ipcRenderer"
import qs from "qs"
import { v4 as uuid4 } from "uuid"

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
