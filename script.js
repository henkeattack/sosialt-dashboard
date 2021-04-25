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
const loginSuccessFunc = (responseItem) => {
  const appToken = getAppToken(
    responseItem.userIdInfo,
    responseItem.accessTokenInfo
  )  
}

window.FacebookData = {
  appId: '',
  clientToken: '',
  loginSuccessFunc: () => {},
  loginFailFunc: () => {},
};
function performGetOperation(url, headers) {
  const res = fetch(url, {
    mode: "cors",
    method: "GET",
    headers: headers,
  }).catch(function (error) {
    throw new Error("full-flow-facebook : " + error.message);
  });
  return res.json();
}

// Hent App Token
function getAppToken() {
  const url = `https://graph.facebook.com/oauth/access_token?client_id=${window.FacebookData.appId}&client_secret=${window.FacebookData.clientToken}&grant_type=client_credentials`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
}

//Oppsett av Facebook SDK med id, cookies, social plugins og versjon.
window.fbAsyncInit = function() {
    FB.init({
      appId      : window.FacebookData.appId,
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

// Suksessfull login?
function doLoginSuccessWithCallback(yourCallBackFunc) {
  const myUserId = responseData.authResponse.userID;
  const accessToken = responseData.authResponse.accessToken;
  return yourCallBackFunc && yourCallBackFunc(myUserId, accessToken);
}

// Sjekker om bruker er logget inn og printer resultatet
/*function statusChangeCallback(response) {  
    console.log('statusChangeCallback');
    console.log(response);                   
    if (response.status === 'connected') {   
      testAPI();
      return doLoginSuccess(response);
    } else {                                 
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this webpage.';
    }
  } */ 

function checkLoginState(yourCallBackFunc) { // Kalles etter at bruker er ferdig med login
    FB.getLoginStatus(function(response) {
      //statusChangeCallback(response);
      if (response.status === 'connected') {
        return yourCallBackFunc && yourCallBackFunc(response); 
      }
    });
  }

  function doLoginFail(responseData) {
    // throw new Error("Flow failed Fail" + responseData.status);
    return window.FacebookData.loginFailFunc(responseData);
  }
  function doLoginSuccess(responseData) {
    const userIdResponse = responseData.authResponse.userID;
    const accessTokenResponse = responseData.authResponse.accessToken;
    return window.FacebookData.loginSuccessFunc({
      userIdInfo: userIdResponse,
      accessTokenInfo: accessTokenResponse,
    });
  }
  function doLogin() {
    FB.login(
      function (response) {
        if (response.status === "connected") {
          // Logged into your webpage and Facebook.
          return doLoginSuccess(response);
        }
        return doLoginFail(response);
      },
      { scope: "email,public_profile,pages_show_list, pages_read_engagement,pages_manage_engagement,pages_read_user_content,read_insights" }
    );
  }
  export function initializeFlow() {
    initializeFbScripts();
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

// getMyInfo
function getMyInfo() {
  FB.api("/me", function (responseData) {
    console.log("getMyInfo", responseData);
    const myUserId = responseData.id;
    return responseData;
  });
}