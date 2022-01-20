


var MerchantOrderId = "2014111703"

//#region  Funçoes de tratamento

function SuaCompra() {
    var infopreco = document.getElementById("price")
    var price = Preco(document.getElementById("Curso"))

    var infcurso = document.getElementById("curse")
    var curso = MudaCurso(document.getElementById("Curso"))

    infopreco.innerHTML = price
    infcurso.innerHTML = curso


}

function Parcela() {

    var infoparcela = document.getElementById("parcelas")
    var parcela = MudaParcela(document.getElementById("Parc"))

    infoparcela.innerHTML = parcela
}

function MudaParcela(a) {
    var b = a
    var parcela = b.options[a.selectedIndex].value;
    if (parcela == "1")
        novo = "1x"
    else if (parcela == "2")
        novo = "2x"
    else if (parcela == "3")
        novo = "3x"


    return novo

}

function MudaCurso(a) {
    var b = a
    var curso = b.options[a.selectedIndex].value;
    if (curso == "1")
        novo = "Cuso de Datilografia"
    else if (curso == "2")
        novo = "Curso Financeiro"
    else if (curso == "3")
        novo = "Associação individual"


    return novo
}


function Preco(a) {
    var b = a
    var curso = b.options[a.selectedIndex].value;
    if (curso == "1")
        valor = 150000
    else if (curso == "2")
        valor = 130000
    else if (curso == "3")
        valor = 120000


    return valor
}

function Parcelas(a) {
    var b = a
    var num = b.options[a.selectedIndex].value;
    if (num == "1")
        parcel = 1
    else if (num == "2")
        parcel = 2
    else if (num == "3")
        parcel = 3


    return parcel


}

function Tipo(a) {
    var b = a
    var id = b.options[a.selectedIndex].value;
    if (id == "a")
        brand = "Curso"

    else if (id == "b")
        brand = "Associação"

    else if (id == "c")
        brand = "Serviços"

    return brand

}

function Bandeira(a) {
    var b = a
    var id = b.options[a.selectedIndex].value;
    if (id == "a")
        brand = "Master"

    else if (id == "b")
        brand = "Visa"

    else if (id == "c")
        brand = "Elo"

    return brand

}

function FormaPagamento(a) {
    if (document.getElementById("FormaPag").value == "pix") {
        a = "Pix"
    }
    else if (document.getElementById("FormaPag").value == "cred") {
        a = "CreditCard"
    }
    else if (document.getElementById("FormaPag").value == "debt") {
        a = "Debt"
    }
    return a

}


function PegarDados() {


    var preco = Preco(document.getElementById("Curso"))
    var precoInt = parseInt(preco);
    var parcel = Parcelas(document.getElementById("Parc"))
    var parcelint = parseInt(parcel);
    var cardNumber = document.getElementById("card").value
    var holder = document.getElementById("name").value
    var date = document.getElementById("validade-cartao").value
    var cvv = document.getElementById("cvv").value
    var brand = Bandeira(document.getElementById("brand"))
    var forma = "CreditCard"


}

//#endregion






function GerarTransacaoCred() {



    var name = document.getElementById("name").value
    var preco = Preco(document.getElementById("Curso"))
    var precoInt = parseInt(preco);
    var parcel = Parcelas(document.getElementById("Parc"))
    var parcelint = parseInt(parcel);
    var cardNumber = document.getElementById("card").value
    var holder = document.getElementById("name").value
    var date = document.getElementById("validade-cartao").value
    var cvv = document.getElementById("cvv").value
    var brand = Bandeira(document.getElementById("brand"))
    var forma = "CreditCard"

    var settings = {
        "url": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "MerchantId": "02f52406-67d1-4cd5-af5e-b0dab5c27e31",
            "MerchantKey": "GOMTIJTNRGSVWYJSDYEGKRZSWEZMLSUABRWVGXFI"
        },
        "data": JSON.stringify({
            "url": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                "MerchantId": "02f52406-67d1-4cd5-af5e-b0dab5c27e31",
                "MerchantKey": "GOMTIJTNRGSVWYJSDYEGKRZSWEZMLSUABRWVGXFI"
            },
            "MerchantOrderId": MerchantOrderId,
            "Customer": {
                "Name": name
            },
            "Payment": {
                "Type": forma,
                "Amount": precoInt,
                "Installments": parcelint,
                "CreditCard": {
                    "CardNumber": cardNumber,
                    "Holder": holder,
                    "ExpirationDate": date,
                    "SecurityCode": cvv,
                    "Brand": brand,
                    "CardOnFile": {
                        "Usage": "Used",
                        "Reason": "Unscheduled"
                    },
                    "IsCryptoCurrencyNegotiation": true
                }
            }
        }),

    };
    console.log(settings);

    try {
        $.ajax(settings
        ).done(function (response) {
            console.log(response);
            var status = response.Payment.Status
            var statusmensage = response.Payment.ReturnMessage
            var linkConsulta = response.Payment.Links[0].Href
            console.log(linkConsulta)
            console.log("Status: ", status, " mensagem: ", statusmensage)
            debugger;


            if (status == "1") {
                window.alert(statusmensage)
                window.confirm("Comfirmar a compra?\n" +
                    "O valor sera descontado da sua conta bancaria.");
                window.location.href = "https://portalibef.powerappsportals.com/"
                // Se o pagamento estiver ok vai ser redirecionado para o portal
            }
            else if (status == "3") {
                window.alert(statusmensage + "\n" +
                    "Verifique o cartão.")
            }

            else if (status == "0") {
                window.alert(statusmensage + "\n" +
                    "Tente novamente, se persistir o erro, \nEntre em contato com a IBEF.")
            }
            else {
                throw console.error(erro);
            }

        });

    } catch (error) {
        console.log(error)

    }















}


function CheckOut() {


    var name = document.getElementById("name").value //nome do comprador
    var preco = Preco(document.getElementById("Curso"))//Pega o preço do produto 
    var precoInt = parseInt(preco);//Tranforma em tipo inteiro, (essa variaval que tem que ser enviada!!) 
    var email = document.getElementById("email").value // Email do comprador, não é obrigatorio 
    var fone = document.getElementById("fone").value // Telefone do comprador, não é obrigatorio 
    var tipo = document.getElementById("descricao").value // Tipo de inscrição para ficar salvo no comprovante (Associação . . .)
    var curso = document.getElementById("Curso").value // Qual curso
    var cpf = document.getElementById("cpf").value

    var settings = {
        "url": "https://cieloecommerce.cielo.com.br/api/public/v1/orders",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Access-Control-Allow-Origin": "https://portalibef.powerappsportals.com",
            "Content-Type": "application/json",
            "Merchantid": "3207916d-cfdb-4ac5-9197-c7f76892b53c",
            "Authorization": "Basic MzIwNzkxNmQtY2ZkYi00YWM1LTkxOTctYzdmNzY4OTJiNTNjOjhxYkMyZXN5dDhqUk1PbGlEbGZVeW05MWRQbSsydjhaUk9YNUEzcG9UbVk9",
        },
        "data": JSON.stringify({
            "SoftDescriptor": tipo,
            "Cart": {

                "Items": [
                    {
                        "Name": curso, // nome do curso
                        "Description": tipo, //Descrição pode ser o tipo de associação 
                        "UnitPrice": precoInt, // Preço no curso
                        "Quantity": 1, // Quantidades de produtos
                        "Type": "Asset"
                    }
                ]
            },
            "Shipping": {
                "Type": "WithoutShipping", // sem frete
            },
            "Customer": {
                "Identity": cpf, // Documentos, não é obrigatorio
                "FullName": name,
                "Email": email,
                "Phone": fone

            },

            "Settings": null
        }),
    };
    console.log(settings)

    $.ajax(settings).done(function (response) {
        var checkoutUrl = response.settings.checkoutUrl
        window.location.href = checkoutUrl;


    });

}

