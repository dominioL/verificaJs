(function (global) {
	"use strict";

	var ExcecaoLinda = function (mensagem) {
		this.mensagem = mensagem;
		this.message = mensagem;
	};

	ExcecaoLinda.prototype.comoTexto = function () {
		return ("ExcecaoLinda: " + this.mensagem);
	};

	var Linda = {
		propriedadesDeAtributos: {
			configuravel: false,
			enumeravel: false,
			gravavel: false,
			fornecer: undefined,
			fixar: undefined,
			valor: undefined
		},

		propriedadesDeAtributosGravaveis: {
			configuravel: false,
			enumeravel: false,
			gravavel: true,
			fornecer: undefined,
			fixar: undefined,
			valor: undefined
		},

		propriedadesDeAtributosGravaveisConfiguraveis: {
			configuravel: true,
			enumeravel: false,
			gravavel: true,
			fornecer: undefined,
			fixar: undefined,
			valor: undefined
		},

		tipos: {
			OBJETO: "object",
			FUNCAO: "function",
			TEXTO: "string",
			NUMERO: "number",
			BOOLEANO: "boolean",
			INDEFINIDO: "undefined"
		},

		instanciaDe: function (objeto, tipo) {
			if (!this.tipoDe(tipo, Function) || this.nulo(objeto)) {
				return false;
			}
			if (this.tipoPrimitivo(objeto)) {
				return this.tipoDe(objeto, tipo);
			}
			return objeto.instanciaDe(tipo);
		},

		tipoPrimitivo: function (valor) {
			return (
				this.tipoDe(valor, String) ||
				this.tipoDe(valor, Number) ||
				this.tipoDe(valor, Boolean) ||
				this.tipoDe(valor, undefined)
			);
		},

		tipoDe: function (tipo, tipoComparado) {
			var tipoComparadoTextual = "";
			if (tipoComparado === Object) {
				tipoComparadoTextual = this.tipos.OBJETO;
			} else if (tipoComparado === Function) {
				tipoComparadoTextual = this.tipos.FUNCAO;
			} else if (tipoComparado === String) {
				tipoComparadoTextual = this.tipos.TEXTO;
			} else if (tipoComparado === Number) {
				tipoComparadoTextual = this.tipos.NUMERO;
			} else if (tipoComparado === Boolean) {
				tipoComparadoTextual = this.tipos.BOOLEANO;
			} else if (tipoComparado === undefined) {
				tipoComparadoTextual = this.tipos.INDEFINIDO;
			}
			return (typeof tipo === tipoComparadoTextual);
		},

		nuloOuIndefinido: function (valor) {
			return (valor === null || valor === undefined);
		},

		nulo: function (valor) {
			return (valor === null);
		},

		indefinido: function (valor) {
			return (valor === undefined);
		},

		assegureQue: function (condicao) {
			if (!condicao) {
				throw new ExcecaoLinda("Asserção inválida. Quebra de contrato.");
			}
		},

		assegureQueNao: function (condicao) {
			this.assegureQue(!condicao);
		}
	};

	global.Linda = Linda;
}(this));
(function () {
	"use strict";

	Function.prototype.implementar = function (implementacoes) {
		for (var implementacao in implementacoes) {
			if (implementacoes.hasOwnProperty(implementacao)) {
				this.prototype[implementacao] = implementacoes[implementacao];
			}
		}
	};

	Function.implementar({
		aplicarComEscopo: Function.prototype.apply,

		chamarComEscopo: Function.prototype.call,

		estender: function (implementacoes) {
			for (var implementacao in implementacoes) {
				if (implementacoes.hasOwnProperty(implementacao)) {
					this[implementacao] = implementacoes[implementacao];
				}
			}
		},

		vincularEscopo: function (escopo) {
			var essaFuncao = this;
			var funcaoComEscopoVinculado = function () {
				return essaFuncao.aplicarComEscopo(escopo, arguments);
			};
			return funcaoComEscopoVinculado;
		}
	});
}(this));
/*global Linda*/
/*global TipoDeObservacao*/

