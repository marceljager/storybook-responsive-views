# storybook-responsive-views
View your Storybook stories in a range of responsive viewports

## Installation
Install the following npm module

```
npm install @marceljager/storybook-responsive-views
```

## Basic usage

`withResponsiveViews` is added as a decorator to your stories.

First, register the addon in `main.js`. This gives you access to toggle the views on/off in the Storybook toolbar.

```js
// .storybook/main.js
module.exports = {
  ...
  addons: [
    '@marceljager/storybook-responsive-views/register',
    ...
  ],
  ...
}
```

Then you can either add it globally to all stories, or to a story individually

```js
// .storybook/preview.js
import { addDecorator } from '@storybook/react'
import { withResponsiveViews } from '@marceljager/storybook-responsive-views/register'

addDecorator(withResponsiveViews);
```

## Breakpoint config

For each breakpoint, `withResponsiveViews` will create a view at 1px below the breakpoint and the breakpoint itself.
To set your own breakpoints, pass an object to the `withResponsiveViews` decorator. An example:

```js
// .storybook/preview.js
addDecorator(
  withResponsiveViews({
    sm: { width: 576 },
    md: { width: 768 },
    lg: { width: 992 },
    xl: { width: 1200 },  
  })
)
```

## Containers config

To set add containers to your breakpoints, add `container: { cssSelector: value }` to an object. An example:

```js
// .storybook/preview.js
addDecorator(
  withResponsiveViews({
    sm: { width: 576, container: { maxWidth: 480, padding: '0 10px', } },
    md: { width: 768, container: { maxWidth: 740, padding: '0 10px', } },
    lg: { width: 992, container: { maxWidth: 920, padding: '0 15px', } },
    xl: { width: 1200, container: { maxWidth: 1140, padding: '0 20px', } },  
  })
)
```
