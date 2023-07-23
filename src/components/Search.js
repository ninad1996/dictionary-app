"use client"
import {useState, useEffect, useRef} from 'react'
import FeatherIcon from 'feather-icons-react'
import axios from "axios"



const Search = () => {
    const [meaning, setMeaning] = useState("");
    const form = useRef(null)

    const getMeaning = (e) => {
        e.preventDefault()
        const formCurrent = form.current
        const formData = new FormData(formCurrent)
        const formJson = Object.fromEntries(formData.entries())        
        let word = formJson.search.trim()
        console.log(word);
            axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then((response)=>{
                console.log(response);
                setMeaning(response);
            }).catch((err)=> {
                setMeaning(err);
            })


    }

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