try {
    const ReviewForm = document.getElementById("review-form");
    if (ReviewForm) {
        console.log("hit5");
        //Get a reference to the num_input field
        const emailInput = document.getElementById("user_emailId");
        const commentInput = document.getElementById("comment");
        const starsInput = document.getElementById("stars");
        if (!emailInput.value || !commentInput.value || !starsInput.value ) {
            $("#error").show();
            $("#error").html("You Need to supply an input value!");
    
            //then set the cursor focus to the input field
            $("#user_emailId").focus();}

        console.log("hit6");

    
        //Add an event listener for the form submit
        // ReviewForm.addEventListener("submit", event => {
        //   console.log("hit7");
        //   //We need to prevent the default behavior of the form submit
        //   event.preventDefault();
    
        //   /*  Now we check to make sure the user entered a value in the input box
        //         We are only concerned if they entered something, we do not need to
        //         validate if it's a number, string etc.. in this example
        //     */
        //   if (!emailInput.value || !commentInput.value || !starsInput.value ) {
        //     $("#error").show();
        //     $("#error").html("You Need to supply an input value!");
    
        //     //then set the cursor focus to the input field
        //     $("#user_emailId").focus();}
        // });
      }
  $(document).ready(function() {
    $(".input").focus(function() {
      $(this)
        .parent()
        .find(".label-txt")
        .addClass("label-active");
    });

    $(".input").focusout(function() {
      if ($(this).val() == "") {
        $(this)
          .parent()
          .find(".label-txt")
          .removeClass("label-active");
      }
    });
  });
  $("#comment").focus();
  $("#stars").focus();
  $("#user_emailId").focus();
  //$("#error").hide();
} catch (e) {
    //console.log("got stuck here");
          //const message = typeof e === "string" ? e : e.message;
          $("#error").show();
          //$("#error").html("You Need to supply positive values!");
          $("#error").html(e);
          $("#user_emailId").focus();
          console.log("got stuck here2");
}
