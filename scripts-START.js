let countdown; // global variable
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]')

function timer(seconds) {
  // clear any existing timers to avoid running at the sime time on one screen
  clearInterval(countdown)
  const now = Date.now();
  const then = now + seconds * 1000;
  // console.log({now, then}); first  test
  displayTimeLeft(seconds) //stops delay on countdown
  displayEnd(then);

  // set countdown to update
  countdown = setInterval(() => {
    const secLeft = Math.round((then - Date.now()) / 1000);
    //check if we should stop interval
    if(secLeft <= 0 ) {
      clearInterval(countdown); // clear timer
      return;
    }
    //display timer
    displayTimeLeft(secLeft);

  },1000)


  function displayTimeLeft(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60 );
    const secs = Math.floor(seconds);
    const restOfMinutes = minutes % 60;
    const restOfSeconds = seconds % 60;
    //console.log({minutes, restOfSeconds}); //test
    const display = `${hours}:${minutes > 59 ? '':''}${restOfMinutes}:${restOfSeconds < 10 ? '0' : ''}${restOfSeconds}`; // ? for show seconds seconds in  1:05
    document.title = display; // runs in browser tab
    timerDisplay.textContent = display ;

  }
}
//get from console date.now(times) then set pass that into new Date(timestamp)
function displayEnd(timestamp) {
  const end = new Date(timestamp);
  const hours  = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `See you at ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer () {
  const seconds = parseInt(this.dataset.time);
  //console.log(seconds);
  timer(seconds)
}

buttons.forEach(button => button.addEventListener('click',startTimer));
document.customForm.addEventListener('submit',function(e){
  e.preventDefault()
  const mins = this.minutes.value;
  //console.log(mins);
  timer(mins * 60);
  this.reset();


})
