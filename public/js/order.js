$(document).ready(function() {
  // alert("In ready function");
  $.ajax({
    url: "/order/getAllOrders",
    type: "POST",
    success: function(res) {
      console.log(res);
      dispalyOrders(res)
    },
    error: function(request, status, err) {
      console.log(err);
    }
  });
  // make a ajax call to getAllOrders
});

function dispalyOrders(res) {
  var totalAmount = 0;
  for (var i = 0; i < res.length; i++) {
    // console.log(res[i]);
    var temp = JSON.parse(JSON.stringify(res[i]));
    totalAmount = totalAmount + temp["price"];

    // console.log(temp["name"]);
    // <div class="col-sm-2 hidden-xs"><img src=${temp["imagePath"]} class="img-responsive" /></div>

    $("#cart tbody").append(`
      <tr>
        <td data-th="Product">
          <div class="row">
            <div class="col-sm-2 hidden-xs"><img src=http://placehold.it/70X70 class="img-responsive" /></div>
            <div class="col-sm-10">
              <h4 class="nomargin">${temp["name"]}</h4>
              <p>${temp["description"]}</p>
            </div>
          </div>
        </td>

        <td data-th="Price">$${temp["price"]}</td>
        <td data-th="Quantity">
          <input type="number" class="form-control text-center" value="1" readonly>
        </td>
        <td data-th="Subtotal" class="text-center">$${temp["price"]}</td>
        <td class="actions" data-th="">
          <button class="btn btn-info btn-sm"><i class="fa fa-refresh"></i></button>
          <button class="btn btn-danger btn-sm"><i class="fa fa-trash-o"></i></button>
        </td>
      </tr>
      `);
  }

  $("tfoot tr.visible-xs td.text-center strong").text(`Total $${totalAmount}`);
  $("tfoot td.text-center.hidden-xs strong").text(`Total $${totalAmount}`);
}
