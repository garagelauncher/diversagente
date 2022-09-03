# é necessário o make (GNU make utility to maintain groups of programs)
LOCALDIR = $(shell pwd)/
SCRIPTS_FOLDER = scripts

# generate venv
venv:
	@echo
	@echo "Ativando venv..."
	@echo
	@echo "$(shell date)"
	@echo
	python -m venv venv
	@echo
	source venv/bin/activate

# generate mailmap
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

# generate gitstats
gitstats:
	@echo
	@echo "Baixando repostats com Python..."
	@echo
	pip3 install git+https://github.com/vifactor/repostat
	@echo "Gerando o gitstats..."
	@echo
	@echo "$(shell date)"
	@echo
	repostat . backend/public/gitstats --copy-assets --with-index-page
	@echo
	@echo "Gitstats gerado com sucesso!"
