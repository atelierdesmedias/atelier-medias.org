/**
  * @Filename: breakPoint.js
  * @Description: detect window sizes & devices
*/

// ----------------------------------------------------------------------------- IMPORTS

// ------------------------------------------------------------------------- USAGE

// ex :
// breakPoint('medium') ? (...) : (...) ;

// ------------------------------------------------------------------------- BREAKPOINT


export function breakPoint( size )
{

    let bp = {

        xsmall            : 320,
        small             : 480,
        medium            : 768,
        large             : 1024,
        xlarge            : 1280,
        xxlarge           : 1440,
        xxxlarge          : 1800

    }

    return window.innerWidth >= bp[size];

}


