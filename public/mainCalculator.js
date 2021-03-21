$(document).ready(function(){

    $(document).on('click','.mainKey',function(){
        var result = $(this).html();
        
        var textArea=$('textArea').val();
        textArea+=result;
        $('textArea').val(textArea);
    })
    $(document).on('click','.mainClear',function(){
        console.log("")
        $('textArea').val(' ');

    })
    $(document).on('click','.mainSin',function(){
     var result= $(this).html();
     var textResult = $('textArea').val();
     result+='(';
     result+=')';
     textResult+=result;
     $('textArea').val(textResult);
    })
    $(document).on('click','.seeResult',function(){
        console.log('da')
        var mathFieldSpan = $('#customText').val();
        console.log(mathFieldSpan);
        var latexSpan = document.getElementById('test');


var MQ = MathQuill.getInterface(2); // for backcompat
var result='';
var mathField = MQ.MathField(mathFieldSpan, {
  spaceBehavesLikeTab: true, // configurable
  handlers: {
    edit: function() { // useful event handlers
        result = mathField.latex(); // simple API
    }
  }
});
console.log(result);



    })
})