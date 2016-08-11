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
