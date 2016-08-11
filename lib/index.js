import _ from 'underscore';

export class TransformParser {

    constructor( el ){
        this.el             = el;
        this.parseTransform( );

        this.parseTransform = this.parseTransform.bind( this );
        this.saveType       = this.saveType.bind( this );
        this.stringify      = this.stringify.bind( this );
    }

    parseTransform(){

        let transformString     = this.el.style.transform;
        let result              = this.getNextTransformType( transformString );
        let currentCharCount    = 0;
        let count               = 0;

        do {

            let type = this.getType( result.string );
            let values = this.getValues( result.string );

            this.saveType( type, values );

            currentCharCount += result.nextStartingIndex;

            result = this.getNextTransformType( transformString.substr( currentCharCount ) )
            count++

        } while ( count < 3 );

    }

    saveType( type, value ){

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

    getNextTransformType( transformString ) {

        let indexOfClosingParinth   = transformString.indexOf( ')' ) + 1;

        if( indexOfClosingParinth !== 0 ){
            let finalString             = transformString.substr(0, indexOfClosingParinth);

            finalString                 = finalString.trim();

            return {
                nextStartingIndex   : indexOfClosingParinth + 1,
                string              : finalString
            }
        } else {

            return {
                nextStartingIndex : indexOfClosingParinth
            }

        }

    }

    getType( transformProp ){

        let indexOfFirstParinth = transformProp.indexOf( '(' );
        let returnType = -1;
        if( indexOfFirstParinth !== -1 ){

            returnType = transformProp.substr(0, indexOfFirstParinth);

        }

        return returnType;

    }

    getValues( transformProp ){

        let indexOfFirstParinth     = transformProp.indexOf( '(' );
        let indexOfClosingParinth   = transformProp.indexOf( ')' );
        let valueString             = transformProp.substr( indexOfFirstParinth, indexOfClosingParinth );

        let values = valueString.split(', ').map( value => {

            var newValue = value.replace('(' , '');
                newValue = newValue.replace(')' , '');

            let unit     = this.getUnit( newValue );

                newValue = parseFloat( newValue );

            return { value : newValue, unit: unit };
        } )


        return values;


    }

    getUnit( value ){

        let unit            = '';
        let parsedValue     = parseFloat( value );
        let parsedLength    = parsedValue.toString().length;

        unit = value.substr( parsedLength );

        return unit;

    }

    // matrix( <number> [, <number> ]{5,5} )
    setMatrix( type, values ){

        this.matrix = {
            a: values[0],
            b: values[1],
            c: values[2],
            d: values[3],
            tx: values[4],
            ty: values[5]
        }

    }

    stringifyMatrix(){
        let currentValue = this.matrix;
        return `matrix( ${currentValue.a.value}${currentValue.a.unit}, ${currentValue.b.value}${currentValue.b.unit}, ${currentValue.c.value}${currentValue.c.unit}, ${currentValue.d.value}${currentValue.d.unit}, ${currentValue.tx.value}${currentValue.tx.unit}, ${currentValue.ty.value}${currentValue.ty.unit} )`
    }

    // translate( <length> | <percentage> [, <length> | <percentage> ]? )
    setTranslate( type, values ){
        this.translate = {
            tx : values[0],
            ty : values[1]
        }
    }

    stringifyTranslate( type, values ){
        let currentValue = this.translate;
        return `translate( ${currentValue.tx.value}${currentValue.tx.unit}, ${currentValue.ty.value}${currentValue.ty.unit} )`
    }

    // translateX( <length> | <percentage> )
    setTranslateX( type, values ){
        this.translateX = {
            tx : values[0]
        }
    }

    stringifyTranslateX( type, values ){
        let currentValue = this.translateX;
        return `translateX( ${currentValue.tx.value}${currentValue.tx.unit} )`
    }

    // translateY( <length> | <percentage> )
    setTranslateY( type, values ){
        this.translateY = {
            ty : values[0]
        }
    }

    stringifyTranslateY( type, values ){
        let currentValue = this.translateY;
        return `translateY( ${currentValue.ty.value}${currentValue.ty.unit} )`
    }

    // scale( <number> [, <number> ]? )
    setScale( type, values ){
        this.scale = {
            x: values[0],
            y: values[1]
        }
    }

    stringifyScale( type, values ){
        let currentValue = this.scale;
        return `scale( ${currentValue.x.value}${currentValue.x.unit}, ${currentValue.y.value}${currentValue.y.unit} )`
    }

    // scaleX( <number> )
    setScaleX( type, values ){
        this.scaleX = {
            x: values[0]
        }
    }

    stringifyScaleX( type, values ){
        let currentValue = this.scaleX;
        return `scaleX( ${currentValue.x.value}${currentValue.x.unit} )`
    }

    // scaleY( <number> )
    setScaleY( type, values ){
        this.scaleY = {
            y: values[1]
        }
    }

    stringifyScaleY( type, values ){
        let currentValue = this.scaleY;
        return `scaleY( ${currentValue.y.value}${currentValue.y.unit} )`
    }

    // rotate( <angle> )
    setRotate( type, values ){
        this.rotate = {
            a : values[0]
        }
    }

    stringifyRotate( type, values ){
        let currentValue = this.rotate;
        return `rotate( ${currentValue.a.value}${currentValue.a.unit} )`
    }

    // skew( <angle> )
    setSkew( type, values ){
        this.skew = {
            x: values[0],
            y: values[1]
        }
    }

    stringifySkew( type, values ){
        let currentValue = this.skew;
        return `skew( ${currentValue.x.value}${currentValue.x.unit}, ${currentValue.y.value}${currentValue.y.unit} )`
    }

    // skewX( <angle> )
    setSkewX( type, values ){
        this.scaleX = {
            x: values[0]
        }
    }

    stringifySkewX( type, values ){
        let currentValue = this.skewX;
        return `skewX( ${currentValue.x.value}${currentValue.x.unit})`
    }

    // skewY( <angle> )
    setSkewY( type, values ){
        this.skewY = {
            X: values[0]
        }
    }

    stringifySkewY( type, values ){
        let currentValue = this.skewY;
        return `skewY( ${currentValue.y.value}${currentValue.y.unit} )`
    }

    // matrix3d( <number> [, <number> ]{15,15} )
    setMatrix3d( type, values ){
        this.matrix3d = {
            a1 : values[0],
            b1 : values[1],
            c1 : values[2],
            d1 : values[3],
            a2 : values[4],
            b2 : values[5],
            c2 : values[6],
            d2 : values[7],
            a3 : values[8],
            b3 : values[9],
            c3 : values[10],
            d3 : values[11],
            a4 : values[12],
            b4 : values[13],
            c4 : values[14],
            d4 : values[15],
        }
    }

    stringifyMatrix3d( type, values ){
        let cv = this.matrix3d;
        return `matrix3d( ${cv.a1.value}, ${cv.b1.value}, ${cv.c1.value}, ${cv.d1.value}, ${cv.a2.value}, ${cv.b2.value}, ${cv.c2.value}, ${cv.d2.value}, ${cv.a3.value}, ${cv.b3.value}, ${cv.c3.value}, ${cv.d3.value}, ${cv.a4.value}, ${cv.b4.value}, ${cv.c4.value}, ${cv.d4.value}  )`
    }

    // translate3d( <length> | <percentage> , <length> | <percentage> , <length> )
    setTranslate3d( type, values ){

        this.translate3d = {
            x : values[0],
            y : values[1],
            z : values[2]
        }

    }

    stringifyTranslate3d( type, values ){

        let currentValue = this.translate3d;
        return `translate3d( ${currentValue.x.value}${currentValue.x.unit}, ${currentValue.y.value}${currentValue.y.unit}, ${currentValue.z.value}${currentValue.z.unit} )`

    }

    // translateZ( <length> )
    setTranslateZ( type, values ){
        this.translateZ = {
            z : values[0]
        }
    }

    stringifyTranslateZ( type, values ){
        let currentValue = this.translateZ;
        return `translateZ( ${currentValue.z.value}${currentValue.z.unit} )`
    }

    //scale3d( <number> , <number>, <number> )
    setScale3d( type, values ){
        this.scale3d = {
            x : values[0],
            y : values[1],
            z : values[2]
        }
    }

    stringifyScale3d( type, values ){
        let currentValue = this.scale3d;
        return `scale3d( ${currentValue.x.value}${currentValue.x.unit}, ${currentValue.y.value}${currentValue.y.unit}, ${currentValue.z.value}${currentValue.z.unit} )`
    }

    //scaleZ( <number> )
    setScaleZ( type, values ){
        this.scaleZ = {
            z : values[0]
        }
    }

    stringifyScaleZ( type, values ){
        let currentValue = this.scaleZ;
        return `scaleZ( ${currentValue.z.value}${currentValue.z.unit} )`
    }

    // rotate3d( <number> , <number> , <number> , <angle> )
    setRotate3d( type, values ){

        this.rotate3d = {
            x : values[0],
            y : values[1],
            z : values[2],
            a : values[3]
        }

    }

    stringifyRotate3d( type, values ){
        let currentValue = this.rotate3d;
        return `rotate3d( ${currentValue.x.value}${currentValue.x.unit}, ${currentValue.y.value}${currentValue.y.unit}, ${currentValue.z.value}${currentValue.z.unit}, ${currentValue.a.value}${currentValue.a.unit} )`
    }

    // rotateX( <angle> )
    setRotateX( type, values ){
        this.rotateX = {
            x : values[0]
        }
    }

    stringifyRotateX( type, values ){
        let currentValue = this.rotateX;
        return `rotateX( ${currentValue.x.value}${currentValue.x.unit} )`
    }

    // rotateY( <angle> )
    setRotateY( type, values ){
        this.rotateY = {
            y : values[0]
        }
    }

    stringifyRotateY( type, values ){
        let currentValue = this.rotateY;
        return `rotateY( ${currentValue.y.value}${currentValue.y.unit} )`
    }

    // rotateZ( <angle> )
    setRotateZ( type, values ){
        this.rotateZ = {
            z : values[0]
        }
    }

    stringifyRotateZ( type, values ){
        let currentValue = this.rotateZ;
        return `rotateZ( ${currentValue.z.value}${currentValue.z.unit} )`
    }

    // perspective( <length> )
    setPerspective( type, values ){
        this.perspective = {
            z : values[0]
        }
    }

    stringifyPerspective( type, values ){
        let currentValue = this.perspective;
        return `perspective( ${currentValue.z.value}${currentValue.z.unit} )`
    }

    stringify( type, values ){
        let transfromString = '';

        _.each( this, ( value, type ) => {
            let transformTypeString = '';

            switch (type) {
                case 'matrix':
                    transformTypeString = this.stringifyMatrix(type, value);
                    break;
                case 'translate':
                    transformTypeString = this.stringifyTranslate(type, value);
                    break;
                case 'translateX':
                    transformTypeString = this.stringifyTranslateX(type, value);
                    break;
                case 'translateY':
                    transformTypeString = this.stringifyTranslateY(type, value);
                    break;
                case 'scale':
                    transformTypeString = this.stringifyScale(type, value);
                    break;
                case 'scaleX':
                    transformTypeString = this.stringifyScaleX(type, value);
                    break;
                case 'scaleY':
                    transformTypeString = this.stringifyScaleY(type, value);
                    break;
                case 'rotate':
                    transformTypeString = this.stringifyRotate(type, value);
                    break;
                case 'skew':
                    transformTypeString = this.stringifySkew(type, value);
                    break;
                case 'skewX':
                    transformTypeString = this.stringifySkewX(type, value);
                    break;
                case 'skewY':
                    transformTypeString = this.stringifySkewY(type, value);
                    break;
                case 'matrix3d':
                    transformTypeString = this.stringifyMatrix3d(type, value);
                    break;
                case 'translate3d':
                    transformTypeString = this.stringifyTranslate3d(type, value);
                    break;
                case 'translateZ':
                    transformTypeString = this.stringifyTranslateZ(type, value);
                    break;
                case 'scale3d':
                    transformTypeString = this.stringifyScale3d(type, value);
                    break;
                case 'scaleZ':
                    transformTypeString = this.stringifyScaleZ(type, value);
                    break;
                case 'rotate3d':
                    transformTypeString = this.stringifyRotate3d(type, value);
                    break;
                case 'rotateX':
                    transformTypeString = this.stringifyRotateX(type, value);
                    break;
                case 'rotateY':
                    transformTypeString = this.stringifyRotateY(type, value);
                    break;
                case 'rotateZ':
                    transformTypeString = this.stringifyRotateZ(type, value);
                    break;
                case 'perspective':
                    transformTypeString = this.stringifyPerspective(type, value);
                    break;
            }

            transfromString += " " + transformTypeString;

        } )

        return transfromString;

    }

}
