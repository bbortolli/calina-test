<?php

function send() {

    $post = file_get_contents('php://input');
    $data = json_decode($post);
    
    if ( empty($data->name) || empty($data->message) || empty($data->subject) ){
        return header("HTTP/1.1 400 Bad Request");
    }

    $name = $data->name;
    $message = $data->message;
    $subject = $data->subject;

    $mail_body = $name . ' diz,' . '<br>' . $message . '.'; 

    //$headers = "From: teste@teste.com\r\n";
    $headers = "Content-Type: text/html; charset=ISO-8859-1\r\n";

    if (mail("brunobortolli@outlook.com", $subject, $mail_body, $headers) === TRUE){
        return header("HTTP/1.1 200 Ok");
    }
    else{
        return header("HTTP/1.1 500 Internal Server Error");
    }
}

send();

?>