# [Carrot Game](https://carrot-game.netlify.app/)

Get all carrots within time! <br />
Only carrots! Not bugs! 🐛

### Users win when 👏
- they click all the carrots within time

### Users lose when 🙁
- they click any bug
- they fail to click every carrots within time limit


### Users are able to
- see the remaining time
- see the number of remaining carrots
- stop playing in middle of game, and able to restart
- replay after the game

## What I learn ✍🏻

💡 **There was an issue after finishing game, users still could click and remove carrots**

```
export class Field {
  constructor(carrotCount, bugCount, getGameStatus) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.getGameStatus = getGameStatus;
```
So I passed `getGameStatus` parameter to check whether game is running or not

```
this.gameField = new Field(this.carrotCount, this.bugCount,  () => this.started);
```

💡 **Builder Pattern**

Too many constructor arguments cause more errors and make hard to read,  <br />
builder patter solve these problem by separating the construction of a complex object from its representation

