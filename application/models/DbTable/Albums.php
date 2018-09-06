<?php

class Application_Model_DbTable_Albums extends Zend_Db_Table_Abstract
{

    protected $_name = 'albums';


    public function getAlbum($album_id)
    {
        $album_id = (int)$album_id;
        $row = $this->fetchRow('album_id = ' . $album_id);
        if (!$row) {
            throw new Exception("Could not find row $album_id");
        }
        return $row->toArray();
    }


    public function addAlbum($artist, $title)
    {
        $data = array
        (
            'artist' => $artist,
            'title' => $title,
        );
        $album_id = $this->insert($data);
        return $album_id;
    }


    public function deleteAlbum($album_id)
    {
        $this->delete('album_id =' . (int)$album_id);
    }

    public function updateAlbum($album_id, $artist, $title)
    {
        $data = array(
            'artist' => $artist,
            'title' => $title,
        );
        $this->update($data, 'album_id = ' . (int)$album_id);
    }

    public function get_search($keyword, $oder_column, $dir, $start, $length)
    {
        $query = $this
            ->select()
            ->from($this->_name, array('album_id', 'title', 'artist'))
            ->where("title LIKE '%$keyword%' OR artist LIKE '%$keyword%'")
            ->order($oder_column .' '. $dir)
            ->limit($length, $start);
        return $this->fetchAll($query);
    }



    public function get_num_rows()
    {
        $select = $this->select();
        $select->from($this, array('count(*) as amount'));
        $rows = $this->fetchAll($select);

        return($rows[0]->amount);
    }

    public function get_albums_limit($keyword,$order_column, $dir, $start, $length)
    {
        $query = $this
            ->select()
            ->from($this->_name, array('album_id', 'title', 'artist'))
            ->order($order_column .' '. $dir)
            ->where("title LIKE '%$keyword%' OR artist LIKE '%$keyword%'")
            ->limit($length, $start);
        return $this->fetchAll($query);
    }

    public function get_albums($keyword,$oder_column, $dir)
    {
        $query = $this
            ->select()
            ->from($this->_name, array('album_id', 'title', 'artist'))
            ->order($oder_column .' '. $dir)
            ->where("title LIKE '%$keyword%' OR artist LIKE '%$keyword%'");
        return $this->fetchAll($query);
    }

    public function get_albums_searched($keyword)
    {
        $query =
            $this->select()
                ->from($this, array('album_id'))
                ->where("title LIKE '%$keyword%' OR artist LIKE '%$keyword%'");
        $data = $this->fetchAll($query);

        return $data;
    }
}

