export class IDManager {
    _activeIDS: Record<number, boolean>
    _firstId = 0
    _nextFreeId

    constructor() {
        this._activeIDS = []
        this._nextFreeId = this._firstId
    }

    generateId(): number {
        const id = this._nextFreeId
        this._activeIDS[id] = true
        this._calcNextId()
        return id
    }

    free(id: number) {
        this._activeIDS[id] = false
        if (id < this._nextFreeId) {
            this._nextFreeId = id
        }
    }

    _calcNextId() {
        const found = Object.keys(this._activeIDS).some((id) => {
            if (this._activeIDS[id] === false) {
                this._nextFreeId = id
                return true
            }
            return false
        })
        if (!found) {
            this._nextFreeId = Math.max(...(Object.keys(this._activeIDS) as any[])) + 1
        }
    }
}
