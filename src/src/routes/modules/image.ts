const ImageList = {
  path: "image-list",
  name: "ImageList",
  component: () =>
    import(/* webpackChunkName: "ImageList" */ "@views/image/image-list")
};
export default {
  ImageList
};
