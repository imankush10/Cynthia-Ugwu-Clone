const scroll = new LocomotiveScroll({
    el: document.querySelector('main'),
    smooth: true
});
let timeout;
let timeout2;

function firstPageAnim() {
    const tl = gsap.timeline();
    tl.from('.nav', {
        y: -10,
        opacity:0,
        duration: 1,
        ease: Expo.easeInOut,
        delay:-0.2,
    })
    
    tl.to('.bounding-elem', {
        y: 0,
        duration:1.2,
        ease: Expo.easeInOut,
        delay:-0.7,
    })
    tl.to('.bounding-elem2', {
        y:0,
        ease:Expo.easeInOut,
        duration:1,
        delay:-0.7,
    })
    tl.from('.page1-footer', {
        opacity:0,
        ease:Expo.easeInOut,
        duration:1,
        delay:-0.3
    })
}
firstPageAnim();

function mouseSkewCursor() {
    let xprev = 0;
    let yprev = 0;
    window.addEventListener('mousemove', function(dets){
        clearTimeout(timeout);
        const scaleX = gsap.utils.clamp(0.7, 1.1, dets.clientX-xprev);
        const scaleY = gsap.utils.clamp(0.7, 1.1, dets.clientY-yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;
        mouseCircleCursor(scaleX, scaleY);

        timeout = setTimeout(() => {
            document.querySelector('.cursor-circle').style.transform = `translate(${dets.clientX-5}px, ${dets.clientY-5}px)`;
        }, 100);
    })
}
mouseSkewCursor();

function mouseCircleCursor(scaleX, scaleY) {
    window.addEventListener('mousemove', function(dets){
        document.querySelector('.cursor-circle').style.display = 'block';
        document.querySelector('.cursor-circle').style.transform = `translate(${dets.clientX-5}px, ${dets.clientY-5}px) scale(${scaleX}, ${scaleY})`;
    })
}

document.querySelectorAll('.box').forEach((elem)=>{
    elem.addEventListener('mouseleave', function(){
        gsap.to(elem.querySelector('img'), {
            opacity:0,
        })
    })
})
document.querySelectorAll('.box').forEach((elem)=>{
    let prevPos = 0;
    elem.addEventListener('mousemove', function(dets){
        clearInterval(timeout2);
        console.log(dets.clientX-250);
        gsap.to(elem.querySelector('img'), {
            opacity:1,
            ease:Power2,
            rotate: gsap.utils.clamp(-20,20,dets.clientX-prevPos) * 0.5,
            top:(dets.clientY - elem.getBoundingClientRect().top)-150,
            x:dets.clientX-250,
            delay:0,
        })
        prevPos=dets.clientX;
        timeout2 = setTimeout(() => {
            gsap.to(elem.querySelector('img'), {
                rotate:0,
                delay:0,
            })
        }, 500);
    })
})