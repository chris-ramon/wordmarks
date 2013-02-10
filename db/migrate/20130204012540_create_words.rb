class CreateWords < ActiveRecord::Migration
  def change
    create_table :words do |t|
      t.string :word
      t.references :language

      t.timestamps
    end
    add_index :words, :language_id
  end
end
