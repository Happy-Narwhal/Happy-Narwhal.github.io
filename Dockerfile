# Dockerfile

FROM ruby:3.2.2

# WORKDIR /usr/src/app
# WORKDIR /code
WORKDIR /app
COPY . .
# COPY Gemfile Gemfile.lock ./
ENV BUNDLE_FROZEN=true

RUN bundle install
print "In the Docker"

EXPOSE 8080

Entrypoint ["ruby", "./server.rb"]

# CMD ["ruby", "./server.rb"]
# CMD ["bundle", "exec", "rackup", "--host", "0.0.0.0", "-p", "8080"]
