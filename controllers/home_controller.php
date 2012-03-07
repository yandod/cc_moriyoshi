<?php
	class HomeController extends CcMoriyoshiAppController {
	public $uses = array('Issue');
	public function index() {
		$this->set('count',$this->Issue->find('count'));
	}
}

