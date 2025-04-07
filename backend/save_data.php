<?php
//Cabecera de peticiones para permitir cors y demás configuraciones de Angular
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

//Variables e conexión al servidor
    define('HOST', 'localhost');
    define('USER', 'admin');
    define('PASS', 'AdMiN123456*#');
    define('DBNAME', 'prueba_gabrica');
//captura de datos enviados desde el formulario en el front
    $data = json_decode(file_get_contents("php://input"), true);
//Validación de datos de la petición
    if($data){
        $conexion = mysqli_connect(HOST, USER, PASS, DBNAME);
        if(!$conexion){
            echo json_encode(['error'=>'Se presentó un error '.mysqli_connect_error()]);
            exit;
        };
//Limpiar datos enviados desde el front
        $nombre_cliente = mysqli_real_escape_string($conexion, $data['nombre_cliente']);
        $nit = mysqli_real_escape_string($conexion, $data['nit']);
        $nombre_punto = mysqli_real_escape_string($conexion, $data['nombre_punto']);
        $nombre_equipo = mysqli_real_escape_string($conexion, $data['nombre_equipo']);
        $ciudad = mysqli_real_escape_string($conexion, $data['ciudad']);
        $promotor = mysqli_real_escape_string($conexion, $data['promotor']);
        $rtc = (int) $data['rtc'];
        $capitan_usuario = mysqli_real_escape_string($conexion, $data['capitan_usuario']);
        $tratamiento_datos = mysqli_real_escape_string($conexion, $data['tratamiento_datos']);
        $ip = mysqli_real_escape_string($conexion, $data['ip']);
        $fecha = mysqli_real_escape_string($conexion, $data['date']);
        $hour = mysqli_real_escape_string($conexion, $data['hour']);
//ALamacenar es estado de respuesta de la función que envía los datos a MySQL
        $resultado = registrar_equipo($conexion, $nombre_cliente,$nit,$nombre_punto,$nombre_equipo,$ciudad,$promotor,$rtc,$capitan_usuario,$tratamiento_datos,$ip,$fecha,$hour);
//brindar respuetsa de la ejecución del código
        echo json_encode($resultado);
//Finalizar la conexión a la DB
        mysqli_close($conexion);
    }else{
        echo json_encode(['error' => 'No se recibieron datos']);
    };
    
//Función de alamacenamiento de datos en la BD
    function registrar_equipo($conexion_db, $nombre_cliente,$nit,$nombre_punto,$nombre_equipo,$ciudad,$promotor,$rtc,$capitan_usuario,$tratamiento_datos,$ip,$fecha,$hour){
      $consulta = "INSERT INTO register_team(nombre_cliente,nit,nombre_punto,nombre_equipo,ciudad,promotor,rtc,capitan_usuario,tratamiento_datos,ip,fecha,hour) VALUES ('$nombre_cliente','$nit','$nombre_punto','$nombre_equipo','$ciudad','$promotor','$rtc','$capitan_usuario','$tratamiento_datos','$ip','$fecha','$hour')";

      if(mysqli_query($conexion_db, $consulta)){
          return ["succes" => true, 'message' => "Valores guardados correctamente"];
      }else{
          return ["succes" => false, 'message' => "Error al guardar ".mysqli_error($conexion_db)];
      };

    };

?>