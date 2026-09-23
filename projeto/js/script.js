const senha = document.getElementById('senha');

const gerar = document.getElementById('btnGerar');

const copy = document.getElementById('copy');

const slider = document.getElementById('slider');

const quantidade = document.getElementById('quantidade');

const medidor = document.getElementById('medidor');

const letrasMai = document.getElementById("letrasMai");

const letrasMin = document.getElementById("letrasMin");

const num = document.getElementById("num");

const simbolos = document.getElementById("simbolos");

const valor = medidor.querySelector(".valor");

const listaHistorico = document.getElementById("lista-historico");

const barrinha = document.querySelectorAll('.med');

const CHARS = {
    letrasMai: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    letrasMin: "abcdefghijklmnopqrstuvwxyz",
    num: "0123456789",
    simbolos: "!@#$%^&*()_+-=[]{}|;:,.<>?"
};

const MAX_HISTORICO = 3;

let historico = [];


function atualizarQuantidade(){

    const valorS = slider.value;

    quantidade.textContent = valorS;
}

function montarAlfabeto(){
    let alfabeto = "";
    
    if(letrasMai.checked){
        alfabeto += CHARS.letrasMai;
    }
    
    if(letrasMin.checked){
        alfabeto += CHARS.letrasMin;
    }
    
    if(simbolos.checked) {
        alfabeto += CHARS.simbolos;
    }
    
    if(num.checked) {
        alfabeto += CHARS.num;
    } 

    return alfabeto;
}

function gerarSenha(){
    let n = montarAlfabeto();

    if(n === "") {
        alert('Selecione alguma especificação para a senha ser gerada');

        return;
    }

    let tam = Number(slider.value);

    let senhaGerada = '';

    for(let i = 0; i < tam; i++){

        const index = Math.floor(Math.random() * n.length);

        senhaGerada += n[index];

    }
    
    senha.value = senhaGerada;
    const forca = calcularForca(senhaGerada);
    atualizarForca(forca);
    atualizarHistorico(senhaGerada);
}

function copiar(){

    if(senha.value === ""){
        alert("Gere a senha antes de tentar copiar ela");
        return;
    }

    navigator.clipboard.writeText(senha.value)

    .then(() => {
      alert('Texto copiado com sucesso!');
    })
    .catch(() => {
    alert("Não foi possível copiar a senha");
});

}

function atualizarHistorico(senha2) {

    historico.unshift(senha2);

        if (historico.length > MAX_HISTORICO) {
    historico.pop();   

}

    listaHistorico.innerHTML = "";
    historico.forEach(s => {
        const li = document.createElement("li");
        li.textContent = s;
        listaHistorico.appendChild(li);
    });

}

function contarTipos(senha1) {
    let quantidade = 0;

    if (/[A-Z]/.test(senha1)){
        quantidade++;
    } 
    if (/[a-z]/.test(senha1)){
        quantidade++;
    } 
    if (/[0-9]/.test(senha1)){
        quantidade++;
    } 
    if (/[^A-Za-z0-9]/.test(senha1)){
        quantidade++;
    } 

    return quantidade;
}

function calcularForca(senha){

    const tamanho = senha.length;
    const tipos = contarTipos(senha);

    if(tamanho < 8 || tipos === 1){
        return "fraca";
    }
    
    if(tamanho >= 12 && tipos >= 3){
        return "forte";
    }
    
    return "media";
}

function atualizarForca(nivel) {
    
    barrinha.forEach(a => {
        a.classList.remove("fraca", "media", "forte");
    });
    valor.classList.remove("fraca", "media", "forte");

    if (nivel === "fraca"){

        barrinha[0].classList.add("fraca");
        valor.classList.add("fraca");
        
        valor.textContent = "Fraca";
    }

    if (nivel === "media"){

        barrinha[0].classList.add("media");
        barrinha[1].classList.add("media");
        valor.classList.add("media");
        
        valor.textContent = "Média";
    }

    if (nivel === "forte"){

    barrinha.forEach(b => b.classList.add("forte"));
        valor.classList.add("forte");
        
        valor.textContent = "Forte";
    }
}

copy.addEventListener("click", copiar);

slider.addEventListener("input", atualizarQuantidade);

gerar.addEventListener("click", gerarSenha);
