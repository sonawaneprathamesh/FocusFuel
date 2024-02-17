var pomodoro = {
    started: false,
    minutes: 0,
    seconds: 0,
    fillerHeight: 0,
    fillerIncrement: 0,
    interval: null,
    minutesDom: null,
    secondsDom: null,
    fillerDom: null,
    init: function () {
        var self = this;
        this.minutesDom = document.querySelector('#minutes');
        this.secondsDom = document.querySelector('#seconds');
        this.fillerDom = document.querySelector('#filler');
        this.interval = setInterval(function () {
            self.intervalCallback.apply(self);
        }, 1000);

        document.querySelector('#stop').onclick = function () {
            self.stopTimer.apply(self);
        };
    },
    resetVariables: function (mins, secs, started) {
        this.minutes = mins;
        this.seconds = secs;
        this.started = started;
        this.fillerIncrement = 200 / (this.minutes * 60);
        this.fillerHeight = 0;
    },
    startTimer: function () {
        this.resetVariables(25, 0, true);
    },
    startShortBreak: function () {
        this.resetVariables(5, 0, true);
    },
    startLongBreak: function () {
        this.resetVariables(15, 0, true);
    },
    stopTimer: function () {
        this.resetVariables(25, 0, false);
        this.updateDom();
    },
    toDoubleDigit: function (num) {
        if (num < 10) {
            return "0" + parseInt(num, 10);
        }
        return num;
    },
    updateDom: function () {
        this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
        this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
        this.fillerHeight = this.fillerHeight + this.fillerIncrement;
        this.fillerDom.style.height = this.fillerHeight + 'px';
    },
    intervalCallback: function () {
        if (!this.started) return false;
        if (this.seconds == 0) {
            if (this.minutes == 0) {
                this.timerComplete();
                return;
            }
            this.seconds = 59;
            this.minutes--;
        } else {
            this.seconds--;
        }
        this.updateDom();
    },
    timerComplete: function () {
        this.started = false;
        this.fillerHeight = 0;
    }
};

var test = (duration) => {
    console.log( duration )

    if( duration === 25 ) {
        pomodoro.resetVariables(duration, 0, true);
        setTimeout(() => {  pomodoro.resetVariables(5, 0, true); }, duration * 1000 );
  
    }
    else if( duration === 45 ) { 
        pomodoro.resetVariables(duration, 0, true);
        setTimeout(() => {  pomodoro.resetVariables(10, 0, true); }, duration * 1000 );
    }
    else {
        pomodoro.resetVariables(duration, 0, true);
        setTimeout(() => {  pomodoro.resetVariables(15, 0, true); }, duration * 1000 );
    } 

}
function test() {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

window.onload = function () {
    pomodoro.init();
};