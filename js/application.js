
$(document).ready(function() {
    //UPDATING TABLE NUMBERS
    $("input").each(function(index, numberInput){
        $(this).change(function(){
        var tableRow = $(this).parents().closest("tr");
        var newItemPrice = $(tableRow).find('input[name="price"]').val();
        var newItemQuantity = $(tableRow).find('input[name="quantity"]').val();
        var newItemTotal = newItemPrice * newItemQuantity;

        tableRow.find(".item-total").html("$"+newItemTotal);
        updateTotalPrice();

    });
})

     //CREATING A TABLE ROW
     var createTableRow = function(name, price, quantity, total){
        var itemName = $('<td class="name col-4">' + name + '</td>');
        var itemPrice = $('<td class="price col-2"><input type="number" name="price" value="0"' + price +'"/></td>');
        var itemQuantity = $('<td class="quantity col-2"><input type="number" name="quantity" value="1"' + quantity + '"/></td>');
        var itemTotal = $('<td class="item-total col-2">$ ' + total + '</td>')
        var removeButton = $('<td class="button-cancle col-2"><button class="button-remove">Remove</button></td>');


        var newTableRow = $("<tr class='item col-12'></tr>").append(itemName, itemPrice, itemQuantity, itemTotal, removeButton);
        
        newTableRow.appendTo($("tbody"));
        console.log($("tbody"))
        updateTotalPrice();
    }   

    //REMOVE BUTTON BEHAVIOR
    $("tbody").on('click', ".button-remove", function(){
        $(this).closest("tr").remove();
        updateTotalPrice();
    })

    //ADDING TABLE ROW
    $("#button-add").click(function (event){
        event.preventDefault();
        var newItemName = $("form").find('input[name="item"]').val();
        var newItemPrice = $("form").find('input[name="price"]').val();
        var newItemQuantity = $("form").find('input[name="quantity"]').val();
        var newItemTotal = newItemPrice * newItemQuantity;

        if (newItemName !== ''){
            createTableRow(newItemName, newItemPrice, newItemQuantity, newItemTotal);
        }else{
            console.log("name not avaiable")
        }
    })
    
    //UPDATE TOTAL PRICE
    var updateTotalPrice = function(){

        var allItemTotals = $("td.item-total");
        var allItemTotalsWithoutDollarsign = [];

        var removeDollarSign = function(element){
            var priceWithDollarSign = $(element).html().split("");
            priceWithDollarSign.shift();
            var priceWithoutDollarSign = priceWithDollarSign.join('');
            return priceWithoutDollarSign;
        }

        var allItemTotalsWithoutDollarsign = [];
        allItemTotals.each(function(index, eachTotal){
            allItemTotalsWithoutDollarsign.push(removeDollarSign($(eachTotal)));
        });

        var newTotalPrice = "$" + allItemTotalsWithoutDollarsign.map(Number).reduce(function (a,b){
            return a + b;
        }, 0);
        $("div.summary h2:last-child").html(newTotalPrice);
    }
    
});


