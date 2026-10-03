class TimelineSection extends HTMLElement {
  #date
  #title
  #description

  #main

  constructor() {
    super();
  }

  connectedCallback() {
    if (this.#date && this.#title && this.#description) return;

    const section = document.createElement('section');
    section.className = 'x-timeline-section';

    this.#date = document.createElement('div');
    this.#date.className = 'x-timeline-section-date';

    const content = document.createElement('div');
    content.className = 'x-timeline-section-content';
    
    const article = document.createElement('article');
    article.className = 'x-timeline-article';
    
    const aside = document.createElement('aside');
    aside.className = 'x-timeline-aside';
    const dot = document.createElement('div');
    dot.className = 'x-timeline-dot';
    const line = document.createElement('div');
    line.className = 'x-timeline-line';
    aside.append(dot, line);
    
    this.#main = document.createElement('main');
    this.#main.className = 'x-timeline-main';
    this.#title = document.createElement('h2');
    this.#description = document.createElement('p');
    this.#description.className = "text-section";
    this.#main.append(this.#title, this.#description);

    article.append(aside, this.#main);
    
    content.appendChild(article);

    section.append(this.#date, content)

    this.insertBefore(section, this.firstChild);
    this.update();
  }

  update() {
    if (!this.#date || !this.#title || !this.#description || !this.#main) return;

    this.#date.innerText = this.getAttribute('date');
    this.#title.innerText = this.getAttribute('title');
    this.#description.innerText = this.getAttribute('description');

    const subtitle = this.getAttribute('subtitle');
    const notes = this.getAttribute('notes');
    if (subtitle && notes) {
      const subtitleEle = document.createElement('h3');
      subtitleEle.className = 'x-timeline-subtitle';
      subtitleEle.innerHTML = subtitle;
      this.#main.appendChild(subtitleEle);
      let notesArr;
      try {
        notesArr = JSON.parse(notes);
      } catch (e) {
        console.error(e);
        return;
      }
      const notesEle = document.createElement('ul');
      notesEle.className = 'text-section x-timeline-notes';
      for (const note of notesArr) {
        const noteEle = document.createElement('li');
        noteEle.innerText = note;
        notesEle.appendChild(noteEle);
      }
      this.#main.appendChild(notesEle);
    }
  }

  static get observedAttributes() {
    return ['date', 'title', 'description'];
  }

  attributeChangedCallback() {
    this.update();
  }

  set date(value) {
    if (this.getAttribute('date') !== value) {
      this.setAttribute('date', value);
    }
  }

  get date() {
    return this.getAttribute('date');
  }

  set title(value) {
    if (this.getAttribute('title') !== value) {
      this.setAttribute('title', value);
    }
  }

  get title() {
    return this.getAttribute('title');
  }

  set description(value) {
    if (this.getAttribute('description') !== value) {
      this.setAttribute('description', value);
    }
  }

  get description() {
    return this.getAttribute('description');
  }

  set subtitle(value) {
    if (this.getAttribute('subtitle') !== value) {
      this.setAttribute('subtitle', value);
    }
  }

  get subtitle() {
    return this.getAttribute('subtitle');
  }

  set notes(value) {
    if (this.getAttribute('notes') !== value) {
      this.setAttribute('notes', value);
    }
  }

  get notes() {
    return this.getAttribute('notes');
  }
}

export const registerTimelineSection = () => 
  customElements.define('x-timeline-section', TimelineSection);
