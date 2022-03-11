var JSONFormat = (function () {
    var _toString = Object.prototype.toString;

    function format(object, indent_count) {
        var html_fragment = '';
        switch (_typeof(object)) {
            case 'Null': 0
                html_fragment = _format_null(object);
                break;
            case 'Boolean':
                html_fragment = _format_boolean(object);
                break;
            case 'Number':
                html_fragment = _format_number(object);
                break;
            case 'String':
                html_fragment = _format_string(object);
                break;
            case 'Array':
                html_fragment = _format_array(object, indent_count);
                break;
            case 'Object':
                html_fragment = _format_object(object, indent_count);
                break;
        }
        return html_fragment;
    };

    function _format_null(object) {
        return 'null';
    }

    function _format_boolean(object) {
        return '"' + object + '"';
    }

    function _format_number(object) {
        return '"' + object + '"';
    }

    function _format_string(object) {
        object = object.replace(/\</g, "&lt;");
        object = object.replace(/\>/g, "&gt;");
        if (0 <= object.search(/^http/)) {
            object = '<a href="' + object + '" target="_blank">' + object + '</a>'
        }
        return '"' + object + '"';
    }



    function _format_object(object, indent_count) {
        var tmp_array = [];
        for (var key in object) {
            tmp_array.push(indent_tab(indent_count) + '"' + key + '":' + format(object[key], indent_count + 1));
        }
        return '{\r'
            + tmp_array.join(',\r')
            + '\r' + indent_tab(indent_count - 1) + '}';
    }

    function indent_tab(indent_count) {
        return (new Array(indent_count + 1)).join('    ');
    }

    function _typeof(object) {
        var tf = typeof object,
            ts = _toString.call(object);
        return null === object ? 'Null' :
            'undefined' == tf ? 'Undefined' :
                'boolean' == tf ? 'Boolean' :
                    'number' == tf ? 'Number' :
                        'string' == tf ? 'String' :
                            '[object Function]' == ts ? 'Function' :
                                '[object Array]' == ts ? 'Array' :
                                    '[object Date]' == ts ? 'Date' : 'Object';
    };


    var _JSONFormat = function (origin_data) {
        this.data = JSON.parse(origin_data);
    };

    _JSONFormat.prototype = {
        constructor: JSONFormat,
        toString: function () {
            return format(this.data, 1);
        }
    }
    return _JSONFormat;
})();