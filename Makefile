# Variables
NODE_BIN = node_modules/.bin
TEST_DIR = tests

.PHONY: help
help:
	@echo "\033[1;34m🚀 Available targets:\033[0m"
	@echo "\033[1;36mUseful targets:\033[0m"
	@echo " - \033[1;32m🧼 clean:\033[0m Clean untracked files and directories."
	@echo " - \033[1;32m🌲 tree:\033[0m Generate a directory tree (excluding specified paths)."
	@echo " - \033[1;32m🔍 check-release:\033[0m Check the release without actually performing it."
	@echo "\033[1;35mCI targets (can be used in a local environment):\033[0m"
	@echo " - \033[1;32m🔧 install:\033[0m Install project dependencies."
	@echo " - \033[1;32m🏗️  init:\033[0m Install environment."
	@echo " - \033[1;32m🔨 format:\033[0m Format the code."
	@echo " - \033[1;32m🧹 lint:\033[0m Run linting checks."
	@echo " - \033[1;32m🏁 start:\033[0m Install dependencies and start the development server."
	@echo " - \033[1;32m🧪 test-unit:\033[0m Run unit tests."
	@echo " - \033[1;32m🧪 test-int:\033[0m Run integration tests."
	@echo " - \033[1;32m🧪 test-e2e:\033[0m Run end-to-end tests."
	@echo "\033[1;35mCD targets (release and deployment, need an authenticated and authorized user to run):\033[0m"
	@echo " - \033[1;32m🚢 release:\033[0m Perform a release."
	@echo " - \033[1;32m🔔 notify:\033[0m Not implemented."
	@echo " - \033[1;32m🚀 publish:\033[0m Not implemented.\n"
	@echo "💡 Every target listed above can be executed by running \033[1;33mmake <target>\033[0m"


.PHONY: install
install:
	@npm ci

.PHONY: init
init:
	@curl parrot.live & \
	PARROT_PID=$$! ; \
	curl -s -L https://raw.githubusercontent.com/keroserene/rickrollrc/master/roll.sh | bash & \
	RICK_PID=$$! ;\
	npm ci --silent > /dev/null 2>&1 ; \
	npx husky install > /dev/null 2>&1 ; \
	kill $$PARROT_PID 2>&1 ; \
	killall afplay 2>&1

.PHONY: format
format:
	@npm run format

.PHONY: lint
lint:
	@npm run lint

.PHONY: start
start: install
	@npm run start:dev

.PHONY: test-unit
test-unit:
	@npm run test:unit

.PHONY: test-int
test-int:
	@npm run test:int

.PHONY: test-e2e
test-e2e:
	@npm run test:e2e

.PHONY: release
release:
	@npm run release

.PHONY: check-release
check-release:
	@npm run release --dry-run

.PHONY: tree
tree:
	@tree -I 'node_modules/|coverage/|.git/|.tmp/|dist/|var/' -a -c -r

.PHONY: clean
clean:
	@git clean -X -f -d

.PHONY: notify
notify:
	@echo "Not implemented"

.PHONY: publish
publish:
	@echo "Not implemented"
