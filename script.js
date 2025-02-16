const inputEl = document.querySelector('.input-el')
const enterBtn = document.querySelector('.enter-btn')
const olEl = document.querySelector('.ol-el')

let list = JSON.parse(localStorage.getItem('list')) || []

getListOnReload()

inputEl.addEventListener('keydown', function(e){
    if(e.key === 'Enter'){
        displayList()
    }
    else{
        return;
    }
})

enterBtn.addEventListener('click', function(){
    if(inputEl.value.trim() === ''){
        return;
    }

    else{
        displayList()
    }
    
})

olEl.addEventListener('click', function(e){
    if(e.target.classList.contains('delete-btn')){

        let li = e.target.parentElement
        let id = Number(li.dataset.id)

        console.log(list)

        list = list.filter(el => {
           return el.id !== id
        })

        localStorage.setItem('list', JSON.stringify(list))

        li.remove()

    }
})


olEl.addEventListener('blur', function(e){
    if(e.target.classList.contains('task')){

        let li = e.target.parentElement
        let id = Number(li.dataset.id)
        let pValue = e.target.textContent

    

        let data = list.find(el => {
            return el.id  === id
        })
        
        data.text = `<p class='task' contenteditable = true> ${pValue} </p>  <button class='delete-btn'> Delete </button>`

       localStorage.setItem('list', JSON.stringify(list))

    }
    else{
        return;
    }
}, true)

function displayList(){

    let li = document.createElement('li')

        li.innerHTML = `<p class='task' contenteditable = true> ${inputEl.value} </p>  <button class='delete-btn'> Delete </button>`

        olEl.append(li)

        inputEl.value = ''

        let data = {id: Date.now(), text: li.innerHTML}

        list.push(data)

        localStorage.setItem('list', JSON.stringify(list))
    
}

function getListOnReload(){
    olEl.innerHTML = ""
    list.forEach(el => {
        
        let li = document.createElement('li')
        li.innerHTML = el.text
        li.dataset.id = el.id
        olEl.append(li)
    });
}