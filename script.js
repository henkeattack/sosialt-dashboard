const toggler = document.getElementById("toggler-circle");
const togglerbg = document.getElementById("toggler");

const body = document.body;
togglerbg.addEventListener("click", function(){
    if (body.classList.contains("dark")) {
        body.classList.replace("dark", "light");
        toggler.style.transform = "translateX(20px)";
    }
    else {
        body.classList.replace("light", "dark");
        toggler.style.transform = "translateX(0)";
    }
}); // Kode for dark mode/light mode

//Oppsett av Facebook SDK med id, cookies, social plugins og versjon.
window.fbAsyncInit = function() {
    FB.init({
      appId      : '4223696350981884',
      cookie     : true,
      xfbml      : true,
      version    : 'v10.0'
    });
      
    FB.AppEvents.logPageView();

    // Sjekker login status
    FB.getLoginStatus(function(response) {   
        statusChangeCallback(response);      
    });     
  };
// Kjører Facebook SDK
(function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

// Sjekker om bruker er logget inn og printer resultatet
function statusChangeCallback(response) {  
    console.log('statusChangeCallback');
    console.log(response);                   
    if (response.status === 'connected') {   
      testAPI();
      testPage();  
    } else {                                 
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this webpage.';
    }
  }

function checkLoginState() { // Kalles etter at bruker er ferdig med login
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

// Tester Graph Api etter login
function testAPI() {                     
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }

// Hent Page Info
function testPage() {
  FB.api('/me?fields=accounts', function(response) {
      console.log('Fetching your page info: ' + response.name + response.id);
  });  
}