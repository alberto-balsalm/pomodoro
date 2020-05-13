let countdown

function timer(seconds) {
    seconds++ //setIntervals starts after a second
    const then = Date.now() + seconds * 1000    
    countdown = setInterval(() => {
        const now = Date.now()
        const secondsLeft = parseInt(Math.round((then - now) / 1000))       
        if(secondsLeft <= 0) clearInterval(countdown)
        displayTimeLeft(secondsLeft)
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remSeconds = seconds % 60
    const display = `${minutes}:${remSeconds < 10 ? 0 : ''}${remSeconds}`
    const clock = document.querySelector('h2')
    console.log(display)

    clock.textContent = display;
    document.title = display;
}