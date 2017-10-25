{"JoinUSlnfs":[
	{"name":1,"phone":1,"col":1,"num":1,"major":1},
	{"name":1,"phone":1,"col":1,"num":1,"major":1},
	{"name":1,"phone":1,"col":1,"num":1,"major":1},
	{"name":1,"phone":1,"col":1,"num":1,"major":2},
	{"name":1,"phone":1,"col":1,"num":1,"major":1},
	{"name":1,"phone":1,"col":1,"num":1,"major":1},
	{"name":1,"phone":1,"col":1,"num":1,"major":1},
	{"name":1,"phone":1,"col":1,"num":1,"major":1},
	{"name":1,"phone":1,"col":1,"num":1,"major":1},
	{"name":1,"phone":1,"col":1,"num":1,"major":1},
	{"name":1,"phone":1,"col":1,"num":1,"major":1},
	{"name":1,"phone":1,"col":1,"num":1,"major":1},
	{"name":sd,"phone":asd,"col":sad,"num":asd,"major":sad}
]}

	var string = '';
  	var stringB = '';
  	var wordText1=new Array;
  	var wordFile1=new Array;
  	var add;
  	var he;
  	var num2;
  	string+='<input type="text" class="gra">';
  	stringB+='<input type="file" name="uploadph" class="grb">';
    $('.graduate_year li').click(function(){
        $('.graduate_work span').hide();
        num2 = $(this).index();
       
        $('.graduate_work li')
                      .css('display','none');
        $('.graduate_work li').eq(num2)
                      .css('display','block');
       
        
        $('.use table').css('display','none');
        $('.gra_tab').eq(0).css('display','block');
        $('.graduate_left').click(function(){
          for(var x=0;x<granum[num2];x++){
            if($('.use table').eq(x).css('display')=='block'){
              get=x;
              break;
            }
          }
          if(x!=0){
            $('.use table').css('display','none');
            $('.use table').eq(x-1).css('display','block');
          }else{
            alert("已经是第一页！");
          }
        })
        $('.graduate_right').click(function(){
          for(var x=0;x<granum[num2];x++){
            if($('.use table').eq(x).css('display')=='block'){
              get=x;
              break;
            }
          }
          if(x!=granum[num2]-1){
            $('.use table').css('display','none');
            $('.use table').eq(x+1).css('display','block');
          }else{
            alert("已经是最后一页！");
          }
        })
        $('.operation .editor').click(function(){
          if(num2==0){
            for(var a=0;a<7;a++){ 
                wordText1[a]=$('.left').eq(a).html();
                $('.left').eq(a).html(string);
                $('.left').eq(a).children('input').val(wordText1[a]);
            }
            for(var a=0;a<7;a++){
                wordFile1[a]=$('.right').eq(a).html();
                $('.right').eq(a).html(stringB);    
            }
          }else if(num2==1){
            for(var a=0;a<7;a++){
                wordText1[a]=$('.left1').eq(a).html();
                $('.left1').eq(a).html(string);
                $('.left1').eq(a).children('input').val(wordText1[a]);
            }
            for(var a=0;a<7;a++){
                wordFile1[a]=$('.right1').eq(a).html();
                $('.right1').eq(a).html(stringB);   
                $('.right1').eq(a).children('input').val(wordFile1[a]);

            }
          }else if(num2==2){
            for(var a=0;a<7;a++){
                wordText1[a]=$('.left2').eq(a).html();
                $('.left2').eq(a).html(string);
                $('.left2').eq(a).children('input').val(wordText1[a]);
            }
            for(var a=0;a<7;a++){
                wordFile1[a]=$('.right2').eq(a).html();
                $('.right2').eq(a).html(stringB);   
                $('.right2').eq(a).children('input').val(wordFile1[a]);
            }
          } else if(num2==3){
            for(var a=0;a<7;a++){
                wordText1[a]=$('.left3').eq(a).html();
                $('.left3').eq(a).html(string);
                 $('.left3').eq(a).children('input').val(wordText1[a]);
            }
            for(var a=0;a<7;a++){
               wordFile1[a]=$('.right3').eq(a).html();
                $('.right3').eq(a).html(stringB);   
               $('.right3').eq(a).children('input').val(wordFile1[a]);
            }
          }    
        });
        
        $('.operation .save').click(function(){
          if(num2==0){
            for(var c=0;c<7;c++){
                var text;
                text=$('.left').eq(c).children('input')
                    .val();
                $('.left').eq(c).html(text);         
             } 
           for(var d=0;d<7;d++){
                var he=$('.right').eq(d).children('input').val();
                $('.right').eq(d).html(he);
            }
          }else if(num2==1){
            for(var c=0;c<7;c++){
                var text;
                text=$('.left1').eq(c).children('input')
                    .val();
                $('.left1').eq(c).html(text);         
             } 
            for(var d=0;d<7;d++){
                var he=$('.right1').eq(d).children('input').val();
                $('.right1').eq(d).html(he);
            }
          }
          else if(num2==2){
            for(var c=0;c<7;c++){
                var text;
                text=$('.left2').eq(c).children('input')
                    .val();
                $('.left2').eq(c).html(text);         
             } 
            for(var d=0;d<7;d++){
                var he=$('.right2').eq(d).children('input').val();
                $('.right2').eq(d).html(he);
            }
          }
          else if(num2==3){
            for(var c=0;c<7;c++){
                var text;
                text=$('.left3').eq(c).children('input')
                    .val();
                $('.left3').eq(c).html(text);         
             } 
            for(var d=0;d<7;d++){
                var he=$('.right3').eq(d).children('input').val();
                $('.right3').eq(d).html(he);
            }
          }
          $('.gra').css('display','none');
          $('.grb').css('display','none'); 
          var jsonArr = new Array();

          for(var x=0;x<7;x++){
             if($('.left').eq(x).html()==""){
              break;
             }
             var jsonObj = {};                
                  jsonObj["graduateNo"]=$('.left').eq(x).html();                 
                  jsonObj["graduateServlet"]=$('.graduate_year a').eq(0).html();                 
                  jsonObj["graduatePhoto"]=$('.right').eq(x).html();                                
                  jsonArr.push(jsonObj);
          }
          for(var x=0;x<7;x++){
            if($('.left1').eq(x).html()==""){
              break;
             }
             var jsonObj = {};                
                  jsonObj["graduateNo"]=$('.left1').eq(x).html();                 
                  jsonObj["graduateServlet"]=$('.graduate_year a').eq(1).html();                 
                  jsonObj["graduatePhoto"]=$('.right1').eq(x).html();                                
                  jsonArr.push(jsonObj);
          }
          for(var x=0;x<7;x++){
            if($('.left2').eq(x).html()==""){
              break;
             }
             var jsonObj = {};                
                  jsonObj["graduateNo"]=$('.left2').eq(x).html();                 
                  jsonObj["graduateServlet"]=$('.graduate_year a').eq(2).html();                 
                  jsonObj["graduatePhoto"]=$('.right2').eq(x).html();                                
                  jsonArr.push(jsonObj);
          }
          for(var x=0;x<7;x++){
            if($('.left3').eq(x).html()==""){
              break;
             }
             var jsonObj = {};                
                  jsonObj["graduateNo"]=$('.left3').eq(x).html();                 
                  jsonObj["graduateServlet"]=$('.graduate_year a').eq(3).html();                 
                  jsonObj["graduatePhone"]=$('.right3').eq(x).html();                                
                  jsonArr.push(jsonObj);
          }
          //var JsonArr=jsonArr.parse();
          console.log(jsonArr);
          var data = {
        		  jsonArr: jsonArr
          };
//          Json=jsonArr.toString();
          
          console.log(jsonArr[0]);
          alert(jsonArr);
          var JSONArr =JSON.stringify(jsonArr);
          console.log(JSONArr);
            $.ajax({
              url:"GraduateServlet",
              data:{
            	  jsonArr:JSONArr
            	//  jsonArr:jsonArr
              },
              type:"POST",
              dataType:"JSON",
              success:function(data){
            	  alert(1);
                  },
              error: function(){
            	  alert(2);
              }
            })
       });
   });
    $('.graduate_work li').hide();
    
