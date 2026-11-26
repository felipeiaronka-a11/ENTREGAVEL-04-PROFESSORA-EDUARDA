"use strict";
exports.__esModule = true;
exports.supabase = void 0;
var supabase_js_1 = require("@supabase/supabase-js");
var supabaseUrl = "https://xrzrhnafwcwbbsvcozvx.supabase.co";
var supabaseAnonKey = "sb_publishable_-onKBzre_HIyB-9D0v0oGQ_MvD9urty";
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey);
