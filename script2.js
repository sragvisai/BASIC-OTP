var app = angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http,$rootScope){
    
    //variabes for modifying the DOM Structure
    $scope.isOtp = false;
    $scope.isShake = false;
    $scope.invalidOtp = false;

    //attempts
    $scope.attempts = 0;

    $scope.otp = "";
    console.log("Inside the controller");
    console.log("Phone Number",$scope.phoneNumber);

    function sendTheOtp(phoneNumber){
        console.log("Inside the sendTheOtp",phoneNumber)
        fetch('https://textbelt.com/otp/generate', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              phone: phoneNumber,
              userid: phoneNumber,
              key: 'c072628bd2d07bf355e74babeb5ef9995c2dc7c5JwxEJjL1TkyMofQxMUe2gCdf1'
            }),
          }).then(response => {
              console.log("Before JSON"+response);
            response.json();
          }).then(data => {
            console.log("Response from send OTP"+data);
          });
    }
    
    function serverConnection(number,otp){
        let data ;
        console.log("Server Connection"+number+" "+otp);
        var url = new URL("http://localhost:9000/server");
        url.search = new URLSearchParams({id: number ,token : otp });
        url = url.toString();
        fetch(url,{
        })  
      .then((response) => {
        return response.json();
      })
      .then(data =>{
        if(data.isValidOtp){
          window.location.replace("successfulAttempt.html");
        }
        else if ($scope.attempts <3){
          $scope.attempts++;
          $scope.invalidOtp = true;
        }
        else{
          window.location.replace("failure.html");
        }
      })      
    }
    $scope.verifyTheOtp = function(){
        let phoneNumber = $scope.phoneNumber;
        console.log("OTP"+$scope.otp);
        serverConnection(Number(phoneNumber),Number($scope.otp));
    }
    
    
    $scope.triggerOtp = function () {
        console.log("Inside the trigger otp");
        let phoneNumberText = $scope.phoneNumber;
        console.log("Here is the phone Number",$scope.phoneNumber);
        if(validateTheInput(phoneNumberText)){
            console.log("Looks like a phone Number");
            sendTheOtp(Number($scope.phoneNumber));
            $scope.isOtp = true;
        }
        else{
            console.log("Doesnt look like one");
            $scope.phoneNumber = "";
        }
    }
    
    function validateTheInput(phoneNumberText){
        let pattern = /\D/g;
        let result = phoneNumberText.match(pattern);
        if(!result && phoneNumberText.length == 10)
            return true;
        return false;
    }
});

//  c072628bd2d07bf355e74babeb5ef9995c2dc7c5JwxEJjL1TkyMofQxMUe2gCdf1
