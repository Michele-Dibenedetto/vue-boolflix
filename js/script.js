var app = new Vue({
    el: "#root",
    data: {
        searchMovie:"",
        listMovies: [],
    },
    methods: {
        getMovie() {
            this.listMovies = []
            axios
                .get("https://api.themoviedb.org/3/search/movie?api_key=7a64f0d1a4df162cd4dc8d041b52155b&query="+ this.searchMovie)
                .then((result) => {
                    console.log(result);
                    var movies = result.data.results;
                    // this.listMovies = this.listMovies.concat(result.data.results);
                    movies.forEach((movie) => {
                        movie.vote_average = Math.ceil(movie.vote_average / 2);
                        this.listMovies.push(movie);
                    })

                })
            axios
                .get("https://api.themoviedb.org/3/search/tv?api_key=7a64f0d1a4df162cd4dc8d041b52155b&query=" + this.searchMovie)
                .then((res) => {
                    console.log(res);
                    var series = res.data.results;
                    // this.listMovies = this.listMovies.concat(result.data.results);
                    series.forEach((serie) => {
                        serie.vote_average = Math.ceil(serie.vote_average / 2);
                        this.listMovies.push(serie);
                    })
                    // this.listMovies = movies.concat(series)
                    console.log(this.listMovies);
                })
            this.searchMovie = "";
         }
    }
})
Vue.config.devtools = true;