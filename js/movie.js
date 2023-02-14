const movieEl = document.getElementById('movie-con');
const videoEl = document.getElementById('video-body');

const getSingleMovie = () =>{
    let data = JSON.parse(localStorage.getItem('singleMovie'));
    let movie = data[0];
    let videos = data[1];
    renderMovie(movie,videos);
}



const renderMovie = (movies,videos) => {
    const {poster_path,name,genres,episode_run_time,vote_average,tagline,overview,created_by} = movies;
    let dom = `<div class="row">
    <div class="col-3">
        <img class="w-100" src="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}" alt="">
    </div>
    <div class="col movie-details ps-5">
        <div class="heading">
            <h1>${name} <span>(2023)</span></h1>
            <div class="heading-small d-flex gap-3 py-2">
                <p class="a">TV-MA</p>
                <div class="movie-type d-flex gap-2">
                
                </div>
                <p class="movie-hr ps-3">${Math.ceil(episode_run_time/60)}h</p>
            </div>
        </div>
        <div class="shorts-con d-flex">
        <div class="shorts">
            <div class="prog">
                <p>${Math.floor(vote_average * 10)}<sup>%</sup></p>
                <svg width="100" height="100">
                    <circle cx="30" cy="30" r="28" stroke-dashoffset="${176-(vote_average*10)-40}" />
                </svg>
            </div>
        </div>
        <h4 >User Score</h4>
        <ul class="d-flex gap-3">
            <li><i class="bi bi-list-task"></i></li>
            <li><i class="bi bi-heart-fill"></i></li>
            <li><i class="bi bi-bookmark-fill"></i></li>
            <li><i class="bi bi-star-fill"></i></li>
            <li>
            <a class="play-btn d-flex align-items-center gap-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <i class="bi bi-play-fill"></i> 
                <p class="pt-2">Play Trailer</p> 
            </a>
            </li>
        </ul>
        </div>
    <div>
        <h6 class="py-2">${tagline}</h6>
        <h3 class="py-2">Overview</h3>
        <p>${overview}</p>
        <div class="auth d-flex gap-5 py-2">
            <div>
                <h4>Craig Mazin</h4>
                <p>Creator</p>
            </div>
        </div>
    </div>
    </div>
</div>`;
movieEl.innerHTML = dom;
const genEl = document.querySelector('.movie-type');
rendergenres(genEl,genres)
const authEl = document.querySelector('.auth');
renderCreator(authEl,created_by);
const playBtn = document.querySelector('.play-btn');
playBtn.addEventListener('click',()=>{
    filterMovie(videos,name)
})
}

const rendergenres = (genEl,genres) => {
    let gen = genres.map(el => {
        let gener = `
        <p>${el.name}</p>
        `
        return gener
    })
    gen = gen.join(" ");
    genEl.innerHTML = gen;
}

const renderCreator = (authEl,created_by) =>{
    let auth = created_by.map(el=>{
        return `<div>
        <h4>${el.name}</h4>
        <p>Creator</p>
    </div>`;
    })
    auth = auth.join(" ");
    authEl.innerHTML = auth;
}

const filterMovie = (videos,name) =>{
   if(videos.length == 0){
    let error = "404 NOT FOUND";
    videoEl.innerHTML = `<h2>${error}</h2>`
   }else{
    let video = videos.find(item =>{
        if(item.name.includes('Official')){
            return item
        }
    })
    renderVideo(video,name)
   }
}

const renderVideo = (video,name) => {
    const {key} = video;
    const title = document.querySelector(".modal-title");
    title.innerText = name;
    let dom = `<iframe class="video" width="956" height="538" src="https://www.youtube.com/embed/${key}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    videoEl.innerHTML = dom
}

window.addEventListener('load',()=>{
    getSingleMovie();
})