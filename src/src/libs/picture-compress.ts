// // (function (global, factory) {
// //   typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (window.imageResizeTools = factory())
// // }(this, function () {
// //   'use strict'
// // (function (W, D, U) {
// const methods = {};
// class PictureCompress {
//   fileList?: FileList;
//   url?: string;
//   width?: number;
//   height?: number;
//   type?: string;
//   quality?: number;
//   img!: HTMLImageElement;
//   constructor(
//     props: {
//       fileList?: FileList;
//       url?: string;
//       width?: number;
//       height?: number;
//       type?: string;
//       quality?: number;
//     } = {}
//   ) {
//     const { fileList, url, width, height, type, quality } = props;
//     this.fileList = fileList;
//     this.url = url;
//     this.width = width;
//     this.height = height;
//     this.type = type;
//     this.quality = quality;
//   }
//   /*
//    *通过一个图片的url加载所需要的图片对象
//    */
//   urlToImage(url?: string): Promise<HTMLImageElement> {
//     let img = new Image();
//     let src = url || this.url;
//     if (!src) {
//       throw "当前没有图片地址";
//     }
//     img.src = src;
//     return new Promise((resolve, reject) => {
//       img.onload = function() {
//         resolve(img);
//       };
//       img.onerror = function(e) {
//         reject(e);
//       };
//     });
//   }
//   /*
//    * 将一个Image对象转变为一个Canvas类型对象
//    *
//    */
//   imageToCanvas(img?: HTMLImageElement, position?: number) {
//     let image = img || this.img;
//     if (!image) {
//       throw "没有HTMLImageElement对象";
//     }
//     let cvs: HTMLCanvasElement = document.createElement("canvas");
//     let ctx = cvs.getContext("2d");
//     if (!ctx) {
//       throw "不支持CanvasRenderingContext2D";
//     }
//     const w = image.width;
//     const h = image.height;
//     switch (position) {
//       case 3:
//         cvs.width = w;
//         cvs.height = h;
//         // ctx.fillStyle = '#FFFFFF'
//         // ctx.fillRect(0, 0, w, h)

//         // 清除画布
//         ctx.clearRect(0, 0, -w / 2, -h / 2);
//         ctx.translate(w / 2, h / 2);
//         ctx.rotate((180 * Math.PI) / 180);
//         ctx.drawImage(image, -w / 2, -h / 2);
//         break;
//       case 6:
//         cvs.width = h;
//         cvs.height = w;
//         // ctx.fillStyle = '#FFFFFF'
//         // ctx.fillRect(0, 0, w, h)
//         // 清除画布
//         ctx.clearRect(0, 0, -w / 2, -h / 2);
//         ctx.translate(h / 2, w / 2);
//         ctx.rotate((90 * Math.PI) / 180);
//         ctx.drawImage(image, -w / 2, -h / 2);
//         break;
//       case 8:
//         cvs.width = h;
//         cvs.height = w;
//         // ctx.fillStyle = '#FFFFFF'
//         // ctx.fillRect(0, 0, w, h)
//         // 清除画布
//         ctx.clearRect(0, 0, -w / 2, -h / 2);
//         ctx.translate(h / 2, w / 2);
//         ctx.rotate((270 * Math.PI) / 180);
//         ctx.drawImage(image, -w / 2, -h / 2);
//         break;
//       default:
//         cvs.width = w;
//         cvs.height = h;
//         // ctx.fillStyle = '#FFFFFF'
//         // ctx.fillRect(0, 0, w, h)
//         // 清除画布
//         ctx.clearRect(0, 0, 0, 0);
//         ctx.drawImage(image, 0, 0);
//         break;
//     }
//     return cvs;
//   }
//   /* 将一个Canvas对象压缩转变为一个Blob类型对象
//    * canvas参数传入一个Canvas对象
//    * quality参数传入一个0-1的number类型，表示图片压缩质量
//    * fn为回调方法，包含一个Blob对象的参数
//    */
//   canvasResizetoFile(
//     canvas: HTMLCanvasElement,
//     quality = 1,
//     fn: (file: Blob | string | null) => void,
//     type = "image/jpeg"
//   ) {
//     // 为了兼容旧版本
//     // type = 'image/jpeg' // png居然会变大
//     // quality = 10e-9
//     if (canvas.toBlob) {
//       canvas.toBlob(
//         function(file) {
//           fn(file);
//         },
//         type,
//         quality
//       );
//     } else {
//       fn(canvas.toDataURL(type, quality));
//     }
//   }
//   /* 将一个Canvas对象压缩转变为一个dataURL字符串
//    * canvas参数传入一个Canvas对象
//    * quality参数传入一个0-1的number类型，表示图片压缩质量
//    */
//   canvasResizetoDataURL(canvas: HTMLCanvasElement, quality: number) {
//     return canvas.toDataURL("image/jpeg", quality);
//   }
//   /**
//    * 判断图片方向
//    * @param {Blob} file 图片blob流文件
//    * @param {Function} callback // 回调
//    */
//   imagePosition(
//     file: Blob,
//     type: string,
//     callback: (position: number) => void
//   ) {
//     let reader = new FileReader();
//     let position = -1;
//     reader.onloadend = function(e) {
//       // fn(e.target.result, type)
//       if (!this.result || typeof this.result === "string") {
//         throw "result必须为ArrayBuffer | SharedArrayBuffer";
//       }
//       let view = new DataView(this.result);
//       // let arrayBufferView = new Uint8Array(this.result)
//       // let blob = new Blob([ arrayBufferView ], { type })
//       // let urlCreator = window.URL || window.webkitURL || {}.createObjectURL
//       // let objectURL = urlCreator.createObjectURL(blob);
//       // urlCreator.revokeObjectURL(objectURL) 当图片加载完成之后释放它

