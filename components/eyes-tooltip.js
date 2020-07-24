class Tooltip extends HTMLElement {
    constructor() {
        super();
        this._tooltipIcon;
        this._tooltipVisible = false;
        this._tooltipText = '👻';
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                position: relative;
                cursor: pointer;
            }
            :host-context(span) {
                font-weight: 900;
            }
            .tooltip-content {
                position: absolute;
                margin-left: 5px;
                background-color: black;
                color: white;
                border-radius: 5px;
                box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.7);
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

        this._tooltipIcon = this.shadowRoot.querySelector('span');
        this._tooltipIcon.classList.add('eye-tooltip')
        this._tooltipIcon.addEventListener('mouseenter', this._toggleTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseleave', this._toggleTooltip.bind(this));
        this._render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }

        if (name === 'text') {
            this._tooltipText = newValue;
        }
    }

    static get observedAttributes() {
        return ['text'];
    }

    disconnectedCallback() {
        this._tooltipIcon.removeEventListener('mouseenter', this._toggleTooltip.bind(this));
        this._tooltipIcon.removeEventListener('mouseleave', this._toggleTooltip.bind(this));
    }

    _render() {
        let tooltipContainer = this.shadowRoot.querySelector('.tooltip-content');;
        if (this._tooltipVisible) {
            tooltipContainer = document.createElement('span');
            tooltipContainer.classList.add('tooltip-content');
            tooltipContainer.textContent = this._tooltipText;
            this.shadowRoot.appendChild(tooltipContainer);
        } else {
            if (tooltipContainer) {
                this.shadowRoot.removeChild(tooltipContainer);
            }
        }
    }

    _toggleTooltip() {
        this._tooltipVisible = !this._tooltipVisible;
        this._render();
    }
}



customElements.define('eyes-tooltip', Tooltip);