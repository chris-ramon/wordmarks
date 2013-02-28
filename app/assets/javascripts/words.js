$(function () {
    var config = {
        top_navbar: $('#top_navbar'),
        practice_btn : $('#practice-btn'),
        words_ul: $('#words_ul'),
        practice_wrapper : $('#practice-wrapper'),
        result_wrapper : $('#result-wrapper'),
        word_wrapper : $('#word-wrapper'),
        translation_input : $('#translation-input'),
        finish_wrapper: $('#finish-wrapper')
    }
    window.Wordmark.initialize(config);
});

var Wordmark = {
    views: {},
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

        // clean the DOM for practice mode
        self.clean_dom_for_practice_mode();

        self.words = self.get_words();
        self.current_word_index = 0;

        // cleaning dom wrappers
        self.config.result_wrapper.html('');

        // add new word to the dom
        self.set_word();

        // TODO: move this
        self.config.practice_wrapper.show();
        self.config.translation_input.focus();
        self.config.finish_wrapper.hide();

        // verifies if written word is valid
        self.config.translation_input.on('keyup', self.verify_translation);
    },

    update_bindings: function() {
        $('#practice_again_btn').on('click', this.initialize_practice);
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
        var result_view;

        for(i in _translations) {
            if ( words == _translations[i] ) {
                result_view = new self.views.result_wrapper_view({
                    el: self.config.result_wrapper,
                    result: 'success'
                });
                result_view.render();
                self.current_word_index += 1;
                self.set_word();
                break;
            }
            else {
                result_view = new self.views.result_wrapper_view({
                    el: self.config.result_wrapper,
                    result: 'fail'
                });
                result_view.render();
            }
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
        this.config.finish_wrapper.show();
    },

    // clean DOM for practice mode
    clean_dom_for_practice_mode: function() {
        this.config.top_navbar.hide();
        this.config.practice_btn.hide();
        this.config.words_ul.hide();
    }
};

window.Wordmark = Wordmark;

// views
Wordmark.views.result_wrapper_view = Backbone.View.extend({
    render: function() {
        var result = this.options.result;
        if (result == 'success') {
            this.$el.removeClass();
            this.$el.addClass('span2 alert alert-success');
            this.$el.html('Correct !');
        }
        else if(result == 'fail') {
            this.$el.removeClass();
            this.$el.addClass('span2 alert alert-error');
            this.$el.html('Incorrect !');
        }
    }
});

