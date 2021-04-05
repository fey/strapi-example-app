install:
	npm ci

deploy:
	git push heroku HEAD:main
