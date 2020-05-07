# storybook-addon-responsive-views
View your Storybook stories in a range of responsive viewports

## Installation
Install the following npm module

```
npm install storybook-responsive-views
```

## Basic usage

`withResponsiveViews` is added as a decorator to your stories.

First, register the addon in `preview.js`. This gives you access to toggle the views on/off in the Storybook toolbar.

```js
import 'storybook-responsive-views/register'
```

Then you can either add it globally to all stories, or to a story individually

```js
// Globally in .storybook/preview.js
import { addDecorator } from '@storybook/react'
import { withResponsiveViews } from 'storybook-responsive-views'

addDecorator(withResponsiveViews);
```

## Breakpoint config

For each breakpoint, `withResponsiveViews` will create a view at 1px below the breakpoint and the breakpoint itself, as well as a 320px minimum view.

To set your own breakpoints, pass an object to the `withResponsiveViews` decorator. This can be done both on the global or local level by passing in a breakpoints object. You can add as many breakpoints as you like, with any key name you want. The key name is used in the view title. An example:

```js
addDecorator(
  withResponsiveViews({
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,  
  })
)
```
