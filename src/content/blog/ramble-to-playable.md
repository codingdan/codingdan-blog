---
title: 'From a Ramble to a Game'
description: 'I built a no-human-in-the-loop pipeline that goes from a spoken game idea to a playable game (part 1)'
pubDate: 'Apr 18 2026'
heroImage: '../../assets/oskar-screenshot.png'
---

I've always been somewhat of an aspiring game designer, but I'm missing two important ingredients: a disciplined attention span and any skill with art whatsoever.

Even in the early days of ChatGPT I was trying to get this thing to help me make games. I remember my son and I would sit with ChatGPT and work back and forth to get it to spit out a simple HTML5 game. And every so often I'd go back and dabble with this idea of how far can me and an LLM go toward making a game. When Claude Code first came out, I spent a lot of time working with it one-on-one to try and make an Allegro / Flecs / Raylib game, and got pretty far with it actually. Again though, the roadblock I eventually ran into was... well, now I need art to make it look good, and I'm just kind of bad at that and don't have the patience to commit to getting better.

But this year a couple of things came to a head. [PixelLab](https://www.pixellab.ai/) came out with natural language generation of sprites. The community had been trying to solve this problem for a long time with models like stable diffusion, and they eventually did and PixelLab is basically the pay-to-generate version of that. Sites like [ElevenLabs](https://elevenlabs.io/) solved the audio generation problem. So now you can get these natural-language-generated game assets; sprites, tilesets, and map objects, and you can just kind of drop them straight into a game. They're ready to go. Are they as good as a human? No. But they were better than me and certainly good enough for a hobby project.

So I wanted to revisit this idea of agentic game development. And this time around I came at it from a different angle: how far could I go just zero-shotting these things, going from a prompt to a playable game? Part of my reasoning there was I wanted my son or my daughter to be able to ramble off their game ideas, like they often do, and I wanted to record that and have an agent take it and produce them a game that matched their vision.

## The architecture

That's what I set out to build. The architecture for this is roughly: transcribe, come up with a creative brief, and then build the game in a loop until done.

```
ramble → transcribe → creative brief
                            ↓
┌─────────── BUILD LOOP ───────────┐
│                                  │
│   scope → plan → execute         │
│     ↑               │            │
│     └──── repeat ←──┘            │
│                                  │
└──────────────────────────────────┘
                            ↓
                      playable game
```

Normally when you work with an agent, you scope out something to do, you get the agent to write a plan for you, then you check the plan, and then you have the agent do the implementation. In this case, I wanted no human in the loop. So I settled on this pattern of a three-phase looping pipeline: scoping out work to do, planning how to do that work, and then executing on the plan. And the execution itself was actually a loop as well, because a plan would provide, say, ten phases of work, and then your executor would loop through them sequentially.

There are two other main components here that are interesting to talk about.

The first is the suite of capabilities that your execution agent has access to. These are basically manifested as skill files. I wanted to do things like teach an execution agent how to use the PixelLab API, for example, or seed it with a common set of game principles and game design patterns. So the execution phase has access to all of this suite of tools, and it can choose which ones it wants to load in service of its task. That's not different to how agents normally work — but the difference is I was doing this all in a custom harness. I used the [Claude Agent SDK](https://docs.claude.com/en/api/agent-sdk/overview) to build this, because I was predominantly using my Claude Code subscription and piggybacking off of that since it (was) more cost-effective than using the API.

## Verification

The other big thing to deal with in a no-human-in-the-loop agent flow, is verification. How do you get it to judge its output objectively?

For video games this is quite hard, because the ultimate way to judge the success of a video game is to play it — how do you feel while you're playing it, and do the controls feel satisfying and intuitive? I spent a lot of time drilling into that particular problem, and settled on a couple of techniques that I made available to the agents. And then I just heavily emphasized to it that it had to visually judge its own work. It wasn't enough to just say "yep, I ran the unit tests and it's fine."

In service of that, I decided that these games would all be HTML games based on [Phaser](https://phaser.io/tutorials/getting-started-phaser3), which is an HTML5 game engine — because then it could load the game in the browser and use existing tools like Playwright or Claude-in-Chrome to interact, take screenshots, and click around.

For playtesting I needed a flexible approach that would approximate how a human might play a game. Some games require twitch controls and fast reaction times, and an LLM just wouldn't be able to operate fast enough to judge if that's working or not, or even play the game effectively. The model I settled on was a Commander / Soldier strategy where an LLM could act as the Commander - periodically observing the game and setting the strategy for the next period of time, and then delegate the specifics to a locally running AI soldier that just focuses on executing the strategy. For example, the strategy might be "kite this enemy," or "run to the health potion," and that would map to more primitive commands that the Soldier AI would actually execute.

But then the other thing I realized is: all games are different. Not every game needs to have the commander-soldier play-test. Some games are more about exploration, or are turn based and are more methodical. That's when I decided it was worth promoting validation strategy to a fourth pipeline stage that would get its own prompt & persona.

How I manifested this was basically getting the validation planner to build a strategy and a test plan that would evolve independently with each game development pipeline as they went on. With the initial creative brief, scope and plan, the validation planner would come online and start building out a testing strategy, and then it would insert verification phases into the plan. Those phases would learn things — some of the techniques would work, some would not. It would identify the gaps in its testing strategy and then feed all of that back into the validation planner so that in the next loop it could say, "oh, you know what, in order to test this game properly we need to invest in some test infrastructure" — like, "I need to build out a better commander-soldier play-test," or "I need to figure out a way to validate this particular part of the game." So it was this kind of evolving test strategy. And you could also read this thing and get insights into how it was thinking about testing each specific game.

## Go play them

With a surprisingly small amount of iteration, I was able to get something producing pretty reasonable results. I've put up this first set of games we created with this pipeline, along with the prompts that were given, check them out and see what you think:

👉 **[The Rambles Games Arcade](https://codingdan.github.io/rambles-games-arcade/)**
