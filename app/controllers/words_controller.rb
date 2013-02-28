class WordsController < ApplicationController
  def index
    @user_word = UserWord.where(:user_id => current_user.id).joins(:word)
    respond_to do |format|
      format.html
      format.json { render :json => @user_word.to_json(:include => :word) }
    end
  end
  def create
    word = Word.find_or_create_by_word(params[:word])

    user_word = UserWord.new
    user_word.user = current_user
    user_word.word = word
    user_word.save()

    flash[:notice] = "#{word.word} was successfully saved."

    redirect_to root_path
  end
end