(function () {
	"use strict";

	Object.implementar({
		cadaPropriedade: function (iterador, escopo) {
			iterador = iterador.vincularEscopo(escopo);
			var propriedades = this.fornecerPropriedades();
			for (var indice = 0, tamanho = propriedades.length; indice < tamanho; indice++) {
				var chave = propriedades[indice];
				iterador(this[chave], chave);
			}
		},

		cadaPropriedadeEnumeravel: function (iterador, escopo) {
			iterador = iterador.vincularEscopo(escopo);
			for (var chave in this) {
				iterador(this[chave], chave);
			}
		},

		cadaPropriedadeInvisivel: function (iterador, escopo) {
			iterador = iterador.vincularEscopo(escopo);
			var propriedadesInvisiveis = this.fornecerPropriedadesInvisiveis();
			for (var indice = 0, tamanho = propriedadesInvisiveis.length; indice < tamanho; indice++) {
				var chave = propriedadesInvisiveis[indice];
				iterador(this[chave], chave);
			}
		},

		cadaPropriedadePropria: function (iterador, escopo) {
			iterador = iterador.vincularEscopo(escopo);
			var propriedadesProprias = this.fornecerPropriedadesProprias();
			for (var indice = 0, tamanho = propriedadesProprias.length; indice < tamanho; indice++) {
				var chave = propriedadesProprias[indice];
				iterador(this[chave], chave);
			}
		},

		cadaPropriedadePropriaEnumeravel: function (iterador, escopo) {
			iterador = iterador.vincularEscopo(escopo);
			var propriedadesPropriasEnumeraveis = this.fornecerPropriedadesPropriasEnumeraveis();
			for (var indice = 0, tamanho = propriedadesPropriasEnumeraveis.length; indice < tamanho; indice++) {
				var chave = propriedadesPropriasEnumeraveis[indice];
				iterador(this[chave], chave);
			}
		},

		cadaPropriedadePropriaInvisivel: function (iterador, escopo) {
			iterador = iterador.vincularEscopo(escopo);
			var propriedadesPropriasInvisiveis = this.fornecerPropriedadesPropriasInvisiveis();
			for (var indice = 0, tamanho = propriedadesPropriasInvisiveis.length; indice < tamanho; indice++) {
				var chave = propriedadesPropriasInvisiveis[indice];
				iterador(this[chave], chave);
			}
		},

		cadaPropriedadeHerdada: function (iterador, escopo) {
			iterador = iterador.vincularEscopo(escopo);
			var propriedadesHerdadas = this.fornecerPropriedadesHerdadas();
			for (var indice = 0, tamanho = propriedadesHerdadas.length; indice < tamanho; indice++) {
				var chave = propriedadesHerdadas[indice];
				iterador(this[chave], chave);
			}
		},

		cadaPropriedadeHerdadaEnumeravel: function (iterador, escopo) {
			iterador = iterador.bind(escopo);
			for (var chave in this) {
				if (!this.possuiPropriedadePropriaEnumeravel(chave)) {
					iterador(this[chave], chave);
				}
			}
		},

		cadaPropriedadeHerdadaInvisivel: function (iterador, escopo) {
			iterador = iterador.vincularEscopo(escopo);
			var propriedadesHerdadasInvisiveis = this.fornecerPropriedadesHerdadasInvisiveis();
			for (var indice = 0, tamanho = propriedadesHerdadasInvisiveis.length; indice < tamanho; indice++) {
				var chave = propriedadesHerdadasInvisiveis[indice];
				iterador(this[chave], chave);
			}
		},

		fornecerPropriedades: function () {
			var propriedades = this.fornecerPropriedadesProprias();
			var prototipo = this.fornecerPrototipo();
			while (!Linda.nulo(prototipo)) {
				propriedades.push.aplicarComEscopo(propriedades, prototipo.fornecerPropriedadesProprias());
				prototipo = prototipo.fornecerPrototipo();
			}
			return propriedades;
		},

		fornecerPropriedadesEnumeraveis: function () {
			var propriedadesEnumeraveis = [];
			for (var propriedade in this) {
				propriedadesEnumeraveis.push(propriedade);
			}
			return propriedadesEnumeraveis;
		},

		fornecerPropriedadesInvisiveis: function () {
			var propriedades = this.fornecerPropriedades();
			var propriedadesInvisiveis = [];
			for (var indice = 0, tamanho = propriedades.length; indice < tamanho; indice++) {
				var propriedade = propriedades[indice];
				if (!this.possuiPropriedadeEnumeravel(propriedade)) {
					propriedadesInvisiveis.push(propriedade);
				}
			}
			return propriedadesInvisiveis;
		},

		fornecerPropriedadesProprias: function () {
			return Object.getOwnPropertyNames(this);
		},

		fornecerPropriedadesPropriasEnumeraveis: function () {
			return Object.keys(this);
		},

		fornecerPropriedadesPropriasInvisiveis: function () {
			var propriedadesProprias = this.fornecerPropriedadesProprias();
			var propriedadesPropriasInvisiveis = [];
			for (var indice = 0, tamanho = propriedadesProprias.length; indice < tamanho; indice++) {
				var propriedadePropria = propriedadesProprias[indice];
				if (!this.possuiPropriedadePropriaEnumeravel(propriedadePropria)) {
					propriedadesPropriasInvisiveis.push(propriedadePropria);
				}
			}
			return propriedadesPropriasInvisiveis;
		},

		fornecerPropriedadesHerdadas: function () {
			var propriedadesHerdadas = [];
			var prototipo = this.fornecerPrototipo();
			while (!Linda.nulo(prototipo)) {
				propriedadesHerdadas.push.aplicarComEscopo(propriedadesHerdadas, prototipo.fornecerPropriedadesProprias());
				prototipo = prototipo.fornecerPrototipo();
			}
			return propriedadesHerdadas;
		},

		fornecerPropriedadesHerdadasEnumeraveis: function () {
			var propriedadesHerdadasEnumeraveis = [];
			for (var propriedadeEnumeravel in this) {
				if (!this.possuiPropriedadePropriaEnumeravel(propriedadeEnumeravel)) {
					propriedadesHerdadasEnumeraveis.push(propriedadeEnumeravel);
				}
			}
			return propriedadesHerdadasEnumeraveis;
		},

		fornecerPropriedadesHerdadasInvisiveis: function () {
			var propriedadesHerdadas = this.fornecerPropriedadesHerdadas();
			var propriedadesHerdadasInvisiveis = [];
			for (var indice = 0, tamanho = propriedadesHerdadas.length; indice < tamanho; indice++) {
				var propriedadeHerdada = propriedadesHerdadas[indice];
				if (!this.possuiPropriedadeHerdadaEnumeravel(propriedadeHerdada)) {
					propriedadesHerdadasInvisiveis.push(propriedadeHerdada);
				}
			}
			return propriedadesHerdadasInvisiveis;
		},

		possuiPropriedade: function (propriedade) {
			return (propriedade in this);
		},

		possuiPropriedadeEnumeravel: function (propriedade) {
			for (var minhaPropriedade in this) {
				if (minhaPropriedade === propriedade) {
					return true;
				}
			}
			return false;
		},

		possuiPropriedadeInvisivel: function (propriedade) {
			return (this.possuiPropriedade(propriedade) && !this.possuiPropriedadeEnumeravel(propriedade));
		},

		possuiPropriedadePropria: function (propriedade) {
			return this.hasOwnProperty(propriedade);
		},

		possuiPropriedadePropriaEnumeravel: function (propriedade) {
			return this.propertyIsEnumerable(propriedade);
		},

		possuiPropriedadePropriaInvisivel: function (propriedade) {
			return (this.possuiPropriedadePropria(propriedade) && !this.possuiPropriedadePropriaEnumeravel(propriedade));
		},

		possuiPropriedadeHerdada: function (propriedade) {
			return (this.possuiPropriedade(propriedade) && !this.possuiPropriedadePropria(propriedade));
		},

		possuiPropriedadeHerdadaEnumeravel: function (propriedade) {
			return (this.possuiPropriedadeEnumeravel(propriedade) && !this.possuiPropriedadePropriaEnumeravel(propriedade));
		},

		possuiPropriedadeHerdadaInvisivel: function (propriedade) {
			return (this.possuiPropriedadeHerdada(propriedade) && !this.possuiPropriedadeHerdadaEnumeravel(propriedade));
		},

		instanciaDe: function (tipo) {
			if (!Linda.tipoDe(tipo, Function)) {
				return false;
			}
			return tipo.prototype.prototipoDe(this);
		},

		prototipadoDe: function (prototipoDoTipo) {
			var prototipoDoObjeto = this.fornecerPrototipo();
			while (!Linda.nulo(prototipoDoObjeto) && prototipoDoObjeto !== prototipoDoTipo) {
				prototipoDoObjeto = prototipoDoObjeto.fornecerPrototipo();
			}
			return (prototipoDoObjeto === prototipoDoTipo);
		},

		prototipoDe: function (objeto) {
			var prototipoDoObjeto = objeto.fornecerPrototipo();
			while (!Linda.nulo(prototipoDoObjeto) && prototipoDoObjeto !== this) {
				prototipoDoObjeto = prototipoDoObjeto.fornecerPrototipo();
			}
			return (prototipoDoObjeto === this);
		},

		fornecerPrototipo: function () {
			return Object.getPrototypeOf(this);
		},

		fornecerDescritorDePropriedade: function (propriedade) {
			var descritorOriginal = Object.getOwnPropertyDescriptor(this, propriedade);
			var descritor = {};
			this.privadoFornecerDescritorDePropriedade(descritor, descritorOriginal.value, "valor");
			this.privadoFornecerDescritorDePropriedade(descritor, descritorOriginal.get, "fornecer");
			this.privadoFornecerDescritorDePropriedade(descritor, descritorOriginal.set, "fixar");
			this.privadoFornecerDescritorDePropriedade(descritor, descritorOriginal.writable, "gravavel");
			this.privadoFornecerDescritorDePropriedade(descritor, descritorOriginal.enumerable, "enumeravel");
			this.privadoFornecerDescritorDePropriedade(descritor, descritorOriginal.configurable, "configuravel");
			return descritor;
		},

		privadoFornecerDescritorDePropriedade: function (descritor, propriedade, chave) {
			if (!Linda.indefinido(propriedade)) {
				descritor[chave] = propriedade;
			}
		},

		definirPropriedade: function (atributo, definicao) {
			var propriedades = {};
			this.privadoDefinirPropriedade(propriedades, "value", definicao.valor);
			this.privadoDefinirPropriedade(propriedades, "get", definicao.fornecer);
			this.privadoDefinirPropriedade(propriedades, "set", definicao.fixar);
			this.privadoDefinirPropriedade(propriedades, "writable", definicao.gravavel);
			this.privadoDefinirPropriedade(propriedades, "enumerable", definicao.enumeravel);
			this.privadoDefinirPropriedade(propriedades, "configurable", definicao.configuravel);
			Object.defineProperty(this, atributo, propriedades);
		},

		definirPropriedades: function (definicoes) {
			for (var indice = 0, propriedades = Object.getOwnPropertyNames(definicoes), tamanho = propriedades.length; indice < tamanho; indice++) {
				var propriedade = propriedades[indice];
				this.definirPropriedade(propriedade, definicoes[propriedade]);
			}
		},

		privadoDefinirPropriedade: function (propriedades, chave, valor) {
			if (!Linda.indefinido(valor)) {
				propriedades[chave] = valor;
			}
		},

		fundir: function (outro) {
			for (var chave in outro) {
				if (outro.possuiPropriedadePropria(chave)) {
					this[chave] = outro[chave];
				}
			}
		},

		observar: function (tratador, propriedade, tipoDeObservacao) {
			Object.observe(this, function (observacoes) {
				for (var indice = 0, tamanho = observacoes.length; indice < tamanho; indice++) {
					var observacao = observacoes[indice];
					var observacaoDesejada = (observacao.type === tipoDeObservacao || Linda.nuloOuIndefinido(tipoDeObservacao));
					var propriedadeDesejada = (observacao.name === propriedade || Linda.nuloOuIndefinido(propriedade));
					if (observacaoDesejada && propriedadeDesejada) {
						tratador(observacao.object, observacao.name, observacao.type, observacao.oldValue);
					}
				}
			});
		},

		observarAtualizacao: function (tratador, propriedade) {
			this.observar(tratador, propriedade, TipoDeObservacao.ATUALIZACAO);
		},

		observarCriacao: function (tratador, propriedade) {
			this.observar(tratador, propriedade, TipoDeObservacao.CRIACAO);
		},

		observarReconfiguracao: function (tratador, propriedade) {
			this.observar(tratador, propriedade, TipoDeObservacao.RECONFIGURACAO);
		},

		observarRemocao: function (tratador, propriedade) {
			this.observar(tratador, propriedade, TipoDeObservacao.REMOCAO);
		},

		desobservar: function (tratador) {
			Object.unobserve(this, tratador);
		},
	});

	Object.implementar({
		paraCada: Object.cadaPropriedadePropriaEnumeravel
	});
}(this));
/*global Linda*/

