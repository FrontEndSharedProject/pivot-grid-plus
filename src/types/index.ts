/**
 * @public
 * @namespace DevExpress.data.PivotGridDataSource
 */
export type Field = PivotGridDataSourceField;

/**
 * @namespace DevExpress.data
 * @deprecated Use Field instead
 */
export interface PivotGridDataSourceField {
  emptyPlaceHolder: string;
  index: number;
  /**
   * @docid PivotGridDataSourceOptions.fields.allowCrossGroupCalculation
   * @default false
   * @public
   */
  allowCrossGroupCalculation?: boolean;
  /**
   * @docid PivotGridDataSourceOptions.fields.allowExpandAll
   * @default false
   * @public
   */
  allowExpandAll?: boolean;
  /**
   * @docid PivotGridDataSourceOptions.fields.allowFiltering
   * @default false
   * @public
   */
  allowFiltering?: boolean;
  /**
   * @docid PivotGridDataSourceOptions.fields.allowSorting
   * @default false
   * @public
   */
  allowSorting?: boolean;
  /**
   * @docid PivotGridDataSourceOptions.fields.allowSortingBySummary
   * @default false
   * @public
   */
  allowSortingBySummary?: boolean;
  /**
   * @docid PivotGridDataSourceOptions.fields.area
   * @type Enums.PivotGridArea
   * @default undefined
   * @acceptValues undefined
   * @public
   */
  area?: "column" | "data" | "filter" | "row" | undefined;
  /**
   * @docid PivotGridDataSourceOptions.fields.areaIndex
   * @default undefined
   * @public
   */
  areaIndex?: number;
  /**
   * @docid PivotGridDataSourceOptions.fields.calculateCustomSummary
   * @type_function_param1 options:object
   * @type_function_param1_field1 summaryProcess:string
   * @type_function_param1_field2 value:any
   * @type_function_param1_field3 totalValue:any
   * @public
   */
  calculateCustomSummary?: (options: {
    summaryProcess?: string;
    value?: any;
    totalValue?: any;
  }) => void;
  /**
   * @docid PivotGridDataSourceOptions.fields.calculateSummaryValue
   * @type_function_param1 e:dxPivotGridSummaryCell
   * @type_function_return number
   * @default undefined
   * @public
   */
  calculateSummaryValue?: (e) => number;
  /**
   * @docid PivotGridDataSourceOptions.fields.caption
   * @default undefined
   * @public
   */
  caption?: string;
  /**
   * @docid PivotGridDataSourceOptions.fields.customizeText
   * @type_function_param1 cellInfo:object
   * @type_function_param1_field1 value:string|number|date
   * @type_function_param1_field2 valueText:string
   * @type_function_return string
   * @public
   */
  customizeText?: (cellInfo: {
    value?: string | number | Date;
    valueText?: string;
  }) => string;
  /**
   * @docid PivotGridDataSourceOptions.fields.dataField
   * @default undefined
   * @public
   */
  dataField?: string;
  /**
   * @docid PivotGridDataSourceOptions.fields.dataType
   * @type Enums.PivotGridDataType
   * @default undefined
   * @public
   */
  dataType?: "date" | "number" | "string";
  /**
   * @docid PivotGridDataSourceOptions.fields.displayFolder
   * @default undefined
   * @public
   */
  displayFolder?: string;
  /**
   * @docid PivotGridDataSourceOptions.fields.expanded
   * @default false
   * @public
   */
  expanded?: boolean;
  /**
   * @docid PivotGridDataSourceOptions.fields.filterType
   * @type Enums.FilterType
   * @default 'include'
   * @public
   */
  filterType?: "exclude" | "include";
  /**
   * @docid PivotGridDataSourceOptions.fields.filterValues
   * @default undefined
   * @public
   */
  filterValues?: Array<any>;
  /**
   * @docid PivotGridDataSourceOptions.fields.format
   * @default ''
   * @public
   */
  format?: Object;
  /**
   * @docid PivotGridDataSourceOptions.fields.groupIndex
   * @default undefined
   * @public
   */
  groupIndex?: number;
  /**
   * @docid PivotGridDataSourceOptions.fields.groupInterval
   * @type Enums.PivotGridGroupInterval|number
   * @default undefined
   * @public
   */
  groupInterval?: "day" | "dayOfWeek" | "month" | "quarter" | "year" | number;
  /**
   * @docid PivotGridDataSourceOptions.fields.groupName
   * @default undefined
   * @public
   */
  groupName?: string;
  /**
   * @docid PivotGridDataSourceOptions.fields.headerFilter
   * @public
   */
  headerFilter?: { allowSearch?: boolean; height?: number; width?: number };
  /**
   * @docid PivotGridDataSourceOptions.fields.isMeasure
   * @default undefined
   * @public
   */
  isMeasure?: boolean;
  /**
   * @docid PivotGridDataSourceOptions.fields.name
   * @default undefined
   * @public
   */
  name?: string;
  /**
   * @docid PivotGridDataSourceOptions.fields.runningTotal
   * @type Enums.PivotGridRunningTotalMode
   * @default undefined
   * @public
   */
  runningTotal?: "column" | "row";
  /**
   * @docid PivotGridDataSourceOptions.fields.selector
   * @type function(data)
   * @default undefined
   * @public
   */
  selector?: Function;
  /**
   * @docid PivotGridDataSourceOptions.fields.showGrandTotals
   * @default true
   * @public
   */
  showGrandTotals?: boolean;
  /**
   * @docid PivotGridDataSourceOptions.fields.showTotals
   * @default true
   * @public
   */
  showTotals?: boolean;
  /**
   * @docid PivotGridDataSourceOptions.fields.showValues
   * @default undefined
   * @public
   */
  showValues?: boolean;
  /**
   * @docid PivotGridDataSourceOptions.fields.sortBy
   * @type Enums.PivotGridSortBy
   * @default undefined
   * @public
   */
  sortBy?: "displayText" | "value" | "none";
  /**
   * @docid PivotGridDataSourceOptions.fields.sortBySummaryField
   * @default undefined
   * @public
   */
  sortBySummaryField?: string;
  /**
   * @docid PivotGridDataSourceOptions.fields.sortBySummaryPath
   * @default undefined
   * @public
   */
  sortBySummaryPath?: Array<number | string>;
  /**
   * @docid PivotGridDataSourceOptions.fields.sortOrder
   * @type Enums.SortOrder
   * @default 'asc'
   * @public
   */
  sortOrder?: "asc" | "desc";
  /**
   * @docid PivotGridDataSourceOptions.fields.sortingMethod
   * @type_function_param1 a:object
   * @type_function_param1_field1 value:string|number
   * @type_function_param1_field2 children:Array<any>
   * @type_function_param2 b:object
   * @type_function_param2_field1 value:string|number
   * @type_function_param2_field2 children:Array<any>
   * @type_function_return number
   * @default undefined
   * @public
   */
  sortingMethod?: (
    a: { value?: string | number; children?: Array<any> },
    b: { value?: string | number; children?: Array<any> }
  ) => number;
  /**
   * @docid PivotGridDataSourceOptions.fields.summaryDisplayMode
   * @type Enums.PivotGridSummaryDisplayMode
   * @default undefined
   * @public
   */
  summaryDisplayMode?:
    | "absoluteVariation"
    | "percentOfColumnGrandTotal"
    | "percentOfColumnTotal"
    | "percentOfGrandTotal"
    | "percentOfRowGrandTotal"
    | "percentOfRowTotal"
    | "percentVariation";
  /**
   * @docid PivotGridDataSourceOptions.fields.summaryType
   * @type Enums.SummaryType|string
   * @default 'count'
   * @public
   */
  summaryType?: "avg" | "count" | "custom" | "max" | "min" | "sum" | string;
  /**
   * @docid PivotGridDataSourceOptions.fields.visible
   * @default true
   * @public
   */
  visible?: boolean;
  /**
   * @docid PivotGridDataSourceOptions.fields.width
   * @default undefined
   * @public
   */
  width?: number;
  /**
   * @docid PivotGridDataSourceOptions.fields.wordWrapEnabled
   * @default undefined
   * @public
   */
  wordWrapEnabled?: boolean;
}

