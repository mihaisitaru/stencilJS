class ShowMoreInfo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._showMoreInfoContainer;
        this._moreInfoText = 'More information!';
        this._isInfoVisible = true;
        this.shadowRoot.innerHTML = `
        <style>
            .show-button {
                border-radius: 10px;
                cursor: pointer;
                box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.7);
            }
        </style>
            <div><button class="show-button">Show</button></div>
            <div><slot>Click on the button to display more info!</slot></div>
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