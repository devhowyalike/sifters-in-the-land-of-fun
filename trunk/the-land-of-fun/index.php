<?php
include("../mdetect.php");
//Instantiate the object to do our testing with.
$uagent_obj = new uagent_info();
//Detect iPhone Tier and iPads...
if (($uagent_obj->DetectTierIphone() == $uagent_obj->true) ||
($uagent_obj->DetectIpad() == $uagent_obj->true))
   { header('Location: '); }
//Detect Rich CSS Tier...
else if ($uagent_obj->DetectTierRichCss() == $uagent_obj->true)
   { header('Location: '); }
//Detect All Other Mobile Devices...
else if ($uagent_obj->DetectTierOtherPhones() == $uagent_obj->true)
   { header('Location: '); }
//Else it's a regular PC browser -- send to regular desktop site
else
//$myFile = "gameDesktop.html";
$content = file_get_contents("gameDesktop.html");
echo $content;
?>