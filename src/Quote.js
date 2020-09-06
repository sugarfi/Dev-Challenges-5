import React from 'react';
import './Quote.module.sass';

function Quote(props) {
    return (
        <section>
            <blockquote>
                {props.children}
            </blockquote>
            {
                props.noAuthor ?
                null
                :
                <div onClick={props.onClick}>
                    <h1>{props.author}</h1>
                    <h2>{props.genre}</h2>
                </div>
            }
        </section>
    );
}

Quote.defaultProps = {
    noAuthor: false
}

export default Quote;