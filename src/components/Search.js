"use client"
import {useState, useEffect, useRef} from 'react'
import FeatherIcon from 'feather-icons-react'
import axios from "axios"

// import { fs } from 'fs';
import googleTrendsApi from "google-trends-api";


const Search = () => {
    const [meaning, setMeaning] = useState("");
    const form = useRef(null)    
    // const proxyAgent =  new HttpsProxyAgent('http://168.63.76.32:3128');

    // hl=en-US&req={"comparisonItem":[{"keyword":"Donald Trump","startTime":"2017-02-01T00:00:00.000Z","endTime":"2017-02-06T00:00:00.000Z","geo":"US","hl":"en-US","category":0,"timezone":-330,"property":"","time":"2017-02-1 2017-02-6"}],"category":0,"property":""}&tz=-330

    // https://trends.google.com/trends/api/explore?hl=en-US&req=%7B%22comparisonItem%22%3A%5B%7B%22keyword%22%3A%22Donald%20Trump%22%2C%22startTime%22%3A%222017-02-01T00%3A00%3A00.000Z%22%2C%22endTime%22%3A%222017-02-06T00%3A00%3A00.000Z%22%2C%22geo%22%3A%22US%22%2C%22agent%22%3A%7B%22options%22%3A%7B%7D%2C%22proxy%22%3A%22http%3A%2F%2F168.63.76.32%3A3128%2F%22%2C%22proxyHeaders%22%3A%7B%7D%2C%22connectOpts%22%3A%7B%22ALPNProtocols%22%3A%5B%22http%2F1.1%22%5D%2C%22host%22%3A%22168.63.76.32%22%2C%22port%22%3A3128%7D%7D%2C%22hl%22%3A%22en-US%22%2C%22category%22%3A0%2C%22timezone%22%3A-330%2C%22property%22%3A%22%22%2C%22time%22%3A%222017-02-1%202017-02-6%22%7D%5D%2C%22category%22%3A0%2C%22property%22%3A%22%22%7D&tz=-330
    const getMeaning = (e) => {
        e.preventDefault()
        const formCurrent = form.current
        const formData = new FormData(formCurrent)
        const formJson = Object.fromEntries(formData.entries())        
        let word = formJson.search.trim()
        console.log(word);
            axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then((response)=>{
                console.log(response);
                setMeaning(response)
            }).catch((err)=> {
                setMeaning(err);
            })
    }

    // useEffect(()=>{
    //     const script = document.createElement("script");
    //     script.src = "https://ssl.gstatic.com/trends_nrtr/3349_RC01/embed_loader.js";
    //     script.async = true;
    //     script.onload = () => {
    //         trends.embed.renderExploreWidget("TIMESERIES", {"comparisonItem":[{"keyword":"book","geo":"IN","time":"now 1-d"}],"category":0,"property":""}, {"exploreQuery":"date=now%201-d&geo=IN&q=book&hl=en-IN","guestPath":"https://trends.google.com:443/trends/embed/"});
    //     }
    //     document.body.appendChild(script);

    // },[])
    // const data = googleTrendsApi
    // .interestOverTime({ keyword: ["Women's march", "Trump Inauguration"] })
    // .then(function (results) {
    //   res.status(200).json(results)
    // });
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    // },

    useEffect(()=>{
        if(meaning != ""){
            // https://trends.google.com/trends/api/widgetdata/comparedgeo?hl=en-US&tz=-330&req=%7B%22geo%22:%7B%22country%22:%22IN%22%7D,%22comparisonItem%22:%5B%7B%22time%22:%222023-07-22T11%5C%5C:07%5C%5C:46+2023-07-23T11%5C%5C:07%5C%5C:46%22,%22complexKeywordsRestriction%22:%7B%22keyword%22:%5B%7B%22type%22:%22BROAD%22,%22value%22:%22book%22%7D%5D%7D%7D%5D,%22resolution%22:%22REGION%22,%22locale%22:%22en-US%22,%22requestOptions%22:%7B%22property%22:%22%22,%22backend%22:%22CM%22,%22category%22:0%7D,%22userConfig%22:%7B%22userType%22:%22USER_TYPE_LEGIT_USER%22%7D%7D&token=APP6_UEAAAAAZL5bgtXjbW0OecB57GqZYAHa5-ja0cdw
            axios.get(`https://trends.google.com/trends/api/widgetdata/comparedgeo?hl=en-US&tz=-330&req=%7B%22geo%22:%7B%22country%22:%22IN%22%7D,%22comparisonItem%22:%5B%7B%22time%22:%222023-07-22T11%5C%5C:07%5C%5C:46+2023-07-23T11%5C%5C:07%5C%5C:46%22,%22complexKeywordsRestriction%22:%7B%22keyword%22:%5B%7B%22type%22:%22BROAD%22,%22value%22:%22book%22%7D%5D%7D%7D%5D,%22resolution%22:%22REGION%22,%22locale%22:%22en-US%22,%22requestOptions%22:%7B%22property%22:%22%22,%22backend%22:%22CM%22,%22category%22:0%7D,%22userConfig%22:%7B%22userType%22:%22USER_TYPE_LEGIT_USER%22%7D%7D&token=APP6_UEAAAAAZL5bgtXjbW0OecB57GqZYAHa5-ja0cdw`).then((response)=>{
                console.log(response.data);
            }).catch((err)=> {
                console.log(err);
            })
        }
    },[meaning])

    return (
        <>
        <form method="post" onSubmit={(e)=>getMeaning(e)} ref={form}>
            <label className={'flex justify-content-between items-center mt-10'}>
                <input type="text" name="search" placeholder="Enter a Word" className={'block rounded-md outline-none text-gray-900 py-1 px-3 w-full text-sm mr-1'} style={{height: "40px"}} autoComplete="off" />
                <button type="submit" className={'rounded-md px-2 py-1 block leading-1 hover:bg-gray-700'} style={{height: "40px"}}>
                    <FeatherIcon icon ="search"/>
                </button>
            </label>
        </form>
        <Result meaning={meaning}/>
        </>
    );
}

