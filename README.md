# Official documentation for ETH Global Tokyo hackathon April 14th-16th 2023
# Octoplorer: block query made easy
## AI-powered blockchain explorer with human-readable answers
***
### Project submission materials
1. Presentation deck can be viewed here: https://docs.google.com/presentation/d/1PbiUOzlKVB7FomlmyNA5c82ZmYIczTUyBVE5gr6LoYc/edit#slide=id.g22dfca0265a_0_45
2. Figma draft can be viewed here:
3. Demo video can be viewed here:

### Project description
For many Web3 users, we are certain that many people have heard the phrase "the data is on the blockchain, so everybody can see it." But how many have actually tried to do it, and then realized how difficult it is to query the data on the blockchain when it is more than just 1 transaction? We have created the solution for that problem: We make querying data on the blockchain (for now Ethereum and Polygon mainnets) easy using AI-powered natural language understanding and a friendly user interface for Web3 technology.

Members of our teams have various potential use cases for this web app:
- Obtain NFT images owned by a certain entity. This could be a
- In terms of number of follower, get the Lens handles for the top 5 most popular ids.
- Obtain the aggregate statistics on certain NFT collections on popular marketplaces (for now Opensea and Rarible)
- Obtain data for recent transactions within the past 7 days for a certain wallet
- For an Ethereum Name Service name (for example, "dwr.eth"), we can get the Farcaster name, Farcaster account details, connected address, and all token balances and images

As of project submission deadline, please keep in mind that we cannot address all of the above-mentioned use cases due to time limitation. With our best effort, we have been able to make querying the blockchain both an easy-to-understand and enjoyable experience through some simple use cases.

Basically, the more protocols and data that we plug in, the more possibilities will open up for us to query.

We also think that this simple yet user-friendly web app would help to onboard the next million new people into web3 while empowering data geeks with the information they need for their web3 journey.

*Side notes and trivia: for those that may be wondering where the name Octoplorer came from, it is a combination of the words "octopus" and "explorer". I (Lam) chose octopus as the representative animal because:
- 🐙 Octopus is fast, it can swim up to 25 miles per hour. That is faster than Michael Phelps!
- An octopus can multitask well due to its large nerve cluster. It has something like a "minibrain" at the base of each arm to independently control its movement. That's why it can grab multiple blockchain transactions simultaneously!
___
### How to run the project locally
1. Get the API keys required to run the project locally: OpenAI API key, and Airstack API key. You can get them by signing up for free at https://openai.com/, and https://airstack.xyz/
2. Install all requirements first by running
`yarn install`
3. For back end:
a. Ingest the pre-trained data (text documents) by running: `yarn ingest`
b. Then run `yarn start` to start the server at http://localhost:3001
4. For front end:
Run `yarn start` to start the server at http://localhost:3000
