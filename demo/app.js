angular
    .module('demo', ['angularjs.toolkit'])
    .controller('DemoController', function() {
        this.kitConfig = [
            {view: 'header', title: 'My demo project', fluid: true},
            {rows: [[
                {view: 'col-2'},
                {view: 'col-8', _: [
                    {_: 'My name is Andrey!!! Aloha!'},
                    {view: 'trace'}]},
                {view: 'col-2'}
            ]], fluid: true},
            {view: 'footer', fluid: true, _:
                {_: 'Hi All! <a href="#">root@localhost</a>'}}];
    });