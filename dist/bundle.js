(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var angular, app, d3;

angular = require('angular');

d3 = require('d3');

app = angular.module('mainApp', [require('angular-material')]).directive('roadDer', require('./components/road/roadDer'));



},{"./components/road/roadDer":2,"angular":undefined,"angular-material":undefined,"d3":undefined}],2:[function(require,module,exports){
'use strict';
var Car, Ctrl, S, _, d3, der, template,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

_ = require('lodash');

d3 = require('d3');

Car = require('../../models/car');

S = require('../../services/settings');

template = '<md-button class=\'md-raised\' ng-click=\'vm.click()\'> Play/Pause  </md-button>\n<svg ng-attr-width=\'{{vm.hw}}\' ng-attr-height=\'{{vm.hw}}\'>\n	<g class=\'main\' ng-attr-transform=\'translate({{vm.hw/2}}, {{vm.hw/2}})\'>\n		<circle class=\'road\' ng-attr-r=\'{{vm.r}}\' ng-attr-stroke-width=\'{{vm.mar*2}}\'/>\n		<g class=\'g-cars\'>\n			<g ng-repeat=\'car in vm.cars track by car.id\' class=\'g-car\'>\n				<rect class=\'car\' ng-attr-transform=\'{{vm.loc(car)}}\' ng-attr-y=\'{{vm.r - 4}}\' width=\'20\' height=\'10\'/>\n			</g>\n		</g>\n	</g>\n</svg>';

Ctrl = (function() {
  function Ctrl(scope) {
    this.scope = scope;
    this.click = bind(this.click, this);
    this.r = 200;
    this.mar = 20;
    this.paused = true;
    this.cars = _.range(0, S.num_cars).map(function(d) {
      var loc;
      loc = d / S.num_cars * S.road_length;
      return new Car(loc);
    });
  }

  Ctrl.prototype.loc = function(car) {
    var angle;
    angle = car.loc / S.road_length * 360;
    return "rotate(" + angle + ")";
  };

  Ctrl.prototype.click = function() {
    if (this.paused) {
      return this.play();
    } else {
      return this.pause();
    }
  };

  Ctrl.prototype.play = function() {
    var last;
    this.pause();
    d3.timer.flush();
    this.paused = false;
    last = 0;
    return d3.timer((function(_this) {
      return function(elapsed) {
        var dt;
        dt = elapsed - last;
        _this.cars.forEach(function(car) {
          return car.move(dt);
        });
        last = elapsed;
        _this.scope.$evalAsync();
        return _this.paused;
      };
    })(this));
  };

  Ctrl.prototype.pause = function() {
    return this.paused = true;
  };

  Ctrl.property('hw', {
    get: function() {
      return 2 * (this.r + this.mar);
    }
  });

  return Ctrl;

})();

der = function() {
  var directive;
  return directive = {
    controller: ['$scope', Ctrl],
    controllerAs: 'vm',
    template: template,
    scope: {}
  };
};

module.exports = der;



},{"../../models/car":4,"../../services/settings":5,"d3":undefined,"lodash":undefined}],3:[function(require,module,exports){
'use strict';
module.exports.timeout = function(fun, time) {
  return d3.timer((function(_this) {
    return function() {
      fun();
      return true;
    };
  })(this), time);
};

Function.prototype.property = function(prop, desc) {
  return Object.defineProperty(this.prototype, prop, desc);
};



},{}],4:[function(require,module,exports){
var Car, S, _;

S = require('../services/settings');

require('../helpers');

_ = require('lodash');

Car = (function() {
  function Car(loc) {
    this.loc = loc;
    this.vel = S.vel;
    this.id = _.uniqueId();
  }

  Car.prototype.move = function(dt) {
    return this.loc += dt * this.vel / 1000;
  };

  return Car;

})();

module.exports = Car;



},{"../helpers":3,"../services/settings":5,"lodash":undefined}],5:[function(require,module,exports){
var S;

S = {
  num_cars: 20,
  road_length: 100,
  vel: 10
};

module.exports = S;



},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvdmlkZW8vYXBwL2FwcC5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvdmlkZW8vYXBwL2NvbXBvbmVudHMvcm9hZC9yb2FkRGVyLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC92aWRlby9hcHAvaGVscGVycy5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvdmlkZW8vYXBwL21vZGVscy9jYXIuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3ZpZGVvL2FwcC9zZXJ2aWNlcy9zZXR0aW5ncy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUFBLElBQUE7O0FBQ0EsT0FBQSxHQUFVLE9BQUEsQ0FBUSxTQUFSOztBQUNWLEVBQUEsR0FBSyxPQUFBLENBQVEsSUFBUjs7QUFDTCxHQUFBLEdBQU0sT0FBTyxDQUFDLE1BQVIsQ0FBZSxTQUFmLEVBQTBCLENBQUMsT0FBQSxDQUFRLGtCQUFSLENBQUQsQ0FBMUIsQ0FDTCxDQUFDLFNBREksQ0FDTSxTQUROLEVBQ2dCLE9BQUEsQ0FBUSwyQkFBUixDQURoQjs7Ozs7QUNITjtBQUFBLElBQUEsa0NBQUE7RUFBQTs7QUFDQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVI7O0FBQ0osRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSOztBQUNMLEdBQUEsR0FBTSxPQUFBLENBQVEsa0JBQVI7O0FBQ04sQ0FBQSxHQUFJLE9BQUEsQ0FBUSx5QkFBUjs7QUFFSixRQUFBLEdBQVc7O0FBY0w7RUFDUSxjQUFDLEtBQUQ7SUFBQyxJQUFDLENBQUEsUUFBRDs7SUFDYixJQUFDLENBQUEsQ0FBRCxHQUFLO0lBQ0wsSUFBQyxDQUFBLEdBQUQsR0FBTztJQUNQLElBQUMsQ0FBQSxNQUFELEdBQVU7SUFDVixJQUFDLENBQUEs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QyxDQUFBLEdBQUQsSUFBUSxFQUFBLEdBQUssSUFBQyxDQUFBLEdBQU4sR0FBWTtFQURmOzs7Ozs7QUFHUCxNQUFNLENBQUMsT0FBUCxHQUFpQjs7Ozs7QUNYakIsSUFBQTs7QUFBQSxDQUFBLEdBQ0M7RUFBQSxRQUFBLEVBQVUsRUFBVjtFQUNBLFdBQUEsRUFBYSxHQURiO0VBRUEsR0FBQSxFQUFLLEVBRkw7OztBQUlELE1BQU0sQ0FBQyxPQUFQLEdBQWlCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xuYW5ndWxhciA9IHJlcXVpcmUgJ2FuZ3VsYXInXG5kMyA9IHJlcXVpcmUgJ2QzJ1xuYXBwID0gYW5ndWxhci5tb2R1bGUgJ21haW5BcHAnLCBbcmVxdWlyZSAnYW5ndWxhci1tYXRlcmlhbCddXG5cdC5kaXJlY3RpdmUgJ3JvYWREZXInLHJlcXVpcmUgJy4vY29tcG9uZW50cy9yb2FkL3JvYWREZXInXG4iLCIndXNlIHN0cmljdCdcbl8gPSByZXF1aXJlICdsb2Rhc2gnXG5kMyA9IHJlcXVpcmUgJ2QzJ1xuQ2FyID0gcmVxdWlyZSAnLi4vLi4vbW9kZWxzL2NhcidcblMgPSByZXF1aXJlICcuLi8uLi9zZXJ2aWNlcy9zZXR0aW5ncydcblxudGVtcGxhdGUgPSAnJydcblx0PG1kLWJ1dHRvbiBjbGFzcz0nbWQtcmFpc2VkJyBuZy1jbGljaz0ndm0uY2xpY2soKSc+IFBsYXkvUGF1c2UgIDwvbWQtYnV0dG9uPlxuXHQ8c3ZnIG5nLWF0dHItd2lkdGg9J3t7dm0uaHd9fScgbmctYXR0ci1oZWlnaHQ9J3t7dm0uaHd9fSc+XG5cdFx0PGcgY2xhc3M9J21haW4nIG5nLWF0dHItdHJhbnNmb3JtPSd0cmFuc2xhdGUoe3t2bS5ody8yfX0sIHt7dm0uaHcvMn19KSc+XG5cdFx0XHQ8Y2lyY2xlIGNsYXNzPSdyb2FkJyBuZy1hdHRyLXI9J3t7dm0ucn19JyBuZy1hdHRyLXN0cm9rZS13aWR0aD0ne3t2bS5tYXIqMn19Jy8+XG5cdFx0XHQ8ZyBjbGFzcz0nZy1jYXJzJz5cblx0XHRcdFx0PGcgbmctcmVwZWF0PSdjYXIgaW4gdm0uY2FycyB0cmFjayBieSBjYXIuaWQnIGNsYXNzPSdnLWNhcic+XG5cdFx0XHRcdFx0PHJlY3QgY2xhc3M9J2NhcicgbmctYXR0ci10cmFuc2Zvcm09J3t7dm0ubG9jKGNhcil9fScgbmctYXR0ci15PSd7e3ZtLnIgLSA0fX0nIHdpZHRoPScyMCcgaGVpZ2h0PScxMCcvPlxuXHRcdFx0XHQ8L2c+XG5cdFx0XHQ8L2c+XG5cdFx0PC9nPlxuXHQ8L3N2Zz5cbicnJ1xuXG5jbGFzcyBDdHJsXG5cdGNvbnN0cnVjdG9yOiAoQHNjb3BlKS0+XG5cdFx0QHIgPSAyMDAgI3JhZGl1c1xuXHRcdEBtYXIgPSAyMFxuXHRcdEBwYXVzZWQgPSB0cnVlXG5cdFx0QGNhcnMgPSBfLnJhbmdlIDAsIFMubnVtX2NhcnNcblx0XHRcdC5tYXAgKGQpLT5cblx0XHRcdFx0bG9jID0gZC9TLm51bV9jYXJzICogUy5yb2FkX2xlbmd0aFxuXHRcdFx0XHRuZXcgQ2FyIGxvY1xuXG5cdGxvYzogKGNhciktPlxuXHRcdGFuZ2xlID0gY2FyLmxvYyAvIFMucm9hZF9sZW5ndGggKiAzNjBcblx0XHRcInJvdGF0ZShcIiArIGFuZ2xlICsgXCIpXCJcblxuXHRjbGljazo9PlxuXHRcdGlmIEBwYXVzZWQgdGhlbiBAcGxheSgpIGVsc2UgQHBhdXNlKClcblxuXHRwbGF5OiAtPlxuXHRcdEBwYXVzZSgpXG5cdFx0ZDMudGltZXIuZmx1c2goKVxuXHRcdEBwYXVzZWQgPSBmYWxzZVxuXHRcdGxhc3QgPSAwXG5cdFx0ZDMudGltZXIgKGVsYXBzZWQpID0+XG5cdFx0XHRkdCA9IGVsYXBzZWQgLSBsYXN0XG5cdFx0XHRAY2Fycy5mb3JFYWNoIChjYXIpLT5cblx0XHRcdFx0Y2FyLm1vdmUgZHRcblx0XHRcdGxhc3QgPSBlbGFwc2VkXG5cdFx0XHRAc2NvcGUuJGV2YWxBc3luYygpXG5cdFx0XHRAcGF1c2VkXG5cblx0cGF1c2U6LT5cblx0XHRAcGF1c2VkID0gdHJ1ZVxuXG5cdEBwcm9wZXJ0eSAnaHcnLCBnZXQ6IC0+IDIqKEByICsgQG1hcilcblxuZGVyID0gLT5cblx0ZGlyZWN0aXZlID1cblx0XHRjb250cm9sbGVyOiBbJyRzY29wZScsIEN0cmxdXG5cdFx0Y29udHJvbGxlckFzOiAndm0nXG5cdFx0dGVtcGxhdGU6IHRlbXBsYXRlXG5cdFx0c2NvcGU6IHt9XG5cblxubW9kdWxlLmV4cG9ydHMgPSBkZXJcbiIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cy50aW1lb3V0ID0gKGZ1biwgdGltZSktPlxuXHRcdGQzLnRpbWVyKCgpPT5cblx0XHRcdGZ1bigpXG5cdFx0XHR0cnVlXG5cdFx0LHRpbWUpXG5cblxuRnVuY3Rpb246OnByb3BlcnR5ID0gKHByb3AsIGRlc2MpIC0+XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBAcHJvdG90eXBlLCBwcm9wLCBkZXNjIiwiUyA9IHJlcXVpcmUgJy4uL3NlcnZpY2VzL3NldHRpbmdzJ1xucmVxdWlyZSAnLi4vaGVscGVycydcbl8gPSByZXF1aXJlICdsb2Rhc2gnXG5cbmNsYXNzIENhclxuXHRjb25zdHJ1Y3RvcjogKEBsb2MpLT5cblx0XHRAdmVsID0gUy52ZWxcblx0XHRAaWQgPSBfLnVuaXF1ZUlkKClcblx0bW92ZTogKGR0KS0+XG5cdFx0QGxvYyArPSBkdCAqIEB2ZWwgLyAxMDAwXG5cbm1vZHVsZS5leHBvcnRzID0gQ2FyIiwiUyA9IFxuXHRudW1fY2FyczogMjBcblx0cm9hZF9sZW5ndGg6IDEwMFxuXHR2ZWw6IDEwXG5cbm1vZHVsZS5leHBvcnRzID0gUyJdfQ==
