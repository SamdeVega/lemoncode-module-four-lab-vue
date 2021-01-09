import Router, { RouteConfig } from "vue-router";
import { LoginPageContainer } from "./pages/login";
import { RecipeListPageContainer } from "./pages/recipe/list";
import { EditRecipePageContainer } from "./pages/recipe/edit";
import { CreateRecipePageContainer } from "./pages/recipe/add";
import { loggedRequest } from "./rest-api/api/user";

export const baseRoutes = {
  root: "/",
  login: "/login",
};

export const privateRoutes = {
  recipe: "/recipe",
  edit: "/recipe/:id",
  add: "/new",
}

export type BaseRoutes = typeof baseRoutes;

const routes: RouteConfig[] = [
  { path: baseRoutes.root, redirect: baseRoutes.login, meta: { public: true } },
  { path: baseRoutes.login, component: LoginPageContainer, meta: { public: true, onlyLoggedOut: true } },
  { path: privateRoutes.recipe, component: RecipeListPageContainer, meta: { public: false } },
  { path: privateRoutes.edit, component: EditRecipePageContainer, props: true, meta: { public: false } },
  { path: privateRoutes.add, component: CreateRecipePageContainer, props: true, meta: { public: false } },
];

export const router = new Router({
  routes,
});

router.beforeEach((to, from, next) => {
  loggedRequest()
  .then(() => {
    !!to.meta.onlyLoggedOut
    ? next('/recipe')
    : next()
  })
  .catch(() => {
    !!to.meta?.public
    ? next()
    : next('/login')
  })
})
