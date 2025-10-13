document.addEventListener("DOMContentLoaded", function () {
 
    const quotes = [
        
        {
            text: "Programs must be written for people to read, and only incidentally for machines to execute.",
            category: "Programming Wisdom"
        },
        {
            text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
            category: "Programming Wisdom"
        },
        {
            text: "The function of good software is to make the complex appear simple.",
            category: "Programming Wisdom"
        },
        {
            text: "Code never lies, comments sometimes do.",
            category: "Programming Wisdom"
        },
        {
            text: "First, solve the problem. Then, write the code.",
            category: "Programming Wisdom"
        },
        {
            text: "Dream in code, build in reality.",
            category: "Motivational"
        },
        {
            text: "If you’re the smartest person in the room, you’re in the wrong room.",
            category: "Motivational"
        },
        {
            text: "Keep calm and code on.",
            category: "Motivational"
        },
        {
            text: "Talk is cheap. Show me the code.",
            category: "Humor"
        },
        {
            text: "It’s not a bug – it’s an undocumented feature.",
            category: "Humor"
        },
        {
            text: "Don’t worry if it doesn’t work right. If everything did, you’d be out of a job.",
            category: "Humor"
        },
        {
            text: "The best error message is the one that never shows up.",
            category: "Learning"
        },
        {
            text: "Experience is the name everyone gives to their mistakes.",
            category: "Learning"
        },
        {
            text: "The only way to learn a new programming language is by writing programs in it.",
            category: "Learning"
        }
    ]

    let quoteDisplay = document.querySelector("#quoteDisplay")
    let newQuote = document.querySelector("#newQuote")
    let newQuoteCategory = document.querySelector("#newQuoteCategory")
    let newQuoteText = document.querySelector("#newQuoteText")
    
   
    function showRandomQuote() {
        quoteDisplay.innerHTML = ""
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)].text
        let newQuote = document.createElement("h3")
        newQuote.innerHTML = randomQuote
        quoteDisplay.appendChild(newQuote)
    }

    newQuote.addEventListener("click", () => (
    
        showRandomQuote()
    ))
 
    window.addQuote = function () {
        let thenewQuote = newQuoteCategory.value
        let thenewQuoteText = newQuoteText.value

        if (thenewQuote.length > 0 && thenewQuoteText.length > 0) {
            quoteDisplay.innerHTML=""
            let createAddQuoteForm = { category: thenewQuote, name: thenewQuoteText }
           
            quotes.push(createAddQuoteForm)
            console.log(quotes)
            newQuoteCategory.value = ""
            newQuoteText.value = ""
            let newQuote = document.createElement("h3")
            newQuote.innerHTML = createAddQuoteForm.name
            quoteDisplay.appendChild(newQuote)
        } else {
            quoteDisplay.innerHTML=""
            let newQuote = document.createElement("p")
            newQuote.innerHTML = "You did not input a value"
            newQuote.style.color = "red"
            quoteDisplay.appendChild(newQuote)
            
        }
        
    }
})