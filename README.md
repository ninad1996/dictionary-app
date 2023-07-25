# Dictionary App with Next.js, React, Public API, and Google Trends

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Google Trends Integration](#google-trends-integration)
- [Maps Integration](#maps-integration)

## Introduction

Welcome to the Dictionary App! This is a web application built using Next.js and React that allows users to search for word definitions using a public dictionary API. Additionally, the app scrapes Google Trends to show the search volume by country over the past week for the queried word.

## Features

- Search for word definitions.
- View search interest volumes for the queried word using Google Trends.
- Responsive and user-friendly interface.
- Real-time updates with the latest word trends.

## Usage

Enter the word you want to search for, and the app will fetch its definition from the public dictionary API. Additionally, it will display the search volume by country for the past week for that word using Google Trends. 

## API Integration

This App queries a Public Dictionary API to recieve meanings, synonyms, audio pronounciations, and phonetic spellings for the requested word. This data is then displayed in a simple UI using React + NextJS.

<img src="public\dictionary1.png" data-canonical-src="public\dictionary1.png" width="768" style="margin:0 auto; display:block;"/>

## Google Trends Integration

The app integrates Google Trends to display the search volume by country in the past week for the queried word. This integration provides valuable insights into the word's popularity and how it has trended over time.
The Trends API is not public, so querying it is not possible. Instead, data has been scraped from Google trends by using the puppeteer node package. 

This package creates a headless chromium browser tab, that opens the Google Trends page, allowing us to scrape data. We then display this data country wise in map format.

<img src="public\dictionary3.png" data-canonical-src="public\dictionary3.png" width="768" style="margin:0 auto; display:block;"/>

## Maps Integration

The react-simple-maps package has been used to display a world map to the user. Using the data from the Google Trends API, the app shades in different countries in different colours according to their trend value. 
The Map itself is comprised of svg paths created using Topojson.

<img src="public\dictionary2.png" data-canonical-src="public\dictionary2.png" width="768" style="margin:0 auto; display:block;"/>
