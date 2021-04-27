window.FacebookData = {
    appId: '',
    clientToken: '',
    loginSuccessFunc: () => {},
    loginFailFunc: () => {},
  };
  export async function performGetOperation(url, headers) {
    const res = await fetch(url, {
      mode: "cors",
      method: "GET",
      headers: headers,
    }).catch(function (error) {
      throw new Error("full-flow-facebook : " + error.message);
    });
    return await res.json();
  }
  
  // Hent App Token
  export async function getAppToken() {
    const url = `https://graph.facebook.com/oauth/access_token?client_id=${window.FacebookData.appId}&client_secret=${window.FacebookData.clientToken}&grant_type=client_credentials`;
    let headers = new Headers();
    headers.append("Accept", "application/json");
    return performGetOperation(url, headers);
  }
  
  // Henter min Facebook-info
  export async function getMyInfo() {
  FB.api("/me", function (responseData) {
    console.log("getMyInfo", responseData);
    const myUserId = responseData.id;
    return responseData;
  });
  }

  // Hent min innsikt

  // Hent instagram-profil
  
  // Hent Facebook-konto
  export async function getMyfbAccInfo(myUserId, accessToken) {
  const url = `https://graph.facebook.com/v10.0/me?fields=id,name,email&access_token=${accessToken}`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
  }

// Hent Facebook Page
export async function getMyfbAccPage(myUserId, accessToken) {
    const url = `https://graph.facebook.com/v10.0/me/accounts?fields=name,id,access_token,engagement,instagram_business_account,followers_count{id}&access_token=${accessToken}`;
    let headers = new Headers();
    headers.append("Accept", "application/json");
    return performGetOperation(url, headers);
  }

  // Suksessfull login?
  export async function doLoginSuccessWithCallback(yourCallBackFunc) {
    const myUserId = responseData.authResponse.userID;
    const accessToken = responseData.authResponse.accessToken;
    return yourCallBackFunc && yourCallBackFunc(myUserId, accessToken);
  }
  
  export function checkLoginState(yourCallBackFunc) { // Kalles etter at bruker er ferdig med login
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        return yourCallBackFunc && yourCallBackFunc(response);
      }
    });
  }
  
  export async function doLoginFail(responseData) {
    console.log("Please login to page ");      
    // throw new Error("Flow failed Fail" + responseData.status);
    return window.FacebookData.loginFailFunc(responseData);
  }
  export async function doLoginSuccess(responseData) {
    const userIdResponse = responseData.authResponse.userID;
    const accessTokenResponse = responseData.authResponse.accessToken;
    console.log("Successful login for: " + response.name);
    return window.FacebookData.loginSuccessFunc({
      userIdInfo: userIdResponse,
      accessTokenInfo: accessTokenResponse,
    });
  }
  export function doLogin() {
    FB.login(
      function (response) {
        if (response.status === "connected") {
          // Innlogget på nettsiden og Facebook.
          return doLoginSuccess(response);
        } else {
            return doLoginFail(response);
        }
      },
      { scope: "email,public_profile,pages_show_list, pages_read_engagement,pages_manage_engagement,pages_read_user_content,read_insights" }
    );
  }
  
  //Oppsett av Facebook SDK med id, cookies, social plugins og versjon.
  export function initializeApp() {
    initializeFBScripts();
  }
  
  export function initializeFBScripts() {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : window.FacebookData.appId,
        cookie     : true,
        xfbml      : true,
        version    : 'v10.0'
      });
        
      FB.AppEvents.logPageView();
    };
  
  // Kjører Facebook SDK
  (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }