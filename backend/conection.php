<?php
//definimos constantes para la conexión a la base de datos
    define('HOST', 'localhost');
    define('USER', 'admin');
    define('PASS', 'AdMiN123456*#');
    define('DBNAME', 'prueba_gabrica');
//Con mysqli realizamos la conexión a la base de datos
    $conexion = mysqli_connect(HOST,USER,PASS,DBNAME);

    if(!$conexion){
        echo 'la conexión fallo';
        die('Error al conectar: '.mysqli_connect_error());
    }else{
        $query = mysqli_query( $conexion, "SELECT * FROM register_team");

        $result = mysqli_fetch_all($query, MYSQLI_ASSOC);

        foreach ($result as $values) {
            echo 'Nombre: '.$values['nombre_cliente'];
            echo 'Nit: '.$values['nit'];
            echo 'Nombre Punto: '.$values['nombre_punto'];
            echo 'Nombre Equipo: '.$values['nombre_equipo'];
            echo 'Ciudad: '.$values['ciudad'];
            echo 'Promotor: '.$values['promotor'];
            echo 'RTC: '.$values['rtc'];
            echo 'Capitan: '.$values['capitan_usuario'];
            echo 'Tatamiento Datos: '.$values['tratamiento_datos'];
            echo 'Ip: '.$values['ip'];
            echo 'Fecha: '.$values['fecha'];
            echo 'Hora: '.$values['hour'];
        };
    };
?>