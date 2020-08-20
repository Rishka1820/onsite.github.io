const canvas =document.getElementById('canvas')
const ctx= canvas.getContext('2d')
canvas.width=window.innerWidth*3/4
canvas.height=window.innerHeight*2/3
 
let drawing=false
document.querySelector('#clear').addEventListener('click',e=>{
    console.log('clear')
  ctx.clearRect(0,0,canvas.width,canvas.height)
})

document.querySelectorAll('[data-command]').forEach(icon => {
icon.addEventListener('click' ,e=>{
    let command=icon.getAttribute("data-command")
    
    if(command==='download'){
        
        
        var image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
        var link = document.createElement('a');
        link.download = "my-image.png";
        link.href = image;
        link.click();
    }
})});


document.querySelectorAll('[data-tool]').forEach(icon => {
icon.addEventListener('click' ,e=>{
   let activated= document.querySelector("[data-tool].active")
   if(activated && icon !== activated){
       activated.classList.toggle('active')
    }
    icon.classList.toggle("active")
   let selectedTool= icon.getAttribute('data-tool')
     
    
})})  


document.querySelectorAll('[data-line-width]').forEach(icon => {
icon.addEventListener('click' ,e=>{
  
    let activated= document.querySelector("[data-line-width].active")
    if(activated && icon!==activated){
        activated.classList.toggle('active')
     }
     icon.classList.toggle("active")
   
})})  


function start(e){
    var iniy=e.clientX;
    var inix=e.clientX
     drawing= true
     draw(e ,iniy,inix)
 }
 function end(){
     drawing= false
     ctx.beginPath()
    
 }
function draw(e,inix,iniy){
    
    var rect = canvas.getBoundingClientRect();
let selected=document.querySelector("[data-tool].active")
console.log(selected)
    let color= document.getElementById('color').value
    let lineWidth=document.querySelector("[data-line-width].active").title
    
    if(!drawing){return}
   if(selected.getAttribute('data-tool')=='brush'){
    ctx.lineWidth=lineWidth
    ctx.strokeStyle= color
    ctx.lineTo(e.clientX-rect.left,e.clientY-rect.top)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(e.clientX-rect.left,e.clientY-rect.top)
   }
   if(selected.getAttribute('data-tool')=='pen'){
    ctx.lineWidth=lineWidth*0.5
    ctx.strokeStyle= color
    ctx.lineTo(e.clientX-rect.left,e.clientY-rect.top)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(e.clientX-rect.left,e.clientY-rect.top)
   }
   if(selected.getAttribute('data-tool')=='eraser'){
       ctx.clearRect(e.clientX-rect.left,e.clientY-rect.top,lineWidth*2,lineWidth*2)
       
   } 
   if(selected.getAttribute('data-tool')=='rectangle'){
    ctx.beginPath()
    ctx.lineWidth=lineWidth*0.5
    ctx.strokeStyle= color
    ctx.rect(inix,iniy,e.clientX-rect.left-inix,e.clientY-rect.top-iniy)
    ctx.stroke()
    ctx.beginPath()

    
    
     
   }
}
canvas.addEventListener("mousedown",start)
canvas.addEventListener('mouseup',end)
canvas.addEventListener('mousemove',draw)



