(function ($) {
    $.fn.littleSlideFade = function(options){

        var defaults = {
            // 是否自动轮播
            auto : true,
            // 自动轮播间隔时间
            delay : 3000,
            // 动画时间
            animateTime : 1200,
            // 从第几张图开始
            startSlide : 0,
            // 是否显示圆点
            hasDot : true,
            // 圆点父元素class
            dotClass : 'slide-dot',
            // 圆点触发事件
            dotClick : 'click',
            // 是否显示左右切换按钮
            hasBtn : true,
            // 上一个按钮class
            prevClass : 'prev',
            // 下一个按钮class
            nextClass : 'next'
        };

        var options = $.extend(defaults, options);

        this.each(function(){
            loadSlide($(this));
        });

        // 初始化
        function loadSlide(obj){
            // 轮播对象
            obj.li = obj.find('li');
            // 轮播图数量
            obj.liLen = obj.li.length - 1;
            // 上一个
            obj.liPrev = options.startSlide - 1;
            // 当前
            obj.liActive = options.startSlide;
            // 下一个
            obj.liNext = options.startSlide + 1;
            // 自动轮播对象
            obj.autoTime = null;

            // 轮播图数量少于2个则不做处理
            if(obj.liLen <= 1){
                obj.li.css({'opacity': 0, 'display': 'block'}).animate({'opacity': 1}, options.animateTime);
                return false;
            }

            // 圆点
            if(options.hasDot){
                obj.dotObj = dotSlide(obj);
            }

            // 左右按钮
            if (options.hasBtn) {
                prevNextSlide(obj);
            }
            
            // 执行轮播
            toSlide(obj);
        };

        // 自动切换
        function autoSlide(obj){

            clearTimeout(obj.autoTime);

            obj.autoTime = setTimeout(function(){
                toSlide(obj);
            },options.delay);
        };

        // 轮播切换
        function toSlide(obj){

            // 圆点样式
            obj.dotObj.find('span').eq(obj.liActive).addClass('z-sel').siblings().removeClass('z-sel');

            // 当前项隐藏
            obj.li.stop(true,true).eq(obj.liPrev).css({'opacity': 1}).animate({'opacity': 0}, options.animateTime, function(){ $(this).hide(); });

            // 下一张显示
            obj.li.eq(obj.liActive).css({'opacity': 0, 'display': 'block'}).animate({'opacity': 1}, options.animateTime);

            // 上一张、活动项、下一张指向改变
            obj.liPrev = obj.liActive;
            obj.liActive = (obj.liActive>=obj.liLen) ? 0 : (obj.liActive + 1);
            obj.liNext = obj.liActive + 1;
            obj.liNext = (obj.liNext>=obj.liLen) ? 0 : obj.liNext;

            // 自动轮播
            if(options.auto){
                autoSlide(obj);
            }
            
        };

        // 圆点
        function dotSlide(obj){
            var dotHtml = [],
                $dotParent = $('<div class="'+ options.dotClass +'"></div>');

            obj.li.each(function(i){
                dotHtml.push('<span>'+ i + '</span>');
            });

            $dotParent.append(dotHtml.join(''));

            obj.append($dotParent);

            $dotParent.on(options.dotClick,'span',function(){
                clearTimeout(obj.autoTime);
                obj.liActive = $(this).index();
                toSlide(obj);
            });

            return $dotParent;
        };

        // 左右切换
        function prevNextSlide(obj){

            obj.append('<a class="'+ options.prevClass +'" href="javascript:void(0);">&lt;</a><a class="'+ options.nextClass +'" href="javascript:void(0);">&gt;</a>');

            obj.on('click','.' + options.prevClass + ',.' + options.nextClass,function(){
                clearTimeout(obj.autoTime);

                if($(this).hasClass(options.prevClass)){
                    obj.liActive = (obj.liPrev - 1) < 0 ? obj.liLen : (obj.liPrev - 1);
                }

                toSlide(obj);
            });
        };
    };
})(jQuery);