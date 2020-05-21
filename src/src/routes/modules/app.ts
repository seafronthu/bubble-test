const ErrorLog = {
  path: "error-log",
  name: "ErrorLog",
  component: () =>
    import(/* webpackChunkName: "ErrorLog" */ "@views/log/error-log.vue"),
  meta: {
    // title: "错误日志",
    hideMenu: true,
    showNav: true,
    notCache: true
  }
};
const MessageCenter = {
  path: "message-center",
  name: "MessageCenter",
  component: () =>
    import(
      /* webpackChunkName: "MessageCenter" */ "@views/message-center/message-center.tsx"
    ),
  meta: {
    // title: "错误日志",
    hideMenu: true,
    showNav: true,
    notCache: true
  }
};
export default {
  ErrorLog,
  MessageCenter
};
