function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier=ml5.imageClassifier('MobileNet',modelLoaded);
}
function modelLoaded() {
  console.log('modelo cargado');
}
function draw() {
  image(video,0,0,300,300);
  classifier.classify(video,gotResult);
}
previousresult='';
function gotResult (error,results) {
  if (error) {
    console.error(error);
  }else{
    if ((results[0].confidence>0.5)&&(previousresult!=results[0].label)){
      console.log(results);
      previousresult=results[0].label;
      var synth=window.speechSynthesis;
      speakdata="el objeto detectado es "+results[0].label;
      var utterThis=new SpeechSynthesisUtterance(speakdata);
      synth.speak(utterThis);

      document.getElementById("result_object_name").innerHTML=results[0].label;
      document.getElementById("result_object_accuracy").innerHTML=results[0].confidence.toFixed(2);
    }
  }
}