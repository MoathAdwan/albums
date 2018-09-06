$(document).ready(function () {


    fetchAlbumData();
    var AlbumTable = $('#AlbumTable').DataTable();


    $('#add-album-btn').click(function () {

        $.ajax({
            url: "/index/addalbumform",
            success: function (data) {
                $('.modal-body').html(data);
                $('#AlbumModal').modal('show');
                validateAlbumAdd();
                $("#categories").select2({
                    tags: true
                });

            }
        });


        var actionName = $(this).data('name');


        $('.modal-title').text(actionName + ' album');


    });


    $(document).on('click', '.delete-album-btn', function () {
        var id = $(this).data("id");
        var title = $(this).data("title");
        var artist = $(this).data("artist");
        var dialog = confirm('Are you sure that you want to delete ' + title + ' by of ' + artist + ' ?');

        if (dialog) {
            $.ajax({
                url: "index/deletealbum/id/" + id,
                success: function () {
                    reloadTable(AlbumTable);
                }
            });

        }

    });

    $(document).on('click', '.edit-album-btn', function () {

        var id = $(this).data('id');

        var actionName = $(this).data('name');

        $.ajax({
            url: "index/editalbumform/id/" + id,
            success: function (data) {

                $('.modal-body').html(data);
                $('.modal-title').text(actionName + ' album');
                $('#AlbumModal').modal('show');
                validateAlbumEdit();
                $("#categories").select2({
                    tags: true
                });

            }
        });


    });

    $(document).on('click', '#submit-album-btn', function () {

        var album_id = $('#id').val();


        if (album_id == undefined) {

            var options = {
                type: 'POST',
                url: 'index/addalbumrow',
                success: function () {
                    reloadTable(AlbumTable);
                    $('#AlbumModal').modal('hide');
                }
            };

            if ($('#addAlbumForm').valid()) {
                $('#addAlbumForm').ajaxSubmit(options);
            }


        } else {
            var options = {
                type: 'POST',
                url: 'index/editalbumrow',
                success: function () {
                    reloadTable(AlbumTable);
                    $('#AlbumModal').modal('hide');
                }
            };


            if ($('#editAlbumForm').valid()) {
                $('#editAlbumForm').ajaxSubmit(options);
            }


        }


    });

    $(document).on('click', '.view-album-btn', function () {

        var id = $(this).data('id');

        var actionName = $(this).data('name');

        $.ajax({
            url: "index/musictable/id/" + id,
            success: function (data) {
                $('.modal-body').html(data);
                fetchMusicData(id);
                $('.modal-title').text(actionName + ' album');
                $('#AlbumModal').modal('show');

            }
        });


    });

    $(document).on('click', '#add-music-btn', function () {

        var id = $(this).data('album_id');
        var actionName = $(this).data('name');

        $.ajax({
            url: "index/addmusicform/id/" + id,
            success: function (data) {
                $('#MusicModal .modal-body').html(data);
                $('#MusicModal .modal-title').text(actionName + ' music');
                // $('#Modal').modal('hide');
                $('#MusicModal').modal('show');
                validateMusicAdd();
            }
        });


    });
    $(document).on('click', '.edit-music-btn', function () {

        var id = $(this).data('id');

        var actionName = $(this).data('name');

        $.ajax({
            url: "index/editmusicform/id/" + id,
            success: function (data) {
                $('#MusicModal .modal-body').html(data);
                $('#MusicModal .modal-title').text(actionName + ' music');
                $('#MusicModal').modal('show');
                validateMusicEdit();
            }
        });


    });
    $(document).on('click', '#submit-music-btn', function () {
        var MusicTable = $('#MusicTable').DataTable();
        var music_id = $('#editMusicForm #music_id').val();

        if (music_id == undefined) {

            var options = {
                type: 'POST',
                url: "index/addmusicrow",

                success: function () {
                    reloadTable(MusicTable);
                    $('#MusicModal').modal('hide');
                }
            };
            if ($('#addMusicForm').valid()) {
                $('#addMusicForm').ajaxSubmit(options);
            }

        }

        else {

            var options = {
                type: 'POST',
                url: "index/editmusicrow",
                success: function () {
                    reloadTable(MusicTable);
                    $('#MusicModal').modal('hide');
                }
            };
            if ($('#editMusicForm').valid()) {
                $('#editMusicForm').ajaxSubmit(options);
            }

        }


    });
    $(document).on('click', '.delete-music-btn', function () {
        var MusicTable = $('#MusicTable').DataTable();
        var id = $(this).data("id");
        var title = $(this).data("title");
        var dialog = confirm('Are you sure that you want to delete ' + title + ' ?');

        if (dialog) {
            $.ajax({
                url: "index/deletemusic/music_id/" + id,
                success: function () {
                    reloadTable(MusicTable);
                }
            });
        }

    });

    function validateAlbumAdd() {
        $("#addAlbumForm").validate({
            rules: {
                title: {
                    required: true,
                    minlength: 3
                },
                artist: {
                    required: true,
                    minlength: 3
                },

                messages: {
                    title: {
                        required: "Please enter the album title",
                        minlength: "Your album title must consist of at least 2 characters"
                    },
                    artist: {
                        required: "Please enter the artist name",
                        minlength: "Your album artist must consist of at least 2 characters"
                    },
                }
            }
        });

    }

    function validateAlbumEdit() {
        $("#editAlbumForm").validate({
            rules: {
                title: {
                    required: true,
                    minlength: 3
                },
                artist: {
                    required: true,
                    minlength: 3
                },

                messages: {
                    title: {
                        required: "Please enter the album title",
                        minlength: "Your album title must consist of at least 2 characters"
                    },
                    artist: {
                        required: "Please enter the artist name",
                        minlength: "Your album artist must consist of at least 2 characters"
                    },
                }
            }
        });

    }

    $.validator.addMethod("time24", function (value, element) {
        if (!/^\d{2}:\d{2}:\d{2}$/.test(value)) return false;
        var parts = value.split(':');
        if (parts[0] > 23 || parts[1] > 59 || parts[2] > 59) return false;
        return true;
    }, "Invalid time format. hh:mm:ss");

    $.validator.addMethod("price_format", function (value, element) {
        if (!/^\d{2}\.\d{2}$/.test(value)) return this.optional(element) || false;
        var parts = value.split('.');
        if (parts[0] > 99 || parts[1] > 99) return this.optional(element) || false;
        return this.optional(element) || true;
    }, "Invalid price format. --.--");

    $.validator.addMethod("discount_format", function (value, element) {
        if (!/^\d{1}\.\d{2}$/.test(value)) return this.optional(element) || false;
        var parts = value.split('.');
        if (parts[0] > 0 || parts[1] > 99) return this.optional(element) || false;
        return this.optional(element) || true;
    }, "Invalid discount format. -.--");

    $.validator.addMethod("date_format", function (value, element) {
        if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
            var parts = value.split('-');
            if (parts[1] > 12 || parts[2] > 31) {
                return this.optional(element) || false;
            } else {
                return this.optional(element) || true;
            }
        } else {
            return this.optional(element) || false;
        }

    }, "Invalid date format. yyyy-mm-dd");

    $.validator.addMethod("start_date", function (value, element) {
        var current_date = currentDate();
        var current_date_parts = current_date.split('-');
        var current_date_year = current_date_parts[0];
        var current_date_month = current_date_parts[1];
        var current_date_day = current_date_parts[2];

        var start_date = value;
        var start_date_parts = start_date.split('-');
        var start_date_year = start_date_parts[0];
        var start_date_month = start_date_parts[1];
        var start_date_day = start_date_parts[2];


        if (start_date_year < current_date_year) {
            return this.optional(element) || false;

        } else {
            if (start_date_year == current_date_year) {

                if (start_date_month < current_date_month) {
                    return this.optional(element) || false;

                } else {
                    if (start_date_month == current_date_month) {
                        if (start_date_day < current_date_day) {
                            return this.optional(element) || false;
                        } else {
                            return this.optional(element) || true;
                        }
                    }
                    return this.optional(element) || true;

                }
            }
            return this.optional(element) || true;
        }


    }, "you cant use this date ");


    $.validator.addMethod("end_date", function (value, element) {
        var end_date = value;
        var end_date_parts = end_date.split('-');
        var end_date_year = end_date_parts[0];
        var end_date_month = end_date_parts[1];
        var end_date_day = end_date_parts[2];

        var start_date = $("#start_date").val();
        var start_date_parts = start_date.split('-');
        var start_date_year = start_date_parts[0];
        var start_date_month = start_date_parts[1];
        var start_date_day = start_date_parts[2];

        if (start_date_year > end_date_year) {
            return this.optional(element) || false;

        } else {
            if (start_date_year == end_date_year) {

                if (start_date_month > end_date_month) {
                    return this.optional(element) || false;

                } else {
                    if (start_date_month == end_date_month) {
                        if (start_date_day >= end_date_day) {
                            return this.optional(element) || false;
                        } else {
                            return this.optional(element) || true;
                        }
                    }
                    return this.optional(element) || true;

                }
            }
            return this.optional(element) || true;
        }


    }, "End date cant be happen with start date or before");




    // functions
    ///////////////////////////////////////////////////


    //use this to get the current date
    function currentDate() {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return today = yyyy + '-' + mm + '-' + dd;
    }


    //use this to fetch album data and view it
    function fetchAlbumData() {

        $('#AlbumTable').DataTable({
            "processing": true,
            "serverSide": true,
            "columnDefs": [ {
                "targets": 3,
                "orderable": false
            } ],
            "ajax":{
                url : "/index/albumsview",
                type : "post"
            } ,
            "columns": [

                {"data": "title"},
                {"data": "artist"},
                {"data": "categories"},
                {

                    render: function (data, type, row) {

                        return ' <button class="btn btn-danger delete-album-btn" data-name="Delete" data-id="' + row.id + '" data-title="' + row.title + '" ' +
                            'data-artist="' + row.artist + '"><i class="fas fa-trash-alt"></i></button>' +
                            '<button class="btn btn-warning  edit-album-btn" data-name="Edit" data-id="' + row.id + '" data-title="' + row.title + '" ' +
                            'data-artist="' + row.artist + '"><i class="fas fa-edit"></i></button>' +
                            '<button class="btn btn-success  view-album-btn" data-name="View" data-id="' + row.id + '" data-title="' + row.title + '" ' +
                            'data-artist="' + row.artist + '"><i class="fas fa-eye"></i></button>';
                    }
                }
            ],


        });


    }

    //use this to fetch music data and view it in music modal
    function fetchMusicData(id) {
        $('#MusicTable').DataTable({
            "processing": true,
            "serverSide": true,
            "columnDefs": [ {
                "targets": 7,
                "orderable": false
            } ],
            "ajax": {
                url:"/index/musicview/id/" + id,
                type:"post",
            },
            "columns": [

                {"data": "title"},
                {"data": "duration"},
                // to show mp3 in music modal
                /*  {

                      "data": "mp3",
                      render: function (data, type, row) {

                          return ' <audio controls>' +

                              '<source src="http://music.local/mp3/' + data + '" type="audio/mpeg">' +

                              ' </audio> ';
                      }
                  },*/
                {
                    "data": "discount",

                    render: function (data, type, row) {
                        if (data == null) {
                            return 'No discount';
                        } else {

                            return data * 100 + "%";
                        }

                    }
                },

                {
                    // differentiate between start date, end date and current date
                    // and then calculate the remaining of discount to end or the remaining of discount to start
                    render: function (data, type, row) {
                        if (row.start_date != null && row.end_date != null) {
                            var current_date = currentDate();
                            var current_date_parts = current_date.split('-');
                            var current_date_year = current_date_parts[0];
                            var current_date_month = current_date_parts[1];
                            var current_date_day = current_date_parts[2];

                            var start_date = row.start_date;
                            var start_date_parts = start_date.split('-');
                            var start_date_year = start_date_parts[0];
                            var start_date_month = start_date_parts[1];
                            var start_date_day = start_date_parts[2];


                            var end_date = row.end_date;
                            var end_date_parts = end_date.split('-');
                            var end_date_year = end_date_parts[0];
                            var end_date_month = end_date_parts[1];
                            var end_date_day = end_date_parts[2];

                            var years_remaining = end_date_year - current_date_year;
                            var months_remaining = end_date_month - current_date_month;
                            var days_remaining = end_date_day - current_date_day;


                            var years_to_start = start_date_year - current_date_year;
                            var months_to_start = start_date_month - current_date_month;
                            var days_to_start = start_date_day - current_date_day;

                            if (start_date_year == current_date_year &&
                                start_date_month == current_date_month && start_date_day == current_date_day) {


                                var output = 'End in : ';
                                if (years_remaining != 0) {
                                    output += years_remaining + ' years and <br>';
                                }
                                if (months_remaining != 0) {
                                    output += months_remaining + ' months and <br>';
                                }

                                if (days_remaining != 0) {
                                    output += days_remaining + ' days ';
                                }

                                return output;


                            } else if (start_date_year > current_date_year ||
                                start_date_month > current_date_month || start_date_day > current_date_day) {
                                output = 'Start in : ';
                                if (years_to_start != 0 && years_to_start > 0) {
                                    output += years_to_start + ' years and <br>';
                                }
                                if (months_to_start != 0 && months_to_start > 0) {
                                    output += months_to_start + ' months and <br>';
                                }

                                if (days_to_start != 0 && days_to_start > 0) {
                                    output += days_to_start + ' days ';
                                }

                                return output;
                            } else {
                                return '';
                            }


                        } else {
                            return '';
                        }
                    }
                },

                {
                    //render price_jod if there's discount calculate it else return the jod without discount
                    render: function (data, type, row) {
                        var new_price = row.discount * row.price_jod;
                        var discount_price = row.price_jod - new_price;
                        if (row.discount == null) {
                            return row.price_jod;
                        } else {

                            if (row.price_jod == null) {
                                return '';
                            } else {
                                return '<strike>' + row.price_jod + '</strike>'
                                    + '<br>' + discount_price.toFixed(2);
                            }

                        }

                    }
                },
                {
                    //render price_dollar if there's discount calculate it else return the dollar without discount
                    render: function (data, type, row) {
                        var new_price = row.discount * row.price_dollar;
                        var discount_price = row.price_dollar - new_price;
                        if (row.discount == null) {
                            return row.price_dollar;
                        } else {
                            if (row.price_dollar == null) {
                                return '';
                            } else {
                                return '<strike>' + row.price_dollar + '</strike>'
                                    + '<br>' + discount_price.toFixed(2);
                            }

                        }

                    }
                },
                {
                    //render price_euro if there's discount calculate it else return the euro without discount
                    render: function (data, type, row) {
                        var new_price = row.discount * row.price_euro;
                        var discount_price = row.price_euro - new_price;
                        if (row.discount == null) {
                            return row.price_euro;
                        } else {

                            if (row.price_euro == null) {
                                return '';
                            } else {
                                return '<strike>' + row.price_euro + '</strike>'
                                    + '<br>' + discount_price.toFixed(2);
                            }

                        }

                    }
                },
                {


                    render: function (data, type, row) {

                        return ' <button class="btn btn-danger  delete-music-btn" data-name="Delete" data-id="' + row.id + '" data-title="' + row.title + '" ' +
                            'data-duration="' + row.duration + '"><i class="fas fa-trash-alt"></i></button>' +
                            '<button class="btn btn-warning  edit-music-btn" data-name="Edit" data-id="' + row.id + '" data-title="' + row.title + '" ' +
                            'data-duration="' + row.duration + '"><i class="fas fa-edit"></i></button>';

                    }
                }
            ],


        });
    }

    //use this to reload specific table
    function reloadTable(table) {
        table.ajax.reload();
    }


    //validate

    function validateMusicAdd() {
        $("#addMusicForm").validate({
            groups: {
                nameGroup: "dollar jod euro"
            },
            errorPlacement: function (error, element) {
                if (element.attr('id') == 'jod') {
                    error.appendTo('#price_error');
                } else {
                    error.insertAfter(element);
                }

            },
            rules: {
                title: {
                    required: true,
                    minlength: 3
                },
                duration: {
                    required: true,
                    time24: true
                },
                file: {
                    required: true,

                },
                jod: {
                    required: function () {
                        var dollar = $("#dollar").val();
                        var euro = $("#euro").val();
                        if (dollar == "" && euro == "") {
                            return true

                        } else {
                            return false
                        }

                    },
                    price_format: true
                },
                dollar: {
                    required: function () {
                        var jod = $("#jod").val();
                        var euro = $("#euro").val();
                        if (jod == "" && euro == "") {
                            return true
                        } else {
                            return false
                        }

                    },
                    price_format: true
                },
                euro: {
                    required: function () {
                        var jod = $("#jod").val();
                        var dollar = $("#dollar").val();

                        if (jod == "" && dollar == "") {

                            return true
                        } else {
                            return false;

                        }

                    },
                    price_format: true
                },

                discount: {
                    required: function () {
                        var start_date = $("#start_date").val();
                        var end_date = $("#end_date").val();

                        if (start_date != "" || end_date != "") {

                            return true
                        } else {
                            return false;

                        }

                    },

                    discount_format: true
                },

                start_date: {
                    required: function () {
                        var end_date = $("#end_date").val();

                        if (end_date != "") {

                            return true
                        } else {
                            return false;

                        }

                    },
                    date_format: true,
                    start_date: true,
                },

                end_date: {
                    required: function () {
                        var start_date = $("#start_date").val();

                        if (start_date != "") {

                            return true
                        } else {
                            return false;

                        }

                    },
                    date_format: true,
                    start_date: true,
                    end_date: true,
                },


                messages: {
                    title: {
                        required: "Please enter the music title",
                        minlength: "Your music title must consist of at least 2 characters"
                    },
                    duration: {
                        required: "Please enter the duration of music",
                        minlength: "Your album artist must consist of at least 2 characters"
                    },
                    file: {
                        required: "Please select  music ",

                    },
                    jod: {
                        required: "at least one of these fields are required",

                    },
                    dollar: {
                        required: "at least one of these fields are required",

                    },
                    euro: {
                        required: "at least one of these fields are required",

                    },

                }
            }
        });

    }


    function validateMusicEdit() {
        $("#editMusicForm").validate({
            groups: {
                nameGroup: "dollar jod euro"
            },
            errorPlacement: function (error, element) {
                if (element.attr('id') == 'jod' || element.attr('id') == 'dollar' || element.attr('id') == 'euro') {
                    error.appendTo('#price_error');
                } else {
                    error.insertAfter(element);
                }

            },
            rules: {
                title: {
                    required: true,
                    minlength: 3
                },
                duration: {
                    required: true,
                    time24: true
                },

                jod: {
                    required: function () {
                        var dollar = $("#dollar").val();
                        var euro = $("#euro").val();
                        if (dollar == "" && euro == "") {
                            return true
                        } else {
                            return false
                        }

                    }
                },
                dollar: {
                    required: function () {
                        var jod = $("#jod").val();
                        var euro = $("#euro").val();
                        if (jod == "" && euro == "") {
                            return true
                        } else {
                            return false
                        }

                    }
                },
                euro: {
                    required: function () {
                        var jod = $("#jod").val();
                        var dollar = $("#dollar").val();

                        if (jod == "" && dollar == "") {

                            return true
                        } else {
                            return false;

                        }

                    }
                },

                discount: {
                    required: function () {
                        var start_date = $("#start_date").val();
                        var end_date = $("#end_date").val();

                        if (start_date != "" || end_date != "") {

                            return true
                        } else {
                            return false;

                        }

                    },

                    discount_format: true
                },

                start_date: {
                    required: function () {
                        var end_date = $("#end_date").val();

                        if (end_date != "") {

                            return true
                        } else {
                            return false;

                        }

                    },
                    date_format: true,
                    start_date: true,
                },

                end_date: {
                    required: function () {
                        var start_date = $("#start_date").val();

                        if (start_date != "") {

                            return true
                        } else {
                            return false;

                        }

                    },
                    date_format: true,
                    start_date: true,
                    end_date: true,
                },

                messages: {
                    title: {
                        required: "Please enter the music title",
                        minlength: "Your music title must consist of at least 2 characters"
                    },
                    duration: {
                        required: "Please enter the duration of music",
                        minlength: "Your album artist must consist of at least 2 characters"
                    },
                    file: {
                        required: "Please select  music ",

                    },
                    jod: {
                        required: "at least one of these fields are required",

                    },
                    dollar: {
                        required: "at least one of these fields are required",

                    },
                    euro: {
                        required: "at least one of these fields are required",

                    },

                }
            }
        });


    }

});