function teste01() {
    var settings = {
        "url": "https://cieloecommerce.cielo.com.br/api/public/v1/orders",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "Content-Type": "text/html",
            "Merchantid": "3207916d-cfdb-4ac5-9197-c7f76892b53c",
            "Cookie": "ARRAffinity=24b69ec43a385a35f00243c885d57b9207d8ca54474a7de7492216dc4f81280d"
        },
        "data": JSON.stringify({
            "OrderNumber": "Pedido01",
            "SoftDescriptor": "Exemplo",
            "Cart": {
                "Discount": {
                    "Type": "Percent",
                    "Value": 0
                },
                "Items": [
                    {
                        "Name": "Produto01",
                        "Description": "ProdutoExemplo01",
                        "UnitPrice": 100,
                        "Quantity": 1,
                        "Type": "Asset",
                        "Sku": "ABC001",
                        "Weight": 500
                    }
                ]
            },
            "Shipping": {
                "SourceZipCode": "20020080",
                "TargetZipCode": "21911130",
                "Type": "FixedAmount",
                "Services": [
                    {
                        "Name": "Motoboy",
                        "Price": 1,
                        "Deadline": 15,
                        "Carrier": null
                    },
                    {
                        "Name": "UPS Express",
                        "Price": 1,
                        "Deadline": 2,
                        "Carrier": null
                    }
                ],
                "Address": {
                    "Street": "Rua Cambui",
                    "Number": "92",
                    "Complement": "Apto 201",
                    "District": "Freguesia",
                    "City": "Rio de Janeiro",
                    "State": "RJ"
                }
            },
            "Payment": {
                "BoletoDiscount": 15,
                "DebitDiscount": 10,
                "Installments": null,
                "MaxNumberOfInstallments": null
            },
            "Customer": {
                "Identity": "84261300206",
                "FullName": "Test de Test",
                "Email": "test@cielo.com.br",
                "Phone": "21987654321"
            },
            "Settings": null
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}


function GerarLink() {


    var name = document.getElementById("name").value
    var preco = Preco(document.getElementById("Curso"))
    var precoInt = toString(preco)
    var parcel = Parcelas(document.getElementById("Parc"))
    var parcelint = parseInt(parcel);
    var email = document.getElementById("email").value
    var fone = document.getElementById("fone").value
    var brand = Tipo(document.getElementById("descricao"))
    var curso = MudaCurso(document.getElementById("Curso"))
    var cpf = document.getElementById("cpf").value
    debugger;
    var settings = {
        "url": "https://cieloecommerce.cielo.com.br/api/public/v2/token",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "Basic MzIwNzkxNmQtY2ZkYi00YWM1LTkxOTctYzdmNzY4OTJiNTNjOjhxYkMyZXN5dDhqUk1PbGlEbGZVeW05MWRQbSsydjhaUk9YNUEzcG9UbVk9",
            "Content-Type": "application/json",
            "Cookie": "ARRAffinity=24b69ec43a385a35f00243c885d57b9207d8ca54474a7de7492216dc4f81280d"

        },
        "data": JSON.stringify({
            "grant_type": "client_credentials"
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        var access_token = response.access_token


        var settings = {
            "url": "https://cieloecommerce.cielo.com.br/api/public/v1/products/",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json",
                "Cookie": "ARRAffinity=24b69ec43a385a35f00243c885d57b9207d8ca54474a7de7492216dc4f81280d"
            },
            "data": JSON.stringify({
                "Type": "Digital",
                "name": "name",
                "description": curso,
                "price": precoInt,
                "maxNumberOfInstallments": "1",
                "quantity": 2,
                "Sku": curso,
                "shipping": {
                    "type": "WithoutShipping"
                },
                "SoftDescriptor": "brand"
            }),
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });




    });


}


function GerarQRCode() {
    var settings = {
        "url": "https://apisandbox.cieloecommerce.cielo.com.br/1/sales/",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "MerchantId": "02f52406-67d1-4cd5-af5e-b0dab5c27e31",
            "MerchantKey": "GOMTIJTNRGSVWYJSDYEGKRZSWEZMLSUABRWVGXFI",
            "Cookie": "ARRAffinity=24b69ec43a385a35f00243c885d57b9207d8ca54474a7de7492216dc4f81280d"
        },
        "data": JSON.stringify({
            "MerchantOrderId": "2019010101",
            "Customer": {
                "Name": "QRCode Test"
            },
            "Payment": {
                "Type": "qrcode",
                "Amount": 100,
                "Installments": 1,
                "Capture": false
            }
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        var qrcode = response.Payment.QrCodeBase64Image
        console.log(qrcode)
        var qr = document.getElementById("qr")
        var qrcodeimg = new QRCode(document.getElementById("qrcode"), "iVBORw0KGgoAAAANSUhEUgAAASwAAAEsAQAAAABRBrPYAAAD7klEQVR4Xu2XUXLcQAhEuQH3vyU3ILxmpN2o/OGfpF2uVWRZmnmTAhqYcfR3rornyJfXB3tcH+xx/XSsIqKrsnKekdWZzbN63jRpxOaeayDNLqwnq3fehlVUjwfNe2ZgOEOQpTcvNuYOKMsXHpaRXeDFUFka32JnS3k3JjL0HahfR3ppv/M2bGyWyF9ef1XWc/J1/SNsm0nyNqk5v09dE1yCfFqNBdvQ4kYqLfVGac9S4DRiMjnGeGaCwmFtUzZKhiO9B0scyKB+d3LUPhFuOo8Ro6PofRaonDfIOwtpxJqQjsySm/GS9IDjwMV7sIljk5KEeUOM4uwjhDkv6S0YpcwgLGnIurE7yE+cuTy1YJRFULrcpUQEJM6TDbf0DkxCD7c1ogNKEmHGGXViKMxHwJxxakdLEhd9GNUxQlPWiI7h64ueir8NA+GwkjijkMLgE7OpRHVhxWY7o/kqZ75Zwjb3ajUOjN8YrGykYhhkDOnr7kgOjPiyuU4tTygZV4RxgWTI44IF4w2sWKDYKicpHpa8tZr/j8mHTUIAbR+6tQUrXX0YNvNEa54rveLcdB0nhsIqE/lCUIMdhDjrsmKylx+aDrMwpdLBESemlkxmquUhPRUedO2m41ixGUyOLKTmxplkhGG5E9PfO4gNK4e0WP2HHn2k92ArL5ZzK8yqnda/Ky09WO9fiaqRAagZ8Rz63rqlAxvrhW6lYPl2wp32YuhLPp7wSvpdghv6f3wYxuu00kfo9SUx/00FB0ZsgS7pNz/nLeg5eW9tDqxozzPEQBFktetix6tTTjZM5vN6xEb9pDWzRpE3YoG5AS6Dmb42OLnixJqx4qC+0iugrQRg/eWCB1NEmTo5qfdTQa+SsWC8669FUoBZMpIlrMEDJzYBLeyX5bIbXyT9uwsGTGZj/MFOhIv+Q1aecvZgvLObkZexEwqy9rzitw1rajk4401f5oBHLWuUUGtvs2Gj70wqBZuqThrMVdpMGjHmegd5spMoFXmyfdzZ68BCjTkPuQlZADMc2xR92CQjx3c0l9ynloPzwH10t2B8ojE9R5aj/lw4o9ZtxPhQV1E24ssixc/7icuAqT1zJGasUZxBwpy0HaWAC2sMbpVNKhHo0kRaK18l48D0wruOUuSj4kxmUtlyyIXRm6X2mQp6XxHn/bo8tWBEOPb8KaNLCYD1RdU4sWN0EGfuYhcmymM9Za3/xYVx4wGHFvJQ5aJTyn44MYTfSDYdOjiu4AJtUScCM8YUCdrEeaQfnme8t0EXRtUy1qpupOcopUZtxUSKOZWinCTCHGXukrFgKplWS17Fz62srFt6B/aN64M9rg/2uH4D9gcDljEcSJMwBAAAAABJRU5ErkJggg==");
        qr.innerHTML = qrcodeimg


    });
}






