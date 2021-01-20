// function to copy style into an external window
// @ts-ignore
export default function copyStyles(sourceDoc, targetDoc) {
    Array.from(
        sourceDoc.querySelectorAll('link[rel="stylesheet"], style')
    ).forEach((link: any) => {
        targetDoc.head.appendChild(link.cloneNode(true));
    });
}
