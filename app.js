const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
app.use(express.urlencoded());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'DialogForm.html'))    
});

app.post('/createDialogXML',(req, res) => {
    console.log(req.body)
    const { tabname, Nooffields, resourceType, FieldName, FieldDescription } = req.body; 
    let fieldXML = '', tabXML = '', finalXML = '', count=0;
    if(Array.isArray(tabname)) {
        const finalXmlData = tabname.map((item, index) => {
            const noOfFeilds = Nooffields[index];
            const newresourceType = resourceType.splice(0, Number(noOfFeilds));
            const newFeildName = FieldName.splice(0, Number(noOfFeilds));
            const newDescription = FieldDescription.splice(0, Number(noOfFeilds));
            console.log(newresourceType, newFeildName, newDescription);
            const newFieldXML = newresourceType.map((resourceitem, resourceindex) => `<${newFeildName[resourceindex]}
                jcr:primaryType="nt:unstructured"
                sling:resourceType="granite/ui/components/foundation/form/textfield"
                fieldDescription="${newDescription[resourceindex]}"
                fieldLabel="${newFeildName[resourceindex]}"
                name="./name"
                maxlength="{Long}100"> \n
            `).join(' ');
            return `
                <tab${index + 1}
                            jcr:primaryType="nt:unstructured"
                            jcr:title="${item}"
                            sling:resourceType="granite/ui/components/foundation/container"
                            name="./tab${index + 1}">
                            <layout
                                jcr:primaryType="nt:unstructured"
                                sling:resourceType="granite/ui/components/foundation/layouts/fixedcolumns"/>
                            <items jcr:primaryType="nt:unstructured">
                                <columns
                                    jcr:primaryType="nt:unstructured"
                                    sling:resourceType="granite/ui/components/foundation/container">
                                    <items jcr:primaryType="nt:unstructured">
                                        ${newFieldXML}
                                    </items>
                                </columns>
                            </items>
                </tab${index+1}> \n
            
            `;
        }).join(' ');
        console.log(finalXmlData);
        fs.writeFileSync('./output/dialog/content.xml', finalXmlData);
        res.send('SUCCESS');
    } else {
        console.log(tabname, resourceType, FieldName, FieldDescription);
        const finalXmlData = `
        <tab1
            jcr:primaryType="nt:unstructured"
            jcr:title="${tabname}"
            sling:resourceType="granite/ui/components/foundation/container"
            name="./tab1">
            <layout
                jcr:primaryType="nt:unstructured"
                sling:resourceType="granite/ui/components/foundation/layouts/fixedcolumns"/>
            <items jcr:primaryType="nt:unstructured">
                <columns
                    jcr:primaryType="nt:unstructured"
                    sling:resourceType="granite/ui/components/foundation/container">
                    <items jcr:primaryType="nt:unstructured">
                    <${FieldName}
                        jcr:primaryType="nt:unstructured"
                        sling:resourceType="granite/ui/components/foundation/form/textfield"
        console.log(tabname, resourceType, FieldName, FieldDescription);
                        fieldDescription="${FieldDescription}"
                        fieldLabel="${FieldName}"
                        name="./name"
                        maxlength="{Long}100"> \n
                    </items>
                </columns>
            </items>
        </tab1> \n
        `;
        fs.writeFileSync('./output/dialog/content.xml', finalXmlData);
        res.send('SUCCESS');
    }
});

app.listen(8080, () => console.log(`Your app listening on port 8080!`));