<?php

class Application_Model_DbTable_ACview extends Zend_Db_Table_Abstract
{

    protected $_name = 'albums_categories';
    protected $_primary = 'album_id';

    public function getAC($id)
    {
        $id = (int)
        $id;
        return $this->fetchAll('album_id = ' . $id);

    }


}

