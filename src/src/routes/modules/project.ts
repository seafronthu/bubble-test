const ProjectList = {
  path: "project-list",
  name: "ProjectList",
  component: () =>
    import(/* webpackChunkName: "ProjectList" */ "@views/project/project-list")
};
export default {
  ProjectList
};
