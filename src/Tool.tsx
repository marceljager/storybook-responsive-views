import React from 'react';
import { Icons, IconButton } from '@storybook/components';
import addons from '@storybook/addons';
import { getDefaultState } from './Decorator';

const Tool = () => {
  const channel = addons.getChannel();
  const [ viewsEnabled, setViewsEnabled ] = React.useState(getDefaultState('responsive-views/views'));
  const [ containerEnabled, setContainerEnabled ] = React.useState(getDefaultState('responsive-views/container'));

  const handleEnableViews = () => {
    setViewsEnabled(!viewsEnabled);
    localStorage.setItem('responsive-views/views', (!viewsEnabled).toString());
    channel.emit('responsive-views/views', !viewsEnabled);
  };

  const handleEnableContainer = () => {
    setContainerEnabled(!containerEnabled);
    localStorage.setItem('responsive-views/container', (!containerEnabled).toString());
    channel.emit('responsive-views/container', !containerEnabled);
  };

  return (
    <>
      <IconButton title="Enable responsive views" onClick={handleEnableViews} active={viewsEnabled}>
        <Icons icon="switchalt" />
      </IconButton>
      {viewsEnabled && 
        <IconButton title="Enable container" onClick={handleEnableContainer} active={containerEnabled}>
          <Icons icon="cog" />
        </IconButton>
      }
    </>
  )
}

export default Tool;
