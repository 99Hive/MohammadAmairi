// ===============
//  MOBILE NAV TOGGLE
// ===============
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });
  });
  
  // ===============
  //  SMOOTH SCROLL
  // ===============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
  
      // Close mobile nav after clicking (on small screens)
      const navLinks = document.querySelector('.nav-links');
      if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
      }
    });
  });
  
  // ===============
  //  BG CHANGING (ROTATING IMAGES)
  // ===============
  const mountainImages = [
    "m1.jpg",  // Must exist in same folder
    "m5.jpg", 
    "m6.jpg"
  ];
  
  // Preload images to avoid flickers
  const preloaded = [];
  mountainImages.forEach((src) => {
    const img = new Image();
    img.src = src;
    preloaded.push(img);
  });
  
  let currentIndex = 0;
  const heroSection = document.querySelector(".hero");
  
  function changeHeroBackground() {
    currentIndex = (currentIndex + 1) % mountainImages.length;
    heroSection.style.backgroundImage = `url(${mountainImages[currentIndex]})`;
  }
  
  // Change background every 10 seconds (10000 ms)
  setInterval(changeHeroBackground, 10000);
  

  
  // ===============
  //  TIC-TAC-TOE GAME
  // ===============
  document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const statusText = document.getElementById("status");
    const restartButton = document.getElementById("restart-button");
  
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X"; // Player starts as "X"
    let isGameActive = true;
  
    const winningConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
  
    function checkWin(board, player) {
      return winningConditions.some(condition => {
        return condition.every(index => board[index] === player);
      });
    }
  
    function isDraw(board) {
      return board.every(cell => cell !== "");
    }
  
    // Minimax algorithm
    function minimax(newBoard, player) {
      const availableMoves = newBoard.reduce((acc, cell, index) => {
        if (cell === "") acc.push(index);
        return acc;
      }, []);
  
      // Terminal states (win, lose, draw)
      if (checkWin(newBoard, "O")) return { score: 10 };
      if (checkWin(newBoard, "X")) return { score: -10 };
      if (isDraw(newBoard)) return { score: 0 };
  
      const moves = [];
      for (let i = 0; i < availableMoves.length; i++) {
        const moveIndex = availableMoves[i];
        newBoard[moveIndex] = player;
        const result = minimax(newBoard, player === "X" ? "O" : "X");
        moves.push({ index: moveIndex, score: result.score });
        newBoard[moveIndex] = ""; // reset
      }
  
      let bestMove;
      if (player === "O") {
        // Maximize score
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
          if (moves[i].score > bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      } else {
        // Minimize score
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
          if (moves[i].score < bestScore) {
            bestScore = moves[i].score;
            bestMove = i;
          }
        }
      }
      return moves[bestMove];
    }
  
    // Handle cell clicks
    function handleCellClick(e) {
      const clickedCell = e.target;
      const clickedIndex = parseInt(clickedCell.getAttribute("data-index"));
  
      if (gameState[clickedIndex] !== "" || !isGameActive) return;
  
      // Player's move
      gameState[clickedIndex] = currentPlayer;
      clickedCell.classList.add(currentPlayer.toLowerCase());
      clickedCell.textContent = currentPlayer;
  
      if (checkResult()) return;
  
      // Computer's turn
      currentPlayer = "O";
      statusText.textContent = `${currentPlayer}'s turn`;
      setTimeout(computerMove, 300);
    }
  
    function checkResult() {
      if (checkWin(gameState, currentPlayer)) {
        statusText.textContent = `${currentPlayer} wins!`;
        isGameActive = false;
        return true;
      }
      if (isDraw(gameState)) {
        statusText.textContent = "It's a draw!";
        isGameActive = false;
        return true;
      }
      return false;
    }
  
    function computerMove() {
      if (!isGameActive) return;
  
      let bestMove;
      // 70% chance for minimax, 30% random
      if (Math.random() < 0.7) {
        bestMove = minimax(gameState, "O");
      } else {
        const availableMoves = gameState.reduce((acc, cell, index) => {
          if (cell === "") acc.push(index);
          return acc;
        }, []);
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        bestMove = { index: availableMoves[randomIndex] };
      }
  
      gameState[bestMove.index] = "O";
      const cell = document.querySelector(`[data-index="${bestMove.index}"]`);
      cell.classList.add("o");
      cell.textContent = "O";
  
      if (checkResult()) return;
  
      currentPlayer = "X";
      statusText.textContent = `${currentPlayer}'s turn`;
    }
  
    // Restart the game
    function restartGame() {
      gameState = ["", "", "", "", "", "", "", "", ""];
      currentPlayer = "X";
      isGameActive = true;
      statusText.textContent = "Your turn!";
      document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
      });
    }
  
    board.addEventListener("click", handleCellClick);
    restartButton.addEventListener("click", restartGame);
  });
  
  // ===============
  //  TYPING EFFECT
  // ===============
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");
  const textArray = ["motivated.", "hard worker.", "a team player.", "problem solver.", "quick learner."];
  const typingDelay = 50;
  const erasingDelay = 30;
  const newTextDelay = 500; 
  let textArrayIndex = 0;
  let charIndex = 0;
  
  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      setTimeout(erase, newTextDelay);
    }
  }
  
  function erase() {
    if (charIndex > 0) {
      if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      cursorSpan.classList.remove("typing");
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 1100);
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
  });
  


