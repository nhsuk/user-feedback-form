/**
 * IE polyfill to create CustomEvent objects
 * Taken from https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
 */
(function customEventPolyFill() {
  if (typeof window.CustomEvent === 'function') return;

  function CustomEvent(event, params) {
    // eslint-disable-next-line no-param-reassign
    params = params || { bubbles: false, cancelable: false, detail: null };
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  window.CustomEvent = CustomEvent;
}());

/**
 * Dispatches event named onFeedback
 * Implement an addEventListener at the event target to utilise
 *
 * @param {HTMLElement} container DOM node to define event target
 * @param {boolean} satisfied Bool to send user satisfaction
 */
export default function onFeedbackEvent(container, satisfied) {
  const event = new CustomEvent('onFeedback', { detail: { isSatisfied: satisfied } });
  container.dispatchEvent(event);
}
