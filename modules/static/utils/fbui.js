/**
 * Created by liushuang on 16/9/29.
 */
var httpAgent = function(url, requestType, param, callback,errorCallBack,noloading, async) {
    $.ajax({
        type: requestType,
        url: url,
        data: param,
        async:async,
        success: function(data) {
            if(data.result && data.result != 0){
                if(data.result == -10001){//token过期了
                    tokenIsOverdue();
                    // showPrompt(data.msg,function(){
                    // 	reLogin();
                    // });
                }else if(data.result == -10100){//强制升级客户端
                    mandatoryUpgrade();
                }else{
                    if(errorCallBack){
                        errorCallBack(data);
                    }else{
                        showErrorMsg(data.msg,url);
                    }
                }
            }else{
                callback(data);
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //alert("服务器内部错误，状态码：" + XMLHttpRequest.status + "，异常对象:" + errorThrown);
        }
    });
};
/*token过期告诉客户端*/
function tokenIsOverdue(){
    //iydf.bridge.prepare("pc");
    //var event = {
    //	apiName: 'token_is_overdue',
    //	params: {
    //	},
    //	cb: function(str) {
    //	},
    //	fakeret: "fail"
    //};
    //iydf.bridge.call(event);
    showPrompt('token过期了,请重新登录',function(){
        window.location.href = 'login.html';
    })
}

/*客户端必须升级*/
function mandatoryUpgrade(){
    iydf.bridge.prepare("pc");
    var event = {
        apiName: 'mandatory_upgrade',
        params: {
        },
        cb: function(str) {
        },
        fakeret: "fail"
    };
    iydf.bridge.call(event);
}


/*提示框,带确认取消*/
function showPrompt(con,cb){
    $('body .fbui-modal-alert').remove();
    var html = '<div class="fbui-modal fbui-modal-sm fbui-modal-alert" style="display: block;">'
        +'<div class="bg-cover"></div>'
        +'<div class="modal-container">'
        +'<div class="header">'
        +'<span class="logo left"></span>'
        +'<span class="left title">提示</span>'
        +'<span class="modal_operate">'
        +'<span class="close mouse_pointer right" title="关闭">×</span>'
        +'</span>'
        +'<div class="clear"></div>'
        +'</div>'
        +'<div class="body ffm f14px">'
        +'<div class="" style="text-align:center; line-height:24px; padding-top:20px; font-size:12px;">' + con + '</div>'
        +'</div>'
        +'<div class="footer clearfix">'
        +'<a class="fbui-btn right close" href="javascript:void(0);">取消</a>'
        +'<a class="fbui-btn fbui-btn-blue right" href="javascript:void(0);">确认</a>'
        +'</div>'
        +'</div>'
        +'</div>'
    $('body').append(html);
    $('.fbui-modal-alert .footer .fbui-btn-blue').unbind().click(function(){
        if(cb){
            cb();
        }
        $('.fbui-modal-alert').hide();
    });
}


/*显示通用联网报错弹框*/
function showErrorMsg(msg,url){
    $('body .fbui-modal-net-error').remove();
    var html = '<div class="fbui-modal fbui-modal-sm fbui-modal-net-error" style="display: none;">'
        +'<div class="bg-cover"></div>'
        +'<div class="modal-container">'
        +'<div class="header">'
        +'<span class="logo left"></span>'
        +'<span class="left title">提示</span>'
        +'<span class="modal_operate">'
        +'<span class="close mouse_pointer right" title="关闭">×</span>'
        +'</span>'
        +'<div class="clear"></div>'
        +'</div>'
        +'<div class="body ffm f14px" style="max-height:150px; overflow: auto;">'
        +'<div class="" style="text-align:center; line-height:24px; padding-top:20px; font-size:12px;">'
        +'<div>网络错误，请检查网络</div>'
        +'<span class="view_net_error_msg" style="cursor: pointer; color: #378be0;">查看详情</span>'
        +'<div class="net_error_con" style="display:none; word-wrap: break-word; word-break: break-all;">'+msg+'，url地址：'+url+'</div>'
        +'</div>'
        +'</div>'
        +'<div class="footer clearfix">'
        +'<a class="fbui-btn right close" href="javascript:void(0);">取消</a>'
        +'<a class="fbui-btn fbui-btn-blue right" href="javascript:void(0);">确认</a>'
        +'</div>'
        +'</div>'
        +'</div>'
    $('body').append(html);
    $('.fbui-modal-net-error').modal('show');
    $('.fbui-modal-net-error .view_net_error_msg').unbind().click(function(){
        $('.fbui-modal-net-error .net_error_con').toggle();
    });
    $('.fbui-modal-net-error .footer .fbui-btn-blue').unbind().click(function(){
        $('.fbui-modal-net-error').hide();
    });
}
