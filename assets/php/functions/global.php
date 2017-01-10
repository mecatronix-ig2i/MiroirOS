<?php
	// Encodage UTF-8
	//header('Content-Type: text/html; charset=ISO-8859-1'); 

	//CONNEXION ORACLE
	function getConn(){
		$conn = @oci_connect('CLEEE', 'TIGER', 'CLEEE');
		if (!$conn){
		$e = oci_error();
		echo "<span>
				<FONT color='red'><b>Problème connection serveur Oracle :</b></FONT>
			  <span><br>";
		echo $e['message'];
		}
		return $conn;
	}
	
	//SECONDES to HH:MM:SS
		
	function StoH($duree){
		$heures=intval($duree / 3600);
		$minutes=intval(($duree % 3600) / 60);
		$secondes=intval((($duree % 3600) % 60));
		
		return "$heures:$minutes:$secondes";
	}	
		
 


?>