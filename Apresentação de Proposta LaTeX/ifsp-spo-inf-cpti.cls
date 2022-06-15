\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{ifsp-spo-inf-cpti}[2017/07/02 v1.0 Modelo Pós Gestão TI]
%
% Repassa todos os parâmetros a classe ifsp-spo-inf, 
\DeclareOption*{%
  \PassOptionsToClass{\CurrentOption}{ifsp-spo-inf}%
}
\ProcessOptions\relax
\LoadClass{ifsp-spo-inf}

\curso{Pós Graduação em Gestão de Tecnologia da Informação}

\instituicao{%
  \imprimirifsp
%  \par
%  \imprimirdepartamento
  \par
  \imprimircurso
}
