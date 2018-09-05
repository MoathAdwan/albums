<?php

class Application_Model_DbTable_ACview extends Zend_Db_Table_Abstract
{

    protected $_name = 'albums_categories';
    protected $_primary = 'album_id';


    public function getAC($id)
    {
        $id = (int)$id;
        return $this->fetchAll('album_id = ' . $id);
    }


    public function get_categories($keyword, $oder_column, $dir, $start, $length)
    {
        $query = $this
                ->select()
                ->from($this->_name, array('album_id', 'title', 'artist'))
                ->order($oder_column . ' ' . $dir)
                ->where("cat_name LIKE '%$keyword%'")
                ->limit($length, $start);
        $data = $this->fetchAll($query);

        return $data;
    }

    public function get_categories_searched($keyword)
    {
        $query = $this
                ->select()
                ->from($this->_name, array('album_id', 'title', 'artist'))
                ->where("cat_name LIKE '%$keyword%'");
        $data = $this->fetchAll($query);

        return $data;
    }


}