function gerarData() {

    var data = new Date();
    var dia = String(data.getDate() + 1)
    var mes = String(data.getMonth() + 1);
    var ano = data.getFullYear().toString();
    var x = mes + '/' + dia + '/' + ano;

    var hoje = x.toString();

    var day1 = new Date(hoje);
    var day2 = new Date("12/31/" + ano);

    var difference = (day2 - day1);
    var days = difference / (1000 * 3600 * 24)
    var valor = 1400 - mes
    console.log(valor)



}






function CheckOut10() {
    debugger;
    var cert = file
    $.ajax({
        url: "https://code.jquery.com/jquery-3.4.0.min.js", dataType: "script", cache: true
    });



    //var precoInt = parseInt(valor);
    var settings = {
        "method": "POST",
        "url": "https://cieloecommerce.cielo.com.br/api/public/v1/orders",
        "timeout": 0,
        "headers": {
            "Access-Control-Allow-Origin": "*",

            "Content-Type": "application/json",
            "Merchantid": "3207916d-cfdb-4ac5-9197-c7f76892b53c",
            "Authorization": "Basic MzIwNzkxNmQtY2ZkYi00YWM1LTkxOTctYzdmNzY4OTJiNTNjOjhxYkMyZXN5dDhqUk1PbGlEbGZVeW05MWRQbSsydjhaUk9YNUEzcG9UbVk9"

        },
        "data": JSON.stringify({
            "OrderNumber": "Pedido01",// é im identificador do pedido se não é obigatorio, se mandar ele a cieli gera um nomero aleatorio 
            "SoftDescriptor": "curso",
            "Cart": {

                "Items": [
                    {
                        "Name": "curso", // nome do curso
                        "Description": "Associação PF", //Descrição pode ser o tipo de associação 
                        "UnitPrice": 155000, // Preço no curso
                        "Quantity": 1, // Quantidades de produtos
                        "Type": "Asset"
                    }
                ]
            },
            "Shipping": {
                "Type": "WithoutShipping", // sem frete
            },
            "Customer": {
                "Identity": "15225726848", // Documentos e dados do comprador não é obrigatorio
                "FullName": "Joseclaudio Tavares",
                "Email": "joseclaudio@gmail.com",
                "Phone": "41993392238"

            },

            "Settings": null

        })
    };
    console.log(settings)
    try {
        $.ajax(settings).done(function (response) {
            var checkoutUrl = response.settings.checkoutUrl
            window.location.href = checkoutUrl;// redireciona para o checkout

        });
    } catch (e) {
        console.log(e);
    }
}




