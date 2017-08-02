/**
 * Wrap value into promised value
 **/
class PromisedValue {
  constructor () {
    this.touched = false;
    this.outstandings = [];
  }

  /**
   * Get value, when value not ready wait (until timeout if parameter timeout specified)
   *
   * @param {number} timeout Milliseconds of waiting until timeout, default: -1
   *
   * @return {Promise}
   */
  get (timeout = -1) {
    if (this.touched) {
      return this.value;
    }

    return new Promise((resolve, reject) => {
      let t;

      if (timeout >= 0) {
        t = setTimeout(() => reject(new Error('Got timeout')), timeout);
      }

      this.outstandings.push([ resolve, reject, t ]);
    });
  }

  /**
   * Set a value
   *
   * @param {*} value Set value
   */
  set (value) {
    this.value = value;
    this.touched = true;


    if (this.outstandings.length) {
      this.outstandings.forEach(([ resolve, reject, t ]) => {
        clearTimeout(t);
        resolve(value);
      });

      this.outstandings = [];
    }
  }
}

module.exports = PromisedValue;
