import InternalEventRegistry from './InternalEventRegistry'

export default class InternalEvent {
    static getEventName(): string {
        return 'InternalEvent'
    }

    public getEventName() {
        return (this.constructor as typeof InternalEvent).getEventName()
    }

    public dispatch() {
        InternalEventRegistry.dispatch(this)
    }
}
