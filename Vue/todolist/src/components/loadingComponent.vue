<template>
    <div class="progress" >
        <span></span>
        <span>加载中，请稍后</span>
    </div>
</template>
 
<script>
    
</script>

<style>
    .progress{
        height: px2rem(81);
        text-align: center;
        margin-top: px2rem(12);
    }
    span{
        display: inline-block;
        vertical-align: middle;
        
    }
    span:nth-child(1){
        width: px2rem(60);
        height: px2rem(60);
        background:url('../assets/progress.png') no-repeat center;
        background-size: 100% 100%;
        margin-right: px2rem(25);
        animation:rotation 1.5s linear infinite;
        -webkit-animation:rotation 1.5s linear infinite;
        -moz-animation:rotation 1.5s linear infinite;
    }
    @keyframes rotation {
        0% {transform:rotate(0deg);}
        100% {transform:rotate(360deg);}
    }
    @-webkit-keyframes rotation {
        0% {-webkit-transform:rotate(0deg);}
        100% {-webkit-transform:rotate(360deg);}
    }
    @-moz-keyframes rotation {
        0% {-moz-transform:rotate(0deg);}
        100% {-moz-transform:rotate(360deg);}
    }
</style>
