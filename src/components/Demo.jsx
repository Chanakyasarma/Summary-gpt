import React from 'react'
import { useState, useEffect } from 'react';
import { copy, linkIcon, loader, tick } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article';
const Demo = () => {
  const [article,setArticle]=useState({
    url:'',
    summary:'',
  });
  const [allArticles, setAllArticle] =useState([]);
  const [copied, setCopied]= useState("");

  useEffect(()=>{
    const articleFromLocalStorage=JSON.parse(
      localStorage.getItem('article')
    )
    if(articleFromLocalStorage){
      setAllArticle(articleFromLocalStorage)
    }
  },[]);

  const [getSummary,{ error, isFetching}]=useLazyGetSummaryQuery();
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const { data }= await getSummary({articleUrl: article.url});
    if(data?.summary){
      const newArticle = { ...article, summary:data.summary };
      const updateAllArticle =[newArticle, ...allArticles]
      setArticle(newArticle);
      setAllArticle(updateAllArticle)
      localStorage.setItem('article',JSON.stringify(updateAllArticle));
    }
  }
  const handleCopy =(copyUrl)=>{
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(()=> setCopied(false), 3000)
  }
  return (
    <section className='mt-16 max-w-4xl max-w-full'>
      <div className='flex flex-col w-full gap-2'>
        <form
         className='relative flex justify-center items-center'
         onSubmit={handleSubmit}>
          <img src={linkIcon}
          alt="link_icon"
          className='absolute left-0 my-2
          ml-3 w-5'/>
          <input
          type='url'
          placeholder='Enter a URL'
          value={article.url}
          onChange={(e)=>setArticle({...article,
            url:e.target.value})}
          required
          className='url_input peer'></input>
          <button type='submit'
          className='submit_btn peer-focus:border-purple-700
          peer-focus:text-purple-700'>↵</button>
        </form>
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.map((item,index)=>(
            <div
             key={`link-${index}`}
             onClick={()=>setArticle(item)}
             className='link_card'>
              <div className='copy_btn' onClick={()=>handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt='copy_icon'
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <p className='flex-1 font-satoshi text-purple-700 font-medium text-sm truncate'>
                {item.url}</p>
                <button
                  className='delete_btn'
                  onClick={() => {
                    const updatedArticles = allArticles.filter((a) => a.url !== item.url);
                    setAllArticle(updatedArticles);
                    localStorage.setItem('article', JSON.stringify(updatedArticles));
                  }}
                >
                  &#x2716;
                </button>
            </div>
          ))}
        </div>

      </div>
      <div className='my-10 max-w-full flex justify-center items-center'>
            {isFetching ? (
              <img src={loader} alt='loader' className='w-20 h-20 object-contain'/>
            ): error ? (
              <p className='font-inter font-bold text-black text-center'>
                Some error <br />
                <span className='font-satoshi font-normal text-purple-700'>
                  {error?.data?.error}
                </span>
                </p>
            ):(
              article.summary && (
                <div className='flex flex-col gap-3'>
                  <h2 className='font-satoshi font-bold text-gray-700 text-xl'>
                    Article 
                     <span className='blue_gradient'> Summary</span>
                  </h2>
                  <div className='summary_box'>
                    <p className='font-satoshi font-medium text-sm text-gray-700'>
                      {article.summary}</p>
                  </div>
                </div>
              )
            )}
      </div>
    </section>
  )
}

export default Demo
