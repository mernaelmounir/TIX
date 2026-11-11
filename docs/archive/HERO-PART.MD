

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>TIX - Sticky Scroll Services Transition</title>

<style>


* {

box-sizing: border-box;

margin: 0;

padding: 0;

}



body {

background-color: #000000;

font-family: 'Plus Jakarta Sans', sans-serif;

color: #ffffff;

}



/* Outer Wrapper */

.services-pinned-wrapper {

position: relative;

width: 100%;

background-color: #000000;

}



/* 100vh Fullscreen Stage */

.pinned-stage {

width: 100%;

height: 100vh;

display: flex;

justify-content: space-between;

align-items: center;

padding: 0 5%;

position: relative;

overflow: hidden;



/* Red Gradient & Background Image */

background: radial-gradient(circle at 20% 50%, #4a0000 0%, #110000 60%, #000000 100%);

}



/* Left Section - Static Text & Model */

.static-left-side {

position: relative;

width: 45%;

height: 100%;

display: flex;

flex-direction: column;

justify-content: center;

z-index: 5;

}



.hero-headline {

font-size: 3.8rem;

font-weight: 900;

line-height: 0.95;

letter-spacing: -1px;

color: #ffffff;

}



.hero-headline span {

color: #d20f1f;

}



.model-png {

position: absolute;

bottom: 0;

left: 0;

width: 90%;

max-width: 480px;

height: auto;

object-fit: contain;

z-index: 6;

pointer-events: none;

}



/* Right Section - Moving Cards Stack */

.cards-stack-column {

position: relative;

width: 48%;

height: 100vh;

display: flex;

flex-direction: column;

justify-content: center;

z-index: 10;

}



/* Leaf Card Styling */

.tix-leaf-card {

position: absolute;

width: 100%;

max-width: 520px;

background-color: #ffffff;

color: #111111;

/* Custom Leaf Curve Shape */

border-radius: 40px 8px 40px 40px;

border: 4px solid #610000;

padding: 30px;

box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);

}



.card-num {

font-size: 2.8rem;

font-weight: 900;

color: #111111;

line-height: 1;

}



.card-title {

font-size: 1.3rem;

font-weight: 800;

color: #610000;

margin-bottom: 10px;

border-bottom: 2px solid #610000;

padding-bottom: 6px;

}



.card-desc {

font-size: 0.85rem;

line-height: 1.4;

color: #333333;

margin-bottom: 16px;

}



.card-list {

list-style: none;

display: flex;

flex-direction: column;

gap: 6px;

}



.card-list li {

background: #f4f4f4;

padding: 8px 12px;

border-radius: 6px;

font-size: 0.8rem;

font-weight: 700;

color: #222222;

border-left: 3px solid #610000;

}


* {

margin: 0;

padding: 0;

box-sizing: border-box;

}



body {

background-color: #000000;

font-family: 'Plus Jakarta Sans', sans-serif;

color: #ffffff;

}



/* Dummy Spacing Section Above */

.hero-placeholder {

height: 80vh;

display: flex;

align-items: center;

justify-content: center;

background: #0a0a0a;

border-bottom: 1px solid #222;

}



/* =========================================================

1. MAIN SECTION PARENT (DETERMINES SCROLL DURATION)

========================================================= */

.pinned-services-section {

position: relative;

width: 100%;

/*

Increasing min-height controls how long the left side stays frozen.

300vh means the user scrolls 3 full screen heights while content slides.

*/

min-height: 320vh;

background-color: #000000;

}



/* =========================================================

2. STICKY BACKGROUND & ARTWORK WRAPPER

========================================================= */

.sticky-viewport {

position: sticky;

top: 0;

height: 100vh;

width: 100%;

overflow: hidden;

display: flex;

align-items: center;

justify-content: space-between;

padding: 0 4%;

z-index: 1;



/* Replace with your curved/blurred banner image URL */

background: linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(96,0,0,0.6) 100%),

url('blurred-banner-bg.jpg') center/cover no-repeat;

}



/* Static Text & Girl Cutout Container (Left Side) */

.static-left-content {

position: relative;

width: 45%;

height: 100%;

display: flex;

flex-direction: column;

justify-content: center;

z-index: 5;

}



.static-headline {

font-size: 3.8rem;

font-weight: 900;

line-height: 0.95;

letter-spacing: -1px;

text-transform: uppercase;

color: #ffffff;

margin-bottom: 20px;

text-shadow: 0 4px 20px rgba(0,0,0,0.8);

}



/* Cutout Girl PNG (Pinned on top of static elements) */

.cutout-girl-img {

position: absolute;

bottom: 0;

left: 0;

width: 85%;

max-width: 460px;

height: auto;

object-fit: contain;

z-index: 6;

pointer-events: none;

}



/* =========================================================

3. SCROLLING CARDS CONTAINER (RIGHT SIDE)

========================================================= */

.scrolling-right-container {

position: relative;

width: 48%;

z-index: 10;

/* Pushes the first card to start at mid-screen when scrolling begins */

padding-top: 10vh;

padding-bottom: 40vh;

}



/* Leaf Shape Card Component */

.service-leaf-card {

background-color: #ffffff;

color: #111111;

border-radius: 40px 10px 40px 40px; /* Unique leaf-curve geometry */

border: 4px solid #610000; /* Matching red stroke */

padding: 35px 30px;

margin-bottom: 80vh; /* Keeps cards spaced out during scroll */

box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);

