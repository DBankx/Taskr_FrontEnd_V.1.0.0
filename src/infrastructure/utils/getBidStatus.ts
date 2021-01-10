﻿const getBidStatus = (num: number) => {
    switch (num) {
        case 0:
            return "Submitted";
        case 1:
            return "Seen";
        case 2:
            return "Rejected";
        case 3:
            return "Approved";
        default:
            return num;
    }
}

export default getBidStatus;