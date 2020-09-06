import React from 'react';
import Quote from './Quote.js';

function QuoteList(props) {
    return (
        <>
            <h1>{props.author}</h1>
            {props.quotes.map(quote =>
                <Quote 
                    author={quote.quoteAuthor} 
                    genre={quote.quoteGenre}
                    noAuthor
                >{quote.quoteText}</Quote>
            )}
        </>
    );
}

export default QuoteList;