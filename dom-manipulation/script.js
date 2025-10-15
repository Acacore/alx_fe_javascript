let categoryFilter
document.addEventListener("DOMContentLoaded", function () {
    localStorage.removeItem("quotes");
    let quoteDisplay = document.querySelector("#quoteDisplay")
    let newQuote = document.querySelector("#newQuote")
    let newQuoteCategory = document.querySelector("#newQuoteCategory")
    let newQuoteText = document.getElementById("newQuoteText")
    let loadFile = document.getElementsByClassName("loadFile")
    categoryFilter = document.getElementById("categoryFilter")
    
   
    function showRandomQuote() {
        quoteDisplay.innerHTML = "";

        const allquotes = JSON.parse(localStorage.getItem("quotations")) || [];

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

        console.log(`Random quote from ${selectedCategory}: ${randomQuote}`);
    }


    newQuote.addEventListener("click", () => (
    
        showRandomQuote()
    ))

    function populateCategories() {
        
        let allquotes = JSON.parse(localStorage.getItem("quotations"))
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
        let allquotes = JSON.parse(localStorage.getItem("quotations")) || [];

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
        localStorage.setItem("quotations", JSON.stringify(allquotes));


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
        fileReader.onload = function (event) {
            const importedQuotes = JSON.parse(event.target.result);
            quotes.push(...importedQuotes);
            console.log(quotes)
            saveQuotes(quotes);
            alert('Quotes imported successfully!');
        };
        fileReader.readAsText(event.target.files[0]);
    }

    window.exportQuote = function () {
        arrayQuotes = localStorage.getItem("quotations")
    
        quotes = new Blob([arrayQuotes], { type: "application/json" })
        const objectUrl = URL.createObjectURL(quotes)
        let link = document.createElement("a")
        link.setAttribute("href", objectUrl)
        link.setAttribute("download", "quotations.JSON")
        link.click()
    }
    
    function askUserToResolveConflict(local, server) {
        return confirm(
            `Conflict detected for "${server.category}".\n` +
            `Local quote: "${local.name}"\n` +
            `Server quote: "${server.name}"\n\n` +
            `Do you want to use the server version?`
        );
    }

const URL_SERVER = "https://jsonplaceholder.typicode.com/posts";

async function fetchQuotesFromServer() {
    console.log("Fetching quotes from server...");
    try {
        const response = await fetch(URL_SERVER);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const serverQuotes = await response.json();
        console.log("Data fetched from server:", serverQuotes);

        let localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

        const localMap = new Map(localQuotes.map(q => [q.id, q]));

        // Server data takes precedence
        serverQuotes.forEach(serverQuote => {
            const localQuote = localMap.get(serverQuote.id);
            if (!localQuote) {
                localMap.set(serverQuote.id, serverQuote);
            } else if (JSON.stringify(localQuote) !== JSON.stringify(serverQuote)) {
                resolveConflict(localQuote, serverQuote);
            }
        });

        const mergedQuotes = Array.from(localMap.values());
        localStorage.setItem("quotes", JSON.stringify(mergedQuotes));
        showNotification("Quotes updated successfully!");
        console.log("Local storage updated successfully.");
    } catch (error) {
        showNotification("Failed to fetch data from server.");
        console.error("Error fetching from server:", error);
    }
}

async function syncQuotes() {
    const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

    console.log("Syncing local quotes to server...");
    try {
        for (const quote of localQuotes) {
            const response = await fetch(URL_SERVER, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(quote),
            });

            if (!response.ok) {
                console.error(`Failed to upload quote ID ${quote.id}`);
            }
        }

        console.log("Quotes synced with server!");
    } catch (error) {
        console.error("Error syncing local quotes:", error);
    }
}

// Run once, then periodically
fetchQuotesFromServer();
setInterval(fetchQuotesFromServer, 100000);
setInterval(syncQuotes, 300000);

    
  function showNotification(message, duration = 3000) {
  const notif = document.getElementById("notification");
  notif.textContent = message;
  notif.style.display = "block";

  setTimeout(() => {
    notif.style.display = "none";
  }, duration);
}


    

});

function filterQuotes() {
    const category = categoryFilter.value;
    const allquotes = JSON.parse(localStorage.getItem("quotations")) || [];
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
