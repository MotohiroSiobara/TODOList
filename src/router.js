import Vue from 'vue';
import Router from 'vue-router';
import ToDoIndex from "./views/ToDoIndex";
import ToDoCreate from "./views/ToDoCreate";
import ToDoShow from "./views/ToDoShow";
import ToDoEdit from "./views/ToDoEdit";
import ToDoDoneLists from "./views/ToDoDoneLists";

Vue.use(Router);

export default new Router({
   mode: 'history',
   routes: [
      {
         path: '/',
         component: ToDoIndex
      },
      {
         path: '/create',
         component: ToDoCreate
      },
      {
         path: '/list/:id',
         component: ToDoShow
      },
      {
         path: '/edit/:id',
         component: ToDoEdit
      },
      {
         path: '/lists/done',
         component: ToDoDoneLists
      }

   ],
});