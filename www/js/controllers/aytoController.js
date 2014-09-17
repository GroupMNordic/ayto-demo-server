angular.module("aytoDemo", ["firebase"]).controller("aytoController", function ($scope, $firebase) {

  $scope.videos = [
    {id: 1, display: "date", events: 2, eventTimings: [30, 37, 54, 58]},
    {id: 2, display: "matchup", events: 3, eventTimings: [32, 40, 67, 78, 126, 138]},
    {id: 3, display: "truthbooth", events: 2, eventTimings: [38, 51, 78, 89]}
  ];

  $scope.selectedVid = $scope.videos[0];
  $scope.currentTime = "";

  $scope.data = {};

  $scope.data.quiz = {
    question: "Synes du det er okay at kysse med andre end den du er på date med?",
    answer0: "",
    answer1: "",
    show: false
  };

  $scope.data.result = {
    text: "Seerne synes",
    percent0: "",
    percent1: "",
    show: false
  };

  var ref = new Firebase("https://aytodemo.firebaseIO.com");
  var synchObj = $firebase(ref).$asObject();
  synchObj.$bindTo($scope, "data");

  var addEventListeners = function () {
    document.getElementById($scope.selectedVid.id).addEventListener("timeupdate", function () {
      console.log("currentTime: " + this.currentTime);
      $scope.currentTime = this.currentTime;
      if($scope.data.video1 === undefined){
        $scope.data.video1 = {};
      }
      if($scope.data.video2 === undefined){
        $scope.data.video2 = {};
      }
      if($scope.data.video3 === undefined){
        $scope.data.video3 = {};
      }
      if ($scope.selectedVid.id === 1) {
        if ($scope.currentTime >= $scope.selectedVid.eventTimings[0] && $scope.currentTime <= $scope.selectedVid.eventTimings[1]) {
          console.log("Showing event1");
          $scope.data.quiz.answer0 = "Ja";
          $scope.data.quiz.answer1 = "Nej";
          if($scope.data.video1.event1 === undefined){
            $scope.data.video1.event1 = {};
          }
          $scope.data.video1.event1.show = true;
        }
        else {
          console.log("Hiding event1");
          $scope.data.video1.event1.show = false;
        }
        if ($scope.currentTime >= $scope.selectedVid.eventTimings[2] && $scope.currentTime <= $scope.selectedVid.eventTimings[3]) {
          console.log("Showing event2");
          $scope.data.result.percent0 = "Ja: 20%";
          $scope.data.result.percent1 = "Nej: 80%";
          if($scope.data.video1.event2 === undefined){
            $scope.data.video1.event2 = {};
          }
          $scope.data.video1.event2.show = true;
        }
        else {
          console.log("Hiding event2");
          $scope.data.video1.event2.show = false;
        }
      }
      else if ($scope.selectedVid.id === 2) {
        if ($scope.currentTime >= $scope.selectedVid.eventTimings[0] && $scope.currentTime <= $scope.selectedVid.eventTimings[1]) {
          console.log("Showing event1");
          if ($scope.data.dropdownQuiz === undefined) {
            $scope.data.dropdownQuiz = {};
          }
          $scope.data.dropdownQuiz.question = "Hvor mange match tror du der er?";
          if($scope.data.video2.event1 === undefined){
            $scope.data.video2.event1 = {};
          }
          $scope.data.video2.event1.show = true;
        }
        else {
          console.log("Hiding event1");
          $scope.data.video2.event1.show = false;
        }
        if ($scope.currentTime >= $scope.selectedVid.eventTimings[2] && $scope.currentTime <= $scope.selectedVid.eventTimings[3]) {
          console.log("Showing event2");
          if ($scope.data.dropdownQuiz.result === undefined) {
            $scope.data.dropdownQuiz.result = {};
          }
          $scope.data.dropdownQuiz.result.dropdownResult = [0, 10, 13, 39, 18, 10, 7, 3, 0];
          $scope.data.dropdownQuiz.result.text = "Seerne tror";
          if($scope.data.video2.event2 === undefined){
            $scope.data.video2.event2 = {};
          }
          $scope.data.video2.event2.show = true;
        }
        else {
          console.log("Hiding event2");
          $scope.data.video2.event2.show = false;
        }
        if ($scope.currentTime >= $scope.selectedVid.eventTimings[4] && $scope.currentTime <= $scope.selectedVid.eventTimings[5]) {
          console.log("Showing event3");
          if ($scope.data.winner === undefined) {
            $scope.data.winner = {};
          }
          if($scope.data.video2.event3 === undefined){
            $scope.data.video2.event3 = {};
          }
          $scope.data.video2.event3.show = true;
          $scope.data.winner.name = "Anne Garlichs";
          $scope.data.winner.text = "Ugens match up vinder";
        }
        else {
          console.log("Hiding event3");
          $scope.data.video2.event3.show = false;
        }
      }
      else if ($scope.selectedVid.id === 3) {
        if ($scope.currentTime >= $scope.selectedVid.eventTimings[0] && $scope.currentTime <= $scope.selectedVid.eventTimings[1]) {
          console.log("Showing quiz");
          $scope.data.quiz.question = "Tror du at Chris og Paige er et match?";
          $scope.data.quiz.answer0 = "Ja";
          $scope.data.quiz.answer1 = "Nej";
          if($scope.data.video3.event1 === undefined){
            $scope.data.video3.event1 = {};
          }
          $scope.data.video3.event1.show = true;
        }
        else {
          console.log("Hiding quiz");
          $scope.data.video3.event1.show = false;
        }
        if ($scope.currentTime >= $scope.selectedVid.eventTimings[2] && $scope.currentTime <= $scope.selectedVid.eventTimings[3]) {
          console.log("Showing results");
          $scope.data.result.text = "Seerne tror";
          $scope.data.result.percent0 = "Ja: 82,4";
          $scope.data.result.percent1 = "Ja: 17,6";
          if($scope.data.video3.event2 === undefined){
            $scope.data.video3.event2 = {};
          }
          $scope.data.video3.event2.show = true;
        }
        else {
          console.log("Hiding quiz");
          $scope.data.video3.event2.show = false;
        }
      }
    }, false);
  };

  $scope.triggerEvent = function () {
    console.log($scope.data.backgroundEvent === undefined);
    if ($scope.data.backgroundEvent === undefined) {
      $scope.data.backgroundEvent = "bg1";
    }
    if ($scope.data.backgroundEvent === "bg0") {
      $scope.data.backgroundEvent = "bg1";
    }
    else if ($scope.data.backgroundEvent === "bg1") {
      $scope.data.backgroundEvent = "bg2";
    }
    else if ($scope.data.backgroundEvent === "bg2") {
      $scope.data.backgroundEvent = "bg3";
    }
    else if ($scope.data.backgroundEvent === "bg3") {
      $scope.data.backgroundEvent = "bg1";
    }
  };

  $scope.resetEvents = function () {
    $scope.data.backgroundEvent = "bg0";
    $scope.data.name = "";
  };

  $scope.videoSelected = function () {
    document.getElementById("1").pause();
    document.getElementById("2").pause();
    document.getElementById("3").pause();
    $scope.data.video1.event1.show = false;
    $scope.data.video1.event2.show = false;
    $scope.data.video2.event1.show = false;
    $scope.data.video2.event2.show = false;
    $scope.data.video2.event3.show = false;
    $scope.data.video3.event1.show = false;
    $scope.data.video3.event2.show = false;
    addEventListeners();
  };

  var resetText = function () {
    if ($scope.selectedVid.id === 1) {
      $scope.data.quiz.question = "Synes du det er okay at kysse med andre end den du er på date med?";
      $scope.data.result.text = "Seerne synes";
    }
    else if ($scope.selectedVid.id === 2) {

    }
    else if ($scope.selectedVid.id === 3) {

    }
  };

  addEventListeners();
});