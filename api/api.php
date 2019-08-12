<?php
 include 'BaseJsonRpcServer.php';




class api {
	
 function __construct() {
 }

 public function test () {

 	/* Способ 1 */
		/*$url = (!empty($_SERVER['HTTPS'])) ? "https://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'] : "http://".$_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
		$url = $_SERVER['REQUEST_URI'];
		$my_url = explode('wp-content' , $url); 
		$path = $_SERVER['DOCUMENT_ROOT']."/".$my_url[0];*/
        $path = $_SERVER['DOCUMENT_ROOT'];
		define( 'SHORTINIT', true );
		require( $path . '/wp-load.php' );

		// include_once $path . '/wp-config.php';
		// include_once $path . '/wp-includes/wp-db.php';
		// include_once $path . '/wp-includes/pluggable.php';
		// global $wpdb;
		var_dump($wpdb);
		// $Content = str_replace($Uihwd, $Content, $UiContent);

		$newtable = $wpdb->get_results( "SELECT 1" );
		var_dump($newtable);

  return 'ok';
 }

};

  $api = new api();
  echo $api->test();


$server = new BaseJsonRpcServer( $api  );
$server->ContentType = null;
$server->Execute();
