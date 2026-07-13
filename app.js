/* =====================================================
JOGOS INTERCLASSE
E.E.B. Profª Daniela Pereira

APP.JS V3.0

PARTE 1/4

NAVEGAÇÃO
ESCOLHAS
LOGIN

===================================================== */



/* =====================================================
SEÇÃO 1 - NAVEGAÇÃO
===================================================== */


function mostrarTela(id){


    let telas = document.querySelectorAll(".tela");


    telas.forEach(function(tela){

        tela.classList.remove("ativa");

    });



    let tela = document.getElementById(id);



    if(tela){

        tela.classList.add("ativa");

    }


}






function voltarTela(id){


    mostrarTela(id);


}









/* =====================================================
SEÇÃO 2 - ESCOLHA DO ALUNO
===================================================== */





function escolherTurno(turno){



    bancoInterclasse.turno = turno;



    document.getElementById("tituloTurno").innerHTML = turno;



    carregarModalidades();



    salvarDados();



    mostrarTela("modalidades");



}









function carregarModalidades(){



    let area = document.getElementById("listaModalidadesAluno");



    area.innerHTML="";






    bancoInterclasse.modalidades.forEach(function(mod){



        area.innerHTML +=



        `

        <button onclick="escolherModalidade('${mod}')">

        ${mod}

        </button>


        `;



    });



}








function escolherModalidade(mod){



    bancoInterclasse.modalidade = mod;



    document.getElementById("tituloEsporte").innerHTML = mod;



    salvarDados();



    mostrarTela("categorias");



}









function escolherCategoria(cat){



    bancoInterclasse.categoria = cat;



    document.getElementById("tituloCompeticao").innerHTML =


    bancoInterclasse.modalidade
    +
    " - "
    +
    cat;



    criarCampeonato();



    salvarDados();



    mostrarTela("competicao");



}








/* =====================================================
SEÇÃO 3 - LOGIN ADMINISTRADOR
===================================================== */





function abrirLogin(){



    mostrarTela("login");



}









function entrarAdministrador(){



    let senha = document.getElementById("senhaAdmin").value;






    if(senha === "topografia"){



        administradorLogado=true;



        mostrarTela("painelAdmin");



    }



    else{



        alert("Senha incorreta!");



    }



}









function sairAdministrador(){



    administradorLogado=false;



    mostrarTela("inicio");



}


/* =====================================================
PARTE 2/4

EQUIPES
CAMPEONATOS
FORMATOS

===================================================== */






/* =====================================================
SEÇÃO 4 - EQUIPE
===================================================== */



function criarCampeonato(){



    let chave = gerarChave();



    if(!bancoInterclasse.campeonatos[chave]){



        bancoInterclasse.campeonatos[chave]={


            equipes:[],


            jogos:[],


            resultados:[],


            tipo:"",


            grupos:[]



        };



    }



}








function gerarChave(){



    return (

        bancoInterclasse.turno

        +

        "_"

        +

        bancoInterclasse.modalidade

        +

        "_"

        +

        bancoInterclasse.categoria

    );



}








function campeonatoAtual(){



    criarCampeonato();



    return bancoInterclasse.campeonatos[

        gerarChave()

    ];



}








function abrirEquipes(){



    listarEquipes();



    mostrarTela("equipes");



}








function adicionarEquipe(){



    let campo = document.getElementById("nomeEquipe");



    let nome = campo.value.trim();






    if(nome===""){



        alert("Digite o nome da equipe");


        return;


    }







    campeonatoAtual().equipes.push(nome);





    campo.value="";



    salvarDados();



    listarEquipes();



}








function listarEquipes(){



    let area=document.getElementById("listaEquipes");



    area.innerHTML="";







    campeonatoAtual().equipes.forEach(function(nome,index){



        area.innerHTML +=



        `

        <div class="card">

        ${nome}


        <br><br>


        <button onclick="removerEquipe(${index})">

        🗑 Excluir

        </button>


        </div>


        `;



    });



}








function removerEquipe(index){



    campeonatoAtual().equipes.splice(index,1);



    salvarDados();



    listarEquipes();



}









/* =====================================================
SEÇÃO 5 - MODALIDADES
===================================================== */






function abrirNovaModalidade(){



    listarModalidadesAdmin();



    mostrarTela("novaModalidade");



}







