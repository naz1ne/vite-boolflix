import { reactive } from 'vue'
import axios from 'axios'

export const store = reactive({
      posterUrl: 'https://image.tmdb.org/t/p/',
      sizePoster: 'original/',
      flagImg: '',
      flags: {
            en: '/img/UKFlag.png',
            it: '/img/italyFlag.png',
            de: '/img/germanyFlag.png',
            es: '/img/spainFlag.png',
            fr: '/img/franceFlag.png',
      },
      movies: null,
      urlMovies: 'https://api.themoviedb.org/3/search/movie',
      urlSeries: 'https://api.themoviedb.org/3/search/tv',
      params: {
            appKey: 'bf0adbbc7cc3cff932de6b4b6b5eef10',
            query: ''
      },
      callApi: (url) => {
            axios.get(url)
                  .then(function (response) {

                        if (store.movies === null) {
                              store.movies = response.data.results
                        } else {
                              response.data.results.forEach(element => {
                                    store.movies.push(element)
                              });
                        }
                        console.log(store.movies);

                  })
                  .catch(function (error) {
                        console.log(error);
                  });

      },
      searchMovies() {
            store.movies = null

            const selectMovies = store.params.query

            let moviesUrl = store.callApi(`${store.urlMovies}?api_key=${store.params.appKey}&query=${selectMovies}`)

            let seriesUrl = store.callApi(`${store.urlSeries}?api_key=${store.params.appKey}&query=${selectMovies}`)

            store.callApi(moviesUrl)
            store.callApi(seriesUrl)
      },
      flagsChange(lang) {
            if (lang === 'en') {
                  return store.flags.en
            } else if (lang === 'it') {
                  return store.flags.it
            } else if (lang === 'de') {
                  return store.flags.de
            }
            else if (lang === 'fr') {
                  return store.flags.fr
            }
            else if (lang === 'es') {
                  return store.flags.es
            }
      },
      roundedVote(vote) {
            return Math.ceil(vote)
      }

})