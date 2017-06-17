;(function () {
    let $box = $('.box');
    $box.mousemove((e) => {
        let discount = .2;
        let mx = e.offsetX * discount;
        let my = e.offsetY * discount;
        $('img').css({
            "transform": `rotateX(${mx}deg) rotateY(${my}deg)`
        });
        $('.box').css({
            "transform": `rotateX(${mx}deg) rotateY(${my}deg)`
        })
    });
    $box.mouseleave(() => {
        $('img').css({
            "transform": `rotateX(0deg) rotateY(0deg)`
        });
        $('.box').css({
            "transform": `rotateX(0deg) rotateY(0deg)`
        })
    })
})();
