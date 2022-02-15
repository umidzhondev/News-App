let value = "";
const input = document.querySelector(".meal__input");
const btn = document.querySelector(".search__button");
const cards = document.querySelector(".meal__cards");
const noResultBtn = document.querySelector(".no--results");
const modal = document.querySelector(".meal__modal");
const modalTitle = document.querySelector(".meal__modal-title");
const modalDescription = document.querySelector(".meal__modal-description");
const modalImage = document.querySelector(".meal__modal-imgbox img");
const modalAuthor = document.querySelector(".author");
const modalDate = document.querySelector(".date");
const cardBtns = document.querySelectorAll(".meal__card-button");
const closeBtn = document.querySelector(".meal__modal-imgbox i");

function response(url) {
    fetch(url)
        .then(data => data.json())
        .then(response => {
            if (!response.articles || !response.totalResults) {
                noResultBtn.classList.replace("hidden", "visible")
            } else {
                noResultBtn.classList.replace("visible", "hidden");
                cards.innerHTML = "";
                response.articles.forEach((item, index) => {
                    cards.innerHTML += `
                    <div class="meal__card">
                    <div class="meal__card-imgbox">
                        <img src="${item.urlToImage}" alt="image...">
                    </div>
                    <h3 class="meal__card-title">${item.title}</h3>
                    <button class="meal__card-button" data-index="${index}" >Learn more <i class="fas fa-angle-right"></i></button>
                    </div> `
                    document.querySelectorAll(".meal__card-button").forEach((btn, btnIndex) => {
                        btn.addEventListener('click', () => {
                            let cardData = response.articles[btn.getAttribute("data-index")]
                            modal.classList.add("open");
                            modalImage.setAttribute("src", cardData.urlToImage);
                            modalTitle.textContent = cardData.title;
                            modalDescription.innerHTML = cardData.description;
                            modalAuthor.innerHTML = cardData.author.slice(0,20);
                            modalDate.textContent = cardData.publishedAt.slice(0,10);
                            document.querySelector("body").classList.add("overlay")
                        });
                    })
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
}
closeBtn.addEventListener('click',() => {
    modal.classList.remove("open")
    document.querySelector("body").classList.remove("overlay")

});
btn.addEventListener('click', () => {
    value = input.value.trim().toLowerCase();
    cards.innerHTML = "";
    response('https://newsapi.org/v2/everything?' +
        'q=' + value + "&" +
        'from=2022-02-11&' +
        'sortBy=popularity&' +
        'apiKey=0f16274b2bd34b7d94ed41fde289494f');
});
input.addEventListener('keypress', (e) => {
    value = input.value.trim().toLowerCase();
    if (e.code == "Enter") {
        cards.innerHTML = "";
        response('https://newsapi.org/v2/everything?' +
            'q=' + value + "&" +
            'from=2022-02-11&' +
            'sortBy=popularity&' +
            'apiKey=0f16274b2bd34b7d94ed41fde289494f');
    }
});