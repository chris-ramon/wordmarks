class Word < ActiveRecord::Base
  belongs_to :language
  attr_accessible :word
end
