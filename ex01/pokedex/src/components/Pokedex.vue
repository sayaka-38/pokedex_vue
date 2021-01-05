<template>
<div>
  <section v-if="err">{{ errMessage }}</section>

  <section v-else>
    <div v-if="loading">Loading...</div>
    
    <div  v-for="(pokemon, index) in pokemons" :key="index">
      <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon.id + '.png'" width="96" height="96" alt="">
      <h3>ID:{{pokemon.id}}</h3>
      <h3>{{pokemon.name}}</h3>
      <h3>{{pokemon.url}}</h3> 
    </div>
  </section>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Pokemonlist',
    data(){
      return {
        pokemons: [],
        loading: true,
        err: false,
        errMessage: ""
      }
    },
    methods:{
      fetchData() {
          axios.get("https://pokeapi.co/api/v2/pokemon")
            .then((resp) => {
              if(resp.status === 200)
                return resp.data;
            })
            .then((data) => {
              data.results.forEach(pokemon => {
                pokemon.id = pokemon.url.split('/')
                  .filter(function(part) { return !!part }).pop();
                    this.pokemons.push(pokemon);
              });
            })
            .catch((error) => {
              console.log(error);
              this.err = true;
              this.errMessage = error.message;
            })
            .finally(() => this.loading = false)
        },
    },
    created(){
      this.fetchData();
    },
    mounted(){
    }
  }
</script>