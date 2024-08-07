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
import { ContextNotifier } from '../notifier/ContextNotifier'
import { Network } from '../class/Network'
import { UnPairedDevice } from '../interfaces/IDevice'
import NewDeviceNotifier from '../notifier/NewDeviceNotifier'
import IReplyToDevice from '../interfaces/IReplyToDevice'
import DeviceAskToServerNotifier from '../notifier/DeviceAskToServerNotifier'
import { DeviceServerController } from './DeviceServerController'
import InternalEventRegistry from '../class/internalEvents/root/InternalEventRegistry'
import DeviceChangeEvent from '../class/internalEvents/DeviceChangeEvent'
import NotifyDeviceChangeListener from '../class/internalEvents/NotifyDeviceChangeListener'

export default class WindowController {
    _window: BrowserWindow | null = null
    _notifier: Notifier = new Notifier()
    _server: Server | null = null
    _deviceServerController: DeviceServerController | null = null

    set window(window: BrowserWindow) {
        this._window = window
        this._notifier.clearNotificationWindows()
        this._notifier.pushNotificationWindow(window)

        InternalEventRegistry.register(
            DeviceChangeEvent.getEventName(),
            new NotifyDeviceChangeListener(this._notifier)
        )
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
            this.window.webContents.openDevTools()
        } else {
            this.window.loadFile(join(__dirname, '../renderer/index.html'))
        }

        this.window.on('show', () => {
            this.initialize()
        })
    }

    async initialize() {
        EventAttacher.attachEvents(this)
        await Database.checkDB()
        this.onUpdateDB()
        this._initServer()
    }

    async onUpdateDB() {
        const data = await Database.loadData()
        this._notifier.notify(new DBUpdateNotifier(data.devices, data.setting))
    }

    async _initServer() {
        const setting = await Setting.findOne()
        this._server = new Server(setting?.serverPort || 23967)
        this._server.onStart = this._onServerStarted.bind(this)
        this._server.onStop = this._onServerStop.bind(this)
        this._deviceServerController = new DeviceServerController(
            this._server.deviceServerRoute,
            this._onDeviceAskToServer.bind(this)
        )
        this.attachDeviceActions()
    }

    attachDeviceActions() {
        if (this._deviceServerController) {
            this._deviceServerController.handleEvent()
        } else {
            throw new ApplicationNotInitializedError()
        }
    }

    async onRunServer() {
        if (this._server) {
            await this._server.runServer()
        } else {
            throw new ApplicationNotInitializedError()
        }
    }

    async onStopServer() {
        if (this._server) {
            this._server.stopServer()
        } else {
            throw new ApplicationNotInitializedError()
        }
    }

    async onUpdateDefaultNetwork(name: string) {
        const setting = await Database.loadSetting()
        if (setting) {
            setting.defaultNetName = name
            await setting.save()
            this.onUpdateDB()
        }
    }

    async onResponseDevice(id: number, trust: boolean, allowChat: boolean) {
        const device = await Device.findOne({ where: { id } })
        if (device) {
            device.trust = trust
            device.allowChat = allowChat
            await device.save()
            this.onUpdateDB()
        }
    }

    async onReplyToDevice(reply: IReplyToDevice) {
        if (this._deviceServerController) {
            this._deviceServerController.emit(reply.listener, reply.cod, reply.data)
        } else {
            throw new ApplicationNotInitializedError()
        }
    }

    async _onDeviceAskToServer(listener: string, cod: string, data: any) {
        this._notifier.notify(new DeviceAskToServerNotifier(data, cod, listener))
    }

    _onServerStarted() {
        this._sendContext()
    }

    _sendContext() {
        if (!this._server) {
            throw new ApplicationNotInitializedError()
        }
        const serverStatus = this._server.getServerStatus()
        const network = new Network()
        this._notifier.notify(new ContextNotifier(serverStatus, network))
    }

    _onServerStop() {
        this._sendContext()
    }

    _onNewDeviceConnected(device: UnPairedDevice) {
        const newDevNotifier = new NewDeviceNotifier(device)
        this._notifier.notify(newDevNotifier)
    }
}
