class WordsController < ApplicationController
  def index
    @words = Word.all
    respond_to do |format|
      format.html
      format.json { render :json => @words }
    end
  end
  def create
    Word.create!(params[:word])
    redirect_to root_path
  end
end