(function () {
	"use strict";

	Array.implementar({
		clonar: function () {
			var clone = new Array(this.length);
			for (var indice = 0; indice < this.length; indice++) {
				var elemento = this[indice];
				if (Linda.tipoDe(elemento.clonar, Function)) {
					elemento = elemento.clonar();
				}
				clone[indice] = elemento;
			}
			return clone;
		},

		contem: function (valor) {
			return (this.indexOf(valor) >= 0);
		},

		embaralhar: function () {
			for (var indice = 0; indice < this.length; indice++) {
				var novoIndice = Number.sortearInteiro(0, this.length - 1);
				var valorSalvo = this[indice];
				this[indice] = this[novoIndice];
				this[novoIndice] = valorSalvo;
			}
		},

		dentroDosLimites: function (indice) {
			return (this.length !== 0 && indice >= 0 && indice < this.length);
		},

		fornecerIndice: function (elemento) {
			return this.indexOf(elemento);
		},

		fundir: function (outra) {
			this.push.aplicarComEscopo(this, outra);
		},

		limpar: function () {
			this.splice(0, this.length);
		},

		paraCada: function (funcaoDeIteracao, escopo) {
			funcaoDeIteracao = funcaoDeIteracao.vincularEscopo(escopo);
			for (var indice = 0; indice < this.length; indice++) {
				funcaoDeIteracao(this[indice], indice);
			}
		},

		quantidadeMenorQue: function (quantidade) {
			return (this.length < quantidade);
		},

		quantidadeMenorIgualQue: function (quantidade) {
			return (this.length <= quantidade);
		},

		quantidadeMaiorQue: function (quantidade) {
			return (this.length > quantidade);
		},

		quantidadeMaiorIgualQue: function (quantidade) {
			return (this.length >= quantidade);
		},

		quantidadeIgual: function (quantidade) {
			return (this.length === quantidade);
		},

		reduzir: function (funcaoDeReducao, valorAtual, escopo) {
			funcaoDeReducao = funcaoDeReducao.vincularEscopo(escopo);
			valorAtual = valorAtual || 0;
			for (var indice = 0; indice < this.length; indice++) {
				valorAtual = funcaoDeReducao(valorAtual, this[indice], indice);
			}
			return valorAtual;
		},

		reduzirSemPrimeiro: function (funcaoDeReducao, valorAtual, escopo) {
			funcaoDeReducao = funcaoDeReducao.vincularEscopo(escopo);
			valorAtual = valorAtual || 0;
			for (var indice = 1; indice < this.length; indice++) {
				valorAtual = funcaoDeReducao(valorAtual, this[indice], indice);
			}
			return valorAtual;
		},

		reduzirSemUltimo: function (funcaoDeReducao, valorAtual, escopo) {
			funcaoDeReducao = funcaoDeReducao.vincularEscopo(escopo);
			valorAtual = valorAtual || 0;
			for (var indice = 0; indice < (this.length - 1); indice++) {
				valorAtual = funcaoDeReducao(valorAtual, this[indice], indice);
			}
			return valorAtual;
		},

		removerPosicao: function (posicao) {
			this.splice(posicao, 1);
		},

		removerElemento: function (elemento) {
			this.removerPosicao(this.fornecerIndice(elemento));
		},

		vazio: function () {
			return (this.length === 0);
		}
	});

	Array.prototype.definirPropriedades({
		primeiro: {
			fornecer: function () {
				return this[0];
			}
		},

		primeiroIndice: {
			fornecer: function () {
				return 0;
			}
		},

		ultimo: {
			fornecer: function () {
				return this[this.length - 1];
			}
		},

		ultimoIndice: {
			fornecer: function () {
				return (this.length - 1);
			}
		}
	});
} ());
(function () {
	"use strict";

	String.implementar({
		emBranco: function () {
			var padraoSemEspaco = /^\s*$/;
			return padraoSemEspaco.test(this);
		},

		formatarNumero: function (formato) {
			var formatado = formato;
			var padrao = /[^0-9]/g;
			var padraoDeSubstituicao = /#/;
			var vazio = "";
			var numeros = this.replace(padrao, vazio).split(vazio);
			for (var indice = 0, tamanho = numeros.length; indice < tamanho; indice++) {
				formatado = formatado.replace(padraoDeSubstituicao, numeros[indice]);
			}
			var proximaSubstituicao = formatado.search(padraoDeSubstituicao);
			if (proximaSubstituicao !== -1) {
				formatado = formatado.slice(0, proximaSubstituicao);
			}
			return formatado;
		},

		paraInteiro: function () {
			return parseInt(this, 10);
		},

		paraFlutuante: function () {
			return parseFloat(this, 10);
		}
	});

	String.estender({
		concatenar: function () {
			var texto = "";
			for (var indice = 0, tamanho = arguments.length; indice < tamanho; indice++) {
				texto = texto + arguments[indice];
			}
			return texto;
		},

		concatenarComEspaco: function () {
			var texto = "";
			for (var indice = 0, tamanho = arguments.length; indice < tamanho; indice++) {
				texto = texto + " " + arguments[indice];
			}
			return (arguments.length > 0) ? texto.substr(1, texto.length - 1) : texto;
		},

		formatar: function (mensagem) {
			for (var indice = 1, tamanho = arguments.length; indice < tamanho; indice++) {
				mensagem = mensagem.replace(new RegExp("%@"), arguments[indice]);
				mensagem = mensagem.replace(new RegExp("%" + indice, "g"), arguments[indice]);
			}
			mensagem = mensagem.replace(new RegExp("%@", "g"), "");
			mensagem = mensagem.replace(new RegExp("%[1-9]", "g"), "");
			return mensagem;
		}
	});
}());
(function () {
	"use strict";

	Number.estender({
		naoNumero: function (valor) {
			return (valor !== valor);
		},

		sortear: function (limiteA, limiteB) {
			var limiteInferior = Math.min(limiteA, limiteB);
			var limiteSuperior = Math.max(limiteA, limiteB);
			return (Math.random() * (limiteSuperior - limiteInferior) + limiteInferior);
		},

		sortearInteiro: function (limiteA, limiteB) {
			var limiteInferior = Math.min(limiteA, limiteB);
			var limiteSuperior = Math.max(limiteA, limiteB);
			return (Math.floor(Math.random() * (limiteSuperior - limiteInferior + 1)) + Math.floor(limiteInferior));
		}
	});

	Number.definirPropriedades({
		maximo: {
			fornecer: function () {
				return Number.MAX_VALUE;
			}
		},

		minimo: {
			fornecer: function () {
				return Number.MIN_VALUE;
			}
		},

		maisInfinito: {
			fornecer: function () {
				return Number.POSITIVE_INFINITY;
			},
		},

		menosInfinito: {
			fornecer: function () {
				return Number.NEGATIVE_INFINITY;
			}
		}
	});
}());
/*global Linda*/

