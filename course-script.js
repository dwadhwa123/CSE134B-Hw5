class CourseDescription extends HTMLElement {
    constructor() {
        super();
        // Attach shadow DOM for scoped styles
        const shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('style');
        style.textContent = `
        :host {
            --card-bg: lightgreen;
            --card-border: 2px solid black;
            --card-padding: 20px;
            --card-width: 80vw; 
            --card-margin: auto;
            --title-font: 'Arial', sans-serif;
            --description-color: black;

            display: flex;
            flex-direction: column;
            align-items: center; /* Keep the h3 centered */
            text-align: center; /* Default alignment for text */
            background-color: var(--card-bg);
            border: var(--card-border);
            border-radius: 8px;
            padding: var(--card-padding);
            width: var(--card-width);
            margin: var(--card-margin);
            margin-top: 10px;
            margin-bottom: 10px;
        }

        h3 {
            font-family: var(--title-font);
            font-size: 1.5rem;
            margin: 0;
            padding: 10px;
            text-align: center; 
        }

        p {
            color: var(--description-color);
            font-size: 1rem;
            margin-bottom: 15px;
            text-align: left; /* Align description to the left */
            width: 100%; /* Ensure the paragraph takes full width */
        }

        ul {
            list-style-type: disc;
            padding-left: 20px;
            font-size: 1rem;
            color: #333;
            text-align: left; 
            margin-left: 0; 
            width: 100%; 
        }

        @media (max-width: 500px) {
            h3 {
                font-size: 1.2rem;
            }
        }

        @media (max-width: 768px) {
            h3 {
                font-size: 1.4rem;
            }
        }

        @media (max-width: 900px) {
            h3 {
                font-size: 1.4rem;
            }
        }

        @media (max-width: 1300px) {
            h3 {
                font-size: 1.5rem;
            }
        }

        `;
        shadow.appendChild(style);

        this.card = document.createElement('div');
        this.card.setAttribute('class', 'card');

        this.courseName = document.createElement('h3');
        this.description = document.createElement('p');
        this.objectives = document.createElement('ul');

        this.card.appendChild(this.courseName);
        this.card.appendChild(this.description);
        this.card.appendChild(this.objectives);

        // Attach the card to the shadow root
        shadow.appendChild(this.card);
    }

    static get observedAttributes() {
        return ['course-name', 'description', 'objectives'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (name) {
                case 'course-name':
                    this.courseName.textContent = newValue;
                    break;
                case 'description':
                    this.description.textContent = newValue;
                    break;
                case 'objectives':
                    this.objectives.innerHTML = '';  // Clear previous objectives
                    const objectives = newValue.split(';');
                    objectives.forEach(obj => {
                        const listItem = document.createElement('li');
                        listItem.textContent = obj.trim();
                        this.objectives.appendChild(listItem);
                    });
                    break;
            }
        }
    }
}

