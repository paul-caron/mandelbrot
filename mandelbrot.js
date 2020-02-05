//author Paul Caron


//number of pixels in a row
const divisions=360;
let canvas;
let ctx;
let w,h;
let irange;
let rrange;
let zoom=1;
let hor=0;
let vert=0;
function start(){
    let istart=-4/zoom+vert;
    let iend=4/zoom+vert;
    irange=iend-istart;
    let rstart=-4/zoom+hor;
    let rend=4/zoom+hor;
    rrange=rend-rstart;
    canvas=document.getElementById("canvas");
    canvas.width=w=Math.min(innerWidth,innerHeight);
    canvas.height=h=w;
    ctx=canvas.getContext("2d");
    iinc=irange/divisions;
    rinc=rrange/divisions;
    for(let i=istart;i<iend;i+=iinc){
        for(let r=rstart;r<rend;r+=rinc){
            mandelbrot(new Complex(r,i))
        }
    }
}

function mandelbrot(c){
    let z = new Complex(0,0);
    for(var a=0;a<100;a+=1){
        if(z.r*z.r+z.i*z.i>4)
            break;
        z=add(square(z),c);
    }
    ctx.fillStyle="hsl("+(a*36)%360+",100%,50%)";
    ctx.fillRect((c.r-hor)*w/rrange+w/2,(c.i-vert)*w/irange+h/2,w/divisions,h/divisions*2);
}


//Construction of complex imaginary number object
function Complex(r,i){//real, imaginary
    this.r = r;
    this.i = i;
}
function add(c1,c2){//add complex numbers
    const r = c1.r+c2.r;
    const i = c1.i+c2.i;
    return new Complex(r,i);
}

function square(z){//complex number square
    const r = z.r*z.r - z.i*z.i;
    const i = 2*z.r*z.i;
    return new Complex(r,i);
}

