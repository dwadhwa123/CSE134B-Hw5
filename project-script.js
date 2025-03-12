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

      this.title2 = document.createElement('h2');
      this.title2.textContent = this.getAttribute('title2');
  
      this.link = document.createElement('a');
      this.link.setAttribute('href', this.getAttribute('link-url'));
      this.link.textContent = 'Further Reading';
  
      card.appendChild(this.title2);
      card.appendChild(this.picture);
      card.appendChild(this.description);
      card.appendChild(this.link);
      
      
      shadow.appendChild(card);
    }
  
    static get observedAttributes() {
      return ['img-src', 'alt-text', 'description', 'link-url', 'title2'];
    }
  
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        if (this.title2 && name === 'title2') {
          this.title2.textContent = newValue;
        }
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
      "title2": "Business Game With Ceregem Technologies",
      "img-src": "media/ceregem.png",
      "alt-text": "Ceregem Technologies Logo",
      "description": "I worked with two professors to create a real time game using the UI components that allows players to make business decisions such as cost choices and advertising and gives out profits, sales using a formula. I managed my source control with Git. For example, I use: In order to quickly update the results based on the decisions made by the players, I stored the decisions in MongoDB, which is a database that can store data in a document oriented format and used listeners to see when they were changed. Using these listeners, I could instantaneously update the UI. The reason I used MongoDB is because the information sent between users is fixed into a few decisions so there was no need to overcomplicate it by doing a client-server application.",
      "link-url": "https://www.ceregem.net/blog"
    },
    {
      "title2": "TFIDF Vectorizer to predict MBTI type",
      "img-src": "media/TFIDF.png",
      "alt-text": "TDIDF vectorizer Word Cloud",
      "description": "I created a TDIDF Vectorizer with the purpose of taking in strings representing the post history of the user and using that to predict the Myers Brigss Type Indicator(MBTI) of that user. I used supervised learning to train the model as the code shows below.",
      "link-url": "https://towardsdatascience.com/text-vectorization-term-frequency-inverse-document-frequency-tfidf-5a3f9604da6d/"
    },
    {
      "title2": "Creating a custom NFA",
      "img-src": "media/NFA.png",
      "alt-text": "My Custom NFA",
      "description": "I created a Nondeterminisitc Finite Automatic(NFA) which took in an input of a string and returned the string + 'ab' if of even length or the string minus its last character if of odd length. I really struggled with this project because it was very open ended in terms of the coding aspect and I wans't sure how I wanted to approach it. I thought about making classes/objects to represent the different states but ultimately decided on using boolean values. Even though it wasn't the most difficult project, it really helped refine my process in terms of how to approach a new problem that I haven't faced before.",
      "link-url": "https://www.tutorialspoint.com/automata_theory/non_deterministic_finite_automaton.htm"
    },
    {
      "title2": "Pantry Pal",
      "img-src": "media/PantryPal.png",
      "alt-text": "Wireframe of the Pantry Pal Home Page",
      "description": "I worked with a group of 6 people to create a recipe generating and storing application. We used the Whisper API to take in speech input of ingredients, then using those ingredients, generating a recipe with the Chatgpt API. Along with the recipe, we used the Dalle API to generate images. We used JavaFX for the UI. Finally, we also used a MongoDB server in order to save information from accounts so that you can log into an account from any device. Working on this project helped improve my communication and teamwork as it forced me to compromise and make decisions that everyone could get behind.",
      "link-url": "https://drive.google.com/file/d/1_8gHFzJLfBDduMN5KiIeAtnWTIMVLKbY/view?usp=sharing"
    },
    {
      "title2": "JavaFX project with CRUD operations",
      "img-src": "media/CRUD.png",
      "alt-text": "CRUD operation project home page",
      "description": "I worked with a partner to create a basic contact page that has all of the CRUD(Create, Remove, Update, Delete) operations. The project UI is created using JavaFX with each contact using an HBox.",
      "link-url": "https://en.wikipedia.org/wiki/Create,_read,_update_and_delete"
    }

    

  ];

  localStorage.setItem('projects', JSON.stringify(localData));

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
        card.setAttribute('title2', item.title2);
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


document.getElementById('remote_button').addEventListener('click', loadRemoteData);


