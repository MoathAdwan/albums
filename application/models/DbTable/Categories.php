<?php

class Application_Model_DbTable_Categories extends Zend_Db_Table_Abstract
{

    protected $_name = 'categories';

    public function getCategory($id)
    {
        $id = (int)
        $id;
        $row = $this->fetchRow('id = ' . $id);
        if (!$row) {
            throw new Exception("Could not find row $id");
        }
        return
            $row->toArray();
    }


    public function addCategory($name)
    {
        $data = array
        (
            'name' => $name,
        );
        $id = $this->insert($data);
        return $id;
    }


    public function deleteCategory($id)
    {
        $this->delete('id =' . (int)$id);
    }

    public function updateCategory($id, $name)
    {
        $data = array(
            'name' => $name,

        );
        $this->update($data, 'id = ' . (int)$id);
    }

    public function get_num_rows($result_array)
    {
        return $num_rows = count($result_array);
    }

    public function get_search($keyword)
    {
        $query = $this->select()->from($this->_name, array('name'))
            ->where("name LIKE '%$keyword%'");
        return $this->fetchAll($query);
    }
}

