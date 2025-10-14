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


    /**********************************************************
 * STEP 1: SIMULATE SERVER INTERACTION
 **********************************************************/

// The mock server endpoint — you can replace this later
// with your own JSON server or hosted quotes API.
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";

// This function simulates fetching quotes from a remote server.
async function fetchQuotesFromServer() {
    try {
        // Fetch simulated data from the mock API
        const response = await fetch(SERVER_URL);

        // Convert the response into JavaScript objects
        const data = await response.json();

        // For demo purposes, we’ll just use the first 10 items
        // and transform them to look like our quote objects
        return data.slice(0, 10).map(post => ({
            category: "SERVER_CATEGORY",
            name: [`${post.title}`] // Each "title" is a quote string
        }));
    } catch (error) {
        // If the network fails, log the error but don’t crash
        console.error("Error fetching quotes from server:", error);
        return []; // Return empty so app still works offline
    }
}

    
    /**********************************************************
 * STEP 2: IMPLEMENT DATA SYNCING
 **********************************************************/

// This function handles syncing between server and local data
async function syncQuotes() {
    console.log(" Syncing with server...");

    //  Fetch all the latest quotes from the simulated server
    const serverQuotes = await fetchQuotesFromServer();

    // Retrieve existing quotes from localStorage
    const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

    // Merge both sets of data and resolve conflicts
    const mergedQuotes = resolveConflicts(localQuotes, serverQuotes);

    // Save the updated merged list back to localStorage
    localStorage.setItem("quotes", JSON.stringify(mergedQuotes));

    // Log and update UI
    console.log("Quotes synced successfully:", mergedQuotes);
    populateCategories(); // Refresh category dropdown if it exists
}

// ⏱️ Automatically sync every 30 seconds
    setInterval(syncQuotes, 30000);
    

    /**********************************************************
 * STEP 3: HANDLE CONFLICTS
 **********************************************************/

// This function merges local and server data, preferring the server version
function resolveConflicts(localQuotes, serverQuotes) {
    // Start by copying local quotes so we don’t mutate the original array
    const merged = [...localQuotes];

    // Loop through each quote object fetched from the server
    serverQuotes.forEach(serverQuote => {
        // Check if we already have this category locally
        const existingIndex = merged.findIndex(q => q.category === serverQuote.category);

        if (existingIndex >= 0) {
            // ⚠️ Conflict detected: category exists both locally and on the server
            // Strategy: SERVER WINS — overwrite the local version
            merged[existingIndex] = serverQuote;

            // Notify the user that a conflict was resolved
            notifyUser(`Conflict resolved: Updated category "${serverQuote.category}" from server`);
        } else {
            // ✅ New category from server — just add it
            merged.push(serverQuote);
            notifyUser(`New category "${serverQuote.category}" added from server`);
        }
    });

    // Return the fully merged and conflict-free array
    return merged;
}


    /**********************************************************
 * STEP 4: USER NOTIFICATION SYSTEM
 **********************************************************/

// Displays small pop-up messages on the screen for a few seconds
function notifyUser(message) {
    // Create a <div> element dynamically
    const notification = document.createElement("div");
    notification.textContent = message;

    // Add some simple styles for visibility
    notification.style.cssText = `
        background: #222;
        color: #fff;
        padding: 10px 14px;
        border-radius: 8px;
        position: fixed;
        bottom: 20px;
        right: 20px;
        font-size: 14px;
        z-index: 9999;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        transition: opacity 0.5s ease;
    `;

    // Attach it to the webpage
    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

    
    /**********************************************************
 * OPTIONAL: MANUAL CONFLICT RESOLUTION
 **********************************************************/

// This function allows the user to decide if they want to
// keep their local version instead of replacing it with the server’s version.
function askUserToResolveConflict(local, server) {
    return confirm(
        `Conflict detected for "${server.category}".\n` +
        `Local quote: "${local.name}"\n` +
        `Server quote: "${server.name}"\n\n` +
        `Do you want to use the server version?`
    );
}

})

function filterQuotes() {
    const category = categoryFilter.value;
    const allquotes = JSON.parse(localStorage.getItem("quotes")) || [];
    quoteDisplay.innerHTML = "";

    // Find the category object
    const matchingCategory = allquotes.find(quote => quote.category === category);

    if (!matchingCategory) {
        const msg = document.createElement("p");
        msg.textContent = "No quotes found for this category.";
        msg.style.color = "gray";
        quoteDisplay.appendChild(msg);
        return;
    }

    // Loop through each quote string inside the category
    matchingCategory.name.forEach(singleQuote => {
        const aquote = document.createElement("h3");
        aquote.textContent = singleQuote;
        quoteDisplay.appendChild(aquote);
    });
}
