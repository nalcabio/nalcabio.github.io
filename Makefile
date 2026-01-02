# -*- coding: utf-8; mode: makefile-gmake; -*-

MAKEFLAGS += --no-print-directory --warn-undefined-variables

SHELL := bash
.SHELLFLAGS := -euo pipefail -c

HERE := $(shell cd -P -- $(shell dirname -- $$0) && pwd -P)

.PHONY: all
all: build

include .titletk.mk

.PHONY: gem-install
gem-install: has-command-gem
	@gem install --user-install --no-document bundler -v '~>4'

.PHONY: bundle-install
bundle-install: has-command-bundle
	@bundle install

.PHONY: npm-install
npm-install: has-command-npm
	@npm install .

.PHONY: install-deps
install-deps: gem-install bundle-install npm-install

.PHONY: update-css
update-css: has-command-npx install-deps
	@npx @tailwindcss/cli -i tailwind.css -o css/site.css

.PHONY: watch-css
watch-css: has-command-npx install-deps
	@npx @tailwindcss/cli -i tailwind.css -o css/site.css -w

.PHONY: build
build: update-css
	@npx @11ty/eleventy

.PHONY: serve
serve: update-css
	@npx @11ty/eleventy --serve

.PHONY: rm-dist
rm-dist:
	@rm -rf dist

.PHONY: git-clean
git-clean: has-command-git
	@git clean -dxf . -e .bundle/ruby/ -e node_modules/

.PHONY: distclean
distclean: git-clean

.PHONY: prettier
prettier: has-command-npm install-deps
	@npx prettier --write .

.PHONY: release
release: rm-dist distclean build prettier

.PHONY: open-site
open-site: has-command-open
	@open http://localhost:8080/
