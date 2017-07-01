
'use strict';

////////////////////////////////////

export const freezeExistingProps = function (obj: any) {

  try {
    Object.keys(obj).forEach(function (key) {
      Object.defineProperty(obj, key, {
        writable: false
      });
    });
  }

  catch (err) {}

  return obj;

};
