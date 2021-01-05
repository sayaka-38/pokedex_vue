<template>
<div>
  <section v-if="err">{{ errMessage }}</section>

  <section v-else>
    <div v-if="loading">Loading...</div>
    
    <h2>Pokedex_vue</h2>
    <div class="inp">
      poke_search:
      <input type="text" v-model="search"></div>
    <div class="mainlist">
      <div class="list" v-for="(pokemon, index) in search_pokemons" :key="index">
        <img :src="'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + pokemon.id + '.png'" width="131" height="131" alt="">
        <p>ID:{{pokemon.id}}</p>
        <h3 class="text"><router-link :to="{ name: 'pokemon', params: {id: pokemon.id}}">{{pokemon.name}}</router-link></h3>
      </div>
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
        search: "",
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
    },
    computed:{
      search_pokemons(){
        return this.pokemons.filter(pokemon =>{
          return pokemon.name.includes(this.search)
        })
      }
    }
  }
</script>

<style scoped>
.mainlist {
  display: flex;
  flex-wrap: wrap;
  padding: 0 30px 30px 30px;
}
.inp{
  padding: 20px 0 12px 42px;
}
.list{
  border: dashed 1px gray;
  border-radius: 5px;
  margin: 10px;
  padding: 12px;;
}
.text{
  margin: 0px 0px 12px 0px;
  padding: 0 0 0 5px;
}
h2{
  text-align: center;
  margin: 30px 0 0 0;
}
a{
  color: #000;
}
p{
  margin: 0px;
  padding: 0 0 0 5px;
}

</style>