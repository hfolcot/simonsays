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

var playerSequence = []
var sequence = []
var sequenceCount = 0;
var sound1 = new Audio('sounds/1.wav')
var sound2 = new Audio('sounds/2.wav')
var sound3 = new Audio('sounds/3.wav')
var sound4 = new Audio('sounds/4.wav')
soundList = [sound1, sound2, sound3, sound4]
function playSequence(sequence, sequenceCount) {
    setTimeout(function () {
        var current = sequence[sequenceCount]
        console.log(current)
        $('#' + current).addTemporaryClass('lit', 500);
        soundList[current - 1].play();
        sequenceCount++;
        if (sequenceCount < sequence.length) {
            playSequence(sequence, sequenceCount)
        }
        console.log(sequence);
        console.log(sequenceCount)
    },  700)

}

function getNext() {
    number = Math.random() * 4;
    sequence.push(Math.ceil(number));
    playSequence(sequence, sequenceCount);
}

function playerGo() {
    $('.circle').click(function () {
        $(this).addTemporaryClass('lit', 500);
        playerSequence.push(parseInt($(this).attr('id')));
        console.log(playerSequence);
    })
}

$(document).ready(function () {
    $('#1');
    $('#2');
    $('#3');
    $('#4');
    
    $('#go').click(function () {
        getNext();
    })
    playerGo();
});



