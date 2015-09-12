Drupal SSO
==========

The Drupal SSO package provides transparent authentication integration with a Drupal instance.
 

What does this mean ?
---------------------

Unlike Meteor, Drupal relies by default on cookie-based authentication. This 
package makes use of the Drupal session cookie to authenticate the user with the
Drupal instance having created the cookie.

It enables adding Meteor pages to a Drupal site without having to care for authentication, which
is carried over from Drupal for each logged-in user.

Pros and cons
-------------

* Pros
    * Unlike OAuth-based users Meteor packages, users never see any authentication 
      request from the backend Drupal instance
    * The user experience is seamless authentication-wise: users can link from a Drupal page to a Meteor page and vice-versa and their credentials track them
    * The Drupal instance authorizes the Meteor applications in advance 
    * A Drupal instance can authorize multiple Meteor applications
    * Supports Drupal 8 instances
* Cons
    * This is a one-off, _ad hoc_ mechanism, not a standards-based approach like
      OAuth
    * This package does not (currently) provide integration with the Meteor accounts API
    * The authentication targets a single Drupal instance for a given application, preventing integration with multiple backends, as a NOC-type dashboard applciation might need
    * Does not support Drupal 7, BackdropCMS, nor earlier Drupal versions 
* Double-edged
    * Login/logout is centralized on Drupal. This is good for Meteor pages as a complement to an existing site, not so much for more decoupled cases. 
