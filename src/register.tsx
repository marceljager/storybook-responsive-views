import React from 'react'
import addons, { types } from '@storybook/addons'

import Tool from './Tool'

export default () => {
  addons.register('responsive-addon', () => {
    addons.addPanel('responsive-addon/panel', {
      title: 'Responsive Views',
      type: types.TOOL,
      match: ({ viewMode }) => viewMode === 'story',
      render: () => <Tool />,
    });
  });
}