// AI Chatbot
document.addEventListener("DOMContentLoaded", function() {
  // 1) References to HTML elements
  const openChatBtn = document.getElementById("open-chat");
  const chatbotContainer = document.querySelector(".chatbot-container");
  const closeChatBtn = document.getElementById("close-chat");
  const chatBody = document.getElementById("chat-body");
  const userInput = document.getElementById("user-input");
  const sendMessageBtn = document.getElementById("send-message");

  // 2) FAQ array with synonyms (keywords) & answers
  const faqs = [

    {
      keywords: ["Hi", "hi", "hello", "wassup", "how are you", "are you good"],
      answer: "Hello I'm good, how about you?"
    },
    {
      keywords: ["experience", "experiences", "past role", "past roles", "previous job", "previous jobs", "job"],
      answer: "I have experience in Java, C#, and Python, primarily focused on backend development. I’ve also worked on smaller full-stack projects using HTML/CSS/JS to better understand user-facing features."
    },
    {
      keywords: ["education", "degree", "study", "studies", "academic background", "university", "college"],
      answer: "I hold a Bachelor’s degree in Computer Science, which gave me a solid foundation in data structures, algorithms, and software engineering principles."
    },
    {
      keywords: ["skills", "tech stack", "technologies", "proficiency"],
      answer: "My strongest skills include Java, Python, and C# for backend development. I’m comfortable with web technologies like HTML5/CSS3/JavaScript, plus version control using Git."
    },
    {
      keywords: ["favorite project", "exciting project", "best project"],
      answer: "One of my most exciting projects was building a small RESTful API in Java Spring Boot that integrated with a MySQL database. I learned a lot about HTTP requests, security, and ORM."
    },
    {
      keywords: ["strengths", "why hire", "why you", "advantages", "strong points"],
      answer: "I’m a fast learner who enjoys problem-solving and works well in teams. My biggest strength is my adaptability—I’m always eager to pick up new technologies to tackle the task at hand."
    },
    {
      keywords: ["weaknesses", "areas of improvement", "challenges"],
      answer: "Sometimes I dive too deep into debugging, which can slow me down if I don’t take a step back. I’m working on quickly identifying when to seek guidance or try a different approach."
    },
    {
      keywords: ["projects", "portfolio", "showcase", "github"],
      answer: "You can view my projects on my GitHub page, which range from web applications to small machine learning experiments. Each project has a README explaining the tech stack and purpose."
    },
    {
      keywords: ["internship", "intern", "trainee", "placements"],
      answer: "I completed an internship at a small software company where I contributed to a C# application for internal data analysis. This gave me practical exposure to .NET technologies and Agile processes."
    },
    {
      keywords: ["certifications", "courses", "online courses", "udemy", "coursera"],
      answer: "I’ve completed courses on Udemy and Coursera focusing on full-stack development, data structures, and software design patterns. These enhanced my theoretical knowledge and coding best practices."
    },
    {
      keywords: ["career goals", "future plans", "next steps", "ambition"],
      answer: "I want to specialize in backend development and cloud technologies. My short-term goal is to become proficient with microservices and containerization tools like Docker and Kubernetes."
    },
    {
      keywords: ["motivation", "passion", "why programming", "what drives you"],
      answer: "I love the creative aspect of coding and the satisfaction of seeing real-world solutions come to life. Finding elegant ways to solve complex problems keeps me motivated every day."
    },
    {
      keywords: ["collaboration", "teamwork", "working with others", "communication"],
      answer: "I enjoy collaborating on cross-functional teams. I believe open communication and regular feedback loops are crucial for delivering quality software on time."
    },
    {
      keywords: ["methodologies", "agile", "scrum", "workflow", "development process"],
      answer: "I’m most comfortable working in an Agile or Scrum environment, breaking tasks into sprints, and doing daily stand-ups to ensure progress and transparency."
    },
    {
      keywords: ["testing", "quality assurance", "bug fixing", "debugging"],
      answer: "I practice test-driven development whenever possible. I like writing unit tests in frameworks like JUnit or NUnit to ensure reliable, maintainable code."
    },
    {
      keywords: ["availability", "start date", "timeline", "when can you start"],
      answer: "I’m available to start immediately. I’m flexible on working hours as well, and I’m open to discussing remote or on-site positions."
    },
    {
      keywords: ["relocation", "travel", "moving", "remote work"],
      answer: "I’m open to relocation for the right opportunity and also comfortable with remote setups—whatever allows me to best contribute to the team."
    },
    {
      keywords: ["preferred tools", "ides", "editors", "software environment"],
      answer: "I typically use VS Code for web development and JetBrains IntelliJ or Visual Studio for backend work. Git is my go-to for version control."
    },
    {
      keywords: ["learning new technologies", "staying up to date", "continuous learning", "self-improvement"],
      answer: "I follow tech blogs, GitHub trending projects, and complete side projects to explore new libraries or languages. I believe in continuous learning to keep evolving."
    },
    {
      keywords: ["salary expectations", "compensation", "pay range", "negotiations"],
      answer: "I’m open to discussing compensation that reflects my skills and the role’s responsibilities. My primary goal is joining a team where I can learn and grow while delivering value."
    },
    {
      keywords: ["any questions", "questions for us", "ask me something", "questions"],
      answer: "I’d love to learn more about the company’s tech stack and the team’s work culture. What does your development workflow look like on a day-to-day basis?"
    }
  
    
    // Add more Q&A as needed
  ];

  // Fallback if nothing matches
  const defaultAnswer = "I'm not sure how to answer that. Try asking about my experience, skills, or background. 😃";

  // Open chat
  openChatBtn.addEventListener("click", () => {
    chatbotContainer.style.display = "flex";
    openChatBtn.style.display = "none";
  });

  // Close chat
  closeChatBtn.addEventListener("click", () => {
    chatbotContainer.style.display = "none";
    openChatBtn.style.display = "block";
  });

  // Add messages to chat
  function addMessage(text, sender = "bot") {
    const message = document.createElement("p");
    message.classList.add(sender === "bot" ? "bot-message" : "user-message");
    message.innerText = text;
    chatBody.appendChild(message);
    chatBody.scrollTop = chatBody.scrollHeight; // auto-scroll
  }

  // Handle user input => match
  function handleUserMessage() {
    let question = userInput.value.trim();
    if (!question) return;

    // Show user message
    addMessage(question, "user");
    userInput.value = "";

    // Lowercase and remove punctuation
    let lowerQ = question
      .toLowerCase()
      .replace(/[^\w\s]/gi, ""); 
    // e.g., "tell me about your experiences!" -> "tell me about your experiences"

    // Split into an array of words
    let userWords = lowerQ.split(/\s+/);
    // e.g. ["tell", "me", "about", "your", "experiences"]

    let foundAnswer = null;

    // Attempt to find a match in the faqs
    for (const item of faqs) {
      for (let keyword of item.keywords) {
        // Clean the keyword too (remove punctuation, just in case)
        keyword = keyword.toLowerCase().replace(/[^\w\s]/gi, "");

        // If the array of user words contains that keyword
        if (userWords.includes(keyword)) {
          foundAnswer = item.answer;
          break;
        }
      }
      if (foundAnswer) break; // Stop if we found an answer
    }

    // If no match found, use fallback
    const botReply = foundAnswer || defaultAnswer;

    // Simulate typing delay
    setTimeout(() => {
      addMessage(botReply, "bot");
    }, 700);
  }

  // Send message on button click
  sendMessageBtn.addEventListener("click", handleUserMessage);

  // Or pressing Enter
  userInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
      handleUserMessage();
    }
  });
});