(function (global) {
	"use strict";

	function Objeto() {}

	Objeto.implementar({
		inicializar: function () {},

		destruir: function () {},

		super: function () {
			this.SuperClasse.prototipo.inicializar.aplicarComEscopo(this, arguments);
		},

		igual: function (outro) {
			return (this === outro);
		}
	});

	Objeto.estender({
		prototipo: Objeto.prototype
	});

	function Classe() {}

	Classe.estender({
		criar: function (corpoDaClasse) {
			var SuperClasse = corpoDaClasse.SuperClasse;
			var estende = Linda.instanciaDe(SuperClasse, Function);
			function NovaClasse() {
				this.inicializar.aplicarComEscopo(this, arguments);
			}
			SuperClasse = (estende) ? SuperClasse : Objeto;
			corpoDaClasse.SuperClasse = SuperClasse;
			NovaClasse.prototype = Object.create(SuperClasse.prototype);
			NovaClasse.prototipo = NovaClasse.prototype;
			NovaClasse.implementar(corpoDaClasse);
			NovaClasse.prototype.definirPropriedades({
				SuperClasse: Linda.propriedadesDeAtributosGravaveisConfiguraveis
			});
			return NovaClasse;
		},

		criarSingleton: function(corpoDaClasse) {
			var NovaClasseUnica = Classe.criar(corpoDaClasse);
			NovaClasseUnica.estender({
				instanciaUnica: null,
				instancia: function () {
					this.instanciaUnica = Object.create(this.prototipo);
					this.aplicarComEscopo(this.instanciaUnica, arguments);
					this.definirPropriedades({
						instanciaUnica: Linda.propriedadesDeAtributos,
						instancia: {
							configuravel: false,
							enumeravel: false,
							fornecer: function () {
								return this.instanciaUnica;
							}
						}
					});
					return this.instanciaUnica;
				}
			});
			return NovaClasseUnica;
		},

		criarEnumeracao: function (enumeracoes, corpoDaClasse) {
			var ClasseEnumeracao = Classe.criar(corpoDaClasse);
			var NovaEnumeracao = new Enumeracao(ClasseEnumeracao);
			enumeracoes.paraCada(function (argumentos, enumeracao) {
				this[enumeracao] = Object.create(ClasseEnumeracao.prototipo);
				ClasseEnumeracao.aplicarComEscopo(this[enumeracao], argumentos);
			}, NovaEnumeracao);
			return NovaEnumeracao;
		},

		criarEnumeracaoDeConstantes: function (enumeracoes) {
			var NovaEnumeracaoDeConstantes = new EnumeracaoDeConstantes();
			enumeracoes.paraCada(function (valor, enumeracao) {
				this[enumeracao] = valor;
			}, NovaEnumeracaoDeConstantes);
			return NovaEnumeracaoDeConstantes;
		}
	});

	var Enumeracao = Classe.criar({
		inicializar: function (classe) {
			this.definirPropriedades({
				classe: {
					gravavel: false,
					enumeravel: false,
					configuravel: false,
					valor: classe
				}
			});
		},

		mapear: function (chave) {
			var enumeracaoEncontrada = null;
			this.paraCada(function (enumeracao) {
				if (enumeracao.chave === chave || enumeracao === chave) {
					enumeracaoEncontrada = enumeracao;
					return;
				}
			}, this);
			return enumeracaoEncontrada;
		},

		comoLista: function () {
			var lista = [];
			this.paraCada(function (enumeracao) {
				if (!Linda.nuloOuIndefinido(enumeracao.chave)) {
					lista.push(enumeracao);
				}
			}, this);
			return lista;
		}
	});

	var EnumeracaoDeConstantes = Classe.criar({
		mapear: function (chave) {
			var enumeracaoEncontrada = null;
			this.paraCada(function (enumeracao) {
				if (enumeracao === chave) {
					enumeracaoEncontrada = enumeracao;
					return;
				}
			}, this);
			return enumeracaoEncontrada;
		},

		comoLista: function () {
			var lista = [];
			this.paraCada(function (enumeracao) {
				lista.push(enumeracao);
			}, this);
			return lista;
		}
	});

	global.Classe = Classe;
	global.Objeto = Objeto;
}(this));
/*global Linda*/
/*global Classe*/

