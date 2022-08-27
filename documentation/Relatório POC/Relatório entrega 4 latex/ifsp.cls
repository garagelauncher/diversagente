\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{ifsp}[2017/07/02 v2.0 Modelo do IFSP baseado em abnTeX2]

\RequirePackage{ifthen}
\RequirePackage{ifdraft}
\newboolean{utilizarPaginasA3}
\newboolean{utilizarQRCODE}
\newboolean{utilizarSIGLAS}
\newboolean{gerarGLOSSARIO}
\newboolean{gerandoMODELO}
\newboolean{mostrandoTODO}
\newboolean{imprimirLOGOnaCAPA}
%
% Repassa todos os parametros a classe abntex2, 
\DeclareOption*{%
  \PassOptionsToClass{\CurrentOption}{abntex2}%
}
\DeclareOption{paginasA3}{\setboolean{utilizarPaginasA3}{true}}
\DeclareOption{QRCODE}{\setboolean{utilizarQRCODE}{true}}
\DeclareOption{SIGLAS}{\setboolean{utilizarSIGLAS}{true}}
\DeclareOption{MODELO}{\setboolean{gerandoMODELO}{true}}
\DeclareOption{GLOSSARIO}{\setboolean{gerarGLOSSARIO}{true}}
\DeclareOption{TODO}{\setboolean{mostrandoTODO}{true}}
\DeclareOption{logoCAPA}{\setboolean{imprimirLOGOnaCAPA}{true}}
\ProcessOptions\relax
% https://www.ctan.org/pkg/abntex2
\LoadClass{abntex2}

	        
% ---
% Pacotes básicos 
% ---
% Usa a fonte Latin Modern
\usepackage{lmodern}                      
% sharelatex já utiliza utf8 https://www.ctan.org/pkg/inputenc
% como algumas pessoas utilizam em outro ambiente e o sharelatex ignora então fica aqui a definição
\usepackage[utf8]{inputenc}
% Selecao de codigos de fonte. https://www.ctan.org/pkg/fontenc
\usepackage[T1]{fontenc}        
% Usado pela Ficha catalográfica https://www.ctan.org/pkg/lastpage
\usepackage{lastpage}           
% Indenta o primeiro parágrafo de cada seção. https://www.ctan.org/pkg/indentfirst
\usepackage{indentfirst}        
% Controle das cores https://www.ctan.org/pkg/color
\usepackage{color}              
% https://www.ctan.org/pkg/graphicx
\usepackage{graphicx}
% idioma https://www.ctan.org/pkg/babel
\usepackage[brazil]{babel}		
% para melhorias de justificação https://www.ctan.org/pkg/microtype
\usepackage{microtype}  
% para o indice https://www.ctan.org/pkg/makeidx
\usepackage{makeidx}			
% http://ctan.org/pkg/csquotes
\usepackage{csquotes}			
% Pacote que permite a rotação de imagens na página
\usepackage{rotating}
% Permite definir barreira para floats
\usepackage{placeins}
% para incluir arquivos pdf no documento
\usepackage{pdfpages}			

% ---
% Pacotes de citações
% ---
% Paginas com as citações na bibl https://www.ctan.org/pkg/backref
\usepackage[brazilian,hyperpageref]{backref}     

\ifthenelse{\boolean{utilizarQRCODE}}{%
    % para gerar códigos de barra incluindo qrcode
    \RequirePackage{pstricks}
    \RequirePackage{pst-barcode}
}{}

% Define opcoes de glossario caso seja utilizado	        
\PassOptionsToPackage{nopostdot,nogroupskip,style=super,toc=false}{glossaries}

%
% SHARELATEX em alguns casos não esta gerando corretamente o indice para  glossario
% por esse motivo as chamadas de \makeglossaries e \printglossaries foram 
% substituidas por \makenoidxglossaries e \printnoidxglossaries
% a versão noidx é mais lenta, mas parece funcionar melhor

