<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        $this->view->headScript()->appendFile($this->view->baseUrl() . '/js/albums.js');
    }

    public function addalbumrowAction()
    {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(TRUE);
        if ($this->getRequest()->isPost()) {
            $title = $this->getRequest()->getPost('title');
            $artist = $this->getRequest()->getPost('artist');
            $cat_id = $this->getRequest()->getPost('cat_id');
            $albums = new Application_Model_DbTable_Albums();
            $ids = new Application_Model_DbTable_AC();
            $album_id = $albums->addAlbum($artist, $title);
            foreach ($cat_id as $val) {
                $ids->addAC($album_id, $val);
            }

        }
    }

    public function addalbumformAction()
    {
        //to show the add form
        $this->_helper->layout->disableLayout();
        $categories = new Application_Model_DbTable_Categories();
        $this->view->categories = $categories->fetchAll();
    }


    public function deletealbumAction()
    {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(TRUE);

        $id = $this->_getParam('id', 0);
        $albums = new Application_Model_DbTable_Albums();
        $albums->deleteAlbum($id);
    }

    public function editalbumformAction()
    {
        $this->_helper->layout->disableLayout();

        $id = $this->_getParam('id', 0);
        $albums = new Application_Model_DbTable_Albums();
        $data = $albums->getAlbum($id);
        $this->view->album = $data;

        //AC AlbumsCategory DB table and Model
        //ACview Relation between albums and categories,  DB table view and Model

        $album_categories = new Application_Model_DbTable_ACview();
        $category_data = $album_categories->getAC($id);
        $this->view->category = $category_data;

        $all_categories = new Application_Model_DbTable_Categories();
        $this->view->categories = $all_categories->fetchAll();


    }


    public function editalbumrowAction()
    {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(TRUE);

        if ($this->getRequest()->isPost()) {
            $title = $this->getRequest()->getPost('title');
            $artist = $this->getRequest()->getPost('artist');
            $cat_id = $this->getRequest()->getPost('cat_id');
            $album_id = $this->getRequest()->getPost('id');
            $albums = new Application_Model_DbTable_Albums();
            $albums->updateAlbum($album_id, $artist, $title);

            $AC = new Application_Model_DbTable_AC();
            if ($cat_id != null) {
                $AC->deleteAC($album_id);
            }


            foreach ($cat_id as $val) {
                $AC->addAC($album_id, $val);
            }

        }
    }

    public function albumsviewAction()
    {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(TRUE);

        //the data came from datatable ajax
        $params = $_REQUEST;

        $columns = array(
            // datatable column index  => database column name
            0 => 'album_id',
            1 => 'title',
            2 => 'artist'
        );

        $order_column = $columns[$params['order'][0]['column']];
        $dir = $params['order'][0]['dir'];
        $start_page = $params['start'];
        $page_rows_length = $params['length'];

        $search_keyword = $params['search']['value'];

        $albums = new Application_Model_DbTable_Albums();
        $albums_categories = new Application_Model_DbTable_ACview();
        $categories = new Application_Model_DbTable_ACview();
        $data_view = $albums->get_albums_limit($search_keyword, $order_column, $dir, $start_page, $page_rows_length);
        $recordsTotal = $albums->get_num_rows();
        $recordsFiltered = $recordsTotal;
        if (!empty($params['search']['value'])) {
            $albums_array = $albums->get_albums($search_keyword, $order_column, $dir)->toArray();
            $categories_array = $albums_categories->get_categories($search_keyword, $order_column, $dir)->toArray();
            $data_view_merged = array_unique(array_merge($albums_array, $categories_array), SORT_REGULAR);
            $data_view =array_slice($data_view_merged,$start_page,$page_rows_length);

            $albums_array_search = $albums->get_albums_searched($search_keyword)->toArray();
            $categories_array_search = $albums_categories->get_categories_searched($search_keyword)->toArray();

            $rows_of_searches =array_unique(array_merge($albums_array_search, $categories_array_search), SORT_REGULAR);

            $recordsFiltered = count($rows_of_searches);

        }
        $rows = array();
        foreach ($data_view as $album) {
            $album_id = $album['album_id'];
            $category = $categories->getAC($album_id);
            $cat_string = "";
            //get the categories of the album as object in the json
            foreach ($category as $category_row) {
                $cat_string .= $category_row['cat_name'] . ", ";
            }
            $cat = rtrim($cat_string, ",");
            $new_cat_name = rtrim($cat, ", ");
            array_push($rows,
                array(
                    'id' => $album_id,
                    'title' => $album['title'],
                    'artist' => $album['artist'],
                    'categories' => $new_cat_name
                )
            );

        }

        $data = array(
            "draw" => intval($params['draw']),
            "recordsTotal" => intval($recordsTotal),
            "recordsFiltered" => intval($recordsFiltered),
            "data" => $rows,
        );

        echo json_encode($data);


    }

    public function musictableAction()
    {
        $this->_helper->layout()->disableLayout();
        $id = $this->_getParam('id', 0);
        $this->view->album = $id;
    }

    public function addmusicformAction()
    {

        $id = $this->_getParam('id', 0);
        $this->_helper->layout->disableLayout();
        $this->view->music = $id;
    }

    public function addmusicrowAction()
    {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(TRUE);
        if ($this->getRequest()->isPost()) {
            $title = $this->getRequest()->getPost('title');
            $duration = $this->getRequest()->getPost('duration');
            $album_id = $this->getRequest()->getPost('album_id');
            $jod = $this->getRequest()->getPost('jod');
            $dollar = $this->getRequest()->getPost('dollar');
            $euro = $this->getRequest()->getPost('euro');
            $discount = $this->getRequest()->getPost('discount');
            $start_date = $this->getRequest()->getPost('start_date');
            $end_date = $this->getRequest()->getPost('end_date');

            if ($jod == "") $jod = null;
            if ($dollar == "") $dollar = null;
            if ($euro == "") $euro = null;
            if ($discount == "") $discount = null;
            if ($start_date == "") $start_date = null;
            if ($end_date == "") $end_date = null;
            //upload file code
            $target_dir = '/var/www/albums/public/mp3/';
            $random = rand(100000, 999999) . '.mp3';
            $target_file = $target_dir . $random;
            if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
                $music = new Application_Model_DbTable_Music();
                $music->addMusic($album_id, $title, $duration, $random, $jod, $dollar, $euro, $discount, $start_date, $end_date);

            }
        }
    }

    public function deletemusicAction()
    {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(TRUE);

        $music_id = $this->_getParam('music_id', 0);
        $albums = new Application_Model_DbTable_Music();
        $albums->deleteMusic($music_id);
    }

    public function editmusicformAction()
    {
        $this->_helper->layout->disableLayout();

        $id = $this->_getParam('id', 0);
        $albums = new Application_Model_DbTable_Music();
        $data = $albums->getMusic($id);
        $this->view->music = $data;
    }

    public function editmusicrowAction()
    {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(TRUE);

        if ($this->getRequest()->isPost()) {
            $title = $this->getRequest()->getPost('title');
            $duration = $this->getRequest()->getPost('duration');
            $music_id = $this->getRequest()->getPost('music_id');
            $jod = $this->getRequest()->getPost('jod');
            $dollar = $this->getRequest()->getPost('dollar');
            $euro = $this->getRequest()->getPost('euro');
            $discount = $this->getRequest()->getPost('discount');
            $start_date = $this->getRequest()->getPost('start_date');
            $end_date = $this->getRequest()->getPost('end_date');

            if ($jod == "") $jod = null;
            if ($dollar == "") $dollar = null;
            if ($euro == "") $euro = null;
            if ($discount == "") $discount = null;
            if ($start_date == "") $start_date = null;
            if ($end_date == "") $end_date = null;

            $music = new Application_Model_DbTable_Music();

            if (isset($_FILES["file"])) {
                $target_dir = '/var/www/albums/public/mp3/';
                $random = rand(100000, 999999) . '.mp3';
                $target_file = $target_dir . $random;
                move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);
                //case file exist
                $music->updateMusic($music_id, $title, $duration, $random, $jod, $dollar, $euro, $discount, $start_date, $end_date);
            } else {
                //case file not exist
                $music->updateMusic2($music_id, $title, $duration, $jod, $dollar, $euro, $discount, $start_date, $end_date);
            }


        }
    }

    public function musicviewAction()
    {

        $params = $_REQUEST;

        $columns = array(
            // datatable column index  => database column name
            0 => 'id',
        );

        $order_column = $columns[$params['order'][0]['column']];
        $dir = $params['order'][0]['dir'];
        $start_page = $params['start'];
        $page_rows_length = $params['length'];

        $search_keyword = $params['search']['value'];

        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(TRUE);

        $id = $this->_getParam('id', 0);
        $music = new Application_Model_DbTable_Music();
        $rows = $music->get_all_music($id,$search_keyword,$order_column,$dir,$start_page,$page_rows_length)->toArray();
        $recordsTotal = $music->get_num_rows();
        $recordsFiltered = $recordsTotal;
        if (!empty($params['search']['value'])) {
            $recordsFiltered =  $music->get_music_searched($search_keyword);
        }

        $result = array(
            "draw" => intval($params['draw']),
            "recordsTotal" => intval($recordsTotal),
            "recordsFiltered" => intval($recordsFiltered),
            "data" => $rows,
        );

        echo json_encode($result);

    }


}

