'use strict'
angular = require 'angular'
d3 = require 'd3'
app = angular.module 'mainApp', [require 'angular-material']
	.directive 'roadDer',require './components/road/roadDer'
