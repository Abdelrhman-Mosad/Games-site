
let gameCardTempElm = document.getElementById('card-temp');
let gameCardsContianer = gameCardTempElm.parentElement;
let gameSearchInput = document.getElementById('search-bar');
let gameSearchFailedMsg = document.getElementById('search-failed');


/* Details layer elements */
let layerContainer       = document.getElementById('game-details-layer');
let layerCloseBtn        = document.getElementById('close-button');

let gameImagesSlidersElm = document.getElementById('Img-slider');
let gameImageCoverElm    = document.querySelector('#layer-content figure img');
let gameTitleElm         = document.querySelectorAll('#layer-content ul h3')[0];
let gameCatgElm          = document.querySelectorAll('#layer-content ul h3')[1];
let gamePlatformElm      = document.querySelectorAll('#layer-content ul h3')[2];
let gameStatusElm        = document.querySelectorAll('#layer-content ul h3')[3];
let gameDiscElm          = document.getElementById('disc');
let gameLinkElm          = document.getElementById('game-link');



let allGames = [];
let openedGameDetailsObj = null;


class Game {
    constructor(id, title , short_desc, genre, thumbnail , platform){
        this.id         = id;
        this.title      = title;
        this.short_desc = short_desc;
        this.genre      = genre;
        this.thumbnail  = thumbnail;
        this.platform   = platform;
        this.long_desc = '';
        this.game_url = '';
        this.status = '' ;
        this.images = [];
        this.img_idx = 0;
    }


    displayNewCardGame(){
        let newCrad = gameCardTempElm.cloneNode(true);

        let gameHeader   = newCrad.querySelector('.card-temp .game-title-header');
        let gameDiscr    = newCrad.querySelector('.card-temp .game-disc');
        let gameCategory = newCrad.querySelectorAll('.card-temp .card-footer span')[0];
        let gamePlatform = newCrad.querySelectorAll('.card-temp .card-footer span')[1];
        let gameImage = newCrad.querySelector(' .card-temp img');

        gameHeader.innerText = this.title;
        gameDiscr.innerText = this.short_desc;
        gameCategory.innerText = this.genre;
        gamePlatform.innerText = this.platform;
        gameImage.setAttribute('src' , this.thumbnail);
        gameImage.setAttribute('alt' , this.title +' cover');

        newCrad.classList.remove('d-none');
        newCrad.children[0].setAttribute('card-id' , this.id);
        newCrad.children[0].addEventListener('click' , updatGameDetailsLayer);

        gameCardsContianer.appendChild(newCrad);
    }

    setSpecData(long_desc , game_url, status , images){
        this.long_desc = long_desc;
        this.game_url = game_url;
        this.status = status;
        this.images = images;
    }

    updateLayerData(){
        gameImageCoverElm.setAttribute('src' , this.thumbnail);
        gameTitleElm.innerText = this.title;
        gameCatgElm.innerText = this.genre;
        gamePlatformElm.innerText = this.platform;
        gameStatusElm.innerText = this.status;
        gameDiscElm.innerText = this.long_desc;
        gameLinkElm.setAttribute('href' , this.game_url); 


        if(this.images.length >2){
            for(let i =0; i<2 ; i++){
                gameImagesSlidersElm.children[0].children[i].setAttribute('src' ,this.images[i].image);
            }
            this.img_idx = 1;
        }
    }

    leftSlide(){
        if(this.images.length > 2){
            if (this.img_idx < this.images.length -1){
                gameImagesSlidersElm.children[0].children[0].setAttribute('src' ,this.images[this.img_idx].image);
                gameImagesSlidersElm.children[0].children[1].setAttribute('src' ,this.images[this.img_idx+1].image);
                this.img_idx++;
                
            }
            else{  
                gameImagesSlidersElm.children[0].children[0].setAttribute('src' ,this.images[this.img_idx].image);
                gameImagesSlidersElm.children[0].children[1].setAttribute('src' ,this.images[0].image);
                this.img_idx = 0;
            }
            
        }
        
    }

