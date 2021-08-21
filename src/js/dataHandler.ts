import type { Field, PivotGridPlusOption, TCustomStyleObj } from "/@/types";
import { cssRulesObjToCssText, isString } from "/@/js/utils";

export abstract class DataHandler {
  /**
   * 设置自定义字段
   * @param options
   */
  static setCustomFields(options: Partial<PivotGridPlusOption>) {
    if (!options.customFields) return;
    if (!options.dataSource?.fields) return;

    options.dataSource.fields = options.dataSource.fields.concat(
      options.customFields
    );
  }

  /**
   * 处理自定义td样式
   * @param options
   */
  static setTdCustomStyle(options: Partial<PivotGridPlusOption>) {
    if (!options.tdCustomStyle) return;
    let stylesObj: Partial<TCustomStyleObj> = {};

    //  该方法修改了底层的源代码
    //  /esm/ui/pivot_grid/ui,pivot_grid.area_item.js : 175

    //  如果 tdCustomStyle 是个字符串
    if (isString(options.tdCustomStyle)) {
      stylesObj.all = options.tdCustomStyle;
    } else {
      let { all, data, row, column } = options.tdCustomStyle;
      //  如果tdCustomStyle是个有 all, data, row, column的css rules对象
      if (all || data || row || column) {
        stylesObj.all = isString(all) ? all : cssRulesObjToCssText(all ?? {});
        stylesObj.data = isString(data)
          ? data
          : cssRulesObjToCssText(data ?? {});
        stylesObj.row = isString(row) ? row : cssRulesObjToCssText(row ?? {});
        stylesObj.column = isString(column)
          ? column
          : cssRulesObjToCssText(column ?? {});
      } else {
        //  如果tdCustomStyle直接是css rules对象
        stylesObj.all = cssRulesObjToCssText(options.tdCustomStyle ?? {});
      }
    }

    options._customStyleHandler = function ({ area, cellElement }) {
      let el: HTMLElement = cellElement.querySelector("span");
      switch (area) {
        case "data":
          el.style.cssText = [stylesObj.all, stylesObj.data].join(";");
          break;
        case "row":
          el.style.cssText = [stylesObj.all, stylesObj.row].join(";");
          break;
        case "column":
          el.style.cssText = [stylesObj.all, stylesObj.column].join(";");
          break;
        default:
          break;
      }
    };

    //  因为底层内部做了判断, 必须要有onCellPrepared参数才会执行
    if (!options.onCellPrepared) {
      options.onCellPrepared = function () {};
    }
  }

  /**
   * 处理fields是否全部都展开
   * @param fields
   */
  static expandAllHandler(fields: Array<Field>) {
    if (!fields) return;
    for (let i = 0; i < fields.length; i++) {
      fields[i].expanded = true;
    }
  }

  /**
   * 设置空值时的place holder
   * @param fields
   * @param placeHolder
   */
  static setEmptyPlaceHolder(fields: Array<Field>, placeHolder: string) {
    if (!fields || !placeHolder) return;

    for (let i = 0; i < fields.length; i++) {
      //  此处修改了源代码
      //  ui/pivot_grid/ui.pivot_grid.utils.js : 111
      fields[i].emptyPlaceHolder = placeHolder;
    }
  }

  /**
   * 设置统计类型
   * @param fields
   * @param summaryType
   */
  static setSummaryType(fields: Array<Field>, summaryType: string) {
    if (!fields) return;
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].area === "data") {
        fields[i].summaryType = summaryType;
      }
    }
  }

  /**
   * 文字是否自动换行
   * @param fields
   * @param isWrap
   */
  static setWordWrapHandler(fields: Array<Field>, isWrap: boolean) {
    if (!fields) return;
    for (let i = 0; i < fields.length; i++) {
      fields[i].wordWrapEnabled = isWrap;
    }
  }
}
