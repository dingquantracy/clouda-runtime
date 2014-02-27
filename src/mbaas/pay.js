define("mbaas",function( module ) {
    var lightapp = this;
    //deal with clouda.mbaas
    var it = module.pay = {};
    
    var init = new delegateClass("lightpay","init");
    var dopay = new delegateClass("lightpay","dopay");
    
    /**
     * init
     *
     * @function init
     * @memberof clouda.mbaas.pay
     * @instance
     *
     * @param {string} partner_id 初始化partner_id
     * @param {{}} options 由onsuccess 和 onfail组成
     * @param {function} options.onsuccess 成功的回调
     * @param {function} [options.onfail] 失败的回调
     * @returns null
     * 
     */
     var PARTNER_ID,MD5_PRIVATE;
     
     it.init = function(partner_id,sk,options){
         if (!partner_id || typeof partner_id !='string'){
             lightapp.error(ErrCode.UNKNOW_INPUT,ErrCode.UNKNOW_INPUT,options);
             return false;
         }
         PARTNER_ID = partner_id;
         MD5_PRIVATE = sk;
         init(partner_id,options.onsuccess,function(nativeErr){
            lightapp.error(ErrCode.PAY_ERROR,nativeErr,options);
         },partner_id,options);
         
        
     };
     function createOrder($goodsname,$price){
            var orderNO = time()*1000;
            var tmpOrder = "currency=1&extra=";
            tmpOrder = tmpOrder+"&goods_desc="+goodsname;
            tmpOrder = tmpOrder+"&goods_name="+goodsname;
            tmpOrder = tmpOrder+"&goods_url=http://item.jd.com/736610.html";
            tmpOrder = tmpOrder+"&input_charset=1&order_create_time="+date(YmdHis)+"&order_no=";
            tmpOrder = tmpOrder+orderNO;
            tmpOrder = tmpOrder+"&pay_type=2&return_url=http://item.jd.com/736610.html";
            tmpOrder = tmpOrder+"&service_code=1&sign_method=1&sp_no="+PARTNER_ID;
            tmpOrder = tmpOrder+"&total_amount=".price;
            tmpOrder = tmpOrder+"&transport_amount=0&unit_amount=".price;
            tmpOrder = tmpOrder+"&unit_count=1";
            
            signed =md5(tmpOrder+"&key="+MD5_PRIVATE);
            
            tmpOrder = tmpOrder+"&sign="+signed+"&goods_channel=";
            tmpOrder = tmpOrder+"&goods_channel_sp=0001";
          
          return $tmpOrder; 
      
      }
    /**
     * pay
     *
     * @function login
     * @memberof clouda.mbaas.login
     * @instance
     *
     * @param {{}} options 由onsuccess 和 onfail组成
     * @param {function} options.onsuccess 成功的回调
     * @param {function} [options.onfail] 失败的回调
     * @param {string} [options.orderInfo] 订单信息
     * @param {boolen} [options.showdDialog] 展示加载中的dialog,默认true
     * @returns null
     * 
     */
     it.pay = function(options){
         if (!options.showdDialog){
             options.showdDialog = true;
         }
         dopay(options.onsuccess,function(nativeErr){
            lightapp.error(ErrCode.PAY_ERROR,nativeErr,options);
         },options.orderInfo,options.showdDialog,options);
        
     };
    
});