// 定义每一个路由文件的接口
import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { Component } from 'vue';

// 路由记录
// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string;
  meta?: RouteMeta;
  component?: Component | string;
  components?: Component;
  children?: AppRouteRecordRaw[];
  // prop?: string;
  fillPath?: string;
}

export type AppRouteModule = AppRouteRecordRaw;