/**
  * @Filename: breakPoint.js
  * @Description: detect window sizes & devices
*/

exports.breakPoint = ( size ) =>
{

    let bp = {
        xsmall            : 320,
        small             : 480,
        medium            : 768,
        large             : 1023,
        xlarge            : 1280,
        xxlarge           : 1440,
        xxxlarge          : 1800
    };

    return window.innerWidth >= bp[size];
};