const Result = (meaning) => {
    const audioBtn = useRef(null);

    const playAudio = (e) => {
        // console.log(e.currentTarget)
        let audiosrc = e.currentTarget.getAttribute('data-src');
        let audio = new Audio(audiosrc)
        audio.play()
    }

    return(
        // <span>loading</span>
        <div className={'block my-5'}>
        {(meaning.meaning.data != undefined && meaning != '') ? (            
            meaning.meaning.data.map((el,ind)=>{
                return(
                    <div key={"outer"+ind}>
                    <span className={'text-4xl font-bold capitalize block text-white'}>{el.word}</span>
                    <div className={"flex items-center"}>                    
                    {el.phonetics.map((item, index)=>{
                        return(
                            (item.audio != "" ) ? (
                                <>
                                <span className={'text-sm uppercase text-gray-500 font-bold block text-white'}>
                                    <button data-src={item.audio} onClick={(e)=>playAudio(e)} ref={audioBtn} className={'rounded-md px-2 py-1 block leading-1 hover:bg-gray-700'} style={{height: "40px"}}>
                                        <FeatherIcon className={'w-5'} icon ="volume-2"/>
                                    </button>
                                </span>                            
                                {(item.text != "" && item.text != undefined) ? (<span className={'text-sm uppercase text-gray-500 font-bold block text-white'}><span className={'mx-2'}>&bull;</span>{item.text}</span>) : ""}
                                </>
                            ) : (<span className={'text-sm uppercase text-gray-500 font-bold block text-white'}><span className={'mx-2'}>&bull;</span>{item.text}</span>)	                            
                            // (item.text != "" && item.text != undefined) ? (<span className={'text-sm uppercase text-gray-500 font-bold block text-white'} key={index}><span className={'mx-2'}>&bull;</span>{item.text}</span>) : ""
                        );
                    })}
                    </div>
                    <div className={'block'}>
                    {el.meanings.map((item, i)=>{
                        return(
                            <>
                            {(i > 0) ? (<hr className={'h-0.5 mx-auto my-4 bg-gray-700 border-0 rounded md:my-10'}/>) : ""}                            
                            <span className={'text-lg capitalize font-bold block text-gray-300 mb-2 italic'}>&quot;{item.partOfSpeech}&quot;</span>                           
                            {item.synonyms != '' ? (
                                <>
                                <span className={'text-sm uppercase text-gray-500 font-bold block text-white'}>Synonyms</span>
                                <span className={'text-sm uppercase font-bold block text-white mb-2'}>{item.synonyms.join(", ")}</span>
                                </>
                            ):""}                            
                            <span className={'text-sm uppercase text-gray-500 font-bold block text-white'}>Definitions</span>
                            <ol className={"mb-2 list-disc ms-5"}>
                                {item.definitions.map((iteminner, index)=>{
                                    return (
                                        <li key={index}>{iteminner.definition}</li>
                                    )
                                })}
                            </ol>
                            </>
                        )
                    })}
                    </div>
                    </div>
                );
            })
        ): (meaning.meaning.response !== undefined && meaning.meaning.response.data.title == 'No Definitions Found') ? <span>{"No Data Found"}</span> : ""}
        </div>
    );
}

export default Search;