<?php

$ip = $_SERVER["REMOTE_ADDR"];


$orgPrice = 0;
$nsc = false;
$age = 0;
$loyalty = false;

//discounts
$salesTax = 15;
$ageDiscount = 0;
$loyaltyDiscount = 0;
$tax = 0;
//handling text/select inputs
    if($_POST['price'] !== " "){
        $orgPrice = $_POST['price'];
    }
    if($_POST['age'] !== " "){
        $age = $_POST['age'];
        if($age < 12){
            $ageDiscount = 10;
        }elseif($age > 65){
            $ageDiscount = 5;
        }      
    }
//handling form checkboxes
    if(isset($_POST['nsc']) && 
       $_POST['nsc'] == 'nsc') 
    {
        //if nsc is checked
       $salesTax = 20;
    }
    if(isset($_POST['loyalty']) && 
       $_POST['loyalty'] == 'loyalty') 
    {
       $loyaltyDiscount = 2;
    }

//    echo "<br/> orgPrice:";
//    echo $orgPrice;
//    echo "<br/> age:";
//    echo $age;
//    echo "<br/>salesTax:";
//    echo $salesTax;
//    echo "<br/>ageDiscount:";
//    echo $ageDiscount;
//    echo "<br/>loyaltyDiscount:";
//    echo $loyaltyDiscount;


function getFinalPrice($orgPrice, $salesTax, $ageDiscount, $loyaltyDiscount){
    
    $tax = ($salesTax) - ($ageDiscount) - ($loyaltyDiscount);
    $tax = $tax/100; 
    return $orgPrice * (1 + $tax);
};
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>POS Calculator - Challenge 3.1</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
<link rel="stylesheet" href="stylesheet.css" type="text/css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
</head>
<body>

<div id="output" class="container col-md-16">
  <h2>Order Total</h2>
    <div>
       Your total is: $<?php echo getFinalPrice($orgPrice, $salesTax, $ageDiscount, $loyaltyDiscount); ?>.
        <br/>
        Your IP address is: <?php echo $ip; ?>.
    </div>
</div>
</body>
</html>