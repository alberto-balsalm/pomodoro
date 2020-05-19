let countdown
let sessionLength = 1500
let timeLeft = sessionLength
let breakLength = 300
let countdownType = "session"
let timerOff = "true"

const pauseButton = document.querySelector('.pause.btn')
const stopButton = document.querySelector('.stop.btn')
const resetButton = document.querySelector('.reset.btn')
const startButton = document.querySelector('.start.btn')
const info = document.querySelector('.info')
const sessionUp = document.querySelector(".increase.session")
const sessionDown = document.querySelector(".decrease.session")
const breakUp = document.querySelector(".increase.break")
const breakDown = document.querySelector(".decrease.break")
const sessionLengthLabel = document.querySelector(".session.length")
const breakLengthLabel = document.querySelector(".break.length") 


activateButtons()
activateChevrons()


function timer(seconds) {
    //this isn't necessary since start button is disabled when timer's on
    clearInterval(countdown) //clear any running timers

    seconds++ //setIntervals starts after a second
    const then = Date.now() + seconds * 1000    
    countdown = setInterval(() => {
        const now = Date.now()
        const secondsLeft = parseInt(Math.round((then - now) / 1000))       
        if(secondsLeft <= 0) {
            clearInterval(countdown)
            if(countdownType === "session") {
                countdownType = "break"
                timer(breakLength)
            } else {
                countdownType = "session"
                timer(sessionLength)
            }
        }
        displayTimeLeft(secondsLeft)
        timeLeft = secondsLeft
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remSeconds = seconds % 60
    const display = `${minutes}:${remSeconds < 10 ? 0 : ''}${remSeconds}`
    const clock = document.querySelector('h1.clock')

    clock.textContent = display;
    document.title = display;
}

function activateButtons() {
    startButton.addEventListener('click', startCountdown)
    pauseButton.addEventListener('click', pause)
    stopButton.addEventListener('click', stop)
    resetButton.addEventListener('click', reset)
}

function startCountdown() {
    if(timerOff) timer(sessionLength)
    else timer(timeLeft)

    if(countdownType == "session") info.textContent = "Stop looking at this and get to work!"
    else if(countdownType == "break") info.textContent = "Now it's time for a break!"
    startButton.classList.add('disabled')
    pauseButton.classList.remove('disabled')
    stopButton.classList.remove('disabled')
    resetButton.classList.remove('disabled')
    timerOff = false
}

function pause() {
    clearInterval(countdown)
    pauseButton.classList.add('disabled')
    startButton.classList.remove('disabled')
    document.title += " (paused)"
    info.textContent = "Paused"
}

function stop() {
    clearInterval(countdown)
    displayTimeLeft(sessionLength)
    timeLeft = sessionLength
    countdownType = "session"
    document.title = "Pomodoro clock" //displayTimeLeft shows time left on a tab
    stopButton.classList.add('disabled')
    pauseButton.classList.add('disabled')
    startButton.classList.remove('disabled')  
    timerOff = true
    info.textContent = ""
}

function reset() {
    clearInterval(countdown)
    sessionLength = 1500
    breakLength = 300
    displayTimeLeft(sessionLength)
    sessionLengthLabel.textContent = sessionLength / 60
    breakLengthLabel.textContent = breakLength / 60
    timerOff = true
    startButton.classList.remove('disabled') 
    stopButton.classList.add('disabled')
    pauseButton.classList.add('disabled')
    info.textContent = ""   
}

function activateChevrons() {
    sessionUp.addEventListener('click', increaseLength)
    sessionDown.addEventListener('click', decreaseLength)
    breakUp.addEventListener('click', increaseLength)
    breakDown.addEventListener('click', decreaseLength)
}

function increaseLength() {
    if(timerOff){
        if(this.classList[2] == "session") {
            if(sessionLength + 60 <= 3600) {
                sessionLength += 60
                sessionLengthLabel.textContent = sessionLength / 60
            }
        } else if(this.classList[2] == "break") {
            if(breakLength + 60 <= 3600) {
                breakLength += 60
                breakLengthLabel.textContent = breakLength / 60
            }
        }
    }
}

function decreaseLength() {
    if(timerOff) {
        if(this.classList[2] == "session") {
            if(sessionLength - 60 >= 60) {
                sessionLength -= 60
                sessionLengthLabel.textContent = sessionLength / 60
            }
        } else if(this.classList[2] == "break") {
            if(breakLength - 60 >= 60) {
                breakLength -= 60
                breakLengthLabel.textContent = breakLength / 60
            }
        }    
    }
}