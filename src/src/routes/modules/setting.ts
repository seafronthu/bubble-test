const PersonalCenter = {
  path: "personal-center",
  name: "PersonalCenter",
  component: () =>
    import(
      /* webpackChunkName: "PersonalCenter" */ "@views/setting/account-management/personal-center.vue"
    )
};
const UserList = {
  path: "user-list",
  name: "UserList",
  component: () =>
    import(
      /* webpackChunkName: "UserList" */ "@views/setting/account-management/user-list.vue"
    )
};
export default {
  PersonalCenter,
  UserList
};
