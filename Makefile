.PHONY: default install start test dev

.DEFAULT_GOAL := help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: ## Install project's dependencies
	@echo "Install project deps"
	yarn install --frozen-lockfile
	yarn run database:create

build:
	@echo "Build project"
	yarn build

start: ## Start project
	@echo "Start the project"
	yarn run start

dev: ## Start project (dev mode)
	@echo "Start the project (dev mode)"
	yarn run dev

test: ## Launch the project's tests
	@echo "Launch the tests"
	yarn run cypress:run --config video=false screenshot=false && \
	yarn jest --bail
