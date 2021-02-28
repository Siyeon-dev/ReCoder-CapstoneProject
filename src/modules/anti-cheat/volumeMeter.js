var meter = null;
var audioContext = null;
var mediaStreamSource = null;
let volumeLevel = 0.1  // 0.1 는 평소 말하는 목소리 크기를 판단할 수 있는 정도. (속삭임은 판명 안됨)


export function getVolumeMeter() {
    // monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
	
    // grab an audio context
    audioContext = new AudioContext();

    // Audio input 시도
    try {
        // browser에 맞는 getUserMedia 가져오기
        navigator.getUserMedia = 
        	navigator.getUserMedia ||
        	navigator.webkitGetUserMedia ||
        	navigator.mozGetUserMedia;

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

};


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
    if (meter.volume > volumeLevel) {
        console.log("今話しています！！！！");
    }

    // callback으로 재귀 호출 (중요!)
    window.requestAnimationFrame( drawLoop );
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
