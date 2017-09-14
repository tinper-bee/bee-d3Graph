'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Pie = function (_PureComponent) {
  _inherits(Pie, _PureComponent);

  function Pie() {
    var _temp, _this, _ret;

    _classCallCheck(this, Pie);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _PureComponent.call.apply(_PureComponent, [this].concat(args))), _this), _this.state = {
      mounted: false,
      pieLayout: []
    }, _this.geoInfo = {
      width: 0,
      height: 0,
      radius: 0
    }, _this.getPieLayout = function (val) {
      return d3.pie().sort(null).value(function (d) {
        return d;
      })(val);
    }, _this.colorScale = null, _this.outerArc = null, _this.onResize = function () {
      _this.getGeoInfo();
      /* must follow getGeoInfo*/
      _this.outerArc = _this.getArcShape(0, _this.props.labelLineLength1 + _this.geoInfo.radius * _this.props.alpha);
      _this.forceUpdate();
    }, _this.getGeoInfo = function () {
      var _calcGeo = calcGeo(_this.refs.container),
          width = _calcGeo.width,
          height = _calcGeo.height;

      _this.geoInfo = {
        width: width,
        height: height,
        radius: Math.min(width, height) / 2
      };
    }, _this.getArcShape = function (span, base) {
      var radius = _this.geoInfo.radius;
      var alpha = _this.props.alpha;

      base = base || radius * alpha;

      return d3.arc().outerRadius(base + span / 2).innerRadius(base - span / 2);
    }, _this.getBetaFactor = function (d) {
      return midAngle(d) < Math.PI ? 1 : -1;
    }, _this.getPercent = function (d) {
      var percent = (d.endAngle - d.startAngle) / (2 * Math.PI) * 100;
      return percent.toFixed(2);
    }, _this.getSum = function () {
      var ret = _this.props.value.reduce(function (r, v) {
        return r + v;
      }, 0);
      return ret !== ret ? 0 : ret;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Pie.prototype.componentWillMount = function componentWillMount() {
    // 这里已经可以为图表开始准备数据了
    this.colorScale = d3.scaleOrdinal().domain(this.props.label).range(this.props.color);
  };

  Pie.prototype.componentDidMount = function componentDidMount() {
    this.setState({
      mounted: true,
      pieLayout: this.getPieLayout(this.props.value)
    });

    this.getGeoInfo();
    /* must follow getGeoInfo*/
    this.outerArc = this.getArcShape(0, this.props.labelLineLength1 + this.geoInfo.radius * this.props.alpha);

    window.addEventListener('resize', this.onResize);
  };

  Pie.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        pieLayout: this.getPieLayout(nextProps.value)
      });
    }
  };

  Pie.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
    var props = this.props;
    var state = this.state;
    return Object.keys(nextProps).some(function (key) {
      return nextProps[key] !== props[key];
    }) || Object.keys(nextState).some(function (key) {
      return nextState !== state[key];
    });
  };

  Pie.prototype.componentWillUnMount = function componentWillUnMount() {
    window.removeEventListener('resize', this.onResize);
  };

  Pie.prototype.render = function render() {
    var _this2 = this;

    var pieLayout = this.state.pieLayout;
    var heightOffset = this.props.heightOffset;

    var geoWidth = this.geoInfo.width;
    var geoHeight = this.geoInfo.height;

    return _react2["default"].createElement(
      'div',
      {
        ref: 'container',
        style: { width: '100%', height: '100%' }
      },
      this.state.mounted && _react2["default"].createElement(
        'svg',
        {
          width: '100%',
          height: '100%',
          fontSize: 12
        },
        _react2["default"].createElement(
          'text',
          {
            transform: 'translate(' + geoWidth / 2 + ',30)',
            textAnchor: 'middle',
            fontSize: '16'
          },
          this.props.title
        ),
        _react2["default"].createElement(
          'g',
          { transform: 'translate(' + (geoWidth / 2 - 94) + ' ,45)' },
          this.props.label.map(function (item, index) {
            return _react2["default"].createElement(
              'g',
              {
                transform: 'translate(' + index * 70 + ',0)',
                key: index
              },
              _react2["default"].createElement('rect', {
                x: '0',
                y: '0',
                width: '15',
                height: '15',
                fill: _this2.props.color[index]
              }),
              _react2["default"].createElement(
                'text',
                {
                  x: '2em',
                  y: '1em'
                },
                item
              )
            );
          })
        ),
        _react2["default"].createElement(
          'g',
          {
            transform: 'translate(' + geoWidth / 2 + ',' + (geoHeight / 2 + heightOffset) + ')'
          },
          _react2["default"].createElement('circle', {
            cx: '0',
            cy: '0',
            r: this.geoInfo.radius * this.props.alpha,
            fill: '#f4f4f4'
          }),
          _react2["default"].createElement(
            'g',
            null,
            pieLayout.map(function (d, i) {
              var _props = _this2.props,
                  label = _props.label,
                  circleSpan = _props.circleSpan;
              var colorScale = _this2.colorScale;

              var arc = _this2.getArcShape(circleSpan[i]);

              return _react2["default"].createElement('path', {
                key: i,
                fill: colorScale(label[i]),
                className: 'slice',
                d: arc(d)
              });
            })
          ),
          _react2["default"].createElement(
            'g',
            null,
            pieLayout.map(function (d, i) {
              var _props2 = _this2.props,
                  label = _props2.label,
                  circleSpan = _props2.circleSpan,
                  labelLineLength2 = _props2.labelLineLength2;
              var colorScale = _this2.colorScale,
                  getArcShape = _this2.getArcShape,
                  outerArc = _this2.outerArc,
                  getBetaFactor = _this2.getBetaFactor,
                  getPercent = _this2.getPercent;

              if (getPercent(d) == '0.00') {
                return null;
              }
              var beta = getBetaFactor(d);
              var pos1 = getArcShape(circleSpan[i]).centroid(d);
              var pos2 = outerArc.centroid(d);
              var pos3 = [pos2[0] + beta * labelLineLength2, pos2[1]];

              // 保存pos3，后面的文字基于这个位置
              d.labelPos = pos3;

              d.test = 'dsafka';
              return _react2["default"].createElement('polyline', {
                key: i,
                points: pos1 + ' ' + pos2 + ' ' + pos3,
                strokeWidth: '1',
                fill: 'none',
                stroke: colorScale(label[i])
              });
            })
          ),
          _react2["default"].createElement(
            'g',
            null,
            pieLayout.map(function (d, i) {
              var _props3 = _this2.props,
                  label = _props3.label,
                  labelAppend = _props3.labelAppend,
                  unit = _props3.unit;
              var getBetaFactor = _this2.getBetaFactor,
                  getPercent = _this2.getPercent,
                  colorScale = _this2.colorScale;


              if (getPercent(d) == '0.00') {
                return null;
              }

              return _react2["default"].createElement(
                'g',
                { key: i },
                _react2["default"].createElement(
                  'text',
                  {
                    x: d.labelPos[0],
                    y: d.labelPos[1],
                    dy: '-5',
                    textAnchor: getBetaFactor(d) > 0 ? "end" : "start"
                  },
                  _react2["default"].createElement(
                    'tspan',
                    null,
                    label[i] + labelAppend
                  ),
                  _react2["default"].createElement(
                    'tspan',
                    {
                      dx: '.5em',
                      fontSize: 'smaller',
                      fill: colorScale(label[i])
                    },
                    getPercent(d) + '%'
                  )
                ),
                _react2["default"].createElement(
                  'text',
                  {
                    x: d.labelPos[0],
                    y: d.labelPos[1],
                    dy: '2.2em',
                    textAnchor: getBetaFactor(d) > 0 ? "end" : "start"
                  },
                  _react2["default"].createElement(
                    'tspan',
                    {
                      fontSize: 'xx-large',
                      fill: colorScale(label[i])
                    },
                    d.value
                  ),
                  _react2["default"].createElement(
                    'tspan',
                    { dx: '.5em' },
                    unit
                  )
                )
              );
            })
          ),
          _react2["default"].createElement(
            'g',
            null,
            _react2["default"].createElement(
              'text',
              {
                fontSize: 'xx-large',
                textAnchor: 'middle',
                fill: '#9b9b9b'
              },
              this.getSum()
            ),
            _react2["default"].createElement(
              'text',
              {
                textAnchor: 'middle',
                style: { transform: 'translate(0,1.5em)' },
                fill: '#9b9b9b'
              },
              '\u603B' + this.props.labelAppend + '\u6570'
            )
          )
        )
      )
    );
  };

  return Pie;
}(_react.PureComponent);

