# So you want to set up a testing environment....

Well, let me just say this is not an easy thing to learn on your own.
I would actually argue it is an impossible thing to learn on your own.
The documentation out there is vast, conflicting, and very difficult to match to your needs.

Unless you can find the precise blog post on testing something exaclty like your own,
you are gonna wind up going in all sorts of circles to write a proper testing environment.
Sorry sorry sorry for any and all pain you may feel trying to do this.

But don't fret-- the scars are worth it.
Do read about and try out all the different testing options.
But also sit down with someone who knows node and who's set up testing environments before.
They don't need to know your stack-- they just need to understand how to set up tests very well
for node applications. Period.

Here's a very quick summary of the stuff I learned from someone who doesn't know anything about my database,
my ORM, or my code, but knows a whole lot about node testing environments!

* export NODE_ENV=test is how you get your environment to know to use your test database.
* You include this inside your test script in your package.json first. First. First. Remember, first.
* You can include all kinds of things in your scripts in your package json-- and you separate these things with &&.
* That way you can then just run npm run test. Yay. That's it. It will run those scripts.
* You can and should use async in your tests (don't pay attention to the official Mocha docs).
* And in doing so, you save yourself from very complex looking and behaving tests.
* You are most likely gonna have to update your version of node to write modern promise-friendly tests.
* So much more to come...
