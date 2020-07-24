class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipContainer;
        this._tooltipText = '👻';
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
            .eye-tooltip {
                position: relative;
                cursor: pointer;
            }
            .tooltip-content {
                position: absolute;
                margin-left: 5px;
                background-color: black;
                color: white;
                border-radius: 5px;
                z-index: 10;
            }
            .tooltip-content::before {
                content: "";
                position: absolute;
                top: 27%;
                left: 0%;
                margin-left: -9px;
                border-width: 5px;
                border-style: solid;
                border-color: #000 transparent transparent transparent;
                transform: rotate(90deg);
            }
        </style>
        <slot>Boooo</slot>
        <span>👀</span>`;
    }

    connectedCallback() {
        if (this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }

        const tooltipIcon = this.shadowRoot.querySelector('span');
        tooltipIcon.classList.add('eye-tooltip')
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        this.shadowRoot.appendChild(tooltipIcon);
    }

    _showTooltip() {
        this._tooltipContainer = document.createElement('span');
        this._tooltipContainer.classList.add('tooltip-content');
        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this._tooltipContainer);
    }



    _hideTooltip() {

        this.shadowRoot.removeChild(this._tooltipContainer);

    }

}



customElements.define('eyes-tooltip', Tooltip);