/** @namespace DevExpress.data */
export interface PivotGridDataSourceOptions {
  /**
   * @docid
   * @type Array<Object>
   * @default undefined
   * @public
   */
  fields?: Array<Field>;
  /**
   * @docid
   * @type Filter expression
   * @public
   */
  filter?: string | Array<any> | Function;
  /**
   * @docid
   * @action
   * @public
   */
  onChanged?: Function;
  /**
   * @docid
   * @type_function_param1 fields:Array<PivotGridDataSourceOptions.fields>
   * @action
   * @public
   */
  onFieldsPrepared?: (fields: Array<Field>) => void;
  /**
   * @docid
   * @type_function_param1 error:Object
   * @action
   * @public
   */
  onLoadError?: (error: any) => void;
  /**
   * @docid
   * @type_function_param1 isLoading:boolean
   * @action
   * @public
   */
  onLoadingChanged?: (isLoading: boolean) => void;
  /**
   * @docid
   * @default false
   * @public
   */
  paginate?: boolean;
  /**
   * @docid
   * @default false
   * @public
   */
  remoteOperations?: boolean;
  /**
   * @docid
   * @default true
   * @public
   */
  retrieveFields?: boolean;
  /**
   * @docid
   * @public
   */
  store?: Array<Partial<{}>>;
}

export type TCustomStyleObj = {
  data: string | Partial<{}>;
  row: string | Partial<{}>;
  column: string | Partial<{}>;
  all: string | Partial<{}>;
  [key: string]: any;
};

export interface PivotGridPlusOption {
  /**
   * 用于生成表格的DOM对象
   * @default null
   */
  el: HTMLElement;
  /**
   * 是否展开所有字段
   * @default true
   */
  expandAll: boolean;
  /**
   * 是否显示border
   * @default true
   */
  showBorders: boolean;
  /**
   * 子字段显示的位置
   * @default 'column'
   */
  dataFieldArea: "column" | "row";
  /**
   * 表格高度
   * @default undefined
   */
  height: number | string | Function;
  /**
   * 表格宽度
   * @default undefined
   */
  width: number | string | Function;
  /**
   * 是否允许展开更多
   * @default false
   */
  allowExpandAll: boolean;
  /**
   * 文字是是否换行
   * @default false
   */
  wordWrapEnabled: boolean;
  /**
   * 数据配置
   * @default undefined
   */
  dataSource: PivotGridDataSourceOptions;
  /**
   * 自定义td内span的样式
   * @default undefined
   */
  tdCustomStyle: Partial<TCustomStyleObj> | string;
  /**
   * 是否继承高度
   * @default false
   */
  inheritHeight: boolean;
  /**
   * 是否使用自定义的滚动条
   * @default true
   */
  useBetterScroller: boolean;
  /**
   * 空值占位符
   * @default undefined
   */
  emptyPlaceHolder: string;
  /**
   * 是否支持导出
   * @default true
   */
  exportable: boolean;
  /**
   * 统计类型
   * @default count
   */
  summaryType: "sum" | "min" | "max" | "avg" | "count";
  /**
   * 自定义field
   * @default []
   */
  customFields: Field[];

  [key: string]: any;
}
