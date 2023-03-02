const hrs = document.querySelector('#hrs');
const min = document.querySelector('#min');
const sec = document.querySelector('#sec');
const milli = document.querySelector('#milli');

document.querySelector('#start').addEventListener('click',startWatch);
document.querySelector('#pause').addEventListener('click',pauseWatch);
document.querySelector('#reset').addEventListener('click',resetWatch);

let int = null;
let [hours,minutes,seconds,milliseconds] = [0,0,0,0];
let remainingTime = 0 ;

function startWatch(){
    if(int!==null){
        clearInterval(int);
    }
    resetWatch();
    remainingTime = getInput();
    if(remainingTime === 0){
        alert('No Input')
        return null;
    }
    int = setInterval(displayTime,10)
}

const button = document.querySelector('#pause');  
function pauseWatch(){
    if(int){
        clearInterval(int)
        int = null;
        button.innerText = 'Restart';
    }
    else if(remainingTime > 0){
        int=setInterval(displayTime,10);
        button.innerText  = 'Pause';
    }
}

function resetWatch(){
    clearInterval(int)
    hrs.textContent = '00';
    min.textContent = '00';
    sec.textContent = '00';
    milli.textContent = '00';
    [hours,minutes,seconds,milliseconds] = [0,0,0,0];
    button.innerHTML = 'Pause';
    remainingTime = 0;
}


function displayTime (){
    remainingTime -= 10;
    if(milliseconds === 0){
        milliseconds = 1000;
    }
    milliseconds -= 10;
    seconds = Math.floor(remainingTime/1000);
    minutes = Math.floor(seconds/60);
    hours = Math.floor(minutes/60);
    seconds %= 60;
    minutes %= 60;

    hrs.textContent = hours < 10 ? '0'+ hours : hours ;
    min.textContent = minutes < 10 ? '0'+ minutes : minutes ;
    sec.textContent = seconds < 10 ? '0'+ seconds : seconds ;
    milli.textContent = (milliseconds/10) < 10 ? '0'+ (milliseconds/10) : (milliseconds/10) ;
    if(seconds === 0 && minutes === 0 && hours === 0 && milliseconds === 0){
        resetWatch();
    }
}

function getInput(){
    const h = +(document.querySelector('#hrsinp').value);
    const m = +(document.querySelector('#mininp').value);
    const s = +(document.querySelector('#secinp').value);

    document.querySelector('#hrsinp').value = 0;
    document.querySelector('#mininp').value = 0;
    document.querySelector('#secinp').value = 0;

    return ((h*3600) + (m*60) + s)*1000;
}
