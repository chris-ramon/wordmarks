window.wordsmark = {};
$(function () {
    var practice_btn = $('#practice-btn'),
        practice_wrapper = $('#practice-wrapper'),
        word_wrapper = $('#word-wrapper'),
        translation_wrapper = $('#translation-wrapper'),
        result_wrapper = $('#result-wrapper');

    // bindings.
    practice_btn.on('click', initialize_practice);

    // bindings functions.
    function initialize_practice() {
        var words = get_words();
        word_wrapper.append(words[0].word);

    }

    function get_words() {
        return [{'word': 'vetted'}, {'word': 'daunting'}]
    }
});


