const toggler = document.getElementById("toggler-circle");
const togglerbg = document.getElementById("toggler");

const body = document.body;
togglerbg.addEventListener("click", function () {
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
window.flowFacebookData = {
  appId: "",
  clientToken: "",
  loginSuccessFunc: () => { },
  loginFailFunc: () => { },
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

// hent AppToken
export async function getAppToken() {
  const url = `https://graph.facebook.com/oauth/access_token?client_id=${window.flowFacebookData.appId}&client_secret=${window.flowFacebookData.clientToken}&grant_type=client_credentials`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
}
// hent Facebook-konto
export async function getMyfbAccInfo(instaUserId, accessToken) {
  const url = `https://graph.facebook.com/v8.0/me?fields=id,name,email&access_token=${accessToken}`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
}
// Hent side tilknyttet Facebook-kontoen
export async function getMyfbAccPage(instaUserId, accessToken) {
  const url = `https://graph.facebook.com/v8.0/me/accounts?fields=name,id,access_token,engagement,fan_count,instagram_business_account,followers_count{id}&access_token=${accessToken}`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
}

// Hent min totale innsikt
export async function getMyInsight(instaUserId, accessToken) {
  const url = `https://graph.facebook.com/v8.0/${instaUserId}?fields=business_discovery.username(bluebottle){followers_count,media_count}&access_token=${accessToken}`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
}

// Hent innsikt fra Facebook-siden
export async function getMyfbPageInsights(instaUserId, accessToken) {
  const url = `https://graph.facebook.com/v8.0/${instaUserId}/insights?metric=page_views_total,page_engaged_users,page_actions_post_reactions_like_total,page_impressions,page_fan_adds_unique&period=week&date_preset=last_7d&access_token=${accessToken}`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
}

// Henter demografisk info om brukerne 
export async function getUserDemograph(instaUserId, accessToken) {
  const url = `https://graph.facebook.com/v8.0/${instaUserId}/insights?metric=page_fans_gender_age&access_token=${accessToken}`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
}

// hent Instagram Profil
export async function getInstgramProfile(instagramProfileId) {
  FB.api(`${instagramProfileId}`, function (responseData) {
    if (responseData && !responseData.error) {
      return responseData;
    }
  });
}

// hent Instagram business konto fra Facebook-siden
export async function getMyFbInstaBusinessAcc(instaUserId, accessToken) {
  const url = `https://graph.facebook.com/v8.0/${instaUserId}?fields=instagram_business_account&access_token=${accessToken}`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
}

// hent Instagram konto info
export async function getMyInstagramAccInfo(instaUserId, accessToken) {
  const url = `https://graph.facebook.com/v8.0/${instaUserId}?fields=biography,followers_count,media_count{like_count},follows_count,ig_id,name,profile_picture_url&access_token=${accessToken}`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
}

// hent min Instagram-innsikt 
export async function getMyInstagramAccInsight(instaUserId, accessToken) {
  const url = `https://graph.facebook.com/v8.0/${instaUserId}/insights?metric=impressions,reach&period=week&follower_count&period=day&since=1619099778&until=1619704578&access_token=${accessToken}`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
}

// henter instagram demograph
export async function getLifetimeInfo(instaUserId, accessToken) {
  const url = `https://graph.facebook.com/v8.0/${instaUserId}/insights?metric=audience_gender_age&period=lifetime&access_token=${accessToken}`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
}

// henter nye instagram følgere 
export async function getInstaFollowers(instaUserId, accessToken) {
  const url = `https://graph.facebook.com/v8.0/${instaUserId}/insights?metric=follower_count,profile_views&period=day&since=1622312343&until=1622830743&access_token=${accessToken}`;
  let headers = new Headers();
  headers.append("Accept", "application/json");
  return performGetOperation(url, headers);
}

// hent min info
export async function getMyInfo(instagramProfileId) {
  FB.api("/me", function (responseData) {
    console.log("getMyInfo", responseData);
    const instaUserId = responseData.id;
    return responseData;
  });
}

// er login en suksess med callback
export async function doLoginSuccessWithCallBack(yourCallBackFunc) {
  const instaUserId = responseData.authResponse.userID;
  const accessToken = responseData.authResponse.accessToken;
  return yourCallBackFunc && yourCallBackFunc(instaUserId, accessToken);
}

// sjekker login state med response status
export function checkLoginState(yourCallBackFunc) {
  FB.getLoginStatus(function (response) {
    if (response.status === "connected") {
      return yourCallBackFunc && yourCallBackFunc(response);
    }
  });
}

// kode hvis login feiler, hvis ikke log inn
export async function doLoginFail(responseData) {
  return window.flowFacebookData.loginFailFunc(responseData);
}
export async function doLoginSuccess(responseData) {
  const userIdResponse = responseData.authResponse.userID;
  const accessTokenResponse = responseData.authResponse.accessToken;
  return window.flowFacebookData.loginSuccessFunc({
    userIdInfo: userIdResponse,
    accessTokenInfo: accessTokenResponse,
  });
}
export function doLogin() {
  FB.login(
    function (response) {
      if (response.status === "connected") {
        // Logged into your webpage and Facebook.
        return doLoginSuccess(response);
        // console.log("response", response);
      }
      return doLoginFail(response);
    },
    { scope: "email,public_profile,pages_show_list, pages_read_engagement,pages_manage_engagement,pages_read_user_content,read_insights,instagram_manage_insights,instagram_basic,ads_read" }
  );
}
export function initializeFlow() {
  initializeFbScripts();
}
// kjører Facebook Javascript
export function initializeFbScripts() {
  // initalize ------------------->
  window.fbAsyncInit = function () {
    FB.init({
      appId: window.flowFacebookData.appId,
      cookie: true,
      xfbml: true,
      version: "v8.0",
    });

    FB.AppEvents.logPageView();
  };

  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
  // <------------------- initalize
}