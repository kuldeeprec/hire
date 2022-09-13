import React, { useState } from "react";
import { Modal } from "antd";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ResumeModal = (props) => {
    const { activeResume, setActiveResume } = props;
    const [noOfPages, setNoOfPages] = useState(1);
    return (
        <Modal
            closable={false}
            destroyOnClose={true}
            footer={null}
            onCancel={() => setActiveResume()}
            title=""
            visible={true}
            width={880}
        >
            <div className="p-2">
                <div className="flex justify-end">
                    <i className="bg-silver cursor-pointer font-semibold 
                    icon icon-x px-1.5 py-0.5 rounded-full text-lg" 
                    onClick={() => setActiveResume()} />
                </div>
                <Document file={activeResume} className='skeleton-card mt-4' loading=''
                onLoadSuccess={({ numPages })=>setNoOfPages(numPages)}>
                    {
                        Array.apply(null, Array(noOfPages)).map((x, i)=>i+1)
                        .map(page => <Page pageNumber={page} height={800} width={815}/>)
                    }
                </Document>
            </div>
        </Modal>
    )
}

export default ResumeModal;