.DEFAULT_GOAL := help

install:
	cd api && npm i
	cd ui && npm i

init:
	@make --no-print-directory install
	docker-compose up -d
	@make --no-print-directory prisma migrate dev

kill:
	docker-compose down

restart:
	docker-compose restart

logs-api:
	docker-compose logs -f api

logs-ui:
	docker-compose logs -f ui

exec:
	docker-compose exec -w /app $(service) sh -c "$(command)"

build-api:
	@make --no-print-directory exec service="api" command="npm run build"

build-ui:
	@make --no-print-directory exec service="ui" command="npm run build"

test-api:
	@make --no-print-directory exec service="api" command="npm test"

test-ui:
	@make --no-print-directory exec service="ui" command="npm test"

prisma:
	@make --no-print-directory exec service="api" command="npx prisma $(filter-out $@,$(MAKECMDGOALS))"

#############################################################
# "Help Documentation"
#############################################################

help:
	@echo "  Project Commands"
	@echo "  |"
	@echo "  |_ help (default)              - Show this message"
	@echo "  |"
	@echo "  |_ Manage Environment:"
	@echo "  |  install                     - Install dependencies"
	@echo "  |  init                        - Spin up docker environment"
	@echo "  |  kill                        - Stop/remove container and network associated with it"
	@echo "  |  restart                     - Restart container"
	@echo "  |  logs-api                    - Show Express API logs"
	@echo "  |  logs-ui                     - Show React Vite logs"
	@echo "  |  build-api                   - Build the API for production"
	@echo "  |  build-ui                    - Build vite react app for production"
	@echo "  |  test-api                    - Run npm test for the API"
	@echo "  |  test-ui                     - Run npm test for the UI"
	@echo "  |  prisma                      - Run prisma (e.g. make prisma migrate dev)"
	@echo "  |_________________________________________________________________________________________________________"
	@echo " "


.PHONY:
	install
	init
	kill
	restart
	logs-api
	logs-ui
	build-api
	build-ui
	test-api
	test-ui
	prisma
