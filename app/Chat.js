class Chat extends EventEmiter {

    constructor(ownerName, messages) {
        super()
        this.chat = createElement('div', 'chat')
        this.chatContent = createElement('div', 'chat-content')
        this.chatForm = createElement('div', 'chat-form')
        this.chat.append(this.chatContent, this.chatForm)
        this.ownerName = ownerName

        this.initForm()
        this.initContent(messages)
        super.createEvent('message')
    }

    toggle(){
        this.chat.classList.toggle('chat--open')
    }

    initForm() {
        const textarea = createElement('textarea', 'chat-form__textarian')

        const button = createElement('button', 'chat-form__btn')
        button.innerText = 'Отправить'
        button.addEventListener('click', () => {
            if(!textarea.value) return
            const messageData = { text: textarea.value, date: Date.now(), userName: this.ownerName, userPhoto: './1.jpg' }
            this.appendMessage(messageData)
            super.dispatch('message', messageData)
            textarea.value = '';
        })

        this.chatForm.append(textarea, button)
    }

    initContent(messages) {
        for (let message of messages) {
            this.appendMessage(message)
        }
    }

    appendMessage(message) {
        let messagesClass = 'chat-message '
        if (message['userName'] === this.ownerName) messagesClass += 'chat-message--my'

        const date = new Date(message['date'])
        const messageHtml = `
            <div class="${messagesClass}">
                <img class="chat-message__photo" src="${message['userPhoto']}" alt="Фото пользователя">
                <div class="chat-message__text">
                    <h4 class="chat-message__login">${message['userName']}</h4>
                    <p>${message['text']}</p>
                    <span class="chat-message__date">${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}</span>
                </div>
            </div>`

        this.chatContent.innerHTML += messageHtml

    }

    render(el) {
        el.append(this.chat)
    }
}