(function (global) {
	"use strict";

	var Tipo = Classe.criarEnumeracaoDeConstantes(Linda.tipos);

	var Evento = Classe.criarEnumeracaoDeConstantes({
		ABORTADO: "abort",
		ALTERADO: "change",
		CARREGADO: "load",
		CARREGAMENTO_INICIADO: "loadstart",
		CARREGAMENTO_FINALIZADO: "loadend",
		CLIQUE: "click",
		DUPLO_CLIQUE: "dbclick",
		ESTOURO_DE_TEMPO: "timeout",
		ERRO: "error",
		HISTORICO_ALTERADO: "popstate",
		PROGRESSO: "progress",
		TECLA_PRESSIONADA: "keydown",
		TECLA_SOLTA: "keyup"
	});

	var Tecla = Classe.criarEnumeracaoDeConstantes({
		APAGAR: 8,
		CIMA: 38,
		BAIXO: 40,
		ESQUERDA: 37,
		DIREITA: 39
	});

	var AtributoHttp = Classe.criarEnumeracaoDeConstantes({
		CONTENT_TYPE: "Content-Type",
		ACCEPT: "Accept",
		ACCEPT_CHARSET: "Accept-Charset",
		ACCEPT_ENCODING: "Accept-Encoding",
		ACCESS_CONTROL_REQUEST_HEADERS: "Access-Control-Request-Headers",
		ACCESS_CONTROL_REQUEST_METHOD: "Access-Control-Request-Method",
		CONNECTION: "Connection",
		CONTENT_LENGTH: "Content-Length",
		COOKIE: "Cookie",
		COOKIE_2: "Cookie2",
		CONTENT_TRANSFER_ENCODING: "Content-Transfer-Encoding",
		DATE: "Date",
		EXPECT: "Expect",
		HOST: "Host",
		KEEP_ALIVE: "Keep-Alive",
		ORIGIN: "Origin",
		REFERER: "Referer",
		TE: "TE",
		TRAILER: "Trailer",
		TRANSFER_ENCODING: "Transfer-Encoding",
		UPGRADE: "Upgrade",
		USER_AGENT: "User-Agent",
		VIA: "Via"
	});

	var MetodoHttp = Classe.criarEnumeracaoDeConstantes({
		GET: "GET",
		PUT: "PUT",
		POST: "POST",
		DELETE: "DELETE",
		HEAD: "HEAD",
		OPTIONS: "OPTIONS"
	});

	var TipoDeResposta = Classe.criarEnumeracaoDeConstantes({
		JSON: "",
		TEXTO: "text",
		DOCUMENTO: "document",
		BLOB: "blob",
		ARRAY_BUFFER: "arraybuffer"
	});

	var TipoDeObservacao = Classe.criarEnumeracaoDeConstantes({
		ATUALIZACAO: "updated",
		RECONFIGURACAO: "reconfigured",
		REMOCAO: "deleted",
		CRIACAO: "new"
	});

	var TipoGenericoDeMidia = Classe.criarEnumeracao({
		APLICACAO: ["application"],
		AUDIO: ["audio"],
		IMAGEM: ["image"],
		MENSAGEM: ["message"],
		MODELO: ["model"],
		MULTIPARTE: ["multipart"],
		TEXTO: ["text"],
		VIDEO: ["video"]
	}, {
		inicializar: function (chave) {
			this.chave = chave;
		},

		comoTexto: function () {
			return this.chave;
		},

		comoTextoGenerico: function () {
			return String.formatar("%@/*", this.chave);
		}
	});

	var TipoDeMidia = Classe.criarEnumeracao({
		JS: [TipoGenericoDeMidia.APLICACAO, "javascript"],
		JSON: [TipoGenericoDeMidia.APLICACAO, "json"],
		PDF: [TipoGenericoDeMidia.APLICACAO, "pdf"],
		XML: [TipoGenericoDeMidia.APLICACAO, "xml"],
		ZIP: [TipoGenericoDeMidia.APLICACAO, "zip"],
		MP3: [TipoGenericoDeMidia.AUDIO, "mpeg"],
		GIF: [TipoGenericoDeMidia.IMAGEM, "gif"],
		JPEG: [TipoGenericoDeMidia.IMAGEM, "jpeg"],
		PNG: [TipoGenericoDeMidia.IMAGEM, "png"],
		SVG: [TipoGenericoDeMidia.IMAGEM, "svg+xml"],
		FORMULARIO: [TipoGenericoDeMidia.MULTIPARTE, "form-data"],
		CSS: [TipoGenericoDeMidia.TEXTO, "css"],
		CSV: [TipoGenericoDeMidia.TEXTO, "csv"],
		HTML: [TipoGenericoDeMidia.TEXTO, "html"],
		TEXTO: [TipoGenericoDeMidia.TEXTO, "plain"],
		MP4: [TipoGenericoDeMidia.VIDEO, "mp4"],
		MPEG: [TipoGenericoDeMidia.VIDEO, "mpeg"],
		OGG: [TipoGenericoDeMidia.VIDEO, "ogg"],
		VORBIS: [TipoGenericoDeMidia.VIDEO, "vorbis"],
		WEBM: [TipoGenericoDeMidia.VIDEO, "webm"]
	}, {
		inicializar: function (tipoGenerico, tipo) {
			this.tipoGenerico = tipoGenerico;
			this.tipo = tipo;
			this.chave = String.formatar("%@/%@", this.tipoGenerico.comoTexto(), this.tipo);
		},

		comoTexto: function () {
			return this.chave;
		},

		comoTextoGenerico: function () {
			return this.tipoGenerico.comoTextoGenerico();
		}
	});

	var CodigoHttp = Classe.criarEnumeracao({
		HTTP_100: [100, "Continuar", "Continue"],
		HTTP_101: [101, "Trocando protocolos", "Switching Protocols"],
		HTTP_200: [200, "Certo", "OK"],
		HTTP_201: [201, "Criado", "Created"],
		HTTP_202: [202, "Aceito", "Accepted"],
		HTTP_203: [203, "Informações não autorizadas", "Non-Authoritative Information"],
		HTTP_204: [204, "Sem conteúdo", "No Content"],
		HTTP_205: [205, "Conteúdo reiniciado", "Reset Content"],
		HTTP_206: [206, "Conteúdo parcial", "Partial Content"],
		HTTP_300: [300, "Múltiplas escolhas", "Multiple Choices"],
		HTTP_301: [301, "Movido permanentemente", "Moved Permanently"],
		HTTP_302: [302, "Encontrado", "Found"],
		HTTP_303: [303, "Olhar outro", "See Other"],
		HTTP_304: [304, "Não modificado", "Not Modified"],
		HTTP_305: [305, "Usar procurador", "Use Proxy"],
		HTTP_306: [306, "", ""],
		HTTP_307: [307, "Redirecionado temporariamente", "Temporary Redirect"],
		HTTP_400: [400, "Requisição ruim", "Bad Request"],
		HTTP_401: [401, "Não autorizado", "Unauthorized"],
		HTTP_402: [402, "Pagamento requerido", "Payment Required"],
		HTTP_403: [403, "Proibido", "Forbidden"],
		HTTP_404: [404, "Não encontrado", "Not Found"],
		HTTP_405: [405, "Método não permitido", "Method Not Allowed"],
		HTTP_406: [406, "Não aceitável", "Not Acceptable"],
		HTTP_407: [407, "Autenticação do procurador requerida", "Proxy Authentication Required"],
		HTTP_408: [408, "Estouro de tempo", "Request Time-out"],
		HTTP_409: [409, "Conflito", "Conflict"],
		HTTP_410: [410, "Desaparecido", "Gone"],
		HTTP_411: [411, "Tamanho requerido", "Length Required"],
		HTTP_412: [412, "Pré-condição não satisfeita", "Precondition Failed"],
		HTTP_413: [413, "Entidade muito grande", "Request Entity Too Large"],
		HTTP_414: [414, "URI muito longa", "Request-URI Too Large"],
		HTTP_415: [415, "Tipo de mídia não suportado", "Unsupported Media Type"],
		HTTP_416: [416, "Intervalo não satisfatório", "Requested range not satisfiable"],
		HTTP_417: [417, "Expectativa não satisfeita", "Expectation Failed"],
		HTTP_500: [500, "Erro interno no servidor", "Internal Server Error"],
		HTTP_501: [501, "Não implementado", "Not Implemented"],
		HTTP_502: [502, "Portão de acesso ruim", "Bad Gateway"],
		HTTP_503: [503, "Serviço indisponível", "Service Unavailable"],
		HTTP_504: [504, "Estouro de tempo do portão de acesso", "Gateway Time-out"],
		HTTP_505: [505, "Versão do protocolo não suportada", "HTTP Version not supported"]
	}, {
		inicializar: function (chave, texto, textoIngles) {
			this.chave = chave;
			this.texto = texto;
			this.textoIngles = textoIngles;
		},

		comoNumero: function () {
			return this.chave;
		},

		comoTexto: function () {
			return this.texto;
		},

		comoTextoFormatado: function () {
			return String.formatar("%@ - %@", this.comoNumero(), this.comoTexto());
		},

		comoTextoIngles: function () {
			return this.textoIngles;
		},

		informacional: function () {
			return (this.chave >= 100 && this.chave < 200);
		},

		sucesso: function () {
			return (this.chave >= 200 && this.chave < 300);
		},

		redirecionamento: function () {
			return (this.chave >= 300 && this.chave < 400);
		},

		erroDoCliente: function () {
			return (this.chave >= 400 && this.chave < 500);
		},

		erroDoServidor: function () {
			return (this.chave >= 500 && this.chave < 600);
		}
	});

	global.Tipo = Tipo;
	global.Evento = Evento;
	global.Tecla = Tecla;
	global.AtributoHttp = AtributoHttp;
	global.MetodoHttp = MetodoHttp;
	global.CodigoHttp = CodigoHttp;
	global.TipoDeResposta = TipoDeResposta;
	global.TipoDeMidia = TipoDeMidia;
	global.TipoGenericoDeMidia = TipoGenericoDeMidia;
	global.TipoDeObservacao = TipoDeObservacao;
}(this));
/*global AtributoHttp*/
/*global Classe*/
/*global CodigoHttp*/
/*global Evento*/
/*global Linda*/
/*global MetodoHttp*/
/*global TipoDeMidia*/
/*global TipoDeResposta*/

