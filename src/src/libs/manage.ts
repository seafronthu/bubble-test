import { arrageArrToObj } from "./utils";
import { judgementTypeTool } from "./tools";
import { RouteGlobal } from "@/types/route";
// import { RouteGlobal } from "@/types/route";

/**
 * 把类似驼峰的MyUserInfo 转换成 my-user-info 和 my_user_info
 * @param {string} name 传入的名字
 * @return {JSON} 全部转成小写并且在原先大写字母前加-和_（除了首字母）
 */
// function componentNameConversion (name) {
//   const firstLetter = name.slice(0, 1).toLocaleLowerCase()
//   const word = name.slice(1)
//   return {
//     '-': firstLetter + word.replace(/[A-Z]+/g, letter => `-${letter.toLocaleLowerCase()}`),
//     '_': firstLetter + word.replace(/[A-Z]+/g, letter => `_${letter.toLocaleLowerCase()}`)
//   }
// }
/**
 * 合并路由
 * @param {{backstageRoutes:Array, frontstageRoutes: JSON}} {backstageRoutes 后台路由, frontstageRoutes 前台路由}
 * @returns {JSON} 返回合并的路由数据
 */
function backFrontRoutesConcat(options: {
  backstageRoutes: RouteGlobal.BackAuthObjINF[];
  frontstageRoutes: { [key: string]: RouteGlobal.FrontStageRoutesObjINF };
}): RouteGlobal.ArrageAuthRoutesINF[] {
  const { backstageRoutes, frontstageRoutes } = options;
  const arr: RouteGlobal.ArrageAuthRoutesINF[] = [];
  const objRoute: {
    [key: number]: RouteGlobal.BackAuthObjINF[];
  } = arrageArrToObj(backstageRoutes); // 以parentId为键名的JSON对象
  backstageRoutes.forEach(items => {
    if (
      items.type === "MENU" ||
      items.type === "PAGE" ||
      items.type === "TAB"
    ) {
      // 合并前后端路由
      let route = frontstageRoutes[items.component];
      if (items.type === "PAGE" && !route) {
        return;
      }
      route = route || {};
      const meta = route.meta ? { ...route.meta, ...items } : { ...items };
      const routeObj: RouteGlobal.ArrageAuthRoutesINF = {
        name: items.component,
        path: items.path || route.path,
        meta: {
          // id: items.id,
          // parentId: items.parentId,
          // title: items.title,
          // description: items.description, // 描述用来搜索路由
          // // href: items.href, // 跳转到其它网站
          // // keywords: items.keywords, // 关键字用来搜索路由
          // type: items.type, // 路由类型 menu菜单（一般父级路由） page页面 tab button按钮
          // genre: items.genre, // 其他other  list列表 detail详情 按钮类型 insert增 delete删 update改 export导出 import导入
          // tag: items.tag, // 是否软删除
          // jurisdiction: items.jurisdiction, // 权限
          ...meta
        },
        component: route.component
      };
      // 每个路由塞进按钮权限
      if (objRoute[items.id]) {
        const childRouteArr = objRoute[items.id].filter(
          v => v.type === "BUTTON" || v.type === "TAB" || v.type === "MODE"
        );
        const len = childRouteArr.length;
        const l = len;
        let cur = 0;
        while (cur < l) {
          const childRoute = childRouteArr[cur];
          const type = childRoute.type;
          const name = childRoute.component;
          // const id = childRoute.id;
          if (type === "TAB" || type === "BUTTON" || type === "MODE") {
            const tab = routeObj.meta[type];
            if (judgementTypeTool(tab, "object")) {
              (routeObj.meta[type] as RouteGlobal.TypeOjbINF)[
                name
              ] = childRoute;
            } else {
              routeObj.meta[type] = {
                [name]: childRoute
              };
            }
          }
          // if (objRoute[id]) {
          //   objRoute[id].forEach(v => {
          //     if (v.type === "BUTTON" || v.type === "TAB") {
          //       ++l;
          //     }
          //   });
          // }
          ++cur;
        }
      }
      arr.push(routeObj);
    }
  });
  return arr;
}
/**
 * 合并整理后端权限与前端路由
 * @param {{backstageRoutes:Array, frontstageRoutes: JSON}} {backstageRoutes 后台路由, frontstageRoutes 前台路由}
 * @returns {JSON} 返回合并的路由数据
 */
