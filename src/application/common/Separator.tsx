import React from "react";

interface IProps{
    content: string;
}

const Separator : React.FC<IProps> = ({content}) => {
    return (
        <div className="separator">{content}</div>
    )
}

export default Separator;