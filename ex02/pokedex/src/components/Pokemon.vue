<template>
  <div>
      <section v-if="err">{{ errMessage }}</section>

      <section v-else>
        <div v-if="loading">Loading...</div>

        <h3><router-link :to="{ name: 'pokedex'}">もどる</router-link></h3>
        <img :src="ImageUrl + pokemonId + '.png'" width="96" height="96" alt="">
        <h3>ID:{{pokemonId}}</h3>
        <h3>Name:{{pokemon.name}}</h3>
        <div v-for="(poketype, index) in pokemon.types" :key="'poketype'+index"> 
        <h3 v-if="pokemon.types[index]">Type{{index+1}}:{{pokemon.types[index].type.name}}</h3>
        </div>
        <h3>Base Stats：</h3>
        <div v-for="(pokedata, index) in pokemon.stats" :key="'pokedata'+index">
        <h4 v-if="pokemon.stats[index]">{{pokemon.stats[index].stat.name}}:{{pokemon.stats[index].base_stat}}</h4>
        </div>
      </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      pokemon: {},
      pokemonId: this.$route.params.id,
      ImageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      loading: true,
      err: false,
      errMessage: "" 
    }
  },
  methods:{
    getData(){
      axios.get('https://pokeapi.co/api/v2/pokemon/'+ this.$route.params.id)
      .then((resp) => {
        if(resp.status === 200)
          return resp.data;
      })
      .then((resp) => {
        this.pokemon = resp;
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
    this.getData();
  },
  mounted(){
  }
}
</script>