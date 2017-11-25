Array.prototype.map = function(callback) {
  // Assert if called on nothing
  if (this === null)
    throw new TypeError('This is null or undefined'):

  let t, a, k;
  let O = Object(this);
  let len = O.length >>> 0;

  if (arguments.length > 1) t = arguments[1];

  a = new Array(len);

  k = 0;

  while (k < len) {
    let kValue, mappedValue;

    if (k in O) {
      kValue = O[k];

      mappedValue = callback.call(t, kValue, k, O);

      a[k] = mappedValue;
    }
    k++;
  }
  return a;
}
