// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import the vue instance
import Vue from 'vue'
//import the App component
import App from './App'
//import the vue router
import VueRouter from 'vue-router'

//components
import HelloWorld from './components/HelloWorld'
import About from './components/About'
import Param from './components/Param'
import paramdetails from './components/paramdetails'

//tell vue to use the router
Vue.use(VueRouter)
//define your routes
const routes = [
  { path: '/', component: HelloWorld },
  { path: '/about', component: About },
  { path: '/param', component: Param },
  { path: '/Paramdetails/:id', component: paramdetails, name: 'Paramdetails' },
]

// Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history'
})

//route guard
router.beforeEach( (to,from,next) => {
  //check if the path is valid
  if(to.path == '/param'){
    //check if user item is already set
    if(localStorage.getItem('user') == undefined) {
      //prompt for username
      var user = prompt('please enter your username');
      //prompt for password
      var pass = prompt('please enter your password');
      //check if the username and password match our records
      if(user == 'username' && pass == 'password'){
        //set the user item
        localStorage.setItem('user',user);
        //move to the route
        next();
      }
      else {
        alert('Wrong username and password.  You do not have permission to access that route');
        return;
      }
    }
  }

  next();
});

//instantiate the vue instance
new Vue({
//define the selector for the root component
  el: '#app',
  //pass the template to the root component
  template: '<App/>',
  //declare components that the root component can access
  components: { App },
  //pass in the router to the Vue instance
  router
}).$mount('#app')//mount the router on the app
