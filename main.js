document.getElementById('search-button').addEventListener('click', async function () {
    const search_box = document.getElementById('search-box').value;
    console.log(search_box)
    document.getElementById('item-lyrics').innerText = ''
    console.log()
    try {
        const URL = `https://api.lyrics.ovh/suggest/${search_box}`
        //  console.log(URL)
        const result = await fetch(URL)
        let res = await result.json()
        // call the display function
        displayItems(res.data)

    } catch (e) {
        //alert(`${search_box} not found`)
        await displayError('Something went wrong, try again later')
    }
})

// function that display all item
const displayItems = item => {
    //  console.log(item)
    const item_content = document.getElementById('item-content')
     item_content.innerHTML = ''
    item.forEach(pics => {
    //    console.log(pics)
        const div = document.createElement('div')
        div.className = 'single-result row align-items-center my-3 p-3'
        div.innerHTML = `
        <div class="col-md-9">
                        <h3 class="lyrics-name">${pics.title}</h3>
                        <p class="author lead">Album by <span>${pics.artist.name}</span></p>
                        <audio controls>       
                           <source src="${pics.preview}" type="audio/mpeg"> 
                      </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getText('${pics.artist.name}','${pics.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
        `
        item_content.appendChild(div)
    })
}

const checkURL = URL => {
    let request;
    if (window.XMLHttpRequest)
        request = new XMLHttpRequest();
    else
        request = new ActiveXObject("Microsoft.XMLHTTP");
    request.open('GET', URL, false);
    request.send(); // there will be a 'pause' here until the response to come.
// the object request will be actually modified
    console.log(request.status + " here")
    return request.status

}

const getText = async (artist, title) => {
    //  console.log(title, artist)
    let text = ''
    const item_lyrics = document.getElementById('item-lyrics')
    try {
        const URL = `https://api.lyrics.ovh/v1/${artist}/${title}`
        if (checkURL(URL) === 404) text = `${artist} : ${title} lyrics not fund`
        else {
            const result = await fetch(URL)
            let res = await result.json()
            //  console.log(res.lyrics)
            text = res.lyrics
        }


    } catch (e) {
      await  displayError('failed to load lyrics, try again later')

    } finally {
        item_lyrics.innerText = text
        console.log(text)
    }
}

const displayError = async wrong => {

    const displayError = document.getElementById('errorMessage')
    displayError.innerText = wrong
}

