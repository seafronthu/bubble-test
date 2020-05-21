import enquireJs from "enquire.js";
// const DEVICE_TYPE = {
// XS: "screen and (max-width: 575.999px)", // 手机
// SM: "screen and (min-width: 576px) and (max-width: 767.999px)", // 平板
// MD: "screen and (min-width: 768px) and (max-width: 991.999px)", // 笔记本
// LG: "screen and (min-width: 920px) and (max-width: 1199.999px)", // 笔记本
// XL: "screen and (min-width: 1200px) and (max-width: 1599.999px)", // 笔记本
// XXL: "screen and (min-width: 1200px)" // 台式
// };
enum DeviceDirection {
  XS = "screen and (max-width: 576px)", // 手机
  SM = "screen and (min-width: 576.001px) and (max-width: 768px)", // 平板
  MD = "screen and (min-width: 768.001px) and (max-width: 992px)", // 笔记本
  LG = "screen and (min-width: 992.001px) and (max-width: 1200px)", // 笔记本
  XL = "screen and (min-width: 1200.001px) and (max-width: 1600px)", // 笔记本
  XXL = "screen and (min-width: 1600.0001px)" // 台式
}
enum DeviceNumber {
  "screen and (max-width: 576px)" = 576,
  "screen and (min-width: 576.001px) and (max-width: 768px)" = 768,
  "screen and (min-width: 768.001px) and (max-width: 992px)" = 992,
  "screen and (min-width: 992.001px) and (max-width: 1200px)" = 1200,
  "screen and (min-width: 1200.001px) and (max-width: 1600px)" = 1600,
  "screen and (min-width: 1600.0001px)" = 1600.001
}
type DeviceType = "XS" | "SM" | "MD" | "LG" | "XL" | "XXL";
const deviceEnquire = function(
  callback: ({
    deviceType,
    deviceValue,
    deviceNumber
  }: {
    deviceType: DeviceType;
    deviceValue: DeviceDirection;
    deviceNumber: DeviceNumber;
  }) => void
) {
  const matchXS = {
    match: () => {
      callback &&
        callback({
          deviceType: "XS",
          deviceValue: DeviceDirection.XS,
          deviceNumber: DeviceNumber[DeviceDirection.XS]
        });
    }
  };

  const matchSM = {
    match: () => {
      callback &&
        callback({
          deviceType: "SM",
          deviceValue: DeviceDirection.SM,
          deviceNumber: DeviceNumber[DeviceDirection.SM]
        });
    }
  };
  const matchMD = {
    match: () => {
      callback &&
        callback({
          deviceType: "MD",
          deviceValue: DeviceDirection.MD,
          deviceNumber: DeviceNumber[DeviceDirection.MD]
        });
    }
  };

  const matchLG = {
    match: () => {
      callback &&
        callback({
          deviceType: "LG",
          deviceValue: DeviceDirection.LG,
          deviceNumber: DeviceNumber[DeviceDirection.LG]
        });
    }
  };
  const matchXL = {
    match: () => {
      callback &&
        callback({
          deviceType: "XL",
          deviceValue: DeviceDirection.XL,
          deviceNumber: DeviceNumber[DeviceDirection.XL]
        });
    }
  };
  const matchXXL = {
    match: () => {
      callback &&
        callback({
          deviceType: "XXL",
          deviceValue: DeviceDirection.XXL,
          deviceNumber: DeviceNumber[DeviceDirection.XXL]
        });
    }
  };
  // screen and (max-width: 1087.99px)
  enquireJs
    .register(DeviceDirection.XS, matchXS)
    .register(DeviceDirection.SM, matchSM)
    .register(DeviceDirection.MD, matchMD)
    .register(DeviceDirection.LG, matchLG)
    .register(DeviceDirection.XL, matchXL)
    .register(DeviceDirection.XXL, matchXXL);
};
export { DeviceDirection, DeviceType, deviceEnquire, DeviceNumber };
