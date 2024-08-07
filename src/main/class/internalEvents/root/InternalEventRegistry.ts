import Pair from '../../Pair'
import InternalEvent from './InternalEvent'
import InternalListener from './InternalListener'

export default abstract class InternalEventRegistry {
    static listeners: Pair<string, InternalListener>[] = []

    static register(eventName: string, listener: InternalListener) {
        this.listeners.push(new Pair(eventName, listener))
    }

    static dispatch(event: InternalEvent) {
        this.listeners.forEach((pair) => {
            if (pair.getFirst() === event.getEventName()) {
                pair.getSecond().handleEvent(event)
            }
        })
    }
}
