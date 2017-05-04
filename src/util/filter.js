export function brightnessFilter(pixels) {
    var d = pixels.data;
    var value = 100;
    for(var i =0; i< d.length; i+=4){
        d[i] += value/3;
        d[i+1] += value/3;
        d[i+2] += value/3;
    }
    return pixels;
}

export function invertFilter(pixels) {
    var d = pixels.data;
    for(let i=0; i < pixels.data.length; i+=4 ){
        d[i] = 255 - d[i];     // R
        d[i+1] = 255 - d[i+1]; // G
        d[i+2] = 255 - d[i+2]; // B
        d[i+3] = 255;          // Alpha
    }
    return pixels;
}

export function grayscaleFilter(pixels) {
    var d = pixels.data;
    for(var i =0; i < d.length; i+=4){
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];

        var v = 0.2126*r + 0.7152*g + 0.0722*b;  // 보정값
        d[i] = d[i+1] = d[i+2] = v ;              // RBG 색을 같게 맞추자
    }
    return pixels;
}

export function sepiaFilter(pixels) {
    var d = pixels.data;
    for(var i =0; i < d.length; i+=4){
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];

        d[i] = r*0.3588 + g*0.7044 + b*0.1368;
        d[i+1] = r*0.2990 + g*0.5870 + b*0.1140;
        d[i+2] = r*0.2392 + g*0.4696 + b*0.0912;
    }
    return pixels;
}

function convolution(pixels, weights, opaque) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  var side = Math.round(Math.sqrt(weights.length)); // 이미지 필터 가중치
  var halfSide = Math.floor(side/2); // 가중치 절반 값 저장
  var src = pixels.data; // 원본 데이터
  var sw = pixels.width; // 원본 데이터 넓이
  var sh = pixels.height; // 원본 데이터 높이
  var w = sw;
  var h = sh;
  var output = ctx.createImageData(w, h);
  var dst = output.data;
  var alphaFac = opaque ? 1 : 0;

  for (var y=0; y<h; y++) {
    for (var x=0; x<w; x++) {
      var sy = y;
      var sx = x;
      var dstOff = (y*w+x)*4;
      var r=0, g=0, b=0, a=0;

      for (var cy=0; cy<side; cy++) {
        for (var cx=0; cx<side; cx++) {
          var scy = sy + cy - halfSide;
          var scx = sx + cx - halfSide;

          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            var srcOff = (scy*sw+scx)*4;
            var wt = weights[cy*side+cx];
            r += src[srcOff] * wt;
            g += src[srcOff+1] * wt;
            b += src[srcOff+2] * wt;
            a += src[srcOff+3] * wt;
          }
        }
      }
      dst[dstOff] = r;
      dst[dstOff+1] = g;
      dst[dstOff+2] = b;
      dst[dstOff+3] = a + alphaFac*(255-a);
    }
  }
  return output;
}

export function sobel (pixels) {
    return convolution(pixels,
          [ -1,  0,  1,
            -2,  0,  2,
            -1,  0,  1], 1);
}

export function sharpen(pixels){
    return convolution(pixels,
          [ -1, -1,  -1,
            -1,  8,  -1,
            -1, -1,  -1 ], 1);
}

export function blur(pixels) {
    var value = 70;
    var offset = 1/(value/10);

    return convolution(pixels,
           [offset,  offset,  offset,
            offset,  offset,  offset,
            offset,  offset,  offset ], 1);
}
