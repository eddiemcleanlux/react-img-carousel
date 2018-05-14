'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Renders an arrow component used to transition from right-to-left or left-to-right through the carousel slides.
 */
var Arrow = function (_Component) {
  _inherits(Arrow, _Component);

  function Arrow() {
    _classCallCheck(this, Arrow);

    return _possibleConstructorReturn(this, (Arrow.__proto__ || Object.getPrototypeOf(Arrow)).apply(this, arguments));
  }

  _createClass(Arrow, [{
    key: 'hasNext',


    /**
     * @returns {Boolean} True if there is a next slide to transition to, else False.
     */
    value: function hasNext() {
      var _props = this.props,
          direction = _props.direction,
          infinite = _props.infinite,
          numSlides = _props.numSlides,
          selectedIndex = _props.selectedIndex;


      return infinite || (direction === 'left' ? selectedIndex > 0 : selectedIndex < numSlides - 1);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          prevSlide = _props2.prevSlide,
          nextSlide = _props2.nextSlide,
          direction = _props2.direction;


      return _react2.default.createElement('button', {
        disabled: !this.hasNext(),
        onClick: direction === 'left' ? prevSlide : nextSlide,
        className: 'carousel-arrow carousel-' + direction + '-arrow'
      });
    }
  }], [{
    key: 'propTypes',
    get: function get() {
      return {
        numSlides: _propTypes2.default.number.isRequired,
        selectedIndex: _propTypes2.default.number.isRequired,
        infinite: _propTypes2.default.bool.isRequired,
        prevSlide: _propTypes2.default.func.isRequired,
        nextSlide: _propTypes2.default.func.isRequired,
        direction: _propTypes2.default.oneOf(['left', 'right']).isRequired
      };
    }
  }]);

  return Arrow;
}(_react.Component);

exports.default = Arrow;