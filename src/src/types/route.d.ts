import { RouteConfig, RedirectOption, Route } from "vue-router";

// import { VueConstructor } from "vue";
export declare namespace RouteGlobal {
  type RouteType = "MENU" | "TAB" | "BUTTON" | "PAGE" | "MODE";
  type KeyValuePair<T> = {
    [key: string]: T;
  };
  interface TypeOjbINF {
    [key: string]: BackAuthObjINF;
  }
  /**初始meta */
  interface InitialMetaINF {
    id?: number;
    parentId?: number;
    query?: KeyValuePair<string | (string | null)[]>;
    params?: KeyValuePair<string | (string | null)[]>;
    matched?: matchINF[]; // 当前父子级match路径
    title?: string; // 标题
    icon?: string; // 图标
    href?: string; // 跳转到其它网站
    description?: string; // 描述
    redirect?: RedirectOption; // 重定向
    type?: RouteType; // 权限类型 'MENU','TAB','BUTTON','PAGE', 'MODE'
    keywords?: string; // 关键字用来搜索路由
    genre?: string; // 类型页面还是操作等等(目前没用) 'OTHER','LIST','DETAIL','INSERT','DELETE','UPDATE','EXPORT','IMPORT'
    /**
     * @description 默认可以关闭
     */
    notClosed?: boolean;
    hideBreadcrumb?: boolean; // 面包屑
    /**
     * @description 默认缓存
     */
    notCache?: boolean; // 是否放在缓存即keep-alive
    /**
     * @description 默认只打开一个标签（本项目暂时不开放同一组件打开多个标签页， 即属性不要去设置）
     */
    // notSingleTab?: boolean; // 同时是否只能打开一个标签页
    /**
     * @description 默认显示tab标签
     */
    hideTab?: boolean;
    /**
     * @description 默认展示菜单栏
     */
    hideMenu?: boolean;
    /**
     * @description 默认初次加载不展示tab标签
     */
    showInitialTab?: boolean;
    /**
     * @description 默认不展示nav
     */
    showNav?: boolean;
    /**
     * @description 关闭回调方法
     */
    beforeClosedCallback?: () => void;
    breadcrumb?: BreadcrumbINF[]; // 面包屑
    TAB?: TypeOjbINF;
    BUTTON?: TypeOjbINF;
    MODE?: TypeOjbINF;
  }
  /**后台配置 */
  interface BackAuthObjINF extends InitialMetaINF {
    id: number; // 当前路由id
    title: string;
    // genre: string;
    type: RouteType;
    path: string; // 当前路径（不用加上级路径，如/a/b: 实际为填b即可，上级会根据parentId动态匹配）
    component: string; // 组件的名字（用来索引页面名字，唯一且永远不能更改，整个项目跳转都会使用它）
    parentId: number; // 父级路由id
  }
  // 路由meta
  interface RoutesMetaINF extends InitialMetaINF {}
  // 父子级路由
  interface matchINF {
    path: string;
    name: string;
    redirect?: RedirectOption;
    meta: ArrageAuthRoutesMetaINF;
  }
  // 前后台路由整理后的路由meta
  interface ArrageAuthRoutesMetaINF extends BackAuthObjINF {
    id: number; // 当前路由id
    title: string;
    // genre: string;
    type: RouteType;
    path: string; // 当前路径（不用加上级路径，如/a/b: 实际为填b即可，上级会根据parentId动态匹配）
    component: string; // 组件的名字（用来索引页面名字，唯一且永远不能更改，整个项目跳转都会使用它）
    parentId: number; // 父级路由id
  }
  // 前台路由
  interface FrontStageRoutesObjINF {
    path: string;
    name: string;
    redirect?: string;
    alias?: string;
    component: () => Promise<any>; //Promise<typeof import("*.vue")>;
    meta?: InitialMetaINF;
    children?: FrontStageRoutesObjINF[];
  }
  interface ArrageAuthRoutesINF extends FrontStageRoutesObjINF {
    meta: ArrageAuthRoutesMetaINF;
  }
  // 面包屑
  interface BreadcrumbINF {
    name: string; // 用来判断是否可以跳转
    type: "MENU" | "PAGE";
    path: string;
    icon?: string;
    id: number;
    parentId: number;
    title: string;
  }
  // 整理后的菜单
  interface ArrageMenuObjINF {
    name: string;
    query?: KeyValuePair<string | (string | null)[]>;
    params?: KeyValuePair<string | (string | null)[]>;
    icon?: string;
    href?: string;
    type: "MENU" | "PAGE";
    title?: string;
    open?: boolean;
    redirect?: RedirectOption;
    children?: ArrageMenuObjINF[];
  }
  // 标签页
  interface TabObjINF {
    name: string;
    key: string;
    query?: KeyValuePair<string | (string | null)[]>;
    params?: KeyValuePair<string | (string | null)[]>;
    redirect?: RedirectOption;
    title: string;
    beforeClosedCallback?: (opts: TabObjINF) => void; // notClosed为true不执行
    notClosed?: boolean;
    checked?: boolean;
    hideTab?: boolean;
    notCache?: boolean;
    // notSingleTab?: boolean;
    createTime: number;
    modified?: boolean;
  }
  interface RouteINF extends Route {
    name: string;
  }
}
