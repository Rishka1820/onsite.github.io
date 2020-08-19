const canvas =document.getElementById('canvas')
const ctx= canvas.getContext('2d')
canvas.width=window.innerWidth
canvas.height=window.innerHeight
 
let drawing=false

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


function start(e,){
     drawing= true
     draw(e)
 }
 function end(){
     drawing= false
     ctx.beginPath()
    
 }
function draw(e){
let selected=document.querySelector("[data-tool].active")
console.log(selected)
    let color= document.getElementById('color').value
    let lineWidth=document.querySelector("[data-line-width].active").title
    let rect= canvas.getBoundingClientRect();
    if(!drawing){return}
   if(selected.getAttribute('data-tool')=='brush'){
    ctx.lineWidth=lineWidth
    ctx.strokeStyle= color
    ctx.lineTo(e.clientX-10,e.clientY-20)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(e.clientX-10,e.clientY-20)
   }
   if(selected.getAttribute('data-tool')=='pen'){
    ctx.lineWidth=lineWidth*0.5
    ctx.strokeStyle= color
    ctx.lineTo(e.clientX-10,e.clientY-5)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(e.clientX,e.clientY)
   }
   if(selected.getAttribute('data-tool')=='eraser'){
       ctx.clearRect(e.clientX-rect.left,e.clientY-rect.top,lineWidth*2,lineWidth*2)
       
   } 
   if(selected.getAttribute('data-tool')=='rectangle'){
    ctx.lineWidth=lineWidth*0.5
    ctx.strokeStyle= color
    ctx.beginPath()
    ctx.rect(e.clientX,e.clientY)
    ctx.stroke()
    ctx.beginPath()
    
     
   }
}
canvas.addEventListener("mousedown",start)
canvas.addEventListener('mouseup',end)
canvas.addEventListener('mousemove',draw)


