import { app, BrowserWindow } from "electron";
import * as path from "path";
const isDev = true;
let mainWindow: BrowserWindow | null = null;
const BASE_URL = "http://localhost:5173";

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    webPreferences: {
      devTools: isDev,
      nodeIntegration: true,
      contextIsolation: false,
    //   preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    console.log("isDev", isDev);
    mainWindow.loadURL(BASE_URL);
    mainWindow.webContents.openDevTools({ mode: "detach" });
} else {
      console.log("isDev", isDev);
    console.log("isProd", process.env.NODE_ENV);
    mainWindow.loadFile(path.join(__dirname, "../index.html"));
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});