services.AddCors(options => {
    options.AddDefaultPolicy(
        builder => {
            builder
                .WithOrigins("https://acessocidadao.es.gov.br")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
});







/*
var serverUrl = "https://cieloecommerce.cielo.com.br/api/public/v1/orders"
var xhr = new XMLHttpRequest();
xhr.open("POST", serverUrl);



xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.setRequestHeader("Access-Control-Allow-Origin","*");
xhr.setRequestHeader("OData-MaxVersion", "4.0");
xhr.setRequestHeader("OData-Version", "4.0");
xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
xhr.setRequestHeader("Prefer", "odata.include-annotations=\"*\"");
xhr.setRequestHeader("Merchantid","Basic MzIwNzkxNmQtY2ZkYi00YWM1LTkxOTctYzdmNzY4OTJiNTNjOjhxYkMyZXN5dDhqUk1PbGlEbGZVeW05MWRQbSsydjhaUk9YNUEzcG9UbVk9")
 


xhr.onreadystatechange = function () {
if (xhr.readyState === 4) {
console.log(xhr.status);
console.log(xhr.responseText);
}};



 
xhr.send(settings);
 
 
xhr.onreadystatechange = function () {
if (this.readyState === 4) {
xhr.onreadystatechange = null;
if (this.status === 200) {
returnObject = JSON.parse(this.response);
} else {
console.error("RetrieveMultiple error: " + this.statusText);
}
}
};
xhr.send();
 
 
 
 
 
 
}
catch(e){
Console.log(e)
 
}
alert("function CheckOut final");
};





$.ajax({
type: "POST",
url: "Carrinho.aspx/getCondicoes",
data: JSON.stringify(data),
contentType: "application/json; charset=utf-8",
success: function (response) {
if (response.d.Result.length > 0) {
 
 
 
$(response.d.Result).each(function (index, elem) {
document.getElementById(elem.Nome).value = parseInt(elem.Codigo);
});
}
}
});
*/



function teste02() {
    var settings = {
        "url": "https://b1.ativy.com:50301/b1s/v1/Login",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "Cookie": "B1SESSION=d72b1920-2d62-11ec-8000-005056b5c66e; CompanyDB=SBO_IBEF_TESTE; ROUTEID=.node4"
        },
        "data": JSON.stringify({
            "CompanyDB": "SBO_IBEF_TESTE",
            "Password": "mm@123",
            "UserName": "Int4Results"
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

}
CheckOut10()





const axios = require('axios')
const express = require("express")
const clientId = '3207916d-cfdb-4ac5-9197-c7f76892b53c'
const clientSecret = '8qbC2esyt8jRMOliDlfUym91dPm+2v8ZROX5A3poTmY='
const url = 'https://cieloecommerce.cielo.com.br/api/public/v2/token'
const credentials = Buffer.from(
    `${clientId} : ${clientSecret}`
).toString('base64')

var data = new Date();
var dia = String(data.getDate() + 1).padStart(2, '0');
var mes = String(data.getMonth() + 1).padStart(2, '0');
var ano = data.getFullYear();
x = ano + '-' + mes + '-' + dia;
dataAtual = x.toString()
console.log(dataAtual);



function GerarToken() {
    //if(document.getElementById('FormaPag').value == 'cred'){
    axios({
        method: 'POST',
        url: 'https://cieloecommerce.cielo.com.br/api/public/v2/token',
        headers: {
            Authorization: 'Basic MzIwNzkxNmQtY2ZkYi00YWM1LTkxOTctYzdmNzY4OTJiNTNjOjhxYkMyZXN5dDhqUk1PbGlEbGZVeW05MWRQbSsydjhaUk9YNUEzcG9UbVk9',
            'Content-Type': 'application/json'
        },
        data: {
            grant_type: 'client_credentials'
        }
    }).then((response) => {
        const accessToken = response.data?.access_token;
        console.log(accessToken);
        const endpoint = 'https://cieloecommerce.cielo.com.br/api/public/v1/products/';

        const config = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content_type': 'appication/json'
            }
        }

        const dadoCob = {
            Type: 'Digital',
            name: 'Curso de Datilografia',
            description: 'teste descricao',
            price: '1',
            weight: 200,
            ExpirationDate: dataAtual,
            maxNumberOfInstallments: '1',
            quantity: 1,
            Sku: 'teste',
            SoftDescriptor: 'Pedido1234',
            Shipping: {
                name: 'Curso de Datilografia',
                price: '0',
                type: 'WithoutShipping'
            }
        }


        axios.post(endpoint, dadoCob, config).then((response) => {
            const linkPag = response.data?.shortUrl;
            const linkId = response.data?.id;


        })


    });

    //}
}




$(editbtn).click(function () {
    GerarPagamentoCred();
});

function GerarPagamentoCred() {

    var msg = window.confirm("Comfirmar a compra?\n" +
        "O valor sera descontado da sua conta bancaria.");
    if (msg == false) {
        alert("Transação não autozada pelo usuario.\n" +
            "Associação não pode ser concluida.");
        return;

    }



    var a = $("#ibef_mesvencimento").val();
    var b;
    switch (a) {
        case "601940000": b = "01";
            break;
        case "601940001": b = "02";
            break;
        case "601940002": b = "03";
            break;
        case "601940003": b = "04";
            break;
        case "601940004": b = "05";
            break;
        case "601940005": b = "06";
            break;
        case "601940006": b = "07";
            break;
        case "601940007": b = "08";
            break;
        case "601940008": b = "09";
            break;
        case "601940009": b = "10";
            break;
        case "601940010": b = "11";
            break;
        case "601940011": b = "12";
            break;
    }
    debugger;
    var band;
    var bandeira = $("#ibef_bandeiradocartao").val();
    switch (bandeira) {
        case "1": band = "Visa";
            break;
        case "2": band = "Master Card";
            break;
        case "3": band = "American Express";
            break;
        case "4": band = "Elo";
            break;
        //case  "5": band = "Diners Club";
        //break;
        case "6": band = "JCB";
            break;
        case "7": band = "Aura";
            break;
        case "8": band = "Hipercard";
            break;
    }

    var cardNum = $("#ibef_numerocartaodecredito").val();
    var nome = $("#ibef_nometitular").val();
    var ano = $("#ibef_anovencimento").val();
    var cvv = $("#ibef_cvv").val();
    var tipo = $("#ibef_formasdepagamento").val();
    var formaPag = TypePag(tipo);
    var dataVenc = b + "/" + ano;
    var a = $("#ibef_valorsemdesconto").val();
    var pre = parseInt(a);
    var preco = pre * 100;
    var x = $("#ibef_numerodeparcelas").val();
    var parc = parseInt(x);

    var settings = {
        "url": "https://prod-13.brazilsouth.logic.azure.com:443/workflows/1fe0417b52bb415282855824f5692344/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HWJrEBx1Um9jy_0jncR7_b5CmfiuR1XAbd3JR5KpTOU",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "Payment": {
                "Type": formaPag,
                "Amount": preco,
                "Installments": parc,
                "SoftDescriptor": nome,
                "CreditCard": {
                    "CardNumber": cardNum,
                    "Holder": nome,
                    "ExpirationDate": dataVenc,
                    "SecurityCode": cvv,
                    "Brand": band
                }
            }
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);

        var status = response.Payment.Status
        var statusmensage = response.Payment.ReturnMessage
        var linkConsulta = response.Payment.Links[0].Href
        console.log(linkConsulta)
        console.log("Status: ", status, " mensagem: ", statusmensage)
        debugger;


        if (status == "1") {
            window.alert(statusmensage + "\n" + "Compra finalizada, clique em associar!")
            $(editbtn).hide();
            $("#InsertButton").show();
            $("#ibef_numerocartaodecredito").closest("tr").hide();
            $("#ibef_nometitular").closest("tr").hide();
            $("#ibef_mesvencimento").closest("tr").hide();
            $("#ibef_anovencimento").closest("tr").hide();
            $("#ibef_cvv").closest("tr").hide();
            $("#ibef_bandeiradocartao").closest("tr").hide();
            //window.location.href = "https://portalibef.powerappsportals.com/"
            // Se o pagamento estiver ok vai ser redirecionado para o portal
        }
        else if (status == "3") {
            window.alert(statusmensage + "\n" +
                "Verifique o cartão.")
        }

        else if (status == "0") {
            window.alert(statusmensage + "\n" +
                "Tente novamente, se persistir o erro, \nEntre em contato com a IBEF.")
        }
        else {
            throw console.error(erro);
        }
    });

}


function TypePag(a) {
    var brand;
    if (a == "1")
        brand = "DebitCard"

    else if (a == "2")
        brand = "CreditCard"

    else if (a == "3")
        brand = "Boleto"

    else if (a == "4")
        brand = "Pix"

    return brand
}





function GerarPagamentDebt() {

    $("#ibef_cvv").closest("tr").hide();

    var a = $("#ibef_mesvencimento").val();
    var b;
    switch (a) {
        case "601940000": b = "01";
            break;
        case "601940001": b = "02";
            break;
        case "601940002": b = "03";
            break;
        case "601940003": b = "04";
            break;
        case "601940004": b = "05";
            break;
        case "601940005": b = "06";
            break;
        case "601940006": b = "07";
            break;
        case "601940007": b = "08";
            break;
        case "601940008": b = "09";
            break;
        case "601940009": b = "10";
            break;
        case "601940010": b = "11";
            break;
        case "601940011": b = "12";
            break;
    }
    debugger;


    var cardNum = $("#ibef_numerocartaodecredito").val();
    var nome = $("#ibef_nometitular").val();
    var ano = $("#ibef_anovencimento").val();
    var cvv = $("#ibef_cvv").val();
    var tipo = $("#ibef_formasdepagamento").val();
    var formaPag = TypePag(tipo);
    var dataVenc = b + "/" + ano;
    var a = $("#ibef_valorsemdesconto").val
    var preco = parseInt(a);

    var settings = {
        "url": "https://prod-13.brazilsouth.logic.azure.com:443/workflows/1fe0417b52bb415282855824f5692344/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HWJrEBx1Um9jy_0jncR7_b5CmfiuR1XAbd3JR5KpTOU",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "Payment": {
                "Type": formaPag,
                "Authenticate": true,
                "Amount": preco,
                "Installments": 1,
                "SoftDescriptor": nome,
                "DebitCard": {
                    "CardNumber": cardNum,
                    "Holder": nome,
                    "ExpirationDate": dataVenc,
                    "SecurityCode": cvv,
                    "Brand": "Visa"
                }
            }
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });

}


