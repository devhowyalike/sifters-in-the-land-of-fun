import neoGeoBootUp from '../audio/creditsNeoGeo.mp3';
import winnersDont from '/assets/images/winnersDont.gif';

const creditsHtml = `
<div id="credits">
<img src="${winnersDont}" alt="Winners Don't Use Drugs" class="credits-img">
<ul>
<li>Programming and development: Yameen</li>
<li>Pixel Art: Army of Trolls</li>
<li>Music: Yameen &amp; Friends</li>
<li>Special Thanks: Pixelrevision</li>
<li>Based on a concept by Benny Brows</li>
<li>Inspired by the Flash game &ldquo;Arcade&nbsp;Aid&rdquo; by 42 Entertainment</li>
<li class="last">And YOU! Thank you for playing!</li>
</ul>
<audio preload="auto" autobuffer id="neoGeoBootUp">
<source src="${neoGeoBootUp}" type="audio/mpeg">
Your browser does not support audio playback.
</audio>
</div>
`;

export default creditsHtml;