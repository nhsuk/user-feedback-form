# User Feedback Form

A javascript plugin to add a user feedback form to your website

## Quickstart

### npm

Install from npm (TODO: release package to npm)
```bash
npm install ___
```

Use script in your javascript build

```js
import userFeedbackForm from '___';

userFeedbackForm("#my-div-id");
```

### script

If you do not have a node-based javascript frontend build, you can use the minified javascript distribution.

The latest javascript file can be found in github releases https://github.com/nhsuk/user-feedback-form/releases (TODO: release to github)

```html
<!-- in the html <head> -->
<script src="./user-feedback-form.min.js" defer></script>

...

<!-- where you want the form to appear -->
<div id="nhsuk-user-feedback-form"></div>
```

## API

- `userFeedbackForm(cssSelector)`

Adds the user feedback form inside a `<div>` element. `cssSelector` will be used to select the div from the DOM.

`cssSelector` is `'#nhsuk-user-feedback-form'` by default.

## Contributing

### Development

Run `npm start` to start a development server. A test site will be available at http://localhost:8080/tests/example/

### Style

Run `npm run lint` to run eslint code linting.

### Tests

Run `npm test` to run all tests.
