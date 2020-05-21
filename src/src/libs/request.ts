import { userModule } from "@stores/index";
import axios, { ResponseType, AxiosRequestConfig, AxiosResponse } from "axios";
import route from "@/routes";
import config from "@/config";
import { message } from "ant-design-vue";
const { initialPageName } = config;
import qs from "qs";
import { appModule } from "@stores/index";
interface MapT {
  [key: string]: string;
}
type MethodTYPE =
  | "options"
  | "get"
  | "head"
  | "post"
  | "put"
  | "delete"
  | "trace"
  | "connect";
interface DataINF {
  [key: string]:
    | MapT
    | string
    | ArrayBuffer
    | Array<number>
    | string[]
    | MapT[]
    | undefined;
}
interface ResINF {
  code: number;
  data?: any;
  message: string;
}
interface ApiDataObjINF {
  url?: string;
  baseURL?: string;
  data?: object;
  headers?: MapT;
  timeout?: number;
  responseType?: ResponseType;
  notLogin?: boolean;
}
interface ApiObjINF extends ApiDataObjINF {
  url: string;
}
interface ReqObjINF {
  url: string;
  data?: object;
  headers: MapT;
  baseURL?: string;
  method: MethodTYPE;
  responseType: ResponseType;
  notLogin?: boolean;
  timeout?: number;
}
interface OptionsObjINF {
  method: MethodTYPE;
  baseURL?: string;
  url: string;
  responseType: string;
  headers: MapT;
  data: any;
  timeout?: number;
}
interface AxiosConfigObjINF {
  method?: MethodTYPE;
  baseURL?: string;
  url: string;
  headers: MapT;
  responseType?: string;
  data?: any;
  params?: any;
  timeout?: number;
  withCredentials?: boolean;
}
interface ErrorInfoINF {
  message: string;
  name: string;
  config: AxiosRequestConfig;
  response: AxiosResponse;
}
// 需求： 1、请求插件 2、接口出错收集
function addErrorLog(info: ErrorInfoINF) {
  const {
    message,
    name,
    config: { url, baseURL, headers, params, data, method },
    response: { status, statusText }
  } = info;
  const errData = {
    type: "ajax",
    message,
    name,
    href: window.location.href,
    status,
    statusText,
    url,
    baseURL,
    headers: JSON.stringify(headers),
    params,
    data,
    method
  };
  // 判断是否是发送报错日志的接口 防止进入死循环
  // if (!responseURL.includes(APP_API_NAME.SAVE_ERROR_LOG))
  appModule.APP_ADDERRORLOG_ACTION(errData);
}
const LOGOUT_CODE = [4001, 4002, 4003, 4004, 4005, 4006, 4007];
// 请求时处理
axios.interceptors.request.use(
  request => {
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);
// 返回结束处理
axios.interceptors.response.use(
  response => {
    // 返回值处理 如果已经登出那么
    const status = response.status;
    const data: ResINF = response.data;
    const code = data.code;
    switch (status) {
      case 1000:
        // 未登录
        if (LOGOUT_CODE.includes(code)) {
          message.warning(data.message);
          route.push(initialPageName);
        }
        return response;
      default:
        // doSomething 收集信息
        return response;
    }
  },
  error => {
    addErrorLog(error);
    return Promise.resolve({ data: { message: error, code: -400 } });
  }
);
class HttpRequest {
  public baseUrl: string;
  public constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  public getInitConfig() {
    const config = {
      withCredentials: false, // 允许携带cookie
      timeout: 10000
    };
    return config;
  }
  public getApiUrl(options: OptionsObjINF): OptionsObjINF {
    let baseURL = options.baseURL;
    const url = options.url;
    if (!baseURL && !~url.indexOf("/")) {
      baseURL = this.baseUrl;
    }
    options.baseURL = baseURL;
    return options;
  }
  public arrageConfig(options: OptionsObjINF): AxiosConfigObjINF {
    options = this.getApiUrl(options);
    const method = options.method;
    const baseURL = options.baseURL;
    const url = options.url;
    const headers = options.headers || {};
    let data = options.data || {};
    // if (!options.notLogin) {

    headers.token = userModule.token;
    // data.token = store.state.user.token
    // }
    const config: AxiosConfigObjINF = {
      method,
      baseURL,
      url,
      headers
    };
    if (options.timeout) {
      config.timeout = options.timeout;
    }
    if (method === "get") {
      config.params = data;
    } else {
      data =
        headers["Content-Type"] === "application/x-www-form-urlencoded"
          ? qs.stringify(data)
          : data;
      config.data = data;
    }
    return config;
  }
  public getRequestOptions(
    option: ApiObjINF | string,
    data: object | undefined,
    other: {
      method: MethodTYPE;
      headers: object;
    }
  ): ReqObjINF {
    let baseURL: string | undefined;
    let url: string;
    let timeout: number | undefined;
    let responseType: ResponseType = "json";
    let headers: MapT = { ...other.headers };
    let notLogin = false;
    if (typeof option === "string") {
      url = option;
    } else {
      baseURL = option.baseURL;
      timeout = option.timeout;
      url = option.url;
      responseType = option.responseType || responseType;
      headers = option.headers ? { ...headers, ...option.headers } : headers;
      // eslint-disable-next-line no-param-reassign
      data = option.data;
      notLogin = option.notLogin || notLogin;
    }
    const options: ReqObjINF = {
      url,
      notLogin,
      data,
      method: other.method,
      baseURL,
      timeout,
      responseType,
      headers
    };
    return options;
  }
  public async request(options: ReqObjINF): Promise<ResINF> {
    const {
      url,
      data,
      headers,
      method,
      baseURL,
      responseType,
      timeout,
      notLogin
    } = options;
    // if (!notLogin && )
    // if (!notLogin && !userModule.token) {
    //   // 需要登录且没有token
    //   return { code: 4008, message: "未登录" };
    // }
    const config = Object.assign(
      this.getInitConfig(),
      this.arrageConfig({
        baseURL,
        url,
        data,
        headers,
        method,
        timeout,
        responseType
      })
    );
    const res = await axios(config);
    const resData: ResINF = res.data;
    return resData;
  }
  public async postData(option: ApiObjINF | string, data?: object) {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept-Language": "charset=utf-8"
    };
    const options = this.getRequestOptions(option, data, {
      headers,
      method: "post"
    });
    return this.request(options);
  }
  public postJson(option: ApiObjINF | string, data?: object) {
    const headers = {
      "Content-Type": "application/json",
      "Accept-Language": "charset=utf-8"
    };
    const options = this.getRequestOptions(option, data, {
      headers,
      method: "post"
    });
    return this.request(options);
  }
  public async getQuery(option: ApiObjINF | string, data?: object) {
    const headers = {
      "Accept-Language": "charset=utf-8"
    };
    const options = this.getRequestOptions(option, data, {
      headers,
      method: "get"
    });
    return this.request(options);
  }
  public async postForm() {}
}
export default HttpRequest;
