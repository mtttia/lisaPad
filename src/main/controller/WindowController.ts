import { BrowserWindow, shell } from 'electron'
import Database from '../database/Database'
import Device from '../database/Device'
import Setting from '../database/Setting'
import { Notifier } from '../notifier/Notifier'
import DBUpdateNotifier from '../notifier/DBUpdateNotifier'
import { join } from 'path'
import icon from '../../../resources/icon.png?asset'
import { is } from '@electron-toolkit/utils'
import { EventAttacher } from '../events/EventAttacher'
import Server from '../class/Server'
import ApplicationNotInitializedError from '../Errors/ApplicationNotInitializedError'

export default class WindowController {
    _window: BrowserWindow | null = null
    _notifier: Notifier = new Notifier()
    _server: Server | null = null

    set window(window: BrowserWindow) {
        this._window = window
        this._notifier.clearNotificationWindows()
        this._notifier.pushNotificationWindow(window)
    }

    get window(): BrowserWindow | null {
        return this._window
    }

    createWindow() {
        // Create the browser window.
        this.window = new BrowserWindow({
            width: 900,
            height: 670,
            show: false,
            autoHideMenuBar: true,
            ...(process.platform === 'linux' ? { icon } : {}),
            webPreferences: {
                preload: join(__dirname, '../preload/index.js'),
                sandbox: false,
                nodeIntegration: true
            }
        })

        this.window.on('ready-to-show', () => {
            this.window!.show()
        })

        this.window.webContents.setWindowOpenHandler((details) => {
            shell.openExternal(details.url)
            return { action: 'deny' }
        })

        // HMR for renderer base on electron-vite cli.
        // Load the remote URL for development or the local html file for production.
        if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
            this.window.loadURL(process.env['ELECTRON_RENDERER_URL'])
            //this.window.webContents.openDevTools()
        } else {
            this.window.loadFile(join(__dirname, '../renderer/index.html'))
        }

        this.initialize()
    }

    async initialize() {
        EventAttacher.attachEvents(this)
        await Database.checkDB()
        this.onUpdateDB(await Database.loadData())
        this._initServer()
    }

    onUpdateDB(data: { devices: Device[]; setting: Setting }) {
        this._notifier.notify(new DBUpdateNotifier(data.devices, data.setting))
    }

    async _initServer() {
        const setting = await Setting.findOne()
        this._server = new Server(setting?.serverPort || 23967)
        this._server.onStart = this._onServerStarted.bind(this)
    }

    async onRunServer() {
        if (this._server) {
            await this._server.runServer()
        } else {
            throw new ApplicationNotInitializedError()
        }
    }

    _onServerStarted() {
        this._notifier.notify({ notify: () => ({ channel: 'server-status', body: true }) })
    }
}
