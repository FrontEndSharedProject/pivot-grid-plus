import type { PivotGridPlusOption, Field } from "../types";
export declare abstract class Base {
    protected options: Partial<PivotGridPlusOption>;
    protected DP: any;
    protected defaultOption: Partial<PivotGridPlusOption>;
    /**
     * 获取 row 与 column 中第一个field
     * @protected
     */
    protected getFirstField(): {
        row: Field;
        column: Field;
    };
    protected setInheritHeight(): void;
    /**
     * 是否可以导出
     * @protected
     */
    protected setExportable(): void;
    /**
     * 使用自定义滚动条
     * @private
     */
    protected useBetterScroller(): void;
    protected setClassName(name: string): void;
}
