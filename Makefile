# -*- coding: utf-8; mode: makefile-gmake; -*-

MAKEFLAGS += --no-print-directory --warn-undefined-variables

SHELL := bash
.SHELLFLAGS := -euo pipefail -c

HERE := $(shell cd -P -- $(shell dirname -- $$0) && pwd -P)

.PHONY: all
all: build

include .titletk.mk

.PHONY: npm-install
npm-install: has-command-npm
	@npm install

.PHONY: install-deps
install-deps: npm-install

.PHONY: update-css
update-css: has-command-npx install-deps
	@npx tailwindcss -i tailwind.css -o public/site.css

.PHONY: watch-css
watch-css: has-command-npx install-deps
	@npx tailwindcss -i tailwind.css -o public/site.css -w

.PHONY: prettier
prettier: has-command-npm install-deps
	@npx prettier --write .

.PHONY: open-site
open-site: has-command-open
	@open http://localhost:8080/
