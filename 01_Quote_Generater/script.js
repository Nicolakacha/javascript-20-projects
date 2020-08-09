const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

//Get Quote
function getQuote(data) {
  if (data.quoteAuthor === "") {
    authorText.innerText = "Unknown";
  } else {
    authorText.innerText = data.quoteAuthor;
  }
  if (data.quoteText.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.innerText = data.quoteText;
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Get Quote From API
async function getData() {
  const proxyUrl = "http://mighty-gorge-35380.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    loading()
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    getQuote(data);
    complete()
  } catch (error) {
    console.log(error);
    getData();
  }
}

//Event Listeners
newQuoteBtn.addEventListener("click", getData);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getData();