//       if (view.getUint16(0, false) !== 0xffd8) {
//         position = -2;
//         return callback(position);
//       }
//       let length = view.byteLength;
//       let offset = 2;
//       while (offset < length) {
//         let marker = view.getUint16(offset, false);
//         offset += 2;
//         if (marker === 0xffe1) {
//           if (view.getUint32((offset += 2), false) !== 0x45786966) {
//             position = -1;
//             return callback(position);
//           }
//           let little = view.getUint16((offset += 6), false) === 0x4949;
//           offset += view.getUint32(offset + 4, little);
//           let tags = view.getUint16(offset, little);
//           offset += 2;
//           for (let i = 0; i < tags; i++) {
//             if (view.getUint16(offset + i * 12, little) === 0x0112) {
//               return callback(view.getUint16(offset + i * 12 + 8, little));
//             }
//           }
//         } else if ((marker & 0xff00) !== 0xff00) break;
//         else offset += view.getUint16(offset, false);
//       }
//       return callback(position);
//     };
//     reader.readAsArrayBuffer(file);
//   }
//   /* 将File（Blob）类型文件转变为dataURL字符串
//    * file参数传入一个File（Blob）类型文件
//    * fn为回调方法，包含一个dataURL字符串的参数
//    */
//   filetoDataURL(
//     file: Blob,
//     fn: (result: string | ArrayBuffer, type: string, position: number) => void
//   ) {
//     let that = this;
//     let reader = new FileReader();
//     let type = file.type;
//     reader.onloadend = function(e) {
//       // e.target.result base64
//       that.imagePosition(file, type, function(position) {
//         if (!e.target || !e.target.result) {
//           throw "当前没有对象";
//         }
//         fn(e.target.result, type, position);
//       });
//     };
//     reader.readAsDataURL(file);
//   }

//   /* 将一串dataURL字符串转变为Image类型文件
//    * dataurl参数传入一个dataURL字符串
//    * fn为回调方法，包含一个Image类型文件的参数
//    */
//   dataURLtoImage(dataurl: string, fn: (img: HTMLImageElement) => void) {
//     let img = new Image();
//     img.onload = function() {
//       fn(img);
//     };
//     img.src = dataurl;
//   }

//   /* 将一串dataURL字符串转变为Blob类型对象
//    * dataurl参数传入一个dataURL字符串
//    */
//   dataURLtoFile(dataurl: string) {
//     let arr: string[] = dataurl.split(",");
//     let mat = arr[0].match(/:(.*?);/);
//     if (!mat) {
//       throw "无法匹配";
//     }
//     let mime = mat[1];
//     let bstr = atob(arr[1]);
//     let n = bstr.length;
//     let u8arr = new Uint8Array(n);
//     while (n--) {
//       u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new Blob([u8arr], {
//       type: mime
//     });
//   }