(function (global) {
	"use strict";

	var RequisicaoHttp = Classe.criar({
		inicializar: function (uri, tipoDeResposta) {
			this.requisicaoXml = new XMLHttpRequest();
			this.requisicaoXml.responseType = tipoDeResposta;
			this.uri = uri;
			this.usuario = null;
			this.senha = null;
			this.codigoDeEstado = null;
			this.cabecalho = [];
			this.tratadorDeCarregamento = new TratadorDeCarregamento(this.requisicaoXml);
			this.tratador = new Tratador(this.requisicaoXml);
		},

		enviar: function (metodo, dados, sincrono) {
			var assincrono = !sincrono;
			metodo = MetodoHttp.mapear(metodo);
			this.requisicaoXml.open(metodo, this.uri, assincrono, this.usuario, this.senha);
			this.cabecalho.paraCada(function (atributo) {
				this.requisicaoXml.setRequestHeader(atributo.nome, atributo.valor);
			}, this);
			this.requisicaoXml.send(dados);
			if (!assincrono) {
				return this.fornecerResposta();
			}
		},

		enviarGet: function (sincrono) {
			return this.enviar(MetodoHttp.GET, null, sincrono);
		},

		enviarPut: function (dados, sincrono) {
			return this.enviar(MetodoHttp.PUT, dados, sincrono);
		},

		enviarPost: function (dados, sincrono) {
			return this.enviar(MetodoHttp.POST, dados, sincrono);
		},

		envirDelete: function (sincrono) {
			return this.enviar(MetodoHttp.DELETE, null, sincrono);
		},

		tratarInicio: function (tratador, escopo) {
			this.tratadorDeCarregamento.paraCarregamentoIniciado(tratador, escopo);
			return this;
		},

		tratarProgresso: function (tratador, escopo) {
			this.tratadorDeCarregamento.paraProgresso(tratador, escopo);
			return this;
		},

		tratarTermino: function (tratador, escopo) {
			this.tratadorDeCarregamento.paraCarregamentoFinalizado(tratador, escopo);
			return this;
		},

		tratarAborto: function (tratador, escopo) {
			this.tratadorDeCarregamento.paraAborto(tratador, escopo);
			return this;
		},

		tratarEstouroDeTempo: function (tratador, escopo) {
			this.tratadorDeCarregamento.paraEstouroDeTempo(tratador, escopo);
			return this;
		},

		tratarErro: function (tratador, escopo) {
			this.tratador.paraErro(tratador, escopo);
			return this;
		},

		tratarResposta: function (tratador, escopo) {
			this.tratadorDeCarregamento.paraCarregamento(function () {
				tratador.chamarComEscopo(escopo, this.fornecerResposta(), this.fornecerCodigoDeEstado());
			}, this);
			return this;
		},

		tratarRedirecionamento: function (tratador, escopo) {
			this.tratadorDeCarregamento.paraCarregamento(function () {
				var codigoDeEstado = this.fornecerCodigoDeEstado();
				if (codigoDeEstado.redirecionamento()) {
					tratador.chamarComEscopo(escopo, this.fornecerResposta(), codigoDeEstado);
				}
			}, this);
			return this;
		},

		tratarSucesso: function (tratador, escopo) {
			this.tratadorDeCarregamento.paraCarregamento(function () {
				var codigoDeEstado = this.fornecerCodigoDeEstado();
				if (codigoDeEstado.sucesso()) {
					tratador.chamarComEscopo(escopo, this.fornecerResposta(), codigoDeEstado);
				}
			}, this);
			return this;
		},

		tratarErroDoCliente: function (tratador, escopo) {
			this.tratadorDeCarregamento.paraCarregamento(function () {
				var codigoDeEstado = this.fornecerCodigoDeEstado();
				if (codigoDeEstado.erroDoCliente()) {
					tratador.chamarComEscopo(escopo, this.fornecerResposta(), codigoDeEstado);
				}
			}, this);
			return this;
		},

		tratarErroDoServidor: function (tratador, escopo) {
			this.tratadorDeCarregamento.paraCarregamento(function () {
				var codigoDeEstado = this.fornecerCodigoDeEstado();
				if (codigoDeEstado.erroDoServidor()) {
					tratador.chamarComEscopo(escopo, this.fornecerResposta(), codigoDeEstado);
				}
			}, this);
			return this;
		},

		abortar: function () {
			this.requisicaoXml.abort();
			return this;
		},

		fixarAtributoDeCabecalho: function (nome, valor) {
			this.cabecalho.push({nome: nome, valor: valor});
			return this;
		},

		fixarAutenticacao: function (usuario, senha) {
			this.usuario = usuario;
			this.senha = senha;
			return this;
		},

		fixarTempoLimite: function (tempoLimite) {
			this.requisicaoXml.timeout = tempoLimite;
			return this;
		},

		fornecerResposta: function () {
			return this.requisicaoXml.response;
		},

		fornecerCodigoDeEstado: function () {
			if (Linda.nulo(this.codigoDeEstado)) {
				this.codigoDeEstado = CodigoHttp.mapear(this.requisicaoXml.status);
			}
			return this.codigoDeEstado;
		}
	});

	var RequisicaoJson = Classe.criar({
		SuperClasse: RequisicaoHttp,

		inicializar: function (uri) {
			this.super(uri, TipoDeResposta.JSON);
			this.fixarAtributoDeCabecalho(AtributoHttp.ACCEPT, TipoDeMidia.JSON.comoTexto());
		},

		enviaJson: function () {
			this.fixarAtributoDeCabecalho(AtributoHttp.CONTENT_TYPE, TipoDeMidia.JSON.comoTexto());
		},

		fornecerResposta: function () {
			return JSON.parse(this.requisicaoXml.response);
		}
	});

	var RequisicaoHtml = Classe.criar({
		SuperClasse: RequisicaoHttp,

		inicializar: function (uri) {
			this.super(uri, TipoDeResposta.DOCUMENTO);
			this.fixarAtributoDeCabecalho(AtributoHttp.ACCEPT, TipoDeMidia.HTML.comoTexto());
		},
	});

	var RequisicaoDocumento = Classe.criar({
		SuperClasse: RequisicaoHttp,

		inicializar: function (uri) {
			this.super(uri, TipoDeResposta.DOCUMENTO);
		}
	});

	var RequisicaoTexto = Classe.criar({
		SuperClasse: RequisicaoHttp,

		inicializar: function (uri) {
			this.super(uri, TipoDeResposta.TEXTO);
		}
	});

	global.RequisicaoJson = RequisicaoJson;
	global.RequisicaoHtml = RequisicaoHtml;
	global.RequisicaoDocumento = RequisicaoDocumento;
	global.RequisicaoTexto = RequisicaoTexto;
}(this));
/*global Linda*/

