export default function patchVector(p5, fn, lifecycles){

  // An empty vector detaults to a 3D vector.
  p5.decorateHelper('createVector', function(target){
    return function(...args){
      if(args.length === 0){
        p5._friendlyError(
          'In 1.x, createVector() was a shortcut for createVector(0, 0, 0). In 2.x, p5.js has vectors of any dimension, so you must provide your desired number of zeros. Use createVector(0, 0) for a 2D vector and createVector(0, 0, 0) for a 3D vector.'
        );
        return new p5.Vector(0, 0, 0);
      }else{
        return target.call(this, ...args);
      }
    };
  });

  const formatOtherVector = function(target){
    return function(...args){

      print("formatOtherVector")

      if (args[0] instanceof Vector) {
        args = args[0].values;
      } else if (Array.isArray(args[0])) {
        args = args[0];
      }

      return target.call(this, ...args);
    };

  }

  p5.decorateHelper('add', formatOtherVector);
  //p5.decorateHelper('mult', formatOtherVector);
  //p5.decorateHelper('sub', formatOtherVector);
  //p5.decorateHelper('div', formatOtherVector);
  //p5.decorateHelper('rem', formatOtherVector);

}
