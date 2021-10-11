/**
 * 将css规则对象, 转换为cssText
 * @param rules
 */
export declare function cssRulesObjToCssText(rules: {
    [k: string]: string | number;
} | any): string;
export declare function isString(target: any): boolean;
export declare function isFn(target: any): boolean;
export declare function isMacOs(): boolean;
