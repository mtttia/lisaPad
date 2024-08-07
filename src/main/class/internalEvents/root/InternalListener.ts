import InternalEvent from './InternalEvent'

export default interface InternalListener {
    handleEvent(event: InternalEvent): Promise<void> | void
}