    rightSlide(){
        if(this.images.length > 2){
            if (this.img_idx == 1){
                gameImagesSlidersElm.children[0].children[0].setAttribute('src' ,this.images[this.images.length -1].image);
                gameImagesSlidersElm.children[0].children[1].setAttribute('src' ,this.images[0].image);
                this.img_idx = 0;
            }
            else if (this.img_idx == 0){  
                this.img_idx = this.images.length-1;
                gameImagesSlidersElm.children[0].children[0].setAttribute('src' ,this.images[this.img_idx -1].image);
                gameImagesSlidersElm.children[0].children[1].setAttribute('src' ,this.images[this.img_idx].image);
                
            }
            else 
            {
                this.img_idx--;
                gameImagesSlidersElm.children[0].children[0].setAttribute('src' ,this.images[this.img_idx -1].image);
                gameImagesSlidersElm.children[0].children[1].setAttribute('src' ,this.images[this.img_idx].image);
            }
        }
    }

}



/* Events */
/********** Loading ******** */
window.addEventListener('load' , function(){
    ShowCardGames('MMORPG').then(function(res){
        allGames = res;
    });
});

/********** Clicking a menue ******** */
document.querySelector('nav ul').addEventListener('click' , function(e){
    const catg = e.target.innerText;
    ShowCardGames(catg).then(function(res){
        allGames = res;
    });


    // Change active link 
    e.target.parentElement.parentElement.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');
    
});


/********** search bar ******** */
gameSearchInput.addEventListener('keyup' , function(e){
    let search = gameSearchInput.value;
    if(e.key === 'Enter'){
        let foundGames = [];
        foundGames = allGames.filter(function(elm) {return (elm.title).toLocaleLowerCase().includes(search.toLocaleLowerCase());})

        // in case some games were found will display them if not will show error msg 
        if (foundGames.length > 0){
            gameCardsContianer.innerHTML='';
            gameSearchFailedMsg.classList.add('d-none');

            for(const game of foundGames){
                game.displayNewCardGame();
            }
        }
        else {
            gameSearchFailedMsg.classList.remove('d-none');
        }
        
    }
})

/********** close layer ******** */
layerCloseBtn.addEventListener('click' , function(){
    layerContainer.classList.add('d-none');
    gameCardsContianer.classList.remove('d-none');
})

/********** Slides for images in layer ******** */
gameImagesSlidersElm.children[1].addEventListener('click' , function(e){
    let elm ;
    if (e.target.tagName == 'I'){
        elm = e.target.parentElement;
    }
    else{
        elm = e.target; 
    }
    const elmId = elm.getAttribute('btn-id');


    if(elmId == 'left-btn')
    {
       openedGameDetailsObj.leftSlide();
    }
    else if(elmId == 'right-btn'){
        openedGameDetailsObj.rightSlide();
    }
})


/********** functions ******** */
async function ShowCardGames(catg){
    let allGamesLocal = [];

    /* Clear all card games that are present now */
    gameCardsContianer.innerHTML='';

    allData = await getAllGamesOfCatg(catg);

    for(let i =0; i<allData.length; i++ ){
        allGamesLocal.push(new Game(allData[i].id ,
                                    allData[i].title , 
                                    allData[i].short_description ,
                                    allData[i].genre ,
                                    allData[i].thumbnail ,
                                    allData[i].platform
        ))

        allGamesLocal[i].displayNewCardGame();
    }


    return allGamesLocal;
}       


async function updatGameDetailsLayer(e) {
    // Get card id
    const id = this.getAttribute('card-id');

    // get details from api
    const selectedGame = await getGameDetails(id);

    // update html 
    selectedGame.updateLayerData();

    // show the layer
    layerContainer.classList.remove('d-none');
    gameCardsContianer.classList.add('d-none');
    openedGameDetailsObj = selectedGame;
    
}




/* Apis callings */
async function getAllGamesOfCatg(catg){
    const url_api = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${catg}` ;

    const options = {
        method : "GET",
        headers:{
            'x-rapidapi-host' : 'free-to-play-games-database.p.rapidapi.com',
            'x-rapidapi-key'  : '8c74b654f7msh876071f38368e24p1c1ef4jsn53754209f6be' 
        }
    }

    const resp = await fetch(url_api, options);
    const data = await resp.json();

    return data;
}

async function getGameDetails(id){
    const url_api = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}` ;

    const options = {
        method : "GET",
        headers:{
            'x-rapidapi-host' : 'free-to-play-games-database.p.rapidapi.com',
            'x-rapidapi-key'  : '8c74b654f7msh876071f38368e24p1c1ef4jsn53754209f6be' 
        }
    }

    const resp = await fetch(url_api, options);
    const data = await resp.json();

    let selectedGame = allGames.find(function(x) {return x.id == id})
    selectedGame.setSpecData(data.description , data.game_url, data.status, data.screenshots);

    return selectedGame;
}
