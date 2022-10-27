// creating the required HTML Elements
let container = document.createElement("div")
container.classList.add("container")

let row = document.createElement("div")
row.classList.add("row")

document.body.append(container)

let para = document.createElement("p")

para.classList.add("text-center" ,"text-white")
para.innerText="Ice and Fire is a series of epic fantasy novels by the American novelist and screenwriter George R. R. Martin. He began the first volume of the series, A Game of Thrones, in 1991, and it was published in 1996. Martin, who initially envisioned the series as a trilogy, has published five out of a planned seven volumes. The most recent volume of the series, A Dance with Dragons,"

container.append(para)

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
                <div class="col-4 text-center mt-2 mb-4">
                <div class="card" style="width: 18rem;">
                <img src="images/${[i]}.jpg" class="card-img-top" alt="..." style ="height: 350px">
                <div class="card-body">
                <h4 class="card-title text-primary">${dataOfBooks[i].name}</h4>
                <ul class="list-group list-group-flush">
                <li class="list-group-item text-secondary">ISBN : ${dataOfBooks[i].isbn}</li>
                <li class="list-group-item text-secondary">No. of Pg : ${dataOfBooks[i].numberOfPages}</li>
                <li class="list-group-item text-secondary">Author : ${dataOfBooks[i].authors[0]}</li>
                <li class="list-group-item text-secondary">Publisher : ${dataOfBooks[i].publisher}</li>
                <li class="list-group-item text-secondary">Released : ${dataOfBooks[i].released.slice(0,10)}</li>
                </ul>
                <a href="#" class="btn btn-primary mt-3">Show Characters</a>
                </div>
                </div>
                </div>`
        }

        let btn = document.querySelectorAll(".btn")
        
        for (let i = 0; i < btn.length; i++) {
        
            btn[i].addEventListener("click", async (event)=>{
                event.preventDefault()
                let arr = []
                
                for (let j = 10; j < 15; j++){
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
        }
    // catch block to console th error    
    } catch (err) {
        console.log(err)
    }
}

// calling the async iceNFire function
iceNfire()

