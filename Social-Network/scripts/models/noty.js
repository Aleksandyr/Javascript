'use strict';

var app = app || {};

app.noty = (function(){
    function Noty(){
    }

    Noty.prototype.showError = function(selector, message){
        $(selector).noty({
            text: message,
            type: 'error',
            timeout: 5000,
            buttons: [{
                addClass: 'btn btn-danger',
                text: 'Close',
                onClick: function($noty){
                    $noty.close();
                }
            }]
        });
    };

    Noty.prototype.showSuccess = function(selector, message){
        $(selector).noty({
            text: message,
            type: 'success',
            timeout: 2000
        });
    };

    return{
        load: function(){
            return new Noty();
        }
    }
}());