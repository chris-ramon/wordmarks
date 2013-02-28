class UserWord < ActiveRecord::Base
  belongs_to :user
  belongs_to :word
  # attr_accessible :title, :body
end
