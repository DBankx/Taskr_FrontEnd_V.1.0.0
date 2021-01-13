import React from "react";

interface IProps{
    icon: any;
    message: string;
}

const SoftAlert : React.FC<IProps> = ({icon, message}) => {
    return (
        <div className="soft__alert">
            {icon}
            <h3 className="soft__alert__message">{message}</h3>
        </div>
    )
}

export default SoftAlert;