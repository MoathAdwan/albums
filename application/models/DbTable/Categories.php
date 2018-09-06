<?php

class Application_Model_DbTable_Categories extends Zend_Db_Table_Abstract
{

    protected $_name = 'categories';

    public function getCategory($id)
    {
        $id = (int)$id;
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

    public function get_num_rows()
    {
        $select = $this->select();
        $select->from($this, array('count(*) as amount'));
        $rows = $this->fetchAll($select);

        return($rows[0]->amount);
    }

    public function get_categories($keyword,$order_column, $dir, $start, $length)
    {
        $query = $this
            ->select()
            ->from($this->_name, array('id', 'name'))
            ->order($order_column .' '. $dir)
            ->where("name LIKE '%$keyword%' ")
            ->limit($length, $start);
        return $this->fetchAll($query);
    }


    public function get_categories_searched($keyword)
    {
        $query =
            $this->select()
                ->from($this, array('id'))
                ->where("name LIKE '%$keyword%' ");
        $data = $this->fetchAll($query);

        return count($data);
    }
}

