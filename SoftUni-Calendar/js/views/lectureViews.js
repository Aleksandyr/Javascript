var app = app || {};

app.lectureViews = (function () {
    function showLectures(selector, data, myLectures) {
        $.get('templates/calendar.html', function (templ) {
            var rendered = Mustache.render(templ, myLectures);
            $(selector).html(rendered);
            $('#calendar').fullCalendar({
                theme: false,
                header: {
                    left: 'prev,next today addEvent',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: '2016-01-12',
                selectable: false,
                editable: false,
                eventLimit: true,
                events: data,
                customButtons: {
                    addEvent: {
                        text: 'Add Event',
                        click: function () {
                            Sammy(function () {
                                this.trigger('redirectUrl', {url:'#/calendar/add/'})
                            })
                        }
                    }
                },
                eventClick: function (calEvent, jsEvent, view) {
                    $.get('templates/modal.html', function (templ) {
                        var rendered = Mustache.render(templ, calEvent);
                        $('#modal-body').html(rendered);
                        $('#editLecture').on('click', function() {
                            Sammy(function(){
                            	console.log(this);
                                this.trigger('redirectUrl', {url:'#/calendar/edit/' + calEvent._id})
                            })
                        });
                        $('#deleteLecture').on('click', function() {
                            Sammy(function(){
                                this.trigger('redirectUrl', {url:'#/calendar/delete/' + calEvent._id})
                            })
                        })
                    });
                    $('#events-modal').modal();
                }
            });
        })
    }

    function showAddLecture(selector) {
        $.get('templates/add-lecture.html', function (templ) {
            $(selector).html(templ);
            $('#addLecture').on('click', function () {
                var title = $('#title').val(),
                    start = new Date($('#start').val()),
                    end = new Date($('#end').val());

                Sammy(function () {
                    this.trigger('addLecture', {title: title, start: start, end: end});
                })
            })
        })
    }

    function showEditLecture(selector, data) {
        $.get('templates/edit-lecture.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('#editLecture').on('click', function() {
                var title = $('#title').val(),
                    start = new Date($('#start').val()),
                    end = new Date($('#end').val()),
                    id = $(this).attr('data-id');

                Sammy(function () {
                    this.trigger('editLecture', {_id:id, title: title, start: start, end: end});
                })
            })
        })
    }

    function showDeleteLecture(selector, data) {
        $.get('templates/delete-lecture.html', function (templ) {
            var rendered = Mustache.render(templ, data);
            $(selector).html(rendered);
            $('#deleteLecture').on('click', function() {
                var id = $(this).attr('data-id');

                Sammy(function () {
                    this.trigger('deleteLecture', {_id:id});
                })
            })
        })
    }

    return {
        load: function () {
            return {
                showLectures: showLectures,
                showAddLecture: showAddLecture,
                showEditLecture: showEditLecture,
                showDeleteLecture: showDeleteLecture
            }
        }
    }
}());