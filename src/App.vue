<template>
  <div id="app">

    <loading :active.sync="isLoading" 
      :can-cancel="true" 
      :on-cancel="onCancel"
      :is-full-page="fullPage">
    </loading>

    <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Digital</a>
      <input class="form-control bg-dark w-100" type="text" placeholder="Search" aria-label="Search">
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#">Sign out</a>
        </li>
      </ul>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky p-3">
            <ul class="nav flex-column">

              <li class="nav-item">
                <a class="nav-link" href="#">
                  <span data-feather="file"></span>
                  Home
                </a>
              </li>

            </ul>


          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
            <h1 class="h2">Bienvenido</h1>

          </div>

        <!-- MI MAPA -->
        <div class="container-fluid">
          <div class="row" >
            <div class="col-md-8">
              <div id="colorNumber">
                <span class="dot bg-blue"></span> <span class="mr-2">4</span>
                <span class="dot bg-red"></span> <span class="mr-2">3</span>
                <span class="dot bg-green"></span> <span class="mr-2">2</span>
                <span class="dot bg-purple"></span> <span class="mr-2">1</span>
                 <span class="dot bg-orange"></span> <span class="mr-2">0</span>
                <!--
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-2 bg-primary">
                      <span class="dot"></span>
                    </div>
                    <div class="col-2 bg-dark">
                      43
                    </div>
                    <div class="col-2 bg-secondary">
                      45
                    </div>
                  </div>
                </div>
                -->
              </div>
              <div id="map">
                <gmaps-map v-if="form.formato=='CPE'" :options="mapOptions">
                  <gmaps-circle v-for="(item, i) in items" :key="i" @click="seleccionarSucursal(item, i)" :center="item.coordenadas" :radius="radius" :strokeColor="item.formato_cpe" :fillColor="item.formato_cpe" />
                </gmaps-map>
                
                <gmaps-map v-else :options="mapOptions">
                  <gmaps-circle v-for="(item, i) in items" :key="i" @click="seleccionarSucursal(item, i)" :center="item.coordenadas" :radius="radius" :strokeColor="item.formato_m1" :fillColor="item.formato_m1" />
                </gmaps-map>
              </div>
            </div>
            <div class="col-md-4">
              <h3>Sucursal</h3>
                <div v-if="sucursalSeleccionada">
                  <ul>
                    <li>
                      Sucursal: {{sucursalSeleccionada.sucursal}}
                    </li>
                    <li>
                      Color formato CPE: {{obtenerNumero(sucursalSeleccionada.formato_cpe)}}
                    </li>
                    <li>
                      Color formato M1: {{obtenerNumero(sucursalSeleccionada.formato_m1)}}
                    </li>
                    <li>
                      Latitud: {{sucursalSeleccionada.coordenadas.lat}}
                    </li>
                    <li>
                      Longitud: {{sucursalSeleccionada.coordenadas.lng}}
                    </li>
                  </ul>                  
                  
                </div>
                <div v-else>
                  <p>Selecciona una en el mapa!</p>
                </div>
                <div v-if="sucursalSeleccionada">
                  <h3>Editar Color</h3>
                  <b-form @submit="cambiarColor">

                    <b-form-group id="input-group-5" label="Color:" label-for="input-5">
                      <b-form-select
                        id="input-5"
                        v-model="formCambiarColor.color"
                        :options="colores"
                        required
                      ></b-form-select>
                    </b-form-group>

                    <b-button type="submit" variant="primary">Cambiar</b-button>
                  </b-form>
                </div>
                
            </div>
          </div>
          <div class="row">
            <div class="col-md-8">
              <b-form @submit="onSubmit" class="mt-3">

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
            </div>

          </div>
        </div>

        </main>
      </div>
  </div>
  </div>
</template>

<script>

import { gmapsMap, gmapsCircle/*gmapsMarker*/ } from 'x5-gmaps'
import axios from "axios";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'App',
  components: {
    /*Mapa*/

    gmapsMap, 
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
      formato:['CPE', 'M1'],

      sucursalSeleccionada: null,
      indexSucursalSeleccionada: null,

      formCambiarColor: {
        color:null
      },
      colores:['0','1','2','3','4']

  }),

  mounted(){

    this.getSucursal(this.form.sucursal)

    
  },
  methods: {
    getSucursal(id) {
      this.isLoading = true
      this.sucursalSeleccionada = null
      this.indexSucursalSeleccionada = null
      axios
        .get('http://127.0.0.1:7776/sucursales/'+id)
        .then(response => (
          //console.log(response["data"])
          this.items = response["data"],
          this.isLoading = false
        ))
    },

    onCancel() {
        console.log('User cancelled the loader.')
    },
    onSubmit(event) {
      event.preventDefault()
      this.getSucursal(this.form.sucursal)
      console.log(this.form.formato)
      //alert(JSON.stringify(this.form))
    },
    cambiarColor(event){
      event.preventDefault()
      if(this.form.formato == "CPE"){
        this.sucursalSeleccionada.formato_cpe = this.obtenerColor(this.formCambiarColor.color)//FC()
      }
      else {
        this.sucursalSeleccionada.formato_m1 = this.obtenerColor(this.formCambiarColor.color)
      }
      //console.log(this.sucursalSeleccionada);
      this.items[this.indexSucursalSeleccionada] = this.sucursalSeleccionada

      //alert("Hola")
    },

    seleccionarSucursal(item, i){

      this.sucursalSeleccionada = item
      this.indexSucursalSeleccionada = i
      if(this.form.formato == "CPE"){
        this.formCambiarColor.color = this.obtenerNumero(this.sucursalSeleccionada.formato_cpe)
      }
      else{
        this.formCambiarColor.color = this.obtenerNumero(this.sucursalSeleccionada.formato_m1)
      }
    
    },

    obtenerNumero(color){
      let numero = null
      if(color == "orange"){
        numero = 0
      }
      if(color == "purple"){
        numero = 1
      }
      if(color == "green"){
        numero = 2
      }
      if(color == "red"){
        numero = 3
      }
      if(color == "blue"){
        numero = 4
      }
      return (numero)
    },
    obtenerColor(numero){
    let color = ""
    if (numero == '0')
        {color = "orange"}
    if (numero == '1')
        {color = "purple"}
    if (numero == '2')
        {color = "green"}
    if (numero == '3')
        {color = "red"}
    if (numero == '4')
        {color = "blue"}
    return (color)
    }

  }
}
</script>

<style>
/* Estilos mapa interactivo*/
/*
body {
  margin: 0;
  padding: 0;
  height: 100vh;
}
#app {
  height: 100%;
}*/
#map {

  /*margin: auto;*/
  /*
  margin-top: 2%;
  margin-left: 2%;
  width: 70%;*/
  height: 400px;
  
}
.dot{
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
}
.bg-orange{
  background-color: orange;
}
.bg-purple{
  background-color: purple;
}
.bg-green{
  background-color: green;
}
.bg-red{
  background-color: red;
}
.bg-blue{
  background-color: blue;
}


/* Estilos Dashboard*/
body {
  font-size: .875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

/*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

.sidebar-sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 48px; /* Height of navbar */
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .form-control {
  padding: .75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}

/*
 * Utilities
 */

.border-top { border-top: 1px solid #e5e5e5; }
.border-bottom { border-bottom: 1px solid #e5e5e5; }

</style>
