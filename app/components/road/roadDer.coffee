'use strict'
_ = require 'lodash'
d3 = require 'd3'
Car = require '../../models/car'
S = require '../../services/settings'

template = '''
	<md-button class='md-raised' ng-click='vm.click()'> Play/Pause  </md-button>
	<svg ng-attr-width='{{vm.hw}}' ng-attr-height='{{vm.hw}}'>
		<g class='main' ng-attr-transform='translate({{vm.hw/2}}, {{vm.hw/2}})'>
			<circle class='road' ng-attr-r='{{vm.r}}' ng-attr-stroke-width='{{vm.mar*2}}'/>
			<g class='g-cars'>
				<g ng-repeat='car in vm.cars track by car.id' class='g-car'>
					<rect class='car' ng-attr-transform='{{vm.loc(car)}}' ng-attr-y='{{vm.r - 4}}' width='20' height='10'/>
				</g>
			</g>
		</g>
	</svg>
'''

class Ctrl
	constructor: (@scope)->
		@r = 200 #radius
		@mar = 20
		@paused = true
		@cars = _.range 0, S.num_cars
			.map (d)->
				loc = d/S.num_cars * S.road_length
				new Car loc

	loc: (car)->
		angle = car.loc / S.road_length * 360
		"rotate(" + angle + ")"

	click:=>
		if @paused then @play() else @pause()

	play: ->
		@pause()
		d3.timer.flush()
		@paused = false
		last = 0
		d3.timer (elapsed) =>
			dt = elapsed - last
			@cars.forEach (car)->
				car.move dt
			last = elapsed
			@scope.$evalAsync()
			@paused

	pause:->
		@paused = true

	@property 'hw', get: -> 2*(@r + @mar)

der = ->
	directive =
		controller: ['$scope', Ctrl]
		controllerAs: 'vm'
		template: template
		scope: {}


module.exports = der
