import youWinSound from '../audio/youWin.mp3';

const musicManagerHtml = `
<audio preload="auto" autobuffer id="winSound">
<source src="${youWinSound}" type="audio/mpeg">
Your browser does not support audio playback.
</audio>
`;

export default musicManagerHtml;