Pie.propTypes = {
  /* data */
  value: _propTypes2["default"].arrayOf(_propTypes2["default"].number),
  label: _propTypes2["default"].arrayOf(_propTypes2["default"].string),
  unit: _propTypes2["default"].string,
  labelAppend: _propTypes2["default"].string,
  title: _propTypes2["default"].string,
  /* chart conf */
  heightOffset: _propTypes2["default"].number,
  alpha: _propTypes2["default"].number,
  color: _propTypes2["default"].arrayOf(_propTypes2["default"].string),
  circleSpan: _propTypes2["default"].arrayOf(_propTypes2["default"].number),
  labelLineLength1: _propTypes2["default"].number,
  labelLineLength2: _propTypes2["default"].number
};
Pie.defaultProps = {
  label: ['健康', '异常', '未知'],
  value: [0, 0, 0],
  unit: '个',
  labelAppend: '应用',
  title: '应用健康状况比例图',

  heightOffset: 30,
  alpha: 0.5,
  color: ['#29b6f6', '#ff71a1', '#f0d200'],
  circleSpan: [25, 15, 10],
  labelLineLength1: 25,
  labelLineLength2: 100
};
exports["default"] = Pie;


function calcGeo(ele) {
  if (!ele.clientWidth) {
    console.warn('no an element!');
    return {
      width: 0,
      height: 0
    };
  }
  return {
    width: ele.clientWidth,
    height: ele.clientHeight
  };
}

function midAngle(datum) {
  return datum.startAngle + (datum.endAngle - datum.startAngle) / 2;
}
module.exports = exports['default'];