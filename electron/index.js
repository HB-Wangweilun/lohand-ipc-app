const {Application} = require("ee-core");
const Store = require('electron-store')
const xlsx = require('xlsx')
const Log = require("ee-core/log");
const {app,BrowserWindow,ipcMain,screen,shell} = require("electron");
const dialog = require('electron').dialog
const fs = require('fs')
const ExcelJS = require('exceljs')
// console.log(dialog.showOpenDialog({ properties: [ 'openFile', 'openDirectory', 'multiSelections' ]}));
const path = require("path");
const request = require('request')
const { exec } = require("child_process");
// const { screen } = require("electron/main");
// const { showVirtualKeyboard, hideVirtualKeyboard } = require("./utils");

// 启动时打开第三方服务的 Url
const startAppUrl = `${path.resolve()}\\${app.isPackaged ? "resources" : "build"}\\extraResources\\server\\server.bat`;
// const fileUrl = `file://${__dirname}/index.html`;
// const serverUrl = `${__dirname}/index.html`;
// const store = new Store()



class Index extends Application {
  constructor() {
    super();
    // this === eeApp;
  }

  /**
   * core app have been loaded
   */
  async ready() {
    // 关闭开发模式下控制台的风险提示信息
    process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
    // console.log(fileUrl);
    // console.log(serverUrl);
    // console.log(
    //   path.resolve() + `\\resources\\extraResources\\server\\server.bat`
    // );

    // 开机自启动
    app.setLoginItemSettings({
      openAtLogin: false, // Boolean 在登录+时启动应用
      openAsHidden: true, // Boolean (可选) mac 表示以隐藏的方式启动应用。~~~~
      // path: '', String (可选) Windows - 在登录时启动的可执行文件。默认为 process.execPath.
      // args: [] String Windows - 要传递给可执行文件的命令行参数。默认为空数组。注意用引号将路径换行。
    });

    // 应用打开时启动第三方程序
    // shell.openPath(startAppUrl);

    // console.log(app.isPackaged);

    // do some things
    // console.log(1111);
    // let win = new BrowserWindow();
    // win.setFullScreen(true);

    // console.log(location.protocol);

    /* 自定义操作事件 */
    // 关闭窗口
    ipcMain.on("close", () => {
      const win = this.electron.mainWindow;
      win.close();
      Log.logger.info("关闭窗口");
      // exec("shutdown /s /t 0");
    });
    // 最大化窗口
    ipcMain.on("max", () => {
      const win = this.electron.mainWindow;
      win.maximize();
    });
    // 最小化窗口
    ipcMain.on("min", () => {
      const win = this.electron.mainWindow;
      win.minimize();
    });
    // 向下还原
    ipcMain.on("restoreDown", () => {
      const win = this.electron.mainWindow;
      win.unmaximize();
    });
    // 退出全屏
    ipcMain.on("exitFullScreen", () => {
      const win = this.electron.mainWindow;
      win.setFullScreen(false);
    });
    // 进入全屏
    ipcMain.on("goFullScreen", () => {
      const win = this.electron.mainWindow;
      win.setFullScreen(true);
    });

    // 打开屏幕键盘
    ipcMain.on("openScreenKeyboard", () => {
      exec("osk.exe");
      // showVirtualKeyboard();
    });

    // 给新窗口发消息
    ipcMain.on("sendMsgMain", (e, msg) => {
      console.log(e, msg);
      // childWin.webContents.send("msgFromMain", msg);
    });

    // 下载文件
    // ipcMain.on("downloadFile",(e,fileName,fileType) => {
    //   // 设置保存路径
    //   const targetFolder = path.join(__dirname,'/download')
    //   let stream = fs.createWriteStream()
    //   request({
    //     url: 'http://106.54.233.201:11005/mg/checkData/exportCheckData?devId=1720&startTime=2024-03-29+00:00:00&endTime=2024-03-30+23:59:59',
    //     method:'GET'
    //   },function (err,res,body) {
    //     fs.writeFile(path.join(targetFolder,`${ fileName }.${ fileType }`,body,function (err) {
    //       if (err) {
    //         console.log(err)
    //       } else {
    //         console.log('文件写入成功')
    //         shell.openPath(path.join(targetFolder,`${ fileName }.${ fileType }`))
    //       }
    //     }))
    //   })
    // });


    
  }

  /**
   * electron app ready
   */
  async electronAppReady() {
    // do some things
  }

  /**
   * main window have been loaded
   */
  async windowReady() {
    // do some things
    // 延迟加载，无白屏
    const winOpt = this.config.windowsOption;
    if (winOpt.show == false) {
      const win = this.electron.mainWindow;

      // 默认全屏
      win.setFullScreen(true);

      win.once("ready-to-show", () => {
        win.show();
        win.focus();
      });
    }
  }

  /**
   * before app close
   */
  async beforeClose() {
    // do some things
    // console.log("111222333");
  }
}

Index.toString = () => "[class Index]";
module.exports = Index;
