let flag = 0
const start = async()=>{

    let {data} = await (await fetch('http://localhost:5000/api/v1/suppliers')).json()    
    const nameList = document.querySelector('#nameList')
    data.map(({_id, name})=>{
        nameList.innerHTML+=`<button class="btn btn-primary mb-4 companyNames" data-id="${_id}">${name}</button> <button class="btn btn-danger mb-4 companyDel" data-id="${_id}">Delete</button><br>`
    })
    let delBtn = document.getElementsByClassName('companyDel')
    let companyNames = document.getElementsByClassName('companyNames')
    let dataID = null
    for(let i=0;i<companyNames.length;i++)
    {   
        
        const companyName = companyNames[i];
        const delCompany = delBtn[i];
        delCompany.addEventListener('click',async(e)=>{
            const dataID = e.target.dataset.id
            await fetch('http://localhost:5000/api/v1/suppliers?'+dataID,{
                method:'DELETE',
                body: JSON.stringify({
                    _id:dataID
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            location.reload()
        })
        companyName.addEventListener('click',(e)=>{
            dataID = e.target.dataset.id
            let selectedData = data.filter((item)=>
            {   
                if(item._id==dataID)return item
                return null
            })  
            if(flag)
            { 
                setcacheForm()
                flag=0
            }
            fillForm(selectedData)
        })   
    }
    let addCompanyBtn = document.getElementById('addCompany')
    addCompanyBtn.addEventListener('click',()=>{flag=1;clearForm();getcacheForm();})
    let submitBtn = document.querySelector('.submit-add')
    submitBtn.addEventListener('click',submit)
}
start()

// ***************functions*****************

const fetchSupplierName = (data)=>{
    
}
const fillForm = (data)=>{
    const form = document.querySelector('#form')
    const submit_add = document.querySelector('.submit-add')
    submit_add.innerHTML='Update'
    form.querySelector('input#id').value = data[0]._id
    form.querySelector('input#name').value = data[0].name
    form.querySelector('textarea#address').value = data[0].address
    form.querySelector('input#country').value = data[0].country
    form.querySelector('input#state').value = data[0].state
    form.querySelector('input#gst').value = data[0].gst
    form.querySelector('input#contact').value = data[0].contactName
    form.querySelector('input#mobile').value = data[0].mobile
    form.querySelector('input#email').value = data[0].email
    form.style.display='flex' 
    submit_add.style.display='flex'

}
const clearForm = ()=>{
    const form = document.querySelector('#form')
    const submit_add = document.querySelector('.submit-add')
    submit_add.innerHTML='Submit' 
    form.querySelector('input#name').value = ''
    form.querySelector('textarea#address').value = ''
    form.querySelector('input#country').value = ''
    form.querySelector('input#state').value = ''
    form.querySelector('input#gst').value = ''
    form.querySelector('input#contact').value = ''
    form.querySelector('input#mobile').value = ''
    form.querySelector('input#email').value = ''
    form.style.display='flex' 
    submit_add.style.display='flex'
}
const setcacheForm = async()=>{
    const form = document.querySelector('#form')
    localStorage.setItem('name',form.querySelector('input#name').value )
    localStorage.setItem('address',form.querySelector('textarea#address').value)
    localStorage.setItem('country',form.querySelector('input#country').value)
    localStorage.setItem('state',form.querySelector('input#state').value)
    localStorage.setItem('gst',form.querySelector('input#gst').value)
    localStorage.setItem('contact',form.querySelector('input#contact').value)
    localStorage.setItem('mobile',form.querySelector('input#mobile').value)
    localStorage.setItem('email',form.querySelector('input#email').value)
}
let getcacheForm = ()=>{
    const form = document.querySelector('#form')
    form.querySelector('input#name').value =localStorage.getItem('name')          
    form.querySelector('textarea#address').value =localStorage.getItem('address') 
    form.querySelector('input#country').value =localStorage.getItem('country') 
    form.querySelector('input#state').value =localStorage.getItem('state') 
    form.querySelector('input#gst').value =localStorage.getItem('gst') 
    form.querySelector('input#contact').value =localStorage.getItem('contact') 
    form.querySelector('input#mobile').value =localStorage.getItem('mobile') 
    form.querySelector('input#email').value =localStorage.getItem('email') 
}
let clearCacheForm = ()=>{
    localStorage.clear()
}

const submit = ()=>{
    clearCacheForm()
    const btn = document.querySelector('.submit-add')
    if(btn.innerText==='Update'){
        updateForm()
    }
    else
    {
        submitForm()
    }
}

const submitForm = async()=>{
   
    const data = {
        name: form.querySelector('input#name').value,
        address: form.querySelector('textarea#address').value,
        country: form.querySelector('input#country').value,
        state: form.querySelector('input#state').value,
        gst: form.querySelector('input#gst').value,
        contactName: form.querySelector('input#contact').value,
        mobile: form.querySelector('input#mobile').value,
        email: form.querySelector('input#email').value
    }
    try {
        const res = await fetch('http://localhost:5000/api/v1/suppliers',{
            method:"POST",
            body:JSON.stringify({data}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).json()
        
    } 
    catch (error) {
        console.log(error)
    }
}

const updateForm = async()=>{

    const data = {
        _id: form.querySelector('input#id').value, 
        name: form.querySelector('input#name').value,
        address: form.querySelector('textarea#address').value,
        country: form.querySelector('input#country').value,
        state: form.querySelector('input#state').value,
        gst: form.querySelector('input#gst').value,
        contactName: form.querySelector('input#contact').value,
        mobile: form.querySelector('input#mobile').value,
        email: form.querySelector('input#email').value
    }
    try {
        const res = await fetch('http://localhost:5000/api/v1/suppliers',{
            method:"PUT",
            body:JSON.stringify({data}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).json()
        
    } 
    catch (error) {
        console.log(error)
    }
}