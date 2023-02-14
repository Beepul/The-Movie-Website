// // apiKey=e096430e5ce68a2854bf0e84f3a62935
// // trending = https://api.themoviedb.org/3/trending/all/day?api_key=<<api_key>>
// // popular = https://api.themoviedb.org/3/tv/popular?api_key=<<api_key>>&language=en-US&page=1
// // popularThe = https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
// latest =  https://api.themoviedb.org/3/tv/latest?api_key=<<api_key>>&language=en-US
// video Tv = https://api.themoviedb.org/3/tv/{tv_id}/videos?api_key=<<api_key>>&language=en-US

const posters = [
    {
    "id": 1,
     "img":"../images/banner/bg1.jpg"   
    },
    {
        "id": 2,
        "img":"../images/banner/bg2.jpg"   
    },
    {
        "id": 3,
        "img":"../images/banner/bg3.jpg"   
    },
    {
        "id": 4,
        "img":"../images/banner/bg4.jpg"   
    },
    {
        "id": 5,
        "img":"../images/banner/bg5.jpg"   
    },
    {
        "id": 6,
         "img":"../images/banner/bg6.jpg"   
        },
        {
            "id": 7,
            "img":"../images/banner/bg7.jpg"   
        },
        {
            "id": 8,
            "img":"../images/banner/bg8.jpg"   
        },
        {
            "id": 9,
            "img":"../images/banner/bg9.jpg"   
        },
        {
            "id": 10,
            "img":"../images/banner/bg10.jpg"   
        }
]

const sliderDiv = document.querySelector(".slider");
const popSlider = document.getElementById('popSlider');
const changeBtn = document.querySelectorAll('#pop-btn');
const movieEl = document.querySelector('.theater-option');
const tvEl = document.querySelector('.tv-option');
const trailerBtn = document.querySelectorAll('#tai-btn');
const trailerBtnTv = document.querySelector('.trailer-Tv');
const trailerBtnMovie = document.querySelector('.trailer-Movie');
const trailerEl = document.querySelector('#content');


const apiKey = "e096430e5ce68a2854bf0e84f3a62935";


let movieType = {
    type: 'tv',
    latest: 'tv',
}

const fetchMovie = async () =>{
    try{
        const response = await fetch(`https://api.themoviedb.org/3/${movieType.type}/popular?api_key=${apiKey}&language=en-US&page=1`);
        let movie = await response.json();
        movie = movie.results;
        renderMovie(movie)
    }catch(error){
        console.log(error);
    }
    
}
const getMonthName =(movieDate)=>{
    const dateObj = new Date(movieDate);
    let day = dateObj.getDate();
    let month = dateObj.getMonth();
    let year = dateObj.getFullYear();
    dateObj.setMonth(month - 1);
    const monthName = dateObj.toLocaleString('en-US', { month: 'short' });
    const fullDate = [monthName,day,year].toString();
    return fullDate
}
const renderMovie = (moviesObject) => {
    let popMovies = moviesObject.map(movie => {
        const {poster_path,name,first_air_date,vote_average,title,release_date,id} = movie;
        let disMovie = `
        <div id="popularMovie" class="post" data-id="${id}" >
        <div class="post-img">
            <img class="w-100" src="https://www.themoviedb.org/t/p/w220_and_h330_face/${poster_path}" alt="">
        </div>
        <div class="post-title">
            <h6>${name ? name : title}</h6>
            <p>${getMonthName(release_date ? release_date : first_air_date)}</p>
        </div>
        <div class="prog">
            <p>${vote_average * 10}<sup>%</sup></p>
            <svg width="100" height="100">
                <circle cx="30" cy="30" r="22" stroke-dashoffset="${157-(vote_average*10)-20}"/>
            </svg>
        </div>
      </div>`
        return disMovie;
    })
    popMovies = popMovies.join(" ");
    popSlider.innerHTML = popMovies;
    const popularEl = document.querySelectorAll('#popularMovie');
    getMoviePage(popularEl)

}

const getMoviePage = (popularEl) => {
    popularEl.forEach(el => {
        el.addEventListener('click', async ()  => {
            let id = el.dataset.id;
            try{
                const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`);
                const data = await res.json();
                const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}&language=en-US`);
                let videos = await response.json();
                videos = videos.results;
                videos = [...[data],...[videos]]
                localStorage.setItem("singleMovie", JSON.stringify(videos))
                window.location.href = "../movie.html";
            }catch(error){
                console.log(error);
            }
        })
    })
}

