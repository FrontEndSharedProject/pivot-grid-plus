/**
 * DevExtreme (esm/viz/gauges/base_range_container.js)
 * Version: 21.1.5
 * Build date: Mon Aug 02 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    each
} from "../../core/utils/iterator";
import {
    BaseElement
} from "./base_indicators";
import {
    isString
} from "../../core/utils/type";
var _Number = Number;
var _isArray = Array.isArray;
var _isFinite = isFinite;
var BaseRangeContainer = BaseElement.inherit({
    _init: function() {
        this._root = this._renderer.g().attr({
            class: "dxg-range-container"
        }).linkOn(this._container, "range-container")
    },
    _dispose: function() {
        this._root.linkOff()
    },
    clean: function() {
        this._root.linkRemove().clear();
        this._options = this.enabled = null;
        return this
    },
    _getRanges: function() {
        var options = this._options;
        var translator = this._translator;
        var totalStart = translator.getDomain()[0];
        var totalEnd = translator.getDomain()[1];
        var totalDelta = totalEnd - totalStart;
        var isValidSegment = totalDelta >= 0 ? isValidSegmentAsc : isValidSegmentDesc;
        var subtractSegment = totalDelta >= 0 ? subtractSegmentAsc : subtractSegmentDesc;
        var list;
        var ranges = [];
        var backgroundRanges = [{
            start: totalStart,
            end: totalEnd
        }];
        var backgroundColor = isString(options.backgroundColor) ? options.backgroundColor : "none";
        var width = options.width || {};
        var startWidth = _Number(width > 0 ? width : width.start);
        var endWidth = _Number(width > 0 ? width : width.end);
        var deltaWidth = endWidth - startWidth;
        if (void 0 !== options.ranges && !_isArray(options.ranges)) {
            return null
        }
        if (!(startWidth >= 0 && endWidth >= 0 && startWidth + endWidth > 0)) {
            return null
        }
        list = (_isArray(options.ranges) ? options.ranges : []).reduce((result, rangeOptions, i) => {
            rangeOptions = rangeOptions || {};
            var start = translator.adjust(rangeOptions.startValue);
            var end = translator.adjust(rangeOptions.endValue);
            if (_isFinite(start) && _isFinite(end) && isValidSegment(start, end, rangeOptions)) {
                result.push({
                    start: start,
                    end: end,
                    color: rangeOptions.color,
                    classIndex: i
                })
            }
            return result
        }, []);
        var palette = this._themeManager.createPalette(options.palette, {
            type: "indicatingSet",
            extensionMode: options.paletteExtensionMode,
            keepLastColorInEnd: true,
            count: list.length
        });
        each(list, (function(_, item) {
            var paletteColor = palette.getNextColor();
            item.color = isString(item.color) && item.color || paletteColor || "none";
            item.className = "dxg-range dxg-range-" + item.classIndex;
            delete item.classIndex
        }));
        each(list, (function(_, item) {
            var i;
            var ii;
            var sub;
            var subs;
            var range;
            var newRanges = [];
            var newBackgroundRanges = [];
            for (i = 0, ii = ranges.length; i < ii; ++i) {
                range = ranges[i];
                subs = subtractSegment(range.start, range.end, item.start, item.end);
                (sub = subs[0]) && (sub.color = range.color) && (sub.className = range.className) && newRanges.push(sub);
                (sub = subs[1]) && (sub.color = range.color) && (sub.className = range.className) && newRanges.push(sub)
            }
            newRanges.push(item);
            ranges = newRanges;
            for (i = 0, ii = backgroundRanges.length; i < ii; ++i) {
                range = backgroundRanges[i];
                subs = subtractSegment(range.start, range.end, item.start, item.end);
                (sub = subs[0]) && newBackgroundRanges.push(sub);
                (sub = subs[1]) && newBackgroundRanges.push(sub)
            }
            backgroundRanges = newBackgroundRanges
        }));
        each(backgroundRanges, (function(_, range) {
            range.color = backgroundColor;
            range.className = "dxg-range dxg-background-range";
            ranges.push(range)
        }));
        each(ranges, (function(_, range) {
            range.startWidth = (range.start - totalStart) / totalDelta * deltaWidth + startWidth;
            range.endWidth = (range.end - totalStart) / totalDelta * deltaWidth + startWidth
        }));
        return ranges
    },
    render: function(options) {
        this._options = options;
        this._processOptions();
        this._ranges = this._getRanges();
        if (this._ranges) {
            this.enabled = true;
            this._root.linkAppend()
        }
        return this
    },
    resize: function(layout) {
        var that = this;
        that._root.clear();
        if (that._isVisible(layout)) {
            each(that._ranges, (function(_, range) {
                that._createRange(range, layout).attr({
                    fill: range.color,
                    class: range.className
                }).append(that._root)
            }))
        }
        return that
    },
    _processOptions: null,
    _isVisible: null,
    _createRange: null,
    getColorForValue: function(value) {
        var color = null;
        each(this._ranges, (function(_, range) {
            if (range.start <= value && value <= range.end || range.start >= value && value >= range.end) {
                color = range.color;
                return false
            }
        }));
        return color
    }
});

function subtractSegmentAsc(segmentStart, segmentEnd, otherStart, otherEnd) {
    var result;
    if (otherStart > segmentStart && otherEnd < segmentEnd) {
        result = [{
            start: segmentStart,
            end: otherStart
        }, {
            start: otherEnd,
            end: segmentEnd
        }]
    } else if (otherStart >= segmentEnd || otherEnd <= segmentStart) {
        result = [{
            start: segmentStart,
            end: segmentEnd
        }]
    } else if (otherStart <= segmentStart && otherEnd >= segmentEnd) {
        result = []
    } else if (otherStart > segmentStart) {
        result = [{
            start: segmentStart,
            end: otherStart
        }]
    } else if (otherEnd < segmentEnd) {
        result = [{
            start: otherEnd,
            end: segmentEnd
        }]
    }
    return result
}

function subtractSegmentDesc(segmentStart, segmentEnd, otherStart, otherEnd) {
    var result;
    if (otherStart < segmentStart && otherEnd > segmentEnd) {
        result = [{
            start: segmentStart,
            end: otherStart
        }, {
            start: otherEnd,
            end: segmentEnd
        }]
    } else if (otherStart <= segmentEnd || otherEnd >= segmentStart) {
        result = [{
            start: segmentStart,
            end: segmentEnd
        }]
    } else if (otherStart >= segmentStart && otherEnd <= segmentEnd) {
        result = []
    } else if (otherStart < segmentStart) {
        result = [{
            start: segmentStart,
            end: otherStart
        }]
    } else if (otherEnd > segmentEnd) {
        result = [{
            start: otherEnd,
            end: segmentEnd
        }]
    }
    return result
}

function areEqualValues(start, end, _ref) {
    var {
        startValue: startValue,
        endValue: endValue
    } = _ref;
    return endValue === startValue && startValue === start && end === start
}

function isValidSegmentAsc(start, end, options) {
    return end - start > 0 || areEqualValues(start, end, options)
}

function isValidSegmentDesc(start, end, options) {
    return start - end > 0 || areEqualValues(start, end, options)
}
export default BaseRangeContainer;