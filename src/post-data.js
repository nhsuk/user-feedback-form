import { v4 as uuid } from 'uuid';

export default class PostData {
  /**
   * @param {string} endpoint - API endpoint to post data to
   */
  constructor(endpoint) {
    this.endpoint = endpoint;

    this.currentUrl = window.location.href;

    /**
     * The API endpoint will return a token which we must store and re-send with each
     * subsequent request
     */
    this.token = null;
  }

  /**
   * Get the http endpoint to send data to
   */
  getEndpoint() {
    return this.endpoint;
  }

  /**
   * Get the current URL that the user is giving feedback on
   */
  getUrl() {
    return this.currentUrl;
  }

  /**
   * Send data to the backend using JSON encoding.
   * The HTTP request is fire-and-forget. This app does not have to deal with any response.
   * @param {string} path
   * @param {Object} data
   */
  post(path, data) {
    const request = new XMLHttpRequest();
    const endpoint = this.getEndpoint();
    const url = endpoint + path;
    request.open('POST', url);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    const payload = { ...data };
    if (this.token) {
      payload.token = this.token;
    }
    request.send(JSON.stringify(payload));
    request.onload = () => {
      if (request.status >= 300) {
        // eslint-disable-next-line no-console
        console.warn('Non-2xx response received from server');
      }
    };
  }

  /**
   * send a positive response to the server
   */
  postYes() {
    this.token = uuid();
    this.post('satisfied', {
      isSatisfied: true,
      url: this.getUrl(),
    });
  }

  /**
   * send a negative response to the server
   */
  postNo() {
    this.token = uuid();
    this.post('satisfied', {
      isSatisfied: false,
      url: this.getUrl(),
    });
  }

  /**
   * send text comment to the server
   */
  postComment(comments) {
    this.post('comments', {
      comments,
    });
  }
}
