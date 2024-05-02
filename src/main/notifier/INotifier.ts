export interface INotifier {
  notify(): INotification
}

export interface INotification {
  channel: string
  body: unknown
}
