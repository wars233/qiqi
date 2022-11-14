;
(function(window, document) {
    var CubeTurn = function(targetDom, options) {
        // 判断是用函数创建的还是用new创建的。这样我们就可以通过MaskShare("dom") 或 new MaskShare("dom")来使用这个插件了
        if (!(this instanceof CubeTurn))
            return new CubeTurn(targetDom, options);
        //旋转方式
        this.wapControl = document.querySelector('#wapControl');
        // 正方体
        this.cube = document.querySelector('.cube');
        //旋转速度
        this.secondControl = document.querySelector('#secondControl');
        //暂停按钮
        this.btnStop = document.querySelector('#btnStop');
        //闭合按钮
        this.btnClose = document.querySelector('#btnClose');

        this.big_block = document.querySelectorAll('.big_block');
        this.btnMusic = document.querySelector('#btnMusic');
        this.audio = document.querySelector('#music');
       
        //上下前后左右
        this.big_block[0].style.cssText = "transform: rotateX(90deg) translate(-102px,0px) translateZ(302px);";
        this.big_block[1].style.cssText = " transform: rotateX(-90deg) translate(-102px,0px) translateZ(102px);";
        this.big_block[2].style.cssText = "transform:  translate(-102px,-102px) translateZ(202px);";
        this.big_block[3].style.cssText = " transform: translate(-102px,-102px) translateZ(-202px);";
        this.big_block[4].style.cssText = "transform:  rotateY(90deg)  translate(0px,-102px) translateZ(102px);";
        this.big_block[5].style.cssText = "transform:  rotateY(-90deg) translate(0, -102px) translateZ(302px);";
        this.initTransform = [];

        // 初始化
        this.init();
    };
    CubeTurn.prototype = {
        init: function() {
            var _this = this;
            this.event();
            this.initSelectOption();
            setTimeout(function() {
                _this.splitBlock();
            }, 1000);
        },
        setStyle: function(dom, objStyle) {
            for (var k in objStyle) {
                dom.style[k] = objStyle[k];
            }
        },
        extend: function(obj, obj2) {
            for (var k in obj2) {
                obj[k] = obj2[k];
            }
            return obj;
        },
        splitBlock: function() {

            for (var b of this.big_block) {
                this.initTransform.push(b.style.cssText);
                var item = b.style.cssText.split('translateZ(');
                var snap_item = item[0];
                item = item[1].split('px');
                var translateZNum = parseInt(item[0]) > 0 ? parseInt(item[0]) + 150 : -(-parseInt(item[0]) + 150);
                b.style.cssText = snap_item + 'translateZ(' + translateZNum + 'px)';
            }

        },
        initSelectOption: function() {
            this.secondControl.options[2].selected = true;
        },
        event: function() {
            var _this = this;
            this.wapControl.addEventListener('change', function() {
                //获取选中项的索引
                var index = _this.wapControl.selectedIndex;
                // //获取选中项的value值
                var value = _this.wapControl.options[index].value;
                if (value === '00') {
                    console.log(_this.cube.style)
                    _this.cube.style.animationName = "yRotate"
                } else if (value === '11') {
                    _this.cube.style.animationName = "xRotate"
                }
            })
            this.secondControl.addEventListener('change', function() {
                //获取选中项的索引
                var index = _this.secondControl.selectedIndex;
                // //获取选中项的value值
                var value = _this.secondControl.options[index].value;
                _this.cube.style.animationDuration = value + "s"
            })
            this.btnStop.addEventListener('click', function() {
                var buttonText = _this.btnStop.innerHTML;
                if (buttonText && buttonText === "播放") {
                    _this.cube.style.animationPlayState = "running";
                    _this.btnStop.innerHTML = "暂停";
                } else {
                    _this.cube.style.animationPlayState = "paused";
                    _this.btnStop.innerHTML = "播放";
                }

            })
            this.btnClose.addEventListener('click', function() {
                var buttonText = _this.btnClose.innerHTML;
                if (buttonText && buttonText === "闭合") {
                    for (var i = 0; i < _this.big_block.length; i++) {
                        _this.big_block[i].style.cssText = _this.initTransform[i];
                    }
                    _this.btnClose.innerHTML = "撑开";
                } else {
                    _this.splitBlock();
                    _this.btnClose.innerHTML = "闭合";
                }

            })
            this.btnMusic.addEventListener('click', function() {
                var buttonText = _this.btnMusic.innerHTML;
                if (buttonText && buttonText === "暂停") {
                    _this.audio.pause();
                    _this.btnMusic.innerHTML = "播放";
                } else {
                    _this.audio.play();
                    _this.btnMusic.innerHTML = "暂停";
                }
            })

        },
    };

    // 暴露方法
    window.CubeTurn = CubeTurn;
}(window, document));