import socketio from "socket.io-client";

const volumeLevel = 0.1;  // 0.1 는 평소 말하는 목소리 크기를 판단할 수 있는 정도. (속삭임은 판명 안됨)

let meter = null;
let audioContext = null;
let mediaStreamSource = null;

let socket = null;
let testIdValue = null;
let studentNumber = null;
let count = null;

export function getVolumeMeter(test_id, s_number) {
    count = 0;
    try {
        socket = socketio.connect("http://3.89.30.234:3001");
    } catch(error) {
        console.log('커넥션 실패');
    }
    // monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    
    testIdValue = test_id;
    studentNumber = s_number;

    // grab an audio context
    audioContext = new AudioContext();

    // Audio input 시도
    try {
        // browser에 맞는 getUserMedia 가져오기
        navigator.getUserMedia = 
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

        console.log("volume Meter start!");

        // getUserMedia 실행
        navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
            // method 
        }, gotStream, didntGetStream);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }
}


function didntGetStream() {
    alert('Stream generation failed.');
}

function gotStream(stream) {
    mediaStreamSource = audioContext.createMediaStreamSource(stream);

    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);

    drawLoop();
}

function drawLoop( time ) {
    // 0.1 데시벨 이상, 3번 이하 호출
    console.log("데시벨 : ", meter.volume);
    
    // if (meter.volume > volumeLevel && count < 3) {
    if (meter.volume > volumeLevel) {
        // 음성인식 부정행위 API 호출
        console.log('음성 인식');
        (function volumeAPI()  {
            count++;

            const data = {
                test_id: testIdValue,
                s_number: studentNumber,
            };
            
            console.log(data);

            socket.emit("volumeMeter", {
                test_id: Number(data.test_id),
                s_number: Number(data.s_number)
            });

        })();
    }

    // callback으로 재귀 호출 (중요!)
    setTimeout(function() {
        window.requestAnimationFrame( drawLoop );
    }, 1000);
}


function createAudioMeter(audioContext,clipLevel,averaging,clipLag) {
    var processor = audioContext.createScriptProcessor(512);
    processor.onaudioprocess = volumeAudioProcess;
    processor.clipping = false;
    processor.lastClip = 0;
    processor.volume = 0;
    processor.clipLevel = clipLevel || 0.98;
    processor.averaging = averaging || 0.95;
    processor.clipLag = clipLag || 750;

    processor.connect(audioContext.destination);

    processor.checkClipping =
        function(){
            if (!this.clipping)
                return false;
            if ((this.lastClip + this.clipLag) < window.performance.now())
                this.clipping = false;
            return this.clipping;
        };

    processor.shutdown =
        function(){
            this.disconnect();
            this.onaudioprocess = null;
        };

    return processor;
}

function volumeAudioProcess( event ) {
    var buf = event.inputBuffer.getChannelData(0);
    var bufLength = buf.length;
    var sum = 0;
    var x;

    for (var i=0; i<bufLength; i++) {
        x = buf[i];
        if (Math.abs(x)>=this.clipLevel) {
            this.clipping = true;
            this.lastClip = window.performance.now();
        }
        sum += x * x;
    }

    var rms =  Math.sqrt(sum / bufLength);

    this.volume = Math.max(rms, this.volume*this.averaging);
}
