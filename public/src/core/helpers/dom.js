/*
 * Select a DOM element
 *
 * @param {array} elements
 * @return {array} response
 */
export function select(...elements) {
  if(typeof elements[0] === 'object') {
    return elements;
  }

  let response = [];
  elements.forEach(element => {
    response = [
      ...response,
      ...[].slice.call(document.querySelectorAll(element))
    ];
  });
  return response;
};



/*
 * Find a DOM element
 * in the context
 *
 * @param {array} elements
 * @return {array} response
 */
export function find(element) {
  return [].slice.call(this[0].querySelectorAll(element));
}



/*
 * Add a className
 * on a DOM element
 *
 * @param {string} className
 * @return {array} this
 */
export function addClass(className) {
  this.forEach(element => element.classList.add(className));
  return this;
};



/*
 * Return a className
 * of DOM elements
 *
 * @return {array}
 */
export function getClass() {
  return this[0].className;
};



/*
 * Remove a className
 * of a DOM element
 *
 * @param {string} className
 * @return {array} this
 */
export function removeClass(className) {
  this.forEach(element => element.classList.remove(className));
  return this;
};



/**
 * Add an event listener
 * to a DOM element
 *
 * @param {string} type
 * @param {func} listener
 * @return {array}
 */
export function on(type, listener, capture = false) {
  this.forEach(element => {
    element.addEventListener(type, e => {
      listener(element, e);
    }, capture);
  });
  return this;
};



/**
 * Get data attribute
 * of a DOM elemen
 *
 * @return {string} name
 * @return {string}
 */
export function getData(name) {
  return this[0].getAttribute(`data-${name}`); // dataset don't work on IE9
};



/**
 * Return the parent of
 * a DOM element
 *
 * @return {array}
 */
export function parent() {
  return this.map(element => element.parentNode);
};



/**
 * Change text value
 * of a DOM element
 *
 * @return {string} value
 */
export function text(value) {
  return this.forEach(element => {
      element.innerText = value;
  });
};