(function (global) {
	"use strict";

	var Ambiente = Classe.criarSingleton({
		inicializar: function () {
			this.global = global;
			this.janela = (window || global);
			this.documento = this.janela.document;
			this.historico = this.janela.history;
			this.localizacao = this.janela.location;
			this.performance = this.janela.performance;
		},

		selecionar: function (selecao) {
			return this.documento.querySelector(selecao);
		},

		selecionarTodos: function (selecao) {
			return this.documento.querySelectorAll(selecao);
		},

		obterPelaClasse: function (classe) {
			return this.documento.getElementsByClassName(classe)[0];
		},

		obterTodosPelaClasse: function (classe) {
			return this.documento.getElementsByClassName(classe);
		},

		obterPeloNome: function (nome) {
			return this.documento.getElementsByName(nome)[0];
		},

		obterTodosPeloNome: function (nome) {
			return this.documento.getElementsByName(nome);
		},

		obterPeloIdentificador: function (identificador) {
			return this.documento.getElementById(identificador);
		},

		criarElemento: function (elemento) {
			return this.documento.createElement(elemento);
		},

		avaliar: function (texto) {
			return this.janela.eval(texto);
		},

		habilitarTelaCheia: function () {
			if (Linda.instanciaDe(this.documento.documentElement.requestFullScreen, Function)) {
				this.documento.documentElement.requestFullScreen();
			} else if (Linda.instanciaDe(this.documento.documentElement.mozRequestFullScreen, Function)) {
				this.documento.documentElement.mozRequestFullScreen();
			} else if (Linda.instanciaDe(this.documento.documentElement.webkitRequestFullScreen, Function)) {
				this.documento.documentElement.webkitRequestFullScreen();
			}
		},

		desabilitarTelaCheia: function () {
			if (Linda.instanciaDe(this.documento.cancelFullScreen, Function)) {
				this.documento.cancelFullScreen();
			} else if (Linda.instanciaDe(this.documento.webkitCancelFullScreen, Function)) {
				this.documento.webkitCancelFullScreen();
			} else if (Linda.instanciaDe(this.documento.mozCancelFullScreen, Function)) {
				this.documento.mozCancelFullScreen();
			}
		}
	}).instancia();

	var L = function (seletor) {
		return Ambiente.selecionar(seletor);
	};

	global.Ambiente = Ambiente;
	global.L = L;
}(this));
/*global HTMLCollection*/
/*global HTMLTemplateElement*/
/*global Linda*/
/*global NodeList*/
/*global Tratador*/
/*global TratadorDeCarregamento*/
/*global TratadorDeMouse*/
/*global TratadorDeTeclado*/

(function () {
	"use strict";

	Node.implementar = Function.prototype.implementar;
	NodeList.implementar = Function.prototype.implementar;
	HTMLCollection.implementar = Function.prototype.implementar;
	HTMLButtonElement.implementar = Function.prototype.implementar;

	Node.implementar({
		limpar: function () {
			var nodosFilhos = this.children;
			for (var indice = 0; indice < nodosFilhos.length; indice++) {
				var nodoFilho = nodosFilhos[indice];
				if (!Linda.instanciaDe(nodoFilho, HTMLTemplateElement)) {
					this.removeChild(nodoFilho);
					indice--;
				}
			}
		},

		selecionar: function (selecao) {
			return this.querySelector(selecao);
		},

		selecionarTodos: function (selecao) {
			return this.querySelectorAll(selecao);
		},

		tratadorDeAlteracao: function (tratador, escopo) {
			return new Tratador(this).paraAlteracao(tratador, escopo);
		},

		tratadorDeAlteracaoNoHistorico: function (tratador, escopo) {
			return new Tratador(this).paraAlteracaoNoHistorico(tratador, escopo);
		},

		tratadorDeErro: function (tratador, escopo) {
			return new Tratador(this).paraErro(tratador, escopo);
		},

		tratadorDeCarregamento: function (tratador, escopo) {
			return new TratadorDeCarregamento(this).paraCarregamento(tratador, escopo);
		},

		tratadorDeCarregamentoIniciado: function (tratador, escopo) {
			return new TratadorDeCarregamento(this).paraCarregamentoIniciado(tratador, escopo);
		},

		tratadorDeCarregamentoFinalizado: function (tratador, escopo) {
			return new TratadorDeCarregamento(this).paraCarregamentoFinalizado(tratador, escopo);
		},

		tratadorDeProgresso: function (tratador, escopo) {
			return new TratadorDeCarregamento(this).paraProgresso(tratador, escopo);
		},

		tratadorDeAbortado: function (tratador, escopo) {
			return new TratadorDeCarregamento(this).paraAbortado(tratador, escopo);
		},

		tratadorDeEstouroDeTempo: function (tratador, escopo) {
			return new TratadorDeCarregamento(this).paraEstouroDeTempo(tratador, escopo);
		},

		tratadorDeClique: function (tratador, escopo) {
			return new TratadorDeMouse(this).paraClique(tratador, escopo);
		},

		tratadorDeCliqueDuplo: function (tratador, escopo) {
			return new TratadorDeMouse(this).paraCliqueDuplo(tratador, escopo);
		},

		tratadorDeTeclaPressionada: function (tecla, tratador, escopo) {
			return new TratadorDeTeclado(this).paraTeclaPressionada(tecla, tratador, escopo);
		},

		tratadorDeTeclaSolta: function (tecla, tratador, escopo) {
			return new TratadorDeTeclado(this).paraTeclaSolta(tecla, tratador, escopo);
		},

		tratadorDeQualquerTeclaPressionada: function (tratador, escopo) {
			return new TratadorDeTeclado(this).paraQualquerTeclaPressionada(tratador, escopo);
		},

		tratadorDeQualquerTeclaSolta: function (tratador, escopo) {
			return new TratadorDeTeclado(this).paraQualquerTeclaSolta(tratador, escopo);
		}
	});

	NodeList.implementar({
		paraCada: Array.prototype.paraCada
	});

	HTMLCollection.implementar({
		paraCada: Array.prototype.paraCada
	});

	HTMLButtonElement.implementar({
		bloquear: function () {
			this.setAttribute("disabled", "disabled");
		},

		desbloquear: function () {
			this.removeAttribute("disabled");
		}
	});
}(this));
/*global Ambiente*/
/*global Classe*/
/*global Tecla*/

(function (global) {
	"use strict";

	var Tratador = Classe.criar({
		inicializar: function (elemento) {
			this.elemento = elemento || Ambiente.janela;
			this.eventosTratadores = [];
		},

		adicionar: function (evento, tratador) {
			var eventoTratador = {
				evento: evento,
				tratador: tratador
			};
			this.eventosTratadores.push(eventoTratador);
			this.elemento.addEventListener(evento, tratador);
		},

		remover: function () {
			this.eventosTratadores.paraCada(function (eventoTratador) {
				this.elemento.removeEventListener(eventoTratador.evento, eventoTratador.tratador);
			}, this);
		},

		paraAlteracao: function (tratador, escopo) {
			this.adicionar(Evento.ALTERADO, tratador.vincularEscopo(escopo));
			return this;
		},

		paraAlteracaoNoHistorico: function (tratador, escopo) {
			this.adicionar(Evento.HISTORICO_ALTERADO, tratador.vincularEscopo(escopo));
			return this;
		},

		paraErro: function (tratador, escopo) {
			this.adicionar(Evento.ERRO, tratador.vincularEscopo(escopo));
			return this;
		}
	});

	var TratadorDeCarregamento = Classe.criar({
		SuperClasse: Tratador,

		inicializar: function (elemento) {
			this.super(elemento);
		},

		paraCarregamento: function (tratador, escopo) {
			this.adicionar(Evento.CARREGADO, tratador.vincularEscopo(escopo));
			return this;
		},

		paraCarregamentoIniciado: function (tratador, escopo) {
			this.adicionar(Evento.CARREGAMENTO_INICIADO, tratador.vincularEscopo(escopo));
			return this;
		},

		paraCarregamentoFinalizado: function (tratador, escopo) {
			this.adicionar(Evento.CARREGAMENTO_FINALIZADO, tratador.vincularEscopo(escopo));
			return this;
		},

		paraProgresso: function (tratador, escopo) {
			this.adicionar(Evento.PROGRESSO, tratador.vincularEscopo(escopo));
			return this;
		},

		paraAbortado: function (tratador, escopo) {
			this.adicionar(Evento.ABORTADO, tratador.vincularEscopo(escopo));
			return this;
		},

		paraEstouroDeTempo: function (tratador, escopo) {
			this.adicionar(Evento.ESTOURO_DE_TEMPO, tratador.vincularEscopo(escopo));
			return this;
		}
	});

	var TratadorDeTeclado = Classe.criar({
		SuperClasse: Tratador,

		inicializar: function (elemento) {
			this.super(elemento);
		},

		paraTeclaPressionada: function (tecla, tratador, escopo) {
			this.adicionar(Evento.TECLA_PRESSIONADA, this.adicionarTratadorDeTeclado(tecla, tratador, escopo));
			return this;
		},

		paraTeclaSolta: function (tecla, tratador, escopo) {
			this.adicionar(Evento.TECLA_SOLTA, this.adicionarTratadorDeTeclado(tecla, tratador, escopo));
			return this;
		},

		paraQualquerTeclaPressionada: function (tratador, escopo) {
			this.adicionar(Evento.TECLA_PRESSIONADA, this.adicionarTratadorDeTecladoParaQualquer(tratador, escopo));
			return this;
		},

		paraQualquerTeclaSolta: function (tratador, escopo) {
			this.adicionar(Evento.TECLA_SOLTA, this.adicionarTratadorDeTecladoParaQualquer(tratador, escopo));
			return this;
		},

		adicionarTratadorDeTeclado: function (tecla, tratador, escopo) {
			return function (evento) {
				if (tecla === evento.keyCode) {
					tratador.chamarComEscopo(escopo);
				}
			};
		},

		adicionarTratadorDeTecladoParaQualquer: function (tratador, escopo) {
			return function (evento) {
				if (Tecla.APAGAR !== evento.keyCode) {
					tratador.chamarComEscopo(escopo);
				}
			};
		}
	});

	var TratadorDeMouse = Classe.criar({
		SuperClasse: Tratador,

		inicializar: function (elemento) {
			this.super(elemento);
		},

		paraClique: function (tratador, escopo) {
			this.adicionar(Evento.CLIQUE, tratador.vincularEscopo(escopo));
			return this;
		},

		paraDuploClique: function (tratador, escopo) {
			this.adicionar(Evento.DUPLO_CLIQUE, tratador.vincularEscopo(escopo));
			return this;
		}
	});

	global.Tratador = Tratador;
	global.TratadorDeCarregamento = TratadorDeCarregamento;
	global.TratadorDeTeclado = TratadorDeTeclado;
	global.TratadorDeMouse = TratadorDeMouse;
}(this));
/*global Linda*/

