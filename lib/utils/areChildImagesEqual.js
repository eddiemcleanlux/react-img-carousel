"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function areChildImagesEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (var i = 0; i < arr1.length; i++) {
    var src1 = arr1[i].props.src;
    var src2 = arr2[i].props.src;

    if (src1 !== src2) {
      return false;
    }
  }
  return true;
}

exports.default = areChildImagesEqual;