# é necessário o make (GNU make utility to maintain groups of programs)
LOCALDIR = $(shell pwd)/
SCRIPTS_FOLDER = scripts
OS := $(shell uname)
GOURCE_TITLE = 'Setembro'
GOURCE_START_DATE = '2022-09-01 00:00:00 +24'
GOURCE_END_DATE = '2022-10-01 00:00:00 +24'
REMOTE_USERNAME = ''
REMOTE_EMAIL = ''
NODE_VERSION = 12

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
	@echo "Executando... se não funcionar, tente com pip3 install git+https://github.com/vifactor/repostat"
	@echo
	python -m pip install repostat-app
	@echo "Gerando o gitstats..."
	@echo
	@echo "$(shell date)"
	@echo
	repostat . backend/public/gitstats --copy-assets --with-index-page
	@echo
	@echo "Gitstats gerado com sucesso!"

setup_gource_mac:
	@echo
	@echo "Baixe o homebrew em https://brew.sh/"
	@echo
	@echo "$(shell date)"
	@echo
	@echo "Baixando gource..."
	@echo
	brew install gource
	@echo
	@echo "Baixando ffmpeg..."
	@echo
	brew install ffmpeg
	@echo "Gource criado com sucesso"

gource_movie:
	@echo
	@echo "Baixe o gource em https://gource.io..."
	@echo
	@echo "Executando..."
	@echo
	@echo "$(shell date)"
	@echo
	gource  --font-scale 1.3  --highlight-dirs  --file-idle-time 0  --filename-time 4  --filename-colour 555555  --dir-colour 555555  --key  --max-user-speed 100  --highlight-users  --bloom-multiplier 2.0  --bloom-intensity 0.1  --multi-sampling  --camera-mode overview  --auto-skip-seconds 0.1  --seconds-per-day 2 --title $(GOURCE_TITLE) --start-date  $(GOURCE_START_DATE) --stop-date  $(GOURCE_END_DATE) --user-image-dir ./.github/avatars --output-framerate 60 --output-ppm-stream - --output-framerate 60 --output-ppm-stream - | ffmpeg -y -r 60 -f image2pipe -vcodec ppm -i - -vcodec libx264 -preset ultrafast -pix_fmt yuv420p -crf 1 -threads 0 -bf 0 ~/Downloads/gource.mp4
	@echo
	@echo "Gource criado com sucesso"

gource:
	@echo
	@echo "Baixe o gource em https://gource.io..."
	@echo
	@echo "Executando..."
	@echo
	@echo "$(shell date)"
	@echo
	gource  --font-scale 1.3  --highlight-dirs  --file-idle-time 0  --filename-time 4  --filename-colour 555555  --dir-colour 555555  --key  --max-user-speed 100  --highlight-users  --bloom-multiplier 2.0  --bloom-intensity 0.1  --multi-sampling  --camera-mode overview  --auto-skip-seconds 0.1  --seconds-per-day 2 --title $(GOURCE_TITLE) --start-date  $(GOURCE_START_DATE) --stop-date  $(GOURCE_END_DATE) --user-image-dir ./.github/avatars
	@echo
	@echo "Gource executado com sucesso"

enable_npm_proxy:
	@echo
	@echo "Ativando proxy do npm..."
	@echo
	@echo "$(shell date)"
	@echo
	@echo Proxy HTTP "$(http_proxy)"
	@echo
	@echo Proxy HTTPS "$(https_proxy)"
	@echo
	npm config set proxy $(http_proxy)
	npm config set https-proxy $(https_proxy)
	@echo
	@echo "Proxy do npm ativado com sucesso"

prepare_nvm:
	@echo
	@echo "Preparand ambiente Node.js"
	@echo
	@echo "$(shell date)"
	@echo
	@echo Instalando NVM - Node Version Manager
	@echo
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
	@echo
	exec bash

.PHONY: prepare_node
prepare_node:
	@echo NVM instalado na versão: 
	@echo
	$(nvm -v)
	@echo Instalando node na versão: $(NODE_VERSION)
	@echo
	. ${HOME}/.nvm/nvm.sh && nvm install $(NODE_VERSION)
	@echo Ativando Node.js na vesão: $(NODE_VERSION)
	@echo
	. ${HOME}/.nvm/nvm.sh && nvm use $(NODE_VERSION)
	@echo
	@echo Node ativado na versão:
	@echo
	node -v

initialize_git:
	@echo "Customizando usuário do github"
	@echo
	git config user.name $(REMOTE_USERNAME)
	@echo "Customizando usuário do github"
	@echo
	git config user.email $(REMOTE_EMAIL)
	@echo Usando username:
	git config --get user.name
	@echo Usando email:
	git config --get user.email

initialize_remote:
	@echo
	@echo "Inicializando remote work..."
	@echo
	@echo "$(shell date)"
	@echo
	@echo Proxy HTTP "$(http_proxy)"
	@echo
	@echo Proxy HTTPS "$(https_proxy)"
	@echo
	make enable_npm_proxy
	@echo
	@echo "Instalando módulos..."
	@echo
	npm install
	@echo
	make initialize_git
