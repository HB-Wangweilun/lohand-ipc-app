import { ipc } from "./ipcRenderer";

// 播放点击时触发的音效
export const playClickSound = () => {
  let audioEle = document.getElementById("myAudio");
  audioEle.play();
};

// 打开屏幕键盘的函数
export const openScreenKeyboardFunc = () => {
  ipc.send("openScreenKeyboard");
};
