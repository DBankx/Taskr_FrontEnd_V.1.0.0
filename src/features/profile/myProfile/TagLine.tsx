import React, {useState, lazy, Suspense} from "react";
import {observer} from "mobx-react-lite";
import {EditIcon} from "../../../infrastructure/icons/Icons";
import InlineLoader from "../../../application/appLayout/InlineLoader";
const TagLineForm = lazy(() => import("../forms/TaglineForm"));

interface IProps{
    tagline: string;
}

const TagLine : React.FC<IProps> = ({tagline}) => {
    const [isEditingTagLine, setIsEditingTagLine] = useState(false);
    return (
        <div>
            <p className="text__light text__mpx text__italic">&quot;{tagline ? tagline : "--"}&quot;</p>
            <span style={{cursor: "pointer"}} className="text__blue" onClick={() => setIsEditingTagLine(!isEditingTagLine)}>{isEditingTagLine ? <span>&#8722;</span> : <EditIcon boxSize={5} />} Edit tagline</span>
            {isEditingTagLine && (
                <Suspense fallback={<InlineLoader />}>
                    <TagLineForm tagline={tagline} cancelEditing={setIsEditingTagLine}/> 
                </Suspense>
            )}
        </div>
    )
}

export default observer(TagLine);