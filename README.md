Drupal SSO
==========

The Drupal SSO package provides transparent authentication integration with a Drupal instance.
 

Usage
-----

* Add the package to the application: `meteor add fgm:drupal-sso`
* Add and enable the Meteor module to your Drupal server
    * Obtain an application token from the module for your Meteor app
* Configure a `drupal-sso` section in your `settings.json`, like:

        {
        'drupal-sso': {
          "site": "http://example.com",
          "appToken": "the application token you got from the Meteor module"
          }
        }
* In the app startup, initialize a SSO instance: `SSO = new DrupalSSO();`. 
    * You probably want to do this in `client/lib/init.js` to be sure it happens as early as possible.
* In your template helpers, expose that variable: Spacebars apparently cannot see variables, like this:

        Template.some_template_name.helpers({
           sso: function () {
             return SSO;
           },
        });
* Once this is done, your application can use the SSO methods, passive and reactive data sources:
    * Reactive: `userId()`, `userName()`,  `userRoles()`
    * Passive: `state.sessionName`, `state.anonymousName`, `state.online`
* You may delay until initialization by the Drupal server has completed by waiting on `SSO.state.online` until it is no longer `undefined`.    


What exactly does this provide ?
--------------------------------

Unlike Meteor, Drupal relies by default on cookie-based authentication. This 
package makes use of the Drupal session cookie to authenticate the user with the
Drupal instance having created the cookie.

It enables adding Meteor pages to a Drupal site without having to care for authentication, which
is carried over from Drupal for each logged-in user.


Pros and cons
-------------

* Pros
    * Unlike OAuth-based users Meteor packages, users never see any authentication request from the backend Drupal instance, making the whole process transparent
    * The user experience is seamless authentication-wise: users can link from a Drupal page to a Meteor page and vice-versa and their credentials track them
    * Logging out of Drupal automatically logs the user out of Meteor too
    * The Drupal instance authorizes the Meteor applications in advance 
    * A Drupal instance can authorize multiple Meteor applications
    * Supports Drupal 8 instances
* Cons
    * This is a one-off, _ad hoc_ mechanism, not a standards-based approach like OAuth
    * This package does not (currently) provide integration with the Meteor accounts API
    * The authentication targets a single Drupal instance for a given application, preventing integration with multiple backends, as a NOC-type dashboard applciation might need
    * Does not support Drupal 7, BackdropCMS, nor earlier Drupal versions 
* Double-edged
    * Login/logout is centralized on Drupal. This is good for Meteor pages as a complement to an existing site, not so much for more decoupled cases. 