//    for(var x=0;x<4;x++){
//      var addw=2010+x;
      var granum = new Array; 
      var string_lit = new Array;
      var graNum;
      $.ajax({
              type:"POST",
              url:'getGraduate?graduateYear='+2010,
              data:{
                  //
              },
              dataType:'JSON',
              success :function(data){
            	  
            	  var stringc = '';
            	  var gra_str = '';
//                  var string_lit = new Array;
                        granum[0] = data.graduate.length;
                        //$('.use table').css("display","none");
                        graNum = Math.ceil(granum[0]/7);
                        for(var i = 0;i<7;i++){
                         gra_str += '<tr>'+'<td class="left">'+'</td>'+'<td class="right">'+'</td>'+'</tr>';
                        }
                        for(var i=0;i<graNum;i++){
                          stringc += '<table border="1" class="gra_tab" >'
                          +'<tr>'+'<th>'+'编号'+'</th>'+'<th>'+'图片地址'+'</th>'
                          +gra_str
                          +'</table>';
                        }
                        $('.use').eq(0).html(stringc);
//                        console.log($('.use').eq(0));
                        for(var j=0,h=j+1;j<data.graduate.length;j++,h++){
                        
                          $('.left').eq(j).html(h);
                          $('.right').eq(j).html(data.graduate[j]);

                        }   
              }
          })
          $.ajax({
              type:"POST",
              url:'getGraduate?graduateYear='+2011,
              data:{
                  //
              },
              dataType:'JSON',
              success :function(data){
            	  var stringc = '';
            	  var gra_str1 = '';
//                  var string_lit = new Array;
//                     if(x==0){	
                granum[1] = data.graduate.length;
               graNum = Math.ceil(granum[1]/7);
               for(var i = 0;i<7;i++){
            	  gra_str1 += '<tr>'+'<td class="left1">'+'</td>'+'<td class="right1">'+'</td>'+'</tr>';
               }
                for(var i=0;i<graNum;i++){
                  stringc += '<table border="1" class="gra_tab" >'
                  +'<tr>'+'<th>'+'编号'+'</th>'+'<th>'+'图片地址'+'</th>'
                  +gra_str1
                  +'</table>';
                  console.log(3);
                }
                $('.use').eq(1).html(stringc);
            	  for(var j=0,h=j+1;j<data.graduate.length;j++,h++){
                    $('.left1').eq(j).html(h);
                    $('.right1').eq(j).html(data.graduate[j]);
                  }
              }
          })
          $.ajax({
              type:"POST",
              url:'getGraduate?graduateYear='+2012,
              data:{
                  //
              },
              dataType:'JSON',
              success :function(data){
            	  var stringc = '';
            	  var gra_str2 = '';
//                  var string_lit = new Array;
                    granum[2] = data.graduate.length;          	 
                    graNum = Math.ceil(granum[2]/7);
                   for(var i = 0;i<7;i++){ 
                      gra_str2 += '<tr>'+'<td class="left2">'+'</td>'+'<td class="right2">'+'</td>'+'</tr>';
                   } 
                   console.log(string_lit[2]);
                    for(var i=0;i<graNum;i++){
                      stringc += '<table border="1" class="gra_tab" >'
                      +'<tr>'+'<th>'+'编号'+'</th>'+'<th>'+'图片地址'+'</th>'
                      +gra_str2
                      +'</table>';
                    }
                    $('.use').eq(2).html(stringc);
                    for(var j=0,h=j+1;j<data.graduate.length;j++,h++){
                    $('.left2').eq(j).html(h);
                    $('.right2').eq(j).html(data.graduate[j]);
                  }
              }
          })
          $.ajax({
              type:"POST",
              url:'getGraduate?graduateYear='+2013,
              data:{
                  //
              },
              dataType:'JSON',
              success :function(data){
            	  var stringc = '';
            	  var gra_str3 = '';
            	  
//                  var string_lit = new Array;
                granum[3] = data.graduate.length;	
                graNum = Math.ceil(granum[3]/7);
//                
                for(var i = 0;i<7;i++){
                 gra_str3 += '<tr>'+'<td class="left3">'+'</td>'+'<td class="right3">'+'</td>'+'</tr>';
                }
                for(var i=0;i<graNum;i++){
                  stringc += '<table border="1" class="gra_tab" >'
                  +'<tr>'+'<th>'+'编号'+'</th>'+'<th>'+'图片地址'+'</th>'
                  +gra_str3
                  +'</table>';
                }
                $('.use').eq(3).html(stringc);
            	  for(var j=0,h=j+1;j<data.graduate.length;j++,h++){
                    $('.left3').eq(j).html(h);
                    $('.right3').eq(j).html(data.graduate[j]);
                  }
              }
          })