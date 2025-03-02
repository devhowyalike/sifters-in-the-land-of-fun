<?php
include("../../mdetect.php");
//Instantiate the object to do our testing with.
$uagent_obj = new uagent_info();
//Detect iPhone Tier and iPads...
if (($uagent_obj->DetectTierIphone() == $uagent_obj->true) ||
($uagent_obj->DetectIpad() == $uagent_obj->true))
   {
$myFile = "gameMobile.html";
$content = file_get_contents($myFile);
echo $content;
    }
//Detect Rich CSS Tier...
else if ($uagent_obj->DetectTierRichCss() == $uagent_obj->true)
   {
$myFile = "gameMobile.html";
$content = file_get_contents($myFile);
echo $content;
    }
//Detect All Other Mobile Devices...
else if ($uagent_obj->DetectTierOtherPhones() == $uagent_obj->true)
   {
$myFile = "gameMobile.html";
$content = file_get_contents($myFile);
echo $content;
    }
//Else it's a regular PC browser -- send to regular desktop site
else
{ header('Location: '); }
?>