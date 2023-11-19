let ajax = new XMLHttpRequest();
ajax.open('GET', 'http://200.133.17.234:5000/future_city');
ajax.send();

ajax.onload = function () {
    let obj = JSON.parse(this.responseText);
    let carbonos = [
        { 'co2_evitado': obj.co2_evitado, 'co2_mes': obj.co2_mes },
    ];
    for (let carbono in carbonos) {
        document.getElementById('show-co2-mes-palmares').innerHTML = `${carbonos[carbono].co2_mes}`;
        document.getElementById('show-co2-evitado-palmares').innerHTML = `${carbonos[carbono].co2_evitado}`;
        document.getElementById('show-co2-mes-agua-preta').innerHTML = `${carbonos[carbono].co2_mes}`;
        document.getElementById('show-co2-evitado-agua-preta').innerHTML = `${carbonos[carbono].co2_evitado}`;
        document.getElementById('show-co2-mes-ribeirao').innerHTML = `${carbonos[carbono].co2_mes}`;
        document.getElementById('show-co2-evitado-ribeirao').innerHTML = `${carbonos[carbono].co2_evitado}`;

        let somaMes = 0;
        let somaEvitado = 0;
        let co2_mes = carbonos[carbono].co2_mes;
        let co2_evitado = carbonos[carbono].co2_evitado;
        somaMes += co2_mes;
        somaEvitado += co2_evitado;

        document.getElementById('total-mes').innerHTML = `${somaMes}`;
        document.getElementById('total-evitado').innerHTML = `${somaEvitado}`;
    }
}

function buscarCEP() {
    let input = document.getElementById('cep').value;

    let ajax = new XMLHttpRequest();
    ajax.open('GET', 'https://viacep.com.br/ws/' + input + '/json/');
    ajax.send();

    ajax.onload = function () {
        let obj = JSON.parse(this.responseText);

        let infor = [
            { cep: obj.cep, logradouro: obj.logradouro, complemento: obj.complemento, bairro: obj.bairro, localidade: obj.localidade, uf: obj.uf, ibge: obj.ibge, gia: obj.gia, ddd: obj.ddd, siafi: obj.siafi }
        ];
        for (let i in infor) {
            document.getElementById('show-cep').innerHTML =
                `<div>
                CEP: ${infor[i].cep}<br> LOGADOURO: ${infor[i].logradouro}<br> COMPLEMENTO: ${infor[i].complemento}<br> BAIRRO: ${infor[i].bairro}<br> LOCALIDADE: ${infor[i].localidade}<br> UF: ${infor[i].uf}<br> IBGE: ${infor[i].ibge}<br> GIA: ${infor[i].gia}<br> DDD: ${infor[i].ddd}<br> SIAFI: ${infor[i].siafi}
            </div>`;
        }
    }
}

let listaCidades = [
    { foto: `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Bandeira_de_Palmares.jpg/1200px-Bandeira_de_Palmares.jpg" alt="Logo de Palmares width="80">`, nome: 'PALMARES' },
    { foto: `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Agua-preta.svg/1200px-Agua-preta.svg.png" alt="Logo de ÁGUA-PRETA" width="80">`, nome: 'ÁGUA-PRETA' },
    { foto: `<img src="https://upload.wikimedia.org/wikipedia/commons/1/16/Bandeira_de_Ribeir%C3%A3o_PE.png" alt="Logo de Ribeirão" width="80">`, nome: 'RIBEIRÃO' }
]
let elementoTabela = document.getElementById('tabelaCidades');
exibirNaTela();
function exibirNaTela() {
    elementoTabela.innerHTML =
    `
        <tr>
            <td>${listaCidades[0].foto}</td>
            <td>${listaCidades[0].nome}</td>
            <td id="show-co2-mes-palmares"></td>
            <td id="show-co2-evitado-palmares"></td>
            <td rowspan="5" id="show-cep"><input type="text" name="cep" id="cep" placeholder="DIGITE O CEP DA CIDADE"> <input type="button" value="CONSULTAR" onclick="buscarCEP()"></td>
        </tr>
        <tr>
            <td>${listaCidades[1].foto}</td>
            <td>${listaCidades[1].nome}</td>
            <td id="show-co2-mes-agua-preta"></td>
            <td id="show-co2-evitado-agua-preta"></td>
        </tr>
        <tr>
            <td>${listaCidades[2].foto}</td>
            <td>${listaCidades[2].nome}</td>
            <td id="show-co2-mes-ribeirao"></td>
            <td id="show-co2-evitado-ribeirao"></td>
        </tr>
        <tfoot>
            <td colspan="2" rowspan="2">
                TOTAL
            </td>
            <td>
               MÊS 
            </td>
            <td>
                EVITADO
            </td>
            <tr>
                <td id="total-mes">
                </td>
                <td id="total-evitado">
                </td>
            <tr>
        </tfoot>
    `
}