require 'sinatra'

set :views, File.dirname(__FILE__) + '/views'
# set :public_folder, File.dirname(__FILE__) + '/public'

get '/' do
  erb :home
end

get '/:path' do
  @path = params[:path].chomp('.html')
  begin
    erb @path.to_sym, layout: :layout
  rescue Errno::ENOENT
    erb :home
  end
end
