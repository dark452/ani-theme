<?php
$db = new SQLite3('bd/redeshost') or die('Unable to open database');
/*
$result = $db->query('SELECT p.id_product,UPPER(p.product_name) product_name,p.product_price_clp, 
p.product_price_usd, p.description_product,p.logo, d.campo1,d.campo2,d.campo3,d.campo4,d.campo5,d.campo6,d.campo7
FROM product p, product_detail d
WHERE p.id_product=d.id_product 
ORDER BY p.id_product');*/
$result = $db->query('SELECT * FROM product');
$json = array();
while ($row = $result->fetchArray())
{
  $json[] = $row;

}

echo json_encode($json);

?>