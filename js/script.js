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

const appId = '4223696350981884';
const clientToken = '7ea19420eda210c55d3c38515aef5cd6';

FacebookData = {
    appId: '', 
    clientToken: ''
};

function performGetOperation(url) {
    const res = fetch(url, {
      mode: "cors",
      method: "GET",
    }).catch(function (error) {
      throw new Error("full-flow-facebook : " + error.message);
    });
    return res.json();
  }

// Hent App Token
function getAppToken() {
    const url = `https://graph.facebook.com/oauth/access_token?client_id=${FacebookData.appId}&client_secret=${FacebookData.clientToken}&grant_type=client_credentials`;
    return performGetOperation(url);
  }

// Sjekker om bruker er logget inn og printer resultatet
function statusChangeCallback(response) {  
    console.log('statusChangeCallback');
    console.log(response);                   
    if (response.status === 'connected') {   
      testAPI(); 
      accounts();
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

// Tester Graph Api etter login
function testAPI() {                     
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }

function accounts() {
    FB.api('/me','GET',{"fields":"accounts"}, function(apiResponse) {
            console.log('Here are your accounts: ' + apiResponse.accounts);
    });
}  
