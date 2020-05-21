import Mock from "mockjs";
import { getRoute } from "./app";
import { getUserInfo, login } from "./user";
Mock.mock(...getRoute());
Mock.mock(...getUserInfo());
Mock.mock(...login());
