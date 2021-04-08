var app = new Vue({
    el: "#root",
    data: {
        searchMovie:"",
        listMovies: [],
        flags: []
    },
    methods: {
        getMovie() {
            this.listMovies = []
            axios
                .get("https://api.themoviedb.org/3/search/movie?api_key=7a64f0d1a4df162cd4dc8d041b52155b&query="+ this.searchMovie)
                .then((result) => {
                    console.log(result);
                    var movies = result.data.results;
                    movies.forEach((movie) => {
                        if (movie.original_language == "en") {
                            movie.original_language = "gb";
                        }
                        movie.original_language = movie.original_language.toUpperCase()
                        movie.vote_average = Math.ceil(movie.vote_average / 2);
                        this.listMovies.push(movie);
                    })

                })
            axios
                .get("https://api.themoviedb.org/3/search/tv?api_key=7a64f0d1a4df162cd4dc8d041b52155b&query=" + this.searchMovie)
                .then((res) => {
                    console.log(res);
                    var series = res.data.results;
                    series.forEach((serie) => {
                        if (serie.original_language == "en") {
                            serie.original_language = "gb";
                        }
                        serie.original_language = serie.original_language.toUpperCase()
                        serie.vote_average = Math.ceil(serie.vote_average / 2);
                        this.listMovies.push(serie);
                    })
                    console.log(this.listMovies);
                })
            this.searchMovie = "";
         }
    },
    mounted: function() {
        axios
            .get("https://api.themoviedb.org/3/configuration/countries?api_key=7a64f0d1a4df162cd4dc8d041b52155b")
            .then((result) => {
                console.log(result.data);
                var countries = result.data;
                countries.forEach((country) => {
                    this.flags.push(country.iso_3166_1)
                })
                console.log(this.flags);
            })
    }
})
Vue.config.devtools = true;