transition: transform 0.3s ease, box-shadow 0.3s ease;

}



.service-leaf-card:last-child {

margin-bottom: 10vh;

}



.card-number {

font-size: 2.5rem;

font-weight: 800;

color: #111111;

margin-bottom: 5px;

}



.card-title {

font-size: 1.4rem;

font-weight: 800;

text-transform: uppercase;

color: #610000;

margin-bottom: 12px;

border-bottom: 2px solid #610000;

padding-bottom: 6px;

}



.card-description {

font-size: 0.9rem;

line-height: 1.5;

color: #333333;

margin-bottom: 20px;

}



.card-list {

list-style: none;

display: flex;

flex-direction: column;

gap: 8px;

}



.card-list li {

background: #f4f4f4;

padding: 10px 14px;

border-radius: 8px;

font-size: 0.85rem;

font-weight: 700;

color: #222222;

border-left: 3px solid #610000;

}



/* =========================================================

4. RESPONSIVE BREAKPOINTS

========================================================= */

@media (max-width: 900px) {

.sticky-viewport {

flex-direction: column;

justify-content: flex-start;

padding: 20px 15px;

}



.static-left-content {

width: 100%;

height: 35vh;

}



.static-headline {

font-size: 2.2rem;

}



.cutout-girl-img {

width: 180px;

right: 0;

left: auto;

}



.scrolling-right-container {

width: 100%;

padding-top: 0;

}



.service-leaf-card {

margin-bottom: 50vh;

padding: 20px;

}

}

</style>

</head>

<body>



<div class="hero-placeholder">

<h2>Scroll Down to View Services Transition</h2>

</div>



<!-- PINNED SCROLL SECTION PARENT -->

<section class="services-pinned-wrapper">


<!-- BACKGROUND & STATIC ARTWORK CONTAINER -->

<div class="pinned-stage">


<!-- Left Fixed Artwork & Text -->

<div class="static-left-side">

<h1 class="hero-headline">DISRUPT<br>THE<br>ORD<span>i</span>NARY.</h1>

<!-- Girl PNG Model Cutout -->

<img src="modelcrop.png" alt="TIX Model" class="model-png">

</div>



<!-- Right Sliding Cards Container -->

<div class="cards-stack-column">


<!-- Card 01 -->

<div class="tix-leaf-card">

<div class="card-num">01</div>

<h3 class="card-title">MARKETING</h3>

<p class="card-desc">We position your brand where it matters building strategies that connect, perform, and scale.</p>

<ul class="card-list">

<li>/01 Social media strategy</li>

<li>/02 Campaign planning</li>

<li>/03 Paid advertising</li>

<li>/04 Audience targeting</li>

<li>/05 Performance analytics</li>

</ul>

</div>



<!-- Card 02 -->

<div class="tix-leaf-card">

<div class="card-num">02</div>

<h3 class="card-title">SOCIAL MEDIA MANAGEMENT</h3>

<p class="card-desc">We manage your presence like a brand, not a page creating consistent, engaging content.</p>

<ul class="card-list">

<li>/01 Content planning</li>

<li>/02 Posting & scheduling</li>

<li>/03 Community management</li>

<li>/04 Visual consistency</li>

<li>/05 Engagement tracking</li>

</ul>

</div>



<!-- Card 03 -->

<div class="tix-leaf-card">

<div class="card-num">03</div>

<h3 class="card-title">PRODUCTION</h3>

<p class="card-desc">We create high-end visual content designed to capture attention and emotion — from concept to final frame.</p>

<ul class="card-list">

<li>/01 Photography</li>

<li>/02 Video production</li>

<li>/03 Lighting & styling</li>

<li>/04 Creative direction</li>

<li>/05 Post-production</li>

</ul>

</div>



<!-- Card 04 -->

<div class="tix-leaf-card">

<div class="card-num">04</div>

<h3 class="card-title">GRAPHIC DESIGN</h3>

<p class="card-desc">We design visuals that communicate clearly and stand out instantly across digital channels.</p>

<ul class="card-list">

<li>/01 Brand assets</li>

<li>/02 Social media visuals</li>

<li>/03 Print materials</li>

<li>/04 Campaign design</li>

<li>/05 Visual systems</li>

</ul>

</div>



<!-- Card 05 -->

<div class="tix-leaf-card">

<div class="card-num">05</div>

<h3 class="card-title">WEB DEVELOPMENT</h3>

<p class="card-desc">We build fast, scalable websites that translate your brand into a seamless digital experience.</p>

<ul class="card-list">

<li>/01 Frontend development</li>

<li>/02 Responsive design</li>

<li>/03 Performance optimization</li>

<li>/04 CMS integration</li>

<li>/05 Deployment & support</li>

</ul>

</div>



<!-- Card 06 -->

<div class="tix-leaf-card">

<div class="card-num">06</div>

<h3 class="card-title">UI / UX</h3>

<p class="card-desc">We design digital experiences that are intuitive, engaging, and built to convert — not just look good.</p>

<ul class="card-list">

<li>/01 Website design</li>

<li>/02 App UI/UX</li>

<li>/03 E-commerce design</li>

<li>/04 Prototyping</li>

<li>/05 Design systems</li>

</ul>

</div>



</div>

</div>

</section>



<div class="hero-placeholder">

<h2>Next Section Starts Below</h2>

</div>


