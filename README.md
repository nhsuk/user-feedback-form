# User Feedback Form

A javascript plugin to add a user feedback form to your website.

You will also need a backend data store. See [user-feedback-store](https://github.com/nhsuk/user-feedback-store).

## Quickstart

### npm

Install from npm
```bash
npm install @nhsuk/user-feedback-form
```

Use script in your javascript build

```js
import userFeedbackForm from '@nhsuk/user-feedback-form';

userFeedbackForm({
    cssSelector: "#my-div-id",
    formEndpoint: "https://example.com/my-api-endpoint/",
    enableTextResponse: false,
});
```

### script

If you do not have a node-based javascript frontend build, you can use the minified javascript distribution.

The latest javascript file can be found in github releases https://github.com/nhsuk/user-feedback-form/releases

```html
<!-- in the html <head> -->
<script src="./user-feedback-form.min.js" defer></script>

...

<!-- where you want the form to appear -->
<div id="nhsuk-user-feedback-form" data-form-endpoint="https://example.com/endpoint/" data-enable-text-response="false"></div>
```

#### Attributes

`data-form-endpoint` - (required) An HTTP data store endpoint to POST data to. Include the trailing slash
`data-enable-text-response` - (optional) If "true", text responses will be enabled. If "false" or left out,
text responses will not be disabled.

## API

- `userFeedbackForm(settings)`

Adds the user feedback form inside a `<div>` element. `settings.cssSelector` will be used to select the div from the DOM.

`settings` should be an object containing:

* `formEndpoint` - (required) An HTTP data store endpoint to POST data to.
* `cssSelector` - (optional) HTML selector insert the form into. `'#nhsuk-user-feedback-form'` by default.

### Events

An `onFeedback` event is emitted when the user gives satisfied or unsatisfied feedback by clicking on the yes or no buttons.

You can listen to this event to trigger custom javascript code.

```js
// Listen to the event on the container div
document.querySelector("#nhsuk-user-feedback-form").addEventListener('onFeedback', (event) => {
  // custom code using the boolean `isSatisfied` value.
  console.log(event.detail.isSatisfied)
});
```

## Contributing

### Development

Run `npm install` followed by `npm start` to start a development server. A test site will be available at http://localhost:8080/tests/example/

### Style

For now, this app is very simple, so we don't use any libraries like Vue or React.
The `App` class in `src/index.js` represents the app as a whole.
Each screen has it's own class which can be instantiated and rendered with the `render` method when the screen should be displayed.
The screen classes are responsible for screen-level interactions such as rendering, attaching event listeners and input validation.

Run `npm run lint` to run eslint code linting.

### Tests

Run `npm test` to run all tests.
