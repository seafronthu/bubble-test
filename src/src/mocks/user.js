import Mock from "mockjs";
const data = {
  headimg:
    "http://thirdwx.qlogo.cn/mmopen/vi_32/WYGqMRaib1ulm9iaWicjB2RS4h26Wibia4RdNItiaoicCNKQabOib57IXHsnn1wLbSH5HJ2XG1O8B7EjGZQg8NCBnCyDQQ/132",
  userName: "胡歌",
  userId: "1"
};
export function getUserInfo() {
  return [
    /\/getUserInfo.*/,
    "get",
    function(options) {
      return {
        code: 1000,
        message: "success",
        data
      };
    }
  ];
}
export function login() {
  return [
    /\/login$/,
    "post",
    function(options) {
      // console.log(option);
      return {
        code: 1000,
        message: "success",
        data: {
          token: "jifudsaf987sa9fd87s9adf7sadf7sd9ag7s9"
        }
      };
    }
  ];
}
