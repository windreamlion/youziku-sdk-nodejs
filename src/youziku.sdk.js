/**
 *@description Youziku Nodejs SDK
 *@author jamesbing.
 *@description use request module
 */

exports.youzikuClient = youzikuClient;

/**
 * @description import modules
 * @author jamesbing
 */
var request = require('request');
/**
 * @description youzikuClient
 * @author jamesbing
 */
function youzikuClient(apiKey) {

    var client = {
        ApiKey: apiKey,
        /**
         * Single Tag
         */
        getFontFace: function (jsonObj, callback) {
            yzk_getFontFace(this.ApiKey, jsonObj, '/webFont/getFontFace', function (data) {
                if (callback) {
                    callback(JSON.parse(data));
                }
            });
        },
        /**
         * Single Tag [Base64String]
         */
        getWoffBase64StringFontFace: function (jsonObj, callback) {
            yzk_getFontFace(this.ApiKey, jsonObj, '/webFont/getWoffBase64StringFontFace', function (data) {
                if (callback) {
                    callback(JSON.parse(data));
                }
            });
        },
        /**
        * Batch All Tags
        */
        getBatchFontFace: function (jsonObj, callback) {
            yzk_getBatchFontFace(this.ApiKey, jsonObj, '/batchWebFont/getBatchFontFace', function (data) {
                if (callback) {
                    callback(JSON.parse(data));
                }
            })
        },
        /**
        * Batch Woff Tags
        */
        getBatchWoffFontFace: function (jsonObj, callback) {
            yzk_getBatchFontFace(this.ApiKey, jsonObj, '/batchWebFont/getBatchWoffFontFace', function (data) {
                if (callback) {
                    callback(JSON.parse(data));
                }
            })
        },
        /**
         * Batch CustomPath
         */
        createBatchWoffWebFontAsync: function (jsonObj, callback) {
            yzk_createBatchWoffWebFontAsync(this.ApiKey, jsonObj, '/batchCustomWebFont/createBatchWoffWebFontAsync', function (data) {

                if (callback) {
                    callback(JSON.parse(data));
                }
            })
        }
    };
    return client;
};


/**
*@description Custom path interface method
*@author jamesbing 
*/
function yzk_createBatchWoffWebFontAsync(apikey, obj, path, callback) {
    var newObj = { ApiKey: apikey };
    for (var i = 0; i < obj.Datas.length; i++) {
        newObj["Datas[" + i + "][AccessKey]"] = obj.Datas[i].AccessKey;
        newObj["Datas[" + i + "][Content]"] = obj.Datas[i].Content;
        newObj["Datas[" + i + "][Url]"] = obj.Datas[i].Url;
    }
    yzk_requestCommon(path, newObj, callback);
}

/**
 *@description  Universal method for multi label interface
 *@author jamesbing 
 */
function yzk_getBatchFontFace(apikey, obj, path, callback) {
    var newObj = { ApiKey: apikey };
    for (var i = 0; i < obj.Tags.length; i++) {
        newObj["Tags[" + i + "][AccessKey]"] = obj.Tags[i].AccessKey;
        newObj["Tags[" + i + "][Content]"] = obj.Tags[i].Content;
        newObj["Tags[" + i + "][Tag]"] = obj.Tags[i].Tag;
    }
    yzk_requestCommon(path, newObj, callback);
}

/**
 *@description Single label interface universal method
 *@author jamesbing 
 */
function yzk_getFontFace(apikey, obj, path, callback) {
    obj["ApiKey"] = apikey;
    yzk_requestCommon(path, obj, callback);
}

/**
 *@description youziku request common method
 *@author jamesbing 
 */
function yzk_requestCommon(path, obj, callback) {

    var host = "http://service.youziku.com";
    var rq = request.post({ url: host + path, form: obj }, function (error, response, datas) {
        if (callback) {
            callback(datas);
        }

    })

    rq.removeHeader("host");
    rq.setHeader("Host", "service.youziku.com");
    rq.setHeader("Connection", "keep-alive");

}