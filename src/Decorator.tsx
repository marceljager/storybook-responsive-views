import React from 'react';
import Parser from 'html-react-parser';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import addons, { StoryApi } from '@storybook/addons';

interface IDecoratorProps {
  breakpoints: { [key: string]: { width: number, container?: any } }
  children: StoryApi;
}

export const getDefaultState = (name: string) => JSON.parse(localStorage.getItem(name) || '') || false;

export const ResponsiveContextConsumer = FrameContextConsumer;

export const Decorator: React.FC<IDecoratorProps> = ({ breakpoints, children }) => {
  const [ viewsEnabled, setViewsEnabled ] = React.useState(getDefaultState('responsive-views/views'));
  const [ containerEnabled, setContainerEnabled ] = React.useState(getDefaultState('responsive-views/container'));
  
  const viewports = React.useMemo(() => Object.entries(breakpoints).reduce(
    (acc: { name: string, width: string, container: any }[], view) => {
      const name = view[0];
      const { width, container } = view[1];

      const belowBreakpoint = {
        name: `${name.toUpperCase()}: ${width - 1}px (limit before breakpoint)`,
        width: `${width - 1}px`,
        container
      };
      const breakpoint = { name: `${name.toUpperCase()}: ${width}px`, width: `${width}px`, container };
      return [...acc, belowBreakpoint, breakpoint];
    },
    [],
  ), [breakpoints]);

  React.useEffect(() => {
    const channel = addons.getChannel();
    channel.on('responsive-views/views', setViewsEnabled);
    channel.on('responsive-views/container', setContainerEnabled);
  }, []);

  /**
   * All storybook stories are rendered inside an iFrame that contains the styles
   * We have to parse the document's head to extract all the styles that are applied
   * to the components being rendered.
   *
   * We also filter elements that are not object because the parser sometimes returns
   * empty elements which cause errors on the Frame component
   */
  const reactHtmlHead = [...Array(Parser(document.head.innerHTML))].filter((element) => typeof element === 'object');
  return viewsEnabled 
    ? <div style={{ display: 'flex' }}>
        {viewports.map(({ name, width, container }) => (
          <div key={width} style={{ margin: 15 }}>
            <span style={{ fontSize: 12, display: 'block', marginBottom: 10, color: '#999' }}>{name}</span>
            <div style={{ height: 'calc(100vh - 80px)', width }}>
              {/*
              * Every viewport content must be rendered inside an iFrame to ensure
              * that all the component's media queries are really activated when its
              * content is rendered inside each viewport
              */}
              <Frame
                head={reactHtmlHead}
                title={name}
                style={{
                  height: '100%',
                  width: '100%',
                  border: 'none',
                  boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.1)',
                }}
              >
                {containerEnabled && container
                  ? (
                    <div style={{ margin: '0 auto', ...container }}>
                      <div style={{ overflowX: 'hidden' }}>
                        {children}
                      </div>
                    </div>
                  ) : (
                    <div style={{ overflowX: 'hidden', paddingBottom: '50px' }}>
                      {children}
                    </div>
                  )
                }
              </Frame>
            </div>
          </div>
        ))}
      </div>
  : <div style={{ margin: 15 }}>{children}</div>
}

export default Decorator;
