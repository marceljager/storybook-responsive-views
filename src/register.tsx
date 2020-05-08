import React from 'react'
import addons, { types } from '@storybook/addons'

import Tool from './Tool'

addons.register('storybook-responsive-views', () => {
  addons.addPanel('storybook-responsive-views/panel', {
    title: 'Responsive Views',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story',
    render: () => <Tool />,
  });
});
