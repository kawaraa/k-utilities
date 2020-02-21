/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.User = (function() {
    
        function User(p) {
            if (p)
                for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                    if (p[ks[i]] != null)
                        this[ks[i]] = p[ks[i]];
        }
    
        User.prototype.id = "";
        User.prototype.name = "";
        User.prototype.email = "";
        User.prototype.status = "";
    
        User.encode = function encode(m, w) {
            if (!w)
                w = $Writer.create();
            if (m.id != null && m.hasOwnProperty("id"))
                w.uint32(10).string(m.id);
            if (m.name != null && m.hasOwnProperty("name"))
                w.uint32(18).string(m.name);
            if (m.email != null && m.hasOwnProperty("email"))
                w.uint32(26).string(m.email);
            if (m.status != null && m.hasOwnProperty("status"))
                w.uint32(34).string(m.status);
            return w;
        };
    
        User.decode = function decode(r, l) {
            if (!(r instanceof $Reader))
                r = $Reader.create(r);
            var c = l === undefined ? r.len : r.pos + l, m = new $root.User();
            while (r.pos < c) {
                var t = r.uint32();
                switch (t >>> 3) {
                case 1:
                    m.id = r.string();
                    break;
                case 2:
                    m.name = r.string();
                    break;
                case 3:
                    m.email = r.string();
                    break;
                case 4:
                    m.status = r.string();
                    break;
                default:
                    r.skipType(t & 7);
                    break;
                }
            }
            return m;
        };
    
        User.verify = function verify(m) {
            if (typeof m !== "object" || m === null)
                return "object expected";
            if (m.id != null && m.hasOwnProperty("id")) {
                if (!$util.isString(m.id))
                    return "id: string expected";
            }
            if (m.name != null && m.hasOwnProperty("name")) {
                if (!$util.isString(m.name))
                    return "name: string expected";
            }
            if (m.email != null && m.hasOwnProperty("email")) {
                if (!$util.isString(m.email))
                    return "email: string expected";
            }
            if (m.status != null && m.hasOwnProperty("status")) {
                if (!$util.isString(m.status))
                    return "status: string expected";
            }
            return null;
        };
    
        return User;
    })();

    return $root;
});
