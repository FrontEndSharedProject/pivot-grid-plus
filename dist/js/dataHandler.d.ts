import type { Field, PivotGridPlusOption } from "../types";
export declare abstract class DataHandler {
    /**
     * 设置自定义字段
     * @param options
     */
    static setCustomFields(options: Partial<PivotGridPlusOption>): void;
    /**
     * 处理自定义td样式
     * @param options
     */
    static setTdCustomStyle(options: Partial<PivotGridPlusOption>): void;
    /**
     * 处理fields是否全部都展开
     * @param fields
     */
    static expandAllHandler(fields: Array<Field>): void;
    /**
     * 设置空值时的place holder
     * @param fields
     * @param placeHolder
     */
    static setEmptyPlaceHolder(fields: Array<Field>, placeHolder: string): void;
    /**
     * 设置统计类型
     * @param fields
     * @param summaryType
     */
    static setSummaryType(fields: Array<Field>, summaryType: string): void;
    /**
     * 文字是否自动换行
     * @param fields
     * @param isWrap
     */
    static setWordWrapHandler(fields: Array<Field>, isWrap: boolean): void;
}
