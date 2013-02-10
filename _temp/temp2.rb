require 'json'
array = JSON.parse(IO.read("array.json"))
array_translate = array[0][2]
x = array_translate.collect do |s|  
    s[0]
end
puts x
# if /^\w+$/ =~ 'shaystack'
#     puts 1
# else
#     puts 0
# end