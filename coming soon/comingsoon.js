
$(function(){

  
  $('#btn-ok').on('click',function(){
   
    if($('#emailadd').val().length === 0){
      alert('Please enter your email to subscribe.');
    }else{
       $(".input-group-lg").css('color', '#f90').html("Thanks for the subscription.");
      $("#myModal").modal("show");
    }
    
    
  });
  
});
