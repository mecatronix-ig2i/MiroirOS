<?php
	function recupererFlux() {
		$flux = simplexml_load_file('http://www.france24.com/fr/france/rss');
		$flux = $flux->channel;
		return $flux;
	}
?>