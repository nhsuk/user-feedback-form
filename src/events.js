export default function OnFeedbackEvent(satisfied, container) {
  const event = new Event('onFeedback', { isSatisfied: satisfied });
  container.dispatchEvent(event);
}
