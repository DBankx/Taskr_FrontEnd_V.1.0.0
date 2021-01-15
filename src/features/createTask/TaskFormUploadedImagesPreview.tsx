import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../application/stores/rootstore";
import { SimpleGrid, Image, Button, Link } from "@chakra-ui/react";

const TaskFormUploadedImagesPreview = () => {
    const {removePreviewImages, uploadedTaskFormFiles} = useContext(rootStoreContext).appStore;
    useEffect(() => {
        return () => {
            uploadedTaskFormFiles.forEach(file => URL.revokeObjectURL(file.preview));
           removePreviewImages(); 
        }
    }, []) 
    return (
        <SimpleGrid spacing="10px" templateColumns={{xl: "1fr 1fr", lg: "1fr 1fr", md: "1fr 1fr", sm: "1fr"}} >
            {uploadedTaskFormFiles.map((file) => (
                <div key={file.name} className="task__form__preview__card">
                <Image src={file.preview} alt="preview" />
                <div className="task__form__preview__card__overlay">
                    <div className="content">
                        <p>Filename: {file.name}</p>
                        <p>Size: {file.size}KB</p>
                        <p>File type: {file.type}</p>
                        <Button as={Link} isExternal href={file.preview} className="btn btn__sm">View photo</Button>
                    </div>
                </div>
                </div>
            ))}
        </SimpleGrid>
    )
}

export default observer(TaskFormUploadedImagesPreview);