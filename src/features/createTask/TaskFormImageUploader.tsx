import { observer } from "mobx-react-lite";
import React, {useContext, useEffect} from "react";
import Dropzone from "react-dropzone";
import ImageIcon, {CloseIcon} from "../../infrastructure/icons/Icons";
import {Button, useMediaQuery} from "@chakra-ui/react";
import Separator from "../../application/common/Separator";
import { toast } from "react-toastify";
import Alert from "../../application/common/Alert";
import rootStoreContext from "../../application/stores/rootstore";

interface IProps{
    setFieldValue: any
}

const TaskFormImageUploader : React.FC<IProps> = ({setFieldValue}) => {
    const {setPreviewImages, uploadedTaskFormFiles, removePreviewImages} = useContext(rootStoreContext).appStore;
    const [isMobile] = useMediaQuery("(max-width: 500px)")
    useEffect(() => {
        return () => {
            uploadedTaskFormFiles.forEach(file => URL.revokeObjectURL(file.preview));
            removePreviewImages();
        }
    }, [])
    return (
        <Dropzone noClick={true} noKeyboard={true} onDropRejected={() => toast.error(<Alert type="error" subject="Error occurred" icon={<CloseIcon boxSize={8} color="#73000c"/>} message="Please upload only 3 *jpeg or *png files " />)} accept="image/jpeg, image/png" maxFiles={3} onDrop={acceptedFiles => {
            setPreviewImages(acceptedFiles.map((file: object) => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
            setFieldValue("imageFiles", acceptedFiles);
        }}>
            {({
                getRootProps,
                getInputProps,
                isDragAccept,
                isDragReject,
                fileRejections,
                open,
                acceptedFiles
              }) => (
                <section>
                    <div className={isDragAccept || acceptedFiles.length > 0 ? "image__dropzone image__dropzone__active" : isDragReject || fileRejections.length > 0 ? "image__dropzone image__dropzone__error" : "image__dropzone"} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="middle_position">
                            <ImageIcon boxSize={isMobile ? "50px" : "100px"} color={isDragAccept || acceptedFiles.length > 0 ? "#37a864" : isDragReject || fileRejections.length > 0 ? "#E12120" : "#3D3373"} />
                        <p className={isDragAccept || acceptedFiles.length > 0 ? "text__success" : isDragReject || fileRejections.length > 0 ? "text__error" : "text__darker"} style={{marginTop: "1em"}}>{isDragAccept ? "Drop selected files here!" : acceptedFiles.length > 0 ? `${acceptedFiles.length} file(s) successfully uploaded` : isDragReject || fileRejections.length > 0 ? "Only a maximum of three *.jpeg or *.png files are allowed!" :  "Drag and drop some files here,  only *.jpeg and *.png files will be allowed"}</p>
                           <Separator content="OR"/> 
                           <Button disabled={acceptedFiles.length === 3} className={`btn btn__sm ${isDragAccept || acceptedFiles.length > 0? "btn__green" : isDragReject || fileRejections.length > 0 ? "btn__error" : "btn__primary"}`} onClick={open}>Click to upload</Button>
                        </div>
                    </div>
                    {fileRejections.map(({ file, errors }) => (
                        <li className="text__error" key={file.name}>
                            {file.name} - {file.size} bytes
                            <ul className="text__error">
                                {errors.map(e => (
                                    <li key={e.code}>{e.message}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </section>
            )}
        </Dropzone>
    )
}

export default observer(TaskFormImageUploader);