/**
 * This script adds a toggle button to the constitution page (Constitution.md) to show or hide voting records of each amendment.
 * 
 * It appends the button to the 'post-header' div. Clicking the button shows or hides all buttons with the class 'vote-record'
 * 
 * Created by Karl Miller on 5/25/2021
 */

// =========== Script only executes once page is loaded ===========

document.addEventListener("DOMContentLoaded", function() {

// =========== Flag ===========

var areVotesShown = true;

// =========== Get HTML elements ===========

var postInsertAtElement = document.getElementsByClassName("post-header")[0]; 
var toggleButton = document.createElement("button");
let voteRecordElements = document.getElementsByClassName("vote-record");

// =========== Configure HTML elements ===========

toggleButton.id = "vote-toggle-button";
toggleButton.innerHTML = "Hide Vote Records";
postInsertAtElement.append(toggleButton)

// =========== Hide/Show Votes function ===========

function toggleVoteShow(ev) {
    if(areVotesShown) {
        for(let i = 0; i < voteRecordElements.length; i++) {
            voteRecordElements[i].style.display = 'None';
        }
        areVotesShown = false;
        toggleButton.innerHTML = "Show Vote Records";
    }
    else {
        for(let i = 0; i < voteRecordElements.length; i++) {
            voteRecordElements[i].style.display = 'block';
        }
        areVotesShown = true;
        toggleButton.innerHTML = "Hide Vote Records";
    }
}

// =========== Button Listener ===========

toggleButton.addEventListener('click', toggleVoteShow);

toggleButton.click(); // start by hiding elements

// =========== DOMContent Loaded End brace ===========

})