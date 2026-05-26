class InfoSection extends HTMLElement {
  #row
  #left
  #right

  constructor() {
    super();
  }

  connectedCallback() {
    if (this.#row && this.#left && this.#right) return;
    
    this.#row = document.createElement('div');
    this.#row.className = 'x-info-section-row';
    // 'p' > inner 'span' (footnote)
    const leftCol = document.createElement('p');
    leftCol.className = 'x-info-section-left-col';
    const leftColSpan = document.createElement('span');
    leftCol.appendChild(leftColSpan)
    // 'aside' > 'p'
    const rightCol = document.createElement('aside');
    rightCol.className = 'x-info-section-aside x-info-section-right-col';
    const rightColP = document.createElement('p');
    rightCol.appendChild(rightColP);
    this.#left = leftCol;
    // Specifically assign the 'p' element for simplicity
    this.#right = rightColP;
    this.#row.appendChild(leftCol);
    this.#row.appendChild(rightCol);

    this.insertBefore(this.#row, this.firstChild);
    this.update();
  }

  update() {
    if (!this.#row || !this.#left || !this.right) return;

    let leftVal;
    if (this.getAttribute('footnote')) {
      leftVal = this.getAttribute('left')
        .replace('%s', `<span class="x-info-section-footnote">${this.getAttribute('footnote')}</span>`);
    }

    this.#left.innerHTML = leftVal ?? this.getAttribute('left');
    this.#right.innerHTML = this.getAttribute('right');
  }

  static get observedAttributes() {
    return ['left', 'right', 'footnote'];
  }

  attributeChangedCallback() {
    this.update();
  }

  set left(value) {
    if (this.getAttribute('left') !== value) {
      this.setAttribute('left', value);
    }
  }

  get left() {
    return this.getAttribute('left');
  }


  set right(value) {
    if (this.getAttribute('right') !== value) {
      this.setAttribute('right', value);
    }
  }

  get right() {
    return this.getAttribute('right');
  }


  set footnote(value) {
    if (this.getAttribute('footnote') !== value) {
      this.setAttribute('footnote', value);
    }
  }

  get footnote() {
    return this.getAttribute('footnote');
  }
}

export const registerInfoSection = () => 
  customElements.define('x-info-section', InfoSection);
