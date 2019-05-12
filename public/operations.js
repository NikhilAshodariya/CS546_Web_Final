function openRecipe(mID) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/uploadMenu/' + mID,
        success: function (data) {
            $('body').html(data);
            console.log(data);
        }
        
    });
}