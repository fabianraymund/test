// Dom elements
const section1 = document.getElementById('section1')
const sections = document.querySelectorAll('section')

// Function
function scroll(param) {
    const options={
        threshold: 0,
        rootMargin: '0px'
    }
    const observer = new IntersectionObserver(function(entries,observer){
        entries.forEach(entry=>{
            if(entry.isIntersecting==true){
                entry.target.classList.add("second")
            }
            else{
                entry.target.classList.remove("second")
            }
        })
    },options)

  return  observer.observe(param);
}



sections.forEach(section=>{
    const alldiv = section.querySelectorAll('div');
    alldiv.forEach(div=>{
        if(!div.classList.contains('no')){
            div.classList.add('first')
        }
    
        scroll(div);
    })
   
})
