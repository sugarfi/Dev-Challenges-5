import React from 'react';
import Quote from './Quote.js';
import QuoteList from './QuoteList.js';
import Loading from './Loading.js';
import styles from './App.module.sass';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			author: null,
			genre: null,
			quote: null,
			page: 'quote'
		}
		this.newQuote();
	}

	newQuote = () => {
		this.setState({
			'page':'loading'
		});
		fetch('https://quote-garden.herokuapp.com/api/v2/quotes/random', {
			method: 'GET'
		}).then(r => r.json()).then(json => {
			if (json.statusCode == 200) {
				this.setState({
					author: json.quote.quoteAuthor || 'Anoynmous',
					genre: json.quote.quoteGenre,
					quote: json.quote.quoteText,
					page: 'quote',
				})
			}
		});
	}

	showAllQuotes = () => {
		this.setState({
			'page':'loading'
		});
		fetch(`https://quote-garden.herokuapp.com/api/v2/authors/${this.state.author}?page=1&limit=3`, {
			method: 'GET'
		}).then(r => r.json()).then(json => {
			if (json.statusCode == 200) {
				this.setState({
					genre: null,
					quote: json.quotes,
					page: 'showall',
				})
			}
		});
	}

	render() {
		return (
			<main>
				<button onClick={this.newQuote}>
					Random
					<i className={`${styles.material} material-icons`}>autorenew</i>
				</button>
				{
					{
						'quote':
						<Quote 
							author={this.state.author} 
							genre={this.state.genre}
							onClick={this.showAllQuotes}
						>{this.state.quote}</Quote>,
						'showall':
						<QuoteList 
							author={this.state.author} 
							quotes={this.state.quote} />,
						'loading':
						<Loading />
					}[this.state.page]
				}
			</main>
		);
	}
}

export default App;
