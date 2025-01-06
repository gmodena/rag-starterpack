type UserType = 'user' | 'bot';

interface ResponseData {
    response: {
        message: {
            content: string;
        };
    };
}

class ChatInterface {
    private backendUrl: string;
    private chatContainer: HTMLElement | null;
    private queryInput: HTMLInputElement | null;
    private sendButton: HTMLButtonElement | null;

    constructor(options: { backendUrl: string }) {
        this.backendUrl = options.backendUrl;
        this.chatContainer = document.getElementById('chatContainer');
        this.queryInput = document.getElementById('queryInput') as HTMLInputElement | null;
        this.sendButton = document.getElementById('sendButton') as HTMLButtonElement | null;

        this.initEventListeners();
    }

    private initEventListeners(): void {
        if (this.sendButton) {
            this.sendButton.addEventListener('click', () => this.sendMessage());
        }
        if (this.queryInput) {
            this.queryInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }
    }

    private addMessage(text: string, type: UserType = 'user'): void {
        if (!this.chatContainer) return;

        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        this.chatContainer.appendChild(message);
        this.scrollToBottom();
    }

    private scrollToBottom(): void {
        if (this.chatContainer) {
            this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
        }
    }

    private async sendMessage(): Promise<void> {
        const query = this.queryInput?.value.trim();
        if (!query) return;

        this.addMessage(query, 'user');
        if (this.queryInput) {
            this.queryInput.value = '';
        }

        try {
            const response = await fetch(this.backendUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                throw new Error('Failed to get response from the server.');
            }

            const data = await response.json();
            this.addMessage(data.message.content, 'bot');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            this.addMessage(`Error: ${errorMessage}`, 'bot');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ChatInterface({
        backendUrl: 'http://localhost:3000/query'
    });
});