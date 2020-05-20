/**
 * Dispatches event named onFeedback
 * Implement an addEventListener at the event target to utilise
 *
 * @param {HTMLElement} container DOM node to define event target
 * @param {boolean} satisfied Bool to send user satisfaction
 */
export default function OnFeedbackEvent(container, satisfied) {
  const event = new Event('onFeedback', { isSatisfied: satisfied });
  container.dispatchEvent(event);
}
