// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCji8x3rrztMEsgZ9lP_EwHE0NzDUH2JZg",
  authDomain: "mis-archivos-c7b1d.firebaseapp.com",
  databaseURL: "https://mis-archivos-c7b1d.firebaseio.com",
  projectId: "mis-archivos-c7b1d",
  storageBucket: "mis-archivos-c7b1d.appspot.com",
  messagingSenderId: "604668819298",
  appId: "1:604668819298:web:5fe53a5ed0e8cc6c215e3b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


    /**
     * Handles the sign in button press.
     */
    function toggleSignIn() {
      // Disable the sign-in button during async sign-in tasks.
      document.getElementById('quickstart-sign-in').disabled = true;
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut().catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          handleError(error);
          // [END_EXCLUDE]
        });
        // [END signout]
      } else {
        var email = document.getElementById('email').value;
        // Sending email with sign-in link.
        // [START authwithemail]
 var actionCodeSettings = {
          // URL you want to redirect back to. The domain (www.example.com) for this URL
          // must be whitelisted in the Firebase Console.
          'url': window.location.href, // Here we redirect back to this same page.
          'handleCodeInApp': true // This must be true.
         };

        firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings).then(function() {
          // Save the email locally so you don’t need to ask the user for it again if they open
          // the link on the same device.
          window.localStorage.setItem('emailForSignIn', email);
          // The link was successfully sent. Inform the user.
          alert('Se envió un correo electrónico a '+ email +'. Utilice el enlace en el correo electrónico para iniciar sesión.');
          // [START_EXCLUDE]
          // Re-enable the sign-in button.
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          handleError(error);
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
    }
    /**
     * Handles Errors from various Promises..
     */
    function handleError(error) {
      // Display Error.
      alert('Error: ' + error.message);
      console.log(error);
      // Re-enable the sign-in button.
      document.getElementById('quickstart-sign-in').disabled = false;
    }
    /**
     * Handles automatically signing-in the app if we clicked on the sign-in link in the email.
     */
    function handleSignIn() {
      // [START handlesignin]
      if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
        // [START_EXCLUDE]
        // Disable the sign-in button during async sign-in tasks.
        document.getElementById('quickstart-sign-in').disabled = true;
        // [END_EXCLUDE]
        // You can also get the other parameters passed in the query string such as state=STATE.
        // Get the email if available.
        var email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          // User opened the link on a different device. To prevent session fixation attacks, ask the
          // user to provide the associated email again. For example:
          email = window.prompt('Proporcione el correo electrónico con el que desea iniciar sesión para confirmarlo.');
        }
        if (email) {
          // The client SDK will parse the code from the link for you.
          firebase.auth().signInWithEmailLink(email, window.location.href).then(function(result) {
            // Clear the URL to remove the sign-in link parameters.
            if (history && history.replaceState) {
              window.history.replaceState({}, document.title, window.location.href.split('?')[0]);
            }
            // Clear email from storage.
            window.localStorage.removeItem('emailForSignIn');
            // Signed-in user's information.
            var user = result.user;
            var isNewUser = result.additionalUserInfo.isNewUser;
            console.log(result)
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            handleError(error);
            // [END_EXCLUDE]
          });
        }
      }
      // [END handlesignin]
    }
    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
    function initApp() {
      // Restore the previously used value of the email.
      var email = window.localStorage.getItem('emailForSignIn');
      document.getElementById('email').value = email;
      // Automatically signs the user-in using the link.
      handleSignIn();
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        
          // [START_EXCLUDE]
          document.getElementById('quickstart-sign-in-status').textContent = 'Bienvenido...';
          document.getElementById('quickstart-sign-in').textContent = 'Bienvenido...';
          // [END_EXCLUDE]
        } else {
          // User is signed out.
          // Update UI.
          // [START_EXCLUDE]
          document.getElementById('quickstart-sign-in-status').textContent = 'Hola Anonimo..';
          document.getElementById('quickstart-sign-in').textContent = 'INICIAR SESIÓN SIN CONTRASEÑA';
          document.getElementById("contenedor").innerHTML = "Ingrese su correo electrónico y le será enviado un enlace por correo para poder entrar en el contenido privado. Usted permanecerá logueado siempre que lo este con su cuenta de email. Cuando usted sea deslogueado recibira otro email de acceso. No necesitara nunca contraseña."
          document.getElementById("contenedor").className = "shadow-lg p-3 mb-5 bg-white rounded";
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authstatelistener]
      document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    }
    window.onload = initApp;