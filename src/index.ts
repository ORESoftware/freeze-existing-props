'use strict';

import assert = require('assert');

////////////////////////////////////

export interface IFEPStdObj {
  [key: string]: any
}

export const r2gSmokeTest = function () {
  return true;
};

const log = console.log.bind(console, '[freeze]');

export const freezeExistingProps = function ($obj: any, depth?: number) {

  depth = depth || 0;
  assert(Number.isInteger(depth), 'depth value must be an integer.');
  depth = Math.min(5, depth); // we freeze no more than 5 levels deep

  (function recurse(obj: IFEPStdObj, depth: number) {

    // use try/finally block

    Object.keys(obj).forEach(function (key) {

      try {
        // log('freezing property', key, 'of object', obj);
        Object.defineProperty(obj, key, {
          writable: false
        });
      }
      catch (e) {
        console.error(e.stack || e);
      }

      //depth first freezing

      if (depth > 0 && obj[key]) {
        recurse(obj[key], --depth);
      }

    });

  })($obj, depth);

  return $obj;

};

export const freezeAllProps = function ($obj: Object, depth?: number) {

  depth = depth || 0;
  assert(Number.isInteger(depth), 'depth value must be an integer.');
  depth = Math.min(5, depth); // we freeze no more than 5 levels deep

  (function recurse(obj: IFEPStdObj, depth: number) {

    try {
      Object.freeze(obj);
    }
    catch (e) {
      console.error(e.stack || e);
    }
    finally {
      Object.keys(obj).forEach(function (key) {
        //depth first freezing
        if (depth > 0 && obj[key]) {
          recurse(obj[key], --depth);
        }

      });
    }

  })($obj, depth);

  return $obj;

};
