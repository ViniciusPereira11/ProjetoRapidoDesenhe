var dados = ["line", 'rain', 'animal_migration', 'smiley_face',"grass"];

var dadosPT = ["linha", "chuva", "migração", "rosto sorridente", "grama"];                

//declaração de variáveis
var desenhoPlayer = '';
var pontos = 0;
var tempo = 0;
//gera um número aleatório entre 0 e 5
var indice = Math.floor(Math.random()*5);
//seleciona um desenho de maneira aleatória
var desenho = dados[indice];
//guarda a tradução em português
var desenhoPT = dadosPT[indice];

//exibe o desenho a se fazer
document.getElementById("esboço").innerHTML = desenhoPT;

function preload(){
    //carrega o modelo de classificação
    classifier = ml5.imageClassifier("DoodleNet");
}

function setup(){
    canvas = createCanvas(400,400)
    background("white")
    //chama a função classificar ao soltar o mouse
    canvas.mouseReleased(classificar);
}

//cria a função classificar
function classificar(){    
    //classifica o desenho do canvas e chama a função gotResult
    classifier.classify(canvas, gotResult);
}
//cria a função gotResult
function gotResult(e, result){
    if(e){
        console.log(e);
    }else{
        //guarda o resultado
        desenhoPlayer = result[0].label;
        //mostra o resultado e a precisão na tela
        document.getElementById("desenho").innerHTML = desenhoPlayer;
        document.getElementById('precisao').innerHTML = Math.round(result[0].confidence.toFixed(2) * 100);
    }
}
function draw(){
    canvas.center();
    
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY)
    }
    //checa se o desenho do jogador é o desenho aleatório e marca os pontos
    if(desenhoPlayer == desenho){
        //aumenta o tempo
        pontos++;
         //mostra o tempo
        document.getElementById("pontos").innerHTML = pontos;
        attCanvas();
    }
         //checa se tempo é maior que 400 
         if(tempo > 400){
            
         //atualiza o canvas
         attCanvas();
        }
    tempo++;
    document.getElementById("tempo").innerHTML = tempo;
   
} 

function attCanvas(){
    background("white"); 
    tempo = 0;
    //gera um número aleatório
    indice = Math.floor(Math.random()*5);
    //seleciona um desenho com o índice aleatório
    desenho = dados[indice];
    //pega a tradução em português da lista
    desenhoPT = dadosPT[indice];
    //mostra o desenho aleatório em português
    document.getElementById("esboço").innerHTML = desenhoPT;
}

function limpar(){
    background("white")
}