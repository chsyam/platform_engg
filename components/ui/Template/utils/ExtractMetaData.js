
export function ExtractMetaData(){

    let metaData = {};

    let elementsWithMetadataId = document.querySelectorAll('[id="request"]');
    elementsWithMetadataId.forEach((item)=>{

        const name = item.name;
        const value = item.value;
        metaData[name] = value;
    });

    return metaData;
}
