\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{ifsp-spo-inf-ctds}[2017/07/02 v1.0 Modelo TADS]
%
% Repassa todos os parâmetros a classe ifsp-spo-inf, 
\DeclareOption*{%
  \PassOptionsToClass{\CurrentOption}{ifsp-spo-inf}%
}
\ProcessOptions\relax
\LoadClass{ifsp-spo-inf}

\curso{Tecnologia em Análise e Desenvolvimento de Sistemas}

\instituicao{%
  \imprimirifsp
%  \par
%  \imprimirdepartamento
  \par
  \imprimircurso
  \par
  \imprimirdisciplina
}
