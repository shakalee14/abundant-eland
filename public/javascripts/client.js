$(document).ready(function(){
  var order_price_pizza1 = new Array();
    order_price_pizza1[1]=15;
    order_price_pizza1[2]=18;
    order_price_pizza1[3]=10;
    order_price_pizza1[4]=12;
    order_price_pizza1[5]=12;
    order_price_pizza1[10]=10;
    order_price_pizza1[14]=10;
    order_price_pizza1[16]=10;

  var order_price_drink1 = new Array();
    order_price_drink1[1]=1.25;
    order_price_drink1[2]=1.25;
    order_price_drink1[4]=1.25;
    order_price_drink1[5]=1.25;

  var prices = {
    pizza1: 15,
    pizza2: 15,
    drink1: 1.25,
    drink2: 1.25,
    pizza_amount1: 1,
    pizza_amount2: 0,
    drink_amount1: 1,
    drink_amount2: 0,
  }

  var totalBox = 0;


  const totalUp  = ( value, arr, item ) => {
    prices[value] = arr[item]
    totalBox = prices['pizza1']*prices['pizza_amount1'] + prices['pizza2']*prices['pizza_amount2'] + prices['drink1']*prices['drink_amount1'] + prices['drink2']*prices['drink_amount2']
    return totalBox
  }

  const totalUpAmount  = ( value, item ) => {
    prices[value] = item
    totalBox = prices['pizza1']*prices['pizza_amount1'] + prices['pizza2']*prices['pizza_amount2'] + prices['drink1']*prices['drink_amount1'] + prices['drink2']*prices['drink_amount2']
    return totalBox
  }

  $("#order_pizza1").change(function(){
    $("#totalPrice").val(totalUp('pizza1', order_price_pizza1, $(this).val()))
  })

  $("#order_pizza2").change(function(){
    $("#totalPrice").val(totalUp('pizza2', order_price_pizza1, $(this).val()))
  })

  $("#order_drink1").change(function(){
    $("#totalPrice").val(totalUp('drink1', order_price_drink1, $(this).val()))
  })

  $("#order_drink2").change(function(){
    $("#totalPrice").val(totalUp('drink2', order_price_drink1, $(this).val()))
  })

})
