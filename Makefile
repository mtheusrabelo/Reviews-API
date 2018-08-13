run-local:
	npm run start

dc-up:
	docker-compose up

dc-dependencies:
	docker-compose up mongodb redis

dc-reviews:
	docker-compose up reviews-api

dc-reviews-build:
	docker-compose up --build reviews-api

dc-mongo:
	docker-compose up mongodb

dc-redis:
	docker-compose up redis
