class ShowMoreInfo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._showMoreInfoContainer;
        this._moreInfoText = 'More information!';
        this._isInfoVisible = false;
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                background-color: lightgray;
            }
            :host(.more-info) {
                background-color: var(--color-primary, #000);
            }
            .show-button {
                border-radius: 10px;
                cursor: pointer;
            }
            ::slotted(.click-info) {
                color: gray;
            }
        </style>
            <button class="show-button">Show</button>
            <slot>Click the button!</slot>
        `;
        this._showInfoButton = this.shadowRoot.querySelector('.show-button');
        this._showInfoButton.addEventListener('click', this._showMoreInfoText.bind(this));
        this._showMoreInfoContainer = document.createElement('p');
        this._showMoreInfoContainer.textContent = this._moreInfoText;
        this.shadowRoot.appendChild(this._showInfoButton);
    }

    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._moreInfoText = this.getAttribute('text');
        }

        if (this.hasAttribute('is-visible') && this.getAttribute('is-visible') === 'true') {
            this._isInfoVisible = Boolean(this.getAttribute('is-visible'));
        }

        if (this._isInfoVisible) {
            this._appendOrRemoveChild(this._isInfoVisible, this._showMoreInfoContainer);
        }
    }

    disconnetedCallback() {
        this._showInfoButton.removeEventListener('click', this._showMoreInfoText.bind(this));
    }

    _showMoreInfoText() {
        this._isInfoVisible = !this._isInfoVisible;
        this._appendOrRemoveChild(this._isInfoVisible, this._showMoreInfoContainer);
    }

    _appendOrRemoveChild(condition, element) {
        this._showInfoButton.textContent = this._isInfoVisible ? 'Hide' : 'Show';
        condition ? this.shadowRoot.appendChild(element) : this.shadowRoot.removeChild(element);
    }
}

customElements.define('show-more-info', ShowMoreInfo);