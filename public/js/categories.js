$(document).ready(function () {


    fetchData();

    var CategoriesTable = $('#CategoriesTable').DataTable();


    $('#add-category-btn').click(function () {
        var actionName = $(this).data('action');
        $.ajax({
            url: "/categories/addcategoryform",
            success: function (data) {
                $('.modal-body').html(data);
                $('.modal-name').text(actionName + ' categories');
                $('#CategoryModal').modal('show');
                validateAddForm();
            }
        });

    });


    $(document).on('click', '.delete-category-btn', function () {
        var id = $(this).data("id");
        var name = $(this).data("name");
        var dialog = confirm('Are you sure that you want to delete ' + name + ' ?');

        if (dialog) {
            $.ajax({
                url: "categories/deletecategory/id/" + id,
                success: function () {
                    reloadTable(CategoriesTable);
                }
            });
        }

    });

    $(document).on('click', '.edit-category-btn', function () {

        var category_id = $(this).data('id');

        var actionName = $(this).data('action');
        
        $.ajax({
            url: "categories/editcategoryform/id/" + category_id,
            success: function (data) {
                $('.modal-body').html(data);
                $('.modal-name').text(actionName + ' categories');
                $('#CategoryModal').modal('show');
                validateEditForm();

            }
        });


    });

    $(document).on('click', '#submit-category-btn', function () {


        var category_id = $('#id').val();


        if (category_id == undefined) {

            var options = {
                type: 'POST',
                url: 'categories/addcategoryrow',
                success: function () {
                    reloadTable(CategoriesTable);
                    $('#CategoryModal').modal('hide');
                }
            };

            if ($('#addCategoryForm').valid()) {
                $('#addCategoryForm').ajaxSubmit(options);

            }


        } else {
            var options = {
                type: 'POST',
                url: 'categories/editcategoryrow',
                success: function () {
                    reloadTable(CategoriesTable);
                    $('#CategoryModal').modal('hide');
                }
            };

            if ($('#editCategoryForm').valid()) {
                $('#editCategoryForm').ajaxSubmit(options);

            }


        }


    });


    //functions

    function validateEditForm() {
        $("#editCategoryForm").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },

                messages: {
                    name: {
                        required: "Please enter the categories name",
                        minlength: "Your categories name must consist of at least 2 characters"
                    }
                }
            }
        });

    }


    function validateAddForm() {
        $("#addCategoryForm").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },

                messages: {
                    name: {
                        required: "Please enter the categories name",
                        minlength: "Your categories name must consist of at least 2 characters"
                    },
                    artist: {
                        required: "Please enter the artist name",
                        minlength: "Your categories artist must consist of at least 2 characters"
                    },
                }
            }
        });

    }


    function fetchData() {
        $('#CategoriesTable').DataTable({
            "processing": true,
            "serverSide": true,
            "columnDefs": [ {
                "targets": 1,
                "orderable": false
            } ],
            "ajax": {
                url:"/categories/categoriesview",
                type:"post"
            },
            "columns": [

                {"data": "name"},

                {

                    render: function (data, type, row) {

                        return ' <button class="btn btn-danger  delete-category-btn" data-action="Delete" data-id="' + row.id + '" data-name="' + row.name + '" ' +
                            '"><i class="fas fa-trash-alt"></i></button>' +
                            '<button class="btn btn-warning  edit-category-btn" data-action="Edit" data-id="' + row.id + '" data-name="' + row.name + '" ' +
                            '"><i class="fas fa-edit"></i></button>';

                    }
                }
            ],


        });

    }

    function reloadTable(table) {

        table.ajax.reload();
    }


});