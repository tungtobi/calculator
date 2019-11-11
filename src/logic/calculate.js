import operate from "./operate";
import isDigit from "./isDigit";

export default function calculate(obj, btnName) {
  if (btnName === "AC") {
    return {
      result: null,
      prev: null,
      next: null,
      operator: null,
      expr: []
    };
  }

  console.log(obj);


  if (btnName === "DEL") {
    if (obj.next) {
      let length = obj.next.length;
      if (length > 0) {
        return {
          next: obj.next.substring(0, length - 1),
        }
      }
    }
    return {};
  }

  if (isDigit(btnName)) {
    if (btnName === "0" && obj.next === "0")
      return {};
    
    if (obj.operator) {
      if (obj.next)
        return { next: obj.next + btnName };
      
      return { next: btnName };
    }

    if (obj.next) {
      const next = obj.next === "0" ? btnName : obj.next + btnName;
      return {
        next,
        result: null,
        prev: null,
      };
    }
    return {
      next: btnName,
      result: null,
      prev: null,
      expr: []
    };
  }

  if (btnName === "%") {
    if (obj.next && !obj.operator) {
      return {
        next: (parseInt(obj.next)/100).toString(),
      };
    }
    if (obj.result) {
      return {
        result: (parseInt(obj.result)/100).toString(),
      };
    }
    return {};
  }

  if (btnName === ".") {
    if (obj.next) {
      if (obj.next.includes(".")) {
        return {};
      }
      return { next: obj.next + "." };
    }
    return { next: "0." };
  }

  if (btnName === "=") {
    
    if (obj.next && obj.operator) {
      return {
        result: operate(obj.prev, obj.next, obj.operator),
        next: null,
        prev: operate(obj.prev, obj.next, obj.operator),
        operator: null,
        expr: obj.expr.concat(obj.next)
      };
    } else if (obj.next) {
      return {
        result: obj.next,
        next: null,
        prev: operate(obj.prev, obj.next, obj.operator),
        operator: null,
        expr: obj.expr.concat(obj.next)
      };
    } else {
      return {};
    }
  }

  if (btnName === "+/-") {
    if (obj.next) {
      return { next: (-1 * parseFloat(obj.next)).toString() };
    }
    if (obj.result) {
      return { result: (-1 * parseFloat(obj.result)).toString() };
    }
    return {};
  }

  if (obj.operator) {
    if (!obj.next) {
      let length = obj.expr.length;
      let list = obj.expr.slice(0);
      list[length - 1] = btnName;
      return {
        operator: btnName,
        expr: list
      }
    }

    return {
      prev: operate(obj.prev, obj.next, obj.operator),
      next: null,
      operator: btnName,
      expr: obj.expr.concat([obj.next, btnName])
    };
  }

  if (!obj.next) {
    return { 
      operator: btnName,
      expr: [obj.result, btnName],
      result: null
    };
  }

  return {
    prev: obj.next,
    next: null,
    operator: btnName,
    expr: obj.expr.concat([obj.next, btnName])
  };
}