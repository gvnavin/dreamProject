/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

 
$(document).ready(function(){
 
var arrData = ["a","b","c","d","e","f","g","h","i","j"]; 
  renderEditableGrid(10,arrData);
  $("#submit").click(function() {
      getContentFromGrid();
});

function getContentFromGrid() 
{
  var list = [];
  var j = 0;
  for(j = 0 ; j < 10 ; j ++ )
  {
  	var id = $("#"+arrData[j]).text().trim(); 
  	var val = $("#tr"+j).text().trim(); 
  	
  	var data = {
  		Id:id,
  		Val:val
  	};
  	
  	list.push(data);
  	
  	//alert( list[j].Id + " = "+ list[j].Val );  	
  }	
  var jsonData = JSON.stringify(list); 
  var obj = jQuery.parseJSON( jsonData );
  
  putJsonDataServletUsingAjax(jsonData);
  
}

function putJsonDataServletUsingAjax(jsonData) 
{
    $.ajax({
            cache: false,
            type: "POST",
            url: "TestServlet",
            data: {theNameOfTheParameter: jsonData},
            dataType: "json",
            success: function (data) {
                // There is no problem with the validation
                alert("success\n"+data.test);
            },
            error: function (xhr) {
                alert(xhr.responseText);
                alert("Critical Error!. Failed to call the server.");
            }
    }); 
}
function renderEditableGrid(size,arrData)
{
 var str = "<table border =1 style=\"border-spacing: 0px; border-collapse:collapse; \"><tbody>";
 
 var i = 0;
 for( i = 0; i < size ; i ++ )
 {
 	str += "<tr><td align=\"center\" id="+ arrData[i] +" width=\"40em\">"+arrData[i]+"</td><td id = \"tr"+i+"\""+" width=\"40em\" contenteditable>"+i+"</td></tr>";
 }
 
 str += "</tbody></table>";
 str += "<input id = \"submit\" type=\"button\" value=\"click\"> </input>";
 
 $("#tableContent").html(str);
}
 
});