function GerarBoleto() {
    debugger;
    var nome = $("#ibef_nometitular").val();
    var rua = $("value", "{{user.address1_line1}}").val();
    var num = $("{{user.address1_line1}}").val();
    var cep = $("{{user.address1_postalcode}}").val();
    var cidade = $("{{user.address1_city}}").val();
    var estado = $("{{user.address1_stateorprovince}}").val();
    var pais = $("{{user.address1_country}}").val();
    var cpf = $("{{user.address1_city}}").val();


    debugger;
    var settings = {
        "url": "https://prod-18.brazilsouth.logic.azure.com:443/workflows/34cc7289496e4f3aafd1b7e6560ba6a2/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Q3hqb2qtLaZTgLhtpaD3dqbFou4nB53rKwI7W4h4Cfg",
        "method": "POST",
        "timeout": 0,

        "data": JSON.stringify({
            "Customer": {
                "Name": "nome",
                "Identity": "cpf",
                "Address": {
                    "Street": "rua",
                    "Number": "165",
                    "Complement": "num",
                    "ZipCode": "cep",
                    "District": "Centro",
                    "City": "cidade",
                    "State": "estado",
                    "Country": "pais"
                }
            },
            "Payment": {
                "Amount": 15700,
                "Address": rua,
                "ExpirationDate": "2021-12-31"
            }
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        var link = response.settings.checkoutUrl;
        window.location.href = link;
    });

}


//#region  Inscrição certificados
function getDados(data) {
    console.log(data);
    var valorTrans = data[0].valor;
    valorTrans = valorTrans.slice(0, -2);
    $("#ibef_valorcomdesconto").val(valorTrans);

}

$(document).ready(function () {

    debugger;

    $(editbtn2).closest("tr").hide();
    $(editbtn).closest("tr").show();

    $("#InsertButton").hide();
    $('#ibef_statuspagamento').closest("tr").hide();
    //$('#casetypecode option[value="1"]').remove();
    $("#ibef_numerocartaodecredito").closest("tr").hide();
    $("#ibef_nometitular").closest("tr").hide();
    $("#ibef_mesvencimento").closest("tr").hide();
    $("#ibef_anovencimento").closest("tr").hide();
    $("#ibef_cvv").closest("tr").hide();
    $("#ibef_bandeiradocartao").closest("tr").hide();
    $("#ibef_cod_metodo_pagamento").closest("tr").hide();

    if ('{{user.ibef_situacao.value}}' == 1) {
        var list = 'CEC88C72-1701-EC11-94F0-00224836FFB5';
    }
    else {
        var list = '6D89E203-CA14-EC11-B6E7-000D3A885738';
    }

    var prod = ('{{request.params.id}}');

    $.get('/obterprecoprod?product=' + prod + '&pricelist=' + list, getDados, 'json');

    $("#ibef_tipodeinscricao").val(3);
    $("#ibef_tipodeinscricao").attr("style", "visibility: hidden");
    $("#parentcontactid_name").attr("value", "{{user.fullname}}");
    $("#parentcontactid").attr("value", "{{user.id}}");
    $("#parentcontactid_entityname").attr("value", "contact");
    $("#parentcontactid").siblings("div.input-group-btn").find("button").prop("disabled", true);

    $("#InsertButton").click(function () {

        $("#parentcontactid").attr("readonly", false);

    });

    $("#ibef_formasdepagamento").change(function () {
        var vforma = $('#ibef_formasdepagamento').val();
        if (vforma == 3) {
            $("#ibef_numerocartaodecredito").closest("tr").hide();
            $("#ibef_nometitular").closest("tr").hide();
            $("#ibef_mesvencimento").closest("tr").hide();
            $("#ibef_anovencimento").closest("tr").hide();
            $("#ibef_cvv").closest("tr").hide();
            $("#ibef_bandeiradocartao").closest("tr").hide();
            $(editbtn2).show();
            $(editbtn).hide();
        }
        if (vforma == 1) {
            $("#ibef_numerocartaodecredito").closest("tr").show();
            $("#ibef_nometitular").closest("tr").show().attr('required', true);
            $("#ibef_mesvencimento").closest("tr").show();
            $("#ibef_anovencimento").closest("tr").show();
            $("#ibef_cvv").closest("tr").show();
            $("#ibef_bandeiradocartao").closest("tr").show();
            $("#ibef_numerodeparcelas").val(1);
            $("#ibef_numerodeparcelas").siblings("div.input-group-btn").find("button").prop("disabled", true);
            $(editbtn2).hide();
            $(editbtn).show();

        }
        if (vforma == 2) {
            $("#ibef_numerocartaodecredito").closest("tr").show();
            $("#ibef_nometitular").closest("tr").show().attr('required', true);
            $("#ibef_mesvencimento").closest("tr").show();
            $("#ibef_anovencimento").closest("tr").show();
            $("#ibef_cvv").closest("tr").show();
            $("#ibef_bandeiradocartao").closest("tr").show();
            $(editbtn2).hide();
            $(editbtn).show();
        }
        if ($('#pricelevelid_name').val() == "Associação Anual (a vista)") {
            $("#ibef_numerodeparcelas").val(1);
            $("#ibef_numerodeparcelas").siblings("div.input-group-btn").find("button").prop("disabled", true);
        }

    });
    var val1 = $("#ibef_valorcomdesconto").val();
    var val2 = $("#ibef_valorsemdesconto").val();




    var editbtn = $('<input/>').attr({ type: 'button', name: 'Edit', value: 'Efetuar Pagamento', id: 'editBtn', class: 'submit-btn btn btn-primary' });
    $("#InsertButton").after(editbtn).hide();

    $(editbtn).click(function () {

        GerarPagamentoCred();
    });

    /*var editbtn2 = $('<input/>').attr({type: 'button', name:'Edit', value:'Gerar Boleto', id:'editBtn2', class:'submit-btn btn btn-primary' });
    $("#InsertButton").after(editbtn2).hide();

    
    var editbtn3 = $('<input/>').attr({type: 'radio', name:'test', value:'feijao', id:'editBtn3', label:'Feijao'});
    $("#InsertButton").after(editbtn3).show();

    var editbtn4 = $('<input/>').attr({type: 'radio', name:'test', value:'arroz', id:'editBtn4'});
    $("#InsertButton").after(editbtn4).show();
    

    $(editbtn2).click(function(){
        
    GerarBoleto();
    });*/



    async function GerarPagamentoCred() {

        var a = $("#ibef_mesvencimento").val();
        var b;
        switch (a) {
            case "601940000": b = "01";
                break;
            case "601940001": b = "02";
                break;
            case "601940002": b = "03";
                break;
            case "601940003": b = "04";
                break;
            case "601940004": b = "05";
                break;
            case "601940005": b = "06";
                break;
            case "601940006": b = "07";
                break;
            case "601940007": b = "08";
                break;
            case "601940008": b = "09";
                break;
            case "601940009": b = "10";
                break;
            case "601940010": b = "11";
                break;
            case "601940011": b = "12";
                break;
        }
        debugger;
        var band;
        var bandeira = $("#ibef_bandeiradocartao").val();
        switch (bandeira) {
            case "1": band = "Visa";
                break;
            case "2": band = "Master";
                break;
            case "3": band = "Amex";
                break;
            case "4": band = "Elo";
                break;
            //case  "5": band = "Diners Club";
            //break;
            case "6": band = "JCB";
                break;
            case "7": band = "Aura";
                break;
            case "8": band = "Hipercard";
                break;
        }

        var cardNum = $("#ibef_numerocartaodecredito").val();
        var nome = $("#ibef_nometitular").val();
        var ano = $("#ibef_anovencimento").val();
        var cvv = $("#ibef_cvv").val();
        var tipo = $("#ibef_formasdepagamento").val();
        var formaPag = TypePag(tipo);
        var dataVenc = b + "/" + ano;
        var a = $("#ibef_valorcomdesconto").val();
        var pre = parseInt(a);
        var preco = pre * 100;
        var x = $("#ibef_numerodeparcelas").val();
        var parc = parseInt(x);
        debugger;

        if (cardNum == "" || nome == "" || b == undefined || ano == "" || cvv == "" || pre == NaN) {
            alert("Preencha todos os campos!!");
            return;
        }


        var msg = window.confirm("Comfirmar a compra?\n" +
            "O valor será descontado da sua conta bancária.");
        if (msg == false) {
            alert("Transação não autorizada pelo usuário.\n" +
                "Inscrição não pode ser concluida.");
            return;

        }



        var vforma = $('#ibef_formasdepagamento').val();
        var url;
        if (vforma == 2) {
            url = "https://prod-13.brazilsouth.logic.azure.com:443/workflows/1fe0417b52bb415282855824f5692344/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HWJrEBx1Um9jy_0jncR7_b5CmfiuR1XAbd3JR5KpTOU";
        }
        if (vforma == 1) {
            url = "https://prod-04.brazilsouth.logic.azure.com:443/workflows/0faf04c4f3a4404094ac780ab132d3f4/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=YOPVjCBGjc12iXwPsV1ox-T5wSkWlN5mE_1GQMwd4I0";
        }




        var settings = {
            "url": url,
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "Payment": {
                    "Type": formaPag,
                    "Amount": preco,
                    "Installments": parc,
                    "SoftDescriptor": nome,
                    "CreditCard": {
                        "CardNumber": cardNum,
                        "Holder": nome,
                        "ExpirationDate": dataVenc,
                        "SecurityCode": cvv,
                        "Brand": band
                    }
                }
            }),
        };
        try {

            await $.ajax(settings).done(function (response) {
                console.log(response);
                var statuscode = response.statuscode;
                if (statuscode >= 200 && statuscode < 299) {
                    if (vforma == 2) {
                        var status = response.Payment.Status
                        var statusmensage = response.Payment.ReturnMessage
                        var linkConsulta = response.Payment.Links[0].Href
                        var PaymentId = response.Payment.PaymentId;
                        console.log(linkConsulta)
                        console.log("Status: ", status, " mensagem: ", statusmensage)
                        debugger;


                        if (status == "1" || status == "2") {
                            window.alert(statusmensage + "\n" + "Compra finalizada, clique em Concluir inscrição!")
                            $(editbtn).hide();
                            $("#InsertButton").show();
                            $("#ibef_numerocartaodecredito").closest("tr").hide();
                            $("#ibef_nometitular").closest("tr").hide();
                            $("#ibef_mesvencimento").closest("tr").hide();
                            $("#ibef_anovencimento").closest("tr").hide();
                            $("#ibef_cvv").closest("tr").hide();
                            $("#ibef_bandeiradocartao").closest("tr").hide();
                            //window.location.href = "https://portalibef.powerappsportals.com/"
                            // Se o pagamento estiver ok vai ser redirecionado para o portal
                            $(`#ibef_statuspagamento option[value='${1}']`).prop('selected', true);

                        }
                        else if (status == "3") {
                            window.alert(statusmensage + "\n" +
                                "Verifique o cartão.")
                        }

                        else if (status == "0") {
                            window.alert(statusmensage + "\n" +
                                "Tente novamente, se persistir o erro, \nEntre em contato com a IBEF.")
                        }
                        else if (status == "10") {
                            window.alert("Pagamento cancelado.")
                        }
                        else if (status == "12") {
                            window.alert("Aguardando Status de instituição financeira.")
                        }
                        else if (status == "13") {
                            window.alert("Pagamento cancelado por falha no processamento ou por ação do AF.")
                        }
                        else if (status == "20") {
                            window.alert("Recorrência agendada")
                        }
                        else {
                            throw console.error(erro);
                        }
                    }

                    if (vforma == 1) {
                        var status = response.Payment.Status
                        var linkConsulta = response.Payment.Links[0].Href
                        var PaymentId = response.Payment.PaymentId;
                        console.log(linkConsulta)
                        console.log("Status: ", status)
                        debugger;


                        if (status == "1" || status == "2") {
                            window.alert("Compra finalizada, clique em Concluir inscrição!")
                            $(editbtn).hide();
                            $("#InsertButton").show();
                            $("#ibef_numerocartaodecredito").closest("tr").hide();
                            $("#ibef_nometitular").closest("tr").hide();
                            $("#ibef_mesvencimento").closest("tr").hide();
                            $("#ibef_anovencimento").closest("tr").hide();
                            $("#ibef_cvv").closest("tr").hide();
                            $("#ibef_bandeiradocartao").closest("tr").hide();
                            //window.location.href = "https://portalibef.powerappsportals.com/"
                            // Se o pagamento estiver ok vai ser redirecionado para o portal
                            $(`#ibef_statuspagamento option[value='${1}']`).prop('selected', true);

                        }

                        else if (status == "3") {
                            window.alert("Verifique o cartão.")
                        }
                        else if (status == "0") {
                            window.alert("Aguardando atualização de status.\n" +
                                "Assim que a compra for confirmada, seu acesso sera liberado.")
                            $(editbtn).hide();
                            $("#InsertButton").show();
                            $("#ibef_numerocartaodecredito").closest("tr").hide();
                            $("#ibef_nometitular").closest("tr").hide();
                            $("#ibef_mesvencimento").closest("tr").hide();
                            $("#ibef_anovencimento").closest("tr").hide();
                            $("#ibef_cvv").closest("tr").hide();
                            $("#ibef_bandeiradocartao").closest("tr").hide();
                            //window.location.href = "https://portalibef.powerappsportals.com/"
                            // Se o pagamento estiver ok vai ser redirecionado para o portal
                        }
                        else if (status == "10") {
                            window.alert("Pagamento cancelado.")
                        }
                        else if (status == "12") {
                            window.alert("Aguardando Status de instituição financeira.")
                        }
                        else if (status == "13") {
                            window.alert("Pagamento cancelado por falha no processamento ou por ação do AF.")
                        }
                        else if (status == "20") {
                            window.alert("Recorrência agendada")
                        }
                        else {
                            throw console.error(erro);
                        }


                    }
                }
                else if (statuscode >= 400 && statuscode < 499) {
                    var code = response.Code;
                    var mensg = response.Message;
                    window.alert("Falha na conclusão do pagamento \n" +
                        "Verifique se as informações digitadas estão corretas \n" +
                        "Motivo: " + mensg);
                    return;

                }
                else if (statuscode >= 500 && statuscode < 599) {
                    var code = response.Code;
                    var mensg = response.Message;
                    window.alert("Tivemos um problema com a realização do pagamento \n" +
                        "Desculpe!! Se o problema persitir entre em contato conosco \n" +
                        "Motivo: " + mensg);
                    return;

                }
            });
        }
        catch (e) {
            alert(e);
        }
        debugger;
        CriaTitulo();

    }


    function TypePag(a) {
        var brand;
        if (a == "1")
            brand = "DebitCard"

        else if (a == "2")
            brand = "CreditCard"

        else if (a == "3")
            brand = "Boleto"

        else if (a == "4")
            brand = "Pix"

        return brand
    }


    function CriaTitulo() {
        var tipo = $("#ibef_formasdepagamento").val();
        var Parc = $("#ibef_numerodeparcelas").val();
        var bandeira = $("#ibef_bandeiradocartao").val();

        if (tipo == "1" && Parc == 1 && bandeira == "1") {
            $("#ibef_cod_metodo_pagamento").val(81);
        }
        if (tipo == "2" && Parc == 1 && bandeira == "1") {
            $("#ibef_cod_metodo_pagamento").val(82);
        }
        if (tipo == "2" && Parc > 1 && Parc <= 6 && bandeira == "1") {
            $("#ibef_cod_metodo_pagamento").val(83);
        }
        if (tipo == "2" && Parc > 6 && Parc <= 12 && bandeira == "1") {
            $("#ibef_cod_metodo_pagamento").val(84);
        }
        if (tipo == "1" && Parc == 1 && bandeira == "2") {
            $("#ibef_cod_metodo_pagamento").val(85);
        }
        if (tipo == "2" && Parc == 1 && bandeira == "2") {
            $("#ibef_cod_metodo_pagamento").val(86);
        }
        if (tipo == "2" && Parc > 2 && Parc <= 6 && bandeira == "2") {
            $("#ibef_cod_metodo_pagamento").val(87);
        }
        if (tipo == "2" && Parc > 6 && Parc <= 12 && bandeira == "2") {
            $("#ibef_cod_metodo_pagamento").val(88);
        }
        if (tipo == "2" && Parc == 1 && bandeira == "3") {
            $("#ibef_cod_metodo_pagamento").val(89);
        }
        if (tipo == "2" && Parc > 1 && Parc <= 6 && bandeira == "3") {
            $("#ibef_cod_metodo_pagamento").val(90);
        }
        if (tipo == "2" && Parc > 6 && Parc <= 12 && bandeira == "3") {
            $("#ibef_cod_metodo_pagamento").val(91);
        }
        if (tipo == "1" && Parc == 1 && bandeira == "4") {
            $("#ibef_cod_metodo_pagamento").val(92);
        }
        if (tipo == "2" && Parc == 1 && bandeira == "4") {
            $("#ibef_cod_metodo_pagamento").val(93);
        }
        if (tipo == "2" && Parc > 1 && Parc <= 6 && bandeira == "4") {
            $("#ibef_cod_metodo_pagamento").val(94);
        }
        if (tipo == "2" && Parc > 6 && Parc <= 12 && bandeira == "4") {
            $("#ibef_cod_metodo_pagamento").val(95);
        }
        if (tipo == "2" && Parc == 1 && bandeira == "5") {
            $("#ibef_cod_metodo_pagamento").val(96);
        }
        if (tipo == "2" && Parc > 1 && Parc <= 6 && bandeira == "5") {
            $("#ibef_cod_metodo_pagamento").val(97);
        }
        if (tipo == "2" && Parc > 6 && Parc <= 12 && bandeira == "5") {
            $("#ibef_cod_metodo_pagamento").val(98);
        }
        if (tipo == "2" && Parc == 1 && bandeira == "6") {
            $("#ibef_cod_metodo_pagamento").val(102);
        }
        if (tipo == "2" && Parc > 1 && Parc <= 12 && bandeira == "6") {
            $("#ibef_cod_metodo_pagamento").val(103);
        }
        if (tipo == "2" && Parc == 1 && bandeira == "9") {
            $("#ibef_cod_metodo_pagamento").val(99);
        }
        if (tipo == "2" && Parc > 1 && Parc <= 6 && bandeira == "9") {
            $("#ibef_cod_metodo_pagamento").val(100);
        }
        if (tipo == "2" && Parc > 6 && Parc <= 12 && bandeira == "9") {
            $("#ibef_cod_metodo_pagamento").val(101);
        }




    }



});

