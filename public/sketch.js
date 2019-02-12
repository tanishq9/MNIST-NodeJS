let c;
$(function(){
    console.log('Page loaded.');
    let clear_button = $("#clear");
    let submit_button = $('#submit');
    let div_result = $('#div_result');
    let result_text = $('#result');
    clear_button.click(function(){
        div_result.hide();
        background(0);
    });
    submit_button.click(function(){
        var canvas = $('canvas')[0];
        // base 64 encoding
        var data = canvas.toDataURL('image/png').replace(/data:image\/png;base64,/, '');
        
        console.log('Button clicked');
        
        console.log(data); // this is the encoded string

        $.post(
            '/',
            {encoded : data},
            function(data){
                console.log(data);
                //window.alert(data);
                div_result.show();
                result_text.text("The prediction is : "+data);
            }
        )
    });
})  

function setup() {
    c = createCanvas(280,280);
    background(0);
}

function mouseDragged(){
    console.log('('+mouseX+","+mouseY+")");
    var data = {
        x1 : mouseX,
        y1 : mouseY,
        x2 : pmouseX,
        y2 : pmouseY
     };
     //  noStroke(); // disables drawing stroke (outline of shape)
     // fill(255); // sets the color used to fill shapes ; not valid for lines
     strokeWeight(15);
     stroke(255); // color of stroke is white
     line(mouseX, mouseY, pmouseX, pmouseY);
  }