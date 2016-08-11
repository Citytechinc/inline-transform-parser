# Inline Transform Parser

### To install

```js
npm install --save inline-transform-parser
```

## How to use

```js

/*
    <div class="myEl" style="transform: transform3d( 0px,0em,0px ) rotate(30deg)"></div>
*/

import TransformParser from 'inline-transform-parser';

let el              = document.querySelector('.myEl');
let transformParser = new TransformParser( el );

transformParser.transform3d.x.value = 52.5;
transformParser.transform3d.y.value = 100.89;
transformParser.transform3d.y.unit  = 'px';
transformParser.transform3d.z.value = 0;

el.style.transform = transformParser.stringify();

/*
    // Result
    <div class="myEl" style="transform: transform3d( 52.5px, 100.89px, 0px ) rotate(30deg)"></div>
*/

```
### Helpful info
 - You can update any transform type on the element you feed the parser. So if you needed to you can change the rotation and any other property you wish.
 - Each transform type will have its value as an object of key value pairs. In the example above you see each key for transform3d has a value and unit both of which you can change. 
