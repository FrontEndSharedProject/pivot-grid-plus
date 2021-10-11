import "../@packages/devextreme/scss/bundles/dx.carmine.scss";
import "../@packages/devextreme/scss/bundles/dx.light.scss";
import "../scss/index.scss";
import { PivotGridPlusOption } from "../types";
import { Base } from "../js/base";
declare class PivotGridPlus extends Base {
    private name;
    private defaultDataSource;
    constructor(options: Partial<PivotGridPlusOption>);
    private init;
    private setLocale;
    /**
     * 更新参数
     * @param options
     */
    updateOptions(options: Partial<PivotGridPlusOption>): void;
    /**
     * 展开全部
     */
    expandAll(): void;
    /**
     * 收起全部
     */
    collapseAll(): void;
    /**
     * 合并PivotGridPlus这个类和dxPivotGrid
     * 这样在外围就能同时调用PivotGridPlus的methods和dxPivotGrid的methods
     * @private
     */
    private mixin;
    /**
     * 定制 dxPivotGrid
     * @private
     */
    private customizePivotGrid;
    /**
     * 通过参数不同，处理数据结构
     * @param options
     * @private
     */
    private customOptionsHandler;
    destroy(): void;
}
export { PivotGridPlus };
