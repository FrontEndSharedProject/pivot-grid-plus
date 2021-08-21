/**
 * 将css规则对象, 转换为cssText
 * @param rules
 */
export function cssRulesObjToCssText(rules: {
  [k: string]: string | number;
}): string {
  return Object.entries(rules)
    .map(([k, v]) => {
      k = k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
      return `${k}:${v}`;
    })
    .join(";");
}

export function isString(target: any): boolean {
  return typeof target === "string";
}

export function isFn(target: any): boolean {
  return typeof target === "function";
}

export function isMacOs():boolean{
  return navigator.platform.indexOf('Mac') > -1
}
