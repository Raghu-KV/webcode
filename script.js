// creating the required HTML Elements
let container = document.createElement("div")
container.classList.add("container")


let section = document.createElement("select")
section.classList.add("form-control" , "position-my")
section.setAttribute("id","serch")


let bookNames = ["All Books", "A Game of Thrones","A Clash of Kings","A Storm of Swords","The Hedge Knight","A Feast for Crows", "The Sworn Sword", "The Mystery Knight", "A Dance with Dragons", "The Princess and the Queen" , "The Rogue Prince"]

for(let book of bookNames){
    let opt = document.createElement("option")
    opt.innerText = book
    section.append(opt)
}


let row = document.createElement("div")
row.classList.add("row")

document.body.append(container)

let para = document.createElement("p")

para.classList.add("text-center")
para.innerText = "Ice and Fire is a series of epic fantasy novels by the American novelist and screenwriter George R. R. Martin. He began the first volume of the series, A Game of Thrones, in 1991, and it was published in 1996. Martin, who initially envisioned the series as a trilogy, has published five out of a planned seven volumes. The most recent volume of the series, A Dance with Dragons,"

let h4 = document.createElement("h4")
h4.classList.add("text-center")
h4.innerText="Serch for books"



container.append(para)
container.append(h4)
container.append(section)
container.append(row)

// fetching the API using async function

async function iceNfire() {
    // try block to check weather there is an error
    try {
        let books = await fetch("https://www.anapioficeandfire.com/api/books")
        let dataOfBooks = await books.json()
        // the API data is stored in dataOfBooks
        for (let i = 0; i < dataOfBooks.length; i++) {
            row.innerHTML += `
                <div class="col-sm-12 col-md-12 col-lg-6 text-center mt-2 mb-4 select">
                <div class="card mb-3" style="min-width: 240px;">
  <div class="row no-gutters">
    <div class="col-4">
      <img src="images/${i}.jpg" alt="..." style="width: 100%; height: 250px">
    </div>
    <div class="col-8">
      <div class="card-body p-3">
        <h5 class="card-title">${dataOfBooks[i].name}</h5>
        <p class="card-text text-muted mb-1"><small>ISBN : ${dataOfBooks[i].isbn}</small></p>
        <p class="card-text text-muted mb-1"><small>No. of Pg : ${dataOfBooks[i].numberOfPages}</small></p>
        <p class="card-text text-muted mb-1"><small>Publisher : ${dataOfBooks[i].publisher}</small></p>
        <p class="card-text text-muted mb-1"><small> released date : ${dataOfBooks[i].released.slice(0,10)}</small></p>
        <p class="card-text text-muted mb-1"><small>author : ${dataOfBooks[i].authors[0]}</small></p>
        <button type="button" class="btn btn-outline-dark mt-2">Show Characters</button>
      </div>
    </div>
  </div>
</div>
                </div>`
        }

        let btn = document.querySelectorAll(".btn")

        for (let i = 0; i < btn.length; i++) {
            try {
                btn[i].addEventListener("click", async (event) => {
                    event.preventDefault()
                    let arr = []

                    for (let j = 10; j < 15; j++) {
                        let char = await fetch(dataOfBooks[i].characters[j])
                        let char5 = await char.json()
                        arr.push(char5.name)
                    }
                    alert(`                1st Character : ${arr[0]}
                2nd Character : ${arr[1]}
                3rd Character : ${arr[2]}
                4th Character : ${arr[3]}
                5th Character : ${arr[4]}`)
                    arr = []
                })
            } catch (err) { console.log(err)}
        }

        let cards = document.querySelectorAll(".select")
        

        let inpt = document.querySelector("#serch")
    
        inpt.addEventListener("input",(e)=>{
            
            for(let card of cards){
               if(inpt.value === "All Books"){
                card.classList.remove("hide")
               } else{
                let lower = card.innerText.toLowerCase()
                let isVisible = lower.includes(inpt.value.toLowerCase())
                card.classList.toggle("hide", !isVisible)
               }
            }
        })
        // catch block to console th error    
    } catch (err) {
        console.log(err)
    }
}

// calling the async iceNFire function
iceNfire()