//#endregion



function Data(executionContext) {

    debugger;
    var formContext = executionContext.getFormContext();
    var tempo = formContext.getAttribute('ibef_tempodeassociacaoemoutroibef').getValue();
    if (tempo == null || tempo == "") {
        tempo = 0;
    }

    var tempouutroibef = parseFloat(tempo);
    var datadeassociacao = formContext.getAttribute('ibef_dataassociacao').getValue();
    if (datadeassociacao == null || datadeassociacao == "") {
        datadeassociacao = new Date();
    }

    var data = new Date();

    var diff = Math.floor(data.getTime() - datadeassociacao.getTime());
    var day = 1000 * 60 * 60 * 24;


    var dayss = Math.floor(diff / day);
    var months = Math.floor(dayss / 31) + 1;
    var years = Math.floor(months / 12);




    var z = months + tempouutroibef;
    var tempoibefReal = z.toString();


    formContext.getAttribute('ibef_mesesdeassociacaototal').setValue(tempoibefReal);

}


function DesablitaCampo(executionContext) {
    debugger;
    var formContext = executionContext.getFormContext();

    var statuscode1 = formContext.getAttribute('statusreason').getValue();

    var statuscode2 = formContext.getAttribute('statusreason_id').getValue();

    var statuscode3 = formContext.getAttribute('results_razaostatus').getValue();

    var statuscode = formContext.getAttribute('statuscode').getValue();



    alert(statuscode)



}

