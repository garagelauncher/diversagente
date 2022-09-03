# é necessário o make (GNU make utility to maintain groups of programs)
LOCALDIR = $(shell pwd)/
SCRIPTS_FOLDER = scripts

#
mailmap:
	@echo
	@echo "Gerando .mailmap..."
	@echo
	@echo "Executando $(LOCALDIR)/$(SCRIPTS_FOLDER)/genmailmap.sh"
	@echo
	@echo "$(shell date)"
	@echo
	$(LOCALDIR)/$(SCRIPTS_FOLDER)/genmailmap.sh
	@echo
	@echo "Use para gerar o repostas/gitstats"
