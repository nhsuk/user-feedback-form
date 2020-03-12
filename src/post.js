/**
 * Get the http endpoint to send data to
 */
const getEndpoint = () => 'http://localhost:8080';

/**
 * Send data to the backend using JSON encoding.
 * The HTTP request is fire-and-forget. This app does not have to deal with any response.
 * @param {Object} data
 */
const postData = (data) => {
  const request = new XMLHttpRequest();
  const endpoint = getEndpoint();
  request.open('POST', endpoint);
  request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  request.send(JSON.stringify(data));
};

/**
 * send a positive response to the server
 */
export const postYes = () => {
  postData({
    answer: 'yes',
  });
};

/**
 * send a negative response to the server
 */
export const postNo = () => {
  postData({
    answer: 'no',
  });
};

/**
 * send text comment to the server
 */
export const postComment = (comment) => {
  postData({
    comment,
  });
};
