import { Icon, MinimalButton, Position, Tooltip, Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import * as React from 'react';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/bookmark/lib/styles/index.css';
import '@react-pdf-viewer/open/lib/styles/index.css';
import { bookmarkPlugin } from '@react-pdf-viewer/bookmark';
import { openPlugin } from '@react-pdf-viewer/open';

import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';

// Import styles
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
const TOOLTIP_OFFSET = { left: 8, top: 0 };
function PdfViewerWithUploadBtn(){
    const [sidebarOpened, setSidebarOpened] = React.useState(false);
    const bookmarkPluginInstance = bookmarkPlugin();
    
    const { Bookmarks } = bookmarkPluginInstance;
    const toolbarPluginInstance = toolbarPlugin();
    const { Toolbar } = toolbarPluginInstance;
    const pageNavigationPluginInstance = pageNavigationPlugin();

    const { CurrentPageInput, GoToFirstPageButton, GoToLastPageButton, GoToNextPageButton, GoToPreviousPage } =
    pageNavigationPluginInstance;

    const openPluginInstance = openPlugin();
    const { OpenButton } = openPluginInstance;
    return (
        
        <div
            className="rpv-core__viewer"
            style={{
                border: '1px solid rgba(0, 0, 0, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                height: '700px',
                width: '600px',
                
            }}
        >
            <div
                style={{
                    alignItems: 'center',
                    backgroundColor: '#eeeeee',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    padding: '4px',
                }}
            >
                <div style={{ marginRight: '0.25rem' }}>
                        <Tooltip
                            position={Position.BottomLeft}
                            target={
                                <MinimalButton
                                    ariaLabel="Toggle the bookmarks"
                                    isSelected={sidebarOpened}
                                    onClick={() => setSidebarOpened((opened) => !opened)}
                                >
                                    <Icon size={16}>
                                        <rect x="0.5" y="0.497" width="22" height="22" rx="1" ry="1" />
                                        <line x1="7.5" y1="0.497" x2="7.5" y2="22.497" />
                                    </Icon>
                                </MinimalButton>
                            }
                            content={() => 'Toggle the bookmarks'}
                            offset={TOOLTIP_OFFSET}
                        />
                    </div>
                
                
                <OpenButton />
                <div style={{ padding: '0px 2px' }}>
                    <GoToFirstPageButton />
                </div>
                <div style={{ padding: '0px 2px' }}>
                    <GoToPreviousPage />
                </div>
                <div style={{ padding: '0px 2px' }}>
                    <CurrentPageInput />
                </div>
                <div style={{ padding: '0px 2px' }}>
                    <GoToNextPageButton />
                </div>
                <div style={{ padding: '0px 2px' }}>
                    <GoToLastPageButton />
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    flex: 1,
                    overflow: 'hidden',
                }}
            >
                <div
                        style={{
                            borderRight: sidebarOpened ? '1px solid rgba(0, 0, 0, 0.3)' : 'none',
                            overflow: 'auto',
                            transition: 'width 400ms ease-in-out',
                            width: sidebarOpened ? '30%' : '0%',
                        }}
                >
                        <Bookmarks />
                </div>
                <div
                    style={{
                        flex: 1,
                        overflow: 'hidden',
                    }}
                >
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/legacy/build/pdf.worker.js">
                        <Viewer fileUrl="test.pdf" plugins={[openPluginInstance,pageNavigationPluginInstance,bookmarkPluginInstance]} />
                    </Worker>
        
                </div>
        </div>
    </div>
    );
};

export default PdfViewerWithUploadBtn;