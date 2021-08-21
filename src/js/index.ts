import dxPivotGrid from "/@/@packages/devextreme/esm/ui/pivot_grid";
import "/@/@packages/devextreme/scss/bundles/dx.carmine.scss";
import "/@/@packages/devextreme/scss/bundles/dx.light.scss";
import "/@/scss/index.scss";
import { PivotGridDataSourceOptions, PivotGridPlusOption } from "/@/types";
import { DataHandler } from "/@/js/dataHandler";
import { isFn } from "/@/js/utils";
import { Base } from "/@/js/base";
import { cloneDeep } from "lodash-es";
import zhMessages from 'devextreme/localization/messages/zh.json'
import {locale,loadMessages} from '/@/@packages/devextreme/esm/localization'

class PivotGridPlus extends Base {
  private name: string = "pivot-grid-plus";
  private defaultDataSource: PivotGridDataSourceOptions;

  public constructor(options: Partial<PivotGridPlusOption>) {
    super();
    this.defaultOption = {
      wordWrapEnabled: false,
      expandAll: true,
      showBorders: true,
      inheritHeight: false,
      useBetterScroller: true,
      emptyPlaceHolder: undefined,
      exportable: true,
      summaryType: "count",
      customFields: [],
    };
    this.options = Object.assign(this.defaultOption, options);
    this.defaultDataSource = cloneDeep(
      this.options.dataSource
    ) as PivotGridDataSourceOptions;
    return this.init();
  }

  private init() {
    this.setLocale()
    this.customizePivotGrid();
    this.customOptionsHandler(this.options);

    this.DP = new dxPivotGrid(this.options.el, this.options);
    return this.mixin();
  }

  private setLocale(){
    loadMessages(zhMessages)
    locale('zh-CN')
  }

  /**
   * 更新参数
   * @param options
   */
  updateOptions(options: Partial<PivotGridPlusOption>) {
    //  以下的参数都是涉及到 DataSource 的更新
    let dataSourceOptions: string[] = [
      "expandAll",
      "emptyPlaceHolder",
      "summaryType",
      "wordWrapEnabled",
      "tdCustomStyle",
      "customFields",
      "dataSource",
    ];
    this.options = Object.assign(
      this.options,
      {
        dataSource: cloneDeep(this.defaultDataSource),
      },
      options
    );
    this.customOptionsHandler(this.options);
    Object.keys(options).map((key) => {
      if (!dataSourceOptions.includes(key)) {
        this.DP.option(key, this.options[key]);
      }
    });
    this.DP.option("dataSource", this.options.dataSource);
  }

  /**
   * 展开全部
   */
  expandAll() {
    if (!this.DP) return;
    let dataSourceInstance = this.DP.getDataSource();
    let { row, column } = this.getFirstField();
    row && dataSourceInstance.expandAll(row.index);
    column && dataSourceInstance.expandAll(column.index);
  }

  /**
   * 收起全部
   */
  collapseAll() {
    if (!this.DP) return;
    let dataSourceInstance = this.DP.getDataSource();
    let { row, column } = this.getFirstField();
    row && dataSourceInstance.collapseAll(row.index);
    column && dataSourceInstance.collapseAll(column.index);
  }

  /**
   * 合并PivotGridPlus这个类和dxPivotGrid
   * 这样在外围就能同时调用PivotGridPlus的methods和dxPivotGrid的methods
   * @private
   */
  private mixin() {
    Object.getOwnPropertyNames(PivotGridPlus.prototype)
      .filter((key) => {
        return !["constructor", "mixin", "init"].includes(key);
      })
      .forEach((key) => {
        if (isFn(this[key])) {
          this.DP[key] = this[key].bind(this);
        }
      });

    return this.DP;
  }

  /**
   * 定制 dxPivotGrid
   * @private
   */
  private customizePivotGrid(): void {
    //  加个class名称
    this.setClassName(this.name);
    //  设置表格继承父级高度
    this.options.inheritHeight && this.setInheritHeight();
    //  设置自定义滚动条
    this.options.useBetterScroller && this.useBetterScroller();
    //  是否可以导出
    this.options.exportable && this.setExportable();
  }

  /**
   * 通过参数不同，处理数据结构
   * @param options
   * @private
   */
  private customOptionsHandler(options): void {
    if (!options.dataSource?.fields) return;

    //  是否默认展开全部
    options.expandAll &&
      DataHandler.expandAllHandler(options.dataSource?.fields);

    //  设置空值时的place holder
    options.emptyPlaceHolder &&
      DataHandler.setEmptyPlaceHolder(
        options.dataSource?.fields,
        options.emptyPlaceHolder
      );

    //  设置统计类型
    options.summaryType &&
      DataHandler.setSummaryType(
        options.dataSource?.fields,
        options.summaryType
      );

    //  是否自动换行
    options.wordWrapEnabled &&
      DataHandler.setWordWrapHandler(
        options.dataSource?.fields,
        options.wordWrapEnabled
      );

    //  自定义td样式
    options.tdCustomStyle && DataHandler.setTdCustomStyle(options);

    //  合并自定义字段
    options.customFields?.length > 0 && DataHandler.setCustomFields(options);
  }

  public destroy() {
    this.DP?.dispose?.();
  }
}

export { PivotGridPlus };
