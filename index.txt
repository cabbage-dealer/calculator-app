import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import registerServiceWorker from './registerServiceWorker';

class InputField extends React.Component {
	constructor(props) {
		super(props);
		this.state = { text: '' };

		this.state = {histEnt: '', histSol: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.handleBack = this.handleBack.bind(this);
		this.handleForward = this.handleForward.bind(this);
	}

	handleChange(e) {
		this.setState({text: e.target.value})
		console.log(this.state.text)
	}

	handleClick(e) {
		var entry = this.state.text;
		var soln = eval(entry);
		console.log(this.state.text)
		//an array with the history of calcs

		this.setState({
			histEnt: [...this.state.histEnt, entry],
			histSol: [...this.state.histSol, soln]
		})
		this.setState({ nums: this.state.histEnt.length })
		this.setState({max: this.state.nums})

		this.setState({solu: soln}); 
	} 

	handleBack(e) {
		let length = this.state.nums
		console.log(this.state.histEnt)

		if(length !== 0 ) {
			length = length - 1
			this.setState({ text: this.state.histEnt[length] })
			this.setState({ solu: this.state.histSol[length] })
			this.setState({nums: length})
		}
	}

	handleForward(e) {
		let length = this.state.nums
		console.log(this.state.histEnt)

		if(length !== this.state.max + 1 ) {
			length = length + 1
			this.setState({ text: this.state.histEnt[length] })
			this.setState({ solu: this.state.histSol[length] })
			this.setState({nums: length})
		}
	}

	render() {
		return (
			<div>
				<input className="input" type="text" value={this.state.text}
				 onChange={this.handleChange}/>
				<button type="submit" onClick={this.handleClick}>
					Solve
				</button>
				<Recall 
					back={this.handleBack} 
					forward={this.handleForward}
				/>
				<Answer solut={this.state.solu}/>
			</div>
		)
	}
}

class Answer extends React.Component {
	render() {
		return (
			<div>
				<p>Solution: {this.props.solut}</p>
			</div>
		)
	}
}

class Recall extends React.Component {
	render() {
		return (
			<span>
				<button type="submit" onClick={this.props.back} value="back">
					Back
				</button>
				<button type="submit" onClick={this.props.forward} value="forward">
					Forward 
				</button>
			</span>
		)
	}
}

ReactDOM.render(
	<InputField/>,
 	document.getElementById('root')
);

registerServiceWorker();