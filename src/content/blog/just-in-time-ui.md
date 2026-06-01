---
title: 'Just-in-Time UI'
description: 'Why agentic coding is about to give user interfaces the same treatment JIT compilation gave interpreted languages.'
pubDate: 'Jun 01 2026'
heroImage: '../../assets/lifelog.jpg'
---

The future of interfacing with software will be tailor made *just for you*.

Just-in-time compilation revolutionized how software could be optimized for *where* and *how* it is being run. Natively compiled code is optimized to run fast, but you pay for it. You lose portability, and you lose the ability to respond to how the program actually gets used. What are the real hot paths? What actually needs to be hyper-optimized? A JIT compiler can answer that because it waits and watches. In a way, it's a guard against premature optimization.

I think the agentic coding revolution is about to give user interfaces the same treatment.

When I think about how I want to get at a piece of information, how I want to interact with it, visualize it, add to it, all of that can now be hyper-optimized for my specific use of that data.

Here's a concrete example from this past weekend. I hooked Claude up to my Garmin MCP and my Withings MCP. Together those are a pretty rich picture of my health metrics, and Garmin already does a lot of work to analyze that data and surface it back to me. But I wanted to go a step further & connect it with what I was actually doing in my day, the choices I'm making and the things I am experiencing. That's the piece that always feels missing. I wanted a life journal app.

Now, I know there are probably plenty of life-logging and journaling apps that already do this. It's not that they don't work. The problem is they probably don't expose their data in a way my AI agent can actually consume. And they are probably way overbuilt for the simple use case that I have. Their UI is surely built to appeal to a broad set of users, which is how they get popular, so it's generalized by design. But I have a very specific case in mind, and with agentic coding I can just build the interface I actually need, and expose it to my agent as a first-class user.

So I had Claude whip up a tool to log events as I go about my day. Had a coffee. Had some drinks. Stressed about a meeting. Just little notes, frictionless to add them in the moment because I just open the app, tap the button or add some text, and im done.

Within an hour I/Claude had it running on my Raspberry Pi: a little server with APIs for posting and retrieving these events, slicing and dicing them exactly how my agent needs them. A small web app I can pull up on my phone, all routed through Cloudflare so I can hit it when I'm out and about. And on the agent side I wrote a quick skill file. I control the client here, so I can teach it that this data exists and how to use it. The next step would be making an app I can run on my Garmin to just note all this down from my wrist. I'm sure Claude can do that too.

Now I can just ask my agent: take a look at my weekend and tell me anything interesting. And it's not only looking at my health data, it's looking at the choices I made alongside it. It surfaces real insights, real trends, real suggestions. Then I set up a routine. Once a day it synthesizes the day before, and once a week it rolls that up. Suddenly I have the thing I think we all imagined back when we first started tracking our health: something that actually analyses the data and tells me how the choices I'm making influence my health data.

That's one hyper-specific example. But I think we're trending this way across the board, and I don't think we'll keep settling for the general application when we can spin up the hyper-specific one built for exactly what we need. 
