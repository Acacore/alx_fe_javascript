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
    
    // localStorage.removeItem("quotes");
    let quoteDisplay = document.querySelector("#quoteDisplay")
    let newQuote = document.querySelector("#newQuote")
    let newQuoteCategory = document.querySelector("#newQuoteCategory")
    let newQuoteText = document.getElementById("newQuoteText")
    let loadFile = document.getElementsByClassName("loadFile")
    categoryFilter = document.getElementById("categoryFilter")
    
   
    function showRandomQuote() {
    quoteDisplay.innerHTML = "";

    const allquotes = JSON.parse(localStorage.getItem("quotes")) || [];

    // Get selected category from dropdown
    const selectedCategory = document.getElementById("categoryFilter").value;

    if (!selectedCategory) {
        const msg = document.createElement("p");
        msg.textContent = "Please select a category first.";
        msg.style.color = "red";
        quoteDisplay.appendChild(msg);
        return;
    }

    // Find the category object
    const categoryData = allquotes.find(
        (q) => q.category === selectedCategory.toUpperCase()
    );

    // Handle missing category or empty quotes
    if (!categoryData || !categoryData.name || categoryData.name.length === 0) {
        const msg = document.createElement("p");
        msg.textContent = `No quotes found for ${selectedCategory}.`;
        msg.style.color = "gray";
        quoteDisplay.appendChild(msg);
        return;
    }

    // Pick one random quote from this category
    const randomIndex = Math.floor(Math.random() * categoryData.name.length);
    const randomQuote = categoryData.name[randomIndex];

    // Display it
    const newQuote = document.createElement("h3");
    newQuote.textContent = `"${randomQuote}"`;
    quoteDisplay.appendChild(newQuote);

    console.log(`📜 Random quote from ${selectedCategory}: ${randomQuote}`);
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
    const thenewQuoteCategory = newQuoteCategory.value.trim().toUpperCase();
    const thenewQuoteText = newQuoteText.value.trim();

    // Validation
    if (thenewQuoteCategory.length === 0 || thenewQuoteText.length === 0) {
        quoteDisplay.innerHTML = "";
        const msg = document.createElement("p");
        msg.innerHTML = "You did not input a value";
        msg.style.color = "red";
        quoteDisplay.appendChild(msg);
        return;
    }

    // Fetch all quotes from localStorage
    let allquotes = JSON.parse(localStorage.getItem("quotes")) || [];

    // Check if category already exists
    let existingCategory = allquotes.find(
        (quote) => quote.category === thenewQuoteCategory
    );

    if (existingCategory) {
        // Make sure 'name' is an array, then add new quote
        if (!Array.isArray(existingCategory.name)) {
            existingCategory.name = [existingCategory.name];
        }
        existingCategory.name.push(thenewQuoteText);
    } else {
        // Add new category object
        allquotes.push({
            category: thenewQuoteCategory,
            name: [thenewQuoteText],
        });
    }

    // Save updated quotes back to localStorage
    localStorage.setItem("quotes", JSON.stringify(allquotes));
    console.log("✅ Updated quotes:", allquotes);

    // Update dropdown in real-time
    populateCategories();

    // Clear input fields
    newQuoteCategory.value = "";
    newQuoteText.value = "";

    // Display confirmation
    quoteDisplay.innerHTML = "";
    const newQuote = document.createElement("h3");
    newQuote.innerHTML = `"${thenewQuoteText}" added to ${thenewQuoteCategory}`;
    newQuote.style.color = "green";
    quoteDisplay.appendChild(newQuote);
};



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