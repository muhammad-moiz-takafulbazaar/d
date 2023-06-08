// Array of quotes
// Function to fetch quotes from the API
async function fetchQuotes() {
    try {
        const response = await fetch("https://type.fit/api/quotes");
        const quotes = await response.json();
        return quotes;
    } catch (error) {
        console.error("Error fetching quotes:", error);
        return [];
    }
}

// Function to generate a random quote
function generateQuote() {
    fetchQuotes()
        .then((quotes) => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];
            const quoteDisplay = document.getElementById("quoteDisplay");
            quoteDisplay.textContent = `${randomQuote.text} - ${randomQuote.author}`;
            // You can access other properties of the quote object like author, category, etc.

            // Set the tweet button href attribute with the quote text
            const tweetBtn = document.getElementById("tweetBtn");
            tweetBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(randomQuote)}`;
        })
        .catch((error) => {
            console.error("Error generating quote:", error);
        });
}

// Event listener for the Generate Quote button
const generateBtn = document.getElementById("generateBtn");
generateBtn.addEventListener("click", generateQuote);

// Initial quote generation on page load
generateQuote();

// Event listener for the Copy to Clipboard button
const copyBtn = document.getElementById("copyBtn");
copyBtn.addEventListener("click", () => {
    // Select the quote text
    const quoteText = document.getElementById("quoteDisplay").textContent;

    // Create a temporary textarea element
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = quoteText;

    // Append the textarea to the document
    document.body.appendChild(tempTextArea);

    // Select the text in the textarea
    tempTextArea.select();

    // Copy the text to the clipboard
    document.execCommand("copy");

    // Remove the temporary textarea
    document.body.removeChild(tempTextArea);

    // Provide visual feedback to the user
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
        copyBtn.textContent = "Copy to Clipboard";
    }, 2000);
});