/* ****************************************************************** 
//  ***** ***** ***** ********* Easy Dash ********* ***** ***** *****
//
//  Description: A tool to show Easy Vision data into Charts powered by
//  Chart-JS.
//
//  Author: Vinícius Negrão
//  Company: GreenYellow do Brasil.
//  Git: www.github.com/vinegrao95/EasyDash
//
/* ****************************************************************** */
/* ****************************************************************** 
//
//  JS commands and AJAX comunication with PHP server.
//
/* ****************************************************************** */
//ALARMS
$(document).ready(function(){
    $.ajax({

                url: "http://10.155.131.16:8090/alarms_nrb.php", //base Easy GPA
                //url: "http://127.0.0.1:8090/alarms_nrb.php", //Local para teste
                type: "GET",
                success: function (filipinho){
                    //Sucesso no AJAX
                    var result = JSON.parse(filipinho);
                    var messages="";
                    var i = 0;
                    for(var x=0; x < 40; x++){

                        messages += "<div class=\"Rtable-cell\"><h3>" + result[i]["loja"] + "</h3></div>";
                        messages += "<div class=\"Rtable-cell\"><h4>" + result[i]["mensagem"] + "</h4></div>";
                        messages += "<div class=\"Rtable-cell\"><h4>" + result[i]["inicio"] + "</h4></div>";
                        document.getElementById("alarm_nok").innerHTML = messages;
                        i++;
                    }
                }
            })
});

$(document).ready(function(){
    $.ajax({

                url: "http://10.155.131.16:8090/alarms_nrb.php", //base Easy GPA;
                // url: "http://127.0.0.1:8090/alarms_nrb.php",           //Local para teste;
                type: "GET",
                success: function (filipinho){
                    //Sucesso no AJAX
                    var result = JSON.parse(filipinho);
                    console.log(result);
                    //console.log(result[0].ALARMS_QTY_OPEN);
                    var data_i=[];
                    var data_c=[];
                    var lab=[];
                    var indice = result[0].length;
                    // console.log(check);
                    console.log(result);
                    
                    for (i = 0; i < indice; i++) { //insere os dados vindos do banco de dados nos arrays.
                       data_i.push(result[0][i].ALARMS_QTY_OPEN_ILU);
                       data_c.push(result[1][i].ALARMS_QTY_OPEN_COM);
                       lab.push(result[1][i].ALARMS_HOUR+" hora(s)");
                   }
                   //Inverte os arrays para que o gráfico mostre a ordem correta.
                   var data_ilu=data_i.slice(0).reverse();
                   var data_com=data_c.slice(0).reverse();
                   var labels=lab.slice(0).reverse();

                   //Declara o chart
                   new Chart(document.getElementById("alarms_graph"), {
                      type: 'line',
                      data: {
                        labels: labels,
                        datasets: [{ 
                            data: data_ilu,
                            label: "Iluminação em Manual",
                            borderColor: "#3300dd",
                            fill: false
                        },
                        { 
                            data: data_com,
                            label: "Lojas Sem Comunicação",
                            borderColor: "#F00",
                            fill: false
                        }],
                        
                    },
                    options: {
                        responsive: true,
                        tooltips: {
                            mode: 'index',
                            intersect: false,
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: true
                        },
                        scales: {
                            xAxes: [{
                                display: true,
                                scaleLabel: {
                                    display: true
                                }
                            }],
                            yAxes: [{
                              ticks : {
                                max : 100 //tamanho máximo da escala do gráfico (eixo vertical);
                            },
                            display: true,
                            scaleLabel: {
                                display: true
                            }
                        }]
                    }
                }
            });
               }
           }
           )
});