export default class ApplicationNotInitializedError extends Error {
    constructor() {
        super('Application not initialized')
        this.name = 'ApplicationNotInitializedError'
    }
}
