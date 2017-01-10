<?php 

//include_once 'global.php';//script de connexion bdd
include_once 'planning.php';

session_start();

if (!isset($_SESSION["planning"])) $_SESSION["planning"] = new Planning();
else $planning = $_SESSION["planning"]; 
$data["action"] = $_POST["action"];

if (!$data["action"]) {
		$data["feedback"] = "Impossible de récupérer l'action demandée";
}

else {
	switch($data["action"])
		{
			case 'getOF' ://ajoute un OF dans le tableau
				$OF = array();
				$OF["idOF"] = $_POST["idOF"];
				$OF["valueLign"] = $_POST["valueLign"];
				$OF["dateLiv"] = "Inconnu";//Date livraison
				$OF["comment"] = "Inconnu";//Commentaires
				$OF["isOut"] = "Inconnu";//Sorti, pas sorti ?
				$OF["left"] = "Inconnu";//Manquants
				$OF["idOrder"] = "Inconnu";//Numéro de commande
				$OF["quantity"] = "Inconnu";//Quantité
				$OF["timePrep"] = "Inconnu";//Temps de préparation
				$OF["timeGam"] = "Inconnu";//Temps en gamme
				$OF["timeCMS"] = "Inconnu";//Temps en CMS
				$OF["nameProduct"] = "Inconnu";//Nom du produit

			if ($planning->ajouterOF($OF)) {
				$data["planning"] = $planning;// OF
				$data["feedback"] = "Opération getOF réussie";
			}
			break;
		
			case 'getOFtable' :
				$data["planning"] = $planning->getPlanning();
				$data["feedback"] = "Opération getOFtable réussie";
			break;
			
			case 'throwPlanning' : 
				$data["planning"] = $planning->viderPlanning();
				$data["feedback"] = "Opération throwPlanning réussie";
			break;
			
			default : 				
				$data["feedback"] = "Pas d'action à réaliser définie pour ce choix";
		}
	}
	echo json_encode($data);
?>