/**
 * Inserts html into the container element.
 * Returns the new DOM element containing the html. Useful for attaching listeners to it's contents
 *
 * @param {HTMLElement} container DOM node to insert the new html into
 * @param {string} html HTML to insert into the container
 *
 * @returns {HTMLElement} A new div element containing the given html
 */
export default (container, html) => {
  // Remove all container children before adding new html
  container.childNodes.forEach((child) => {
    child.remove();
  });

  // Create a new element to insert into the container
  const newChild = document.createElement('div');
  newChild.className = 'nhsuk-user-feedback-form';
  newChild.innerHTML = html;
  container.appendChild(newChild);
  return newChild;
};
