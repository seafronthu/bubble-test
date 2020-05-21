(function(W) {
  // requestAnimationFrame cancelAnimationFrame 兼容设置
  let lastTime = 0;
  function setRequestAnimation(fn) {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 1000 / 60 - (currTime - lastTime));
    const id = W.setTimeout(function() {
      fn(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  }
  if (!W.requestAnimationFrame) {
    W.requestAnimationFrame =
      W.webkitRequestAnimationFrame ||
      W.mozRequestAnimationFrame ||
      W.msRequestAnimationFrame ||
      W.oRequestAnimationFrame ||
      setRequestAnimation;
  }
  if (!W.cancelAnimationFrame) {
    W.cancelAnimationFrame =
      W.webkitCancelAnimationFrame ||
      W.mozCancelAnimationFrame ||
      W.msCancelAnimationFrame ||
      W.oCancelAnimationFrame;
    W.webkitCancelRequestAnimationFrame ||
      W.mozCancelRequestAnimationFrame ||
      W.msCancelRequestAnimationFrame ||
      W.oCancelRequestAnimationFrame ||
      W.clearTimeout;
  }
})(window, document);
(function(W, D) {
  if (W.HTMLElement) {
    // 使用原型扩展DOM自定义事件
    if (!W.addEventListener || !W.removeEventListener) {
      HTMLElement.prototype.addEventListener = function(type, fn) {
        const el = this;
        el.attachEvent("on" + type, function(e) {
          fn.call(el, e);
        });
      };
      HTMLElement.prototype.removeEventListener = function(type, fn) {
        const el = this;
        el.deattachEvent("on" + type, function(e) {
          fn.call(el, e);
        });
      };
    }
  } else {
    // 如果是不支持HTMLElement扩展的浏览器
    // 通过遍历所有元素扩展DOM事件

    if (!W.addEventListener || !W.removeEventListener) {
      const elAll = D.all;
      const lenAll = elAll.length;
      for (let iAll = 0; iAll < lenAll; iAll += 1) {
        elAll[iAll].addEventListener = function(type, fn) {
          const el = this;
          el.attachEvent("on" + type, function(e) {
            fn.call(el, e);
          });
        };
        elAll[iAll].removeEventListener = function(type, fn) {
          const el = this;
          el.deattachEvent("on" + type, function(e) {
            fn.call(el, e);
          });
        };
      }
    }
  }
})(window, document);
(function(W) {
  if (process.env.NODE_ENV === "production") {
    W.Chart = W.G2.Chart;
  }
})(window, document);
