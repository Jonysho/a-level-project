Array.from(document.querySelectorAll('#LoginPage input')).reduce((acc,input)=>({...acc, [input.id]: input.value }), {}); 
document.addEventListener('DOMContentLoaded', function(e){
    document.querySelector('#LoginPage submit').onclick = function(){
        alert("hello")
    }

})