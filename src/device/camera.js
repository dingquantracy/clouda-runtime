define("device",function(module) {
    var lightapp = this;
    //定义 camera 空间，clouda.device.camera 支持退化
    var it = module.camera = {};
    /**
     * @object camera
     * @memberof clouda.device
     * @instance
     * @namespace clouda.device.camera
     */
    //需要device的camera模块
    
     it.DestinationType = {
        DATA_URL : 0,      // Return image as base64-encoded string
        FILE_URI : 1,      // Return image file URI
        NATIVE_URI : 2     // Return image native URI (e.g., assets-library:// on iOS or content:// on Android)
     };
     it.EncodingType = {
        JPEG : 0,               // Return JPEG encoded image
        PNG : 1                 // Return PNG encoded image
     };
     it.MediaType = {
        PICTURE: 0,    // allow selection of still pictures only. DEFAULT. Will return format specified via DestinationType
        VIDEO: 1,      // allow selection of video only, WILL ALWAYS RETURN FILE_URI
        ALLMEDIA : 2   // allow selection from all media types
     };
     it.PictureSourceType = {
        PHOTOLIBRARY : 0,
        CAMERA : 1,
        SAVEDPHOTOALBUM : 2
     };
     it.Direction = {
        BACK : 0,      // Use the back-facing camera
        FRONT : 1      // Use the front-facing camera
    };
    
    /**
     * 启动canema，读取手机图库
     *
     * @function getPicture
     * @memberof clouda.device.camera
     * @instance
     *
     * @param {string} msg 提示文字
     * @param {{}} options 可定义
     * @param {function} options.onSuccess 成功
     * @param {function} options.onFail 失败
     * @param {number} [options.quality] 
     * @param {number} [options.destinationType]
     * @param {number} [options.sourceType] 
     * @param {number} [options.mediaType]
     * @param {number} [options.cameraDirection]
     * @param {number} [options.encodingType]
     * @param {boolen} [options.saveToPhotoAlbum] 
     * @returns null
     * 
     */
    var getPicture = new delegateClass("device","camera","getPicture");
    // var cleanup = new delegateClass("device","camera","cleanup");
    
    it.getUserMedia = function(options){
        getPicture(options.onSuccess,options.onFail,options);
    };
    //没有终止
    
    
    return module;
});