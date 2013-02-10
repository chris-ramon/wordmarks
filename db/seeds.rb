["Spanish", "English"].each do |language|
  Language.find_or_create_by_name(language)
end