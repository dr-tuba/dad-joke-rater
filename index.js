let dadShoes = document.querySelectorAll('.dad-shoe')
const dadJokes = document.getElementById('rendered-joke')
const favoriteJokes = document.getElementById('favorite-jokes')
let favButton = document.createElement('button')
let nextJokeButton = document.createElement('button')

document.addEventListener('DOMContentLoaded', getDadJoke)

function getDadJoke() {
    fetch('https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes')
    .then(resp => resp.json())
    .then(data => renderJoke(data))
}

function renderJoke(data) {
    let jokeCard = document.createElement('div')
    jokeCard.setAttribute('class', 'joke-card')
    let jokeSetup = document.createElement('h1')
    let jokePunchline = document.createElement('h1')
    jokeSetup.textContent = data.setup
    jokePunchline.textContent = data.punchline
    dadJokes.append(jokeCard)
    jokeCard.append(jokeSetup)
    jokeCard.append(jokePunchline)
    favButton
    favButton.textContent = "Favorite"
    favButton.setAttribute('class', 'button-class')
    nextJokeButton
    nextJokeButton.textContent = "Next"
    nextJokeButton.setAttribute('class', 'button-class')
    jokeCard.append(favButton)
    jokeCard.append(nextJokeButton)
}

nextJokeButton.addEventListener('click', (e) => {
    console.log(e)
    e.target.parentNode.remove()
    getDadJoke()
})

favButton.addEventListener('click', (e) => {
    let favJokeCard = document.createElement('div')
    favJokeCard.setAttribute('class', 'joke-card')
    let favJokeSetup = document.createElement('p')
    favJokeSetup.textContent = e.target.parentNode.firstChild.textContent
    let favJokePunchline = document.createElement('p')
    favJokePunchline.textContent = e.target.previousSibling.textContent
    favJokePunchline.style.fontWeight = 'bold'
    favoriteJokes.append(favJokeCard)
    favJokeCard.append(favJokeSetup)
    favJokeCard.append(favJokePunchline)
    e.target.parentNode.remove()
    getDadJoke()
})

dadShoes.forEach(shoe => shoe.addEventListener('click', giveRating))

function giveRating(e) {
    fetch('http://localhost:3000/ratedJokes/', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            setup: dadJokes.querySelector('.joke-card').querySelector('h1').textContent,
            punchline: dadJokes.querySelector('.joke-card').querySelectorAll('h1')[1].textContent,
            rating: parseInt(e.target.id),
            type: 'general'
        }),
    })
    switch(e.target.id) {
        case '1':
        alert(`You gave this Dad Joke a rating of 1 dad shoe. 
                "Dad...just...no....please stop"`); 
        break;
        case '2':
        alert(`You gave this Dad Joke a rating of 2 dad shoes.
                "Keep trying Dad"`);
        break;
        case '3':
        alert(`You gave this Dad Joke a rating of 3 dad shoes. 
                "lol, ugh you're so stupid."`);
        break; 
        case '4':
        alert(`You gave this Dad Joke a rating of 4 dad shoes. 
                "Alright Dad, that one was pretty good"`);
        break; 
        case '5':
        alert(`You gave this Dad Joke a rating of 5 dad shoes. 
                "Damn Dad, even Mom laughed at that one!"`);
        break;     
    }
    dadJokes.querySelector('.joke-card').remove()
    getDadJoke()
}