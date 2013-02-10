class WordsController < ApplicationController
  def index
    @words = Word.all
  end
  def create
    Word.create!(params[:word])
    redirect_to root_path
  end
end
