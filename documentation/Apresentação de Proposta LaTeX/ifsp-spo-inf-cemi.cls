\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{ifsp-spo-inf-cemi}[2017/08/02 v1.0 Modelo Curso Técnico em Informática]
%
% Repassa todos os parâmetros a classe ifsp-spo-inf, 
\DeclareOption*{%
  \PassOptionsToClass{\CurrentOption}{ifsp-spo-inf}%
}
\ProcessOptions\relax
\LoadClass{ifsp-spo-inf}

\curso{Curso Técnico em Informática Integrado ao Ensino Médio}

\instituicao{%
  \imprimirifsp
  \par
%  \imprimirdepartamento
%  \par
  \imprimircurso
  \par
  \imprimirdisciplina
}
