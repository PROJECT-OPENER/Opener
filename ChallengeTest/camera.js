//////유튜브

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'kamsx_g2hnI',
        playerVars: {'controls':0},
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
if (event.data == YT.PlayerState.ENDED && !done) {
    stopRecording();
    done = true;
}
}
//   function stopVideo() {
//     player.stopVideo();
//   }
////////////////////////////////////


//DOM
const recordButton =document.querySelector(".record-button");
const stopButton =document.querySelector(".stop-button");
const playButton =document.querySelector(".play-button");
const downloadButton =document.querySelector(".download-button");

const previewPlayer = document.querySelector("#preview");
const recordingPlayer = document.querySelector("#recording");

let recorder;
let recordedChunks;

//functions
function videoStart() {
    // player.playVideo() //유튜브재생
    player.loadVideoById({
        'videoId': 'kamsx_g2hnI',
        'startSeconds': 0
    });
    navigator.mediaDevices.getUserMedia({ video:true,audio:true })
    .then(stream => {
        previewPlayer.srcObject = stream;
        startRecording(previewPlayer.captureStream())
    })
}

function startRecording(stream) {
    recordedChunks=[];
    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e)=>{ recordedChunks.push(e.data) }
    recorder.start();
}

function stopRecording() {
    previewPlayer.srcObject.getTracks().forEach(track => track.stop());
    recorder.stop();
}

function playRecording() {
    // player.playVideo() //유튜브재생
    player.loadVideoById({
        'videoId': 'kamsx_g2hnI',
        'startSeconds': 0
    });
    const recordedBlob = new Blob(recordedChunks, {type:"video/webm"});
    recordingPlayer.src=URL.createObjectURL(recordedBlob);
    recordingPlayer.play();
    downloadButton.href=recordingPlayer.src;
    downloadButton.download =`recording_${new Date()}.webm`;
    console.log(recordingPlayer.src);
}

//event
recordButton.addEventListener("click",videoStart);
stopButton.addEventListener("click",stopRecording);
playButton.addEventListener("click",playRecording);

