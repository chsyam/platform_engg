export function ExtractParams(paramsData){

    let params = {};

    paramsData.forEach((item)=>{
        const tempId = item.id;
        const labelsWithGivenId = document.querySelectorAll(`label[id="${tempId}"]`)[0];
        const name = labelsWithGivenId.textContent;

        if(item?.data?.htmlType === "Input"){
            const inputWithGivenId = document.querySelectorAll(`input[id="${tempId}"]`)[0];
            const value = inputWithGivenId.value;
            params[name] = value;
        }
        else if(item?.data?.htmlType === "DropDown"){

            if(item?.data?.selectType === "multi"){
                const dropdownWithGivenId = document.querySelectorAll(`label[id="dropdown-multi-${tempId}"]`)[0];                   
                const value = dropdownWithGivenId.textContent;
                try {
                    params[name] = JSON.parse(value);
                } catch(error) {
                    console.log(error)
                }
            }else{
                const dropdownWithGivenId = document.querySelectorAll(`label[id="dropdown-${tempId}"]`)[0];
                const value = dropdownWithGivenId.textContent;
                params[name] = value;
            }

        }
        else if(item?.data?.htmlType === "RadioButton"){
            const checkboxWithGivenId = document.querySelectorAll(`span[id="radioButton-${tempId}"]`)[0];
            const value = checkboxWithGivenId.dataset.value;
            params[name] = value;
        }
        else if(item?.data?.htmlType === "TextArea"){
            const textareaWithGivenId = document.querySelectorAll(`textarea[id="textarea-${tempId}"]`)[0];
            const value = textareaWithGivenId.textContent;
            params[name] = value;
        }
        else if(item?.data?.htmlType === "MultiSelect-CheckBox"){
            const multiCheckWithGivenId = document.querySelectorAll(`div[id="multicheckbox-${tempId}"]`)[0];
            // Find all label elements within the div
            const labels = multiCheckWithGivenId.querySelectorAll('label');
            const checkboxes = multiCheckWithGivenId.querySelectorAll('input[type="checkbox"]');

            // Extract text content of each label
            const labelTexts = Array.from(labels).map(label => label.textContent);
            const checkboxValues = Array.from(checkboxes).map(checkbox => checkbox.checked);

            const len = labelTexts.length;
            const multiValue = [];
            for(let i = 0; i < len; i++){
                multiValue[labelTexts[i]] = checkboxValues[i];
            }
            params[name] = multiValue;
        }
        else{
            console.log("Undefined type ",item.data.htmlType);
        }
    });

    return params;
}
