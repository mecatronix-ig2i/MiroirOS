<?php

class Planning {
	public function Planning() {
		$this->planning = array();
	}
	
	public function ajouterOF($data) {
		if (array_push($this->planning, array("ofCol" => $data))) return true;
		else return false;
	}
	
	public function viderPlanning() {
		$this->planning = array();
		return $this->planning;
	}
	
	public function getPlanning() {
		return $this->planning;
	}
	
	protected $planning;
}
?>