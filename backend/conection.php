<?php
    define('HOST', 'localhost');
    define('USER', 'admin');
    define('PASS', 'AdMiN123456*#');
    define('DBNAME', 'prueba_gabrica');

    $conexion = mysqli_connect(HOST,USER,PASS,DBNAME);

    if(!$conexion){
        echo 'la conexión fallo';
        die('Error al conectar: '.mysqli_connect_error());
    }else{
        echo ' conexión exitosa';
    };

?>