const fetchLatest = async () => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/${movieType.latest}/latest?api_key=${apiKey}&language=en-US`);
        let movie = await response.json();
        renderLatestMovie(movie)
    }catch(error){
        console.log(error);
    }
}
const renderLatestMovie = (movies) =>{
    // console.log(movies)
    const {poster_path,name,status} = movies
    let movie = `<div class="movie">
    <div class="movie-poster">
      <img class="w-100" src="https://www.themoviedb.org/t/p/w355_and_h200_multi_faces/${poster_path}" alt="">
      <div class="play-con"><i class="bi bi-play-fill"></i></div>
    </div>
    <div class="movie-text">
      <h4>${name}s</h4>
      <p>${status}</p>
    </div>
  </div>`;
  trailerEl.innerHTML = movie;
}

function setMovieType (callback){
    callback();
    fetchMovie();
    fetchLatest();
}

const getMovieType = () =>{
    changeBtn.forEach(el=>{
        el.addEventListener('click',event =>{
            if(event.target.dataset.id == "movie"){
                movieEl.classList.add('active');
                tvEl.classList.remove('active');
                setMovieType(()=>{
                    movieType.type = "movie"
                })
            }else if(event.target.dataset.id == "tv"){
                movieEl.classList.remove('active');
                tvEl.classList.add('active');
                setMovieType(()=>{
                    movieType.type = "tv"
                })
            }
        })
    })
}
const getTrailerType = () =>{
    trailerBtn.forEach(el=>{
        el.addEventListener('click',event =>{
            if(event.target.dataset.id == "movie"){
                trailerBtnMovie.classList.add('active');
                trailerBtnTv.classList.remove('active');
                setMovieType(()=>{
                    movieType.latest = "movie"
                })
            }else if(event.target.dataset.id == "tv"){
                trailerBtnMovie.classList.remove('active');
                trailerBtnTv.classList.add('active');
                setMovieType(()=>{
                    movieType.latest = "tv"
                })
            }
        })
    })
}
window.addEventListener('load',()=>{
    fetchMovie()
    getMovieType();
    fetchLatest();
    getTrailerType();
})



class Movies{
    getRandomPoster(){
        const randomPost = Math.floor(Math.random()*posters.length+1);
        const images = posters.find(el =>{
            return randomPost == el.id
        })
        Ui.displayPoster(images)
    }
    async getTrendingMovies(){
        try{
            const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`);
            let data = await response.json();
            data = data.results;
            Ui.filterHavingName(data);
            Ui.filterHavingTitle(data);
        }catch(error){
            console.log("fetch error:",error);
        }
    }
    static getMovieById (trendingMovieDiv){
        trendingMovieDiv.forEach(item => {
            item.addEventListener('click', async ()=>{
                let id = item.dataset.id;
                try{
                    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`);
                    let data = await res.json();
                    data = data.name
                    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}&language=en-US`);
                    let videos = await response.json();
                    videos = videos.results;
                    videos = [...[data],...[videos]]
                    localStorage.setItem("singleTv", JSON.stringify(videos));
                    this.getMovieFromLocal()
                }catch(error){
                    console.log(error)
                }
            })
        })
    }
    static getMovieFromLocal (){
        let data = JSON.parse(localStorage.getItem('singleTv'));
        Ui.renderVideo(data);
    }
}
class Ui{
    static displayPoster(data){
        const bannerDiv = document.getElementById('banner');
        bannerDiv.style.backgroundImage = `url(${data.img})`;
    }
    static filterHavingTitle(data){
        const titles = data.filter(item => {
            return item.title;
        })
        const mov = titles.map(el => {
            el.date = el.release_date
            delete el['release_date']
            return el
        })
        this.displayTrendingMovie(mov);
    }
    static filterHavingName(data){
        const names = data.filter(item => {
            return item.name
        })
        const move = names.map(el => {
            el.date = el.first_air_date;
            delete el['first_air_date']
            return el
        })
        this.displayTrendingMovie(move)
    }
    static displayTrendingMovie(moviesObject){
        let movies = moviesObject.map(movie => {
            const {poster_path,name,date,title,vote_average,id} = movie;
            const getMonthName =()=>{
                const dateObj = new Date(date);
                let day = dateObj.getDate();
                let month = dateObj.getMonth();
                let year = dateObj.getFullYear();
                dateObj.setMonth(month - 1);
                const monthName = dateObj.toLocaleString('en-US', { month: 'short' });
                const fullDate = [monthName,day,year].toString();
                return fullDate
            }
            const getPopularity = () =>{
                let vote = vote_average * 10;
                vote = Math.floor(vote);
                return vote
            }
                let putMovies = `
                <div id="trendingMovie" class="post" data-id=${id} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                <div class="post-img">
                  <img class="w-100" src=https://www.themoviedb.org/t/p/w220_and_h330_face/${poster_path} alt="">
                </div>
                <div class="post-title">
                  <h6>${name ? name : title}</h6>
                  <p>${getMonthName()}</p>
                </div>
                <div class="prog">
                    <p>${getPopularity()}<sup>%</sup></p>
                    <svg width="100" height="100">
                        <circle cx="30" cy="30" r="22" stroke-dashoffset="${157-getPopularity()-20}"/>
                    </svg>
                </div>
                </div>`;
                return putMovies;
        })
        movies = movies.join(" ");
        sliderDiv.innerHTML += movies;
        const trendingMovieDiv = document.querySelectorAll('#trendingMovie');
        Movies.getMovieById(trendingMovieDiv);
    }
    static renderVideo(data){
        let movie = data[0];
        let videos = data[1];
        const videoEl = document.getElementById('video-body');
        if(videos.length == 0){
            let error = "404 NOT FOUND";
            videoEl.innerHTML = `<h2>${error}</h2>`
        }else{
            let video = videos.find(item =>{
                if(item.name.includes('Official')){
                    return item
                }
            })
            const title = document.querySelector(".modal-title");
            title.innerText = movie;
            let dom = `<iframe class="video" width="956" height="538" src="https://www.youtube.com/embed/${video.key}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
            videoEl.innerHTML = dom;
        }
    }
}

window.addEventListener('load',()=>{
    const movies = new Movies();
    const ui = new Ui();
    movies.getTrendingMovies();
    movies.getRandomPoster();
})
