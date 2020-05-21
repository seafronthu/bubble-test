const Home = {
  path: "home",
  name: "Home",
  component: () =>
    import(/* webpackChunkName: "Home" */ "@views/home/home.vue"),
  meta: {
    notClosed: true,
    title: "首页",
    icon: "el-icon-location",
    showInitialTab: true
  }
};
const About = {
  path: "about",
  name: "About",
  meta: {
    title: "关于",
    icon: "el-icon-location"
  },
  component: () =>
    import(/* webpackChunkName: "About" */ "@views/about/about.vue")
};
const Concat = {
  path: "concat",
  name: "Concat",
  component: () =>
    import(/* webpackChunkName: "Concat" */ "@views/concat/concat.vue")
};
const Introduce = {
  path: "introduce",
  name: "Introduce",
  component: () =>
    import(/* webpackChunkName: "Introduce" */ "@views/introduce/introduce.vue")
};
const Other = {
  path: "other",
  name: "Other",
  component: () =>
    import(/* webpackChunkName: "Other" */ "@views/other/other.vue")
};
// const Setting = {
//   path: "setting",
//   name: "Setting",
//   component: () =>
//     import(/* webpackChunkName: "Setting" */ "@views/setting/setting.vue")
// };
export default { Home, About, Concat, Introduce, Other };
