/**
 * Author: Lincoln Bunker
 * Date: 16 March 2026
 * Purpose: Code for the functionality of this quiz app
 */

"use strict";

//Task 1: Initialize Varaiables and Select DOM Elements

//create an array for the quiz questions
let quizArray = [
    {
        question: "Who free soloed El Capitan in Yosemite National Park?",
        options: [
            "Tommy Caldwell",
            "Dean Potter",
            "Alex Honnold",
            "Lynn Hill"
        ],
        answer: "Alex Honnold"
    },
    {
        question: "Which of the following is not a Utah National Park?",
        options: [
            "Death Valley",
            "Arches",
            "Capitol Reef",
            "Canyonlands"
        ],
        answer: "Death Valley"
    },
    {
        question: "What type of rock is primarily in Little Cottonwood Canyon, Utah?",
        options: [
            "Limestone",
            "Granite",
            "Sandstone",
            "Cobblestone"
        ],
        answer: "Granite"
    },
    {
        question: "What type of climbing requires you to place your own gear in cracks on the wall?",
        options: [
            "Bouldering",
            "Trad",
            "Free Soloing",
            "Top Rope"
        ],
        answer: "Trad"
    }
];

//vars and constants on the DOM for HTML elements
const quizContainer = document.getElementById('quizContainer');
const questionDiv = document.getElementById('question');
const optionsUl = document.getElementById('options');
const nextButton = document.getElementById('nextButton');

//score variables
let initalScore = 0;
const scoreDiv = document.getElementById('score');

//variable for tracking what quiz question the user is on
let quizQuestion = 0

//Task 2: Write a function to Render the Current question
const displayCurrentQuestion = (quizArray, questionNum) => {
    nextButton.hidden = true; //hide nextButton so can't skip questions
    let question = document.createElement('h3'); //create an element for the question
    question.textContent = quizArray[questionNum].question; //set the content to what question is in the array index
    questionDiv.appendChild(question)

    for (let i = 0; i < quizArray[questionNum].options.length; i++) { //loop through the options at the array index
        let option = document.createElement('li'); //create a li element
        option.textContent = quizArray[questionNum].options[i]; //set the text content
        optionsUl.appendChild(option); //append the li item to the parent element
        option.addEventListener('click', () => {
            handleOptionSelected(option, quizArray[questionNum]); //add event listener for when an option is selected
        });
    }
    quizQuestion += 1; //increment the quiz question
}

//initially call displayCurrentQuestion
displayCurrentQuestion(quizArray, quizQuestion);

//Task 3: Write a function to Handle the Option Selected
const handleOptionSelected = (selectedOption, currentQuestion) => {
    const allOptions = optionsUl.querySelectorAll('li'); //query all the li elements representing the options
    allOptions.forEach(option => option.style.pointerEvents = 'none'); //allow the user to only select 1 option per question

    //logic to check if the selected option is correct
    if (selectedOption.textContent.trim() === currentQuestion.answer.trim()) {
        selectedOption.classList.add('correct'); //highlights the correct answer green
        initalScore++; //if correct, increment score
    } else {
        selectedOption.classList.add('wrong'); //highlights the wrong answer red
    }
    nextButton.hidden = false; //show nextButton after the question is answered
}

//Task 4: Write a function to Handle the Next Question Logic. This also displays the score at the end.
const displayNextQuestion = () => {
    //check to see if the quiz questions have run out
    if (quizQuestion < quizArray.length) {
        //reset the options and question
        optionsUl.textContent = '';
        questionDiv.textContent = '';
        displayCurrentQuestion(quizArray, quizQuestion); //call displayCurrentQuestion with the next quizQuestion
    } else {
        //all questions have been answered, show final score
        quizContainer.innerHTML = `<h2>Your score ${initalScore} / ${quizArray.length}</h2>`;
        nextButton.style.display = 'none';
    }
}

//add event listener for when nextButton is clicked
nextButton.addEventListener('click', () => {
    displayNextQuestion()
})