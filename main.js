let typingText = document.getElementById("typing");

//create array objects
let paragraphs =
[
    {
        phrase:'Heteronormative',
        definition:'Heteronormative refers to the assumption that all human beings'// are either male or female in both sex and gender, and that sexual and/or romantic attraction and activity only occurs, or is only normal, between heterosexual cis men and heterosexual cis women.',
    },
    {
        phrase: 'Triple Oppression',
        definition: 'Triple oppression is a theory developed by black socialists'// in the United States, such as Claudia Jones. The theory states that a connection exists between various types of oppression, specifically classism, racism, and sexism. It hypothesizes that all three types of oppression need to be overcome at once. It is also referred to as "double jeopardy", Jane Crow, or triple exploitation. ',
    },
    {
        phrase: 'Womanism',
        definition:'Womanism is a social theory based on the history and everyday'// experiences of women of color, especially black women. It seeks, according to womanist scholar Layli Maparyan (Phillips), to "restore the balance between people and the environment/nature and reconcile human life with the spiritual dimension". Writer Alice Walker coined the term "womanist" in a short story, "Coming Apart", in 1979.'
    }
];
//Get random object containing phrase with definition from array
let getPhrase = (array) =>{
    let para = array[parseInt(Math.random()*array.length)];
    return para;
}
//save chosen paragraph to variable
let phraseObj;
//set text that player will type
let gameText;

let characters = [];
// retrieving and storing paragraph array's object and their properties;
//changing the title to the word you'll learn the definition of
let gamePhrase;
let currentPhrase = document.getElementById('currentPhrase');
let focusIndex;
let focusChar;

//remove typed definition from array and replace it with a new one
function nextPhrase() {
    if (paragraphs.length === 0) {
        typingText.innerHTML = "Congratulations, you've completed the game!"
    } else {
        phraseObj = getPhrase(paragraphs);
        gameText = phraseObj.definition;
        //split paragraph into individual letters, map it to a new arrary and give each member of the new array a span element
        if(characters.length === 0){
            characters = gameText.split('').map(char => {
                let span = document.createElement('span');
                span.innerText = char;
                typingText.appendChild(span);
                return span;
            });
        }else{
            let oldText = typingText.querySelectorAll(".done");
            oldText.forEach(letter =>{
                letter.remove();
            })
            characters = /* character = an array of letters of the gameText*/ gameText.split('').map(char => {
            let span = document.createElement('span');
            span.innerText = char;
            typingText.appendChild(span);
            return span;
            });
        }
        gamePhrase = phraseObj.phrase;
        currentPhrase.style.display = 'none';
        currentPhrase.innerText = gamePhrase;
        currentPhrase.style.display = 'block';
        focusIndex = 0;
        focusChar = characters[focusIndex];
        focusChar.classList.add('focus');
        typingText.style.display = 'block';
    }
}

nextPhrase();

//setting up timer
let startTime = null;
let endTime = null;
let speedArray = [];
let wpm;
let stats = document.getElementById('currentStats');

//game stats variables
let phraseCounter = 0;let nextBtn = document.getElementById('nextWord')
let resetBtn = document.getElementById('resetGame')
let counter = document.getElementById('counter');
let speed = document.getElementById('speed');
let speedTotal = 0;


//timer functions
function startTimer(){
    if(!startTime){
        startTime = Date.now();
    } 
}
function resetTimes(){
    startTime = null;
    endTime= null;
}
//time calculation
function calcTime(startT,endT){
    let totalTime =  endT - startT;//returns milliseconds
    let seconds = totalTime/1000;
    let minutes = seconds/60;
    return minutes;
}
//wpm calculation
function wordsPM(totalTime){
    let cpm = (gameText.length)/totalTime;
    wpm = Math.floor(cpm/5);
    return wpm;
}
//displaying wpm
function displayStats(wpm){
    stats.innerText = 'Typing Speed: ' + wpm + ' words per minute ';
    typingText.style.display = 'none';
    stats.style.display = 'inherit';
}
//calculate and display average wpm
function calcAvgSpeed(wpm) {
    speedArray.push(wpm);
    if (speedArray.length > 1) {
        for (let i = 0; i < speedArray.length; i++) {
            speedTotal += speedArray[i];
        }
        let avgSpeed = speedTotal / speedArray.length;
        return speed.innerText = 'Average typing speed: ' + avgSpeed;
    }else{
        return speed.innerText = 'Average typing speed: ' + speedArray[0];
    }
        
}
//increment and display phrase counter
function countPhrases() {
    phraseCounter++;
    counter.innerText = 'Phrases learned: ' + phraseCounter;
}

// clear current wpm
function clearing(){
    setTimeout(clearStats(),5000);
}
function clearStats(){
    typingText.style.display = 'block';
    stats.style.display = 'none';
    console.log("You gots this, I know you'll figure this out or ask for help if you can't :*")
}

function game({ key }) {
    //starting timer
    startTimer();

    //checks correct key is pressed
    if (key === focusChar.innerText) {
        focusChar.classList.remove('focus');
        focusChar.classList.add('done');
        focusChar = characters[++focusIndex];


        if (focusIndex >= characters.length) {//when you get to the last letter
            //set the end time
            endTime = Date.now();

            //calculate the total time spent typing
            let minutes = calcTime(startTime, endTime);

            //calculate the words per minute
            let wpm = wordsPM(minutes);

            //display wpm
            //displayStats(wpm);

            //increment phrase counter and display
            countPhrases();

            //push wpm to speed array and
            calcAvgSpeed(wpm);
            
            //reset timers
            resetTimes();

            paragraphs.pop(phraseObj);

            //sets next phrase
            nextPhrase();
            
            //clear the currently displayed wpm and display the next phrase
            //clearing();
        } else {
            focusChar.classList.add('focus');
        }

    }
}
function resetGame(){

}

//event Listeners
document.addEventListener('keydown',game);

    
    