/*const toggler = document.getElementById("toggler-circle");
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
}); // Kode for dark mode/light mode */

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
      setElements(true);  
      testAPI(); 
    } else {                                 
        document.getElementById('status').innerHTML = 'Please log ' +
        'into this webpage.';
        setElements(false);
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

    FB.api('/me?fields=name,email,birthday,location,about', function(response) {
        if(response && !response.error){
            buildProfile(response);
        }

    FB.api('/me?fields:name,followers_count', function(response) {
        if(response && !response.error){
            buildProfile(response);
        }
    }); 
    })
}

function buildProfile(user){
    let profile = `
      <h3>${user.name}</h3>
      <ul class="list-group">
        <li class="list-group-item">User ID: ${user.id}</li>
        <li class="list-group-item">Email: ${user.email}</li>
        <li class="list-group-item">Birthday: ${user.birthday}</li>
        <li class="list-group-item">Location: ${user.location.name}</li>
        <li class="list-group-item">About: ${user.about.name}</li>
        <li class="list-group-item">Page Name: ${user.page.name}</li>
        <li class="list-group-item">Followers: ${user.followers_count.value}</li>
        
      </ul>
    `;
   
    document.getElementById('profile').innerHTML = profile;
   }


   function setElements(isLoggedIn){
    if(isLoggedIn){
      document.getElementById('logout').style.display = 'block';
      document.getElementById('profile').style.display = 'block';
      document.getElementById('feed').style.display = 'block';
      document.getElementById('fb-btn').style.display = 'none';
      document.getElementById('heading').style.display = 'none';
    } else {
      document.getElementById('logout').style.display = 'none';
      document.getElementById('profile').style.display = 'none';
      document.getElementById('feed').style.display = 'none';
      document.getElementById('fb-btn').style.display = 'block';
      document.getElementById('heading').style.display = 'block';
    }
   }
   
   function logout(){
    FB.logout(function(response){
      setElements(false);
    });
   }