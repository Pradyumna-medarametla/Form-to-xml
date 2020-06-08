let express = require('express'),
    mkdirp = require('mkdirp'),
    path = require('path'),
    fs = require('fs'),
    app = express();
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'DialogForm.html'))
      });

    app.use(express.urlencoded()); // let our server reads the data sent by the form.To read data in req(request)


  app.post('/createDialogXML',(req, res) =>
      {

        let data1 = `<?xml version="1.0" encoding="utf-8"?> \n <jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0"
       xmlns:jcr="http://www.jcp.org/jcr/1.0" jcr:primaryType="cq:Component" jcr:title ="${req.body.compname1}" />`;

      let data2 = `<?xml version="1.0" encoding="UTF-8"?> \n <jcr:root xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" \n cq:dialogMode="floating" \n jcr:primaryType="cq:EditConfig"> \n <listeners \n jcr:primaryType="cq:EditListenersConfig" \n afteredit="REFRESH_PAGE"/> \n </jcr:root>`
      if(!fs.existsSync('output'))
      { 
        fs.mkdirSync('output');
      }
      fs.writeFileSync('./output/.content.xml', data1);
      fs.writeFileSync('./output/_cq_editConfig.xml', data2);

        let fieldXML, tabXML = ``, finalXML = ``,multifieldXML = ``, count=0 , counter=0;
        console.log(req.body);
         console.log(req.body.tabname.length);
         console.log(Array.isArray(req.body.tabname));
         console.log(req.body.Nooffields);
         console.log("multinooffield" + req.body.multiNooffields);
         function multiFieldXMLCreation()
         {
            multifieldXML = ``;
            for(let k=0; k<req.body.multiNooffields; k++) {
                if(req.body.multifieldresourceType[counter] == "textfield") {
                    multifieldXML += `<${req.body.multiFieldName[counter]}
                                            jcr:primaryType="nt:unstructured"
                                            sling:resourceType="granite/ui/components/foundation/form/textfield"
                                            fieldDescription="${req.body.multiFieldDescription[counter]}"
                                            fieldLabel="${req.body.multiFieldName[counter]}"
                                            name="./name"
                                            maxlength="{Long}100" /> \n `;
                } else if(req.body.multifieldresourceType[counter] == 'textarea'){
                    multifieldXML += `<${req.body.multiFieldName[counter]}
                                            jcr:primaryType="nt:unstructured"
                                            sling:resourceType="granite/ui/components/foundation/form/textArea"
                                            fieldDescription="${req.body.multiFieldDescription[counter]}"
                                            fieldLabel="${req.body.multiFieldName[counter]}"
                                            name="./name" /> \n ` ;
                }
                else if(req.body.multifieldresourceType[counter] == 'pathbrowser'){
                    multifieldXML += `<${req.body.multiFieldName[counter]}
                                            jcr:primaryType="nt:unstructured"
                                            sling:resourceType="granite/ui/components/foundation/form/pathbrowser"
                                            fieldDescription="${req.body.multiFieldDescription[counter]}"
                                            fieldLabel="${req.body.multiFieldName[counter]}"
                                            name="./name"
                                            required="false"/> \n ` ;
                }
                else if(req.body.multifieldresourceType[counter] == 'hidden'){
                    multifieldXML += `<${req.body.multiFieldName[counter]}
                                            jcr:primaryType="nt:unstructured"
                                            sling:resourceType="granite/ui/components/foundation/form/hidden"
                                            fieldDescription="${req.body.multiFieldDescription[counter]}"
                                            fieldLabel="${req.body.multiFieldName[counter]}"
                                            name="./name"
                                            class="componentid"/> \n ` ;
                }
                else if(req.body.multifieldresourceType[counter] == 'numberfield'){
                    multifieldXML += `<${req.body.multiFieldName[counter]}
                                            jcr:primaryType="nt:unstructured"
                                            sling:resourceType="granite/ui/components/foundation/form/numberfield"
                                            fieldDescription="${req.body.multiFieldDescription[counter]}"
                                            fieldLabel="${req.body.multiFieldName[counter]}"
                                            name="./name" /> \n ` ;
                }
                else if(req.body.multifieldresourceType[counter] == 'checkbox'){
                    multifieldXML += `<${req.body.multiFieldName[counter]}
                                            jcr:primaryType="nt:unstructured"
                                            sling:resourceType="granite/ui/components/foundation/form/checkbox"
                                            text="${req.body.multiFieldDescription[counter]}"
                                            fieldLabel="${req.body.multiFieldName[counter]}"
                                            name="./name" 
                                            value="{Boolean}true" 
                                            class="cq-dialog-checkbox-enabledisable"/> \n ` ;
                }
                else if(req.body.multifieldresourceType[counter] == 'autocomplete'){
                    multifieldXML += `<${req.body.multiFieldName[counter]}
                                            jcr:primaryType="nt:unstructured"
                                            sling:resourceType="granite/ui/components/foundation/form/autocomplete"
                                            fieldDescription="${req.body.multiFieldDescription[counter]}"
                                            emptyText="${req.body.multiFieldName[counter]}"
                                            forceselection="{Boolean}true" 
                                            multiple="{Boolean}true" 
                                            renderReadOnly="{Boolean}true"
                                            <datasource
                                                jcr:primaryType="nt:unstructured"
                                                sling:resourceType="cq/gui/components/common/datasources/tags"/>
                                            <values
                                                jcr:primaryType="nt:unstructured"
                                                sling:resourceType="granite/ui/components/foundation/form/autocomplete/tags"/>
                                            <options
                                                jcr:primaryType="nt:unstructured"
                                                sling:resourceType="granite/ui/components/foundation/form/autocomplete/list"/> /> \n ` ;
                }
                else if(req.body.multifieldresourceType[counter] == 'datepicker'){
                    multifieldXML += `<${req.body.multiFieldName[counter]}
                                            jcr:primaryType="nt:unstructured"
                                            sling:resourceType="granite/ui/components/foundation/form/datepicker"
                                            allowBulkEdit="{Boolean}true"
                                            cq-msm-lockable=""
                                            displayedFormat="MMMM DD, YYYY hh:mm a"
                                            displayTimezoneMessage="{Boolean}true"
                                            renderReadOnly="{Boolean}true"
                                            type="datetime"
                                            fieldDescription="${req.body.multiFieldDescription[counter]}"
                                            fieldLabel="${req.body.multiFieldName[counter]}"
                                            name="./name" /> \n ` ;
            }
            counter++;
        }
     return multifieldXML ;
         }
         function OneTabFieldXMLCreation()
         {
                fieldXML = ``;
                for(let p=0; p<req.body.Nooffields; p++) {
                    if(req.body.resourceType[count] == "textfield") {
                        fieldXML += `<${req.body.FieldName[count]}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/foundation/form/textfield"
                                        fieldDescription="${req.body.FieldDescription[count]}"
                                        fieldLabel="${req.body.FieldName[count]}"
                                        name="./name${count}"
                                        maxlength="{Long}100" /> \n `;
                    } else if(req.body.resourceType[count] == 'textarea'){
                        fieldXML += `<${req.body.FieldName[count]}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/foundation/form/textArea"
                                        fieldDescription="${req.body.FieldDescription[count]}"
                                        fieldLabel="${req.body.FieldName[count]}"
                                        name="./name${count}" /> \n ` ;
                    }
                    else if(req.body.resourceType[count] == 'pathbrowser'){
                        fieldXML += `<${req.body.FieldName[count]}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/foundation/form/pathbrowser"
                                        fieldDescription="${req.body.FieldDescription[count]}"
                                        fieldLabel="${req.body.FieldName[count]}"
                                        name="./name${count}"
                                        required="false"/> \n ` ;
                    }
                    else if(req.body.resourceType[count] == 'hidden'){
                        fieldXML += `<${req.body.FieldName[count]}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/foundation/form/hidden"
                                        fieldDescription="${req.body.FieldDescription[count]}"
                                        fieldLabel="${req.body.FieldName[count]}"
                                        name="./name${count}"
                                        class="componentid"/> \n ` ;
                    }
                    else if(req.body.resourceType[count] == 'numberfield'){
                        fieldXML += `<${req.body.FieldName[count]}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/foundation/form/numberfield"
                                        fieldDescription="${req.body.FieldDescription[count]}"
                                        fieldLabel="${req.body.FieldName[count]}"
                                        name="./name${count}" /> \n ` ;
                    }
                    else if(req.body.resourceType[count] == 'checkbox'){
                        fieldXML += `<${req.body.FieldName[count]}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/foundation/form/checkbox"
                                        text="${req.body.FieldDescription[count]}"
                                        fieldLabel="${req.body.FieldName[count]}"
                                        name="./name${count}" 
                                        value="{Boolean}true" 
                                        class="cq-dialog-checkbox-enabledisable"/> \n ` ;
                    }
                    else if(req.body.resourceType[count] == 'autocomplete'){
                        fieldXML += `<${req.body.FieldName[count]}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/foundation/form/autocomplete"
                                        fieldDescription="${req.body.FieldDescription[count]}"
                                        emptyText="${req.body.FieldName[count]}"
                                        forceselection="{Boolean}true" 
                                        multiple="{Boolean}true" 
                                        renderReadOnly="{Boolean}true"
                                        <datasource
                                            jcr:primaryType="nt:unstructured"
                                            sling:resourceType="cq/gui/components/common/datasources/tags"/>
                                        <values
                                            jcr:primaryType="nt:unstructured"
                                            sling:resourceType="granite/ui/components/foundation/form/autocomplete/tags"/>
                                        <options
                                            jcr:primaryType="nt:unstructured"
                                            sling:resourceType="granite/ui/components/foundation/form/autocomplete/list"/> /> \n ` ;
                    }
                    else if(req.body.resourceType[count] == 'datepicker'){
                        fieldXML += `<${req.body.FieldName[count]}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/foundation/form/datepicker"
                                        allowBulkEdit="{Boolean}true"
                                        cq-msm-lockable=""
                                        displayedFormat="MMMM DD, YYYY hh:mm a"
                                        displayTimezoneMessage="{Boolean}true"
                                        renderReadOnly="{Boolean}true"
                                        type="datetime"
                                        fieldDescription="${req.body.FieldDescription[count]}"
                                        fieldLabel="${req.body.FieldName[count]}"
                                        name="./name${count}" /> \n ` ;
                }
                else if(req.body.resourceType[count] == 'multifield'){
                    fieldXML += `<multifield
                                    jcr:primaryType="nt:unstructured"
                                    sling:resourceType="granite/ui/components/foundation/form/multifield"
                                    fieldLabel=""
                                    name="./multifield${count}">
                                    <field
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/foundation/form/fieldset"
                                        name="./fieldset${count}">
                                        <layout
                                            jcr:primaryType="nt:unstructured"
                                            sling:resourceType="granite/ui/components/foundation/layouts/fixedcolumns"/>
                                        <items jcr:primaryType="nt:unstructured">
                                            ${multiFieldXMLCreation()}
                                        </multifield> /> \n ` ;
                        }
                count++;
            }
         return fieldXML ;
        } 

         if(Array.isArray(req.body.tabname))
         {
            for(let i=0; i<req.body.tabname.length; i++){
                fieldXML = ``;
                for(let j=0; j<req.body.Nooffields[i]; j++) {
                    if(req.body.resourceType[count] == "textfield") {
                        fieldXML += `<${req.body.FieldName[count]}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/foundation/form/textfield"
                                        fieldDescription="${req.body.FieldDescription[count]}"
                                        fieldLabel="${req.body.FieldName[count]}"
                                        name="./name${count}"
                                        maxlength="{Long}100"> \n `;
                    } else if(req.body.resourceType[count] == 'textarea'){
                        fieldXML += `<${req.body.FieldName[count]}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/foundation/form/textArea"
                                        fieldDescription="${req.body.FieldDescription[count]}"
                                        fieldLabel="${req.body.FieldName[count]}"
                                        name="./name${count}" /> \n ` ;
                    }
                    else if(req.body.resourceType[count] == 'pathbrowser'){
                        fieldXML += `<${req.body.FieldName[count]}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/foundation/form/pathbrowser"
                                        fieldDescription="${req.body.FieldDescription[count]}"
                                        fieldLabel="${req.body.FieldName[count]}"
                                        name="./name${count}"
                                        required="false"/> \n ` ;
                    }
                    else if(req.body.resourceType[count] == 'hidden'){
                        fieldXML += `<${req.body.FieldName[count]}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/foundation/form/hidden"
                                        fieldDescription="${req.body.FieldDescription[count]}"
                                        fieldLabel="${req.body.FieldName[count]}"
                                        name="./name${count}"
                                        class="componentid" /> \n ` ;
                    }
                    else if(req.body.resourceType[count] == 'numberfield'){
                        fieldXML += `<${req.body.FieldName[count]}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/foundation/form/numberfield"
                                        fieldDescription="${req.body.FieldDescription[count]}"
                                        fieldLabel="${req.body.FieldName[count]}"
                                        name="./name${count}" /> \n ` ;
                    }
                    else if(req.body.resourceType[count] == 'checkbox'){
                        fieldXML += `<${req.body.FieldName[count]}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/foundation/form/checkbox"
                                        text="${req.body.FieldDescription[count]}"
                                        fieldLabel="${req.body.FieldName[count]}"
                                        name="./name${count}" 
                                        value="{Boolean}true" 
                                        class="cq-dialog-checkbox-enabledisable"/> \n ` ;
                    }
                    else if(req.body.resourceType[count] == 'autocomplete'){
                        fieldXML += `<${req.body.FieldName[count]}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/foundation/form/autocomplete"
                                        fieldDescription="${req.body.FieldDescription[count]}"
                                        emptyText="${req.body.FieldName[count]}"
                                        forceselection="{Boolean}true" 
                                        multiple="{Boolean}true" 
                                        renderReadOnly="{Boolean}true"
                                        <datasource
                                            jcr:primaryType="nt:unstructured"
                                            sling:resourceType="cq/gui/components/common/datasources/tags"/>
                                        <values
                                            jcr:primaryType="nt:unstructured"
                                            sling:resourceType="granite/ui/components/foundation/form/autocomplete/tags"/>
                                        <options
                                            jcr:primaryType="nt:unstructured"
                                            sling:resourceType="granite/ui/components/foundation/form/autocomplete/list"/> /> \n ` ;
                    }
                    else if(req.body.resourceType[count] == 'datepicker'){
                        fieldXML += `<${req.body.FieldName[count]}
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/foundation/form/datepicker"
                                        allowBulkEdit="{Boolean}true"
                                        cq-msm-lockable=""
                                        displayedFormat="MMMM DD, YYYY hh:mm a"
                                        displayTimezoneMessage="{Boolean}true"
                                        renderReadOnly="{Boolean}true"
                                        type="datetime"
                                        fieldDescription="${req.body.FieldDescription[count]}"
                                        fieldLabel="${req.body.FieldName[count]}"
                                        name="./name${count}" /> \n ` ;
                    }
                    else if(req.body.resourceType[count] == 'multifield'){
                        fieldXML += `<multifield
                                        jcr:primaryType="nt:unstructured"
                                        sling:resourceType="granite/ui/components/foundation/form/multifield"
                                        fieldLabel=""
                                        name="./multifield">
                                        <field
                                            jcr:primaryType="nt:unstructured"
                                            sling:resourceType="granite/ui/components/foundation/form/fieldset"
                                            name="./fieldset${count}">
                                            <layout
                                                jcr:primaryType="nt:unstructured"
                                                sling:resourceType="granite/ui/components/foundation/layouts/fixedcolumns"/>
                                            <items jcr:primaryType="nt:unstructured">
                                                ${multiFieldXMLCreation()}
                                            </multifield> /> \n ` ;
                            }
                count++;
            }
            
            tabXML += `<tab${i+1}
                            jcr:primaryType="nt:unstructured"
                            jcr:title="${req.body.tabname[i]}"
                            sling:resourceType="granite/ui/components/foundation/container"
                            name="./tab${i+1}">
                            <layout
                                jcr:primaryType="nt:unstructured"
                                sling:resourceType="granite/ui/components/foundation/layouts/fixedcolumns"/>
                            <items jcr:primaryType="nt:unstructured">
                                <columns
                                    jcr:primaryType="nt:unstructured"
                                    sling:resourceType="granite/ui/components/foundation/container">
                                    <items jcr:primaryType="nt:unstructured">
                                        ${fieldXML}
                                    </items>
                                </columns>
                            </items>
                        </tab${i+1}> \n`;
            }
        
        }
    else{
        console.log("in the else condition");
        tabXML = `<tab1
                        jcr:primaryType="nt:unstructured"
                        jcr:title="${req.body.tabname}"
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
                                    ${OneTabFieldXMLCreation()}
                                </items>
                            </columns>
                        </items>
                    </tab1> \n`;
    }
        finalXML =`<?xml version="1.0" encoding="UTF-8"?>
        <jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0" xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
            jcr:primaryType="nt:unstructured"
            jcr:title="${req.body.compname1}"
            sling:resourceType="cq/gui/components/authoring/dialog">
            <content
                jcr:primaryType="nt:unstructured"
                sling:resourceType="granite/ui/components/foundation/container">
                <layout
                    jcr:primaryType="nt:unstructured"
                    sling:resourceType="granite/ui/components/foundation/layouts/tabs"
                    type="nav"/>
                <items jcr:primaryType="nt:unstructured">
                   ${tabXML}
                </items>
            </content>
        </jcr:root>
        `;
       fs.writeFileSync('./output/_cq_dialog/.content.xml', finalXML);
       res.send('SUCCESS');
      });
  
  
  app.listen(4023, () => console.log('listening to 4023'));