document.addEventListener("DOMContentLoaded", function () {
 
    const quotes = [
        "Programs must be written for people to read, and only incidentally for machines to execute.",
        "Talk is cheap. Show me the code.",
        "The best error message is the one that never shows up.",
        "First, solve the problem. Then, write the code.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Experience is the name everyone gives to their mistakes.",
        "The only way to learn a new programming language is by writing programs in it.",
        "Don’t worry if it doesn’t work right. If everything did, you’d be out of a job.",
        "Code never lies, comments sometimes do.",
        "It’s not a bug – it’s an undocumented feature.",
        "The function of good software is to make the complex appear simple.",
        "Dream in code, build in reality.",
        "If you’re the smartest person in the room, you’re in the wrong room.",
        "Keep calm and code on."
    ]

    let quoteDisplay = document.querySelector("#quoteDisplay")
    let newQuote = document.querySelector("#newQuote")
   
    function showRandomQuote() {
        quoteDisplay.innerHTML = ""
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
        let newQuote = document.createElement("h1")
        newQuote.innerHTML = randomQuote
        quoteDisplay.appendChild(newQuote)
    }

    newQuote.addEventListener("click", () => (
    
        showRandomQuote()
    ))
 
    
})