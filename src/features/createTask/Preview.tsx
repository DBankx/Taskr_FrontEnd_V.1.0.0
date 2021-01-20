import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import copyStyles from "../../infrastructure/utils/copyStyle";

const Preview = (props: any) => {
    // create a new div element
    const [containerEl] = useState(document.createElement('div'));
    let externalWindow : any = null;

    useEffect(() => {
        externalWindow = window.open(
            '',
            '',
            `width=1290,height=700,left=200,top=200`
        );

        copyStyles(document, externalWindow.document);

        externalWindow.document.body.appendChild(containerEl);
        externalWindow.addEventListener('beforeunload', () => {
            props.closeWindow();
        });
        return function cleanup() {
            externalWindow.close();
            externalWindow = null;
        };
    }, []);

    return ReactDOM.createPortal(props.children, containerEl);
};

export default Preview;
