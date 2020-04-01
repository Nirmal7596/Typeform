
let Edit=
{
showing_data:function()
    {
        let getting_view_html=document.getElementById("view");
            getting_view_html.innerText="";
        if(Object.keys(total_Typeforms).length)
        {
            for (const each_form in total_Typeforms) {
                let temp_id=each_form;
                // let creation=document.createElement("div");
                // creation.classList="Edit_div";
                // creation.innerHTML=each_form.title;
                // let trash_span=document.createElement("span");
                // trash_span.classList="fa fa-trash trash-padding";
                // creation.appendChild(trash_span);
                // let edit_span=document.createElement("span");
                // edit_span.classList="fa fa-edit edit-padding";
                // edit_span.onclick=window.TypeformEdit.Edit_view(temp_id);
                // creation.appendChild(edit_span);
                // getting_view_html.appendChild(creation);
                getting_view_html.innerHTML+=' <div class="Edit_div"><span><img class="list_view_logo" src="img/hall-of-forms.329e2d1275f01edc3f404fb6b5f7e29a.png"></span><span class="list_view_title">'+total_Typeforms[each_form].Typeform_name+'</span> <span class="fa fa-trash fa-2x trash-padding" onclick=window.TypeformEdit.delete_webhook("'+temp_id+'")>'+
                '</span> <span class="fa fa-edit fa-2x edit-padding" onclick=window.TypeformEdit.Edit_view("'+temp_id+'")></span>  </div>';
            }   
            
        }
        getting_view_html.innerHTML+='<br><div style="text-align:center;"><button type="button" class="PluginButton" onclick="window.Homepage.view_back()">Back</button></div>';   
            getting_view_html.style.display="block";
            document.getElementById("initial").style.display="none";
                    
    },
    Edit_view:function(id)
    {
        if(id)
        {
            document.getElementById("Mandatory").innerHTML="";
            document.getElementById("optional").innerHTML="";
            ZOHODESK.get('database',{'key':id,'queriableValue':''}).then(function(response){
                let new_response=response['database.get'];
                console.log(new_response);
                if(Object.keys(new_response).length)
                {
                let db_data= response['database.get']['data'][0]['value'];
                let reqObj={
                    url:'https://api.typeform.com/forms/'+id,
                    headers:{ 'Content-Type' : 'application/json' },
                    type:'GET',
                    data:{},
                    postBody:{},
                    connectionLinkName:'typeform'
            };  
            ZOHODESK.request(reqObj).then(function(data){
                console.log(data);
                let parsed_data=JSON.parse(data);
                if(parsed_data.statusCode==200){
                let parsing_data_again=JSON.parse(parsed_data.response);
                if(parsing_data_again.status=="true"){
                parsed_typeform_fields=parsing_data_again.statusMessage.fields;
            if(desk_fields.length)
             {
                 let optional=false;
            for (const iterator of desk_fields) {
                if(iterator.isMandatory)
                {
                    let creation=document.createElement("div");
                    let label=document.createElement("label");
                    label.classList.add("mdb-main-label"); 
                    label.classList.add("pluginlabel");
                    label.innerHTML=iterator.displayLabel;
                    let label_span=document.createElement("span");
                    label_span.style.color="tomato";
                    label_span.innerText=" *";
                    label.appendChild(label_span);               
                    let select=document.createElement("select");
                    select.className="mdb-select md-form Selection_dropdown";
                    select.name=iterator.displayLabel;
                    select.id=iterator.apiName;
                    select.required=true;
                    let option=document.createElement("option");
                    option.text="";
                    option.value="";
                    select.add(option,select[0]);
                    for (const fields_iterator of parsed_typeform_fields) {
                        if(fields_iterator.validations.required)
                        {
                            if((iterator.type=="Text" || iterator.type=="LookUp") && fields_iterator.type=="short_text")
                            { 
                                let option = document.createElement('option');
                                let text_user="";
                                for (const each_db_data in db_data) {
                                    if(each_db_data.split("_")[0]=="CreateDecision")
                                    {
                                        if((db_data[each_db_data]).split("_")[0]=="True" && optional==false)
                                        {
                                            optional=true;
                                            document.getElementById("CreateDecision").value=checked;
                                            document.getElementById("optional").style.display="block";
                                        }
                                    }
                                    
                                    if(each_db_data.split("_")[0]==iterator.apiName && (db_data[each_db_data]).split("_")[0]==fields_iterator.id)
                                    {
    
                                        text_user= each_db_data.split("_")[0]
                                    }
                                }
                                if(text_user!="")
                                {
                                    text_user="";
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    option.setAttribute("selected",true);
                                    select.add(option,select[0]);
                                }
                                else
                                {
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    select.add(option,select[0]);
                                }
                            }
                            else if(iterator.type=="Textarea" && fields_iterator.type=="long_text")
                            {
                                // "opinion_scale" 
                                let option = document.createElement('option');
                                let long_user="";
                                for (const each_db_data in db_data) {
                                    if(each_db_data.split("_")[0]==iterator.apiName && (db_data[each_db_data]).split("_")[0]==fields_iterator.id)
                                    {
                                        long_user= each_db_data.split("_")[0]
                                    }
                                }
                                if(long_user!="")
                                {
                                    long_user="";
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    option.setAttribute("selected",true);
                                    select.add(option,select[0]);
                                }
                                else
                                {
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    select.add(option,select[0]);
                                }
                            }
                            else if(iterator.type=="Multiselect" && fields_iterator.type=="multiple_choice")
                            {
                                let option = document.createElement('option');
                                let multi_user="";
                                for (const each_db_data in db_data) {
                                    if(each_db_data.split("_")[0]==iterator.apiName && (db_data[each_db_data]).split("_")[0]==fields_iterator.id)
                                    {
                                        multi_user= each_db_data.split("_")[0]
                                    }
                                }

                                if(multi_user!="")
                                {
                                    multi_user="";
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    option.setAttribute("selected",true);
                                    select.add(option,select[0]);
                                }
                                else
                                {
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    select.add(option,select[0]);
                                }
                            }
                            else if(iterator.type=="Phone" && fields_iterator.type=="phone_number")
                            {
                                let option = document.createElement('option');
                                let Phone="";
                                for (const each_db_data in db_data) {
                                    if(each_db_data.split("_")[0]==iterator.apiName && (db_data[each_db_data]).split("_")[0]==fields_iterator.id)
                                    {
                                        Phone= each_db_data.split("_")[0]
                                    }
                                }
                                if(Phone!="")
                                {
                                    Phone="";
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    option.setAttribute("selected",true);
                                    select.add(option,select[0]);
                                }
                                else
                                {
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    select.add(option,select[0]);
                                }
                            }
                            else if(iterator.type=="Boolean" && fields_iterator.type=="yes_no")
                            {
                                let option = document.createElement('option');
                                let Yes_no="";
                                for (const each_db_data in db_data) {
                                    if(each_db_data.split("_")[0]==iterator.apiName && (db_data[each_db_data]).split("_")[0]==fields_iterator.id)
                                    {
                                        Yes_no= each_db_data.split("_")[0]
                                    }
                                }
                                if(Yes_no!="")
                                {
                                    Yes_no="";
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    option.setAttribute("selected",true);
                                    select.add(option,select[0]);
                                }
                                else
                                {
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    select.add(option,select[0]);
                                }
                            }
                            else if(iterator.type=="Email" && fields_iterator.type=="email")
                            {
                                let option = document.createElement('option');
                                let email="";
                                for (const each_db_data in db_data) {
                                    if(each_db_data.split("_")[0]==iterator.apiName && (db_data[each_db_data]).split("_")[0]==fields_iterator.id)
                                    {
                                        each_user= each_db_data.split("_")[0]
                                    }
                                }
                                if(email!="")
                                {
                                    email="";
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    option.setAttribute("selected",true);
                                    select.add(option,select[0]);
                                }
                                else
                                {
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    select.add(option,select[0]);
                                }
                            }
                            else if((iterator.type=="Number" || iterator.type=="Decimal") && fields_iterator.type=="number")
                            {
                                let option = document.createElement('option');
                                let num="";
                                for (const each_db_data in db_data) {
                                    if(each_db_data.split("_")[0]==iterator.apiName && (db_data[each_db_data]).split("_")[0]==fields_iterator.id)
                                    {
                                        num= each_db_data.split("_")[0]
                                    }
                                }
                                if(num!="")
                                {
                                    num="";
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    option.setAttribute("selected",true);
                                    select.add(option,select[0]);
                                }
                                else
                                {
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    select.add(option,select[0]);
                                }
                            }   
                            else if(iterator.type=="Date" && fields_iterator.type=="date")
                            {
                                let option = document.createElement('option');
                                let date_user="";
                                for (const each_db_data in db_data) {
                                    if(each_db_data.split("_")[0]==iterator.apiName && (db_data[each_db_data]).split("_")[0]==fields_iterator.id)
                                    {
                                        date_user= each_db_data.split("_")[0]
                                    }
                                }
                                if(date_user!="")
                                {
                                    date_user="";
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    option.setAttribute("selected",true);
                                    select.add(option,select[0]);
                                }
                                else
                                {
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    select.add(option,select[0]);
                                }
                            }
                            else if(iterator.type=="Picklist" && fields_iterator.type=="dropdown")
                            {
                                let option = document.createElement('option');
                                let Picklist="";
                                for (const each_db_data in db_data) {
                                    if(each_db_data.split("_")[0]==iterator.apiName && (db_data[each_db_data]).split("_")[0]==fields_iterator.id)
                                    {
                                        Picklist= each_db_data.split("_")[0]
                                    }
                                }
                                if(Picklist!="")
                                {
                                    Picklist="";
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    option.setAttribute("selected",true);
                                    select.add(option,select[0]);
                                }
                                else
                                {
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    select.add(option,select[0]);
                                }
                            }
                            else if(iterator.type=="URL" && fields_iterator.type=="website")
                            {
                                let option = document.createElement('option');
                                let website="";
                                for (const each_db_data in db_data) {
                                    if(each_db_data.split("_")[0]==iterator.apiName && (db_data[each_db_data]).split("_")[0]==fields_iterator.id)
                                    {
                                        website= each_db_data.split("_")[0]
                                    }
                                }
                                if(website!="")
                                {
                                    website="";
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    option.setAttribute("selected",true);
                                    select.add(option,select[0]);
                                }
                                else
                                {
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    select.add(option,select[0]);
                                }
                            }
                        }
                    }
                    creation.appendChild(label);
                    split_span=document.createElement("span");
                     split_span.innerHTML=":";
                     split_span.classList.add("spliter");
                     creation.appendChild(split_span);
                    creation.appendChild(select);
                    document.getElementById("Mandatory").appendChild(creation);
                    let err_div=document.createElement("div");
                    err_div.id=iterator.displayLabel+"_"+iterator.apiName;
                    document.getElementById("Mandatory").append(err_div);
                }
                else 
                {   
                    let Optional_creation=document.createElement("div");
                    let label=document.createElement("label");
                    label.classList.add("mdb-main-label");
                    label.classList.add("pluginlabel");
                    label.innerHTML=iterator.displayLabel;
                    let select=document.createElement("select");
                    select.className="mdb-select md-form Selection_dropdown";
                    select.name=iterator.displayLabel;
                    select.id=iterator.apiName;
                    let option=document.createElement("option");
                    option.text="";
                    option.value="";
                    select.add(option,select[0]);
                    Optional_creation.appendChild(label);
                    split_span=document.createElement("span");
                    split_span.innerHTML=":";
                    split_span.classList.add("spliter");
                    Optional_creation.appendChild(split_span);     
                    for (const fields_iterator of parsed_typeform_fields) {
                            if(iterator.type=="Text" && fields_iterator.type=="short_text")
                            {   
                                let option = document.createElement('option');
                                let each_text="";
                                for (const each_db_data in db_data) {
                                    if(each_db_data.split("_")[0]==iterator.apiName && (db_data[each_db_data]).split("_")[0]==fields_iterator.id)
                                    {
                                        each_text= each_db_data.split("_")[0]
                                    }
                                }
                                if(each_text!="")
                                {
                                    each_text="";
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    option.setAttribute("selected",true);
                                    select.add(option,select[0]);
                                }
                                else
                                {
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    select.add(option,select[0]);
                                }
                            }
                            else if(iterator.type=="Textarea" && fields_iterator.type=="long_text")
                            {
                                // "opinion_scale" 
                                let option = document.createElement('option');
                                let long="";
                                for (const each_db_data in db_data) {
                                    if(each_db_data.split("_")[0]==iterator.apiName && (db_data[each_db_data]).split("_")[0]==fields_iterator.id)
                                    {
                                        long= each_db_data.split("_")[0]
                                    }
                                }
                                if(long!="")
                                {
                                    long="";
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    option.setAttribute("selected",true);
                                    select.add(option,select[0]);
                                }
                                else
                                {
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    select.add(option,select[0]);
                                }
                            }
                            else if(iterator.type=="Multiselect" && fields_iterator.type=="multiple_choice")
                            {
                                let option = document.createElement('option');
                                let mulit="";
                                for (const each_db_data in db_data) {
                                    if(each_db_data.split("_")[0]==iterator.apiName && (db_data[each_db_data]).split("_")[0]==fields_iterator.id)
                                    {
                                        mulit= each_db_data.split("_")[0]
                                    }
                                }
                                if(mulit!="")
                                {
                                    mulit="";
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    option.setAttribute("selected",true);
                                    select.add(option,select[0]);
                                }
                                else
                                {
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    select.add(option,select[0]);
                                }
                            }
                            else if(iterator.type=="Phone" && fields_iterator.type=="phone_number")
                            {
                                let option = document.createElement('option');
                                let phone="";
                                for (const each_db_data in db_data) {
                                    if(each_db_data.split("_")[0]==iterator.apiName && (db_data[each_db_data]).split("_")[0]==fields_iterator.id)
                                    {
                                        phone= each_db_data.split("_")[0]
                                    }
                                }
                                if(phone!="")
                                {
                                    phone="";
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    option.setAttribute("selected",true);
                                    select.add(option,select[0]);
                                }
                                else
                                {
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    select.add(option,select[0]);
                                }
                            }
                            else if(iterator.type=="Boolean" && fields_iterator.type=="yes_no")
                            {
                                let option = document.createElement('option');
                                let yes="";
                                for (const each_db_data in db_data) {
                                    if(each_db_data.split("_")[0]==iterator.apiName && (db_data[each_db_data]).split("_")[0]==fields_iterator.id)
                                    {
                                        yes= each_db_data.split("_")[0]
                                    }
                                }
                                if(yes!="")
                                {
                                    yes="";
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    option.setAttribute("selected",true);
                                    select.add(option,select[0]);
                                }
                                else
                                {
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    select.add(option,select[0]);
                                }
                            }
                            else if(iterator.type=="Email" && fields_iterator.type=="email")
                            {
                                let option = document.createElement('option');
                                let email="";
                                for (const each_db_data in db_data) {
                                    if(each_db_data.split("_")[0]==iterator.apiName && (db_data[each_db_data]).split("_")[0]==fields_iterator.id)
                                    {
                                        email= each_db_data.split("_")[0]
                                    }
                                }
                                if(email!="")
                                {
                                    email="";
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    option.setAttribute("selected",true);
                                    select.add(option,select[0]);
                                }
                                else
                                {
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    select.add(option,select[0]);
                                }
                            }
                            else if((iterator.type=="Number" || iterator.type=="Decimal" || iterator.type=="Percent") && fields_iterator.type=="number")
                            {
                                let option = document.createElement('option');
                                let num="";
                                for (const each_db_data in db_data) {
                                    if(each_db_data.split("_")[0]==iterator.apiName && (db_data[each_db_data]).split("_")[0]==fields_iterator.id)
                                    {
                                        num= each_db_data.split("_")[0]
                                    }
                                }
                                if(num!="")
                                {
                                    num="";
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    option.setAttribute("selected",true);
                                    select.add(option,select[0]);
                                }
                                else
                                {
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    select.add(option,select[0]);
                                }
                            }   
                            else if(iterator.type=="Date" && fields_iterator.type=="date")
                            {
                                let option = document.createElement('option');
                                let date="";
                                for (const each_db_data in db_data) {
                                    if(each_db_data.split("_")[0]==iterator.apiName && (db_data[each_db_data]).split("_")[0]==fields_iterator.id)
                                    {
                                        date= each_db_data.split("_")[0]
                                    }
                                }
                                if(date!="")
                                {
                                    date="";
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    option.setAttribute("selected",true);
                                    select.add(option,select[0]);
                                }
                                else
                                {
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    select.add(option,select[0]);
                                }
                            }
                            else if(iterator.type=="Picklist" && fields_iterator.type=="dropdown")
                            {
                                let option = document.createElement('option');
                                let dropdown="";
                                for (const each_db_data in db_data) {
                                    if(each_db_data.split("_")[0]==iterator.apiName && (db_data[each_db_data]).split("_")[0]==fields_iterator.id)
                                    {
                                        dropdown= each_db_data.split("_")[0]
                                    }
                                }
                                if(dropdown!="")
                                {
                                    dropdown="";
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    option.setAttribute("selected",true);
                                    select.add(option,select[0]);
                                }
                                else
                                {
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    select.add(option,select[0]);
                                }
                            }
                            else if(iterator.type=="URL" && fields_iterator.type=="website")
                            {
                                let option = document.createElement('option');
                                let url="";
                                for (const each_db_data in db_data) {
                                    if(each_db_data.split("_")[0]==iterator.apiName && (db_data[each_db_data]).split("_")[0]==fields_iterator.id)
                                    {
                                        url= each_db_data.split("_")[0]
                                    }
                                }
                                if(url!="")
                                {
                                    url="";
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    option.setAttribute("selected",true);
                                    select.add(option,select[0]);
                                }
                                else
                                {
                                    option.text=fields_iterator.title;
                                    option.value=fields_iterator.id;
                                    select.add(option,select[0]);
                                }
                            }
                    }
                    Optional_creation.appendChild(select);
                    document.getElementById("optional").appendChild(Optional_creation);
                    
                }
            } 
            document.getElementById("button_section").innerHTML="";
            document.getElementById("button_section").style.display="block";
            document.getElementById("button_section").innerHTML='<button type="button" style="margin-left:40%;border-radius:8px;" class="PluginButton" onclick=window.TypeformEdit.update_typeform("'+id+'")>Update</button>'+
            '<button type="button" style="margin-left:3%;border-radius:8px;" class="PluginButton" onclick=window.TypeformEdit.edit_view_back("selection")>Back</button>';  
        }
    }
    }
            })
        }
            })
            document.getElementById("view").style.display="none";
            document.getElementById("selection").style.display="block";
            

        }
    },
    edit_view_back:function()
    {
        document.getElementById("selection").style.display="none";
        document.getElementById("view").style.display="block";
    },
    update_typeform:function(id)
    {
        let Mandatory=true;
            for (const iterator of document.getElementById("selection")) {
                if(iterator.type!="button")
            {
                if(iterator.required==true && iterator.value =="")
                {
                    Mandatory=false;
                    document.getElementById(iterator.name+"_"+iterator.id).innerHTML="Please fill Mandatory Field";       
                    document.getElementById(iterator.id).classList.add("error_border");   
                    document.getElementById(iterator.name+"_"+iterator.id).classList.add("view_error_font"); 
                }
                else if(iterator.required==true && iterator.value !="")
                {
                    document.getElementById(iterator.name+"_"+iterator.id).innerHTML="";
                    document.getElementById(iterator.name+"_"+iterator.id).classList.remove("view_error_font");
                    document.getElementById(iterator.id).classList.remove("error_border");
                }
            }   
            }
    if(Mandatory)
    {
        let values={};
        for (const each_field of document.getElementById("selection"))
            {
                if(each_field.type!="button")
                {
                if(each_field.value && each_field.id)
                {       
                    if(each_field.id=="CreateDecision")
                    {
                        if(each_field.checked=="false")
                        {
                            values[each_field.id+"_"+each_field.id]=each_field.checked+"_"+each_field.checked;
                            break;
                        }
                       
                    }
                    else
                    {
                     values[each_field.id+"_" +each_field.name]=each_field.value+"_"+each_field.options[each_field.selectedIndex].text;
                    }
                }
                }    
            }
        ZOHODESK.set('database',{'key':id,'value': values,'queriableValue':''}).then(function(response)
        {
            document.getElementById('initial').style.display="block";
            document.getElementById("selection").style.display="none";
            document.getElementById("edit_view").style.display="none";
        })
    }
    },
    delete_webhook:function(id)
    {
        ZOHODESK.delete('database',{'key':id}).then(function(response)
                {  
                  delete total_Typeforms[id];
                  window.TypeformEdit.showing_data();
                  ZOHODESK.set('database',{'key':"Typeforms",'value':total_Typeforms,'queriableValue':''}).then(function(response)
                    {
                        var typeform_select=document.getElementById("Typeform_select");
                        typeform_select.innerHTML="";
                        var typeform_option=document.createElement("option");
                        typeform_option.text ="Select a Typeform to Connect";
                        typeform_option.value="";
                        typeform_option.selected="selected";
                        typeform_select.add(typeform_option,typeform_select[1]);
                        for (const each_form of parsed_data_again.statusMessage.items) {
                            if(!total_Typeforms.hasOwnProperty(each_form.id))
                            {
                            var typeform_option=document.createElement("option");
                            typeform_option.text =each_form.title;
                            typeform_option.value=each_form.id;
                            typeform_select.add(typeform_option,typeform_select[1]);
                            }
                        }
                        window.TypeformEdit.showing_data();   
                    })              
                })
        let TypeformObj={
            url : 'https://api.typeform.com/forms/'+id+'/webhooks/'+id,
            headers : { 'Content-Type' : 'application/json' },
            type : 'DELETE',
            data : {},
            postBody : {},	
            connectionLinkName: 'typeform'
			};
            ZOHODESK.request(TypeformObj).then(function(data){
                console.log(data);
            })
    },
}
window.TypeformEdit=Edit;