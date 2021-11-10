function second() {   
    let  s="";
    let panjang = document.getElementById('first').value;
    
  
    for (var i=1; i<=panjang;i++) {
        for (var j = 1; j <= panjang; j++) {
            if (j == 1 && i == 1){
                document.getElementById("output").innerText +=  " * ";
            } else if(j == panjang && i == 1){
                document.getElementById("output").innerText +=  " * ";
            } else if(j == 1 && i == panjang){
                document.getElementById("output").innerText +=  " * ";
            } else if(j == panjang && i == 1){
                document.getElementById("output").innerText +=  " * ";
            } else if(j == (panjang/2)+0.5 && i == (panjang/2)+0.5 && j% i == 0){
                document.getElementById("output").innerText +=  " # ";
             }  else if (i == (panjang/2)+0.5 || j == (panjang/2)+0.5) { 
                document.getElementById("output").innerText +=  " * ";
             }  else {
                document.getElementById("output").innerText +=  " # ";
             }
               
        } 
        document.getElementById("output").innerText +=  " \n ";
      
  
  
  
    }
  }
            
            
        
    
    