const { screen } = require("electron/main");

// 打开屏幕键盘
function showVirtualKeyboard() {
  const displays = screen.getAllDisplays();
  const externalDisplay = displays.find(
    (display) => display.bounds.x !== 0 || display.bounds.y !== 0
  );

  if (externalDisplay) {
    screen.getCursorScreenPoint();
    screen.dock.show();
  }
}

// 关闭屏幕键盘
function hideVirtualKeyboard() {
  const displays = screen.getAllDisplays();
  const externalDisplay = displays.find(
    (display) => display.bounds.x !== 0 || display.bounds.y !== 0
  );

  if (externalDisplay) {
    screen.dock.hide();
  }
}
