'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TransformParser = function () {
    function TransformParser(el) {
        _classCallCheck(this, TransformParser);

        this.el = el;
        this.parseTransform();

        this.parseTransform = this.parseTransform.bind(this);
        this.saveType = this.saveType.bind(this);
        this.stringify = this.stringify.bind(this);
    }

    _createClass(TransformParser, [{
        key: 'parseTransform',
        value: function parseTransform() {

            var transformString = this.el.style.transform;
            var result = this.getNextTransformType(transformString);
            var currentCharCount = 0;
            var count = 0;

            do {

                var type = this.getType(result.string);
                var values = this.getValues(result.string);

                this.saveType(type, values);

                currentCharCount += result.nextStartingIndex;

                result = this.getNextTransformType(transformString.substr(currentCharCount));
                count++;
            } while (count < 3);
        }
    }, {
        key: 'saveType',
        value: function saveType(type, value) {

            switch (type) {
                case 'matrix':
                    this.setMatrix(type, value);
                    break;
                case 'translate':
                    this.setTranslate(type, value);
                    break;
                case 'translateX':
                    this.setTranslateX(type, value);
                    break;
                case 'translateY':
                    this.setTranslateY(type, value);
                    break;
                case 'scale':
                    this.setScale(type, value);
                    break;
                case 'scaleX':
                    this.setScaleX(type, value);
                    break;
                case 'scaleY':
                    this.setScaleY(type, value);
                    break;
                case 'rotate':
                    this.setRotate(type, value);
                    break;
                case 'skew':
                    this.setSkew(type, value);
                    break;
                case 'skewX':
                    this.setSkewX(type, value);
                    break;
                case 'skewY':
                    this.setSkewY(type, value);
                    break;
                case 'matrix3d':
                    this.setMatrix3d(type, value);
                    break;
                case 'translate3d':
                    this.setTranslate3d(type, value);
                    break;
                case 'translateZ':
                    this.setTranslateZ(type, value);
                    break;
                case 'scale3d':
                    this.setScale3d(type, value);
                    break;
                case 'scaleZ':
                    this.setScaleZ(type, value);
                    break;
                case 'rotate3d':
                    this.setRotate3d(type, value);
                    break;
                case 'rotateX':
                    this.setRotateX(type, value);
                    break;
                case 'rotateY':
                    this.setRotateY(type, value);
                    break;
                case 'rotateZ':
                    this.setRotateZ(type, value);
                    break;
                case 'perspective':
                    this.setPerspective(type, value);
                    break;
                default:

            }
        }
    }, {
        key: 'getNextTransformType',
        value: function getNextTransformType(transformString) {

            var indexOfClosingParinth = transformString.indexOf(')') + 1;

            if (indexOfClosingParinth !== 0) {
                var finalString = transformString.substr(0, indexOfClosingParinth);

                finalString = finalString.trim();

                return {
                    nextStartingIndex: indexOfClosingParinth + 1,
                    string: finalString
                };
            } else {

                return {
                    nextStartingIndex: indexOfClosingParinth
                };
            }
        }
    }, {
        key: 'getType',
        value: function getType(transformProp) {

            var indexOfFirstParinth = transformProp.indexOf('(');
            var returnType = -1;
            if (indexOfFirstParinth !== -1) {

                returnType = transformProp.substr(0, indexOfFirstParinth);
            }

            return returnType;
        }
    }, {
        key: 'getValues',
        value: function getValues(transformProp) {
            var _this = this;

            var indexOfFirstParinth = transformProp.indexOf('(');
            var indexOfClosingParinth = transformProp.indexOf(')');
            var valueString = transformProp.substr(indexOfFirstParinth, indexOfClosingParinth);

            var values = valueString.split(', ').map(function (value) {

                var newValue = value.replace('(', '');
                newValue = newValue.replace(')', '');

                var unit = _this.getUnit(newValue);

                newValue = parseFloat(newValue);

                return { value: newValue, unit: unit };
            });

            return values;
        }
    }, {
        key: 'getUnit',
        value: function getUnit(value) {

            var unit = '';
            var parsedValue = parseFloat(value);
            var parsedLength = parsedValue.toString().length;

            unit = value.substr(parsedLength);

            return unit;
        }

        // matrix( <number> [, <number> ]{5,5} )

    }, {
        key: 'setMatrix',
        value: function setMatrix(type, values) {

            this.matrix = {
                a: values[0],
                b: values[1],
                c: values[2],
                d: values[3],
                tx: values[4],
                ty: values[5]
            };
        }
    }, {
        key: 'stringifyMatrix',
        value: function stringifyMatrix() {
            var currentValue = this.matrix;
            return 'matrix( ' + currentValue.a.value + currentValue.a.unit + ', ' + currentValue.b.value + currentValue.b.unit + ', ' + currentValue.c.value + currentValue.c.unit + ', ' + currentValue.d.value + currentValue.d.unit + ', ' + currentValue.tx.value + currentValue.tx.unit + ', ' + currentValue.ty.value + currentValue.ty.unit + ' )';
        }

        // translate( <length> | <percentage> [, <length> | <percentage> ]? )

    }, {
        key: 'setTranslate',
        value: function setTranslate(type, values) {
            this.translate = {
                tx: values[0],
                ty: values[1]
            };
        }
    }, {
        key: 'stringifyTranslate',
        value: function stringifyTranslate(type, values) {
            var currentValue = this.translate;
            return 'translate( ' + currentValue.tx.value + currentValue.tx.unit + ', ' + currentValue.ty.value + currentValue.ty.unit + ' )';
        }

        // translateX( <length> | <percentage> )

    }, {
        key: 'setTranslateX',
        value: function setTranslateX(type, values) {
            this.translateX = {
                tx: values[0]
            };
        }
    }, {
        key: 'stringifyTranslateX',
        value: function stringifyTranslateX(type, values) {
            var currentValue = this.translateX;
            return 'translateX( ' + currentValue.tx.value + currentValue.tx.unit + ' )';
        }

        // translateY( <length> | <percentage> )

    }, {
        key: 'setTranslateY',
        value: function setTranslateY(type, values) {
            this.translateY = {
                ty: values[0]
            };
        }
    }, {
        key: 'stringifyTranslateY',
        value: function stringifyTranslateY(type, values) {
            var currentValue = this.translateY;
            return 'translateY( ' + currentValue.ty.value + currentValue.ty.unit + ' )';
        }

        // scale( <number> [, <number> ]? )

    }, {
        key: 'setScale',
        value: function setScale(type, values) {
            this.scale = {
                x: values[0],
                y: values[1]
            };
        }
    }, {
        key: 'stringifyScale',
        value: function stringifyScale(type, values) {
            var currentValue = this.scale;
            return 'scale( ' + currentValue.x.value + currentValue.x.unit + ', ' + currentValue.y.value + currentValue.y.unit + ' )';
        }

        // scaleX( <number> )

    }, {
        key: 'setScaleX',
        value: function setScaleX(type, values) {
            this.scaleX = {
                x: values[0]
            };
        }
    }, {
        key: 'stringifyScaleX',
        value: function stringifyScaleX(type, values) {
            var currentValue = this.scaleX;
            return 'scaleX( ' + currentValue.x.value + currentValue.x.unit + ' )';
        }

        // scaleY( <number> )

    }, {
        key: 'setScaleY',
        value: function setScaleY(type, values) {
            this.scaleY = {
                y: values[1]
            };
        }
    }, {
        key: 'stringifyScaleY',
        value: function stringifyScaleY(type, values) {
            var currentValue = this.scaleY;
            return 'scaleY( ' + currentValue.y.value + currentValue.y.unit + ' )';
        }

        // rotate( <angle> )

    }, {
        key: 'setRotate',
        value: function setRotate(type, values) {
            this.rotate = {
                a: values[0]
            };
        }
    }, {
        key: 'stringifyRotate',
        value: function stringifyRotate(type, values) {
            var currentValue = this.rotate;
            return 'rotate( ' + currentValue.a.value + currentValue.a.unit + ' )';
        }

        // skew( <angle> )

    }, {
        key: 'setSkew',
        value: function setSkew(type, values) {
            this.skew = {
                x: values[0],
                y: values[1]
            };
        }
    }, {
        key: 'stringifySkew',
        value: function stringifySkew(type, values) {
            var currentValue = this.skew;
            return 'skew( ' + currentValue.x.value + currentValue.x.unit + ', ' + currentValue.y.value + currentValue.y.unit + ' )';
        }

        // skewX( <angle> )

    }, {
        key: 'setSkewX',
        value: function setSkewX(type, values) {
            this.scaleX = {
                x: values[0]
            };
        }
    }, {
        key: 'stringifySkewX',
        value: function stringifySkewX(type, values) {
            var currentValue = this.skewX;
            return 'skewX( ' + currentValue.x.value + currentValue.x.unit + ')';
        }

        // skewY( <angle> )

    }, {
        key: 'setSkewY',
        value: function setSkewY(type, values) {
            this.skewY = {
                X: values[0]
            };
        }
    }, {
        key: 'stringifySkewY',
        value: function stringifySkewY(type, values) {
            var currentValue = this.skewY;
            return 'skewY( ' + currentValue.y.value + currentValue.y.unit + ' )';
        }

        // matrix3d( <number> [, <number> ]{15,15} )

    }, {
        key: 'setMatrix3d',
        value: function setMatrix3d(type, values) {
            this.matrix3d = {
                a1: values[0],
                b1: values[1],
                c1: values[2],
                d1: values[3],
                a2: values[4],
                b2: values[5],
                c2: values[6],
                d2: values[7],
                a3: values[8],
                b3: values[9],
                c3: values[10],
                d3: values[11],
                a4: values[12],
                b4: values[13],
                c4: values[14],
                d4: values[15]
            };
        }
    }, {
        key: 'stringifyMatrix3d',
        value: function stringifyMatrix3d(type, values) {
            var cv = this.matrix3d;
            return 'matrix3d( ' + cv.a1.value + ', ' + cv.b1.value + ', ' + cv.c1.value + ', ' + cv.d1.value + ', ' + cv.a2.value + ', ' + cv.b2.value + ', ' + cv.c2.value + ', ' + cv.d2.value + ', ' + cv.a3.value + ', ' + cv.b3.value + ', ' + cv.c3.value + ', ' + cv.d3.value + ', ' + cv.a4.value + ', ' + cv.b4.value + ', ' + cv.c4.value + ', ' + cv.d4.value + '  )';
        }

        // translate3d( <length> | <percentage> , <length> | <percentage> , <length> )

    }, {
        key: 'setTranslate3d',
        value: function setTranslate3d(type, values) {

            this.translate3d = {
                x: values[0],
                y: values[1],
                z: values[2]
            };
        }
    }, {
        key: 'stringifyTranslate3d',
        value: function stringifyTranslate3d(type, values) {

            var currentValue = this.translate3d;
            return 'translate3d( ' + currentValue.x.value + currentValue.x.unit + ', ' + currentValue.y.value + currentValue.y.unit + ', ' + currentValue.z.value + currentValue.z.unit + ' )';
        }

        // translateZ( <length> )

    }, {
        key: 'setTranslateZ',
        value: function setTranslateZ(type, values) {
            this.translateZ = {
                z: values[0]
            };
        }
    }, {
        key: 'stringifyTranslateZ',
        value: function stringifyTranslateZ(type, values) {
            var currentValue = this.translateZ;
            return 'translateZ( ' + currentValue.z.value + currentValue.z.unit + ' )';
        }

        //scale3d( <number> , <number>, <number> )

    }, {
        key: 'setScale3d',
        value: function setScale3d(type, values) {
            this.scale3d = {
                x: values[0],
                y: values[1],
                z: values[2]
            };
        }
    }, {
        key: 'stringifyScale3d',
        value: function stringifyScale3d(type, values) {
            var currentValue = this.scale3d;
            return 'scale3d( ' + currentValue.x.value + currentValue.x.unit + ', ' + currentValue.y.value + currentValue.y.unit + ', ' + currentValue.z.value + currentValue.z.unit + ' )';
        }

        //scaleZ( <number> )

    }, {
        key: 'setScaleZ',
        value: function setScaleZ(type, values) {
            this.scaleZ = {
                z: values[0]
            };
        }
    }, {
        key: 'stringifyScaleZ',
        value: function stringifyScaleZ(type, values) {
            var currentValue = this.scaleZ;
            return 'scaleZ( ' + currentValue.z.value + currentValue.z.unit + ' )';
        }

        // rotate3d( <number> , <number> , <number> , <angle> )

    }, {
        key: 'setRotate3d',
        value: function setRotate3d(type, values) {

            this.rotate3d = {
                x: values[0],
                y: values[1],
                z: values[2],
                a: values[3]
            };
        }
    }, {
        key: 'stringifyRotate3d',
        value: function stringifyRotate3d(type, values) {
            var currentValue = this.rotate3d;
            return 'rotate3d( ' + currentValue.x.value + currentValue.x.unit + ', ' + currentValue.y.value + currentValue.y.unit + ', ' + currentValue.z.value + currentValue.z.unit + ', ' + currentValue.a.value + currentValue.a.unit + ' )';
        }

        // rotateX( <angle> )

    }, {
        key: 'setRotateX',
        value: function setRotateX(type, values) {
            this.rotateX = {
                x: values[0]
            };
        }
    }, {
        key: 'stringifyRotateX',
        value: function stringifyRotateX(type, values) {
            var currentValue = this.rotateX;
            return 'rotateX( ' + currentValue.x.value + currentValue.x.unit + ' )';
        }

        // rotateY( <angle> )

    }, {
        key: 'setRotateY',
        value: function setRotateY(type, values) {
            this.rotateY = {
                y: values[0]
            };
        }
    }, {
        key: 'stringifyRotateY',
        value: function stringifyRotateY(type, values) {
            var currentValue = this.rotateY;
            return 'rotateY( ' + currentValue.y.value + currentValue.y.unit + ' )';
        }

        // rotateZ( <angle> )

    }, {
        key: 'setRotateZ',
        value: function setRotateZ(type, values) {
            this.rotateZ = {
                z: values[0]
            };
        }
    }, {
        key: 'stringifyRotateZ',
        value: function stringifyRotateZ(type, values) {
            var currentValue = this.rotateZ;
            return 'rotateZ( ' + currentValue.z.value + currentValue.z.unit + ' )';
        }

        // perspective( <length> )

    }, {
        key: 'setPerspective',
        value: function setPerspective(type, values) {
            this.perspective = {
                z: values[0]
            };
        }
    }, {
        key: 'stringifyPerspective',
        value: function stringifyPerspective(type, values) {
            var currentValue = this.perspective;
            return 'perspective( ' + currentValue.z.value + currentValue.z.unit + ' )';
        }
    }, {
        key: 'stringify',
        value: function stringify(type, values) {
            var _this2 = this;

            var transfromString = '';

            _underscore2.default.each(this, function (value, type) {
                var transformTypeString = '';

                switch (type) {
                    case 'matrix':
                        transformTypeString = _this2.stringifyMatrix(type, value);
                        break;
                    case 'translate':
                        transformTypeString = _this2.stringifyTranslate(type, value);
                        break;
                    case 'translateX':
                        transformTypeString = _this2.stringifyTranslateX(type, value);
                        break;
                    case 'translateY':
                        transformTypeString = _this2.stringifyTranslateY(type, value);
                        break;
                    case 'scale':
                        transformTypeString = _this2.stringifyScale(type, value);
                        break;
                    case 'scaleX':
                        transformTypeString = _this2.stringifyScaleX(type, value);
                        break;
                    case 'scaleY':
                        transformTypeString = _this2.stringifyScaleY(type, value);
                        break;
                    case 'rotate':
                        transformTypeString = _this2.stringifyRotate(type, value);
                        break;
                    case 'skew':
                        transformTypeString = _this2.stringifySkew(type, value);
                        break;
                    case 'skewX':
                        transformTypeString = _this2.stringifySkewX(type, value);
                        break;
                    case 'skewY':
                        transformTypeString = _this2.stringifySkewY(type, value);
                        break;
                    case 'matrix3d':
                        transformTypeString = _this2.stringifyMatrix3d(type, value);
                        break;
                    case 'translate3d':
                        transformTypeString = _this2.stringifyTranslate3d(type, value);
                        break;
                    case 'translateZ':
                        transformTypeString = _this2.stringifyTranslateZ(type, value);
                        break;
                    case 'scale3d':
                        transformTypeString = _this2.stringifyScale3d(type, value);
                        break;
                    case 'scaleZ':
                        transformTypeString = _this2.stringifyScaleZ(type, value);
                        break;
                    case 'rotate3d':
                        transformTypeString = _this2.stringifyRotate3d(type, value);
                        break;
                    case 'rotateX':
                        transformTypeString = _this2.stringifyRotateX(type, value);
                        break;
                    case 'rotateY':
                        transformTypeString = _this2.stringifyRotateY(type, value);
                        break;
                    case 'rotateZ':
                        transformTypeString = _this2.stringifyRotateZ(type, value);
                        break;
                    case 'perspective':
                        transformTypeString = _this2.stringifyPerspective(type, value);
                        break;
                }

                transfromString += " " + transformTypeString;
            });

            return transfromString;
        }
    }]);

    return TransformParser;
}();

module.TransformParser = TransformParser;
module.exports = TransformParser;
