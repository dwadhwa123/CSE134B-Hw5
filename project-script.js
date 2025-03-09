class ProjectCard extends HTMLElement {
    constructor() {
      super();
      // Attach shadow DOM for scoped styles
      const shadow = this.attachShadow({ mode: 'open' });

      const style = document.createElement('style');
      style.textContent = `
        :host {
          --card-bg: plum;
          --card-border: 2px solid black;
          --card-padding: 20px;
          --card-width: 80vw; 
          --card-margin: auto;
          --title-font: 'Arial', sans-serif;
          --description-color: black;
          --link-color: blue;
          --link-hover-color: red;
  
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background-color: var(--card-bg);
          border: var(--card-border);
          border-radius: 8px;
          padding: var(--card-padding);
          width: var(--card-width);
          margin: var(--card-margin);
          margin-bottom: 10px;
        }
  
        h2 {
          font-family: var(--title-font);
          font-size: 1.5rem;
          margin: 0;
          padding: 10px;
        }
  
        picture {
          width: 50%;
          margin-bottom: 15px;
        }
  
        img {
          width: 50%;
          height: auto;
          border-radius: 5px;
          object-fit: cover;
        }
  
        p {
          color: var(--description-color);
          font-size: 1rem;
          margin-bottom: 15px;
        }
  
        a {
          color: var(--link-color);
          text-decoration: none;
        }
  
        a:hover {
          color: var(--link-hover-color);
        }
      `;

      shadow.appendChild(style);
  
      // Create the structure of the card
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
  
      // Project Name
      const title = document.createElement('h2');
      title.textContent = this.getAttribute('title');
  
      // Picture
      const picture = document.createElement('picture');
      const img = document.createElement('img');
      img.setAttribute('src', this.getAttribute('img-src'));
      img.setAttribute('alt', this.getAttribute('alt-text'));
      picture.appendChild(img);
  
      // Description
      const description = document.createElement('p');
      description.textContent = this.getAttribute('description');
  
      // Hyperlink for more details
      const link = document.createElement('a');
      link.setAttribute('href', this.getAttribute('link-url'));
      link.textContent = 'Further Reading';
  
      // Append everything to the shadow root
      card.appendChild(title);
      card.appendChild(picture);
      card.appendChild(description);
      card.appendChild(link);
      
      shadow.appendChild(card);
    }
  
    static get observedAttributes() {
      return ['title', 'img-src', 'alt-text', 'description', 'link-url'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        this.shadowRoot.querySelector(name).textContent = newValue;
      }
    }
  }
  
  customElements.define('project-card', ProjectCard);
  