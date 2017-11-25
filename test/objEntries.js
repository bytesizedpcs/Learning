(Object.entries = function(obj) {
  // Get object keys
  const ownProps = Object.keys(obj);
  // Get Object length
  const i = ownProps.length;
  // Preallocate Array (Polyfill)
  const resArray = new Array(i);

  while (i--)
    // Assign obj keys and obj values
    // to new array
    resArray[i] = [ownProps[i], obj[ownProps[i]]];

  // return array
  return resArray;
})();
