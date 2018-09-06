<?php

class Application_Model_DbTable_AC extends Zend_Db_Table_Abstract
{

    protected $_name = 'have_categories';

    public function getAC($id)
    {
        $id = (int)$id;
        return $this->fetchAll('album_id = ' . $id);

    }


    public function addAC($album_id, $cat_id)
    {
        $data = array
        (
            'album_id' => $album_id,
            'category_id' => $cat_id,
        );
        $id = $this->insert($data);
        return $id;
    }


    public function deleteAC($album_id)
    {
        $this->delete('album_id =' . (int)$album_id);
    }


}

