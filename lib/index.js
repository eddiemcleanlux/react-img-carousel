'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash.nth');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.merge');

var _lodash4 = _interopRequireDefault(_lodash3);

var _lodash5 = require('lodash.inrange');

var _lodash6 = _interopRequireDefault(_lodash5);

var _ms = require('ms');

var _ms2 = _interopRequireDefault(_ms);

var _classAutobind = require('class-autobind');

var _classAutobind2 = _interopRequireDefault(_classAutobind);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _controls = require('./controls');

var _areChildImagesEqual = require('./utils/areChildImagesEqual');

var _areChildImagesEqual2 = _interopRequireDefault(_areChildImagesEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SELECTED_CLASS = 'carousel-slide-selected';

/**
 * React component class that renders a carousel, which can contain images or other content.
 *
 * @extends React.Component
 */

var Carousel = function (_Component) {
  _inherits(Carousel, _Component);

  _createClass(Carousel, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        initialSlide: _propTypes2.default.number,
        className: _propTypes2.default.string,
        transition: _propTypes2.default.oneOf(['slide', 'fade']),
        dots: _propTypes2.default.bool,
        arrows: _propTypes2.default.bool,
        infinite: _propTypes2.default.bool,
        children: _propTypes2.default.any,
        viewportWidth: _propTypes2.default.string,
        viewportHeight: _propTypes2.default.string,
        width: _propTypes2.default.string,
        height: _propTypes2.default.string,
        imagesToPrefetch: _propTypes2.default.number,
        cellPadding: _propTypes2.default.number,
        slideWidth: _propTypes2.default.string,
        slideHeight: _propTypes2.default.string,
        onTouchStart: _propTypes2.default.func,
        onMouseDown: _propTypes2.default.func,
        slideClick: _propTypes2.default.func,
        changing: _propTypes2.default.func,
        beforeChange: _propTypes2.default.func,
        afterChange: _propTypes2.default.func,
        transitionDuration: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
        autoplay: _propTypes2.default.bool,
        autoplaySpeed: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
        lazyLoad: _propTypes2.default.bool,
        controls: _propTypes2.default.arrayOf(_propTypes2.default.shape({
          component: _propTypes2.default.func.isRequired,
          props: _propTypes2.default.object,
          position: _propTypes2.default.oneOf(['top', 'bottom'])
        })),
        draggable: _propTypes2.default.bool,
        pauseOnHover: _propTypes2.default.bool,
        clickToNavigate: _propTypes2.default.bool,
        dragThreshold: _propTypes2.default.number,
        easing: _propTypes2.default.oneOf(['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out']),
        style: _propTypes2.default.shape({
          container: _propTypes2.default.object,
          containerInner: _propTypes2.default.object,
          viewport: _propTypes2.default.object,
          track: _propTypes2.default.object,
          slide: _propTypes2.default.object,
          selectedSlide: _propTypes2.default.object
        })
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        initialSlide: 0,
        dots: true,
        arrows: true,
        infinite: true,
        viewportWidth: '100%',
        width: '100%',
        height: 'auto',
        imagesToPrefetch: 5,
        cellPadding: 0,
        transitionDuration: 500,
        autoplay: false,
        autoplaySpeed: 4000,
        lazyLoad: true,
        controls: [],
        draggable: true,
        pauseOnHover: true,
        transition: 'slide',
        dragThreshold: 0.2,
        clickToNavigate: true,
        easing: 'ease-in-out',
        style: {}
      };
    }
  }]);

  function Carousel(props) {
    _classCallCheck(this, Carousel);

    var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).apply(this, arguments));

    _this.state = {
      currentSlide: props.initialSlide,
      loading: props.lazyLoad,
      loadedImages: {},
      slideDimensions: {},
      dragOffset: 0,
      transitionDuration: 0,
      transitioningFrom: null,
      leftOffset: 0
    };
    (0, _classAutobind2.default)(_this);
    return _this;
  }

  _createClass(Carousel, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      var currentSlide = this.state.currentSlide;

      var numChildren = _react.Children.count(newProps.children);

      if (currentSlide >= numChildren) {
        // The currentSlide index is no longer valid, so move to the last valid index
        this.setState({
          currentSlide: numChildren ? numChildren - 1 : 0
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _props = this.props,
          children = _props.children,
          autoplay = _props.autoplay,
          slideWidth = _props.slideWidth,
          changing = _props.changing;
      var _state = this.state,
          currentSlide = _state.currentSlide,
          loadedImages = _state.loadedImages,
          direction = _state.direction,
          loading = _state.loading;

      var oldChildren = prevProps.children;

      if (direction !== prevState.direction || currentSlide !== prevState.currentSlide || loadedImages !== prevState.loadedImages || slideWidth !== prevProps.slideWidth) {
        // Whenever new images are loaded, the current slide index changes, the transition direction changes, or the
        // slide width changes, we need to recalculate the left offset positioning of the slides.
        this.calcLeftOffset();
        changing && changing({ currentSlide: currentSlide, direction: direction });
      }

      if (!(0, _areChildImagesEqual2.default)(_react.Children.toArray(children), _react.Children.toArray(oldChildren))) {
        // If the image source or number of images changed, we need to refetch images and force an update
        this._animating = false;
        this.fetchImages();
      }

      if (autoplay && (!loading && prevState.loading || !prevProps.autoplay)) {
        this.startAutoplay();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props2 = this.props,
          lazyLoad = _props2.lazyLoad,
          autoplay = _props2.autoplay;

      this._isMounted = true;

      if (lazyLoad) {
        this.fetchImages();
      } else if (autoplay) {
        this.startAutoplay();
      }

      this.calcLeftOffset();
      window.addEventListener('resize', this.calcLeftOffset, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.calcLeftOffset, false);
      clearTimeout(this._autoplayTimer);
      this._isMounted = false;
    }

    /**
     * Starts the autoplay timer if it is not already running.
     */

  }, {
    key: 'startAutoplay',
    value: function startAutoplay() {
      var _this2 = this;

      clearTimeout(this._autoplayTimer);
      this._autoplayTimer = setTimeout(function () {
        var autoplay = _this2.props.autoplay;

        if (autoplay) {
          _this2.nextSlide();
        }
      }, (0, _ms2.default)('' + this.props.autoplaySpeed));
    }

    /**
     * Loads images surrounding the specified slide index. The number of images fetched is controlled by the
     * imagesToPrefetch prop.
     */

  }, {
    key: 'fetchImages',
    value: function fetchImages() {
      var _this3 = this;

      var children = this.props.children;
      var _state2 = this.state,
          loadedImages = _state2.loadedImages,
          currentSlide = _state2.currentSlide,
          loading = _state2.loading;

      var slides = _react.Children.toArray(children);
      var imagesToPrefetch = Math.min(this.props.imagesToPrefetch, slides.length);
      var startIndex = currentSlide - Math.floor(imagesToPrefetch / 2);
      var endIndex = startIndex + imagesToPrefetch;
      var pendingImages = [];

      for (var index = startIndex; index < endIndex; index++) {
        var slide = (0, _lodash2.default)(slides, index % slides.length);
        var imageSrc = slide.props.src;
        if (imageSrc && !loadedImages[imageSrc]) {
          pendingImages.push(imageSrc);
        }
      }

      if (pendingImages.length) {
        pendingImages.forEach(function (image) {
          var img = new Image();
          img.onload = img.onerror = function () {
            if (_this3._isMounted) {
              _this3.setState({
                loadedImages: (0, _lodash4.default)({}, _this3.state.loadedImages, _defineProperty({}, image, { width: img.width || 'auto', height: img.height || 'auto' }))
              });
            }
          };
          img.src = image;
        });
      } else if (loading) {
        this.setState({
          loading: false
        });
      }
    }

    /**
     * Invoked when the carousel is using lazy loading and the currently selected slide's image is first rendered. This
     * method will clear the loading state causing the carousel to render and will calculate the dimensions of the
     * displayed slide to use as a loading shim if an explicit width/height were not specified.
     */

  }, {
    key: 'handleInitialLoad',
    value: function handleInitialLoad() {
      var currentSlide = this.state.currentSlide;
      var _props3 = this.props,
          slideWidth = _props3.slideWidth,
          slideHeight = _props3.slideHeight;

      var slides = this._track.childNodes;
      var newState = {
        loading: false
      };

      if (!slideWidth || !slideHeight) {
        for (var i = 0; i < slides.length; i++) {
          var slide = slides[i];
          if (parseInt(slide.getAttribute('data-index'), 10) === currentSlide) {
            newState.slideDimensions = {
              width: slide.offsetWidth,
              height: slide.offsetHeight
            };
            break;
          }
        }
      }

      this.setState(newState);
    }

    /**
     * Navigates to the specified slide index, moving in the specified direction.
     *
     * @param {Number} index - The slide index to move to.
     * @param {String} direction - The direction to transition, should be 'right' or 'left'.
     */

  }, {
    key: 'goToSlide',
    value: function goToSlide(index, direction) {
      var _this4 = this;

      var _props4 = this.props,
          beforeChange = _props4.beforeChange,
          transitionDuration = _props4.transitionDuration,
          transition = _props4.transition;
      var currentSlide = this.state.currentSlide;

      if (currentSlide === index) {
        return;
      }

      if (this._animating) {
        return;
      }

      this._animating = true;

      beforeChange && beforeChange(index, currentSlide);
      this.setState({
        transitionDuration: transitionDuration
      }, function () {
        _this4.setState({
          currentSlide: index,
          direction: direction,
          transitioningFrom: currentSlide
        }, function () {
          if (!transitionDuration || transition === 'fade') {
            // We don't actually animate if transitionDuration is 0, so immediately call the transition end callback
            _this4.slideTransitionEnd();
          }
        });
      });
    }

    /**
     * Transitions to the next slide moving from left to right.
     */

  }, {
    key: 'nextSlide',
    value: function nextSlide() {
      var children = this.props.children;
      var currentSlide = this.state.currentSlide;

      var newIndex = currentSlide < _react.Children.count(children) - 1 ? currentSlide + 1 : 0;
      this.goToSlide(newIndex, 'right');
    }

    /**
     * Transitions to the previous slide moving from right to left.
     */

  }, {
    key: 'prevSlide',
    value: function prevSlide() {
      var children = this.props.children;
      var currentSlide = this.state.currentSlide;

      var newIndex = currentSlide > 0 ? currentSlide - 1 : _react.Children.count(children) - 1;
      this.goToSlide(newIndex, 'left');
    }

    /**
     * Invoked whenever a slide transition (CSS) completes.
     *
     * @param {Object} e Event object
     */

  }, {
    key: 'slideTransitionEnd',
    value: function slideTransitionEnd(e) {
      var _this5 = this;

      var currentSlide = this.state.currentSlide;
      var afterChange = this.props.afterChange;


      if (!e || e.propertyName === 'transform') {
        this._animating = false;

        this.setState({
          direction: null,
          transitioningFrom: null,
          transitionDuration: 0
        }, function () {
          if (!_this5._allImagesLoaded) {
            _this5.fetchImages();
          }
        });

        if (this.props.autoplay) {
          this.startAutoplay();
        }

        afterChange && afterChange(currentSlide);
      }
    }

    /**
     * @returns {Array} Controls to be rendered with the carousel.
     */

  }, {
    key: 'getControls',
    value: function getControls() {
      var _props5 = this.props,
          arrows = _props5.arrows,
          dots = _props5.dots,
          controls = _props5.controls;

      var arr = controls.slice(0);

      if (dots) {
        arr.push({ component: _controls.Dots });
      }

      if (arrows) {
        arr = arr.concat([{ component: _controls.Arrow, props: { direction: 'left' } }, { component: _controls.Arrow, props: { direction: 'right' } }]);
      }

      return arr;
    }

    /**
     * Renders the carousel.
     *
     * @returns {Object} Component to be rendered.
     */

  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _props6 = this.props,
          className = _props6.className,
          viewportWidth = _props6.viewportWidth,
          viewportHeight = _props6.viewportHeight,
          width = _props6.width,
          height = _props6.height,
          dots = _props6.dots,
          infinite = _props6.infinite,
          children = _props6.children,
          slideHeight = _props6.slideHeight,
          transition = _props6.transition,
          style = _props6.style,
          draggable = _props6.draggable,
          easing = _props6.easing;
      var _state3 = this.state,
          loading = _state3.loading,
          transitionDuration = _state3.transitionDuration,
          dragOffset = _state3.dragOffset,
          currentSlide = _state3.currentSlide,
          leftOffset = _state3.leftOffset;

      var numSlides = _react.Children.count(children);
      var classes = (0, _classnames3.default)('carousel', className, {
        loaded: !loading
      });
      var containerStyle = (0, _lodash4.default)({}, style.container || {}, {
        width: width,
        height: height
      });
      var innerContainerStyle = (0, _lodash4.default)({}, style.containerInner || {}, {
        width: width,
        height: height,
        marginBottom: dots ? '20px' : 0
      });
      var viewportStyle = (0, _lodash4.default)({}, style.viewport || {}, {
        width: viewportWidth,
        height: viewportHeight || slideHeight || 'auto'
      });
      var trackStyle = style.track || {};
      if (transition !== 'fade') {
        var leftPos = leftOffset + dragOffset;
        trackStyle = (0, _lodash4.default)({}, trackStyle, {
          transform: 'translateX(' + leftPos + 'px)',
          transition: transitionDuration ? 'transform ' + (0, _ms2.default)('' + transitionDuration) + 'ms ' + easing : 'none'
        });
      }
      if (!draggable) {
        trackStyle.touchAction = 'auto';
      }
      var controls = this.getControls();

      return _react2.default.createElement(
        'div',
        { className: classes, style: containerStyle },
        _react2.default.createElement(
          'div',
          { className: 'carousel-container-inner', style: innerContainerStyle },
          controls.filter(function (Control) {
            return Control.position === 'top';
          }).map(function (Control, index) {
            return _react2.default.createElement(Control.component, _extends({}, Control.props, {
              key: 'control-' + index,
              selectedIndex: currentSlide,
              numSlides: numSlides,
              nextSlide: _this6.nextSlide,
              prevSlide: _this6.prevSlide,
              goToSlide: _this6.goToSlide,
              infinite: infinite }));
          }),
          _react2.default.createElement(
            'div',
            { className: 'carousel-viewport', ref: function ref(v) {
                _this6._viewport = v;
              }, style: viewportStyle },
            _react2.default.createElement(
              'ul',
              {
                className: 'carousel-track',
                style: trackStyle,
                ref: function ref(t) {
                  _this6._track = t;
                },
                onTransitionEnd: this.slideTransitionEnd,
                onMouseDown: this.onMouseDown,
                onMouseLeave: this.onMouseLeave,
                onMouseOver: this.onMouseOver,
                onMouseEnter: this.onMouseEnter,
                onTouchStart: this.onTouchStart
              },
              this.renderSlides()
            )
          ),
          controls.filter(function (Control) {
            return Control.position !== 'top';
          }).map(function (Control, index) {
            return _react2.default.createElement(Control.component, _extends({}, Control.props, {
              key: 'control-' + index,
              selectedIndex: currentSlide,
              numSlides: numSlides,
              nextSlide: _this6.nextSlide,
              prevSlide: _this6.prevSlide,
              goToSlide: _this6.goToSlide,
              infinite: infinite }));
          })
        )
      );
    }

    /**
     * Renders the slides within the carousel viewport.
     *
     * @returns {Array} Array of slide components to be rendered.
     */

  }, {
    key: 'renderSlides',
    value: function renderSlides() {
      var _this7 = this;

      var _props7 = this.props,
          children = _props7.children,
          infinite = _props7.infinite,
          cellPadding = _props7.cellPadding,
          slideWidth = _props7.slideWidth,
          slideHeight = _props7.slideHeight,
          transition = _props7.transition,
          transitionDuration = _props7.transitionDuration,
          style = _props7.style,
          easing = _props7.easing;
      var _state4 = this.state,
          slideDimensions = _state4.slideDimensions,
          currentSlide = _state4.currentSlide,
          loading = _state4.loading,
          loadedImages = _state4.loadedImages;

      this._allImagesLoaded = true;
      var childrenToRender = _react.Children.map(children, function (child, index) {
        var _classnames;

        var key = 'slide-' + index;
        var imgSrc = child.props.src;
        var slideClasses = (0, _classnames3.default)('carousel-slide', (_classnames = {}, _defineProperty(_classnames, SELECTED_CLASS, index === currentSlide), _defineProperty(_classnames, 'carousel-slide-fade', transition === 'fade'), _classnames));
        var slideStyle = {
          marginLeft: cellPadding + 'px',
          height: slideHeight,
          width: slideWidth
        };

        if (transition === 'fade') {
          slideStyle.transition = 'opacity ' + (0, _ms2.default)('' + transitionDuration) + 'ms ' + easing;
        }

        if (slideHeight) {
          slideStyle.overflowY = 'hidden';
          slideStyle.minHeight = slideHeight; // Safari 9 bug
        }

        if (slideWidth) {
          slideStyle.overflowX = 'hidden';
          slideStyle.minWidth = slideWidth; // Safari 9 bug
        }

        slideStyle = (0, _lodash4.default)({}, slideStyle, style.slide || {}, index === currentSlide ? style.selectedSlide || {} : {});

        var loadingSlideStyle = (0, _lodash4.default)({}, slideStyle || {}, {
          marginLeft: slideStyle.marginLeft,
          width: slideWidth || slideDimensions.width,
          height: slideHeight || slideDimensions.height
        });

        if (_this7.shouldRenderSlide(child, index)) {
          // If the slide contains an image, set explicit width/height and add load listener
          if (imgSrc && loadedImages[imgSrc]) {
            if (index === currentSlide && loading) {
              child = (0, _react.cloneElement)(child, { onLoad: _this7.handleInitialLoad });
            }
            var _loadedImages$imgSrc = loadedImages[imgSrc],
                width = _loadedImages$imgSrc.width,
                height = _loadedImages$imgSrc.height;

            slideStyle.height = slideStyle.height || height;
            slideStyle.width = slideStyle.width || width;
          }

          return _react2.default.createElement(
            'li',
            {
              key: key,
              style: slideStyle,
              'data-index': index,
              className: slideClasses,
              onClick: _this7.handleSlideClick
            },
            child
          );
        }

        if (imgSrc) {
          _this7._allImagesLoaded = false;
        }

        return _react2.default.createElement('li', {
          key: key,
          style: loadingSlideStyle,
          'data-index': index,
          className: (0, _classnames3.default)(slideClasses, 'carousel-slide-loading')
        });
      });

      if (infinite && transition !== 'fade') {
        // For infinite mode, create 2 clones on each side of the track
        childrenToRender = this.addClones(childrenToRender);
      }

      return childrenToRender;
    }

    /**
     * If lazy loading is enabled, this method attempts to determine whether the given slide index should be rendered.
     * For img slides with src attributes, we render the slides only if the image has been fetched. For non-img slides,
     * we attempt to determine whether the slide content should be rendered based on the currentSlide index and the
     * transitioningFrom slide index, if set, to provide the best balance between showing the slides as they transition
     * and keeping the DOM light if there are many slides in the carousel.
     *
     * @param {Object} slide The slide component to check.
     * @param {Number} index The index of the specified slide component.
     * @returns {Boolean} True if the slide should be rendered, else False.
     */

  }, {
    key: 'shouldRenderSlide',
    value: function shouldRenderSlide(slide, index) {
      var _state5 = this.state,
          currentSlide = _state5.currentSlide,
          loadedImages = _state5.loadedImages,
          transitioningFrom = _state5.transitioningFrom;
      var _props8 = this.props,
          lazyLoad = _props8.lazyLoad,
          children = _props8.children,
          infinite = _props8.infinite;

      var numSlides = _react.Children.count(children);
      var imgSrc = slide.props.src;

      if (!lazyLoad) {
        return true;
      }

      if (imgSrc) {
        return !!loadedImages[imgSrc];
      }

      // Render at least 5 slides centered around the current slide, or the slide we just transitioned from
      if ((0, _lodash6.default)(index, currentSlide - 2, currentSlide + 3) || transitioningFrom !== null && (0, _lodash6.default)(index, transitioningFrom - 2, transitioningFrom + 3)) {
        return true;
      } else if (infinite) {
        // In infinite mode, we also want to render the adjacent slides if we're at the beginning or the end
        if (currentSlide <= 1 && index >= numSlides - 2 || currentSlide >= numSlides - 2 && index <= 1 || transitioningFrom !== null && (transitioningFrom <= 1 && index >= numSlides - 2 || transitioningFrom >= numSlides - 2 && index <= 1)) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: 'addClones',
    value: function addClones(originals) {
      var numOriginals = originals.length;
      var originalsToClone = [(0, _lodash2.default)(originals, numOriginals - 2), (0, _lodash2.default)(originals, numOriginals - 1), (0, _lodash2.default)(originals, 0), (0, _lodash2.default)(originals, Math.min(1, numOriginals - 1))];
      var prependClones = [(0, _react.cloneElement)(originalsToClone[0], {
        'key': 'clone-1',
        'data-index': -2,
        'className': originalsToClone[0].props.className.replace(SELECTED_CLASS, '')
      }), (0, _react.cloneElement)(originalsToClone[1], {
        'key': 'clone-0',
        'data-index': -1,
        'className': originalsToClone[1].props.className.replace(SELECTED_CLASS, '')
      })];
      var appendClones = [(0, _react.cloneElement)(originalsToClone[2], {
        'key': 'clone-2',
        'data-index': numOriginals,
        'className': originalsToClone[2].props.className.replace(SELECTED_CLASS, '')
      }), (0, _react.cloneElement)(originalsToClone[3], {
        'key': 'clone-3',
        'data-index': numOriginals + 1,
        'className': originalsToClone[3].props.className.replace(SELECTED_CLASS, '')
      })];

      return prependClones.concat(originals).concat(appendClones);
    }

    /**
     * Updates the component state with the correct left offset position so that the slides will be positioned correctly.
     */

  }, {
    key: 'calcLeftOffset',
    value: function calcLeftOffset() {
      var _state6 = this.state,
          loading = _state6.loading,
          direction = _state6.direction;


      if (loading || !this._track || !this._viewport) {
        clearTimeout(this._retryTimer);
        if (this._isMounted) {
          this._retryTimer = setTimeout(this.calcLeftOffset, 10);
        }
        return;
      }

      var _props9 = this.props,
          infinite = _props9.infinite,
          children = _props9.children,
          cellPadding = _props9.cellPadding;
      var currentSlide = this.state.currentSlide;

      var slides = this._track.childNodes;
      var numChildren = _react.Children.count(children);

      if (infinite) {
        if (currentSlide === 0 && direction === 'right') {
          currentSlide = numChildren;
        } else if (currentSlide === numChildren - 1 && direction === 'left') {
          currentSlide = -1;
        }
      }

      var leftOffset = 0;
      var selectedSlide = void 0;
      for (var i = 0; i < slides.length; i++) {
        selectedSlide = slides[i];
        leftOffset -= cellPadding;
        if (parseInt(selectedSlide.getAttribute('data-index'), 10) === currentSlide) {
          break;
        }
        leftOffset -= selectedSlide.offsetWidth;
      }
      var currentSlideWidth = selectedSlide.offsetWidth;
      var viewportWidth = this._viewport.offsetWidth;

      if (currentSlideWidth === 0 && viewportWidth === 0) {
        // Sometimes there is a delay when the carousel is first rendering, so do a few retries
        this._retryCount = this._retryCount || 0;
        if (this._retryCount < 5) {
          this._retryCount++;
          setTimeout(this.calcLeftOffset, 100);
        } else {
          this._retryCount = 0;
        }

        return;
      }

      // Center the current slide within the viewport
      leftOffset += (viewportWidth - currentSlideWidth) / 2;

      if (leftOffset !== this.state.leftOffset) {
        this.setState({ leftOffset: leftOffset });
      }
    }

    /**
     * Invoked when a slide is clicked.
     *
     * @param {Event} e DOM event object.
     */

  }, {
    key: 'handleSlideClick',
    value: function handleSlideClick(e) {
      var _props10 = this.props,
          clickToNavigate = _props10.clickToNavigate,
          slideClick = _props10.slideClick;
      var currentSlide = this.state.currentSlide;

      var clickedIndex = parseInt(e.currentTarget.getAttribute('data-index'), 10);

      // If the user clicked the current slide or it appears they are dragging, don't process the click
      if (!clickToNavigate || clickedIndex === currentSlide || Math.abs(this._startPos.x - e.clientX) > 0.01) {
        slideClick && slideClick({ clickToNavigate: clickToNavigate, clickedIndex: clickedIndex, currentSlide: currentSlide });
        return;
      }
      if (clickedIndex === currentSlide - 1) {
        this.prevSlide();
      } else if (clickedIndex === currentSlide + 1) {
        this.nextSlide();
      } else {
        this.goToSlide(clickedIndex);
      }
    }

    /**
     * Invoked when mousedown occurs on a slide.
     *
     * @param {Event} e DOM event object.
     */

  }, {
    key: 'onMouseDown',
    value: function onMouseDown(e) {
      var _props11 = this.props,
          draggable = _props11.draggable,
          transition = _props11.transition,
          onMouseDown = _props11.onMouseDown;
      var currentSlide = this.state.currentSlide;


      e.preventDefault();

      onMouseDown && onMouseDown({ currentSlide: currentSlide });

      if (draggable && transition !== 'fade' && !this._animating) {
        if (this._autoplayTimer) {
          clearTimeout(this._autoplayTimer);
        }
        this._startPos = {
          x: e.clientX,
          y: e.clientY,
          startTime: Date.now()
        };
        this.setState({ transitionDuration: 0 });
        document.addEventListener('mousemove', this.onMouseMove, { passive: false });
        document.addEventListener('mouseup', this.stopDragging, false);
      }
    }

    /**
     * Invoked when the mouse is moved over a slide while dragging.
     *
     * @param {Event} e DOM event object.
     */

  }, {
    key: 'onMouseMove',
    value: function onMouseMove(e) {
      e.preventDefault();
      this.setState({
        dragOffset: e.clientX - this._startPos.x
      });
    }

    /**
     * Invoked when the mouse cursor enters over a slide.
     */

  }, {
    key: 'onMouseEnter',
    value: function onMouseEnter() {
      document.addEventListener('mousemove', this.handleMovement, false);
    }

    /**
     * Invoked when the mouse cursor moves around a slide.
     */

  }, {
    key: 'handleMovement',
    value: function handleMovement() {
      this.setHoverState(true);
    }

    /**
     * Invoked when the mouse cursor moves over a slide.
     */

  }, {
    key: 'onMouseOver',
    value: function onMouseOver() {
      this.setHoverState(true);
    }

    /**
     * Keeps track of the current hover state.
     *
     * @param {Boolean} hovering Current hover state.
     */

  }, {
    key: 'setHoverState',
    value: function setHoverState(hovering) {
      var _this8 = this;

      var _props12 = this.props,
          pauseOnHover = _props12.pauseOnHover,
          autoplay = _props12.autoplay;


      if (pauseOnHover && autoplay) {
        clearTimeout(this._hoverTimer);

        if (hovering) {
          clearTimeout(this._autoplayTimer);
          // If the mouse doesn't move for a few seconds, we want to restart the autoplay
          this._hoverTimer = setTimeout(function () {
            _this8.setHoverState(false);
          }, 2000);
        } else {
          this.startAutoplay();
        }
      }
    }

    /**
     * Invoked when the mouse cursor leaves a slide.
     */

  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave() {
      document.removeEventListener('mousemove', this.handleMovement, false);
      this.setHoverState(false);
      !this._animating && this._startPos && this.stopDragging();
    }

    /**
     * Invoked when a touchstart event occurs on a slide.
     *
     * @param {Event} e DOM event object.
     */

  }, {
    key: 'onTouchStart',
    value: function onTouchStart(e) {
      var _props13 = this.props,
          draggable = _props13.draggable,
          transition = _props13.transition,
          onTouchStart = _props13.onTouchStart;
      var currentSlide = this.state.currentSlide;


      onTouchStart && onTouchStart({ currentSlide: currentSlide });

      if (draggable && transition !== 'fade' && !this._animating) {
        if (this._autoplayTimer) {
          clearTimeout(this._autoplayTimer);
        }
        if (e.touches.length === 1) {
          this._startPos = {
            x: e.touches[0].screenX,
            y: e.touches[0].screenY,
            startTime: Date.now()
          };
          document.addEventListener('touchmove', this.onTouchMove, { passive: false });
          document.addEventListener('touchend', this.stopDragging, false);
        }
      }
    }

    /**
     * Invoked when a touchmove event occurs on a slide.
     *
     * @param {Event} e DOM event object.
     */

  }, {
    key: 'onTouchMove',
    value: function onTouchMove(e) {
      var _ref = this._prevPos || this._startPos,
          x = _ref.x,
          y = _ref.y;

      var _e$touches$ = e.touches[0],
          screenX = _e$touches$.screenX,
          screenY = _e$touches$.screenY;

      var angle = Math.abs(Math.atan2(screenY - y, screenX - x)) * 180 / Math.PI;

      this._prevPos = { x: screenX, y: screenY };

      if (angle < 20 || angle > 160) {
        e.preventDefault();
        this.setState({
          dragOffset: screenX - this._startPos.x
        });
      }
    }

    /**
     * Completes a dragging operation, deciding whether to transition to another slide or snap back to the current slide.
     */

  }, {
    key: 'stopDragging',
    value: function stopDragging() {
      var _this9 = this;

      var _props14 = this.props,
          dragThreshold = _props14.dragThreshold,
          transitionDuration = _props14.transitionDuration;
      var dragOffset = this.state.dragOffset;

      var viewportWidth = this._viewport.offsetWidth || 1;
      var percentDragged = Math.abs(dragOffset / viewportWidth);
      var swipeDuration = Date.now() - this._startPos.startTime || 1;
      var swipeSpeed = swipeDuration / (percentDragged * viewportWidth);
      var isQuickSwipe = percentDragged > 0.05 && swipeDuration < 250;
      var duration = void 0;

      if (isQuickSwipe || percentDragged > dragThreshold) {
        // Calculate the duration based on the speed of the swipe
        duration = Math.min(swipeSpeed * (1 - percentDragged) * viewportWidth, (0, _ms2.default)('' + transitionDuration) * (1 - percentDragged));
      } else {
        // Just transition back to the center point
        duration = (0, _ms2.default)('' + transitionDuration) * percentDragged;
      }

      document.removeEventListener('mousemove', this.onMouseMove, { passive: false });
      document.removeEventListener('mouseup', this.stopDragging, false);
      document.removeEventListener('touchmove', this.onTouchMove, { passive: false });
      document.removeEventListener('touchend', this.stopDragging, false);

      this.setState({
        transitionDuration: duration
      }, function () {
        var _props15 = _this9.props,
            children = _props15.children,
            infinite = _props15.infinite;
        var currentSlide = _this9.state.currentSlide;

        var numSlides = _react.Children.count(children);
        var newSlideIndex = currentSlide;
        var direction = '';

        if (percentDragged > dragThreshold || isQuickSwipe) {
          if (dragOffset > 0) {
            newSlideIndex--;
            if (newSlideIndex < 0) {
              newSlideIndex = infinite ? numSlides - 1 : currentSlide;
            }
          } else {
            newSlideIndex++;
            if (newSlideIndex === numSlides) {
              newSlideIndex = infinite ? 0 : currentSlide;
            }
          }
          direction = dragOffset > 0 ? 'left' : 'right';
        }

        _this9.setState({
          dragOffset: 0,
          currentSlide: newSlideIndex,
          direction: direction
        });
      });

      if (this.props.autoplay) {
        this.startAutoplay();
      }
    }
  }]);

  return Carousel;
}(_react.Component);

exports.default = Carousel;