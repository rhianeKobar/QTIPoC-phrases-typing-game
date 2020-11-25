let typingText = document.getElementById("typing");

//create array objects
let paragraphs =
[
    {
        phrase:'Heteronormative',
        definition:'Heteronormative',// refers to the assumption that all human beings'// are either male or female in both sex and gender, and that sexual and/or romantic attraction and activity only occurs, or is only normal, between heterosexual cis men and heterosexual cis women.',
    },
    {
        phrase: 'Triple Oppression',
        definition: 'Triple',// oppression is a theory developed by black socialists'// in the United States, such as Claudia Jones. The theory states that a connection exists between various types of oppression, specifically classism, racism, and sexism. It hypothesizes that all three types of oppression need to be overcome at once. It is also referred to as "double jeopardy", Jane Crow, or triple exploitation. ',
    },
    {
        phrase: 'Womanism',
        definition:'Womanism'// is a social theory based on the history and everyday'// experiences of women of color, especially black women. It seeks, according to womanist scholar Layli Maparyan (Phillips), to "restore the balance between people and the environment/nature and reconcile human life with the spiritual dimension". Writer Alice Walker coined the term "womanist" in a short story, "Coming Apart", in 1979.'
    }
];
//Get random paragraph from array

let phraseObj = paragraphs[parseInt(Math.random()*paragraphs.length)];
let gameText = phraseObj.definition;

//split paragraph into individual letters, map it to a new arrary and give each memeber of the new array a span element

//maybe I need to make this a function
let characters = gameText.split('').map(char =>{
        let span = document.createElement('span');
        span.innerText = char;
        typingText.appendChild(span);
        return span;
});

//

// retrieving and storing paragraph array's object and their properties;
let gamePhrase = phraseObj.phrase;
document.getElementById('currentPhrase').innerText = gamePhrase;
let focusIndex =  0;
let focusChar = characters[focusIndex];
focusChar.classList.add('focus');

//setting up timer
let startTime = null;
let endTime = null;
let speedArray = [];
let wpm;
let stats = document.getElementById('currentStats');

//game counter variables
let phraseCounter = 0;let nextBtn = document.getElementById('nextWord')
let resetBtn = document.getElementById('resetGame')
let counter = document.getElementById('counter');

function startTimer(){
    if(!startTime){
        startTime = Date.now();
    } 
}
function calcTime(startT,endT){
    let totalTime =  endT - startT;//returns milliseconds
    let seconds = totalTime/1000;
    let minutes = seconds/60;
    return minutes;
}
function wordsPM(totalTime){
    let cpm = (gameText.length)/totalTime;
    wpm = Math.floor(cpm/5);
    return wpm;
}
function game({key}){
    //starting timer
     startTimer();   
    //checks correct key is pressed
    if(key === focusChar.innerText){
        focusChar.classList.remove('focus');
        focusChar.classList.add('done');
        focusChar = characters[++focusIndex];

        
        if(focusIndex >= characters.length){
            document.removeEventListener('keydown',game);
            //yep
            endTime = Date.now();
            let minutes = calcTime(startTime,endTime); 
            let wpm = wordsPM(minutes);
            stats.innerText = 'Typing Speed: '+ wpm + ' words per minute ';

            typingText.style.display = 'none';
            stats.style.display = 'inherit';
            phraseCounter++;
            counter.innerText = 'Phrases learned: ' + phraseCounter;

            //cna YOu see what I typed in discord?

        }else{
            focusChar.classList.add('focus');  
        }
        
    }
}
//ye I want another sentence to appear
//game counter

let avgSpeed = document.getElementById('speed');

let speedTotal = 0;
//
function resetTimes(){
    startTime = null;
    endTime= null;
}

function nextPhrase(){
    speedArray.push(wpm);
    for(let i = 0; i< speedArray.length; i++){
        speedTotal += speedArray[i];
    }
    avgSpeed.innerText = 'Average typing speed: ' + speedTotal/speedArray.length;
    
    resetTimes();

    paragraphs.pop(phraseObj);
    phraseObj = paragraphs[parseInt(Math.random()*paragraphs.length)];
    
    
}

//event Listeners
nextBtn.addEventListener('click', nextPhrase);
document.addEventListener('keydown',game);

    
    