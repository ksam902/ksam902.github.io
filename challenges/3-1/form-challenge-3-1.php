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

<div id="form" class="container col-md-16">
  <h2>Kyle's POS Calculator</h2>
  <form role="form" method="post" action="func-challenge-3-1.php">
    <div class="form-group" >
      <input type="text" class="form-control" name="price" placeholder="Original Price">
    </div>
    <div class="checkbox">
      <label><input type="checkbox" name="nsc" value="nsc"> Nova Scotia Customer</label>
    </div>
    <select class="form-control" name="age">
        <option value="" selected disabled>Age</option>
        <?php
            for($i=1; $i<=100; $i++){
                echo "<option value='" . $i . "'>" . $i . "</option>";
            }
        ?>
    </select>
    <div class="checkbox">
      <label><input type="checkbox" name="loyalty" value="loyalty"> Loyalty Discount</label>
    </div>      
      <input id="calculate" type="submit" name="calculate" class="btn btn-danger" value="Calculate Order">
  </form>
</div>
</body>
</html>