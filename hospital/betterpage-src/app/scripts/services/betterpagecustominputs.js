'use strict';

/**
 * @ngdoc service
 * @name betterpageApp.betterpageCustomInputs
 * @description
 * # betterpageCustomInputs
 * Value in the betterpageApp.
 */
angular.module('betterpageApp')
.value('betterpageCustomInputs',{
    //text
    no: {type:'text',title: 'Pager', icon:'phone', attr: {'betterpage-no':''}},
    caller: {type:'text',title: 'Name', icon:'user', attr: {'title-case':'','ng-minlength':2}},
    phone: {type:'text',title: 'Phone', icon:'phone-alt', attr:{'ng-pattern':/^[0-9]+$/}},
    within: {type:'text',title: 'within', icon:'time', attr: {'ng-required':'model.data.reply', 'ng-pattern':/^[0-9]+$/,min:1,max:30}},
    patient: {type:'text',title: 'Name', icon:'user', attr: {'title-case':'','ng-minlength':2}},
    nhi: {type:'text',title: 'NHI', icon: 'tag', attr: {'upper-case':'','nhi':''}},
    ward: {type:'text',title: 'Ward', icon:'home', attr: {'upper-case':'','ng-maxlength':3}},
    bed: {type:'text',title: 'Bed', icon:'bed', attr: {'upper-case':'','ng-maxlength':3}},
    details: {type:'text',title: 'Specify (optional)', icon: 'comment', attr: {}},
    contents: {type:'text',title: 'Message', icon:'comment', attr: {}},
    respond:{type:'text',icon:'earphone'},
    //select
    ptpage:{type:'select'},
    why:{type:'select'}
});