function arrageAfterRoutesConcat(options: {
  backstageRoutes: RouteGlobal.BackAuthObjINF[];
  frontstageRoutes: { [key: string]: RouteGlobal.FrontStageRoutesObjINF };
  parentId: number;
}): RouteGlobal.ArrageAuthRoutesINF[] {
  const { backstageRoutes, frontstageRoutes } = options;
  const routeConcatArr = backFrontRoutesConcat({
    backstageRoutes,
    frontstageRoutes
  });
  const tempArr = routeConcatArr.map(v => ({ ...v })); // 浅拷贝数据 防止叠加path
  return routeConcatArr.map(v => {
    // 当前路由级
    const matcheds: RouteGlobal.matchINF[] = [
      {
        name: v.name,
        redirect: v.redirect,
        path: v.path,
        meta: v.meta
      }
    ];
    const copyTempArr = tempArr.map(v => ({ ...v })); // 再浅拷贝数据 防止操作copyTempArr影响每次循环没有还原数据
    let i = 0;
    const j = 0; // breadcrumb
    while (i < copyTempArr.length) {
      const item = copyTempArr[i];
      if (matcheds[j].meta.parentId === item.meta.id) {
        // (!item.meta || !item.meta.hideBreadcrumb)
        const { path, name, meta } = item;
        const matchedsObj: RouteGlobal.matchINF = {
          path,
          name,
          meta
        };
        matcheds.unshift(matchedsObj);
        copyTempArr.splice(i, 1);
        i = 0; // 新添加的matchedsObj的parentId从0开始的id
        continue;
      }
      i++;
    }
    v.meta.matched = matcheds;
    v.path = `/${matcheds.map(v => v.path).join("/")}`;
    v.meta.breadcrumb = matcheds
      .filter(v => !v.meta.hideBreadcrumb)
      .map(v => {
        return {
          name: v.name, // breadcrumb是否可以跳转
          type: v.meta.type as "MENU" | "PAGE",
          path: v.path,
          icon: v.meta.icon,
          id: v.meta.id,
          parentId: v.meta.parentId,
          title: v.meta.title
        };
      });
    return v;
  });
}
/**
 * 整理成树状menu
 * @param {{frontstageRoutes: Array, menuArrangement: JSON, parentId: Number}} {frontstageRoutes: 前端路由, menuArrangement: 整理后的后端路由, parentId: 父级id}
 * @returns {JSON[]}
 */
function arrageMenuTree({
  frontstageRoutes,
  menuArrangement,
  parentId = 0
}: {
  frontstageRoutes: { [key: string]: RouteGlobal.FrontStageRoutesObjINF };
  menuArrangement: { [key: number]: RouteGlobal.BackAuthObjINF[] };
  parentId: number;
}): RouteGlobal.ArrageMenuObjINF[] {
  const arr = menuArrangement[parentId];
  const parentArr: RouteGlobal.ArrageMenuObjINF[] = [];
  arr.forEach(items => {
    // 合并菜单
    if (items.type === "MENU" || items.type === "PAGE") {
      // const routeObj = routers[items.component] ? routers[items.component] : { // 父级路由
      //   name: items.component,
      //   path: componentNameConversion(items.component)['-'],
      //   redirect: null,
      //   meta: {}
      // }
      // parentRoute.meta.detail = true
      let routeObj = frontstageRoutes[items.component];
      //! 是页面且前台路由不存在则返回
      if (items.type === "PAGE" && !routeObj) {
        return;
      }
      routeObj = routeObj || {};
      const meta = routeObj.meta
        ? { ...routeObj.meta, ...items }
        : { ...items };
      if (!meta.hideMenu) {
        const id = items.id;
        const menu: RouteGlobal.ArrageMenuObjINF = {
          name: routeObj.name || meta.component, // 整个项目用name跳转路由而不是path因为path是可变的，如果路由的父级改变，path会重写
          query: meta.query,
          type: items.type, //  不用meta.type 是应为它是和前台路由的meta合并导致type不确定性
          params: meta.params,
          icon: meta.icon,
          href: meta.href,
          title: items.title || (meta && meta.title) || "",
          redirect: (meta && meta.redirect) || ""
        };
        if (items.type === "MENU") {
          let children: RouteGlobal.ArrageMenuObjINF[] = [];
          if (menuArrangement[id]) {
            children = arrageMenuTree({
              menuArrangement,
              frontstageRoutes,
              parentId: id
            });
          }
          // if (children.length > 0) {
          menu.children = children;
          // }
        }
        parentArr.push(menu);
      }
    }
  });
  return parentArr;
}

/**
 * 整理路由(把 TAB和 MENU去掉 只有PAGE)
 * @param {{backstageRoutes:Array, frontstageRoutes: JSON}} {backstageRoutes 后台路由, frontstageRoutes 前台路由}
 * @returns {JSON} 返回合并的路由数据
 */
function arrageRoutes(options: {
  backstageRoutes: RouteGlobal.BackAuthObjINF[];
  frontstageRoutes: { [key: string]: RouteGlobal.FrontStageRoutesObjINF };
  parentId: number;
}): RouteGlobal.ArrageAuthRoutesINF[] {
  const frontBackRoutes = arrageAfterRoutesConcat(options);
  return frontBackRoutes.filter(v => {
    // 过滤非page路由的
    return v.meta.type === "PAGE";
  });
}
function arrageMenu({
  backstageRoutes,
  frontstageRoutes,
  parentId = 0
}: {
  backstageRoutes: RouteGlobal.BackAuthObjINF[];
  frontstageRoutes: { [key: string]: RouteGlobal.FrontStageRoutesObjINF };
  parentId?: number;
}): RouteGlobal.ArrageMenuObjINF[] {
  return arrageMenuTree({
    frontstageRoutes,
    menuArrangement: arrageArrToObj(backstageRoutes),
    parentId
  });
}
export { arrageRoutes, arrageMenu };
