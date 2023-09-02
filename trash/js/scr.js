function fetchJoke(){
    fetch("https://official-joke-api.appspot.com/random_joke")
    .then(response => response.json)
    .then(data => {
        const setup = data.setup
        const punchline = data.punchline
        const result = `${setup} ${punchline}`
        document.querySelector("#joke").textContent = result
    })
    .catch(error => console.error('ERROR', error))
}
fetchJoke()