import React from 'react';
import { Icons, IconButton } from '@storybook/components';
import addons from '@storybook/addons';
import { getDefaultState } from './Decorator';

const Tool = () => {
  const channel = addons.getChannel();
  const [ viewsEnabled, setViewsEnabled ] = React.useState(getDefaultState('responsive-addons/views'));
  const [ containerEnabled, setContainerEnabled ] = React.useState(getDefaultState('responsive-addons/container'));

  const handleEnableViews = () => {
    setViewsEnabled(!viewsEnabled);
    localStorage.setItem('responsive-addons/views', (!viewsEnabled).toString());
    channel.emit('responsive-addons/views', !viewsEnabled);
  };

  const handleEnableContainer = () => {
    setContainerEnabled(!containerEnabled);
    localStorage.setItem('responsive-addons/container', (!containerEnabled).toString());
    channel.emit('responsive-addons/container', !containerEnabled);
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
