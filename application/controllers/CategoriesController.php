<?php

class CategoriesController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        $this->view->headScript()->appendFile($this->view->baseUrl() . '/js/categories.js');
    }

    public function addcategoryrowAction()
    {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(TRUE);
        if ($this->getRequest()->isPost()) {
            $name = $this->getRequest()->getPost('name');
            $categories = new Application_Model_DbTable_Categories();
            $categories->addCategory($name);


        }
    }

    public function addcategoryformAction()
    {
        //to show the add form
        $this->_helper->layout->disableLayout();
    }


    public function deletecategoryAction()
    {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(TRUE);
        $this->_helper->layout->disableLayout();
        $id = $this->_getParam('id', 0);
        $categories = new Application_Model_DbTable_Categories();
        $categories->deleteCategory($id);


    }

    public function editcategoryformAction()
    {
        $this->_helper->layout->disableLayout();
        $id = $this->_getParam('id', 0);
        $categories = new Application_Model_DbTable_Categories();
        $data = $categories->getCategory($id);
        $this->view->category = $data;
    }

    public function editcategoryrowAction()
    {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(TRUE);
        if ($this->getRequest()->isPost()) {
            $name = $this->getRequest()->getPost('name');
            $id = $this->getRequest()->getPost('id');
            $categories = new Application_Model_DbTable_Categories();
            $categories->updateCategory($id, $name);

        }
    }

    public function categoriesviewAction()
    {
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(TRUE);
        $categories = new Application_Model_DbTable_Categories();
        $fetch_categories = $categories->fetchAll();
        echo json_encode(array('data' => $fetch_categories->toArray()));

    }


}

