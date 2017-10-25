$(document).ready(function () {
	//页面滚动，导航自动变换
	$(window).scroll(function(){
		var wst = $(window).scrollTop();
		var nav_num = Math.floor(wst/600);
			$('.nav li').eq(nav_num)
						.addClass('nav1')
						.siblings()
						.removeClass('nav1');
	});
	//导航点击特效
	$('.nav li').click(function(){
		$(this).addClass('nav1')
			   .siblings()
			   .removeClass('nav1');
	});
//上传照片预览
	$('.scroll_photo li').click(function(){
    $(this).find('input').change(function(){
      var objURL = getObjectURL(this.files[0]);
      if(objURL){
        $(this).parent('form').siblings('.photo').attr('src',objURL);
      }
    })
  });

  $('.member li,.work_wrapper li').click(function(){
    $(this).find('input').change(function(){
      var objURL = getObjectURL(this.files[0]);
      if(objURL){
        $(this).parent('form').siblings('img').attr('src',objURL);
      }
    })
  });


//建立一个可以获取file的URL的函数
	function getObjectURL(file){
 	 var url = null;
 	 if(window.createObjectURL !=undefined) {
 	 	url = window.createObjectURL(file);
 	 }else if(window.URL!=undefined) {
 	 		url = window.URL.createObjectURL(file);
 	 	}else if(window.webkitURL!=undefined){
 	 		url = window.wekitURL.createObjectURL(file);
 	 	}
 	 	return url;
 	}

//更改文字
   $('.introduce .editor').click(function(){
   		
   		$(this).siblings('.introduce_word')
   			   .css('display','none');
   		$(this).siblings('textarea')
   			   .css('display','block');

   })
   $('.introduce .save').click(function(){
   		var text = $(this).siblings('textarea')
   						  .val();
   		$(this).siblings('textarea')
   			   .css('display','none');
   		$(this).siblings('.introduce_word')
   			   .css('display','block');
   		$(this).siblings('.introduce_word')
   			   .html(text);
   });
//轮播删除
  $('.scroll_photo li').hover(function(){
    // var num3 = $(this).index();
    // alert(num3);
    
    $(this).children('.close')
         .css('display','block');
    $(this).siblings().children('.close')
         .css('display','none');
    });


 //轮播添加
  $('.addinphoto').change(function(){
    var addinphoto = $('.scroll_photo li:last-child').clone(true);  
    var objURL = getObjectURL(this.files[0]);
    var value_number = $('.scroll_photo li').length+1;
    if(objURL){

      $(addinphoto).find('input:first').attr('value',value_number);
      $(addinphoto).find('.photo').attr('src',objURL);
    }
    $('.scroll_photo').append(addinphoto);    
  });
  //轮播交互
  $('.scroll_photo li').children('.save').click(function(){
    var num = $(this).parent('li').index()+1;
    var scroll = $(this).siblings('#scroll_form')[0];
    // console.log($(this).siblings('#scroll_form')[0]);
    var scroll_form = new FormData(scroll);
    //alert(scroll_form);
    $.ajax({
      type:'POST',
      url:'CarouselServlet',
//      url:'http://rapapi.org/mockjsdata/25235/CarouselServlet',
      data:scroll_form,
      processData:false,
      contentType:false,
      success: function(data){
        console.log(1);
      }
    })
  });


//成员展示图片交互
  $('.member li').children('.save').click(function(){
    var num = $(this).parent('li').index()+1;
    var member_form = $(this).siblings('form')[0];
    // console.log($(this).siblings('form')[0]);
    var member_from = new FormData(member_form);
    //alert(member_from);
    $.ajax({
      type:'POST',
        url:'MemberServlet',
      // url:'http://rapapi.org/mockjsdata/25235/CarouselServlet',
      data:member_from,
      processData:false,
      contentType:false,
      success: function(data){
        console.log(1);
      }
    })
  });


//成员展示文字交互
  $('.introduce li').children('.save').click(function(){
    var num = $(this).parent('li').index()+1;
    var introduce_note = $(this).siblings('textarea').val();
    //alert(introduce_note);
    $.ajax({
      type:"POST",
      //url:'http://rapapi.org/mockjsdata/25235/CarouselServlet',
      url:'MemberTextServlet',
      data:{memberno:num,memberText:introduce_note},
      processData:false,
      contentType:false,
      success:function(){
        console.log(1);
      }
    })
  });

 //成果展示交互
  $('.work_wrapper li').children('.save').click(function(){
    var num = $(this).parent('li').index()+1;
    var work_form = $(this).siblings('form')[0];
    var work_photo = new FormData(work_form);
    //alert(work_photo);
    $.ajax({
      type:"POST",
      // url:'http://rapapi.org/mockjsdata/25235/CarouselServlet',
        url:"Achievement",
      data:work_photo,
      processData:false,
      contentType:false,
      success:function(){
        console.log(1);
      }
    })
    });

//轮播删除数据
  $('.close').click(function(){
    var confirm_ = confirm("确定删除么？")
    if(confirm_){
    $(this).parent('.scroll_photo li')
         .css('display','none');


// //轮播删除交互
    var deletephoto = $(this).parent('li');  
    var no =$(this).siblings('form').children('input:first').val();
      $.ajax({
        type:"POST",
          url:"RemoveCarousel?no="+no,
        //url:'http://rapapi.org/mockjsdata/25235/CarouselServlet',
        //data:no,
        success:function(){
        deletephoto.remove();
        console.log(1);
        }
      })
//轮播序号更新 
    var scroll_num = $('.scroll_photo li').length;
    for(var i=0;i<scroll_num;i++){
    $('.scroll_photo li').eq(i+1)
               .find('input:first')
               .attr('value',i+1);
  } 
      }
});



//ajax前端后台同步
//轮播同步 
  $.ajax({
    type:"POST",
    url:"getPhotoServlet",
    dataType:"json",
    success:function(content){
      var num = content.photo.length;
      for(var i=0;i<num;i++){
        $('.scroll_photo li').eq(i)
                   .find('img:last')
                   .attr('src',content.photo[i]);
      }
    },
    error:function(){
      //alert('请求失败');
    }
  })
  
//成员展示图片同步
  $.ajax({
    type:"POST",
    url:"getMemberPhotos",
    dataType:"json",
    success:function(content){
      var num = content.getMemberPhotos.length;
      for(var i=0;i<num;i++){
        $('.member li').eq(i)
                   .find('img:last')
                   .attr('src',content.getMemberPhotos[i]);
      }
    },
    error:function(){
      //alert('请求失败');
    }
  })

//成果展示文字同步
  $.ajax({
    type:"POST",
    url:"getMemberTexts",
    dataType:"json",
    success:function(content){
      for(var i=0;i<content.getMemberTexts.length;i++){
        $('.introduce li').eq(i).children('.introduce_word')
                  .html(content.getMemberTexts[i]);
      }
    },
    error:function(){
     // alert('请求失败');
    }
  })

//成果展示图片同步
  $.ajax({
    type:"POST",
    url:"getAchievement",
    dataType:"json",
    success:function(content){
      for(var i=0;i<content.achPhotos.length;i++){
        $('.work_wrapper li').eq(i)
                   .find('img')
                   .attr('src',content.achPhotos[i]);
            }
      },error:function(){
      alert('请求失败');
    }
  })
//毕业去向文字编辑
    var string = '';
    var stringB = '';
    var add;
    var he;
    var num2;//当前年份页数
    string = '<input type="text" class="gra">';
    stringB = '<input type="file" name="uploadph" class="grb">';
    $('.graduate_year li').click(function(){
        $('.graduate_work span').hide();
        num2 = $(this).index();
        $('.graduate_work li').css('display','none');
        $('.graduate_work li').eq(num2).css('display','block');
        $('.use table').css('display','none');
        $('.use').eq(num2).find('table').eq(0).css('display','block');
        $('.graduate_left').click(function(){
            for(var x = 0;x < graNum;x++){
                if($('.use').eq(num2).find('table').eq(x).css('display') == 'block'){
                    get = x;
                    break;
                }
            }
            if(x != 0){
                $('.use').eq(num2).find('table').css('display','none');
                $('.use').eq(num2).find('table').eq(x - 1).css('display','block');
            }else{
                alert("已经是第一页！");
            }
        });
        $('.graduate_right').click(function(){
            for(var x = 0;x < graNum;x++){
                if($('.use').eq(num2).find('table').eq(x).css('display') == 'block'){
                  get = x;
                  break;
                }
            }
            if(x != graNum - 1){
                $('.use').eq(num2).find('table').css('display','none');
                $('.use').eq(num2).find('table').eq(x + 1).css('display','block');
            }else{
              alert("已经是最后一页！");
            }
        });
        $('.operation .editor').click(function(){
            if(num2 == 0){
                var wordText1 = new Array;
                var wordFile1 = new Array;
                for(var a = 0;a < 7;a++){ 
                    wordText1[a] = $('.left').eq(a).html();
                    $('.left').eq(a).html(string);
                    $('.left').eq(a).children('input').val(wordText1[a]);
                }
                for(var a = 0;a < 7;a++){
                    wordFile1[a] = $('.right').eq(a).html();
                    $('.right').eq(a).html(stringB);    
                }
            }else if(num2 == 1){
                var wordText1 = new Array;
                var wordFile1 = new Array;
                for(var a = 0;a < 7;a++){
                    wordText1[a] = $('.left1').eq(a).html();
                    $('.left1').eq(a).html(string);
                    $('.left1').eq(a).children('input').val(wordText1[a]);
                }
                for(var a = 0;a < 7;a++){
                    wordFile1[a] = $('.right1').eq(a).html();
                    $('.right1').eq(a).html(stringB);   
                    // $('.right1').eq(a).children('input').val(wordFile1[a]);

                }
            }else if(num2 == 2){
                var wordText1 = new Array;
                var wordFile1 = new Array;
                for(var a = 0;a < 7;a++){
                    wordText1[a] = $('.left2').eq(a).html();
                    $('.left2').eq(a).html(string);
                    $('.left2').eq(a).children('input').val(wordText1[a]);
                }
                for(var a = 0;a < 7;a++){
                    wordFile1[a] = $('.right2').eq(a).html();
                    $('.right2').eq(a).html(stringB);   
                    // $('.right2').eq(a).children('input').val(wordFile1[a]);
                }
            }else if(num2 == 3){
                var wordText1 = new Array;
                var wordFile1 = new Array;
                for(var a = 0;a < 7;a++){
                    wordText1[a] = $('.left3').eq(a).html();
                    $('.left3').eq(a).html(string);
                    $('.left3').eq(a).children('input').val(wordText1[a]);
                }
                for(var a = 0;a < 7;a++){
                    wordFile1[a] = $('.right3').eq(a).html();
                    $('.right3').eq(a).html(stringB);   
                    // $('.right3').eq(a).children('input').val(wordFile1[a]);
                }
            }    
        });
          
        $('.operation .save').click(function(){
            if(num2 == 0){
                for(var c = 0;c < 7;c++){
                    var text;
                    text = $('.left').eq(c).children('input').val();
                    $('.left').eq(c).html(text);         
                } 
                for(var d = 0;d < 7;d++){
                    var he = $('.right').eq(d).children('input').val();
                    $('.right').eq(d).html(he);
                }
            }else if(num2 == 1){
                for(var c = 0;c < 7;c++){
                    var text;
                    text = $('.left1').eq(c).children('input').val();
                    $('.left1').eq(c).html(text);         
                } 
                for(var d = 0;d < 7;d++){
                    var he = $('.right1').eq(d).children('input').val();
                    $('.right1').eq(d).html(he);
                }
            }else if(num2 == 2){
                for(var c = 0;c < 7;c++){
                    var text;
                    text = $('.left2').eq(c).children('input').val();
                    $('.left2').eq(c).html(text);         
                } 
                for(var d = 0;d < 7;d++){
                    var he = $('.right2').eq(d).children('input').val();
                    $('.right2').eq(d).html(he);
                }
            }else if(num2 == 3){
                for(var c = 0;c < 7;c++){
                    var text;
                    text = $('.left3').eq(c).children('input').val();
                    $('.left3').eq(c).html(text);         
                } 
                for(var d = 0;d < 7;d++){
                    var he = $('.right3').eq(d).children('input').val();
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
  //获取数据
    var granum = new Array; 
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
                granum[0] = data.graduate.length;
                graNum = Math.ceil(granum[0] / 7);
                for(var i = 0;i<7;i++){ 
                    gra_str += '<tr>'+'<td class="left">'+'</td>'+'<td class="right">'+'</td>'+'</tr>';
                }
                for(var i = 0;i < graNum;i++){
                    stringc += '<table border="1" class="gra_tab" >'
                          +'<tr>'+'<th>'+'编号'+'</th>'+'<th>'+'图片地址'+'</th>'
                          +gra_str
                          +'</table>';
                }
                $('.use').eq(0).html(stringc);
                for(var j = 0,h = j + 1;j < data.graduate.length;j++,h++){
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
            var stringd = '';
            var gra_str1 = ''; 
            granum[1] = data.graduate.length;
            graNum = Math.ceil(granum[1] / 7);
            for(var i = 0;i < 7;i++){
                gra_str1 += '<tr>'+'<td class="left1">'+'</td>'+'<td class="right1">'+'</td>'+'</tr>';
            }
            for(var i = 0;i < graNum;i++){
                stringd += '<table border="1" class="gra_tab" >'
                      +'<tr>'+'<th>'+'编号'+'</th>'+'<th>'+'图片地址'+'</th>'
                      +gra_str1
                      +'</table>';
            }
            $('.use').eq(1).html(stringd);
            for(var j = 0,h = j+1;j<data.graduate.length;j++,h++){
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
            var stringe = '';
            var gra_str2 = '';
//                  var string_lit = new Array;
            granum[2] = data.graduate.length;            
            graNum = Math.ceil(granum[2] / 7);
            for(var i = 0;i < 7;i++){ 
                gra_str2 += '<tr>'+'<td class="left2">'+'</td>'+'<td class="right2">'+'</td>'+'</tr>';
            } 
            for(var i = 0;i < graNum;i++){
                stringe += '<table border="1" class="gra_tab" >'
                      +'<tr>'+'<th>'+'编号'+'</th>'+'<th>'+'图片地址'+'</th>'
                      +gra_str2
                      +'</table>';
            }
            $('.use').eq(2).html(stringe);
            for(var j = 0,h = j + 1;j < data.graduate.length;j++,h++){
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
            var stringf = '';
            var gra_str3 = '';
            granum[3] = data.graduate.length; 
            graNum = Math.ceil(granum[3] / 7);
    //                
            for(var i = 0;i < 7;i++){
                gra_str3 += '<tr>'+'<td class="left3">'+'</td>'+'<td class="right3">'+'</td>'+'</tr>';
            }
            for(var i = 0;i < graNum;i++){
                stringf += '<table border="1" class="gra_tab" >'
                      +'<tr>'+'<th>'+'编号'+'</th>'+'<th>'+'图片地址'+'</th>'
                      +gra_str3
                      +'</table>';
            }
            $('.use').eq(3).html(stringf);
            for(var j = 0,h = j+1;j < data.graduate.length;j++,h++){
                $('.left3').eq(j).html(h);
                $('.right3').eq(j).html(data.graduate[j]);
            }
        }
    })
//    }
//加入我们
    
    $.ajax({
        url:'GetJoinUs',
        type:"POST",
        dataType:'JSON',
        data:{
        //
        },
        success:function(data){
          // var data1=data;
          var gu_num = data.JoinUSlnfs.length;
          var stringh = '';
          var get;
          var po_num = Math.ceil(gu_num / 9);
          // var classArray = new Array;
          for(var i = 0;i < po_num;i++){
            // console.log(JoinUSlnfs[i * 9 + 0].name);
              stringh += '<table border="1" class="tab_join">'+'<tr>'+'<th>'+'姓名'+'</th>'+'<th>'+'联系电话'+'</th>'
              +'<th>'+'学院'+'</th>'+'<th>'+'学号'+'</th>'+'<th>'+'专业'+'</th>'+'</tr>'
              +'<tr>'+'<td>'+data.JoinUSlnfs[i * 9 + 0].name+'</td>'+'<td>'+data.JoinUSlnfs[i * 9 + 0].phone+'</td>'
              +'<td>'+data.JoinUSlnfs[i * 9 + 0].col+'</td>'+'<td>'+data.JoinUSlnfs[i * 9 + 0].num+'</td>'
              +'<td>'+data.JoinUSlnfs[i * 9 + 0].major+'</td>'+'</tr>'
              +'<tr>'+'<td>'+data.JoinUSlnfs[i * 9 + 1].name+'</td>'+'<td>'+data.JoinUSlnfs[i * 9 + 1].phone+'</td>'
              +'<td>'+data.JoinUSlnfs[i * 9 + 1].col+'</td>'+'<td>'+data.JoinUSlnfs[i * 9 + 1].num+'</td>'
              +'<td>'+data.JoinUSlnfs[i * 9 + 1].major+'</td>'+'</tr>'
              +'<tr>'+'<td>'+data.JoinUSlnfs[i * 9 + 2].name+'</td>'+'<td>'+data.JoinUSlnfs[i * 9 + 2].phone+'</td>'
              +'<td>'+data.JoinUSlnfs[i * 9 + 2].col+'</td>'+'<td>'+data.JoinUSlnfs[i * 9 + 2].num+'</td>'
              +'<td>'+data.JoinUSlnfs[i * 9 + 2].major+'</td>'+'</tr>'
              +'<tr>'+'<td>'+data.JoinUSlnfs[i * 9 + 3].name+'</td>'+'<td>'+data.JoinUSlnfs[i * 9 + 3].phone+'</td>'
              +'<td>'+data.JoinUSlnfs[i * 9 + 3].col+'</td>'+'<td>'+data.JoinUSlnfs[i * 9 + 3].num+'</td>'
              +'<td>'+data.JoinUSlnfs[i * 9 + 3].major+'</td>'+'</tr>'
              +'<tr>'+'<td>'+data.JoinUSlnfs[i * 9 + 4].name+'</td>'+'<td>'+data.JoinUSlnfs[i * 9 + 4].phone+'</td>'
              +'<td>'+data.JoinUSlnfs[i * 9 + 4].col+'</td>'+'<td>'+data.JoinUSlnfs[i * 9 + 4].num+'</td>'
              +'<td>'+data.JoinUSlnfs[i * 9 + 4].major+'</td>'+'</tr>'
              +'<tr>'+'<td>'+data.JoinUSlnfs[i * 9 + 5].name+'</td>'+'<td>'+data.JoinUSlnfs[i * 9 + 5].phone+'</td>'
              +'<td>'+data.JoinUSlnfs[i * 9 + 5].col+'</td>'+'<td>'+data.JoinUSlnfs[i * 9 + 5].num+'</td>'
              +'<td>'+data.JoinUSlnfs[i * 9 + 5].major+'</td>'+'</tr>'
              +'</table>';
          }
          $('.table').html(stringh);
          $('.tab_join').css('display','none');
          $('.tab_join').eq(0).css('display','block');
          //跳转
          $('#change_num').on('click',function(){
            achivePage();
            if($('#num').val() != (get + 1) && $('#num').val() <= po_num){
              var tempory = $('#num').val() - 1;
                $('.tab_join').css('display','none');
                $('.tab_join').eq(tempory).css('display','block');
            }else if($('#num').val() > po_num){
              alert("没有此页！");
              achivePage();
              $('#num').val(get + 1)
            }   
          });
          change();
          //获取页面
          function achivePage(){
              for(var x = 0;x < po_num;x++){
                if($('.tab_join').eq(x).css('display') == 'block'){
                  get = x;
                    break;
                }
              }
          }
          //改变页数
          function change(){
            achivePage();
            $('#num').val(get + 1);
          }
          //第一页
          $('#first').on('click',function(){
              $('.tab_join').css('display','none');
              $('.tab_join').eq(0).css('display','block');
              change();
          });
          $('#end').on('click',function(){
              $('.tab_join').css('display','none');
              $('.tab table').eq(po_num-1).css('display','block');
              change();
          });
          // var get;
          $('#last').on('click',function(){
              achivePage();
              if(get != 0){
                $('.tab_join').css('display','none');
                $('.tab_join').eq(get - 1).css('display','block');
              }else{
                alert("已经是第一页！");
              }
              change();
          });
          $('#next').on('click',function(){
              achivePage();
              if(get != po_num-1){
                $('.tab_join').css('display','none');
                $('.tab_join').eq(get + 1).css('display','block');
              }else{
                alert("已经是最后一页！");
              }
              change();
          });
        },
        error: function(){
          console.log(123434);
        }
    });
  
