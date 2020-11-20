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
//Get random paragraph from array
let phraseObj = paragraphs[parseInt(Math.random()*paragraphs.length)];
let gameText = phraseObj.definition;

//split paragraph into individual letters, map it to a new arrary and give each memeber of the new array a span element
let characters = gameText.split('').map(char =>{
    let span = document.createElement('span');
    span.innerText = char;
    typingText.appendChild(span);
    return span;
});

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

function game({key}){
    if(!startTime){
        startTime = Date.now();
    }    
    if(key === focusChar.innerText){
        focusChar.classList.remove('focus');
        focusChar.classList.add('done');
        focusChar = characters[++focusIndex];
        if(focusIndex >= characters.length){
            document.removeEventListener('keydown',game);

            endTime = Date.now();
            let totalTime =  endTime - startTime;//returns milliseconds
            let seconds = totalTime/1000;
            let minutes = seconds/60;
            let cpm = (gameText.length)/minutes;
            wpm = Math.floor(cpm/5);
            stats.innerText = 'You typed: '+ wpm + ' words per minute ';

            typingText.style.display = 'none';
            stats.style.display = 'inherit';

            

        }else{
            focusChar.classList.add('focus');  
        }
        
    }
}
//game counter
let resetBtn = document.getElementById('resetGame')
let counter = document.getElementById('counter');
let avgSpeed = document.getElementById('speed');
let phraseCounter = 0;
let speedTotal = 0;
counter.innerText = 'phrases learned: ' +phraseCounter;
for(let i = 0; i< speedArray.length; i++){
    speedTotal += speedArray[i];
}
avgSpeed.innerText = 'Average typing speed: ' + speedTotal/speedArray.length;

function reset(){
    speedArray.push(wpm);
    phraseCounter++;
    paragraphs.pop(phraseObj);
    startTime = null;
    endTime= null;
}

//event Listeners
resetBtn.addEventListener('click', reset);
document.addEventListener('keydown',game);

    
    