import {useState} from 'react'
import './PdfViewer.css'
// Import Worker
import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import {MyChatbot} from '../chatbot/Chatbot.js'

import { PdfContext } from '../../context/context.js'; 
import  { useContext } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { useEffect } from 'react';



pdfjsLib.GlobalWorkerOptions.workerSrc= "https://unpkg.com/pdfjs-dist@3.4.120/legacy/build/pdf.worker.js";
const PdfViewer = () => {
    const { currentShowFile,
            currentShowFileObj,
            updateFileList,
            updateFileObjs, 
            updateDocs,
            updateCurrentShowFile,
            updateCurrentShowFileObj,
            updateVectorDatabase } = useContext(PdfContext);
    useEffect(() => {
        console.log(currentShowFile)
                // 放置组件需要做的操作，例如 fetch 数据，或者更新状态
            }, [currentShowFile]);
    // creating new plugin instance
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    // pdf file onChange state
    // const [pdfFile, setPdfFile]=useState(null);

    // pdf file error state
    const [pdfError, setPdfError]=useState('');

    // handle file onChange event
    const allowedFiles = ['application/pdf'];
    const handleFile = async (e) =>{
        //更新文件名和文件列表
        let filesName = []
        let files = []

        let finalText = "";
        let promises = [];
        // let selectedFile = e.target.files[0];
        for (let selectedFile of e.target.files){
            filesName.push(selectedFile.name)
            
            if(selectedFile){
                if(selectedFile&&allowedFiles.includes(selectedFile.type)){
                    
                    let reader = new FileReader();
                    reader.readAsDataURL(selectedFile);
                    
                    // const loadPromise = reader.onloadend=async (e)=>{
                    let promise = new Promise((resolve, reject) => {
                        reader.onloadend=async (e)=>{
                            
                            files.push({_file:e.target.result,_fileName:selectedFile.name})
                            const res = await fetch(e.target.result);
                            const buffer = await res.arrayBuffer();
                            
                            // 加载PDF文档
                            let loadingTask = pdfjsLib.getDocument({data: buffer});
                            const pdf = await loadingTask.promise;

                            for (let i = 1; i <= pdf.numPages; i++) {
                                const page = await pdf.getPage(i);

                                const textContent = await page.getTextContent();
                                const strings = textContent.items.map(item => item.str);

                                finalText += strings.join(" ") + "\n";
                            }
                            
                            // Here finalText is the variable which holds the text content of the PDF
                            resolve();
                        }
                    });
                    promises.push(promise);
                    
                } else {
                setPdfError('Not a valid pdf: Please select only PDF');
                
                }
            } else {
            console.log('please select PDF');
            }
        }
        // await Promise.all(loadPromises);
        await Promise.all(promises); 
        //设置当前文件名
        updateDocs(finalText)
        updateVectorDatabase(finalText)
        updateFileList(filesName);
        updateFileObjs(files);
        
        updateCurrentShowFile(filesName[0]);
        //设置当前文件
        updateCurrentShowFileObj(files[0]);
    }

    return (
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
                    <div
                             style={{
                                backgroundColor: '#357edd',
                                border: 'none',
                                borderRadius: '4px',
                                color: '#ffffff',
                                cursor: 'pointer',
                                padding: '8px',
                                position: 'relative',
                                textAlign: 'center',
                            }}
                        >
                        <input type='file' 
                                multiple accept='application/pdf'
                                style={{
                                    bottom: 0,
                                    cursor: 'pointer',
                                    height: '100%',
                                    left: 0,
                                    opacity: 0,
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    width: '100%',
                                }}
                                onChange={handleFile}>
                        
                        </input>

                        {/* we will display error message in case user select some file
                        other than pdf */}
                        {pdfError&&<span className='text-danger'>{pdfError}</span>}
                        加载PDF文件
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
                                            padding: '0px',
                                        }}
                                >
                                    <div
                                    style={{
                                        flex: 1,
                                        overflow: 'hidden',
                                        height: '100vh',
                                    }}
                                    >   
                                        {currentShowFileObj && currentShowFileObj._file&&(
                                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/legacy/build/pdf.worker.js">
                                            <Viewer fileUrl={currentShowFileObj._file}
                                                    plugins={[defaultLayoutPluginInstance]} 
                                            />
                                        </Worker>
                                        )}

                                        {!currentShowFileObj._file&&<p>No file is selected yet</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id = "element2">
                            
                            <MyChatbot />
                                
                        </div>
                    
                </div>
            </div>
        </>
    );


}

export default PdfViewer;