\ifthenelse{\boolean{utilizarSIGLAS}}{%
    % é mais completo que o acronym mas esta com alguma incompatibilidade com a versão do abntex no overleaf
    \RequirePackage[acronym,toc=false]{glossaries-extra}		% glossario
    \setabbreviationstyle[acronym]{long-short}    
    %\RequirePackage[printonlyused]{acronym}		% siglas

    \setlength{\glsdescwidth}{0.9\textwidth}
    
    %definição simples {identificador}{sigla}{texto}
    \newcommand{\defSigla}[3]{\newacronym{#1}{#2}{#3}}

    \glsaddstoragekey{PTBR}{}{\acrlongPTBR}
    %definição em ingles e tradução {identificador}{sigla}{texto ingles}{texto portugues}
    \newcommand{\defSiglaIngles}[4]{\newacronym[PTBR=#4]{#1}{#2}{\emph{#3}}}

    % compatibilidade com versoes do pacote acronym
    \newcommand{\ac}[1]{\gls{#1}\index{\glsentryshort{#1}}}
    \newcommand{\acs}[1]{\acrshort{#1}\index{\glsentryshort{#1}}}
    \newcommand{\acl}[1]{\acrlong{#1}\index{\glsentryshort{#1}}}
    \newcommand{\aclPTBR}[1]{\acrlongPTBR{#1}\index{\glsentryshort{#1}}}
    
    \newglossarystyle{siglas}{\setglossarystyle{super}
% 
\renewcommand{\glossentry}[2]{% 
\glstarget{##1}{\glossentryname{##1}}% 
& \glossentrydesc{##1} %
\ifthenelse{\equal{\acrlongPTBR{##1}}{}}{}{ - \acrlongPTBR{##1}} - Citado em ##2
\tabularnewline % end of row
 }%
 }
    
    \makenoidxglossaries 
    \input{defs-siglas}
}{}
\ifthenelse{\isundefined{\tamanhoglossario}}{
  \newcommand\tamanhoglossario{0.75} % Tamanho das definições do glossário % da página
}{}
\ifthenelse{\boolean{gerarGLOSSARIO}}{%
    % https://www.ctan.org/pkg/glossaries
    %\usepackage[toc,xindy]{glossaries}
    \RequirePackage[toc=false]{glossaries-extra}
    \setlength{\glsdescwidth}{\tamanhoglossario\textwidth}
    \newglossarystyle{glossario}{\setglossarystyle{super}
% 
\renewcommand{\glossentry}[2]{% 
\glstarget{##1}{\glossentryname{##1}}% 
& \glossentrydesc{##1}  - Citado em ##2
\tabularnewline % end of row
 }%
 }    
    
    \makenoidxglossaries
    \input{defs-glossario}
}{}

\ifdef{\makenoidxglossaries}{
    \makenoidxglossaries
}{}


\ifthenelse{\boolean{gerandoMODELO}}{%

    % para geração de dummy text
    
    \RequirePackage{lipsum}             
    \RequirePackage{blindtext}          

}{}
% para gerenciar lista de pendencias do documento
\ifthenelse{\boolean{mostrandoTODO}}{%
    \RequirePackage{todonotes}			

}{%
    % para não imprimir pendencias na versão final
    \RequirePackage[final,obeyFinal]{todonotes}			
}
\ifthenelse{\boolean{utilizarPaginasA3}}{%
    %--- Utilizados para gerar pagina A3 com KOMAOptions
    \RequirePackage{layouts}%
    \RequirePackage{geometry}%
    \RequirePackage{etoolbox}%
    \RequirePackage{afterpage}%
    % Garante que as margens continuem de acordo com a ABNT
    \RequirePackage[paper=A4,pagesize]{typearea}%
    \setlrmarginsandblock{3cm}{2cm}{*}%
    \setulmarginsandblock{3cm}{2cm}{*}%
    %\checkandfixthelayout %se deixar, pode dar problema na renderizacao da pagina - e perde as referencias de \cite e autorreferencias (figuras, quadros etc.)

    \newenvironment{PAGINA-A3}
    {
    \clearpage%
    % http://ctan.org/pkg/koma-script
    % http://repositorios.cpai.unb.br/ctan/macros/latex/contrib/koma-script/doc/scrguien.pd
    \KOMAoptions{paper=A3,paper=landscape,DIV=18}%
    %\addtolength{\paperwidth}{2.0cm}
    %\newgeometry{left=30mm,right=20mm,top=30mm, bottom=20mm}
    %\addtolength{\hoffset}{-2.0cm}
    \recalctypearea%
    % Não esta recalculando corretamente então aumenta área de texto em 1cm
    \addtolength{\textwidth}{1.5cm}%
    }
    { 
    \clearpage
    \KOMAoptions{paper=A4,pagesize}
    \recalctypearea
    
    }
}{}




% alterando a capa
\renewcommand{\imprimircapa}{%
  \begin{capa}%
    \center
% A ABNT define que na capa deve constar o nome da instituição, de forma opcional
% então o LOGO não deve aparecer na capa normalmente, mas fica aqui o código
\ifthenelse{\boolean{imprimirLOGOnaCAPA}}{%
    \begin{figure}[ht!]
    \centering
	\includegraphics{\ifspprefixo/logo-02.jpg}
	\end{figure}
}{}
    \ifdraft{***** DOCUMENTO GERADO EM MODO RASCUNHO *****\newline}{}%
    \ABNTEXchapterfont\Large\imprimirifsp

    \vspace*{1cm}
    {\ABNTEXchapterfont\large\imprimirautor}

    \vfill
    \begin{center}
    \ABNTEXchapterfont\bfseries\LARGE\imprimirtitulo
    \end{center}
    \vfill

    \large\imprimirlocal

    \large\imprimirdata

    \vspace*{1cm}
  \end{capa}
}


\newcommand{\imprimircapacompleta}{%
  \begin{capa}%
    \center
% A ABNT define que na capa deve constar o nome da instituição, de forma opcional
% então o LOGO não deve aparecer na capa normalmente, mas fica aqui o código
\ifthenelse{\boolean{imprimirLOGOnaCAPA}}{%
    \begin{figure}[ht!]
    \centering
	\includegraphics{\ifspprefixo/logo-02.jpg}
	\end{figure}
}{}
    \ifdraft{***** DOCUMENTO GERADO EM MODO RASCUNHO *****\newline}{}%
    \ABNTEXchapterfont\Large\imprimirifsp

    \vspace*{1cm}
    {\ABNTEXchapterfont\large\imprimirautor}

    \vfill
    \begin{center}
    \ABNTEXchapterfont\bfseries\LARGE\imprimirtitulo
    \end{center}
    \vfill

	{\abntex@ifnotempty{\imprimirinstituicao}{\imprimirinstituicao\vspace*{\fill}}}

    \large\imprimirlocal

    \large\imprimirdata

    \vspace*{1cm}
  \end{capa}
}



% folha de rosto 

\makeatletter

\renewcommand{\folhaderostocontent}{
\begin{center}
    \ifdraft{***** DOCUMENTO GERADO EM MODO RASCUNHO *****\newline}{}%
    {\ABNTEXchapterfont\Large \imprimirifsp}

    \vspace*{1cm}
{\ABNTEXchapterfont\large\imprimirautor}

\vspace*{\fill}\vspace*{\fill}

\begin{center}
\ABNTEXchapterfont\bfseries\Large\imprimirtitulo
\end{center}

\vspace*{\fill}

\abntex@ifnotempty{\imprimirpreambulo}{%
  \hspace{.45\textwidth}
  \begin{minipage}{.5\textwidth}
  \SingleSpacing
  \imprimirpreambulo
  \end{minipage}%
  \vspace*{\fill}
}%

{\large\imprimirorientadorRotulo~\imprimirorientador\par}

\abntex@ifnotempty{\imprimircoorientador}{%
  {\large\imprimircoorientadorRotulo~\imprimircoorientador}%
}%

\vspace*{\fill}

{\abntex@ifnotempty{\imprimirinstituicao}{\imprimirinstituicao\vspace*{\fill}}}

{\large\imprimirlocal}

\par

{\large\imprimirdata}
\vspace*{1cm}
\end{center}
}

\newcommand{\imprimirifsp}{IFSP - Instituto Federal de Educação, Ciência E Tecnologia}
\newcommand{\ifspprefixo}{ifsp/ifsp}
\local{SP - Brasil}


%  ---- https://github.com/abntex/abntex2/wiki/HowToCriarNovoAmbienteListing
% Novo list of (listings) para QUADROS

\newcommand{\quadroname}{Quadro}
\newcommand{\listofquadrosname}{Lista de quadros}

\newfloat[chapter]{quadro}{loq}{\quadroname}
\newlistof{listofquadros}{loq}{\listofquadrosname}
\newlistentry{quadro}{loq}{0}

% configurações para atender às regras da ABNT
\counterwithout{quadro}{chapter}
\renewcommand{\cftquadroname}{\quadroname\space} 
\renewcommand*{\cftquadroaftersnum}{\hfill--\hfill}



%-------------------------------------------------------
% autoref indicando página se estiver a mais de uma página de distancia
\newcommand{\autorefwithpage}[1]{\autorefwithpagedistance{#1}{1}}
% autoref indicando página se distancia for maior que...
\newcommand{\autorefwithpagedistance}[2]{%
    \dtlabs{\pagediff}{\number\numexpr\getpagerefnumber{#1} - \thepage}%
    \dtl@truncatedecimal{\pagediff}%
    \ifthenelse%
        {\pagediff > #2}%
        {\autoref{#1} (pág \pageref{#1})}%
        {\autoref{#1}}%
}