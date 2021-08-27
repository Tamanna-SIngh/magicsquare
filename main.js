noseX=0;
noseY=0;
difference = 0;
rightWristX = 0;
leftWristX = 0;

  function setup() {
  video = createCapture(VIDEO);
  video.size(550, 550);

  canvas = createCanvas(550, 550);
  canvas.position(660,150);
  
  // initialising posenet model
  poseNet = ml5.poseNet(video, modelLoaded);
  // execution of posenet model
  poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized!');
}

// array =[1,5,3,5]
// array.length = 4

function gotPoses(results)
{
  if(results.length > 0)
  {
    console.log(results);
    noseX = results[0].pose.nose.x;
    noseY = results[0].pose.nose.y;
    console.log("noseX = " + noseX + " noseY = " + noseY);

    // floor(3.5) = 3
    // floor(3.676) = 3 
    // floor(3.9) = 3

    leftWristX = results[0].pose.leftWrist.x;
    rightWristX = results[0].pose.rightWrist.x;
    difference = floor(leftWristX - rightWristX);
    console.log("leftWristX  = " + leftWristX  + " rightWristX = "+ rightWristX + " difference = " + difference);
  }
}


    // floor(3.45) = 3
    // ceiling(3.45) = 4
    // (3.45678).toFixed(2)= 3.46

function draw() {
background('#969A97');

  document.getElementById("square_side").innerHTML = "Side of a Square will be = " + difference + " pixels";
  fill('#F90093'); // pink color
  stroke('#F90093');
  square(noseX, noseY, difference);
}
