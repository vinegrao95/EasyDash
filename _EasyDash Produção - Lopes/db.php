<?php

/* ****************************************************************** */
//  ***** ***** ***** ********* Easy Dash ********* ***** ***** *****
//
//  Description: A tool to show Easy Vision data into Charts powered by
//  Chart-JS.
//
//  Author: Vinícius Negrão e Filipe Aparecido 
//  Company: GreenYellow do Brasil.
//  Git: www.github.com/vinegrao95/EasyDash
//
/* ****************************************************************** */
/* ****************************************************************** */
//
//  data base connection and query execution
//
/* ****************************************************************** */
function dbUpdate($sql, $cond) {
    // seting the database parameters...
    $servername = "13.90.144.116";
    $username = "easy";
    $password = "easy";
    $dbname = "EASY_HISTORIC";

    // create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // check connection
    if($conn->connect_error) {
        logUpdate($dbLogFile, die("Connection failed: " . $conn->connect_error));
    }
    if($cond == 1){ // condição 1 tem como objetivo retornar um array com os resultados, usado para o gráfico de barras.
    // execute query
        $run = mysqli_query($conn, $sql);
        if (!$run) {
        printf("Error: %s\n", mysqli_error($conn));
        exit();
}
        $return = mysqli_fetch_array($run, MYSQLI_ASSOC);
        return $return;

    // close connection
    $conn->close();

}
    else if($cond == 2){ //condição 2 conta o número de linhas retornados pela query, usado para mostrar o atual nos charts de tipo PIE.
         $run = mysqli_query($conn, $sql);
        if (!$run) {
        printf("Error: %s\n", mysqli_error($conn));
        exit();
}
        $return = mysqli_num_rows($run);
        return $return;

    //close connection 
    $conn->close();
    }
}

?>