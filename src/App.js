import React, { useState,useEffect } from 'react';
import './App.css';
import alanBtn from '@alan-ai/alan-sdk-web';
import wordsToNumbers from 'words-to-numbers'
import NewsCards from './components/NewsCards/NewsCards';

const alanKey = '4cdaccba1fc6e4d93af8e22e0509d60b2e956eca572e1d8b807a3e2338fdd0dc/stage';

function App() {
    const [newsArticles, setNewsArticles] = useState([])
    const [activeArticle, setActiveArticle] = useState(-1)
    
    useEffect(()=>{
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if(command === 'newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }
                else if(command === 'highlight'){
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
                }
                else if(command === 'open'){
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy:true }) : number;
                    const article = articles[parsedNumber-1];
                    
                    if(parsedNumber>20){
                        alanBtn().playText('Please try that again')
                    }
                    else if(article){
                        window.open(articles[number].url, '_blank');
                        alanBtn().playText('Opening...')
                    }
                    
                }
            }
        })
    }, []);
    
  return (
    <div className="App">
      <h1>Hi</h1>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
