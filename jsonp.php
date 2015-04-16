<?php
$service_callback = ($_REQUEST["callback"]) ? $_REQUEST["callback"] : false;
$url = ($_REQUEST["url"]) ? $_REQUEST["url"] : false;

function jsonp( $data = array(), $callback = false ) {
	$json = json_encode($data);
	header("Content-type: application/json");
	return ($callback) ? "$callback(" . $json . ");" : $json;
}

function onError ($error) {
    echo jsonp( array( 'error' => $error ), $service_callback );
}

if (!$url) {
    onError( 'no url' );
}
else {
    $data = file_get_contents( 'http://' . $url );
    if ($data) {
        echo jsonp( array( 'data' => $data ), $service_callback );
    }
    else {
        onError( 'Could not load url' );
    }
}
?>
