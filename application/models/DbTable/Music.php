<?php

class Application_Model_DbTable_Music extends Zend_Db_Table_Abstract
{

    protected $_name = 'music';

    /* public function getAllMusic($id)
     {
         $id = (int)$id;
         return $this->fetchAll('album_id = ' . $id);

     }*/

    public function getMusic($id)
    {
        $id = (int)$id;
        $row = $this->fetchRow('id = ' . $id);
        if (!$row) {
            throw new Exception("Could not find row $id");
        }
        return
            $row->toArray();
    }

    public function addMusic($id, $title, $duration, $mp3, $jod, $dollar, $euro, $discount, $start_date, $end_data)
    {
        $data = array(
            'title' => $title,
            'duration' => $duration,
            'mp3' => $mp3,
            'album_id' => $id,
            'price_jod' => $jod,
            'price_dollar' => $dollar,
            'price_euro' => $euro,
            'discount' => $discount,
            'start_date' => $start_date,
            'end_date' => $end_data);
        $id = $this->insert($data);
        return $id;
    }

    public function updateMusic($id, $title, $duration, $mp3, $jod, $dollar, $euro, $discount, $start_date, $end_data)
    {
        $data = array(
            'title' => $title,
            'duration' => $duration,
            'mp3' => $mp3,
            'price_jod' => $jod,
            'price_dollar' => $dollar,
            'price_euro' => $euro,
            'discount' => $discount,
            'start_date' => $start_date,
            'end_date' => $end_data);
        $this->update($data, 'id = ' . (int)$id);
    }

    public function updateMusic2($id, $title, $duration, $jod, $dollar, $euro, $discount, $start_date, $end_data)
    {
        $data = array(
            'title' => $title,
            'duration' => $duration,
            'price_jod' => $jod,
            'price_dollar' => $dollar,
            'price_euro' => $euro,
            'discount' => $discount,
            'start_date' => $start_date,
            'end_date' => $end_data);
        $this->update($data, 'id = ' . (int)$id);
    }

    public function deleteMusic($id)
    {
        $this->delete('id =' . (int)$id);
    }

    public function get_page_id($id)
    {
        $row = $this->fetchRow('id = ' . $id);
        if (!$row) {
            throw new Exception("Could not find row $id");
        }
        return
            $row->toArray();
    }

    public function get_num_rows($id)
    {
        $select = $this->select();
        $select->from($this, array('count(*) as amount'))
         ->where('album_id = '.$id);
        $rows = $this->fetchAll($select);

        return ($rows[0]->amount);
    }

    public function get_all_music($id, $keyword, $order_column, $dir, $start, $length)
    {
        $query = $this
            ->select()
            ->from($this->_name, array('id','duration','title','mp3','discount','price_jod',
                'price_dollar','price_euro','start_date','end_date','album_id'))
            ->order($order_column . ' ' . $dir)
            ->where("title LIKE '%$keyword%' OR duration LIKE '%$keyword%' OR discount LIKE '%$keyword%'
            OR price_jod LIKE '%$keyword%' OR price_dollar LIKE '%$keyword%' OR price_euro LIKE '%$keyword%' OR
            start_date LIKE '%$keyword%' OR end_date LIKE '%$keyword%'")
            ->where('album_id = '.$id)
            ->limit($length, $start);
        return $this->fetchAll($query);
    }


    public function get_music_searched($id,$keyword)
    {
        $query =
            $this->select()
                ->from($this, array('count(*) as amount'))
                ->where("title LIKE '%$keyword%' OR duration LIKE '%$keyword%' OR discount LIKE '%$keyword%'
            OR price_jod LIKE '%$keyword%' OR price_dollar LIKE '%$keyword%' OR price_euro LIKE '%$keyword%' OR
            start_date LIKE '%$keyword%' OR end_date LIKE '%$keyword%'")
                ->where('album_id = '.$id);
        $rows = $this->fetchAll($query);

        return ($rows[0]->amount);
    }

}