function TestFormat() {

    {
        "statusCode": 200,
            "headers": {
            "Vary": "Accept-Encoding", "x-ms-service-request-id": "6d2bdeb6-5346-4ed7-937b-8e70847993d9,5b4ab0e3-ced8-4253-a0c5-3882257a1872", "Cache-Control": "no-cache", "Set-Cookie": "ARRAffinity=8a04dde4c50d4a2adede4c65ab8d4092a9054412eed46cfb6df60cfa05ebea16; domain=ibef.crm2.dynamics.com; path=/; secure; HttpOnly,ReqClientId=77802eac-5318-4264-b22a-d82b18dcaa33; expires=Tue, 01-Dec-2071 12:51:32 GMT; path=/; secure; HttpOnly,ARRAffinity=8a04dde4c50d4a2adede4c65ab8d4092a9054412eed46cfb6df60cfa05ebea16; domain=ibef.crm2.dynamics.com; path=/; secure; HttpOnly", "Strict-Transport-Security": "max-age=31536000; includeSubDomains", "REQ_ID": "5b4ab0e3-ced8-4253-a0c5-3882257a1872", "AuthActivityId": "07a1a976-7d0a-4e51-bea3-414020f1216a", "x-ms-dop-hint": "8", "x-ms-ratelimit-time-remaining-xrm-requests": "1,200.00", "x-ms-ratelimit-burst-remaining-xrm-requests": "5999", "OData-Version": "4.0", "Preference-Applied": "odata.include-annotations=\"*\"", "X-Source": "21911514918519513196231114157112781282231821159424947249245681525810801089418421649164,11974108126130171119438451121538230239661840108113188158279581168251361326122254", "Public": "OPTIONS,GET,HEAD,POST", "Timing-Allow-Origin": "*", "Date": "Wed, 01 Dec 2021 12:51:31 GMT", "Allow": "OPTIONS,GET,HEAD,POST", "Content-Type": "application/json; odata.metadata=full", "Expires": "-1", "Content-Length": "5826"
        },
        "body": {
            "@odata.context": "https://ibef.crm2.dynamics.com/api/data/v9.1/$metadata#productpricelevels(_productid_value,productid,_transactioncurrencyid_value,transactioncurrencyid,productpricelevelid,_uomid_value,uomid,amount,pricingmethodcode,productid(),transactioncurrencyid(),uomid())",
                "#Microsoft.Dynamics.CRM.DeleteMultiple": {
                "title": "DeleteMultiple",
                    "target": "https://ibef.crm2.dynamics.com/api/data/v9.1/productpricelevels/Microsoft.Dynamics.CRM.crmbaseentity/Microsoft.Dynamics.CRM.DeleteMultiple"
            },
            "@Microsoft.Dynamics.CRM.totalrecordcount": -1,
                "@Microsoft.Dynamics.CRM.totalrecordcountlimitexceeded": false,
                    "value": [{
                        "@odata.type": "#Microsoft.Dynamics.CRM.productpricelevel",
                        "@odata.id": "https://ibef.crm2.dynamics.com/api/data/v9.1/productpricelevels(a78ed3d5- 5b01-ec11-94f0-00224836ffb5)",
                        "@odata.etag": "W/\"8770413\"",
                        "@odata.editLink": "productpricelevels(a78ed3d5-5b01-ec11-94f0-00224836ffb5)",
                        "_productid_value@OData.Community.Display.V1.FormattedValue": "Associação IBEF Jovem até 25 anos",
                        "_productid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "productid",
                        "_productid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "product",
                        "_productid_value@odata.type": "#Guid",
                        "_productid_value": "128fb330-5401-ec11-94f0-0022483659d7",
                        "_transactioncurrencyid_value@OData.Community.Display.V1.FormattedValue": "Brazilian Real",
                        "_transactioncurrencyid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "transactioncurrencyid",
                        "_transactioncurrencyid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "transactioncurrency",
                        "_transactioncurrencyid_value@odata.type": "#Guid",
                        "_transactioncurrencyid_value": "6cb83264-70ac-eb11-8236-00224836f622",
                        "productpricelevelid@odata.type": "#Guid",
                        "productpricelevelid": "a78ed3d5-5b01-ec11-94f0-00224836ffb5",
                        "_uomid_value@OData.Community.Display.V1.FormattedValue": "Unidade Principal",
                        "_uomid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "uomid",
                        "_uomid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "uom",
                        "_uomid_value@odata.type": "#Guid",
                        "_uomid_value": "1139968a-36bf-4079-b459-20e34a1d776e",
                        "amount@OData.Community.Display.V1.FormattedValue": "R$ 220,00",
                        "amount@odata.type": "#Decimal", 
                        "amount": 220.0,
                        "pricingmethodcode@OData.Community.Display.V1.FormattedValue": "Valor da Moeda",
                        "pricingmethodcode": 1,
                        "productid@odata.associationLink": "https://ibef.crm2.dynamics.com/api/data/v9.1/productpricelevels(a78ed3d5-5b01-ec11-94f0-00224836ffb5)/productid/$ref", "productid@odata.navigationLink": "https://ibef.crm2.dynamics.com/api/data/v9.1/productpricelevels(a78ed3d5-5b01-ec11-94f0-00224836ffb5)/productid", "transactioncurrencyid@odata.associationLink": "https://ibef.crm2.dynamics.com/api/data/v9.1/productpricelevels(a78ed3d5-5b01-ec11-94f0-00224836ffb5)/transactioncurrencyid/$ref", "transactioncurrencyid@odata.navigationLink": "https://ibef.crm2.dynamics.com/api/data/v9.1/productpricelevels(a78ed3d5-5b01-ec11-94f0-00224836ffb5)/transactioncurrencyid", "uomid@odata.associationLink": "https://ibef.crm2.dynamics.com/api/data/v9.1/productpricelevels(a78ed3d5-5b01-ec11-94f0-00224836ffb5)/uomid/$ref", "uomid@odata.navigationLink": "https://ibef.crm2.dynamics.com/api/data/v9.1/productpricelevels(a78ed3d5-5b01-ec11-94f0-00224836ffb5)/uomid"
                    }, { "@odata.type": "#Microsoft.Dynamics.CRM.productpricelevel", "@odata.id": "https://ibef.crm2.dynamics.com/api/data/v9.1/productpricelevels(fba2cd99-bd48-ec11-8c62-0022483816fb)", "@odata.etag": "W/\"11131106\"", "@odata.editLink": "productpricelevels(fba2cd99-bd48-ec11-8c62-0022483816fb)", "_productid_value@OData.Community.Display.V1.FormattedValue": "Associação IBEF Jovem até 25 anos", "_productid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "productid", "_productid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "product", "_productid_value@odata.type": "#Guid", "_productid_value": "128fb330-5401-ec11-94f0-0022483659d7", "_transactioncurrencyid_value@OData.Community.Display.V1.FormattedValue": "Brazilian Real", "_transactioncurrencyid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "transactioncurrencyid", "_transactioncurrencyid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "transactioncurrency", "_transactioncurrencyid_value@odata.type": "#Guid", "_transactioncurrencyid_value": "6cb83264-70ac-eb11-8236-00224836f622", "productpricelevelid@odata.type": "#Guid", "productpricelevelid": "fba2cd99-bd48-ec11-8c62-0022483816fb", "_uomid_value@OData.Community.Display.V1.FormattedValue": "Unidade Principal", "_uomid_value@Microsoft.Dynamics.CRM.associatednavigationproperty": "uomid", "_uomid_value@Microsoft.Dynamics.CRM.lookuplogicalname": "uom", "_uomid_value@odata.type": "#Guid", "_uomid_value": "1139968a-36bf-4079-b459-20e34a1d776e", "amount@OData.Community.Display.V1.FormattedValue": "R$ 220,00", "amount@odata.type": "#Decimal", "amount": 220.0, "pricingmethodcode@OData.Community.Display.V1.FormattedValue": "Valor da Moeda", "pricingmethodcode": 1, "productid@odata.associationLink": "https://ibef.crm2.dynamics.com/api/data/v9.1/productpricelevels(fba2cd99-bd48-ec11-8c62-0022483816fb)/productid/$ref", "productid@odata.navigationLink": "https://ibef.crm2.dynamics.com/api/data/v9.1/productpricelevels(fba2cd99-bd48-ec11-8c62-0022483816fb)/productid", "transactioncurrencyid@odata.associationLink": "https://ibef.crm2.dynamics.com/api/data/v9.1/productpricelevels(fba2cd99-bd48-ec11-8c62-0022483816fb)/transactioncurrencyid/$ref", "transactioncurrencyid@odata.navigationLink": "https://ibef.crm2.dynamics.com/api/data/v9.1/productpricelevels(fba2cd99-bd48-ec11-8c62-0022483816fb)/transactioncurrencyid", "uomid@odata.associationLink": "https://ibef.crm2.dynamics.com/api/data/v9.1/productpricelevels(fba2cd99-bd48-ec11-8c62-0022483816fb)/uomid/$ref", "uomid@odata.navigationLink": "https://ibef.crm2.dynamics.com/api/data/v9.1/productpricelevels(fba2cd99-bd48-ec11-8c62-0022483816fb)/uomid" }]
        }
    }
}