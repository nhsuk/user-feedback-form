export default class PostData {
  /**
   * @param {string} endpoint - API endpoint to post data to
   */
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  /**
   * Get the http endpoint to send data to
   */
  getEndpoint() {
    return this.endpoint;
  }

  /**
   * Send data to the backend using JSON encoding.
   * The HTTP request is fire-and-forget. This app does not have to deal with any response.
   * @param {Object} data
   */
  post(data) {
    const request = new XMLHttpRequest();
    const endpoint = this.getEndpoint();
    request.open('POST', endpoint);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.send(JSON.stringify(data));
  }

  /**
   * send a positive response to the server
   */
  postYes() {
    this.post({
      answer: 'yes',
    });
  }

  /**
   * send a negative response to the server
   */
  postNo() {
    this.post({
      answer: 'no',
    });
  }

  /**
   * send text comment to the server
   */
  postComment(comment) {
    this.post({
      comment,
    });
  }
}
