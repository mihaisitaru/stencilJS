class ConfirmLink extends HTMLAnchorElement {
    connectedCallback() {
        this.addEventListener('click', event => {
            if (!confirm('Do you want to open google.com in a new tab?')) {
                event.preventDefault();
            }
        });
    }
}

customElements.define('confirm-link', ConfirmLink, { extends: 'a' });