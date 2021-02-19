<template>
  <div id="app">
    <!--<Mapa/>-->
    <loading :active.sync="isLoading" 
      :can-cancel="true" 
      :on-cancel="onCancel"
      :is-full-page="fullPage">
    </loading>

    <div id="map">
      <gmaps-map v-if="form.formato=='CPE'" :options="mapOptions">
        <!--<gmaps-marker v-for="(item, i) in items" :key="i" :options="item.options" />-->
        <gmaps-circle v-for="(item, i) in items" :key="i" :center="item.coordenadas" :radius="radius" :strokeColor="item.formato_cpe" :fillColor="item.formato_cpe" />
      </gmaps-map>
      
      <gmaps-map v-else :options="mapOptions">
        <!--<gmaps-marker v-for="(item, i) in items" :key="i" :options="item.options" />-->
        <gmaps-circle v-for="(item, i) in items" :key="i" :center="item.coordenadas" :radius="radius" :strokeColor="item.formato_m1" :fillColor="item.formato_m1" />
      </gmaps-map>
    </div>

    <div id="config">
      
    <b-form @submit="onSubmit">

      <b-form-group id="input-group-3" label="Sucursal:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.sucursal"
          :options="sucursales"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4" label="Formato:" label-for="input-4">
        <b-form-select
          id="input-4"
          v-model="form.formato"
          :options="formato"
          required
        ></b-form-select>
      </b-form-group>

      <b-button type="submit" variant="primary">Generar</b-button>
    </b-form>
    <!--
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
    -->

    </div>
  
  </div>
</template>

<script>
//import Mapa from './components/Mapa.vue'
import { gmapsMap, gmapsCircle/*gmapsMarker*/ } from 'x5-gmaps'
import axios from "axios";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'App',
  components: {
    /*Mapa*/
    gmapsMap, //gmapsMarker 
    gmapsCircle,
    Loading
     
  },
  data: () => ({
      //marker

      items: null,
      center: { lat: -34.9087079141171, lng: -71.796454942220 },
      radius: 80,

      mapOptions: {
        center: { lat: -34.9087079141171, lng: -71.7964549422205 },
        zoom: 8,
      },

      isLoading: true,
      fullPage: true,

      form: {
        sucursal: '10',
        formato: 'CPE'
      },

      sucursales: ['10', '11', '12', '13', '14', '15', '16'],
      formato:['CPE', 'M1']

  }),

  mounted(){
    //this.isLoading = true;
    //this.doAjax()
    this.getSucursal(this.form.sucursal)
    /*axios
      .get('http://127.0.0.1:4000/sucursales/10')
      .then(response => (
        //console.log(response["data"])
        this.items = response["data"],
        this.isLoading = false
      ))*/
    
  },
  methods: {
    getSucursal(id) {
      this.isLoading = true
      axios
        .get('http://127.0.0.1:4000/sucursales/'+id)
        .then(response => (
          //console.log(response["data"])
          this.items = response["data"],
          this.isLoading = false
        ))
    },
    /*doAjax() {
      this.isLoading = true;
      // simulate AJAX
      setTimeout(() => {
        this.isLoading = false
      },5000)
    },*/
    onCancel() {
        console.log('User cancelled the loader.')
    },
    onSubmit(event) {
      event.preventDefault()
      this.getSucursal(this.form.sucursal)
      console.log(this.form.formato)
      //alert(JSON.stringify(this.form))
    },
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  height: 100vh;
}
#app {
  height: 100%;
}
#map {

  margin: auto;
  margin-top: 2%;
  height: 70%;
  width: 70%;
}
</style>
