#!/bin/bash

projeto=Verifica
pacoteDoProjeto=verifica

bibliotecas=bibliotecas
binarios=binarios
construcao=construcao
documentacao=documentacao
fontes=fontes
recursos=recursos
testes=testes

bibliotecasCss=${bibliotecas}/css
bibliotecasJs=${bibliotecas}/js
binariosCss=${binarios}/css
binariosHtml=${binarios}/html
binariosJs=${binarios}/js
fontesCss=${fontes}/css
fontesJs=${fontes}/js
testesHtml=${testes}/html

limpar() {
	echo ":limpar";
	rm -rf ${binarios};
	rm -rf ${construcao};
}

criarEstrutura() {
	echo ":criarEstrutura";
	mkdir -p ${bibliotecasCss};
	mkdir -p ${bibliotecasJs};
	mkdir -p ${binariosCss};
	mkdir -p ${binariosHtml};
	mkdir -p ${binariosJs};
	mkdir -p ${construcao};
	mkdir -p ${fontesCss};
	mkdir -p ${fontesJs};
	mkdir -p ${testesHtml};
}

adicionarBibliotecas() {
	echo ":adicionarBibliotecas";
	cp -rf ../estilos/construcao/limpo.css ${bibliotecasCss};
	cp -rf ../lindaJs/construcao/linda.js ${bibliotecasJs};
}

compilar() {
	limpar;
	criarEstrutura;
	adicionarBibliotecas;
	echo ":compilar";
	cp -rf ${bibliotecasCss}/* ${fontesCss}/* ${binariosCss};
	cp -rf ${testesHtml}/* ${binariosHtml};
	cp -rf ${bibliotecasJs}/* ${fontesJs}/* ${binariosJs};
}

construir() {
	compilar;
	echo ":construir";
	cp -rf ${binariosCss}/verifica.css ${construcao}/${pacoteDoProjeto}.css;
	cp -rf ${binariosJs}/verifica.js ${construcao}/${pacoteDoProjeto}.js;
	cp -rf ${binariosJs}/jsHint.js ${construcao}/jsHint.js;
}

testar() {
	construir;
	echo ":testar";
	chromium-browser `find ${binariosHtml} -name teste*.html`;
}

depurar() {
	construir;
	echo ":depurar";
	chromium-browser ${binariosHtml}/testeDeCodigo.html --allow-file-access-from-files;
}

executar() {
	construir;
	echo ":executar";
}

echo :${pacoteDoProjeto}
if [ -n "$1" ]
then
	$1;
else
	construir;
fi
