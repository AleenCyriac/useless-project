import React, { useState, useEffect } from "react";
import "./App.css";

const moodResponses = {
  happy: [
    "Sunlight. Moisture. Inner peace.",
    "I'm thriving despite you.",
  ],
  sad: [
    "I cry. Not with water. With pain.",
    "Where is the love?",
    "Wilted. Like my trust in you.",
  ],
  mortified: [
    "You overwatered me. Again.",
    "How dare you put me in that pot.",
    "This decor is a crime.",
  ],
  thirsty: [
    "I thirst for water.",
    "You've neglected me. Again.",
    "Parched and pained. Typical.",
  ],
  bored: [
    "I’ve been staring at the same wall for 6 hours.",
    "Water me or tell me a joke. Preferably both.",
    "Why do I even have leaves if no one appreciates them?",
  ],
  angry: [
    "DON'T touch my soil.",
    "Water me human!",
    "I'm not mad. Just disappointed.",
  ],
  surprised: [
    "Sunlight? On a weekday?",
    "What is this? Affection?!",
  ],
  calm: [
    "The sunlight warms my chlorophyll soul.",
    "Just swaying in serenity.",
    "I feel peaceful.",
  ],
  insecure: [
    "Do these spots make me look sick?",
    "Do my leaves make me look fat",
    "Am I just a background plant to you?",
  ],
  flirty: [
    "You’re lucky I’m rooted or I’d come closer.",
    "Careful, I’m photosensitive AND emotionally sensitive.",
    "Keep winking and I might just bloom.",
  ]
};

const allMoods = Object.keys(moodResponses);

function getRandomMood() {
  return allMoods[Math.floor(Math.random() * allMoods.length)];
}

function getResponse(mood) {
  const responses = moodResponses[mood];
  return responses[Math.floor(Math.random() * responses.length)];
}

function maybeMakeThirsty(setMood, setResponse) {
  const chance = Math.random();
  if (chance < 0.15) {
    setMood("thirsty");
    setResponse(getResponse("thirsty"));
    return true;
  }
  return false;
}

export default function App() {
  const [mood, setMood] = useState("");
  const [response, setResponse] = useState("");
  const [IgnoreCount, setIgnoreCount] = useState(0);
  const [waterCount, setWaterCount] = useState(0);

  useEffect(() => {
    const initialMood = getRandomMood();
    setMood(initialMood);
    setResponse(getResponse(initialMood));
    setIgnoreCount(0);
    setWaterCount(0);
  }, []);

  function handleCheckMood() {
    if (maybeMakeThirsty(setMood, setResponse)) return;
    setResponse(getResponse(mood));
  }

  function handleWater() {
    if (maybeMakeThirsty(setMood, setResponse)) return;

    if (mood !== "happy") {
      const newMood = waterCount === 0 ? "calm" : "happy";
      setMood(newMood);
      setResponse(getResponse(newMood));
      setWaterCount(waterCount + 1);
      setIgnoreCount(0);
    }
  }

  function handleIgnore() {
    if (maybeMakeThirsty(setMood, setResponse)) return;

    if (mood === "happy") {
      setMood("bored");
      setResponse(getResponse("bored"));
    } else if (mood === "bored") {
      const nextMoods = ["sad", "angry", "insecure"];
      const newMood = nextMoods[Math.floor(Math.random() * nextMoods.length)];
      setMood(newMood);
      setResponse(getResponse(newMood));
    } else if (mood === "sad" || mood === "insecure") {
      setMood("angry");
      setResponse(getResponse("angry"));
    } else if (mood !== "angry" && mood !== "insecure" && mood !== "bored") {
      setMood("sad");
      setResponse(getResponse("sad"));
    }
  }

  function handleRePot() {
    if (maybeMakeThirsty(setMood, setResponse)) return;
    setMood("mortified");
    setResponse(getResponse("mortified"));
  }

  function handlePhoto() {
    if (maybeMakeThirsty(setMood, setResponse)) return;
    setMood("insecure");
    setResponse(getResponse("insecure"));
  }

  function handleWink() {
    if (maybeMakeThirsty(setMood, setResponse)) return;
    setMood("flirty");
    setResponse(getResponse("flirty"));
  }

  function handleCompliment() {
    if (maybeMakeThirsty(setMood, setResponse)) return;
    setMood("happy");
    setResponse(getResponse("happy"));
  }

  function handleSunshine() {
    if (maybeMakeThirsty(setMood, setResponse)) return;
    setMood("surprised");
    setResponse(getResponse("surprised"));
  }

  return (
    <div className="container">
      <h1 className="center">Clingy Vitals</h1>
      <div className="plant-card">
        <div className="plant-info">
          <h1 >Hey, I'm just your regular house plant</h1>
          <h2><strong>What I'm currently feeling:</strong> {mood.toUpperCase()}</h2>
          <p className="response">{response}</p>
        </div>
        <div className="buttons">
          <button onClick={handleCheckMood}>Check Mood</button>
          <button onClick={handleWater}>Water Plant</button>
          <button onClick={handleIgnore}>Ignore</button>
          <button onClick={handleRePot}>Re-pot in Ugly Pot</button>
          <button onClick={handlePhoto}>Take Photo</button>
          <button onClick={handleWink}>Wink at Plant</button>
          <button onClick={handleSunshine}>Give Sunshine</button>
          <button onClick={handleCompliment}>Compliment</button>
        </div>
        <img
          src={`/images/${mood}.jpg`}
          alt={mood}
          className="plant-image"
        />
      </div>
    </div>
  );
}
