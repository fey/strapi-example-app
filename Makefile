install:
	npm install

prepare-env:
	cp -n .env.example .env || true

setup: prepare-env install

start:
	npm start

deploy:
	git push heroku HEAD:main
