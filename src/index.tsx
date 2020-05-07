import React from 'react'
import { makeDecorator } from '@storybook/addons';

import { Decorator, ResponsiveContextConsumer } from './Decorator';

export const withResponsiveViews = makeDecorator({
  name: 'withResponsiveViews',
  parameterName: 'responsiveViews',
  wrapper: (getStory, context, { options }) =>
    <Decorator breakpoints={options}>{getStory(context)}</Decorator>,
})

export const ResponsiveViewContextConsumer = ResponsiveContextConsumer
