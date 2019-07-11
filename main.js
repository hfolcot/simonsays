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

var sequence = []
var sequenceCount = 0;
function playSequence(sequence, sequenceCount) {
    setTimeout(function () {
        $('#' + sequence[sequenceCount]).addTemporaryClass('lit', 500);
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

$(document).ready(function () {
    $('#1');
    $('#2');
    $('#3');
    $('#4');
    $('.circle').click(function () {
        $(this).addTemporaryClass('lit', 500);
        getNext();
    })
    $('#go').click(function () {
        getNext();
    })
});



