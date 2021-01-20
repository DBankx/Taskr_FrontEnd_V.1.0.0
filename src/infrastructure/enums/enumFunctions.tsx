export function getAllEnumKeys(enumType: any){
    return Object.keys(enumType).filter(key => isNaN(Number(key)))
}
export function getAllEnumValues(enumType: any) {
    return getAllEnumKeys(enumType).map((key: any) => enumType[key])
}
export function getAllEnumEntries(enumType: any) {
    return getAllEnumKeys(enumType).map((key : any) => [key, enumType[key]])
}   