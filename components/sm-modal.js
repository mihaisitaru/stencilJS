class SmModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._modalBody;
        this._confirmModalButton;
        this._cancelModalButton;
        this._showModalButton;
        this._pageBackground;
        this._isModalVisible = false;
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    justify-content: center;
                }
                :host([visible]) #sm-modal,
                :host([visible]) #page-background {
                    display: block;
                }
                :host([visible]) #sm-modal {
                    display: block;
                    width: 50%;
                    border-radius: 10px;
                }
                #modal-main-section {
                    position: relative;
                    display: flex;
                    justify-content: center;
                    padding: 1rem 0;
                    min-height: 400px;
                }
                ::slotted(h1) {
                    color: blue;
                    margin: 0;
                }
                ::slotted(img) {
                    min-width: 0;
                    max-width: 400px;
                    max-height: 400px;
                    border-radius: 10px;
                }
                #page-background {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0,0,0,0.4);
                    display: none;
                }
                #sm-modal {
                    position fixed;
                    display: none;
                    width: 0;
                    flex-direction: column;
                    justify-content: space-between;
                    background-color: white;
                    border-radius: 0;
                    box-shadow: 1px 2px 5px rgba(0,0,0,0.7);
                    z-index: 100;
                    transition: width 2s;
                }
                header {
                    padding: 1rem;
                    border-bottom: 1px solid #000;
                }
                header h1 {
                    font-size: 1.5rem;
                }
                header h4 {
                    margin: 0;
                }
                #modal-actions {
                    display: flex;
                    border-top: 1px solid #007;
                    padding: 1rem;
                    justify-content: flex-end;
                    box-shadow: 1px 2px 5px rgba(0,0,0,0.7);
                }
                #modal-actions #cancel-modal__button,
                #modal-actions #confirm-modal__button {
                    font-weight: bold;
                    margin: 0.5rem;
                    border-radius: 10px;
                    box-shadow: 1px 2px 5px rgba(0,0,0,0.7);
                    cursor: pointer;
                }
                #modal-actions #cancel-modal__button {
                    color: #fff;
                    background-color: red;
                }
                #modal-actions #confirm-modal__button {
                    color: #fff;
                    background-color: green;
                }
            </style>
            <div id="page-background"></div>
            <div id="sm-modal">
                <header>
                    <slot name="title">
                        <h1>The modal!</h1>
                    </slot>
                    <h4>Something to confirm!</h4>
                </header>
                <section id="modal-main-section">
                    <slot></slot>
                </section>
                <section id="modal-actions">
                    <button id="cancel-modal__button">Cancel</button>
                    <button id="confirm-modal__button">Confirm</button>
                </section>
            </div>
        `;

        this._modalBody = this._querySelector('#sm-modal');

        const slots = this.shadowRoot.querySelectorAll('slot');
        slots[1].addEventListener('slotchange', event => {
            console.dir(slots[1].assignedNodes()[2]);
        });

        slots[1].addEventListener('mouseenter', event => {
            slots[1].assignedNodes()[2].src = 'https://cdn.dribbble.com/users/719060/screenshots/5713089/dribbble.jpg';
        });
        slots[1].addEventListener('mouseleave', event => {
            slots[1].assignedNodes()[2].src = 'https://i.pinimg.com/564x/a3/b1/73/a3b173f9653a78940161c08f92556fbf.jpg';
        });

        this._cancelModalButton = this._querySelector('#cancel-modal__button');
        this._cancelModalButton.addEventListener('click', this._cancel.bind(this));

        this._confirmModalButton = this._querySelector('#confirm-modal__button');
        this._confirmModalButton.addEventListener('click', this._confirm.bind(this));

        this._querySelector('#modal-actions', this._modalBody).appendChild(this._cancelModalButton);
        this._querySelector('#modal-actions', this._modalBody).appendChild(this._confirmModalButton);

        this._pageBackground = this._querySelector('#page-background');
        this._pageBackground.addEventListener('click', this._cancel.bind(this));
        this._showModalButton = this._querySelector('.show-modal__button', document);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'visible') {
            if (this.hasAttribute('visible')) {
                this._isModalVisible = true;
                this._showModal();
            } else {
                this._isModalVisible = false;
                this._showModal();
            }
        }
    }

    static get observedAttributes() {
        return ['visible'];
    }

    disconnectedCallBack() {
        this._cancelModalButton.removeEventListener('click', this._cancel.bind(this));
        this._confirmModalButton.removeEventListener('click', this._cancel.bind(this));
        this._pageBackground.removeEventListener('click', this._cancel.bind(this));
    }

    _appendOrRemoveChild(condition, firstEl) {
        if (firstEl) {
            if (condition) {
                this.shadowRoot.appendChild(firstEl)
            } else {
                this.shadowRoot.removeChild(firstEl);
                this.hide();
            }
        }
    }

    _showModal() {
        this._appendOrRemoveChild(this._isModalVisible, this._pageBackground);
    }

    open() {
        this.setAttribute('visible', '');
        this._showModalButton.textContent = 'Modal is visible!';
    }

    hide() {
        if (this.hasAttribute('visible')) {
            this.removeAttribute('visible');
            this._showModalButton.textContent = 'Show the modal';
        }
    }

    _cancel(event) {
        this.hide();
        // const cancelEvent = new Event('cancel', { bubbles: true, composed: true });
        // event.target.dispatchEvent(cancelEvent);
        const cancelEvent = new Event('cancel');
        this.dispatchEvent(cancelEvent);
    }

    _confirm(event) {
        this.hide();
        // const confirmEvent = new Event('confirm', { bubbles: true, composed: true });
        // event.target.dispatchEvent(confirmEvent);
        const confirmEvent = new Event('confirm');
        this.dispatchEvent(confirmEvent);
    }

    _querySelector(string, root) {
        if (root) {
            return root.querySelector(string);
        }
        return this.shadowRoot.querySelector(string)
    }
}

customElements.define('sm-modal', SmModal);