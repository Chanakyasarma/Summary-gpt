import React from 'react'
import {logo} from '../assets';

const Hero = () => {
  return (
    <header className='w-full flex justify-center
    items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-5'>
        <img src={logo} alt="sumz_logo"
        className='w-28 object-contain h-20'></img>
        <button type='button' onClick={() => window.open('https://github.com/Chanakyasarma/Summary-gpt')}
        className='black_btn h-10'>GitHub</button>

      </nav>
      <h1 className='head_text'>
        Summarize Article with <br className='max-md:hidden'/>
        <span className='orange_gradient'>OpenAI GPT-4</span>
      </h1>
      <h3 className='desc'>
        Simplify your reading with Summary-GPT, an open-source article summarizer
        that transforms lengthy articles into clear and concise summaries
      </h3>
    </header>
  )
}

export default Hero