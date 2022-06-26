const capitalAlphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const alphabet = []
capitalAlphabet.forEach((letter)=>{
    alphabet.push(letter.toLowerCase())
})
function removeAllSelected(){
    document.querySelectorAll('.pickedDrinks div').forEach((element)=>{
        while(element.classList.contains('selected')){
            element.classList.remove('selected')
        }
    })
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


function nameShortener(name){
    
    let bob= name.toLowerCase().split('').filter((elem)=>{
        if(elem.toString().charCodeAt()-96 > 0 && elem.toString().charCodeAt()-96 < 27){
            return elem
        }
    }).join('')
    return bob
    
}

let heroku = 'https://starbucks-coffee.herokuapp.com/api/coredrinks'
let local = 'http://localhost:8000/api/coredrinks'
let theDrinks = {}




function createCat(data){
    Object.keys(data).forEach((element)=>{
        
        let category = document.createElement('div')
        category.classList.add(`${element}`)
        category.classList.add('cats')
        category.innerText= capitalizeFirstLetter(element)
        document.querySelector('.drinkType').appendChild(category)
        category.addEventListener('click',(click)=>{
            document.querySelector('.items').className=`items ${(click.target.innerText.toLowerCase())}`
            pageRender(data[click.target.innerText.toLowerCase()],data)
        })
    })
}

function pageRender(click,data){
    removeAllChildNodes(document.querySelector('.items'))
    
    click.forEach((element,i)=>{
        
        let item = document.createElement('div')
        item.style.gridArea = `${alphabet[i]}`
        item.innerText=`${element['name']}`
        item.classList.add(`${nameShortener(element['name'])}`)
        
        document.querySelector('.items').appendChild(item)
        item.addEventListener('click',()=>{
            addToOrder(element)
        })
    })
   
}

document.querySelector('.LOCK').addEventListener('click',()=>{
    removeAllChildNodes(document.querySelector('.pickedDrinks'))
})

document.querySelector('.void').addEventListener('click',async function awomdawd(){
    try{
        document.querySelector('.pickedDrinks .selected').remove()
    }catch(error){
        alert('Select an item to void')
    }

})


function addToOrder(element){
    //document.querySelector(`.items .${nameShortener(element['name'])}`)
    //<input type="text" name="drink" value="words" class="drinkAbbr" readonly>
    let div= document.createElement('div')
    let size = document.createElement('input')
    size.name = 'size'
    size.value='Gr'
    size.readOnly=true
    size.classList.add('sizeIdentifier')
    let drink = document.createElement('input')
    drink.name='drink'
    drink.value=element['abbr']
    drink.readOnly=true
    
    document.querySelector('.pickedDrinks').appendChild(div)
    div.appendChild(size)
    div.appendChild(drink)
    
    div.addEventListener('click',(click)=>{
        selectDrink(click.target.parentElement)
    })
    removeAllSelected()
    selectDrink(div)
}

function selectDrink(drink){
    removeAllSelected()
    drink.classList.add('selected')
}








async function apiRequest(){
    
    try{
        const response = await fetch(local)
        const data = await response.json()
        createCat(data)
        document.querySelector('.items').className=`items espresso`
        pageRender(data.espresso)
        
    }catch(error){
        console.log(error)
    }
}





apiRequest()


