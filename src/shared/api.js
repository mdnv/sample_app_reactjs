import axios from 'axios'

let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:3001/api'
} else {
  BASE_URL = 'https://railstutorialapi.herokuapp.com/api'
}

axios.defaults.xsrfCookieName = 'CSRF-TOKEN';

axios.defaults.xsrfHeaderName = 'X-CSRF-Token';

axios.defaults.withCredentials = true;

const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}

export default class API {
    constructor(lang = 'EN') {
        this.lang = lang
    }
    getHttpClient(baseURL = `${BASE_URL}`) {
        var headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-lang': this.lang,
            'X-CSRF-Token': getCookie('CSRF-TOKEN')
        }
        if (localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined') {
            headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        }
        setTimeout(function(){localStorage.removeItem('token')}, 1000*60*60)
        this.client = axios.create({
            baseURL: baseURL,
            headers: headers
        })
        return this.client
    }
}
