$(function () {
    var config = {
        practice_btn : $('#practice-btn'),
        practice_wrapper : $('#practice-wrapper'),
        result_wrapper : $('#result-wrapper'),
        word_wrapper : $('#word-wrapper'),
        translation_wrapper : $('#translation-wrapper'),
        translation_input : $('#translation-input'),
        finish_wrapper: $('#finish-wrapper')
    }
    window.Wordmark.initialize(config);
});
window.Wordmark = {
    initialize: function (config){
        this.config = config;
        this.bindEvents();
    },
    bindEvents: function (){
        // bindings.
        this.config.practice_btn.on('click', this.initialize_practice);
    },
    // bindings functions.
    initialize_practice: function () {
        var self = Wordmark;

        self.words = self.get_words();
        self.current_word_index = 0;

        // cleaning dom wrappers
        self.config.result_wrapper.html('');
        self.config.finish_wrapper.html('');

        self.set_word();

        self.config.translation_input.on('keyup', self.verify_translation);
    },
    set_word: function() {
        // get a word from self.words and injects it to the dom
        var i = this.current_word_index;
        var words_size = this.words.length;
        if (i < words_size) {
            var word = this.words[i];
            this.current_word = word.word;
            this.current_word_translations = word.translations;
            // view: refactor
            this.config.word_wrapper.html(this.current_word);
        }
        else {
            this.finish_practice();
        }
    },
    // verifying if the translation from the input
    // is correct
    verify_translation: function (e) {
        if (e.keyCode < 65 || e.keyCode > 90)
            return;
        var self = Wordmark;
        var _translations = self.current_word_translations;

        var el = $(this);
        var words = el.val();

        for(i in _translations) {
            if ( words == _translations[i] ) {
                // view: refactor
                self.config.result_wrapper.html('Correct !');
                self.current_word_index += 1;
                self.set_word();
                break;
            }
            else
                self.config.result_wrapper.html('Incorrect !');
        }
    },
    // API
    get_words: function () {
        return [
            {
                'word': 'vetted',
                'translations': ['vetados', 'examinados']
            },
            {
                'word': 'daunting',
                'translations': ['desalentador', 'intimidante']
            }
        ]
    },
    finish_practice: function (){
        this.config.translation_input.off('keyup', this.verify_translation);
        this.config.finish_wrapper.html('Practice finished !');
    }
};
