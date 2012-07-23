# encoding: utf-8


# before using:
# gem install bundler
# bundle install

require 'rubygems'
require 'roo'
require 'json'

doc = Excel.new("products.xls")
doc.default_sheet = doc.sheets.first

products = []

3.upto(doc.last_row) do |row|
	puts "Importing row #{row}"
	product = {}
	1.upto(doc.last_column) do |col|
		key = doc.cell(2,col)
		val = doc.cell(row,col)

		val = case key
			when "itemNumber"
				val.to_i.to_s
			when "strap", "ptrap"
				!val.zero?
			when "description"
				"<p>#{val}</p>"
			when "features"
				lines = val.split("\n")
				lis = lines.inject("") {|memo, line| "#{memo}<li>#{line}</li>" }
				"<ul>#{lis}</ul>"
			when "rrp"
				val
			when "heroImage", "lineImage", "boxImage"
				val.gsub(/\s/,'-')
			else
				val
		end

		#fix invalid chars
		# puts val
		# puts val.kind_of? String
		if val.kind_of? String
			val.gsub!(/’/,"'") 
			val.gsub!(/®/,"&reg;")
			val.gsub!(/™/,"&trade;")
		end

		product[key] = val
	end
	products << product
end

puts "Imported #{products.size} products"

json = JSON.pretty_generate(products)

file = File.new("../js/app/models/product.js","w")
file.write("var allProducts = "+json)
file.close