//   // 缩小图片进行图片压缩
//   canvasImageResize(
//     img: HTMLImageElement,
//     width: number,
//     height: number,
//     position: number
//   ) {
//     // 缩放图片需要的canvas
//     let canvas = document.createElement("canvas");
//     let context = canvas.getContext("2d");
//     if (!context) {
//       throw "当前浏览器不支持context";
//     }
//     // 图片原始尺寸
//     let originWidth = img.width;
//     let originHeight = img.height;
//     // 最大尺寸限制
//     let maxWidth = width;
//     let maxHeight = height;
//     // 目标尺寸
//     let targetWidth = originWidth;
//     let targetHeight = originHeight;
//     // 图片尺寸超过400x400的限制
//     if (originWidth > maxWidth || originHeight > maxHeight) {
//       if (originWidth / originHeight > maxWidth / maxHeight) {
//         // 更宽，按照宽度限定尺寸
//         targetWidth = maxWidth;
//         targetHeight = Math.round(maxWidth * (originHeight / originWidth));
//       } else {
//         targetHeight = maxHeight;
//         targetWidth = Math.round(maxHeight * (originWidth / originHeight));
//       }
//     }

//     // canvas对图片进行缩放
//     // canvas.width = targetWidth
//     // canvas.height = targetHeight
//     // polyfill 提供了这个方法用来获取设备的 pixel ratio
//     // let getPixelRatio = function (ctx) {
//     //   let backingStore = ctx.backingStorePixelRatio ||
//     //         ctx.webkitBackingStorePixelRatio ||
//     //         ctx.mozBackingStorePixelRatio ||
//     //         ctx.msBackingStorePixelRatio ||
//     //         ctx.oBackingStorePixelRatio ||
//     //         ctx.backingStorePixelRatio || 1
//     //   return (window.devicePixelRatio || 1) / backingStore
//     // }
//     // let ratio = getPixelRatio(cxt)
//     // cs2.width = targetWidth
//     // cs2.height = targetHeight
//     // console.log(ratio, 'ratio')
//     // cxt.drawImage(img, 0, 0, targetWidth, targetHeight)
//     // cxt.scale('50%', '50%')
//     // cs2.style.width = targetWidth + 'px'
//     // cs2.style.height = targetHeight + 'px'
//     // let img2 = document.createElement('img')
//     // img2.src = cs2.toDataURL()
//     // document.body.appendChild(img2)
//     // document.body.appendChild(img)
//     // 清除画布
//     if (position === 6 || position === 8) {
//       canvas.width = targetHeight;
//       canvas.height = targetWidth;
//       context.clearRect(0, 0, targetHeight, targetWidth);
//     } else {
//       canvas.width = targetWidth;
//       canvas.height = targetHeight;
//       context.clearRect(0, 0, targetWidth, targetHeight);
//     }
//     // context.clearRect(0, 0, targetWidth, targetHeight)
//     // 图片压缩
//     switch (position) {
//       case 3: // 180度
//         context.translate(targetWidth, targetHeight);
//         context.rotate((180 * Math.PI) / 180);
//         context.drawImage(img, 0, 0, targetWidth, targetHeight);
//         break;
//       case 6: // 顺时针90度
//         context.translate(targetHeight, 0);
//         context.rotate((90 * Math.PI) / 180);
//         context.drawImage(img, 0, 0, targetWidth, targetHeight);
//         break;
//       case 8: // 逆时针90度
//         context.translate(0, targetWidth);
//         context.rotate((-90 * Math.PI) / 180);
//         context.drawImage(img, 0, 0, targetWidth, targetHeight);
//         break;
//       default:
//         context.drawImage(img, 0, 0, targetWidth, targetHeight);
//         break;
//     }
//     return canvas;
//   }
// }
// /** *以下是进一步封装***/

// /* 将File（Blob）类型文件压缩后再返回Blob类型对象
//  * file参数传入一个File（Blob）类型文件
//  * quality参数传入一个0-1的number类型，表示图片压缩质量
//  * fn为回调方法，包含一个Blob类型文件的参数
//  * 使用示例：
//  * var file = document.getElementById('demo').files[0];
//  * imageResizeTool.fileResizetoFile(file,0.6,function(res){
//  *     console.log(res);
//  *     //做出你要上传的操作；
//  * })
//  */
// // methods.fileResizetoFile = function(file, fn, quality, width, height) {
// //   methods.filetoDataURL(file, function(dataurl, type, position) {
// //     methods.dataURLtoImage(dataurl, function(image) {
// //       if (width && height) {
// //         methods.canvasResizetoFile(
// //           methods.canvasImageResize(image, width, height, position),
// //           quality,
// //           fn,
// //           type
// //         );
// //       } else {
// //         methods.canvasResizetoFile(
// //           methods.imagetoCanvas(image, position),
// //           quality,
// //           fn,
// //           type
// //         );
// //       }
// //     });
// //   });
// // };
// export default PictureCompress;
// // W.imageResizeTool = methods
// // }))
// // }(window, document, undefined))
