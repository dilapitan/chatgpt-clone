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