(function () {
	"use strict";

	Object.prototype.definirPropriedades({
		cadaPropriedade: Linda.propriedadesDeAtributos,
		cadaPropriedadeEnumeravel: Linda.propriedadesDeAtributos,
		cadaPropriedadeInvisivel: Linda.propriedadesDeAtributos,
		cadaPropriedadePropria: Linda.propriedadesDeAtributos,
		cadaPropriedadePropriaEnumeravel: Linda.propriedadesDeAtributos,
		cadaPropriedadePropriaInvisivel: Linda.propriedadesDeAtributos,
		cadaPropriedadeHerdada: Linda.propriedadesDeAtributos,
		cadaPropriedadeHerdadaEnumeravel: Linda.propriedadesDeAtributos,
		cadaPropriedadeHerdadaInvisivel: Linda.propriedadesDeAtributos,
		fornecerPropriedades: Linda.propriedadesDeAtributos,
		fornecerPropriedadesEnumeraveis: Linda.propriedadesDeAtributos,
		fornecerPropriedadesInvisiveis: Linda.propriedadesDeAtributos,
		fornecerPropriedadesProprias: Linda.propriedadesDeAtributos,
		fornecerPropriedadesPropriasEnumeraveis: Linda.propriedadesDeAtributos,
		fornecerPropriedadesPropriasInvisiveis: Linda.propriedadesDeAtributos,
		fornecerPropriedadesHerdadas: Linda.propriedadesDeAtributos,
		fornecerPropriedadesHerdadasEnumeraveis: Linda.propriedadesDeAtributos,
		fornecerPropriedadesHerdadasInvisiveis: Linda.propriedadesDeAtributos,
		possuiPropriedade: Linda.propriedadesDeAtributos,
		possuiPropriedadeEnumeravel: Linda.propriedadesDeAtributos,
		possuiPropriedadeInvisivel: Linda.propriedadesDeAtributos,
		possuiPropriedadePropria: Linda.propriedadesDeAtributos,
		possuiPropriedadePropriaEnumeravel: Linda.propriedadesDeAtributos,
		possuiPropriedadePropriaInvisivel: Linda.propriedadesDeAtributos,
		possuiPropriedadeHerdada: Linda.propriedadesDeAtributos,
		possuiPropriedadeHerdadaEnumeravel: Linda.propriedadesDeAtributos,
		possuiPropriedadeHerdadaInvisivel: Linda.propriedadesDeAtributos,
		instanciaDe: Linda.propriedadesDeAtributos,
		prototipadoDe: Linda.propriedadesDeAtributos,
		prototipoDe: Linda.propriedadesDeAtributos,
		fornecerPrototipo: Linda.propriedadesDeAtributos,
		fornecerDescritorDePropriedade: Linda.propriedadesDeAtributos,
		privadoFornecerDescritorDePropriedade: Linda.propriedadesDeAtributos,
		definirPropriedade: Linda.propriedadesDeAtributos,
		definirPropriedades: Linda.propriedadesDeAtributos,
		privadoDefinirPropriedade: Linda.propriedadesDeAtributos,
		fundir: Linda.propriedadesDeAtributos,
		observar: Linda.propriedadesDeAtributos,
		observarAtualizacao: Linda.propriedadesDeAtributos,
		observarCriacao: Linda.propriedadesDeAtributos,
		observarReconfiguracao: Linda.propriedadesDeAtributos,
		observarRemocao: Linda.propriedadesDeAtributos,
		desobservar: Linda.propriedadesDeAtributos,
		paraCada: Linda.propriedadesDeAtributosGravaveis
	});

	Function.prototype.definirPropriedades({
		aplicarComEscopo: Linda.propriedadesDeAtributos,
		chamarComEscopo: Linda.propriedadesDeAtributos,
		estender: Linda.propriedadesDeAtributos,
		implementar: Linda.propriedadesDeAtributos,
		vincularEscopo: Linda.propriedadesDeAtributos
	});

	Array.prototype.definirPropriedades({
		clonar: Linda.propriedadesDeAtributos,
		contem: Linda.propriedadesDeAtributos,
		dentroDosLimites: Linda.propriedadesDeAtributos,
		embaralhar: Linda.propriedadesDeAtributos,
		fornecerIndice: Linda.propriedadesDeAtributos,
		fundir: Linda.propriedadesDeAtributos,
		limpar: Linda.propriedadesDeAtributos,
		paraCada: Linda.propriedadesDeAtributos,
		quantidadeMenorQue: Linda.propriedadesDeAtributos,
		quantidadeMenorIgualQue: Linda.propriedadesDeAtributos,
		quantidadeMaiorQue: Linda.propriedadesDeAtributos,
		quantidadeMaiorIgualQue: Linda.propriedadesDeAtributos,
		quantidadeIgual: Linda.propriedadesDeAtributos,
		reduzir: Linda.propriedadesDeAtributos,
		reduzirSemPrimeiro: Linda.propriedadesDeAtributos,
		reduzirSemUltimo: Linda.propriedadesDeAtributos,
		removerPosicao: Linda.propriedadesDeAtributos,
		removerElemento: Linda.propriedadesDeAtributos,
		vazio: Linda.propriedadesDeAtributos
	});

	String.prototype.definirPropriedades({
		emBranco: Linda.propriedadesDeAtributos,
		formatarNumero: Linda.propriedadesDeAtributos,
		paraInteiro: Linda.propriedadesDeAtributos,
		paraFlutuante: Linda.propriedadesDeAtributos
	});

	String.definirPropriedades({
		concatenar: Linda.propriedadesDeAtributos,
		concatenarComEspaco: Linda.propriedadesDeAtributos,
		formatar: Linda.propriedadesDeAtributos
	});

	Number.definirPropriedades({
		naoNumero: Linda.propriedadesDeAtributos,
		sortear: Linda.propriedadesDeAtributos,
		sortearInteiro: Linda.propriedadesDeAtributos
	});
}());
