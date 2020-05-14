let countdown
let sessionLength = 100
let timeLeft = sessionLength

const pauseButton = document.querySelector('.pause.btn')
const stopButton = document.querySelector('.stop.btn')
const resetButton = document.querySelector('.reset.btn')
const startButton = document.querySelector('.start.btn')

/* activateStartBtn() */
activateButtons()

function timer(seconds) {
    //this isn't necessary since start button is disabled when timer's on
    clearInterval(countdown) //clear any running timers

    seconds++ //setIntervals starts after a second
    const then = Date.now() + seconds * 1000    
    countdown = setInterval(() => {
        const now = Date.now()
        const secondsLeft = parseInt(Math.round((then - now) / 1000))       
        if(secondsLeft <= 0) clearInterval(countdown)
        displayTimeLeft(secondsLeft)
        timeLeft = secondsLeft
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remSeconds = seconds % 60
    const display = `${minutes}:${remSeconds < 10 ? 0 : ''}${remSeconds}`
    const clock = document.querySelector('h2')

    clock.textContent = display;
    document.title = display;
}

/* function activateStartBtn() {    
    startButton.addEventListener('click', startCountdown)
} */

function activateButtons() {
    startButton.addEventListener('click', startCountdown)
    pauseButton.addEventListener('click', pause)
    stopButton.addEventListener('click', stop)
}

function startCountdown() {
    timer(timeLeft)
    //startButton.removeEventListener('click', startCountdown)
    startButton.classList.add('disabled')
    pauseButton.classList.remove('disabled')
    stopButton.classList.remove('disabled')
}

function pause() {
    clearInterval(countdown)
    pauseButton.classList.add('disabled')
    startButton.classList.remove('disabled')
}

function stop() {
    clearInterval(countdown)
    displayTimeLeft(sessionLength)
    document.title = "Pomodoro clock" //displayTimeLeft shows time left on a tab
    stopButton.classList.add('disabled')
}