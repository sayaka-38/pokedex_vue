import Vue from 'vue'
import Router from 'vue-router'
import Pokedex from './components/Pokedex' 
import Pokemon from './components/Pokemon'

Vue.use(Router)

export default new Router({
    routes: [ {
    path: '/',
    name: 'pokedex',
    component: Pokedex
    },
    {
    path: '/pokemon',
    name: 'pokemon',
    component: Pokemon
    }
    ],
    mode: 'history'
})