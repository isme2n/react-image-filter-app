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