function salvarModalidade(){



    let campo=document.getElementById("nomeModalidade");



    let nome=campo.value.trim();






    if(nome===""){



        alert("Digite uma modalidade");


        return;


    }






    bancoInterclasse.modalidades.push(nome);



    campo.value="";



    salvarDados();



    listarModalidadesAdmin();



    alert("Modalidade adicionada!");



}








function listarModalidadesAdmin(){



    let area=document.getElementById("listaModalidadesAdmin");



    area.innerHTML="";







    bancoInterclasse.modalidades.forEach(function(nome,index){



        area.innerHTML +=



        `

        <div class="card">

        ${nome}


        </div>

        `;



    });



}









/* =====================================================
SEÇÃO 6 - FORMATOS
===================================================== */





function abrirFormatos(){



    mostrarTela("formatos");



}








function criarPontosCorridos(){



    let c = campeonatoAtual();



    c.tipo="Pontos Corridos";



    c.jogos=[];



    gerarJogosPontosCorridos();



    salvarDados();



    alert("Campeonato criado!");



}








function gerarJogosPontosCorridos(){



    let c=campeonatoAtual();



    let times=[...c.equipes];



    times.sort(()=>Math.random()-0.5);






    for(let i=0;i<times.length;i++){



        for(let j=i+1;j<times.length;j++){



            c.jogos.push({



                fase:"Pontos Corridos",


                casa:times[i],


                fora:times[j],


                casaPlacar:null,


                foraPlacar:null,


                finalizado:false



            });



        }



    }



}








function criarGrupos(){



    let c=campeonatoAtual();



    c.tipo="Grupos + Eliminatórias";



    c.grupos=[];



    let times=[...c.equipes];



    times.sort(()=>Math.random()-0.5);





    let qtd=1;





    if(times.length>=5 && times.length<=8){



        qtd=2;



    }



    else if(times.length>8 && times.length<=12){



        qtd=3;



    }



    else if(times.length>12){



        qtd=4;



    }







    for(let i=0;i<qtd;i++){



        c.grupos.push([]);



    }






    let contador=0;



    times.forEach(function(time){



        c.grupos[contador].push(time);



        contador++;



        if(contador>=qtd){



            contador=0;



        }



    });






    gerarJogosGrupos();



    salvarDados();



    alert("Grupos criados!");



}








function gerarJogosGrupos(){



    let c=campeonatoAtual();



    c.jogos=[];






    c.grupos.forEach(function(grupo){



        for(let i=0;i<grupo.length;i++){



            for(let j=i+1;j<grupo.length;j++){



                c.jogos.push({



                    fase:"Grupo",


                    casa:grupo[i],


                    fora:grupo[j],


                    casaPlacar:null,


                    foraPlacar:null,


                    finalizado:false



                });



            }



        }



    });



}








function criarEliminatoria(){



    let c=campeonatoAtual();



    c.tipo="Eliminatória";



    c.jogos=[];



    let times=[...c.equipes];



    times.sort(()=>Math.random()-0.5);






    for(let i=0;i<times.length;i+=2){



        if(times[i+1]){



            c.jogos.push({



                fase:"Eliminatória",


                casa:times[i],


                fora:times[i+1],


                casaPlacar:null,


                foraPlacar:null,


                finalizado:false



            });



        }



    }





    salvarDados();



    alert("Chave criada!");



}


/* =====================================================
PARTE 3/4

JOGOS
RESULTADOS
CLASSIFICAÇÃO
CHAVEAMENTO

===================================================== */






/* =====================================================
SEÇÃO 7 - JOGOS
===================================================== */



function abrirJogos(){



    let area=document.getElementById("listaJogos");



    area.innerHTML="";



    let jogos=campeonatoAtual().jogos;





    if(jogos.length===0){



        area.innerHTML=


        `

        <div class="card">

        Nenhum jogo criado ainda.

        </div>


        `;


    }







    jogos.forEach(function(jogo,index){



        area.innerHTML +=



        `

        <div class="card">


        <strong>

        ${jogo.fase}

        </strong>


        <br><br>


        ${jogo.casa}

        <br>

        X

        <br>

        ${jogo.fora}



        <br><br>


        ${
            jogo.finalizado

            ?

            jogo.casaPlacar+" x "+jogo.foraPlacar

            :

            "<button onclick='lancarResultado("+index+")'>Lançar resultado</button>"

        }


        </div>


        `;



    });







    mostrarTela("jogos");



}








