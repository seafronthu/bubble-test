import { CreateElement } from "vue/types/umd";
import { RouteGlobal } from "@/types/route";
let SubMenu: (
  h: CreateElement,
  subMenuInfo: RouteGlobal.ArrageMenuObjINF
) => JSX.Element[] | JSX.Element | undefined = () => void 0;
function hasIcon(h: CreateElement, icon?: string) {
  if (icon) {
    return <a-icon type={icon} />;
  }
  return null;
}
function hasChildren(
  h: CreateElement,
  subMenuInfo: RouteGlobal.ArrageMenuObjINF
) {
  if (subMenuInfo.children) {
    const SubItem = subMenuInfo.children.map(items => {
      if (items.children) {
        return SubMenu(h, items);
      }
      return (
        <a-menu-item key={items.name}>
          {hasIcon(h, items.icon)}
          <span>{items.title}</span>
        </a-menu-item>
      );
    });
    return (
      <a-sub-menu key={subMenuInfo.name}>
        <span slot="title">
          {hasIcon(h, subMenuInfo.icon)}
          <span>{subMenuInfo.title}</span>
        </span>
        {SubItem}
      </a-sub-menu>
    );
  }
  return (
    <a-menu-item key={subMenuInfo.name}>
      {hasIcon(h, subMenuInfo.icon)}
      <span>{subMenuInfo.title}</span>
    </a-menu-item>
  );
}
SubMenu = function(
  h: CreateElement,
  subMenuInfo: RouteGlobal.ArrageMenuObjINF
): JSX.Element[] | JSX.Element {
  return hasChildren(h, subMenuInfo);
};
export default SubMenu;
// @Component
// export default class SubItem extends Vue {
//   functional = true;
//   @Prop({
//     type: Object
//   })
//   subMenuInfo!: SubMenuInfoINF;
//   render(h: CreateElement) {
//     const { subMenuInfo } = this;
//     return (
//       <a-sub-menu key={subMenuInfo.name}>
//         <span slot="title">
//           {subMenuInfo.icon ? <a-icon type={subMenuInfo.icon} /> : null}
//           <span>{subMenuInfo.title}</span>
//         </span>
//         {(subMenuInfo.children as SubMenuInfoINF[]).map(items => {
//           return (
//             <template>
//               {items.children ? (
//                 <SubItem subMenuInfo={items} key={items.name} />
//               ) : (
//                 <a-menu-item key={items.name}>
//                   {items.icon ? <a-icon type={items.icon} /> : null}
//                   <span>{items.title}</span>
//                 </a-menu-item>
//               )}
//             </template>
//           );
//         })}
//       </a-sub-menu>
//     );
//   }
// }
// <a-sub-menu key={subMenuInfo.name}>
// <span slot="title">
//   {subMenuInfo.icon ? <a-icon type={subMenuInfo.icon} /> : null}
//   <span>{subMenuInfo.title}</span>
// </span>
// {(subMenuInfo.children as SubMenuInfoINF[]).map(items => {
//   return (
//     <template>
//       {items.children ? <SubItem subMenuInfo={items} key={items.name} /> : (
//         <a-menu-item key={items.name}>
//           {items.icon ? <a-icon type={items.icon} /> : null}
//           <span>{items.title}</span>
//         </a-menu-item>
//       )}
//     </template>
//   );
// })}
// </a-sub-menu>
