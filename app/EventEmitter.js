class EventEmiter{
    events = {}

    createEvent(eventName){
        this.events[eventName] = []
    }

    addEventListener(eventName, handler){
        this.events[eventName].push(handler)
    }

    dispatch(eventName, data){
        const handlers = this.events[eventName]
        for (const handler of handlers) {
            handler(data)
        }
    }
}