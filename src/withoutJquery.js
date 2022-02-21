'use strict';

Object.defineProperty(HTMLElement.prototype,"wJFadeIn",{
    configurable:true,
    enumerable:false,
    writable:true,
    value:function(d,tf){
        //default arg
        if(!d)d=300;
        if(!tf)tf="linear";
        if(window.getComputedStyle(this).display!=="none") return;
        if(this.style.display==="none"){
            this.style.display="";
        }
        else{
            this.style.display="block";
            this.style.opacity=0;
        }
        let start=performance.now();
        requestAnimationFrame(function animation(timestamp){
            let easing=undefined;
            let progress=(timestamp-start);
            switch(tf){
                case "linear":
                    easing=progress/d;
                    break;
                case "easeIn":
                    easing=1-Math.cos((progress*Math.PI)/2);
                    break;
                case "easeOut":
                    easing=Math.sin((progress*Math.PI)/2);
                    break;
                case "easeInOut":
                    easing=((Math.cos(Math.PI*progress)-1)/2)*-1;
                    break;
                default:
                    break;
            };
            this.style.opacity=Math.min(easing,1);
            if(easing<1)requestAnimationFrame(animation);
            else this.style.opacity="";
        });
    }
});
function withoutJquery(){
    this.accordion=function(){
        this.close=function(e,d,tf){
            //default arg
            if(!d)d=300;
            if(!tf)tf="ease";
            e.style.height=e.offsetHeight+"px";
            e.offsetHeight;
            e.style.transitionProperty="height,margin,padding";
            e.style.transitionDuration=d+"ms";
            e.style.transitionTimingFunction=tf;
            e.style.overflow="hidden";
            e.style.height=0;
            e.style.paddingTop=0;
            e.style.marginTop=0;
            e.style.paddingBottom=0;
            e.style.marginBottom=0;
            setTimeout(function(){
                e.style.display="none";
                e.style.removeProperty("height");
                e.style.removeProperty("padding-top");
                e.style.removeProperty("padding-bottom");
                e.style.removeProperty("margin-top");
                e.style.removeProperty("margin-bottom");
                e.style.removeProperty("overflow");
                e.style.removeProperty("transition-duration");
                e.style.removeProperty("transition-property");
                e.style.removeProperty("transition-timing-function");
            },d);
        };
        this.open=function(e,d,tf){
            //default arg
            if(!d)d=300;
            if(!tf)tf="ease";
            e.style.removeProperty("display");
            let s=window.getComputedStyle(e).display;
            if(s==="none")s="block";
            e.style.display=s;
            const h=e.offsetHeight;
            e.style.height=0;
            e.style.paddingTop=0;
            e.style.marginTop=0;
            e.style.paddingBottom=0;
            e.style.marginBottom=0;
            e.offsetHeight;
            e.style.transitionProperty="height,margin,padding";
            e.style.transitionDuration=d+"ms";
            e.style.transitionTimingFunction=tf;
            e.style.overflow="hidden";
            e.style.height=h+"px";
            e.style.removeProperty("padding-top");
            e.style.removeProperty("padding-bottom");
            e.style.removeProperty("margin-top");
            e.style.removeProperty("margin-bottom");
            setTimeout(function(){
                e.style.removeProperty("height");
                e.style.removeProperty("overflow");
                e.style.removeProperty("transition-duration");
                e.style.removeProperty("transition-property");
                e.style.removeProperty("transition-timing-function");
            },d);
        };
        this.toggle=function(e,d,tf){
            if(!d)d=300;
            if(!tf)tf="ease";
            if(window.getComputedStyle(e).display==="none")return this.open(e,d,tf);
            else return this.close(e,d,tf);
        };
    };
};