'use strict';

var app = app || {};

app.userViews = (function(){
    function showLoginPage(selector){
        $.get('templates/login.html', function(templ){
            $(selector).html(templ);
            $('#login-sbmt-btn').on('click', function(e){
                var username = $('#login-username').val(),
                    password = $('#login-password').val();
                Sammy(function(){
                    this.trigger('login', {username: username, password: password});
                })
            })
        })
    }

    function showRegisterPage(selector){
        $.get('templates/register.html', function(tmpl){
            var outp = Mustache.render(tmpl);
            $(selector).html(outp);
            $(selector).on('click', '#upload-file-button', function() {
                $('#picture').click();
            });

            // Reads the selected file and returns the data as a base64 encoded string
            $(selector).on('change', '#picture', function() {
                var file = this.files[0],
                    reader;

                if (file.type.match(/image\/.*/)) {
                    reader = new FileReader();
                    reader.onload = function() {
                        //if(file.total <= 131072){
                            $('#uploaded-picture').attr('src','imgs/beer.png');
                        //} else{
                            //noty.showError('#error-message', 'Image size is bigger than 128kb.');
                          //  console.log('Image size is bigger than 128kb.');
                       // }
                    };
                    reader.readAsDataURL(file);
                } else {
                    //noty.showError('#error-message', 'Invalid image file.');
                    console.log('Invalid image file.');
                }
            });

            $('#registerButton').on('click', function(e){
                var data = {
                    username: $('#reg-username').val(),
                    password: $('#reg-password').val(),
                    name: $('#reg-name').val(),
                    about: $('#reg-about').val(),
                    gender: $('input[name=gender-radio]:checked').val(),
                    picture: $('#uploaded-picture').attr('src')
                };

                Sammy(function(){
                    this.trigger('register', data);
                });
            });
        }).done();
    }

    return{
        load: function() {
            return {
                showLoginPage: showLoginPage,
                showRegisterPage: showRegisterPage
            }
        }
    }
}());