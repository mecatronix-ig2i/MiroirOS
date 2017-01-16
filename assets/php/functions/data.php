<?php 

include_once 'miroir.php';
session_start();

$data["action"] = $_POST["action"];

if (!$data["action"]) {
		$data["feedback"] = "Impossible de récupérer l'action demandée";
}

else {
	switch($data["action"])
		{
			case 'getRSS' ://récupère le flux rss d'infos
				$data["flux"] = recupererFlux();
			break;
		
			default : 				
				$data["feedback"] = "Pas d'action à réaliser définie pour ce choix";
		}
	}
	echo json_encode($data);
?>