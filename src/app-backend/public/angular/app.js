"use strict";

angular.module('tlctf.app', [

    'ui.materialize',

    'tlctf.api',
    'tlctf.api.contest-api',
    'tlctf.api.user-api',
    'tlctf.api.question-type-api',

    'tlctf.security',

    'tlctf.login',
    'tlctf.manager-contest',
    'tlctf.manager-user',
    'tlctf.manager-question-type',
    'tlftc.manager-question',

    'tlctf.layout'
])

;
