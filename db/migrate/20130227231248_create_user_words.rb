class CreateUserWords < ActiveRecord::Migration
  def change
    create_table :user_words do |t|
      t.references :user
      t.references :word

      t.timestamps
    end
    add_index :user_words, :user_id
    add_index :user_words, :word_id
  end
end