function lancarResultado(index){



    let jogo=campeonatoAtual().jogos[index];



    let casa=prompt(

        "Resultado de "+jogo.casa

    );



    let fora=prompt(

        "Resultado de "+jogo.fora

    );







    if(casa===null || fora===null){



        return;


    }







    jogo.casaPlacar=Number(casa);



    jogo.foraPlacar=Number(fora);



    jogo.finalizado=true;



    salvarDados();



    abrirJogos();



}









/* =====================================================
SEÇÃO 8 - RESULTADOS
===================================================== */





function abrirResultados(){



    let area=document.getElementById("listaResultados");



    area.innerHTML="";







    campeonatoAtual().jogos.forEach(function(jogo){



        if(jogo.finalizado){



            area.innerHTML +=



            `

            <div class="card">


            ${jogo.casa}

            ${jogo.casaPlacar}

            X

            ${jogo.foraPlacar}

            ${jogo.fora}


            </div>


            `;



        }



    });







    mostrarTela("resultados");



}









/* =====================================================
SEÇÃO 9 - CLASSIFICAÇÃO
===================================================== */





function abrirClassificacao(){



    let area=document.getElementById("tabelaClassificacao");



    area.innerHTML="";



    let tabela={};






    campeonatoAtual().equipes.forEach(function(time){



        tabela[time]={



            nome:time,


            pontos:0,


            jogos:0,


            vitorias:0,


            empates:0,


            derrotas:0



        };



    });








    campeonatoAtual().jogos.forEach(function(jogo){



        if(jogo.finalizado){



            let a=tabela[jogo.casa];



            let b=tabela[jogo.fora];



            a.jogos++;


            b.jogos++;






            if(jogo.casaPlacar > jogo.foraPlacar){



                a.pontos+=3;


                a.vitorias++;


                b.derrotas++;



            }



            else if(jogo.foraPlacar > jogo.casaPlacar){



                b.pontos+=3;


                b.vitorias++;


                a.derrotas++;



            }



            else{



                a.pontos++;


                b.pontos++;


                a.empates++;


                b.empates++;



            }



        }



    });









    let lista=Object.values(tabela);



    lista.sort(function(a,b){



        return b.pontos-a.pontos;



    });









    area.innerHTML=



    `

    <table>


    <tr>

    <th>Equipe</th>

    <th>P</th>

    <th>J</th>

    </tr>


    ${

    lista.map(function(t){



        return



        `

        <tr>

        <td>${t.nome}</td>

        <td>${t.pontos}</td>

        <td>${t.jogos}</td>

        </tr>


        `;



    }).join("")

    }


    </table>

    `;








    mostrarTela("classificacao");



}









/* =====================================================
SEÇÃO 10 - CHAVEAMENTO
===================================================== */





function abrirChaveamento(){



    let area=document.getElementById("tabelaChaveamento");



    area.innerHTML="";





    let c=campeonatoAtual();





    if(c.grupos.length>0){



        c.grupos.forEach(function(grupo,index){



            area.innerHTML +=



            `

            <div class="card">


            Grupo ${index+1}


            <br><br>


            ${grupo.join("<br>")}


            </div>


            `;



        });



    }



    else{



        area.innerHTML=



        `

        <div class="card">

        ${c.tipo || "Campeonato não criado"}

        </div>

        `;



    }






    mostrarTela("chaveamento");



}



/* =====================================================
PARTE 4/4

SALVAMENTO
CARREGAMENTO
INICIALIZAÇÃO

===================================================== */






/* =====================================================
SEÇÃO 11 - SALVAR DADOS
===================================================== */



function salvarDados(){



    localStorage.setItem(

        "jogosInterclasse",

        JSON.stringify(bancoInterclasse)

    );



}








/* =====================================================
SEÇÃO 12 - CARREGAR DADOS
===================================================== */





function carregarDados(){



    let dados = localStorage.getItem(

        "jogosInterclasse"

    );





    if(dados){



        bancoInterclasse = JSON.parse(dados);



    }



}








/* =====================================================
SEÇÃO 13 - ATUALIZAÇÕES INICIAIS
===================================================== */






function iniciarSistema(){



    carregarDados();




    if(document.getElementById("listaModalidadesAluno")){



        carregarModalidades();



    }



}







window.onload=function(){



    iniciarSistema();



};