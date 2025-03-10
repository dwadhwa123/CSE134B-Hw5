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
          margin-top: 10px;
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
      const card = document.createElement('div');
      card.setAttribute('class', 'card');


      this.picture = document.createElement('picture');
      this.img = document.createElement('img');
      this.img.setAttribute('src', this.getAttribute('img-src'));
      this.img.setAttribute('alt', this.getAttribute('alt-text'));
      this.picture.appendChild(this.img);
  
      this.description = document.createElement('p');
      this.description.textContent = this.getAttribute('description');

      // this.title = document.createElement('h2');
      // this.title.innerText = this.getAttribute('title');
  
      this.link = document.createElement('a');
      this.link.setAttribute('href', this.getAttribute('link-url'));
      this.link.textContent = 'Further Reading';
  
      // card.appendChild(this.title);
      card.appendChild(this.picture);
      card.appendChild(this.description);
      card.appendChild(this.link);
      
      shadow.appendChild(card);
    }
  
    static get observedAttributes() {
      return ['img-src', 'alt-text', 'description', 'link-url'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        // if (this.title && name === 'title') {
        //   this.title.innerText = newValue;
        // }
        if (this.img && name === 'img-src') {
          this.img.src = newValue;
        }
        if (this.img && name === 'alt-text') {
          this.img.alt = newValue;
        }
        if (this.description && name === 'description') {
          this.description.textContent = newValue;
        }
        if (this.link && name === 'link-url') {
          this.link.href = newValue;
        }
      }
    }
  }
  
  customElements.define('project-card', ProjectCard);
  
  const localData = [
    {
      "img-src": "media/ceregem.png",
      "alt-text": "Ceregem Logo",
      description: "I worked with two professors to create a real time game using the UI components that allows players to make business decisions such as cost choices and advertising and gives out profits, sales using a formula. I managed my source control with Git. For example, I use: In order to quickly update the results based on the decisions made by the players, I stored the decisions in MongoDB, which is a database that can store data in a document oriented format and used listeners to see when they were changed. Using these listeners, I could instantaneously update the UI. The reason I used MongoDB is because the information sent between users is fixed into a few decisions so there was no need to overcomplicate it by doing a client-server application.",
      "link-url": "https://www.ceregem.net/blog"
    }
  ];

  localStorage.setItem('projects', JSON.stringify(localData));

  const loadLocalData = () => {
    const data = JSON.parse(localStorage.getItem('projects'));
    renderCards(data);
  };

  const renderCards = (data) => {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = ''; 
    
    if (Array.isArray(data)) {
      data.forEach(item => {
        const card = document.createElement('project-card');
        card.setAttribute('img-src', item['img-src']);
        card.setAttribute('alt-text', item['alt-text']);
        card.setAttribute('description', item.description);
        card.setAttribute('link-url', item['link-url']);
        cardsContainer.appendChild(card);
      });
    } else {
      console.error('Data is not an array:', data);
    }
  };
  document.getElementById('local_button').addEventListener('click', loadLocalData);


  const remoteDataUrl = 'https://api.jsonbin.io/v3/b/67ce3c55acd3cb34a8f7dcb3';
  const apiKey = '$2a$10$RXOoSYr5h1E/sr.OEIobaeI5Sec87hHDagu4lsE2nlTviwlcM93Nm';


  const loadRemoteData = async () => {
    try {
      const response = await fetch(remoteDataUrl, {
        headers: {
          'X-Master-Key': apiKey, 
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data from JSONBin');
      }
  
      const data = await response.json();
      const projectData = data.record.project_data; 
      renderCards(projectData); 
    } catch (error) {
      console.error('Error loading remote data:', error);
    }
  };

document.getElementById('remote_button').addEventListener('click', loadRemoteData);


