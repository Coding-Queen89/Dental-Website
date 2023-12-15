const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizbox = document.querySelector('.quiz-box');

startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}
exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}
continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizbox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}
let questionCount = 0;
let questionNumb = 2;
let score = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if(questionCount < questions.length-1){
        questionCount++;
        showQuestions(questionCount);
        questionCounter(questionNumb++);

    nextBtn.classList.remove('active');

    }else{
        console.log('Submit!');
    }
}
const optionList = document.querySelector('.option-list');
//getting questions and options from array
function showQuestions(ind) {
    const q = document.querySelector('.question-text');
    q.textContent = `${questions[ind].numb}.${questions[ind].question}`;

    let optionTag = `<div class="option"><span>${questions[ind].options[0]}</span></div>
    <div class="option"><span>${questions[ind].options[1]}</span></div>
    <div class="option"><span>${questions[ind].options[2]}</span></div>
    <div class="option"><span>${questions[ind].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for(let i=0; i<option.length; i++){
        option[i].setAttribute('onclick','optionSelected(this)');
    }
}
function optionSelected(answer){
    let userans = answer.textContent;
    let correctans = questions[questionCount].answer;
    let allOptions = optionList.children.length;
    console.log(correctans);
    if(userans == correctans){
        answer.classList.add('correct');
        score++;
        headerScore();
    }else{
        answer.classList.add('incorrect');
        //if answer is wrong, auto select the correct answer.
        for(let i=0; i<allOptions; i++){
            if(optionList.children[i].textContent == correctans){
                optionList.children[i].setAttribute('class','option correct');
            }
        }
    }

    //If user has selected, disable all options
    for(let i=0; i<allOptions; i++){
        optionList.children[i].classList.add('disable');
    }
    nextBtn.classList.add('active');
}

function questionCounter(ind){
    const tot = document.querySelector('.question-total');
    tot.textContent = `${ind} of ${questions.length} Questions`
}


function headerScore(){
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${score}/${questions.length}`;
}
