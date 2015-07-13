S = require '../services/settings'
require '../helpers'
_ = require 'lodash'

class Car
	constructor: (@loc)->
		@vel = S.vel
		@id = _.uniqueId()
	move: (dt)->
		@loc += dt * @vel / 1000

module.exports = Car