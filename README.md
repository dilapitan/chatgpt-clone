# ChatGPT Clone: Wives GPT
This is a clone version of ChatGPT that uses [Google Gemini](https://gemini.google.com/) for its feature of "chatting with users". I used Google Gemini API instead of [ChatGPT API](https://platform.openai.com/) because I had problems renewing my account on ChatGPT.
I renamed this app "Wives GPT" as a funny way of saying that my wife knows almost everything just like ChatGPT (or maybe even more than ChatGPT 🤣) (married couples may relate 😄)

**Summary:** the application has a user interface that connects user's input to the Google Gemini API then returns the result in the UI. There's also a login system in which the logged in users are the only one to have their chat prompts listed on the App's Sidebar (as this is the feature of Chat GPT).

**Tech Stack Used:** frontend ([NextJS](https://nextjs.org/) as React Framework, [TailwindCSS](https://tailwindcss.com/) as CSS framework), backend ([Node](https://nodejs.org/en) with [Express](https://expressjs.com/) and [Prisma](https://www.prisma.io/) for ORM), PostgreSQL as database, and Docker/Docker Compose for the environment.

**App Video Demo**:
https://github.com/dilapitan/chatgpt-clone/assets/23071809/faa1aeb7-ddb4-4f0d-947a-b952bf8b79a7

As you can see in the demo (made the speed fast for lesser video size), anyone can chat with Wives GPT and get answers. But those prompts will not be stored in the Sidebar compared to logged in users.
The user can also sign up or login with their email, and chat with Wives GPT and have their prompts be placed in the Sidebar that can be clicked to view different prompts with different answers.
The UI is also mobile responsive:

https://github.com/dilapitan/chatgpt-clone/assets/23071809/8f31b73c-29af-425c-a9bc-ba4213b87520

# Development Set up
Make sure to have Docker installed in your system. 
1. Clone the repository
2. Go to the `client` and `backend` and copy the contents of `.env-example` to `.env` with the respective values. Just a note, to have a Google Gemini API in the `client`, you need to link your paying card to Google and subscribe initially for about two months (you can just cancel it anytime before it expires and renews so you don't have to really pay 🤣). For the `backend`, `JWT_SECRET` can really be any string or if you want more security, this can be refactored to use a _pem_ file.
3. In the root directory, run `docker compose build` and expect three containers to ran: **db**, **backend**, and **client**. But if you're having problems with the **client** container (sometimes their Dockerfile may cause problems), stop the **client** container, and just make sure to have NodeJS v18.17.0 or higher installed in your local machine then run inside the `client` directory: `npm run dev`. Also in the root directory, to migrate using Prisma, just run: `docker exec -it backend npx prisma migrate dev --name init`.
After all these, go to `localhost:3000` in your browser to see the UI and if you'e using Postman, go to `localhost:4000` to test the API end points. 
4. You can now chat with Wives GPT, create a user, logged in, and chat. 

# Architecture
**DB**: for the database, I use two models: User and Chat (see `schema.prisma`). The User have an email and password, while a Chat can have a "thread of replies" inside a single prompt, and under a user. The "thread of replies" has the following structure: 
![wivesgpt](https://github.com/dilapitan/chatgpt-clone/assets/23071809/f0c07530-08a0-419a-afcb-eb744b789071)

where the User is the one asking, and the Model is the Google Gemini replying to the user via its API.

**Backend**: for the APIs, it has 3 controllers: Auth, User, and Chat. These are responsible for handling the logic between the database, and how they would serve data in the **client** in its `services` folder. 

**Client**: for the UI, the central source of truth for the logged in state and the allChat state is from the AppContext.Provider, wrapping the whole UI component to transfer data to other components with ease. The flow for the chat is the user types a prompt in the ChatBox UI, the **client** calls the logic from its `services`, then to its API in the **backend**, and connects with the **db**. 

# Missing features / limitations
Due to lack of time, these are the missing features I was not able to complete yet, along with the limitations of the application.

**Missing features:**
1. The persistence of Chat data, since I was able to build only the backend/API part of the ChatController, and did not finish connecting it to the UI. The UI works just like ChatGPT, having stored prompts in the Sidebar, but once the user refreshed the browser, the list of prompts will be gone. 
2. Did not have the time for unit testing, caching, ushttps://youtu.be/v4E1GIoxXeEing Terraform. 

**Limitations:**
Since a single chat thread can take up a lot of characters, the database should ensure that it can cater long and long lines of string values. 

**Resources Used:**

[Link 1](https://youtu.be/v4E1GIoxXeE)
[Link 2](https://www.youtube.com/watch?v=heXuVxXG5Vo)
[Link 3](https://www.youtube.com/watch?v=Wta5DQv_EfA)
[Link 4](https://www.youtube.com/watch?v=BGoMmUe3oSY)
[Link 5](https://www.youtube.com/watch?v=8MHyu8Mp0aA)
[Link 6](https://www.youtube.com/watch?v=NaqNk2TbeRE)
