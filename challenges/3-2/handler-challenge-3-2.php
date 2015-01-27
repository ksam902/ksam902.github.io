<?php
    $output = "";
    
    if(isset($_GET["submit1"])){
        $output = $_GET["submit1"];
    }elseif(isset($_GET["submit2"])){
        $output = $_GET["submit2"];
    }else{
        $output = $_GET["submit3"];
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Query String - Challenge 3.2</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
<link rel="stylesheet" href="stylesheet.css" type="text/css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
</head>
<body>

<div id="form" class="container col-md-16">
  <h2>Query String Challenge - Handler</h2>
    <div id="output">
        <?php echo $output; ?>
    </div>
</div>
</body>
</html>
