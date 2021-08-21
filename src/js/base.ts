import type { PivotGridPlusOption, Field } from "/@/types";
import { throttle } from "throttle-debounce";
import { isMacOs } from "/@/js/utils";

export abstract class Base {
  protected options: Partial<PivotGridPlusOption>;
  protected DP: any = null;
  protected defaultOption: Partial<PivotGridPlusOption>;

  /**
   * 获取 row 与 column 中第一个field
   * @protected
   */
  protected getFirstField(): {
    row: Field;
    column: Field;
  } {
    let dataSourceInstance = this.DP.getDataSource();
    return {
      row: dataSourceInstance._fields.find((item) => item.area === "row"),
      column: dataSourceInstance._fields.find((item) => item.area === "column"),
    };
  }

  protected setInheritHeight() {
    this.options.height = `inherit`;

    const throttleFunc = throttle(300, () => {
      this?.DP?.updateDimensions?.();
    });

    window.addEventListener("resize", () => throttleFunc());
  }

  /**
   * 是否可以导出
   * @protected
   */
  protected setExportable(): void {
    this.options.export = {
      enabled: true,
    };
  }

  /**
   * 使用自定义滚动条
   * @private
   */
  protected useBetterScroller(): void {
    this.options.scrolling = {
      mode: "virtual",
    };

    //  Mac os 有自己的一套滚动条样式，这里只处理window的滚动条
    !isMacOs() && this.setClassName("use-better-scroller");
  }

  protected setClassName(name: string) {
    if (this.options.elementAttr) {
      this.options.elementAttr.class = this.options.elementAttr.class
        ? this.options.elementAttr.class + ` ${name}`
        : name;
    } else {
      this.options.elementAttr = { class: name };
    }
  }
}
