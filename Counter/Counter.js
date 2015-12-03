'use strict';

var Counter = (function() {

    function Counter() {
        if (!(this instanceof Counter)) {
            return new Counter();
        }

        this.timer = null;
        this.counter = 0;
        this.input = null;
        this.startButton = null;
        this.stopButton = null;
        this.div = null;

        return this;
    }

    Counter.prototype.init = function () {
        if(this.div !== null){
            return false;
        }

        this.div = document.createElement('div');
        this.div.addEventListener('click', this.handler.bind(this));

        this.input = document.createElement('input');
        this.input.setAttribute('type', 'text');
        this.input.setAttribute('value', this.counter);

        this.div.appendChild(this.input);

        this.startButton = document.createElement('button');
        this.startButton.innerHTML = 'Start';

        this. div.appendChild(this.startButton);

        this.stopButton = document.createElement('button');
        this.stopButton.innerHTML = 'Stop';

        this.div.appendChild(this.stopButton);

        this.getElement.call(this, 'wrapper').appendChild(this.div);

        return true;
    };

    Counter.prototype.getElement = function (id) {
        return document.getElementById(id);
    };

    Counter.prototype.getValue = function (element) {
        return element.value;
    };

    Counter.prototype.setValue = function (elem, value) {
        return elem.value = value;
    };

    Counter.prototype.sumValues = function (a, b) {
        return a + b;
    };

    Counter.prototype.incrementValue = function () {
        this.counter = this.sumValues.call(this, this.counter, 1);
        return this.setValue.call(this, this.input, this.counter);
    };

    Counter.prototype.start = function () {
        if(this.input === null){
            return false;
        }

        if (this.timer === null) {
            this.timer = setInterval(this.incrementValue.bind(this), 1000);

            return true;
        }

        return true;
    };

    Counter.prototype.stop = function () {
        if(this.timer !== null){
            clearInterval(this.timer);
            this.timer = null;

            return true;
        }

        return false;
    };

    Counter.prototype.handler = function(e){
        if(e.target.innerText.toLocaleLowerCase() === 'start'){
            this.start();

            return true;
        }

        if(e.target.innerText.toLocaleLowerCase() === 'stop'){
            this.stop();

            return true;
        }

        return false;
    };

    return Counter;
})();


var a = new Counter();
var b = new Counter();

a.init();
b.init();

//a.start(); //Click start
//a.stop(); //Click stop

