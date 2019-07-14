(function ($) {

    $.fn.extend({

        addTemporaryClass: function (className, duration) {
            var elements = this;
            setTimeout(function () {
                elements.removeClass(className);
            }, duration);

            return this.each(function () {
                $(this).addClass(className);
            });
        }

    });

})(jQuery);

var playerSequence = [];
var sequence = [];
var sequenceCount = 0;
var sound1 = new Audio('assets/sounds/1.wav');
var sound2 = new Audio('assets/sounds/2.wav');
var sound3 = new Audio('assets/sounds/3.wav');
var sound4 = new Audio('assets/sounds/4.wav');
var soundList = [sound1, sound2, sound3, sound4];
var bestScore = 0;
var currentScore = 0;

function playSequence(sequence, sequenceCount) {
    setTimeout(function () {
        var current = sequence[sequenceCount]
        $('#' + current).addTemporaryClass('lit', 500);
        soundList[current - 1].play();
        sequenceCount++;
        if (sequenceCount < sequence.length) {
            playSequence(sequence, sequenceCount)
        }
    },  700)
    playerSequence = [];
}

function getNext() {
    number = Math.random() * 4;
    sequence.push(Math.ceil(number));
    playSequence(sequence, sequenceCount);
    
}


function endGame() {
    $('#messages').html("You lose! Your score was " + (currentScore) + "!");
    if (currentScore > bestScore) {
        bestScore = currentScore;
        $('#bestScore').html(bestScore);
    }
    playerSequence = [];
    sequence = [];
    sequenceCount = 0;
    currentScore = 0;
}

function checkForMatch(pseq) {
    for (i=0; i<pseq.length; i++) {
        if (pseq[i] != sequence[i]) {
            endGame();
        }
        if (pseq.length === sequence.length && i === (sequence.length - 1) && (pseq[i] === sequence[i])) {
            currentScore++;
            $('#currentScore').html(currentScore);
            setTimeout(function() {
                getNext(); },
                1000)
        }
    }
    return true;
}


$(document).ready(function () {
    $('#bestScore').html(bestScore);
    $('#currentScore').html(currentScore);
    $('#go').click(function () {
        $('#messages').html("");
        getNext();
    })
    $('#reset').click(function () {
        playerSequence = [];
        sequence = [];
        sequenceCount = 0;
        currentScore = 0;
        $('#currentScore').html(currentScore);
        $('#messages').html("");
    })
    $('.circle').click(function () {
        if (sequence.length > 0) {
            $(this).addTemporaryClass('lit', 500);
            soundList[($(this).attr('id')) -1].pause();
            soundList[($(this).attr('id')) -1].load();
            soundList[($(this).attr('id')) -1].play();
            playerSequence.push(parseInt($(this).attr('id')));
            checkForMatch(playerSequence);
        } else {
            $('#messages').html("Press play to begin!")
        }
        
    
    })
});



