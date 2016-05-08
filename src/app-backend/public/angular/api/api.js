"use strict";

(function () {

    angular.module("tlctf.api", [
    ])

        .factory("Api", function($http) {
            var serverUrl = "";
            var customHeaderFunc = null;

            function getHeaders(){
                if(customHeaderFunc){
                    return customHeaderFunc();
                }
            }
            return {
                get : function (url){
                    return $http.get(serverUrl + url ,{headers : getHeaders()});
                },
                post : function (url, data) {
                    return $http.post(serverUrl + url,data ,{headers : getHeaders()});
                },
                put: function (url, data) {
                    return $http.put(serverUrl + url, data, { headers: getHeaders()});
                },
                delete: function (url) {
                    return $http.delete(serverUrl + url, {headers: getHeaders()});
                },
                addCustomHeader: function (customHeaderFunc1) {
                    customHeaderFunc = customHeaderFunc1;
                }
                //upload: function (url, file, data) {
                //    var uploadData;
                //    if (data) {
                //        uploadData = ObjectUtil.clone(data);
                //        uploadData.file = file;
                //    } else {
                //        uploadData = {file: file};
                //    }
                //
                //    if (uploadData.file && uploadData.file.width) {
                //        uploadData.image_width = uploadData.file.width;
                //        uploadData.image_height = uploadData.file.height;
                //    }
                //
                //    return Upload.upload({
                //        url: serverUrl + url,
                //        data: uploadData,
                //        headers: getHeaders()
                //    });
                //}
            };
        })
    ;

})();
