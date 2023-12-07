import {Icon, 
    MinimalButton, 
    Position, 
    Tooltip, 
    Viewer,} from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';

import * as React from 'react';
import  { useContext } from 'react';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/bookmark/lib/styles/index.css';
import '@react-pdf-viewer/open/lib/styles/index.css';
import { bookmarkPlugin } from '@react-pdf-viewer/bookmark';
import { openPlugin } from '@react-pdf-viewer/open';

import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';

import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import { PdfContext } from '../../context/context.js'; 
import {MyChatbot} from '../chatbot/Chatbot.js'
import './PdfViewer.css'
const TOOLTIP_OFFSET = { left: 8, top: 0 };


const PdfViewerWithUploadBtn = () => {
    const { myString, updateMyString,updateVectorDatabase } = useContext(PdfContext);
    const handleDocumentLoad = async (e) => {
        // const myContext = useContext(PdfContext);
        
        let numPages = e.doc.numPages;
        let docs =  [];
        let pdf = e.doc;
        let pagePromises = [];
        for (let j = 1; j <= numPages; j++) {
            const pagePromise = pdf.getPage(j).then(function(page) {
                // get the first page
                return page.getTextContent();
            }).then(function(textContent) {
                // textContent 是包含页面文本内容的一个对象
                // 它包含一个包含各个文本项的数组，每个文本项表示页面上的一段文本
                // 我们可以拼凑这些项来得到整个页面的文本
            
                let textItems = textContent.items;
                let pageText = textItems.map(item => item.str).join(" "); 
                // docs+=pageText;
                docs[j-1] = pageText;
            
            }).catch(function(error) {
                // 如果在获取页面或者页面文本内容的过程中出现错误，我们在这里处理
                console.error("Error: " + error);
            });
            pagePromises.push(pagePromise);
        }
        await Promise.all(pagePromises);
        let finalDocs = docs.join(" ");
        console.log('--------')
        updateMyString(finalDocs);
        updateVectorDatabase(finalDocs)
        // console.log(`${finalDocs}`); // 打印出整个页面的文本

    };
    const [sidebarOpened, setSidebarOpened] = React.useState(false);
    const bookmarkPluginInstance = bookmarkPlugin();
    const { Bookmarks } = bookmarkPluginInstance;
    const pageNavigationPluginInstance = pageNavigationPlugin();

    const { CurrentPageInput, GoToFirstPageButton, GoToLastPageButton, GoToNextPageButton, GoToPreviousPage } =
    pageNavigationPluginInstance;

    const openPluginInstance = openPlugin();
    const { OpenButton } = openPluginInstance;

    let docs ='';
    return (
        // border: '1px solid black',
        //     margin: '1rem',
        //     padding: '2rem 2rem',
        //     text-align: 'center',
        //     min-height: '100vh',
        <>
        <div style={{
            border: '1px solid black',
            margin: '1rem',
            padding: '0rem 0rem',
            height: '7vh',
           }}>
            <div style={{
                    display: 'flexbox',
                    backgroundColor: '#357edd',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    padding: '8px',
                    width: '100%',
                    
                    
            }}>
                <OpenButton />

            </div>
            </div>
            <div className= 'parent'>
                <div id = "element1">
                    <div
                            className="rpv-core__viewer"
                            style={{
                                border: '1px solid rgba(0, 0, 0, 0.3)',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100vh',
                                width: '100%',
                                
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
                                    height: '100vh',
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
                                        height: '100vh',
                                    }}
                                >
                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/legacy/build/pdf.worker.js">
                                        <Viewer fileUrl="test.pdf"  
                                                plugins={[openPluginInstance,
                                                        pageNavigationPluginInstance,
                                                        bookmarkPluginInstance]} 
                                                onDocumentLoad={handleDocumentLoad}/>
                                    </Worker>
                        
                                </div>
                                </div>
                    </div>
                </div>
                <div id = "element2">
                        
                    <MyChatbot />
                        
                </div>
            </div>
            
        </>
    );
}

export default PdfViewerWithUploadBtn;