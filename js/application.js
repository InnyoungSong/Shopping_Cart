
$(document).ready(function() {
    //CHECK IF EMPTY
    var checkIfEmpty = function (){
        if($("tbody").children().length !== 0 ){
            $("#empty-state").css('display', 'none');
        }else{
            $("#empty-state").css('display', 'block');
        }
    }

    

     //CREATING A TABLE ROW
     var createTableRow = function(name, price, quantity, total){
        var itemName = $('<td class="name"><p>' + name + '</p></td>');
        var itemPrice = $('<td class="price"><input type="number" name="price" value="' + price +'"/></td>');
        var itemQuantity = $('<td class="quantity"><input type="number" name="quantity" value="' + quantity + '"/></td>');
        var itemTotal = $('<td class="item-total"><p>$ ' + total + '</p></td>')
        var removeButton = $('<td class="button-cancle"><button class="button-remove">Remove</button></td>');


        var newTableRow = $("<tr class='item col-12'></tr>").append(itemName, itemPrice, itemQuantity, itemTotal, removeButton);
        
        newTableRow.appendTo($("tbody"));
        updateTotalPrice();
       
    }   

    //REMOVE BUTTON BEHAVIOR
    $("tbody").on('click', ".button-remove", function(){
        $(this).closest("tr").remove();
        updateTotalPrice();
        checkIfEmpty();
    })

    //ADDING TABLE ROW
    $("#button-add").click(function (event){
        event.preventDefault();
        var newItemName = $("form").find('input[name="item"]').val();
        var newItemPrice = function(){
            var itemPrice = $("form").find('input[name="price"]').val();
            if (!itemPrice){
                return 0;
            }else{
                return itemPrice;
            }
        }
        var newItemQuantity = function(){
            var itemQuantity = $("form").find('input[name="quantity"]').val();
            if (!itemQuantity){
                return 0;
            }else{
                return itemQuantity;
            }
        }
        var newItemTotal = newItemPrice() * newItemQuantity();

        if (newItemName !== ''){
            $("#error").css('display', 'none');
            $("#form-fields").find('input[name="item"]').css('border', '1px solid lightgrey');
            createTableRow(newItemName, newItemPrice(), newItemQuantity(), newItemTotal);
        }else{
            $("#error").css('display', 'block');
            $("#form-fields").find('input[name="item"]').css('border', '2px solid red');
        }
        checkIfEmpty();

        //UPDATING TABLE NUMBERS
        $("td").each(function(index, numberInput){
            $(this).change(function(){
            var tableRow = $(this).parents().closest("tr");
            var newItemPrice = $(tableRow).find('input[name="price"]').val();
            var newItemQuantity = $(tableRow).find('input[name="quantity"]').val();
            var newItemTotal = newItemPrice * newItemQuantity;

            console.log("clicked");
            tableRow.find(".item-total").html("$"+newItemTotal);

            updateTotalPrice();

            });
        })
    })
    
    //UPDATE TOTAL PRICE
    var updateTotalPrice = function(){
        var allItemTotals = $("td.item-total");
        var allItemTotalsWithoutDollarsign = [];
        var removeDollarSign = function(element){
            var priceWithDollarSign = $(element).text().split("");
            priceWithDollarSign.shift();
            var priceWithoutDollarSign = priceWithDollarSign.join('');

            return Number(priceWithoutDollarSign);
        }
        var allItemTotalsWithoutDollarsign = [];

        allItemTotals.each(function(index, eachTotal){
            allItemTotalsWithoutDollarsign.push(removeDollarSign($(eachTotal)));
        });

        var allItemTotal = allItemTotalsWithoutDollarsign.reduce(function (a,b){
            return a + b;
        }, 0);
        var newTotalPrice = "$" + allItemTotal;

        $("div.summary h2:last-child").html(newTotalPrice);
    }
    
});


