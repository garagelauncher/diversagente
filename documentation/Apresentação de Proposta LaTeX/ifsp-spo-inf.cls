%% https://github.com/abntex/abntex2/wiki/ComoCustomizar
%%
%%
%% Customizações do abnTeX2 (http://abnTeX2.googlecode.com) para o IFSP-SPO
%%
%% This work may be distributed and/or modified under the
%% conditions of the LaTeX Project Public License, either version 1.3
%% of this license or (at your option) any later version.
%% The latest version of this license is in
%%   http://www.latex-project.org/lppl.txt
%% and version 1.3 or later is part of all distributions of LaTeX
%% version 2005/12/01 or later.
%%
%% This work has the LPPL maintenance status `maintained'.
%% 
%% The Current Maintainer of this work is Ivan F. Martinez, ivanfm
%%
%% Further information about abnTeX2 are available on http://abntex2.googlecode.com/
%%

\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{ifsp-spo-inf}[2017/07/02 v1.0 Modelo dos cursos de Informatica do  IFSP Campus SPO baseado em abnTeX2]
%
% Repassa todos os parâmetros a classe ifsp-spo, 
\DeclareOption*{%
  \PassOptionsToClass{\CurrentOption,QRCODE,SIGLAS,GLOSSARIO}{ifsp-spo}%
}
\ProcessOptions\relax
\LoadClass{ifsp-spo}

\departamento{Informática}

% --- 
% CONFIGURAÇÕES DE PACOTES
% --- 

% ---
% Configurações do pacote backref
% Usado sem a opção hyperpageref de backref
\ifthenelse{\boolean{utilizarBIBLATEX}}{%
}{%
\renewcommand{\backrefpagesname}{Citado na(s) página(s):~}
% Texto padrão antes do número das páginas
\renewcommand{\backref}{}
% Define os textos da citação
\renewcommand*{\backrefalt}[4]{
    \ifcase #1 %
        Nenhuma citação no texto.%
    \or
        Citado na página #2.%
    \else
        Citado #3 vezes nas páginas #2.%
    \fi}%
}
% ---


% ---
% Configurações de aparência do PDF final

% --- 
% Espaçamentos entre linhas e parágrafos 
% --- 

% O tamanho do parágrafo é dado por:
\setlength{\parindent}{1.3cm}

% Controle do espaçamento entre um parágrafo e outro:
\setlength{\parskip}{0.2cm}  % tente também \onelineskip

% alterando o aspecto da cor azul
\definecolor{blue}{RGB}{41,5,195}

% ---
% compila o indice
% ---
\makeindex
% ---