function test()
{
    console.log("in test function");
    //debugger;
    // const searchbox = document.querySelector('#searchbox').value;
    const captcha = document.querySelector('#g-recaptcha-response').value;
    // alert(`captcah = ${captcha}`)
    var temp = Number($("#stars").val());
    
    $.ajax({
        url:"/writeReview/recaptchaVerify",
        type:"POST",
        async:false,
        data:{
            "captcha":captcha
        },
        success:function(res){
            res = JSON.parse(JSON.stringify(res));
            console.log(res);
            if (res["success"] == true) {
                alert(res["msg"]);
                console.log("success of the  captcha");
                // location.reload();
            }else{
                alert(res["msg"]);
                console.log("failure of the captcha");
            }
            // make a form submit over here
            if( temp <= 5 && temp >= 1){
                $("#review-form").submit();
            }else{
                alert("Please enter the rating ranging between 1 to 5");
            }
        },
        error:function(err){
            alert("wrong captcha");
            console.log("failure of the captcha");
        }
    });
}