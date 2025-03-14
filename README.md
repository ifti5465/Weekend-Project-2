# Weekend-Project-2

ABOUT THIS PROJECT:

We used next.js to create an app.

Then using Cursors claude 3.7-sonnet AI, given the prompt "Create a simple interface for a page that generates jokes", it created the rest of the app. 
Although it left the page.tsx file to have the default layout which we ediited out.
We then asked it to adhere to the following instructions: 
"Edit the current code to add a topic from a list of options (work, people, animals, food, television, etc.),
a tone for the joke (witty, sarcastic, silly, dark, goofy, etc.), 
the type of joke (pun, knock-knock, story, etc.), 
the "temperature" (how much randomness/creativity to add to the joke)". 

The AI hardcoded the jokes into the code generating its own lists. 

We then gave it the prompt "I want you to now add a feature which you, the AI, evaluate whether you think the jokes are "funny", "appropriate" or "offensive". 

After experimentation, since jokes are hardcoded and limited, trying the same or even different categories could result with the same joke. 

HOW TO USE:

Clone this git repository.
Navigate to the project directory.
Install the dependencies "npm install"
Then "npm run dev"
And open in your browser.


