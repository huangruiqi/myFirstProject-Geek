$(document).ready(function(){
	$('.button').click(function(){
		checklogin();
	});
});	
	function checklogin(){
		if($('#txtusername').val() == ''){
			alert("用户名不能为空！");
			$('#txtusername').focus();
			return false;
		}else{
			//$('#msguser').html('');
		}
		if($('#txtpassword').val() == ''){
			alert("密码不能为空！");
			$('#txtpassword').focus();
			return false;
		}else{
			//$('#msgpwd').html('');
		}
		alert($('#txtusername').val());
	 $.ajax({
		 url:'Login?username='+$('#txtusername').val()+'&&password='+$('#txtpassword').val(),
	 		type:"POST",
	 		dataType:'JSON',
	 		data:{
	 			//
	 		},
	 		success:function(data){
	 			if(data == "1"){
	 				alert("登陆成功！");
	 				$(location).attr('href', 
	 					'back_end/back_end.html');
	 				return true;
	 			}
	 			else{
	 				alert("请确保填写正确！");
	 				return false;
	 			}
	 		},
	 		error:function(){
	 			alert(3);
	 		}
	 	})
	}