customElements.define('course-description', CourseDescription);


  
const courseData = {
    "math": [
      {
        "courseName": "CSE 107: Introduction to Modern Cryptography",
        "description": "This course is an introduction to modern cryptography. Cryptography, broadly speaking, is about communicating in the presence of an adversary, with goals like preservation of privacy and integrity of communicated data. It covers symmetric (private key) and asymmetric (public key) cryptography, including block ciphers, symmetric encryption, hash functions, message authentication, authenticated encryption, asymmetric encryption, digital signatures, RSA and discrete-logarithm-based systems, certificates, public-key infrastructure, key distribution, and various applications and protocols including commitment and secure computation.",
        "objectives": "Symmetric and Asymmetric Encryption; Securing a Message; Ensuring confidentiality"
      },
      {
        "courseName": "Math 183: Statistical Methods",
        "description": "This course is a post-calculus introduction to probability and statistics. It starts discussing the probability theory, diving into basic rules, conditional probability, Bayes' rule and more. Later, it goes into one and two sample means and proprotions, chi squares, and variance analysis.",
        "objectives": "Learn common distributions; Probability Rules; Confidence Intervals and Hypothesis Testing"
      }, 
      {
        "courseName": "Math 18: Linear Algebra",
        "description": "Matrix algebra, Gaussian elimination, determinants, linear and affine subspaces, bases of Euclidean spaces. Eigenvalues and eigenvectors, quadratic forms, orthogonal matrices, diagonalization of symmetric matrices. Applications. Computing symbolic and graphical solutions using MATLAB. This course teaches these concepts and is very rigorous when it comes to problem solving.",
        "objectives": "Explore linear transformations; Study matrix theory; Work with vector spaces"
      }, 
    ],
    "intro": [
      {
        "courseName": "CSE11 Accelerated Introduction to Programming",
        "description": "In this course, you will learn to write, trace, and test programs; explore the interactions between programs and data; and practice organizing programs for clarity and re-use. We will explore these topics interactively in lecure, you will implement programs to practice your programming skills, and you will reflect on this learning through your own program designs",
        "objectives": "Data structures, Variables, Methods; Master control flow using loops; Basic Object Oriented Principles"
      },
      {
        "courseName": "CSE15L Software Tools and Techniques",
        "description": "This course introduces fundamental software engineering tools and techniques, focusing on command-line skills, debugging, and version control, preparing students for more advanced computer science courses. There are weekly labs which allow for practice of these skills.",
        "objectives": "Using git for version control; vim for editing files; Mastery of using the command line"
      },
      {
        "courseName": "CSE30 Intro to Computer Systems",
        "description": "CSE 30 introduces you to an exciting range of materials from the broad field of systems programming, including 1) the basics of how a single program executes on a computer, 2) higher-level programming in C, and 3) assembly-language programming. Unlike other intro programming courses, it goes into further depth about individual coding instructions.",
        "objectives": "Learn the inner workings of a C program; Learn to read and understand assembly; Use GDB and GNU debuggers"
      }

    ],

    "advanced": [
        {
            "courseName": "CSE110 Software Engineering",
            "description": "The timely construction of a quality software system that meets a customer's needs, is challenging. In this course you will get an introduction to team-based software engineering and development methods, including specification, design, implementation, testing, and software process.  The course emphasizes team development, agile methods, software design, and use of tools such as IDE's, version control, test harnesses, and continuous integration.",
            "objectives": "Understand software engineering concepts such as Milestones and Iterations; Learn to collaborate and compromise to build a product; Building clean code, testing thoroughly"
          },
          {
            "courseName": "CSE123 Computer Networks",
            "description": "CSE123 provides an introduction to the concepts, principles, and practice of computer communication networks with examples from existing architectures, protocols, and standards. Topics include layering and the OSI model; switching; local, metropolitan, and wide area networks; datagrams and virtual circuits; routing and congestion control; and internetworking",
            "objectives": "Learn about data transmission, communication protocols; Explore the OSI and TCP/IP Models; Study Routing and Network Security"
          },
          {
            "courseName": "CSE160 Intro to Parallel Computing",
            "description": "This course aims to provide knowledge and hands-on experience in developing software for processors with parallel computing resources. A parallel processor has the hardware ability to allow many threads to execute simultaneously. All assignments include programming a parallel system using OpenCL, a popular open-source C/C++ like language for parallel programming.",
            "objectives": "Learn about parallel programming principles; Understand synchronization and communication; Develop parallel models to speed up tasks"
          }
    ]
  }

  function createCourseDescription(course) {
    const courseDescription = document.createElement('course-description');
    courseDescription.setAttribute('course-name', course.courseName);
    courseDescription.setAttribute('description', course.description);
    courseDescription.setAttribute('objectives', course.objectives);
    return courseDescription;
  }

  function loadCourses(category) {
    const container = document.getElementById('course-container');
    container.innerHTML = ''; 

    const courses = courseData[category];
    
    courses.forEach(course => {
      const courseElement = createCourseDescription(course);
      container.appendChild(courseElement);
    });
  }

  document.getElementById('math_button').addEventListener('click', function() {
    loadCourses('math');
  });

  document.getElementById('intro_button').addEventListener('click', function() {
    loadCourses('intro');
  });

  document.getElementById('advanced_button').addEventListener('click', function() {
    loadCourses('advanced');
  });
