let categoryFilter
document.addEventListener("DOMContentLoaded", function () {
 
    let quotes = [
        
        // {
        //     text: "Programs must be written for people to read, and only incidentally for machines to execute.",
        //     category: "Programming Wisdom"
        // },
        // {
        //     text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        //     category: "Programming Wisdom"
        // },
        // {
        //     text: "The function of good software is to make the complex appear simple.",
        //     category: "Programming Wisdom"
        // },
        // {
        //     text: "Code never lies, comments sometimes do.",
        //     category: "Programming Wisdom"
        // },
        // {
        //     text: "First, solve the problem. Then, write the code.",
        //     category: "Programming Wisdom"
        // },
        // {
        //     text: "Dream in code, build in reality.",
        //     category: "Motivational"
        // },
        // {
        //     text: "If you’re the smartest person in the room, you’re in the wrong room.",
        //     category: "Motivational"
        // },
        // {
        //     text: "Keep calm and code on.",
        //     category: "Motivational"
        // },
        // {
        //     text: "Talk is cheap. Show me the code.",
        //     category: "Humor"
        // },
        // {
        //     text: "It’s not a bug – it’s an undocumented feature.",
        //     category: "Humor"
        // },
        // {
        //     text: "Don’t worry if it doesn’t work right. If everything did, you’d be out of a job.",
        //     category: "Humor"
        // },
        // {
        //     text: "The best error message is the one that never shows up.",
        //     category: "Learning"
        // },
        // {
        //     text: "Experience is the name everyone gives to their mistakes.",
        //     category: "Learning"
        // },
        // {
        //     text: "The only way to learn a new programming language is by writing programs in it.",
        //     category: "Learning"
        // }
    ]

    let quoteDisplay = document.querySelector("#quoteDisplay")
    let newQuote = document.querySelector("#newQuote")
    let newQuoteCategory = document.querySelector("#newQuoteCategory")
    let newQuoteText = document.getElementById("newQuoteText")
    let loadFile = document.getElementsByClassName("loadFile")
    categoryFilter = document.getElementById("categoryFilter")
    
   
    function showRandomQuote() {
        quoteDisplay.innerHTML = ""
        quotes = JSON.parse(localStorage.getItem("quotes"))
        console.log(quotes)
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)].name
        console.log(`the quote: ${randomQuote}`)
        let newQuote = document.createElement("h3")
        newQuote.innerHTML = randomQuote
        quoteDisplay.appendChild(newQuote)
    }

    newQuote.addEventListener("click", () => (
    
        showRandomQuote()
    ))

    function populateCategories() {
        
        let allquotes = JSON.parse(localStorage.getItem("quotes"))
        let categorySet = new Set()
        allquotes.forEach(quote => {
            categorySet.add(quote.category)
        });
        categorySet.forEach(function (category) {
            const option = document.createElement('option');
            option.textContent = category
            categoryFilter.appendChild(option)
        })
       
   
        // filterQuotes()
    }
    window.onload = populateCategories;
 
    window.addQuote = function () {
        let thenewQuoteCategory = newQuoteCategory.value.toUpperCase()
        let thenewQuoteText = newQuoteText.value

        if (thenewQuoteCategory.length > 0 && thenewQuoteText.length > 0) {
            quoteDisplay.innerHTML=""
            // let createAddQuoteForm = { category: thenewQuoteCategory, name: thenewQuoteText }
            // quotes.push(createAddQuoteForm)

            // Fetch all code from local Storage to check category
            let allquotes = JSON.parse(localStorage.getItem("quotes")) //Fetch all quotes from the local storage
            console.log(allquotes)
            let createAddQuoteForm
            let categorySet = new Set()
            allquotes.forEach(quote => {
                categorySet.add(quote.category) // store it into the categorySet
            });
            categorySet.add(thenewQuoteCategory) // add the new it to the categorySet
            categorySet.forEach(function (category) {
                if (thenewQuoteCategory.toUpperCase() === category.toUpperCase()) {
                    createAddQuoteForm = { category: thenewQuoteCategory, name: thenewQuoteText }
                    allquotes.push(createAddQuoteForm) 
                }
            })
            localStorage.setItem("quotes", JSON.stringify(allquotes))
            populateCategories()
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


    function importFromJsonFile(event) {
        const fileReader = new FileReader();
        fileReader.onload = function(event) {
            const importedQuotes = JSON.parse(event.target.result);
            quotes.push(...importedQuotes);
            console.log(quotes)
            saveQuotes(quotes);
            alert('Quotes imported successfully!');
        };
        fileReader.readAsText(event.target.files[0]);
    }

    window.exportQuote= function () {
        console.log("Hello")
        arrayQuotes = localStorage.getItem("quotes")
    
        quotes = new Blob([arrayQuotes],  {type: "application/json"})
        const objectUrl = URL.createObjectURL(quotes)
        let link = document.createElement("a")
        link.setAttribute("href", objectUrl)
        link.setAttribute("download", "quotes.JSON")
        link.click()
    }
    
    // saveQuotes(quotes)(
    //      localStorage.setItem("quotes", quotes)
    // );
    
   

     
     

})
function filterQuotes() {
    category = categoryFilter.value
    let allquotes = JSON.parse(localStorage.getItem("quotes"))
    quoteDisplay.innerHTML=""
    // First, filter the matching quotes
    const matchingQuotes = allquotes.filter(quote => quote.category === category);

    // Then, use map to create the DOM elements from those quotes
    const elements = matchingQuotes.map(quote => {
        const aquote = document.createElement("h3");
        aquote.innerHTML = quote.name;
        return aquote;
    });

// Finally, append all elements to the display (you could also use forEach here if preferred)
elements.forEach(el => quoteDisplay.appendChild(el));
    
        }