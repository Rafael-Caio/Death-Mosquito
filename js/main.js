//zerando valores de altura e largura a nível global.
var altura = 0
var largura = 0
var life = 1
var tempo = 30

var tempoCriaMosquito = 1500
//o search retorna a string apos a interrogação na url.
var nivel = window.location.search
nivel = nivel.replace("?", "")
     
    if(nivel === "normal"){
        var tempoCriaMosquito = 1500

    }else if(nivel === "hard"){
        var tempoCriaMosquito = 1000

    }else if(nivel === "veryhard"){
        var tempoCriaMosquito = 750
    }

//função responsável por alterar valores de altura e largura.
//associada ao evento window onresize do body.
function ajustarTela() {
    //inner faz referência a conteúdos presentes no dom.
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(largura, altura)
}

ajustarTela()

//Criando cronometro
var cronometro = setInterval(function(){
    tempo -= 1//decremento
    if(tempo < 0){
        clearInterval(cronometro)
        clearInterval(geraMosquito)
        window.location.href = "you_win.html"
    }else{
        document.getElementById("cronometro").innerHTML = tempo
    }
    
}, 1000)


function randomPosition(){
    
    //removendo mosquito anterior
    //se mosquito existir é para remover.
    if(document.getElementById("mosquito")){
        document.getElementById("mosquito").remove()
        
       
        if(life > 2) {
            window.location.href = "game_over.html"
            
        }else{
            document.getElementById("c" + life).src = "imagens/coracao_vazio.png"
            life++
        }

    }

    var posicaoX = Math.floor(Math.random() * largura) - 90//decrementado da posição x e y para não sair da tela.
    var posicaoY = Math.floor(Math.random() * altura) - 90

    //aplicação de operadores ternários e evitando a criação de valores negativos randomixados.
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)

    //Criando elemntos Mancha
    var mancha = document.createElement("img")
    mancha.src = "imagens/mancha_verde.png"
    mancha.className = tamanhosRandomicosMancha() + " " + ladoRandomico()
    mancha.style.left = posicaoX + "px"
    mancha.style.top = posicaoY + "px"
    mancha.style.position = "absolute"
    mancha.id = "mancha"
    
    //Criando som
    var tapa = document.createElement("audio")
    tapa.src = "sounds/som_tapa.mp3"
    tapa.className
    tapa.id = "tapa"

    
    //Crianco elementos Mosquito
    var mosquito = document.createElement("img")
    //trazendo o elemento traves do atributo
    mosquito.src = "imagens/mosquito.png"
    //aplicando a class ao elemento
    mosquito.className = tamanhosRandomicosMosquito() + " " + ladoRandomico()//o espaço foi aplicado para indicar que são funçoes diferentes.
    //atrinuindo posição randomica no eixo x(largura)
    mosquito.style.left = posicaoX + "px"
    //atribuindo posição randomica no eixo y(altura)
    mosquito.style.top = posicaoY + "px"
    //atribuindo posição absoluta ao elemnto
    mosquito.style.position = "absolute"
    //criando o id mosquito
    mosquito.id = "mosquito"
    //acrescentando onclick
    mosquito.onclick = function(){
        tapa.play()
        this.remove()
        document.body.appendChild(mancha)
        
        setInterval(function removeMancha(){
            mancha.remove()
        }, 1000)  
    }
    //levando o elemento para o body
    document.body.appendChild(mosquito)
}

//Tamanhos randomicos Mosquito
//poderia ter usado o switch mas usei if
function tamanhosRandomicosMosquito() {
    var classe = Math.floor(Math.random() * 3)//resultado entre 0 e 3, com o arredondamento para menos fica(0, 1, 2)
    if(classe === 0) {
        return "mosquito1"
    }
    if(classe === 1){
        return "mosquito2"
    }
    if(classe === 2){
        return "mosquito3"
    }
       
}

//Tamanhos randomicos Mancha
function tamanhosRandomicosMancha() {
    var classe = Math.floor(Math.random() * 3)//resultado entre 0 e 3, com o arredondamento para menos fica(0, 1, 2)
    if(classe === 0) {
        return "mancha1"
    }
    if(classe === 1){
        return "mancha2"
    }
    if(classe === 2){
        return "mancha3"
    }
       
}

//Lado randomico:
function ladoRandomico(){
    var classe = Math.floor(Math.random() * 2)//resultado entre 0 e 2, com o arredondamento para menos fica(0, 1)
    if(classe === 0) {
        return "ladoA"
    }
    if(classe === 1){
        return "ladoB"
    }

}




